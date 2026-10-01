# Fix bundle: cpp/ch3.html

5 review findings, 2 INTEGRATION_TODO lines, 1 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 35 @390** (visual-cpp-1-5): The CAUGHT! burst covers the end of the caption's first two lines ('going past the top', 'might print anything'), because the caption ignores its reserved right margin.
   - evidence: Measured at 390: caption spans x 38–345, burst x 260–364, caption margin-right 92px. The caption contains `<code class="nowrap">-fsanitize=address,undefined</code>` (ch3.html:703), whose unbreakable width (about 300px) sets the caption's minimum width, so `.panel:has(> .sfx.tr) > .caption { margin-right: 96px }` (cpp-ch3.css:143) can't narrow it. Crop: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-1-5/ev/ch3-p35-390.png
   - fix: Before → After (why): `<code class="nowrap">-fsanitize=address,undefined</code>` → `<code>-fsanitize=address,<wbr>undefined</code>` (one break point after the comma lets the caption honour the margin; the flag still never breaks at its dash).
2. **[medium] [content] panel notebook: Lab** (content-cpp-1-3): The lab instruction predicts a result that doesn't happen with the book's build command: -Wextra also turns on -Wuninitialized, so removing only -Wall still prints the warning.
   - evidence: Lab: "Build uninit.cpp with and without -Wall. The warning only appears with it." Scratch: `g++ -std=c++23 -Wextra -g uninit.cpp` still prints "warning: 'score' is used uninitialized [-Wuninitialized]". With no warning flags at all, it prints nothing.
   - fix: "Build uninit.cpp with and without -Wall -Wextra. The warning only appears with them."
3. **[low] [content] panel 9** (content-cpp-1-3): Wren's reading of the note doesn't match the captured message: it points to where the name was first declared, not where it was first used.
   - evidence: Wren: "a note: pointing back to line 4, where the name was first used." twice.cpp capture: "twice.cpp:4:9: note: 'int coins' previously declared here" (clang: "previous definition is here").
   - fix: "... pointing back to line 4, where the box was first made."
4. **[low] [book] panel notebook 'Words from this chapter' (declaration)** (book-cpp): Chapter 3 defines 'declaration' as 'a line that makes a new variable: type, name, initialiser, semicolon', which Chapters 7 and 10 then contradict by teaching declaration (a promise, no body/initialiser needed) versus definition.
   - evidence: ch3 terms: 'declaration A line that makes a new variable: type, name, initialiser, semicolon.' ch10 terms: 'declaration A promise that a name exists, with its type or signature, ending in ;'; ch7 recap: 'A declaration is a promise; a missing definition is a link error.'
   - fix: ch3: 'declaration A line that introduces a name and its type, like int apples{5}; (Chapter 7 shows declarations that only promise).'
5. **[low] [content] panel notebook: Undefined behaviour, a first look** (content-cpp-1-3): Same out-of-date C++26 status as ch1. The erroneous-behaviour fact itself (P2795) is right; only the status wording needs changing.
   - evidence: "C++26, finished by the committee but not yet approved by ISO, reclassifies reading an unfilled local variable as erroneous behaviour". The DIS failed its ISO ballot in Oct 2026 (https://zeli.app/story/50239748). See INTEGRATION_TODO [cpp3].
   - fix: "The C++26 draft (it failed its first ISO vote in October 2026 and is still being revised) reclassifies ..."

## INTEGRATION_TODO lines naming this chapter
- [cpp3] notebook claims C++26 'erroneous behaviour' (P2795) — verify wording; C++26 not ISO-published (DIS disapproved Oct 2026).
- The Sanitizer character is duplicated in the cpp-ch3, ch5 and ch7 extensions. Move it into comic-critters.js and remove the copies.

## Engine-refresh clean-ups for this chapter
- `cpp-ch3.css:23` `.pair2 .term`
