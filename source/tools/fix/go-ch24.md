# Fix bundle: go/ch24.html

14 review findings, 5 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 10** (content-go-22-24): The page says the four rounds gave four different orders, but the captured run shows only two orders, each printed twice.
   - evidence: Page (line 233): "Four rounds, four different orders, from the same code." data/go-ch24.json order.go stdout: "round 1: 0 4 2 1 3 \nround 2: 0 4 2 1 3 \nround 3: 1 4 0 3 2 \nround 4: 1 4 0 3 2 \n".
   - fix: Word it so it holds for any run of a .nondet program: "Four rounds of the same code, and the order changed partway through. Run it again and you'll get others." (Or recapture, but the wording should not depend on one run, per the 'Showing variation' house rule.)
2. **[high] [content] panel 36 (exercise ex-sel-m)** (content-go-22-24): The explanation says the book's capture of select_once.go printed apple; the primary (Go 1.27.3) capture printed banana. Only the Go 1.24.7 secondary run printed apple.
   - evidence: ex-sel-m correct option why: "(This book's capture happened to print <samp>apple</samp>.)" data/go-ch24.json select_once.go stdout: "banana\n"; alt (Go 1.24.7) stdout: "apple\n".
   - fix: Drop the run-specific sentence (select_once.go is .nondet), or change it to: "(This book's two toolchains happened to print different ones: banana on Go 1.27.3, apple on Go 1.24.7.)"
3. **[high] [content] panel 9** (content-go-22-24): Scoot misquotes the captured run: the page says the helpers finished pie, soup, salad, but the real run shown on that panel printed pie, salad, soup.
   - evidence: Page (line 220): "Look at the order: pie, soup, salad. Not the order of the loop!" data/go-ch24.json wg_basic.go stdout: "helper finished pie\nhelper finished salad\nhelper finished soup\nall dishes ready\n".
   - fix: "Look at the order: pie, salad, soup. Not the order of the loop!" Better, so a recapture can't break it again: "Look at the order: it isn't the order of the loop!" (wg_basic.go is .nondet).
4. **[medium] [content] panel 10 (and notebook 'Goroutines, threads and the scheduler')** (content-go-22-24): The page states a real result that was never captured: an earlier version without chop "printed 4 0 1 2 3 four times in a row on this machine". The notebook then cites it as "panel 10's 4 0 1 2 3", but panel 10 shows no such run.
   - evidence: Line 235: "an earlier version without the chopping printed <samp>4 0 1 2 3</samp> four times in a row on this machine"; notebook: "which is why tiny programs so often run the last goroutine started first (panel 10's 4 0 1 2 3)". No program in data/go-ch24.json prints that; order.go printed "0 4 2 1 3" and "1 4 0 3 2".
   - fix: Capture the no-chop variant as its own .nondet program (e.g. order_quick.go) and show it as "one possible run" beside order.go. Or reword both places as clearly not run: "Without the chopping, tiny goroutines often run in a habitual order, newest first (try it in the lab)", and drop "panel 10's 4 0 1 2 3".
5. **[medium] [content] panel 34** (content-go-22-24): switch is credited to chapter 6 (loops), but chapter 5 teaches it (Part 5, 'Doors: switch, default and fallthrough').
   - evidence: Page (line 766): "<code>select</code> looks like <code>switch</code> (chapter 6)". go/ch5.html part heading: "PART 5 · DOORS switch, default and fallthrough"; ch6 parts are loops and arrays.
   - fix: "(chapter 5)".
6. **[medium] [content] panel 8** (content-go-22-24): defer is credited to chapter 19, but chapter 14 teaches it (Part 5, 'Sticky notes on the door: defer').
   - evidence: Page (line 197): "Usually written <code>defer wg.Done()</code> (chapter 19)". go/ch14.html part heading: "PART 5 · STICKY NOTES ON THE DOOR defer: do this on the way out".
   - fix: "(chapter 14)".
7. **[medium] [book] panel 8, 14, 34** (book-go): Three back-references in ch24 point to the wrong chapters: defer is credited to chapter 19, panics to chapter 19, and switch to chapter 6.
   - evidence: Panel 8: 'Usually written defer wg.Done() (chapter 19)'; panel 14: 'it panics (stops the program with a message, chapter 19)'; panel 34: 'select looks like switch (chapter 6)'. defer is ch14 (recap 'LAST STUCK, FIRST DONE'), panics are introduced in ch1/ch8 (ch14 'panicking on purpose'), switch is ch5 ('ONE DOOR, ONE ROOM').
   - fix: Panel 8 '(chapter 14)'; panel 14 '(chapter 8)'; panel 34 'switch (chapter 5)'.
8. **[low] [visual] panel 11 (clipboard counter tracer) @390** (visual-go-21-25): Tracer line 16 `ready[i] = d + " ✓"` wraps at the space inside the string literal on phones, leaving `d + "` on one row and `✓"` on the next, which looks like two strings.
   - evidence: Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/c24-p11a.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a24/w390-018-p11.png). Engine hangLines breaks at every space, including inside string literals (related to the visual-rs-1-5 engine finding about breaks after `{` inside strings).
   - fix: Engine: treat a string literal as one token for break opportunities (no `<wbr>`/space breaks between its quotes), and only break inside it when the literal alone is longer than the line.
