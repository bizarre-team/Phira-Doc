# `glitch`

Glitch / corruption effect. Produces irregular flickering over time.

![Example](image/glitch.png)

## Parameters

- `power` (float, default `0.3`): Flicker strength.
- `rate` (float, default `0.6`, range 0–1): Flicker frequency. `0` means it never flickers, and `1` means it always flickers.
- `speed` (float, default `5.0`): Speed of the glitch animation.
- `blockCount` (float, default `30.5`): Approximate number of displaced bands; see the image above.
- `colorRate` (float, default `0.01`, range 0–1): Distance of the chromatic offset.
