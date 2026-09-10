import json
S="/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-engine"
F=[]
def f(file,panel,width,sev,what,evidence,fix):
    F.append({"file":file,"panel":panel,"width":width,"lens":"engine","severity":sev,"what":what,"evidence":evidence,"fix":fix})

# ---------------- NEW engine findings (not in the TODO) ----------------
f("assets/comic-widgets.js","renderTracer / layoutTracer","390","high",
  "Every memory tracer on every page draws its labels below 12px on a phone (median 9.2px, worst 4.5px), because the narrow layout's viewBox is wider than the panel and the SVG is scaled down to fit.",
  "Measured all 182 [data-tracer] widgets in 142 chapters at 390px, stepping each to its last step; smallest label = 12px class x (rendered width / viewBox width). 182/182 below 12px, 108 below 10px, 28 below 8px. Worst: rust/ch29 tr-pool-box 4.5px, javascript/ch13 tr-trip-box 5.6px, go/ch16 tr-tally-box 5.9px, python/ch12 tr-group-box 5.9px, cpp/ch5 tr-split-box 6.3px. Even the best case is 11.6px: the narrow viewBox floor is 320 (layoutTracer: Math.max(narrow ? 320 : 720, ...)) while the .mem box is about 300px wide. Raw data: "+S+"/measure.json (script measure.js).",
  "Draw the narrow layout at natural size and let .mem scroll (it already has overflow-x:auto): in renderTracer after setAttribute('viewBox', ...) add `el.style.width = narrow ? lay.width + 'px' : '';` and in comic-widgets.css change `.tracer-svg.narrow { max-width: 420px; margin: 0 auto; }` to `.tracer-svg.narrow { max-width: none; margin: 0; }`, plus a swipe hint like .mapwrap::before (`.tracer .mem:has(.narrow)::before`). Also lower narrow minimums in objSize (pairs kw 130/vw 144 -> 90/110 when narrow) so most phones need no scroll at all.")
f("assets/comic-widgets.js","layoutTracer","390 and 1280","medium",
  "The tracer diagram zooms in and out between steps: its viewBox width is recomputed from the objects present at each step, so when a wide object appears every label shrinks.",
  "131 of 182 tracers change viewBox width while stepping (e.g. go/ch24 tr-wg-box takes 10 different widths, rust/ch29 tr-pool-box 10, go/ch20 tr-stack-box 6). layoutTracer: width = Math.max(..., gutter + (inner + tagArrows) * 12 + 16) where gutter = maxRight + 24 of the objects drawn at this step only; planTracer already fixes slot heights for the whole run but not width.",
  "In mountTracer compute the width once over all steps: `plan.width = {}; [false,true].forEach(function(n){ plan.width[n] = Math.max.apply(null, m.steps.map(function(s,i){ plan.cur = i; return layoutTracer(s, n, plan).width; })); });` and in renderTracer use `Math.max(lay.width, plan.width[narrow])` for the viewBox width (height likewise).")
f("assets/comic-memory.js","render (narrow)","390","high",
  "Every stack-and-heap stepper ([data-mem]) renders its field labels below their 11px design size on a phone (6.9px to 10.5px), for the same reason as the tracer: width:100% with a viewBox wider than the panel.",
  "All 35 [data-mem] widgets measured at 390px: smallest mh-lab label 6.9px (rust/ch11 Panel 41), 7.4px (cpp/ch18 Panel 29), 7.6px (rust/ch10 Panel 13), 7.7px (cpp/ch24 Panel 27), 7.8px (rust/ch10 Panel 5); values (16-18px) shrink in proportion. CSS: .mem-svg.narrow { max-width: 460px } with width:100%.",
  "Same change as the tracer: in render() set `svgEl.style.width = narrow ? width + 'px' : '';` and in comic-widgets.css `.mem-svg.narrow { max-width: none; margin: 0; }` (.mem-wrap already scrolls). Raise .mh-lab to 12px.")
f("assets/comic.css",".map-svg","390","low",
  "Map labels fall below 12px on phones on every map, because the map keeps min-width 540px for a viewBox that is usually 690 wide.",
  "129 maps measured at 390px: smallest rendered text 10.5px to 11.9px, 129/129 below 12px (code tspans .c are 14px x 0.78). Script "+S+"/maps.js, data maps.json.",
  "In the <=640px block add `.map-svg { min-width: 640px; }` (the wrapper already scrolls and shows the swipe hint), or set min-width to the map's own viewBox width from mountMap: `svg.style.minWidth = Math.min(m.size[0], 690) + 'px'`.")
f("assets/comic.js","highlight() rust str","1280","medium",
  "Rust raw strings with hashes (r#\"...\"#) are coloured wrongly whenever they contain a quote: the string ends at the first inner quote.",
  "HL.rust.str = \"b?r#*\\\"[\\\\s\\\\S]*?\\\"#*\": the lazy match stops at the first \" followed by zero #. Test: highlight('let s = r#\"say \"hi\" now\"#;','rust') gives <span class=tok-str>r#&quot;say &quot;</span>hi<span ...>. Affected real programs shown on pages: rust-ch12/raw.rs (r#\"Mabel said \"shh\" twice\"#), rust-ch28/predict_json.rs, serde_errors.rs (6 lines), serde_panic.rs.",
  "Replace the raw-string alternative with explicit hash counts (no backreference, so group numbers stay the same): str: \"b?r###\\\"[\\\\s\\\\S]*?\\\"###|b?r##\\\"[\\\\s\\\\S]*?\\\"##|b?r#\\\"[\\\\s\\\\S]*?\\\"#|b?r\\\"[^\\\"]*\\\"|b?\" + CSTR + \"|b?'(?:\\\\\\\\.|[^'\\\\\\\\\\\\n])'\".")
f("assets/comic.js","highlight() rust comments","1280","low",
  "The engine highlighter does not nest Rust block comments, so rs-ch1.js's highlight override is still needed (it is not a redundant workaround).",
  "highlight(nested_comments.rs,'rust') ends the comment at the inner */ and shows 'still inside the outer one */' as code. rust/ch1 uses nested_comments.rs; rs-ch1.js lines 21-53 replace L.highlight with a nesting scanner.",
  "Port rs-ch1.js chunks() into highlight(): when L2 === 'rust' and src contains '/*', split src into code and nested-comment chunks first, highlight code chunks with the regex and wrap comment chunks in tok-com. Then delete rs-ch1.js's override and rehighlight().")
f("assets/comic.js","hlLang()","1280","low",
  "Widgets that highlight one line at a time (walker, tracer, spot, parsons) colour a C++ line that starts with '<<' as HTML markup, so its comments, keywords and numbers lose their colours.",
  "hlLang(): `if (/^\\s*</.test(src)) return \"html\";` runs before the captures' meta.lang. highlight('    << \"total: \" << n << \"\\\\n\"; // done') with meta.lang cpp returns the // comment uncoloured. 42 such lines in cpp programs (cpp-ch27 10, ch11 8, ch16 5, ch9 4, ...).",
  "Only treat text as markup when the page is not a non-JS language and '<' starts a tag: `var m = (captures meta lang); if (/^\\s*<(?:[A-Za-z!/])/.test(src) && (!HL[m] || m === 'javascript' || m === 'html')) return 'html';`.")
