# Fix bundle: python/ch12.html

12 review findings, 1 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 16 (index-path walker, red roads) @390 and 1280** (visual-py-11-15): The path walker's error state puts red text on pink: the failing bracket `[0]`, the missing key '0 / no drawer!' and the 'KeyError: 0' code all use `color: var(--error)` on `var(--pink)`, which is 5.97:1. DESIGN_SYSTEM.md says destructive red is 7:1 on paper only and fails on pink.
   - evidence: Stepped the road `school["pip"][0]` to its last step in the browser: `.pw-now.err` computed colour rgb(176,0,32) on rgb(255,225,225). Ratio computed: #B00020 on #FFE1E1 = 5.97:1 (on #FFEFD9 list fill 6.49:1). Rules: py-ch12.css:61, 84, 86. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/x/ch12-p16-err2-390.png.
   - fix: Before: `.pw-now.err { background: var(--pink); color: var(--error) }` → After: `color: var(--ink)` on pink, keep the dashed red outline and add a ✗ (why: red text needs paper behind it; the dashed border and mark carry the state without colour).
2. **[medium] [visual] panel 18 (rogue mini-cards) and 49 (recap) @1280 and 390** (visual-py-11-15): Error names and a method name are set in the all-capitals Bangers font: 'KEYERROR: 0', 'TYPEERROR: LIST INDICES…' and 'ASK FOR PAIRS WITH .ITEMS().'. Exception classes and methods are case-sensitive, and the reader is about to type `except KeyError` and `.items()`.
   - evidence: probe.js (computed font Bangers): Panel 18 'KeyError: 0', 'TypeError: list indices…'; Panel 49 'Ask for pairs with .items().'. Contact sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c12-390-03.png (right column).
   - fix: Wrap the names in `<code>` inside the heading (engine resets code in headings to mono, no uppercase): `<h3><code>KeyError: 0</code></h3>`.
3. **[medium] [content] panel 23 and 27** (content-py-10-12): The counting pattern is described three different ways: Panel 23 says ch8 made a drawer holding 1, Panel 27 labels count_kinds.py as 'first time: a drawer holding 0, then add 1', and the count_kinds.py beside that label uses counts.get(kind, 0) + 1, which never makes a drawer holding 0.
   - evidence: Panel 23 (line 545): "In Chapter 8 I counted: the first time I saw a kind, I made a drawer holding 1." Panel 27 (line 599): "COUNTING (CH 8) count_kinds.py · first time: a drawer holding 0 · then: add 1". count_kinds.py line 4: counts[kind] = counts.get(kind, 0) + 1. ch8 Panel 18: "else: counts[fruit] = 1 No drawer yet: build one, holding 1."
   - fix: In Panel 27, label count_kinds.py "first time: get() pretends the drawer holds 0 · then: store old + 1", or swap count_kinds.py for an if/else version that matches ch8 ('first time: a drawer holding 1 · then: add 1').
4. **[medium] [visual] panel 32 (three kinds of copy table) @390** (visual-py-11-15): The copy-comparison table's last column, which holds the explanation of each line, is squeezed to one or two letters at the panel edge on phones ('h / th / s / ir / b'), and nothing shows it scrolls.
   - evidence: Contact sheets /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c12-390-06.png (bottom right) and sh/c12-390-07.png (top left): columns 'Line | New outer box? | New inner boxes? | P…' with the fourth column cut at 390.
   - fix: At ≤640px turn the table into three stacked cards (one per line: `b = a`, `b = a.copy()`, `b = copy.deepcopy(a)`), each with the yes/no answers and the explanation, or drop the explanation into a row below each line.
5. **[medium] [visual] panel 5, 7, 18, 19, 40 (error terminals) @390 (P40 also 1280)** (visual-py-11-15): As in ch11, the error line of each failing run is off-screen on phones; in P40 the JSONDecodeError line is hidden even at 1280 (522px overflow).
   - evidence: probe.js: P5 ValueError: zip() argument 2… (262px hidden), P7 SyntaxError: multiple starred… (176px), P18 TypeError: list indices… (277px), P19 ValueError: too many values… (254px), P40 json.decoder.JSONDecodeError… (766px at 390, 522px at 1280).
   - fix: `class="term wrap"` on these five terminals.
6. **[medium] [book] panel notebook (line 1056)** (book-py): Chapter 12 says Chapter 18 explains iterators; iterators are Chapter 16's topic.
   - evidence: 'Chapter 18 shows how these one-pass objects, called iterators, work.' ch16 TOC: 'The candy dispenser: iter() and next()'; ch18 is closures and decorators.
   - fix: Change 'Chapter 18' to 'Chapter 16'.
