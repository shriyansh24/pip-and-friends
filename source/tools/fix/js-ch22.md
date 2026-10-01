# Fix bundle: javascript/ch22.html

11 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel notebook: Lab, step 3 (last bullet)** (content-js-22-24): The lab says Ctrl + C can't stop a stuck regex in the Node REPL until it finishes. That's wrong: the REPL interrupts a catastrophic regex straight away with ERR_SCRIPT_EXECUTION_INTERRUPTED.
   - evidence: Page: "in the REPL, a stuck regex can't be stopped by Ctrl + C until it finishes. Close the terminal tab if it happens." Scratch test: a real Node 26.13.0 REPL in a pty, evaluating /^(a+)+$/.test("a".repeat(36)+"!"). Ctrl+C after 1.5 s printed `code: 'ERR_SCRIPT_EXECUTION_INTERRUPTED'` and a fresh `>` prompt, and `1+1` then printed 2. The same happens with vm.runInThisContext(..., {breakOnSigint: true}): "Script execution was interrupted by `SIGINT`" after 1015 ms.
   - fix: Replace the bullet with: "Don't run catastrophic patterns on purpose. If one gets stuck in the REPL, Ctrl + C interrupts it. In a script started with node file.js, Ctrl + C ends the whole program."
2. **[low] [visual] panel 11 @390** (visual-js-21-25): The 'HUH?!' sound-effect burst covers the end of the caption ('reversing') and part of the inline code `split("").reverse().join("")`.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c22-p11.png; audit overlap 'HUH?!' vs caption text, 45% of the smaller box.
   - fix: Give this caption `max-width: calc(100% - 120px)` at ≤640px, or move the burst to `.sfx.tl` over the panel number side (an SFX must never sit on words).
3. **[low] [content] panel 14** (content-js-22-24): The note contradicts its own output: it says every capital comes before every small letter, then shows the capital É sorting after the small letters.
   - evidence: Page: "by slot numbers, every capital comes before every small letter, and Émile and éva land after zoe". sort.js output: [ 'Zack', 'adam', 'zoe', 'Émile', 'éva' ].
   - fix: Change to "by slot numbers, the capitals A to Z come before the small letters a to z, and Émile and éva land after zoe, …"
4. **[low] [visual] panel 16 (also cover, 36) @390 and 1280** (visual-js-21-25): The stencil drawing's flag switches label their state ON/OFF at 9.4–10.5px (8px on the cover), below the 12px floor; those words are the declared non-colour carrier of the flag state.
   - evidence: audit: P16 'OFF' 9.4px at 390, 10.5px at 1280; P36 'ON' 9.4px; cover 'ON' 8px, 'STENCIL' 9.1px. crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c22-p16.png. js-ch22.js stencil: font-size="14" in a 440-unit viewBox drawn ~250–330px wide.
   - fix: stencil switch text `font-size="14"` → `font-size="19"` (and STENCIL 16 → 20), or give `.figs22` stencil figures a full row (`grid-column: 1 / -1`) (state words must reach 12px at every width).
5. **[low] [visual] panel 17 (the stencil slider) @1280** (visual-js-21-25): The slider frame animates `left` (a layout property) over 350ms with the built-in `ease`; it is on-screen movement on every Next press, so it should be transform-based, use the movement tokens and stay ≤280ms.
   - evidence: js-ch22.css:69 `.slide-frame { … transition: left 0.35s ease }`; computed transition at 1280 with motion on: 'left 0.35s'. Reduced motion and 'Animations: off' correctly give 'none' (:74–75).
   - fix: `transition: left 0.35s ease` → position the frame with `transform: translateX(calc(var(--at) * 100%))` and `transition: transform var(--dur-move) var(--ease-in-out)` (GPU-only property, under the 300ms UI budget, strong curve for on-screen movement).
6. **[low] [visual] panel 19 @390** (visual-js-21-25): In the character-class table the hole `[A-C]` breaks into `[A-` / `C]` in the first column.
   - evidence: crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-21-25/c22-p19.png; js-ch22.css:51 drops `white-space: nowrap` from `td:first-child` at ≤520px and :49 sets `overflow-wrap: anywhere` on code.
   - fix: `@media (max-width:520px) { table.ref22 td:first-child { white-space: normal } }` → keep `white-space: nowrap` on the first column (its tokens are ≤8 characters) and let the description column wrap (short regex tokens must stay whole).