f("assets/comic-widgets.css + assets/comic.js","terminals","390","medium",
  "122 terminals marked .term.wrap contain compiler/runtime caret lines under source lines longer than a phone line, so on phones the ^ markers no longer sit under the code they point at (the open 'Terminal wrapping consistency' item, with numbers).",
  "Scan of every <pre class=\"term wrap\" data-run> against its capture (caret line directly under a line of 36+ characters, cpp-ch18 excluded because its CSS turns wrap off on phones): 131 hits in 38 chapters, e.g. cpp/ch24 12, cpp/ch26 10, cpp/ch8 7, cpp/ch21 6, javascript/ch24 6, javascript/ch28 6, javascript/ch16 5. `.term.wrap { white-space: pre-wrap; overflow-wrap: anywhere; }` is defined identically in 49 chapter CSS files.",
  "Promote one rule and protect carets: comic.css add `.term.wrap { white-space: pre-wrap; overflow-wrap: anywhere; } .term.wrap.has-carets { white-space: pre; overflow-wrap: normal; }`; in fillCode after computing segs add `if (/^[ \\t]*(?:\\d+[ \\t]*)?\\|?[ \\t]*[~\\-]*\\^[\\^~\\- ]*(?:[ \\t].*)?$/m.test(segs.map(function(s){return s.t;}).join(''))) terms[j].classList.add('has-carets');`. Then delete the 49 chapter copies and the cpp-ch18/rs-ch27 overrides.")
f("AUTHORING.md + tools/capture.py","house rule: timings","-","medium",
  "AUTHORING's model example for visible normalisation is false: javascript ch14 hides its sed exactly like rust ch14 and go ch15 (the terminal prompt shows 'node --test money.test.js'), and capture.py has nothing that stops a hidden output filter.",
  "AUTHORING: 'normalise it visibly in the shown command, e.g. node --test | sed ..., as js ch14 does'. /home/you/javascript-ch14/money.test.cmd: shown 'node --test money.test.js', real \"node --test --test-reporter=spec money.test.js | sed -E 's/ \\([0-9.]+ms\\)$/ (…ms)/; ...'\". 18 such steps in javascript-ch14, 20 in go-ch15; the word 'sed' never appears on javascript/ch14.html (prose only says 'this book shows (…ms)').",
  "capture.py cmd_sidecar() and run_session(): add a problem when the real command pipes into sed/tr/awk/grep/cut but the display text does not: `if re.search(r\"\\|\\s*(sed|tr|awk|grep|cut)\\b\", real) and not re.search(r\"\\|\\s*(sed|tr|awk|grep|cut)\\b\", display): problems.append(...)`. Fix the three chapters' display strings to include the pipe, and change AUTHORING's example to one that is true after the fix.")
f("tools/capture.py","cmd_sidecar()","-","medium",
  "The TODO says the C++ '; exit $?' abort workaround is now unnecessary because of ISOLATE_SH, but ISOLATE_SH is only used for plain .cpp builds and Rust .abort; .cmd steps still run 'bash -c CMD' as PID 1, so removing the workaround would break the abort runs.",
  "cmd_sidecar: `argv = (ISOLATE if (isolate and last) else []) + [\"bash\", \"-c\", real]`. bash execs a single simple command directly, so ./at10 becomes PID 1 inside the namespace and ignores SIGABRT. Still relied on by cpp-ch5 at10.cmd, stoi_abc.cmd, stoi_quiz.cmd and cpp-ch6 offby.cmd ('./at10; exit $?'). TODO lines 51 and 53.",
  "Either keep the workaround (and strike the two TODO notes), or make the last .cmd step use ISOLATE_SH for cpp: `argv = (ISOLATE_SH if (isolate and last and cfg_prefix in ('cpp',)) else ISOLATE if (isolate and last) else []) + ['bash','-c', real]` and only then drop '; exit $?'.")
f("assets/comic.css","code, kbd, pre, samp","1280","low",
  "The slashed-zero setting for code is dead: the later ligature rules set font-feature-settings with !important and replace it rather than adding to it.",
  "comic.css:51 `code, kbd, pre, samp { font-feature-settings: \"zero\" 1; }`; comic.css:268-272 `font-feature-settings: \"calt\" 0, \"liga\" 0 !important` on the same elements. font-feature-settings is not additive.",
  "Change both ligature rules to `font-feature-settings: \"calt\" 0, \"liga\" 0, \"zero\" 1 !important;` (or delete line 51 if a plain zero is wanted).")
f("assets/comic-widgets.css",".tracer.memhs .tr-split","-","low",
  "The rule .tracer.memhs .tr-split is declared twice with different values; the first is dead.",
  "comic-widgets.css:279 `grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr)` and :285 `grid-template-columns: minmax(0, 1fr)`.",
  "Delete line 279.")
f("assets/comic-widgets.js","BUILD.fill check()","-","low",
  "The fill exercise's 'Your code' column can show the learner's answer in the wrong place: it substitutes the first occurrence of the blank text, ignoring the model's nth, and treats $& / $1 in the typed answer as replacement patterns.",
  "check(): `mineLines[b.line - 1] = mineLines[b.line - 1].replace(b.text, v || \"____\");` while the input was placed using b.nth (lines 502-504).",
  "Rebuild the line from the cut positions computed when rendering (store {at,len} per input) and splice: `l.slice(0, at) + v + l.slice(at + len)`, applied right to left; never pass user text as a replacement string.")
f("assets/comic-widgets.js","objSize()","1280","low",
  "Tracer list/array and object boxes are sized without their header label, so a long `label` (e.g. 'Vec<String> on the heap · v1') can run past the box edge.",
  "objSize items: `label = (o.kind + \"  · \").length * CH.type + 40` ignores o.label and the id; pairs: width = kw + vw + 26 with no label term. The header is drawn as `o.label || (o.kind + \"  · \" + oid)`.",
  "Use the drawn text: `var head = (o.label || (o.kind + '  · ' + id)).length * CH.type + 24;` and take Math.max with it in both branches (pass id into objSize).")
f("assets/comic-memory.js","heapW()","1280","low",
  "Heap block width ignores its label, so a short block with a long label ('#1 · String bytes · FREED') overflows its box.",
  "heapW(h) = Math.max(170, 16 + n * 34); label drawn at 13px is about 7.8px per character: 25 characters = 195px > 170.",
  "heapW: `Math.max(170, 16 + n * 34, 20 + (\"#\" + id + \" · \" + (h.label || \"bytes\") + \" · FREED\").length * 7.9)` (pass id).")
f("tools/capture.py","capture() output","-","low",
  "Data files are written with plain write_text although a full disk already emptied a go.mod once; a disk-full during capture leaves a truncated data/<prefix>-chN.js that breaks the page.",
  "capture(): out_json.write_text(...); out_js.write_text(...). atomic_write() exists in the same file and is only used for go.mod.",
  "Use `if not (atomic_write(out_json, ...) and atomic_write(out_js, ...)): sys.exit('capture: could not write data files')`.")
f("tools/capture.py","capture() stdin + session","-","low",
  "A session .cmd with a .stdin sidecar would get a wrong 'screen': the pty rerun executes the placeholder argv ['true'] that run_program returns for session steps.",
  "run_program session branch returns Step(st[0], [\"true\"], ...); capture() then runs run_pty(run[-1].argv, ...). No chapter combines them today (checked every */*.cmd with session:true for a .stdin), so this is latent.",
  "In capture(), skip the pty run (or report a problem) when spec.get('session') is true: `if f.with_suffix('.cmd').exists() and json.loads(...).get('session'): problems.append(name + ': .stdin is not supported with session .cmd')`.")
