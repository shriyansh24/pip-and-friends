# Fix bundle: python/ch20.html

15 review findings, 3 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [visual] panel 5 (walker through loud.py) @390** (visual-py-16-20): On phones the walker wraps the 17-line loud.py into about 45 rows and breaks inside names and strings: `__contain` / `s__ runs`, `__getitem` / `__ runs`, `return x ==` / `7`. A beginner can't tell the real code from the wrapping. Engine-wide cause reported under visual-engine; this is the worst case in my scope.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-008-p5.png (panel about 3,300px tall at 390).
   - fix: Until the engine fix lands, add a chapter rule for this walker at ≤640px: `.walk .recipe { tab-size: 2; font-size: 0.8125rem }` and shorten the print strings in loud.py (e.g. `print("len runs")`), then recapture. Why: wrapped code must break between words, never inside an identifier.
2. **[medium] [content] panel 24 (e13m, parsons)** (content-py-19-21): The parsons key is ambiguous. Putting `__call__` (with its return) before `__init__` (with its body) gives the same output, but it's marked wrong.
   - evidence: parsons_call.py lines 2-5 are two independent method pairs. A scratch run with __call__ first prints "Hi, Ada!", the same as the goal. Prompt: "Rebuild a callable greeter that prints the goal output." The grading is exact order (comic-widgets.js:487).
   - fix: Add to the prompt "As usual, __init__ is the first method" (as ch19 ex8m does).
3. **[medium] [visual] panel 27 and 37 (stamp → form, tuple + form) @both** (visual-py-16-20): The joining signs between the pictures are Bangers glyphs that render as specks: P37's '+' is a dot, and on phones P27's and P37's signs sit beside the picture they should point at, because `.ch20-row` wraps into a column.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-046-p27.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-062-p37.png. py-ch20.css `.ch20-arrow { font: 400 clamp(1.4rem, 5vw, 2rem)/1 var(--f-title) }`; ch20.html lines 611, 812, 1038.
   - fix: `.ch20-arrow { font: … var(--f-title) }` → `font: 800 1.75rem/1 var(--f-code)`, and at ≤640px `.ch20-row { flex-direction: column } .ch20-arrow { transform: rotate(90deg) }` (not for '+'). Why: the sign is the point of the picture; the title font has no usable '+'.
4. **[medium] [content] panel 32** (content-py-19-21): Broken cross-reference: the Professor calls the 'a default is made once' trap Chapter 6's, but Chapter 6 doesn't teach it. The mutable-default trap is Chapter 17's tip jar (Part 6). Chapter 19 panel 8 correctly calls it 'Chapter 17's tip jar'.
   - evidence: ch20 panel 32: "Why so strict? Chapter 6's trap: a default is made once." python/ch6.html has no mutable-default material (its only 'default' error note is the parameter-order rule). python/ch17.html: "Part 6 · The shared tip jar: default values are made once: the mutable default trap and the None fix", panel 42 "proof that defaults are made once, at def time".
   - fix: Change it to "Chapter 17's tip jar: a default is made once." (Panel 31's 'Chapter 6's rule' about default order is correct and can stay.)
5. **[medium] [visual] panel 42 (record types table) @390** (visual-py-16-20): The four-column comparison table scrolls inside its box on phones with no hint; the last column ('can change') is cut mid-word and the visible columns are squeezed to two or three words per line.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-071-p42.png (div.ch20-table-wrap scrollWidth 567 vs 316).
   - fix: At ≤640px stack each row (one card per box type, `td::before { content: attr(data-label) }`), as the ladder in P43 already does well. Why: comparisons must read without a sideways swipe.
6. **[medium] [content] panel 45 (boss b3m, parsons)** (content-py-19-21): The parsons key is ambiguous. Putting `def __str__` and its return above the two field rows gives the same dataclass and the same output, but it's marked wrong. The explain presents 'fields before the method' as required, when it's only a convention.
   - evidence: boss_parsons.py lines 4-7. A scratch run with the method before `rank: int` / `suit: str` on 3.15.2 prints "8 of hearts", the same as the goal. Prompt: "Rebuild the frozen card so the program prints the goal output." Explain: "The fields come before the method..."
   - fix: Add to the prompt "Fields first, then the method, as usual", or pin the two field rows with `"pin": [4, 5]` so the method can only go after them.
7. **[medium] [visual] panel 6 (translation list) @390** (visual-py-16-20): On phones the 'Python calls' column breaks dunder names in the middle: `b.__contains_` / `_(x)` and `b.__getitem__` / `(i)`, so a reader learning the exact spelling of special methods sees `__contains_` with one underscore.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-009-p6.png. py-ch20.css `.ch20-xlate code { … overflow-wrap: anywhere }` in a `minmax(0,1.2fr)` column.
   - fix: `.ch20-xlate code { overflow-wrap: anywhere }` → `overflow-wrap: normal` and add `<wbr>` before `(` in the markup (`b.__contains__<wbr>(x)`), with `font-size: 0.8125rem` at ≤640px. Why: identifiers may wrap only at punctuation, never inside a name.
