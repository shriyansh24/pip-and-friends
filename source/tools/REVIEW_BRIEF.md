# Review brief (runs only after all 142 chapters are written)

You are an independent reviewer of "Pip & Friends", a comic-book programming course for complete beginners: five standalone books (Python 27, Rust 29, Go 28, C++ 29, JavaScript 29 chapters). You did not write any of it. Your job is to find what is wrong, unclear or inconsistent, with evidence. **You do not edit any file.** You write one findings file, and a separate fix round acts on it.

## Read first
1. `/home/claude/comic-site/AUTHORING.md`: the contract, including every "engine note" and "house rule" at the end.
2. `/home/claude/comic-site/tools/BRIEF.md`: what authors were asked to deliver.
3. `/home/claude/comic-site/tools/INTEGRATION_TODO.md`: issues already known. Don't re-report them unless you have new evidence; reference them by heading if relevant.
4. Your assignment below (in your task prompt): which chapters, and which lens.

## Lenses

**content**: for each assigned chapter:
- Truth: every factual claim (version facts, "since 3.12", "new in Go 1.26", error codes, guideline numbers, library behaviour) is either backed by a captured run (`data/<prefix>-chN.json`) or by a source you can fetch now. Flag anything stated as fact that is neither, quoting the sentence.
- Captures: pick at least 8 terminals and exercises per chapter and confirm that what the page shows equals the captured stdout/stderr/merged for that program. The checker does this for widgets; you check prose that quotes output.
- Honesty: every hidden wrapper, normalisation (`sed`), `.nondet` program, or "described, not run" item is disclosed on the page. Any rewrite of output must be visible in the shown command (AUTHORING house rule).
- Pedagogy: assumes no prior programming; each new term defined before use; exercises sit after the idea they check; boss level covers the chapter; no exercise gives its answer away; "why" texts don't refer to option positions (choices are shuffled).
- Cross-references: every "Chapter N…", "next chapter…", "Part 3 shows…" matches what that chapter or part actually contains (open it). Flag promises not kept.
- Cast: guides are Pip (Python), Mabel (Rust), Scoot (Go), Wren (C++), Kit (JavaScript), as in `assets/CAST.md`. Cross-book cameos must not assume the reader knows the other book.

**visual**: for each assigned chapter:
- Run `bash /home/claude/comic-site/tools/slot.sh node /home/claude/comic-site/tools/check_chapter.js <folder>/chN.html --shots <your scratch folder>/<prefix>-chN`. The slot script lets at most 3 browser runs go at once: the machine has 2 cores shared by about 10 agents. The checker now opens every `<details>` and fails pages that overflow sideways. Wrap your own Playwright audit runs the same way: `bash /home/claude/comic-site/tools/slot.sh node audit.js ...`.
- Look at every crop at 1280 and 390 (crop tall pages with PIL). Flag: clipped or overlapping text, text under 12 px on phones, horizontal page overflow, empty or broken panels, unreadable drawings, contrast problems, ligatures in code (`>=` drawn as one glyph), misaligned compiler carets, broken checklist/anatomy layouts, awkward composition.
- Each finding names the panel number and width and gives a crop path.
- **Design standard (the owner's choice): Emil Kowalski's skills.** They are in `/home/claude/comic-site/tools/vendor/emil-skills/` (MIT). Before you start, read these:
  - `skills/emil-design-eng/SKILL.md` (core philosophy, component principles, accessibility)
  - `skills/review-animations/SKILL.md` and `STANDARDS.md` (the ten standards and escalation triggers)
  - `skills/mobile-native/SKILL.md` (phone details: tap targets of at least 44px, input zoom, sticky hover, safe areas)
  - `skills/break-ui/SKILL.md` and `CATALOG.md` (worst-case content: long code lines, long names, empty states, huge counts)
  - `ui-cheatsheet.md`

  Judge every chapter against them, including its extension CSS/JS (`assets/ext/<prefix>-chN.*`). The engine was refreshed on 2026-11-08 (shadcn-style components, Emil's motion rules, phone legibility): read `tools/DESIGN_SYSTEM.md` and `tools/review/engine-refresh-chapter-todo.md` (chapter clean-ups already known, so don't re-report them). Report engine-wide issues once, as `"lens": "visual-engine"`, and don't repeat them per chapter.
- **Tooling:** the checker doesn't open `<details>`. Open every notebook page, text version and hint yourself, at 390, and measure page overflow with them open. A ready-made per-panel screenshot and measurement script from an earlier visual reviewer is at `tools/review/visual-scripts/audit.js`: copy it into your scratch folder and adapt it rather than writing your own from nothing.
- **Component consistency:** the engine's controls follow the shadcn/ui component system re-skinned in comic style (`tools/DESIGN_SYSTEM.md`). Flag chapter extensions that hand-roll a button, toggle, radio, input, badge, card, collapsible or alert instead of using the engine classes, or that override their focus, hover, active or disabled states.
- **Motion:** step through animated widgets and watch them play. Check that "Animations: off" and `prefers-reduced-motion` behave as DESIGN_SYSTEM.md says.
- **Format:** in addition to the JSON findings, put each concrete CSS/motion fix into the finding's `fix` field as an Emil-style `Before → After (why)` line. Your final report must include one markdown table with columns | Before | After | Why | covering your top fixes.

**book** (one reviewer per book): read every chapter's cover, table of contents, recap and teaser, plus the plan `tools/plans/<lang>.json`. Flag: wrong or missing teasers, topics taught twice or never, terminology that drifts between chapters, catchphrases that contradict each other, chapter-27/28/29 summaries that misquote earlier recaps, prev/next links that are wrong.

**engine** (one reviewer): go through `tools/INTEGRATION_TODO.md` and the engine files (`assets/comic*.js`, `assets/comic*.css`, `tools/capture.py`, `tools/build.py`, `tools/browser_capture.js`). For each TODO item, state whether it is still open and propose the exact change. Also list chapter extensions that duplicate an engine feature now available.

## Output
Write exactly one file: `/home/claude/comic-site/tools/review/<your-id>.json`, an array of findings:

```json
[{"file": "rust/ch9.html", "panel": "12", "width": "390", "lens": "visual",
  "severity": "high|medium|low",
  "what": "one sentence: what is wrong",
  "evidence": "quote, capture excerpt, crop path or URL",
  "fix": "the smallest change that would fix it"}]
```

Severity: **high** = wrong fact, page shows output that isn't the real run, broken exercise, unreadable content, undisclosed rewriting. **medium** = confusing teaching, broken cross-reference, a layout flaw that still reads. **low** = polish.

Then end with a short final report: the number of findings by severity and lens, and the three most important ones.

## Boundaries
- Don't edit pages, engine files, data or programs. Don't run `capture.py` (it rewrites data files). You may run programs yourself in a scratch copy to test a claim.
- Keep scratch files in `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-<your-id>/`. Delete your screenshots when you finish, because disk is limited.
- Don't spawn agents, publish artifacts or write outside your findings file.
- If a source site is declined, don't use mirrors; say the claim is unverified instead.
