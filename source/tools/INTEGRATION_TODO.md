# Integration queue (engine requests from chapter authors)
- [ch7] Tracer: arrows from inside containers cross each other (list of lists, swap). Route them cleanly.
- [ch7] Crate/train: fixed 320/300 canvas makes short rows tiny; trim viewBox to content in the engine (ch7 ext does it via data-scale).
- [ch7] Phones: code 14px at <=640px; give captions room beside sfx bursts. Move from ext/py-ch7.css into engine.
- [ch7] Checker should drive extension widgets  -> DONE (generic: any [data-act=next] box, any .path-btn).
- [ch7] Code+terminal side-by-side clipped at 690px: consider stacking .pair under 760px in engine.
- [ch1] highlight(): handle # comments and backslash escapes in strings (ch1 ext monkey-patches lib.highlight on its page; remove the patch after the engine fix).
- [ch1] Checker: step [data-lens] widgets (now covered if they use data-act=next; verify).
- [ch1] Phones: map/lens/terminals scroll sideways by design (caret alignment). Review at integration.
- [ch3] Train viewBox sized to text length (same as ch7 crate request); remove .train-fit workaround in ext/py-ch3.js after.
- [ch3] .panel > details { min-width:0; overflow-x:auto } into comic-widgets.css (opened transcripts widen panels on phones).
- [ch3] Tracer code column too narrow at desktop; widen .tr-split code column / allow wrap.
- [ch3] Sfx bursts cover captions on phones (pilot too) -> shrink/reposition at <=640px in engine.
- [ch3] Notebook .pair clips long code lines -> stack (same as ch7).
- [ch3] Readlists quote traceback lines typed into HTML: verify against captures at integration (rule 1 exception).
- [ch2] Tracer object order must be stable across steps (layout by first appearance over ALL steps, not per step). Then re-check ch2 swap tracers (tag ordering workaround).
- [ch2] Narrow tracer: arrows to lower objects cross upper objects -> route down the left/right gutter.
- [ch2] .spot-line, its code, .parsons li code need min-width:0 (+overflow-x:auto) in engine.
- [ch2] Map: Pip token sits ~78px above its state; clipped near top. Clamp in mountMap.
- [ch2] highlight(): # comments (dup of ch1).
- [ch4] Ligatures off for code -> DONE in comic.css (font-feature-settings calt/liga 0). Remove ch4's per-page workaround after verifying.
- [ch4] highlight(): colour keywords (if elif else and or not in True False None for while def return ...) with .tok-kw.
- [ch4] Trace tables: scroll inside card on phones (engine CSS).
- [ch4] Transcript tables squeeze "What happens" on phones -> stacked rows layout at <=640px.
- [ch4] Map min-width 540 forces sideways scroll at 390 (pilot too) -> consider portrait reflow or zoom note.
- [ch8] .spot grid-template-columns: minmax(0,1fr) (+ spot-line code min-width:0) (dup ch2).
- [ch8] Tracer code column 0.9fr clips >21 chars at 1280 (dup ch3).
- [ch8] .terms squeezes definitions on phones -> single column at <=640px.
- [ch8] "Show the answer" records a pass -> DONE (revealing flag; state reads "Answer shown").
- [ch8] Recap titles in Bangers uppercase -> code can't go there; allow <code> with mono font in .recap b.
- [ch6] .tr-code li:empty needs min-height (blank lines collapse, numbers overlap).
- [ch6] Tracer object width: measure text (getComputedTextLength) instead of 10px/char; document "function" kind.
- [ch6] Tracer name tags fixed 120px -> size to name length.
- [ch6] Tracer code pane width: 1.5fr/1fr (dup ch3, ch8).
- [ch6] highlight keywords (dup ch4).
- [research] PRIMARY INTERPRETER: stable CPython 3.15.2 (released 2026-10-25) is now installed at /root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/bin/python3.15. Switch capture.py primary from 3.15.0b4 to 3.15.2 AFTER ch10 finishes; re-capture all 10 chapters; diff old vs new outputs; fix every page footer/version-note that names 3.15.0b4 or claims a 3.15-vs-3.13 difference that changed.
- [ch9] .tr-code li { min-height: 1.7em } (dup ch6). Object box long value overlaps type label (dup ch6).
- [QA] Python review findings in tools/QA_REPORT.md (0 blocker, 11 major, 18 minor). Engine-level ones fixed pre-launch (scroll shadows, wrap on phones, map swipe hint, error-road symbol). Chapter-level ones (ch10 Bouncer/Digger cast misuse, ch3 P41/P43 clipping, ch10 csv notebook overflow, ch9 P13 wrap, ch3 P24 "two red ones") go to the final fix swarm.
- [py11] Move ch9 critters (Jigsaw, Taster, Tumble, Jangles, Zilch, Pockets, Digger, Sneak, duck) and ch7 sealed crate / ch8 bag into the shared engine; later chapters copy them.
- [go1] .cmd session sidecars run in a scratchpad folder path (session-specific); re-capture elsewhere needs path change. Walker/map now draw the guide (engine) — go1 ext workaround for data-dirs may be redundant.
- [js1] en_US.UTF-8 locale now installed; js ch1 recaptured (setlocale warning gone). Its footer/ext text about stripping the warning is now stale -> fix swarm. Also js1 Bangers '27' looks like '21' in score at small size (score-num font).
- [rs1] stage.sh replaces cargo build time with '#.##s' in captured output: an edit of real output. Review: must be disclosed on the page, or switch to cargo -q/no timing. Also 'Rivet' vs Mabel resolved by CAST.md.
- [cpp1] reading list in panel 30 types error text into HTML (matches capture). cpp1 could switch its 25 .cmd sessions to session:true (persistent shell) in the fix swarm to drop the '$? re-runs ./cake' workaround.
- [py13] Fetch critter (ModuleNotFoundError/ImportError) in ext/py-ch13.js -> move to comic-critters.js. py13 'How this run was really made' notes now redundant (steps recorded).
- [go3] promote shared chapter CSS (part-h, duo, checklist, boss-h, teaser, tab-size, term-wrap) into engine; ch go1/go3 copies.
- [early chapters go1 go2 rs1 js1 cpp1] carry MutationObserver/ext workarounds for guide-in-walker, 'Real Python' labels, lamp labels: engine now does all of these. Fix swarm: remove redundant workarounds and re-verify.
- [cpp2] Linker character in ext/cpp-ch1.js & cpp-ch2.js -> move to comic-cast.js. data-alt-run ext in cpp2/py9/py15 now redundant (engine data-alt).
- [cpp3] notebook claims C++26 'erroneous behaviour' (P2795) — verify wording; C++26 not ISO-published (DIS disapproved Oct 2026).
- [js2/js3] ghost: js2 uses own jsghost, js3 uses data-label=undefined; engine default now 'null' for JS. Unify at fix swarm (JS has both null and undefined: nullframe for null, ghost for undefined?).
- [cpp4] Cindy the mail sorter (data-char=sorter) in ext/cpp-ch4.js -> move to critters if reused.
- [cpp5] Conductor + Sanitizer (copied from cpp3) in ext -> critters. data-same-src badge in ext; AUTHORING reference? implement in engine if reused. cpp5 .cmd 'exit $?' workaround for abort now unnecessary (engine ISOLATE_SH).
- [js4/js6/cpp5] data-out (values in drawings from captures) and data-same-src (identical-source badge) are implemented separately in several ext files -> promote one engine version.
- [cpp6] offby .cmd 'exit $?' workaround now unnecessary; unverified claim: MSVC C26819 under /analyze for missing break -> verify. Lev (lift) + Rita (referee) chars in ext.
- [go7] Penny the clerk (data-char=clerk, strconv) in ext/go-ch7.js.

## From rust ch8 (The Library Ledger)
- rs-ch8 draws the owner's key inline because the ch7 key creature did not exist yet. Switch it to the shared `key` creature in comic-memory.js.
- Tracer: add a non-owning (borrow) arrow style, a dashed arrow from one name to another. rs-ch8 fakes it with "&String" boxes.
- Promote Mabel's permission ledger widget (rs-ch8.js) into the engine if rust ch9/ch19 reuse it.
- Shared wide/narrow figure helper, so chapters don't hand-draw a second SVG for phones.
- rs-ch8 panel 11: the 4→20 String capacity comes from a separate rustc run, not a captured program. The footer discloses it; consider capturing it.

## From cpp ch7 (Machines in Many Rooms)
- The Sanitizer character is duplicated in the cpp-ch3, ch5 and ch7 extensions. Move it into comic-critters.js and remove the copies.
- The cpp-ch7 value boxes may now use the engine's value-box `label` (added after ch7). Check whether ch7 would read better with it.
- capture.py runs with C.UTF-8, so g++ prints curly quotes; the cpp plan assumed straight ones. Chapters match the captures. Note it in the C++ lab pages consistently.

## Go secondary toolchain (found at go ch8)
- Every Go capture through ch9 recorded the secondary Go 1.24.7 as refusing the program ("go.mod requires go >= 1.27"), because the chapter go.mod says go 1.27 and GOTOOLCHAIN=local. So the "both toolchains" claim was hollow for Go.
- capture.py now builds the secondary against `.go124.mod` ("go 1.24") via -modfile. Verified on go-ch99: unused.go now matches; m.go differs only in its panic report.
- Fix swarm: recapture go ch1–ch8 (and ch9 if its author didn't), then update footers and any wording that says 1.24.7 refused every program.
- go ch8: phone code panes scroll sideways; the parsons import order depends on gofmt; the plan's `-trimpath` was not applied (the book's `go run` convention was kept).

## From python ch18 (Backpacks and Gift Wrap)
- Tracer: fixed slots leave vertical gaps when objects fade (the late-binding tracer is tall). Consider compacting slots of objects that are gone for good.

## From go ch9 (Windows on a Shelf)
- go-ch9 was captured before the secondary fix: 48 of its 49 programs record 1.24.7 refusing to run. After recapture, the append-capacity difference (Go 1.26+ gives the first append a starter array) will likely show in several more programs. Check the shelf stepper's parity and every `data-alt`.
- On phones the 8-box shelf scales its labels down to about 10–12px.
- It refers to ch8's detective method and `%#v`; go/ch8.html now exists, so check the cross-references match it.

## From rust ch9 (Case Files and Windows)
- Its author thought the key creature lived only in rs-ch7.js and drew its own. The key is in comic-memory.js now (see AUTHORING), so BRIEF.md should point authors at comic-memory.js explicitly.
- Recurring across rust ch8/ch9, go ch9 and cpp ch7: hand-drawn SVG figures and the tracer shrink to 10–13px text on phones. The fix swarm should add a shared wide/narrow figure helper, or a minimum-text rule for figures.
- Candidate engine widgets: rs-ch9's slice window (UTF-8 byte boxes) and go-ch9's shelf stepper are close cousins. Consider one shared "buffer window" widget.

## From cpp ch8 (Nicknames and Egg Cartons)
- The `[data-mem]` styles are now in comic-widgets.css. Remove the duplicate blocks from rs-ch7.css and cpp-ch8.css.
- cpp-ch8: walk-through code lines wrap at 1280, and one analogy label touches the hand.
- Every cpp program is listed in versionDifferences because the displayed command differs (g++ vs clang++). capture.py could compare program output only, so real differences stand out.
- ASan doesn't catch std::string misuse (libstdc++ is not instrumented). Mention this in the C++ notebooks where sanitizers are introduced.

