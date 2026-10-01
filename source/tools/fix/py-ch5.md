# Fix bundle: python/ch5.html

9 review findings, 0 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 20** (content-py-4-6): range_input.py and range_input_fixed.py use `for _ in range(times):`, but the underscore loop name is never explained anywhere in the chapter; a beginner meets a name that is just `_`.
   - evidence: Programs range_input.py / range_input_fixed.py line 2: `for _ in range(times):`. grep for 'underscore' or <code>_</code> in python/ch5.html: no matches. Panel 16 says the loop variable is a name 'You choose'.
   - fix: Add one caption sentence in panel 20: "_ is an ordinary name; programmers use it when the loop never reads the value." (or rename it to `cheer`).
2. **[low] [content] panel 14** (content-py-4-6): The IndentationError example is a `for` loop, one panel before `for` is taught; the page apologises "(for is coming up next)" instead of using a while loop.
   - evidence: no_indent.py: `for n in range(3):` / `print(n)`; caption: "(for is coming up next.)". Part 3 (for and range) starts at panel 15.
   - fix: Rewrite no_indent.py as a two-line `while` example (e.g. `while count <= 3:` with an unindented print) and recapture, or move this half of the panel after panel 16.
3. **[low] [content] panel 18** (content-py-4-6): Caption promises the reason for counting from 0 'with strings in a moment', but panel 19 only shows the carriages numbered from 0; it never explains why.
   - evidence: Panel 18: "Programmers count from 0 (you will see why with strings in a moment)." Panel 19 text: "The loop variable letter rides each carriage in turn... 4 carriages, 4 laps." No reason given.
   - fix: Reword to "(strings number their carriages from 0 too, as you saw in Chapter 3)" or add a one-line reason in panel 19.
4. **[low] [content] panel 18** (content-py-4-6): Caption says "The same four ranges as real programs", but the panel 17 number line has five ranges (range(1, 11) is the one not shown).
   - evidence: rl-model examples: range(5), range(2, 6), range(1, 11), range(0, 10, 3), range(5, 0, -1); panel 18 shows count5, range_start, range_step, countdown.
   - fix: "Four of those ranges as real programs."
5. **[low] [content] panel 20** (content-py-4-6): The readlist says the ^^^^^^^ sits under `times`, but in the captured traceback the carets are under `(times)` and a ~~~~~ run sits under `range`, which the readlist doesn't mention.
   - evidence: Readlist: "line 2 and the ^^^^^^^ under times". Capture stderr: `    for _ in range(times):` / `             ~~~~~^^^^^^^` (~ under range, ^ under (times)).
   - fix: "line 2: the ~~~~~ marks the call range, the ^^^^^^^ marks what went into it, (times)."
6. **[low] [content] panel 22** (content-py-4-6): A tracer note states as a Python fact that total and n share one int object because 'Python reuses small numbers'; that's a CPython implementation detail, not captured or sourced on the page.
   - evidence: tr-sum step 4: "That is the same object n points at (Python reuses small numbers)." No id()/is capture in data/py-ch5.json.
   - fix: Say "CPython, the usual Python, reuses small numbers", or draw separate int boxes and drop the sentence.
7. **[low] [visual] panel 22 @1280** (visual-py-1-5): At the tracer's last step the arrows from `total` and `n` cross each other (total → 10 sits below n → 4), and the faded objects leave a tall empty band above the two remaining boxes.
   - evidence: Crop c5/1280o-013-P22.png (step 12 of 12). The same layout limitation is noted in INTEGRATION_TODO 'From python ch18' (compacting slots) and '[ch2] Narrow tracer: arrows ... cross'.
   - fix: Engine: after the last appearance of an object, let later objects move up into its slot, or order slots so that names keep the vertical order of their targets. No chapter-level change is needed.
8. **[low] [visual] panel 23 @1280 and 390** (visual-py-1-5): The small signpost next to Pip's bubble has '+1' and 'skip' arms lettered at 7.7px, which can barely be read at either width.
   - evidence: Automated scan: signpost labels 7.7px at both widths. Crop c5/1280-039-P23.png (bottom-left of the panel).
   - fix: Use the normal-size signpost (drop `.sm`) or set `data-yes`/`data-no` on a larger `.char` so the labels reach 12px.
9. **[low] [content] panel notebook: Loop-else** (content-py-4-6): Unsourced generalisation: "Many style guides suggest using it sparingly".
   - evidence: "A good way to remember it: read loop-else as \"no break\". Many style guides suggest using it sparingly, because readers often misread it..." No source in the footer.
   - fix: Drop "Many style guides suggest" and say "Use it sparingly: readers often misread it as...", or cite a specific guide.
