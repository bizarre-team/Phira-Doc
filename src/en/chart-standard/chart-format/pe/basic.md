# Basic Information  

This page describes some basic information about the chart. Note that PEC does **not** store chart metadata (such as song title, charter, etc.); such information must be obtained from other sources.  
PEC supports a maximum of `30` judgelines. PhiEditor does not allow creating more judgelines.  
PhiEditor does not support XY separation.

## Coordinate System  

The center of the screen is point `(0, 0)`.  
The bottom‑left corner has coordinates `(-1024, -700)`.  
The top‑right corner has coordinates `(1024, 700)`.

## Chart Offset  

The first line of a PEC file is the chart’s `offset`, in milliseconds, given as an integer.

## BPM List  

In PEC, lines starting with `bp` are BPM list entries. Example:

```txt
bp 0.000 180.000
```

This indicates that at beat `0.000`, the BPM is `180.000`.
