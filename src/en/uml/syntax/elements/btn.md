# Button Element `btn`

```js
btn(id, r, action)
```

- `id` (optional): element ID
- `r` (required): display rectangle, type `Rect`
- `action` (optional): click action; see [data types](../type.md#data-types)

After the element is defined, its `id` also provides the following values in addition to the `Rect`:

- `id.pressing`: 1 if the button is currently pressed, 0 otherwise
- `id.last`: time of last press in seconds; -1 if never pressed
- `id.count`: number of times the button has been pressed
