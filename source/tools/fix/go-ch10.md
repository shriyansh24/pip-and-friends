# Fix bundle: go/ch10.html

12 review findings, 4 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 16, 2, 22 @390** (visual-go-6-10): The copy picture (P16) is unreadable on phones: "n := copy(dst, src)" 8.8px, "no box here: not copied" and "n is 2: boxes copied" 9.3px, src/dst 11.2px; P2's window labels "route"/"today" and badges 10.2px; P22's "row 0-2" and "[1][2]" 11px.
   - evidence: Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p16-390.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p2-390.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p22-390.png (audit sizes at 390). P16 and P2 are pic-wide (680 units into ~318px).
   - fix: Before: `<svg class="pic-wide" …>` → After: `<div class="picscroll"><svg class="fig pic-wide" …></svg></div>`; P22 (pic-mid): label font-size 16 → 18 (why: AUTHORING wide-drawing note; >=12px on phones).
2. **[medium] [visual] panel 4, 13, 15, 28 @390 (also 1280)** (visual-go-6-10): The many-shelves stepper changes height as shelves, window rows and "new" tags appear, so the buttons move by up to 343px between steps (P15 1309→1652px; P13 216px; P28 129px; P4 70px).
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p15-390-last.png; measured at 390 (btnY P15 573-916, P13 546-762, P28 501-630, P4 622-692) and at 1280 (P13 988-1295px). Cause: assets/ext/go-ch10.js draw() returns `vb: "0 0 " + w + " " + y` with y from the current step only; width is already fixed over the run (fullW) but height isn't.
   - fix: Before: `svg.setAttribute("viewBox", d.vb)` with a per-step height → After: compute `fullH = max over steps of draw(...).vb height` next to fullW in mount() and use `"0 0 " + fullW + " " + fullH` every step (why: one picture size per run, as the engine tracer/mem stepper now do; buttons stay under the thumb).
3. **[medium] [visual] panel 8, 10, 30 @1280 and 390** (visual-go-6-10): File tabs inside the pairs are cut along their bottom edge ("append_room.go", "append_full.go" lose descenders and underscores).
   - evidence: Zoom /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p10-1280-tabs-zoom.png. Cause: go-ch10.css:14 `.pair > * { … display: grid; gap: 8px }` against the engine tab's -14px margin.
   - fix: Before: `.pair > * { min-width: 0; display: grid; gap: 8px; align-content: start; }` → After: `.pair > * { min-width: 0; }` + `.pair .term { margin-top: 8px }` (why: block flow lets the tab tuck onto the code box).
4. **[medium] [content] panel notebook: Under the hood** (content-go-10-12): Two phrases are set in quotation marks as the Go specification's words, but the spec doesn't say either of them.
   - evidence: Page (line 900): the specification says a slice "describes a contiguous segment of an underlying array", and slices that share an array "always share" its elements. Spec, Slice types (fetched from go.dev/ref/spec): "A slice is a descriptor for a contiguous segment of an underlying array ..." and "A slice therefore shares storage with its array and with other slices of the same array". The phrase "always share" doesn't appear in that section.
   - fix: Quote the spec exactly: a slice "is a descriptor for a contiguous segment of an underlying array", and it "shares storage with its array and with other slices of the same array".
5. **[low] [visual] panel 10, 30 @1280** (visual-go-6-10): At desktop width the side-by-side programs hide the end of the line the panel is about (`fmt.Println(len(a), cap(a), len(b), cap(b))` shows only up to "len"), so the reader has to scroll each box sideways to match "3 10 4 10" to its expressions.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-6-10/evidence/ch10-p10-1280.png: both code boxes cut at "fmt.Println(len(a), cap(a), len". go-ch8.css already handles this with `.pair .code { font-size: 0.8125rem }`.
   - fix: Before: `.pair .code` at 1rem in a 340px column → After: `.pair .code { font-size: 0.8125rem; }` or stack the pair below 1100px (why: the compared lines must be visible together without scrolling).
