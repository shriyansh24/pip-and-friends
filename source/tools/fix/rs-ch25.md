# Fix bundle: rust/ch25.html

7 review findings, 0 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [book] panel 48 (teaser)** (book-rs): The teaser promises that Chapter 26 will show why set_var is risky with threads, but Chapter 26 never mentions set_var or environment variables.
   - evidence: ch25 Panel 48 (line 999): 'And you'll see exactly why set_var was so nervous about other threads.' grep in ch26.html: 'set_var' 0 matches, 'environment' / 'env::' 0 matches.
   - fix: Either remove that sentence from the ch25 teaser, or add one line to ch26 (e.g. in the data-race or Send/Sync part): 'This is why set_var is unsafe in edition 2024 (Chapter 25): the environment is one shared value that any thread might be reading.'
2. **[medium] [content] panel 48 (teaser)** (content-rs-25-27): Promise not kept: the teaser says Chapter 26 will show 'exactly why set_var was so nervous about other threads', but Chapter 26 never mentions set_var or environment variables.
   - evidence: ch25 Panel 48: "And you'll see exactly why set_var was so nervous about other threads." grep -c 'set_var\|environment' rust/ch26.html returns 0.
   - fix: Either drop that sentence from the ch25 teaser, or add one line in ch26 (after Panel 15's data-race explanation, or on the 'Common wrong ideas' page): "This is why Chapter 25's set_var needs unsafe: the environment is one shared value that any thread may read, with no lock around it."
3. **[low] [content] panel 25** (content-rs-25-27): Line-number drift: the bullet headed 'Line 7' says args[1] would panic, but args[1] is on line 6.
   - evidence: args_strings.rs line 6 `let top = &args[1];`, line 7 `println!("top + 1 = {}", top.parse::<i64>().unwrap() + 1);`. Bullet: "Line 7 : … Here unwrap() would panic on --top lots , and args[1] would panic if there were fewer than two words."
   - fix: Head the bullet "Lines 6–7".
4. **[low] [visual] panel ch25 cover, P2 (.flow), P17 (.drop-in) @1280** (visual-rs-21-25): ch25 copies ch22's 0.8s overshooting drop (ch25-drop) and adds a 1.2s × 3 dash 'flow'. The flow is illustration (linear is right for constant motion), but the drop has the same duration, easing and blink problems as ch22.
   - evidence: rs-ch25.css: '.motion .panel.played .drop-in { animation: ch25-drop 0.8s ease-out 0.3s 1 both }', '.flow { animation: ch25-flow 1.2s linear 0s 3 both }'. Reduced motion and 'Animations: off' stop both (engine rules comic.css:331-337).
   - fix: animation: ch25-drop 0.8s ease-out 0.3s both → animation: ch25-drop var(--dur-move) var(--ease-out) both from scale(0.95) + opacity 0 (Emil: <300ms, start at 0.95 + opacity, custom ease-out)
5. **[low] [content] panel choice ex-setvar-choice, ex-booth2** (content-rs-25-27): Choice length bias: the correct option is by far the longest, which gives it away (cross-cutting item 'CHOICE LENGTH BIAS').
   - evidence: Option text lengths (tags stripped), correct first: ex-setvar-choice [112, 53, 31, 54]; ex-booth2 [39, 10, 14, 21].
   - fix: Shorten the correct option (e.g. "Read it once into a settings struct and pass that around") and lengthen one distractor.
6. **[low] [content] panel notebook: Under the hood, Newtypes cost nothing** (content-rs-25-27): The notebook states as a rule that a one-field struct has the same size and layout as its field. With Rust's default representation, layout isn't guaranteed; only #[repr(transparent)] guarantees it. In practice the size is the same.
   - evidence: Page: "A struct with a single field has the same size and layout in memory as that field, and the Compiler optimises the wrapper away." Rust Reference, type layout: the default representation makes no layout guarantees; repr(transparent) gives the same layout as the single non-zero-sized field.
   - fix: "In practice a struct with a single field has the same size as that field (Meters(f64) is 8 bytes), and #[repr(transparent)] makes that a guarantee."
7. **[low] [content] panel parsons ex-b4** (content-rs-25-27): The impl block (lines 4–8) and main (lines 10–14) are both 5 lines and can trade places around the fixed blank line. The swapped program compiles and prints the same output, and the grader would mark it wrong. The prompt does state the order ('…then a main'), which softens this.
   - evidence: boss_parsons.rs pin [1, 2]; Rust item order is free; output "The reading room is 20.0 °C" either way.
   - fix: Pin line 10 (`fn main() {`) so the halves can't swap, or keep the prompt's explicit order and add "(impl first)".

## Engine-refresh clean-ups for this chapter
- `rs-ch25.css:29` `.ops td code`
