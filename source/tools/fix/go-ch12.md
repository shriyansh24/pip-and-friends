# Fix bundle: go/ch12.html

12 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 40 (ex-pzfix-m)** (content-go-10-12): The parsons exercise rejects a correct answer. Putting the type Box declaration after main compiles and prints the same 7, but the key accepts only type-first. No lines are pinned.
   - evidence: parsons_fix.go lines 5-7 (type Box struct { Count int }) can follow func main(){...} legally with identical output. The explanation says "The type comes before main." The model has no "pin".
   - fix: Add "pin": [1,2,3,4,5,6,7] (package, import, type) so only main's body is the puzzle. Also pin the imports in parsons_sorted.go and boss_parsons.go (known TODO).
2. **[medium] [book] panel 46 (teaser)** (book-go): The ch12 teaser promises that in ch13 'a function will pay the real account', but ch13 has no payday, account or Bal example; it uses a House and move/moveP.
   - evidence: ch12 teaser: 'Remember the payday loop that paid a photocopy? Next chapter, a function will pay the real account'. grep -c -i 'pay\|account\|acct' go/ch13.html = 0. ch13 panel 2: 'A House struct (chapter 12's character sheets), and a function that paints it'.
   - fix: Reword the teaser to what ch13 delivers: 'Remember the payday loop that paid a photocopy? Next chapter, I hand a function the address of the sheet, so it changes the real one.' (or add a payday(&acct) example to ch13 Part 2).
3. **[medium] [content] panel 9** (content-go-10-12): Broken cross-reference: if with a short statement is taught in chapter 5. Chapter 4 covers number types and Printf.
   - evidence: Line 234: "The short statement before ; is the if form from chapter 4." go/ch5.html has 11 mentions of "short statement" (e.g. "It was built in the if's short statement"); go/ch4.html has none.
   - fix: Change "chapter 4" to "chapter 5".
4. **[low] [content] panel 15 (ex-spotnil-m), 37 (ex-spotrange-m)** (content-go-10-12): Two explanations state the output of a fixed program that was never captured (rule 1: inline text may not claim an output).
   - evidence: ex-spotnil-m: "Then it prints map[jam:1 tea:2]". ex-spotrange-m: "then it prints [{Rin 4} {Oz 6}]". Neither fixed program is in data/go-ch12.json. I ran both fixes with go1.27.3 in a scratch copy and the claims are correct.
   - fix: Capture spot_nil_fix.go and spot_range_fix.go and refer to them, or drop the "then it prints ..." clauses.
5. **[low] [visual] panel 19 @390** (visual-go-11-15): The inline code `slices.Sorted(maps.Keys(fruit))` in the explanation list runs 9px past the panel's right edge at 390 and touches its border.
   - evidence: Audit 'beyond': P19 code.slices.Sorted(maps.Keys(fruit)) right edge +9px. Contact sheet /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/s12-04.png (y≈27600).
   - fix: Add `<wbr>` after `slices.` and `Sorted(` in that `<code>` (or `overflow-wrap: anywhere` on `ol li > code`), so the chip can break at a dot.
6. **[low] [visual] panel 2 @1280 and 390** (visual-go-11-15): The cabinet drawn at `.sm` in the coat-check picture shows its drawer keys ('ana', 'bo', 'cy') at 9.1px at both widths.
   - evidence: Audit: P2 SVG text 9.1px ×3 at 1280 and 390. Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/a12/w390-005-p2.png. Markup: go/ch12.html:103 `<svg class="char sm" data-char="cabinet" …>`. engine-refresh-chapter-todo §5 lists the same issue for py ch8.
   - fix: Draw it at the default `.char` size (drop `sm`), which the engine sized so drawer labels are ≥12px.
7. **[low] [content] panel 30 (ex-named-m)** (content-go-10-12): The correct option is about twice as long as any distractor (CHOICE LENGTH BIAS).
   - evidence: Option text lengths in characters: correct 92; others 35, 40, 45.
   - fix: Shorten it to "Named literals survive added or reordered fields" and move the rest into its why.
8. **[low] [visual] panel 31 @390** (visual-go-11-15): The printf verb table's output column is 73px wide on phones, so `main.P{Name:"Ana", Age:30}` breaks mid-token over 4 lines ('main.P{N' / 'ame:"Ana' / '",').
   - evidence: brk.js at 390: `.verbs samp` 73px wide, 3-4 lines. Contact sheet: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-11-15/s12-08.png (y≈50000). Cause: go-ch12.css `.verbs samp { overflow-wrap: anywhere }` inside a three-column table.
   - fix: Below 600px drop the middle 'Shows' column into a second row, or let `.verbs-wrap` scroll with `.verbs samp { white-space: nowrap }`. Before → After (why): `samp { overflow-wrap: anywhere }` → `white-space: nowrap` in a scroller (output must be read exactly as printed).
9. **[low] [content] panel 35** (content-go-10-12): Line drift: the map lookup seen[b] is on line 15. Line 14 only builds the map.
   - evidence: Page: "compare.go, line 14: comparable structs can even be map keys. b equals a, so seen[b] finds start." compare.go: 14 `seen := map[Point]string{a: "start"}`, 15 `fmt.Println(seen[b])`.
   - fix: "compare.go, lines 14 and 15: ..."
10. **[low] [content] panel 44 (ex-b4-m, Boss 4)** (content-go-10-12): The boss program takes a name's first letter with n[:1], which is byte slicing. Chapter 11's Boss 3 marked exactly that as the bug; here it works only because every name is plain ASCII.
   - evidence: boss_parsons.go line 12: first := n[:1]. ch11 ex-b3-m: "Line 7 slices beads: city[:3] ... Fix: string([]rune(city)[:3])".
   - fix: Add one sentence to the explanation: "n[:1] is safe here because every name starts with a one-bead letter; for names like Émile use string([]rune(n)[:1])."
11. **[low] [book] panel 9** (book-go): The if short statement is credited to chapter 4; it is taught in chapter 5 (Part 4 'The backpack').
   - evidence: ch12 panel 9 readlist: 'The short statement before ; is the if form from chapter 4.' ch5 TOC 'The backpack: the short statement, scope and early return'; ch5 recap 'THE BACKPACK STAYS ON THE FORK if v := …; cond {'.
   - fix: 'from chapter 4' → 'from chapter 5'.
12. **[low] [content] panel notebook: Version notes; footer** (content-go-10-12): The notes say every program built under Go 1.24.7, though several are compile errors on purpose.
   - evidence: Line 1146: "Every program built and ran". Line 1247: "all 61 programs built and ran under it". bad_key.go, positional_break.go, unknown_field.go, map_field.go, compare_err.go, spot_field.go, boss_spot.go, lookup_type.go, predict_badkey.go and unexported.go exit 1 with compile errors on both versions.
   - fix: "Go 1.24.7 accepted every program and gave identical results (compile errors included), apart from the three runs below."

## INTEGRATION_TODO lines naming this chapter
- ## From go ch12 (Coat Checks, Character Sheets)
- FRAGILE (same pattern as go ch12): panel 39 proves parallel test order using the 1.97.0 run coming out in a different order. Make that a two-run demonstration on one toolchain.

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch12.css:39` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
