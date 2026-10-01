# Fix bundle: rust/ch19.html

10 review findings, 0 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel P10 (.stamp-drop on the three due cards) @1280** (visual-rs-16-20): The three due-date cards drop in over 600ms from 26px above at 115%, 350ms apart (1.3s in total).
   - evidence: rs-ch19.css:145-148 `ch19-stamp 0.6s ease-out`, delays 0.35s/0.7s.
   - fix: `ch19-stamp 0.6s ease-out` → `240ms var(--ease-out)` from `translateY(-8px) scale(1.04); opacity: 0`, delays 60ms/120ms.
2. **[medium] [visual] panel P14, P17, P18, P21, P31, P32 @1280** (visual-rs-16-20): Six panels put two compiler runs side by side on desktop, so the E0597/E0515/E0502 and 'lifetime may not live long enough' messages are cut off mid-word in 340px terminals.
   - evidence: rs-ch19.css:40 `.runs2 { grid-template-columns: minmax(0,1fr) minmax(0,1fr) }`. Crop: scratchpad/review-visual-rs-16-20/v9.png ('does not live long eno', 'let's call the life', '- `b` dropped here while still').
   - fix: `.runs2 { grid-template-columns: minmax(0,1fr) minmax(0,1fr) }` → `minmax(0,1fr)`, with a dashed divider between the two runs as in rs-ch16.css:43-45.
3. **[medium] [visual] panel P5, P15 (loan timeline) @1280** (visual-rs-16-20): Each new bar cell grows in over 350ms from 30% height on every Next press, including arrow-key presses (measured: getAnimations() on new cells reports lf-grow, 350ms, at 1280).
   - evidence: rs-ch19.css:118-119 `.motion .lf-cell.on { animation: lf-grow 0.35s ease-out both }` from `scaleY(0.3); opacity: 0.4`. Emil: keyboard-initiated, frequently repeated actions get no or minimal animation; DESIGN_SYSTEM: UI ≤300ms, `--ease-out`.
   - fix: `animation: lf-grow 0.35s ease-out` from `scaleY(0.3)` → `animation: lf-grow var(--dur-fast) var(--ease-out) both` from `scaleY(0.9); opacity: 0` (or delete it: the bar's new row is already marked by the ▶ line).
4. **[medium] [content] panel after 27 (exercise ex-e0726)** (content-rs-19-21): A scored predict exercise asks the reader to type an error code (E0726) that the chapter never shows before the exercise. The hint admits it ("It's a new code"), so the first answer can only be a guess. The check doesn't follow the idea it tests.
   - evidence: ex-e0726-m: "answer": "E0726", "ask": "Which error code does the Compiler print? Type it like E0000.", hint: "It's a new code. Run your eye down the real error when you check". E0726 appears nowhere on the page before this exercise (the cheat sheet in panel 33 comes later).
   - fix: Show impl_missing.rs and its E0726 in panel 27's prose first, then ask something the reader can work out, e.g. a choice exercise: "Which fix does the help suggest?" (impl Excerpt<'_>), or a fill of `<'a>` on the impl line.
5. **[low] [content] panel 9** (content-rs-19-21): The readlist says the help shows ++++ under four places. The capture shows ++++ only under the new <'a> and ++ under the three &.
   - evidence: Readlist: "help: consider introducing a named lifetime parameter , with ++++ under four places to add 'a". longest_nolife.rs stderr: "1 | fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {" / "  |           ++++     ++          ++          ++".
   - fix: "…with + marks under the four places that gain a stamp: <'a> and each &."
6. **[low] [visual] panel P2, P10, P28, P36 @390 and 1280** (visual-rs-16-20): The due-date cards are drawn so small that their printed text is 8–11px: 'DATE DUE' 8.2px and `x`/`y` 8.7px in P10 at 390, `&'a str` 11.6px in P28 at both widths, and the teaser's `map`/`filter` labels 8.2px (P36).
   - evidence: audit small-text list for a19; rs-ch19.css:31 shrinks `.boxes .char.sm` to 82px; rs-ch19.js:41 uses 15–18 unit title text. Crops: scratchpad/review-visual-rs-16-20/v10.png (P10, P28), v11.png (P36).
   - fix: Keep the cards at ≥120px (`.boxes .char.sm { width: 120px }` on phones) and raise the duecard's 'DATE DUE' to 20 units; give the P36 teaser `min-width: 420px` inside `.picscroll`.
7. **[low] [visual] panel P5, P15 (loan timeline) @390** (visual-rs-16-20): The timeline's line numbers are 11.2px on phones, below the 12px floor (measured computed font-size 11.2px; code 12.8px).
   - evidence: rs-ch19.css:128 `.lf-no { font-size: 0.7rem }` in the ≤560px block (audit: '1'…'16' at 11.2px). Crop: scratchpad/review-visual-rs-16-20/a19/w390-008-p5.png.
   - fix: `.lf-no { font-size: 0.7rem }` → `0.75rem` (12px).
8. **[low] [content] panel choice exercises ex-literal, ex-edition, ex-b6** (content-rs-19-21): In three choice exercises the right option is by far the longest. ex-literal's right option also carries its own reasoning, so it can be picked on length alone.
   - evidence: Lengths in characters, right option first: ex-literal [113, 39, 71, 24]; ex-edition [126, 44, 56, 51]; ex-b6 [73, 42, 37, 44]. ex-literal right option: "Yes, and it prints Ulysses. Text in quotes is never dropped, so only a limits the result, and a lives to the end." See INTEGRATION_TODO "From the review swarm": CHOICE LENGTH BIAS.
   - fix: Trim the right options to the claim alone (e.g. "Yes, and it prints Ulysses.") and move the reasoning into `why`. Lengthen one wrong option in each.
9. **[low] [content] panel notebook: Lab, step 4** (content-rs-19-21): The lab says `cargo fix --edition --allow-dirty` 'shows what it would change'. It actually rewrites the source files to apply the migration. A reader may not expect their code to change.
   - evidence: Lab 4: "try cargo fix --edition --allow-dirty on a project set to 2021: Cargo shows what it would change for 2024." cargo fix applies the edition-migration lints to the files in place. The --allow-dirty flag is needed precisely because it edits files.
   - fix: "…Cargo rewrites your code where 2024 means something different (here it adds + use<>), and lists the files it fixed. Then set edition = \"2024\"."
10. **[low] [visual] panel whole chapter (rs-ch19.css, rs-ch19.js) @both** (visual-rs-16-20): The timeline introduces colours that aren't tokens and an `!important` override, and other cards are hand-rolled.
   - evidence: `.life-legend .sw` and `.lf-cell.on.owner` use `#E8D3B0`, `.loan` uses `#C9F2D9`/`#FFFFFF` (= --mint/--paper written raw), `.lf-codehead { font: … !important }` (lines 105, 135); rs-ch19.js hard-codes `RED = "#B00020"`; `.rules li`, `.choose2 > div` are cards with radius 12px, `.sigcard` radius 10px; `.page-body details` rules duplicate the engine.
   - fix: Use `var(--mint)`, `var(--paper)`, `var(--error)`; add the owner tan as a palette token or reuse `--sketch-paper`; replace `!important` with a more specific selector (`.lf-head .lf-code`); radii → `var(--radius-lg)`.

## Engine-refresh clean-ups for this chapter
- `rs-ch19.js:180`
- `rs-ch19.css:60` `.ops td code, .ops th code`
