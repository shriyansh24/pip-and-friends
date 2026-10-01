# Fix bundle: python/ch24.html

10 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 7 (text version) @390** (visual-py-21-25): The doll stepper's own text-version table squeezes its 'Dolls' column to about 45px, so each row stacks 'fact(4): / not / opened / yet …' one word per line; with the text version open the panel is 5,448px tall at 390, and the explanation column is hard to follow.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a24/w390-011-p7.png (5448px tall); sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a24/sheets/w390-01.png. The table is built by py-ch24.js mountDolls (4 columns: Step, What happens, Dolls, Screen).
   - fix: Before: four table columns at every width → After: @media (max-width:640px) { [data-dolls] .transcript tr { display:grid; grid-template-columns: 3ch 1fr; } [data-dolls] .transcript td:nth-child(n+3) { grid-column: 2; } } and join the dolls with '; ' in mountDolls (why: one readable column per row on phones).
2. **[medium] [visual] panel 7, 13, 24 @1280 and 390** (visual-py-21-25): The chapter's steppers grow as you press Next, so the Back/Next/Play buttons slide down under the finger or mouse: the call tree of fib(4) grows by 183px at 390 between the first and last step, the memo tree by 114px, the doll stepper by 84–105px.
   - evidence: box heights from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/steps24.jsonl: calltree0 1076→1259 (390), calltree1 1647→1761, dolls 1264→1369 (1280) / 1282→1366 (390). The screens start at min-height 8em/9.5em (py-ch24.css:64 and the .ch24-dollwrap rule) but end with 11 lines. The engine refresh fixed the same jump for tracers ('the buttons below never jump').
   - fix: Before: .ct-split .screen pre { min-height: 8em } → After: set min-height from the final step's line count when mounting (pre.style.minHeight = (lines.length * 1.6) + 'em') for the call trees and dolls, and give .narration a min-height (why: controls that move during repeated presses break keyboard and touch rhythm).
3. **[medium] [visual] panel after 29 (parsons, merge_sort) @1280** (visual-py-21-25): On desktop the longest Parsons line, 'return merge(merge_sort(items[:middle]), merge_sort(items[middle:]))', is cut off under the ↑/↓ buttons ('…merge_sort(items[mi'), so the learner can't read the line they are placing.
   - evidence: code scrollWidth 648 vs clientWidth 579; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a24/w1280-053-main-after-p29-ex-card.png. Parsons lines wrap only below 640px (comic-widgets.css:209).
   - fix: Split the line in the program (left = merge_sort(items[:middle]) / right = merge_sort(items[middle:]) / return merge(left, right)) and recapture, or engine: apply the phone rule '.parsons li code { white-space: pre-wrap; overflow-wrap: normal }' at every width (why: a puzzle piece must be fully visible).
4. **[low] [visual] panel 13, 24 (call trees) @390** (visual-py-21-25): Not-yet-called nodes are drawn at opacity 0.4 (the key's 'not called yet' sample at 0.6), so at step 1 the whole tree is faint grey text (about 2.6:1, below the 7:1 house rule); the call numbers and '= 3' / 'again' tags are 10px at 390.
   - evidence: py-ch24.js render(): '<g … opacity="0.4">'; py-ch24.css '.ct-key .k.later { opacity: 0.6 }'; audit small text 10px ×9–18 in p13; crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a24/sheets/w390-02.png (p13 step 1), /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/s24/w390-datacalltree0-end.png.
   - fix: Before: opacity="0.4" on the whole node group → After: keep text ink, fade only the box (fill-opacity on the rect, dotted stroke), and raise the tag/number font sizes 16 → 20 (why: 'not yet' is already told by the dotted border and the word; text pairs stay ≥7:1).
5. **[low] [content] panel 14** (content-py-22-24): Slices are credited to Chapter 11, but Chapter 7 teaches them (Part 2 · Slices, slice stepper). Chapter 11 only recaps them.
   - evidence: ch24 Panel 14: "slice off its first letter (Chapter 11's slices)". python/ch7.html: "Part 2 · Slices", Panel 11 "a slice takes a run of crates"; ch11 has a single mention ("index it, slice it").
   - fix: "(Chapter 7's slices)".
6. **[low] [book] panel 14, 16** (book-py): Two small cross-reference slips in Chapter 24: string slicing is credited to Chapter 11 (taught in Chapter 7), and isinstance is called 'Chapter 3's question' (ch3 taught type(); isinstance is Chapter 19).
   - evidence: Panel 14: 'A string gets smaller when you slice off its first letter (Chapter 11's slices)'. Panel 16: 'Line 4 asks Chapter 3's question: what kind of thing is this item? isinstance(item, list)'. ch7 TOC 'Slices: a run of crates' and 'Trains and sealed crates'.
   - fix: '(Chapter 7's slices)'; 'Line 4 asks Chapter 3's question with Chapter 19's tool: isinstance(item, list)'.
7. **[low] [content] panel 16** (content-py-22-24): isinstance is presented as Chapter 3's tool, but Chapter 3 uses type(). isinstance first appears in Chapter 19 (Panel 30) or Chapter 15.
   - evidence: Panel 16: "Line 4 asks Chapter 3's question: what kind of thing is this item? `isinstance(item, list)`...". grep: 'isinstance' does not appear in ch3.html; ch19.html Panel 30 is "isinstance, issubclass and __mro__".
   - fix: "Line 4 asks Chapter 3's question (what kind of thing is this?) with Chapter 19's `isinstance`...".
8. **[low] [visual] panel 35, cover @390** (visual-py-21-25): 'Four ways a party queue can grow' has no pictures: the cards are text only, while py-ch24.css carries a rule for '.ch24-queue .duo-card .pic svg' that matches nothing. The cover stopwatch reads '0.03 s' at 9.8px.
   - evidence: ch24.html Panel 35 markup (four .duo-card with no .pic); /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a24/sheets/w390-06.png; audit small list.
   - fix: Add the four growth sketches (or delete the dead .pic rule), and draw the cover stopwatch at width min(30%,150px) (why: the chapter's one Big-O explainer deserves its visual; 12px floor).
9. **[low] [visual] panel 7 (doll stepper) @390** (visual-py-21-25): Doll captions run into each other at 390: with a 2px gap the four figcaptions read across as 'open: waiting open: waiting for the doll for the doll inside inside'.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/s24/w390-datadolls0-mid.png; py-ch24.css:47 '.dl-row { gap: 2px }' and 13px captions.
   - fix: Before: @media (max-width:640px) { .dl-row { gap: 2px } } → After: gap: 8px and the short state word only on phones ('waiting', 'solid', 'closed'), with the full sentence kept in the text version (why: each caption must visibly belong to its doll).
10. **[low] [content] panel after 16 (e8, spot spot_nested.py)** (content-py-22-24): The spot-the-bug exercise sits right under the correct version of the same function, so the bug can be found by comparing the two line by line rather than by understanding it.
   - evidence: Panel 16 nested_sum.py line 5: `total += deep_sum(item)`; e8 spot_nested.py line 5: `deep_sum(item)`, otherwise identical.
   - fix: Move e8 after Panel 22 (the missing-return panel), where it tests the 'use the answer' idea, or change its function (e.g. a nested max or count) so it can't be diffed against Panel 16.

## INTEGRATION_TODO lines naming this chapter
- uv/Poetry commands (py-ch23) and profiling.sampling (py-ch24) are shown but not run (no internet / sandbox limits), and the pages say so.

## Engine-refresh clean-ups for this chapter
- `py-ch24.js:123`
- `py-ch24.js:223`
- `py-ch24.css:81` `.ch24-table code`