f("tools/browser_capture.js","waits","-","low",
  "Browser captures stop 150 ms after the last action, so console output from any later timer, fetch or animation callback is silently missing from the 'real run'.",
  "await page.waitForTimeout(150) after load and after actions, then browser.close(). Nothing records that the page still had pending timers.",
  "Wait for quiet instead of a fixed time: after actions `await page.waitForLoadState('networkidle'); await page.evaluate(() => new Promise(r => setTimeout(r, 300)));` and document the cut-off in the header; authors can still add {\"wait\": N}.")
f("tools/build.py","shipped() / main()","-","low",
  "build.py never clears dist/publish and dist/local, so files removed or renamed in the site stay in dist and can be published; its docstring still says only python/ch*.html and data/py-ch<N>.js are shipped.",
  "main(): out.mkdir(parents=True, exist_ok=True) then copies; no removal. Docstring: 'python/ch*.html, assets/ (engine plus ext/), and data/py-ch<N>.js'. comic.js header still says 'Pip & Python' and 'captured CPython runs'.",
  "At the start of each kind: `shutil.rmtree(out, ignore_errors=True)` before mkdir (a script, not a manual rm -rf). Update the docstring to 'every book folder' and comic.js's header comment.")
f("AUTHORING.md","Engine files list","-","low",
  "AUTHORING's list of shared engine files that chapters must not edit names 4 files and leaves out comic-critters.js, comic-cast.js and comic-memory.js.",
  "AUTHORING.md lines 21-26 list comic.css, comic.js, comic-widgets.css, comic-widgets.js only; BRIEF.md says assets/comic*.js and comic*.css.",
  "List all seven engine files (or say 'assets/comic*.js and assets/comic*.css').")
f("assets/ext/py-ch18.js, assets/ext/js-ch21.js","name clashes","-","low",
  "Two more name clashes the TODO doesn't list: py-ch18.js defines a third different `backpack`, and js-ch21.js uses `data-out` for a hand-typed label while js-ch4/6/7/8/9/11/13 use `data-out` for text filled from captures.",
  "py-ch18.js: `C.backpack = ...` (besides js-ch17.js and rs-ch20.js). js-ch21.js:11 'data-out = what it always gives (drawn on a tag under it, e.g. \"35\")' read with el.getAttribute('data-out').",
  "When promoting data-out (TODO line 52), rename js-ch21's attribute to data-gives and update javascript/ch21.html; rename py-ch18's drawing to `giftsack` (or similar) before any backpack is promoted.")

# ---------------- TODO items: status and exact change ----------------
f("tools/INTEGRATION_TODO.md","TODO lines 2,5,8,11-14,16-20,22,23,26-31,33-35,37,164,182,204-205,219,355","-","low",
  "These TODO items are DONE in the engine and need no further action; tick them off.",
  "Tracer gutter lanes and whole-run slot plan (comic-widgets.js:131-173, 256-266); checker drives any [data-act=next] (check_chapter.js); .panel > details overflow (comic-widgets.css:176); tr-split fit-content(72%) (:174); sfx/caption margins (:203-210); notebook .pair stacks (:180); map token clamp max(at.y+10,80) (comic.js:486); .spot minmax(0,1fr) and min-width:0 (:169-171); keywords in .tok-kw (comic.js:42-55); .trace display:block overflow-x:auto (:178); .terms single column <=640px (:184); revealing flag (comic-widgets.js:401-404); .recap b code (:182); .tr-code li min-height 1.7em (:173); name tags sized to longest name (planTracer tagW); value box width includes kind+label (objSize/valTag); [data-mem] ref arrows; anatomy title selector (comic.css:137); attribute-after-dot rule (comic.js:76-79); parity badge lookup (.controls .parity).",
  "Mark them [x] in the TODO.")
f("assets/ext/py-ch7.js, assets/ext/py-ch3.js","TODO lines 3, 10","390","low",
  "Train and crate viewBoxes are now sized to their content in the engine, but py-ch7.js still rescales crates with data-scale and py-ch3.js/css still carry the .train-fit workaround.",
  "comic-widgets.js:51 (train vb function) and :88 (crate vb function). grep: data-scale in ext/py-ch7.js; train-fit in ext/py-ch3.js and py-ch3.css.",
  "Delete the data-scale code from py-ch7.js and the .train-fit code/rules from py-ch3.js and py-ch3.css; re-screenshot python/ch3 and ch7 at 390.")
f("assets/ext/py-ch7.css","TODO line 4","390","low",
  "Phone code size and sfx caption room are now engine rules; py-ch7.css still has its own copies.",
  "comic-widgets.css:186 `.code, .term, ... { font-size: 0.875rem }` and :207-210 caption margins; py-ch7.css:65-66 `.strip pre.code ... { font-size: 0.875rem }`, `.panel .sfx.tr + .caption { margin-right: 104px }`.",
  "Delete py-ch7.css lines 65-66.")
f("assets/comic-widgets.css","TODO line 6",
  "690","low",
  "Still open: the engine only styles .pair inside the notebook; 26 chapters use .pair in main-strip panels and 36 chapter CSS files define it themselves, 6 of them as two fixed columns that clip long lines.",
  "Engine: only `.page-body .pair` (comic.css:226, comic-widgets.css:180). Chapter CSS: 23 files have the identical rule `.pair { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 12px; align-items: start; }`; 6 have `minmax(0,1fr) minmax(0,1fr)` (go/rust/py ext). Main-strip .pair users: rust/ch6 22, rust/ch4 21, go/ch28 11, ...",
  "Promote the common rule to comic-widgets.css: `.pair { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 12px; align-items: start; } .pair > * { min-width: 0; }`, keep the notebook override, and delete the 23 identical chapter copies; review the 6 two-column ones at 690px.")
f("assets/ext/py-ch1.js, assets/ext/go-ch1.js","TODO lines 7, 20, 402 (engine note on /* */)","1280","low",
  "The engine highlighter now handles # comments, escapes and multi-line /* */ comments, but py-ch1.js and go-ch1.js still replace L.highlight with their own versions (py-ch1's version is worse: it splits strings out before the engine sees them, so triple-quoted strings and prefixes like f\"...\" are handled by the fragment rules).",
  "py-ch1.js:16-43 `L.highlight = highlight` + rehighlight(); go-ch1.js:13-34 `L.highlight = goHighlight` + rehighlightCode(). Engine: HL.python.str has escapes/prefixes/triple quotes, com '#'; CCOM spans lines (comic.js:39).",
  "Delete the highlight override and rehighlight functions from py-ch1.js and go-ch1.js (keep rs-ch1.js's until the engine nests Rust comments, see the separate finding). Re-check python/ch1 and go/ch1 code colours.")
f("tools/INTEGRATION_TODO.md","TODO lines 9, 25","390","low",
  "Map sideways scrolling on phones is still by design (swipe hint added); the remaining problem is label size, measured separately.",
  "comic.css:186 .map-svg min-width 540px; comic-widgets.css:200 swipe hint. See the .map-svg finding (129/129 maps below 12px at 390).",
  "Close as 'by design', and apply the min-width change from the .map-svg finding.")
f("tools/INTEGRATION_TODO.md","TODO line 15","-","low",
  "Readlists that type traceback lines into HTML are a content check, not an engine change; still open for the content reviewers.",
  "TODO: 'verify against captures at integration (rule 1 exception)'.",
  "Content reviewers compare each .readlist quote with the capture; a later engine option could be `<code data-quote=\"prog.py#line\">` filled from the capture.")
