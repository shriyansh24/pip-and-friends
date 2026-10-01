# Fix bundle: python/ch6.html

7 review findings, 0 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[low] [content] panel 23** (content-py-4-6): Says print has two keyword parameters; it has four (sep, end, file, flush).
   - evidence: "print has two keyword parameters: sep (...) and end (...)". docs.python.org/3/library/functions.html#print: print(*objects, sep=' ', end='\n', file=None, flush=False).
   - fix: "print has keyword parameters, including sep ... and end ..."
2. **[low] [visual] panel 34 (built-in machines) and 19 (map) @390** (visual-py-6-10): The four small machines' name plates (print(), input(), len(), int()) render at 10.8px, and the p19 map labels at 11.7px.
   - evidence: Audit, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a6/w390-060-p34.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a6/w390-033-p19.png
   - fix: Draw the p34 machines at a larger width on phones (e.g. 2 per row at 45%). The map is part of the general map label item.
3. **[low] [content] panel 37** (content-py-4-6): The max() machine notes simplify ch4's teaching: strings compare 'in dictionary order' (ch4 stresses that capitals come before all lowercase), and 'a number and a string can't be compared' (ch4 stresses that == works; only ordering fails).
   - evidence: m-max: "Strings compare in dictionary order, letter by letter."; "A number and a string can't be compared. Jammed." ch4 panel 31: "all capital letters come before all lowercase letters"; ch4 notebook: "Only ordering is: \"5\" < 3 is a TypeError, but \"5\" == 5 is simply False."
   - fix: "Strings compare character by character, as in Chapter 4"; "A number and a string can't be put in order. Jammed."
4. **[low] [visual] panel 40 (refactor drawing) @390** (visual-py-6-10): At phone width the label 'one formula' exactly fills its white box (text and box are both 134 units wide), so the box's 3-unit stroke runs into the first and last letters.
   - evidence: getBBox at 390: text x=252 w=134, rect x=252 w=134. At 1280 the text is 115 wide. The phone rule '.fig text.s { font-size: 21px }' in ext/py-ch6.css causes it: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a6/w390-068-p40.png
   - fix: Add class 'xs' to that <text> (phone size 18px), or widen the white rect and the yellow box by about 16 units.
5. **[low] [content] panel 5** (content-py-4-6): The anatomy calls 'lowercase' a naming rule, but ch2 teaches lowercase/snake_case as style (PEP 8), not a rule Python enforces.
   - evidence: ch6: "greet: The machine's name. Same rules as variable names: lowercase, underscores, no spaces." ch2: "A capital F also works, but lowercase is the usual style"; "PEP 8, asks for snake_case".
   - fix: "Same rules as variable names (no spaces, can't start with a digit), and the same snake_case style."
6. **[low] [visual] panel 6 (walker) @390** (visual-py-6-10): In the phone walker, print lines wrap to column 0 ('print("Beep!' / 'Hi!")'), and the two blank lines 3–4 each take a full step row, so the card is tall and the code is ragged.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a6/w390-011-p6.png
   - fix: Engine walker: at <=640px use white-space:pre with overflow-x:auto in the walker code list (or a hanging indent), and collapse blank lines to half height.
7. **[low] [content] panel notebook: Version notes** (content-py-4-6): The version-history claims aren't backed by a capture (only 3.15/3.13 are captured) and cite no source. The reviewer's own runs confirm three; the pre-3.11 UnboundLocalError wording is still unverified.
   - evidence: Reviewer runs (python3.11/3.12/3.13 -I): the 'Did you mean' hint is absent in 3.12 and present in 3.13 (confirmed); 'non-default argument follows default argument' in 3.11 vs 'parameter without a default follows...' in 3.12 (confirmed); 3.11 already prints 'cannot access local variable' (confirmed). The old text 'referenced before assignment' wasn't checked: no 3.10 interpreter here, and the fetched Programming FAQ gives no history.
   - fix: Link the What's New pages (3.11, 3.12, 3.13) next to each note, or soften the 3.11 line to "Before 3.11 the message was worded differently".
