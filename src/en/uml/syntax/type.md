# Data Types

UML has these types:

## Float

Single-precision floating-point value. Any numeric literal is a `Float`.

## Rect

A rectangle, defined as `[left, top, width, height]`, meaning top-left X, top-left Y, width, and height.

After definition, a Rect has read-only properties:

- `Rect.l` or `Rect.x`: left (x)
- `Rect.t` or `Rect.y`: top (y)
- `Rect.w`: width
- `Rect.h`: height
- `Rect.r`: right (x)
- `Rect.b`: bottom (y)
- `Rect.cx`: center x
- `Rect.cy`: center y

## Bool

Boolean value: `true` or `false`. Currently used only in element attributes.

## String

Double-quoted text. Used for button actions, colors, and URLs:

- **Color**: hex RGB or ARGB (e.g. `"#ff0000"`, `"#7fffffff"`) or name: `"white"`, `"black"`, `"red"`, `"blue"`, `"yellow"`, `"green"`, `"gray"`.
- **Action**: button action. Values: `"join"` (join event), `"open:url"` (open URL).
- **URL**: web address.