## From cpp ch9 (Forms and Map Legends)
- The `data-same-src` badge is now copied into cpp-ch7 and cpp-ch9. Promote it into the engine (already listed) and remove the copies.
- clang++ gives no uninitialised-member warning where g++ does; the page shows this. Designated initialisers out of order: an error in g++, only a warning in clang++.

## From python ch19 (Family Trees and Toolbelts)
- Its author built the page from parts p0–p7.html plus a build.py in the scratchpad. Those are now archived in `src/python/ch19-parts/` because the scratchpad isn't kept. **python/ch19.html is the canonical source**: edit it directly, and do NOT re-run the parts build, which would overwrite later edits.
- The version-notes claims (abstract-class wording since 3.12, read-only property message since 3.11, abc.ABC since 3.4, zero-arg super() since 3.0) were written from the author's own knowledge without a check. The review round must verify them against the Python docs and changelogs.
- On phones the gatekeeper drawing's labels render at about 9px (there is a text description). Add it to the shared figure-text fix.
- py-ch19.js copies ch15's cookie-cutter/cookie drawings. Candidates for comic-critters.js.

## From javascript ch9 (Trains and Conveyor Belts)
- Its author spot-checked the phone crops but didn't review every one. The review round should do a full 390px pass.

## From rust ch10 (Forms and Remote Controls)
- rs-ch10.css also copies the `[data-mem]` styles, which are now in the engine. Remove its copy along with rs-ch7 and cpp-ch8.
- Engine note: a chapter's `.fig text { font... }` rules override SVG font-size/fill attributes. Document this in AUTHORING (use a separate class for attribute-styled drawings).
- The Rust plan named the guide "Rivet" in every chapter's cast, while CAST.md (and every written chapter) uses Mabel. The plan is now corrected (backup in the scratchpad); no Rust chapter page used "Rivet".

## From go ch10 (Two Windows, One Shelf)
- The plans named the guides "Dash" (Go), "Guide" (C++) and "JS guide" (JavaScript) in every cast line, while CAST.md has Scoot, Wren and Kit. All plans are now aligned with CAST.md (backups in the scratchpad). go/ch3 uses "Dash" only as an example string, which is fine.
- go-ch10.css copies the `[data-mem]` styles (now in the engine) and the Go book's shared helper styles from ch9. Remove the first; consider a go-book.css for the second.
- Candidate engine widget: go-ch9/ch10's shelf stepper. Strings (go ch11) and later slice chapters could reuse it; unify it with rs-ch9's slice window.
- go-ch10 is the first Go chapter captured with the real secondary: all 50 programs ran on 1.24.7, and one real wording change (copy_types.go) is shown.

## From javascript ch10 (Drawers and Addresses)
- Machine plates now fit long labels (engine). js-ch10 shortened its plates to `keys()`/`clone()` with captions saying so; the fix round can restore the full names and drop those captions.
- Panels 3 and 25 have no phone versions (labels about 12px at 390). Add them to the shared figure-text fix.

## From python ch20 (Sockets and Stamped Forms)
- The cutter/cookie drawings are now copied in py-ch19 and py-ch20 (from py-ch15). Promote them to comic-critters.js.
- The walker card is narrow at 1280px, so long print lines wrap. Consider a wider walker layout in the engine.
- The author briefly created and deleted tools/_tmp_el_py20.js (it reports nothing else in tools/ was touched). Verify tools/ is clean in the review.

## From go ch11 (Beads on a Necklace)
- Go `.cmd` steps (e.g. `go vet`) on the secondary still used the chapter go.mod (go 1.27), so 1.24.7 refused them. capture.py now passes GOFLAGS=-modfile=.go124.mod to Go .cmd sessions that don't `cd` elsewhere. Verified on go-ch99 (vetdemo). Recapture go-ch11 (string_int) in the fix round.
- Parsons exercises with whole Go programs: the import order is ambiguous (the prompts say gofmt order). Engine option: pin header lines (package/imports) in parsons.

## From cpp ch10 (Menus and Pause Buttons)
- Built from a template plus gen.py/build.py in the scratchpad, now archived in src/cpp/ch10-parts/. cpp/ch10.html is canonical.
- `data-same-src` is copied a third time (cpp-ch7, ch9, ch10). Promote it.
- The `#include <menu.h>` panel depends on this machine's ncurses header. Reviewers: keep the explanation accurate.

## From rust ch11 (Gift Boxes and Accordions)
- giftbox is promoted to comic-critters.js. Remove the copy from rs-ch11.js in the fix round.
- The map road programs use #[allow(dead_code)] (disclosed in the footer); the "field never read" warnings are kept on purpose and explained.

## From python ch21 / go ch11 (parsons)
- Parsons now skips blank lines and supports `pin`. Go ch8 and ch11 parsons prompts tell readers to use gofmt import order; the fix round can pin those import lines and drop that instruction. py-ch21 stripped blank lines from its parsons programs (harmless now).
- py-ch21's `inspector` (mypy) and `parcel` characters are candidates for comic-critters.js if later Python chapters reuse them.

## From go ch12 (Coat Checks, Character Sheets)
- FRAGILE: panel 16 shows map-order randomness by relying on Go 1.27.3 and 1.24.7 printing different orders for order.go. If a recapture makes them match, the alt terminal errors. Better: capture two runs with different seeds or a loop printing the order several times in one program, so the randomness shows within a single version.

## Choice-answer position bias (found at js ch12)
- 403 choice questions in 58 chapters: the correct answer was option 1 in 190 and option 2 in 159; Go had it first in 64 of 69. The engine now shuffles display order deterministically (seeded by exercise id; "Neither/Both/None of/All of" options stay last; `keepOrder` opts out). Checked: in the go book the written-first option now shows first in 23 of 69 questions. Reviewers: look for "why" text that refers to option positions.

## From cpp ch11 / js ch12 / rust ch12
- cpp-ch11: `data-same-src` copied a fourth time. Promote it.
- js-ch12's error-anatomy reader (real stderr, parity, folds Node-internal lines) is a candidate engine widget alongside cpp-ch11's `[data-report]` ASan reader. Consider one shared "annotated real output" widget.
- comic-memory.js now allows slots without `cap` (a &str or slice view draws ptr + len only). rs-ch12 used the tracer instead; fine.
- rs-ch12 reports that `.fig text` CSS overrides a font-size set on a parent `<g>`, so rust ch9's figure text may be smaller than intended. Check in review.

## From cpp ch12 (The Bank Vault)
- `data-same-src` is promoted to the engine. Remove the copies from cpp-ch7, ch9, ch10, ch11 and ch12 extensions.
- capture.py's versionDifferences now ignores displayed-command-only differences. Recaptured C++ chapters will list only real differences; update the footers that say "every program is listed because the command differs" (cpp ch8–ch12).
- Tally the teller (cpp-ch12.js): promote her to comic-critters.js if later C++ chapters reuse her.

## From python ch22 (Alarms and Key Cards)
- Its author fetched only the Tutorial's contents page; PEP and docs claims came from its own knowledge plus the research map. The review must check the version-specific claims: PEP 758 (unbracketed `except A, B`), PEP 765 (SyntaxWarning for return/break in finally), and PEP 654/678 behaviour. The captures back the runtime behaviour; the prose attributions need checking.

## From go ch13 (Addresses and Verbs)
- DONE (engine): `[data-mem]` now supports `ref: "frame/name"` stack-to-stack arrows. go ch13 used the tracer slip model, which is fine; later pointer chapters can use the stepper.

## From javascript ch13 (Plan It, Pack It)
- The JS book uses Python's Proofreader and Bouncer for SyntaxError and ReferenceError (following the plan). AUTHORING calls them Python characters. Decide in review whether they're shared cross-book characters (update AUTHORING) or need JS-specific ones.
- js-ch11 and js-ch13 share a "capture filler" script. Candidate engine helper (fill text from a captured run, with a parity badge).

## From rust ch13 (Lockers and Parcels)
- `.fig text { font... }` in 12 chapter CSS files (copied between chapters) overrides SVG font attributes. rust ch9 and ch11 figures are probably affected. The review should screenshot-check every figure using attribute sizes; the house rule is now in AUTHORING.
- `parcel` (Result: ok/err) lives in rs-ch13.js. Python ch17 and ch21 define a different `parcel` in their extensions. If promoting, rename (e.g. `resultbox`) to avoid two meanings for one name.
- Metaphor clash: rust ch13 uses a "conveyor belt" for `?` error propagation, and rust ch20's title uses conveyor belts for iterators. The review should make sure the two pictures stay distinct, or rename one.
- loop_map.rs has a `.nondet` file, but its two primary runs matched, so it isn't flagged; it isn't an answer key.

## From cpp ch14 (Coat Checks and Gadgets)
- Engine: code ligatures are now off for every code/pre/samp/kbd, .anatomy and SVG text (comic.css). cpp-ch14's own `!important` workaround can go.
- Plan mismatches confirmed by real runs: empty max_element under sanitizers gives UBSan "reference binding to null pointer", not an ASan SEGV; there is no -Wpedantic in the default flags. Keep the C++ plans/notebooks consistent with this.
- Mo, the coat-check attendant (cpp-ch14.js), is a promotion candidate if reused.

## From cpp ch13 (Sticky Notes, Library Cards)
- First real use of `[data-mem]` stack refs. The ref cells are now wider so the "ref" corner label doesn't overlap the value (engine).
- capture.py has no way to set ASAN_OPTIONS per program (e.g. detect_stack_use_after_return=1). Consider a `.asanopts` sidecar; cpp-ch13 explains the gap in its notebook instead.
- cpp-ch13.js copies cpp-ch11's `[data-report]` sanitizer-report reader. Promote it (with js-ch12's error reader) into one engine "annotated real output" widget.
- Mabel (the Rust guide) makes a cameo in the C++ book, as the plan suggested. The books are meant to stand alone, so the review should check the cameo doesn't assume the reader knows her.

## From javascript ch14 (Shops and Referees)
- Declined engine request: built-in hidden normalisation of test durations/PIDs in capture.py. The visible `sed`/`unshare` wrappers js-ch14 used are the honest pattern; it's now a house rule in AUTHORING. The fix round should check rust ch1's timing normalisation is disclosed the same way (already listed).
- Juno the referee (`umpire`) and `shopfront` in js-ch14.js are promotion candidates if reused.

## From python ch23 / ch24
- `fetch` (ImportError) promoted to comic-critters.js. Remove the copies from py-ch13.js and py-ch23.js.
- py-ch23 makes its terminals wrap long lines and stacks its code pairs; consider making that the engine default for long error messages (watch caret alignment, which js-ch11 found breaks when wrapping).
- uv/Poetry commands (py-ch23) and profiling.sampling (py-ch24) are shown but not run (no internet / sandbox limits), and the pages say so.

## From rust ch14 (Buildings and Inspectors)
- HOUSE-RULE CHECK: test runs are shown as `cargo test -q -- --test-threads=1 --format pretty`, but a hidden wrapper (t.sh) rewrites libtest's "finished in" time to 0.00s. It's disclosed in panel 33 and the footer, but the shown command isn't what produced the text. Fix round: show the normalisation in the command (e.g. `| sed …`), or mark those runs .nondet and stop rewriting. Same check for rust ch1.
- FRAGILE (same pattern as go ch12): panel 39 proves parallel test order using the 1.97.0 run coming out in a different order. Make that a two-run demonstration on one toolchain.
- Inspector (hard hat, PASS/FAIL stamp) in rs-ch14.js: a promotion candidate. Note that python ch21 has an `inspector` (mypy) in its extension, so pick distinct names before promoting either.

