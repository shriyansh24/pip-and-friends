# Fix bundle: go/ch20.html

7 review findings, 0 INTEGRATION_TODO lines, 4 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 31 @1280** (visual-go-16-20): In the recap card "A MACHINE ONLY MAKES WHAT YOU TAKE", the unbreakable inline code `slices.Sorted(maps.Keys(m))` runs 29px past the card's right border and is cut at `slices.Sorted(maps.Keys(`.
   - evidence: audit 1280 'beyond': code 'slices.Sorted(maps.Keys(m))' r=+29px past the panel's card; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/a20/w1280-064-p31.png (go/ch20.html:790).
   - fix: Write `slices.Sorted(<wbr>maps.Keys(m))` in the recap (chapter fix), or in the engine `.recap li code { overflow-wrap: anywhere }` (why: three-column recap cards are ~200px wide at 1280, narrower than many code tokens; break-ui 'unbreakable strings').
2. **[low] [visual] panel 21 @390 (also 1280)** (visual-go-16-20): The gumball stepper grows or shrinks on most steps (the screen box grows a line at a time and the phone drawing switches between 680 and 724 units tall), so the Next button drifts by 25–90px per press.
   - evidence: dyn.js, 390: Next offset 1447, 1359, 1383, 1429, 1378, 1400, 1447, 1420, 1469, 1517, 1592, 1604; 1280: 1039 … 1246. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/dyn/dyn-ch20-0-w390-s1.png and s11.png.
   - fix: `.gb-split .screen pre { min-height: 3.2em }` → `min-height: calc(var(--final-lines) * 1.6em)` set from the model's last step (11 lines), and always use the 724-unit phone viewBox, leaving the 'main' strip empty instead of removing it (why: steppers keep one size for the whole run so the buttons stay put).
3. **[low] [content] panel 9, 11, 14** (content-go-19-21): These panels say "On the right", "Left:" and "Right:" for a `.pair` layout. Below about 650px the pair stacks into one column, so on phones there is no left or right.
   - evidence: P9: "On the right, the same function with any." / "Left: Contains[T comparable]" / "Right: incomparable types in type set". P11: "On the left, someone tries to sum strings. On the right, someone forgot the tildes." P14: "Left: cannot use 42 ..." / "Right: cannot use generic type ...". assets/ext/go-ch20.css: `.pair { grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)) }`, which is one column at 390px. Cross-cutting item "LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS" in INTEGRATION_TODO.
   - fix: Refer to the file tabs instead: "comparable.go: Contains[T comparable] ...", "any_eq.go: incomparable types ...", "number_string.go ...", "no_tilde.go ...", "stack_mixed.go ...", "stack_bare.go ...".
4. **[low] [content] panel choice exercises (ex-tparam, ex-imethod, ex-mapskeys)** (content-go-19-21): In 3 of the 5 choice questions the correct option is the longest, two of them by a clear margin.
   - evidence: Visible lengths (correct first): ex-tparam 78 vs 41/49/36; ex-imethod 84 vs 51/32/54; ex-mapskeys 62 vs 14/57/62 (tied). Balanced: ex-genvsiface, ex-largefile.
   - fix: Trim the correct options of ex-tparam and ex-imethod (move the explanation into `why`).
5. **[low] [book] panel notebook (In real programs)** (book-go): context.WithValue-style helpers are credited to chapters 24 and 25, but context is chapter 26.
   - evidence: ch20: 'sync.OnceValue, atomic.Pointer[T] and context.WithValue-style helpers use type parameters ... (chapters 24 and 25).' grep WithValue: ch24 0, ch25 0, ch26 3.
   - fix: '(chapters 24 and 25)' → '(chapters 25 and 26)'.
6. **[low] [content] panel notebook: In real programs** (content-go-19-21): Lists "context.WithValue-style helpers" among things that use type parameters. context.WithValue itself is not generic, so a beginner could take this to mean it is.
   - evidence: "sync.OnceValue, atomic.Pointer[T] and context.WithValue-style helpers use type parameters so callers get back their own type without assertions (chapters 24 and 25)." Its signature is func WithValue(parent Context, key, val any) Context.
   - fix: "sync.OnceValue and atomic.Pointer[T] use type parameters ... (chapter 25); people also write small generic helpers around context.WithValue so callers get their own type back." Or just drop context.WithValue.
7. **[low] [content] panel notebook: Version notes** (content-go-19-21): The version notes count keys_order.go, a .nondet program, among the "Five of 49 runs" that differed. Whether random map order matches between toolchains changes with every recapture, so the count and the list can drift.
   - evidence: Notebook: "Five of 49 runs differed: ... keys_order.go: a different random order, as expected from panel 26." Footer: "5 of 49 runs differ". data/go-ch20.json marks keys_order.go "nondeterministic": true and still lists it in meta.versionDifferences. INTEGRATION_TODO "VERSION DIFFS VS NONDET": pages must not name files from a timing-dependent list.
   - fix: "Four of 48 deterministic runs differed" (genmethod, genmethod_old, ignore_yield, spot_yield), plus a sentence that keys_order.go varies on every run anyway.

## Engine-refresh clean-ups for this chapter
- `go-ch20.js:147`
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch20.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
