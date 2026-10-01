# Fix bundle: go/ch21.html

9 review findings, 5 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 14 @390** (visual-go-21-25): In the 'SO HERE' card the inline path `example.com/stamps/internal/press` runs 20px past the card's right border on phones.
   - evidence: Probe: `.duo-card code` 'example.com/stamps/internal/press' ends 20px past `.duo-card` at 390 (no scroller around it). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/c21-p14b.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a21/w390-024-p14.png). Same class, smaller: ch22 P4 bubble `json:"name,option"` +4px; ch23 P22 explanation `example.com/parcel.Share(...)` +4px.
   - fix: Before → After (why): `.duo-card code { … }` → add `overflow-wrap: anywhere` for long import paths in prose (or insert `<wbr>` after each `/`) (break-ui: unbreakable identifiers must get a break opportunity instead of leaving their box).
2. **[medium] [content] panel 29** (content-go-19-21): Panel 29 says chapter 14 only read whole files with os.ReadFile and presents line-by-line reading with bufio.Scanner as new. Chapter 14 already taught os.Open + bufio.Scanner line by line, including the "open, check, defer, use" order.
   - evidence: ch21 P29: "Chapter 14 read whole files with os.ReadFile. For bigger files, open a tap and read one line at a time with a bufio.Scanner." go/ch14.html Part 6 is "os.WriteFile, os.ReadFile, os.Open with bufio.Scanner, os.Create". P36 is "reading a file line by line" (scan_lines.go: os.Open, defer f.Close(), for scanner.Scan(), scanner.Err()), and P37 is "open, check, defer, use" with a parsons. ch21 P29 itself later says "Chapter 14's order: open, check err, then defer the close."
   - fix: "Chapter 14 read a file line by line with os.Open and a bufio.Scanner. Here's the full round trip: create a file, write to it, then scan it back." Present Scan/Text/Err as a recap.
3. **[medium] [visual] panel notebook: Common wrong ideas @1280 and 390** (visual-go-21-25): The wrong-idea bullet shows literal backslashes: the code reads `\"dir\" + \"/\" + name` instead of `"dir" + "/" + name`, so a beginner sees code that isn't Go.
   - evidence: ch21.html:1264 `<code>\"dir\" + \"/\" + name</code>` (backslash-escaped quotes left in the HTML). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/c21-nb.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a21/w1280-090-nb-after-p49-page.png).
   - fix: Replace with `<code>"dir" + "/" + name</code>`.
4. **[low] [content] panel 14 and 46** (content-go-19-21): Two errors that come from the go command's package loader are credited to the Compiler. One is "use of internal package ... not allowed", the other the embed "no matching files". This breaks the book's detective rule that a # header means the Compiler. ex-pint correctly says "the go command".
   - evidence: P14: "Scoot's depot, in another module, may not: the Compiler refuses." Captured road_int.go stderr: "package example/depot\n\tmain.go:6:2: use of internal package example.com/stamps/internal/press not allowed" (no # header). P46 gives the Compiler a bubble: "The Compiler says: Line 8, column 12: welcome.txt doesn't exist ...". Captured embed_missing.go stderr: "embed_missing.go:8:12: pattern welcome.txt: no matching files found" (no # header, no ./). ex-pint: "Type the message the go command prints".
   - fix: P14: "the go command refuses to build it". P46: give the line to Scoot, or say "the go command stops the build", and note there's no # header because the check happens before compiling.
5. **[low] [visual] panel 2 @390** (visual-go-21-25): The phone copy of the module-library drawing labels the bad printing 'RETRACTED' at 10.5px.
   - evidence: Audit: SVG text 'RETRACTED' 10.5px at 390 (`font-size="12"`, ch21.html:126, in the pic-phone copy). Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-21-25/a21/w390-005-p2.png.
   - fix: Raise the phone copy's label to `font-size="14"` (widen the dashed book to fit), so it renders ≥12px.
6. **[low] [content] panel 21** (content-go-19-21): The caption quotes the buggy output so the reader can "see the spaces", but it is in an inline <samp>, which collapses the three inner spaces and the two trailing spaces to one each.
   - evidence: HTML: `<samp>"[STAMPED]   parcel 42  "</samp>` with the caption "%q prints the result in quotes so you can see the spaces". comic.css gives samp no white-space rule, so it renders as "[STAMPED] parcel 42 ". The terminal above shows the real spacing.
   - fix: Add style="white-space:pre" to that samp, or say "see the spaces in the terminal above".
7. **[low] [content] panel 3 (Professor's bubble)** (content-go-19-21): The bubble says a pre-release version "is never picked unless you ask for it". That overstates it: @latest falls back to the newest pre-release when a module has no release, and a dependency's requirement can pull a pre-release into the build.
   - evidence: "a dash adds a pre-release tag, like v1.5.0-beta.1, which comes before v1.5.0 and is never picked unless you ask for it." The Go Modules Reference (version queries) says @latest picks the highest release version, or else the highest pre-release if there are no releases. Under MVS, any require line can name a pre-release.
   - fix: "... which comes before v1.5.0, and @latest skips it while a normal release exists."
8. **[low] [content] panel choice exercises (ex-indirect, ex-retract, ex-name, ex-repwork, ex-tc, ex-leak, ex-forder)** (content-go-19-21): In 7 of the 9 choice questions the correct option is the longest, several by a wide margin.
   - evidence: Visible lengths (correct first): ex-retract 87 vs 55/39/41; ex-leak 87 vs 42/59/52; ex-indirect 78 vs 34/22/44; ex-forder 62 vs 39/52/18; ex-tc 55 vs 44/45/31; ex-repwork 43 vs 36/13/37; ex-name 42 vs 5/12/42 (tied). Balanced: ex-semver (keepOrder), ex-major.
   - fix: Shorten the correct options (move the explanation into `why`), or give the distractors comparable detail.
9. **[low] [content] panel notebook: Under the hood, Minimal version selection** (content-go-19-21): The notebook says panel 5's go get "had to name a version", but panel 5 says go get works without one.
   - evidence: Notebook: "That's why panel 5's go get had to name a version, and why @latest is something you ask for". P5: "Without @v1.1.0, go get picks the newest good one."
   - fix: "That's why a new printing reaches your build only when someone runs go get (with a version or @latest) and writes it into go.mod."

## INTEGRATION_TODO lines naming this chapter
- ## From go ch21 (Branches and Plumbing)
- capture.py's secondary module lowering now skips go.mod files asking for MORE than the primary's Go (e.g. a go 1.28 toolchain-gate demo), so the comparison run refuses those too. go ch21's `toolchain` program was captured before this change (its 1.24.7 run lost the gate); recapture it and update its footer/lab note in the fix round.
- go ch21 built a real offline file:// GOPROXY (.build_proxy.py) so go get/list/retract/v2/install/work/vendor are all real runs. It's reusable for any later Go module chapter.
- ENGINE PASS 2, more: (k) a generic "current line" rule: any `li.now [class^="tok-"]` → ink (go ch24/25 steppers have blue on yellow at 6.49:1); (l) "Step 1 of 7" counter wraps (go ch21 P32); (m) picscroll swipe hint missing where chapters roll their own.
- go ch21 notebook (ch21.html:1264) shows literal backslashes `\"dir\" + \"/\" + name`: an escaping bug in the page source.

## Engine-refresh clean-ups for this chapter
- go/ch21.html: @390: P13 +98px
- `go-ch21.js:172`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
