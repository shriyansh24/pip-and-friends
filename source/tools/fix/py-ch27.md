# Fix bundle: python/ch27.html

19 review findings, 3 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [visual] panel 27 (which tool when) @390** (visual-py-26-27): On phones the tool table is 25px wider than the panel and gets clipped. The whole 'Why' column is cut ('overlaps', 'code sta', 'juggles' and 'process with its own GIL' all lose their ends), and the caption above loses 'question'. The table has no scroll wrapper.
   - evidence: Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/c27a.png (middle) and /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/a27/w390-045-p27.png; audit.js 'beyond' reports +25px for p27. The unbreakable `ThreadPoolExecutor` / `ProcessPoolExecutor` code in the middle column makes the table wider than the panel.
   - fix: Before: a bare `<table class="ch27-table">` -> After: wrap it in a sideways scroller (`overflow-x:auto`, like `.cmd26-wrap`), or better, stack the rows on phones: `@media (max-width:560px){ .ch27-table, .ch27-table tr, .ch27-table td { display:block } .ch27-table thead { display:none } }` with each cell labelled by its column name (why: this table is the chapter's decision guide, and the 'Why' column is the lesson).
2. **[medium] [book] panel 14 (exercise e6)** (book-py): A Chapter 27 exercise relies on the walrus operator and calls it 'the walrus loop (Chapter 16)', but no chapter of the book teaches := .
   - evidence: ex_rail_trace.py line 11: 'while (dish := rail.get()) is not None:'. Explain text: '…which ends the walrus loop (Chapter 16).' grep for ':=' or 'walrus' finds it only in ch27.html; ch16.html has neither.
   - fix: Rewrite ex_rail_trace.py without := (while True: dish = rail.get(); if dish is None: break) and recapture, or define := in a sentence where it first appears in ch27 and drop '(Chapter 16)'.
3. **[medium] [content] panel 2 and 5** (content-py-25-27): The page credits time.perf_counter() to Chapter 24, but Chapter 24 uses timeit and cProfile. perf_counter was taught in Chapter 18.
   - evidence: Panel 2: "timing with time.perf_counter() (Chapter 24)". Panel 5: "measures the whole run with perf_counter (Chapter 24)". grep -l perf_counter python/ch*.html returns only ch18.html ("a decorator that times a function, using time.perf_counter(), a stopwatch") and ch27.html.
   - fix: Change both references to "(Chapter 18)", or to "(Chapter 18; Chapter 24 measured with timeit)".
4. **[medium] [book] panel 2, 5** (book-py): Chapter 27 twice credits time.perf_counter() to Chapter 24, but Chapter 24 never uses it; it is taught in Chapter 18's timing decorator.
   - evidence: Panel 2: 'timing with time.perf_counter() (Chapter 24)'. Panel 5: 'measures the whole run with perf_counter (Chapter 24)'. grep -c perf_counter: ch18.html 1, ch24.html 0 (ch24 uses timeit).
   - fix: Change both to '(Chapter 18)', or 'perf_counter (Chapter 18) … measure first (Chapter 24)'.
5. **[medium] [visual] panel 4 (time lanes) @390** (visual-py-26-27): On phones the lane labels 'dial', 'on hold' and 'cook' drop to 11px, under the 12px floor, inside boxes that clip with `overflow: hidden; white-space: nowrap`.
   - evidence: audit.js small text: p4 'dial', 'on hold' and 'cook' at 11px at 390. Rule: `@media (max-width:560px) { .ch27-bar > span { font-size: 0.6875rem } }`. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/a27/w390-007-p4.png.
   - fix: Before: `.ch27-bar > span { font-size: 0.6875rem }` (phones) -> After: `font-size: 0.75rem`, and let the 'who' column shrink to 40px (why: 12px is the phone minimum, and the boxes have room at 390).
6. **[medium] [book] panel 49** (book-py): The whole-book recap gives Chapter 7 a catchphrase taken from Chapter 8's recap; Chapter 7's own catchphrases are not used.
   - evidence: ch27: '7 · Crates in a Row — Lists find things by position.' ch8 recap: 'LISTS FIND BY POSITION. DICTS FIND BY NAME.' ch7 recap: 'COUNT FROM ZERO', 'START IS IN, STOP IS OUT', 'CHANGERS HAND BACK NONE', '= NEVER COPIES', 'SEALED STAYS SEALED'. (Also ch3's line says 'every value has a type' where ch3's recap says 'EVERY VALUE HAS A KIND'.) The other 25 lines quote or fairly paraphrase their chapters.
   - fix: Change ch7's line to 'Lists <b>count from zero</b>, and <b>= never copies</b>.' and ch3's to '…every value has a <b>kind</b>.'
7. **[medium] [content] panel 49 (the whole book on one page)** (content-py-25-27): The panel promises 'one catchphrase each', but several cards don't quote their chapter's recap. Chapter 7's card uses Chapter 8's catchphrase.
   - evidence: Card 7: "Lists find things by position." That is ch8's recap ("LISTS FIND BY POSITION. DICTS FIND BY NAME."); ch7's recap is COUNT FROM ZERO / START IS IN, STOP IS OUT / CHANGERS HAND BACK NONE / = NEVER COPIES / SEALED STAYS SEALED. Cards 16 ("Comprehensions and generators: make each item only when it's needed."), 17 ("Functions are values you can hand around."), 25 ("A stencil for a kind of text; the encoding is the codebook.") and 26 ("Run the checklist before every takeoff: tests, logs and tidy code.") are summaries. The real recaps say BELT, GATE, STAMP / NO BRACKETS HANDS IT OVER, BRACKETS RUN IT / STRING METHODS FOR ONE EXACT PIECE, A STENCIL FOR A KIND OF TEXT / EVERY FLIGHT, EVERY LINE OF THE CHECKLIST. Cards 19-24 quote their recaps exactly. Card titles match each chapter's <title>.
   - fix: Use a real recap catchphrase on cards 7, 16, 17, 25 and 26 (for example 7: "= never copies. Count from zero."; 26: "Every flight, every line of the checklist."). Or change the intro to "one line each".
8. **[medium] [content] panel exercise e6 (after Panel 14), program ex_rail_trace.py** (content-py-25-27): The trace exercise relies on the walrus operator :=, which the book never teaches, and its explanation credits it to Chapter 16.
   - evidence: ex_rail_trace.py line 11: while (dish := rail.get()) is not None:. Explanation: "…which ends the walrus loop (Chapter 16)." grep finds 'walrus' only in ch27.html. ':=' appears elsewhere only inside a ch4 SyntaxError message ("Maybe you meant '==' or ':='"). python/ch16.html has neither.
   - fix: Rewrite the loop like ticket_rail.py (while True: dish = rail.get(); if dish is None: break), then recapture. Or define := in a sentence in Panel 14 and drop the Chapter 16 reference.
9. **[medium] [visual] panel quick check after Panel 27 (inside async def: which line lets others run) @390** (visual-py-26-27): The option rows run 7px past the exercise card's right edge, so their right borders and the end of `asyncio.run(asyncio.sleep(0.5))` sit outside the card.
   - evidence: audit.js 'beyond' reports +7px for main-after-p27-ex-card; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/f27/f06.png (left column, middle).
   - fix: Covered by the engine fix for the panel track (minmax(0,1fr)); locally, `.ex-opt code { overflow-wrap: anywhere }` (why: one long code option sets the card's min-content width).
10. **[low] [book] panel 10, TOC part 2** (book-py): 'The tip jar' means two unrelated ideas in one book: the shared mutable default in Chapter 17 (which ch19 and ch26 call back to) and the race-condition counter in Chapter 27.
   - evidence: ch17 cover: 'a tip jar that remembers too much' (mutable default); ch19: 'It's Chapter 17's tip jar all over again'; ch27 TOC: 'threads, the kitchen door, and the tip jar' and Panel 10 'the tip jar' (race condition).
   - fix: Rename ch27's jar (e.g. 'the takings jar' or 'the till') or add a half-sentence in Panel 10: 'a different jar from Chapter 17's: this one is shared by threads'.
11. **[low] [visual] panel 21, 26 (timelines; tracer 11 similar) @390** (visual-py-26-27): While you step through it, each timeline box grows by up to 166px (P21 1528→1694px, P26 1503→1599px), so the Back and Next buttons move away from the finger between presses. The engine keeps tracer pictures one size for this reason, but the extension's stage rows and screen grow with each step.
   - evidence: Stepper probe at 390 (dyn2.js): tl-gather height 1528 minimum, 1694 maximum over 7 steps; tl-block 1503 / 1599.
   - fix: Reserve the final size: give `.tl-state` `min-height: 2lh`, and give the timeline's `.screen pre` a min-height equal to the final output's line count, set in mountTimeline (why: controls that stay put under the thumb).
12. **[low] [book] panel 42, notebook** (book-py): Chapter 27 credits pip install and virtual environments to Chapter 23; they are taught in Chapter 13.
   - evidence: Panel 42: 'requests, a popular third-party package (install it with python3 -m pip install requests, Chapter 23)'; notebook: 'ideally inside a virtual environment (Chapter 23)'. ch13 recap: 'ONE PANTRY PER PROJECT python3 -m venv .venv … PIP THROUGH YOUR PYTHON'.
   - fix: Change both to 'Chapter 13'.
13. **[low] [book] panel 47 (boss b6)** (book-py): Chapter 27 introduces Jangles as 'Chapter 8'; Jangles first appears in Chapter 9 (ch26 says 'Jangles (KeyError, Chapter 9)').
   - evidence: b6 explain: 'KeyError: 'PIPSHOP_DB' (Jangles, Chapter 8)'. grep -c -i jangles ch8.html = 0.
   - fix: Change to '(Jangles, Chapter 9)'.
14. **[low] [visual] panel 50 (the end parade) @390** (visual-py-26-27): The whole-cast parade draws critter labels at 3.3–8.5px (train letters, crate indexes, cabinet drawers, the ghost's 'None'), and the four guides wrap 3 + 1, leaving Kit alone on a row.
   - evidence: audit.js small text for p50; crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/c27a.png (right) and /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/f27/f12.png.
   - fix: On phones put the guides 2 per row (`width: min(40%, 120px)` for that group), and draw the creatures at `.char` size in two rows (why: a farewell parade the reader can actually read; this mirrors the known py ch10 p51 item).
15. **[low] [visual] panel 6 @390** (visual-py-26-27): The 'HIRED!' sound-effect burst covers Ben's 'zzz' and the top of his head.
   - evidence: audit.js overlap HIRED!/zzz with fraction 1.0 at 390; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/c27a.png (left).
   - fix: Move the burst to `.sfx.tl`, or drop the phone pose's 'zzz' on the waiter being hired (why: a decorative burst must not cover what a drawing means).
16. **[low] [content] panel boss b6 (boss_error.py)** (content-py-25-27): The explanation places Jangles in Chapter 8, but Jangles first appears in Chapter 9. Chapter 26 cites it as 'Jangles (KeyError, Chapter 9)'.
   - evidence: Page: "KeyError: 'PIPSHOP_DB' (Jangles, Chapter 8)". grep Jangles: ch8.html 0 matches, ch9.html 3.
   - fix: "(Jangles, Chapter 9; dicts' demand-or-ask in Chapter 8)".
17. **[low] [visual] panel cover, 3, 6, 9, 10, 14, 19, 50 (waiter badges) @both** (visual-py-26-27): The waiters' name badges (ANA, BEN, CY) are the only mark in the drawings that tells the three waiters apart, but they render at 3.3–8.8px at every width. 'ONE AT A TIME' on the kitchen door in P3 is 4.9–7px.
   - evidence: audit.js small-text list in /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-26-27/a27/audit.json (e.g. p3 ANA at 3.6px at 1280, p50 at 3.3px at 390). In py-ch27.js, the waiter's badge uses `font-size="10"` in a 170-unit viewBox.
   - fix: Raise the badge text from font-size 10 to 16 and widen the plate (the vest colours already differ), and in P3's small cards rely on the captions (why: a 4px name is noise, not a label).
18. **[low] [content] panel notebook Lab** (content-py-25-27): The lab says everything works on Python 3.11 or newer, but gil_check.py (Panel 9) calls sys._is_gil_enabled(), which the page's own version notes date to 3.13.
   - evidence: Lab: "Everything here works on Python 3.11 or newer". gil_check.py line 6: sys._is_gil_enabled(). Version notes: "sys._is_gil_enabled() exists since 3.13."
   - fix: "Everything here works on Python 3.11 or newer, except gil_check.py (3.13+)…"
19. **[low] [content] panel notebook version notes and footer** (content-py-25-27): 'Eight printed something different' leaves out threads_chatty.py, which meta.versionDifferences lists as the ninth.
   - evidence: meta.versionDifferences has 9 entries, including threads_chatty.py (3.15.2: flour, milk, eggs got the price list; 3.13.18: milk before flour). The notes list 5 + 2 + forgot_await_repr.py = 8.
   - fix: Add: "threads_chatty.py also came out in a different order, as any run may (it is 'one possible run')." Change Eight to Nine in the notes and footer.

## INTEGRATION_TODO lines naming this chapter
- ## From python ch27 (Waiters and Open Doors), the last Python chapter
- DONE 2026-11-08 11:15 (main session), engine (comic-widgets.css, end section): `.panel { grid-template-columns: minmax(0,1fr) }` stops long code tokens widening panels and getting clipped (py ch26 P17); 44px tap targets on touch for .pz, motion toggle, replay, summaries and topbar chapter links. Still open for chapter fix agents: py ch27 P27 table (wrap or stack), ch26 red-on-pink 5.97:1, ch27 `left` transition, chapter `.term` wrap overrides.
- CHAPTER TERMINAL OVERRIDES: several chapter stylesheets force `pre-wrap; overflow-wrap:anywhere` on every terminal (py-ch23.css:73, py-ch25.css:27, py-ch27, …), which breaks carets. Fix agents: delete them and use `class="term wrap"` where a terminal's key line is off-screen at 390. Script lead for the fix round: grep assets/ext for `.term` rules with `overflow-wrap: anywhere`.

## Engine-refresh clean-ups for this chapter
- python/ch27.html: @390: P27 +28px
- `py-ch27.js:169`
- `py-ch27.css:22` `@media (min-width: 641px)`
