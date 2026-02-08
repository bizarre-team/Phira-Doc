# Extended Events

This page explains RPE's extended events, commonly known as storyboard events, located at the fifth level of event editing.  
Each event field corresponds to a `JsonArray`, where each element represents one event.  
**Except for `inclineEvents` (tilt events), all other events have no corresponding field when not in use.**

## colorEvents

Color events control the color of judgment lines or textures. They contain the following fields:

| Field Name | Type | Description | Default Value | Version Added |
| :---: | :---: | :---: | :---: | :---: |
| bezier | `int` | Whether easing is a Bézier curve. `0` means no, `1` means yes. | `0` | – |
| `bezierPoints` | `float[4]` | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | `[ 0.0, 0.0, 0.0, 0.0 ]` | – |
| `easingLeft` | `float` | Left easing boundary. Minimum `0.0`, maximum `1.0`. | `0.0` | – |
| `easingRight` | `float` | Right easing boundary. Minimum `0.0`, maximum `1.0`. | `1.0` | – |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – |
| `linkgroup` | `int` | – | – | – |
| `start` | `int[3]` | Start color. The three values correspond to `R`, `G`, `B`. Maximum `255`, minimum `0`. | – | – |
| `startTime` | [beat](./beat.md) | Event start time. | – | – |
| `end` | `int[3]` | End color. The three values correspond to `R`, `G`, `B`. Maximum `255`, minimum `0`. | – | – |
| `endTime` | [beat](./beat.md) | Event end time. | – | – |

## scaleXEvents

X‑axis scaling events control the width scaling of judgelines, textures, or text. They contain the following fields:

| Field Name | Type | Description | Default Value | Version Added |
| :---: | :---: | :---: | :---: | :---: |
| `bezier` | `int` | Whether easing is a Bézier curve. `0` means no, `1` means yes. | `0` | – |
| `bezierPoints` | `float[4]` | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | `[ 0.0, 0.0, 0.0, 0.0 ]` | – |
| `easingLeft` | `float` | Left easing boundary. Minimum `0.0`, maximum `1.0`. | `0.0` | – |
| `easingRight` | `float` | Right easing boundary. Minimum `0.0`, maximum `1.0`. | `1.0` | – |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – |
| `linkgroup` | `int` | – | – | – |
| `start` | `float` | Start scaling value. | `1` | – |
| `startTime` | [beat](./beat.md) | Event start time. | – | – |
| `end` | `float` | End scaling value. | `1` | – |
| `endTime` | [beat](./beat.md) | Event end time. | – | – |

## scaleYEvents

Y‑axis scaling events control the height scaling of judgelines, textures, or text. They contain the following fields:

| Field Name | Type | Description | Default Value | Version Added |
| :---: | :---: | :---: | :---: | :---: |
| `bezier` | `int` | Whether easing is a Bézier curve. `0` means no, `1` means yes. | `0` | – |
| `bezierPoints` | `float[4]` | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | `[ 0.0, 0.0, 0.0, 0.0 ]` | – |
| `easingLeft` | `float` | Left easing boundary. Minimum `0.0`, maximum `1.0`. | `0.0` | – |
| `easingRight` | `float` | Right easing boundary. Minimum `0.0`, maximum `1.0`. | `1.0` | – |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – |
| `linkgroup` | `int` | – | – | – |
| `start` | `float` | Start scaling value. | `1` | – |
| `startTime` | [beat](./beat.md) | Event start time. | – | – |
| `end` | `float` | End scaling value. | `1` | – |
| `endTime` | [beat](./beat.md) | Event end time. | – | – |

## textEvents

Text events control the display of text. They contain the following fields:

