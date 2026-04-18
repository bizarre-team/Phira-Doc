# Elements

Elements are visible or interactive objects on the event page. They are defined as:

```js
type(attr1: value1, attr2: value2, ...) { Hello! }
```

Here, `type` is the element type, and `attrN` / `valueN` are attribute names and values. The available attributes depend on the element type. Required attributes are marked in each element's documentation.

The `id` attribute is an optional attribute shared by all elements. After an element is defined, its `id` automatically corresponds to a `Rect` variable representing that element's drawing bounds.

The trailing `{ Hello }` block is optional text content. It applies only to the `p` (paragraph) element.
