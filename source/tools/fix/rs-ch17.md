# Fix bundle: rust/ch17.html

10 review findings, 3 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel P21 @390 and 1280** (visual-rs-16-20): The 39-line default-methods walker is 3,400px tall on phones with loose line spacing, so the Next button is 3,025px below the first line (2,302px on desktop).
   - evidence: Measured codeTop→Next 3,025px at 390, 2,302px at 1280; panel height 3,400px at 390. Crop: scratchpad/review-visual-rs-16-20/a17/w390-038-p21.png. rust/ch18 tightens its 40-line walker with `.walk18` (rs-ch18.css:100-102).
   - fix: Wrap the panel in `class="walk17"` and add `.walk17 .walk { grid-template-columns: minmax(0,1fr) } .walk17 .recipe ol { gap: 0 } .walk17 .recipe li { padding: 1px 8px; font-size: 0.9rem }` (and see the engine finding on sticky stepper controls).
2. **[medium] [visual] panel P7 (.factory) @1280** (visual-rs-16-20): The factory's stamped copies drop in over 600ms each from 26px above at 115% size, 350ms apart, so the last copy lands 1.3s after the panel appears.
   - evidence: rs-ch17.css:107-110 `ch17-stamp 0.6s ease-out`, `translateY(-26px) scale(1.15)`, delays 0.35s and 0.7s. DESIGN_SYSTEM §5 (≤300ms, `--ease-out`); Emil stagger 30–80ms.
   - fix: `animation: ch17-stamp 0.6s ease-out both` (delays 0.35s/0.7s) → `animation: ch17-stamp 240ms var(--ease-out) both` from `translateY(-8px) scale(1.04); opacity: 0`, delays 60ms/120ms (a stamp may land from slightly above and larger; it just has to land fast).
3. **[medium] [visual] panel P9 @1280** (visual-rs-16-20): The three 'type annotations needed' runs are laid out two side by side on desktop, so each terminal is about 340px wide and the compiler's labels, help lines and notes are cut off mid-word.
   - evidence: rs-ch17.css:79 `.runs2 { grid-template-columns: minmax(0,1fr) minmax(0,1fr) }` (stacks only below 760px). Crop: scratchpad/review-visual-rs-16-20/v4.png ('help: consider giving `shelf` an explici', '------- type must be kno'). rust/ch16, ch18 and ch20 use a one-column `.runs2` for the same reason (their CSS comment: 'terminal lines are long, so they never sit side by side').
   - fix: `.runs2 { grid-template-columns: minmax(0,1fr) minmax(0,1fr) }` → `.runs2 { grid-template-columns: minmax(0,1fr) }` with `.runs2 > div + div { border-top: 3px dashed var(--rule); padding-top: 10px }`, as in rs-ch16.css:43-45.
4. **[low] [visual] panel P15 @390** (visual-rs-16-20): The 'E0599!' sound-effect burst sits on top of the code box's top-right corner, because the panel opens with the file tab instead of a caption.
   - evidence: Crop: scratchpad/review-visual-rs-16-20/a17/w390-026-p15.png.
   - fix: Add a short caption before the file tab (as every other error panel has), or move the burst with `class="sfx tl"`.
5. **[low] [visual] panel P3 (and rust/ch19 P11) @390** (visual-rs-16-20): A chapter rule overrides the engine's anatomy-line wrapping, so the signature breaks between `->` and `&T` and loses its part boxes' alignment.
   - evidence: rs-ch17.css:113 and rs-ch19.css:53: `.anat-line.wrap { white-space: normal; overflow-wrap: anywhere; font-size: clamp(…) }`. The engine now wraps `.anat-line` between its parts (AUTHORING engine note, 'Wrapped code lines and anatomy lines'). Crop: scratchpad/review-visual-rs-16-20/v2.png.
   - fix: Delete `.anat-line.wrap` from rs-ch17.css and rs-ch19.css and drop the `wrap` class from those anatomy lines.
