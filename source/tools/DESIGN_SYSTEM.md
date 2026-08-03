# Pip & Friends design system

For chapter authors and the fix round. It describes what the shared engine (`assets/comic*.css`, `assets/comic*.js`) now provides after the 2026-11-08 engine refresh:

- the tokens to use
- how shadcn/ui's components map onto our existing classes
- the states every control has
- the motion rules, with their tokens and budgets
- where the ideas came from

Nothing here renames a class. Every chapter keeps working as written. New rules should use the tokens below instead of raw colours, radii and timings.

## 1. Where it comes from

| Source | What we took | Commit | Licence |
|---|---|---|---|
| shadcn/ui (`tools/vendor/shadcn-ref/`) | the semantic token roles (`globals.css`); each component's states and accessibility behaviour (button, toggle, toggle-group, radio-group, switch, input, textarea, progress, badge, card, accordion/collapsible, alert, pagination, kbd, table, separator) | `8ab27715521cbd4f87ae6886cd989cbb678f6de7` (main, new-york-v4 registry) | MIT (`LICENSE.md`) |
| Emil Kowalski's skills (`tools/vendor/emil-skills/`) | `emil-design-eng`, `review-animations` + `STANDARDS.md` (easing, durations, physicality, reduced motion, hover gating, the Before/After/Why review format), `mobile-native` (tap highlight, touch-action, 16px inputs, :active feedback), `break-ui` (badges that wrap, tabular numbers, long tokens) | `5206a950b715e0cabe7043ea0b2304332b91494e` | MIT (`LICENSE`) |

shadcn/ui is React + Tailwind + Radix. We can't load it in a file:// page with no build step. So we ported its system instead: the token architecture, and each component's states and keyboard behaviour. Everything is re-skinned in the comic look:

- thick ink outlines instead of soft grey borders
- hard offset shadows
- pill buttons
- our five fonts
- our radii

## 2. Tokens (`assets/comic.css :root`)

The palette names (`--paper`, `--ink`, `--yellow`, `--cream`, `--sky`, `--error`, …) stay, and chapters may keep using them. The semantic tokens are aliases on top of them.

### Colour roles

Each ratio was checked by script against WCAG. Every text pair is at least 7:1.

| Token | Value | Use | Text pair |
|---|---|---|---|
| `--background` / `--foreground` | paper / ink | page, cards, controls | 18.9:1 |
| `--primary` / `--primary-foreground` | yellow / ink | the main action: `.btn-go`, `.ch-nav a.next`, `.ex-kind`, the switch track when on | 13.4:1 |
| `--secondary` / `--secondary-foreground` | cream / ink | soft fill: hover on paper controls, pressed anatomy keys, blanks | 17.4:1 |
| `--accent` / `--accent-foreground` | sky / ink | an "on" state that isn't the main action (checked radio option) | 15.3:1 |
| `--muted` / `--muted-foreground` | code-bg / ink-2 | quiet fill (code, spot lines, switch track off) and disabled text | 12.8:1 (14.2:1 on paper) |
| `--destructive` / `--destructive-foreground` | error / paper | error text, error roads, "Reset my score", wrong blanks | 7.3:1 **on paper only** |
| `--border`, `--input` | ink | every outline: comic ink, never grey | — |
| `--ring` | blue-deep | focus ring (`:focus-visible`, 4px; inputs 3px) | 9.2:1 on paper |

**Destructive text keeps a paper background.** Red on cream is 6.7:1, red on pink is 6.0:1 and red on muted is 6.6:1, so all three fail.

For the same reason, two older pairs were fixed:

- the machine's "JAMMED!" box now uses ink text on pink (15.4:1)
- the ✗ mark in a wrong comparison row sits on paper (7.3:1; it was 6.3:1)

