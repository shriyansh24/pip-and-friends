# Fix bundle: python/ch4.html

6 review findings, 0 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 34** (content-py-4-6): Pip's bubble says line 5 of chain.py shows that <= includes the edge 15, but line 5 is `print(0 < x < 10)` (prints False); the <= edge demo is line 6.
   - evidence: Bubble: "Line 5 shows <code>&lt;=</code> includes the edges: 15 counts." data/py-ch4.json chain.py: line 5 `print(0 < x < 10)` -> False; line 6 `print(1 <= x <= 15)` -> True.
   - fix: Change "Line 5 shows" to "Line 6 shows" (optionally add "Line 5: 15 is outside 0 to 10, so False.").
2. **[medium] [visual] panel 15 (also exercises ex-x7 and ex-b5) @390** (visual-py-1-5): In the chapter that teaches 'indentation decides the block', wrapped code lines on phones restart at the left edge. The walker's `print("Hot!` / `Water!")` and the parsons line `print("Brr, it's` / `cold.")` look less indented than the lines around them, which contradicts the lesson.
   - evidence: Crops: c4/390-028-P15.png (lines 4 and 6 wrap and their second halves sit under the line number), c4/390o-009-EX-ex-x7-parsons.png, c4/390o-027-EX-ex-b5-parsons.png. The same wrapping appears in the parsons and fill comparison tables, which even split words: 'print("Free / zing! Ice' (ex-b4). Engine rule: comic-widgets.css:198 'Exercise lines and tracer code wrap on phones ... (indentation is kept)'. Only the first visual line keeps its indent.
   - fix: Engine: give wrapped code lines in walker, parsons, spot and comparison cells a hanging indent equal to their leading spaces plus 2ch, for example by wrapping each line's leading whitespace in an inline-block and putting the rest in a span with `padding-left:2ch; text-indent:-2ch`. Also add `word-break: normal; overflow-wrap: anywhere` only as a last resort, so words like 'Freezing' don't split.
3. **[medium] [content] panel notebook: Words from this chapter** (content-py-4-6): The truthy/falsy definition promises empty collections are 'coming in Chapter 7', but ch7 never teaches that an empty list (or any collection) is falsy, and no other Python chapter uses the word falsy.
   - evidence: ch4: "Falsy: 0, 0.0, "", None, False (and empty collections, coming in Chapter 7)." grep -i falsy python/ch*.html matches only ch4.html; ch7 mentions [] only as 'an empty list' (len 0, pop from empty list), never in a condition; no bool([]) anywhere in the book (only ch24 'The empty list is the solid doll: 0 items').
   - fix: Either drop the chapter promise ("and empty collections such as an empty list") or add one sentence plus a bool([]) line to ch7's empty-list panel and keep the reference.
4. **[low] [content] panel 15** (content-py-4-6): 'indented', 'block' and 'indenting' are used in panel 15, exercise x6 and parsons x7 before panel 19 defines them.
   - evidence: walk-weather step 4: "the indented line under the if"; x6 explain: "walks past the whole indented block"; panel 19 is the first definition: "Pushing lines right is called indenting. The indented lines after a colon form a block."
   - fix: Define it in panel 14's bubble ("Pushing a line right is called indenting") or say "pushed-right line" until panel 19.
5. **[low] [visual] panel 37 @390** (visual-py-1-5): On phones the 'BOSS!' burst overlaps the last letter of the centred 'BOSS LEVEL' title.
   - evidence: Automated scan: the sfx overlaps `p.boss-title` by 2944 px² at 390. Zoomed crop shows the burst covering the final 'L': c4/390-066-P37.png (top). At 1280 they don't touch.
   - fix: At phone width in py-ch4.css, left-align `.boss-title` (as ch1 P38 does) or shrink the burst (`.sfx.tr { width: 90px }`).
6. **[low] [content] panel notebook: In real programs** (content-py-4-6): Version fact stated without a capture or source: "Python 3.10 and newer also have a match statement".
   - evidence: The Tutorial's controlflow page (fetched) has §4.7 match Statements but doesn't name the version; the page cites no PEP 634/636 or What's New 3.10.
   - fix: Add a link to PEP 636 or What's New in Python 3.10 beside the sentence.
