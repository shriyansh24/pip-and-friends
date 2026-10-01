# Fix bundle: javascript/ch19.html

16 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 12 (the three levels, tested) @390** (visual-js-16-20): levels.js prints a padded table (padEnd(17)/padEnd(7)), but the terminal is `term wrap`, so on phones the columns fold: `seal … delete:` / `refused` and `freeze … change: refused delete:` / `refused`. The three locks become hard to compare.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/z6.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a19/w390-021-p12.png). ch19.html:253 `<pre class="term wrap" data-run="levels.js">`.
   - fix: `<pre class="term wrap" data-run="levels.js">` → `<pre class="term" data-run="levels.js">` (it scrolls, and the columns stay aligned). Why: output whose layout is its meaning shouldn't wrap.
2. **[medium] [visual] panel 3, 4, 11, cover (switch panels) @both** (visual-js-16-20): The switch panel's ON/OFF words, which the page says carry the state 'never colour alone', render at 9.7-11.1px at 1280 and on phones (cover: 8.2-9.9px), because the 380-unit drawing is capped at 300px wide inside a much wider card.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a19/w1280-008-p4.png (panel about 290px wide in a 716px card); audit small text: p3/p4/p11 ON 10.8-11.1px, OFF 9.7-9.9px. js-ch19.css:31 `.props19 .char { max-width: 300px }`; js-ch19.js:60 font-size 14 / 12.5.
   - fix: `.props19 .char { width: 100%; max-width: 300px }` → `max-width: 420px`, and js-ch19.js:60 `font-size="(on ? 14 : 12.5)"` → `16` for both (widen the switch rect from 62 to 70 units). Why: the words are the state signal, so they must stay at 12px or more.
3. **[medium] [visual] panel 35 (the three hints table) @390** (visual-js-16-20): The hint-name column breaks the three keywords in the middle: `"st|ring"`, `"nu|mber"`, `"de|faul|t"`.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/z7.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a19/w390-057-p35.png). js-ch19.css:61 `table.hints19 code { overflow-wrap: anywhere }`, and the first column gets about 40px.
   - fix: `table.hints19 code { overflow-wrap: anywhere }` → `table.hints19 td:first-child code { white-space: nowrap; overflow-wrap: normal }` (keep `anywhere` only for the middle column). Why: the hint names are the words the reader must learn, so they shouldn't split.
4. **[medium] [visual-engine] panel 45 (what you learned, card 1) @1280** (visual-js-16-20): The token `Object.getOwnPropertyDescriptor` in a recap card has no break point and runs past the card's right border, cut off as `Object.getOwnPropertyDes`.
   - evidence: Crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/z5.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a19/w1280-080-p45.png). comic.css:268 `.recap li` has no rule for long inline code. The 11:15 integration pass added `overflow-wrap: break-word` for code in `.caption, .bubble, .narration, .readlist li, .checklist li`, but not `.recap li`.
   - fix: In the integration-pass rule `:is(.caption, .bubble, .narration, .readlist li, .checklist li) :is(code, samp) { overflow-wrap: break-word }` → add `.recap li` and `.duo-card p` to the list. Why: recap cards are narrow (min 200px) and the JS books name long APIs there.
5. **[medium] [content] panel 5 @1280/390** (content-js-19-21): The caption says the strict file is "on the left" and the sloppy one "on the right", but .two-files without .side is one column at every width, so the two files are stacked.
   - evidence: Caption: "On the left, a .js file ... On the right, a .cjs file". Markup <div class="two-files"> (no .side); assets/ext/js-ch19.css:77 .two-files { grid-template-columns: minmax(0, 1fr) }.
   - fix: Say "First, a .js file ... Second, a .cjs file" (or refer to the file tabs), or add class side so they really sit side by side at 1280 px.
6. **[medium] [content] panel ex-hints (after 37)** (content-js-19-21): The hint for the predict exercise points at the wrong line: unary plus is on line 12 of predict_hints.js, not line 13.
   - evidence: Hint: "For line 13, which hint does unary + send, and then what does the second + do?" predict_hints.js: 12| console.log(+seat + 1);  13| console.log(String(seat).length);
   - fix: Change "For line 13" to "For line 12".
7. **[low] [content] panel 13 (machine m-freeze, fz_push chip)** (content-js-19-21): The note says built-in methods "always" report a failed write, which is too broad: Reflect.set and Reflect.defineProperty return false instead of throwing.
   - evidence: Note: "push is a built-in method, and built-in methods always report a failed write." Scratch run on Node 22: Reflect.set(Object.freeze([1]), 0, 2) returns false and throws nothing. The notebook's narrower wording ("Built-in methods such as Array.prototype.push are specified to throw") is correct.
   - fix: "push is a built-in method, and array methods like push throw when a write fails, even in sloppy code."
