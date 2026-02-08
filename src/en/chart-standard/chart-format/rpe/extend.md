# Extended Parameters

## attachUI

`attachUI` is an RPE‑exclusive feature that allows you to bind UI elements to a judgeline, enabling control over the UI’s position, opacity, size, etc.  
Correspondence between property values and UI elements:  

| Value | UI element | RPE setting number | Anchor |
|:-----------:|:----------------:|:----------:|:----------:|
| `pause` | Pause button | 1 | Top‑left | – |
| `combonumber` | Combo counter | 2 | Center | Binding this UI makes its opacity affected by Alpha events. It is only displayed when the combo count is ≥ `3` by default. |
| `combo` | “Combo” text below the combo counter | 3 | Center | Same as above |
| `score` | Score | 4 | Top‑right | – |
| `bar` | Progress bar | 5 | Left center | **Before RPE 1.4.0**, this property bound the vertical white bar on the left side of the song title. |
| `name` | Chart name | 6 | Bottom‑left | – |
| `level` | Chart level | 7 | Bottom‑right | – |

- Once a UI element is bound, the judgeline is automatically hidden. The UI can be manipulated similarly to a child line, but with the added ability to control its rotation and opacity; the actual position of the judgeline remains unchanged.

## anchor

`anchor` is an RPE‑exclusive feature that allows you to set the anchor point of a judgment line. It was designed primarily for text events.  
- In RPE, this setting is found in the second page of the top toolbar, with the two values separated by a space.  
- It is a `float[2]`, where the two values correspond to the `x` and `y` coordinates of the texture.  
- `x` defaults to `0.5` (center). `1` shifts the judgment line texture to the left, `0` shifts it to the right.  
- `y` defaults to `0.5` (center). `1` shifts the judgment line texture downward, `0` shifts it upward.  
- This field also affects the position of custom textures.

## Texture

