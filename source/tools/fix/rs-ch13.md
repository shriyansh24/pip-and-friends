# Fix bundle: rust/ch13.html

8 review findings, 5 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 10** (content-rs-13-15): Panel 10 shows how much the order varies by putting the secondary toolchain's run (data-alt, Rust 1.97.0) beside the primary run as 'ANOTHER RUN'. The house rule 'Showing variation' forbids this: alt is recorded only while the two runs differ, so a recapture can break the panel, as happened in go ch12 and rust ch14. INTEGRATION_TODO doesn't list this one for rust ch13.
   - evidence: <div><h3>ANOTHER RUN</h3><pre class="term" data-run="three_orders.rs" data-alt></pre></div>; caption: "the second used the course's comparison compiler, Rust 1.97.0". The footer repeats it: "panel 10 shows one run from each version side by side". AUTHORING house rule: "don't rely on the secondary toolchain happening to differ: a recapture can make them match, and the panel breaks".
   - fix: Drop the ANOTHER RUN column (three_orders.rs already prints three differently ordered maps in one run, which proves the point), or capture a second named copy (three_orders_b.rs, .nondet) on the primary toolchain. Update the caption and footer to match.
2. **[medium] [book] panel 13** (book-rs): E0382 is credited to Chapter 8, but Chapter 7 is the chapter that teaches it ('Moves and E0382'). Chapter 8 mentions E0382 only once, inside an exercise's 'why' text.
   - evidence: ch13.html line 336 (Panel 13 'the key moved into the map'): 'error[E0382]: borrow of moved value: `title` What: Chapter 8's error.' ch7 TOC: 'Moves and E0382'; ch7 recap: 'using s1 afterwards is E0382'. E0382 count: ch7 29, ch8 1.
   - fix: Change 'Chapter 8's error' to 'Chapter 7's error'.
