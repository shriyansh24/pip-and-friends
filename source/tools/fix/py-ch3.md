# Fix bundle: python/ch3.html

12 review findings, 1 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 1** (content-py-1-3): Panel 1 says the "2" + "2" program is 'the puzzle at the end of Chapter 1', but python/ch1.html contains no such puzzle. Chapter 1 ends with a name-tag teaser (panel 40). The puzzle existed only in the pilot's 'Check yourself' quiz, which was replaced.
   - evidence: ch3 panel 1: "Remember the puzzle at the end of Chapter 1?"; grep for '"2"' in python/ch1.html finds nothing; src/python/ch1-pilot.html:295 has the original quiz ("\"2\" + \"2\" joins two pieces of text ... Chapter 3 explains why").
   - fix: Reword so it stands alone, e.g. "Here's a puzzle:". Or add the two_plus_two predict back into ch1 Part 4 or the boss level, so the promise is kept.
2. **[medium] [visual] panel 29, 31, 37 (and cover, 23, 32, 5) @1280 and 390** (visual-py-1-5): The train creature's carriage index numbers are drawn at 7–10px, even on desktop, so 0 1 2 3 4 under the carriages are hard to read in the chapter that introduces the str train.
   - evidence: Automated scan (effective SVG text size, same at both widths): P29 7.6px (16 labels), P31 7.6px, P37 7.6px, cover 7.1px, P32 8.7px, P23 9.1px, P5 10.4px. Zoomed crop of P29 at 1280: c3/1280-049-P29.png (the 'ice' + 'cream' trains). The 'icecream' result train also shows no readable indexes. Related open item: INTEGRATION_TODO '[ch3] Train viewBox sized to text length'.
   - fix: Draw these trains larger (for example `.char.wide` at 300px+ in P29, P31 and P37, or one train per row), or make the engine draw index labels at a minimum effective 12px by scaling the font inversely to the SVG's width.
3. **[medium] [content] panel 31** (content-py-1-3): Panel 31's caption, 'Now the Chapter 1 puzzle makes sense', points back to the same puzzle that Chapter 1 doesn't contain.
   - evidence: ch3 panel 31 caption: "Now the Chapter 1 puzzle makes sense."
   - fix: Change it to "Now panel 1's puzzle makes sense." (or fix it the same way as panel 1).
4. **[medium] [visual] panel 41, 43 @390** (visual-py-1-5): On phones, the code and terminal blocks in the lamp and ghost panels run 12px past both sides of the panel, so their left borders disappear and the file tabs are cut to 'ools.py' / 'host.py'.
   - evidence: Automated scan: `pre.code` and `pre.term` stick out 12px on the left and 12px on the right of the section, and the section is clipped by 15px. Crops: c3/390-068-P41.png, c3/390-071-P43.png. Cause: py-ch3.css:125 sets `.creature { grid-template-columns: minmax(0,1fr); justify-items: center }` at phone width, so the unnamed `<div>` holding the file tab, code and terminal is centred at its max-content width, which is wider than the panel. This is the 'ch3 P41/P43 clipping' item listed under [QA] in INTEGRATION_TODO. It is still open.
   - fix: In the phone media block of assets/ext/py-ch3.css, add `.creature > div { justify-self: stretch; min-width: 0; }`, or give those two divs a class and stretch that class.
5. **[medium] [content] panel topbar** (content-py-1-3): Same stale 10-chapter nav and 'PIP & PYTHON' series label as ch1.
   - evidence: ch3.html lines 22-27.
   - fix: Use the §7 top bar: Contents, ← Ch 2, "Ch 3 of 27", Ch 4 →.
6. **[low] [content] panel 19** (content-py-1-3): Pip says print got '1, then 000, then 000', but the terminal shows '1 0 0'. The page doesn't say that 000 is just 0, so the screen seems to contradict the bubble.
   - evidence: commas.py stdout: "1 0 0". Bubble: "print got three numbers: 1, then 000, then 000."
   - fix: Add "...and 000 is just the number 0, so you see 1 0 0."
7. **[low] [content] panel boss b3** (content-py-1-3): The boss spot exercise shows the new error wording 'can't multiply sequence by non-int of type 'float'', but its explanation doesn't decode it. 'sequence' is never defined.
   - evidence: boss_spot.py stderr last line: TypeError: can't multiply sequence by non-int of type 'float'. The b3 explain only says "when jelly meets a train".
   - fix: Add to the explain: "A 'sequence' here is the train: Python can copy a train only a whole number of times, never 2.5 times."
