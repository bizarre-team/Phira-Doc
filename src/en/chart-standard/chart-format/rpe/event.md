# Event

This page describes **regular** judgeline events. Refer to [Extended events](./extendEvent.md) for extended events.

- In RPE, there are five types of regular events: `moveXEvents` (X‑axis movement events), `moveYEvents` (Y‑axis movement events), `rotateEvents` (rotation events), `alphaEvents` (opacity events), and `speedEvents` (note speed events).
- At this level, each of these fields corresponds to a `JsonArray`, where each element represents one event.
- If a judgeline does not have a certain type of event, the corresponding field will be absent rather than being an empty array.

Each regular event (except `speedEvents`) has these fields:

| Field | Type | Description | Default | Version |
|:------------:|:-----------------:|:----------------------------------------------------------------------------------------------------------------------:|:----------------------:|:----:|
| bezier | int | 0 = no bezier, 1 = bezier | 0 | - |
| bezierPoints | float[4] | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | [0,0,0,0] | - |
| easingLeft | float | Left easing boundary. Minimum `0.0`, maximum `1.0`. | 0.0 | - |
| easingRight | float | Right easing boundary. Minimum `0.0`, maximum `1.0`. | 1.0 | - |
| easingType | int | Easing type. Refer to [extend](./extend.md#easingType) | 1 | - |
| linkgroup | int | - | - | - |
| start | float | Event start value. | - | - |
| startTime | [beat](./beat.md) | Event start time. | - | - |
| end | float | Event end value. | - | - |
| endTime | [beat](./beat.md) | Event end time. | - | - |

- The coordinate system’s origin is at the center of the screen. The X‑axis range is `-675` to `675`, and the Y‑axis range is `-450` to `450`.
- The normal range for `Alpha` events is `0` to `255`. `0` means fully transparent, `255` means fully opaque.
    - If an `Alpha` event value is negative, the judgment line will be hidden along with all `Notes` on that line. (According to cmdysj, this is a deprecated and unintended feature, but it still works.)
- ~~Speed events only have the fields `startTime`, `endTime`, `start`, `end`, and `linkgroup` mentioned above.~~

::: danger
Speed events in version `162` support all easing fields, but still do not support Bézier easing (i.e., they lack the `bezier` and `bezierPoints` fields).

~~Original note from the RPE author: When the easing type of a speed event is not `1`, the actual speed change follows the derivative shape of the easing function, so the change in `floorposition` adheres to the easing curve. For compatibility, when easing is `1`, we keep the original meaning unchanged—meaning easing type `1` and easing type `5` both represent a quadratic change in `floorposition`.~~

In RPE version 1.7.0, speed event easing has reverted to the earliest logic: the easing function is applied to the speed value itself. Behaveiors remains to be verified.  
:::

- ~~Note speed events do not support easing; only linear changes are applied.~~
- When the speed value is negative, notes will fly upward. If a note is a `Hold`, the entire note will appear when its tail appears (even if the `Hold` has not fully returned to the front side of the judgment line). (This behavior differs from the original game’s behavior; use with discretion.)

## Python example (no bezier)

- Define `rpe_easing.py` (omitted)
- Define `Beat`:
```python
@dataclass
class Beat:
    var1: int
    var2: int
    var3: int
    
    def __post_init__(self):
        self.value = self.var1 + (self.var2 / self.var3)
        self._hash = hash(self.value)
    
    def __hash__(self) -> int:
        return self._hash
```
- Define `LineEvent`:
```python
@dataclass
class LineEvent:
    startTime: Beat
    endTime: Beat
    start: float|str|list[int]
    end: float|str|list[int]
    easingType: int
    easingFunc: typing.Callable[[float], float] = rpe_easing.ease_funcs[0]
    
    def __post_init__(self):
        if not isinstance(self.easingType, int): self.easingType = 1
        self.easingType = 1 if self.easingType < 1 else (len(rpe_easing.ease_funcs) if self.easingType > len(rpe_easing.ease_funcs) else self.easingType)
        self.easingFunc = rpe_easing.ease_funcs[self.easingType - 1]
```
- Define `easing_interpolation`:
```python
def easing_interpolation(
    t: float, st: float,
    et: float, sv: float,
    ev: float, f: typing.Callable[[float], float]
):
    if t == st: return sv
    return f((t - st) / (et - st)) * (ev - sv) + sv
```
- `default` is the default value of the event.
- Then:
```python
def GetEventValue(t: float, es: list[LineEvent], default):
    for e in es:
        if e.startTime.value <= t <= e.endTime.value:
            if isinstance(e.start, float|int):
                return easing_interpolation(t, e.startTime.value, e.endTime.value, e.start, e.end, e.easingFunc)
            elif isinstance(e.start, str):
                return e.start
            elif isinstance(e.start, list):
                r = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[0], e.end[0], e.easingFunc)
                g = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[1], e.end[1], e.easingFunc)
                b = easing_interpolation(t, e.startTime.value, e.endTime.value, e.start[2], e.end[2], e.easingFunc)
                return (r, g, b)
    return default
```
