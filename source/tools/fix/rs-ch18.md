# Fix bundle: rust/ch18.html

8 review findings, 4 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 36 (unsized.rs readlist)** (content-rs-16-18): The page says the fix is in the Compiler's last help, but that suggestion (`let words: &str = *"owl";`) doesn't compile. It is E0308, because `*"owl"` is still a `str`. A beginner who follows it gets a new error.
   - evidence: unsized.rs stderr: "help: consider borrowing here | 2 |     let words: &str = *\"owl\";". Page: "<b>The fix</b> is in the last <code>help</code>: borrow it." A scratch build of exactly that line on 1.99.1 gave: error[E0308]: mismatched types ... expected `&str`, found `str` ... help: consider removing deref here.
   - fix: "The last help points the right way (borrow it), but taken literally it still fails: also remove the *, giving let words: &str = \"owl\";. Compiler suggestions are hints, not guarantees." That's a good detective moment.
2. **[medium] [visual] panel cover, P3, P11, P18, P32, P40 (.part-pop/.slide-in) @1280** (visual-rs-16-20): Same entrance timing as rust/ch16: plugs pop from scale(0.6) over 600ms with 150ms steps (up to 1.5s per figure), and `.slide-in` takes 800ms after 300ms; 18 parts on this page.
   - evidence: rs-ch18.css:87-93 (`ch18-pop 0.6s ease-out`, `scale(0.6)`, delays 0.15s–0.9s; `ch18-slide 0.8s ease-out 0.3s`).
   - fix: `ch18-pop 0.6s ease-out` from `scale(0.6)` → `var(--dur-ui) var(--ease-out)` from `scale(0.95); opacity: 0`, delays 50ms apart; `ch18-slide` → `240ms var(--ease-out)` from `translateX(-12px)`.
3. **[low] [content] panel 7 + recap + Words** (content-rs-16-18): Copy is described as 'only for small values'. Size isn't the rule: any type whose fields are all Copy and which has no Drop can be Copy, e.g. `[u8; 4096]` or a large struct of numbers. The real condition, stated elsewhere on the page, is no heap ownership and no destructor.
   - evidence: Panel 7: "Only for small values that live entirely on the plate". Recap: "Copy copies by itself, only for small plain values". Words: "for small values with no heap data".
   - fix: Replace "small" with "plain": "only for values whose every part is plain bytes on the plate (numbers, chars, bools and structs of those), with no heap data and no Drop. Usually small, but size isn't the rule."
4. **[low] [visual] panel P26, P7, P40 @390 and 1280** (visual-rs-16-20): Three small drawings carry text below 12px: the speaking machine in P26 is drawn `.sm` with its `Add::add` plate at 7.9px, the key's `Book` tag is 11.5px (P7), and the teaser's `&'a` labels are 9.7px at 390 (P40).
   - evidence: Crops: scratchpad/review-visual-rs-16-20/v8.png (P26 at 1280, bottom left), scratchpad/review-visual-rs-16-20/v7.png (P26, P40 at 390), a18/w390-014-p7.png.
   - fix: P26: drop `sm` from `<svg class="char sm" data-char="machine" data-label="Add::add">` (or remove the label; the bubble says it). P40: wrap the teaser fig in `.picscroll` with `min-width: 420px` on phones.
5. **[low] [visual] panel P5 @390** (visual-rs-16-20): The Display-plug definition card scrolls sideways with no cue, so `fn fmt(&self, f: &mut fmt:` and `write!(f, "…your words.` look cut off.
   - evidence: `.defcard` 582px of content in a 310px box. Crop: scratchpad/review-visual-rs-16-20/a18/w390-009-p5.png.
   - fix: Same fix as rust/ch16 P8: `@media (max-width:640px){ .defcard pre { white-space: pre-wrap; padding-left: 2ch; text-indent: -2ch; font-size: 0.875rem } }` in rs-ch18.css.
6. **[low] [content] panel exercises ex-dbgdisp, ex-sized** (content-rs-16-18): Choice length bias: in both questions the correct option is about twice as long as the average option.
   - evidence: Text lengths: ex-dbgdisp [138*, 58, 42, 47]; ex-sized [140*, 61, 38, 29] (* = correct). See INTEGRATION_TODO "From the review swarm" > CHOICE LENGTH BIAS.
   - fix: Shorten the correct options and move the extra detail into their 'why' text.
7. **[low] [content] panel notebook: Under the hood > One version difference** (content-rs-16-18): The notebook says that apart from the HashMap label, the version differences are only std folder names and line numbers. The footer correctly adds a third kind: print_fail.rs's note differs by a pair of backticks.
   - evidence: Notebook: "The other differences between the versions are only the folder names and line numbers inside the standard library's own source". print_fail.rs: 1.99.1 "use `{:?}` (or `{:#?}` for pretty-print)" vs 1.97.0 "(or {:#?} for pretty-print)". The footer mentions it.
   - fix: "...are only the folder names and line numbers inside the standard library's source, plus one pair of backticks in print_fail.rs's note."
8. **[low] [visual] panel whole chapter (rs-ch18.css) @both** (visual-rs-16-20): Hand-rolled components and a raw colour where tokens exist.
   - evidence: `.fig text.inv { fill: #FFFFFF }` (line 15), `.stamp` badge, `.ops`/`.grid18`/`.oscmd` tables with radius 10px, `.grid-key span` badges (radius 4px raw), `.defcard` card (radius 10px, shadow `4px 4px 0`), and the duplicated `.panel > details` rules.
   - fix: `#FFFFFF` → `var(--paper)`; radii → `var(--radius-sm|md|lg)`; `4px 4px 0 var(--ink)` → `var(--shadow-hard)`; delete the `.panel > details` rules.

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch18 (The Universal Adapter Kit)
- DONE (engine): `.checklist li` is no longer a two-column grid (each inline piece used to become a grid cell). Items with mixed inline content now lay out correctly; checked cpp ch10 at 390. Chapters that added `<span>` wrappers or local overrides (go ch16, rust ch16, rust ch18, ...) can drop them.
- rs-ch18: the effective-rust link came from memory and was not checked; verify the URL in review. The panel 11 table wraps code words at 390, and the panel 32 labels are small.
- COMPILER-SUGGESTED FIXES: rust ch18 P36 says "the fix is in the last help", but that help itself fails (E0308). Never endorse a compiler suggestion without a captured run of the fixed program.

## Engine-refresh clean-ups for this chapter
- `rs-ch18.css:39` `.ops td code`
- `rs-ch18.css:84` `.oscmd td code`
