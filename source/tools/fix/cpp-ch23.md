# Fix bundle: cpp/ch23.html

8 review findings, 2 INTEGRATION_TODO lines, 5 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [book] panel 33** (book-cpp): std::stoi is credited to Chapter 20, but it is taught in Chapter 5 (and caught in Chapter 15); Chapter 20 never mentions stoi. The same panel also presents int main(int argc, char* argv[]) as new ('You've written int main() all along'), although the Chapter 16 capstone already used and explained it.
   - evidence: L846: 'To use it as a number, convert it: std::stoi(argv[2]) (Chapter 20).' grep -c stoi ch20.html = 0; ch5 TOC 'Seat numbers: [], .at(), substr, find, stoi'. ch23 P33: 'You've written int main() all along. It has a second form...'; ch16 P26 L707: 'Two lines new to you. Line 92, int main(int argc, char* argv[]), lets main see the words typed after the program's name'.
   - fix: '(Chapter 20)' -> '(Chapter 5)'. Start P33 with 'Chapter 16's dice game used this second form of main once; here is how it works.'
2. **[medium] [content] panel 33** (content-cpp-22-24): The panel credits std::stoi to Chapter 20, but Chapter 20 (optional/variant) never mentions it. The book teaches std::stoi in Chapter 5 and uses it again in Chapter 15.
   - evidence: Page: "To use it as a number, convert it: std::stoi(argv[2]) (Chapter 20)." grep: cpp/ch20.html has 0 occurrences of "stoi". cpp/ch5.html has 24. cpp/ch15.html says "std::stoi (string to int, Chapter 5)". The cpp plan for ch5 lists "to_string, stoi and stod".
   - fix: Change "(Chapter 20)" to "(Chapter 5)".
3. **[medium] [visual] panel every plain terminal (e.g. 2, 8, 13, 26, 27) @390** (visual-cpp-21-25): `.strip .term { white-space: pre-wrap; overflow-wrap: anywhere }` wraps every terminal with no hanging indent. The build command splits into lines that look like separate commands ('g++ -' / 'std=c++23 -Wall -Wextra -g' / 'pass_three.cpp -o pass_three'), and 'anywhere' lets tokens break mid-word.
   - evidence: cpp-ch23.css:55; crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-21-25/a23/sheets/w390-00.png (p2: 'g++ -' then 'std=c++23' at column 0), w390-11.png (p26, p27). Compare the engine-wrapped terminals in the same chapter (p6 kennel_copy), which indent their continuation lines.
   - fix: Before: `.strip .term { white-space: pre-wrap; overflow-wrap: anywhere; }` → After: delete it, and add class="term wrap" only to the terminals whose key line is off-screen (why: the engine's .term.wrap gives continuation lines a hanging indent and protects caret lines; a blanket pre-wrap with anywhere does neither).
4. **[low] [visual] panel 23 p7, 18; 25 p38, p42 teaser badge @390** (visual-cpp-21-25): Chapter drawings with labels just under 12px on phones: ch23 p7 'carers: 2' 9.8px and the Mum/Dad/Gran sheet 11.1px; p18 'lock() gives a shared_ptr / an empty one' 10.5px; the teaser badges (ch23 p39 'TV / radio / lamp / [=] [&]' 8.9px, ch25 p42 'int / double / string' 10.3px); ch25 p38 BFS queue labels 11.5px.
   - evidence: audit 390 small-text lists (/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-21-25/a23/audit.json, a25/audit.json); crops /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-cpp-21-25/a23/sheets/w390-07.png (p18), w390-03.png (p7).
   - fix: Before: SVG text 12–13 units in a 480–520 viewBox drawn at about 300px → After: 18+ units, or wrap the drawing in .picscroll (why: at least 12px on phones; the teaser badge can drop to one line of larger text).
5. **[low] [content] panel Notebook: Lab 4** (content-cpp-22-24): A 'try this' step says to make only one of the two buddy links weak. In weak_fix.cpp both links are the same `buddy` member of struct Pet, so that edit is impossible without redesigning the struct, and the page doesn't say how.
   - evidence: Page: "In weak_fix.cpp, make only one of the two links weak. Is that enough? Why?" weak_fix.cpp line 8: `std::weak_ptr<Pet> buddy;` (one member type, used by both `a->buddy = b;` and `b->buddy = a;`).
   - fix: Rewrite as: "In cycle.cpp, give Pet a second member std::weak_ptr<Pet> watcher; and change line 17 to b->watcher = a;. Does the leak go away? Why is one weak link enough?" Run it in scratch before shipping (cross-cutting LAB INSTRUCTIONS UNTESTED item).
6. **[low] [book] panel ch23 fill_weak exercise (Part 3); ch25 P16 (emplace_back)** (book-cpp): Names that already belong to characters are reused for unrelated things: the ch23 pets 'Pip and Dot' (Pip is the series' Python guide, Dot is ch17's examiner) and the ch25 robot 'Zap' (ch24's universal remote).
   - evidence: ch23 ex fill_weak: 'Pip and Dot are buddies.'; ch17 cover: 'DOT the examiner'; ch25 P16: 'emplace_back("Zap", 5) ... builds the robot'; ch24 cover: 'Zap, a charcoal universal remote'.
   - fix: Rename the ch23 pets (e.g. 'Mochi and Pepper', matching ch23's Biscuit/Mochi) and the ch25 robot (e.g. 'Sprocket'); recapture those programs.
7. **[low] [content] panel ex-fweak (after panel 20)** (content-cpp-22-24): The fill exercise names a pet "Pip". Pip is the Python book's guide, so a reader who knows both books may take it as a cameo the C++ book never explains.
   - evidence: fill_weak.cpp line 13: `auto a{std::make_shared<Pet>("Pip")};`. Prompt: "Pip and Dot are buddies." assets/CAST.md: guides are Pip (Python) ... Wren (C++).
   - fix: Rename the pet (e.g. "Pepper") in fill_weak.cpp and the prompt and explain text, then recapture cpp 23.
8. **[low] [content] panel ex-modern** (content-cpp-22-24): The correct option is about twice the length of any distractor, which gives the answer away (CHOICE LENGTH BIAS).
   - evidence: ex-modern-m visible option lengths [97, 45, 39, 48]; the correct one is 97.
   - fix: Lengthen the distractors (e.g. spell out a caller for each) or trim the correct option to the signature alone, with the vector moved into the why text.

## INTEGRATION_TODO lines naming this chapter
- ## From cpp ch23 (Shared Custody, Old Mailboxes)
- DONE (engine): tracer objects accept `"leaked": true` (drawn faded and dashed even when inside a cycle). cpp-ch23 labelled its cycle "LEAKED" by hand; it can switch to the flag in the fix round.

## Engine-refresh clean-ups for this chapter
- | C++ | `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `cpp-ch23.css:16` `.pair2 .term`
- `cpp-ch23.css:55` `.strip .term`
- `cpp-ch23.css:32` `.vs td code`
