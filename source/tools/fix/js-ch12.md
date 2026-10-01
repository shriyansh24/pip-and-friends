# Fix bundle: javascript/ch12.html

9 review findings, 4 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[low] [content] panel 10** (content-js-10-12): The prose says column 15 is 'the dot before row', but column 15 (and the caret) is the r of row. ch11 P21 has the same slip ("the caret under .city").
   - evidence: crash_ticket.js line 2 is "  return seat.row + seat.number;". Column 15 (1-based) is 'r', because the dot is column 14. The captured caret line has 14 spaces before ^. Page: "Line 2, column 15: the dot before row, right where the caret points." ch11 P21 similarly says "the caret under .city", where column 51 is the c of city.
   - fix: Change it to "Line 2, column 15: the start of row, right where the caret points." (ch11 P21: "the caret under city").
2. **[low] [content] panel 13** (content-js-10-12): The Proofreader says line 2's { is never closed and that lines 4-6 are read as inside the if. In fact line 5's } closes the if, and it's the function's { on line 1 that's left open.
   - evidence: syntax_later.js: line 1 "function welcome(name) {", line 2 "  if (name === \"\") {", line 5 "}". Page: "The { on line 2 opens the if block, and nobody ever closes it. So I read on, thinking lines 4, 5 and 6 are all still inside it."
   - fix: Change it to: "The } on line 5 closes the if from line 2, so nothing is left to close the function from line 1. I read on to the end looking for it ...". Keep the exercise's answer (line 2 is where the missing brace belongs).
3. **[low] [content] panel 14** (content-js-10-12): Cast drift: Tumble stands for 'reaching past the end' (index out of range) in js ch9 and in comic-critters.js. Here it stands for stack overflow, while the Taster already stands for RangeError in panel 5.
   - evidence: comic-critters.js header: "tumble (IndexError)". js ch9: "Tumble says: In some languages, reaching past the end makes me fall off ...". ch12 P14: "The tumble critter says: ... the pile has a size limit. Thousands of frames later: over I go!"
   - fix: Use the Taster (RangeError) for the stack overflow, or Kit with a toppling pile drawing. Keep Tumble for out-of-range reads.
4. **[low] [visual] panel 28 @390** (visual-js-11-15): Kit's bubble quotes `node:internal/modules/run_main` as inline code; the token is wider than the bubble, so it pokes 13px past the bubble's right edge, gets clipped by the panel and breaks as 'run_mai' / 'n'.
   - evidence: Audit 'beyond' at 390: p.bubble r=+13px. Crop: scratchpad/review-visual-js-11-15/c-misc-390.png (1st column, bubble line 4).
   - fix: <code>node:internal/modules/run_main</code> → <code>node:internal/<wbr>modules/<wbr>run_main</code> (a break opportunity after each slash keeps the token whole on one line per segment, no clipping)
5. **[low] [content] panel 36** (content-js-10-12): The page says the footprints 'start at Timeout._onTimeout, Node's timer', but that first frame is the reader's own arrow function (late_throw.js:3:11). What's missing is any frame for the try or the top level.
   - evidence: Captured stderr: "at Timeout._onTimeout (file:///home/you/javascript-ch12/late_throw.js:3:11)", then "at listOnTimeout (node:internal/timers…)" and "at process.processTimers (node:internal/timers…)". Page: "Look at the footprints: they start at Timeout._onTimeout, Node's timer, not at line 1."
   - fix: Change it to: "Look at the footprints: your arrow on line 3 (Node names it Timeout._onTimeout), called by Node's timer code. There is no footprint for line 1 or the try: it had already finished."
6. **[low] [visual] panel 40 @390, 1280** (visual-js-11-15): The cabinet critter in the recap row is drawn at 120px (`.cab-row .char`), below the 130px the critter labels are sized for, so its drawer labels 'cue', 'volume', 'lights' render at 11.3px.
   - evidence: Audit small text p40: 'cue' / 'volume' / 'lights' 11.3px at both widths. ch12.html:932; js-ch12.css:59 `.cab-row .char { width: 120px }` (same rule in js-ch14.css:73).
   - fix: .cab-row .char { width: 120px } → width: 130px (engine-refresh-chapter-todo §5: draw critters at the default width or larger)
7. **[low] [content] panel ex-first, ex-late** (content-js-10-12): Choice length bias: in both questions the correct option is about twice as long as any other.
   - evidence: ex-first option text lengths (tags stripped): 32, 31, 70 (correct), 11. ex-late: 30, 30, 60 (correct), 35. See INTEGRATION_TODO 'CHOICE LENGTH BIAS'.
   - fix: Shorten the correct options (e.g. ex-first: "The Name before the colon, e.g. TypeError"; ex-late: "A try/catch inside the arrow"), or lengthen the distractors.
8. **[low] [content] panel notebook: Under the hood (The call stack and the trace)** (content-js-10-12): The example given for 'an error made with new Error on line 4' is panel 30's third road, but that error is a TypeError the engine created on line 5.
   - evidence: Notebook: "an error object made with new Error on line 4 points at line 4 even if it's thrown, caught and rethrown elsewhere (panel 30's third road)". road_rethrow.js: the TypeError comes from settings.volume on line 5, and the trace says road_rethrow.js:5:41.
   - fix: Change it to: "an error object points at the line where it was created, even if it's caught and rethrown elsewhere (panel 30's third road: created on line 5, rethrown on line 8, reported at line 5)".
9. **[low] [content] panel notebook: Under the hood (The error object)** (content-js-10-12): The list of built-in error types leaves out AggregateError, which is a standard constructor and which Chapter 24 teaches.
   - evidence: Page: "Error is the parent, and TypeError, RangeError, ReferenceError, SyntaxError, EvalError and URIError are its children." MDN Error page (fetched), Error types: EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError (InternalError is non-standard). js ch24 mentions AggregateError 17 times.
   - fix: Add "and AggregateError (Chapter 24)".

## INTEGRATION_TODO lines naming this chapter
- ## Choice-answer position bias (found at js ch12)
- ## From cpp ch11 / js ch12 / rust ch12
- js-ch12's error-anatomy reader (real stderr, parity, folds Node-internal lines) is a candidate engine widget alongside cpp-ch11's `[data-report]` ASan reader. Consider one shared "annotated real output" widget.
- cpp-ch13.js copies cpp-ch11's `[data-report]` sanitizer-report reader. Promote it (with js-ch12's error reader) into one engine "annotated real output" widget.

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- javascript/ch12.html: @390: P28 +16px
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
