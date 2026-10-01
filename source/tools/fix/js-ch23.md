# Fix bundle: javascript/ch23.html

7 review findings, 0 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel notebook: Lab, step 3 (macOS and Linux bullet)** (content-js-22-24): The lab says a Linux locale has to be installed for LC_ALL to work, and that Node otherwise falls back to en-US. That is false, and the chapter's own capture disproves it: the capture machine has only C, C.utf8, POSIX and en_US.utf8 installed, yet panel 25's LC_ALL=de_DE.UTF-8 and LC_ALL=hi_IN.UTF-8 runs printed de-DE and hi-IN. Node's ICU reads the LC_ALL variable directly.
   - evidence: Page: "On Linux the locale must be installed ( locale -a lists them); if it isn't, Node falls back to en-US ." `locale -a` on the capture machine: C, C.utf8, POSIX, en_US.utf8. data/js-ch23.json locale_default.js steps 2 and 3 print `1.234.567,891` / `de-DE` and `12,34,567.891` / `hi-IN`. Scratch runs with Node 26.13.0: LC_ALL=fr_CA.UTF-8 gives fr-CA, and LC_ALL=zz_QQ.UTF-8 gives zz-QQ (neither locale is installed).
   - fix: Replace the sentence with: "Node reads LC_ALL itself, so this works even for locales your system hasn't installed (this book's de_DE and hi_IN runs were made that way). Other programs on your system, like `date`, may still complain about a missing locale."
2. **[low] [content] panel 19 (m-big machine, "1.5" example)** (content-js-22-24): The note says BigInt() reads a string "as BigInt code". It doesn't: BigInt code ends in n, and BigInt("10n") is a SyntaxError. The string must be a plain whole-number literal.
   - evidence: m-big note: "From text, the machine reads the string as BigInt code, and 1.5 isn't valid BigInt syntax". Scratch run, Node 26.13.0: BigInt("10n") throws "Cannot convert 10n to a BigInt".
   - fix: Change to "From text, the machine accepts only whole-number digits (no decimal point, and no n), so \"1.5\" is a SyntaxError."
3. **[low] [visual] panel 21 @390 and 1280** (visual-js-21-25): The small BigInt abacus at the end of Panel 21 shows its plate 'no Math' at 8.6px.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c23-p21.png; audit 8.6px at both widths. bigabacus plate is 17 units in a 190-unit viewBox, drawn ~95px wide.
   - fix: Draw this abacus at the default `.char` width (drop the small size), or raise the plate font in js-ch23.js from 17 to 24 units for labels longer than 4 characters (≥12px).
4. **[low] [content] panel 31** (content-js-22-24): Kit says the date shows as the 6th to everyone west of London. The rule is "clocks behind UTC": Iceland, Portugal and Ireland are west of London and still show the 7th in November. Boss 6 already says it correctly ("west of UTC").
   - evidence: Page: "…will show the 6th to everyone west of London." ex-b6-m: "The date shifts to the 6th for every visitor west of UTC".
   - fix: Change to "…to everyone whose clock is behind UTC (the Americas, for example)."
5. **[low] [content] panel 45 (recap) vs panels 7, 16, 22, 27, 38** (content-js-22-24): Five of the six recap catchphrases never land as catchphrases in the comic. Only THE MARKS SPREAD OUT gets a catch box (panel 6). CLOSE ENOUGH, NOT EXACTLY, THE ABACUS HAS NO DECIMAL POINT, CENTS IN, FORMAT OUT, ONE TAPE, MANY CLOCKS and ONE TOOL PER JOB first appear as headings in the recap. ch22 and ch24 place a catch box at each idea.
   - evidence: `grep class="catch` in ch23.html finds only `catch23">THE MARKS SPREAD OUT`. AUTHORING §5: "give each big idea a short catchphrase… Recap the catchphrases". CAST.md: "A catchphrase should land at the moment it explains".
   - fix: Add a `<p class="catch23">` line to panels 8 (CLOSE ENOUGH, NOT EXACTLY), 16 (THE ABACUS HAS NO DECIMAL POINT), 22 (CENTS IN, FORMAT OUT), 27 (ONE TAPE, MANY CLOCKS) and 38 (ONE TOOL PER JOB).
6. **[low] [content] panel 7** (content-js-22-24): The note says 1000.1 + 1000.2 is as close to 2000.3 as the ruler allows. It isn't: it lands one mark above the mark where 2000.3 is stored, which is why line 7 prints 2000.3000000000002 and not 2000.3.
   - evidence: Page: "The plain test says false , even though the sum is as close as the ruler allows." epsilon.js line 7 prints 2000.3000000000002. The difference is 2.27e-13, one gap (2^-42) near 2000.
   - fix: Change to "…even though the sum is only one mark away."
7. **[low] [content] panel notebook: Common wrong ideas** (content-js-22-24): The notebook states an output that was never captured, which AUTHORING rule 1 forbids for typed output ("may not claim an output"). The value is correct.
   - evidence: Page: "1.005 * 100 is 100.49999999999999, so it gives 1, not 1.01." There is no program in data/js-ch23.json that computes 1.005 * 100. A scratch run on Node 26.13.0 gives 100.49999999999999.
   - fix: Add a line `console.log(1.005 * 100, Math.round(1.005 * 100) / 100);` to tofixed.js (or a new program) and recapture. Or reword to avoid quoting the value: "1.005 * 100 lands just below 100.5, so it rounds to 1.00, not 1.01."

## Engine-refresh clean-ups for this chapter
- `javascript/ch22.html` and `javascript/ch23.html` use `class="term wrap"` without any chapter rule. They now wrap through the engine; check them at 390.
- `tools/check_chapter.js` now opens every `<details>` (notebook pages, text versions, hints) and re-measures. The engine fixed the shared causes (grid notebook pages and list items with long inline code). In the final run, no page fails this check (`tools/review/engine-refresh-check.txt`). With the old engine, py ch10 overflowed by 110px, cpp ch8 by 176px, js ch23 by 214px and rust ch12 by 48px. Watch for new ones: a figure, table or long token placed directly in notebook prose. `.page-body` now breaks long words, but an SVG or a `white-space: pre` block outside a scroller will still widen the page.
- New engine component: code in cells never breaks inside a name, and rows stack into labelled cards at ≤560px (`data-h` from the header, written by comic.js). These chapter table rules use `overflow-wrap: anywhere` on code (`queueMicrotask` → `queueMicrot|ask`). Add `class="ref-table"` to the table (keep the chapter class for colours), delete the `anywhere` rule and any phone stacking copy (js-ch23's `.mini` is one). Rebuild the list with `grep -n 'overflow-wrap: *anywhere' assets/ext/*.css` and keep rules whose selector names `td`, `th`, `tr` or `table`; tables styled through other class names (`.mini code`, `.ops code`) need the same change:
- `js-ch23.css:64` `table.xr-read code`
- `js-ch23.css:100` `table.xr-read td`
