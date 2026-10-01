# Fix bundle: go/ch3.html

5 review findings, 2 INTEGRATION_TODO lines, 3 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 20 @390** (visual-go-1-5): The swap picture ('by hand: 3 pours' vs 'Go: both at once') draws its cup labels and steps at 6.4-6.9px on phones, so the analogy the panel is built around can't be read.
   - evidence: Audit at 390: 16 text nodes under 12px: 'apple'/'pear' 6.4px, 'left'/'spare'/'right' 6.9px, 'BY HAND: 3 POURS' 11.8px. SVG `class="pic-wide" viewBox="0 0 640 240"` squeezed to ~300px. Crop: first column of /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-1-5/ev/ch3-p20-p25-p28-p38-390.png. Fine at 1280.
   - fix: Use the engine phone scroller: `<div class="picscroll"><svg class="pic-wide" …></div>` (comic-widgets.css keeps it 560px wide below 640px), or redraw it as two stacked halves. Before → After (why): a 640-unit picture scaled to 300px → 560px natural width in a sideways scroller (labels at ~13px instead of 6.4px).
2. **[medium] [visual] panel 25 @390** (visual-go-1-5): The scope picture (rooms inside rooms) has every label at 7.9-8.4px on phones: 'func main() { … }', 'outer', 'inner', 'inside can see out', 'outside can't see in'.
   - evidence: Audit at 390: 8 nodes at 7.9/8.4px; SVG `class="pic-wide" viewBox="0 0 640 260"`. Crop: second column of /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-1-5/ev/ch3-p20-p25-p28-p38-390.png.
   - fix: Same as panel 20: wrap in `.picscroll` (engine) so it keeps 560px on phones, or enlarge the text to font-size 26+ in this viewBox.
3. **[low] [content] panel 13** (content-go-1-3): House rule 1, 'Every box you build must be used', is stated without limit, but it applies only to boxes inside functions. Package-level variables (which the notebook shows) may go unused.
   - evidence: P13: "Every box you build must be used. Built a box and never looked inside? That's an error, not a warning." Notebook shows pkgvar.go with a package-level var.
   - fix: "Every box you build inside a function must be used." Optionally add a notebook sentence: package-level variables are exempt.
4. **[low] [content] panel 20** (content-go-1-3): The bubble beside the Sneak critter (the logic-bug creature) is attributed to Scoot in the screen-reader label, so it is unclear who is speaking.
   - evidence: <svg class="char" data-char="sneak"></svg> ... <span class="sr-only">Scoot says: </span>A sneaky one! No error message...
   - fix: Draw Scoot in this scene with Sneak beside, or label it "Sneak says:" and reword it in Sneak's voice. Also add an .sr-only sentence describing Sneak.
5. **[low] [visual] panel 28, 2, 38 @390** (visual-go-1-5): Three more drawings fall under 12px on phones: P28 whiteboard vs stone captions 8.9px and 'daysInWeek' 9.9px; P2 box stickers 'int'/'string' 9.6px and the legend 10.3-11.7px; P38 teaser 'int8'/'int64' 8.2px and '%d' 9.6px.
   - evidence: Audit at 390 (P28: `pic-wide` 640×250; P2: `pic-mid` 460×250; P38: `pic-mid` 460×150, font-size="12" at go/ch3.html:882-883). Crops: columns 3-4 of /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-go-1-5/ev/ch3-p20-p25-p28-p38-390.png.
   - fix: Raise the attribute font sizes so the rendered size is 12px+ at a 310px box (×1.5 for the 640-wide pictures, ×1.3 for the 460-wide ones), or wrap the 640-wide one in `.picscroll`.

## INTEGRATION_TODO lines naming this chapter
- [go3] promote shared chapter CSS (part-h, duo, checklist, boss-h, teaser, tab-size, term-wrap) into engine; ch go1/go3 copies.
- The plans named the guides "Dash" (Go), "Guide" (C++) and "JS guide" (JavaScript) in every cast line, while CAST.md has Scoot, Wren and Kit. All plans are now aligned with CAST.md (backups in the scratchpad). go/ch3 uses "Dash" only as an example string, which is fine.

## Engine-refresh clean-ups for this chapter
- `go-ch1.css:99`, `go-ch2.css:41`, `go-ch3.css:58`, `go-ch4.css:194`, `go-ch5.css:90`, `go-ch6.css:58`, `go-ch7.css:32`, `go-ch8.css:34`, `go-ch9.css:33`, `go-ch10.css:33`, `go-ch11.css:32`, `go-ch12.css:29`, `go-ch13.css:29`, `go-ch14.css:28`, `go-ch15.css:28`, `go-ch16.css:29`, `go-ch17.css:23`, `go-ch18.css:28`, `go-ch19.css:24`, `go-ch20.css:28`, `go-ch21.css:25`, `go-ch22.css:24`, `go-ch23.css:29`, `go-ch24.css:23`, `go-ch25.css:23`, `go-ch26.css:23`, `go-ch27.css:27`, `go-ch28.css:23`, `js-ch15.css:96`
- `cpp-ch1.css:30`, `cpp-ch4.css:18`, `cpp-ch6.css:18`, `go-ch1.css:31`, `go-ch2.css:28`, `go-ch3.css:19`, `go-ch6.css:19`, `go-ch7.css:11`, `go-ch8.css:11`, `go-ch9.css:11`, `go-ch10.css:11`, `go-ch11.css:11`, `js-ch1.css:18`, `js-ch2.css:18`, `js-ch4.css:19`, `js-ch5.css:18`, `js-ch6.css:16`, `js-ch7.css:27`, `js-ch8.css:28`, `js-ch9.css:25`, `js-ch10.css:29`, `js-ch11.css:28`, `js-ch12.css:28`, `js-ch13.css:30`, `js-ch15.css:34`, `js-ch18.css:28`
- `go-ch3.css:68` `.recipe li { white-space: pre; overflow-wrap: normal; tab-size: 2; font-size: 0.88rem; }`