6. **[low] [content] panel 12** (content-go-10-12): The panel refers to the Rust and C++ books as if the reader knew them, but each book is meant to stand alone.
   - evidence: Line 286: "The memory view from the Rust and C++ books. Left: the tickets on main's plate..."
   - fix: "A new picture: the memory view. Left: the tickets on main's plate..." (no mention of other books).
7. **[low] [content] panel 13 (ex-shares-m)** (content-go-10-12): The correct option is about twice as long as any other, which gives the answer away (CHOICE LENGTH BIAS in INTEGRATION_TODO).
   - evidence: Option text lengths in characters: correct 77; others 39, 27, 14.
   - fix: Shorten the correct option to "It depends on a's spare capacity", or lengthen the distractors.
8. **[low] [book] panel 30** (book-go): %q is credited to chapter 9, but it is taught in chapter 4 (its recap lists %q).
   - evidence: ch10 panel 30: '%q, which you met in chapter 9, puts quotes round each string'. ch4 recap: 'Printf fills blanks left to right: %v %d %s %q ...'; ch6 also uses %q.
   - fix: 'which you met in chapter 9' → 'from chapter 4'.
9. **[low] [content] panel 30 (ex-spotdel-m explain)** (content-go-10-12): The explanation says nothing catches a dropped slices.Delete result, but go vet (taught in ch2 as Specs) does flag it.
   - evidence: Explain: "(Unlike append, the Compiler doesn't catch a dropped slices.Delete result.)" Scratch run of spot_delete.go with go1.27.3: `go vet .` prints "a.go:10:2: result of slices.Delete call not used".
   - fix: Add: "go vet does: result of slices.Delete call not used." Better, capture a `go vet spot_delete.go` step and show it.
10. **[low] [content] panel footer** (content-go-10-12): The footers don't say that every run happened in a fresh PID namespace with ASLR off (meta.isolation). This is a hidden part of how the runs were made. The same applies to ch11 and ch12.
   - evidence: data/go-ch10.json, go-ch11.json and go-ch12.json meta: "isolation": "run steps execute in a fresh PID namespace with ASLR off". No footer mentions it.
   - fix: Add one sentence to each footer: "Each run started in a fresh process namespace with address randomisation off, so code offsets repeat between captures; on your machine they may differ."
11. **[low] [content] panel notebook: Under the hood** (content-go-10-12): The note promises that chapter 11 covers copy from a string into a []byte, but chapter 11 never mentions copy.
   - evidence: ch10 line 904: "copy also accepts a string as its source when the destination is a []byte (chapter 11)." A text search finds 0 occurrences of copy( in go/ch11.html.
   - fix: Drop "(chapter 11)", or add one sentence on copy(b, s) to ch11's notebook (Conversions copy).
12. **[low] [content] panel notebook: Version notes; footer** (content-go-10-12): The notes say every program built under Go 1.24.7, but copy_types.go, sort_err.go and predict_rev.go are compile errors on purpose under both versions.
   - evidence: Line 953: "Every program built and ran". Line 1052: "all 50 programs built and ran under it". data/go-ch10.json: copy_types.go, sort_err.go and predict_rev.go exit 1 with compile errors on both toolchains.
   - fix: "Go 1.24.7 accepted every program (none was refused for its version) and gave the same results, apart from the four runs below."

## INTEGRATION_TODO lines naming this chapter
- ## From go ch10 (Two Windows, One Shelf)
- go-ch10.css copies the `[data-mem]` styles (now in the engine) and the Go book's shared helper styles from ch9. Remove the first; consider a go-book.css for the second.
- go-ch10 is the first Go chapter captured with the real secondary: all 50 programs ran on 1.24.7, and one real wording change (copy_types.go) is shown.
- go-ch10, ch16 and ch18 each copy "the Go book's shared helper block" CSS. Consider an assets/go-book.css (or engine) for it.

## Engine-refresh clean-ups for this chapter
- `.mem-*` / `.mh-*` blocks still copied in `rs-ch7.css`, `rs-ch10.css`, `cpp-ch8.css` and `go-ch10.css`. They override the engine's sizes, including the `.mem-svg.narrow` rules the engine removed. Delete them.
- `go-ch10.js:148`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `go-ch10.css:43` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
