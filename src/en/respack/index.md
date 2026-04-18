# Resource Packs

In Phira, you can use custom resource packs. A resource pack can include note skins, particle effects, hit sounds, and more. You can find resource packs in test groups or community channels, or make your own. This page explains the file structure of a resource pack.

## Structure

A resource pack is a single zip archive containing a config file named `info.yml` plus other resource files. Some files are required, while others are optional.

### Resource Files

Required files:

- `click.png` and `click_mh.png`: skins for Click notes; `mh` indicates multi-note;
- `drag.png` and `drag_mh.png`: skins for Drag notes; `mh` indicates multi-note;
- `flick.png` and `flick_mh.png`: skins for Flick notes; `mh` indicates multi-note;
- `hold.png` and `hold_mh.png`: skins for Hold notes; `mh` indicates multi-note;
- `hit_fx.png`: Hit effect image.

Optional (defaults used if missing):

- `click.ogg`, `drag.ogg`, `flick.ogg`: hit sounds for the corresponding note types. The sample rate must be 44100 Hz, otherwise `prpr-render` may crash during rendering;
- `ending.ogg`: Result screen background music.

### Configuration

The config file uses YAML. Required fields are shown below, using the default resource pack as an example:

```yml
name: Default
author: "Mivik & MisaLiu"
hitFx: [5, 6]
holdAtlas: [50, 50]
holdAtlasMH: [50, 110]
```

- `name`: resource pack name;
- `author`: resource pack author;
- `description`: resource pack description;
- `hitFx`: frame count of the hit effect image, in `[width, height]`. The hit effect stores multiple animation frames in a single image, so you need to specify how many frames there are horizontally and vertically. For example, in this image<tooltip> ![image](/assets/img/respack/hit_fx.jpg) </tooltip>, the horizontal and vertical frame counts are 5 and 6 respectively. The last row is hard to see, but it does exist. The example image uses a black background for clarity; when making a resource pack, you should use a transparent background instead;
- `holdAtlas`: tail and head heights of the Hold texture. A Hold skin is **a single image** whose tail, body, and head are arranged from top to bottom. The two numbers in `holdAtlas` specify the tail height and head height. For example, in this image<tooltip> <img src="/assets/img/respack/hold.png" width="50%"> </tooltip>, both values are 50 pixels;
- `holdAtlasMH`: similar to the previous item, but for multi-note Holds.

Optional fields:

- `hitFxDuration` (float, default `0.5`): duration of the hit effect, in seconds;
- `hitFxScale` (float, default `1.0`): scale of the hit effect;
- `hitFxRotate` (bool, default `false`): whether the hit effect rotates with the note;
- `hitFxTinted` (bool, default `true`): whether the hit effect is tinted according to the judge line color;
- `hideParticles` (bool, default `false`): whether to hide the square particle effect on hit;
- `holdKeepHead` (bool, default `false`): whether to keep showing the Hold head after it reaches the line;
- `holdRepeat` (bool, default `false`): whether the middle part of the Hold uses repeated stretching. In this image set<tooltip> ![example](/assets/img/respack/hold_repeat.jpg) </tooltip>, from left to right you can see the Hold texture image, the Hold body with `holdRepeat` disabled, and the Hold body with `holdRepeat` enabled;
- `holdCompact` (bool, default `false`): whether to overlap the Hold head and tail with the Hold body by centering the anchor point. Using the same example<tooltip> ![example](/assets/img/respack/hold_repeat.jpg) </tooltip>, if `holdCompact` is disabled, the Hold head and tail are separated from the middle section as shown in the left image. The two images on the right both show the effect with `holdCompact` enabled;
- `colorPerfect` (hex color, default `0xe1ffec9f`): Judge line color for AP (All Perfect);
- `colorGood` (hex color, default `0xebb4e1ff`): Judge line color for FC (Full Combo).