| Field Name | Type | Description | Default Value | Version Added |
| :---: | :---: | :---: | :---: | :---: |
| `bezier` | `int` | Whether easing is a Bézier curve. `0` means no, `1` means yes. | `0` | – |
| `bezierPoints` | `float[4]` | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | `[ 0.0, 0.0, 0.0, 0.0 ]` | – |
| `easingLeft` | `float` | Left easing boundary. Minimum `0.0`, maximum `1.0`. | `0.0` | – |
| `easingRight` | `float` | Right easing boundary. Minimum `0.0`, maximum `1.0`. | `1.0` | – |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – |
| `linkgroup` | `int` | – | – | – |
| `start` | `string` | Start text. | – | – |
| `startTime` | [beat](./beat.md) | Event start time. | – | – |
| `end` | `string` | End text. | – | – |
| `endTime` | [beat](./beat.md) | Event end time. | – | – |
| `font` | `string` | Font name (**see explanation below**). | **see below** | – |

- **Starting from version `152`, the `font` field will not be present when using the default `cmdysj` font. It only appears when a custom font is used.**
- **Before version `152`, the `font` field always existed and defaulted to `cmdysj`.**

Applying easing to text events may have no effect or cause undefined errors that crash the simulator. For details, see [this issue](https://github.com/TeamFlos/phira/issues/252).
- When the text contains `%P%`, numbers in the text can change dynamically according to the easing during event playback.
- A judgeline with a text event will always be hidden, displaying only the text (even when no text event is playing), and any custom texture will be cleared.
- If a text event exists but no color event is present, the text will always be white.
- Starting from version `153`, text in text events can contain the `\n` newline character (other escape sequences are not supported).

## paintEvents

Brush events. This event was replaced by the `shader` editing feature in version `143` and can no longer be edited. It contains the following fields:

| Field Name | Type | Description | Default Value | Version Added | Version Removed |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `bezier` | `int` | Whether easing is a Bézier curve. `0` means no, `1` means yes. | `0` | – | 143 |
| `bezierPoints` | `float[4]` | Bézier control points. Effective when `bezier` is `1`. Refer to [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). | `[ 0.0, 0.0, 0.0, 0.0 ]` | – | 143 |
| `easingLeft` | `float` | Left easing boundary. Minimum `0.0`, maximum `1.0`. | `0.0` | – | 143 |
| `easingRight` | `float` | Right easing boundary. Minimum `0.0`, maximum `1.0`. | `1.0` | – | 143 |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – | 143 |
| `linkgroup` | `int` | – | – | – | 143 |
| `start` | `string` | Start brush size. | `0` | – | 143 |
| `startTime` | [beat](./beat.md) | Event start time. | – | – | 143 |
| `end` | `string` | End brush size. | `0` | – | 143 |
| `endTime` | [beat](./beat.md) | Event end time. | – | – | 143 |

- Other behaviors are to be documented.

## gifEvents

GIF playback progress events. This event was introduced in version `150` alongside GIF judgment line textures to control GIF playback.

| Field Name | Type | Description | Default Value | Version Added |
| :---: | :---: | :---: | :---: | :---: |
| `easingType` | `int` | Easing type. For details, see [extend](./extend.md#easingtype). | `1` | – |
| `linkgroup` | `int` | – | – | – |
| `start` | `float` | Start GIF playback progress. | – | – |
| `startTime` | [beat](./beat.md) | Event start time. | – | – |
| `end` | `float` | End GIF playback progress. | – | – |
| `endTime` | [beat](./beat.md) | Event end time. | – | – |

- If a judgment line texture is a GIF but no `gifEvents` exist, the GIF will loop automatically.
- The first frame of a GIF corresponds to `0.0` and the last frame to `1.0`. If playback progress exceeds this range, the GIF will loop automatically.
- If there is no `gifEvent` at the current playback progress, the GIF will loop automatically.
- Text events also clear this texture.
- GIFs larger than `15 MB` will cause RPE to display a decoding failure when loading the chart.
- When a texture is a GIF, the speed event editing is replaced by this event, so theoretically this event cannot appear simultaneously with a speed event.
- `gifEvents` located in other levels are ignored, and RPE error correction will mark them in red.

## inclineEvents

Tilt events. These are likely deprecated, but a placeholder event is left under the `extended` field by default.  
_This event cannot be edited in RPE._

- The start and end values of a tilt event represent the Z‑axis tilt angle of the judgeline.
- Specific behavior requires further documentation.
