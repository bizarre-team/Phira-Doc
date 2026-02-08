# judgeLine

Each judge line has these fields:

| Field | Type | Description | Default | Version |
|:----------------:|:------------------------------:|:------------------------------------------------------------:|:--------------:|:----:|
| Group | int | [Group](./root.md#judgelinegroup) | 0 | - |
| Name | string | Line name | Untitled | - |
| Texture | string | Texture path relative to chart root; see [Texture](./extend.md#texture) | line.png | - |
| anchor | float[2] | Texture anchor; see [extend](./extend.md#anchor) | [0.5, 0.5] | 142 |
| eventLayers | [EventLayer](./event.md)[]? | Event layers (1–5); see [event](./event.md) | - | - |
| extended | [JsonObject](./extendEvent.md) | Extended events; see [extendEvent](./extendEvent.md) | - | - |
| father | int | Parent line; -1 = none | -1 | - |
| isCover | int | 1 = mask (notes on back side not rendered when not hit) | 1 | - |
| notes | [Note](./note.md)[] | Notes on this line | - | - |
| numOfNotes | int | Note count (incl. FakeNote, excl. Hold) | 0 | - |
| zOrder | int | Layer (z), range ±100 | 0 | - |
| attachUI | string? | UI binding; see [extend](./extend.md#attachui) | - | - |
| isGif | bool | Texture is GIF | false | 150 |
| posControl, sizeControl, skewControl, yControl, alphaControl | JsonArray | See [Controls](./controls.md) | - | - |
| bpmfactor | float | BPM factor (not editable in RPE) | 1.0 | - |
| rotateWithFather | bool | Child inherits parent rotation if true | true | 163 |

- Empty layers: in some versions the field was `null`; from some version (e.g. 143) empty layers have no field. If a layer has no events of a type, that event field is omitted. If all layers are empty, `eventLayers` may be omitted.
- Effective BPM = current BPM / bpmfactor (not ×).
- Parent nesting is allowed. Parent rotation affects child only if `rotateWithFather` is true; if the field is missing, treat as false (pre-163).
- `isCover` 1 = mask: notes on the back side of the line (or front when note `Above` ≠ 1) are not rendered until hit.

## Event interpolation

### Python Format

### Python Examples

- Define `rpe_easing.py` (omitted)
- Define `Chart_Objects_Rpe.py` (partially omitted)

```python
from __future__ import annotations

import typing
from dataclasses import dataclass
from functools import lru_cache, cache

import rpe_easing

def easing_interpolation(
    t: float, st: float,
    et: float, sv: float,
    ev: float, f: typing.Callable[[float], float]
):
    if t == st: return sv
    return f((t - st) / (et - st)) * (ev - sv) + sv
    
def conrpepos(x: float, y: float):
    return (x + 675) / 1350, 1.0 - (y + 450) / 900

def _init_events(es: list[LineEvent]):
    aes = []
    for i, e in enumerate(es):
        if i != len(es) - 1:
            ne = es[i + 1]
            if e.endTime.value < ne.startTime.value:
                aes.append(LineEvent(e.endTime, ne.startTime, e.end, e.end, 1))
    es.extend(aes)
    es.sort(key = lambda x: x.startTime.value)
    if es: es.append(LineEvent(es[-1].endTime, Beat(31250000, 0, 1), es[-1].end, es[-1].end, 1))
        
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
    
@dataclass
class Note:
    ...
    
@dataclass
class LineEvent:
    ...
    easingFunc: typing.Callable[[float], float] = rpe_easing.ease_funcs[0]
    
    def __post_init__(self):
        if not isinstance(self.easingType, int): self.easingType = 1
        self.easingType = 1 if self.easingType < 1 else (len(rpe_easing.ease_funcs) if self.easingType > len(rpe_easing.ease_funcs) else self.easingType)
        self.easingFunc = rpe_easing.ease_funcs[self.easingType - 1]
    
@dataclass
class EventLayer:
    ...
    
    def __post_init__(self):
        self.speedEvents.sort(key = lambda x: x.startTime.value)
        self.moveXEvents.sort(key = lambda x: x.startTime.value)
        self.moveYEvents.sort(key = lambda x: x.startTime.value)
        self.rotateEvents.sort(key = lambda x: x.startTime.value)
        self.alphaEvents.sort(key = lambda x: x.startTime.value)
        
        _init_events(self.speedEvents)
        _init_events(self.moveXEvents)
        _init_events(self.moveYEvents)
        _init_events(self.rotateEvents)
        _init_events(self.alphaEvents)
        
@dataclass
class Extended:
    ...
    
    def __post_init__(self):
        self.scaleXEvents.sort(key = lambda x: x.startTime.value)
        self.scaleYEvents.sort(key = lambda x: x.startTime.value)
        self.colorEvents.sort(key = lambda x: x.startTime.value)
        self.textEvents.sort(key = lambda x: x.startTime.value)

        _init_events(self.scaleXEvents)
        _init_events(self.scaleYEvents)
        _init_events(self.colorEvents)
        _init_events(self.textEvents)

@dataclass
class MetaData:
    ...

@dataclass
class BPMEvent:
    ...

@dataclass
class JudgeLine:
    ...
    
    def GetEventValue(self, t: float, es: list[LineEvent], default):
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
    
    @lru_cache
    def GetPos(self, t: float, master: Rpe_Chart) -> list[float, float]:
        linePos = [0.0, 0.0]
        for layer in self.eventLayers:
            linePos[0] += self.GetEventValue(t, layer.moveXEvents, 0.0)
            linePos[1] += self.GetEventValue(t, layer.moveYEvents, 0.0)
        if self.father != -1:
            try:
                fatherPos = master.JudgeLineList[self.father].GetPos(t, master)
                linePos = list(map(lambda x, y: x + y, linePos, fatherPos))
            except IndexError:
                pass
        return linePos
    
    def GetState(self, t: float, defaultColor: tuple[int, int, int], master: Rpe_Chart) -> tuple[tuple[float, float], float, float, tuple[int, int, int], float, float, str|None]:
        "linePos, lineAlpha, lineRotate, lineColor, lineScaleX, lineScaleY, lineText"
        linePos = self.GetPos(t, master)
        lineAlpha = 0.0
        lineRotate = 0.0
        lineColor = defaultColor if not self.extended.textEvents else (255, 255, 255)
        lineScaleX = 1.0
        lineScaleY = 1.0
        lineText = None
        
        for layer in self.eventLayers:
            lineAlpha += self.GetEventValue(t, layer.alphaEvents, 0.0 if (t >= 0.0 or self.attachUI is not None) else -255.0)
            lineRotate += self.GetEventValue(t, layer.rotateEvents, 0.0)
        
        if self.extended:
            lineScaleX = self.GetEventValue(t, self.extended.scaleXEvents, lineScaleX)
            lineScaleY = self.GetEventValue(t, self.extended.scaleYEvents, lineScaleY)
            lineColor = self.GetEventValue(t, self.extended.colorEvents, lineColor)
            lineText = self.GetEventValue(t, self.extended.textEvents, lineText)
        
        return conrpepos(*linePos), lineAlpha / 255, lineRotate, lineColor, lineScaleX, lineScaleY, lineText

    def __hash__(self) -> int:
        return id(self)
    
    def __eq__(self, oth) -> bool:
        if isinstance(oth, JudgeLine):
            return self is oth
        return False

@dataclass
class Rpe_Chart:
    ...
    
    def __post_init__(self):
        self.BPMList.sort(key=lambda x: x.startTime.value)
    
    @cache
    def sec2beat(self, t: float, bpmfactor: float):
        beat = 0.0
        for i, e in enumerate(self.BPMList):
            bpmv = e.bpm * bpmfactor
            if i != len(self.BPMList) - 1:
                et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
                et_sec = et_beat * (60 / bpmv)
                
                if t >= et_sec:
                    beat += et_beat
                    t -= et_sec
                else:
                    beat += t / (60 / bpmv)
                    break
            else:
                beat += t / (60 / bpmv)
        return beat
    
    @cache
    def beat2sec(self, t: float, bpmfactor: float):
        sec = 0.0
        for i, e in enumerate(self.BPMList):
            bpmv = e.bpm * bpmfactor
            if i != len(self.BPMList) - 1:
                et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
                
                if t >= et_beat:
                    sec += et_beat * (60 / bpmv)
                    t -= et_beat
                else:
                    sec += t * (60 / bpmv)
                    break
            else:
                sec += t * (60 / bpmv)
        return sec

    def __hash__(self) -> int:
        return id(self)
    
    def __eq__(self, oth) -> bool:
        if isinstance(oth, JudgeLine):
            return self is oth
        return False
```

- Load chart:

```python
def load(chart: dict):
    meta = chart.get("META", {})
    rpe_chart_obj = Chart_Objects_Rpe.Rpe_Chart(
        META = Chart_Objects_Rpe.MetaData(
            RPEVersion = meta.get("RPEVersion", -1),
            offset = meta.get("offset", 0),
            name = meta.get("name", "Unknow"),
            id = meta.get("id", "-1"),
            song = meta.get("song", "Unknow"),
            background = meta.get("background", "Unknow"),
            composer = meta.get("composer", "Unknow"),
            charter = meta.get("charter", "Unknow"),
            level = meta.get("level", "Unknow"),
        ),
        BPMList = [
            Chart_Objects_Rpe.BPMEvent(
                startTime = Chart_Objects_Rpe.Beat(
                    *BPMEvent_item.get("startTime", [0, 0, 1])
                ),
                bpm = BPMEvent_item.get("bpm", 140)
            )
            for BPMEvent_item in chart.get("BPMList", [])
        ],
        JudgeLineList = [
            Chart_Objects_Rpe.JudgeLine(
                isCover = judgeLine_item.get("isCover", 1),
                Texture = judgeLine_item.get("Texture", "line.png"),
                attachUI = judgeLine_item.get("attachUI", None),
                bpmfactor = judgeLine_item.get("bpmfactor", 1.0),
                father = judgeLine_item.get("father", -1),
                zOrder = judgeLine_item.get("zOrder", 0),
                eventLayers = [
                    Chart_Objects_Rpe.EventLayer(
                        speedEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = 1
                            )
                            for LineEvent_item in EventLayer_item.get("speedEvents", [])
                        ] if EventLayer_item.get("speedEvents", []) is not None else [],
                        moveXEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("moveXEvents", [])
                        ] if EventLayer_item.get("moveXEvents", []) is not None else [],
                        moveYEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("moveYEvents", [])
                        ] if EventLayer_item.get("moveYEvents", []) is not None else [],
                        rotateEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("rotateEvents", [])
                        ] if EventLayer_item.get("rotateEvents", []) is not None else [],
                        alphaEvents = [
                            Chart_Objects_Rpe.LineEvent(
                                startTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("startTime", [0, 0, 1])
                                ),
                                endTime = Chart_Objects_Rpe.Beat(
                                    *LineEvent_item.get("endTime", [0, 0, 1])
                                ),
                                start = LineEvent_item.get("start", 0.0),
                                end = LineEvent_item.get("end", 0.0),
                                easingType = LineEvent_item.get("easingType", 1)
                            ) for LineEvent_item in EventLayer_item.get("alphaEvents", [])
                        ] if EventLayer_item.get("alphaEvents", []) is not None else []
                    ) if EventLayer_item is not None else Chart_Objects_Rpe.EventLayer(speedEvents = [], moveXEvents = [], moveYEvents = [], rotateEvents = [], alphaEvents = [])
                    for EventLayer_item in judgeLine_item.get("eventLayers", [])
                ],
                extended = Chart_Objects_Rpe.Extended(
                    scaleXEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", 1.0),
                            end = LineEvent_item.get("end", 1.0),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("scaleXEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("scaleXEvents", []) is not None else [],
                    scaleYEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", 1.0),
                            end = LineEvent_item.get("end", 1.0),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("scaleYEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("scaleYEvents", []) is not None else [],
                    colorEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", [255, 255, 255]),
                            end = LineEvent_item.get("end", [255, 255, 255]),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("colorEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("colorEvents", []) is not None else [],
                    textEvents = [
                        Chart_Objects_Rpe.LineEvent(
                            startTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("startTime", [0, 0, 1])
                            ),
                            endTime = Chart_Objects_Rpe.Beat(
                                *LineEvent_item.get("endTime", [0, 0, 1])
                            ),
                            start = LineEvent_item.get("start", ""),
                            end = LineEvent_item.get("end", ""),
                            easingType = LineEvent_item.get("easingType", 1)
                        ) for LineEvent_item in judgeLine_item.get("extended", {}).get("textEvents", [])
                    ] if judgeLine_item.get("extended", {}).get("textEvents", []) is not None else [],
                ) if judgeLine_item.get("extended", {}) is not None else None,
                notes = [
                    Chart_Objects_Rpe.Note(
                        type = Note_item.get("type", 1),
                        startTime = Chart_Objects_Rpe.Beat(
                            *Note_item.get("startTime", [0, 0, 1])
                        ),
                        endTime = Chart_Objects_Rpe.Beat(
                            *Note_item.get("endTime", [0, 0, 1])
                        ),
                        positionX = Note_item.get("positionX", 0),
                        above = Note_item.get("above", 1),
                        isFake = Note_item.get("isFake", False),
                        speed = Note_item.get("speed", 1.0),
                        yOffset = Note_item.get("yOffset", 0.0),
                        visibleTime = Note_item.get("visibleTime", 999999.0),
                        width = Note_item.get("size", 1.0),
                        alpha = Note_item.get("alpha", 255),
                    )
                    for Note_item in judgeLine_item.get("notes", [])
                ]
            )
            for judgeLine_item in chart.get("judgeLineList", [])
        ]
    )
                
    return rpe_chart_obj

result = load({}) # Pass your chart here
```

- Finally, call `result.JudgeLineList[i].GetState`, passing in the current beat number `t`, the default color of the decision line `defaultColor`, and the chart object `master`, to get all the judgeline states for the current beat number.
