# Fix bundle: javascript/ch3.html

10 review findings, 0 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 13, 18 (two terminals), 19, 33, notebook (inc_literal.js) @390 and 1280** (visual-js-1-5): Six error terminals use a hand-rolled `.term.clip` box (max-height 17.5em, vertical scroll) instead of the engine's `data-fold`. Lines are cut off mid-row at the bottom edge with no fade or cue, and on phones a scroll box sits inside the page scroll. Chapters 2, 4 and 5 fold the same Node-internal frames with `data-fold`, so the book is inconsistent.
   - evidence: javascript/ch3.html:341, 426, 436, 456, 819, 1313 `<pre class="term clip" ...>`. Rule: assets/ext/js-ch3.css:77 `.term.clip { max-height: 17.5em; overflow-y: auto; }`, plus `.scrollnote` captions (:78) that explain the box scrolls. At 1280 P33 is 1366px wide inside 710px and clipped vertically. Crops: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-1-5/a3/w390-021-p13.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-1-5/a3/w390-029-p18.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-1-5/a3/w390-055-p33.png
   - fix: Before → After (why): `<pre class="term clip" data-run=…>` → `<pre class="term" data-fold data-run=…>`. Delete js-ch3.css:77-78 and the 'the box scrolls' sentences (the engine fold keeps the key lines in view, adds the full text one click away, and avoids a nested scroll trap on touch screens).
2. **[medium] [content] panel 18 (ex-names)** (content-js-1-3): The 'new' distractor's explanation names an error message that was not captured, and the message is wrong for `let`, the keyword this chapter uses for most new tags. In a module, `let new = 1;` gives the same strange 'strict mode reserved word' message that panel 18 shows.
   - evidence: why: "new is a reserved word: SyntaxError: Unexpected token 'new'." No program in data/js-ch3.json uses new. Scratch runs on Node 26.13.0 in a type:module folder: `let new = 1;` gives SyntaxError: Unexpected strict mode reserved word; only `const new = 1;` gives SyntaxError: Unexpected token 'new'. See INTEGRATION_TODO 'UNCAPTURED ERROR CLAIMS'.
   - fix: Drop the quoted message ("new is a reserved word, so the file is rejected with a SyntaxError"), or capture name_new.js with const and say 'with const'.
3. **[low] [content] panel 25 @390** (content-js-1-3): Sneak's bubble and the caption refer to 'the left' and 'the right side', but the two .duo cards stack into one column on phones.
   - evidence: "On the left, lives = 5 doesn't ask anything..." / "The right side asks the real question with ==="; assets/ext/js-ch3.css line 115-116: @media (max-width: 640px) { .duo, .with-char { grid-template-columns: minmax(0, 1fr); } }. INTEGRATION_TODO 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS'.
   - fix: Refer to the card headings: "In ONE =, lives = 5 doesn't ask anything..." and "THREE === asks the real question...".
4. **[low] [content] panel 40** (content-js-1-3): 'Past [MAX_SAFE_INTEGER], the marks are 2 apart' is a little off: 2**53, one past MAX_SAFE_INTEGER, has its own mark (line 2 of big.js prints it), and the 2-apart spacing starts after 2**53.
   - evidence: Caption: "Up to Number.MAX_SAFE_INTEGER, every whole number has a mark. Past it, the marks are 2 apart." big.js: 9007199254740991 / 9007199254740992 / 9007199254740992 / 9007199254740994. The notebook gets it right: "past 2^53 they are 2 apart".
   - fix: "Up to Number.MAX_SAFE_INTEGER, every whole number has a mark. Past 2 ** 53, the marks are 2 apart."
5. **[low] [visual] panel 42 (rounding lanes) @1280 and 390** (visual-js-1-5): On every chip press the rounding lanes draw their arrows with a 380ms stroke transition and a 90ms stagger per lane, so the fourth arrow finishes 650ms after the press. The transition uses the built-in `ease-out` instead of the token curve.
   - evidence: assets/ext/js-ch3.js:91 `arrow.style.transition = "stroke-dashoffset 380ms ease-out " + (k * 90) + "ms"`. Measured at 390: transitions 380ms with delays 0/90/180/270ms. It correctly checks L.motionOn() (:88). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-1-5/a3/w390-073-p42.png
   - fix: Before → After (why): `stroke-dashoffset 380ms ease-out` + `k * 90ms` → `stroke-dashoffset 200ms cubic-bezier(0.23, 1, 0.32, 1)` + `k * 40ms` (last arrow done by 320ms; the stagger belongs in Emil's 30-80ms band, and the strong curve matches the engine's --ease-out).
6. **[low] [content] panel 43 (ex-pages)** (content-js-1-3): The Math.round distractor says 'Round only works by luck (try 27 photos)', but with 27 photos round gives the right 3, so following the hint shows round working, which confuses.
   - evidence: why: "Round gives 2 here, but with 23 photos you need 3 pages. Round only works by luck (try 27 photos)." 27/10 = 2.7, Math.round gives 3, which is the right number of pages.
   - fix: "Round is right only by luck: 27 photos round to 3, but 21 photos round to 2 and need 3."
7. **[low] [content] panel 44 / 47 (Boss 6, ex-b6)** (content-js-1-3): The toFixed machine's note for (1.005).toFixed(2) gives away the Boss 6 answer before the boss level.
   - evidence: Panel 44 note: "the stored 1.005 is a hair below 1.005 (the notebook shows it), so it rounds down." Boss 6 correct option: "1.005 is stored as the nearest mark on the ruler, which is slightly below 1.005, so it rounds to 1.00".
   - fix: Change the machine note to "Not 1.01? Hold that thought: Boss 6 asks why."
8. **[low] [content] panel 45** (content-js-1-3): Cast meaning drift: the Taster (the shared 'bad value' critter) is used for a string-gluing logic bug, which is the shared logic-bug critter Sneak's job (Sneak plays that role in panels 22 and 25 of this same chapter).
   - evidence: Panel 45: "[char:taster] The Taster says: Taste that: 4.501! ..."; AUTHORING §7: taster (bad value), sneak (a logic bug).
   - fix: Use data-char="sneak" for panel 45's bubble ("Me again! label is the text 4.50 ...").
9. **[low] [content] panel choices (ex-float, ex-b6)** (content-js-1-3): Choice length bias: in two questions the correct option is more than twice as long as any other.
   - evidence: Correct/next-longest ratio: ex-b6 2.46 (101 vs 41 chars), ex-float 2.14 (94 vs 44 chars). 6 of 10 choices have the correct option longest. INTEGRATION_TODO 'CHOICE LENGTH BIAS'.
   - fix: ex-float correct: '0.1 and 0.2 are stored slightly off, and their sum misses 0.3's mark'; ex-b6: 'The stored 1.005 is a hair below 1.005'. Lengthen one distractor each.
10. **[low] [content] panel notebook: let, const and "uninitialized"** (content-js-1-3): The notebook quotes the TDZ error text without a capture in this chapter (it is correct: I ran it, and ch8 captures the same wording).
   - evidence: "Using it too early gives ReferenceError: Cannot access 'x' before initialization." Scratch run: `console.log(x); let x = 1;` prints exactly that on Node 26.13.0; javascript/ch8.html shows "Cannot access 'x' before initialization" from its own captures.
   - fix: Either add a tiny tdz.js capture, or reword as 'gives a ReferenceError (Chapter 8 shows the real message)'.

## Engine-refresh clean-ups for this chapter
- `js-ch3.css:121` `.panel .term, .notebook .term`