f("assets/ext/*.css (51 files)","TODO lines 21, 177","1280","low",
  "Ligatures are off for all code in the engine, but 51 chapter CSS files still carry their own ligature rules (cpp-ch14 with !important).",
  "comic.css:268-272. grep 'liga|calt|ligatures' in assets/ext/*.css: 51 files (py-ch4, py-ch5, py-ch9, ..., cpp-ch14, cpp-ch16, ..., go-ch6 to go-ch28, js-ch6 to js-ch11, rs-ch4, rs-ch6, rs-ch7, ...).",
  "Delete the font-feature-settings / font-variant-ligatures rules from those files (they are no-ops now).")
f("assets/comic-widgets.css","TODO line 24","390","low",
  "Transcript tables were solved by scrolling (table.transcript min-width 560px inside a scrolling details) rather than stacked rows; close the item unless stacked rows are still wanted.",
  "comic-widgets.css:176-177.",
  "Close; optionally add a <=640px stacked layout later.")
f("tools/INTEGRATION_TODO.md","TODO line 36","-","low",
  "DONE: every Python data file is captured with CPython 3.15.2 and no page mentions 3.15.0b4.",
  "meta.capturedWith = ['CPython 3.15.2','CPython 3.13.18'] in data/py-ch1..27.json; grep '3.15.0b4|0b4' in python/*.html: no matches.",
  "Tick off.")
f("tools/INTEGRATION_TODO.md","TODO line 38","-","low",
  "The QA_REPORT chapter-level items (ch10 cast misuse, ch3 P41/P43 clipping, ch10 csv overflow, ch9 P13 wrap, ch3 P24) are not engine work and remain open for the chapter fix round.",
  "TODO line 38; tools/QA_REPORT.md.",
  "Hand to the python ch3/ch9/ch10 fixers.")
f("assets/ext/py-ch9.js, py-ch11.js, py-ch12.js, py-ch13.js, py-ch14.js, py-ch15.js, py-ch16.js, py-ch23.js","TODO lines 39, 44, 192","-","low",
  "The Python error critters and fetch are in comic-critters.js, and every chapter copy draws byte-identical output, so the copies are dead code.",
  "Loaded engine alone vs engine + each ext in a VM and compared draw() output and viewBox: identical for digger, duck (py-ch9, py-ch14), fetch (py-ch13), jangles, jigsaw, pockets, sneak (py-ch9, py-ch14), taster, tumble, zilch (py-ch9); py-ch11/12/13/15/16/23 copies are guarded with if (!C.x). Script "+S+"/cast.js.",
  "Delete the C.digger/duck/fetch/jangles/jigsaw/pockets/sneak/taster/tumble/zilch definitions from those extensions.")
f("/home/you/go-ch1/*.cmd, /home/you/go-ch2/*.cmd","TODO line 40","-","medium",
  "Still open: 14 Go .cmd files build their projects in the session scratchpad (/tmp/claude-0/.../scratchpad/go-chN/sessions/...), which no longer exists, outside the chapter folder, so a recapture writes outside /home/you and the secondary toolchain's go.mod lowering (which only scans the chapter folder) never applies to them.",
  "go-ch1: s_build, s_cd, s_init, s_mkdir, s_nomod; go-ch2: s_fmtbroken, s_fmtd, s_fmtl, s_fmtprec, s_fmtw, s_modhdr, s_vet, s_vetok, s_vetsyntax. e.g. s_init.cmd step 1 real: 'D=/tmp/claude-0/.../scratchpad/go-ch1/sessions/init/hello; mkdir -p $D && ...'. ls of that folder: No such file or directory.",
  "Replace the scratchpad prefix with a non-hidden folder inside the chapter (e.g. /home/you/go-ch1/sessions/...; hidden folders are skipped by go_mods_for_secondary), convert each to \"session\": true with a cd step, and recapture go ch1-ch2 with the other Go ch1-8 recaptures.")
f("assets/ext/js-ch1.js","TODO line 41","-","low",
  "The locale fix is captured (no setlocale warning in data/js-ch1.json) and the score font is fixed, but js-ch1.js still carries the dead warning-stripping code.",
  "grep setlocale: data/js-ch*.json none; js-ch1.js still has `var WARN = /^bash: warning: setlocale: LC_ALL: .../`. comic-widgets.css:130 .score-num uses --f-body.",
  "Delete the WARN filter from js-ch1.js and any text about it; tick the score-num part off.")
f("/home/you/rust-ch1/stage.sh, rust-ch14/t.sh, rust-ch16/t.sh","TODO lines 42, 197, 239","-","medium",
  "Still open: rust ch1, ch14 and ch16 rewrite real output (build time to #.##s, libtest time to 0.00s) inside hidden wrapper scripts; the prose discloses it but the shown command does not, against the AUTHORING house rule.",
  "data/rs-ch1.json contains '#.##s' 8 times; stage.sh 'replace the build time ... by #.##s'. rust-ch14/t.sh and rust-ch16/t.sh: `sed -E 's/finished in [0-9]+\\.[0-9]+s$/finished in 0.00s/'`; shown command 'cargo test -q -- --test-threads=1 --format pretty'.",
  "Make the normalisation visible: shown text 'cargo test -q -- --test-threads=1 --format pretty | sed -E \"s/finished in [0-9.]+s/finished in …s/\"' (and the same idea for cargo build time), with the real command identical; or drop the rewrite and mark the programs .nondet. Recapture rust 1, 14, 16.")
f("tools/INTEGRATION_TODO.md","TODO line 43","-","low",
  "Optional: cpp ch1 could use session:true; no engine change needed. The panel 30 reading list is a content check.",
  "capture.py supports \"session\": true (run_session).",
  "Leave to the cpp ch1 fixer; close as engine item.")
f("assets/comic-widgets.css (already) + 33 chapter CSS files","TODO lines 45, 257","-","low",
  "Shared furniture (.part-h, .duo, .checklist, .boss-h, .teaser) is in the engine, but early chapters still define it: .part-h in 33 files, .duo 27, .boss-h 24, .teaser 23, .checklist li 19 (the last also re-introduces the old grid layout the engine fixed).",
  "comic-widgets.css:212-235. Exact-selector grep in assets/ext: e.g. cpp-ch1..6, go-ch1..6, js-ch1..5, py-ch1, rs-ch1..6.",
  "Delete those blocks from the chapter CSS (keep only deliberate per-chapter variations), re-screenshot the affected pages at 390.")
f("assets/ext/cpp-ch1.js, go-ch1.js, go-ch2.js, js-ch1.js, rs-ch1.js, rs-ch2.js","TODO line 46","-","low",
  "Still open: six early extensions still swap the guide into walkers/map tokens and rewrite 'Real Python' with MutationObservers, although the engine now draws each book's guide and says 'Real run'; each observer redraws on every step.",
  "comic.js guide()/guideName() (lines 126-142) and comic-widgets.js sideBySide label 'Real run'. MutationObserver swaps: cpp-ch1.js:167-170, go-ch1.js:42-64, go-ch2.js:65-85, js-ch1.js:32-54, rs-ch1.js:62-90, rs-ch2.js:23-38 (WORDS 'Real Python' -> 'Real Rust run').",
  "Delete those blocks (keep js-ch2's live-region fix and rs-ch3's own widget observers, which do other work); re-check each page's walker and map.")
