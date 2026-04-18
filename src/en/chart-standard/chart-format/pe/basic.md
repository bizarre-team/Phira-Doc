# Basic Information  

This page covers some basic information about PEC charts. **Note that PEC does not store chart metadata** such as the song title or charter name, so that information must be obtained elsewhere.  
PEC supports a maximum of `30` judge lines. PhiEditor does not allow creating more judge lines.  
PhiEditor does not support XY separation.

## Coordinate System  

### In the Editor

The center of the screen is point `(0, 0)`.  
The bottom‑left corner has coordinates `(-1024, -700)`.  
The top‑right corner has coordinates `(1024, 700)`.  
Angles are positive counter-clockwise and negative clockwise.

### In the File

The center of the screen is point `(1024, 700)`.  
The bottom‑left corner has coordinates `(0, 0)`.  
The top‑right corner has coordinates `(2048, 1400)`.  
Angles are positive clockwise and negative counter-clockwise.

## Chart Offset  

The first line of a PEC file is the chart's `offset`, measured in milliseconds and stored as an integer.

## BPM List  

In PEC, lines starting with `bp` are BPM list entries. Example:

```txt
bp 0.000 180.000
```

This indicates that at beat `0.000`, the BPM is `180.000`.