8. **[low] [visual] panel 3, 4, 11, 27 (switchpanel, inkcab); ch20 2, 13, 19 (coatcheck, guestlist) @both** (visual-js-16-20): The chapter's diagram-like props wrap their whole drawing, labels included, in the engine's `.bob` idle loop, so a table of switches, drawers and tickets the reader is meant to read moves up and down every 2.4s.
   - evidence: js-ch19.js:33/70/96 and js-ch20.js coatcheck/guestlist/dispenser `var out = '<g class="bob">'`. Verified with Playwright: `bob 2.4s` running at 1280 with motion on; it stops correctly with 'Animations: off' and prefers-reduced-motion.
   - fix: `var out = '<g class="bob">'` → `var out = '<g>'` for switchpanel, inkcab, coatcheck and guestlist (keep the bob on the face characters: pager, puppet, storyteller). Why (Emil, standard 1): motion needs a purpose. An idle loop on a reference diagram only makes its labels harder to read.
9. **[low] [content] panel 31** (content-js-19-21): The claim that a template literal also refuses a symbol is stated as fact but no capture backs it (it is true).
   - evidence: "A template literal, `${note}`, refuses too." No program in data/js-ch19.json runs `${symbol}`. Scratch run on Node 22: `${Symbol('note')}` throws TypeError: Cannot convert a Symbol value to a string.
   - fix: Add one line to symbol_plus.js (or a new symbol_tmpl.js) that tries `${note}` inside try/catch and prints the message, then recapture; or drop the sentence.
10. **[low] [book] panel 32 (the well-known symbols)** (book-js): A card promises Symbol.asyncIterator for Chapter 25, but Chapter 25 never mentions it (async generators and for await are taught there without the symbol).
   - evidence: ch19 line 576: '<h3>Symbol.asyncIterator</h3><p>The same as iterator, for for await...of.</p><span class="when">Chapter 25</span>'. grep -l asyncIterator javascript/*.html finds only ch19. The plan's ch19 not_yet also says 'Symbol.asyncIterator (ch25)'.
   - fix: Add one sentence to ch25 Part 3 (async generators): 'for await looks for a [Symbol.asyncIterator]() method, the async twin of Chapter 20's Symbol.iterator; an async generator has one built in.' Or change the ch19 card's 'when' to 'Chapter 25 uses it without naming it'.
11. **[low] [content] panel 32 (well-known symbols card)** (content-js-19-21): The Symbol.asyncIterator card promises Chapter 25, but Chapter 25 never mentions Symbol.asyncIterator. It teaches async generators and for await...of without naming the hook.
   - evidence: Card: "Symbol.asyncIterator · The same as iterator, for for await...of · Chapter 25". grep of javascript/ch25.html for 'asyncIterator': 0 matches.
   - fix: Add one sentence in ch25 Part 3 naming Symbol.asyncIterator as the hook that for await...of looks for, or reword the ch19 card to "for await...of (Chapter 25)".
12. **[low] [content] panel 35** (content-js-19-21): The hint table's column is headed "Who asks with it (from the run above)", but it lists operations hints.js never runs: Number(x), / % -, < <= >=, and using an object as a property key.
   - evidence: hints.js runs only `${spy}`, String(spy), +spy, spy * 2, spy > 5, spy + 1 and spy == 7.
   - fix: Change the header to "Who asks with it", or mark the rows the run shows.
13. **[low] [content] panel 40** (content-js-19-21): "Every other built-in object answers 'default' as if it were 'number'" is too broad: a Symbol wrapper's Symbol.toPrimitive ignores the hint and returns the symbol, as the chapter's own notebook says.
   - evidence: Panel 40 text, against the notebook: "Symbol.prototype[Symbol.toPrimitive] returns the symbol itself". Scratch: typeof Object(Symbol('s'))[Symbol.toPrimitive]('number') is 'symbol'.
   - fix: "Ordinary objects and most built-ins answer 'default' as if it were 'number'."
14. **[low] [content] panel Notebook: Lab step 2.2** (content-js-19-21): The lab says "watch line 6 crash", but after pasting deepFreeze above shallow.js the push is on line 13, and the error is a different one from the page's frozen-write message.
   - evidence: Scratch run (Node 22) of shallow.js with deepFreeze pasted above: crashes at lab.js:13 `show.cast.push("Bo")` with TypeError: Cannot add property 1, object is not extensible.
   - fix: "...and watch the push line crash instead (Cannot add property 1, object is not extensible)."
15. **[low] [content] panel ex-b5** (content-js-19-21): The boss parsons explanation quotes a line that isn't in the program: it says `]),` but line 6 of boss_parsons.js is `]);`.
   - evidence: Explain: "<code>]),</code> closes the pair and the map call." boss_parsons.js line 6: `]);`
   - fix: Change it to "<code>]);</code> closes the pair, the map call and the statement."
16. **[low] [content] panel ex-sym, ex-eq** (content-js-19-21): Choice length bias: in two questions the correct option is far longer than the others, and ex-eq's correct option carries its own explanation.
   - evidence: Option lengths in characters: ex-sym [109 correct, 57, 64, 41]; ex-eq [79 correct, 31, 46, 17]. ex-eq correct text: "false, because two objects are compared by identity and valueOf is never called".
   - fix: Cut the correct options down to similar length (e.g. ex-eq: "<code>false</code>") and move the reasoning into its why.

## INTEGRATION_TODO lines naming this chapter
- ## From js ch19 (Switches and Invisible Ink)

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `js-ch19.css:61` `table.hints19 code`
