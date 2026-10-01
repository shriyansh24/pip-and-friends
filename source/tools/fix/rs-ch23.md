# Fix bundle: rust/ch23.html

6 review findings, 3 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[low] [visual] panel 2, 6, 8, 15, 19, 25 (hand-drawn figures) @390 (all), both (2)** (visual-rs-21-25): On phones the figures scale to ~58% and their labels land at 11.5px ('an 8-byte key', 'no end, no size. E0072', 'join: Rc::clone(&x), +1', '.borrow(): sign in as a reader', 'main ends: 2 → 1 each, never 0'); P2's 'boxed' tag on the key is 8.5px at both widths.
   - evidence: Audit SVG text sizes at 390: 11.5px in p2, p6, p8, p15, p19, p25; 'boxed' 8.5px in p2. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a23-w390-005-p2.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-rs-21-25/keep/a23-w390-046-p25.png. rs-ch23.css defines .fig-narrow but no figure uses it.
   - fix: <svg class="fig" viewBox="0 0 440 …"> → <div class="picscroll"><svg class="fig pic-wide" …></svg></div>, or raise .fig text.s from 16px to 21px for these figures (the sentences in these drawings are the catchphrases; keep them >=12px)
2. **[low] [visual] panel 36 (returning a trait) @390 and 1280** (visual-rs-21-25): The caption says 'Left: -> dyn Shape … Right: -> Box<Shape>', but the two runs are stacked (.runs2.stack) at every width, so there is no left or right.
   - evidence: ch23.html:911 caption; rs-ch23.css '.runs2.stack { grid-template-columns: minmax(0, 1fr) }'. Same class of problem as INTEGRATION_TODO 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS' (new instance).
   - fix: 'Left: … Right: …' → 'NO KEY: … NO DYN: …' (the card headings) (text must match the layout at every width)
3. **[low] [content] panel 36, 37** (content-rs-22-24): The captions say "Left:" / "Right:" and "the left-hand version", but both panels use `.runs2.stack`, which is always one column, so the two programs are top and bottom at every width.
   - evidence: Panel 36: "Left: `-> dyn Shape`, no key. Right: `-> Box<Shape>`, no `dyn`." Panel 37: "The `help:` suggests exactly the left-hand version". assets/ext/rs-ch23.css:37 `.runs2.stack { grid-template-columns: minmax(0, 1fr); }`.
   - fix: Use the headings: "First (NO KEY): ... Second (NO DYN): ..." and "suggests exactly the BOTH WORK version".
4. **[low] [content] panel ch23 ex-cellref, ex-whichweak, ex-sdd, ex-design1, ex-b6; ch24 ex-type1, ex-common, ex-filter, ex-flaky** (content-rs-22-24): In these choice questions the correct option is by far the longest, so it can be guessed from length alone (these are this scope's instances of the 'CHOICE LENGTH BIAS' item in INTEGRATION_TODO).
   - evidence: Visible option lengths (correct first): ch23 ex-cellref [73, 12, 14, 13], ex-whichweak [104, 21, 21, 38], ex-sdd [142, 80, 84, 56], ex-design1 [93, 50, 32, 32], ex-b6 [29, 15, 14, 19]; ch24 ex-type1 [53, 30, 29], ex-common [55, 15, 35, 25], ex-filter [58, 31, 34, 35], ex-flaky [52, 32, 26, 37]. ch22 has none.
   - fix: Trim the right answers and lengthen the distractors to similar length, e.g. ch23 ex-cellref distractors "`Rc<u32>` for visits, `Rc<Vec<String>>` for history" etc.
5. **[low] [content] panel cover** (content-rs-22-24): The cover promises "nine compiler errors and one panic", but the chapter reads ten different error codes and two different RefCell panic messages.
   - evidence: Codes read on the page: E0072, E0614, E0382, E0596, E0277 (rc_thread, return_dyn, dyn_box_ref), E0308 (hetero_error, impl_two), E0599 (dyn_no_method), E0038, E0746, E0782 = 10. Panics: "RefCell already borrowed" and "RefCell already mutably borrowed" (refcell_write_read.rs, boss_spot.rs).
   - fix: "...and ten compiler errors and two RefCell panics, read like a detective."
6. **[low] [content] panel notebook, Lab step 3** (content-rs-22-24): The leak-plugging recipe leaves out the `Some(...)` wrapper, so following it gives a type error instead of "both goodbyes".
   - evidence: "Change `buddy` to `RefCell<Weak<Member>>`, `Rc::clone` to `Rc::downgrade`, and `None` to `Weak::new()`". cycle_leak.rs lines 22–23: `*ana.buddy.borrow_mut() = Some(Rc::clone(&raj));`. With the recipe this becomes `Some(Rc::downgrade(&raj))` assigned to a `Weak<Member>`: E0308.
   - fix: "... and on lines 22–23 replace `Some(Rc::clone(&raj))` with `Rc::downgrade(&raj)` (no `Some`), ..."

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch23 (Keys, Counters and Remotes)
- rust ch23's Rc cycles could use the new tracer `leaked` flag.
- LAB INSTRUCTIONS UNTESTED: "try this yourself" steps can fail to compile (rust ch21 lab step 1, rust ch23 leak recipe, rust ch6 `echo 50 |`). Fix agents: every lab instruction that changes code should have its result captured, or at least be run in scratch, before it ships.
