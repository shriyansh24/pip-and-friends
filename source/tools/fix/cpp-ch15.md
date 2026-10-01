# Fix bundle: cpp/ch15.html

7 review findings, 3 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[high] [content] panel 24, 37, 38, 41 (exercises ex-fillvalidate, ex-fillcount, ex-fillsplit, ex-b5)** (content-cpp-13-15): Four fill exercises accept answers without std:: that do not compile (istringstream, cin.clear(), cin.ignore), so wrong answers are marked correct.
   - evidence: accept lists: ex-fillcount line 17 ["istringstream"], ex-fillsplit line 7 ["istringstream"], ex-b5 line 15 ["istringstream"], ex-fillvalidate line 11 ["cin.clear()"] and line 12 ["cin.ignore"]. None of the programs has a using-directive. Scratch compiles: "v2.cpp:17:9: error: 'istringstream' was not declared in this scope; did you mean 'std::istringstream'?" (same for fill_split line 7 and boss_fill line 15); "v5.cpp:11:9: error: 'cin' was not declared in this scope; did you mean 'std::cin'?". By contrast the accepted "getline(file, line)" does compile (argument-dependent lookup through std::ifstream), so that one can stay.
   - fix: Delete "istringstream", "cin.clear()" and "cin.ignore" from the accept lists. Keep "getline(file, line)".
2. **[medium] [content] panel notebook: In real programs > Projects without exceptions** (content-cpp-13-15): Broken cross-reference: the notebook sends std::expected to Chapter 20, but Chapter 20 only mentions it in one sentence and defers to Chapter 27, which the plan gives it to.
   - evidence: ch15: "C++23 added std::expected to make that style tidier (Chapter 20)." cpp/ch20.html: "C++23's std::expected<T, E> is like an optional that carries a reason when it's empty. It's available here with g++ only; Chapter 27 compares it with optional and exceptions." tools/plans/cpp.json n=27 scope: "Error-handling design: choosing between exceptions, error codes, std::optional, std::expected (C++23)..."; ch27.html mentions expected 77 times.
   - fix: Change "(Chapter 20)" to "(Chapter 27)".
3. **[low] [content] panel 15 (Ember's bubble) and 16 (exercise ex-ctor)** (content-cpp-13-15): Two small misquotes of earlier chapters: Chapter 5's at() example was word.at(10), not s.at(10), and Chapter 12 never used a "bool ok member" trick (its options were clamp, refuse with false, or assert).
   - evidence: ch15 P15: "You've seen this message since Chapter 5's s.at(10)." ch5 machine chip: {"in": "word.at(10)", ...}. ex-ctor q: "Chapter 12's tricks (clamping the value, or setting a bool ok member)". ch12: "Until then, clamp, refuse or assert, and choose on purpose"; its ok is a local bool returned by a withdrawal, not a member.
   - fix: "since Chapter 5's word.at(10)"; "Chapter 12's tricks (clamping the value, or refusing with a false return)".
4. **[low] [content] panel 5, 16, 41 (ex-alarm, ex-ctor, ex-b6)** (content-cpp-13-15): In three choice exercises the correct option is clearly the longest (known cross-cutting CHOICE LENGTH BIAS).
   - evidence: Plain-text option lengths: ex-alarm 50, 97 (correct), 30, 35; ex-ctor 11, 78 (correct), 46, 43; ex-b6 184 (correct), 150, 147, 140.
   - fix: Rebalance the lengths: trim the correct options (e.g. ex-alarm "They're skipped, and the search for a catch begins") and give the short distractors ("It's faster") a sentence of plausible detail.
5. **[low] [visual] panel 5, 34 @390 and 1280** (visual-cpp-11-15): Three hand-rolled cards (`.card4`, `.pull`, plus their `.dashed` variants) duplicate `.duo-card`, with raw `4px 4px 0` shadows and 14px radii.
   - evidence: ext/cpp-ch15.css:32-37 (`.cards4`/`.card4`), :69-74 (`.pulls`/`.pull`, cream fill). DESIGN_SYSTEM §3 Card.
   - fix: Before: `.card4 { border-radius: 14px; box-shadow: 4px 4px 0 var(--ink) }` → After: `.duo-card` (or at least `border-radius: var(--radius-lg); box-shadow: var(--shadow-hard)`) so cards match the rest of the book
6. **[low] [content] panel 6 (exercise ex-fillthrow)** (content-cpp-13-15): The Part 1 fill exercise catches a runtime_error with catch (const std::exception& e) before Part 2 explains the family tree, while panel 5 has just taught catching the exact kind.
   - evidence: fill_throw.cpp line 15: } catch (const std::exception& e) {. Explain: "a runtime_error is a kind of std::exception (Part 2's family tree), so this handler matches". Panel 5 card: catch (const std::runtime_error& e).
   - fix: Use catch (const std::runtime_error& e) on line 15 (and recapture), or move the exercise after panel 10.
7. **[low] [book] panel notebook 'In real programs' (projects without exceptions)** (book-cpp): std::expected is pointed at Chapter 20, but Chapter 20 only mentions it in one notebook line and forwards to Chapter 27, which is where it is taught (and where the plan puts it).
   - evidence: ch15 L1022: 'C++23 added std::expected to make that style tidier (Chapter 20).' ch20 notebook: 'C++23's std::expected<T, E> ... Chapter 27 compares it with optional and exceptions.' Plan ch15 not_yet: 'std::optional/std::expected (ch20, ch27)'; ch27 recap: 'std::expected<T, E> (C++23, g++ only here)'.
   - fix: '(Chapter 20)' -> '(Chapter 27)'.

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch15 (Fire Alarms and Scrolls)
- Ember the Fire Marshal (cpp-ch15.js) is a promotion candidate if reused.
- `marshal` (Ember) promoted to comic-critters.js. Remove the copies from cpp-ch15.js and cpp-ch16.js.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- cpp/ch15.html: @390: P23 +320px
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch15.css:18` `.pair2 .term`
- `cpp-ch15.css:28` `.vs td code`
