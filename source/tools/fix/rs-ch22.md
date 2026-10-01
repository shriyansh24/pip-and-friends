# Fix bundle: rust/ch22.html

10 review findings, 1 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 28 (memory tracer, the entry desk at work), text version @1280 and 390** (visual-rs-21-25): The opened text version table is 964px wide inside a 718px box even at desktop, and 5883px tall: the Line column takes 515px, so 'What happens', 'Memory' and 'Screen' sit off to the right behind a scroller while each row is ~250px of empty space.
   - evidence: Measured with every <details> open: table.transcript width 964 vs details 718 (1280) and 316 (390); height 5883px; column widths [44, 515, 225, 79, 101]. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a22-w1280-043-p28.png (rows 2-4 mostly blank, right columns clipped). The other transcripts in ch21-25 fit at 1280.
   - fix: table.transcript td code { white-space: pre } → table.transcript td code { white-space: pre-wrap; overflow-wrap: anywhere } (engine), or shorten the Line cell to the line number (a text version must be readable without sideways scrolling)
2. **[medium] [visual] panel 31 (which drawer? table) @390** (visual-rs-21-25): In the drawer table on phones, type names break in the middle: 'VecDequ|e', 'HashMa|p', 'BTreeMa|p', 'HashSe|t', 'BinaryH|eap'. A beginner reads them as different words.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a22-w390-048-p31.png. rs-ch22.css: '.ops td code { overflow-wrap: anywhere; }'; the 3-column table is squeezed into 316px.
   - fix: .ops td code { overflow-wrap: anywhere } → .ops td code { overflow-wrap: normal; white-space: nowrap } and let .ops-wrap scroll (break-ui: break long words only when they must; never inside an identifier)
3. **[medium] [visual] panel 4 (the queue tube), 8 (filing cabinet), 10 (BTreeSet), 25 (with_capacity) @390 (4, 8), both (10, 25)** (visual-rs-21-25): Hand-drawn figures shrink their labels below 12px: P4's 'push_front', 'pop_back', 'Ada', 'Ben', 'Cleo' are 8.2px at 390; P8's call numbers and 'walk top to bottom: sorted, every time' are 9.6-10.7px; P10's set items 'a','b','c' are 8.2px even at 1280; P25's slot numbers are 10.6-11.5px.
   - evidence: Audit SVG text sizes (390): p4 8.2px, p8 9.6-10.7px, p10 8.2px, p25 10.6-11.5px. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a22-w390-009-p4.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a22-w390-017-p10.png. P4/P8 have no .fig-narrow version and no .picscroll.
   - fix: <svg class="fig"> → <div class="picscroll"><svg class="fig pic-wide"></svg></div> for P4 and P8; draw P10's set and P25's critter at the default .char width instead of a small inline size (engine picscroll keeps labels at design size on phones)
