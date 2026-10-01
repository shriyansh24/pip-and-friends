# Fix bundle: cpp/ch10.html

10 review findings, 3 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [visual] panel 2, 4, 12, 20, 23, 24, 25 @390** (visual-cpp-6-10): At phone width the seven teaching drawings (660-unit `pic-wide` SVGs squeezed into ~320px) render their labels at 6.7–9.1px. P4 shows actual code (`#include "shout.h"`, `void shout(int times);`) at 7.2px, P12 `ORDER_H` at 6.7px, P23 `std::cout`/`std::cerr` buffer labels at 7.2–8.1px, P24 bisection labels at 7.2–7.7px, P25 the gdb remote's button names at 8.1px, P20 the strategy loop's sub-labels at 7.7px. You can't read them on a phone.
   - evidence: audit.js 390 small-text list (P4 13 labels at 7.2px; P12 7 at 6.7–8.6px; P20 11; P23 13; P24 6; P25 17; P2 12 at 8.6–10.5px). Crops: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a10/w390-008-p4.png, w390-022-p12.png, w390-037-p20.png, w390-042-p23.png, w390-044-p24.png, w390-046-p25.png, w390-005-p2.png. No cpp ch6–10 page uses the engine's `.picscroll` (grep: 0).
   - fix: Wrap each one as `<div class="picscroll"><svg class="fig pic-wide" …></svg></div>`, the engine feature for wide drawings on phones (AUTHORING 'Wide drawings on phones'). Below 640px the drawing then keeps 560px and scrolls with the swipe hint, which takes 7.2px labels to about 12.6px. P12's 6.7px `ORDER_H` also needs its SVG font-size raised from about 14 to 16 units.
