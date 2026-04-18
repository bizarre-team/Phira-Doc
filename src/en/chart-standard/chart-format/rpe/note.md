# Note

Each note has these parameters:

| Field | Type | Description | Default | Version |
|:------------------------------------------:|:-----------------:|:----------------------------------------------------:|:---------------:|:----:|
| above | int | 1 = from front of line, other = from back | 1 | - |
| alpha | int | Opacity; 0 transparent, 255 opaque | 255 | - |
| endTime | [beat](./beat.md) | End time; for type 2 (Hold) = Hold end, else = startTime | - | - |
| startTime | [beat](./beat.md) | Start time; for Hold = Hold start, else = endTime | - | - |
| isFake | int | 1 = fake, other = real | 0 | - |
| positionX | float | X offset from line center | - | - |
| size | float | Size multiplier (in RPE this is width only) | 1.0 | - |
| speed | float | Speed multiplier | 1.0 | - |
| type | int | Note type; see table below | - | - |
| visibleTime | float | Visible time in seconds | 999999.0 | - |
| yOffset | float | Y offset (positive = up); also moves hit effect | 0 | - |
| hitsound | string? | Custom hit sound path relative to chart root | - | 142 |
| judgeArea | float | Judge area width multiplier | 1.0 | 170 |
| <span style="color:red;">tint or color</span> | int[3] | Note color [R,G,B] 0–255 | [255,255,255] | 170 |
| tintHitEffects | int[3]? | Hit effect color [R,G,B] | [255,255,255] | 170 |


- The `size` field actually corresponds to width in RPE, so it controls only the width of a note rather than its full size.
- For `Hold` notes that fall from the back, the `above` field is `2` by default. For all other notes, it is `0`. If it is set to `1`, the note always falls from the front.
- The `hitsound` field does not exist if there is no custom sound effect.
- Fake notes have no judgment, hit effects, or sound effects. They do not contribute to scoring or note count. If a fake note is a `Hold`, it is always displayed in an unlit state.
- The `color` field is used to tint notes by applying vertex color multiplication, i.e., `noteColor = noteColor * color`.

::: danger
The `color` field was renamed over time. The name `color` was used during public testing, while later versions switched to `tint`. In practice, either field name may appear, but they mean the same thing, so implementations should remain compatible with both.
:::

- The `tintHitEffects` field is used to tint the hit effects of notes. When this field is present, regardless of whether the judgment is `Good` or `Perfect`, the hit effects will use this color (applied using the original material via vertex color calculation), with no additional computation required.

## Note types

| Value | Description |
|:-------:|:-----:|
| 1 | Tap |
| 2 | Hold |
| 3 | Flick |
| 4 | Drag |
| Default | Tap |
