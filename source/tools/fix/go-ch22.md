# Fix bundle: go/ch22.html

7 review findings, 4 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 19** (content-go-22-24): The cross-reference for strconv points to chapter 11. strconv (Atoi, ParseFloat, Itoa) is taught in chapter 7; chapter 11 only mentions it, sending the reader back to chapter 7.
   - evidence: Page (line 469): "turning \"2.5\" into a number is your job (<code>strconv</code>, chapter 11)". go/ch7.html has 32 strconv mentions (plan: "strconv.Atoi (the clerk…)…, strconv.ParseFloat"); go/ch11.html: "For digits, use chapter 7's strconv.Itoa".
   - fix: Change it to "(strconv, chapter 7)".
2. **[medium] [content] panel notebook: Under the hood, 'Numbers, escapes and errors'** (content-go-22-24): The \u003c / \u003e / \u0026 escapes were turned into literal characters, so the page now says Marshal escapes <, > and & "as <, > and &", which makes no sense (and the HTML has bare <code><</code>).
   - evidence: go/ch22.html line 1013: "escapes <code>&lt;</code>, <code>&gt;</code> and <code>&amp;</code> inside strings as <code><</code>, <code>></code> and <code>&</code>, so JSON can be pasted safely". This is the same write-path hazard noted in BRIEF.md and INTEGRATION_TODO (js ch22).
   - fix: Write the escapes literally: "as <code>\u003c</code>, <code>\u003e</code> and <code>\u0026</code>", then grep the saved file for \u to confirm they survived. Better still, add a tiny captured program (json.Marshal("<b>&")) and quote its real output.
3. **[low] [content] panel 4 (and notebook 'Common wrong ideas')** (content-go-22-24): omitempty is described as leaving a field off 'when it holds the zero value'. That is not true for structs: a zero struct (such as a zero time.Time, the type used in Boss 1) is still written. The list in brackets is right, but the summary sentence and the notebook overstate it, and omitzero (Go 1.24) is never mentioned.
   - evidence: Panel 4: "left off the form when it holds the zero value (\"\", 0, false, nil, or an empty slice or map)"; notebook: "`omitempty` hides a field. Only when it holds its zero value." `go doc encoding/json` (1.27.3): v1 omits only "false, 0, a nil pointer, a nil interface value, and any empty array, slice, map, or string" and recommends `omitzero`. ch22 has 0 mentions of omitzero.
   - fix: "left off the form when it is empty: \"\", 0, false, nil, or an empty slice or map (a struct is never 'empty'; Go 1.24's omitzero handles that)".
4. **[low] [book] panel ch22 panels 7 and 19; ch25 panel 12** (book-go): Specs (go vet) is called 'the go vet checker from chapter 15' in two chapters, and strconv is credited to chapter 11; Specs is from chapter 2 and strconv from chapter 7.
   - evidence: ch22 panel 7: 'But Specs, the go vet checker from chapter 15, reads tags.' ch25 panel 12: 'Specs, the go vet checker from chapter 15, spots it'. ch22 panel 19: 'turning "2.5" into a number is your job (strconv, chapter 11)'. ch2 introduces Specs; ch7 Part 6 'THE CLERK strconv turns text into numbers'. (ch21 panel 40 similarly says 'strconv.Atoi, chapter 8'.)
   - fix: Both Specs references → 'from chapter 2'; ch22 '(strconv, chapter 7)'; ch21 '(strconv.Atoi, chapter 7)'.
5. **[low] [content] panel choice exercises** (content-go-22-24): Choice length bias, with new evidence for these chapters: in 13 of 17 choice exercises the correct option is the longest (or tied), often by a wide margin.
   - evidence: Visible-text lengths, correct option first: ch23 ex-kinds-m 109 vs 68/48/34; ch24 ex-par-m 106 vs 41/41/57; ch22 ex-cnow-m 88 vs 47/27/37; ch23 ex-b6-m 98 vs 42/24/39; ch24 ex-tool-m 85 vs 36/47/35; ch23 ex-sleep-m 105 vs 65/65/70; ch24 ex-nothing-m 99 vs 70/46/55. See the CHOICE LENGTH BIAS item in INTEGRATION_TODO.
   - fix: Trim the correct options to the core claim (for example ex-kinds-m: "A fuzz test, FuzzParseAddress") and move the detail into its why text; give a distractor similar length.
6. **[low] [content] panel lab note and footer** (content-go-22-24): The description of Go 1.24.7's go vet output is slightly off: it adds two header lines, not one, and prefixes each finding with ./.
   - evidence: Lab: "Go 1.24.7's go vet prints a # command-line-arguments header before its findings"; footer: "adds a header line". vet_tag.go alt stderr: "# command-line-arguments\n# [command-line-arguments]\n./vet_tag.go:10:2: …".
   - fix: "Go 1.24.7's go vet prints two header lines (# command-line-arguments and # [command-line-arguments]) and writes ./vet_tag.go before each finding."
7. **[low] [content] panel notebook: 'Reflection and struct tags'** (content-go-22-24): The notebook says packages may not read unexported fields through reflect. They can read them (Value.String, Value.Int); they can't Interface() or Set them.
   - evidence: Line 1005: "reflect can see unexported fields, but packages may not read or set them through it". Scratch run with Go 1.27.3: reflect.ValueOf(U{"x",3}).Field(0).String(), .Field(1).Int(), .Field(0).CanInterface() printed "x 3 false".
   - fix: "reflect can see unexported fields, but another package can't take their values out as interfaces or set them, so encoding/json skips them."

## INTEGRATION_TODO lines naming this chapter
- ## From go ch22 (Customs and Clocks)
- The reported "struct tags only partly highlighted" could not be reproduced: highlight() colours `json:"name,omitempty"` as one raw string in both whole-block and single-line use. The review should check the specific go-ch22 panel; it may be a widget that highlights a fragment without the leading backquote.
- `officer` (Officer Ines, go-ch22.js) vs `customs` (rs-ch21.js): distinct names, but both are customs officers. Consider a single shared character if promoted.
- HTML ENTITY LOSS: go ch22 notebook says Marshal escapes <, > and & "as <, > and &" (the entities were decoded). Script-grep every page for prose talking about escapes/entities and check the rendered text.

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