8. **[medium] [content] panel notebook: Under the hood, '+= falls back to +'** (content-py-19-21): Broken cross-reference: the aliasing lesson is in Chapter 7, not Chapter 15. Chapter 15 has no aliasing or list += material.
   - evidence: ch20 notebook: "Lists have __iadd__ and change in place (Chapter 15's aliasing surprise)". grep 'alias' finds nothing in python/ch15.html; python/ch7.html has "Part 5 · Two tags, one row: aliasing, copying, lists inside lists" and "Change it through b and a sees it too. This is called aliasing."
   - fix: Change it to "(Chapter 7's aliasing surprise)".
9. **[low] [content] panel 24** (content-py-19-21): `map()` is credited to Chapter 17, but Chapter 17 itself says map comes from Chapter 16.
   - evidence: ch20 panel 24: "and map() (Chapter 17) takes it like any other machine". python/ch17.html: "you already know some: sorted, map and filter from Chapter 16 all take a machine".
   - fix: "map() (Chapter 16) takes it like any other machine".
10. **[low] [book] panel 34** (book-py): Chapter 20 calls Pockets 'Chapter 19's Pockets'; Pockets belongs to Chapter 9's critter gallery.
   - evidence: 'It's a kind of AttributeError (Chapter 19's Pockets).' Other chapters: 'Pockets, … from Chapter 9' (ch15), '(Pockets, Chapter 9)' (ch26).
   - fix: Change to '(Pockets, Chapter 9)'.
11. **[low] [content] panel 34** (content-py-19-21): Pockets is credited to Chapter 19, but Pockets, the AttributeError critter, was introduced in Chapter 9.
   - evidence: Panel 34 anatomy: "It's a kind of AttributeError (Chapter 19's Pockets)." python/ch9.html introduces "Pockets · that tool isn't here". ch21 panel 11 correctly says "Jigsaw, the TypeError critter from Chapter 9".
   - fix: "(Pockets, the AttributeError critter from Chapter 9)".
12. **[low] [content] panel 36** (content-py-19-21): Pockets says '3.15 even suggests .battery', which implies 3.13 doesn't suggest a fix. 3.13.18 suggests it too; only the wording differs. The page's own version notes say so.
   - evidence: Panel 36: "3.15 even suggests .battery." dc_slots.py alt (3.13.18): "... Did you mean: 'battery'?"; primary (3.15.2): "Did you mean '.battery' instead of '.batery'?".
   - fix: "And I even suggest the name you meant: .battery."
13. **[low] [visual] panel 6 (translation list) @1280** (visual-py-16-20): Inline code in the 'note' column (`b[1:3]`, `__len__`) picks up the chip styling meant for the two code columns (block, 2px border, 8px radius), so plain notes contain boxed pills that look like inputs.
   - evidence: 1280 crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/sh/c20p6w.png; py-ch20.css `.ch20-xlate code { … display: block; border: 2px solid … }` applies to every `code` in the panel.
   - fix: `.ch20-xlate code { … }` → `.ch20-xlate .xrow > code { … }`. Why: one inline-code style across the page.
14. **[low] [visual] panel cover, 3, 37, 47 (sockets and form drawings) @both** (visual-py-16-20): Text inside the chapter's drawings falls under 12px: socket names 9.5–11.1px ('__getitem__' 9.5px), form field rows 'x: int' 9.3–10.3px, the stamp's small print '__init__ __repr__ __eq__' 8.3px, tuple slot numbers 10.5px.
   - evidence: Audit SVG text: cover 8.3–11.9px, p3 9.5–11.8px @390, p37 9.3/10.5px, p47 10.3px both widths; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-000-main-after-p0-panel.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a20/w390-006-p3.png.
   - fix: py-ch20.js: form field `font-size="14"` → 18 and socket names `fs = s.socket.length > 9 ? 12 : 14` → `15 : 17`; widen `.char.form-pic` to `min(100%, 340px)`. Why: labels ≥12px.
15. **[low] [content] panel notebook: Version notes** (content-py-19-21): The 'cannot use … as a set element' wording is called the newer wording 'seen on 3.15.2' but isn't dated. It arrived in 3.14, and Chapter 8 already says so. Saying it here keeps the book consistent.
   - evidence: ch20: "the newer wording seen on 3.15.2 ... 3.13.18 says only unhashable type". Scratch run on CPython 3.14.6 prints "cannot use 'C' as a set element (unhashable type: 'C')" and "cannot use 'C' as a dict key …". python/ch8.html: "…message arrived in Python 3.14. Python 3.13 and older end with only: TypeError: unhashable type: 'list'".
   - fix: "…the wording since Python 3.14 (shown here on 3.15.2)…".

## INTEGRATION_TODO lines naming this chapter
- ## From python ch20 (Sockets and Stamped Forms)
- The cutter/cookie drawings are now copied in py-ch19 and py-ch20 (from py-ch15). Promote them to comic-critters.js.
- (a) walker on phones: the code column is 12–20 characters wide, so lines wrap inside names (py ch20 P5: 17 lines → 45 rows). Stack the walker (code above screen) at ≤640px, use a 36px gutter, and scroll instead of breaking tokens.

## Engine-refresh clean-ups for this chapter
- **Pages edited during the check run**: python/ch10 (captures missing for fill_v1.py, fill_v2.py, guests_loop2.py), rust/ch13 (match_no_err.rs, parsons_q_alt.rs; assets/ext/rs-ch13.js gone), python/ch20 (walker loud.py parity), rust/ch14 (empty terminals in P23/P39, map parity P34) fail on the live site and pass as they were this morning. Whoever is editing them should re-run the checker.
