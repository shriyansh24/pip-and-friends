# Fix bundle: javascript/ch13.html

6 review findings, 3 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[low] [content] panel 11, 13 @390** (content-js-13-15): 'the left one' / 'Left:' / 'Right:' refer to `.duo` cards, which stack into one column below 640px, so phone readers see them as top and bottom.
   - evidence: Kit in P11: 'the left one took me five minutes to decode … The right one I read in ten seconds.' P13 readlist: 'Left: every comment repeats its line', 'Right: one comment'. comic-widgets.css:235 `@media (max-width: 640px) { .duo … { grid-template-columns: minmax(0, 1fr); } }`.
   - fix: Use the card headings: 'the NINJA CODE one' / 'the PLAIN CODE one'; 'SAYS WHAT:' / 'SAYS WHY:'.
2. **[low] [content] panel 16** (content-js-13-15): The caption says messy.js 'leaves out semicolons on some lines', but no line of messy.js has a semicolon.
   - evidence: messy.js: `const cast = ['Ada', "Bo", `Cy`]` / `console.log("Hello, " + name + '!')`: no `;` anywhere. Caption: 'puts a brace on its own line and leaves out semicolons on some lines'.
   - fix: Add a semicolon to one line of messy.js and recapture, or change the caption to 'leaves out every semicolon'.
3. **[low] [content] panel 30** (content-js-13-15): The 'more in Chapter 19' promise for BigInt is kept only by a notebook page. The book's real BigInt treatment, including BigInt and JSON, is in Chapter 23.
   - evidence: ch13 P30: 'A BigInt … (more in Chapter 19)'. ch19 notebook: 'The promised extra: BigInt'. ch23 description: 'BigInt as a separate abacus … and its three walls (no mixing, no Math, no JSON)'.
   - fix: '(more in Chapters 19 and 23)', or just 'Chapter 23'.
4. **[low] [content] panel 30 (Jigsaw bubble) vs notebook 'Numbers have no limits in JSON'** (content-js-13-15): The panel's reason for the BigInt TypeError ('JSON numbers can't promise that much precision') contradicts the notebook, which correctly says JSON numbers have no size limit and JavaScript's parser is what rounds them.
   - evidence: P30: 'A BigInt is a whole number of any size … JSON numbers can't promise that much precision, so I refuse.' Notebook: 'The grammar allows a number of any length, but JSON.parse turns every number into an ordinary JavaScript number … why JSON.stringify refuses BigInts instead of quietly rounding them.'
   - fix: P30: '…JSON.parse on the other end would read it back as an ordinary number and round it, so I refuse instead.'
5. **[low] [book] panel 30 (things that cannot be packed at all)** (book-js): BigInt is taught in three places because ch13 points readers to Chapter 19 instead of Chapter 23. Chapter 19 then carries a 'promised extra: BigInt' notebook page that repeats Chapter 23's Part 3.
   - evidence: ch13 line 797: 'A BigInt is a whole number of any size ... (more in Chapter 19)'. ch19 notebook: 'The promised extra: BigInt. Chapter 13 promised a word about BigInt'. ch23 Part 3: 'THE ABACUS: BIGINT Whole numbers of any size, and the three walls around them'. The plan (ch5 not_yet) puts 'BigInt ... in depth (ch23)'. (INTEGRATION_TODO 'From js ch19' asked whether the promise and delivery match. They match, but this duplicates ch23.)
   - fix: ch13: '(more in Chapter 23)'. ch19: shorten the BigInt page to two lines pointing at Chapter 23, or drop it.
6. **[low] [content] panel 4, 22, 38 (choice exercises)** (content-js-13-15): Choice length bias: in 4 of the 5 choice questions, the correct option is the longest, and in ex-comment-m it is about three times longer than any other.
   - evidence: Visible option lengths, correct one starred: ex-first-m [99*, 48, 56, 65]; ex-comment-m [72*, 23, 11, 7]; ex-valid-m [37*, 23, 24, 21]; ex-b6-m [65*, 46, 48, 55]. See INTEGRATION_TODO 'CHOICE LENGTH BIAS'.
   - fix: Lengthen the distractors in ex-comment-m, e.g. '// The constant MAX_TICKETS holds the largest number of tickets.', and in ex-first-m.

## INTEGRATION_TODO lines naming this chapter
- ## From javascript ch13 (Plan It, Pack It)
- js-ch11 and js-ch13 share a "capture filler" script. Candidate engine helper (fill text from a captured run, with a parity badge).
- It carries a BigInt notebook page that js ch13 promised. Check that the promise and the delivery match.

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- javascript/ch13.html: @390: P30 +3px
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `js-ch13.css:68` `table.plain13 code`