2. **[medium] [visual] panel 27 @1280 and 390** (visual-cpp-6-10): The gdb walk-through's screen is set at `font-size: 0.74rem` (11.8px), under 12px at every width. Its lines wrap back to column 0 (`15      int bill = total_bill(12,` / `8);`), and paths break at hyphens (`/lib/x86_64-linux-` / `gnu/…`). Meanwhile the 1.4fr recipe column holds short lines and leaves empty space.
   - evidence: audit.js: P27 gdb lines at 11.8px at 1280 and 390. assets/ext/cpp-ch10.css:57–60 (`.walk.gdb-walk { grid-template-columns: minmax(0,1.4fr) minmax(0,1fr) }`, `.gdb-walk .gdb-screen pre { font-size: 0.74rem }`, `.gdb-walk .recipe li { font-size: 0.76rem }`). Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a10/w1280-048-p27.png
   - fix: `.gdb-walk .gdb-screen pre { font-size: 0.74rem }` → `0.875rem` (the engine's phone code size), and `.walk.gdb-walk { grid-template-columns: minmax(0,1.4fr) minmax(0,1fr) }` → `minmax(0,1fr) minmax(0,1.2fr)` (the screen holds the long lines). Run `L.hangLines()` on the screen's lines (or render them as `.tl` blocks) so wrapped gdb lines keep their indent. Delete `.gdb-walk .recipe li { font-size: 0.76rem }`.
3. **[low] [content] panel 12 (ex-odr-m)** (content-cpp-10-12): The multiple-definition predict comes before the panel that teaches multiple definition.
   - evidence: ex-odr-m (end of panel 12) expects the answer "multiple definition" and its explain ends "Next panel." Panel 13 then introduces the error. Before this, the term appears only as one chip in panel 9's machine.
   - fix: Keep it as a deliberate preview but say so in the prompt ("Guess before the next panel shows it"), or move it after panel 13 and make it about a different header.
4. **[low] [content] panel 29 (ex-tb-m / ex-sl-m)** (content-cpp-10-12): The trace exercise's explanation gives away the answer to the spot exercise directly after it.
   - evidence: ex-tb-m explain: "so biggest = i stores 0, the position, not the 3 ... biggest is following i, not the orders." The next exercise, ex-sl-m, asks the reader to click the guilty line (line 9, `biggest = i;`) of the same loop.
   - fix: End ex-tb-m's explain at the values ("0, 1, 2, 2, 4: does that look like the biggest order?") and keep the diagnosis for ex-sl-m.
5. **[low] [visual] panel 30 @390** (visual-cpp-6-10): The P30 `pic-mid` drawing labels (`food`, `next`, `leftover bits from before`, `line 9 has run`) render at 10.8–11.4px on phones.
   - evidence: audit.js 390 small-text: P30 5 labels at 10.8–11.4px. Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-6-10/a10/w390-055-p30.png
   - fix: Raise the SVG label font-size from about 13 to 15 units, or wrap the drawing in `.picscroll`.
6. **[low] [content] panel 35 (ex-b3-m)** (content-cpp-10-12): In the boss Parsons, `int total = 0;` also works above `int main() {`, but only the source order is accepted.
   - evidence: boss_parsons.cpp line 4 `int total = 0;`. Placed before line 3 it becomes a global with the same value, and the output ("after table 1: 4 ... Total: 24") is unchanged. The model has no "pin".
   - fix: Pin lines 1 and 3 ("pin": [1, 3]), so the first piece is fixed after `int main() {`.
7. **[low] [content] panel 6 (diner_steps terminal)** (content-cpp-10-12): The terminal shows `ls`, but the capture ran `ls -C`. Chapter 1 discloses this; Chapter 10's footer doesn't.
   - evidence: /home/you/cpp-ch10/diner_steps.cmd: displayed "ls", actually run "cd diner && cp ../diner_steps.cpp main.cpp && rm -f *.o diner && ls -C" and "ls -C". The captured output "kitchen.cpp  kitchen.o\tmain.cpp  main.o  menu.h" is the column layout; a piped plain ls prints one name per line. The footer mentions the copied files but not ls -C. ch1's footer does: "ls is run as ls -C, the side-by-side layout a terminal window shows".
   - fix: Add to the footer: "ls is run as ls -C, the side-by-side layout a terminal window shows."
8. **[low] [content] panel 8** (content-cpp-10-12): The clang++ link errors are called "word for word the same" as g++'s, but the machine-code offsets differ.
   - evidence: Panel 8: "so the complaints are word for word the same. Only the very last line changes". forgot.cpp: "main.cpp:6:(.text+0x2f)" and "main.cpp:7:(.text+0x71)". forgot_clang.cpp: "main.cpp:6:(.text+0x25)" and "main.cpp:7:(.text+0x63)".
   - fix: "the complaints are the same, apart from the (.text+...) positions inside the machine code. Only the very last line changes..."
9. **[low] [content] panel 9** (content-cpp-10-12): The Linker machine promises "two you haven't met yet" but holds three.
   - evidence: Panel 9: "Try them all, including two you haven't met yet." m-link examples not yet taught at panel 9: tip.cpp (panel 10), twice.cpp (panel 13) and twice_ok.cpp (panel 14).
   - fix: "including three you haven't met yet".
10. **[low] [visual] panel whole page (cpp-ch10.js)** (visual-cpp-6-10): cpp-ch10.js exists only to copy the `[data-same-src]` badge, which the engine now ships (comic-widgets.js:713). The badge is processed twice and the copy will drift.
   - evidence: assets/ext/cpp-ch10.js (22 lines, only the same-src block). The same copy is in cpp-ch7.js, cpp-ch9.js and the end of cpp-ch6.js (INTEGRATION_TODO 'From cpp ch10': 'Promote it', now done).
   - fix: Delete assets/ext/cpp-ch10.js and cpp-ch9.js and its script tags, and the same-src block in cpp-ch6.js (lines 259–266). In cpp-ch7.js keep only the Sanitizer drawing.

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch10 (Menus and Pause Buttons)
- Built from a template plus gen.py/build.py in the scratchpad, now archived in src/cpp/ch10-parts/. cpp/ch10.html is canonical.
- DONE (engine): `.checklist li` is no longer a two-column grid (each inline piece used to become a grid cell). Items with mixed inline content now lay out correctly; checked cpp ch10 at 390. Chapters that added `<span>` wrappers or local overrides (go ch16, rust ch16, rust ch18, ...) can drop them.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch10.css:13` `.pair2 .term`
- `cpp-ch10.css:37` `.vs td code`
