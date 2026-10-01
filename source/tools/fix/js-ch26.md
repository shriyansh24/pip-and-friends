# Fix bundle: javascript/ch26.html

10 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 31 @390** (visual-js-26-29): The version-range table splits version numbers across lines (`^1.4.` / `2`, `~1.4.` / `2`, `1.4.` / `2`, `^0.3.` / `1`). In a panel about reading version numbers, `^1.4.` then `2` reads like a different range.
   - evidence: crop review-visual-js-26-29/crops/c26-390-p31-bottom.png. Rule: js-ch26.css:54 `.rules26 code { overflow-wrap: anywhere }`.
   - fix: `.rules26 code, .rules26 samp { overflow-wrap: anywhere }` → `.rules26 code { white-space: nowrap; overflow-wrap: normal }` (the Range column is wide enough for a 6-character token; a version must never break)
2. **[medium] [content] panel 33 (and 37)** (content-js-25-27): The page gives "this book's computer has no internet" as the reason for the pretend registry. That's false: the real npm registry answers from this machine. P37 likewise says audit, global installs and similar "need the real internet".
   - evidence: P33: "This book's computer has no internet, so it runs a tiny pretend registry". P37: "These need the real internet or a real computer, so they're described here rather than run." Check run now from the capture machine: `curl https://registry.npmjs.org/semver` returns HTTP 200. AUTHORING §7 also says crates.io is reachable from the capture machine. js ch14 L288 makes the same claim (outside this scope; fix it with this one).
   - fix: Give the real reason: "So that every run is the same, and so we can publish new versions in the middle of the story, this book uses a tiny pretend registry…". In P37, say these steps are described, not run, because they'd touch the real registry or the whole machine.
3. **[medium] [visual] panel 44 @390** (visual-js-26-29): The Proofreader's bubble starts with `SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]` as plain text. The token has no break points, so it runs 14px past the bubble's right edge and the end of the error code is clipped.
   - evidence: crop review-visual-js-26-29/crops/c26-390-p44-bubble.png; audit 'beyond': p.bubble r=+14 at 390.
   - fix: plain `[ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]` → `<code>ERR_<wbr>UNSUPPORTED_<wbr>TYPESCRIPT_<wbr>SYNTAX</code>` (break opportunities after each underscore keep the whole code visible and mark it as code)
4. **[low] [content] panel 16 (import.meta)** (content-js-25-27): "(Node only)" for import.meta.filename and import.meta.dirname is too strong: other server runtimes that the book names in Chapter 1 (Deno, Bun) also have them. The real contrast the page needs is with browsers. I didn't fetch a source for Deno or Bun, so this is the reviewer's knowledge, not a check.
   - evidence: P16: "import.meta.filename and import.meta.dirname (Node only) are the plain file path and its folder." ch1's plan and page introduce Deno and Bun as other kitchens.
   - fix: Write "(not in browsers, which have no file paths)".
5. **[low] [content] panel 17 (ex-dirname choice)** (content-js-25-27): One option's explanation names a file the question never shows (fill_meta.js), so it reads as if the reader should know the current file's name.
   - evidence: ex-dirname-m why: "<code>import.meta.url</code> is the file's own URL, ending in <code>…/fill_meta.js</code>". The question only says "In an ES module"; fill_meta.js first appears in ex-meta, after P18.
   - fix: Write "ending in the file's own name (…/app.js)" instead.
6. **[low] [content] panel 21 (detection warning) vs ch25 panel 19** (content-js-25-27): P21 says "this book runs each warning program as process 1", but ch25 handles the same kind of warning with a visible sed to (node:PID). The (node:1) runs also use an unshare wrapper that the shown command never names.
   - evidence: /home/you/javascript-ch26/road_e.cmd: shown "node notype/e.js", real "cd combo && unshare -p -f --mount-proc node notype/e.js". P21: "this book runs each warning program as process 1 so the page stays the same." ch25 await_cjs.cmd: `node await_cjs.cjs 2>&1 | sed -E 's/node:[0-9]+/node:PID/'`.
   - fix: Say "this chapter" instead of "this book", and name the tool once in P21 or the notebook: "(we start Node with unshare, a Linux tool that gives it a fresh process numbering, so it really is process 1)".
7. **[low] [content] panel 32 (ex-range choice)** (content-js-25-27): The right answer uses a range form, `>=1.4.2`, that the chapter never taught. P31's table covers only ^, ~, exact and ^0.x, so the reader can only pick the answer by ruling out the others.
   - evidence: ex-range-m correct option: "<code>&gt;=1.4.2</code>". P31 table rows: ^1.4.2, ~1.4.2, 1.4.2, ^0.3.1. `>=` first appears in the Words list ("range … >=1.4.2").
   - fix: Add a row to P31's table: ">=1.4.2 | 1.4.2 or anything newer, no upper limit | 1.9.0, 2.0.0, 9.0.0 | 1.4.1".
8. **[low] [content] panel 33–36 (npm terminals) and notebook "About this book's runs"** (content-js-25-27): Each npm terminal hides a setup line behind the shown `cd party`, and that is disclosed only in the notebook. The disclosure also overstates: it says each terminal "starts where the story left off", but P36's setup doesn't replay P34's publish and npm update.
   - evidence: market_dev.cmd step 1 real: "cd party && cp package.start.json package.json && rm -rf node_modules package-lock.json && source ../registry/open.sh confetti-1.5.0 drumroll-0.9.0 && npm install confetti >/dev/null". After P34, Kit's lockfile should hold confetti 1.6.0 and the shelf 1.6.0 and 2.0.0; P36's setup has only 1.5.0 on the shelf. Notebook: "it also replays the earlier panels' installs, so each terminal starts where the story left off". No sentence on P33–P36 mentions the hidden setup (INTEGRATION_TODO calls it "disclosed", meaning the notebook).
   - fix: Add one caption to P33: "Each npm terminal on this page starts with a hidden setup line that resets the party folder and opens the pretend market (see the notebook)." In the notebook, say that P36 starts from a fresh install of 1.5.0.
9. **[low] [content] panel 40 (jsdoc_check)** (content-js-25-27): The prose says tsc checks plain JavaScript files "that start with // @ts-check", but the shown command passes --allowJs --checkJs, which checks every JS file whether or not it has that comment. The comment isn't what made this run work.
   - evidence: P40: "tsc, which can also check plain JavaScript files that start with // @ts-check". jsdoc_check.cmd: "npx tsc --noEmit --allowJs --checkJs checks/seats.js".
   - fix: Say: "With --allowJs --checkJs (or a // @ts-check line at the top, which editors read), tsc also checks plain JavaScript, using the JSDoc comment on line 3 …".
10. **[low] [book] panel 43 (running TypeScript files directly)** (book-js): Credits '"12" + 1 glues text' to Chapter 3. Gluing with + is Chapter 2 (first shown) and Chapter 5 ('PLUS PREFERS WORDS').
   - evidence: ch26 line 1003: '<code>"12" + 1</code> glued text (Chapter 3).' ch2 P7 draws train '1' + brick 1 = train '11'; ch5 recap 'PLUS PREFERS WORDS: With a string on either side, + glues'.
   - fix: Change '(Chapter 3)' to '(Chapter 5)'.

## INTEGRATION_TODO lines naming this chapter
- ## From js ch26 (Catalogs and Workbenches)
- The final small fixes were not re-screenshotted; re-check js/ch26 at 1280/390 in review.

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- javascript/ch26.html: @390: P44 +42px
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
