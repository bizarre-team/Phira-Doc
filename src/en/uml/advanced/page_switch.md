# Page Switching

If we want the active interface to include multiple pages, we can place the content of other pages in areas beyond the screen edges and achieve an effect similar to page switching by moving all elements on the entire page.

For example, we can place the content for six pages (horizontally and vertically) like this:

```text
            |-----------|
            |   3, 2    |
            |           |
            |-----------|
            |   2, 2    |
            |           |
|-----------|-----------|-----------|-----------|
|   1, 1    |   1, 2    |   1, 3    |   1, 4    |
|           |           |           |           |
|-----------|-----------|-----------|-----------|
```

We can place an `o` in the top-left corner of each page to facilitate calculating the position of elements on each page:

```js
# o
let tmp_rect = [page_offset_x_1 + page_offset_x_2 + page_offset_x_3, page_offset_y_1 + page_offset_y_2, 0.1, 0.1]
img(id: o11, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 2, o11.t, 0.1, 0.1]
img(id: o12, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 4, o11.t, 0.1, 0.1]
img(id: o13, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 6, o11.t, 0.1, 0.1]
img(id: o14, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o12.l, o11.t - 2 * top, 0.1, 0.1]
img(id: o22, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o12.l, o11.t - 4 * top, 0.1, 0.1]
img(id: o32, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi
```

In the definitions above, we define the offset of `o11` using `page_offset_x_n` and `page_offset_y_n`. Since the offsets of other pages are relative to `o11`, when `o11` moves, elements on other pages will also move accordingly.

Furthermore, we control the timing of drawing `o22` and `o32` using `#>if`. This is to prevent the user from seeing the content of the page above the current one on the active first screen after vertical switching. Using these conditional checks, we can move the content above the current page out of the screen.

To calculate the specific values of these offsets, we need to define some buttons for page switching and compute the offset values using the buttons' `last` property.

```js
global btn_r_1 = @btn
global btn_l_2 = @btn

global btn_r_2 = @btn
global btn_l_3 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_u_1 = @btn
global btn_d_2 = @btn

global btn_u_2 = @btn
global btn_d_3 = @btn

# btn_lr_1234
let tmp_rect = [o12.l - 0.1, o11.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_1, r: tmp_rect, t:fit)

let tmp_rect = [o12.l, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l - 0.1, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l - 0.1, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l, o14.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_4_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_4, r: tmp_rect, t:fit)

# btn_ud_123
let tmp_rect = [o12.l + 1 - 0.05, o12.t, 0.1, 0.1]
img(id: btn_u_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_1, r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o22.l + 1 - 0.05, o12.t - 0.1, 0.1, 0.1]
img(id: btn_d_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_2, r: tmp_rect, t:fit)

let tmp_rect = [o22.l + 1 - 0.05, o22.t, 0.1, 0.1]
img(id: btn_u_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_2, r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o32.l + 1 - 0.05, o22.t - 0.1, 0.1, 0.1]
img(id: btn_d_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_3, r: tmp_rect, t:fit)
#>fi
```

The number at the end of the button `id` indicates the page where the button is located.

After defining the buttons, we can calculate the offset values using the buttons' `last` property:

```js
let animation_duration = 0.7
let animation_speed = 1 / animation_duration

let a = btn_r_1.last
let b = btn_l_2.last
# back and forth
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)

# a > b ? x : y
let page_offset_x_1_ratio = (a > b) * x + (a <= b) * y

# easeInOutQuad
let x = 4 * page_offset_x_1_ratio * page_offset_x_1_ratio * page_offset_x_1_ratio
let y = 1 - (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) / 2
let page_offset_x_1_ratio_eased = (page_offset_x_1_ratio < 0.5) * x + (page_offset_x_1_ratio >= 0.5) * y
let page_offset_x_1 = page_offset_x_1_ratio_eased * -2
```

For the offsets related to vertical switching, we can calculate them using a similar method.

In this way, we have completed the page switching effect.

The complete UML code is as follows:

