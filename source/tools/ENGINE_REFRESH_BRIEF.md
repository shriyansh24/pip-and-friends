# Engine refresh brief: shadcn/ui components + Emil Kowalski design standards

You are the **only** agent allowed to edit the shared engine during this task. You did not write the engine; read before you change anything. The course ("Pip & Friends", 142 chapters across five books) is complete and under review. The owner asked for two things, in their words:

> "https://github.com/emilkowalski/skills, please use this for design reviews"
> "https://github.com/shadcn-ui/ui -- for components -- modify to change the colours box shape types typography to make ours so that you don't have to do anything from scratch"

The site is plain HTML/CSS/JS opened straight from a file (file://), with no build step and no React. shadcn/ui is React + Tailwind + Radix, so it cannot be dropped in. **Port its system instead**: the token architecture, each component's states and its accessibility behaviour, re-skinned in the comic look (thick ink outlines, hard offset shadows, our fonts, our radii). Do not rename classes: 142 chapters use them.

## Read first
1. `AUTHORING.md` (the contract, including every engine note and house rule at the end) and `tools/BRIEF.md`.
2. The engine: `assets/comic.css`, `assets/comic-widgets.css`, `assets/comic.js`, `assets/comic-widgets.js`, `assets/comic-memory.js`, `assets/comic-cast.js`, `assets/comic-critters.js`.
3. The engine review: `tools/review/engine.json` (91 findings, each with a proposed change) and its measuring scripts in `tools/review/engine-scripts/` (`measure.js` measures tracer and stepper font sizes at 390; `maps.js` does maps).
4. `tools/vendor/shadcn-ref/`: the shadcn component sources (`*.tsx`), its token file `globals.css`, `LICENSE.md` (MIT) and `COMMIT`.
5. `tools/vendor/emil-skills/`: read `skills/emil-design-eng/SKILL.md`, `skills/review-animations/SKILL.md` + `STANDARDS.md`, `skills/mobile-native/SKILL.md`, `skills/break-ui/SKILL.md` + `CATALOG.md`, `ui-cheatsheet.md`, `performance-cheatsheet.md`. MIT, see `LICENSE`.

## Work, in this order

### A. Tokens (comic.css `:root`)
Add shadcn's semantic tokens, mapped onto the existing palette. Keep every existing token: chapters use them.
- **Colour roles:** `--background`, `--foreground`, `--primary`(+`-foreground`), `--secondary`, `--accent`(+`-foreground`), `--muted`(+`-foreground`), `--destructive`, `--border`, `--input`, `--ring`.
- **Radii:** `--radius-sm/md/lg/pill`.
- **Shadows:** `--shadow-hard` and `--shadow-hard-lg`, for the comic offset shadow.
- **Motion:** `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, and duration tokens inside Emil's budgets (press 100–160ms, small UI 150–250ms; nothing over 300ms on UI).

Every text colour pair stays at least 7:1. Check pairs you touch with a script.

### B. Component primitives (comic-widgets.css / comic.css), restyling the existing classes
Map each shadcn component onto the classes that already play that role. Port its states: hover (gated behind `@media (hover: hover) and (pointer: fine)`), `:focus-visible` ring using `--ring`, `:active` press, disabled / `aria-disabled`, invalid / `aria-invalid`, and the `aria-pressed` / `aria-checked` / `[open]` "on" states. At minimum:

| shadcn | our classes |
|---|---|
| Button (default / secondary / outline / ghost / destructive / sizes) | `.btn`, `.btn-go`, `.replay`, `.path-btn`, `.pz`, `.ch-nav a`, `.motion-toggle` |
| Toggle / Toggle-group | `.anat-keys button`, `.spot-line`, `.path-btn[aria-pressed]` |
| Radio-group | `.ex-opt` (`role=radio`, `aria-checked`): add Radix-style arrow-key roving focus in `comic-widgets.js` if it is missing |
| Switch | `.motion-toggle` (`aria-pressed`) |
| Input / Textarea | `.ex-input`, `.ex-blank`, `.ex-cell` |
| Progress | `.score-bar` (+ `role=progressbar` and aria values in JS if missing; `font-variant-numeric: tabular-nums` on `.score-num`) |
| Badge | `.ex-kind`, `.parity`, `.book .tag`, `.ex-state`, `.panel-no`, `.chapters a` |
| Card | `.ex-card`, `.duo-card`, `.book`, `.recap li`, `.sbs-2 > div`, `.quiz > li` |
| Collapsible / Accordion | `.page` (notebook `<details>`), `.hint`, `.quiz details`, `.panel > details` |
| Alert | `.ex-result.good/.bad`, `.m-out.jam` |
| Pagination | `.ch-nav`, `.chapters` |
| Kbd, Table, Separator | `kbd`, `.sbs` / `.trace` / `.terms`, rules |

Keep the comic personality: ink borders and hard shadows instead of shadcn's soft grey borders, the pill buttons, and the press-into-shadow `:active` (translate plus a smaller shadow, 100–160ms `--ease-out`). That is consistent with Emil's "cohesion" standard. Where a component appears in only one place, keep it small. Don't add components nobody uses. List optional additions (for example a Tooltip for glossary terms) in your report only.

### C. Motion audit (Emil's review-animations standards)
Go through every `transition`, `animation` and `@keyframes` in the engine files and apply the ten standards:
- No `transition: all`.
- No `ease-in` on UI.
- Durations within budget.
- Animate only `transform` and `opacity`.
- Don't start an entrance from `scale(0)`; start at 0.9–0.97 plus opacity. The `burst` keyframe starts at 0.2: judge it as a comic sound effect, which is decorative and rare, and justify or change it.
- Reduced motion should be gentler, not zero. Today `prefers-reduced-motion` kills everything. Keep short opacity/colour fades and drop movement. The page's own "Animations: off" toggle may still turn everything off.

Record each change as a row in a Before | After | Why table (Emil's required review format).

### D. Engine defects from `tools/review/engine.json`
Fix every high and medium engine finding that belongs to the engine, plus the low ones that are one-line engine fixes. At least these:
1. **Tracers and stack-and-heap steppers are unreadable on phones.** All 182 tracers have smallest labels under 12px at 390 (median 9.2px, worst 4.5px), and the 35 steppers measure 6.9–10.5px. 131 tracers also rescale between steps. Fix: lay out at natural size inside the scrolling box, and compute the width once per run, not per step. Prove it with `measure.js`: every label must be ≥ 12px at 390, with no size change between steps.
2. **Map labels on phones measure 10.5–11.9px.** Bring them to ≥ 12px.
3. **Wrapped code lines on phones lose their indent** (walkers, parsons, spot, tracer code, `.term.wrap`). Use a hanging indent that keeps the line's own leading whitespace visible.
4. **Compiler carets misalign in wrapping terminals.** Promote `.term.wrap` into the engine with correct caret alignment; 49 chapter CSS files carry identical copies. List them for the fix round, but don't edit chapter files.
5. **Highlighter bugs:**
   - C++ lines starting with `<<` are treated as HTML (42 lines).
   - Rust raw strings `r#"…"#` that contain quotes are mis-coloured.
   - Rust nested block comments aren't handled. After you fix that, `rs-ch1.js`'s override becomes a fix-round removal.
6. **Terminal error colouring.** Merged lines whose stderr twin differs only by a per-run thread id aren't coloured as errors (comic.js ~247–249). Match with digits normalised, or another honest rule, and document it.
7. **Parsons** already supports `pin`. Add an optional `alts` (extra accepted orders) to the parsons data. The fix round will add only orders proven by a real run. Document it in AUTHORING.md.
8. **Fill blanks** are graded independently, so mixed alternatives that don't compile get accepted. Add an optional `sets` (whole-tuple alternatives) and document it.

### E. Verification (required before you report)
- Before you change anything, take screenshots of a fixed sample at 1280 and 390 with `node tools/check_chapter.js <page> --shots <scratch>/before/<id>`. Use: `tools/fixture/widgets.html`, `python/ch5.html`, `python/ch17.html`, `rust/ch7.html`, `rust/ch29.html`, `go/ch9.html`, `cpp/ch8.html`, `cpp/ch21.html`, `javascript/ch14.html`, `javascript/ch26.html`, and the home page `index.html`. Repeat after your changes into `after/`. Look at the pairs yourself with the Read tool, cropping tall pages with PIL.
- Run `check_chapter.js` on **all 142 chapters**, one at a time (the machine has 2 cores shared with review agents). Every chapter that passed before must still pass. Write a summary table to `tools/review/engine-refresh-check.txt`.
- Re-run `measure.js` and `maps.js` and quote the new minimum sizes.
- Delete your screenshots when you finish, because disk is limited. Keep scratch inside `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/engine-refresh/`.

## Deliverables
1. The changed engine files.
2. `tools/DESIGN_SYSTEM.md` (new). It covers the tokens, the shadcn → comic class map, the states each control has, the motion rules with their tokens and budgets, and provenance: shadcn commit, Emil skills commit, both MIT. Write it for chapter authors and the fix round.
3. New engine notes appended to `AUTHORING.md`:
   - the tokens to use
   - `.term.wrap` now lives in the engine
   - parsons `alts` and fill `sets`
   - the tracer phone layout
4. `tools/review/engine-refresh-chapter-todo.md`: every chapter-level change your work makes possible or necessary, such as deleting duplicated `.term.wrap` copies or the `rs-ch1.js` override. Don't make those changes yourself.

## Boundaries
- Edit only the engine files (`assets/comic*.css`, `assets/comic*.js`), `tools/check_chapter.js` if the checker needs to learn a new option, `AUTHORING.md` (append only) and your new docs. **Don't edit chapter pages, `assets/ext/*`, `data/*` or programs. Don't run `capture.py`.**
- Preserve behaviour: every widget contract in AUTHORING.md keeps working, and nothing a chapter relies on changes shape.
- Keep it plain: no new external dependencies, no build step, and everything works from file://. Don't use `rm -rf`. Don't publish artifacts, spawn agents or write outside the project and your scratch folder.

## Final report (under ~400 words)
Cover:
- the files changed
- the token list
- the component map (short)
- the motion Before/After/Why table, or the first 10 rows with a pointer to the rest in DESIGN_SYSTEM.md
- the new minimum font sizes for tracers, steppers and maps at 390
- the check results across all 142 chapters
- what you deliberately left for the fix round, with reasons
