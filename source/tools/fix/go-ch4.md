# Fix bundle: go/ch4.html

12 review findings, 0 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 36 (ex-parsons-receipt)** (content-go-4-6): The receipt parsons rejects a correct order: line 6 (the prices) and line 7 (the header Printf) can swap and the program prints exactly the same output. The explanation's reason, "Prices first (they must exist before they're printed)", is also wrong, because the header doesn't use the prices.
   - evidence: data/go-ch4.json parsons_receipt.go: 6 `tea, cake := 2.5, 3.75`; 7 `fmt.Printf("%-6s|%6s\n", "ITEM", "PRICE")`; 8-10 use tea/cake. Header-first compiles and prints the same goal output, yet the engine accepts only the exact source order (comic-widgets.js parsons check: mine === real). Many readers put the header first.
   - fix: Add "pin": [1, 2, 3, 6] so the price line is fixed (with package/import/func), and change the explain text to: "The header, the two items and then the total; the prices line is fixed at the top because lines 8-10 use it." Alternatively, move the prices declaration below the header in the program and recapture.
2. **[medium] [visual] panel 19 @1280 and 390** (visual-go-1-5): The odometer needle turns with a 600ms overshooting curve on every step, including each → key press and every Play tick, which is twice Emil's 300ms UI budget and makes keyboard stepping lag.
   - evidence: assets/ext/go-ch4.css:67 `.motion .od-hand { transition: transform 600ms cubic-bezier(.3, 1.4, .5, 1); }`; measured transition-duration 0.6s with motion on. Reduced motion and 'Animations: off' correctly remove it (measured 'none').
   - fix: Before → After (why): `transition: transform 600ms cubic-bezier(.3,1.4,.5,1)` → `transition: transform var(--dur-move) var(--ease-in-out)` (280ms: on-screen teaching movement under the 300ms cap, no overshoot on a keyboard-driven, often-repeated action).
3. **[medium] [content] panel 28** (content-go-4-6): The panel says "A panicking program ends with exit code 2", but the terminal directly above it ends with "[exit code 1: failure]". Nothing on this page explains the difference. Chapter 5 panel 15 and chapter 1 do explain it: go run reports the program's 2, then exits with 1 itself.
   - evidence: Panel 28 caption: "`exit status 2` A panicking program ends with exit code 2." data/go-ch4.json int_zero.go: exit 1, stderr ends "exit status 2". The terminal has data-exit, and comic.js:256 renders "[exit code 1: failure]".
   - fix: Change the caption to: "The program itself ended with exit status 2, the code for a panic; then go run reported its own failure as exit code 1 (the last line)."
4. **[low] [visual] panel 19 @1280 and 390** (visual-go-1-5): The odometer's bit place values under the eight switches (128, 64, 32 … 1, and -128 for int8) are 11.5px at both widths, below the 12px floor, and they are what makes the binary readable.
   - evidence: assets/ext/go-ch4.css:82 `.od-w small { font: 700 0.72rem var(--f-code); }` (0.72 × 16 = 11.5px). Audit lists 8 nodes at 11.5px in P19 at 1280 and 390.
   - fix: Before → After (why): `.od-w small { font: 700 0.72rem … }` → `font: 700 0.75rem …` (12px, the legibility floor; '-128' still fits the 8-column grid at 390).
5. **[low] [visual] panel 19, 31, 38 @1280 and 390** (visual-go-1-5): Three chapter keyframes run on every step with the weak built-in `ease-out`, over 300ms, and start from an offset with no opacity: the wheel roll (380ms), the dial jolt (360ms) and the form blank drop (360ms).
   - evidence: assets/ext/go-ch4.css:81 `od-roll 380ms ease-out` (from translateY(-30%)), :86 `od-jolt 360ms ease-out`, :103 `fm-drop 360ms ease-out` (from translateY(-10px)), keyframes at :87-88 and :122. They restart on each Next press (keyframes are not interruptible).
   - fix: Before → After (why): `animation: od-roll 380ms ease-out` → `animation: od-roll var(--dur-ui) var(--ease-out)` with the keyframe starting `opacity: 0; transform: translateY(-30%)`; same for `fm-drop`; delete `od-jolt` (the dashed WRAP stamp already signals the wrap). (DESIGN_SYSTEM §5: tokens, ≤300ms, entrances include opacity; delete decoration on repeated actions first.)