9. **[low] [content] panel 14 vs footer** (content-go-22-24): Panel 14 says the hex arguments change because Go places memory at a random spot each time, while the footer says runs happen 'with address randomisation off'. Both are true (the OS's ASLR is off, but Go itself randomises its heap base), but side by side they read as a contradiction.
   - evidence: Line 303: "Go places memory at a random spot each time"; line 1074: "address randomisation off". Go 1.27.3 src/internal/buildcfg/exp.go: "RandomizedHeapBase64: true". negative.go's two records show Add(0x304533888020…) and Add(0x306938c06020…).
   - fix: In the footer: "with the operating system's address randomisation off (Go still randomises where its own heap starts, which is why negative.go's addresses vary)".
10. **[low] [content] panel 4, 6, 13, 36 and footer** (content-go-22-24): The footer says eight programs are marked 'one possible run', and panel 4 says nothing.go 'is marked as varying', but the data file flags only four. capture.py sets nondeterministic only when its two runs happen to differ, so nothing.go, missing_wait.go, speed.go and select_once.go (all with .nondet sidecars) carry no flag, and the checker and the NONDET audit can't see them.
   - evidence: /home/you/go-ch24 has 8 .nondet files; data/go-ch24.json flags only negative.go, order.go, select_random.go and wg_basic.go. tools/capture.py lines 438 to 441: the flag is set only inside "if a != b:". INTEGRATION_TODO (js ch24 / go ch24) also says 8.
   - fix: In capture.py, set entry["nondeterministic"] = True whenever the .nondet sidecar exists, not only when the two runs differ, then recapture go 24. (This is an engine change, so it goes to the engine round.)
11. **[low] [visual] panel ch24 P18, P34; ch25 P3, P21 @390** (visual-go-21-25): The wide drawings in the engine `.picscroll` scroll sideways on phones with no hint, so the right half (e.g. the 'RECEIVE, NOTHING THERE' card in ch24 P18) looks cut off.
   - evidence: Audit scrollers at 390: `div.picscroll` in ch24 P18, P34 and ch25 P3, P21; no 'sideways'/'swipe' text anywhere in either page (grep), unlike ch23, which prints 'Slide the picture sideways to see all of it.' under each `.pic-scroll`. Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a24/w390-030-p18.png.
   - fix: Add a `<p class="swipe-hint">Slide the picture sideways to see all of it.</p>` after each `.picscroll` (shown only below 640px), or better, have the engine's `.picscroll` print the same 'Swipe sideways' hint the tracer prints.
12. **[low] [visual] panel ch24 P2, P5, P19; ch25 P1, P25 @390 (and 1280)** (visual-go-21-25): The helper numbers on the kitchenhand critters (which helper is which: 1, 2, 3, W1-W3) render at 9.9px on phones and 11.9px at desktop, because the helpers are drawn at `.char.sm` (70-84px).
   - evidence: Audit small text: ch24 P2 '1' '2' '3' 9.9px, P5 '1' 9.9px, P19 '1' 10.2px; ch25 P1 '1'-'4' 9.9px, P25 'W1' 'W2' 'W3' 9.9px (11.9px at 1280). `.helpers-row .char.sm { width: 84px }` / 70px on phones (go-ch24.css:51, :124; go-ch25.css:73, :146). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a24/w390-005-p2.png.
   - fix: Before → After (why): `.helpers-row .char.sm { width: 70px }` (phones) → `width: 96px` and let the row wrap, or print the number under each helper as HTML text (a label that tells helpers apart is content and must be ≥12px).
13. **[low] [book] panel notebook (Under the hood, deadlock detection)** (book-go): ch24 promises that chapters 25 and 28 come back to the goroutineleak profile, but chapter 28 never mentions leaks.
   - evidence: ch24: 'Go 1.27 made a goroutine leak profile generally available for finding such goroutines; chapters 25 and 28 come back to it.' grep -c -i 'leak' go/ch28.html = 0; ch25 Part 6 covers it.
   - fix: 'chapters 25 and 28 come back to it' → 'chapter 25 comes back to it'.
14. **[low] [content] panel notebook: 'How "all goroutines are asleep" is noticed'** (content-go-22-24): The notebook promises that chapters 25 and 28 come back to the goroutine leak profile. Chapter 25 does, but chapter 28 never mentions goroutineleak or leaks.
   - evidence: Line 946: "Go 1.27 made a goroutine leak profile generally available …; chapters 25 and 28 come back to it." grep: go/ch25.html has 12 'goroutineleak' mentions; go/ch28.html has 0 for 'goroutineleak' and 0 for 'leak'.
   - fix: "chapter 25 comes back to it".

## INTEGRATION_TODO lines naming this chapter
- ## From js ch24 / go ch24
- go ch24: wg.Go (Go 1.25+) fails on 1.24 (real run shown); 8 goroutine programs are .nondet. `kitchenhand` and `mailcarrier` are new distinct names (grep-checked).
- `kitchenhand` promoted to comic-critters.js (was copied in go-ch24/25/26). Remove the copies in the fix round.
- NONDET VALUES QUOTED IN PROSE (high class): go ch24 P9/P10 and ex-sel-m quote specific orders that don't match the captured run, or come from the other toolchain. Rule for the fix round: prose must never state a `.nondet` program's concrete output except as "this run printed X", with X taken from the data at build time (or simply not quoted). Also capture.py: mark nondet from the `.nondet` sidecar ALWAYS, not only when two runs differ (go ch24 has 4 of 8 unflagged).
- ENGINE PASS 2, more: (k) a generic "current line" rule: any `li.now [class^="tok-"]` → ink (go ch24/25 steppers have blue on yellow at 6.49:1); (l) "Step 1 of 7" counter wraps (go ch21 P32); (m) picscroll swipe hint missing where chapters roll their own.

## Engine-refresh clean-ups for this chapter
- `go-ch24.js:187`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
