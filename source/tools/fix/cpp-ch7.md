# Fix bundle: cpp/ch7.html

8 review findings, 6 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 2, 18, 21, 29, 36 @390** (visual-cpp-6-10): Five key teaching drawings shrink below readable size on phones: the vending-machine function (P2, 10.5–11.5px), pass-by-value photocopy (P18, `add_bonus()` 8.1px, `score` 8.6px), the call-stack pile (P21, `paused on line 14`, `qty 3 · each 20 · subtotal 60` at 9–9.5px), the house of scopes (P29, `apples`/`pears`/`flowers` 8.6px, 'a block' smaller) and the namespace name tags (P36, `kitchen::count` 9.6px).
   - evidence: audit.js 390 small-text: P2 8, P18 7, P21 10, P29 11, P36 6 labels under 12px. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a7/w390-005-p2.png, w390-029-p18.png, w390-033-p21.png, w390-047-p29.png, w390-060-p36.png
   - fix: Wrap each `pic-wide` SVG in `<div class="picscroll">` (engine: 560px on phones, swipe hint). That alone takes 8.6px to about 15px. P21's SVG is 600 units, so it also fits at 560.
2. **[low] [visual] panel 12 @1280 and 390** (visual-cpp-6-10): The Linker's `LINK` badge renders at 10.5px (also in cpp ch10 P6, P7, P10 and P13).
   - evidence: audit.js: 'LINK' at 10.5px at both widths in ch7 P12 and ch10 P6/P7/P10/P13. This is the same class as the Compiler's `g++` badge (5.6–9.9px here), which rs review already filed as an engine finding for `rustc`.
   - fix: Fix with the engine Compiler badge: draw the name badge with an SVG font-size that gives ≥12px at the character's smallest drawn size, or drop the badge text when the character is drawn under about 120px.
3. **[low] [visual] panel 13 @390** (visual-cpp-6-10): In the declaration-vs-definition table, `.vs td code { overflow-wrap: anywhere }` splits signatures mid-token on phones (`int` / `half(int` / `n);`, `return n /` / `2; }`), so the two columns' code is hard to compare.
   - evidence: assets/ext/cpp-ch7.css:37 (the same rule is in cpp-ch9.css:33 and cpp-ch10.css:37). Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a7/w390-022-p13.png
   - fix: `.vs td code { overflow-wrap: anywhere }` → `.vs td code { white-space: nowrap }`. The table already sits in `.vswrap { overflow-x: auto }`, so it scrolls instead of shredding the code.
4. **[low] [content] panel 33** (content-cpp-7-9): The Professor says 'Three machines changed lives', but global.cpp has only two machines that change it (fall_in_pit and find_potion). They are called three times.
   - evidence: ch7.html:843 "Three machines changed lives." global.cpp lines 18-20: fall_in_pit(); find_potion(); fall_in_pit();
   - fix: 'Three calls, from two machines, changed lives.'
5. **[low] [content] panel 39** (content-cpp-7-9): The Compiler's bubble uses the word 'templates' without defining it. The term is first defined in Chapter 8, panel 22.
   - evidence: ch7 panel 39: "The note: candidates are lines list everyone called count: two templates from deep inside the library, then your int count on line 5." ch8 panel 22: "A vector is a template: one design, many carton types."
   - fix: 'two library machines from deep inside <algorithm>' (or add a one-line definition).
6. **[low] [visual] panel 43 @390** (visual-cpp-6-10): The teaser's egg-carton indices 0–5 render at 10.3px on phones.
   - evidence: audit.js 390: P43 6 labels at 10.3px. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a7/w390-075-p43.png
   - fix: Raise the index font-size in the teaser SVG from about 12 to 15 units.
7. **[low] [content] panel notebook: Under the hood ('How arguments and results travel')** (content-cpp-7-9): The calling-convention sentence applies the x86-64 System V rules to all '64-bit Linux and macOS'. Apple Silicon Macs (and ARM64 Linux) use the AArch64 convention: eight argument registers, with the result in x0/w0, not rax. Also, an int result comes back in eax, the low half of rax.
   - evidence: ch7.html:1066 "On 64-bit Linux and macOS (the System V convention), the first six whole-number arguments travel in processor registers rather than in memory, and an int result comes back in a register called rax."
   - fix: 'On x86-64 Linux and Intel Macs (the System V convention) ... an int result comes back in eax (part of rax). ARM64 machines, such as Apple Silicon Macs, use eight argument registers instead.'
8. **[low] [content] panel notebook: Under the hood ('How can two machines share a name?')** (content-cpp-7-9): The notebook says the return type is left out of the mangled name and that this is why functions can't be overloaded on return type alone. That reverses cause and effect: the language rule (overloads must differ in their parameters) comes first, and the mangling scheme follows it.
   - evidence: ch7.html:1072 "The return type is not part of the mangled name, which is why two functions that differ only in their return type can't be overloaded."
   - fix: 'The return type is not part of the mangled name: C++ never chooses an overload by return type, so it doesn't need to be.'

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch7 (Machines in Many Rooms)
- The cpp-ch7 value boxes may now use the engine's value-box `label` (added after ch7). Check whether ch7 would read better with it.
- Recurring across rust ch8/ch9, go ch9 and cpp ch7: hand-drawn SVG figures and the tracer shrink to 10–13px text on phones. The fix swarm should add a shared wide/narrow figure helper, or a minimum-text rule for figures.
- The `data-same-src` badge is now copied into cpp-ch7 and cpp-ch9. Promote it into the engine (already listed) and remove the copies.
- `data-same-src` is copied a third time (cpp-ch7, ch9, ch10). Promote it.
- `data-same-src` is promoted to the engine. Remove the copies from cpp-ch7, ch9, ch10, ch11 and ch12 extensions.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch7.css:13` `.pair2 .term`
- `cpp-ch7.css:37` `.vs td code`
