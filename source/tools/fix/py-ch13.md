# Fix bundle: python/ch13.html

12 review findings, 4 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 25, 28 (multi-command terminals, .term.wrap13 / data-cmdrun) @390** (visual-py-11-15): These terminals wrap with `overflow-wrap: anywhere`, so the source line a caret points at wraps and the caret row no longer sits under it: in P25 `roll = random.randint(1,` / `6)` is followed by `^^^^^^^^^^^^^^` under nothing. Meanwhile the page's other error terminals scroll instead, so two terminal behaviours sit side by side.
   - evidence: Contact sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c13-390-05.png (P25 middle column, P28 right column). Rule: py-ch13.css:92 `.term[data-cmdrun], .term.wrap13 { white-space: pre-wrap; overflow-wrap: anywhere; }` (listed for review in engine-refresh-chapter-todo §1; this is the visible consequence).
   - fix: Before: `.term[data-cmdrun], .term.wrap13 { white-space: pre-wrap; overflow-wrap: anywhere }` → After: delete the rule and use `class="term wrap"` (why: the engine's wrap never breaks a caret's source line and breaks only at spaces).
2. **[medium] [book] panel 26** (book-py): Chapter 13 quotes advice Chapter 1 never gave; the shadowing rule it means is in Chapter 2.
   - evidence: ch13 Panel 26: 'Pip says: Chapter 1 said: never name your file after something Python already has.' ch1 has no such advice; ch2 Panel (shadow_print.py) and recap: 'Never name your own tag print.' The plan's ch13 scope says 'link back to ch1's file-naming advice', but ch1's scope never had it.
   - fix: Change to 'Chapter 2 said: never give your own tag a name Python already uses. Files are no different.' and correct the plan wording.
3. **[medium] [content] panel 26** (content-py-13-15): Pip says Chapter 1 gave file-naming advice, but Chapter 1 has none, so the cross-reference points to nothing.
   - evidence: ch13 Panel 26: "Chapter 1 said: never name your file after something Python already has. Now you know why." grep of python/ch1.html finds no advice about naming files after modules (no 'random.py', 'same name', 'name a file'); the only chapters with such advice are ch13, ch19 and ch23. The plan asked for a 'link back to ch1's file-naming advice' that was never written.
   - fix: Replace the first sentence with something like "Here's a rule for life:" and keep the rest of the bubble. Or add one line to ch1's notebook and keep the reference.
4. **[medium] [visual] panel 4 and 27 (NameError / ModuleNotFoundError) @390** (visual-py-11-15): The How-to-fix boxes quote Python's hint ('Did you forget to import 'math'?', 'Did you mean: 'requests'?'), but on phones that hint is the hidden end of the terminal's last line, so the reader is told to read something they can't see.
   - evidence: probe.js: P4 `NameError: name 'math' is not defined. Did you forget to import 'math'?` (363px hidden at 390); P27 `ModuleNotFoundError: No module named 'requestz'. Did you mean: 'requests'?` (390px hidden). Contact sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c13-390-00.png (P4).
   - fix: `class="term wrap"` on both terminals.
5. **[low] [content] panel 13 and footer** (content-py-13-15): The footer dates every run 2026-11-07, but the today.py terminal on the same page shows 2026-11-08, so the page looks self-contradictory.
   - evidence: Footer: "run on CPython 3.15.2 and CPython 3.13.18 on 2026-11-07". today.py stdout: "2026-11-08 / 2026-11-08 04:38:00.828458" (TZ=UTC). meta.date comes from date.today() in capture.py's own process, which uses local time; the programs ran with TZ=UTC.
   - fix: Footer: "on 2026-11-07 (2026-11-08 in UTC, the time zone the programs ran in)". Or engine-side, record meta.date in UTC.
6. **[low] [visual] panel 24–28 (rogue cards), whole page @both** (visual-py-11-15): Hand-rolled components: `.behind summary` is its own collapsible (no engine marker or open state), `.tag13` and `.ver-tag` are hand-made badges, `.fix`/`.athome` are alerts with raw radii and shadows, and the drawings use raw fills #C8955E and #FF9F43.
   - evidence: py-ch13.css:43–44, 55–65, 70–75.
   - fix: Use the engine collapsible (`.hint`-style details) for 'How this run was really made', the outline badge (`.parity`-style) for 'one possible run', and tokens for radii/shadows.
