# Fix bundle: rust/ch9.html

10 review findings, 6 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 2, 7, 13, 22, 25, 29, 40 @390** (visual-rs-6-10): Seven hand-drawn figures shrink to 8.1-9.6px labels on phones; p7 (the vanishing local), p29 (array window) and p40 (split_at_mut) carry their idea only in the drawing.
   - evidence: Audit at 390: p2 'primary label:' 8.1px; p7 'Case 1' 8.1px, 'make_label()' 9.1px; p13 'slot 0' 8.1px; p22 '"Ana"' 8.1px; p25 'start: 2' 8.1px; p29 'middle: &[i32] · ptr → item 1 · len 3' 8.1px; p40 'cut at 1' 8.1px (94 SVG text nodes under 12px). Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a9/w390-013-p7.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a9/w9-1.png (p29, p40). Known class (INTEGRATION_TODO 'From rust ch9'); new: sizes measured, engine .picscroll available.
   - fix: Wrap each as `<div class="picscroll"><svg class="fig pic-wide">` (or a `.fig-narrow` phone drawing as ch8 p23 does). Before: 680-unit figure scaled to 0.47 → After: natural 560px width in a sideways scroller (labels ≥12px).
2. **[medium] [visual] panel 27, 38 (slice window) @390** (visual-rs-6-10): The slice-window widget's byte numbers and slice card are 10.5-11.7px on phones ("0…11", "&s[0..5]", "ptr → byte 0").
   - evidence: Audit at 390: p27 '0' 10.5px, '&s[0..5]' 11.7px, 'ptr → byte 0' 11.1px. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a9/w9-0.png (left column, p27 window 6). rs-ch9.js:57-66 picks a narrower viewBox on phones but the drawing still scales below 1.
   - fix: Draw the phone layout at natural size and let `.sw-stage` scroll (`overflow-x:auto`, as the engine tracer does), or raise `.sw-idx` to 22px and `.sw-row` to 22px in the narrow layout. Before: `.sw-idx { font: 800 17px }` scaled ~0.62 → After: ≥12px rendered (engine minimum).
3. **[medium] [visual] panel 27, 38 (slice window) @1280, 390** (visual-rs-6-10): The window frame re-animates (`sw-drop`) on every Next/Back press, including arrow-key steps: keyboard-triggered, frequent motion, 350ms (over budget), built-in ease-out, starting from opacity .4 with no scale.
   - evidence: assets/ext/rs-ch9.css:97-98 `.motion .sw-frame { animation: sw-drop 0.35s ease-out 1 both }` (the stepper redraws the frame each step, rs-ch9.js:89). Emil standard 2: keyboard-initiated actions get no animation.
   - fix: Before: `.motion .sw-frame { animation: sw-drop 0.35s ease-out }` → After: delete the rule (remedy 1: the new window position is the information; animating it on every key press makes stepping feel slow).
4. **[medium] [visual] panel 29, 40 (also 13, 25, 43) @1280, 390** (visual-rs-6-10): `.fig text` beats the size and font set on parent `<g>` elements: the box numbers meant as 26px mono (`<g class="m" style="font-size:26px">`) render as 20px hand-lettering, and 28 attribute sizes are overridden in all.
   - evidence: svgattr measurement: p29 '3' set 26px on <g> → 20px; p40 '10' 26px → 20px, 'slot 0' 16px → 20px; p13 'slot 0' 16 → 17; p25 '0' 18 → 20; p43 'name' 15 → 17. `class="m"` sits on the <g>, but rs-ch9.css:7 targets `.fig text.m`. Source rust/ch9.html:718, 931, 938.
   - fix: Move `class="m"` and the size onto each `<text>`, or add `.fig g.m text { font-family: var(--f-code); font-weight: 800 }` and scope sizes as `.fig text:not([font-size])`. Before: `.fig text { font-size: 20px }` → After: `.fig text:not([font-size])` (AUTHORING 'SVG text sizing' house rule; rs-ch12 flagged this ch9 risk).
