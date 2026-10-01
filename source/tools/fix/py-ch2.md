# Fix bundle: python/ch2.html

7 review findings, 0 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 35** (content-py-1-3): Pip's bubble cites a Chapter 1 example that Chapter 1 never shows. Chapter 1 never uses + on strings.
   - evidence: ch2 panel 35: "Not 24! '12' + '12' glues two pieces of text: 1212. Just like \"2\" + \"2\" in Chapter 1." grep finds no "2" + "2" in python/ch1.html.
   - fix: Change it to "Just like 'ha' + 'ha' earlier in this chapter." (haha.py, ex-haha), or drop the sentence.
2. **[medium] [content] panel topbar** (content-py-1-3): Same stale 10-chapter nav and 'PIP & PYTHON' series label as ch1. There is no Contents link and no 'of 27'.
   - evidence: ch2.html lines 22-27.
   - fix: Use the §7 top bar: Contents, ← Ch 1, "Ch 2 of 27", Ch 3 →.
3. **[low] [content] panel 2** (content-py-1-3): 'Enter the Professor' introduces him as new, but the reader already met him four times in Chapter 1 (panels 6, 19, 33, 36).
   - evidence: ch2 panel 2 caption: "Enter the Professor, who keeps the notebook at the end of every chapter."
   - fix: Change it to "The Professor, who keeps the notebook at the end of every chapter, has an idea."
4. **[low] [content] panel 26, 39** (content-py-1-3): The * operator is used without explanation (constants.py, meaningful_*.py, the fstring_expr.py hole). Multiplication is only introduced in ch3 panel 10 ('a star, not an x').
   - evidence: constants.py: print(pizzas, "pizzas make", pizzas * SLICES_PER_PIZZA, "slices"); panel 39 caption {pizzas * SLICES_PER_PIZZA}.
   - fix: Add a few words to panel 26's caption: "(<code>*</code> means times; Chapter 3 has all the maths symbols)".
5. **[low] [visual] panel 3, 7, 9, 14, 17, 28, 39, cover @390** (visual-py-1-5): In the name-tag and object drawings, the small type labels ('str', 'int', 'print') and the captions 'before line 3', 'no tag: drifting off', 'hidden! never reached' fall to 9.4–11.9px on phones.
   - evidence: Automated scan at 390: 'str' 9.4–9.9px in P3, P9, P14, P17, P39 and on the cover. P28 has '1st: your file's tags' 11.9px, 'print' 9.4px and 'hidden! never reached' 11.9px. Crops: c2/390-017-P9.png, c2/390-032-P17.png, c2/390-048-P28.png. All of them read fine at 1280.
   - fix: Raise the type-label font in those drawings (or in the shared tag/object drawing helper) so that it is at least 12px at a 326px drawing width, or use `.picscroll` for P17 and P28.
6. **[low] [content] panel notebook: Lab (eof.py)** (content-py-1-3): The terminal shows 'python3 eof.py' ending in EOFError, but that came from capture.py piping empty stdin. A reader typing the shown command would see the program wait, not crash. The prose says 'given empty input', but the shown command doesn't.
   - evidence: capture.py run_step uses input=stdin_text or "" (empty pipe). The eof.py capture has no .stdin and shows "Name? " then EOFError.
   - fix: Run it via a .cmd as `python3 eof.py < /dev/null` so the shown command really produces the output, or add "(run with no input piped in)" next to the terminal.
7. **[low] [content] panel notebook: Under the hood (dis)** (content-py-1-3): 'The last two instructions differ between versions: 3.13 prints RETURN_CONST there' is slightly off. 3.13 has a single RETURN_CONST where 3.15 has two instructions (LOAD_COMMON_CONSTANT, RETURN_VALUE).
   - evidence: swap_dis.py primary ends with LOAD_COMMON_CONSTANT 7 (None) / RETURN_VALUE; alt (3.13.18) ends with RETURN_CONST 0 (None).
   - fix: Write "3.13 does the same job with one instruction, RETURN_CONST".

## Engine-refresh clean-ups for this chapter
- `py-ch2.css:76` `.gallery .term`