7. **[low] [content] panel 25 and notebook Lab step 2** (content-py-13-15): Telling readers to delete __pycache__ after renaming the shadowing file implies the leftover .pyc could still shadow random. CPython ignores a __pycache__ .pyc whose source file is gone.
   - evidence: Panel 25 fix: "If a __pycache__ folder sits next to it, it holds the old file's leftovers; delete it too." Lab: "Rename random.py, delete any __pycache__ folder, and run again." PEP 3147: a pyc inside __pycache__ is not imported when its source is missing (only legacy .pyc files next to the source are).
   - fix: Say it's optional tidying: "A __pycache__ folder may hold the old file's leftovers; Python ignores them once random.py is gone, but you can delete it to tidy up."
8. **[low] [content] panel 28** (content-py-13-15): "unknown location" is explained as "math is built into Python", but that only holds on builds where math is compiled in. On python.org macOS builds, for example, math is a .so file and the message shows a path.
   - evidence: "(unknown location just means math is built into Python, not a file.)" The notebook itself says "On the builds used here, sys and math are built in" and "Which built-ins exist varies between builds".
   - fix: "(unknown location means that on this Python, math is built in rather than a file; on some systems you'll see a file path there instead.)"
9. **[low] [content] panel 44 (Boss level)** (content-py-13-15): The boss level has 7 exercises, one more than the brief's 4–6.
   - evidence: "Seven harder ones." Panel 44 is followed by b-order, b-spot, b-err, b-fill, b-trace, b-parsons and b-pip.
   - fix: Move b-err (very close to ex-fromonly) to after Panel 7 and say "Six harder ones". Or accept the overrun.
10. **[low] [visual] panel cover and 5 (tiny machines) @390 (cover also 1280)** (visual-py-11-15): The small `sqrt()` machine on the cover has a 5.8px name plate at 390 (6.4px at 1280), and the P5 'from math import sqrt' drawing's machine label is 7.7px.
   - evidence: audit2.js small text: cover 'sqrt()' 5.8px (390) / 6.4px (1280); P5 'sqrt' 7.7px (390). Contact sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c13-390-00.png.
   - fix: Draw these machines at 110px or more, or drop the plate text and name the tool in the caption.
11. **[low] [content] panel notebook: Under the hood, 'Imported once, per run'** (content-py-13-15): The page calls importlib.reload "a later topic", but no later Python chapter covers it.
   - evidence: "Restart Python (or use importlib.reload, a later topic)." grep for 'importlib.reload' / 'reload(' in python/ch14–ch27 finds nothing.
   - fix: "Restart Python (importlib.reload exists, but restarting is simpler and safer)."
12. **[low] [content] panel notebook: Under the hood, 'What a venv really is'** (content-py-13-15): The notebook says a new venv has an empty site-packages, but Panel 36 shows a brand-new pantry already holds pip.
   - evidence: Notebook: "and its own empty lib/…/site-packages". Panel 36: "A brand-new pantry holds only pip itself". pip_list capture lists pip 26.2.2.
   - fix: "and its own lib/…/site-packages, holding only pip at first."

## INTEGRATION_TODO lines naming this chapter
- [py13] Fetch critter (ModuleNotFoundError/ImportError) in ext/py-ch13.js -> move to comic-critters.js. py13 'How this run was really made' notes now redundant (steps recorded).
- `fetch` (ImportError) promoted to comic-critters.js. Remove the copies from py-ch13.js and py-ch23.js.
- CRITTER COPIES: py ch13 and ch15 don't load comic-critters.js, and their extensions redraw Jigsaw, Pockets, Sneak and others. Merge them into the engine's critters or load the shared file.
- CROSS-REF DRIFT IS SYSTEMIC: "Chapter N teaches X" is wrong in many places (py ch12, 13, 22, 24, 27 so far). For each book, have the fix agent grep every "Chapter N" mention and check it against the plan's topic list plus the target chapter's text. py ch13 also says "Chapter 23 builds a uv.lock", but ch23 only lists `uv lock`.

## Engine-refresh clean-ups for this chapter
- `py-ch13.css:92` (`.term[data-cmdrun], .term.wrap13`): a chapter-specific variant. Consider switching its markup to `class="term wrap"`.
