# Engine refresh: chapter-level follow-ups

The 2026-11-08 engine refresh (`tools/DESIGN_SYSTEM.md`, AUTHORING.md engine notes of that date) makes these chapter changes possible or necessary. None of them was made in the engine round, because chapter files belong to the fix round.

After each change:
1. Run `node tools/check_chapter.js <page> --shots DIR`.
2. Look at 390 and 1280.

## 1. Delete duplicated `.term.wrap` rules (now in comic.css)

These 49 files carry the identical line `.term.wrap { white-space: pre-wrap; overflow-wrap: anywhere; }`. Delete it.

The engine version keeps compiler carets aligned and wraps with a hanging indent. The chapter copy forces `overflow-wrap: anywhere` on the `<pre>`, which still lets lines break mid-word wherever the engine's per-line rules don't apply.

| Book | Files and lines |
|---|---|
| C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
| JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |

Variants to review by hand:
- `js-ch15.css:41`, `js-ch21.css:112` and `js-ch28.css:44` (`.term.wrap, .code.wrap { … }`): keep only the `.code.wrap` half.
- `cpp-ch8.css:120` (`.pair2.stack .term.wrap`): delete.
- `cpp-ch18.css:110` (phones: `.term.wrap { white-space: pre; … }`) and `rs-ch27.css:51` (wrap only above 641px): both existed only because carets broke when wrapped. Delete them, so these terminals wrap on phones with aligned carets. cpp ch18 at 390 currently shows its long compiler messages cut off at the right edge.
- `py-ch13.css:92` (`.term[data-cmdrun], .term.wrap13`): a chapter-specific variant. Consider switching its markup to `class="term wrap"`.
- `javascript/ch22.html` and `javascript/ch23.html` use `class="term wrap"` without any chapter rule. They now wrap through the engine; check them at 390.

## 2. Remove highlighter overrides the engine now covers

- `assets/ext/rs-ch1.js` lines 21–60: the nested-comment `highlight` and `rehighlight()`. The engine now nests Rust block comments and skips raw strings and char literals. Keep sections 2–4 of that file, and re-check `rust/ch1.html` code colours.
- `assets/ext/py-ch1.js` and `assets/ext/go-ch1.js`: their `L.highlight` replacements are no longer needed (engine review finding 25). Their `rehighlight()` re-renders code after the engine has drawn it, which can drop the new `.lead`/`.rest` hanging-indent markup on those lines. Delete both, then re-check `python/ch1.html` and `go/ch1.html` at 390.

## 3. Remove the chapter copy of the memory stepper

- `assets/ext/rs-ch7.js` mounts its own copy of the `[data-mem]` stepper before the engine's comic-memory.js, so `rust/ch7.html` doesn't get the refresh:
  - natural-size phone pictures (its labels still render at 6.9–10px at 390)
  - one size per run
  - the hanging indent
  - the 12px `.mh-lab`
  - `HEAD` 42 (its "top plate: running now" note still touches the first type label)

  Delete the copy and keep the page's own extras.
- `.mem-*` / `.mh-*` blocks still copied in `rs-ch7.css`, `rs-ch10.css`, `cpp-ch8.css` and `go-ch10.css`. They override the engine's sizes, including the `.mem-svg.narrow` rules the engine removed. Delete them.

## 4. Walkers set to `white-space: pre`

`.recipe li { white-space: pre; … tab-size: 2 }` appears in these files: `go-ch1/2/3/4/5/6/7/9/10/11/12/13/14/15/16/18/20/23/27.css`, `js-ch15.css` and `js-ch21.css`. These walkers don't wrap, so they get no hanging indent or punctuation breaks, and long lines hide behind the card edge.

Now that wrapped lines keep their indent, consider deleting `white-space: pre` and checking at 390.

## 5. Other items the refresh enables

- **py ch9, `.gang code` (py-ch9.css:35) and `.rogue-name` (:17).** `overflow-wrap: anywhere` breaks `ZeroDivisionErro|r` at 1280. Use `overflow-wrap: break-word`, or write `ZeroDivision<wbr>Error` (also FileNotFound, Attribute).
- **py ch1, panel 10 anatomy line.** It now wraps between parts. Check whether py-ch1.css still needs a phone font size.
- **Critters drawn at `.sm` or in tight chapter layouts** still render index and drawer labels under 12px:
  - Tumble in py ch9 panels 8, 13 and 41 (drawn about 90px wide)
  - the cabinet on py ch8 p7
  - the py ch10 cast parade (p51)

  Draw them at the default `.char` width or larger, or drop the small sizing.
- **Parsons `alts`.** Wherever a reviewer found a second valid order, capture it as its own program (e.g. `x_alt.py`) and add `"alts": [{"order": [...], "program": "x_alt.py"}]`. Only orders proven by a real run.
- **Fill `sets`.** Wherever two blanks have `accept` lists that combine into code that doesn't compile (e.g. `<` with `1`), replace the per-blank `accept` with complete `sets`.
- **Tracer value-box and heap labels** now widen their box. Chapters that shortened labels to fit (js ch10 machine plates, captions) can restore the full text.
- **python ch3** still carries the `.train-fit` workaround (py-ch3.js/css, engine review finding 22). The train's frame is now 130 units tall with larger index numbers. Re-check ch3 at both widths after deleting the workaround.

## 6. Pages that overflow sideways with every `<details>` open

`tools/check_chapter.js` now opens every `<details>` (notebook pages, text versions, hints) and re-measures. The engine fixed the shared causes (grid notebook pages and list items with long inline code). In the final run, no page fails this check (`tools/review/engine-refresh-check.txt`). With the old engine, py ch10 overflowed by 110px, cpp ch8 by 176px, js ch23 by 214px and rust ch12 by 48px. Watch for new ones: a figure, table or long token placed directly in notebook prose. `.page-body` now breaks long words, but an SVG or a `white-space: pre` block outside a scroller will still widen the page.

## 7. Not done in the engine round (deliberately)

- **Engine review finding 81 (map token placed outside the box).** The token would cover roads and labels to the right of boxes near the edge. It needs a per-map visual check of about 129 maps.
- **Finding 57 (stack walkers with long lines at 1280).** This is a layout change for every walker. Wrapped walker lines now keep their indent, which removes most of the reason for it. Revisit after the fix round's screenshots.
- **Findings 24 (`.pair` promotion), 45 (borrow/link arrow style), 48 (drop slots of dead objects), 72 (JS inside `.html` programs), 75 (multi-line docstrings in per-line widgets) and 79 (`data-fold="gcc-notes"`).** Each is a new feature or a layout change, not a one-line fix.
- **Findings that need `capture.py` or program changes:** 8, 9, 33, 35, 47, 58, 61, 68 and 71. These include the recaptures for go ch1–8, ch11, ch15, ch16 and ch21, and javascript ch1, ch8 and ch15.
