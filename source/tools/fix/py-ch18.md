# Fix bundle: python/ch18.html

10 review findings, 2 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 24 (@ is shorthand) @both** (visual-py-16-20): The '=' between the two equivalent forms is drawn in Bangers, whose '=' is a tiny slanted glyph about 6px wide, so the key symbol of the panel ('these two are the same') is almost invisible at both widths.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a18/w390-043-p24.png and the 1280 crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a18/w1280-043-p24.png. py-ch18.css `.ch18-eq .same { font: 400 clamp(1.4rem, 5vw, 2rem)/1 var(--f-title) }`.
   - fix: `.ch18-eq .same { font: … var(--f-title) }` → `font: 800 clamp(1.6rem, 6vw, 2.25rem)/1 var(--f-code)` for the sign only (keep 'the same thing' in the bubble font). Why: the comic title face has no usable math glyphs.
2. **[medium] [content] panel 36** (content-py-16-18): Pip's explanation points at the wrong line: the print that calls area(1, 1) is line 18, and line 17 is area(4, 5).
   - evidence: Page: "Line 17: area(1, 1) runs first, as print works out its arguments left to right". /home/you/python-ch18/log_calls.py: line 17 `area(4, 5)`, line 18 `print(area(1, 1), "after", area.calls, "calls")`.
   - fix: Change "Line 17" to "Line 18".
3. **[low] [content] panel 20** (content-py-16-18): Pip says line 14 keeps the half-finished machine, but line 13 keeps it and line 14 finishes it.
   - evidence: Page: "Line 14 keeps the half-finished machine and finishes it later." curry.py line 13 `add_one_two = curried_add3(1)(2)`, line 14 `print(add_one_two(10))`.
   - fix: "Line 13 keeps the half-finished machine, and line 14 finishes it."
4. **[low] [visual] panel 4 (LEGB order row) @390** (visual-py-16-20): The 'L → E → G → B →' row wraps before 'NameError', so the last arrow points right into empty space and NameError sits alone on the next line.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a18/w390-007-p4.png. py-ch18.css `.legb-order { display:flex; flex-wrap: wrap }`.
   - fix: Keep the row on one line (`flex-wrap: nowrap; gap: 4px` and `font-size: 0.875rem` at ≤640px) or put NameError under a downward arrow. Why: an arrow must point at what comes next.
5. **[low] [content] panel 5 (exercise e1, pred_legb.py)** (content-py-16-18): The explanation refers to line 13 of a 12-line program.
   - evidence: e1m explain: "Line 13 is at the top level, where the only x is the global one." pred_legb.py has 12 lines; `print(x)` is line 12.
   - fix: Change "Line 13" to "Line 12".
6. **[low] [content] panel 5, 15, 30 (choice exercises e2, e8, e16)** (content-py-16-18): In 3 of the chapter's 4 choice questions the correct option is clearly the longest, so a test-wise reader can guess it without understanding.
   - evidence: e2m correct: "Local, then enclosing functions (nearest first), then global, then built-in"; e8m correct: "Nothing: reading the name and changing the list it points at needs no keyword"; e16m correct: "The wrapper takes on the original function's name, docstring and other labels, and gets __wrapped__". The other options are each well under half as long. (ch16 has the same pattern in 3 of 6: e5, e14, e20.)
   - fix: Shorten the correct options (e.g. e16 "It copies the name and docstring onto the wrapper") or lengthen the distractors with a plausible clause.
7. **[low] [content] panel lab** (content-py-16-18): The lab says make_multiplier has three lines, but it has four.
   - evidence: Page: "Type the three lines of make_multiplier from Panel 7". factory.py lines 1-4: def make_multiplier, def times, return x * n, return times.
   - fix: "Type the four lines of make_multiplier".
8. **[low] [book] panel notebook (line 919)** (book-py): Chapter 18 says Chapter 22 covers catching errors; catching is Chapter 9 (Chapter 22 designs them).
   - evidence: 'Retry: catch an error and try again a few times (Chapter 22 covers catching errors).'
   - fix: Change to '(Chapter 9 covers catching errors)'.
9. **[low] [content] panel notebook: In real programs / Wrappers you will meet** (content-py-16-18): The cross-reference sends readers to Chapter 22 for catching errors, but try/except is first taught in Chapter 9. Chapter 22 is the deeper exceptions chapter.
   - evidence: Page: "Retry: catch an error and try again a few times (Chapter 22 covers catching errors)." python/ch9.html part "Catch it: try and except"; ch16 panel 26 also says "Chapter 9's try/except".
   - fix: "(Chapter 9 showed try/except; Chapter 22 goes further)".
10. **[low] [visual] panel whole chapter (extension) @both** (visual-py-16-20): py-ch18.js gives every gift layer's clipPath a random id (`Math.random()`), so each redraw makes a new id and the drawing differs between page loads; the extension also redefines a `backpack` character name that AUTHORING's naming house rule lists as already taken in other chapters.
   - evidence: py-ch18.js C.gift: `var id = "g18clip" + Math.random().toString(36).slice(2, 8)`; C.backpack. AUTHORING 'Naming chapter widgets and characters (house rule)'.
   - fix: Use a counter (`var n = 0; … id = 'g18clip' + (++n)`) and rename the character `closurepack`. Why: deterministic drawings and one meaning per name.

## INTEGRATION_TODO lines naming this chapter
- ## From python ch18 (Backpacks and Gift Wrap)
- CHOICE LENGTH BIAS: the correct option is often clearly the longest (py ch18 3 of 4, ch16 3 of 6). Audit all books with a script and rebalance the option lengths.
