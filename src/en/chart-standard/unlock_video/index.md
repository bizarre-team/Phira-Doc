# Unlock Animation

**Note that unlock animations and video backgrounds are different features.**

An unlock animation lets a video play before the player starts the chart for the first time.

## How to use

The UI for this feature is not fully implemented yet, so the setup process is a bit cumbersome. The steps below are easiest to perform on Windows.

If your chart already has `info.yml`, skip to step 3.

1. Import your chart in Phira.
2. In `data/charts/custom`, find the folder for your chart (e.g. by chart ID such as `9067228`), open it, find `info.yml`, and copy it into your chart folder (the one from unpacking the pez, not the imported folder).
3. Add the unlock video file to your chart folder (again, the unpacked pez folder). Assume the file is named `unlock.mp4`.
4. In `info.yml`, find the line `unlockVideo: null` and change it to `unlockVideo: unlock.mp4` (or add this line if it is missing).
5. Re-import your chart.
