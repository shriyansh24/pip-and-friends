# Fix bundle: python/ch8.html

7 review findings, 0 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel after 34 (boss3)** (content-py-7-9): The boss parsons starts with two independent assignments (text = ..., counts = {}) that can go in either order with the same output, but only one order is accepted.
   - evidence: boss_parsons.py lines 1-2: "text = \"go pip go\"" / "counts = {}"; engine grades exact order (comic-widgets.js line 487).
   - fix: Add "pin": [1] (or [1, 2]) to boss3-m, or fold the text into the loop: for word in "go pip go".split():
2. **[medium] [visual] panel cover, 2, 4, 7, 11, 17, 22, 34 (cabinet creature) @both** (visual-py-6-10): The cabinet creature's drawer labels (the dict keys, the chapter's main idea) render at 7.5–10.5px at desktop and 8.4px at phone width.
   - evidence: Audit: p7 7.5px at both widths, p2/p4/p11/p17 10.1px at 1280, cover/p22/p34 8.4px at 390. /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a8/w1280-016-p7.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a8/w390-040-p22.png. The crate items in p22 ('tea', 'milk') are 8.6px at 390.
   - fix: Engine (comic.js cabinet drawing): raise the key label size in viewBox units so it renders at 12px or more at the default .char width. On p7, remove the small/scale sizing on the cabinet beside the bubbles. Put this in the shared figure-text fix (INTEGRATION_TODO 'From rust ch9').
3. **[low] [content] panel 10** (content-py-7-9): Pip's "Line 4 says False" counts source lines, but the terminal's fourth output line is True; Panel 16 in the same chapter uses "Line N" for output lines, so a beginner will look at the wrong line.
   - evidence: Panel 10 bubble: "Line 4 says <samp>False</samp>! 2 is a value." in_demo.py stdout: True / False / False / True / True (the False for `2 in prices` is output line 3). Panel 16 readlist: "Line 1 of output: …", "Line 2: …".
   - fix: "<code>2 in prices</code> says <samp>False</samp>! 2 is a value."
4. **[low] [content] panel 20** (content-py-7-9): Tracer notes use "a 'a' drawer" (generated grammar).
   - evidence: tr-count notes: "Is there a <code>'a'</code> drawer? <b>Not yet.</b>" and "Is there a <code>'a'</code> drawer? <b>Yes</b>, holding 1."
   - fix: Use "an 'a' drawer" in the three 'a' steps, or reword all to "Does <code>'a'</code> have a drawer yet?".
5. **[low] [content] panel 36** (content-py-7-9): The panel says the reader met AttributeError in this chapter, but ch8 never shows it in a panel: it appears only in boss2's revealed explanation (and ch7's b6 had already asked for it by name).
   - evidence: Panel 36: "This chapter you met <code>KeyError</code>, <code>TypeError</code> and <code>AttributeError</code>." AttributeError appears only in boss2-m explain and the Words list.
   - fix: Say "…KeyError and TypeError, and the boss level sneaked in an AttributeError", or show boss_seen_bug.py's error in a panel; align with the ch7 b6 fix.
6. **[low] [book] panel cover** (book-py): Six covers omit the 'with N hands-on checks' count the other 21 covers give (all 21 stated counts match the real number of exercises).
   - evidence: ch8 cover: 'About 40 minutes, plus the Professor's notebook.'; ch9: 'About 50 minutes.'; ch14: 'About 60 minutes.' Actual data-ex counts: ch8 23, ch9 25, ch10 39, ch12 31, ch13 26, ch14 25.
   - fix: Append ', with 23 hands-on checks' (etc.) to each cover blurb.
7. **[low] [visual] panel trace exercise after panel 20 (letter / counts[letter] / len(counts)) @390** (visual-py-6-10): The trace table's third column header 'len(counts)' and its inputs are cut at the card edge. The table scrolls, but nothing shows that it does.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-6-10/a8/w390-037-main-after-p20-ex-card.png
   - fix: Engine: shrink trace-table code headers at <=640px, or add the same 'swipe sideways' hint the maps use. INTEGRATION_TODO 'From cpp ch27' asks what defeats the trace table's overflow-x.

## Engine-refresh clean-ups for this chapter
- the cabinet on py ch8 p7
