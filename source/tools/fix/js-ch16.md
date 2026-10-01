# Fix bundle: javascript/ch16.html

10 review findings, 4 INTEGRATION_TODO lines, 2 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 10 (four beats) and the cover @390 (also 1280)** (visual-js-16-20): In the four-beat strip the pager's state words, the only non-colour cue for pending versus fulfilled, render at 8.5px (WAIT, BUZZ!) and its #7 tag at 6.2px on phones (10.2px and 7.4px at 1280). The cover pager's #16 tag is 11px.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/z1.png (right column, from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a16/w390-019-p10.png); /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a16/w1280-019-p10.png. js-ch16.css:30 `.beat16 .pics .char.pg { width: 74px }` and :66 `width: 62px` at ≤640px; the pager draws WAIT at 22 units in a 160-unit viewBox.
   - fix: `@media (max-width: 640px) { .beat16 .pics .char.pg { width: 62px } }` → `@media (max-width: 480px) { .beats16 { grid-template-columns: minmax(0,1fr) } .beat16 .pics .char.pg { width: 110px } }` (WAIT then draws at about 15px). Why: state words must stay readable (12px minimum), because they are what keeps state from resting on colour alone.
2. **[medium] [content] panel 20, 21** (content-js-16-18): The prose says "Left:", "Right:" and "the right-hand program", but `.two-files` is a single column at every width, so the two programs are stacked, not side by side.
   - evidence: ch16.html:411-412 "<b>Left:</b> getUser ..." / "<b>Right:</b> getTicket ..."; ch16.html:420 "The fix for the right-hand program is one word on line 8." assets/ext/js-ch16.css:57 `.two-files { display: grid; grid-template-columns: minmax(0, 1fr); }` (no wider breakpoint). This is the open review-swarm item 'LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS', with new instances here.
   - fix: Refer to the files by name: "forgot_await.js:" / "forgot_slow.js:" and "The fix for forgot_slow.js is one word on line 8."
3. **[medium] [content] panel 37 (next-chapter card)** (content-js-16-18): The Chapter 17 teaser promises "the four rules for `this`", but Chapter 17 teaches five rules (arrow, new, explicit, implicit, default), on its cover, in panel 25 and on the map.
   - evidence: ch16.html:764 "Closures, the backpack every function carries, and the four rules for <code>this</code>." ch17 cover: "a ventriloquist shows the five rules that decide who \"me\" is"; ch17 P25 "Five rules decide `this`."
   - fix: Change the ch16 teaser to "the five rules for `this`" (or "the rules for `this`").
4. **[medium] [content] panel 7** (content-js-16-18): Panel 7 calls `timeout` "a Linux and macOS command". macOS doesn't ship it, and the page's own lab says so, so the page contradicts itself.
   - evidence: P7: "the run is wrapped in `timeout 2`, a Linux and macOS command that stops a program after 2 seconds." Lab step 2: "macOS needs coreutils from Homebrew for `timeout`."
   - fix: P7: "`timeout 2`, a Linux command (on macOS it comes with Homebrew's coreutils) that stops a program after 2 seconds."
5. **[low] [visual] panel 10, 12, 23, 26, 27 (pager) @both** (visual-js-16-20): js-ch16.js redefines `L.cast.pager`, a byte-for-byte copy of the engine's comic-critters.js pager. Because it loads later, it silently overrides any future engine fix to the pager, such as label sizes.
   - evidence: `diff` of the `L.cast.pager = {…}` blocks in assets/comic-critters.js:548 and assets/ext/js-ch16.js:19 gives identical output; AUTHORING 'pager critter (engine note)'.
   - fix: Delete js-ch16.js's `L.cast.pager` block (the file then holds only its header) and drop its `<script>` tag. Why: one source for shared characters.
6. **[low] [content] panel 35 (ex-b1-m explain)** (content-js-16-18): The Boss 1 explanation puts the cake starting before `sync` prints, but the cake is only ordered on line 13, after line 12 prints `sync`.
   - evidence: ex-b1-m explain: "Script: `serve(\"tea\")` and the cake both start cooking; line 12 prints sync; line 13 waits." boss_predict.js: line 10 `serve("tea", 60)`, line 12 `console.log("sync")`, line 13 `await serve("cake", 10)`.
   - fix: "Script: line 10 starts the tea; line 12 prints sync; line 13 starts the cake and waits for it."
7. **[low] [content] panel after 17 (ex-asyncret-m, choice)** (content-js-16-18): This choice asks for a printed output (`console.log(total())`) with no captured program behind its key. AUTHORING keeps choice for concepts and leaves outputs to predict.
   - evidence: Key: "Promise { 5 }". No total.js in data/js-ch16.json. A scratch run on Node 22.23.4 does print `Promise { 5 }`, so the key is right but unbacked.
   - fix: Turn it into a `predict` on a captured `total.js`, or keep the choice and add `"program": "total.js"` so the key is tied to a real run.
8. **[low] [visual] panel beats16, lanes16, rules17, vent17, props17/19/20 figures, legend19, pipe19, wk19, venn20, flow20 @both** (visual-js-16-20): Each chapter hand-rolls its own card (3px ink border, `border-radius: 12px`, `box-shadow: 4px 4px 0`) instead of using the engine's `.duo-card` or card tokens, so radii and shadows drift from the system (`--radius-lg` 14px, `--shadow-hard` 3px or `-lg` 6px).
   - evidence: js-ch16.css:25,46; js-ch17.css:25,37,50; js-ch19.css:26,38,48,63; js-ch20.css:26,40,54. None uses `var(--radius-lg)` or `var(--shadow-hard*)` (grep finds no token use in any of the five files).
   - fix: `border-radius: 12px; box-shadow: 4px 4px 0 var(--ink)` → `border-radius: var(--radius-lg); box-shadow: var(--shadow-hard-lg)`, or replace the markup with `.duo` / `.duo-card` plus the tint classes. Why: cards should share one radius and shadow scale (shadcn Card mapping, DESIGN_SYSTEM §3).
9. **[low] [content] panel ex-thirteen-m** (content-js-16-18): Choice length bias: the correct option is by far the longest (101 characters against 39-54 for the others). In ch16, 4 of 6 choice keys are the longest option.
   - evidence: Script over the page's JSON models: ex-thirteen-m lengths [101 correct, 54, 46, 39]. Open swarm item 'CHOICE LENGTH BIAS'.
   - fix: Shorten the key ("A top-level await waited on a promise nothing could settle") or lengthen two distractors.
10. **[low] [book] panel next-chapter strip after panel 37 (line 764)** (book-js): The NEXT line promises 'the four rules for this'. Chapter 17 teaches five rules: arrow, new, explicit, before the dot, and nobody.
   - evidence: ch16 line 764: 'Closures, the backpack every function carries, and the four rules for <code>this</code>.' ch17 P25 aria-label 'the five rules for this'; ch17 blurb 'a ventriloquist shows the five rules that decide who "me" is'; ch17 recap lists five.
   - fix: Change 'four rules' to 'five rules' (or 'the rules').

## INTEGRATION_TODO lines naming this chapter
- ## From python ch25 / js ch16
- js ch16: `await` in a non-async function inside an ES module gives "Unexpected reserved word", unlike CommonJS. The page shows both; the JS plans and notes should match.
- `pager` promoted to comic-critters.js (from js-ch16). js-ch24's `pager24` copy can be switched to `pager` in the fix round. `using` added to JS highlighter keywords.
- Real finding: at the top level of an ES module, promise callbacks run before process.nextTick; in CommonJS, nextTick runs first (both Node versions). Check that js ch16's event-loop explanation doesn't contradict it.

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