f("assets/ext/cpp-ch1.js, cpp-ch2.js, cpp-ch4.js","TODO line 47","-","low",
  "The linker is in comic-critters.js; cpp-ch1.js (unguarded) and cpp-ch2.js (guarded) still define identical copies. [data-alt-run] terminals in cpp-ch2.js and cpp-ch4.js duplicate the engine's data-alt (py9/py15 no longer use it).",
  "VM comparison: cpp-ch1 linker IDENTICAL. grep alt-run: only cpp-ch2.js, cpp-ch4.js, cpp/ch2.html, cpp/ch4.html.",
  "Delete the linker definitions; change cpp/ch2.html and cpp/ch4.html `<pre data-alt-run=\"x.cpp\">` to `<pre class=\"term\" data-run=\"x.cpp\" data-alt data-exit>` and delete mountAltTerm from both extensions.")
f("tools/INTEGRATION_TODO.md","TODO lines 48, 53 (claims), 61, 66, 91, 99, 131-133, 161, 173, 178, 185, 203, 210, 213, 220-221, 230-231, 241, 249, 258, 265, 272, 274-277, 285-286, 293, 296-297, 300-301, 305, 322, 324, 327, 331, 346, 350, 352, 361-362, 379-380, 383, 391, 396-397, 403, 414, 419, 422-424","-","low",
  "These TODO items are content, sourcing or chapter-page checks with no engine part; they remain open for the content/book reviewers and chapter fixers.",
  "Each line asks for a fact check, a cross-reference check, a recap/catchphrase check, a plan correction or a page edit (e.g. 'verify the URL in review', 'check against the finished js ch18', 'replace it with ch28's real catchphrase').",
  "Route to the content/book reviewers; no engine change.")
f("assets/ext/js-ch2.js, js-ch4.js, js-ch5.js","TODO line 49","-","low",
  "The TODO text is stale (it says the engine's JS ghost default is 'null'; the engine and AUTHORING say 'undefined'), and js ch2/4/5 still draw their own `jsghost`.",
  "comic-widgets.js:49 ghost label default `{ go: \"nil\", cpp: \"nullptr\", javascript: \"undefined\" }`; AUTHORING line 408. data-char=\"jsghost\" used in javascript/ch2, ch4, ch5.",
  "Replace jsghost with `ghost` (undefined) or `nullframe` (null) on those pages, delete C.jsghost from the three extensions, and correct the TODO wording.")
f("tools/INTEGRATION_TODO.md","TODO lines 50, 54, 59, 141, 158, 179, 189 (shopfront), 216 (done), 267, 415","-","low",
  "Single-chapter characters (sorter, clerk, ledger, py-ch21 inspector/parcel, Tally, Mo, shopfront, planner/headchef/examiner, coatcheck/guestlist) have not been reused elsewhere except coatcheck/guestlist (js-ch20 and js-ch29); keep them local.",
  "Extension cast listing: sorter only cpp-ch4, clerk only go-ch7, teller only cpp-ch12, attendant only cpp-ch14, shopfront only js-ch14, planner/headchef/examiner only cpp-ch17; coatcheck and guestlist in js-ch20.js and js-ch29.js.",
  "Close as 'keep local'; promote coatcheck/guestlist only if the JS critter consolidation happens.")
f("assets/ext/cpp-ch3.js, cpp-ch5.js, cpp-ch7.js","TODO lines 51, 64","-","low",
  "Sanitizer and conductor are in comic-critters.js; cpp-ch3.js (unguarded) and cpp-ch5.js (conductor unguarded) still define identical copies, cpp-ch5/ch7 guarded copies of sanitizer.",
  "VM comparison: cpp-ch3 sanitizer IDENTICAL, cpp-ch5 conductor IDENTICAL.",
  "Delete the copies.")
f("assets/ext/js-ch4.js, js-ch6.js, js-ch7.js, js-ch8.js, js-ch9.js, js-ch11.js, js-ch13.js","TODO lines 52, 168","-","low",
  "Still open: the capture-filled [data-out=\"prog.js#N\"] text helper (with its .parity[data-out-badge]) is implemented separately in seven JS extensions.",
  "grep data-out: js-ch4.js:156, js-ch6.js:32, js-ch7.js:33, js-ch8.js, js-ch9.js, js-ch11.js:16, js-ch13.js:16, all documented as 'line N of a captured run's output'.",
  "Promote one version to comic-widgets.js (fill textContent from L.shown(L.program(name)).split('\\n')[N-1], report misses, set the panel's .parity[data-out-badge]), document it in AUTHORING, delete the seven copies (rename js-ch21's unrelated data-out first).")
f("assets/comic-widgets.js","TODO line 58 (and 271)","1280","low",
  "Still open: the tracer has no non-owning arrow style (Rust borrow, JS prototype link); rust ch8 fakes borrows with '&String' boxes and js ch18 writes the constructor link as text.",
  "renderTracer draws every name/item reference with class tr-arrow (solid) or hot; no dashed variant. rust/ch8, javascript/ch18 ('↩ Actor (F1)' text).",
  "Allow `{\"n\": \"r\", \"ref\": \"s1\", \"style\": \"borrow\"}` on vars and `{\"ref\": ..., \"style\": \"link\"}` on items/pairs; in renderTracer add ` tr-arrow-` + style to the path class; CSS `.tr-arrow-borrow, .tr-arrow-link { stroke-dasharray: 3 5; }` and say 'borrows' / 'links to' in describeStep.")
f("assets/comic-widgets.css (picscroll) and the tracer/mem findings","TODO lines 60, 79, 84, 100, 119","390","medium",
  "Partly done: .picscroll/.pic-wide gives hand-drawn figures a readable phone mode, but the engine's own tracer and memory stepper still shrink to 4.5-10.5px (see the two high findings), and the listed chapter figures still need wrapping.",
  "comic-widgets.css:288-295; measurement in measure.json. Listed chapter figures: rust ch8/ch9, go ch9 shelf, cpp ch7, js ch10 panels 3 and 25, python ch19 gatekeeper (about 9px).",
  "Apply the tracer/mem natural-width fix in the engine; wrap each listed chapter figure in <div class=\"picscroll\"><svg class=\"fig pic-wide\">.")
f("/home/you/go-ch1..ch8 (recapture)","TODO lines 69-72, 78","-","high",
  "Still open: Go ch1-ch8 data still record Go 1.24.7 refusing almost every program ('go.mod requires go >= 1.27'), so their 'run on both toolchains' comparison is empty; go ch9 has since been recaptured correctly.",
  "Scan of data/go-chN.json alt records: ch1 31/38 refusals, ch2 43/52, ch3 55/55, ch4 68/68, ch5 65/65, ch6 58/59, ch7 73/73, ch8 57/57; ch9 0/49. Footers say so, e.g. go/ch8.html '1.24.7, which refused all 57 of them'.",
  "python3 tools/capture.py go N for N=1..8 (after fixing the go ch1/ch2 scratchpad .cmd paths), then rewrite each footer's 1.24.7 sentence from the new meta.versionDifferences and add any real difference (append capacity, see go ch9/ch28) to the notes.")
