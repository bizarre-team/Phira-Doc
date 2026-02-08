# Event

This page describes all judge line events.

## speedEvent

| Field | Type | Description | Unit |
|:-------------:|:-----:|:-----------------------------------:|:-------------:|
| startTime | float | Event start time | `1.875 / bpm` |
| endTime | float | Event end time | `1.875 / bpm` |
| value | float | Event value | height unit |
| floorPosition | float | Total speed passed at event start (for computation only; absent in newer versions) | height unit |

## judgeLineMoveEvent

| Field | Type | Description | Unit |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | float | Event start time | `1.875 / bpm` |
| endTime | float | Event end time | `1.875 / bpm` |

- For `formatVersion` `1`:

| Field | Type | Description | Unit |
|:-----:|:---:|:-------:|:--:|
| start | int | Start coordinate | - |
| end | int | End coordinate | - |

- Coordinate calculation (Python):
  - `x = (v - v % 1000) // 1000`
  - `y = v % 1000`
  - Units:
    - `x`: `1 / 880` of the chart width
    - `y`: `1 / 520` of the chart height
- Conversion to formatVersion 3 coordinates (Python):
  - Original event denoted as `e`, new event as `ne`
  - `ne.start = (e.start - e.start % 1000) // 1000`
  - `ne.end = (e.end - e.end % 1000) // 1000`
  - `ne.start2 = e.start % 1000`
  - `ne.end2 = e.end % 1000`

- For `formatVersion` `3`:

| Field | Type | Description | Unit |
|:------:|:-----:|:-------:|:--------:|
| start | float | Start x | chart width |
| end | float | End x | chart width |
| start2 | float | Start y | chart height |
| end2 | float | End y | chart height |

### judgeLineRotateEvent

| Field | Type | Description | Unit |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | int | Event start time | `1.875 / bpm` |
| endTime | int | Event end time | `1.875 / bpm` |
| start | float | Start value | angle |
| end | float | End value | angle |

### judgeLineDisappearEvent

| Field | Type | Description | Unit |
|:---------:|:-----:|:-------:|:-------------:|
| startTime | float | Event start time | `1.875 / bpm` |
| endTime | float | Event end time | `1.875 / bpm` |
| start | float | Start value | - |
| end | float | End value | - |