3. **[medium] [book] panel ch13 Part 6, 35; ch20 Part 3, 19** (book-rs): The 'conveyor belt with stations' picture means the ? operator in ch13 and iterators in ch20. ch20 never acknowledges the earlier belt, and ch21 re-pictures ? as customs paperwork. The two belts are not kept distinct (INTEGRATION_TODO 'From rust ch13' / 'From rust ch20' asked review to decide).
   - evidence: ch13 TOC 'The conveyor belt: the ? operator'; Part 6 heading 'THE CONVEYOR BELT'; Panel 35 'the question-mark conveyor belt': 'So Rust has a station on the conveyor belt, written as one character: ?'; plan ch13: '? as a conveyor belt that sends notes straight back to the sender'. ch20 cover 'THE CONVEYOR BELT'; Part 3 'PART 3 · THE CONVEYOR BELT'; Panel 19 'the conveyor belt'; recap: 'Stations: map filter ...'; glossary: 'iterator ... the conveyor belt'. ch14 also uses a conveyor belt for crate delivery and test lanes. ch20 has no reference to ch13's belt.
   - fix: Keep the conveyor belt for iterators (it is in ch20's title). In ch13, rename the ? picture to a return chute or pneumatic tube 'that shoots the note straight back to the sender': update the TOC entry, the Part 6 heading, Panel 35's aria-label, caption and figure text, and the plan's ch13 visuals line. Drop the word 'station' from ch13.
4. **[low] [visual] panel 13, 20, 25, 38 @1280** (visual-rs-11-15): Even at desktop width, these compiler/test terminals hide the right half of their help, note and caret-label lines behind a sideways scroll, because the page never uses the engine's caret-safe `.term.wrap`.
   - evidence: Audit at 1280: pre.term scrollWidth/clientWidth up to 1.99x. `grep -c 'term wrap'` = 0 in the page. The engine's .term.wrap (comic.css:164-172) keeps the source line a caret points into unwrapped and wraps the rest with a hanging indent, which is what the 'Terminal wrapping consistency' item in INTEGRATION_TODO asked for. (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Change these `<pre class="term" data-run=...>` to `<pre class="term wrap" ...>`, then check 390 and 1280 that the carets still sit under their code.
5. **[low] [visual] panel 19, 22 @1280 and 390** (visual-rs-11-15): The HashSet bag drawn at 150px (p19 scene, p22 comparison card) shows its item labels 'Ada' and 'Ben' at 8.2px at both widths.
   - evidence: Measured: bag `text` 8.2px; markup ch13.html:476 and :531 `<svg class="char" style="max-width:150px" data-char="bag" data-items="Ada,Ben">`. The label is the point of the picture (each name once). (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Drop the inline max-width:150px (draw at the default .char width), or see the visual-engine finding on critter label sizes.
6. **[low] [content] panel 36** (content-rs-13-15): The readlist line '<b>Line 6</b>: Ok(x + y)' is true only for question.rs. The panel shows two programs side by side, and in question_long.rs that line is line 12.
   - evidence: question.rs line 6: `Ok(x + y)`; question_long.rs line 12: `Ok(x + y)`, line 6: `Err(e) => return Err(e),`.
   - fix: "<b>Line 6</b> (line 12 of the long way): <code>Ok(x + y)</code>."
7. **[low] [visual] panel 44 @390** (visual-rs-11-15): The ch14 teaser drawing (building with doors) shows 'private', 'pub' and 'crate' at 9.7-10.9px on phones.
   - evidence: Measured at 390: 'private' / 'pub' 9.7px, 'crate' 10.9px; ch13.html:994, viewBox 520x230, plain `.fig`, no narrow version. (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Wrap in `.picscroll` + `.pic-wide`, or raise the label sizes for phones.
8. **[low] [visual] panel drawings using .drop-in, .slide-in, .slide-back (e.g. p1, p32 conveyor) @1280** (visual-rs-11-15): Chapter entrance motion runs 800-900ms with built-in ease-out, with a 1.0s delay on .slide-back, so the second half of the conveyor picture appears about 2s after the panel enters.
   - evidence: rs-ch13.css:62-67: `ch13-drop 0.8s ease-out 0.3s`, `ch13-slide 0.9s ease-out 0.3s` (from translateX(-40px)), `ch13-back 0.9s ease-out 1.0s` (from translateX(60px)). (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Use `var(--dur-move) var(--ease-out)` for all three and a sequence delay of about 120ms for `.slide-back` (`0.1s` / `0.22s`), from 12-16px instead of 40-60px.

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch13 (Lockers and Parcels)
- `parcel` (Result: ok/err) lives in rs-ch13.js. Python ch17 and ch21 define a different `parcel` in their extensions. If promoting, rename (e.g. `resultbox`) to avoid two meanings for one name.
- Metaphor clash: rust ch13 uses a "conveyor belt" for `?` error propagation, and rust ch20's title uses conveyor belts for iterators. The review should make sure the two pictures stay distinct, or rename one.
- NAME CLASH: rs-ch20.js `backpack` (notes/pencil/items/empty) vs js-ch17.js `backpack` (variable tags, "NO OWNER"). Rename one before promoting either. The conveyor-belt picture also appears in rust ch13 (for `?`); check that the two images stay distinct.
- `parcel` (Rust Result) promoted to comic-critters.js. Python ch17 and ch21 keep their own different `parcel` in their extensions, which override on their pages (rust ch13 and python ch17 re-checked). Remove the copies from rs-ch13.js and rs-ch21.js in the fix round. Consider renaming Python's to avoid one name with two meanings.

## Engine-refresh clean-ups for this chapter
- `rs-ch13.css:36` `.ops td code`
- **Pages edited during the check run**: python/ch10 (captures missing for fill_v1.py, fill_v2.py, guests_loop2.py), rust/ch13 (match_no_err.rs, parsons_q_alt.rs; assets/ext/rs-ch13.js gone), python/ch20 (walker loud.py parity), rust/ch14 (empty terminals in P23/P39, map parity P34) fail on the live site and pass as they were this morning. Whoever is editing them should re-run the checker.
