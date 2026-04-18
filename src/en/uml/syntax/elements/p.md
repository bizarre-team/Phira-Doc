# Paragraph Element `p`

```js
p(id, x, y, ax, ay, size, ml, mw, bl, c) {
   Text
}
```

- `id` (optional): element ID
- `x` (optional, default 0): text X coordinate
- `y` (optional, default 0): text Y coordinate
- `ax` (optional, default 0): horizontal alignment in [0,1]; 0 = left at x, 1 = right, 0.5 = center
- `ay` (optional, default 0): vertical alignment, using the same idea
- `size` (optional, default 1): text size
- `ml` (optional, default false): multi-line; only meaningful if `mw` is set
- `mw` (optional): max width; in single-line mode text is clipped; in multi-line it wraps
- `bl` (optional, default true): use baseline for vertical alignment
- `c` (optional, default `"white"`): text color
- `Text` (required): content

> The position of `p` is not defined by a full `Rect`, but you can still use the element's `id` to obtain its `Rect`.
