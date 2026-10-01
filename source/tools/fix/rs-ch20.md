# Fix bundle: rust/ch20.html

14 review findings, 4 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [visual] panel notebook: Words from this chapter @1280** (visual-rs-16-20): The glossary page is unreadable on desktop: one 85-character term (the list of eleven error codes) takes the whole term column, so every definition is squeezed to zero width and the open page is 49,660px tall.
   - evidence: The dt holds `E0308 / E0434 / E0502 / E0382 / E0594 / E0596 / E0782 / E0373 / E0599 / E0283 / E0282` in code font; with `.terms { grid-template-columns: max-content minmax(0,1fr) }` (comic.css:295) the term column is wider than the page (audit: every dt sticks out 77px on the right). Crop: scratchpad/review-visual-rs-16-20/v12.png (only 'closure' visible, then blank ruled lines). At 390 the engine stacks terms, so phones are fine.
   - fix: Shorten the term to `error codes (E0308 … E0282)` and put the full list in the definition, or split it into one row per code; the engine fix (`fit-content(14em)`) is in the visual-engine finding.
2. **[medium] [content] panel 21 (walk-for, step 9)** (content-rs-19-21): The walker credits `while let` to Chapter 11, but no earlier Rust chapter teaches it. This page is its first appearance, so new syntax is treated as already known, and it is missing from the chapter's Words list.
   - evidence: walk-for step note: "<code>while let Some(title) = belt.next()</code> (Chapter 11's <code>while let</code>)". A text search of rust/ch1.html–ch19.html and data/rs-ch1*.json finds no "while let" (ch11 has 20 hits for "if let"). The plan's ch11 scope lists if let, let...else and matches!, but not while let.
   - fix: Replace "(Chapter 11's while let)" with a one-line definition: "<code>while let</code> is new: an <code>if let</code> that repeats. It calls <code>next</code>, and while the answer fits <code>Some(title)</code>, it runs the body." Add `while let` to "Words from this chapter".
3. **[medium] [visual] panel P2 @390** (visual-rs-16-20): The long-form anatomy card `|x: i32| -> i32 { x + 1 }` refuses to wrap, which widens the panel's content 5px past its right border, so the caption, cards, checklist and bubble all lose their right edge.
   - evidence: rs-ch20.css:61 `.anatomy > div > code { font: 800 1.3rem var(--f-code); white-space: nowrap }`. audit 'beyond' at 390: p.caption.soft, div.anatomy, ul.checklist, div.scene each end 5px past the panel. Crop: scratchpad/review-visual-rs-16-20/f20/s00.png (second column).
   - fix: `.anatomy > div > code { white-space: nowrap }` → `white-space: normal; overflow-wrap: break-word`, plus `@media (max-width:640px){ .anatomy > div > code { font-size: 1.1rem } }` and `.anatomy > div { min-width: 0; max-width: 100% }`.
4. **[medium] [visual] panel P23 (conveyor belt) @1280** (visual-rs-16-20): The belt redraws on every step and replays a 450ms slide on the moving item each time, including arrow-key steps.
   - evidence: rs-ch20.css:78-81 `.motion .belt-svg .belt-item { animation: ch20-slide 0.45s ease-out both }` from `translateX(-26px); opacity: 0.2`; rs-ch20.js:190 rebuilds the SVG with innerHTML on each render, so a fresh `.belt-item` (and its keyframe) is created on every press. (A headless getAnimations() probe right after stepping returned no running animation, so the replay is inferred from the CSS and JS, not observed.) Emil: keyboard-initiated repeated actions get little or no motion; UI ≤300ms.
   - fix: `animation: ch20-slide 0.45s ease-out` from `-26px` → `animation: ch20-slide var(--dur-ui) var(--ease-out) both` from `translateX(-10px); opacity: 0` (narrow: `translateY(-10px)`), and skip it when the step came from a key press (or delete it: the dashed 'hot station' outline already shows where the item is).
5. **[medium] [content] panel after 31 (exercise ex-fold)** (content-rs-19-21): The fold trace exercise says assert_eq! comes from Chapter 15. It was introduced in Chapter 4 and used for tests in Chapter 14. Chapter 15 only shows it inside doc examples.
   - evidence: ex-fold-m prompt: "(<code>assert_eq!</code>, Chapter 15, checks the result quietly at the end.)" rust/ch4.html part title: "Inside the machine: frames, scope, todo! and assert_eq!", panel 25: "assert_eq!(a, b) panics unless a equals b". rust/ch14.html: "assert_eq!(late_fee(1), 10) says 'these two must be equal'".
   - fix: Change "Chapter 15" to "Chapter 4" (or "Chapters 4 and 14").
6. **[medium] [visual] panel cover, P2, P19, P38 (.part-pop) @1280** (visual-rs-16-20): Same slow entrances as rust/ch16 and ch18: parts pop from scale(0.6) over 600ms with 150ms steps, up to 1.5s per figure; 13 parts on this page.
   - evidence: rs-ch20.css:84-88.
   - fix: `ch20-pop 0.6s ease-out` from `scale(0.6)` → `var(--dur-ui) var(--ease-out)` from `scale(0.95); opacity: 0`, delays 50ms apart.
