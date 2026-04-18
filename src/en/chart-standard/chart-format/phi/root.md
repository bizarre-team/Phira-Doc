# Phigros Official Chart Root Structure

The official Phigros chart format and its rendering behavior are relatively well established. All time units use `128th notes`, that is, `60 / 32 / bpm`, abbreviated below as `1.875 / bpm`.

## Chart Root Structure

### formatVersion

- `formatVersion` is an `int`.
- It affects how judge line move events are parsed.
- Possible values: `1`, `3`, or others.

### offset

- `offset` is a `float`.
- Chart delay in seconds.
- Positive: chart is ahead of music; negative: chart is behind.

### judgeLineList

- `judgeLineList` is a `JsonArray` of `JsonObject`s, and each object represents one [judge line](./judgeLine.md).
