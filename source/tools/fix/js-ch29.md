# Fix bundle: javascript/ch29.html

10 review findings, 1 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [book] panel 47 (the whole book, part two)** (book-js): The closing list of 'six ideas that ran through the whole book' starts with 'read errors last line first'. That is the Python book's rule, and the JavaScript book explicitly teaches it as a wrong idea for Node.
   - evidence: ch29 line 983: 'Six ideas that ran through the whole book: <b>read errors last line first</b>; ...'. ch12 notebook, Common wrong ideas (line 992): '"The last line of the report is the important one." In Node it's the version footer. The Name: message line is in the middle.' ch12 P15 (line 375): 'Don't read only the last line. It just says Node.js v26.13.0.' ch1 P31 checklist (line 913): 'The last line just names the Node version.' ch1 recap: 'NAME, PLACE, CARET: Read Name: message, then the file and line, then the caret.' ch12 recap: 'Read it in order: the Name: message line, the file and line at the top, the copied line and its caret, then the at footprints.'
   - fix: Change the first idea to '<b>name first, then place, then caret</b>' (ch1's NAME, PLACE, CARET), or to 'read the <code>Name: message</code> line first'.
2. **[medium] [content] panel after 12 (ex-weakkey)** (content-js-28-29): This exercise gives its answer away. It asks for the exact error message the reader just saw, and the terminal plus a sentence quoting it sit directly above.
   - evidence: ex-weakkey-m: "You've just seen this one. Without scrolling up: what exactly does Node say?" with answer "Invalid value used as weak map key". Directly above: weak_key_error.js terminal, plus the readlist "Read it like a detective: last part first, <samp>TypeError: Invalid value used as weak map key</samp>." The predict checks the same program it follows (weak_key_error.js), so typing it back proves only recall from a few lines up.
   - fix: Point the predict at a new program where the reader must decide whether it fails at all, e.g. `new WeakMap().set(Symbol('a'), 1)` (works) vs `.set(Symbol.for('a'), 1)` (registered symbol: TypeError). Or turn it into a choice: which of these keys is refused? Then capture it.
3. **[low] [visual] panel 22 @390** (visual-js-26-29): In the Family Tree room card, 'O(log n)' breaks between 'O(log' and 'n)', which splits the notation the chapter teaches.
   - evidence: crop a29/w390-037-p22.png (scratch, deleted): '…halves the search: O(log' / 'n), if the tree stays bushy.'
   - fix: `O(log n)` → `O(log&nbsp;n)` everywhere in prose (also `O(n log n)` → `O(n&nbsp;log&nbsp;n)`) so Big-O names never break
4. **[low] [content] panel 42** (content-js-28-29): The checklist talks about 'the seen set' right under bfs.js, which has no seen set: it uses a `stops` Map. Only dfs.js has `seen`.
   - evidence: Panel 42 checklist: "Graphs can have loops. Without the <code>seen</code> set, a two-way line would bounce forever." bfs.js line 11: `const stops = new Map([[start, 0]]);`. dfs.js line 10: `seen = new Set()`.
   - fix: "Without the <code>stops</code> map (BFS) or the <code>seen</code> set (DFS), a two-way line would bounce forever."
5. **[low] [content] panel 43** (content-js-28-29): "Calls almost double with each step" overstates the growth: the captured counts grow about 1.62x per step (the golden ratio), not about 2x.
   - evidence: fib_memo.js: plain 177 calls (n=10), 21,891 (n=20), 2,692,537 (n=30). Each +10 multiplies by about 123, which is 1.618^10, while 2^10 = 1024. Panel 43: "The plain recipe's calls almost double with each step of n ... O(2^n)-ish".
   - fix: "grow by about 1.6 times with each step of n (2.7 million for fib(30)): exponential, worse than any shape on the speed board."
6. **[low] [visual] panel 44 @390** (visual-js-26-29): The 'THE FINAL BOSS LEVEL' heading runs under the BOSS! sound-effect burst, which covers 'LEVEL'.
   - evidence: crop a29/w390-078-p44.png (scratch, deleted): the heading reads 'THE FINAL BOSS LEVE' with the burst over the end. At 1280 it is clear.
   - fix: add `.panel:has(> .sfx.tr) > .boss-h, .panel:has(> .sfx.tr) > h2 { margin-right: clamp(70px, 20%, 160px) }` to js-ch29.css (ch28.css:64 already does this for captions)
7. **[low] [book] panel 47 (whole-book card for Chapter 28)** (book-js): Still open from INTEGRATION_TODO 'From js ch29': the Chapter 28 card is the only one of 29 with no catchphrase. All 28 other cards match their chapters' real recaps, which I checked one by one.
   - evidence: ch29 line 977: '<li><span class="num">CHAPTER 28</span><a href="ch28.html">Theater and Mail</a><p>The browser in depth...' (no <span class="cp">). ch28 recap catchphrases: 'CLOSEST LOOKS UP, STARTING WITH ITSELF', 'DON'T STOP THE CUE. CHECK WHERE IT CAME FROM.', 'THE CUPBOARD ONLY HOLDS PAPER. FOLD OBJECTS WITH JSON.', 'DATES GO OUT AS DATES AND COME BACK AS STRINGS.', 'AN ENVELOPE CAME BACK. NOW READ THE STAMP.'
   - fix: Insert '<span class="cp">AN ENVELOPE CAME BACK. NOW READ THE STAMP.</span>' after the ch28 link.
8. **[low] [content] panel after 7 (ex-timing)** (content-js-28-29): The correct option says the Set version stays 'hundreds of times faster', but the captured run shows about 133x (614.1 ms vs 4.6 ms; Node 22: 593.8 vs 4.5).
   - evidence: ex-timing-m correct option: "What matters is that the Set version stays hundreds of times faster". timing.js (nondet) stdout: "includes in a loop: 614.1 ms", "Set lookups: 4.6 ms".
   - fix: "stays more than a hundred times faster".
9. **[low] [content] panel notebook: Common wrong ideas** (content-js-28-29): Output typed into HTML that no run captured (hard rule 1).
   - evidence: "<code>[10, 9, 1].sort()</code> sorts numbers." It sorts their text: <samp>[ 1, 10, 9 ]</samp>. No program in data/js-ch29.json sorts [10, 9, 1]. builtin_sort.js sorts [1, 100, 9, 10] -> `[ 1, 10, 100, 9 ]`.
   - fix: Quote the captured case instead: "`[1, 100, 9, 10].sort()` gives <samp>[ 1, 10, 100, 9 ]</samp> (panel 39)". Or drop the <samp>.
10. **[low] [content] panel notebook: Under the hood** (content-js-28-29): The example doesn't fit the rule it illustrates. It speaks of an O(n) algorithm losing to an O(n^2) one, but TimSort's case is insertion sort (O(n^2)) beating merge sort (O(n log n)).
   - evidence: "It also means an O(n) algorithm with a big constant can lose to an O(n²) one on small inputs, which is exactly why TimSort uses insertion sort for short runs."
   - fix: "...a faster-growing algorithm with small constants can beat a slower-growing one on small inputs: that's why TimSort uses insertion sort (O(n²)) instead of merging for short runs."

## INTEGRATION_TODO lines naming this chapter
- ## From js ch29 (Rush Hour Library), the last JS chapter

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- Drawings too small for any label: python ch10's signposts (52–64px wide, 8.3–10.2px even after the engine grows them), javascript ch29's signpost (74px, 11.8px), rust ch29's inspector stamp (78px, 9.1px). Draw them at the default 130px, or at least 96px.