7. **[medium] [content] panel notebook: Under the hood (zip is lazy)** (content-py-10-12): Wrong cross-reference: the page says Chapter 18 explains iterators, but Chapter 18 is decorators/closures; iterators are Chapter 16.
   - evidence: ch12.html line 1056: "Chapter 18 shows how these one-pass objects, called <b>iterators</b>, work." python/ch18.html is 'Backpacks and Gift Wrap' (closures, decorators); python/ch16.html 'Lazy Conveyor Belts' covers "iterators, iter(), next() and StopIteration" (ch16 line 406); tools/plans/python.json n=16 = Iteration.
   - fix: Change "Chapter 18" to "Chapter 16".
8. **[low] [visual] panel 1, 2, 11, 23 (small crates, cabinets, sealed crate) @390 (and 1280 for P2)** (visual-py-11-15): Several creatures drawn at small sizes carry their labels below legibility: the 'Ada/Bo/Cy' crate in P1, the tuple's sealed crate and the crate digits in the P2 four-shapes cards, and the dog/cat/bird cabinets in P11 and P23.
   - evidence: Contact sheets /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/sh/c12-390-00.png (P1, P2) and sh/c12-390-02.png (P11), sh/c12-390-04.png (P23). audit2.js sizes (same at 1280 and 390): P2 sealed-crate digits 5.3px and 6.8px, crate indexes 10.7px; P1 crate labels 'Ada','Bo','Cy' 9.2px; P11 cabinet drawers 'dog','cat','bird' 9.1px; cover crate labels 10px.
   - fix: Use the default `.char` width (130px) or larger for creatures whose labels carry meaning, as engine-refresh-chapter-todo §5 asks for py ch8/9/10; in `.duo.small` raise `.char { height: 96px }` to ≥120px.
9. **[low] [visual] panel 27 (counting vs grouping cards) @1280** (visual-py-11-15): In the side-by-side COUNTING / GROUPING cards the code and output are cut at the card edge even on desktop: `counts[kind] = counts.get(kin…` and `{'dog': ['Rex', 'Fido'], 'cat': [`, which are the lines the comparison is about.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/x/c12p27.png (from a12/w1280-045-p27.png).
   - fix: Stack `.versus` into one column for panels with code (as py-ch14.css does with `.pair14`), or mark those terminals `term wrap`.
10. **[low] [content] panel 41** (content-py-10-12): 'Remember Chapter 10's warning about a dish called mac, cheese?' refers to something that appears only in an optional ch10 notebook page and a challenge hint, so main-path readers won't remember it.
   - evidence: ch10 mentions mac, cheese only in the notebook page 'In real programs: csv, json, and safer saves' and the Panel 55 hint for 'Grown-up formats'.
   - fix: "Chapter 10's home-made format has a weak spot: a dish called mac, cheese." (works whether or not the reader opened the notebook).
11. **[low] [content] panel 49 (recap)** (content-py-10-12): The catchphrase 'STARS COPY ARROWS' uses 'star' for list repetition (*), while Part 1 of the same chapter, and its Words list, use 'star' for star unpacking (first, *rest). Two meanings for one memory hook.
   - evidence: Recap (line 1004): "STARS COPY ARROWS, NOT BOXES. [[0] * 3] * 3 is one row with three arrows." Panel 7: "Unpacking with a star: one name with * in front collects 'everything else' into a list."
   - fix: "TIMES COPIES ARROWS, NOT BOXES." or "* 3 COPIES THE ARROW, NOT THE ROW."
12. **[low] [visual] panel whole page (part headings, character rows, spot cards) @both** (visual-py-11-15): py-ch12.css redefines engine classes instead of extending them: `.duo` (engine: a two-column card grid; here a flex row of characters), `.part-h` (engine part banner), `.spot`/`.spot-line` (engine toggle). A future engine change to `.duo` or `.part-h` will silently change this page, and a `.duo-card` placed here would break.
   - evidence: py-ch12.css:4–15 (`.part-h`, `.duo`), 92–95 (`.spot`, `.spot-line`); engine definitions comic-widgets.css:123–127, 230–233.
   - fix: Rename the chapter versions (`.ch12-cast`, `.ch12-part`) per AUTHORING's naming house rule, and delete the `.spot` overrides the engine now covers (comic-widgets.css:180–181).

## INTEGRATION_TODO lines naming this chapter
- CROSS-REF DRIFT IS SYSTEMIC: "Chapter N teaches X" is wrong in many places (py ch12, 13, 22, 24, 27 so far). For each book, have the fix agent grep every "Chapter N" mention and check it against the plan's topic list plus the target chapter's text. py ch13 also says "Chapter 23 builds a uv.lock", but ch23 only lists `uv lock`.

## Engine-refresh clean-ups for this chapter
- `py-ch12.js:217`
