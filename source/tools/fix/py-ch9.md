# Fix bundle: python/ch9.html

10 review findings, 0 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 35, 36** (content-py-7-9): The debugging example gives two different intended discounts: the caption says a 20% discount on 80 should be 64, but Pip's bubble and the duck panel say the function wanted 25 ('25 percent'), which would give 60, not 64.
   - evidence: Panel 35 caption: "A 20% discount on 80 should be 64. This prints 79.8. Why?"; Pip: "percent=0.25. The function wants 25, meaning \"25 percent\", but the call passed 0.25." Capture print_debug.py: discount(80, 0.25) -> "price=80 percent=0.25 cut=0.2" / "79.8". Panel 36: "So I call it with 80 and... 0.25... WAIT. 0.25 ISN'T A PERCENT!"
   - fix: Make the caption say "A 25% discount on 80 should be 60. This prints 79.8. Why?" (keeps the program and capture unchanged).
2. **[medium] [visual] panel 13 (gallery of error critters) @1280** (visual-py-6-10): In the gallery cards the error names break in the middle of a word ('ZeroDivisionErro' / 'r', 'FileNotFoundErro' / 'r').
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w1280-018-p13.png
   - fix: Write the names as 'ZeroDivision<wbr>Error' and 'FileNotFound<wbr>Error' (and AttributeError the same way), or lower the card title font one step at >=900px.
3. **[medium] [content] panel 14** (content-py-7-9): The panel says every traceback so far had one File line, but chapters 6 and 7 already showed multi-frame tracebacks.
   - evidence: Panel 14: "So far every report had one <code>File</code> line." python/ch6.html shows deep_error.py (line 685) and unbound.py (line 1005), whose captures have 2+ File lines; python/ch7.html panel 37 machine note on min_max_empty.py: "The traceback shows two places: the call on line 4, then min() inside the function on line 2."
   - fix: Reword to "You've seen a few two-step trails already (Chapter 6, Chapter 7's min_max). Errors inside functions that call functions leave a longer trail."
4. **[medium] [visual] panel 8, 13, 41 (Tumble critter) @390** (visual-py-6-10): The Tumble critter's crate index numbers ('0 1 2 3?'), which carry the IndexError idea, render at 4.8–7.7px and can't be read.
   - evidence: Audit: p13 4.8px (both widths), p41 5.3px at 390 and 5.8px at 1280, p8 7.2px at 390 and 11.3px at 1280. /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w390-012-p8.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w1280-018-p13.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w390-069-p41.png
   - fix: In comic-critters.js tumble, draw the index digits larger in viewBox units (about 2x) or drop them when the critter is shown at .sm size. Every bubble already says 'box 3', so they are optional at small sizes.
5. **[medium] [content] panel after 20 (ex-avgfix)** (content-py-7-9): The fill exercise uses quiet_avg_fixed.py, the exact program printed in full in the FIXED column of Panel 20 directly above it, so the answer is on screen.
   - evidence: Panel 20 shows <pre class="code" data-src="quiet_avg_fixed.py"> with "average = (a + b + c) / 3" and the caption "Brackets fix it."; ex-avgfix-m: {"program":"quiet_avg_fixed.py", blank line 4 text "(a + b + c) / 3"}.
   - fix: Either drop the FIXED column from Panel 20 (keep only the caption's explanation), or give the exercise a different buggy program (e.g. an average of four numbers, or a total-then-divide bug) so the reader has to apply the idea.
6. **[medium] [book] panel next-chapter strip** (book-py): Chapter 9's teaser promises Digger in Chapter 10, but Digger never appears there (known from QA_REPORT, still open).
   - evidence: ch9: 'NEXT: CHAPTER 10 · PIP'S RECIPE BOOK The capstone project: real files, real recipes. Digger will be waiting.' ch10.html has no data-char="digger" and no mention of Digger; Panel 30 (FileNotFoundError) shows only Pip. Listed in tools/QA_REPORT.md row '9 → 10' and INTEGRATION_TODO '[QA]'; unchanged today.
   - fix: Add Digger (comic-critters.js) to ch10 Panel 30 with a one-line bubble ('Nothing at that path!'), or drop 'Digger will be waiting.' from the ch9 teaser.
7. **[low] [visual] panel 21 and 26 (safety-net drawings) @390** (visual-py-6-10): Two-line labels in the net drawings ('the risky / step', 'gets / through ✗') have tight line spacing, and their lines overlap by about 30% at phone size.
   - evidence: Text-rect overlap 0.31 (audit), /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w390-036-p21.png
   - fix: Add 2–4 units of dy between the two tspans, or shorten the labels to one line.
8. **[low] [content] panel 3** (content-py-7-9): Cast definition conflict: ch9 (and ch1 P25) correctly say the Proofreader checks the whole file before anything runs, but assets/CAST.md describes the Proofreader as reading "one line at a time as the program starts".
   - evidence: ch9 Panel 3: "The Proofreader reads the whole file first. A writing mistake means nothing runs at all."; ch1 line 523: "I check the <em>whole</em> file before Pip runs anything."; assets/CAST.md: "The Proofreader reads one line at a time as the program starts. The Compiler inspects the whole program first." Capture g_syntax.py has no Traceback line and no output, consistent with the page.
   - fix: Change CAST.md, not the page: "The Proofreader reads the whole file just before Python runs it, one file at a time; the Compiler checks the whole program and builds it before you run it."
9. **[low] [visual] panel fill exercise after panel 30 (raise ValueError) @390** (visual-py-6-10): The fill code wraps 'raise ValueError("volume only goes up to 10")' back to column 0 and puts 'except ___ as err:' with the blank on its own row, so the indentation, which matters for raise and except, is lost.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a9/w390-051-main-after-p30-ex-card.png
   - fix: Covered by the engine .fill-code fix in the ch10 finding (no wrapping, or a hanging indent).
10. **[low] [book] panel terms** (book-py): The glossary defines 'divide and conquer' twice with different meanings: halving a program to find a bug (ch9) and the split-solve-combine algorithm (ch24).
   - evidence: ch9: 'Check the middle, then search only the half where things go wrong.' ch24: 'Splitting a problem into halves, solving them the same way, and combining the results.'
   - fix: In ch9 call the debugging trick 'halving' (its recap already says PRINT · DUCK · HALVE · SHRINK) and drop the 'divide and conquer' term there.

## Engine-refresh clean-ups for this chapter
- **py ch9, `.gang code` (py-ch9.css:35) and `.rogue-name` (:17).** `overflow-wrap: anywhere` breaks `ZeroDivisionErro|r` at 1280. Use `overflow-wrap: break-word`, or write `ZeroDivision<wbr>Error` (also FileNotFound, Attribute).
- Tumble in py ch9 panels 8, 13 and 41 (drawn about 90px wide)
- `py-ch9.js:190`
