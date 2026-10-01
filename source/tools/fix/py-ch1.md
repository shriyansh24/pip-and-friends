# Fix bundle: python/ch1.html

12 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [visual] panel 19, 33, 36 @1280 and 390** (visual-py-1-5): All three checklists in chapter 1 are broken: every item's text is squeezed into a 40px column, so it shows one word (or part of a word) per line, and the number badge sits on top of the first word.
   - evidence: Measured in the browser: every `.checklist li > span` is 40px wide at both widths. The lists are 1871px (P19), 1208px (P33) and 2044px (P36) tall. At 390, P19 reads 'Explain. / Say / who / wrote ...' and P19 item 3 breaks `print("#1 fan of Python")` into 'pri / nt(" / #1 / fan ...'. Cause: assets/ext/py-ch1.css:63-66 still has the old grid checklist (`.checklist li { display:grid; grid-template-columns: 40px minmax(0,1fr) }`). That grid fights the engine rule (comic-widgets.css:229-230), which places the badge absolutely, so the text span lands in the 40px track. Crops: scratchpad/review-visual-py-1-5/c1/1280-034-P19.png, c1/390-034-P19.png, c1/1280-058-P33.png, c1/1280-063-P36.png (deleted after the review; rerun the checker with --shots to see them again).
   - fix: Delete the four `.checklist` rules at assets/ext/py-ch1.css:62-66 so the engine's checklist styles apply. The page markup (`<li><span>…</span></li>`) already works with the engine version.
2. **[medium] [visual] panel 10 @390** (visual-py-1-5): In the anatomy line of the reader's very first program, the closing parenthesis of `print("Hello, world!")` is cut off at phone width (the line scrolls sideways by 12px), so it looks as if the bracket is missing.
   - evidence: Automated scan: `p.anat-line` has scrollWidth − clientWidth = 12px at 390. In crop c1/390-019-P10.png the big line ends in a half-cut ')'.
   - fix: Shrink the anatomy line font on phones in py-ch1.css (for example `@media (max-width:640px){ .anat-line { font-size: 1.5rem } }`), or let its tokens wrap.
3. **[medium] [visual] panel 17 @390** (visual-py-1-5): The walker wraps line 4 as `print("Love,", end="` / `")`, so the space inside `end=" "` (the point of the panel) can't be seen, and the continuation line starts flush left with no indent.
   - evidence: Crop c1/390-031-P17.png, code card at step 1: line 3 also wraps into three pieces (`print("I",` / `"learned", "print",` / `"today.")`).
   - fix: In the walker code list on phones, use a hanging indent for wrapped lines (`padding-left: 2ch; text-indent: -2ch`), don't break inside string literals, or let this one card scroll sideways instead of wrapping.
4. **[medium] [book] panel topbar** (book-py): Chapters 1-10 still carry the old 10-chapter top bar (branded 'PIP & PYTHON'), with no link to the book contents or to chapters 11-27, unlike every later chapter.
   - evidence: ch1-ch10 topbar: links '1 · Recipe' … '10 · Project' only, series 'PIP & PYTHON <small>a comic course</small>'. ch11-ch27 topbar: 'PIP & FRIENDS <small>Python book</small>', 'Contents', '← Ch N-1', 'Ch N of 27', 'Ch N+1 →' (AUTHORING §7 skeleton). ch1's ch-nav previous link is '← Bookshelf' (../index.html) rather than the book contents.
   - fix: Replace the ch1-ch10 header with the §7 top bar (Contents · ← Ch N-1 · Ch N of 27 · Ch N+1 →; no previous link on ch1), series 'PIP & FRIENDS / Python book'. Optionally point ch1's ch-nav previous link at index.html ('← Contents').
5. **[medium] [content] panel topbar / ch-nav** (content-py-1-3): The top bar is the old 10-chapter Python nav (1 · Recipe ... 10 · Project) under 'PIP & PYTHON / a comic course'. A reader would think the book has 10 chapters, but it has 27, and chapters 11+ use 'PIP & FRIENDS / Python book' with Contents, prev/next and 'Ch N of 27' (AUTHORING §7). The bottom nav says '← Bookshelf', not Contents.
   - evidence: ch1.html lines 22-27 vs ch11.html lines 23-25 ("<a href=\"index.html\">Contents</a>...<span aria-current=\"page\">Ch 11 of 27</span>"); python/index.html exists.
   - fix: Replace the header with the §7 skeleton: PIP & FRIENDS, Python book, Contents link, "Ch 1 of 27", Ch 2 →. Update the meta description "Chapter 1 of Pip & Python" to match.
