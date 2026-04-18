# `noise`

Noise effect. Adds a layer of random blur to the image.

![Example](image/noise.png)

## Parameters

- `seed` (float, default `81.0`): Seed used to generate the random pattern. Continuously animating this value will make the pattern change continuously as well.
- `power` (float, default `0.03`, range 0–1): Amount of blur, that is, the range of pixel offset; see the image above.