## Rust clippy/fmt toolchain bug (found at rust ch15)
- `cargo clippy` / `cargo fmt` in .cmd steps ran through rustup proxies in $CARGO_HOME/bin (cargo checks there before PATH), so the PRIMARY capture actually used stable 1.97. capture.py now sets RUSTUP_TOOLCHAIN per toolchain. Verified on rust-ch97: clippy 0.1.99 / rustfmt 1.10.0 primary, 0.1.97 / 1.9.0 secondary. Recapture every Rust chapter whose .cmd uses clippy/fmt (list below) and update any version text. Plain cargo builds were not affected: rustc resolves via PATH, which the real per-chapter version differences confirm.
- Failing `cargo test` runs aren't repeatable (the test thread id changes), so they need .nondet; rust ch14/ch16 should check this.
- Anatomy: `.anat-keys b { display:block }` breaks inline bold in explanations; use <strong>. Promote to AUTHORING or fix the selector in the engine.
- DONE (engine): the anatomy title rule is now `.anat-keys button > b:first-child`, so inline <b> in explanations stays inline.

## From go ch15 (Libraries and Answer Keys)
- Go modules created in subfolders by `go mod init` (1.27.3) say "go 1.27.3", and their .cmd cds into the folder, so the secondary 1.24.7 refuses them (the GOFLAGS fix skips .cmd sessions that cd). 32 of 39 "differ" only by refusal. Options: give module folders a sibling .go124.mod and teach the session to use it, or document that multi-module sessions are compared on the primary only.
- HOUSE-RULE CHECK: go-ch15's `go test` sed (elapsed time → "…s") and `-count=1` are disclosed in the footer, but "hidden" per its own report. Check the shown command includes them; if not, show them.
- Real message wording differs from the plan ("name bagFee not exported by package shop" vs "undefined: shop.bagFee", which depends on export data). The page explains it.

## From cpp ch15 (Fire Alarms and Scrolls)
- WRONG CROSS-REFERENCE: cpp/ch13.html says "Chapter 15 meets std::optional", but the plan puts optional in ch20. Fix the ch13 text. Check every "next chapter / Chapter N will…" promise against the plans in the review.
- Engine cosmetic: in `[data-mem]` the first slot's type label can touch the "top plate: running now" tag when the type is long. Add a few px of HEAD or truncate the tag.
- capture.py has no per-program scratch folder cleared between runs (the plan assumed one). Consider adding one if more file-IO chapters need guaranteed absent files.
- Ember the Fire Marshal (cpp-ch15.js) is a promotion candidate if reused.

## From python ch25 / js ch16
- DONE (engine): the highlighter no longer colours a keyword used as an attribute (`re.match`, `obj.new`, `x.type`); Rust `.await` stays a keyword.
- py-ch25 is 55 panels (over the 50 guide); a reviewer should check pacing.
- js ch16: `await` in a non-async function inside an ES module gives "Unexpected reserved word", unlike CommonJS. The page shows both; the JS plans and notes should match.

