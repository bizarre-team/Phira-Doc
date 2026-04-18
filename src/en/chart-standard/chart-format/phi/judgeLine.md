# judgeLine

Each judge line has these fields:

| Field name | Type | Description |
|:------------------------:|:---------:|:---------:|
| bpm | float | BPM for this line |
| notesAbove | JsonArray | Notes falling from front |
| notesBelow | JsonArray | Notes falling from back |
| speedEvents | JsonArray | Speed events |
| judgeLineMoveEvents | JsonArray | Move events |
| judgeLineRotateEvents | JsonArray | Rotate events |
| judgeLineDisappearEvents | JsonArray | Opacity events |

- **All event and note time fields use the unit `1.875 / bpm` seconds.**
- **Definitions:** a "width unit" equals `0.05625 * chart render width`, and a "height unit" equals `0.6 * chart render height`.
- [Events](./event.md)
- [Note](./note.md)
