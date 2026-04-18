# Comment Expressions

Comment expressions are a special kind of comment retained for backward compatibility. Unlike ordinary comments, they are executable. Their format is:

```js
#>exp(attr1: value1, attr2: value2, ...)
```

Here, `exp` is the expression type. The parentheses contain optional attributes. Many comment expressions must be followed by `#>pop` to end their scope, which runs from the line where the expression appears to the next `#>pop`.

## End `#>pop`

```js
#>pop
```

Ends the scope of the previous comment expression.

## Rotate `#>rot`

```js
#>rot(angle, cx, cy)
```

- `angle` (required): angle in radians
- `cx`, `cy` (required): center x and y

## Translate `#>tr`

```js
#>tr(dx, dy)
```

- `dx` (optional, default 0): horizontal offset
- `dy` (optional, default 0): vertical offset

## Alpha `#>alpha`

```js
#>alpha(a)
```

- `a` (optional, default 0): opacity in [0,1]; 0 transparent, 1 opaque

## Matrix `#>mat`

```js
#>mat(x00, x01, ..., x33)
```

4×4 matrix entries (default 0). Used for scale, translate, rotate, etc.

## Conditional `#>if` etc.

```js
#>if(condition)
#>elif(condition)
#>else
#>fi
```

- `condition`: any expression; 0 is false, non-zero is true. Use `#>fi` to end, not `#>pop`.

## Legacy compatibility `#>if-no-v2`

```js
#>if-no-v2
```

If your UML uses features not in V2, wrap content in this so older clients can be prompted to upgrade. In V1, comment expressions are ignored; `#if-no-v2` effectively ignores its block.