## browser_capture.js fixes (found at js ch15)
- Console lines are now written as they happen, so the "merged" rerun shows the real interleaving (before, all log lines came first and all error lines after). "Uncaught Uncaught" for <script src> errors is fixed (Playwright puts "Uncaught" in e.name). Verified on javascript-ch97 (order.html, inline.html).
- Fix round: recapture every JS chapter with .html programs (js ch1–ch16 as applicable). Update js-ch15 panel 13 and its footer, which explain the old wrong order, and the spot_head workaround (it can go back to <script src>).
- Still open: a native "show" sidecar for .html programs (js-ch15 used a .cmd to show js/*.js sources); JS inside .html is highlighted as markup only (the highlighter treats the whole file as HTML).

## From cpp ch16 (The Flat-Pack Finale)
- `marshal` (Ember) promoted to comic-critters.js. Remove the copies from cpp-ch15.js and cpp-ch16.js.
- spot_next.cpp: the sanitizer stops the program before std::cout flushes, so captured stdout is empty (explained in the exercise). C++ notebooks could note "use std::endl/flush or stderr before a crash".
- Panel 24's flag tiles omit the two extra sanitizer flags (the caption says so).

## Go module sessions on the secondary (found at go ch15/ch16)
- capture.py now lowers every go.mod under the chapter folder that asks for > go 1.24 to "go 1.24" (dropping toolchain lines) ONLY while the secondary Go .cmd run lasts, then restores it. A go.mod.capture-bak backup is restored at the next capture if a run was killed. Verified on go-ch96 (a module in a subfolder, a session that cds): 1.24.7 ran it identically and go.mod was restored.
- Fix round: recapture go ch15 and ch16 (and any other Go chapter with module sessions) and update their version notes, which currently explain that 1.24.7 refuses every module.

## From rust ch16 (The Search Robot)
- The Inspector is now copied into rs-ch14.js and rs-ch16.js. Promote it, but python ch21's mypy `inspector` is a different drawing with the same name. Rename one (e.g. rust `siteinspector`) when promoting, and update the pages.
- HOUSE-RULE CHECK: like ch14, test runs rewrite libtest's closing time to 0.00s via a wrapper (disclosed). Same fix-round decision as rust ch14.
- No env/data-file sidecars in capture.py: rs-ch16 used .cmd + go.sh (disclosed). Consider an `.env` sidecar if more chapters need env vars.
- The "hall of catchphrases" quotes ch1–15 recaps. Re-check it if any earlier recap changes in the fix round.

## From rust ch17 (Cookie Cutters and Badges)
- NAME CLASH: rs-ch17.js defines `cutter` (dashed generic / solid stamped), while py-ch15/19/20 define a different `cutter` drawing. When promoting either to comic-critters.js, give them distinct names.
- The nm proof unsets CARGO_TARGET_DIR via a hidden wrapper (disclosed). Fine under the house rule, since output isn't rewritten.

## From go ch17 (Backpacks and Buffets)
- The first chapter captured with module lowering: new127 ran on 1.24.7 (only `cat go.mod` differs, showing the lowered line). Note for the review: a session that prints go.mod shows "go 1.24" in the secondary run. That's expected and disclosed.
- The panel 30 stack overflow is described, not captured (per the plan); it was run once to quote its lines.

## From python ch26 (Preflight Checklist)
- DONE (engine): Python triple-quoted strings now highlight as one string across lines in whole-block code. Limitation: widgets that highlight line by line (walker, spot, tracer code lists) still colour the middle lines of a multi-line docstring as code. A stateful line highlighter would fix that.
- coverage.py, Hypothesis and pre-commit aren't installed, so they're described; coverage is shown via stdlib `trace`. The page says so.
- py-ch14's notebook says `assets/ext/py-ch14.js` defines `smokealarm`; check that this claim is true in the review.

## From rust ch18 (The Universal Adapter Kit)
- DONE (engine): `.checklist li` is no longer a two-column grid (each inline piece used to become a grid cell). Items with mixed inline content now lay out correctly; checked cpp ch10 at 390. Chapters that added `<span>` wrappers or local overrides (go ch16, rust ch16, rust ch18, ...) can drop them.
- rs-ch18: the effective-rust link came from memory and was not checked; verify the URL in review. The panel 11 table wraps code words at 390, and the panel 32 labels are small.

## From go ch18 (Measuring Cups and Sandwiches)
- Research map error: research/go.md cites "100M #17" for named types, but 100 Go Mistakes #17 is octal literals. Fix the citation in research/go.md.
- go-ch10, ch16 and ch18 each copy "the Go book's shared helper block" CSS. Consider an assets/go-book.css (or engine) for it.

## From cpp ch17 (Head Chefs and Examiners)
- Exercise mix is skewed (15 choice, 3 predict, 1 parsons) because CMake has few ordered/predictable outputs. The review should judge whether more predict/trace on build output is possible.
- Its capture takes about 6 minutes (CMake configures). Budget for it in the fix round's recaptures.
- planner (Cam), headchef and examiner (Dot) are in cpp-ch17.js; promote them if reused.

## From js ch18 (Parents and Cookie Cutters)
- DONE (engine): the tracer text version no longer recurses forever on reference cycles (a constructor and its prototype; self-containing lists). It prints {...} or [...] as Python does. Verified with a cyclic test tracer. js-ch18 drew `constructor` as text "↩ Actor (F1)" to avoid the crash; the fix round can switch it to a real arrow.
- Wishes: a dashed "prototype link" arrow style in the tracer; an option to order objects as a chain instead of first appearance.
- js-ch18 cites some MDN pages from the author's own knowledge (not fetched); verify the URLs in review.

## From python ch27 (Waiters and Open Doors), the last Python chapter
- The book ending lists all 27 chapters with a catchphrase each. The review must verify each catchphrase against that chapter's real recap, and that the cast-of-guides cameo doesn't assume knowledge of the other books.
- Three comment-only .py files exist just to name terminal runs (disclosed).
- Free-threaded python3.15t is described, not run (not installed).

## From go ch19 / cpp ch18
- go ch19: errors.AsType and vet's pointer-wrap check are new since 1.24, shown with real runs on both versions.
- cpp ch18: some tool sessions copy the program into wash/ or tidy/ before the shown command (disclosed in the footer). Inspector Pike (cpp-ch18.js) is a third "inspector" (with py-ch21 and rust ch14/16), so choose distinct names when promoting.
- Engine: build.py now escapes U+FFFD in shipped copies (� in JS/JSON, &#xFFFD; in HTML) because the artifact host rejects the raw character; py ch25 needs it. Its dist/local copy was re-checked and passes. build.py's ref check now ignores escaped code (&lt;script src=...&gt;), which js ch15 needed.

## From js ch19 (Switches and Invisible Ink)
- Its "Chapter 18" references (getters in classes, Object.create(null), Object.hasOwn, #private) were written from the plan while ch18 was being written. Check them against the finished js ch18.
- It carries a BigInt notebook page that js ch13 promised. Check that the promise and the delivery match.

## Terminal wrapping consistency (cpp ch16/18/19, js ch11, py ch23/25)
- Chapters disagree on long terminal lines at phone width. Some wrap them, which breaks compiler caret (^) alignment: cpp ch16, ch19, py ch23, ch25. Others keep columns and scroll sideways so the carets stay aligned: cpp ch18, js ch11. The review should pick one engine-level rule: scroll terminals that contain caret/diagnostic lines, and allow wrapping elsewhere. Then remove the per-chapter overrides.

## From rust ch20 (Backpacks and Conveyor Belts)
- NAME CLASH: rs-ch20.js `backpack` (notes/pencil/items/empty) vs js-ch17.js `backpack` (variable tags, "NO OWNER"). Rename one before promoting either. The conveyor-belt picture also appears in rust ch13 (for `?`); check that the two images stay distinct.
- rs-ch20 cites TRPL 13.4 from memory (not fetched); verify in review.

## From cpp ch20 (Gift Boxes, Clock Faces)
- The cpp-ch20 `giftbox`-themed chapter: if it draws a gift box for std::optional, check it against the shared Rust `giftbox` critter (reuse it, or keep a deliberately different look).
- It says "Chapter 26 explains" the `overloaded` helper. Verify against the plan when cpp ch26 lands.

## From js ch20 (Coat Checks and Dispensers)
- SOURCING: the author read javascript.info "through a mirror". If WebFetch declined the original, using a mirror goes around that restriction. BRIEF now says not to. The review should re-source those claims from MDN/spec or the original site.
- It found web.dev wrong (a non-object WeakMap key is a TypeError, not a SyntaxError) and footnotes it from the real run.

## From rust ch21 (Shape Sorters and Customs)
- `parcel` (Rust Result) promoted to comic-critters.js. Python ch17 and ch21 keep their own different `parcel` in their extensions, which override on their pages (rust ch13 and python ch17 re-checked). Remove the copies from rs-ch13.js and rs-ch21.js in the fix round. Consider renaming Python's to avoid one name with two meanings.
- Real finding: without the turbofish the mixed-error program gives E0271, not E0277 (shown in the notebook). The edition-2024 binding-mode errors are described, not captured.

## From cpp ch21 (New Words, Spare Keys)
- ATTRIBUTE CLASH: `[data-report]` means different widgets in different extensions: the ASan report reader (cpp-ch11, ch13, ch21), go test -v stepping (go-ch15), and also cpp-ch2 and rs-ch14 (check what those do). They can't be promoted under one name. Rename into distinct engine widgets (e.g. `data-asan`, `data-testrun`) and update the pages in the fix round.
- `.picscroll` / `.pic-wide` promoted to comic-widgets.css (phone sideways scroll for wide drawings). This is a candidate answer to the recurring "tiny figure text on phones" item, alongside narrow redraws.
- cpp-ch21 panel 1 shows g++'s full 368-line error on purpose (read the first error, then stop). Consider an engine fold for C++ candidate notes.

## From go ch22 (Customs and Clocks)
- The reported "struct tags only partly highlighted" could not be reproduced: highlight() colours `json:"name,omitempty"` as one raw string in both whole-block and single-line use. The review should check the specific go-ch22 panel; it may be a widget that highlights a fragment without the leading backquote.
- `officer` (Officer Ines, go-ch22.js) vs `customs` (rs-ch21.js): distinct names, but both are customs officers. Consider a single shared character if promoted.
- uuid and encoding/json/v2 are new in Go 1.27 and fail on 1.24 (real runs shown). 100 Go Mistakes #75/#77 are cited by title only.

## From go ch21 (Branches and Plumbing)
- capture.py's secondary module lowering now skips go.mod files asking for MORE than the primary's Go (e.g. a go 1.28 toolchain-gate demo), so the comparison run refuses those too. go ch21's `toolchain` program was captured before this change (its 1.24.7 run lost the gate); recapture it and update its footer/lab note in the fix round.
- go ch21 built a real offline file:// GOPROXY (.build_proxy.py) so go get/list/retract/v2/install/work/vendor are all real runs. It's reusable for any later Go module chapter.

## From js ch22 (Stencils and Emoji)
- UNVERIFIED CLAIM on the page: "RegExp.escape should exist in Node 24" (inferred from the V8 version; only Node 22 and 26 were run). Reword as uncertain, or drop it, in the fix round.
- NAME CLASH: js-ch22 `stencil` vs py-ch25 `stencil` (regex stencils in both). Unify or rename.
- Tooling hazard: the author's file writes turned `\uXXXX` escapes in program files into literal characters; 4 were found and repaired. Reviewers should grep JS/Python programs that are meant to contain escape sequences.

## From rust ch22 (Drawers and Typesetters)
- unicode-segmentation is described but not run ("needs network"). crates.io IS reachable from the capture machine, and unicode-segmentation 1.13.3 is now pre-fetched into the cargo cache. The fix round can add a `.deps` program (`unicode-segmentation = "=1.13.3"`) and capture a real grapheme run.

## From cpp ch23 (Shared Custody, Old Mailboxes)
- DONE (engine): tracer objects accept `"leaked": true` (drawn faded and dashed even when inside a cycle). cpp-ch23 labelled its cycle "LEAKED" by hand; it can switch to the flag in the fix round.
- A three-node leak went unreported by LeakSanitizer (probably a stale pointer left on the stack), so the chapter uses a reliable two-node version. Worth a notebook sentence: "LeakSanitizer can miss leaks still referenced from stale stack slots".

## From rust ch23 (Keys, Counters and Remotes)
- A source conflict was resolved correctly: Comprehensive Rust's claim that associated types break dyn compatibility conflicts with the E0038 error index, so it wasn't used. The review could note it.
- rust ch23's Rc cycles could use the new tracer `leaked` flag.

## From js ch24 / go ch24
- `pager` promoted to comic-critters.js (from js-ch16). js-ch24's `pager24` copy can be switched to `pager` in the fix round. `using` added to JS highlighter keywords.
- go ch24: wg.Go (Go 1.25+) fails on 1.24 (real run shown); 8 goroutine programs are .nondet. `kitchenhand` and `mailcarrier` are new distinct names (grep-checked).

## From go ch23 (The Test Lab)
- Engine cosmetic, seen in several chapters: the map widget's moving token covers the right end of each place box. Shift the token or give boxes right padding.
- Real differences on 1.24: synctest.Test fails, the panic text says "[recovered]" vs "[recovered, repanicked]", and cover.out columns differ. Visible sed normalisation follows the house rule.

## From cpp ch24 (Remotes and Packed Lunches)
- CONTRADICTION: cpp ch24 captured stack-use-after-return reports WITHOUT ASAN_OPTIONS=detect_stack_use_after_return=1, but the cpp ch13 notebook says g++ 13 needs that option and that the case couldn't be captured. Check which is true here (it may depend on how the dangling address is used) and fix ch13's notebook, or both.

## From rust ch24 (Cities and Pyramids)
- The Rust Inspector is promoted to comic-critters.js as `inspector`. py-ch21 (mypy) and cpp-ch18 (Pike) define different `inspector` drawings in their extensions, which override on their pages (all three pages re-checked). Remove the copies in rs-ch14/16/24 in the fix round; consider renaming the Python and C++ ones.
- PLAN CORRECTION confirmed by a real run: a doc test on a private item does NOT silently skip; it fails with E0603 on 1.99.1. Fix the rust plan text and any other chapter that repeats the old claim.
- Real difference: glob_clash is the ambiguous_glob_imports lint on 1.97 but hard error E0659 on 1.99.1.
- Exercise mix skews to choice (15 of 31). Review.

## From go ch25 (Keys and Conveyor Belts)
- DONE (engine): widgets now find their own parity badge via `.controls .parity`, falling back to the first `.parity` that isn't a `[data-same-src]` badge. A same-source badge inside a tracer panel no longer swallows the tracer's verdict. Parity counts on five sample chapters are unchanged.
- race_count.go adds runtime.Gosched() so the lost update shows on this 2-core machine (disclosed); the plain version is shown under -race.
- golang.org/x/sync v0.24.0 is now in the shared module cache.
- go-ch25 copies ch24's `kitchenhand` (guarded). Promote it with `mailcarrier` if more chapters use them.

## From js ch25 (The Chef's Two Spikes)
- Real finding: at the top level of an ES module, promise callbacks run before process.nextTick; in CommonJS, nextTick runs first (both Node versions). Check that js ch16's event-loop explanation doesn't contradict it.
- The puzzle uses a deliberate 5 ms busy wait to make setTimeout(0) beat setImmediate in the main script (disclosed). The timers-near-startup swap is documented in its notebook as the author's guess (stale loop clock). Mark it as a guess in review.

## From rust ch26 (The Busy Kitchen)
- capture.py's `merged` comes from a second run, so spawned-thread ids differ between merged (4) and stderr (56–62). Documented in AUTHORING. A fix would capture stdout/stderr/merged from one run (e.g. a tagging pipe); consider it in the fix round.
- The cook-lanes widget derives "possible" runs from captured lines and checks that the "impossible" run really breaks per-thread order. A good pattern for showing nondeterminism honestly.

## From go ch26 (Walkie-Talkies and Waiters)
- `kitchenhand` promoted to comic-critters.js (was copied in go-ch24/25/26). Remove the copies in the fix round.
- The ListenAndServe server is shown only in code and the lab (a fixed port can't be captured); all HTTP runs use httptest.

## Disk full incident (at cpp ch26)
- The shared disk filled to 100%, mainly from per-chapter cargo target caches (14 GB in /home/you/.target) and scratch screenshots (5.8 GB). Freed: target caches of finished Rust chapters (rebuildable; recaptures will rebuild them) and scratch folders of 119 finished chapters. That leaves 16 GB free.
- cpp ch26's last CSS tweak (widening the concepts table on phones) was checked without screenshots while the disk was full. Re-screenshot cpp/ch26 at 390 in review.
- Fix round: before mass recaptures, clear /home/you/.target per chapter after capturing it, so the cache doesn't refill the disk.

## From js ch26 (Catalogs and Workbenches)
- The final small fixes were not re-screenshotted; re-check js/ch26 at 1280/390 in review.
- The npm terminals use a local pretend registry with made-up packages (confetti, drumroll), plus a hidden setup line shown as `cd party` (disclosed). Real npm 11.20.0, tsc 6.0.3, esbuild 0.28.2.
- Chromium blocks module scripts from file://, so the import-map example shows that real error. Note: the published preview is served over https, where it would work. Consider whether the page should say so.

## From rust ch27 (One Waiter, Many Stamps)
- DECISION (kept): macro expansions are shown with `RUSTC_BOOTSTRAP=1 cargo rustc -q -- -Zunpretty=expanded` on stable, labelled on the page and in the lab as a peek-only developer switch, with `cargo expand` named as the usual tool. It's real output and disclosed. The review may revisit this if the owner prefers otherwise.
- Tokio is pinned at 1.54.1. The "64 bytes per task" figure is deliberately not cited (source not fetched).

## From go ch27 (Docks and Pit Crews), and go.mod safety
- During the disk-full event a chapter's root go.mod was emptied, most likely by capture.py's lowering: the backup write failed, then the restore copied an empty backup. capture.py now writes go.mod and its backup atomically (temp file + rename + read-back) and refuses to restore from a broken backup. go-ch96 retested and restored correctly. A scan found no other empty go.mod or leftover backups.
- go ch27 pins staticcheck/govulncheck/goimports/golangci-lint via `go get -tool`; govulncheck uses a local .vulndb copy (21 MB, disclosed). Delve is not installed (notebook only).

## From cpp ch27 (Signposts and Sticky Printers)
- VERIFY (current events): panel 10 says the C++26 ISO ballot was "disapproved", with contracts as the main objection, so C++23 is current. This came from the research map without re-fetching. The content reviewer must web-search the current status and fix the panel if it's outdated.
- clang 18 has no std::expected (real runs shown). Those programs are marked g++ only.
- Engine: the trace table already has `display:block; overflow-x:auto` (comic-widgets.css:178), but the author still needed shrunk cells, so check what defeats it (a parent with min-width?). DONE: code inside title-font headings now uses the code font (comic.css), so Bangers no longer uppercases `good()`.

## From go ch28 (Stopwatches and Code Review), the last Go chapter
- Its ending recaps all 28 Go chapters. Verify each recap line against that chapter's real recap. ch27 now exists; check the prev link.
- Real difference: Go 1.26+ keeps small slices on the stack (cap starts at 4, 9 growth trips instead of 12). It matches go ch9's starter-array finding; check the two chapters explain it consistently.

## From js ch27 (Simulators and Robot Arms)
- `umpire` (Juno) promoted to comic-critters.js. js-ch27's `juno27` redraw can switch to it in the fix round.
- capture.py: session `.cmd` runs record no `merged` stream, so a step printing to both streams can't show the true order. Engine work for the fix round: rerun the session with `2>&1` and split the output on step markers.
- `.term.wrap` is defined in several chapter CSS files. Promote it with the terminal-wrapping rule decision (see "Terminal wrapping consistency").
- readline/promises `rl.question()` loses the second piped answer (exit 13). js-ch27 uses an async line iterator and explains why.

## From rust ch28 (Handles, Race Cars, Hardware)
- `trailguide` promoted to comic-critters.js (from rs-ch15). Remove the guarded copy in rs-ch28.js.
- Clippy's redundant_clone appears only with -W (shown as such). Two programs show the two-rand-versions E0308.

## From js ch28 (Theater and Mail)
- js ch28 runs its 42 browser pages through a chapter-local proxy server (stage/theater.cjs) playing pretend sites over http, so CORS, http modules, reload-surviving storage and new tabs are real. It's disclosed, and the helper source is in the notebook. Candidate engine version: an http mode for tools/browser_capture.js, which would also fix js ch15/ch26's file:// module limits.
- It made all terminals wrap (fine for JS, which has no caret lines). Fold this into the terminal-wrapping rule decision.

## From js ch29 (Rush Hour Library), the last JS chapter
- Its whole-book recap card for ch28 has no catchphrase (ch28 landed during its build). Fill it from js ch28's real recap (a one-line edit). Verify all 29 recap cards against the chapters.
- coatcheck/guestlist are copied from js-ch20.js. Promote them if the fix round consolidates JS critters.

## From rust ch29 (Open the Restaurant), the last Rust chapter
- linecook (rs-ch26) and asyncwaiter (rs-ch27) are copied unchanged into rs-ch29. Promote both to comic-critters.js in the fix round.
- The 29 recap cards quote each chapter's catchphrases; verify against the real recaps.

## From cpp ch29 (Many Cooks, One Stopwatch), the last C++ chapter
- SOURCING: cppreference and the Core Guidelines were fetched through third-party mirrors (fi.muni.cz, luncliff.github.io). Re-verify those citations against the original sites in review.
- Its book-wall badge for ch28 uses the author's own sentence (ch28 landed during its build). Replace it with ch28's real catchphrase.
- TSan was taken as approved because capture.py supports `.tsan`. The race is shown only as a TSan report, never as a total.

## From the review swarm (cross-cutting, for the fix round)
- PARSONS ORDER: the engine accepts only the exact source order, so lines that could go in either order get marked wrong (py ch7 b3, ch8 boss3). Fix in engine: optional `data-pin` / equivalence groups, or pin those lines in the chapters. Check every parsons exercise in all books.
- PY ch1–3 still use the old topbar ("PIP & PYTHON / a comic course", chapters 1–10). Move them to the §7 nav ("Ch N of 27", Contents link).
- CAST.md describes the Proofreader as reading one line at a time. ch1 and ch9 correctly say it checks the whole file first, so fix CAST.md.
- CHOICE LENGTH BIAS: the correct option is often clearly the longest (py ch18 3 of 4, ch16 3 of 6). Audit all books with a script and rebalance the option lengths.
- LINE-NUMBER DRIFT: several "Line N" references are off by one (py ch17, ch18). After the fixes, cross-check every "Line N" in prose against the program source with a script, in all books.
- PY ch10 still presents itself as the end of the book ("THE LAST ONE", "THE END OF THE PYTHON BOOK", next → bookshelf, farewell in P54–55). Rewrite it as a mid-book chapter with a teaser for ch11 and the §7 nav with `data-book="python"`. Make the cast consistent: Jangles = KeyError, Taster = ValueError, as in ch11 and ch12.
- VERSION DIFFS VS NONDET: capture.py's versionDifferences can list `.nondet` programs (pytest timings), so the list changes with every recapture (py ch14 notebook). Fix in capture.py: leave `.nondet` programs out of versionDifferences, or record them separately. Pages must not name files from a timing-dependent list.
- NONDET LABELS: panels that show `.nondet` output must each carry "one possible run" (py ch14 has about 10 unlabelled pytest panels). Script-audit every book.
- CRITTER COPIES: py ch13 and ch15 don't load comic-critters.js, and their extensions redraw Jigsaw, Pockets, Sneak and others. Merge them into the engine's critters or load the shared file.
- PY ch10 "do not rewrite" (plan) was an instruction to chapter authors. The integration round may make the minimal change: retitle the cover kicker, turn P53–55 into a "story so far" + ch11 teaser, change the closing strip, point next → ch11.html, and use the §7 nav. Keep everything else.
- gen_index.py: (a) "27 of 27 chapters are ready; the rest are being written" — drop the second clause when the book is complete; (b) strip the "Chapter N of Pip & Python…" opening from blurbs, not just "comic course: ".
- PY book: teach or remove the walrus `:=` (used in ch27 and credited to ch16). Fix `perf_counter` → ch18 in ch27; ch22 generators → ch16; ch21 type checker in CI (ch26 runs ruff + pytest only); ch22 teaser ShopError never paid off in ch23; ch21 "int box" clashes with "a tag, not a box"; "Inspector" means mypy in ch21 but ruff in ch26; ch27 recap's ch7 catchphrase is ch8's.
- PARSONS ORDER (update): the engine already supports `"pin": [n…]`. Most fixes are chapter-level: pin the `use` / package / import lines (rust ch6 has 3 parsons). Look at equivalence groups only for genuinely swappable body lines.
- FILL BLANKS ARE INDEPENDENT: each blank accepts its alternatives on its own, so mixed combinations that don't compile get accepted (rust ch3 ex-as-fill: `as f32` + `as f64` → E0308). Also, keys reject equivalent formats that give the same output (rust ch3 ex-table `{:4}` / `{:6}`). Engine option: `"sets": [[…],[…]]` for blank combinations, chosen as whole tuples. Audit fills in all books for alternatives that depend on each other.
- CROSS-BOOK CLAIM: rust ch1 P5 says Python "reads line by line every time". That is wrong, and it contradicts the Python book (the whole file is compiled first). Check every book for statements about other languages.
- INVISIBLE CHARACTERS: py ch25 pred_nfc.py, nfc_nfd.py, char_names.py, casefold_norm.py and fill_same.py hold literal combining characters, so the code can't show why NFC matters. Rewrite them with `́` / `̈` escapes and recapture. Script-scan all books' shown programs for combining marks or zero-width characters that aren't escaped.
- CROSS-REF DRIFT IS SYSTEMIC: "Chapter N teaches X" is wrong in many places (py ch12, 13, 22, 24, 27 so far). For each book, have the fix agent grep every "Chapter N" mention and check it against the plan's topic list plus the target chapter's text. py ch13 also says "Chapter 23 builds a uv.lock", but ch23 only lists `uv lock`.
- PARSONS ORDER is common (py ch19, 20, 21, 23, 26 so far: swappable methods, independent statements). Pins alone can't express "method A and method B in either order". Engine option: `"alts": [[order…], …]` of extra accepted orders, or `"swap": [[i, j], …]` groups. Fix agents should RUN each alternative order to prove its output before adding it. Caution: py ch21 b3m's "either order" explanation is itself WRONG (the `["hi"]` / `["hi", *names]` cases can't swap), so fix the explanation and don't add that alt.
- SETUP DISCLOSURE: go ch1 P14 (`env -i PATH=…` hides Go) and P22 (a silent `go mod init` in a rebuilt folder) aren't disclosed, and the footer says "run one after another". Add "How this run was really made" notes as ch2 does. Script-audit every `.cmd` with hidden setup steps across the books and check that each one has an on-page disclosure.
- UNCAPTURED ERROR CLAIMS: explanations that name an error code/message which wasn't captured can be wrong (rust ch16 ex-clone says E0507, but the real error for a slice is E0508). Fix agents: every error code named in prose must appear in that chapter's data, or be captured as a new program.
- COMPILER-SUGGESTED FIXES: rust ch18 P36 says "the fix is in the last help", but that help itself fails (E0308). Never endorse a compiler suggestion without a captured run of the fixed program.
- LEFT/RIGHT IN SINGLE-COLUMN LAYOUTS: pages say "Left:" / "Right:" where the two-up layout is a single column at every width (py ch17 .ch17-duo, rust ch26/27 .runs2). Script-grep "left"/"right" near two-up layouts in all books and refer to card headings instead. Better: add an engine two-up class that really goes side by side at ≥900px.
- TERM ERROR COLOURING VS NONDET THREAD IDS: comic.js 247–249 colours a merged line red only when the exact text is in stderr. With per-run thread ids (rust ch26), the stderr text and the merged text differ, so the panic isn't coloured. Fix: capture merged/stdout/stderr from ONE run (session `merged` item), or normalise digits when matching.
- RUST E0412: no longer emitted on 1.99.1 or 1.97.0 (merged into E0425). Grep the whole Rust book for E0412 and keep it only as a history note (as ch17 does).
- rust ch28 P19 (high): `let _ = data.lock().unwrap();` does NOT compile (deny-by-default lint "non-binding let on a synchronization lock"). Capture it as a program and rewrite the panel around the real error.
- TRUNCATED .cmd RUNS: a .cmd that isn't a session stops after its first failing step (capture.py ~L390), so later steps never run, yet pages describe them (rust ch24 bins.cmd, town_weekend.cmd). Audit script: for every data file, find .cmd entries whose recorded steps < the steps in the .cmd file. Fix by marking them "session": true and recapturing. Consider making capture.py record a "skipped steps" marker so the checker can flag it.
- rust ch24 P31 (high): any `cargo test <filter>` skips doc tests entirely on 1.99.1. P35's flaky.rs Barrier hangs when run alone or with --test-threads=1, so rewrite the advice around the real behaviour, or change the program.
- LAB INSTRUCTIONS UNTESTED: "try this yourself" steps can fail to compile (rust ch21 lab step 1, rust ch23 leak recipe, rust ch6 `echo 50 |`). Fix agents: every lab instruction that changes code should have its result captured, or at least be run in scratch, before it ships.
- GO SLICE GROWTH VERSION CLAIM: go ch9 P19 and notebook say cap-4 starts "since Go 1.26", but /usr/local/go1.25.1 already gives 4. go ch28 P9 says "In chapter 9 it started at 1!", which contradicts ch9 (it shows 4 on 1.27.3). Re-check with real runs on 1.24, 1.25 and 1.26 before rewording.
- GO .cmd (not session) on the secondary: go ch11 string_int.cmd is still refused ("go.mod requires go >= 1.27") after the 11-08 recapture. capture.py L372–376 sets GOFLAGS -modfile only on one path; check that non-session .cmd steps get `-modfile` or GOFLAGS. Audit all Go data files for "requires go >=" in alt runs.
- go ch15 test terminals: the hidden sed and `-count=1` still aren't shown (HOUSE RULE). go ch16: shown `go test | sed` relies on a hidden `exit ${PIPESTATUS[0]}`. Show `set -o pipefail` or disclose it on the panel.
- go ch15 P5: "(but have ToUpper)" hint is NOT new in 1.27 (go1.25.1 prints it). Verify with real runs before rewording.
- GO SLICE GROWTH (resolved by evidence, go ch28 review): starting at cap 4 arrived in Go **1.25** (release notes "Faster slices"; go1.25.1 prints cap 4, and `-gcflags=-d=variablemakehash=n` restores 1). The drop of allocs_m from 12 to 9 is the **1.26** escaping-slice change. Fix go ch9 L450, go ch28 P9 / notebook / lab / footer, and the footer's "non-escaping" claim.
- C++26 STATUS: a reviewer found news-aggregator reports (zeli.app) that the C++26 draft failed its ISO ballot in Oct 2026. UNVERIFIED: confirm against a primary source (isocpp.org, herbsutter.com, open-std.org WG21 papers or iso.org) before any page states it. Until then every book should state C++26 status neutrally, dated and sourced (cpp ch1 P20, ch3, ch27).
- cpp ch2 P26–27 + recap: the rule "a file address means the Compiler" is false; the captured linker line has `add_missing.cpp:6:`. Rework the rule (linker lines say "undefined reference" and come from `ld`/collect2).
- HIDDEN `exit ${PIPESTATUS[0]}`: go ch16, ch27, ch28 (and others; count the .cmd files with grep) show `cmd | sed/sort` with a non-zero exit that the shown pipeline wouldn't give. capture.py rule (fix round): if the real step differs from the display beyond whitespace, the page must show it. Simplest honest form: show `set -o pipefail` as its own visible step, or show the PIPESTATUS. Make capture.py fail when real ≠ shown, unless the .cmd has an explicit `"disclose": "…"` text that the checker then requires on the page.
- go ch25 P12 / ch26 P18 (high): `go test` does NOT run copylocks or lostcancel (they're commented out of defaultVetFlags), so the claims are false. Rewrite them, and capture `go test` on a package with both bugs to show it.
- NONDET VALUES QUOTED IN PROSE (high class): go ch24 P9/P10 and ex-sel-m quote specific orders that don't match the captured run, or come from the other toolchain. Rule for the fix round: prose must never state a `.nondet` program's concrete output except as "this run printed X", with X taken from the data at build time (or simply not quoted). Also capture.py: mark nondet from the `.nondet` sidecar ALWAYS, not only when two runs differ (go ch24 has 4 of 8 unflagged).
- HTML ENTITY LOSS: go ch22 notebook says Marshal escapes <, > and & "as <, > and &" (the entities were decoded). Script-grep every page for prose talking about escapes/entities and check the rendered text.
- CPP .cmd WITHOUT A clang++ RECORD: footers in cpp ch4–6 say "every program also ran on clang++", but 11 scripted runs have no secondary record. Either capture.py should run .cmd steps on clang++ too (substituting the compiler), or the footers must say which ran on g++ only. Recapture cpp ch1–7 (captured before the same_but_cmd change), so meta versionDifferences is clean.
- CONTENTS PAGES: regenerated 2026-11-08 15:40 UTC (gen_index.py now strips "…comic course[, …]:" and says "All N chapters are ready" when complete). Re-run gen_index after the fix round, because chapter descriptions may change.
- METAPHOR CLASHES (book reviews): Rust "photocopy" (owned copy vs &str), conveyor belt (? in ch13 vs iterators in ch20; rename ch13's picture), "lid" (mut vs semicolon); Go "slip" (error / pointer / HTTP request), backpack / shelf / block / inspector reused. The fix round picks one meaning per book and rewords the others. Also fix the plans in tools/plans/*.json so they don't reintroduce them.
- GO ch14 recap (high): "exactly those methods" is wrong. Use "at least those methods".
- HIDDEN ENVIRONMENT (high class): capture.py sets environment variables the pages don't show (UBSAN_OPTIONS=print_stacktrace=1, which alone makes the "#0/#1 in main" lines appear in cpp ch13/14; PYTHON_BASIC_REPL; colour switches; ASLR off / isolation). Fix: (1) list every capture env var per language in AUTHORING + a generated "How these runs were made" footer block; (2) where a page teaches output that depends on one (UBSan stack lines), show it in the command (`UBSAN_OPTIONS=print_stacktrace=1 ./a.out`) or recapture without it.
- cpp ch13 notebook: on g++ 13, stack-use-after-return detection is ON by default (=0 turns it off). Drop the `.asanopts` TODO; fix ch13 and ch24 text.
- FILL ALTERNATIVES MUST COMPILE (tool for the fix round): write tools/check_fills.py that, for every fill exercise, substitutes each accepted alternative (and each `sets` tuple) into the program source, runs it with the chapter's toolchain in scratch, and compares the output with the capture. Reject alternatives that fail (cpp ch13/15: names without `std::`; rust ch3 as f32/f64 mix). Same idea for parsons `alts`.
- GO .cmd (not session) on the secondary (update): run_program with the current capture.py runs string_int.cmd fine on go1.24.7 (go run → "Seat A", vet exit 1). The data is simply stale, so a recapture fixes it. No capture.py change is needed.
- C++26 STATUS (update, cpp ch27 review): the draft was finished March 2026 (London), and the ISO vote closed "disapproved" on 23 Oct 2026, with contracts the main objection (Andreas Fertig's blog, fetched 2026-11-08). The committee meets 16 Nov. C++23 is current. Pages: "C++26's draft failed its first ISO vote in October 2026 and is being revised; C++23 is the current standard", dated and sourced. Fix cpp ch1 P20, ch3, ch27 P10 + footer, and ch29 P47.
- cpp ch26 promised by ch19 (if constexpr) and ch20 (overloaded visitor), but covers neither. Add a notebook page to ch26 (with captured programs), or reword ch19/ch20.
- JS "LAST LINE FIRST" (book-wide): js ch5, 10, 11, 15, 22 and 23 teach reading Node errors "last line first", but the last line is the `Node.js vXX` footer, and ch12 lists this as a wrong idea. Change it everywhere to "find the `Name: message` line first".
- "N CAPTURES DIFFER" COUNTS: several footers and version notes give a count that's off by one against meta.versionDifferences (js ch8, js ch11, py ch25, rust ch17 …). Generate these counts at build time from the data (build.py token), or script-check them.
- CAPTURE.PY CHANGED 2026-11-08 (main session):
  (1) the C++ secondary now swaps `g++` → `clang++` in .cmd steps. Before this, 154 of 189 C++ .cmd "clang++" comparisons were really g++ again (cpp ch28 review). EVERY cpp chapter with .cmd files needs a recapture, and its footers must be rechecked ("identical on clang++" claims may change; gcc-only flags may now show real differences).
  (2) The merged-stream rerun is kept only if it has the same lines as the separate streams; otherwise it's dropped (`mergedDropped`). This catches stateful steps like cpp ch17 `cmake --build`.
- SANITIZER LOSES BUFFERED STDOUT: cpp ch18 P20 / ex-predsan and ch17 P19 say lines "printed normally" that never reached the capture, because the program died before flushing stdout. Explain it as ch16 does, or flush (std::endl / unitbuf) in the program and recapture.
- cpp ch16 ex-giant (high): "Ada's 18" should be 20 (decomposed.cpp prints "Ada scored 20").
- C++ METAPHOR: comic-memory.js labels the heap "the coat-check room" in EVERY stack-and-heap picture (all books), but cpp ch14 uses coat check for std::map, and ch13 calls the heap a library. Decide one name per book. The engine label should probably become a per-chapter option (data-heap-label) with a neutral default ("the heap"). Engine change for the integration pass, after the engine refresh lands. Also cpp "sticky note" = pointer (ch13, 19) vs lambda (ch14, 24): rename the lambda picture, and fix the plan's ch14 entry.
- cpp ch1 recap "Read from the bottom up" vs ch2 wrong-idea "fix the error at the bottom": reconcile (compiler errors: fix the FIRST error first; traceback-style readers differ).
- gen_index.py: no longer capitalises code words (std::string, switch…) in contents blurbs (fixed 2026-11-08).
- capture.py: displayed `.args` are now shell-quoted (shlex.quote), so js ch27 argv_peek shows `'Ada Lovelace'`. Recapture js ch27.
- "NO INTERNET" CLAIM: js ch14 and ch26 say this book's computer has no internet, but the npm registry answers. Reword to what was really done (an offline cache / local registry, if that's what the .cmd uses).
- NODE 24 IS INSTALLED at /opt/node24 (v24.22.1): use it to settle "Node 24" claims (it has RegExp.escape, Error.isError, Promise.try, `using`, DisposableStack, but not Temporal).
- PLANS CARRY THE CLASHES: tools/plans/javascript.json (train / Bouncer / sticky note), cpp.json (sticky note = lambda in ch14; Catch2 vs doctest in ch17), rust.json (Python "line by line"; private doc test "silently does not run"; rand 0.9). Integration pass: update the plans to match the fixed books, so the plans stay a true record.
- DONE 2026-11-08 11:10 (main session): removed the old-engine checklist grid copies (`.checklist`, `.checklist li` with a 40px grid, `.checklist li::before`) from 17 chapter stylesheets (cpp-ch2; go-ch1/2/3/5/6; js-ch1/2/4/5; py-ch1; rs-ch1–6). They fought the refreshed engine's absolute badge, so the text was squeezed into 40px. Verified on rust/ch1 at 390 (items 314px wide). Backups in scratchpad/checklist-bak/.
- ENGINE (phones): parsons arrows 40×34, blanks/trace cells 28px, summaries 32px and top-bar links 21px tall are all under the 44px tap target; the hanging-indent wrap breaks inside `{name}` format holes. Engine follow-up in the integration pass.
- DONE 2026-11-08 11:15 (main session), engine (comic-widgets.css, end section): `.panel { grid-template-columns: minmax(0,1fr) }` stops long code tokens widening panels and getting clipped (py ch26 P17); 44px tap targets on touch for .pz, motion toggle, replay, summaries and topbar chapter links. Still open for chapter fix agents: py ch27 P27 table (wrap or stack), ch26 red-on-pink 5.97:1, ch27 `left` transition, chapter `.term` wrap overrides.
- ENGINE PASS 2 (after the visual reviews, before the fix swarm, one engine agent):
  (a) walker on phones: the code column is 12–20 characters wide, so lines wrap inside names (py ch20 P5: 17 lines → 45 rows). Stack the walker (code above screen) at ≤640px, use a 36px gutter, and scroll instead of breaking tokens.
  (b) `table.transcript { min-width: 560px }` hides columns of every text version on phones. Stack the rows at ≤640px.
  (c) `.duo-card .term` uses pre-wrap + anywhere, so tokens split and carets drift. Treat card terminals as `.term.wrap`.
  (d) the tracer "Swipe sideways" hint shows at 1280 for a 12px overflow; give it a threshold.
  (e) critter labels under 12px: the Compiler "rustc" plate (5.6–9.9px), Inspector "TEST", compass "N", signpost 10.4px.
  (f) stepper extensions that grow between steps: the engine could offer a min-height helper (L.reserveHeight).
- CHAPTER TERMINAL OVERRIDES: several chapter stylesheets force `pre-wrap; overflow-wrap:anywhere` on every terminal (py-ch23.css:73, py-ch25.css:27, py-ch27, …), which breaks carets. Fix agents: delete them and use `class="term wrap"` where a terminal's key line is off-screen at 390. Script lead for the fix round: grep assets/ext for `.term` rules with `overflow-wrap: anywhere`.
- ENGINE PASS 2, more items: (g) promote a general `.pair` (two-up grid, children min-width:0) to the engine; go ch6 P22 clips 77px because it has no `.pair` rule, and ch7–10 each copy one; (h) L.runner narration and controls: reserve the tallest step's height so buttons don't move (ch7 P18 moves 147px); (i) the panic/detective lens on phones puts the clue ~1000px above "Next clue", so scroll the clue into view; (j) maps should open scrolled to the active state on phones.
- FOOTERS ON MOTION: 125 page footers describe reduced motion the old way (everything off). Since the refresh, reduced motion keeps 150ms fades. Script-replace the sentence across chapters in the fix round (one agreed wording).
- GO: all 28 go-chN.css files carry `.term { white-space: pre-wrap; overflow-wrap: anywhere; }`. Delete them in the fix round and use `class="term wrap"`.
- DONE 2026-11-08 11:30 (main session): engine base `.pair` rule (grid, minmax(0,1fr), children min-width:0). Measured: rust ch7 at 390 and 1280 and go ch6 at 390 have 0 panels with clipped content (were 326px / 77px clipped).
- ENGINE PASS 2, more: (k) a generic "current line" rule: any `li.now [class^="tok-"]` → ink (go ch24/25 steppers have blue on yellow at 6.49:1); (l) "Step 1 of 7" counter wraps (go ch21 P32); (m) picscroll swipe hint missing where chapters roll their own.
- go ch21 notebook (ch21.html:1264) shows literal backslashes `\"dir\" + \"/\" + name`: an escaping bug in the page source.
- CODE IN TITLE FONT (book-wide check): Bangers is capitals-only, so method names in card headings show as `UPPER()`, `.ITEMS()`, `KEYERROR: 0` (py ch11 P13/15/24/25/38/40, ch12). Wrap code in headings with `<code>` (the engine resets the font). Added an audit lead: CODE-IN-TITLE.
- ERROR TERMINALS ON PHONES (book-wide): the line pages say to read first is often cut off at 390 with no hint. Engine pass 2 option: an automatic `wrap` for terminals whose run exited non-zero (data-exit ≠ 0), or a swipe hint when the last line overflows.
- VERIFIED 11:45: readlist inline code no longer clips (rust ch29 P3/11/17/21/34 clear). Only rust ch29 P19 remains (142px): a chapter-level centred <p class="fill-code"> subject line; make it a <pre class="code"> in the fix round. Checker PASS on py ch26, rs ch4, go ch9 after the engine integration edits.
- js ch6 checker FAIL cause (visual-js-6-10): the chapter's `data-same-src` means "same except line 1", but the engine's badge requires an identical source. Rename the chapter attribute (e.g. `data-same-body`) and update js-ch6.js. DON'T delete js-ch6.js's copy, or the badges turn "Sources differ".
- REGRESSION (main session, 11:40) being fixed by engine pass 2: the `.terms` cap wasn't scoped to desktop and broke phone glossaries.
- REGRESSION (main session, 11:15) sent to engine pass 2: summary display:flex in the phone tap-target block split mixed-content summaries.
- PLAN FIX (request from fix-rs-ch10-12): tools/plans/rust.json ch12 visuals 'a photocopy page you may look at (&str)' → 'a page you may look at (&str)'.
- ENGINE (integration pass, after the fix swarm): deferred by the fixers: tracer arrows crossing (py ch5 P22, slot compaction), walker text version renders blank lines as full rows (py ch6), fill comparison cells wrapping on phones (py ch4, unchecked), the memory-stepper label formula in measure.js (8.2px at natural size). Engine pass 2 also chose not to: show only new screen lines in walker text versions, keep `->` whole in inline code.
- PLAN FIX: py plan ch13 "link back to ch1's file-naming advice": the rule is in ch2.
- ENGINE (integration pass): promote the cutter/cookie drawings (copied in py ch15, 19, 20) as `cookiecutter` / `cookie` (rust ch17 has a different `cutter`); `.checklist li` inline code still uses break-word, so check long names in checklists after pass 2's `li > *` min-width change.
- INTEGRATION PASS CHECKS (script, all books): (1) cover kickers consistent within each book (the "· INTERMEDIATE" suffix is still uneven in Rust: ch17 has it, ch18/ch20 don't); (2) the hall/journey catchphrase cards (rust ch16 hall, ch29 journey; py ch27; go ch28; cpp ch29; js ch29) still match each chapter's CURRENT title and recap after the fixes (e.g. rust ch12 title vs "Notebooks and Photocopies"); (3) gen_index.py rerun.
- ENGINE (integration pass): `.sm` Compiler plate still 9.2px (rust ch8 P32); the memory stepper can't point at a byte inside a heap block (rust ch9 P35); consider shared `.fig text:not([font-size], [font-size] text)` and `.stamp` rules (many chapters hand-roll stamps). Removed the stray /home/you/rust-ch7/caps_check (never captured).
- DONE: CAST.md Proofreader line corrected (reads the whole file before running), per fix-py-ch7-9 and content-py-7-9.
- ENGINE (integration pass): sealed critter index digits about 8px at ch7 P38's size; trace-table overflow needs a scroll hint option.
- PLAN FIX: rust plan ch13 visuals: "conveyor belt" → "return chute". ENGINE: the bag critter draws 3+ character items at 12 units (8.2px at default width).
- REQUESTS ROUND (after the swarm): process tools/fix/requests/*.md whose owners already finished (e.g. py-ch26 Inspector card rename from fix-py-ch19-21). Plans: type checkers in CI listed under both py ch21 and ch26; ch26 should own it.
- PLAN FIX: rust plan ch4 visuals "a semicolon is a lid" → "semicolon shutter" (ch4 renamed; ch2 keeps "lid"). Request rs-ch8 (Vec picture): ch8's glossary already names Chapter 11's accordion folder next to its own shelf picture, so it's resolved and needs no change. Removed the orphan rust-ch4 *_lid cargo folders.
- Agents must keep helper scripts in their own scratch subfolder: scratchpad/bin/rep.py was overwritten mid-run (fix-rs-ch4-6).
- ENGINE PASS 3 candidates (from the fixers): walker code column still narrow at 1280 (py ch10 P22); parsons on phones: compress deep leading indent, and never break inside escapes like `\n`; sealed-crate critter labels tiny at any size; the walker/map guide's `>_` face 5–8px; `.narration .count` nowrap catches chapter content reusing `.count`; plus the earlier items (cookiecutter/emptytrain promotion, bag items 8.2px, `.sm` Compiler plate 9.2px, memory stepper byte pointer, `.stamp` component, trace-table scroll hint, tracer slot compaction).
- DONE (rust 16/26/27 recaptured, merged views back, ch26 notes and footer updated): capture.py (main session, after fix-rs-ch25-27): the merged re-run is now accepted when its lines match the separate streams with digit runs normalised, so threaded panics keep their merged view. RECAPTURE in the requests round: rust ch16 (search_red), ch26 (thread_panic, poison, poison_spot), ch27, and remove their "About this terminal" stdout-first notes if the merged view returns.
- ENGINE: promote linecook and asyncwaiter (with the new badges) to comic-critters.js; rust ch29 syncs its copies (request file rs-ch29-from-fix-rs-ch25-27.md).
- [engine pass 3] tracer transcripts don't add break points to code (L.addBreaks); rust ch22 calls it in rs-ch22.js as a workaround. Promote into the tracer, then drop the chapter call. (from fix-rs-ch22-24)
- [plan] tools/plans rust: the claim that doc tests on private items are skipped is still uncorrected (from fix-rs-ch22-24).
- [capture] go ch1 P19 session uses mktemp and leaves 3 /tmp/tmp.* folders per recapture (from fix-go-ch1-3). Either have the session clean up after itself (shown on the page) or note it; check /tmp before delivery.
- [agents] scratchpad/tools/ is shared: one agent overwrote another's rep.py. Future briefs: helper scripts in a per-agent subfolder only.
- [engine pass 3] `data-lines="a-b"` range for `data-src`, so a panel can show part of a long program (from fix-rs-ch28-29).
- [integration] rust ch29 P38 journey copies every rust recap title; any later recap rename in ch1-28 must be mirrored there (verified matching as of fix-rs-ch28-29). Same check for the other books' final journey panels.
- [engine pass 3] `[hidden]` lost to author `display:` rules: go ch28 `.prb-pane { display: grid }` showed all 10 hidden panes (fixed in chapter). Add a global `[hidden] { display: none !important }` to comic.css, then scan every chapter for elements with `hidden` that are visible (from fix-go-ch28).
- [capture, main session] go.mod backups for the secondary run now live in /home/you/.capture-bak/<chapter>/..., not inside the module (go ch16 ship.go false difference). restore_go_mods also restores old in-folder backups. Go ch16 recaptured to verify; its footer note about go.mod.capture-bak must be removed if the difference is gone.
- [engine pass 3] comic-memory.js: `data-heap-label` option; "HEAP · the coat-check room" is hard-coded but coat check means std::map in cpp ch14. Then set cpp ch8's heap label (deferred item 10) (from fix-cpp-ch7-9).
- [engine pass 3] Linker LINK plate is 10.5px at `.sm` (cpp ch10): give it lbl-deco or a bigger plate (from fix-cpp-ch7-9; same family as the `.sm` Compiler plate item).
- [engine pass 3] reduced-motion fade list: let extension entrance animations opt in (cpp ch8 reuses `.tr-new`) (from fix-cpp-ch7-9).
- [engine pass 3] heap label "the coat-check room" also clashes with go ch12 (coat check = map); confirms the `data-heap-label` item (from fix-go-ch10-12).
- [engine pass 3, optional] the go book's shared helper CSS block repeated in chapter CSS could move to comic-widgets.css under [data-book=go] (from fix-go-ch10-12).
- [integration] go ch25 belt stepper breaks "[box: 4]" across two lines in its narrow belt column (pre-existing; from fix-go-ch25-27). Fix with nowrap on the token.
- [integration, rule 10] go ch27 uses "window" for a subcommand; ch9 uses "window" for a slice view. Rename ch27's picture (e.g. "station") or leave with a note (from fix-go-ch25-27).
- [engine pass 3] kitchen helper in its "busy" state draws the pot over the apron number (go ch24 works around it with 96px drawings and HTML names) (from fix-go-ch22-24).
- [integration] go ch22 "officer vs customs" naming left as-is (names distinct); review in the cast consistency pass (from fix-go-ch22-24).
- [engine pass 3] `.part-h code` unreadable (light chip, paper-coloured text in the dark part header); cpp ch22-24 and rs-ch10 work around it in chapter CSS. Style once in the engine, then drop chapter copies (from fix-cpp-ch22-24).
- [engine pass 3] table scrollers (`.vswrap`-style) get no scroll hint; reuse the picscroll hint (from fix-cpp-ch22-24).
- [capture, main session] FIXED: cmd_sidecar re-read the .cmd and lost the g++->clang++ swap, so non-session C++ .cmd builds never really ran clang++ (from fix-cpp-ch28-29). Affected: cpp ch1,3,4,6,7,8,9,10,11,12,13,14,16,17,18,19,26,28,29. Running owners told to recapture; a clang-recapture agent handles done chapters 7,8,9,28,29. INTEGRATION CHECK: confirm every affected chapter's data was captured after this change (data mtime > capture.py mtime).
- [engine pass 3, optional] promote cpp ch29's [data-libfold] (standard-library frames folded in TSan/template errors) into a shared data-fold (from fix-cpp-ch28-29).
- [integration] C++26 status: cpp ch29 P47 now says the draft "is not an official ISO standard yet" (P4238R0). cpp ch1 and ch27 still say "disapproved" — check against a primary source and align (from fix-cpp-ch28-29).
- [integration] candidate fill/parsons checker from fix-cpp-ch25-27 copied to tools/vendor_check_ex_candidate.py (review before use; could serve the check_fills item).
- [plans] cpp.json ch14: lambda is now "a clip-on attachment for the gadget"; javascript.json ch13: "plan card" (recipe card = function). JS variable picture stays ch3's name tag; ch8/ch17 told to use "one shared i tag" / "a new i tag for each lap"; ch10 to tie sticky note to the name tag. Verify all three after the round.
- [engine, optional] shared slice-window widget for go ch9/ch28 (deferred by fix-go-ch7-9).
- [engine pass 3] ghost's "undefined" label is 13 units: below 12px when the ghost is drawn narrower than ~111px; use lbl-deco or a bigger label (from fix-js-ch1-3).
- [engine pass 3] data-fold for g++ overload-candidate lists (cpp ch21 P1 still tells the reader to read only the first error) (from fix-cpp-ch19-21).
- [engine pass 3] comic-widgets.css ~257 `.duo-card .code { white-space: pre-wrap; overflow-wrap: anywhere }` breaks code mid-token in cards on phones (js ch13 P11); use break-word + hanging indent (from fix-js-ch13-15).
- [plans] javascript.json: ch16 teaser now says "five rules for this"; ch17 critter renamed roompack. Mirror if the plan mentions them (from fix-js-ch16-18). ch18 pacing (merge panels) DEFERRED, low severity.
- [integration, MUST] js ch28 picscroll drawings P2, P8, P20, P25: 13-unit labels render ~10.7px at 390 (below 12px rule); boxes too tight for the chapter fixer. Fix in integration (widen drawings / raise label units) (from fix-js-ch28-29).
- [integration, rule 10] js ch22 "shelf" (code units) vs ch29 "shelf" (array; arrays are crates since ch9 rename). Rename ch29's array shelf to crate, or leave with a note (from fix-js-ch28-29).
- [integration, MUST] re-run the ch29 journey-card vs recap comparison AFTER js ch22-24 (dials) and ch25-27 report; fix-js-ch28-29 saw 0 mismatches before those landed.
- [integration] js ch28 browser pages: rule 1 handled by a P3 note plus notes at the first terminal of each part, not one note per terminal (DOCUMENTED by fix-js-ch28-29). Acceptable; recorded.
- DONE clang recapture of cpp ch7, 8, 9, 28, 29 (clang-recapture agent): versionDifferences 9→13, 11→15, 7→12, 3→13, 8→9; pages and footers updated; all PASS. Remaining affected chapters (1,3 done; 4,6,10-14,16-19,26) recapture via their owners — verify by data mtime in integration.
- [integration, optional] cpp ch2 note "command-line words, Chapter 23" could add that Chapter 16 uses them first (from fix-cpp-ch16-18).
- [deferred] cpp ch17 exercise mix: no predict/trace over cmake logs (would need typing 20-line logs); recorded as a conscious gap (from fix-cpp-ch16-18).
- [engine pass 3] engine pager draws its "#N" tag at 16/160 units: under 12px below 120px wide; lbl-deco or bigger (from fix-js-ch22-24).
- [integration, rule 10, decide] js "switch": ch6 = railway switch (if/else); ch19 title "Switches and Invisible Ink" = on/off property flags (writable/enumerable/configurable). ch22 moved to dials, ch23 to on/off lights. ch19 left as is so far — decide in integration (rename ch19's picture to 'dials' to match ch22, or keep).
- [engine pass 3] Compiler 'g++' plate 9.2px at .sm (confirms the .sm Compiler plate item); <wbr> in .anat-line breaks inside nowrap groups (from fix-cpp-ch4-6).
- [engine pass 3] promote the [data-report] ASan reader (local copies in cpp-ch11/13/21) (from fix-cpp-ch13-15). Scratch parsons_brute.py / fill_check.py in scratchpad/fix-cpp-ch13-15/bin/ are candidates for the check_fills tool.
- [integration] cpp ch11 had 79 invisible U+2060 word joiners inside flags (copying -Wall gave a broken flag); removed, now `.flagw` no-break spans. Scan every page for U+2060/U+200B inside <code>/<pre> (from fix-cpp-ch10-12).
- [engine pass 3, optional] reusable radio-group keyboard helper (cpp ch11 sorting game repeats choice-exercise keyboard code); cpp ch13/21 still carry [data-report] copies (ch11 renamed to [data-asan]) (from fix-cpp-ch10-12).
- DONE (integration, main session): plan fixes applied — rust.json ch4 shutter, ch12 page, ch13 return chute, ch24 private doc tests run and fail (matches ch24 P27); python.json ch13 file-naming → ch2; cpp.json ch14 clip-on attachment; javascript.json ch5/ch9/ch13/ch28 titles and pictures. All plans parse.
- DONE (integration check): every affected cpp chapter's data is newer than the capture.py clang fix. Final-chapter journey links match chapter h1 titles in all five books (only "← Ch N" nav links differ, by design).
- TODO AFTER ENGINE PASS 3 (page edits held to avoid clashing with the engine agent): C++ kickers inconsistent — ch4/6/8 lack "C++ ·"; topic suffixes on ch18,19,21,22,24,26,28 only. Normalise to "C++ · CHAPTER N" + CAPSTONE (16) / INTERMEDIATE (17) / THE LAST ONE (29). JS: consider "· INTERMEDIATE" on its first intermediate chapter per the plan, matching other books. Clean /tmp/tmp.* (6) from go ch1 sessions (move, not delete).
- DONE (engine pass 3): `[hidden] { display: none !important }` in comic.css; scan of all 142 pages (1280 + 390, every details open): before, 2 rendered hidden elements (javascript/ch15 P6 `p.dt-moments`, both widths), after 0. Chapter `[hidden]` copies deleted (cpp-ch3, cpp-ch29, go-ch5, go-ch16, go-ch28, js-ch9, py-ch4).
- DONE (engine pass 3): comic-memory.js `data-heap-label` (default caption "HEAP"); set on all 23 Rust heap sections on 12 pages (the coat-check room), cpp ch13 (the library), cpp ch8 (where vectors keep their eggs, deferred item 10), go ch28 (the storage unit); other C++/Go heap pages show "HEAP".
- DONE (engine pass 3): labels under 12px: fitLabels covers every svg[data-char] (cpp ch1's figure Compiler), Linker LINK lbl-deco, ghost/pager/kitchen helper/sealed/bag/cookie lbl-grow, pager tag 20 units, busy helper's number on the pot, sealed and bag relaid, Pip's `>_` and Bouncer CREW lbl-deco, labels refitted after L.drawCast. Chapter copies of sealed/bag (py-ch7, py-ch8, py-ch12, plus py-ch12's guarded error critters) deleted. go ch24 keeps its HTML helper names (they are the accessible names of aria-hidden drawings). Inspector TEST: none under 12px.
- DONE (engine pass 3): promoted linecook + asyncwaiter (copies removed from rs-ch26/27/29), cookiecutter + cookie (py-ch15/19/20; pages now use data-char="cookiecutter"), emptytrain (py-ch4/21; js-ch5 keeps its own drawing), `[data-asan]` report reader (cpp-ch11 copy removed; cpp ch13/ch21 renamed from data-report, cpp-ch13.js and cpp-ch21.js deleted, chapter .rep-* CSS deleted).
- DONE (engine pass 3): `.duo-card pre.code` wraps per line with the hanging indent and code break points (L.codeLines), replacing pre-wrap + anywhere (js ch13 P11).
- DONE (engine pass 3): `.part-h code` styled in comic-widgets.css; copies deleted from cpp-ch22/23/24, js-ch5, rs-ch5/7/8/10/12/14/24.
- DONE (engine pass 3): tracer (and walker, memory-stepper) transcripts get L.addBreaks on td code; rs-ch22.js workaround call removed.
- DONE (engine pass 3): table scroll hints: table.trace and auto-detected table wrappers (.tscroll) get the picscroll hint and edge fade while they overflow.
- DONE (engine pass 3): `fx-in` opt-in entrance class (pop-in, reduced-motion fade); cpp ch8 switched from .tr-new; cpp ch2 and go ch25 reduced-motion copies replaced. go ch26 and js ch9 keep theirs (the animated element is a child of the stateful one).
- DONE (engine pass 3): anatomy `<wbr>` only between direct-child parts of a wrapping .anat-line; cpp-ch6 `.nobr wbr` override deleted.
- DONE (engine pass 3, optional): `data-lines="a-b"` for data-src; `.narration > .count:first-child` (nowrap no longer leaks to chapter .count).
- DEFERRED (engine pass 3, optional): shared data-fold for compiler noise (cpp ch29 libfold, cpp ch21 overload lists), Go helper CSS block, radio-group keyboard helper, walker code column at 1280, parsons deep-indent compression and escapes, memory-stepper byte pointer, .stamp component, tracer slot compaction, slice-window widget: each changes rendering or widget contracts across many chapters and needs its own design and review pass.
- DONE (integration, main session): kickers normalised — C++ "C++ · CHAPTER N" with CAPSTONE (16) / INTERMEDIATE (17) / THE LAST ONE (29), topic suffixes dropped; python ch16 and javascript ch17 now "· INTERMEDIATE" (first intermediate chapter, as rust/cpp); go keeps INTERMEDIATE on 17–28. Moved 6 /tmp/tmp.* go-ch1 session leftovers to scratchpad/tmp-leftovers.
- DECIDED (main session): rust keeps "coat-check room" as its heap picture (introduced ch7, used consistently; rust has no map coat check). js ch19 switches → toggles; go ch27 window → new word; js ch29 array shelf → crate. Delegated to the integration page agent; residual sub-12px character labels delegated to the label agent.
- DONE (integration page agent): js ch28 picscroll drawings P2, P8, P20, P25: below 760px they keep a 660px width (js-ch28.css) and scroll inside .picscroll; measured min label (getScreenCTM x font-size) 12.43px at 390 (P2), 12.62px (P8/P20/P25); 12.81px / 13.00px at 1280.
- DONE (integration page agent): go ch25 belt stepper: .bl-item nowrap ([box: 16] never breaks), belt columns 54px -> 80px, row stacks by a container query on .bl-wrap (<700px) with 172px belts; every item one line, 0px overflow at 390 and 1280.
- DONE (integration page agent, rule 10): go ch27 subcommand picture "window" -> "booth" (unused elsewhere in go/*.html; "station" is taken by ch25/ch26/ch8): blurb, P15 caption/aria/SVG description, bubble, P16, P17 aria, parsons/fill/boss prompts, Boss 3 explain, recap "ONE BOOTH, ONE FORM", further-reading, lab heading. go ch9/ch10 now the only "window" (slice view); no edit needed. Note: go ch7 P2 calls the machine's glass "the window showing gears" (not owned, decorative; optional rename).
- DONE (integration page agent, rule 10): js ch19 "switches" -> "toggles": title/h1/meta, cover, TOC, part heading, all prose, catchphrases (EVERY DRAWER HAS THREE TOGGLES, DEFINEPROPERTY'S TOGGLES START OFF), exercises, recap, lab, glossary; ch18 teaser/NEXT/ch-nav, ch20 ch-nav, ch29 card; plan ch19 (+ ch22 visuals "flag dials"); index regenerated. Only the program file name switches.js and the critter id switchpanel keep the word.
- DONE (integration page agent, rule 10): js ch29 library array room SHELVES -> CRATES (a crate of numbered boxes, as ch9): blurb, TOC, part heading, room, P31 (+ note that the code names its crate `shelf`), catchphrase/recap HALF THE CRATE EACH LOOK, P32, P33, P35, P37; plan ch29 updated. Program identifiers `shelf` unchanged (no recapture); "bookshelf" (series home link) kept.
- DONE (integration page agent): ch29 journey cards re-checked against h1/<title> and catchphrases of js ch1-28: 0 mismatches (card 26 catchphrase gained its final full stop to match ch26).
- DONE (label agent): character-drawing labels under 12px 296 → 0 (labels.js, 142 pages × 390/1280; 6636 → 6638 labels, the 2 new are py ch13 P38's nested Pip '>_' now fitted at its real 12.7px). comic.js fitLabels measures scale from the screen matrix and lbl-grow gains data-maxk/data-cy/data-plate; machine, crate, train, cabinet, brick, jelly, lamp, wheel (comic-widgets.js), tumble, nullframe, giftbox, parcel, umpire, digger, fetch, linecook (comic-critters.js), key (comic-memory.js) grow; ext js-ch20/22/27, py-ch22/25/27, rs-ch5 raised; cpp-ch29.css helper/Tick sizes; js ch9 P5 crate .lg. All 142 pages PASS at both widths. Notes in DESIGN_SYSTEM.md §9.
