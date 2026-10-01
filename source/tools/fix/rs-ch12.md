# Fix bundle: rust/ch12.html

8 review findings, 3 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 2, 4 (tracer step 6), 33, 40; ch11 panel 49 teaser** (content-rs-10-12): The chapter's title metaphor flips: the title and ch11's teaser make the `&str` the 'photocopy', but in ch12 itself 'photocopy' means making an owned String copy (to_string), so the same word stands for both sides of the main distinction.
   - evidence: ch11 panel 49: "a `&str` is a photocopied page you may read". ch12 title "Notebooks and Photocopies"; panel 2: "looking at a page never copies anything. The \"photocopies\" are printed once, when the program is built." Tracer step 6: "`sign.to_string()` is the real photocopier. It copies the 5 baked-in letters into a new heap block". Panel 33: "it makes every caller photocopy their text" (meaning .to_string()). Panel 40: "you'll know whether to photocopy the page, or to ask for a page in the first place".
   - fix: Pick one meaning. The smallest change: keep 'photocopy' = making a String copy (to_string/to_owned/String::from), and change ch11's teaser to "a `&str` is a page you may look at but not write on" and ch12 panel 2's last sentence to "Looking at a page never copies anything; only to_string and friends run the photocopier." (The title can stay: the chapter is about when to photocopy.)
2. **[medium] [content] panel exercise ex-predict-esc (after panel 37)** (content-rs-10-12): The hint names the wrong line as the raw string: line 3 is the ordinary "up\ndown" (which really splits onto two lines), and the raw r"up\ndown" is line 4, so the hint points the reader away from the right prediction.
   - evidence: Hint (line 850): "Line 3 is raw: nothing in it is special." predict_escapes.rs: line 3 `println!("up\ndown");` line 4 `println!(r"up\ndown");`. Real stdout: "up" / "down" / "up\ndown".
   - fix: Change "Line 3 is raw" to "Line 4 is raw".
3. **[medium] [content] panel notebook: Under the hood, 'Where the baked-in text lives'** (content-rs-10-12): It says read-only program memory is 'the deep reason a &str has no push_str', but a &str into a String's heap bytes (panel 4's `part`) has no push_str either; the real reason is that &str is a borrowed, fixed-length view with no capacity to grow into, which is what the rest of the chapter teaches.
   - evidence: Line 976: "Writing to that memory is impossible by design, which is the deep reason a `&str` has no `push_str`." Panel 4 tracer: `part = &notes[0..3]` is "a window onto the first 3 bytes of the notebook ... Also a &str" (heap, writable memory). Card C explain: "`mut` lets `s` look at a different page later; it doesn't make the page writable."
   - fix: Replace the last sentence with: "That's one reason literals can never change. More generally, a `&str` is only a pointer and a length with no room to grow, and it's a shared loan, so it has no `push_str` whether it points at a literal or into a String."
4. **[low] [visual] panel 13, 20, 33, 36 @1280** (visual-rs-11-15): Even at desktop width, these compiler/test terminals hide the right half of their help, note and caret-label lines behind a sideways scroll, because the page never uses the engine's caret-safe `.term.wrap`.
   - evidence: Audit at 1280: pre.term scrollWidth/clientWidth up to 1.86x. `grep -c 'term wrap'` = 0 in the page. The engine's .term.wrap (comic.css:164-172) keeps the source line a caret points into unwrapped and wraps the rest with a hanging indent, which is what the 'Terminal wrapping consistency' item in INTEGRATION_TODO asked for. (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Change these `<pre class="term" data-run=...>` to `<pre class="term wrap" ...>`, then check 390 and 1280 that the carets still sit under their code.
5. **[low] [visual] panel 19, 41 @390** (visual-rs-11-15): On phones the graph-paper ruler's letter indexes (p19) render at 10.5px, and the teaser locker labels (p41: owl, ink, pen, cat, map) at 9.6px.
   - evidence: Measured at 390: `.ru-ci` text 10.5px (rs-ch12.css:59 sets 14px in a viewBox up to about 556 wide, shown 320px wide); p41 `.fig text.m` labels 9.6px (ch12.html:931, viewBox 560x220, no narrow version). (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: rs-ch12.css: `@media (max-width:640px){ .ru-ci { font-size: 20px } }`; wrap the p41 teaser in `.picscroll`/`.pic-wide` or drop its labels to a caption.
6. **[low] [content] panel 5** (content-rs-10-12): The 'Line 5' note also explains `[{d}]`, which is on line 6.
   - evidence: Line 187: "Line 5: `String::new()` is an empty notebook. ... `[{d}]` prints the brackets around nothing: []". make_strings.rs line 5 `let mut d = String::new();`, line 6 `println!("{a} {b} {c} [{d}]");`.
   - fix: Change the label to "Lines 5 and 6".
7. **[low] [visual] panel cover/notebook drawings using .slide-in and .pop-in @1280** (visual-rs-11-15): Chapter entrance motion: a 900ms slide with built-in ease-out, and a 600ms 'pop' from scale(0.6) with a 1.08 overshoot, both over the 300ms UI budget and the 0.9-0.97 starting-scale rule. The class name `.pop-in` also shadows the engine's keyframe name pop-in, which is confusing for maintainers.
   - evidence: rs-ch12.css:76-79 `ch12-slide 0.9s ease-out 0.3s` (from translateX(-24px), opacity 0.2) and `ch12-pop 0.6s ease-out 0.6s` (scale 0.6 -> 1.08 -> 1). (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: `ch12-slide 0.9s ease-out` -> `var(--dur-move) var(--ease-out)`, from opacity 0; `ch12-pop` -> reuse the engine's `.pop-me` class (pop-in, scale 0.95 + opacity, --dur-ui) and delete the chapter keyframes.
8. **[low] [content] panel exercise ex-predict-tidy (after panel 27)** (content-rs-10-12): The byte count is explained as '9 letters and space', but "Mabel Lee" is 8 letters plus a space (9 bytes), so a reader checking the arithmetic gets confused.
   - evidence: Explain: "`line` is 13 bytes (2 spaces, 9 letters and space, 1 space, 1 newline) and `name` is 9, so 4." predict_tidy.rs: `let line = "  Mabel Lee \n";`.
   - fix: "(2 spaces, the 9 bytes of `Mabel Lee`, 1 space, 1 newline)".

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch11 / js ch12 / rust ch12
- comic-memory.js now allows slots without `cap` (a &str or slice view draws ptr + len only). rs-ch12 used the tracer instead; fine.
- rs-ch12 reports that `.fig text` CSS overrides a font-size set on a parent `<g>`, so rust ch9's figure text may be smaller than intended. Check in review.

## Engine-refresh clean-ups for this chapter
- `tools/check_chapter.js` now opens every `<details>` (notebook pages, text versions, hints) and re-measures. The engine fixed the shared causes (grid notebook pages and list items with long inline code). In the final run, no page fails this check (`tools/review/engine-refresh-check.txt`). With the old engine, py ch10 overflowed by 110px, cpp ch8 by 176px, js ch23 by 214px and rust ch12 by 48px. Watch for new ones: a figure, table or long token placed directly in notebook prose. `.page-body` now breaks long words, but an SVG or a `white-space: pre` block outside a scroller will still widen the page.