f("assets/comic-widgets.js","TODO line 75","1280","low",
  "Still open: objects that are gone for good keep their slot, so long tracers (python ch18 late binding) show tall empty gaps.",
  "layoutTracer: `oy += slot.h + 22;   // the slot is kept even when the object is absent`; only not-yet-born objects skip their slot.",
  "In planTracer record last[id] = last step index where the object exists; in layoutTracer skip the slot when `plan.cur > plan.last[id]` (born objects never move up while still alive, so tags stay stable).")
f("tools/INTEGRATION_TODO.md","TODO line 83","-","low",
  "DONE: BRIEF.md now points authors at comic-memory.js for the key creature.",
  "tools/BRIEF.md line 19.",
  "Tick off.")
f("assets/comic-widgets.js (new widget)","TODO lines 85, 114","-","low",
  "Still open (candidate): rs-ch9's UTF-8 slice window and go-ch9/ch10's shelf stepper remain separate chapter widgets.",
  "assets/ext/rs-ch9.js, go-ch9.js, go-ch10.js.",
  "Defer: only promote if the fix round touches them; otherwise close as 'kept local'.")
f("assets/ext/rs-ch7.css, cpp-ch8.css, rs-ch10.css, go-ch10.css","TODO lines 88, 107, 113","-","low",
  "Still open: the [data-mem] styles live in comic-widgets.css, but four chapter CSS files still carry copies.",
  "grep '.mh-frame|.mem-svg|.mh-hbox' in assets/ext: cpp-ch8.css, go-ch10.css, rs-ch10.css, rs-ch7.css. comic-widgets.css:237-239 says the fix round removes them.",
  "Delete the .mem-*/.mh-* blocks from those four files; re-screenshot rust ch7/ch10, cpp ch8, go ch10.")
f("data/cpp-ch1..12 (recapture)","TODO lines 90, 157","-","low",
  "capture.py now ignores command-only differences, but C++ ch1-ch12 were captured before that change, so their versionDifferences still list nearly every program and the ch8-ch12 footers explain that.",
  "meta.versionDifferences / programs: cpp-ch2 35/40, ch3 47/54, ch4 43/47, ch5 56/60, ch6 51/54, ch7 48/55, ch8 50/57, ch9 42/47, ch11 31/46, ch12 44/49 (cpp-ch13 after the change: 5/44). cpp/ch12.html: 'The capture tool lists every program under its version differences, because the compiler's name...'.",
  "Recapture cpp 1-12 (budget for cpp17's 6-minute CMake if included) and rewrite those footer sentences from the new lists.")
f("assets/ext/cpp-ch5.js, cpp-ch6.js, cpp-ch7.js, cpp-ch9.js, cpp-ch10.js, cpp-ch11.js, cpp-ch12.js, js-ch6.js, py-ch4.js","TODO lines 94, 132, 150, 156","-","low",
  "data-same-src is in the engine, but nine extensions still run their own copy; when sources differ each copy reports the error again.",
  "comic-widgets.js:604-623 (engine, with a data-same-src-reported guard). grep data-same-src in ext/*.js: the nine files listed.",
  "Delete the [data-same-src] blocks from those extensions.")
f("assets/ext/py-ch15.js, py-ch19.js, py-ch20.js","TODO lines 101, 122, 244","-","low",
  "Still open: cutter/cookie are copied in three Python chapters, and rs-ch17.js defines a different `cutter`.",
  "Cast listing: C.cookie and C.cutter in py-ch15/19/20.js; L.cast.cutter in rs-ch17.js.",
  "Promote the Python pair as `cookiecutter`/`cookie` to comic-critters.js, rename on python ch15/19/20 pages, delete the copies; leave rs-ch17's `cutter` local or rename it `badgecutter`.")
f("assets/ext (20 CSS files)","TODO lines 108, 153, 171","1280 and 390","low",
  "The house rule is in AUTHORING, but 20 chapter CSS files still have an unscoped `.fig text {` rule that overrides SVG font-size attributes.",
  "grep '\\.fig text\\s*\\{' : js-ch23, py-ch6, rs-ch4..ch10, rs-ch11..ch16, rs-ch18, rs-ch20, rs-ch22, rs-ch24, rs-ch25.",
  "Change each to `.fig text:not([font-size])` (keeping its declarations) and re-screenshot those figures; visual reviewers confirm.")
f("tools/INTEGRATION_TODO.md","TODO lines 98, 109, 112, 115, 124, 137, 152, 174, 194, 245, 248, 253, 280-282, 314-315, 319, 334, 339, 343, 366, 370, 384, 388, 392, 407","-","low",
  "Informational TODO notes with no open action (archived parts, plan renames, verified fixes); tools/ is clean (no _tmp_el_py20.js).",
  "ls tools/: BRIEF.md, INTEGRATION_TODO.md, QA_REPORT.md, RESUME.md, REVIEW_BRIEF.md, __pycache__, browser_capture.js, build.py, capture.py, check_chapter.js, fixture/, gen_index.py, plans/, q.py, queue.json, review/, review_queue.json.",
  "Tick off.")
f("assets/comic.css",".walk","1280","low",
  "Still open: the walker's recipe card is about 360px wide at 1280, so print lines over ~38 characters wrap.",
  "comic.css:140 .walk grid-template-columns: minmax(0,1.45fr) minmax(0,1fr) inside the 760px strip; .recipe padding-left 64px.",
  "Let long programs stack: in mountWalker `if (Math.max.apply(null, lines.map(function(l){return l.length;})) > 38) box.querySelector('.walk').classList.add('stack');` and CSS `.walk.stack { grid-template-columns: minmax(0,1fr); }`. (TODO line 123.)")
f("/home/you/go-ch11, go-ch15, go-ch16, go-ch21 (recapture)","TODO lines 127, 208, 234-235, 318","-","high",
  "Still open: capture.py's module fixes are in place, but go ch11 (string_int), ch15 (30 of 39 programs), ch16 (11 of 39) and ch21 (toolchain) were not recaptured, so their secondary records are wrong: refusals that no longer happen, and in ch21 a 'go 1.28' gate that 1.24.7 silently ran.",
  "data/go-ch11.json string_int.go alt: 'go: go.mod requires go >= 1.27'. go-ch15: 30 alt refusals 'requires go >= 1.27.3'; go-ch16: 11. go-ch21 toolchain.go alt: 'cat go.mod' shows 'go 1.24' and 'go run .' prints 'hello from the future' (primary refuses with 'requires go >= 1.28'). Genuine refusals that should stay: go-ch13 new_gate.go, go-ch25 errgroup.go, go-ch27 imports/lint/pitcrew/stdver.",
  "Recapture go 11, 15, 16, 21 and update the version notes/footers (go/ch15.html '1.24.7 refuses to build this module at all', go/ch21 lab note).")
f("go/ch8.html, go/ch11.html","TODO lines 128, 140","-","low",
  "Parsons pin is in the engine, but go ch8 and ch11 parsons still use no pins (go ch8 still tells readers to use gofmt import order).",
  "comic-widgets.js:459 m.pin; grep '\"pin\"' go/ch8.html and go/ch11.html: 0.",
  "Add \"pin\": [1, 2, ...] for the package/import lines of those parsons models and drop the gofmt-order instruction.")
f("assets/ext/rs-ch11.js, rs-ch13.js, rs-ch21.js","TODO lines 136, 172, 304","-","low",
  "giftbox and parcel are in comic-critters.js; rs-ch11 (giftbox) and rs-ch13 (parcel) define unguarded identical copies, rs-ch21 a guarded one.",
  "VM comparison: rs-ch11 giftbox IDENTICAL, rs-ch13 parcel IDENTICAL.",
  "Delete the copies; consider renaming Python ch17/21's local `parcel` to `pyparcel`.")