4. **[medium] [visual] panel 41 (the typesetter's ruler, [data-ruler]) @390** (visual-rs-21-25): The ruler's column numbers shrink to 9.5px on phones (cells 16px) for the 12-cell specs, because the SVG is width:100% and scales down instead of scrolling inside its .rl-wrap scroller.
   - evidence: steps.js after choosing {:-^12}: min SVG text 9.5px ('1'…'12'). Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/st22-w390-ruler-p41.png. rs-ch22.css: '.rl-svg { width: 100% }' + inline max-width W; rs-ch22.js rulerSvg W = n*40+20.
   - fix: .rl-svg { width: 100% } → .rl-svg { width: max(100%, calc(var(--rl-w) * 0.8px)) } with --rl-w set to W, letting .rl-wrap scroll (column numbers are the point of a ruler; keep them >=12px)
5. **[low] [content] panel 39** (content-rs-22-24): fromstr.rs builds its error message eagerly with `ok_or(format!(...))` just after Panel 27 taught that eager arguments are worked out even when not needed, which is the same trap; the plan lists ok_or_else.
   - evidence: fromstr.rs line 11: `s.split_once(':').ok_or(format!("no colon in {s:?}"))?;` Panel 27: "Rust works out every argument before a call ... Catchphrase: the recipe runs only if the drawer is empty." Panel 39: "`ok_or` turns a missing colon into an Err".
   - fix: Use `.ok_or_else(|| format!("no colon in {s:?}"))?` and recapture, adding to the line-11 note: "`ok_or_else` takes a recipe, like `or_insert_with`, so the message is only built when the colon is missing."
6. **[low] [content] panel 42 (ex-format-fill), 48 (ex-b3)** (content-rs-22-24): Two fill keys reject a placeholder that gives identical output: text is left-aligned by default (panel 41 says so), yet `{:6}` and `{title:w$}` aren't accepted, while the number blanks do accept their no-alignment spellings.
   - evidence: ex-format-fill-m: {"line": 4, "text": "{:<6}"} with no accept; line 5 accepts "{:4}" and line 6 accepts "{:6.2}". ex-b3-m: {"line": 5, "text": "{title:<w$}"} with no accept; line 6 accepts "{year:6}". Panel 41 note: "`<` pushes it left. For text this is the default, so `{:8}` would look the same."
   - fix: Add "accept": ["{:6}"] to ex-format-fill line 4 and "accept": ["{title:w$}"] to ex-b3 line 5, and mention it in each explain.
7. **[low] [book] panel 50 (teaser)** (book-rs): The teaser's pictures for Rc and RefCell aren't the ones Chapter 23 uses, so the hand-off doesn't connect.
   - evidence: ch22 teaser: 'An Rc is a shared membership with a counter ... A RefCell lets you borrow while the program runs, with the ledger checked live.' ch23 cover and recap: Rc = 'a member counter on a shared family account'; RefCell = 'a whiteboard with a sign-out sheet' ('THE WHITEBOARD STILL HAS RULES; IT JUST CHECKS THEM LATER').
   - fix: ch22 teaser: 'An Rc is a shared family account with a member counter ... A RefCell is a whiteboard with a sign-out sheet, checked while the program runs.'
8. **[low] [content] panel 9** (content-rs-22-24): Mabel says text keys are sorted "the way the Compiler compares text". The comparison is done by the running program (str's Ord), not by the Compiler character, who only checks before anything runs.
   - evidence: "Text keys are sorted the way the Compiler compares text: character by character, by their code numbers." CAST.md: the Compiler "checks the whole program before anything runs".
   - fix: "Text keys are sorted the way Rust compares text: character by character, by their code numbers."
9. **[low] [visual] panel cover, 4, 8, 14, 23, 33 (.drop-in / .slide-in) @1280** (visual-rs-21-25): Chapter motion breaks the engine's motion rules: 0.8s and 0.9s entrances with the built-in ease-out, a 26-30px travel and an overshoot keyframe, plus a 0.3s delay. Because the hidden state only applies once .played is added, the drawing is visible, blinks out, then drops in.
   - evidence: rs-ch22.css: '@keyframes ch22-drop { 0% { transform: translateY(-26px); opacity: 0 } 70% { translateY(3px) } }', '.motion .panel.played .drop-in { animation: ch22-drop 0.8s ease-out 0.3s 1 both }', 'ch22-slide 0.9s ease-out'. Animations: off and prefers-reduced-motion correctly stop it (checked: animationName none in both).
   - fix: animation: ch22-drop 0.8s ease-out 0.3s both (from -26px, overshoot 3px) → animation: ch22-drop var(--dur-move) var(--ease-out) both, keyframes from translateY(-8px) scale(0.95) opacity 0 to none, no overshoot, no delay (Emil: entrances <300ms, start at 0.95 + opacity, strong custom ease-out; no blink before the start)
10. **[low] [visual] panel extension CSS (.fig text) @n/a** (visual-rs-21-25): rs-ch22.css, rs-ch24.css and rs-ch25.css still use the unscoped '.fig text { font-size: 20px }' that AUTHORING's house rule warns about. No figure in these pages uses font-size attributes today, so nothing breaks yet, but the next attribute-sized label will be silently overridden.
   - evidence: rs-ch22.css:6, rs-ch24.css:9, rs-ch25.css:6 '.fig text { fill: var(--ink); … font-size: 20px; }'. ch21/ch23 use the safe ':not([font-size])' form. Grep of the three pages finds no attribute-sized fig text.
   - fix: .fig text { … font-size: 20px } → .fig text:not([font-size]) { … } (house rule: CSS beats SVG presentation attributes)

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch22 (Drawers and Typesetters)

## Engine-refresh clean-ups for this chapter
- `rs-ch22.js:135`
- `rs-ch22.css:31` `.ops td code`
