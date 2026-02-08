# Controls

Controls are an RPE feature that allows you to adjust various note parameters in a keyframe‑based manner.

## Alpha Control

| Field Name | Type | Description | Default Value | Version Added |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| `easing` | `int` | Easing type to the next keyframe value. See [reference table](./extend.md#easingType). | `1` | – |
| `alpha` | `float` | Note opacity. | `1.0` | – |
| `x` | `float` | Vertical distance between the note and the judgeline. | – | – |

- `alpha control` controls the opacity of notes.
- It can be used together with the note’s `alpha` field without conflict. The blending formula is: `noteAlpha = noteAlpha * nowAlpha` (after converting from 0–255 to 0–1).

### Behavior

When `alpha control` is defined as follows:

```json
{
  "alphaControl": [
    {
      "alpha": 1.0,
      "easing": 1,
      "x": 0.0
    },
    {
      "alpha": 0.5,
      "easing": 2,
      "x": 100.0
    },
    {
      "alpha": 1.0,
      "easing": 1,
      "x": 9999999.0
    }
  ]
}
```

- The note’s opacity is `0.5` until it is `100` y‑coordinate units away from the judgeline.  
- After that, it eases to opacity `1.0` using the `Out Sine` easing function until it reaches the judgeline.

## Size Control

| Field Name | Type | Description | Default Value | Version Added |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| `easing` | `int` | Easing type to the next keyframe value. See [reference table](./extend.md#easingType). | `1` | – |
| `size` | `float` | Note size multiplier. | `1.0` | – |
| `x` | `float` | Vertical distance between the note and the judgeline. | – | – |

- `size control` truly controls the note’s overall size, not just its width.
- It can be used together with the note’s width field without conflict.
- Does not affect the size of `Hold`‑type notes.

### Behavior

When `size control` is defined as follows:

```json
{
  "sizeControl": [
    {
      "easing": 1,
      "size": 1.0,
      "x": 0.0
    },
    {
      "easing": 2,
      "size": 1.5,
      "x": 200.0
    },
    {
      "easing": 1,
      "size": 1.0,
      "x": 9999999.0
    }
  ]
}
```

- The note’s size is `1.5` times its original size until it is `200` y‑coordinate units away from the judgeline.  
- After that, it eases to `1.0` times its original size using the `Out Sine` easing function until it reaches the judgeline.

## pos Control (X Control)  

| Field Name | Type | Description | Default Value | Version Added |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| `easing` | `int` | Easing type to the next keyframe value. See [reference table](./extend.md#easingType). | `1` | – |
| `pos` | `float` | Multiplier for the note’s `positionX` parameter. | – | – |
| `x` | `float` | Vertical distance between the note and the judgeline. | – | – |

- `pos control` dynamically controls the multiplier for the note’s `positionX`.

### Behavior  

When `pos control` is defined as follows:

```json
{
  "posControl": [
    {
      "easing": 1,
      "pos": 2.0,
      "x": 0.0
    },
    {
      "easing": 2,
      "pos": 1.0,
      "x": 100.0
    },
    {
      "easing": 1,
      "pos": 1.0,
      "x": 9999999.0
    }
  ]
}
```

- The note’s `positionX` is `2.0` times its original value until it is `100` y‑coordinate units away from the judgeline.  
- After that, it eases to `1.0` times its original `positionX` using the `Out Sine` easing function until it coincides with the judgeline.

## y Control  

|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| `easing` | `int` | Easing type to the next keyframe value. See [reference table](./extend.md#easingType). | `1` | – |
| `y` | `float` | (To be documented) | – | – |
| `x` | `float` | Vertical distance between the note and the judgeline. | – | – |

- Behaviors are to be documented.

## Skew Control  

| Field Name | Type | Description | Default Value | Version Added |
|:------:|:-----:|:----------------------------------------------:|:---:|:----:|
| `easing` | `int` | Easing type to the next keyframe value. See [reference table](./extend.md#easingType). | `1` | – |
| `skew` | `float` | (To be documented) | – | – |
| `x` | `float` | Vertical distance between the note and the judgeline. | – | – |

- Has no effect on `Hold`‑type notes.
- Behaviors are to be documented.