RPE allows you to set the `Texture` field of a judgeline to change its texture. Once the texture is modified, the judgeline color is no longer influenced by AP/FC indication colors.  
- If you change the judgeline texture size without using [`scaleXEvents`](./extendEvent.md#scalexevents) or [`scaleYEvents`](./extendEvent.md#scaleyevents), the default scaling is `1`.  
- If the texture is an animated GIF, it will be affected by [`gifEvents`](./extendEvent.md#gifevents) (supported starting from version `150`).

## easingType

`easingType` is RPE's numeric identifier for easing functions. The mapping is as follows:  

| Value | Easing |
|:--:|:--------------:|
| 1 | Linear |
| 2 | Out Sine |
| 3 | In Sine |
| 4 | Out Quad |
| 5 | In Quad |
| 6 | In Out Sine |
| 7 | In Out Quad |
| 8 | Out Cubic |
| 9 | In Cubic |
| 10 | Out Quart |
| 11 | In Quart |
| 12 | In Out Cubic |
| 13 | In Out Quart |
| 14 | Out Quint |
| 15 | In Quint |
| 16 | Out Expo |
| 17 | In Expo |
| 18 | Out Circ |
| 19 | In Circ |
| 20 | Out Back |
| 21 | In Back |
| 22 | In Out Circ |
| 23 | In Out Back |
| 24 | Out Elastic |
| 25 | In Elastic |
| 26 | Out Bounce |
| 27 | In Bounce |
| 28 | In Out Bounce |
| 29 | In Out Elastic | Cannot be used in speed events |

- RPE version 1.7.0 restored the use of easing #29.

You can view their functions and other information on [this website](https://easings.net/en).

### Python Easing Example  
```python
import math
import typing

ease_funcs:list[typing.Callable[[float], float]] = [
  lambda t: t, # linear - 1
  lambda t: math.sin((t * math.pi) / 2), # out sine - 2
  lambda t: 1 - math.cos((t * math.pi) / 2), # in sine - 3
  lambda t: 1 - (1 - t) * (1 - t), # out quad - 4
  lambda t: t ** 2, # in quad - 5
  lambda t: -(math.cos(math.pi * t) - 1) / 2, # io sine - 6
  lambda t: 2 * (t ** 2) if t < 0.5 else 1 - (-2 * t + 2) ** 2 / 2, # io quad - 7
  lambda t: 1 - (1 - t) ** 3, # out cubic - 8
  lambda t: t ** 3, # in cubic - 9
  lambda t: 1 - (1 - t) ** 4, # out quart - 10
  lambda t: t ** 4, # in quart - 11
  lambda t: 4 * (t ** 3) if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2, # io cubic - 12
  lambda t: 8 * (t ** 4) if t < 0.5 else 1 - (-2 * t + 2) ** 4 / 2, # io quart - 13
  lambda t: 1 - (1 - t) ** 5, # out quint - 14
  lambda t: t ** 5, # in quint - 15
  lambda t: 1 if t == 1 else 1 - 2 ** (-10 * t), # out expo - 16
  lambda t: 0 if t == 0 else 2 ** (10 * t - 10), # in expo - 17
  lambda t: (1 - (t - 1) ** 2) ** 0.5, # out circ - 18
  lambda t: 1 - (1 - t ** 2) ** 0.5, # in circ - 19
  lambda t: 1 + 2.70158 * ((t - 1) ** 3) + 1.70158 * ((t - 1) ** 2), # out back - 20
  lambda t: 2.70158 * (t ** 3) - 1.70158 * (t ** 2), # in back - 21
  lambda t: (1 - (1 - (2 * t) ** 2) ** 0.5) / 2 if t < 0.5 else (((1 - (-2 * t + 2) ** 2) ** 0.5) + 1) / 2, # io circ - 22
  lambda t: ((2 * t) ** 2 * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2 if t < 0.5 else ((2 * t - 2) ** 2 * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2, # io back - 23
  lambda t: 0 if t == 0 else (1 if t == 1 else 2 ** (-10 * t) * math.sin((t * 10 - 0.75) * (2 * math.pi / 3)) + 1), # out elastic - 24
  lambda t: 0 if t == 0 else (1 if t == 1 else - 2 ** (10 * t - 10) * math.sin((t * 10 - 10.75) * (2 * math.pi / 3))), # in elastic - 25
  lambda t: 7.5625 * (t ** 2) if (t < 1 / 2.75) else (7.5625 * (t - (1.5 / 2.75)) * (t - (1.5 / 2.75)) + 0.75 if (t < 2 / 2.75) else (7.5625 * (t - (2.25 / 2.75)) * (t - (2.25 / 2.75)) + 0.9375 if (t < 2.5 / 2.75) else (7.5625 * (t - (2.625 / 2.75)) * (t - (2.625 / 2.75)) + 0.984375))), # out bounce - 26
  lambda t: 1 - (7.5625 * ((1 - t) ** 2) if ((1 - t) < 1 / 2.75) else (7.5625 * ((1 - t) - (1.5 / 2.75)) * ((1 - t) - (1.5 / 2.75)) + 0.75 if ((1 - t) < 2 / 2.75) else (7.5625 * ((1 - t) - (2.25 / 2.75)) * ((1 - t) - (2.25 / 2.75)) + 0.9375 if ((1 - t) < 2.5 / 2.75) else (7.5625 * ((1 - t) - (2.625 / 2.75)) * ((1 - t) - (2.625 / 2.75)) + 0.984375)))), # in bounce - 27
  lambda t: (1 - (7.5625 * ((1 - 2 * t) ** 2) if ((1 - 2 * t) < 1 / 2.75) else (7.5625 * ((1 - 2 * t) - (1.5 / 2.75)) * ((1 - 2 * t) - (1.5 / 2.75)) + 0.75 if ((1 - 2 * t) < 2 / 2.75) else (7.5625 * ((1 - 2 * t) - (2.25 / 2.75)) * ((1 - 2 * t) - (2.25 / 2.75)) + 0.9375 if ((1 - 2 * t) < 2.5 / 2.75) else (7.5625 * ((1 - 2 * t) - (2.625 / 2.75)) * ((1 - 2 * t) - (2.625 / 2.75)) + 0.984375))))) / 2 if t < 0.5 else (1 +(7.5625 * ((2 * t - 1) ** 2) if ((2 * t - 1) < 1 / 2.75) else (7.5625 * ((2 * t - 1) - (1.5 / 2.75)) * ((2 * t - 1) - (1.5 / 2.75)) + 0.75 if ((2 * t - 1) < 2 / 2.75) else (7.5625 * ((2 * t - 1) - (2.25 / 2.75)) * ((2 * t - 1) - (2.25 / 2.75)) + 0.9375 if ((2 * t - 1) < 2.5 / 2.75) else (7.5625 * ((2 * t - 1) - (2.625 / 2.75)) * ((2 * t - 1) - (2.625 / 2.75)) + 0.984375))))) / 2, # io bounce - 28
  lambda t: 0 if t == 0 else (1 if t == 0 else (-2 ** (20 * t - 10) * math.sin((20 * t - 11.125) * ((2 * math.pi) / 4.5))) / 2 if t < 0.5 else (2 ** (-20 * t + 10) * math.sin((20 * t - 11.125) * ((2 * math.pi) / 4.5))) / 2 + 1) # io elastic - 29
]
```

