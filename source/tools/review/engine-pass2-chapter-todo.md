# Engine pass 2: chapter clean-ups for the fix swarm (2026-11-08)

The engine changes behind these items are in `tools/DESIGN_SYSTEM.md` §8 and the AUTHORING.md note "Engine pass 2". Line numbers were taken at 12:35 and drift as chapters are edited; each section gives the grep that rebuilds its list. Edit chapter files only (`*/chN.html`, `assets/ext/*`), never the engine.

## 1. Panels the new checker test flags (content wider than its panel)

`tools/check_chapter.js` now fails a page when, with every `<details>` open, a `.panel`'s content is wider than the panel (the panel clips it silently), or a strip/notebook child is wider than the page column. Run at 12:40 on the pages as they were this morning, with the pass-2 engine (`tools/review/engine-pass2-check.txt`, "clip" column; the live site at 12:20 also flagged rust/ch1 P26 +46px):

- cpp/ch2.html: @390: P26 +26px
- cpp/ch15.html: @390: P23 +320px
- cpp/ch22.html: @1280: P34 +78px
- cpp/ch24.html: @1280: P39 +112px
- go/ch21.html: @390: P13 +98px
- javascript/ch12.html: @390: P28 +16px
- javascript/ch13.html: @390: P30 +3px
- javascript/ch14.html: @390: P9 +17px
- javascript/ch26.html: @390: P44 +42px
- python/ch3.html: @390: P41 +15px, P43 +15px
- python/ch11.html: @390: P35 +70px
- python/ch26.html: @390: P30 +14px
- python/ch27.html: @390: P27 +28px
- rust/ch1.html: @390: P26 +46px
- rust/ch15.html: @390: P17 +95px
- rust/ch20.html: @390: P2 +7px
- rust/ch29.html: @390: P19 +145px

For each: find the child that is too wide (usually a chapter grid without `minmax(0, 1fr)` tracks, a chapter table with `min-width`, or a fixed-width SVG/figure), give the grid a `minmax(0, 1fr)` track and its children `min-width: 0`, stack a wide table as `table.ref-table`, or wrap a wide drawing in `.picscroll`. Re-run the checker on the page.

## 2. Extension steppers: reserve their height, mark their clue

The engine's walker, map, tracer and stack-and-heap stepper keep the tallest step's height, so their buttons never move. Extension steppers don't yet: pass `{ reserve: true }` as the 4th argument to `L.runner`, and add `data-reserve` to any picture or clue box in the widget whose height changes per step (go ch8's panic lens moves its buttons 120px at 390 and 26px at 1280). Check that `render(state, announce)` draws a step from the state alone (it will be called once per step with `announce = false`). Mark the highlighted line or clue with `li.now`, `.hl` or `data-now`: on phones the engine scrolls it into view above the sticky controls after each press (go ch8 already uses `.hl`).
`grep -n "L.runner(" assets/ext/*.js`:

- `cpp-ch1.js:141`
- `cpp-ch2.js:218`
- `cpp-ch4.js:231`
- `cpp-ch6.js:176`
- `cpp-ch6.js:250`
- `cpp-ch8.js:82`
- `cpp-ch20.js:76`
- `cpp-ch29.js:121`
- `go-ch1.js:161`
- `go-ch2.js:212`
- `go-ch2.js:268`
- `go-ch4.js:134`
- `go-ch4.js:264`
- `go-ch8.js:132`
- `go-ch9.js:129`
- `go-ch10.js:148`
- `go-ch11.js:133`
- `go-ch14.js:156`
- `go-ch15.js:61`
- `go-ch16.js:77`
- `go-ch19.js:187`
- `go-ch19.js:306`
- `go-ch20.js:147`
- `go-ch21.js:172`
- `go-ch23.js:131`
- `go-ch24.js:187`
- `go-ch25.js:197`
- `go-ch25.js:256`
- `go-ch26.js:229`
- `go-ch27.js:123`
- `js-ch8.js:119`
- `js-ch9.js:116`
- `js-ch9.js:225`
- `js-ch22.js:138`
- `js-ch25.js:136`
- `py-ch1.js:87`
- `py-ch3.js:53`
- `py-ch7.js:231`
- `py-ch9.js:190`
- `py-ch12.js:217`
- `py-ch14.js:104`
- `py-ch16.js:170`
- `py-ch16.js:196`
- `py-ch16.js:236`
- `py-ch24.js:123`
- `py-ch24.js:223`
- `py-ch25.js:147`
- `py-ch25.js:214`
- `py-ch27.js:169`
- `rs-ch1.js:95`
- `rs-ch2.js:112`
- `rs-ch3.js:113`
- `rs-ch8.js:78`
- `rs-ch9.js:124`
- `rs-ch14.js:229`
- `rs-ch19.js:180`
- `rs-ch20.js:202`
- `rs-ch22.js:135`
- `rs-ch26.js:177`
- `rs-ch27.js:176`
- `rs-ch29.js:255`