6. **[low] [visual] panel P3, P7, P13, P18 @390** (visual-rs-16-20): Phone sizing shrinks the chapter's characters to 80–96px, so their labels drop below 12px: the cutters' `<T>`, `i32`, `f64`, `char` plates (10.5–11.4px), the brick's `340` (11.4px) and the gift boxes' `42` and `"Dune"` (9.4px).
   - evidence: rs-ch17.css:32 (`.boxes .char { width: 96px } .char.sm { width: 80px }`) and :46 (`.factory .out .char { width: 88px }`). Crops: scratchpad/review-visual-rs-16-20/v2.png (P3), a17/w390-011-p7.png, a17/w390-023-p13.png.
   - fix: Keep 120px on phones and let the row wrap (`.boxes .char { width: 120px }` everywhere; delete the 560px overrides), or raise the cutter label font in rs-ch17.js:48 from 19/15 to 24/19 units.
7. **[low] [visual] panel P36 @390 and 1280** (visual-rs-16-20): In the teaser drawing the word `PartialEq` fills its plug outline edge to edge at 1280, and at 390 every plug label is about 11px.
   - evidence: Crop: scratchpad/review-visual-rs-16-20/v6.png (1280) and scratchpad/review-visual-rs-16-20/v5.png (third column, 390). svg viewBox 0 0 520 220 shrinks to 0.63 at 390.
   - fix: Widen that plug rect by about 16 units (or use font-size 15 for it), and give the figure `min-width: 420px` inside `<div class="picscroll">` on phones so labels stay ≥12px.
8. **[low] [visual] panel P9 (also rust/ch19 P14, P17, P18, P21, P31, P32) @390 and 1280** (visual-rs-16-20): File tabs above the code boxes inside `.runs2` lose their bottom few pixels: the code box paints over them, hiding the underscores in names like `infer_vec.rs` and `call_inner_ok.rs`.
   - evidence: Crops: scratchpad/review-visual-rs-16-20/v3.png (390, 'infer vec.rs'), scratchpad/review-visual-rs-16-20/v9.png (ch19 at 1280, 'call inner ok.rs', 'method elided.rs'). rs-ch18.css:103 and rs-ch20.css:42 already fix this with `position: relative; z-index: 1`.
   - fix: Add to rs-ch17.css and rs-ch19.css: `.runs2 .file-tab { position: relative; z-index: 1 }`.
9. **[low] [content] panel cover blurb** (content-rs-16-18): The cover promises 'nine new error codes'. The chapter shows ten distinct codes, and only four are new to the book (E0283, E0046, E0053, E0117). E0369, E0277, E0282, E0308, E0599 and E0425 all appeared in earlier Rust chapters.
   - evidence: "Along the way the Compiler will show you nine new error codes". `error[E0369]` appears in rust ch11–13, E0599 in ch10–11, E0425 in ch2/4/5/7/13/14, E0282 in ch11/16, E0277 and E0308 in many.
   - fix: "Along the way the Compiler will show you ten error codes, four of them new" (or just "a string of error codes").
10. **[low] [visual] panel whole chapter (rs-ch17.css) @both** (visual-rs-16-20): Chapter CSS re-implements engine components and engine phone fixes with raw values.
   - evidence: `.stamp` badge (radius 6px), `.ops` tables (radius 10px), `.sigcard` (card radius 10px, shadow `4px 4px 0`), `.orphan .cell` (radius 10px), `.factory` (radius 14px raw), and `.page-body details`/`li`/`p` rules (lines 101-104) that duplicate comic.css:283-287 and comic-widgets.css:186.
   - fix: Swap raw radii and shadows for `var(--radius-lg)`/`var(--radius-md)` and `var(--shadow-hard)`; delete lines 100-104 and the `.panel > details` rules (engine has them).

## INTEGRATION_TODO lines naming this chapter
- ## From rust ch17 (Cookie Cutters and Badges)
- NAME CLASH: rs-ch17.js defines `cutter` (dashed generic / solid stamped), while py-ch15/19/20 define a different `cutter` drawing. When promoting either to comic-critters.js, give them distinct names.
- "N CAPTURES DIFFER" COUNTS: several footers and version notes give a count that's off by one against meta.versionDifferences (js ch8, js ch11, py ch25, rust ch17 …). Generate these counts at build time from the data (build.py token), or script-check them.

## Engine-refresh clean-ups for this chapter
- `rs-ch17.css:57` `.ops td code`
