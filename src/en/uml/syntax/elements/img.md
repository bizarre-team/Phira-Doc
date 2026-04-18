# Image Element `img`

```js
img(id, url, r, c, t)
```

- `id` (optional): element ID
- `url` (required): image URL in double quotes
- `r` (required): display rectangle, type `Rect`
- `c` (optional, default `"white"`): tint color. Semi-transparent color makes the image semi-transparent
- `t` (optional, default `cropCenter`): fit mode:
  - `cropCenter`: keep aspect ratio, crop from center so `r` is filled
  - `inside`: keep aspect ratio, fit image inside `r`
  - `fit`: stretch to `r`
