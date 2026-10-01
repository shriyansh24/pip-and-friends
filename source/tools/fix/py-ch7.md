# Fix bundle: python/ch7.html

6 review findings, 2 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 17 (list methods cheat card) @390** (visual-py-6-10): On phones the cheat card's third column ('Hands back', which holds the None-vs-item contrast the bubble talks about) is cut off at the panel edge. It can only be reached by an unmarked sideways scroll.
   - evidence: div.ch7-tablewrap scrolls at 390. The first two columns take the full width and 'Han / back', 'Non', 'the it rem' are cut: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a7/w390-027-p17.png
   - fix: At <=640px, lay out each row as a stacked card (Write / What it does / Hands back), or drop the 'What it does' column into a second line under the code, so all three facts show without scrolling.
2. **[medium] [content] panel after 39 (b3)** (content-py-7-9): The boss parsons has interchangeable lines: the names = ... line may correctly go above the def, giving identical output, but the engine accepts only the source order.
   - evidence: boss_parsons.py: "def first_last(items):" / "    return items[0], items[-1]" / "names = \"Ada Grace Linus\".split()" / "first, last = first_last(names)" / "print(first, \"...\", last)". comic-widgets.js parsons check(): ok = mine === real (exact line order). AUTHORING §4 says to avoid interchangeable lines.
   - fix: Pin the def lines ("pin": [1, 2]) or make names depend on the function, e.g. move the split inside the call: first, last = first_last("Ada Grace Linus".split()).
3. **[medium] [content] panel after 39 (b6)** (content-py-7-9): The boss predict asks the reader to type the error's name, AttributeError, which no chapter before it introduces (chapters 1-6 never mention it, and ch8 Panel 36 later claims it is first met in ch8).
   - evidence: b6m: {"program": "boss_error.py", "expect": "error"}; capture: "AttributeError: 'tuple' object has no attribute 'append'. Did you mean to use a 'list' object?". grep: no 'AttributeError' in python/ch1-ch6.html; ch7 itself names it nowhere before b6.
   - fix: Turn b6 into a choice ("Which error stops it?" with AttributeError explained in the why), or add one sentence plus the real run in Part 6 (Panel 33/34) that names AttributeError ("that kind of thing has no such method") before the boss level.
4. **[low] [visual] panel 16 (tracer) @390** (visual-py-6-10): Tracer line 1 'shopping = ["egg", "nut"]' pushes the '◀ next' marker onto its own row on phones. The tracer's object labels ('list · L1') are 10px.
   - evidence: Audit: p16 tracer SVG text 10.0px at 390, wrapped tr-code line: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a7/w390-026-p16.png
   - fix: Engine tracer: let the next marker sit in the gutter (absolute) rather than inline, and keep the type label at 12px or more in the phone layout.
5. **[low] [content] panel 22, 37** (content-py-7-9): Calls string comparison "dictionary order", while the chapter's own notebook says Python sorts by character code with every capital before every lowercase letter, which is not dictionary order.
   - evidence: Panel 22: "max() of strings is the one that comes last in dictionary order." Machine m-minmax: "Strings work too: dictionary order." Notebook: "Python sorts strings by character code, and every capital letter comes before every lowercase letter" (sort_key.py: ['Fig', 'apple', 'banana', 'pear']).
   - fix: Say "alphabetical order (for lowercase words; capitals come first, see the notebook)".
6. **[low] [content] panel after 39 (b5)** (content-py-7-9): The reverse-the-string fill uses a palindrome, so the shown goal output (level / True) is the same whether the reader writes [::-1], [:] or [::1]; and the equivalent [-1::-1] is not accepted.
   - evidence: boss_fill.py: word = "level"; backwards = word[::-1] -> stdout "level\nTrue"; b5m blanks: [{"line": 2, "text": "[::-1]"}] with no accept list.
   - fix: Print a non-palindrome too (e.g. add print("pip!"[::-1]) style line using the same slice, or use word = "stressed" -> desserts), and add "accept": ["[::-1]", "[-1::-1]"].

## INTEGRATION_TODO lines naming this chapter
- [ch7] Phones: code 14px at <=640px; give captions room beside sfx bursts. Move from ext/py-ch7.css into engine.
- PARSONS ORDER: the engine accepts only the exact source order, so lines that could go in either order get marked wrong (py ch7 b3, ch8 boss3). Fix in engine: optional `data-pin` / equivalence groups, or pin those lines in the chapters. Check every parsons exercise in all books.

## Engine-refresh clean-ups for this chapter
- `py-ch7.js:231`