6. **[low] [content] panel 13** (content-py-1-3): 'function' is used on the main path before it is defined. Panel 13 says 'hand to a function', but 'function' is only defined in the notebook ('print is a function') and the word list.
   - evidence: Panel 13: "Each thing you hand to a function inside its brackets is called an argument." Panel 10's anatomy only says print is "A word Pip already knows".
   - fix: Add one clause to panel 10 or 13, e.g. "<code>print</code> is a <b>function</b>: a named job you start with brackets."
7. **[low] [visual] panel 38 @1280 and 390** (visual-py-1-5): The 'BOSS LEVEL' title starts right under the panel-number badge, so the 'B' touches the badge's corner.
   - evidence: Crop c1/1280-067-P38.png (top-left). The same layout in ch4 P37 at 1280 centres the title and has no contact.
   - fix: Give `.boss-h` in this panel a top margin of about 18px, or a left padding of about 40px, so it clears `.panel-no`.
8. **[low] [content] panel 6, 14** (content-py-1-3): The Proofreader is named in panel 6 ('The Proofreader knows every rule') and panel 14, but introduces himself only in panel 25 ('I'm the Proofreader').
   - evidence: Panel 6 duo-card text; panel 14 machine note "The Proofreader jams the machine"; panel 25 bubble "I'm the Proofreader".
   - fix: In panel 6, add "(you'll meet the Proofreader in Part 5)", or say "Python's rule checker" there.
9. **[low] [content] panel 7** (content-py-1-3): The >>> session ran with PYTHON_BASIC_REPL=1 through a launcher program, but the terminal shows only 'python3 -q'. On 3.13+ a reader typing python3 -q gets the coloured new REPL, which looks different. The setup is disclosed only in the footer, not at the panel.
   - evidence: ext/py-ch1.js:52 renders "python3 -q". repl_demo.py runs os.execve(... PYTHON_BASIC_REPL="1"). Footer paragraph 2 explains this. The 3.13 What's New confirms 'Prompts and tracebacks with color enabled by default'.
   - fix: Add a one-line caption under panel 7: "Recorded with the plain prompt (PYTHON_BASIC_REPL=1); yours may be coloured."
10. **[low] [content] panel ex-indent (after 31)** (content-py-1-3): The prompt gives the answer away: 'Line 2 starts with one extra space. Which error does Python report?' comes right after panels 30-31 named exactly that case 'unexpected indent'.
   - evidence: ex-indent-m prompt.
   - fix: Drop the first sentence (let the reader spot the space in the code), or ask about the visible effect instead: "What appears on the screen before the error?"
11. **[low] [book] panel meta description** (book-py): Series naming drifts: 26 chapters describe themselves as 'Pip & Python, a comic course', ch11 as 'the Python book in Pip & Friends', and ch1-10 headers say 'PIP & PYTHON' while ch11-27 say 'PIP & FRIENDS'.
   - evidence: ch2 meta: 'Chapter 2 of Pip & Python, a comic course: …'; ch11 meta: 'Chapter 11 of the Python book in Pip & Friends, a comic course: …'; contents page and ch11-27 topbar 'PIP & FRIENDS · Python book'.
   - fix: Use 'Chapter N of the Pip & Friends Python book, a comic course: …' everywhere (keep 'comic course: ' so gen_index.py still strips it).
12. **[low] [content] panel notebook: Words from this chapter** (content-py-1-3): 'statement' is defined in the word list but never used anywhere in the chapter.
   - evidence: grep 'statement' python/ch1.html finds only the <dt>statement</dt> entry.
   - fix: Drop the entry, or use the word once in panel 3 or 12.

## INTEGRATION_TODO lines naming this chapter
- PY ch1–3 still use the old topbar ("PIP & PYTHON / a comic course", chapters 1–10). Move them to the §7 nav ("Ch N of 27", Contents link).
- DONE 2026-11-08 11:10 (main session): removed the old-engine checklist grid copies (`.checklist`, `.checklist li` with a 40px grid, `.checklist li::before`) from 17 chapter stylesheets (cpp-ch2; go-ch1/2/3/5/6; js-ch1/2/4/5; py-ch1; rs-ch1–6). They fought the refreshed engine's absolute badge, so the text was squeezed into 40px. Verified on rust/ch1 at 390 (items 314px wide). Backups in scratchpad/checklist-bak/.

## Engine-refresh clean-ups for this chapter
- `assets/ext/py-ch1.js` and `assets/ext/go-ch1.js`: their `L.highlight` replacements are no longer needed (engine review finding 25). Their `rehighlight()` re-renders code after the engine has drawn it, which can drop the new `.lead`/`.rest` hanging-indent markup on those lines. Delete both, then re-check `python/ch1.html` and `go/ch1.html` at 390.
- **py ch1, panel 10 anatomy line.** It now wraps between parts. Check whether py-ch1.css still needs a phone font size.
- `py-ch1.js:87`
