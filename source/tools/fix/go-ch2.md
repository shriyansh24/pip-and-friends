# Fix bundle: go/ch2.html

10 review findings, 0 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 22 (also 12)** (content-go-1-3): The detective checklist says a bare file.go with no # header means go vet, and panel 12 says vet's lines have no header and no ./. Panel 21 then shows go vet output with two # headers and ./main.go, and panel 11 shows gofmt (not vet) printing a bare main.go:6:21.
   - evidence: P22: "A # header and ./file.go means the Compiler. A bare file.go with no header means go vet." P12: "Vet's lines have no # header and no ./." P21 terminal (s_vetsyntax.go, captured): "# example/sums\n# [example/sums]\nvet: ./main.go:6:21: missing ',' in argument list". P11 (s_fmtbroken.go): "main.go:6:21: missing ',' in argument list" from gofmt -l.
   - fix: P12: "For a suspicious-code finding, vet prints no # header and no ./." P22 item 1: "A line starting with vet: or a bare main.go after go vet means vet. A # header plus ./file.go after go build or go run means the Compiler. A bare file name after gofmt means Tidy."
2. **[medium] [content] panel 39 and notebook: Under the hood** (content-go-1-3): Promises that chapter 3 shows a zero sneaking in at run time and a run-time division panic. Chapter 3 has neither; the panic first appears in chapter 4.
   - evidence: P39: "In chapter 3, numbers will come from named boxes, and a zero can sneak in at run time instead." Notebook: "A divisor that is only known at run time can be zero, and then the program panics (chapter 3 onwards)." grep: go/ch3.html has no 'panic' or 'divide by zero'; go/ch4.html line 551 shows "panic: runtime error: integer divide by zero".
   - fix: P39: "Once numbers come from named boxes (chapter 3), a zero can sneak in at run time instead; chapter 4 shows the crash." Notebook: "(chapter 4 shows it)".
3. **[medium] [visual] panel 5, 13 (error-address lens) @1280 and 390** (visual-go-1-5): On the 'line', 'column' and 'message' steps of the editor lens, the red ✗ next to the line number sits on the cream highlight of the hot line, a 6.7:1 pair that breaks the 7:1 rule (DESIGN_SYSTEM: destructive text on paper only).
   - evidence: Measured on steps 4-6 of P5: `.ed-lines .ln .x` color rgb(176,0,32) on `li.hot` background rgb(255,246,204). Rules: assets/ext/go-ch2.css:70 and :72. Crop of step 5: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-1-5/ev/ch2-p5-editor-step5-390.png.
   - fix: Before → After (why): `.ed-lines li.hot .ln .x { color: var(--error) }` (inherited) → `.ed-lines li.hot .ln .x { color: var(--ink); }` or keep the ✗ red but give `.ln` a paper background on hot lines (red text is 7.3:1 on paper only; the ✗ shape already carries the meaning).
4. **[medium] [content] panel ex-paren (after panel 41)** (content-go-1-3): A choice explanation refers to option position, but options are shuffled.
   - evidence: ex-paren-m, option `fmt.Println(10 + (2 / 4))` why: "The parentheses are around the wrong part: it's the same as the line above."
   - fix: "... it's the same as <code>10 + 2 / 4</code>: 2 / 4 is 0, so the answer is just 10."
5. **[medium] [content] panel notebook: In real programs** (content-go-1-3): Wrong cross-reference: go test is credited to chapter 16, but it is taught in chapter 15. Chapter 16 is the capstone.
   - evidence: "go test (chapter 16) automatically runs a small set of vet's checks". go/ch15.html Part 5 "THE ANSWER KEY ... go test" and Panel 34 "vet stops the test before it runs"; go/ch16.html is "The Heist Plan".
   - fix: Change "(chapter 16)" to "(chapter 15)".
6. **[low] [content] panel 28** (content-go-1-3): Misremembers panel 17: Scoot wanted to print Hi, Sam (no quotes), but panel 28 says panel 17's output was meant to be Hi, "Sam".
   - evidence: P17 ed-quotes step 1: "Scoot wanted to print <samp>Hi, Sam</samp>, but typed an extra \" in the middle." P28: "That's how panel 17's <samp>Hi, \"Sam\"</samp> could have worked: \"Hi, \\\"Sam\\\"\"."
   - fix: "And if Scoot had wanted to print <samp>Hi, \"Sam\"</samp> in panel 17, this is how: ..."
7. **[low] [content] panel 40** (content-go-1-3): 'Equals go left to right' is ambiguous for beginners who have just met = and could read it as the equals sign. It means operators of equal precedence.
   - evidence: P40 caption: "* / % go before + -. Equals go left to right. ( ) beat everything." Recap: "equals left to right".
   - fix: "Operators of the same strength go left to right." (and the same in the recap)
8. **[low] [visual] panel 7, 9, 11, 41 (Tidy and Specs) @1280 and 390** (visual-go-1-5): go-ch2.js redefines the Tidy (gofmt) and Specs (go vet) characters unconditionally, replacing the shared drawings in comic-critters.js that the rest of the Go book uses; ch4 guards its copy with `if (!L.cast.specs)`.
   - evidence: assets/ext/go-ch2.js:25 `L.cast.tidy = …` and :42 `L.cast.specs = …` vs comic-critters.js:219 and :236; go/ch2.html loads comic-critters.js first (line 17) then go-ch2.js (line 19), so the chapter copy wins.
   - fix: Delete go-ch2.js section 1 (lines 19-64) so the engine's shared characters draw, then re-check P7/P9/P11/P41 at both widths.
9. **[low] [content] panel choice exercises** (content-go-1-3): Choice length bias: the correct option is clearly the longest in ex-squiggle, ex-whichtool and ex-b6.
   - evidence: Plain-text lengths, correct option first: ex-squiggle [101, 36, 20, 19], ex-whichtool [71, 12, 12, 39], ex-b6 [86, 50, 17, 53].
   - fix: Shorten the correct options (e.g. ex-squiggle: "gopls spotted a likely mistake there") and move the explanation into why.
10. **[low] [book] panel notebook (Under the hood; In real programs)** (book-go): Chapter 2 says go test is chapter 16, but go test (and vet running inside it) is taught in chapter 15; ch16 never mentions vet.
   - evidence: ch2: 'go test (chapter 16) automatically runs a small set of vet's checks'. ch15 panel 34 'vet stops the test before it runs'; grep -c -i vet go/ch16.html = 0. Same list: 'the program panics (chapter 3 onwards)', but the first run-time divide-by-zero panic is ch4 (grep 'divide by zero' ch3 = 0).
   - fix: '(chapter 16)' → '(chapter 15)'; '(chapter 3 onwards)' → '(chapter 4 shows one)'.

## Engine-refresh clean-ups for this chapter
- `go-ch2.js:212`
- `go-ch2.js:268`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `go-ch2.css:46` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