6. **[low] [content] panel 30, 36, 42 (ex-parsons-money, ex-parsons-receipt, ex-b5)** (content-go-4-6): None of the three parsons exercises pins the header lines. `package main`, `import "fmt"`, `func main() {` and the closing `}` are all shuffled as movable pieces, although their order is a fixed convention, not something the exercise teaches.
   - evidence: No "pin" key in ex-parsons-money-m, ex-parsons-receipt-m or ex-b5-m. Engine: comic-widgets.js:455-460 (only pinned or blank lines stay fixed). See INTEGRATION_TODO "From the review swarm", PARSONS ORDER (update).
   - fix: Add "pin": [1, 3, 5] to each model (package, import and func main lines; the blank lines already stay put).
7. **[low] [content] panel 33 (ex-fill-verbs), 42 (ex-b3)** (content-go-4-6): These fill blanks reject verbs that print identical output. Line 10's `%d` doesn't accept `%v`, even though the very next spot exercise recommends "%d (or %v)". Boss 3's `%-6s` doesn't accept `%-6v`.
   - evidence: ex-fill-verbs-m blank {line 10, text "%d"} has no accept list; ex-spot-verb-m explain: "Use <code>%d</code> (or <code>%v</code>)." fill_verbs.go line 10 prints 7 with either verb; boss_fill.go `%-6v` of "tea" gives "tea   ", the same as `%-6s`.
   - fix: Add "accept": ["%v"] to ex-fill-verbs line 10 and "accept": ["%-6v"] to ex-b3's first blank.
8. **[low] [visual] panel 36 @1280 and 390** (visual-go-1-5): The jelly next to the receipt shows its value as '6.2799…' at 8.9px, so the wobble the bubble talks about is not readable in the picture.
   - evidence: Audit: '6.2799…' 8.9px in P36 at both widths. Last column of /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-1-5/ev/ch1p11-ch1p23-ch5p28-ch5p33-ch4p36-390.png.
   - fix: Draw the jelly at the default `.char` width (not small) or give it a shorter `data-label` such as `6.28…`; the bubble already quotes the full value.
9. **[low] [content] panel 42 (ex-b1, ex-b3 explain)** (content-go-4-6): The explanations count padding spaces, but the HTML collapses them. ex-b1 says "<samp> 5.5</samp> (two spaces of padding)" with only one space in the source, and ex-b3 shows "<samp>tea </samp>" for a 6-cell field.
   - evidence: ex-b1-m explain: "shown as <samp> 5.5</samp> (two spaces of padding)". The real output line is "  5.5|2   |". ex-b3-m: "<samp>tea </samp> is 6 cells leaning left"; the real output is "tea   | 1.50| 10%".
   - fix: Write the padding with &nbsp; ("&nbsp;&nbsp;5.5", "tea&nbsp;&nbsp;&nbsp;") or style these samp elements with white-space:pre.
10. **[low] [content] panel 5** (content-go-4-6): The program and the bubble rely on `==` before the book has introduced it. It is first explained in panel 23's exercise prompt, and taught properly in chapter 5.
   - evidence: int_default.go line 11 `fmt.Println(math.MaxInt == math.MaxInt64)`. Bubble: "That's why line 11 prints true". The ex-point3 prompt (panel 23) is the first place that says "`==` means 'is equal to'".
   - fix: Add to the bubble: "(`==` asks 'are these equal?' and prints true or false; chapter 5 has more.)"
11. **[low] [content] panel footer** (content-go-4-6): The footer claims "none of this chapter's number or formatting rules changed between those versions", but Go 1.24.7 never compiled a single program, so no run backs that claim.
   - evidence: Footer: "Each program was also run with Go 1.24.7: it refused every one ... none of this chapter's number or formatting rules changed between those versions." Every alt record in data/go-ch4.json is "go: go.mod requires go >= 1.27". Known cause: INTEGRATION_TODO "Go secondary toolchain (found at go ch8)".
   - fix: Recapture with the .go124.mod secondary (per the TODO) and base the sentence on the real comparison. Until then, delete the "none ... changed" clause.
12. **[low] [content] panel footer / 41** (content-go-4-6): The footer says both of panel 41's terminals ran `go run` and then `go vet`. Only the first did; the printf_vetok.go terminal ran `go vet` alone.
   - evidence: Footer: "Panel 41's two terminals ran go run and go vet one after the other on the named file". /home/you/go-ch4/printf_vetok.cmd has the single step ["go vet printf_vetok.go"]; printf_vet.cmd has both steps.
   - fix: Reword: "Panel 41's first terminal ran go run and then go vet on printf_vet.go; the second ran only go vet on the fixed file."

## Engine-refresh clean-ups for this chapter
- `go-ch4.js:134`
- `go-ch4.js:264`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch4.css:199` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.duo-card .file-tab { justify-self: start }` copies (`cpp-ch1`, `cpp-ch2`, `go-ch4`, `js-ch10` to `js-ch15`): the engine already does it.