7. **[low] [content] panel 41** (content-js-22-24): This is the known unverified claim that Node 24 should have RegExp.escape (INTEGRATION_TODO "From js ch22"). There is new evidence: Node 24.22.1 on this machine has it, so the claim is true but still worded as a guess.
   - evidence: Page: "Node 24 should too, judging by its V8 version, but this book only ran 26 and 22." Scratch run: /opt/node24/bin/node -e 'typeof RegExp.escape' printed `function` (v24.22.1, V8 13.6). MDN's "Baseline 2025" also checks out: Chrome/Edge 136, Firefox 134 and Safari 18.2 all support it.
   - fix: Reword to: "Node 24 has it too (checked on 24.22.1, outside this book's captures)." Or drop the Node 24 sentence.
8. **[low] [content] panel 6 (ex-badgefix, fill)** (content-js-22-24): The explanation says Ada's real name has 12 letters. "Ada Lovelace" has 11 letters plus a space, so it is 12 characters.
   - evidence: ex-badgefix-m explain: "Ada's real name has 12 letters, so it's still TOO LONG". fill_badge.js prints `Ada Lovelace 12 TOO LONG`.
   - fix: Change to "Ada's real name is 12 characters (11 letters and a space)".
9. **[low] [content] panel 7, 6, 9 (family.js, m_length.js, segment.js)** (content-js-22-24): This is the result of the invisible-character scan from INTEGRATION_TODO. Three shown programs hold literal U+200D zero width joiners inside the family emoji, so a reader who retypes the code from the screen can't reproduce them. Panel 8 explains the ZWJ, so the output is honest, but the source doesn't show it.
   - evidence: Scan of /home/you/javascript-ch22/*.js: family.js (2 × U+200D), m_length.js (2 × U+200D), segment.js (2 × U+200D). No other combining or format characters in ch22–24 programs (normalize.js and predict_normalize.js already use \u escapes).
   - fix: Optional: in family.js add a line `console.log(family === "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}");` (prints true) and recapture, so the glue is visible in code. Or add a caption sentence saying the emoji in the code holds two invisible joiners.
10. **[low] [content] panel notebook: Under the hood, "Who owns lastIndex"** (content-js-22-24): The note says only direct calls to test and exec leak lastIndex. A sticky regex without g also leaks it through match and replace.
   - evidence: Page: "…so only direct calls to test and exec leak state between uses." Scratch run, Node 26.13.0: `const r=/a/y; "ab".match(r)` leaves r.lastIndex at 1, a second identical match returns null, and `"ab".replace(/a/y, "x")` leaves lastIndex at 1.
   - fix: Append: "…(and match or replace with a sticky regex that has no g, which read and move lastIndex too)."
11. **[low] [content] panel notebook: Version notes (feature ages)** (content-js-22-24): The feature-age list dates regex literals, test, exec, match, replace and search to "the first editions (1997–1999)" and lists lazy quantifiers and lookahead separately as ES3. Regular expressions as a whole first arrived in ES3 (1999); ES1 and ES2 had no RegExp.
   - evidence: Page: "regex literals, test , exec , match , replace , split and search are from the first editions (1997–1999); lazy quantifiers and lookahead from ES3 (1999)".
   - fix: Change to "split (with a string) is from ES1 (1997); regular expressions themselves (literals, test, exec, match, replace, search, regex split, lazy quantifiers and lookahead) arrived in ES3 (1999)".

## INTEGRATION_TODO lines naming this chapter
- ## From js ch22 (Stencils and Emoji)
- NAME CLASH: js-ch22 `stencil` vs py-ch25 `stencil` (regex stencils in both). Unify or rename.

## Engine-refresh clean-ups for this chapter
- `javascript/ch22.html` and `javascript/ch23.html` use `class="term wrap"` without any chapter rule. They now wrap through the engine; check them at 390.
- `js-ch22.js:138`
- `js-ch22.css:47` `table.ref22 code, table.ref22 samp`
