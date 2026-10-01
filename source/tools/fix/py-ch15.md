# Fix bundle: python/ch15.html

7 review findings, 2 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 17 and 41 (STAMP! and YAY! bursts) @1280** (visual-py-11-15): At desktop width the sound-effect burst covers the end of the panel's first caption: P41 reads 'Look how far you've com…' with 'come.' under 'YAY!', and P17's '…come out with a nam…' is under 'STAMP!'.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/a15/w1280-066-p41.png; contact sheet sh/c15-1280-03.png (P17). Cause: py-ch15.css last line `.panel .sfx.tr + .caption { margin-right: 112px; }` applies at every width, but the burst is 190px wide above 640px (comic.css:224).
   - fix: Before: `.panel .sfx.tr + .caption { margin-right: 112px }` → After: `@media (min-width: 641px) { .panel .sfx.tr + .caption { margin-right: 180px } }` and keep 112px for phones (why: the caption must clear the 190px burst).
2. **[low] [visual] panel 11, 31, 33, 34, 35 (error terminals) @390** (visual-py-11-15): Error lines hidden off the right edge on phones (RuntimeError: dictionary changed size…, TypeError: Pet.hello() takes 0 positional arguments…, TypeError: Pet() takes no arguments, AttributeError: 'Pet' object has no attribute 'name', NameError … Did you mean: 'self.name'?).
   - evidence: probe.js: P11 310px, P31 279px, P33 254px, P34 262px, P35 310px hidden at 390.
   - fix: `class="term wrap"`.
3. **[low] [content] panel 18, 23, 26, 29, 37, 38–40 (programs)** (content-py-13-15): Right after ch14 taught PEP 8's "two blank lines around top-level functions", ch15's class programs leave only one blank line between the class and the top-level code.
   - evidence: pet_methods.py, grade_class.py, recipe_v2.py, boss_bank.py, nb_vars.py and attr_typo.py all have one blank line between the end of the class and `rex = Pet(...)` (or similar). ch14 Panel 28 checklist: "Two blank lines around top-level functions." ch15 Panel 23 does cite PEP 8 for one blank line between methods.
   - fix: Add the second blank line in those programs and recapture. Line-numbered prose ("line 6", "line 9") and exercise line references would then need updating, so a cheaper fix is a one-line note in Panel 23 that the comic saves space this way.
4. **[low] [visual] panel 41 (graduation card), 9 (remove drawing) @1280 and 390** (visual-py-11-15): The 'You' tag on the graduate cookie is 8.9px, and the P9 'finger on spot' drawing labels drop to 10.1–11.5px on phones.
   - evidence: audit2.js small text: P41 'You' 8.9px (both widths); P9 'remove(2)' 10.1px, 'finger on spot 1: n = 2, remove it' 11.5px at 390. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-11-15/a15/w390-066-p41.png, a15/w390-015-p9.png.
   - fix: Draw the graduate cookie at 110px+ (`.ch15-cast .char { width: 84px }` → 110px), and wrap the P9 drawing in `.picscroll` with `.pic-wide` so labels keep their size.
5. **[low] [content] panel ex-same (after Panel 5)** (content-py-13-15): The question introduces only `nums` and `n`, but one option uses `word`, which appears without introduction.
   - evidence: q: "nums is a list and n is an int. Which line changes an existing object..."; option: "word = word.upper()".
   - fix: q: "nums is a list, n is an int and word is a string. Which line..."
6. **[low] [content] panel notebook: Go deeper** (content-py-13-15): A link labelled "Programming FAQ: call by object reference" goes to a FAQ entry that never uses that phrase. The FAQ says "passed by assignment"; the phrase is in the Tutorial's footnote.
   - evidence: Fetched the FAQ entry. It says "Remember that arguments are passed by assignment in Python...", and the phrase 'call by object reference' doesn't appear on the page. The notebook text ("the Python docs call it 'call by object reference'") is true only of Tutorial 4.8's footnote.
   - fix: Relabel: "Programming FAQ: arguments are passed by assignment". Optionally add the Tutorial 4.8 link (docs.python.org/3/tutorial/controlflow.html#defining-functions) for 'call by object reference'.
7. **[low] [content] panel notebook: Under the hood, 'self is only a name'** (content-py-13-15): The page overstates the Tutorial on self: the Tutorial calls it a convention whose breach hurts readability, not a strong recommendation.
   - evidence: Page: "the official tutorial strongly recommends it". Tutorial 9.4 'Random Remarks': self is "nothing more than a convention ... by not following the convention your code may be less readable to other Python programmers". (Wording from my own reading of the Tutorial; not re-fetched.)
   - fix: "...and the official tutorial warns that other names make your code harder for other Python programmers to read."

## INTEGRATION_TODO lines naming this chapter
- The cutter/cookie drawings are now copied in py-ch19 and py-ch20 (from py-ch15). Promote them to comic-critters.js.
- NAME CLASH: rs-ch17.js defines `cutter` (dashed generic / solid stamped), while py-ch15/19/20 define a different `cutter` drawing. When promoting either to comic-critters.js, give them distinct names.
