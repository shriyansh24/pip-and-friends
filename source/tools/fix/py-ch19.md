# Fix bundle: python/ch19.html

10 review findings, 5 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 15, 20 (ex7m)** (content-py-19-21): 'Subclass' is used before Part 4 defines it. Panel 15 explains name mangling with subclasses, and the choice exercise after Panel 20 gives 'a subclass such as Cake.from_card builds a Cake' as the reason the classmethod answer is right. Subclass/inheritance is first defined in Panel 24.
   - evidence: Panel 15: "It stops subclasses from clashing by accident." ex7m correct why: "because it uses cls, a subclass such as Cake.from_card builds a Cake, not a plain Recipe"; staticmethod why: "subclasses would then get plain Recipes". Panel 24 is where Pip says "Dog is a subclass (a child) of Pet ... That's inheritance."
   - fix: In Panel 15, write "It stops child classes (Part 4) from clashing by accident." In ex7m, lead with the reason the reader already has ("It needs the class to stamp a new object with cls(…)"), and move the subclass point to a parenthesis: "(Part 4 shows a bonus: a child class gets its own kind of object.)"
2. **[medium] [visual] panel 2 (whiteboard and notebooks) @390** (visual-py-16-20): On phones the whiteboard drawing's text shrinks to 8.4–9.9px ('club = 'Robot Club'', 'ada's notebook', 'name = 'Ada'', 'not in my notebook? look at the whiteboard'), which is the whole content of the panel.
   - evidence: Audit SVG text at 390: p2 9.9px ×5, 8.4px ×2; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w390-005-p2.png. ch19.html line 82 `<svg class="ch19-draw" viewBox="0 0 640 330">` scales to 310px.
   - fix: Wrap it as `<div class="picscroll"><svg class="ch19-draw pic-wide" …></div>` (AUTHORING 'Wide drawings on phones'), or redraw a portrait version under 640px. Why: drawing labels ≥12px.
3. **[medium] [visual] panel 27 (super().__init__ walker) @390** (visual-py-16-20): The `.ch19-walkwide` workaround doesn't help on phones: `print("  Pet.__init__ runs")` wraps into four rows ('print("' / 'Pet.' / '__init__' / 'runs")'), so the 15-line program becomes about 35 rows. Engine-wide cause reported once under visual-engine.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w390-043-p27.png.
   - fix: Until the engine fix lands, use tab-size 2 for this walker at ≤640px: `.ch19-walkwide .recipe { tab-size: 2 }`. Why: wrapped code should break between words, not inside a string.
