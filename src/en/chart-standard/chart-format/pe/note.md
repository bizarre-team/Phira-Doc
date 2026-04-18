# Notes

Notes are another major part of the chart. Example:

```text
n1 0 0.500 -40.000 1 0
# 1.00
& 1.00

n2 0 0.250 2.000 -320.000 1 0
# 1.00
& 1.00
```

## Fields

- Lines that start with `n` followed by a digit represent notes. The digit indicates the note type:

| Value | Description |
|:---:|:-----:|
|  1  |  Tap  |
|  2  | Hold  |
|  3  | Flick |
|  4  | Drag  |

- For all except `n2`:
```text
ntype judge_line hit_beat X from_below fake
# speed multiplier
& width multiplier
```
- For `n2` (Hold):
```text
n2 judge_line start_beat end_beat X from_below fake
# speed multiplier
& width multiplier
```
- `from_below`: `2` means the note comes from below, and `1` means it comes from above.
- `fake`: `1` = fake note.