## 3. Terminals: delete chapter wrap overrides

Card terminals are now `.term.wrap` automatically, failing runs wrap on phones (`.wrap-sm`), and `.term.wrap` lines never break at a hyphen. Chapter rules that force `white-space: pre-wrap; overflow-wrap: anywhere` on terminals split tokens and drift carets wherever the engine's per-line blocks aren't used.

- **Go, bare `.term` (every terminal), 28 files + js-ch15.** Delete the rule. Add `class="term wrap"` to terminals whose long lines must wrap at every width (Go messages have no carets, so it is safe). `grep -n '^\.term *{[^}]*overflow-wrap: *anywhere' assets/ext/*.css`:
  `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- **`.duo-card .term` copies** (the engine handles card terminals now). Delete the `.term` half; keep a `.duo-card .code` font size if wanted:
  `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- **`.term.wrap` copies identical to the engine's** (harmless; delete):
  `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- **Other terminal overrides with `anywhere`** (review each: delete, or replace by `class="term wrap"` on the terminals that need it; add `data-nowrap` to a failing-run terminal that must scroll on phones):
- `cpp-ch1.css:67` `.pair2 .term`
- `cpp-ch3.css:23` `.pair2 .term`
- `cpp-ch4.css:22` `.pair2 .term, .pair2 .code`
- `cpp-ch5.css:22` `.pair2 .term`
- `cpp-ch6.css:24` `.pair2 .term, .pair2 .code`
- `cpp-ch7.css:13` `.pair2 .term`
- `cpp-ch8.css:25` `.pair2 .term, .pair2 .code`
- `cpp-ch8.css:120` `.pair2.stack .term.wrap`
- `cpp-ch9.css:13` `.pair2 .term`
- `cpp-ch10.css:13` `.pair2 .term`
- `cpp-ch11.css:13` `.pair2 .term`
- `cpp-ch12.css:13` `.pair2 .term`
- `cpp-ch13.css:17` `.pair2 .term`
- `cpp-ch13.css:19` `.pair2.stack .term`
- `cpp-ch15.css:18` `.pair2 .term`
- `cpp-ch17.css:18` `.pair2 .term`
- `cpp-ch21.css:13` `.pair2 .term`
- `cpp-ch23.css:16` `.pair2 .term`
- `cpp-ch23.css:55` `.strip .term`
- `cpp-ch24.css:13` `.pair2 .term`
- `cpp-ch25.css:16` `.pair2 .term`
- `cpp-ch25.css:55` `.strip .term`
- `cpp-ch26.css:13` `.pair2 .term`
- `cpp-ch27.css:18` `.pair2 .term`
- `cpp-ch28.css:12` `.pair2 .term`
- `cpp-ch29.css:18` `.pair2 .term`
- `js-ch1.css:70` `.stack .term`
- `js-ch1.css:105` `.helpcard .term`
- `js-ch3.css:121` `.panel .term, .notebook .term`
- `py-ch2.css:76` `.gallery .term`
- `py-ch27.css:22` `@media (min-width: 641px)`
- `rs-ch27.css:51` `@media (min-width: 641px)`

## 4. Walker overrides that block the phone walker

The engine walker now gives code most of the phone width (38px gutter, 14px code, tab stops of 2, long tokens scroll). These chapter rules replace it with `white-space: pre` (no wrapping at all) or `anywhere` (mid-word breaks). Delete them unless the chapter needs exact columns (then keep `pre`, and say why in a comment). `grep -n '\.recipe li *{[^}]*white-space' assets/ext/*.css`:

- `cpp-ch25.css:62` `.walk.full .recipe li { white-space: pre-wrap; overflow-wrap: anywhere; }`
- `go-ch1.css:110` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.92rem; }`
- `go-ch2.css:46` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch3.css:68` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch4.css:199` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch5.css:100` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch6.css:68` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch7.css:42` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch9.css:43` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch10.css:43` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch11.css:42` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch12.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch13.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch14.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch15.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch16.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch18.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch20.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch23.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `go-ch27.css:37` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `js-ch15.css:102` `@media (min-width: 641px) { .walk .recipe li { white-space: pre; overflow-wrap: normal; overflow-x: auto; } }`
- `js-ch21.css:116` `@media (min-width: 641px) { .walk .recipe li { white-space: pre; overflow-wrap: normal; } }`

## 5. Wide drawings: use the engine's `.picscroll`

`.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
For two-half comparisons (rust ch26 P10, ch28 P1) a stacked phone drawing is still better than a scroller.

## 6. Reference tables: switch to `table.ref-table`

New engine component: code in cells never breaks inside a name, and rows stack into labelled cards at ≤560px (`data-h` from the header, written by comic.js). These chapter table rules use `overflow-wrap: anywhere` on code (`queueMicrotask` → `queueMicrot|ask`). Add `class="ref-table"` to the table (keep the chapter class for colours), delete the `anywhere` rule and any phone stacking copy (js-ch23's `.mini` is one). Rebuild the list with `grep -n 'overflow-wrap: *anywhere' assets/ext/*.css` and keep rules whose selector names `td`, `th`, `tr` or `table`; tables styled through other class names (`.mini code`, `.ops code`) need the same change:

- `cpp-ch7.css:37` `.vs td code`
- `cpp-ch9.css:33` `.vs td code`
- `cpp-ch10.css:37` `.vs td code`
- `cpp-ch11.css:72` `.vs td code`
- `cpp-ch12.css:36` `.vs td code, .vs th code`
- `cpp-ch13.css:51` `.vs td code`
- `cpp-ch14.css:34` `.vs td code, .vs th code`
- `cpp-ch15.css:28` `.vs td code`
- `cpp-ch16.css:35` `.vs td code, .vs th code`
- `cpp-ch17.css:36` `.vs td code`
- `cpp-ch18.css:33` `.vs td code, .vs th code`
- `cpp-ch19.css:30` `.vs td code, .vs th code`
- `cpp-ch20.css:28` `.vs td code, .vs th code`
- `cpp-ch21.css:47` `.vs td code, .vs th code`
- `cpp-ch22.css:31` `.vs td code, .vs th code`
- `cpp-ch23.css:32` `.vs td code`
- `cpp-ch24.css:29` `.vs td code, .vs th code`
- `cpp-ch25.css:32` `.vs td code`
- `cpp-ch26.css:29` `.vs td code, .vs th code`
- `cpp-ch27.css:29` `.vs td code, .vs th code`
- `cpp-ch27.css:67` `.ex-opt code, .page-body code, .caption code, .bubble code, .recap code, .fineprint code, .fineprint`
- `cpp-ch28.css:31` `.vs td code, .vs th code`
- `cpp-ch29.css:29` `.vs td code, .vs th code`
- `cpp-ch29.css:88` `.ex-opt code, .page-body code, .caption code, .bubble code, .recap code, .fineprint code, .fineprint`
- `go-ch28.css:86` `.allocrace table.race-table samp`
- `js-ch10.css:58` `.cp10 tbody th`
- `js-ch13.css:68` `table.plain13 code`
- `js-ch15.css:50` `table.plain15 code`
- `js-ch19.css:61` `table.hints19 code`
- `js-ch20.css:49` `table.t20 code`
- `js-ch21.css:60` `table.copy21 code`
- `js-ch22.css:47` `table.ref22 code, table.ref22 samp`
- `js-ch23.css:64` `table.xr-read code`
- `js-ch23.css:100` `table.xr-read td`
- `py-ch19.css:45` `.ch19-table code`
- `py-ch24.css:81` `.ch24-table code`
- `rs-ch9.css:38` `.ops td code`
- `rs-ch13.css:36` `.ops td code`
- `rs-ch15.css:41` `.ops td code`
- `rs-ch17.css:57` `.ops td code`
- `rs-ch18.css:39` `.ops td code`
- `rs-ch18.css:84` `.oscmd td code`
- `rs-ch19.css:60` `.ops td code, .ops th code`
- `rs-ch20.css:29` `.ops td code`
- `rs-ch20.css:90` `.oscmd td code`
- `rs-ch22.css:31` `.ops td code`
- `rs-ch24.css:38` `.ops td code`
- `rs-ch25.css:29` `.ops td code`
- `rs-ch27.css:36` `.ops td code`

## 7. Critter labels under 12px that the engine can't fix

The engine's Compiler, Inspector, signpost and trail guide now draw labels at 12px+ at the default width (scan: Compiler 570 labels at 3.1–9.9px → 438 visible at 12.5px+, the rest hidden at `.sm`). What remains comes from chapter copies or tiny drawings:
- Chapter copies that override the engine critter: `rs-ch14.js` (inspector, "TEST" 6.4px), `rs-ch16.js` and `rs-ch24.js` (inspector), `rs-ch15.js` and `rs-ch28.js` (trailguide: compass "N" 4.5px, "CLIFF" 10.2px). Delete them and use the engine's (`grep -n "inspector =\|trailguide =" assets/ext/*.js`). `py-ch21.js` and `cpp-ch18.js` define different, chapter-local inspectors under the same name ("mypy" 7.9px): rename them (house rule on distinctive names) and enlarge their labels.
- Drawings too small for any label: python ch10's signposts (52–64px wide, 8.3–10.2px even after the engine grows them), javascript ch29's signpost (74px, 11.8px), rust ch29's inspector stamp (78px, 9.1px). Draw them at the default 130px, or at least 96px.
- Other critters drawn small by chapters (scan in scratch, not engine items): waiter, linecook, machine (python ch10 at 4.3px), asyncwaiter, tumble, cabinet, sealed, kitchenhand, crate, bag. Rule for authors: a drawing with a data label must render the label at 12px or more.

## 8. Chapter rules the engine now makes redundant (delete)

- Current-line token colour: the engine sets ink for every `li.now` token. - `js-ch8.css:54` `.duel8 ol.d-code li.now [class^="tok-"] { color: var(--ink); }` - `py-ch16.css:61` `.tl-code li.now [class^="tok-"], .tl-code li.mark [class^="tok-"] { color: var(--ink); }` (keep py-ch16's `li.mark` half).
- Chapter scroll hints or empty-state notes for tracers: the tracer crops a picture at most 24 units too wide instead of scrolling, and says "(nothing in memory yet)".
- Chapter transcript styles (`cpp-ch2.css` `.report .transcript code`, `py-ch3.css` `.panel > details .transcript`, `py-ch11.css` `[data-splitter] .transcript code`): check each text version at 390 now that rows stack as cards; delete what the cards make unnecessary.
- `.duo-card .file-tab { justify-self: start }` copies (`cpp-ch1`, `cpp-ch2`, `go-ch4`, `js-ch10` to `js-ch15`): the engine already does it.

## 9. Not changed by the engine (left for chapters, with reasons)

- **Walker text versions repeat the whole screen per row** (python ch26 P35, pdb session). Changing the Screen column to "new lines only" changes what every walker's header promises; a chapter with a long screen should give the walker a shorter program or a chapter transcript.
- **Inline `->` / `=>` can break after the hyphen in prose code** (rust ch8). Rare; wrap such code in a no-break span in the page if it shows.
- **Two-half comparison drawings** (rust ch26 P10, ch28 P1): a phone version reads better than a scroller.
- **Pages edited during the check run**: python/ch10 (captures missing for fill_v1.py, fill_v2.py, guests_loop2.py), rust/ch13 (match_no_err.rs, parsons_q_alt.rs; assets/ext/rs-ch13.js gone), python/ch20 (walker loud.py parity), rust/ch14 (empty terminals in P23/P39, map parity P34) fail on the live site and pass as they were this morning. Whoever is editing them should re-run the checker.