f("/home/you/go-ch12/order.go, /home/you/rust-ch14 (report.rs)","TODO lines 144, 198","-","medium",
  "Still open: go ch12 panel 16 and rust ch14 panel 39 still prove variation by showing the secondary toolchain's different run, which a recapture can make identical (then data-alt errors).",
  "data/go-ch12.json order.go has alt and is .nondet; go/ch12.html uses data-alt on order.go. rust/ch14.html uses data-alt on report.rs (alt exists today).",
  "Follow the house rule: one program that prints the order several times (or two named .nondet programs on the primary toolchain), and drop data-alt from those panels.")
f("tools/INTEGRATION_TODO.md","TODO line 147","-","low",
  "Choice shuffling is DONE; the remaining check (why-texts that mention option positions) belongs to the content reviewers.",
  "comic-widgets.js:429-441.",
  "Tick off the engine part.")
f("assets/comic-widgets.js (new widget)","TODO lines 151, 184, 308","-","low",
  "Still open: [data-report] means four different widgets (cpp-ch2 compiler-message reader; cpp-ch11/13/21 ASan reader; go-ch15 go test -v stepper; rs-ch14 test-report callouts); rs-ch24 already renamed its copy. They can't be promoted under one name.",
  "grep data-report in ext/*.js: cpp-ch2, cpp-ch11, cpp-ch13, cpp-ch21, go-ch15, rs-ch14, rs-ch24 (rs-ch24:14 'renamed so the two can never clash').",
  "If promoted, create distinct engine widgets ([data-asan] from cpp-ch11, [data-annot] for js-ch12's annotated output) and rename the attributes on cpp ch11/13/21 and js ch12 pages; leave cpp-ch2/go-ch15/rs-ch14 local under renamed attributes ([data-msgparts], [data-testrun], [data-testboard]).")
f("AUTHORING.md","TODO line 167","-","low",
  "Still open decision: AUTHORING says the Proofreader and Bouncer are Python's, yet the JS book uses them for SyntaxError/ReferenceError.",
  "AUTHORING line 374: 'The Proofreader and the Bouncer are Python's; compiled books use the Compiler'. javascript ch13 uses both.",
  "Recommend: make them shared interpreter-error characters and change AUTHORING's sentence to 'The Proofreader (syntax errors) and the Bouncer (unknown names) serve the interpreted books, Python and JavaScript; compiled books use the Compiler.'")
f("tools/capture.py","TODO line 183","-","low",
  "Still open: no per-program ASAN_OPTIONS sidecar (cpp ch13 couldn't capture stack-use-after-return; cpp ch24 later did without it, which the content reviewer must reconcile).",
  "LANGS['cpp']['env'] sets ASAN_OPTIONS='detect_leaks=1:color=never' for every program.",
  "Add `name.asanopts` (one line appended to ASAN_OPTIONS, shown in the displayed command as `ASAN_OPTIONS=... ./name`): in run_program, `if f.with_suffix('.asanopts').exists(): env['ASAN_OPTIONS'] += ':' + text.strip()` and prefix the run step's display.")
f("assets/ext/js-ch14.js, js-ch24.js, js-ch27.js","TODO lines 189, 338, 400","-","low",
  "umpire and pager are in comic-critters.js; js-ch14 (umpire) and js-ch16 (pager) define identical copies, js-ch24 draws its own pager24 and js-ch27 its own juno27.",
  "VM comparison: js-ch14 umpire IDENTICAL, js-ch16 pager IDENTICAL; data-char=\"pager24\" on javascript/ch24.html, \"juno27\" on javascript/ch27.html.",
  "Delete the copies; switch pager24 -> pager and juno27 -> umpire on those pages (check poses still fit).")
f("tools/INTEGRATION_TODO.md","TODO line 202","-","low",
  "The clippy/fmt toolchain fix is in capture.py, but the 'list below' of chapters to recapture is missing; rust ch2 (fmt_messy.rs, captured 22:43 the day before the fix) is the only chapter captured earlier.",
  "Rust .cmd files using clippy/fmt: rust-ch2 (1, data 2026-11-07 22:43), ch15 (6, 05:34, has alt records), ch24, ch28 (after the fix). rs-ch97 verified clippy 0.1.99 primary.",
  "Recapture rust 2 and write the list into the TODO.")
f("/home/you/go-ch15/*.cmd","TODO line 209","-","medium",
  "Still open: 20 go ch15 test runs pipe through a hidden sed (elapsed time to …s) and -count=1; the shown command is 'go test' / 'go test -v'.",
  "e.g. fill_double.cmd shown 'go test -v', real \"cd calc_fill && go test -v | sed -E 's/\\t[0-9]+\\.[0-9]+s$/\\t…s/'; exit ${PIPESTATUS[0]}\"; all_pkgs.cmd adds -count=1.",
  "Show the pipe and flag in the display text (e.g. \"go test -v | sed -E 's/\\t[0-9.]+s$/\\t…s/'\") and recapture go 15.")
f("assets/comic-memory.js","TODO line 214","1280","low",
  "Still open: the first slot's type label sits 14px under the 'top plate: running now' tag and can touch it when the type is long.",
  "render(): frame name/tag at y+22, first slot type at ry+2 = y+HEAD+2 with HEAD = 34.",
  "Set `var ROW = 60, HEAD = 42` (and the plan() height uses HEAD, so nothing else changes).")
f("tools/capture.py","TODO lines 215, 240","-","low",
  "Still open: no per-program scratch folder and no .env sidecar; chapters work around them with .cmd wrappers.",
  "run_step runs in f.parent; env comes only from LANGS[...]['env'].",
  "Add `name.env` (KEY=VALUE lines merged into env and shown as a prefix of the displayed command) and an opt-in `name.scratch` that runs the program in a fresh /home/you/<lang>-chN/.scratch/<name>/ folder (emptied before each run).")
f("/home/you/javascript-ch1, ch8, ch15 (recapture)","TODO line 225","-","medium",
  "Still open: JS chapters with .html programs captured before the browser_capture.js fix were not recaptured; js-ch15 (58 .html programs, and panel 13 explains the old wrong order) is the main one.",
  "browser_capture.js mtime 2026-11-08 05:50; data/js-ch15.json 05:34, js-ch8 2026-11-07 23:38, js-ch1 22:26. js-ch15's 5 merged .html streams all equal stdout+stderr (no interleaving); js-ch28, captured later, interleaves in 3 of 5.",
  "Recapture javascript 1, 8, 15; then update js ch15 panel 13/footer and restore <script src> in spot_head.")
f("assets/comic.js (highlight html) + tools/capture.py","TODO line 226","1280","low",
  "Still open: JS inside .html programs is highlighted as markup only, and there is no native 'show' sidecar for .html programs.",
  "HL.html has kw:{} and tag mode; highlight treats the whole file as html (hlLang: /^\\s*</).",
  "In highlight(), when L2 === 'html', split out `<script>...</script>` bodies and highlight them with 'javascript' (and `<style>` as plain); in js_steps, read an optional name.show (JSON list) like .cmd's show.")
f("assets/ext/cpp-ch15.js, cpp-ch16.js","TODO line 229","-","low",
  "marshal is in comic-critters.js; cpp-ch15 and cpp-ch16 both define unguarded identical copies.",
  "VM comparison: IDENTICAL for both.",
  "Delete the copies.")
