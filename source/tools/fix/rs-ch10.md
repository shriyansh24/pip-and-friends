# Fix bundle: rust/ch10.html

7 review findings, 2 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 36 @390** (visual-rs-6-10): The remote-control cheat card hides most of its CALLED AS column behind the right edge on phones ("radio.louder(", "radio.recycle", "Radio::new(..").
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a10/w390-062-p36.png. rs-ch10.css:33-38 `.ops` with `td:first-child { white-space:nowrap }` in `.ops-wrap`.
   - fix: Same as ch8 p31: stack `.ops` rows at ≤640px. Before: 3-column table in a scroller → After: one row card per button (nothing hidden).
2. **[medium] [visual] panel 37 (cards A-F) @390** (visual-rs-6-10): Verdict-card terminals wrap compiler source lines (`9 | let taken =` / `card.name;`) so the dashes and carets point at the wrong place, and the prompt splits (`cargo run` / `-q`).
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a10/p3637.png (card C, column 3). Cause: engine `.duo-card .term { white-space: pre-wrap; overflow-wrap: anywhere }` (comic-widgets.css:242); rs-ch10.css:50 fixes only `.verdicts .code`.
   - fix: Mark the terminals `class="term wrap"`; meanwhile add `.verdicts .term { white-space: pre; overflow-wrap: normal; overflow-x: auto }`. Before: `pre-wrap; anywhere` → After: `.term.wrap` (caret-safe wrapping).
3. **[medium] [visual] panel 6, 8, 21, 28, 30, 33 @390** (visual-rs-6-10): Struct/method compiler errors (E0063, E0594, E0106, E0596, E0382, E0599) are cut at the right edge on phones, hiding the label text after the carets.
   - evidence: Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a10/w390-011-p6.png and /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a10/w390-014-p8.png ("^^^^ missing `bo", "^^^^^^^^ cannot"). 83 sideways scrollers at 390.
   - fix: `<pre class="term wrap" …>` on compiler-error terminals. Before: `.term` → After: `.term.wrap`.
4. **[low] [visual] panel 23 (.buttons3), cover/26 (.stamp-in, .slide-in) @1280, 390** (visual-rs-6-10): `.buttons3 li` hand-rolls a card (3px border, raw 12px radius, raw 4px shadow) instead of the engine card (`.duo-card`, --radius-lg, hard shadow tokens), and the chapter's slide/stamp entrances run 1s / 0.7s.
   - evidence: assets/ext/rs-ch10.css:54-59 and :109-112 (`ch10-slide 1s ease-out .3s`, `ch10-stamp .7s ease-out .4s`).
   - fix: Before: `.buttons3 li { border:3px solid var(--ink); border-radius:12px; box-shadow:4px 4px 0 var(--ink) }` → After: `<li class="duo-card">` with only the grid/centering kept (one card component). Before: `ch10-slide 1s ease-out .3s` → After: `var(--dur-move) var(--ease-out)` from `translateY(-12px); opacity:0`.
5. **[low] [visual] panel 3 @390** (visual-rs-6-10): The caption under the form drawings says "left: the design… right: one instance", but on phones the two drawings stack vertically.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a10/w390-006-p3.png (`.figcap` text vs stacked `.figrow`). Same class as INTEGRATION_TODO 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS' (new instance).
   - fix: Refer to the drawings by their headings: "the blank STRUCT CARD: the design… CARD · ANA: one instance". Before: `left:` / `right:` → After: heading names (true at every width).
6. **[low] [content] panel 32** (content-rs-10-12): It says String::new() and String::from have both been used since Chapter 6, but String::from first appears in Chapter 7 (Chapter 6 uses only String::new).
   - evidence: Line 663: "`String::new()` and `String::from(\"...\")`, which you've used since Chapter 6". data/rs-ch6.json: String::new in 29 programs, String::from in none; data/rs-ch7.json: String::from in 39 programs.
   - fix: "`String::new()` (since Chapter 6) and `String::from(\"...\")` (since Chapter 7)".
7. **[low] [content] panel notebook: Lab step 4, Go deeper** (content-rs-10-12): The 'Collect the codes' list says these are the codes in this chapter but leaves out E0308 (panel 16's Celsius/Fahrenheit newtype error), and the Go deeper error-index list also leaves out E0106, E0382 and E0308, which the chapter teaches.
   - evidence: Lab: "E0063, E0594, E0609, E0277, E0106, E0596, E0382, E0423 and E0599 all appear in this chapter." Go deeper: "The error index: E0063, E0594, E0609, E0277, E0596, E0423, E0599". Panel 16 (tuple_mix.rs): "error[E0308]: mismatched types".
   - fix: Add E0308 to the Lab list, and add E0106, E0308 and E0382 to the error-index line.

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch10 (Forms and Remote Controls)
- rs-ch10.css also copies the `[data-mem]` styles, which are now in the engine. Remove its copy along with rs-ch7 and cpp-ch8.

## Engine-refresh clean-ups for this chapter
- `.mem-*` / `.mh-*` blocks still copied in `rs-ch7.css`, `rs-ch10.css`, `cpp-ch8.css` and `go-ch10.css`. They override the engine's sizes, including the `.mem-svg.narrow` rules the engine removed. Delete them.