5. **[medium] [visual] panel 3, 8, 9, 14, 20, 21, 33, 34, 37 @390** (visual-rs-6-10): Borrow-error terminals (the chapter's 'case files') are cut at the right edge on phones, hiding the secondary labels the casebook method depends on ("----- immutable borrow occurs here").
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a9/w390-006-p3.png (labels cut at "----- immutable", "---- im"). 75 sideways scrollers at 390.
   - fix: `<pre class="term wrap" …>` on compiler-error terminals. Before: `.term` → After: `.term.wrap` (whole message visible, carets aligned).
6. **[medium] [visual] panel 5 (fix cards 1-3) @390** (visual-rs-6-10): The three fix cards' code wraps with `pre-wrap; overflow-wrap:anywhere`, so continuation lines restart at column 0 and lose their indentation (`let mut queue = vec!` / `[String::from("Ana"),`), and terminals break the prompt (`cargo` / `run -q`).
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-6-10/a9/w390-008-p5.png. rs-ch9.css:46 sets only font-size on `.verdicts .code`; engine comic-widgets.css:242 forces `pre-wrap; overflow-wrap:anywhere` on `.duo-card .code/.term`. ch8 and ch10 already override it (`.verdicts .code { white-space: pre }`).
   - fix: Add `.verdicts .code { white-space: pre; overflow-wrap: normal; overflow-x: auto }` and mark the terminals `term wrap`. Before: `pre-wrap; overflow-wrap: anywhere` → After: `pre` + scroll for code, `.term.wrap` for runs (code keeps its shape; carets stay aligned).
7. **[low] [content] panel 28** (content-rs-7-9): The first panic in the chapter, past_end.rs in panel 28, shows `thread 'main' (1)` with no explanation. The thread-id note comes nine panels later, in panel 37.
   - evidence: Panel 28 terminal: "thread 'main' (1) panicked at src/main.rs:6:22:". The note "The (1) is the thread's id number: on your computer it will be a different number" first appears in panel 37. AUTHORING §7 Rust: say this once, where panics appear.
   - fix: Add the one-line thread-id note to panel 28's explanation, and shorten panel 37 to "(the thread id again)".
8. **[low] [content] panel choice exercises** (content-rs-7-9): Choice length bias: the correct option is clearly the longest in ex-kept-choice, ex-b5 and ex-labels.
   - evidence: ex-kept-choice-m [68] vs 31/33; ex-b5-m [76] vs 19/46/42; ex-labels-m [69] vs 51/40/25; ex-e0106-choice-m [62] vs 46/48. INTEGRATION_TODO "From the review swarm" CHOICE LENGTH BIAS.
   - fix: Shorten the correct options or move their extra detail into the `why` text.
9. **[low] [visual] panel cover (.stamp-in), panels with .swing @1280, 390** (visual-rs-6-10): Stamp and swing entrances are 0.7s and 1.2s with delays (ease-out built-in, ease-in-out rock).
   - evidence: assets/ext/rs-ch9.css:102-105. Read from source.
   - fix: Before: `ch9-stamp 0.7s ease-out 0.4s` → After: `300ms var(--ease-out) 150ms`. Before: `ch9-swing 1.2s ease-in-out .3s` → After: delete, or `300ms var(--ease-out)` (illustration entrances stay under the 300ms cap).
10. **[low] [content] panel ex-spot-suspect** (content-rs-7-9): The prompt says the caret is on the push at line 5, and only line 6 comes after it, so the suspect is given away.
   - evidence: "The caret points at the push on line 5. Be the detective: which line is the suspect ..." spot_suspect.rs: line 4 reads best before the push, and line 6 is the only line after line 5.
   - fix: Don't name the caret line in the prompt, or add one innocent line after the push (for example `println!("{} scores", scores.len());`) so readers have to choose.

## INTEGRATION_TODO lines naming this chapter
- Promote Mabel's permission ledger widget (rs-ch8.js) into the engine if rust ch9/ch19 reuse it.
- ## From rust ch9 (Case Files and Windows)
- Candidate engine widgets: rs-ch9's slice window (UTF-8 byte boxes) and go-ch9's shelf stepper are close cousins. Consider one shared "buffer window" widget.
- Candidate engine widget: go-ch9/ch10's shelf stepper. Strings (go ch11) and later slice chapters could reuse it; unify it with rs-ch9's slice window.
- rs-ch12 reports that `.fig text` CSS overrides a font-size set on a parent `<g>`, so rust ch9's figure text may be smaller than intended. Check in review.
- `.fig text { font... }` in 12 chapter CSS files (copied between chapters) overrides SVG font attributes. rust ch9 and ch11 figures are probably affected. The review should screenshot-check every figure using attribute sizes; the house rule is now in AUTHORING.

## Engine-refresh clean-ups for this chapter
- `rs-ch9.js:124`
- `rs-ch9.css:38` `.ops td code`
