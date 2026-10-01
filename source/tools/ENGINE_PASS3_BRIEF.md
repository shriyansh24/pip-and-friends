# Engine pass 3 brief (after the fix round, before final integration)

You are the **only** agent editing the shared engine. All 49 fix groups have finished: every chapter passed `check_chapter.js` at 1280 and 390 against the pass-2 engine. Your job is to:
- make the engine changes the fixers asked for;
- carry each change through to the chapters that worked around it, so no chapter keeps a copy or workaround of something the engine now does;
- leave every chapter still passing.

No chapter agents run after you. You therefore own both the engine change and its chapter-side clean-up, which the earlier passes left to a fix swarm.

## Read first
1. `AUTHORING.md` (engine notes at the end), `tools/DESIGN_SYSTEM.md`, and `tools/review/engine-pass2-chapter-todo.md` (what pass 2 changed).
2. The engine:
   - `assets/comic.css`
   - `assets/comic-widgets.css`
   - `assets/comic.js`
   - `assets/comic-widgets.js`
   - `assets/comic-memory.js`
   - `assets/comic-cast.js`
   - `assets/comic-critters.js`
3. `tools/INTEGRATION_TODO.md`, specifically:
   - every line tagged `[engine pass 3]` or `[engine pass 3, optional]`
   - the "ENGINE PASS 3 candidates" line
   - the lines starting "ENGINE:" or "ENGINE (integration pass)"
   - the linecook/asyncwaiter promotion line

   Each line names the chapter that asked for the change and, usually, the workaround it made.
4. `tools/vendor/emil-skills/` (motion and UI rules) and `tools/vendor/shadcn-ref/`.

## Work: required (each one: engine change, then remove the chapter workarounds, then recheck those chapters)
1. **`[hidden]` always wins:** add `[hidden] { display: none !important; }` to the engine. Then scan all 142 pages in a browser for elements that have the `hidden` attribute but are rendered (`offsetParent !== null` or a non-zero rect). Report the result. Chapter rules like `.prb-pane[hidden]` and `.ex-result[hidden]` become redundant, but harmless; delete the chapter copies only.
2. **Heap caption:** add a per-widget/per-page heap label option to `comic-memory.js` (e.g. `data-heap-label`). The default must no longer say "coat-check room", because "coat check" means a map in cpp ch14 and go ch12. Choose a neutral default such as "HEAP". Set labels where a chapter has its own picture: cpp ch13 calls the heap the library, and cpp ch8 deferred item 10 needs its label. Grep every page that renders a heap and check what it should say.
3. **Labels under 12px at small draw sizes** (house rule: no text under 12px). Use the pass-2 approach: `lbl-deco` hides decorative text below a size threshold, and the name stays in the accessible text; or enlarge the plate.
   - the Compiler plate at `.sm` (9.2px)
   - the Linker LINK plate at `.sm` (10.5px)
   - the ghost's "undefined" (13 units)
   - the pager's "#N" tag (16/160 units)
   - the kitchen helper's apron number, hidden by the pot when "busy"
   - sealed-crate index digits
   - bag items with 3+ characters (8.2px)
   - the walker/map guide's `>_` face (5–8px)
   - the Inspector "TEST" plate, if any is still small

   Then find the chapter workarounds (oversized drawings, HTML duplicates of names) and simplify them where the engine now covers it.
4. **Promote shared critters/widgets that chapters copy:**
   - `linecook` and `asyncwaiter` (rs-ch26/27 originals with the new badges; copies in rs-ch29.js)
   - cookiecutter and emptytrain, as listed in the candidates line
   - the `[data-report]`/`[data-asan]` ASan report reader (cpp-ch11/13/21 local copies)

   Delete the chapter copies after promoting. Keep chapter-specific poses in the chapter.
5. **Code inside cards:** `comic-widgets.css` (~line 257) has `.duo-card .code { white-space: pre-wrap; overflow-wrap: anywhere }`, which breaks code mid-token on phones (js ch13 P11). Use the hanging-indent / break-word approach that terminals use.
6. **`.part-h code`** is unreadable: a light chip with paper-coloured text in the dark part header. Style it once in the engine, then delete the chapter copies (cpp ch22–24, rs ch10, and any others found by grep).
7. **Tracer transcripts:** add break points (`L.addBreaks`) to code in tracer transcripts in the engine, then drop the rust ch22 workaround call.
8. **Scroll hints for tables:** table scrollers (`.vswrap`-style and trace tables) get the same "Swipe sideways" hint and edge fade as `.picscroll` when they overflow.
9. **Reduced motion:** let extension entrance animations opt in to the engine's reduced-motion fade (cpp ch8 reuses `.tr-new` as a workaround).
10. **`<wbr>` inside `.anat-line` nowrap groups** breaks where it shouldn't (cpp ch4–6). Fix it.

## Work: optional (do it if it is safe and quick; otherwise list it as DEFERRED with the reason)
- `data-lines="a-b"` for `data-src`
- a shared `data-fold` for compiler noise (cpp ch29 `[data-libfold]`, cpp ch21 overload candidates)
- moving the Go book's repeated helper CSS block into the engine
- a radio-group keyboard helper
- the walker code column at 1280
- parsons deep-indent compression and no breaks inside escapes
- `.narration .count` nowrap leaking to chapter `.count`
- the memory-stepper byte pointer
- a `.stamp` component
- tracer slot compaction
- the slice-window widget

## Verification (required)
- Take before/after shots (390 and 1280) of the pages the items name. Look at the pairs yourself.
- Run `check_chapter.js` on **all 142 chapters**, each with `bash tools/slot.sh node tools/check_chapter.js <page>`. Every chapter must PASS at both widths. Write the table to `tools/review/engine-pass3-check.txt`.
- Re-run `tools/review/engine-scripts/measure.js` (and `maps.js`), and quote the minimum label sizes before and after.
- Run `python3 tools/audit_chapter.py` on each chapter you edited, and confirm you added no new leads.
- Delete screenshots. Scratch goes in `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/engine-pass3/`, with your helper scripts in its `bin/`.

## Deliverables
1. The engine changes, plus the chapter-side clean-ups for them.
2. `DESIGN_SYSTEM.md` updated, and `AUTHORING.md` appended, for new helpers and options (heap label, promoted critters, fold, etc.).
3. In `tools/INTEGRATION_TODO.md`, append a "DONE (engine pass 3)" line per item. Do not rewrite other lines.

## Boundaries
You may edit:
- the engine files and `tools/check_chapter.js`
- `DESIGN_SYSTEM.md`, and `AUTHORING.md` (append only)
- chapter pages and `assets/ext/*`, **only** to remove a copy/workaround that the engine now covers, or to set a new engine option (heap label)

Don't change chapter teaching text, data, or programs, and don't run `capture.py`. Preserve every widget contract. No new dependencies, everything must work from file://, and no `rm -rf`. Don't publish, spawn agents, or write outside the project and your scratch folder.

## Final report (under ~500 words)
Include:
- the files changed
- a Before / After / Why table
- the chapters touched, and what was removed
- the PASS count across 142 chapters (verbatim line for any non-PASS)
- the minimum label sizes before and after
- what you deferred, and why