### Radii, shadows and motion

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | badges, kbd, file tabs, blanks |
| `--radius-md` | 8px | inputs, alerts, inner cards, option rows |
| `--radius-lg` | 14px | cards (`.ex-card`, `.duo-card`, `.recap li`, `.quiz > li`, anatomy keys) |
| `--radius-pill` | 999px | buttons, chips, pagination, badges |
| `--shadow-hard` | `3px 3px 0 ink` | buttons, checked options, pressed toggles |
| `--shadow-hard-lg` | `6px 6px 0 ink` | exercise cards, books |
| `--shadow-hard-sm` | `1px 1px 0 ink` | a button pressed into its shadow |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | anything entering, pressed or triggered |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | something already on screen moving to a new place |
| `--dur-press` | 100ms | press in |
| `--dur-release` | 160ms | release (slower than the press) |
| `--dur-fast` | 150ms | hover lift, reduced-motion fades |
| `--dur-ui` | 200ms | entrances, switch thumb, progress fill, opened details |
| `--dur-move` | 280ms | teaching movement (the guide walking to the next line, the map token) |

**Budgets (Emil):**

- press: 100–160ms
- small UI: 150–250ms
- nothing on UI over 300ms

The character idle loops (bob, wave, blink, squash, spin) are illustration, not UI, so they keep their slow loops.

## 3. shadcn component → comic class map

| shadcn | Our classes | Variant / notes |
|---|---|---|
| Button | `.btn-go`, `.ch-nav a.next` | default (primary, yellow, hard shadow) |
| | `.btn`, `.ch-nav a` | outline (paper, hard shadow) |
| | `.replay`, `.motion-toggle` | secondary, small (36px pill, no shadow) |
| | `.pz` | icon (40px square; on phones 40×34, stacked) |
| | `.path-btn.bug`, `.btn[data-score-reset]` | destructive (red text and border on paper) |
| Toggle / Toggle-group | `.anat-keys button`, `.spot-line`, `.path-btn` | "on" = `aria-pressed="true"` (filled, plus a word or mark: "← my pick", the pressed shadow) |
| Radio-group | `.ex-opt` in `[role=radiogroup]` | `aria-checked`; one tab stop; arrow keys move and select (Radix behaviour, `comic-widgets.js`) |
| Switch | `.motion-toggle` | `aria-pressed`; a drawn track and thumb, and the words "Animations: on/off" |
| Input / Textarea | `.ex-input`, `.ex-blank`, `.ex-cell` | 16px text (phones never zoom), ring on focus, `aria-invalid="true"` on a wrong blank or cell |
| Progress | `.score-bar` | `role=progressbar` with `aria-valuemin/max/now/valuetext`; the fill is scaled, so it eases; `.score-num` uses tabular figures |
| Badge | `.panel-no`, `.chapters [aria-current]` | default (ink) |
| | `.ex-kind` | secondary (yellow) |
| | `.chapters a`, `.book .tag`, `.parity`, `.ex-state` | outline |
| | `.parity.bad` | destructive (pink, dashed, and its words). Badges don't wrap mid-word (`.parity` may wrap, because its text is long) |
| Card | `.ex-card`, `.duo-card`, `.book`, `.recap li`, `.sbs-2 > div`, `.quiz > li` | `--border`, `--radius-lg`/`--radius-md`, hard shadows |
| Collapsible / Accordion | `.page` (notebook), `.hint`, `.quiz details`, `.panel > details` | summary = trigger; `[open]` shows "close −" or the turned marker; content fades in (opacity only) |
| Alert | `.ex-result.good` (✓, solid border), `.ex-result.bad` (✗, dashed), `.m-out.jam` (dashed, "JAMMED!") | state is never colour alone |
| Pagination | `.ch-nav` (previous/next), `.chapters` (top bar) | current = `aria-current="page"` (ink badge) |
| Kbd | `kbd` | paper, ink outline, thicker bottom edge, `--radius-sm` |
| Table | `.sbs`, `.trace`, `.terms`, `table.transcript`, `table.ref-table`, `.map-text table` | ink header rule, quiet row rules, tabular figures in numeric cells; `table.transcript` (≤640px) and `table.ref-table` (≤560px) stack each row as a card labelled from `data-h` (§8) |
| Separator | top-bar and footer rules, `hr` | 3px ink |

**Optional, not built.** Nothing uses these yet:

