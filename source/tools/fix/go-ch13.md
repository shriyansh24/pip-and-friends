# Fix bundle: go/ch13.html

6 review findings, 2 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 3 @390** (visual-go-11-15): The chapter's key picture (copy the house vs copy the slip) shrinks to 46% on phones: the slip labels are 6.5-7.9px ('slip p', "a's address") and the house names/numbers 10-11px, so the idea the panel teaches can't be read.
   - evidence: Audit at 390: P3 SVG text 6.5px ×2, 7.9px ×2, 10.2px ×3, 11.2px ×3 (fine at 1280). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a13/w390-006-p3.png (and x1.png). Markup: go/ch13.html:87 `<svg class="pic-wide" viewBox="0 0 680 330">` with no scroller.
   - fix: Wrap it as `<div class="picscroll"><svg class="fig pic-wide" …>` (engine: keeps 560px and scrolls) and raise the slip text from ~14 to at least 16 viewBox units so it stays ≥12px at 560px.
2. **[medium] [content] panel 33 (exercise ex-tally-m)** (content-go-13-15): The predict prompt asks what line 21 prints, but line 21 is `t.AddP()`. The print is on line 22.
   - evidence: ex-tally-m prompt: "Three votes are cast. What does line 21 print?" /home/you/go-ch13/predict_counter.go: 21 `t.AddP()`, 22 `fmt.Println(t.votes)`.
   - fix: "What does line 22 print?"
3. **[medium] [visual] panel 35 @1280** (visual-go-11-15): On desktop no_stringer.go and stringer.go are squeezed side by side, so both are cut at 360px: the String() method's format string ('return fmt.Sprintf("%s (level %…') and the struct literals, the very lines being compared, are hidden behind a scroll edge.
   - evidence: Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/x2.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a13/w1280-056-p35.png); audit also lists overlaps in P35 caused by the clipped text. Markup: go/ch13.html:756 `<div class="pair">`. ch12 already uses `.pair.stack` for programs with long lines.
   - fix: Use `<div class="pair stack">` at go/ch13.html:756 (and check :777 and :817), so each program gets the full panel width.
4. **[medium] [content] panel notebook (The address you printed), footer** (content-go-13-15): An address from the Go 1.24.7 run is typed into the HTML, and it doesn't match the captured run. Because address.go is nondeterministic, any number typed here will drift.
   - evidence: Notebook: "the same program built with Go 1.24.7 printed 0xc000082040". Footer: "address.go prints an address of the older form 0xc000082040". data/go-ch13.json address.go alt.stdout: "0xc0000100d0\ntrue\n".
   - fix: Don't quote a number: "…the same program built with Go 1.24.7 printed a small address starting 0xc000…" in both places, or show it with a data-alt terminal labelled "one possible run".
5. **[low] [content] panel 24 (choice ex-newq-m)** (content-go-13-15): The correct option is the only one with a long qualifier ("in a module that says go 1.26 or later"), which gives it away (CHOICE LENGTH BIAS).
   - evidence: Visible-text lengths: correct 51 vs 11/7/20. Option: "p := new(7), in a module that says go 1.26 or later".
   - fix: Move the qualifier into the question ("In a module that says go 1.27, which line…") and make the option just "p := new(7)".
6. **[low] [content] panel Lab (1. Make a project), 22** (content-go-13-15): The Lab says Go 1.26 or later is all you need for new(42). But Go 1.26's go mod init writes `go 1.25.0` into go.mod, so a reader on Go 1.26.x following the Lab hits panel 23's error.
   - evidence: Lab: "For new(42) you need Go 1.26 or later; everything else here works on older versions too." Go 1.26 release notes (go.dev/doc/go1.26): "Go 1.26 and its minor releases will create go.mod files with go 1.25.0." (This book's Go 1.27.3 writes go 1.27.3, so the captures are unaffected.)
   - fix: "For new(42) you need Go 1.26 or later, and a go.mod whose go line says 1.26 or later (if go mod init wrote an older one, run go mod edit -go=1.26)."

## INTEGRATION_TODO lines naming this chapter
- ## From go ch13 (Addresses and Verbs)
- DONE (engine): `[data-mem]` now supports `ref: "frame/name"` stack-to-stack arrows. go ch13 used the tracer slip model, which is fine; later pointer chapters can use the stepper.

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch13.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