8. **[low] [book] panel ch-nav** (book-py): Chapter 3's ch-nav labels don't match the chapter titles' capitals.
   - evidence: '← Ch 2 · Name tags' (title 'Name Tags'); 'Ch 4 · Forks in the road →' (title 'Forks in the Road').
   - fix: Use 'Name Tags' and 'Forks in the Road'.
9. **[low] [book] panel end of main** (book-py): Six chapters end without the 'NEXT: CHAPTER N · TITLE' strip that ch2, ch7, ch9, ch11 and ch13-26 use; their teasers live only in a bubble.
   - evidence: ch3 ends 'That's Chapter 4: forks in the road!' (bubble); ch12 ends with Pip's 'Next chapter: …Chapter 13 opens the whole toolbox shelf' (bubble) and no .next-chapter strip.
   - fix: Add a <p class="next-chapter">NEXT: CHAPTER N · TITLE<br><small>…</small></p> before the ch-nav of each.
10. **[low] [visual] panel notebook: 'Sharing below zero: // and % with negative numbers' @390** (visual-py-1-5): The number-line figure in this notebook page shrinks to about 9px on phones, including the labels that carry the lesson ('// floors: left', 'int() chops: toward 0', '-17 / 5').
   - evidence: Automated scan at 390: tick labels 9.7px, the three captions 8.7px (source font-size 18 in a wide viewBox, python/ch3.html:960-964). Crop: c3/390o-035-Sharing-below-zero-and-with-ne.png.
   - fix: Wrap the SVG as `<div class="picscroll"><svg class="fig pic-wide" …>` (engine helper, keeps 560px and scrolls), or move the three captions out of the SVG into HTML text under it.
11. **[low] [content] panel notebook: Lab (version notes)** (content-py-1-3): The claim that the message 'division by zero' applies 'on 3.14 and newer' is backed by no capture (only 3.15.2 and 3.13.18 ran) and by no source I could find. The 3.14 What's New page doesn't mention it. The 3.13-and-older wording is right: I checked it on 3.12.3 and 3.13.18, including 'integer modulo by zero' for %.
   - evidence: "division by zero with // or % says division by zero on 3.14 and newer". docs.python.org/3/whatsnew/3.14.html has no ZeroDivisionError entry. My own runs: 3.12/3.13 print 1//0 -> 'integer division or modulo by zero' and 1%0 -> 'integer modulo by zero'; 3.15.2 prints 'division by zero' for both.
   - fix: Say "on 3.15 (the version shown)" instead of "3.14 and newer", or cite the CPython changelog entry that made the change.
12. **[low] [content] panel notebook: Under the hood** (content-py-1-3): 'There is one safety limit since Python 3.11' isn't backed by a source on the page. The limit was also added to the 3.7–3.10 security releases, and it applies to str→int conversion as well. The capture only shows that the limit exists on 3.13 and 3.15.
   - evidence: "There is one safety limit since Python 3.11: turning an int with more than 4300 digits into text ... is refused". int_limit.py capture backs the 4300-digit ValueError. I couldn't reach the version note in the stdtypes page.
   - fix: Write "in Python 3.11 and newer (and recent security releases of older versions)", and link docs.python.org/3/library/stdtypes.html#int-max-str-digits.

## INTEGRATION_TODO lines naming this chapter
- [ch3] Train viewBox sized to text length (same as ch7 crate request); remove .train-fit workaround in ext/py-ch3.js after.

## Engine-refresh clean-ups for this chapter
- **python ch3** still carries the `.train-fit` workaround (py-ch3.js/css, engine review finding 22). The train's frame is now 130 units tall with larger index numbers. Re-check ch3 at both widths after deleting the workaround.
- python/ch3.html: @390: P41 +15px, P43 +15px
- `py-ch3.js:53`
- Chapter transcript styles (`cpp-ch2.css` `.report .transcript code`, `py-ch3.css` `.panel > details .transcript`, `py-ch11.css` `[data-splitter] .transcript code`): check each text version at 390 now that rows stack as cards; delete what the cards make unnecessary.