- a Tooltip for glossary terms (`.terms` words used in the panels)
- Tabs for the notebook (one tab per page instead of stacked `<details>`)
- a Skeleton while a long terminal types out

Add them only when a chapter needs one.

## 4. States every control has

The state rules live at the end of `comic-widgets.css`. Specificity stays low, so a chapter's own rules still win.

| State | How it looks | Rule |
|---|---|---|
| hover | shadowed buttons lift 1px into a 4px shadow; flat controls take `--secondary`; destructive keeps paper and underlines | only inside `@media (hover: hover) and (pointer: fine)`: touch screens fake a sticky hover on tap |
| `:focus-visible` | 4px `--ring` outline, 3px offset (inputs 3px, 2px offset) | global |
| `:active` (press) | shadowed buttons move `translate(2px, 2px)` with `--shadow-hard-sm` (they sink into their shadow); flat controls move `translateY(1px)` | press `--dur-press`, release `--dur-release`, `--ease-out`; the shadow swaps instantly, only the transform eases |
| disabled / `aria-disabled="true"` | dashed border, no shadow, `--muted-foreground` text, `not-allowed` cursor, no press | `.btn`, `.path-btn`, `.pz`, `.ex-opt`, inputs |
| invalid / `aria-invalid="true"` | dashed red underline (blanks and cells) or dashed red border (`.ex-input`), plus ✗ in the comparison | set by the fill and trace checkers |
| on: `aria-pressed` / `aria-checked` / `aria-current` / `[open]` | filled (ink, yellow, cream or sky) plus a word, a mark, a dot or the pressed shadow | |