7. **[low] [content] panel 19–23 (conveyor belt) vs rust/ch13.html panel 35** (content-rs-19-21): New evidence for the known metaphor clash: Chapter 13 called `?` 'a station on the conveyor belt'. This chapter's stations are iterator adapters, and the page never tells readers the two belts are different. Chapter 21 then gives `?` a third picture (customs).
   - evidence: rust/ch13.html panel 35: "So Rust has a station on the conveyor belt, written as one character: ? ." ch20 panel 19: "Adapters are stations: map reshapes each item, filter drops some". See INTEGRATION_TODO "From rust ch13 (Lockers and Parcels)" and "From rust ch20 (Backpacks and Conveyor Belts)".
   - fix: Rename ch13's picture (e.g. 'the return chute' for ?), or add one caption in ch20 panel 19: "(Chapter 13's ? belt carried parcels back to the caller; this belt carries items forward to a packer.)"
8. **[low] [content] panel 35** (content-rs-19-21): The page credits 'index out of range' to Chapter 9. The index-out-of-bounds panic was taught in Chapter 5. Chapter 9 only shows a string-slice range error.
   - evidence: ch20 panel 35: "No index variable, so no index out of range (Chapter 9)". rust/ch5.html: "index out of bounds: the len is 6 but the index is 6". rust/ch9.html's only hit: "end byte index 20 is out of bounds for string of length 11".
   - fix: Change "(Chapter 9)" to "(Chapter 5)".
9. **[low] [visual] panel P20, P24 @390** (visual-rs-16-20): The definition card in P20 and the table in P24 scroll sideways on phones without a cue.
   - evidence: audit scrollers at 390: `.defcard` 582px in 310px (P20); `.ops-wrap` 415px in 316px (P24), caused by `.ops td:first-child code { white-space: nowrap }` (rs-ch20.css:33).
   - fix: Same defcard phone rule as rust/ch16 P8; scope the nowrap rule to `@media (min-width: 641px)` as line 102 already does for other cells.
10. **[low] [content] panel choice exercise ex-whichfn** (content-rs-19-21): The right option is twice as long as any wrong one and contains the explanation.
   - evidence: Lengths [86, 41, 35, 48]. Right option: "FnMut: it changes log, but doesn't give anything away, so it can be called many times." See INTEGRATION_TODO CHOICE LENGTH BIAS.
   - fix: Make the right option just "FnMut" (with the reason in `why`), and match the other options' format.
11. **[low] [visual] panel cover, P6, P12 @390 and 1280** (visual-rs-16-20): The backpack's name tags ('closure', 'look', 'tally', 'shout') are 9.8px and its flap words '&MUT'/'USED' 11px at the default character size.
   - evidence: rs-ch20.js:70 tag text font-size 15 in a 200-unit viewBox; :60 flap words 20 units. audit small-text list for a20. Crop: scratchpad/review-visual-rs-16-20/f20/s00.png (cover and P6).
   - fix: Tag text 15 → 20 units (widen the tag rect to `lab.length * 13 + 18`), flap words 20 → 24.
12. **[low] [content] panel notebook: Common wrong ideas** (content-rs-19-21): The notebook says iterator chains compile to 'the same machine code' as loops. That overstates the source the page cites: the Rust book says 'roughly the same code', and nothing here measures it.
   - evidence: ch20: "In release builds they compile to the same machine code, often with fewer bounds checks." TRPL 13.4 (fetched): "Iterators, although a high-level abstraction, get compiled down to roughly the same code as if you'd written the lower-level code yourself."
   - fix: "In release builds they compile to roughly the same code as the loop (the Rust book's words), often with fewer bounds checks."
13. **[low] [content] panel notebook: In real programs (Text pipelines)** (content-rs-19-21): The notebook says Chapter 16's search robot 'did exactly this' (a lines().filter().map() chain). Chapter 16's search used a for loop with if and push, not a chain.
   - evidence: ch20: "text.lines().filter(|l| !l.is_empty()).map(str::trim) . Chapter 16's search robot did exactly this". data/rs-ch16.json (boss_predict.rs, contains_string.rs): `for line in contents.lines() { if line.contains(query) { results.push(line); } }`.
   - fix: "Chapter 16's search robot walked contents.lines() with a for loop; with this chapter's tools its search becomes one line: contents.lines().filter(|l| l.contains(query)).collect()."
14. **[low] [visual] panel whole chapter (rs-ch20.css, rs-ch20.js) @both** (visual-rs-16-20): Hand-rolled cards and tables with raw radii and shadows instead of tokens.
   - evidence: `.anatomy > div` (card, radius 10px), `.defcard` (radius 10px, `4px 4px 0`), `.ops`/`.oscmd` tables (radius 10px), duplicated `.panel > details` rules; belt and backpack fills are raw hex (fills only, text stays ink).
   - fix: radii → `var(--radius-lg)`, shadow → `var(--shadow-hard)`; delete the `.panel > details` rules.

## INTEGRATION_TODO lines naming this chapter
- Metaphor clash: rust ch13 uses a "conveyor belt" for `?` error propagation, and rust ch20's title uses conveyor belts for iterators. The review should make sure the two pictures stay distinct, or rename one.
- ## From rust ch20 (Backpacks and Conveyor Belts)
- NAME CLASH: rs-ch20.js `backpack` (notes/pencil/items/empty) vs js-ch17.js `backpack` (variable tags, "NO OWNER"). Rename one before promoting either. The conveyor-belt picture also appears in rust ch13 (for `?`); check that the two images stay distinct.
- rs-ch20 cites TRPL 13.4 from memory (not fetched); verify in review.

## Engine-refresh clean-ups for this chapter
- rust/ch20.html: @390: P2 +7px
- `rs-ch20.js:202`
- `rs-ch20.css:29` `.ops td code`
- `rs-ch20.css:90` `.oscmd td code`
