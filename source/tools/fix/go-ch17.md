# Fix bundle: go/ch17.html

4 review findings, 1 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[low] [content] panel 32** (content-go-16-18): Panel 32 calls the parameter of a variadic call with no arguments "an empty slice", while the notebook correctly says it is nil, so the two places disagree.
   - evidence: Panel 32: "Called with nothing: <code>nums</code> is an empty slice of type <code>[]int</code>". Notebook: "with no arguments at all, <code>nums</code> is also <code>nil</code> (length 0 either way)". The Go spec: "the value passed to p is nil".
   - fix: "Called with nothing: nums is a nil []int, length 0, so the loop runs zero times".
2. **[low] [visual] panel 37 @390** (visual-go-16-20): The coffee-cup drawing's order slip ('medium', '1 shot', 'no milk') renders at 11px on phones.
   - evidence: audit 390 small text p37 11px; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/sh/c17-390-13.png (064-p37).
   - fix: Enlarge the slip text attributes by ~2 units (or the slip itself) so they reach 12px at 316px wide (why: phone legibility floor).
3. **[low] [content] panel after 6 (ex-fillfunc)** (content-go-16-18): The fill prompt gives away the second blank's answer word for word.
   - evidence: The prompt says "Line 15: hand over the standard library's <code>strings.ToUpper</code> machine (don't run it!)", and the blank's key is "strings.ToUpper".
   - fix: "Line 15: hand over the strings package's upper-casing function itself (don't run it!)."
4. **[low] [book] panel cover kicker** (book-go): The '· INTERMEDIATE' kicker appears on only some intermediate chapters.
   - evidence: Kickers: 17, 19, 21, 22, 24, 25, 26 'CHAPTER N · INTERMEDIATE', 28 'CHAPTER 28 · INTERMEDIATE · THE LAST CHAPTER'; 18, 20, 23, 27 just 'CHAPTER N'. Plan marks 17-28 'intermediate'.
   - fix: Either add '· INTERMEDIATE' to ch18, ch20, ch23 and ch27, or keep it only on ch17 (the start of the part) and ch28.

## INTEGRATION_TODO lines naming this chapter
- ## From go ch17 (Backpacks and Buffets)

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
