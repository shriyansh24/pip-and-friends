# Fix bundle: javascript/ch21.html

9 review findings, 0 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 11 @390** (visual-js-21-25): The copy-or-change table splits method names mid-token: 'a.reverse(' / ')', 'a.toRevers' / 'ed()', 'a.splice(s' / 'tart,' — a beginner reads them as two words.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c21-p11.png; cause assets/ext/js-ch21.css:66 `table.copy21 code { overflow-wrap: anywhere; }` inside a 3-column table ~120px per column at 390.
   - fix: `table.copy21 code { overflow-wrap: anywhere }` → `overflow-wrap: normal` plus wrap the table in `<div class="tablewrap">` and at ≤560px stack rows the way js-ch23.css `.tablewrap .mini` does (labels from the header) (code tokens must never break inside a name).
2. **[medium] [content] panel Notebook: In real programs** (content-js-19-21): Broken cross-reference: testing is credited to Chapter 26, but Chapter 26 is modules in depth and doesn't cover testing. Testing in depth is Chapter 27 (first met in Chapter 14).
   - evidence: "A pure function needs no setup and no clean-up: one input, one expected output (Chapter 26)." ch26 next-chapter line: "NEXT: CHAPTER 27 · ... Testing in depth with node:test". ch26 has no 'pure' or test material.
   - fix: Change "(Chapter 26)" to "(Chapter 27)".
3. **[low] [content] panel 14** (content-js-19-21): The page says the caret sits under `with`, but the captured caret is under the opening bracket after it (column 26).
   - evidence: Capture: `const fixed = lineup.with(3, "Di");` with the caret at column 26, which is '(' ('with' is columns 22-25). The stack also says with_bad.js:2:26.
   - fix: "the caret sits just after with, at the call's opening bracket."
4. **[low] [content] panel 19** (content-js-19-21): ?? is credited to Chapter 11, but Chapter 6 introduced it. Chapter 11 itself calls it "Chapter 6's nullish default", and ch20 correctly says Chapter 6.
   - evidence: "so ?? 0 (Chapter 11) fills in 0"; ch6: "Meet ??, the nullish coalescing operator." ch11: "(Chapter 6's nullish default)".
   - fix: Change "(Chapter 11)" to "(Chapter 6)".
5. **[low] [visual] panel 23 (pipeline belt) @390** (visual-js-21-25): The three machines on the phone belt are squeezed into a 110px column, so their name plates ('trim', 'lower', 'dashes') render at 9px.
   - evidence: audit small text p23 'trim'/'lower'/'dashes' 9px; js-ch21.css:45 `.belt21 .stop { grid-template-columns: 110px minmax(0, 1fr) }`.
   - fix: `.belt21 .stop { grid-template-columns: 110px minmax(0,1fr) }` → `150px minmax(0,1fr)` (the machine at ≥150px keeps its plate ≥12px; the description column still has ~150px).
6. **[low] [content] panel Notebook: Lab step 2.2** (content-js-19-21): The lab says "All three lines should agree with fixed.js", but hidden.js and fixed.js print two lines.
   - evidence: hidden.js / fixed.js output: two lines ([ 95, 85, 70 ] and the signup list).
   - fix: "Both lines should agree with fixed.js."
7. **[low] [visual] panel cover, 3 @390 and 1280** (visual-js-21-25): The chapter-local traystack and toybrick drawings label their contents below 12px: 'CALL STACK' 10.4px and tray calls 11px on the cover at both widths; the brick's '→ 35? 30? 25?' tag 9.9px and 'price(2)' 11.3px in P3 at 390.
   - evidence: crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c21-cover.png and /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c21-p3.png; js-ch21.js fit() minimum 11–12 units in a 340/230-unit viewBox drawn 170–220px wide.
   - fix: `.cover21 .char.tr { width: 220px }` → `width: 280px`, and in js-ch21.js raise fit()'s minimum from 11/12 to 16 units (labels on chapter characters ≥12px).
8. **[low] [content] panel ex-declare, ex-looprec, ex-b6** (content-js-19-21): Choice length bias: in three questions the correct option is the longest by a wide margin.
   - evidence: Option lengths in characters: ex-declare [77 correct, 36, 41, 49]; ex-looprec [90 correct, 41, 33, 36]; ex-b6 [93 correct, 12, 28, 54].
   - fix: Shorten the correct options (e.g. ex-looprec: "Counting files in folders nested to any depth") or lengthen the distractors to match.
9. **[low] [book] panel notebook: In real programs (line 1193)** (book-js): Sends 'tests love pure functions' to Chapter 26, which is modules and tooling. Testing is Chapters 14 and 27.
   - evidence: ch21 line 1193: 'A pure function needs no setup and no clean-up: one input, one expected output (Chapter 26).' ch27 recap: 'EVERY TEST GETS A FRESH PLANE ... before / after ... beforeEach / afterEach' (setup and clean-up); ch14 recap 'GIVEN THIS, EXPECT THAT'.
   - fix: Change '(Chapter 26)' to '(Chapter 27)'.

## Engine-refresh clean-ups for this chapter
- `js-ch15.css:41`, `js-ch21.css:112` and `js-ch28.css:44` (`.term.wrap, .code.wrap { … }`): keep only the `.code.wrap` half.
- `.recipe li { white-space: pre; … tab-size: 2 }` appears in these files: `go-ch1/2/3/4/5/6/7/9/10/11/12/13/14/15/16/18/20/23/27.css`, `js-ch15.css` and `js-ch21.css`. These walkers don't wrap, so they get no hanging indent or punctuation breaks, and long lines hide behind the card edge.
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `js-ch21.css:116` `@media (min-width: 641px) { .walk .recipe li { white-space: pre; overflow-wrap: normal; } }`
- `js-ch21.css:60` `table.copy21 code`
