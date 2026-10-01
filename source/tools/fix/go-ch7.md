# Fix bundle: go/ch7.html

11 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 12, 14, 15, 40 @1280 and 390** (visual-go-6-10): Every file tab inside a two-program pair is cut along its bottom edge: the code box paints over the lower part of the tab text ("args_few.go", "args_type.go" lose their descenders and underscores).
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p12-1280.png (top). Cause: go-ch7.css `.pair > * { display: grid; gap: 8px }` + engine `.file-tab { margin-bottom: -14px }` (comic.css:176): the grid gap replaces the margin collapse, so the <pre> overlaps the tab by 6px. Same root cause as visual-rs-1-5's rust ch4 finding.
   - fix: Before: `.pair > * { min-width: 0; display: grid; gap: 8px; align-content: start; }` → After: `.pair > * { min-width: 0; }` and space the terminal with `.pair .term { margin-top: 8px }` (why: in block flow the tab's negative margin tucks it onto the code box as everywhere else).
2. **[medium] [visual] panel 2, 17, 22 @390 (P2 also 1280)** (visual-go-6-10): Three teaching pictures put their key labels in 7.6-11px text on phones: P2's slot label "km int" (7.6-8.9px) and "fee(3)" (9.6px), P17's drawer labels "each"/"left" (9.6px) and "17 / 5, 17 % 5" (11px), P22's "copy" (9.6px), "addBonus" and "WORKS ON THE COPY" (11px). P2's "int" is 11px even at 1280.
   - evidence: Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p2-390.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p2-1280.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p17-390.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p22-390.png. Audit at 390: km 8.9, int 7.6, fee(3) 9.6, each/left 9.6, copy 9.6px. Source: go/ch7.html L76 (font-size 11 on 'int'), L385, L498 (font-size 14).
   - fix: Before: `font-size="11"`/`"14"` labels in 460-wide pic-mid drawings → After: >=18 units, or wrap the drawing as `<div class="picscroll"><svg class="fig pic-wide">` (why: AUTHORING 'Wide drawings on phones'; a 460-unit drawing shown at ~318px needs >=17.4 units for 12px).
3. **[medium] [visual] panel 36 @390 (also 1280)** (visual-go-6-10): Penny's complaint slip, the whole point of the "abc" card, is labelled "abc?" in 7.8px text on phones (9.7px at 1280); the 42 number box label is 13 units for 4+ characters too.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch7-p36-390.png. Audit: svg text 'abc?' 7.8px at 390, 9.7px at 1280. Source: assets/ext/go-ch7.js slip label `font-size="11"`, box label `label.length > 3 ? 13 : 18`, character drawn at 120px (`.clerk-cards .card-scene .char` at <=640px).
   - fix: Before: slip label `font-size="11"` → After: `font-size="16"` with labels kept to 4 characters, and `@media (max-width:640px){ .clerk-cards .card-scene { grid-template-columns: minmax(0,1fr) } .clerk-cards .card-scene .char { width: 170px; justify-self: center } }` (why: at 170px the 170-unit drawing is 1:1, so 16 units = 16px).
4. **[medium] [content] panel after 21 (ex-multi)** (content-go-7-9): The hint and explanation point at the wrong line number for the second swap.
   - evidence: Hint: "Line 11 swaps the already-swapped pair." Explain: "Line 11 feeds those back in ... (Line 11 uses =, because x and y already exist.)". In predict_multi.go, line 11 is `fmt.Println(x, y)` and line 12 is `x, y = swap(x, y)`.
   - fix: Change 'Line 11' to 'Line 12' in the hint and in both places in the explain.
5. **[medium] [content] panel after 45 (ex-b1, Boss 1)** (content-go-7-9): The hint asks which box line 13 changes, but line 13 only prints.
   - evidence: Hint: "Which of main's boxes does line 13 change?" In boss_predict.go, line 12 is `m := bump(n)`, line 13 is `fmt.Println(n, m)` and line 14 is `n = bump(m)`.
   - fix: "Which of main's boxes does line 12 change? And line 14?"
6. **[medium] [book] panel ch7 recap, ch13 recap and Part 1, ch26 panel 21** (book-go): 'Slip' means three different things: an error (ch7's complaint slip, ch8 teaser), a pointer (ch13 onward) and an HTTP request (ch26), so recap catchphrases clash for a beginner.
   - evidence: ch7 recap 'READ THE SLIP FIRST ... When there's a slip, the number is junk.'; ch7 glossary 'error: Go's type for a complaint slip'; ch7 teaser 'every slip gets read before the parcel is opened'. ch13 recap 'COPY A SLIP, SHARE A HOUSE' and 'A BLANK SLIP LEADS NOWHERE' (pointer); ch17 'chapter 13's blank slip'. ch26 panel 21 'REQUEST · the order slip'. ch8 already renames the error idea to 'receipt' ('In chapter 7, Penny the clerk handed back a number box and a slip').
   - fix: Keep 'slip' for pointers (ch13's model, used most: 187 times). In ch7 call the error a 'complaint note' or use ch8's 'receipt' (recap: 'READ THE RECEIPT FIRST'); in ch26 say 'order ticket'.
7. **[low] [content] panel 3** (content-go-7-9): The bubble says len has been used since chapter 1, but the Go book first uses len in chapter 6.
   - evidence: "You've been using machines since chapter 1: fmt.Println is one, and so is len." grep: 'len' does not appear at all in go/ch1–ch5.html. len( first appears in go/ch6.html (9 times).
   - fix: "fmt.Println since chapter 1, and len since chapter 6."
8. **[low] [content] panel 45 (boss level)** (content-go-7-9): The boss level skips the second half of the chapter: no boss check uses strconv.Atoi, the error slip, bufio.Scanner or os.Args.
   - evidence: Boss 1 is call by value, Boss 2 two results, Boss 3 int division, Boss 4 Scan plus stamps, Boss 5 named results, Boss 6 Scan leftovers. Part 6 (the clerk) is the chapter's payoff and isn't tested at boss level.
   - fix: Replace one boss item (for example Boss 3) with a predict on an Atoi plus slip program (e.g. two Atoi calls, one bad, printing the sum and both slips), or a trace over `go run x.go < file` lines with Atoi.
9. **[low] [book] panel Part 5 heading** (book-go): The Part 5 heading promises files, but ch7 only feeds a file through the shell's < redirect; the TOC entry for the same part leaves files out and ch8 says files are chapter 14.
   - evidence: ch7 part-h: 'PART 5 · THE MAIL SLOT Input: Scan, bufio.Scanner, files and os.Args'; TOC: 'The mail slot: Scan, bufio.Scanner, os.Args and TrimSpace'. No os.Open/ReadFile in ch7. ch8: '(Files properly are chapter 14...)'.
   - fix: Heading → 'Input: Scan, bufio.Scanner, redirects and os.Args'.
10. **[low] [content] panel choice exercises** (content-go-7-9): In every choice exercise, the correct option is the longest one.
   - evidence: Text lengths with the correct option first: ex-param [41,18,5,17], ex-named [45,45,8,18], ex-scope [76,37,42,33], ex-amp [74,35,39,43], ex-scanletters [55,18,34,18]. This is new data for INTEGRATION_TODO 'CHOICE LENGTH BIAS'.
   - fix: Shorten the correct options, or lengthen one or two distractors, e.g. ex-scope correct: "Only bill can use tip, and it vanishes when the call ends".
11. **[low] [content] panel footer** (content-go-7-9): The footer's program count doesn't match the capture.
   - evidence: Footer: "73 programs were captured". data/go-ch7.json holds 75. parsons_scan.go is captured but used nowhere on the page, and doc_atoi.go is a placeholder whose terminal shows `go doc strconv.Atoi`.
   - fix: Say 75, or remove parsons_scan.go and recapture. Optionally add doc_atoi (panel 21's `go doc`) to the footer's list of panels that show real typed commands.

## INTEGRATION_TODO lines naming this chapter
- [go7] Penny the clerk (data-char=clerk, strconv) in ext/go-ch7.js.

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `go-ch7.css:42` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
