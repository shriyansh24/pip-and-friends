# Fix bundle: cpp/ch12.html

6 review findings, 2 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 12** (content-cpp-10-12): Two line references in the const-member panel are off by one, so the reader looks at the wrong code.
   - evidence: Panel text: "Now look-only visitors may call it, and so may a const object (line 19)." and "Line 21 is commented out because it wouldn't build." const_fixed.cpp (data/cpp-ch12.json): line 19 is `show(acc);`, line 20 is `const Account empty;`, line 21 is `show(empty);`, and the commented-out call is line 22 `// empty.deposit(5);`.
   - fix: "...and so may a const object (lines 20 and 21)." and "Line 22 is commented out because it wouldn't build."
2. **[medium] [visual] panel 2, 14, 21, 30 @390** (visual-cpp-11-15): Four wide drawings have no phone treatment: at 390 their labels render at 5.7-9.1px, so the bank diagram, the opening-form ceremony, the four vault doors and the locker timeline can't be read.
   - evidence: Measured SVG text at 390: p2 'deposit 50' 5.7px, 'deposit()/withdraw()/balance()' 8.1px, 'main()' 9.1px; p14 'OPENING FORM', 'owner: Ada', 'opening: 50' 7.7-8.1px; p21 'constructor' 6.7px, 'set_balance()' 6.7px, 'invariant: balance_ >= 0' 9.1px; p30 'A', 'B', 'C', 'close A'... 7.7px. Markup: cpp/ch12.html:74, 374, 532, 721 (plain `<svg class="pic-wide" viewBox="0 0 660 …">`, no `.picscroll`). Crops: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-11-15/a12/w390-005-p2.png, w390-026-p14.png, w390-038-p21.png, w390-052-p30.png (crops regenerate with `bash tools/slot.sh node <scratch>/audit.js cpp/chN.html <dir>`; screenshots deleted after review per brief)
   - fix: Before: `<svg class="pic-wide" …>` → After: `<div class="picscroll"><svg class="fig pic-wide" …></svg></div>` (AUTHORING 'Wide drawings on phones': keeps 560px and scrolls, so labels stay ≥12px)
3. **[low] [content] panel 20** (content-cpp-10-12): The Sanitizer narrates a compile-only panel about compiler warnings, although Chapter 11 sets it up as the run-time tool and this program is never run or sanitized.
   - evidence: Panel 20 bubble: "The Sanitizer says: Both compilers built it, with warnings only. Two separate alarms went off: -Wreorder ... and -Wuninitialized". reorder_bug.cpp is built with plain -Wall -Wextra, with no -fsanitize flag (data/cpp-ch12.json). Plan cast for ch12: "Compiler (private, discards qualifiers, -Wreorder)".
   - fix: Give the bubble to the Compiler (data-char="compiler"), or have the Sanitizer say explicitly that it never got to run.
4. **[low] [visual] panel 20, 33 @390** (visual-cpp-11-15): Inline flags break right after their leading hyphen, leaving '-' at a line end and 'Wreorder' / 'Wuninitialized' on the next line, in a bubble (p20) and in the recap card 'Declaration order wins' (p33).
   - evidence: Visible in the 390 contact sheet: p20 bubble '... (the list lies about the order) and - / Wuninitialized', p33 '... never in list order. - / Wreorder'.
   - fix: Before: `<code>-Wreorder</code>` → After: `<code style="white-space:nowrap">-Wreorder</code>` (or a chapter `.flag` class) so a flag never splits at its own hyphen
5. **[low] [content] panel 27** (content-cpp-10-12): Wren points at a header line that doesn't exist: the guard's #endif is line 18, not 19.
   - evidence: Panel text: "the guards on lines 2, 3 and 19 of the header are Chapter 10's." vault/account.h (data/cpp-ch12.json) has 18 lines; line 18 is `#endif`.
   - fix: "the guards on lines 2, 3 and 18 of the header".
6. **[low] [content] panel notebook: Why mark one-argument constructors explicit** (content-cpp-10-12): explicit_conv.cpp still carries the comment "C++ quietly builds one", and the captured error repeats it right where C++ refuses.
   - evidence: explicit_conv.cpp line 21: `welcome(name);    // a string, not an Account! C++ quietly builds one`. The terminal for it shows g++'s source excerpt: "21 |     welcome(name);    // a string, not an Account! C++ quietly builds one" under "error: invalid initialization of reference...".
   - fix: Change the comment to `// explicit: no quiet conversion any more` and recapture cpp 12.

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch12 (The Bank Vault)
- Tally the teller (cpp-ch12.js): promote her to comic-critters.js if later C++ chapters reuse her.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch12.css:13` `.pair2 .term`
- `cpp-ch12.css:36` `.vs td code, .vs th code`
