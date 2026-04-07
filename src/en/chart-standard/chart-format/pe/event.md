# Events

Events are a main part of the chart. There are instant events and easing events.

## Instant events

Instant events set the judge line value at the given beat immediately:

```text
cv 0 0.000 10.000
cv judge_line_index beat value

cp 0 0.000 1024.000 700.000
cp judge_line_index beat X Y

cd 0 0.000 0.000
cd judge_line_index beat rotation

ca 0 0.000 0
ca judge_line_index beat opacity
```

- `cv`: speed (velocity) instant event. Speed events do not support easing.
- `cp`: position instant event.
- `cd`: rotation instant event.
- `ca`: opacity instant event.

## Easing events

Easing events take the current value at start time as the start value and ease to the end value using the given easing.

```text
cm 0 1.000 2.000 2048.000 700.000 1
cm judge_line_index start_beat end_beat end_X end_Y easing_type

cr 0 1.000 2.000 0.000 1
cr judge_line_index start_beat end_beat end_rotation easing_type

cf 0 1.000 2.000 255
cf judge_line_index start_beat end_beat end_opacity
```

- Easing type codes match [RPE](../rpe/extend.md#easingType).
- `cm`: position easing.
- `cr`: rotation easing.
- `cf`: opacity easing (always linear, no easing type).

## Other notes

- Speed is a `float`, default `10.000`.
- Opacity is an `int`: `0` = fully transparent, `255` = fully opaque, `-1` = hide all notes on that line. Other behaviors are not fully documented.
