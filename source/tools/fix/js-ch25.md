# Fix bundle: javascript/ch25.html

11 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 10 (two timelines) @1280** (visual-js-21-25): The timeline bars play their grow animation at page load, so it has finished long before anyone scrolls to Panel 10 (the explanatory motion is never seen); it also runs 600ms + up to 0.5s stagger with built-in ease-out from scaleX(0.05).
   - evidence: js-ch25.css:71 `.motion .tl25-bar { animation: tl25-grow 600ms ease-out both; animation-delay: var(--d) }` (js-ch25.js:177 sets --d = k*0.25s); the section has no data-play, so nothing gates it on visibility.
   - fix: `.motion .tl25-bar { animation: tl25-grow 600ms ease-out both }` → add `data-play` to the panel and use `.motion .panel.played .tl25-bar { animation: tl25-grow var(--dur-move) var(--ease-out) both; animation-delay: calc(var(--i) * 60ms) }` with the keyframe from `scaleX(0.6); opacity: 0` (play when visible, under 300ms, 30–80ms stagger, no near-zero scale).
2. **[medium] [content] panel 15 (generator card)** (content-js-25-27): Broken cross-reference: generators are credited to Chapter 19, but they are taught in Chapter 20. Chapter 19's own teaser says iterators and generators come next.
   - evidence: ch25 P15: "GENERATOR function* (Chapter 19)". `function*` appears in javascript/ch20.html (7 times) and in no other chapter before 25. The ch19 next-chapter strip says "NEXT: CHAPTER 20 · COAT CHECKS AND DISPENSERS: Map, Set, WeakMap, iterators and generators."
   - fix: Change "(Chapter 19)" to "(Chapter 20)".
3. **[medium] [book] panel 15 (the ticket printer)** (book-js): Says generators (function*) are Chapter 19, but they are Chapter 20 ('The storyteller').
   - evidence: ch25 line 294: '<h3>GENERATOR<small>function* (Chapter 19)</small></h3>'. ch20 Part 5: 'THE STORYTELLER Generators: functions that pause at every yield'; ch19 has no generators.
   - fix: Change '(Chapter 19)' to '(Chapter 20)'.
4. **[medium] [content] panel 18 (Array.fromAsync)** (content-js-25-27): Broken cross-reference: Array.from is credited to Chapter 10, but Chapter 9 introduces it, and Chapter 21 shows it with a mapping function.
   - evidence: ch25 P18: "Like Array.from (Chapter 10), it can map each item on the way." ch9 P46 is "flat and Array.from" (and its notebook uses Array.from({ length: 30 }, (_, i) => i)); ch21 P7 is "Array.from with a recipe". ch10 (Objects) never mentions Array.from.
   - fix: Change to "Like Array.from (Chapter 9; Chapter 21 used its mapping recipe)".
5. **[medium] [content] panel 19 (not_async_iterable.js explanation)** (content-js-25-27): Broken cross-reference: Object.keys is credited to Chapter 11, but Chapter 10 teaches it. Chapter 11 never mentions it.
   - evidence: ch25 P19: "To loop over an object's keys, use Object.keys (Chapter 11)." ch10 L178/L204 teach Object.keys and Object.values; grep finds no Object.keys in ch11.
   - fix: Change "(Chapter 11)" to "(Chapter 10)".
6. **[medium] [visual] panel 35 @390** (visual-js-21-25): The kitchen cheat sheet breaks `process.nex|tTick(fn)`, `queueMicrot|ask(fn)` and `setImmediat|e(fn)` mid-name in the first column.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c25-p35.png; js-ch25.css:84 `.pick25 code { overflow-wrap: anywhere; }`.
   - fix: Same fix as ch24 P36: `.pick25 code { overflow-wrap: anywhere }` → `overflow-wrap: normal` with `<wbr>` after the `.`, and stack the table into cards at ≤560px (keep API names whole).
7. **[medium] [content] panel notebook, Under the hood: "Timers are 'at least', never 'exactly'"** (content-js-25-27): The explanation of an early Boss 1's flaky order (timers set while the loop clock was stale) is stated as fact, but nothing on the page or in the data backs it. INTEGRATION_TODO asks the review to mark it as a guess.
   - evidence: Notebook: "the timers had been set at moments when that clock was out of date by different amounts. Keeping timers well apart … is the cure." No captured program shows it. INTEGRATION_TODO 'From js ch25': "The timers-near-startup swap is documented in its notebook as the author's guess (stale loop clock). Mark it as a guess in review." The current boss_predict.js (same 15 ms gaps) printed the same order in 30 of 30 runs in scratch, so the cause is still unexplained.
   - fix: Reword as a guess: "…printed them in either order on different runs. Our best guess: Node measures timers from a loop clock that is only refreshed at certain moments, so timers set at slightly different moments can drift. Whatever the cause, don't rely on near-ties."
8. **[low] [visual] panel 10 @390** (visual-js-21-25): On phones each timeline is forced to min-width 480px inside a hand-rolled scroller with no 'Swipe sideways' hint, so the one-by-one timeline looks cut off after 'salad'; its ruler labels are 10.2–11px.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c25-p10.png; js-ch25.css:74 `.tl25-stage { overflow-x: auto } .tl25-stage svg { min-width: 480px }`; audit small text 'milliseconds' 10.2px, '0' 11px.
   - fix: `.tl25-stage { overflow-x: auto }` → wrap the svg as the engine's `<div class="picscroll"><svg class="pic-wide">` (560px, built-in swipe hint) and raise the ruler text to 14 units (use the engine pattern; labels ≥12px).
9. **[low] [content] panel 14 (mixed.js)** (content-js-25-27): The text says you must "work out which await waits for which .then", but mixed.js has only one await.
   - evidence: mixed.js line 3 is the only `await`: `const plate = await cook("soup", 20).then(…).then(…)`. P14: "In mixed.js you have to work out which await waits for which .then, and what each arrow returns".
   - fix: Write "you have to work out what the one await is waiting for (the end of the whole chain), and what each arrow returns".
10. **[low] [book] panel 18 (Array.fromAsync collects everything)** (book-js): Sends Array.from to Chapter 10. It's in Chapter 9 (notebook), and its mapping form is taught in Chapter 21.
   - evidence: ch25 line 330: 'Like <code>Array.from</code> (Chapter 10), it can map each item on the way.' grep 'Array.from' ch10.html = 0; ch9 description lists Array.from; ch21 recap: 'Array.from({ length: n }, fn) builds an array from a recipe'.
   - fix: Change '(Chapter 10)' to '(Chapter 21)'.
11. **[low] [visual] panel 2, cover @390** (visual-js-21-25): The spike name plate 'VIP' renders at 9.7px in Panel 2 (10.9px on the cover) and the cover pager tag '#25' at 9.6px.
   - evidence: audit small text: p2 'VIP' 9.7px, cover 'VIP' 10.9px, '#25' 9.6px; .kitchen25 .char 86px wide at ≤640px (js-ch25.css:35).
   - fix: `.kitchen25 figure .char { width: 86px }` → `width: 110px` at ≤640px (keeps the plate word ≥12px; the text column still fits).

## INTEGRATION_TODO lines naming this chapter
- ## From js ch25 (The Chef's Two Spikes)

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- `js-ch25.js:136`
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
