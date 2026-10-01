# Fix bundle: go/ch18.html

7 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 18 P22, P31; 20 P9, P11, P14; 17 P36 @390 (and 1280)** (visual-go-16-20): Captions and readlists say 'Left:' / 'Right:' / 'On the right' / 'the right-hand program' about two-up `.pair` layouts that stack into one column on phones (and ch17 P36 says 'plates on the left, shelves on the right' of a memory stepper that is stacked at 390); at 1280 the two panes are only ~340px wide, so the very lines being compared are cut (`func Contains[T comparable](items [`, `s := Sandwich{Bread{"rye"}, Fil`).
   - evidence: go/ch20.html:248, 254-255, 279, 361-362; go/ch18.html:506-508, 735; go/ch17.html:882. Crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/a20/w1280-016-p9.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/a18/w1280-051-p31.png, /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/sh/c17-390-13.png (062-p36 #1, stack above heap).
   - fix: Refer to the file tab names (`comparable.go` / `any_eq.go`) instead of left/right, and for programs with lines over ~40 columns use the existing `.pair.stack` (`grid-template-columns: minmax(0, 1fr)`) so each pane is full width (why: INTEGRATION_TODO 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS'; a comparison is useless if the compared tokens scroll out of view).
2. **[medium] [content] panel Boss 4 (ex-b4 parsons)** (content-go-16-18): The boss parsons accepts only the source order, but two other orders of main's six lines give identical output and get marked wrong.
   - evidence: Scratch runs of boss_parsons.go with Go 1.27.3: order 17,18,21,19,20,22 (move l.Room = "attic" before Toggle) and order 17,18,19,21,20,22 (move it before the second print) both print "hall false / true / attic true", the same as the key.
   - fix: Make line 20 `fmt.Println(l.Room, l.On)`. Then each alternative prints `attic true` on line 2 instead of `hall true`, so only one order matches. Recapture and update the explain text.
3. **[low] [visual] panel 13 @390** (visual-go-16-20): The permission-switches picture (pic-mid, 460 units, shrunk to ~316px on phones) draws 'off/ON' at 11.7px and the binary labels '4 = 100', '2 = 010', '1 = 001' at 10.3px.
   - evidence: audit 390 small text p13; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/s18.png (left column).
   - fix: Raise those text attributes from 14/16 units to ≥ 18 units, or wrap the SVG in `.picscroll` (why: text under 12px on phones; these digits are the lesson).
4. **[low] [content] panel 17, 22, 31 @390** (content-go-16-18): The prose says "left" and "right" about `.pair` layouts, but those stack into one column at phone width, where there is no left or right.
   - evidence: Panel 17: "plan(42) (left, line 18)", "plan(n) (right, line 18)". Panel 22: "Left: r := kitchen.NewRecipe", "Right: var r kitchen.recipe". Panel 31: "The right-hand program never writes s.Name". assets/ext/go-ch18.css:14 `.pair { grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)) }` gives one column below about 624px. Same pattern in go/ch17.html ex-why: "panel 17's right side prints 0 1 2". This is the LEFT/RIGHT item in INTEGRATION_TODO.
   - fix: Name the file instead: "(enum_loose.go, line 18)", "enum_strict.go", "main.go (the first version)" / "main.go, edited", "ambiguous_fix.go"; in ch17 write "the go 1.27 module".
5. **[low] [content] panel 18** (content-go-16-18): The alias card says an alias "Has exactly the original's methods, and you can't add more." That's false when the alias names a type from your own package: methods can be declared through it.
   - evidence: Scratch run on Go 1.27.3: `type Celsius float64; type Reading = Celsius; func (r Reading) Twice() Reading { return r * 2 }` compiles and prints 42 for Celsius(21).Twice(). Panel 21 correctly limits the rule to non-local types such as float64.
   - fix: "Has exactly the original's methods; you can't add methods to float64 through it (panel 21)."
6. **[low] [visual] panel 18 P33; 20 P11 (and every `.verdict-row` at 390) @390** (visual-go-16-20): On phones `.verdict-row` squeezes the Compiler into a 96px column: its 'go build' plate renders at 4.6px, and the plain `.bubble` (no `.scene`/`.talk`) has its tail pointing down, away from the Compiler beside it.
   - evidence: audit 390 small text: ch18 p33 and ch20 p11 'go build' 4.6px; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-16-20/a18/w390-054-p33.png.
   - fix: `@media (max-width:640px){ .verdict-row { grid-template-columns: 96px minmax(0,1fr) } }` → stack it (`grid-template-columns: minmax(0,1fr)`, Compiler at 130px above), or use the engine `.scene` + `.talk > .bubble` markup so the tail points at the speaker (why: speaker and tail must agree; the plate should stay legible).
7. **[low] [content] panel choice exercises** (content-go-16-18): In 3 of the 5 choice questions the correct option is the longest one.
   - evidence: Option lengths (correct option first): ex-inherit [61,55,34,41], ex-embedfield [67,15,57,66], ex-binfacts [60,44,48,41].
   - fix: Trim the correct options (for example ex-embedfield: "A named field `store Store`, with its own Add and Get") or lengthen one distractor in each.

## INTEGRATION_TODO lines naming this chapter
- ## From go ch18 (Measuring Cups and Sandwiches)

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `go-ch18.css:38` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
- `.picscroll` now shows "Swipe sideways to see the whole picture →" and a right-edge fade, only while the drawing overflows. These chapters roll their own `.pic-scroll` + `.swipe-hint` (shown at every phone width, even when nothing is hidden): switch the markup to `<div class="picscroll"><svg class="… pic-wide">` and delete the CSS. `go-ch12.css`, `go-ch14.css`, `go-ch15.css`, `go-ch16.css`, `go-ch18.css`, `go-ch20.css`, `go-ch23.css`, `go-ch27.css`
