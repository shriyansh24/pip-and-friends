# Fix-round brief (after all 85 reviews)

You own a small set of chapters (named in your task prompt) and you fix everything the reviews found in them. You may not have written these chapters. Read before you change anything. Every change must be backed by a real run or a source you fetched now.

## Read first
1. `AUTHORING.md` (the contract, including every engine note and house rule at the end) and `tools/DESIGN_SYSTEM.md` (the refreshed engine: tokens, components, motion, the new parsons `alts` and fill `sets`, the tracer phone layout, `.term.wrap` now in the engine).
2. Your bundles: `tools/fix/<prefix>-chN.md`, one per chapter. Each lists every review finding, every INTEGRATION_TODO line naming that chapter, and engine-refresh clean-ups. Work through **every item**.
3. The "book-wide rules" below. They came from patterns the reviewers found in many chapters, so apply them to your chapters even where no reviewer flagged your page.
4. `tools/fix/_crosscutting.md`, skimmed for anything that touches your chapters.

## Book-wide rules (apply to every chapter you own)
1. **Shown command = real command.** If a `.cmd` step's real command filters or rewrites output (`| sed`, `| sort`, `| grep`, `2>&1`) or fakes the exit code (`; exit ${PIPESTATUS[0]}`, `; exit $?`), the displayed command must show it. Prefer making the displayed command the real one, so the reader can type it and get the same screen. For the exit code, show `set -o pipefail` as a visible step, or show the pipeline's exit honestly. Setup around an identical command (staging files, `cd`, a runner script that runs exactly the shown command) needs a short on-page "How this run was really made" note under that terminal, not just a footer line. `python3 tools/audit_chapter.py <page>` lists every case as HIDDEN-REWRITE or HIDDEN-SETUP.
2. **Varying output is never stated as fact.** A `.nondet` program's output appears only in a panel labelled "one possible run". Prose never quotes a concrete value or order from it. Say "this run printed …" only for something visible in that same panel, and prefer not quoting it at all. Never use the secondary toolchain's run as "another run" of the same program.
3. **No "left/right" unless it's true.** Most two-up layouts stack into one column (often at every width). Refer to the cards by their headings or file names instead.
4. **Every error code, message or behaviour stated must come from a capture,** in this chapter's data or a new program you add and capture. That includes compiler suggestions you tell the reader to follow, and lab instructions that change code. If you can't capture it, cut it or mark it clearly as not run.
5. **Cross-references must be checked.** For every "Chapter N …", "Panel N …" and "Part N …" in your chapters, open the target and confirm it says what you claim. Fix the number or the wording. Promises a later chapter doesn't keep get reworded, unless you own that later chapter and add the material.
6. **Line references must be checked.** Every "Line N" is checked against the program source as captured (count from 1, including blank lines).
7. **Exercises must be fair:**
   - **Choice:** the correct option must not be guessable by length. `audit_chapter.py` flags CHOICE-LENGTH. Rewrite options so they are similar in length and specificity.
   - **Parsons:** every order that really works must be accepted. Pin import/package/include/use lines (`"pin": [...]`). Where two body lines or methods can truly swap, either pin one or add the order to `"alts"`. Only add an alt after you have run that order and got the same output; record the run in your report.
   - **Fill:** every accepted alternative must compile and give the same output in that program. Where blanks depend on each other, use `"sets"`.
   - **Placement:** no exercise may give its answer away in the panel just above it, or test an idea before the panel that teaches it.
8. **No hidden environment.** If output depends on a capture environment variable (for example `UBSAN_OPTIONS=print_stacktrace=1` for the UBSan stack lines), show it in the command or say so under that terminal.
9. **Footers and counts must match the data.** Program counts, version-difference lists and "identical on both toolchains" claims must agree with `data/<prefix>-chN.json` after your recapture. Write "N programs differ" only if N matches `meta.versionDifferences`.
10. **One meaning per picture.** Don't reuse a book metaphor with a new meaning (the reviews list the clashes in the book findings). Where your chapter reuses one, rename the picture in your chapter.
11. **Version facts need a source.** Anything like "new in X" or "since X" needs a captured run on both toolchains, or a source fetched now. No mirrors: if a site is declined, mark the claim unverified or cut it.
12. **Use the engine, don't duplicate it.** Delete chapter-extension copies of engine features: critters byte-identical to `comic-critters.js`, `.term.wrap` copies, checklist grid rules. Use the engine classes for controls (DESIGN_SYSTEM.md).

## Process
1. Run `python3 tools/audit_chapter.py <each page>` and keep the output.
2. Fix the programs first. Then **recapture**: `python3 tools/capture.py <lang> N`.
   - It waits for a free capture slot; at most 2 run at once machine-wide.
   - It now swaps `g++` for `clang++` on the C++ secondary, so C++ comparison runs are real for the first time and some footers will change.
   - It drops a merged view that a re-run can't reproduce (`mergedDropped`).
   - It always marks `.nondet` programs as nondeterministic.
   - After every Rust recapture, clear `/home/you/.target/*/<folder>` for your chapter, because disk is limited.
3. Fix the page: work through each bundle item, then each book-wide rule.
4. Check:
   - `bash tools/slot.sh node tools/check_chapter.js <page> --shots <scratch>/<id>` until it PASSes. The slot script runs at most 3 browser checks at once machine-wide.
   - Look at the 390 and 1280 screenshots of every panel you changed.
   - Re-run `audit_chapter.py`. Every remaining lead must be explained in your report as NOT-A-BUG, with the reason.
   - Delete your screenshots afterwards.
5. Scratch goes in `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/fix-<prefix>-chN/`.

## Boundaries
- **Your files:** your chapters' pages (`<folder>/chN.html`), their extensions (`assets/ext/<prefix>-chN.*`), their program folders (`/home/you/<lang>-chN/`) and, through `capture.py` only, their data files.
- **Other chapters:** don't edit chapters you don't own. If a fix needs a change in another chapter, write it to `tools/fix/requests/<target-prefix>-chN-from-<your-id>.md` and say so in your report.
- **Shared files:** don't edit the engine (`assets/comic*`), the tools, `AUTHORING.md` or the plans. Request engine changes in your report.
- **Safety:** don't use `rm -rf` (use `rm -r` on your own scratch only), don't publish artifacts, don't spawn agents and don't write to the user's computer.

## Final report (your last message, under ~400 words)
- One line per bundle item, giving its id or number and one of:
  - FIXED, saying how it was verified
  - DOCUMENTED, saying where on the page
  - DEFERRED, with the reason and who could do it
  - NOT-A-BUG, with evidence
- For each book-wide rule: what you changed.
- The recapture result (program count, version differences) and the checker's PASS lines, verbatim.
- Requests to other chapters or to the engine.

## Timing note (2026-11-08, about 12:15)
A second engine pass is still finishing while the fix round starts. Do the content work first: programs, recaptures, text, exercises and cross-references. Do the visual and CSS work last. Before your visual work, check whether `tools/review/engine-pass2-chapter-todo.md` exists. If it does, read the lines naming your chapters and treat them as bundle items. If it doesn't exist yet when you're otherwise done, do your visual work against the current engine and say so in your report. Don't edit engine files even if one looks broken: report it instead.
