# Fix bundle: rust/ch15.html

7 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 11, 23 @390** (visual-rs-11-15): The cargo-doc page drawing (p11) and the dbg! magnifier drawing (p23) have no phone version: at 390 the rendered docs text is 8.5-9.6px and the probe note 8.5-10.2px.
   - evidence: Measured at 390: p11 'fn shelves_needed(books: u32, per_shelf: ...' 8.5px, 'Returns how many shelves...' 9.6px, 'assert_eq!(shelves_needed(25, 10), 3);' 8.5px; p23 '[file:line]', 'name = value', 'stderr' 8.5px, 'total += books[i];' 10.2px. Markup ch15.html:307 (viewBox 560x250) and :577 (560x200), plain `.fig`. (p21's 'called by' reading 0px is a false positive from its rotate(-90).) (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Use `.picscroll` + `.pic-wide` for both, or add `.fig-narrow` redraws as p2 and p21 do.
2. **[low] [content] panel 26** (content-rs-13-15): The panel puts dbg_macro 'in the "allow" group'. Allow is a level, not a group. dbg_macro belongs to the restriction group, which panel 17's table lists at the allow level.
   - evidence: "it's a lint called <code>dbg_macro</code>, in the \"allow\" group until you switch it on". Panel 17 lists groups (correctness, suspicious, style, complexity, perf, pedantic/restriction/nursery/cargo) and their levels.
   - fix: "…a lint called <code>dbg_macro</code>, in the <code>restriction</code> group, which is set to allow (silent) until you switch it on."
3. **[low] [visual] panel 5, 13, 16, 20, 34, the notebook backtrace and ex-test-fill @1280** (visual-rs-11-15): Even at desktop width, these compiler/test terminals hide the right half of their help, note and caret-label lines behind a sideways scroll, because the page never uses the engine's caret-safe `.term.wrap`.
   - evidence: Audit at 1280: pre.term scrollWidth/clientWidth up to 3.5x (p13 clippy warnings). `grep -c 'term wrap'` = 0 in the page. The engine's .term.wrap (comic.css:164-172) keeps the source line a caret points into unwrapped and wraps the rest with a hanging indent, which is what the 'Terminal wrapping consistency' item in INTEGRATION_TODO asked for. (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: Change these `<pre class="term" data-run=...>` to `<pre class="term wrap" ...>`, then check 390 and 1280 that the carets still sit under their code.
4. **[low] [visual] panel cover / p12 (.sweep), .blink @1280** (visual-rs-11-15): The magnifier 'sweep' runs 1.6s with built-in ease-in-out and travels 60px with rotation; '.blink' flashes opacity three times. Both are far over the motion budget for one-shot panel entrances.
   - evidence: rs-ch15.css:73-76 `ch15-sweep 1.6s ease-in-out 0.3s` (translateX -30px -> +30px -> 0 with +-8deg rotation), `ch15-blink 1s ease-in-out 0.4s 3`. (crops deleted after the review; rerun tools/check_chapter.js --shots or the audit script to regenerate)
   - fix: `ch15-sweep` -> one pass of `var(--dur-move) var(--ease-in-out)` over +-12px; `.blink` -> delete it (a pulse that repeats has no teaching job), or one `fade-in var(--dur-ui)`.
5. **[low] [content] panel ex-clippy-fill (after panel 15)** (content-rs-13-15): The explanation says 'cargo clippy is silent on this version', but fill_clippy.rs was captured only with `cargo run -q`, so no clippy run backs the claim. I checked it myself and it's true.
   - evidence: data/rs-ch15.json fill_clippy.rs has one step, "cargo run -q". My scratch run: clippy 1.99.1 (rustc 1.99.1 58cf8f9c3) on fill_clippy.rs printed nothing and exited with code 0.
   - fix: Add a fill_clippy.cmd step running `cargo clippy -q` (as trail_fixed.cmd does) and recapture, or drop the clause.
6. **[low] [content] panel notebook: Lab, 2. Map your own code** (content-rs-13-15): The lab treats `rand = "0.9"` and `cargo add rand` as the same thing. Chapter 14's real run shows `cargo add rand` writing `rand = "0.10.3"`, and Chapter 14 taught that 0.9 and 0.10 are incompatible requirements.
   - evidence: "Add <code>rand = \"0.9\"</code> under <code>[dependencies]</code> (or <code>cargo add rand</code>)". data/rs-ch14.json cargo_add.rs: "Adding rand v0.10.3 to dependencies", Cargo.toml "rand = \"0.10.3\"".
   - fix: "Run <code>cargo add rand</code> (it writes <code>rand = \"0.10.3\"</code> or newer, as in Chapter 14)".
7. **[low] [content] panel notebook: Lab, 7. Explain an error** (content-rs-13-15): The lab calls E0585 and E0425 'the two error codes this chapter added', but E0425 was already taught in Chapters 13 and 14.
   - evidence: "Run <code>rustc --explain E0585</code> and <code>rustc --explain E0425</code>, the two error codes this chapter added." rust/ch13.html panel 4 reads E0425 (no_use.rs); rust/ch14.html panels 12, 14 and 35 read E0425.
   - fix: "…E0585, the new error code in this chapter, and E0425, which compiler-driven development leans on."

## INTEGRATION_TODO lines naming this chapter
- ## Rust clippy/fmt toolchain bug (found at rust ch15)
- `trailguide` promoted to comic-critters.js (from rs-ch15). Remove the guarded copy in rs-ch28.js.

## Engine-refresh clean-ups for this chapter
- rust/ch15.html: @390: P17 +95px
- `rs-ch15.css:41` `.ops td code`
- Chapter copies that override the engine critter: `rs-ch14.js` (inspector, "TEST" 6.4px), `rs-ch16.js` and `rs-ch24.js` (inspector), `rs-ch15.js` and `rs-ch28.js` (trailguide: compass "N" 4.5px, "CLIFF" 10.2px). Delete them and use the engine's (`grep -n "inspector =\|trailguide =" assets/ext/*.js`). `py-ch21.js` and `cpp-ch18.js` define different, chapter-local inspectors under the same name ("mypy" 7.9px): rename them (house rule on distinctive names) and enlarge their labels.
