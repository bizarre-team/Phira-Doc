# Chart Info Format

Chart info is metadata ([Wikipedia](https://en.wikipedia.org/wiki/Metadata)) that describes basic information about a chart besides the chart data itself, such as author, illustration, and music.

There are two variants: [ChartInfo](https://github.com/TeamFlos/phira/blob/207c4724146c5a48c4e304d6e20447a39a72e0d3/prpr/src/info.rs#L17) and [BriefChartInfo](https://github.com/TeamFlos/phira/blob/207c4724146c5a48c4e304d6e20447a39a72e0d3/phira/src/data.rs#L21). Chart info (`ChartInfo`) is stored in YAML; the chart’s `info.yml` file is an instance of `ChartInfo`.

On local import, all `ChartInfo` fields are filled automatically. The YAML format is straightforward; if you want to fill it and pack for import, pay attention to the following fields.

## `ChartInfo`

> [!NOTE]
> Refer to the [source code](https://github.com/TeamFlos/phira/blob/main/prpr/src/info.rs) for the current definition.

### Chart ID `id` <Badge type="info" text="optional" />

`i32`, default empty

Unique chart ID, aligned with the server. The Phira client uses it to decide whether to update the chart.

Leave empty for local charts.

### Uploader ID `uploader` <Badge type="info" text="optional" />

`i32`, default empty

Unique uploader ID, aligned with the server; used to show uploader for online charts.

Leave empty for local charts.

### Chart name `name` <Badge type="warning" text="required" />

`String`, default `"UK"`

Display name of the chart.

### Difficulty `difficulty` <Badge type="warning" text="required" />

`f32`, default `10.0`

Numeric difficulty. Use a sensible value.

### Level `level` <Badge type="warning" text="required" />

`String`, default `"UK Lv.10"`

Level text shown at the bottom-right during play.

### Charter `charter` <Badge type="warning" text="required" />

`String`, default `"UK"`

Chart creator.

### Composer `composer` <Badge type="warning" text="required" />

`String`, default `"UK"`

Music composer.

### Illustrator `illustrator` <Badge type="warning" text="required" />

`String`, default `"UK"`

Illustration artist for the chart.

### Chart filename `chart` <Badge type="warning" text="required" />

`String`, default `"chart.json"`

Filename of the chart file. RPE charts are usually `chart.json`; PE charts are often `xxx.pec`.

### Chart format `format` <Badge type="info" text="optional" />

[ChartFormat](https://github.com/TeamFlos/phira/blob/dad7d6f3a8535cabfb70ec3f954d774948c440f9/prpr/src/info.rs#L7) enum, default empty

Chart format. Do not set manually; the Phira client detects and writes it. Listed here for completeness.

### Music filename `music` <Badge type="warning" text="required" />

`String`, default `"song.mp3"`

Filename of the music file.

### Illustration filename `illustration` <Badge type="warning" text="required" />

`String`, default `"background.png"`

Filename of the illustration.

### Unlock video `unlockVideo` <Badge type="info" text="optional" />

`String`, default empty

Filename of the video that unlocks this chart.

### Preview start `previewStart` <Badge type="warning" text="required" />

`f32`, default `0.0`

Start time of the music preview (seconds).

### Preview end `previewEnd` <Badge type="info" text="optional" />

`f32`, default empty

End time of the music preview (seconds). If empty, 15.0 seconds after preview start; clamped to track end.

> Source: [clamping](https://github.com/TeamFlos/phira/blob/dad7d6f3a8535cabfb70ec3f954d774948c440f9/phira/src/scene/song.rs#L94)

### Aspect ratio `aspectRatio` <Badge type="warning" text="required" />

`f32`, default `16.0 / 9.0`

> [!NOTE]
> The aspect ratio displayed on the chart will be adjusted according to the device's aspect ratio. If the device's aspect ratio is greater than this value (e.g., some extended phones, or if this value is set to 4:3 on a regular phone), the chart will be kept at this aspect ratio. If the aspect ratio is less than this value, the chart will be stretched to fill the screen. (Source: TBD)

### Background dim `backgroundDim` <Badge type="warning" text="required" />

`f32`, default `0.6`

Background dimming: opacity of the overlay rectangle over the background.

### Judge line length `lineLength` <Badge type="warning" text="required" />

`f32`, default `6.0`

Length of the judge line in the chart (units TBD; relates to rendering).

### Chart offset `offset` <Badge type="warning" text="required" />

`f32`, default `0.0`

Time offset between chart and music (seconds). When positive (compared to when it is zero):

- If the music starts simultaneously in both cases, the chart starts later when `offset` is positive.
- If the chart starts simultaneously in both cases, the music starts earlier when `offset` is positive.

### Tip `tip` <Badge type="info" text="optional" />

`String`, default empty

Tip text. If empty, a default tip may be shown.

### Tags `tags` <Badge type="warning" text="required" />

`String` array, default empty

Tags for categorization and search. Tag docs TBD.

### Intro `intro` <Badge type="warning" text="required" />

`String`, default empty

Short description of the chart.

### Hold partial cover `holdPartialCover` <Badge type="warning" text="required" />

`bool`, default `false`

Hold note mask position: `true` = tail, otherwise head.

### Created `created` <Badge type="info" text="optional" />

`DateTime<Utc>`, default empty

Creation time. Do not set manually; written by the Phira client.

### Updated `updated` <Badge type="info" text="optional" />

`DateTime<Utc>`, default empty

Last update time for local charts. Do not set manually; written by the Phira client.

### Chart updated `chartUpdated` <Badge type="info" text="optional" />

`DateTime<Utc>`, default empty

Last update time for cloud charts. Do not set manually; written by the Phira client. Used to decide whether to update the chart.

## BriefChartInfo

`BriefChartInfo` is a reduced form of `ChartInfo` for contexts where full info is not needed. Main fields:

TBD
