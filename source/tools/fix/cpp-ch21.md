# Fix bundle: cpp/ch21.html

12 review findings, 2 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 14** (content-cpp-19-21): Panel says 'Left: it compiles... Right: one word added' and Wren says 'On the left', but the two programs are in .pair2.stack, which is one column at every width.
   - evidence: ch21.html P14: <div class="pair2 stack">; assets/ext/cpp-ch21.css line 14: `.pair2.stack { grid-template-columns: minmax(0, 1fr); }`. Known pattern: INTEGRATION_TODO 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS' (new instance).
   - fix: Refer to the card headings: "First, `Playlist(int capacity)`: it compiles... Then `explicit Playlist(int capacity)`: ..."; Wren: "In the first program, the Compiler built a temporary..."
2. **[medium] [content] panel 28** (content-cpp-19-21): Wrong cross-reference: Wren says the self-check matters 'in a class that gives back its old block before copying (Boss 3)', but Boss 3 does the opposite (builds and fills the fresh block before delete[]), as its own explanation says.
   - evidence: P28: "in a class that gives back its old block before copying (Boss 3), `x = x` would demolish the house...". boss_parsons.cpp lines 12-15: new int[3] -> std::copy -> delete[] data_ -> data_ = fresh; ex-b3 explain: "Why fresh-before-delete?..."
   - fix: "in a class that gave back its old block before copying, `x = x` would demolish the house and then try to copy furniture out of the rubble. (Boss 3 builds the fresh block first, and still checks.)"
3. **[low] [content] panel 16, notebook (Copy elision)** (content-cpp-19-21): Two run results are stated without a capture: 'if line 6 weren't explicit, torch + 1 would compile and give 2', and 'Panel 22's -fno-elide-constructors only switches off the optional kind, which is why statement 5 of the trace stayed a single default' (the trace was never built with that switch).
   - evidence: Verified true in scratch: conversion_bad.cpp with a non-explicit operator bool and `torch + 1` prints '2%'; trace_eight.cpp built with -fno-elide-constructors prints row '5 default'. Neither run is in data/cpp-ch21.json (elision_noelide.cpp is the only -fno-elide build).
   - fix: Capture trace_eight_noelide.cpp (byte-for-byte copy, -fno-elide-constructors, checked with data-same-src) and a bool_plus.cpp, or reword to 'would compile' / 'would stay a single default if you tried it'.
4. **[low] [content] panel 17 (ex-friend)** (content-cpp-19-21): Choice length bias: the correct option is by far the longest.
   - evidence: Plain-text option lengths: correct 80 vs 38/46/40. (INTEGRATION_TODO 'CHOICE LENGTH BIAS'.)
   - fix: Shorten to "No: an ordinary free function can use the public getters".
5. **[low] [content] panel 22** (content-cpp-19-21): 'Left: the normal build. Right: ...-fno-elide-constructors' is only true on wide screens: .pair2 stacks into one column at phone width.
   - evidence: assets/ext/cpp-ch21.css line 77 (inside the phone media query): `.pair2, .side, .stations { grid-template-columns: minmax(0, 1fr); }`. The two terminals already carry labels 'normal build' and '-fno-elide-constructors'.
   - fix: "First: the normal build. Then: the same source, built with `-fno-elide-constructors`..."
6. **[low] [content] panel 22** (content-cpp-19-21): Confusing link to the trace: 'Statement 5 deserves a closer look. build() makes a local gadget g and returns it', but statement 5 (make() returning Gadget{}) is the guaranteed-elision case, while elision.cpp shows the different, optional NRVO case. The Professor sorts it out only at the end.
   - evidence: trace_eight.cpp line 22: `Gadget make() { return Gadget{}; }`; elision.cpp lines 10-13: `Gadget g; return g;`.
   - fix: Open with: "Statement 5 returned a temporary, and nothing was copied. What if a function returns a named local instead? `build()` makes `g` and returns it."
7. **[low] [visual] panel 22 @390** (visual-cpp-21-25): The caption says 'Left: the normal build. Right: the same source, built with -fno-elide-constructors', but `.pair2` stacks to one column at 640px and below, so on phones there is no left or right.
   - evidence: ch21.html:572 caption; cpp-ch21.css:77 (`.pair2 … minmax(0,1fr)` at max-width 640px). The terminals are labelled 'normal build' and '-fno-elide-constructors' (.who). See the cross-cutting 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS' item. ch22 P26 ('the coat-check room on the right') has the same problem: on phones the memory stepper stacks the heap below the stack (crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-21-25/a22/sheets/w390-10.png).
   - fix: Before: 'Left: the normal build. Right: …' → After: 'The normal build, then the same source built with -fno-elide-constructors' (why: refer to the card headings, not positions).
