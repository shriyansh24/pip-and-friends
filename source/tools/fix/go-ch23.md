# Fix bundle: go/ch23.html

5 review findings, 1 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 12 @1280 and 390** (content-go-22-24): The read-list says "Left:" and "Right:", but the two runs sit in a .pair.stack, which is one column at every width, so they are top and bottom.
   - evidence: Lines 283 to 289: <div class="pair stack"> … "Left: fee_test.go:7 twice" … "Right: fee_test.go:14 and fee_test.go:15"; assets/ext/go-ch23.css line 48: ".pair.stack { grid-template-columns: minmax(0, 1fr); }". Same pattern as the cross-cutting LEFT/RIGHT item in INTEGRATION_TODO.
   - fix: Use the card labels: "Without t.Helper(): fee_test.go:7 twice" and "With t.Helper(): fee_test.go:14 and fee_test.go:15".
2. **[medium] [content] panel 30 (and exercise ex-stopwatch-m after panel 31)** (content-go-22-24): The stopwatch-race drawing labels the five rounds 1, 100, 10 000, 1 000 000 and 4 800 000 laps: that is the whole N column of the later trace exercise, so the answer is given away. The drawing also doesn't fit Fee(8), which the caption says takes about a nanosecond (the 4.8 million figure comes from the exercise's pretend 250 ns cost).
   - evidence: Panel 30 svg text: "round 1: 1 lap / round 2: 100 laps / round 3: 10 000 laps / round 4: 1 000 000 / round 5: 4 800 000 laps, past the line: stop"; caption: "How long does Fee(8) take? About a nanosecond". stopwatch.go output: "1 1 250 / 2 100 25000 / 3 10000 2500000 / 4 1000000 250000000 / 5 4800000 1200000000". The real bench run gave BenchmarkFee-2 1000000000 laps.
   - fix: Make the drawing generic: label only rounds 1 to 3 (1, 100, 10 000) and then "…" up to a lane that crosses the 1-second line, with no lap count on the last lane. Or keep the numbers in the drawing and change the exercise's pretend cost (for example 400 ns), so the picture and the trace differ.
3. **[low] [content] panel 12** (content-go-22-24): The caption says the two files are identical except for line 6, but helper_yes.go has an extra line, so every line after it moves down by one (the calls are lines 11 to 13 in one file and 13 to 15 in the other).
   - evidence: Line 282: "The two files are identical except for line 6." helper_no.go: line 6 is `if got := Fee(kg)…`, checkFee calls on lines 11 to 13; helper_yes.go: line 6 is `t.Helper()`, calls on lines 13 to 15.
   - fix: "The second file adds one line, line 6: t.Helper()."
4. **[low] [visual] panel 2 (test-tube rack drawing) @390** (visual-go-21-25): In the rack drawing the tube labels, weights and 'kg' render at 10.7-11.5px on phones, even inside the sideways-scrolling box.
   - evidence: Audit small text at 390: 'feather', 'shoebox', 'edge of five', 'anvil', '1' '3' '5' '10' at 11.5px and 'kg' at 10.7px (`font-size="13"` group, ch23.html:97; `.pic-scroll .pic-wide { min-width: 560px }`). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a23/w390-005-p2.png.
   - fix: Raise the drawing's small labels from 13 to 15-16 SVG units (or the phone min-width from 560px to 640px), so they render ≥12px.
5. **[low] [visual] panel exercise after P28 (put the lines in order) @1280** (visual-go-21-25): Line 10 of the parsons puzzle, the stub's construction `var c Clock = stubClock{time.Date(2026, 11, 8, 7, 30, 0, 0, time.UTC)}`, is cut off under the arrow buttons at desktop width, so the learner can't see the end of the line it must place.
   - evidence: Audit at 1280: text ', time.' / 'UTC)}' overlapped by the ↑/↓ buttons (scroller `code` inside the parsons line, no visible affordance). The engine wraps parsons lines only below 640px. Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/c23-ex28.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a23/w1280-045-main-after-p28-ex-card.png).
   - fix: Split the composite literal over two source lines in the program (e.g. `t := time.Date(2026, 11, 8, 7, 30, 0, 0, time.UTC)` then `var c Clock = stubClock{t}`) and recapture, or ask the engine to apply the phone hanging-indent wrap to parsons lines at every width.

## INTEGRATION_TODO lines naming this chapter
- ## From go ch23 (The Test Lab)

## Engine-refresh clean-ups for this chapter
- `go-ch23.js:131`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch23.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
