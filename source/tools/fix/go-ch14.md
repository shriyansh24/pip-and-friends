# Fix bundle: go/ch14.html

11 review findings, 1 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [book] panel 46 (recap)** (book-go): The first recap line says a type must have 'exactly those methods' to satisfy an interface, which is the misconception the chapter's own panel and notebook refute, and it contradicts ch19's catchphrase.
   - evidence: ch14 recap: 'RIGHT PLUG, IT FITS. NO PAPERWORK. An interface lists methods. Any type with exactly those methods satisfies it'. Same page, panel table: 'Kettle ... ✓ yes: extra methods are fine'; bubble: 'Extra methods don't matter; a phone with a torch still charges.'; notebook Common wrong ideas: '"Extra methods stop a type from fitting." They don't.' ch19 recap: 'THE SMALLER THE PLUG, THE MORE THINGS FIT ... The screen, files, bytes.Buffer ... fit.'
   - fix: Change to 'Any type that has those methods (extras are fine) satisfies it, with no implements keyword.'
2. **[medium] [visual] panel 11 @390** (visual-go-11-15): The 'interface value has two pockets' picture is drawn at 67% on phones, so the type tag and value ('main.Dog', 'Name "Rex"') are 8.9-9.6px and the pocket headings 11.7px.
   - evidence: Audit at 390: P11 SVG text 8.9px ×2, 9.6px, 11.7px ×4 (fine at 1280). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a14/w390-019-p11.png (and x6.png). Markup: go/ch14.html:266 `<svg class="pic-mid" viewBox="0 0 460 222">`.
   - fix: Enlarge the pocket contents to ≥18 viewBox units (13px at 310px wide), or wrap the SVG in `.picscroll` with a 460px minimum width on phones.
3. **[medium] [book] panel 47 (teaser)** (book-go): The ch14 teaser promises that ch15 will build a package 'with my own sockets inside', but ch15 never declares or mentions an interface.
   - evidence: ch14 teaser: 'Remember the fmt.Stringer socket that lives in package fmt? Next chapter I'll build my own package, with my own sockets inside, and a test that marks my homework for me.' grep -c 'interface' go/ch15.html = 0; ch15's shop/calc packages export functions and a struct only.
   - fix: Reword: '...Next chapter I'll build my own package, with capital-letter names that other packages may use, and a test that marks my homework for me.'
4. **[medium] [content] panel notebook, Under the hood (What an open file is)** (content-go-13-15): Broken promise: the page says chapter 19 shows how to check the error from Close when writing. No Go chapter shows that pattern.
   - evidence: Notebook: "When writing, Close can also report a real failure (for example a full disk), so programs that care check its error rather than deferring it blindly; chapter 19 shows the pattern." go/ch19.html mentions Close() only once, in the io.ReadCloser sentence. grep of every go/ch*.html for `err := f.Close`, `f.Close(); err`, closeErr, cerr or errors.Join(…Close) finds nothing.
   - fix: Drop "; chapter 19 shows the pattern", or add a short captured example here (a named error result plus `if cerr := f.Close(); cerr != nil && err == nil { err = cerr }`).
5. **[low] [visual] panel 10 @1280 and 390** (visual-go-11-15): In the interface-value tracer the one-line method bodies (lines 12-13) are cut off at both widths ('{ return d.Name + " s', '{ return fmt.Sprintf('), so the reader never sees what Speak returns.
   - evidence: Audit: P10 `ol.tr-code` scrollWidth 800 vs clientWidth 502 at 1280. Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/x7.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a14/w1280-018-p10.png).
   - fix: Write the two methods on three lines each in iface_value.go (gofmt style) and recapture, so they fit the tracer's code column.
6. **[low] [content] panel 12, 21, 31 (choices ex-ptrpick-m, ex-commaok-m, ex-when-m)** (content-go-13-15): In three choices the correct option is clearly the longest (CHOICE LENGTH BIAS).
   - evidence: Visible-text lengths (correct first): ex-ptrpick-m 57 vs 26/31/41; ex-commaok-m 36 vs 12/11/19; ex-when-m 63 vs 25/50/42.
   - fix: Balance the option lengths (e.g. ex-when-m: "When its function returns, by any route").
7. **[low] [visual] panel 39 @1280** (visual-go-11-15): locker_fix.go and locker_ok.go (identical except 'B7'/'A1') are shown side by side at 360px each, so the error strings, `nil` returns and Close()'s Println are cut off in both copies.
   - evidence: Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/x6.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a14/w1280-069-p39.png); audit overlaps in P39 come from the clipped lines. Markup: go/ch14.html:874 `<div class="pair">`.
   - fix: Use `class="pair stack"`, or show locker_fix.go in full and only locker_ok.go's `main` (the one changed line) beside its terminal.
8. **[low] [content] panel 42** (content-go-13-15): The explanation of `main.arrow(0x56c278?)` doesn't say why the argument isn't 7, or what the `?` means. A beginner who just called arrow(7) will be confused.
   - evidence: Capture impossible.go: "main.arrow(0x56c278?)" for the call arrow(7). P42: "The 0x56c278? next to arrow is a peek at its argument as raw memory; it differs from run to run of different builds. Ignore it."
   - fix: "…is Go's best guess at the argument. The ? means it may be stale: here the 7 had already been overwritten, so the number is meaningless. Ignore it."
9. **[low] [content] panel 44** (content-go-13-15): The page says chapter 19 shows recover keeping a web server alive. Chapter 19 covers recover (turning a panic back into an error), but it has no web-server example.
   - evidence: P44: "Chapter 19 shows where it really belongs, such as keeping a web server alive when one request goes wrong." go/ch19.html panels 33–36 cover recover, recover_early and recover_err ("Go's own encoding/json works like this inside"). There are 0 matches for web server, net/http or ServeHTTP.
   - fix: "Chapter 19 shows where it really belongs, such as turning a deep panic back into an ordinary error."
10. **[low] [book] panel notebook (Under the hood, files)** (book-go): ch14 promises that chapter 19 shows how to check Close's error when writing, but neither ch19 nor ch21 shows that pattern.
   - evidence: ch14: 'When writing, Close can also report a real failure (for example a full disk), so programs that care check its error rather than deferring it blindly; chapter 19 shows the pattern.' ch19's only Close is the lab line 'defer f.Close()'; ch21 uses 'defer f.Close()' only.
   - fix: Drop 'chapter 19 shows the pattern', or point to ch21 and add a two-line example there (if err := f.Close(); err != nil { return err }).
11. **[low] [content] panel notebook, Under the hood (What an open file is)** (content-go-13-15): Says each program gets often 1024 open files on Linux. Since Go 1.19, Go programs on Unix raise their soft open-file limit to the hard limit at startup, so 1024 is misleading for Go.
   - evidence: Notebook: "Each program gets a limited number of them (often 1024 by default on Linux)". In a scratch test with `ulimit -Sn 1024` in the shell, a Go 1.27.3 program reading syscall.Getrlimit(RLIMIT_NOFILE) printed "19999 20000" (soft raised to near the hard limit). The Go 1.19 release notes describe this automatic raise (cited from memory, not fetched).
   - fix: "Each program gets a limited number of them (the operating system sets the limit; Go raises it as far as it may at startup)".

## INTEGRATION_TODO lines naming this chapter
- GO ch14 recap (high): "exactly those methods" is wrong. Use "at least those methods".

## Engine-refresh clean-ups for this chapter
- `go-ch14.js:156`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch14.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