8. **[low] [content] panel 26** (content-cpp-19-21): Sanitizer credited to the wrong chapter: 'Built with the Sanitizer's goggles on (Chapter 18)', while ch19 and ch20 say Chapter 11 introduced them (ch11 has 29 'goggles' mentions, ch18 has 3).
   - evidence: ch21 P26 caption; ch19 P21: "the thing Chapter 11 needed the Sanitizer's goggles to see"; ch20 P6/P27: "the sanitizer from Chapter 11".
   - fix: "(Chapter 11)" (or "Chapters 11 and 18").
9. **[low] [visual] panel 27 @1280 and 390** (visual-cpp-21-25): The sanitizer-report reader hard-codes its card look: `#FFFFFF`, `border-radius: 6px`, `box-shadow: 4px 4px 0 var(--ink)`. It doesn't use the tokens (`--background`, `--radius-md`, `--shadow-hard`) that the refreshed engine asks chapters to use. `.libnote` (ch22) and `.stations` (ch21) are also hand-rolled alert/card styles.
   - evidence: cpp-ch21.css:28, 54; cpp-ch22.css:37.
   - fix: Before: `background:#FFFFFF; border-radius:6px; box-shadow:4px 4px 0 var(--ink)` → After: `background:var(--background); border-radius:var(--radius-md); box-shadow:var(--shadow-hard)` (why: DESIGN_SYSTEM §2, so a later token change reaches every card).
10. **[low] [content] panel notebook (Lab, Try these)** (content-cpp-19-21): Lab step asks 'Which line breaks' after making operator<< return void, but two lines break (16 and 17).
   - evidence: Scratch build of point_print.cpp with `void operator<<` and no return: errors at 16:20 "invalid operands of types 'void' and 'const char [6]'" and 17:30 "invalid operands of types 'void' and 'char'".
   - fix: "Which lines break, and what does each message say the left side of the next `<<` is?"
11. **[low] [visual] panel pair2 terminals (ch21 22, ch24 12, ch25) @390 and 1280** (visual-cpp-21-25): `.pair2 .term { white-space: pre-wrap; overflow-wrap: anywhere }` is copied into four chapter stylesheets. It is the same kind of terminal override that the cross-cutting 'CHAPTER TERMINAL OVERRIDES' item asks fix agents to remove. In these chapters every pair2 terminal already has class="term wrap", so the rule is dead at best and lets non-wrap terminals break mid-token at worst.
   - evidence: cpp-ch21.css:13, cpp-ch23.css:16, cpp-ch24.css:13, cpp-ch25.css:16.
   - fix: Before: `.pair2 .term { white-space: pre-wrap; overflow-wrap: anywhere; }` → After: delete (why: the engine's .term.wrap/.wrap-sm handle these terminals with aligned carets).
12. **[low] [visual] panel picscroll panels (ch23 1, 15, 22, 26, 30; ch25 1, 3, 9, 17, 24, 32) @1280 and 390** (visual-cpp-21-25): Each chapter redefines `.picscroll`, which the engine now provides (promoted from cpp-ch21.css). ch23 and ch25 use a different phone width (min-width 600px instead of 560). On desktop their scroller is a tabindex=0 'group' with nothing to scroll: a dead tab stop. Its focus style (3px dashed ink) replaces the engine's 4px --ring outline.
   - evidence: cpp-ch21.css:90-94 and cpp-ch24.css (identical copies of comic-widgets.css:302-306); cpp-ch23.css:57-59 and cpp-ch25.css:57-59 (`.picscroll:focus-visible { outline: 3px dashed var(--ink) }`); ch23.html:78 etc. `tabindex="0" role="group"`.
   - fix: Before: `.picscroll:focus-visible { outline: 3px dashed var(--ink); outline-offset: 3px; }` plus the local .picscroll rules → After: delete them and keep the engine's .picscroll and focus ring (why: the component system owns focus states; one phone width across the book).

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch21 (New Words, Spare Keys)
- cpp-ch21 panel 1 shows g++'s full 368-line error on purpose (read the first error, then stop). Consider an engine fold for C++ candidate notes.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch21.css:13` `.pair2 .term`
- `cpp-ch21.css:47` `.vs td code, .vs th code`
