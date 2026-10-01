# Fix bundle: javascript/ch20.html

7 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [content] panel 15 (machine m-same, chip '0, -0')** (content-js-19-21): Broken cross-reference: negative zero was introduced in Chapter 5, not Chapter 3.
   - evidence: Note: "Zero and minus zero (Chapter 3) count as one member." ch3 never mentions -0. ch5 does ("yes, JavaScript has a negative zero", plus its terms entry "negative zero").
   - fix: Change "(Chapter 3)" to "(Chapter 5)".
2. **[low] [content] panel 12** (content-js-19-21): "Use the pattern from panel 10" introduces a has/set/get snippet, but panel 10's pattern is `get(w) ?? 0` then set.
   - evidence: Panel 12: "use the pattern from panel 10: if (!byRole.has(role)) byRole.set(role, []); byRole.get(role).push(name);". Panel 10 line 4: counts.set(w, (counts.get(w) ?? 0) + 1).
   - fix: "use a has-then-set check instead:" (drop the panel 10 reference).
3. **[low] [content] panel 27 @390** (content-js-19-21): "Any left-side thing works with any right-side thing" doesn't hold on phones, where .flow20 stacks the two boxes vertically.
   - evidence: assets/ext/js-ch20.css:73 @media (max-width:640px) .flow20 { grid-template-columns: minmax(0, 1fr) }.
   - fix: "Anything in the ITERABLE box works with anything in the CONSUMERS box."
4. **[low] [content] panel 29** (content-js-19-21): Computed keys are credited to Chapter 19, but Chapter 10 taught them (computed.js, terms entry "computed key"). Chapter 19 only used them for symbols.
   - evidence: "written in square brackets (Chapter 19: computed keys)"; ch10 panel with computed.js: "Line 6: computed keys."
   - fix: "(computed keys, Chapter 10; symbol keys, Chapter 19)".
5. **[low] [visual] panel cover, 19 (weak coat check), 24 @390 (cover also 1280)** (visual-js-16-20): On the cover the dispenser and coat-check labels are 7.2-8.7px on phones (next(), 'red', done: false) and 8.3-10px at 1280. The WeakMap picture in panel 19 squeezes 'no feathers' to 10.6px.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a20/w390-000-main-after-p0-panel.png, w390-033-p19.png; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-js-16-20/a20/w1280-000-main-after-p0-panel.png. js-ch20.css:10 `.cover20 .char.dp { width: 150px }` (130px at ≤640px) for a 270-unit drawing.
   - fix: `.cover20 .char.dp { width: 130px }` (≤640px) → `width: 170px`, and in js-ch20.js `txt(…, 10)` minimum → 13 units for coat and ticket text. Why: a label under 12px reads as noise.
6. **[low] [content] panel ex-mapsize (after 5)** (content-js-19-21): This predict exercise checks that NaN finds NaN as a Map key, which the page doesn't teach until panel 15 (SameValueZero). It only appears in the hint.
   - evidence: predict_keys.js lines 5-6 set NaN twice; the answer depends on it (3 c e). Panel 2 only lists NaN as a possible ticket.
   - fix: Drop lines 5-6 from predict_keys.js (answer becomes 2 c undefined after recapture), or move the exercise after panel 15.
7. **[low] [content] panel footer (Sources consulted)** (content-js-19-21): New evidence on INTEGRATION_TODO 'From js ch20' (javascript.info read through a mirror): javascript.info is reachable directly now, and the cited Map/Set claims check out against the original page.
   - evidence: WebFetch https://javascript.info/map-set (direct, no mirror) confirms: objects as keys, NaN equal to NaN (SameValueZero), map.set returns the map (chaining), insertion order, forEach(value, key, map). All are also backed by captures.
   - fix: None on the page for Map and Set. Mark the TODO item as resolved, and re-verify the WeakMap and Generators citations against javascript.info the same way.

## INTEGRATION_TODO lines naming this chapter
- ## From js ch20 (Coat Checks and Dispensers)
- coatcheck/guestlist are copied from js-ch20.js. Promote them if the fix round consolidates JS critters.

## Engine-refresh clean-ups for this chapter
- | JavaScript | `js-ch1.css:130`, `js-ch2.css:38`, `js-ch4.css:36`, `js-ch5.css:29`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch29.css:95` |
- `cpp-ch4.css:26`, `cpp-ch5.css:30`, `cpp-ch6.css:29`, `cpp-ch7.css:19`, `cpp-ch8.css:7`, `cpp-ch9.css:19`, `cpp-ch10.css:19`, `cpp-ch11.css:19`, `cpp-ch12.css:19`, `cpp-ch13.css:23`, `cpp-ch14.css:18`, `cpp-ch15.css:22`, `cpp-ch16.css:19`, `cpp-ch17.css:22`, `cpp-ch18.css:20`, `cpp-ch19.css:18`, `cpp-ch20.css:21`, `cpp-ch21.css:18`, `cpp-ch22.css:18`, `cpp-ch23.css:21`, `cpp-ch24.css:18`, `cpp-ch25.css:21`, `cpp-ch26.css:18`, `cpp-ch27.css:22`, `cpp-ch28.css:17`, `cpp-ch29.css:22`, `js-ch1.css:127`, `js-ch2.css:35`, `js-ch4.css:33`, `js-ch5.css:26`, `js-ch6.css:26`, `js-ch7.css:57`, `js-ch8.css:97`, `js-ch9.css:104`, `js-ch10.css:44`, `js-ch11.css:43`, `js-ch12.css:56`, `js-ch13.css:62`, `js-ch14.css:70`, `js-ch15.css:41`, `js-ch16.css:60`, `js-ch17.css:64`, `js-ch18.css:43`, `js-ch19.css:81`, `js-ch20.css:67`, `js-ch21.css:112`, `js-ch24.css:56`, `js-ch25.css:80`, `js-ch26.css:42`, `js-ch27.css:49`, `js-ch28.css:44`, `js-ch29.css:95`
- `js-ch20.css:49` `table.t20 code`
