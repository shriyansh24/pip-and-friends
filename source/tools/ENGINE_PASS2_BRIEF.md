# Engine pass 2 brief (after the visual reviews, before the fix swarm)

You are the **only** agent editing the shared engine during this task. The engine was refreshed earlier today (`tools/DESIGN_SYSTEM.md`, shadcn-style components, Emil Kowalski's motion rules). The visual reviews then measured every chapter against the refreshed engine and found engine-wide problems. You fix those. Read before you change anything.

## Read first
1. `AUTHORING.md` (engine notes at the end) and `tools/DESIGN_SYSTEM.md`.
2. The engine: `assets/comic.css`, `assets/comic-widgets.css` (note the "integration pass, 2026-11-08" section at the end, written by the coordinator today), `assets/comic.js`, `assets/comic-widgets.js`, `assets/comic-memory.js`, `assets/comic-cast.js`, `assets/comic-critters.js`.
3. `tools/INTEGRATION_TODO.md`: every line under "ENGINE PASS 2" (items a–m), plus the lines marked DONE by the main session (so you don't redo them).
4. Every finding with `"lens": "visual-engine"` in `tools/review/*.json`. Collect them with a script, group them, and treat each group as a work item.
5. `tools/vendor/emil-skills/` (`skills/emil-design-eng`, `review-animations` + `STANDARDS.md`, `mobile-native`, `break-ui`, `ui-cheatsheet.md`) and `tools/vendor/shadcn-ref/`.

## Work (at least these)
1. **Walker on phones:** the code column is 12–20 characters wide, so lines wrap inside names (py ch20 P5: 17 lines become about 45 rows; rust ch6 P29 is 4,003px tall). Stack code above the screen at ≤640px, use a narrow gutter, and scroll long tokens instead of breaking them.
2. **Text versions (`table.transcript`) on phones:** `min-width: 560px` hides columns, and rows grow to 800px. Stack each row as a small card at ≤640px, with the column name from a `data-h` attribute or the header. The engine generates these tables, so do it in JS.
3. **Card terminals:** `.duo-card .term` uses pre-wrap + `anywhere`, so carets drift and tokens split. Give them the `.term.wrap` behaviour (including the JS line marking it relies on).
4. **Error terminals on phones:** the line pages tell readers to look at first is often off-screen at 390. Choose one honest rule and document it. Options: automatically wrap terminals whose run exited non-zero, or show a visible swipe hint plus a right-edge fade whenever a terminal overflows.
5. **Controls that move:** steppers, walkers and lenses change height between steps, so the buttons jump under the finger (up to 540px). Reserve the tallest step's height once per run (the narration, the screen and the picture). Offer a helper chapters can call (for example `L.reserveHeight(el, heights)`) and document it.
6. **Lens/clue scrolling on phones:** keep the highlighted clue visible next to its control (scroll it into view, `block: "nearest"`).
7. **`.chips` with long method chains:** these overflow the column and can't be tapped (rust ch28 P14). Let chips wrap, with `max-width: 100%`.
8. **Wide drawings (`.picscroll`):** add the "Swipe sideways" hint and a right-edge fade whenever the drawing overflows. Open maps scrolled to the active state on phones.
9. **Critter labels under 12px:** the Compiler's plate ("rustc", "go build" and the other toolchain names: 3.1–9.9px), the Inspector's "TEST", the compass "N", signposts at 10.4px. Make labels at least 12px at every drawn size, or drop the label below a size threshold and keep the name in the accessible text.
10. **Generic "current line" contrast:** for any highlighted `li.now`, tokens inside go to ink.
11. **Small items from the findings:** the tracer "Swipe sideways" hint at 1280 for a 12px overflow (give it a threshold); the "Step 1 of 7" counter wrapping; the "◀ next" marker wrapping; line breaks inside string literals in wrapped code; long parsons lines hidden under the arrow buttons at 1280; multi-line badges.

Don't redo what the coordinator already fixed today: `.panel` column pinning, the `.pair` base rule, 44px tap targets on touch, readlist and checklist inline code, the glossary term column, and the checklist grid copies removed from 17 chapter stylesheets.

## Verification (required)
- Before changing anything, take a short before/after set (390 and 1280) on the pages the findings name most: python/ch20, rust/ch6, rust/ch17, rust/ch28, rust/ch29, go/ch16, go/ch19, cpp/ch8, javascript/ch26, plus `tools/fixture/widgets.html`. Look at the pairs yourself.
- Run `check_chapter.js` on **all 142 chapters**, each through `bash tools/slot.sh node tools/check_chapter.js <page>` (3 browser slots, shared with reviewers). Every chapter that passed before must still pass. Write the table to `tools/review/engine-pass2-check.txt`.
- Re-run `tools/review/engine-scripts/measure.js` and `maps.js`, and quote the minimum sizes.
- Delete your screenshots afterwards. Scratch goes in `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/engine-pass2/`.

## Deliverables
1. The engine changes.
2. `DESIGN_SYSTEM.md` and `AUTHORING.md` updated for new helpers and behaviours (append to AUTHORING).
3. `tools/review/engine-pass2-chapter-todo.md`, listing chapter-level clean-ups the fix swarm must do because of your changes (for example: delete chapter copies of something the engine now does, call `L.reserveHeight` in extension steppers).

## Boundaries
Edit only the engine files, `tools/check_chapter.js` (if the checker must learn something), `DESIGN_SYSTEM.md`, and `AUTHORING.md` (append only). Don't edit chapter pages, `assets/ext/*`, data or programs, and don't run `capture.py`. Preserve every widget contract. No new dependencies, everything must work from file://, and no `rm -rf`. Don't publish, spawn agents or write outside the project and your scratch folder.

## Final report (under ~400 words)
Cover:
- the files changed
- a Before / After / Why table of what changed
- the check results across all 142 chapters
- the new minimum sizes
- what you left for chapter agents, and why
