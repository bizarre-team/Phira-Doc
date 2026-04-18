# Effects

Effects apply shader-based visuals to the whole chart over a period of time. They can be used to create visual results that are difficult or impossible to achieve with normal chart events alone. prpr includes several built-in shaders, and you can also write your own; see [Custom Shaders](./custom-shader.md).

## Format

Add an `effects` field to `extra.json`. Its value should be an array of `Effect` objects:

### Effect

```json
{
	"start": [0, 0, 1],
	"end": [0, 0, 1],
	"shader": "shader name",
	"global": false,
	"vars": {
		...
	}
}
```

`start` and `end` are the effect start and end time in the same format as RPE (`[bar, numerator, denominator]`).

`shader` is the shader name (built-in or custom).

`global` controls whether the effect affects UI (combo, pause button, etc.). Optional, default `false`.

`vars` is optional: a map from variable names to [animation variables](../index.md#animation-variables) used as shader parameters (uniforms). Example:

```json
{
	...,
	"vars": {
		"power": ...,
		"radius": ...
	}
}
```

## Example

This applies the built-in `chromatic` shader from `[2, 0, 1]` to `[4, 0, 1]`, with `power` animating from `0` to `0.1` and `sampleCount` fixed at `5`:

```json
{
	...,
	"effects": [
		{
			"start": [2, 0, 1],
			"end": [4, 0, 1],
			"shader": "chromatic",
			"vars": {
				"power": [
					{
						"startTime": [2, 0, 1],
						"endTime": [4, 0, 1],
						"easingType": 2,
						"start": 0.0,
						"end": 0.1
					}
				],
				"sampleCount": 5
			}
		}
	]
}
```

## Built-in shaders

See [built-in shaders](./builtin/chromatic) for the list and their parameters.
