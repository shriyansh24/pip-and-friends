# Fix bundle: python/ch25.html

10 review findings, 7 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel exercise e25 (after Panel 48), program pred_nfc.py** (content-py-25-27): The predict exercise hinges on a combining diaeresis that can't be seen in the code shown. Its hint and explanation quote an escape, "Zoe\u0308", that doesn't appear in the program.
   - evidence: pred_nfc.py line 3 is word = "Zoë" with a literal U+0308 (e + combining mark) and line 7 compares it with a precomposed "Zoë". Both render identically. Captured stdout: 4 / 3 / False True. The explanation says: "\"Zoe\u0308\" is Z, o, e and the combining dots", and the hint says "\u0308 is a combining diaeresis". A reader who sees two identical words predicts 3 and True. This matches the INTEGRATION_TODO 'Tooling hazard' note (escapes written as literal characters).
   - fix: Write line 3 as word = "Zoe\u0308" (check it with grep -n '\\u' after saving), then recapture. The hint and explanation will then match the code.
2. **[medium] [content] panel 32 and notebook 'In real programs'** (content-py-25-27): Two forward references to Chapter 27 promise topics that Chapter 27 doesn't cover.
   - evidence: Panel 32: "use a real parser (json, csv, html.parser, Chapter 27)". The notebook says: "Libraries decode web pages using the encoding the server announces (Chapter 27)." python/ch27.html never mentions html.parser (0 matches). It teaches XML with xml.etree.ElementTree, and it never discusses a server-announced encoding or charset (its only 'charset' is the page's meta tag).
   - fix: Change Panel 32 to "(json, csv, xml.etree, Chapter 27; html.parser for web pages)" and drop the '(Chapter 27)' from the encoding sentence. Or add one sentence to ch27 Panel 42 about response.headers.get_content_charset().
3. **[medium] [visual] panel 33 @1280 and 390** (visual-py-21-25): The Morse 'CODEBOOK' card uses the class 'book', which is the engine's bookshelf-link card: it inherits min-height 230px, a 5-row grid, a 6px shadow, a hover lift and an :active press, so a static picture is far taller than its neighbours (empty band above '(the encoding)') and moves like a button when hovered or tapped.
   - evidence: ch25.html:614 <div class="book">; comic-widgets.css:149–158 (.book, .book:hover, .book:active); crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a25/w1280-056-p33.png.
   - fix: Before: <div class="book"> and .ch25-morse .book {…} → After: <div class="ch25-codebook"> and .ch25-morse .ch25-codebook {…} (why: never reuse a control's class on static content; it fakes an affordance and drags in its layout).
4. **[medium] [content] panel 47, 48, 50 and exercise e26 (nfc_nfd.py, char_names.py, casefold_norm.py, fill_same.py)** (content-py-25-27): The decomposed strings are typed as literal combining characters, so the code shows two identical-looking literals. Readers can't retype them, and in Panel 50 and e26 they can't see why NFC is needed at all.
   - evidence: nfc_nfd.py lines 3-4: nfc = "é" and nfd = "é" (the second is e+U+0301). char_names.py line 3: "é" + "é". casefold_norm.py line 10: same_text("Café", "CAFÉ") (E+U+0301). fill_same.py line 6: tidy("AMÉLIE") (E+U+0301). Seen as precomposed, "Café".casefold() == "CAFÉ".casefold() is True without normalize, so the panel's point, 'Normalize, then fold', doesn't show in the code.
   - fix: Spell each decomposed form with an escape ("e\u0301", "CAFE\u0301", "AME\u0301LIE") and recapture. A short # comment, for example # e + combining accent, would also help.
5. **[medium] [visual] panel 6, 35 @1280 and 390** (visual-py-21-25): The stencil walker grows by 176px (1280) / 207px (390) from first to last step and the codebook stepper by 42–65px, so the Next button moves down while you press it.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/steps25.jsonl: stencil 1083→1259 (1280), 1266→1473 (390); codebook 1186→1228, 1696→1761. py-ch25.css:66 '.ch25-walk .screen pre { min-height: 5em }' while the run prints 9 lines.
   - fix: Before: .ch25-walk .screen pre { min-height: 5em } → After: min-height set from the final output's line count at mount (and a min-height on .narration) (why: controls must stay put across steps, as the engine tracers now do).
6. **[low] [content] panel 15** (content-py-25-27): The explanation of \d{2,4} names the wrong leftover digit.
   - evidence: Page: "\d{2,4} on 98765 grabs the maximum, 9876, and 7 is too short anywhere." The text is "7 42 123 98765" and the output is ['42', '123', '9876']. The digit left over from 98765 is 5, and the lone 7 is a separate token at the start, which the previous bullet never mentioned.
   - fix: "…grabs the maximum, 9876; the leftover 5, like the lone 7 at the start, is too short."
7. **[low] [visual] panel 26, 49 @390** (visual-py-21-25): Small layout slips: in p26 the 're.prefixmatch' strip wraps so the 's' of '4471 orders' sits alone on a second row; in p49 the skin-tone modifier carriage (U+1F3FD) shows a tofu box when the device font lacks it, with no words saying what it is.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/sheet25b.png (p26 left, p49 right).
   - fix: Before: .ch25-where .strip-row { flex-wrap: wrap } → After: flex-wrap: nowrap inside overflow-x:auto; add a small caption 'skin-tone swatch' under modifier carriages from unicodedata.name (why: no orphaned cell; meaning never depends on a glyph the font may lack).
8. **[low] [visual] panel 30 and every .ch25-stack terminal @1280** (visual-py-21-25): Above 640px the chapter wraps every stacked terminal with 'pre-wrap; overflow-wrap: anywhere', so long library paths wrap back to column 0 ('gnu/lib/python3.15/re/__init__.py", line 291 …' starts flush left, at the level of 'Traceback') and the frame structure blurs; a source line that wraps would also detach its carets.
   - evidence: py-ch25.css:27 '@media (min-width: 641px) { .ch25-stack .term { white-space: pre-wrap; overflow-wrap: anywhere; } }'; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a25/w1280-051-p30.png.
   - fix: Before: @media (min-width: 641px) { .ch25-stack .term { white-space: pre-wrap; overflow-wrap: anywhere; } } → After: delete it and use class="term wrap" on the long tracebacks (why: engine wrap gives a hanging indent and caret protection at every width).
9. **[low] [book] panel 32** (book-py): Chapter 25 lists html.parser under Chapter 27, which covers CSV, JSON and XML but not html.parser.
   - evidence: 'use a real parser (json, csv, html.parser, Chapter 27)'. grep -c 'html.parser\|HTMLParser' ch27.html = 0.
   - fix: Change to 'use a real parser (json and csv from Chapter 12, xml.etree from Chapter 27, or html.parser)'.
10. **[low] [content] panel whole chapter** (content-py-25-27): Pacing: 55 panels (above the 30-50 target) with 33 exercises, covering two big topics (regex, then bytes and Unicode), as INTEGRATION_TODO flagged.
   - evidence: Cover: "About 100 minutes, with 33 hands-on checks." There are 7 parts. Panels 26-27 (prefixmatch, then the old name match) and 14-15 (the quantifier chart, then braces) cover closely related ground.
   - fix: Optional: merge Panel 27 into Panel 26 (the 3.13 alt terminal already shows the old world), and merge Panel 15 into Panel 14, to get closer to 50.

## INTEGRATION_TODO lines naming this chapter
- ## From python ch25 / js ch16
- py-ch25 is 55 panels (over the 50 guide); a reviewer should check pacing.
- Engine: build.py now escapes U+FFFD in shipped copies (� in JS/JSON, &#xFFFD; in HTML) because the artifact host rejects the raw character; py ch25 needs it. Its dist/local copy was re-checked and passes. build.py's ref check now ignores escaped code (&lt;script src=...&gt;), which js ch15 needed.
- NAME CLASH: js-ch22 `stencil` vs py-ch25 `stencil` (regex stencils in both). Unify or rename.
- INVISIBLE CHARACTERS: py ch25 pred_nfc.py, nfc_nfd.py, char_names.py, casefold_norm.py and fill_same.py hold literal combining characters, so the code can't show why NFC matters. Rewrite them with `́` / `̈` escapes and recapture. Script-scan all books' shown programs for combining marks or zero-width characters that aren't escaped.
- "N CAPTURES DIFFER" COUNTS: several footers and version notes give a count that's off by one against meta.versionDifferences (js ch8, js ch11, py ch25, rust ch17 …). Generate these counts at build time from the data (build.py token), or script-check them.
- CHAPTER TERMINAL OVERRIDES: several chapter stylesheets force `pre-wrap; overflow-wrap:anywhere` on every terminal (py-ch23.css:73, py-ch25.css:27, py-ch27, …), which breaks carets. Fix agents: delete them and use `class="term wrap"` where a terminal's key line is off-screen at 390. Script lead for the fix round: grep assets/ext for `.term` rules with `overflow-wrap: anywhere`.

## Engine-refresh clean-ups for this chapter
- `py-ch25.js:147`
- `py-ch25.js:214`