```js
let animation_duration = 0.7
let animation_speed = 1 / animation_duration

global btn_r_1 = @btn
global btn_l_2 = @btn

global btn_r_2 = @btn
global btn_l_3 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_r_3 = @btn
global btn_l_4 = @btn

global btn_u_1 = @btn
global btn_d_2 = @btn

global btn_u_2 = @btn
global btn_d_3 = @btn

# ---
let a = btn_r_1.last
let b = btn_l_2.last
# back and forth
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)

# a > b ? x : y
let page_offset_x_1_ratio = (a > b) * x + (a <= b) * y

# easeInOutQuad
let x = 4 * page_offset_x_1_ratio * page_offset_x_1_ratio * page_offset_x_1_ratio
let y = 1 - (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) * (-2 * page_offset_x_1_ratio + 2) / 2
let page_offset_x_1_ratio_eased = (page_offset_x_1_ratio < 0.5) * x + (page_offset_x_1_ratio >= 0.5) * y
let page_offset_x_1 = page_offset_x_1_ratio_eased * -2
# ---

# ---
let a = btn_r_2.last
let b = btn_l_3.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_x_2_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_x_2_ratio * page_offset_x_2_ratio * page_offset_x_2_ratio
let y = 1 - (-2 * page_offset_x_2_ratio + 2) * (-2 * page_offset_x_2_ratio + 2) * (-2 * page_offset_x_2_ratio + 2) / 2
let page_offset_x_2_ratio_eased = (page_offset_x_2_ratio < 0.5) * x + (page_offset_x_2_ratio >= 0.5) * y
let page_offset_x_2 = page_offset_x_2_ratio_eased * -2
# ---

# ---
let a = btn_r_3.last
let b = btn_l_4.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_x_3_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_x_3_ratio * page_offset_x_3_ratio * page_offset_x_3_ratio
let y = 1 - (-2 * page_offset_x_3_ratio + 2) * (-2 * page_offset_x_3_ratio + 2) * (-2 * page_offset_x_3_ratio + 2) / 2
let page_offset_x_3_ratio_eased = (page_offset_x_3_ratio < 0.5) * x + (page_offset_x_3_ratio >= 0.5) * y
let page_offset_x_3 = page_offset_x_3_ratio_eased * -2
# ---

# ---
let a = btn_u_1.last
let b = btn_d_2.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_y_1_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_y_1_ratio * page_offset_y_1_ratio * page_offset_y_1_ratio
let y = 1 - (-2 * page_offset_y_1_ratio + 2) * (-2 * page_offset_y_1_ratio + 2) * (-2 * page_offset_y_1_ratio + 2) / 2
let page_offset_y_1_ratio_eased = (page_offset_y_1_ratio < 0.5) * x + (page_offset_y_1_ratio >= 0.5) * y
let page_offset_y_1 = page_offset_y_1_ratio_eased * 2 * top
# ---

# ---
let a = btn_u_2.last
let b = btn_d_3.last
let x = min((t - a) * animation_speed, 1)
let y = max(1 - (t - b) * animation_speed, 0)
let page_offset_y_2_ratio = (a > b) * x + (a <= b) * y

let x = 4 * page_offset_y_2_ratio * page_offset_y_2_ratio * page_offset_y_2_ratio
let y = 1 - (-2 * page_offset_y_2_ratio + 2) * (-2 * page_offset_y_2_ratio + 2) * (-2 * page_offset_y_2_ratio + 2) / 2
let page_offset_y_2_ratio_eased = (page_offset_y_2_ratio < 0.5) * x + (page_offset_y_2_ratio >= 0.5) * y
let page_offset_y_2 = page_offset_y_2_ratio_eased * 2 * top
# ---

# o
let tmp_rect = [page_offset_x_1 + page_offset_x_2 + page_offset_x_3, page_offset_y_1 + page_offset_y_2, 0.1, 0.1]
img(id: o11, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 2, o11.t, 0.1, 0.1]
img(id: o12, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 4, o11.t, 0.1, 0.1]
img(id: o13, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

let tmp_rect = [o11.l + 6, o11.t, 0.1, 0.1]
img(id: o14, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o12.l, o11.t - 2 * top, 0.1, 0.1]
img(id: o22, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o12.l, o11.t - 4 * top, 0.1, 0.1]
img(id: o32, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/blank.png", r: tmp_rect, t:fit)
#>fi

# btn_lr_1234
let tmp_rect = [o12.l - 0.1, o11.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_1, r: tmp_rect, t:fit)

let tmp_rect = [o12.l, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l - 0.1, o12.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_2, r: tmp_rect, t:fit)

let tmp_rect = [o13.l, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l - 0.1, o13.t + top - 0.05, 0.1, 0.1]
img(id: btn_r_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/right_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_r_3, r: tmp_rect, t:fit)

let tmp_rect = [o14.l, o14.t + top - 0.05, 0.1, 0.1]
img(id: btn_l_4_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/left_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_l_4, r: tmp_rect, t:fit)

# btn_ud_123
let tmp_rect = [o12.l + 1 - 0.05, o12.t, 0.1, 0.1]
img(id: btn_u_1_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_1, r: tmp_rect, t:fit)

#>if(page_offset_y_1_ratio)
let tmp_rect = [o22.l + 1 - 0.05, o12.t - 0.1, 0.1, 0.1]
img(id: btn_d_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_2, r: tmp_rect, t:fit)

let tmp_rect = [o22.l + 1 - 0.05, o22.t, 0.1, 0.1]
img(id: btn_u_2_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/up_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_u_2, r: tmp_rect, t:fit)
#>fi

#>if(page_offset_y_2_ratio)
let tmp_rect = [o32.l + 1 - 0.05, o22.t - 0.1, 0.1, 0.1]
img(id: btn_d_3_bkg, url: "https://teamflos.github.io/phira-docs/assets/uml/advanced/page_switch/down_arrow.png", r: tmp_rect, t:fit)
btn(id: btn_d_3, r: tmp_rect, t:fit)
#>fi

let $h = 2 * top - 0.02
```