**Phones** (from Emil's `mobile-native`):

- there is no grey tap flash (`-webkit-tap-highlight-color: transparent`, with an `:active` state on every control instead)
- controls use `touch-action: manipulation` and `user-select: none`
- inputs use 16px text

## 5. Motion rules

1. **Name the property.** Never use `transition: all`. Animate `transform` and `opacity` only. Colour changes (hover, on) are instant.
2. **Easing.** Use `--ease-out` for anything entering, pressed or triggered. Use `--ease-in-out` for something already on screen moving. Never use `ease-in` on UI.
3. **Durations.** Use the tokens above. Nothing on UI goes over 300ms.
4. **Entrances start at scale 0.9–0.97 plus opacity**, never from nothing. The only exception is the comic sound effect (see the table).
5. **Reduced motion is gentler, not zero.** With `prefers-reduced-motion: reduce`:
   - all movement and all transitions stop
   - the entrances that show what changed become 150ms opacity fades (the sound-effect burst, `.pop-me`, a new tracer object, the machine's input and output, an opened notebook page)
   - `L.motionOn()` returns false, so scripts don't move anything (typing, chapter animations)
   - the toggle now defaults to "on" for everyone
   - "Animations: off" still stops everything
6. **Idle loops pause off screen.** comic.js adds `.idle-off` to any `svg.char` outside the viewport (with a 200px margin).
7. **Hover motion is gated** behind `(hover: hover) and (pointer: fine)`.

### Motion audit: Before | After | Why

| Before | After | Why |
|---|---|---|
| `.anat-line .part { transition: background 200ms ease-out, border-color 200ms ease-out }` | no transition: the highlight swaps on press | Colour transitions repaint; the part is a state shown at once on a press (remedy 1: delete) |
| `.walker { transition: transform 420ms ease-in-out }` | `transform var(--dur-move) var(--ease-in-out)` (280ms) | Teaching movement stays under 300ms; the built-in ease-in-out is too weak |
| `.map-svg .token { transition: transform 480ms ease-in-out }` | `transform var(--dur-move) var(--ease-in-out)` | Same as the walker: on-screen movement, under the budget |
| `shake 420ms ease-out` on `.panel.played .shake-me` | `shake 300ms var(--ease-out)` | Error feedback, rare; within the 300ms cap |
| `burst 420ms cubic-bezier(.2,.9,.3,1.3)`, keyframe from `scale(0.2)` | `burst 300ms var(--ease-out)`, from `scale(0.5)` + `opacity: 0`, overshoot 1.08 | A comic sound effect is decorative and rare (once per panel). It now starts from a visible half size and fades in, not from almost nothing. The small overshoot is kept: playful motion suits the comic voice (cohesion) |
| `pop-in 380ms ease-out`: `scale(.94) → 1.02 → 1`, no opacity (`.pop-me`) | `pop-in var(--dur-ui) var(--ease-out) both`: `scale(.95)` + `opacity 0 → 1` | Entrances start at 0.95 plus opacity; under the small-UI budget |
| `.tr-new { animation: pop-in 380ms ease-out }` | `pop-in var(--dur-ui) var(--ease-out) both` | A new tracer object appears on every Next press (keyboard too), so it must be short |
| `feed 500ms ease-out`: from `translateX(-40px)` with a 10px overshoot | `feed 240ms var(--ease-out) both`: from `-24px` + opacity, no overshoot | Explanatory, but 500ms made every chip press feel slow |
| `emerge 900ms ease-out`: idle until 45%, then from `scale(0.4)` | `emerge var(--dur-ui) var(--ease-out) 200ms both`: from `scale(0.92)` + opacity | Two short steps in sequence instead of one 900ms animation; no near-zero scale |
| machine `shake 420ms ease-out 300ms` | `shake 300ms var(--ease-out) 200ms` | Matches the faster input; within the cap |
| `.motion .mh-heap, .motion .mh-slot { transition: opacity 200ms }` | removed | Dead code: the stepper redraws its nodes each step, so the transition never ran |
| `.book:hover` lift, ungated, no transition | lift only under `(hover: hover) and (pointer: fine)`, `transform var(--dur-fast) var(--ease-out)`, plus an `:active` press | Touch screens fake a sticky hover; hover motion must be gated |
| `.btn:active` jumps (no transition); it also pressed when disabled | `transition: transform` press 100ms / release 160ms `--ease-out`; disabled doesn't press | Press feedback 100–160ms, asymmetric (the press answers faster than the release) |
| flat controls (`.path-btn`, `.pz`, `.ex-opt`, `.spot-line`, `.anat-keys button`, `.chapters a`, `.replay`, `.motion-toggle`): no press feedback | `:active { transform: translateY(1px) }`, same timings | Every pressable thing answers the finger (`mobile-native` §5) |
| progress fill: `width` set inline, no animation | `transform: scaleX(p)`, `transition: transform var(--dur-ui) var(--ease-out)` | Animate transform, not width (layout) |
| (new) switch thumb | `transform var(--dur-ui) var(--ease-out)` | Small UI state change, transform only |
| (new) opened `<details>` content | `fade-in var(--dur-ui) var(--ease-out)` | Opacity only; no height animation (layout) |
| `bob 2.4s`, `wave 1.2s ×3`, `blink 4s`, `squash 1.6s`, `spin 6s linear` | unchanged loops; paused off screen (`.idle-off`) | Illustration, not UI; looping ease-in-out (linear for constant spin). No work for frames nobody sees |
| `data-type` typing (JS, 22ms ticks, about 2s) | unchanged; skipped when `motionOn()` is false (motion off, or reduced motion) | Explanatory and rare (once per chapter) |
| `@media (prefers-reduced-motion: reduce) { * { animation: none; transition: none } }` and toggle default "off" | movement and transitions off; five entrances become 150ms fades; toggle default "on"; `motionOn()` false | Reduced motion means gentler, not zero (standard 8) |

## 6. Code lines, terminals and pictures on phones

- **Hanging indent.** In walkers, `.term.wrap` terminals, and (on phones) tracer code, parsons and spot lines, comic.js wraps each line's leading whitespace in `.lead` and the rest in `.rest`, and sets `--ind`: the indent in columns, using the box's own `tab-size`.
  - A wrapped line continues under its own first character, plus 2 columns.
  - Breaks fall at spaces and after `. , ( [ { / ; ::` (comic.js adds `<wbr>`, which adds no text).
  - A line breaks mid-word only when one token is longer than a whole line.
  - `L.hangLines(elements)` is available to extensions.
  - Text content is unchanged.
- **`.term.wrap` is in the engine.**
  - Each line is a `.tl` block.
  - The line a compiler caret points into (`.tl-src`) never wraps, so the markers stay under the code.
  - The caret line (`.tl-caret`) wraps its label under the markers.
  - Terminal text breaks at spaces only, so file names stay whole.
  - Long tokens scroll sideways.
- **Fill exercises on phones** don't wrap. Each line keeps its shape, and the box scrolls.
- **Tracers and stack-and-heap steppers** use one picture size for the whole run: the widest and tallest that any step needs. This keeps labels from zooming between steps and keeps the buttons from jumping.
  - When the picture is wider than its box, it's drawn at natural size: every label at its design size (12px and up).
  - The box then scrolls sideways and says "Swipe sideways to see the whole picture →".
  - Otherwise the picture fills the box.
  - On phones the layout is stacked (names above objects) with smaller minimum cells.
- **Maps on phones** are drawn at their natural width (labels at their design size, 14px and up) in the scrolling `.mapwrap`.
- **Anatomy lines** wrap between their parts when too wide, never inside a part.
- **Notebook pages and quiz lists** never widen the page. Wide code scrolls in its own box, and a long command in a sentence breaks.

## 7. Data options added (see AUTHORING.md engine notes)

- **Parsons `alts`.** Extra accepted orders. Each is the full program as 1-based line numbers, or `{"order": [...], "program": "alt.py"}`. The program form is checked: its captured source must be exactly that order, and its real output must equal the main program's.
- **Fill `sets`.** Whole-answer alternatives, one value per blank. With sets, mixed halves of different answers are rejected.

## 8. Engine pass 2 (2026-11-08): phones, steppers and helpers

Measured against the visual reviews (every `"lens": "visual-engine"` finding). Each line says what the engine now does, so chapters can stop doing it themselves. The list of chapter clean-ups is in `tools/review/engine-pass2-chapter-todo.md`.

### Steppers

| Behaviour | Where | Notes |
|---|---|---|
| **Reserved height.** The narration, the screen and any `[data-reserve]` element keep the tallest step's height for the whole run, so the buttons below never move between steps. | `L.runner(box, total, render, { reserve: true })` | The walker, map, tracer and stack-and-heap stepper pass it (the tracer and stepper also reserve `.tr-code`, where "◀ next" can add a row). Measured once, when the box comes within 600px of the screen and fonts have loaded, and again when its width changes. A map keeps the largest height across paths. |
| `L.reserveHeight(el, heights)` | helper | Sets `el`'s min-height to the largest of `heights` (px) and returns it. For extensions that measure something themselves. |
| `L.reserveSteps(box, total, render, getState, selector, grow)` | helper | Renders every step with `announce = false`, measures every element matching `selector` (default `.narration, .screen pre, [data-reserve]`), reserves the tallest, and renders the current step again. `render` must draw a step from the state alone (as every runner render already does). |
| **Sticky controls on phones.** At ≤640px a panel's `.controls` that hold a Next button stick to the bottom of the screen while the panel is in view (paper bar, 3px ink rule). Keyboard hints (`<kbd>`) are hidden on touch screens so the four buttons fit one row. | CSS, `.panel > .controls:has([data-act="next"])` | `.panel` is `overflow: clip` where supported (it was `hidden`, which made it a scroll container and broke sticky). |
| **The highlighted line comes into view.** After a step the reader asked for (button or key, not Play ticks), when the controls are sticky, the page scrolls just enough to show the first `li.now`, `.hl` or `[data-now]` in the box above the bar. The buttons stay under the finger. | `keepInView` in `L.runner` (`L.keepInView(box)` for custom steppers) | Mark a chapter's own clue with `.hl` or `data-now`. |
| "Step 1 of 7" never wraps. "◀ next" is glued to the last word of the current line. | CSS | |

### Text versions and reference tables

- **`table.transcript`** (every "Text version: every step"): comic.js copies each header cell's text into `data-h` on its column's cells and adds table roles (`table`, `rowgroup`, `row`, `columnheader`, `cell`), so the table stays a table for screen readers when the CSS changes its display. At ≤640px each row is a bordered card: the first cell is the title ("Step 3"), every other cell shows its column name above its text. Rows rebuilt later (a map's new path) are relabelled by a MutationObserver. A `data-h` the page wrote is kept.
- **`table.ref-table`** (new component, for chapter cheat sheets of names and meanings): code in its cells never breaks inside a name (`white-space: nowrap`). At ≤560px rows stack into the same cards, labelled from `data-h` or the header (a header row without `<thead>` works too). A name too long for the card scrolls inside its cell. Use it instead of chapter tables with `code { overflow-wrap: anywhere }`.
- `L.labelTable(table)` labels any other table the same way.

### Code, terminals and pictures

- **Walker on phones** (≤640px): the code sits above the screen and gets a 38px gutter with a 40px guide, a 2-column line number, 14px code and tab stops of 2. Lines wrap at spaces and after punctuation; a token longer than the line scrolls inside its row instead of breaking. (The code column was 12–20 characters; rust ch6 P29 was 4,003px tall, now 1,770px.)
- **Break points** (`L.hangLines`, `L.addBreaks`): never inside a string or char literal (`"{name}"`, `'.'`, `"a, b"`); never after the dot of a receiver shorter than 3 characters (`b.WriteString(` stays whole). A string of up to 9 characters never wraps; in a longer string the opening quote stays with its first word and the closing quote with its last. Terminal lines never break at a hyphen (`-Wextra`, `rust-ch11/`).
- **Parsons pieces wrap at every width** with the hanging indent (at 1280 long pieces ran under the arrows). Spot-the-bug blank lines are spacers, not buttons.
- **Card terminals** (`.duo-card pre.term`) get `.wrap` automatically. Hand-written `.term.wrap` terminals (no `data-run`) whose markup is plain text and `<span>`s get the same per-line blocks.
- **Failing runs wrap on phones.** The rule: every `data-run` terminal whose run exited non-zero gets `.wrap-sm`, which behaves as `.term.wrap` at ≤640px only. Carets stay aligned (the source line a caret points into never wraps; gcc's space-separated marker groups `~ ^ ~~~~~` are recognised). `data-nowrap` opts out. Other terminals keep scrolling, with the scroll shadow.
- **Scroll shadows** on `.code`, `.term`, `.tr-code` are visible again: a 22px ink edge at 45% on each side where text is hidden, gone once that side is reached.
- **Sideways scrollers say so only when they scroll.** `.picscroll` and `.mapwrap` get `.scrolls` (hint line "Swipe sideways to see the whole picture/map →", "Scroll sideways" for a mouse) and a right-edge fade until scrolled to the end (`.at-end`). `L.scrollHint(el)` does the same for a chapter's own scroller.
- **Maps** on phones open scrolled to the current place and keep it in view as steps advance.
- **Tracer pictures** at most 24 units wider than their box are cropped to the box (the right 28 units are always blank), so a 12px overflow no longer switches to a scroller with a hint at 1280. An empty objects area says "(nothing in memory yet)".
- **File tabs** sit flush on their box whatever gap the parent uses (comic.js measures it) and are painted above it.

### Labels and fonts

- **Critter labels:** the Compiler's plate is 23 units (12.5px at the default 130px width), the Inspector's hat label 17 (12.3px), signpost arms 20 (13px), the trail guide's sign 23 (13px); long words are squeezed to fit. The compass "N" is gone. Decorative plates carry `class="lbl-deco"`: `L.fitLabels()` hides them wherever the drawing is so small they would be under 12px (a `.sm` Compiler). Character drawings are aria-hidden, so the name belongs in the bubble or the panel text.
- Ligatures are off on every engine element drawn in JetBrains Mono, including `.duo-card h3 small`, `.terms dt`, `.file-tab`, `.token small`.
- Any `li.now` shows its tokens in ink (7:1 on yellow).
- Code in `.recap li`, `.duo-card p/li`, exercise questions, options and explanations breaks only when it must.

### Layout fixes in the same pass

- Fixed grid tracks (`minmax(0, 1fr)`) on `.strip`, `.ex-card`, `.ex-body`, `.ex-options` and `.duo-card`, and `min-width: 0` on `.readlist li > *` and `.checklist li > *`: one long token can no longer widen a column, a card or the page column past the 16px gutter.
- The glossary's capped term column applies from 641px up; phones keep one column.
- Collapsible summaries reach 44px on touch screens with padding, not flex (flex split summaries that mix text and `<code>`).
- `.recap` card titles are `li > b:first-child` only; bold words in the body stay inline.
- `.parity` is an inline block with a 15px radius: it never splits into two half-pills, and a badge that wraps keeps its text inside its corners.
- `details.fold-full` ("Show the full, unfolded output") is styled as a collapsible, and the "… N lines inside Node itself" note is quiet italic, not error red.
- Spot-the-bug lines and road/chip buttons are 44px tall on touch screens; machine chips wrap inside their button (breaking after `.` `(` `::`) instead of running past the panel.

## 9. Engine pass 3 (2026-11-08): after the fix round

Requests from the 49 fix groups (`tools/INTEGRATION_TODO.md`, lines tagged `[engine pass 3]`). Each change was carried into the chapters that worked around it, and their copies were removed. Check table: `tools/review/engine-pass3-check.txt`.

### Rules and components

| Behaviour | Where | Notes |
|---|---|---|
| **`[hidden]` always wins** | `comic.css`: `[hidden] { display: none !important; }` | An author `display:` rule can no longer show a hidden element (go ch28's ten panes). Chapter `.x[hidden] { display: none }` copies were deleted (7 files). |
| **Heap caption** | `comic-memory.js`, `data-heap-label` | Default "HEAP". `data-heap-label="the coat-check room"` on the `[data-mem]` box (or any ancestor) gives "HEAP · the coat-check room". Set on: every Rust page (the coat-check room), cpp ch13 (the library), cpp ch8 (where vectors keep their eggs), go ch28 (the storage unit). Other C++ and Go pages say "HEAP" ("coat check" is a map in cpp ch14 and go ch12). |
| **`.part-h code`** | `comic-widgets.css` | Paper chip, ink text (18.9:1) in the ink part header. It was paper-coloured text on the light code chip. 12 chapter copies deleted. |
| **Card code wraps like a terminal** | `comic.js` `codeLines()` (`L.codeLines`), `comic-widgets.css` | `.duo-card pre.code` gets one `.cl` block per line with the hanging indent and the code break points; a token longer than the line breaks (break-word). It was `pre-wrap` + `overflow-wrap: anywhere` (js ch13 P11 split `split(" ")`). |
| **Text versions break at code break points** | tracer, walker and memory stepper transcripts | `L.addBreaks` on every `td code` (rust ch22's own call removed). |
| **Table scrollers say so** | `comic.js` `tableScrollers()`, `comic-widgets.css` §pass 3.1 | `table.trace` and any table wrapper with `overflow-x: auto/scroll` (chapter `.vswrap`, `.cmp-wrap`, … marked `.tscroll`) get "Swipe sideways to see the whole table →" and the right-edge fade while they overflow. 527 scrollers found; 22 overflow at 390px, 1 at 1280px. |
| **`fx-in`: entrances opt in to the motion rules** | `comic-widgets.css` §pass 3.2 | Engine pop-in by default (a chapter's more specific animation wins), a 150ms fade under reduced motion, nothing with "Animations: off". cpp ch8 (was `.tr-new`), cpp ch2 and go ch25 (were their own reduced-motion copies) use it. |
| **Anatomy break chances** | `comic.js` `initAnatomy` | `<wbr>` only between parts that are direct children of an `.anat-line` whose `white-space` wraps; never inside a chapter's no-break group or a `pre` multi-line anatomy (cpp ch6's `.nobr wbr` override deleted). |
| **`data-lines="a-b"`** (optional item) | `comic.js` `fillCode` | `<pre class="code" data-src="x.rs" data-lines="12-30">` shows lines 12–30 of the captured program (`data-lines="7"`: one line). A range outside the program is reported. |
| **`.narration > .count:first-child`** (optional item) | `comic.css` | The "Step 1 of 7" nowrap no longer reaches a chapter's own `.count` inside a note. |
| **`[data-asan]` sanitizer report reader** | `comic-widgets.js`, `comic-widgets.css` §pass 3.3 | Promoted from cpp ch11 (copies in ch13 and ch21, as `[data-report]`, renamed in the pages). Model and markup in the code header. Paths break after `/`, so the `file:line` at the end of a frame stays in view at 390px. `cpp-ch13.js` and `cpp-ch21.js` held only the copy and were deleted. |

### Labels (house rule: no text under 12px)

| Drawing | Before | After |
|---|---|---|
| Compiler plate in a figure (`svg[data-char]` without `.char`, cpp ch1) | 9.2px, shown | `fitLabels()` now covers every `svg[data-char]`: hidden under 12px |
| Linker "LINK" | 7.1–10.5px at small sizes | `lbl-deco` (14.2px at 130px, hidden under 12px) |
| Ghost "undefined"/"nullptr" | 13 units, 10.4px at 96px | `lbl-grow` (grows toward 12px, squeezed to 80 units) |
| Pager "#N" | 16 units, 9px at 90px | 20 units on a tag that fits the number, `lbl-grow`; the WAIT/BUZZ/SORRY word is `lbl-grow` too |
| Kitchen helper number | hidden by the pot when busy; 5.9px at 42px | drawn on the pot when busy; `lbl-grow` |
| Sealed crate | items 18/12, digits 14 units (5.5px) | items 22/16, digits 20, both `lbl-grow`; frame 142 tall |
| Bag | 3+ character items 12 units (8.2px) | circles r 20, items 20/18 units, squeezed to the circle, `lbl-grow` |
| Pip's `>_` (walker, map token, small Pip) | 5.4–8.1px | `lbl-deco`: hidden under 12px, never drawn on the walker or token |
| Bouncer "CREW" | 8px at 44px | `lbl-deco` |
| Inspector "TEST" | none under 12px | unchanged |

`L.drawCast(scope)` re-fits labels when a drawing is redrawn after layout (a stepper changing a character's state used to reset grown or hidden labels).

**Label pass (after engine pass 3).** `fitLabels()` measures each drawing's scale from its screen matrix, so height-capped drawings (js ch2's 54px brick/train row) and drawings nested in a scene svg (py ch14's machine) are fitted at their real size. `text.lbl-grow` takes three optional attributes: `data-maxk` (growth cap, default 1.6), `data-cy` (keep the text centred on that y as it grows) and `data-plate="N"` (the rect just before the text widens up to N units and grows taller with it). Now lbl-grow: machine plate (maxk 2.6, plate 136), crate items and indexes (maxk 2; longer items start as large as fits), train letters and indexes, cabinet drawers, brick, jelly (plate widens for long values), lamp, wheel, tumble's indexes (26 units), nullframe (17), giftbox card, parcel tape (17), key tag, umpire PASS/FAIL, digger/fetch "?", linecook's "...". Chapter drawings raised to 12px: js-ch22 "2 SLOTS", rs-ch5 carton indexes, py-ch25 byte indexes, py-ch27 station/jar, py-ch22 bell plate and key card, js-ch20 dispenser tag and storyteller badge, js-ch27 RESET; cpp ch29 draws its rail helpers 70px and Tick 104px tall on phones, js ch9 P5's crate is `.lg`. Scan: 296 labels under 12px → 0 (142 pages × 390/1280).

### Promoted characters (`comic-critters.js`)

- `linecook` and `asyncwaiter` (Rust ch26/ch27, with the badge as `lbl-deco`); rust ch26, ch27 and ch29 copies deleted.
- `cookiecutter` (with ch19's `data-size="small"` child cutter and growing name) and `cookie` (Python ch15/ch19/ch20); pages use `data-char="cookiecutter"`.
- `emptytrain` (Python ch4 and ch21). JavaScript ch5 keeps its own different drawing under that name.
- The `sealed` and `bag` originals in py-ch7, py-ch8 and py-ch12 (and py-ch12's guarded error-critter copies) were deleted, so those pages get the label fixes; python ch4, ch7, ch8 and ch12 now load `comic-critters.js`.