f("assets/ext/rs-ch14.js, rs-ch16.js, rs-ch24.js","TODO lines 238, 349","-","low",
  "The Rust inspector is in comic-critters.js; rs-ch14 (unguarded) and rs-ch16/rs-ch24 (guarded) still define identical copies. py-ch21 and cpp-ch18 keep different local inspectors.",
  "VM comparison: rs-ch14 inspector IDENTICAL; py-ch21 inspector DIFFERENT (vb 0 0 170 200).",
  "Delete the Rust copies; rename py-ch21's to `mypyinspector` and cpp-ch18's to `pike` on their pages.")
f("assets/comic-widgets.js + comic.js","TODO line 252","1280","low",
  "Still open: line-by-line widgets (walker, tracer code, spot, parsons) colour the middle lines of a multi-line docstring as code.",
  "mountWalker/mountTracer/spot/parsons call highlight(l) per line.",
  "Add `L.highlightLines(src)` to comic.js: highlight the whole source once, then split the HTML at '\\n', closing any open <span ...> at each line end and reopening it on the next line; use it in mountWalker, mountTracer, comic-memory's code list, spot and parsons (parsons pieces can keep per-line highlighting since lines move).")
f("research/go.md","TODO line 261","-","low",
  "Still open: research/go.md row I3 (named types) still cites '100M #17', which is the octal-literals mistake.",
  "research/go.md line 148: '... BOOT (ch16); 100M #17 |'.",
  "Drop '100M #17' from row I3 (it fits row B8, line 116, which also cites it).")
f("assets/go-book.css (new) + go-ch10/16/18 css","TODO lines 113, 262","-","low",
  "Still open: the Go book's shared helper block is copied in go-ch10.css, go-ch16.css and go-ch18.css.",
  "TODO lines 113, 262.",
  "Move it into comic-widgets.css under a `[data-book=go]` scope (keeps the 'engine files only' rule and needs no new <link>), then delete the copies.")
f("assets/comic-widgets.css","TODO line 309","-","low",
  ".picscroll is promoted, but cpp-ch21.css, cpp-ch23.css and cpp-ch25.css still define it.",
  "Exact-selector grep '\\.picscroll *\\{' in assets/ext.",
  "Delete those three copies.")
f("assets/comic.js foldSegs","TODO line 310","-","low",
  "Still open (candidate): data-fold only knows Node internal frames; g++'s 368-line candidate lists (cpp ch21 panel 1) can't be folded.",
  "FOLD_RE = /^\\s+at .*\\(?node:[a-z_]+[/:]/.",
  "Allow data-fold=\"gcc-notes\": fold runs of lines matching /^\\S+:\\d+:\\d+:\\s+note:|^\\s+\\d+ \\||^\\s+\\|/ after the first error, keeping the full text in the existing details box.")
f("tools/INTEGRATION_TODO.md","TODO line 313","-","low",
  "Close: struct tags highlight correctly in the engine (raw string alternative `[^`]*`).",
  "HL.go.str includes '`[^`]*`?'; the TODO itself could not reproduce it.",
  "Close; a visual reviewer checks the one go ch22 panel.")
f("assets/comic.js mountMap","TODO line 342","1280 and 390","low",
  "Still open: the map's moving guide token covers the right 40px of the current place box, hiding the end of its label.",
  "mountMap: token translate x = at.x + at.w - 6, inner svg x = -34, width 52, so it spans at.x+at.w-40 to at.x+at.w+12.",
  "Place the token just outside the box: `var tx = Math.min(at.x + at.w + 30, m.size[0] - 20);` and use tx in both translate calls (keep the y clamp).")
f("tools/capture.py","TODO lines 365, 401","-","low",
  "Still open: 'merged' comes from a second run (thread ids differ from stdout/stderr), and session .cmd runs record no merged stream at all.",
  "run_program: second subprocess.run(... stderr=STDOUT) per step; run_session records only out/err.",
  "Capture both from one run: run each step as `bash -c 'CMD' 2> >(sed \"s/^/\\x1eE/\") ` with stdout and the tagged stderr on one pipe, then split lines by the \\x1eE tag into err, untagged into out, and keep the combined order as merged; for sessions apply the same tag inside run_session's script.")
f("assets/ext/go-ch24.js, go-ch25.js, go-ch26.js, rs-ch15.js, rs-ch28.js","TODO lines 358, 369, 406","-","low",
  "kitchenhand and trailguide are in comic-critters.js; go-ch24 (unguarded), go-ch25/26 (guarded), rs-ch15 (unguarded), rs-ch28 (guarded) still define identical copies.",
  "VM comparison: go-ch24 kitchenhand IDENTICAL, rs-ch15 trailguide IDENTICAL.",
  "Delete the copies.")
f("tools/capture.py","TODO lines 373-375","-","low",
  "Still open (process): nothing clears the per-chapter cargo target caches, which filled the disk once (14 GB).",
  "run_program sets CARGO_TARGET_DIR=/home/you/.target/<which>/<chapter>; never cleaned.",
  "Add `--clean-target` to capture.py (or do it by default for rust): after a successful write, `shutil.rmtree(f'/home/you/.target/{which}/{folder.name}', ignore_errors=True)` for both toolchains.")
f("tools/INTEGRATION_TODO.md","TODO line 393","390","low",
  "Close the trace-table part: no trace table overflows its exercise card at 390px on any page, so nothing defeats the engine's overflow rule; the shrunk cells in cpp ch27 are a chapter choice.",
  "measure.js: for every table.trace, checked the table and card rectangles and card scrollWidth at 390 px on all 142 pages: 0 overflows.",
  "Tick off; the code-in-headings part is DONE (comic.css:276).")
f("assets/comic.css","TODO lines 402, 411","390","low",
  "Still open: `.term.wrap` is defined identically in 49 chapter CSS files and never in the engine (see the terminal-wrapping finding for the rule that keeps carets aligned).",
  "49 x `.term.wrap { white-space: pre-wrap; overflow-wrap: anywhere; }` in assets/ext (cpp-ch4..29, js-ch1..29, py-ch13, rs-ch27).",
  "Promote with the has-carets guard and delete the copies.")
f("tools/browser_capture.js","TODO line 410","-","low",
  "Still open (candidate): browser_capture.js aborts every non-file request, so module scripts and CORS can only be shown through chapter-local servers (js ch28's theater.cjs).",
  "`await ctx.route(/^(?!file:)/, (r) => r.abort());` and `page.goto('file://' + ...)`.",
  "Add an http mode: when name.http exists, serve the program folder with a tiny node http server on 127.0.0.1:<free port>, goto http://127.0.0.1:<port>/name.html, and route-abort everything except that origin.")
f("assets/ext/rs-ch26.js, rs-ch27.js, rs-ch29.js","TODO line 418","-","low",
  "Still open: linecook (rs-ch26) and asyncwaiter (rs-ch27) are copied unchanged into rs-ch29.",
  "Cast listing: L.cast.linecook in rs-ch26.js and rs-ch29.js; L.cast.asyncwaiter in rs-ch27.js and rs-ch29.js.",
  "Promote both to comic-critters.js with an AUTHORING engine note; delete the three copies.")

json.dump(F, open("/home/claude/comic-site/tools/review/engine.json","w"), indent=1, ensure_ascii=False)
from collections import Counter
print(len(F), Counter(x["severity"] for x in F))