4. **[medium] [content] panel 42 (boss b3m, parsons)** (content-py-19-21): The parsons key is ambiguous. Moving the `__init__` pair under Dog and the `speak` pair under Pet gives a valid program with the same goal output, but the engine checks exact line order and marks it wrong.
   - evidence: boss_parsons.py: class Pet / def __init__ / self.name = name / class Dog(Pet) / def speak / return ... / rex = Dog("rex") / print(rex.speak()). A scratch run of the swapped version (Pet gets speak, Dog gets __init__) on 3.15.2 prints "Rex says woof", the same as the goal. assets/comic-widgets.js:487 grades by `mine === real` (exact order). Prompt: "Rebuild the parent, the child, and the two lines that use them."
   - fix: Say the split in the prompt: "Pet sets the name in __init__; Dog adds speak." Or change the program so only one split works (e.g. give Dog's speak a dog-only word, and give Pet a second method that Dog uses).
5. **[low] [visual] panel 12 (property gate) @390** (visual-py-16-20): Already listed under INTEGRATION_TODO 'From python ch19' (about 9px); measured now, the smallest gate labels are 6.9px ('(reading)', '(writing)', '✓ write it').
   - evidence: Audit SVG text at 390: p12 6.9px ×2, 7.4px ×6, 7.9px, 8.4px ×4, 10.9px ×2; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w390-019-p12.png.
   - fix: Same fix as P2: `picscroll` + `pic-wide`. Why: labels ≥12px.
6. **[low] [visual] panel cover, 24 (family tree), 20 (three kinds of method), 37 @390** (visual-py-16-20): Cutter and machine name plates fall under 12px on phones: 'Dog', 'Cat', 'Fish' 10.7px (cover and P24), 'helper' 9px and 'cls' 11.6px (P20), 'Pet'/'Dog' 11.6px (P37).
   - evidence: Audit SVG text at 390; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w390-000-main-after-p0-panel.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w390-031-p20.png. py-ch19.js cutter `font-size: label.length > 5 ? 15 : 18` inside `.kids .char { width: min(100%, 128px) }`; `.ch19-three .duo-card .pic svg { width: 110px }`.
   - fix: `.ch19-three .duo-card .pic svg { width: 110px }` → `140px`; at ≤640px let `.ch19-cover .kids` keep 3 columns but raise the cutter plate font to 20 units. Why: labels ≥12px.
7. **[low] [content] panel footer** (content-py-19-21): The footer gives the capture date as 2026-11-07, but data/py-ch19.json was recaptured on 2026-11-08.
   - evidence: Footer: "63 programs, run with CPython 3.15.2 and CPython 3.13.18 on 2026-11-07". data/py-ch19.json meta.date: "2026-11-08". (ch20 and ch21 footers say 2026-11-08, matching their data.) The repeat counts quoted (1016 vs 996) still match the current capture.
   - fix: Change the date to 2026-11-08.
8. **[low] [visual] panel notebook 'Common wrong ideas' (nb_recursion.py, two versions) @1280** (visual-py-16-20): The two version terminals sit side by side in a 300px-minimum grid, so each is about 350px wide and cuts the RecursionError line and the 'Previous line repeated … more times' line the paragraph below compares.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-16-20/a19/w1280-083-nb-after-p44-page.png (bottom).
   - fix: `<div class="ch19-duo">` → stack the two terminals (`grid-template-columns: minmax(0,1fr)`) for this pair. Why: the compared lines must be fully visible.
9. **[low] [content] panel notebook: Version notes** (content-py-19-21): The read-only property note says that before 3.11 Python said 'only "can't set attribute"'. 3.10 already named the attribute.
   - evidence: Version notes: "older versions said only \"can't set attribute\"". A scratch run on CPython 3.10.20 prints AttributeError: can't set attribute 'fahrenheit'. 3.11.18 prints "property 'fahrenheit' of 'Oven' object has no setter", which confirms the 3.11 half of the claim.
   - fix: "…since 3.11; 3.10 said \"can't set attribute 'fahrenheit'\", and older versions just \"can't set attribute\"."
10. **[low] [content] panel notebook: Version notes** (content-py-19-21): The `__slots__` message is described only as 'recent'. It can be dated: it's new in 3.13.
   - evidence: "The __slots__ message '…and no __dict__ for setting new attributes' is recent". Scratch runs: 3.12.3 prints "'P' object has no attribute 'z'"; 3.13.18 and 3.15.2 add "and no __dict__ for setting new attributes".
   - fix: "…is new in Python 3.13; 3.12 and older say only \"'Point' object has no attribute 'z'\"."

## INTEGRATION_TODO lines naming this chapter
- ## From python ch19 (Family Trees and Toolbelts)
- Its author built the page from parts p0–p7.html plus a build.py in the scratchpad. Those are now archived in `src/python/ch19-parts/` because the scratchpad isn't kept. **python/ch19.html is the canonical source**: edit it directly, and do NOT re-run the parts build, which would overwrite later edits.
- py-ch19.js copies ch15's cookie-cutter/cookie drawings. Candidates for comic-critters.js.
- The cutter/cookie drawings are now copied in py-ch19 and py-ch20 (from py-ch15). Promote them to comic-critters.js.
- PARSONS ORDER is common (py ch19, 20, 21, 23, 26 so far: swappable methods, independent statements). Pins alone can't express "method A and method B in either order". Engine option: `"alts": [[order…], …]` of extra accepted orders, or `"swap": [[i, j], …]` groups. Fix agents should RUN each alternative order to prove its output before adding it. Caution: py ch21 b3m's "either order" explanation is itself WRONG (the `["hi"]` / `["hi", *names]` cases can't swap), so fix the explanation and don't add that alt.

## Engine-refresh clean-ups for this chapter
- `py-ch19.css:45` `.ch19-table code`
