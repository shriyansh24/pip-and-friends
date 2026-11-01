# Swarm resume notes (updated 2026-11-08 ~00:15 CT)

The weekly usage limit is still in force. It resets at 4am America/Chicago on 2026-11-08. Resuming at 00:03 got only JavaScript 8 finished
before the limit stopped every other agent again.

Resume each paused chapter with SendMessage (to = agent id, message = "Continue from where you stopped ..."), not as a new agent:

| chapter | agent id | last known step |
|---|---|---|
| javascript 9 | ab18f55e6d440a9db | writing the main page |
| cpp 8 | a06ac672a07a582ed | writing the chapter CSS |
| cpp 9 | a9862933e6d431b45 | page never saved; programs, captures and ext files intact; about to write the page |
| python 19 | a7640a15ac2881c83 | building the page template in parts with a build script |
| rust 10 | a5fe58c1c7b07dca2 | early (house-style reading) |
| go 10 | a9d89569258cec891 | early (reading go ch9) |
| cpp 10 | a0177b266e6a59d55 | just started |
| javascript 10 | ac303ca67d3d245d7 | just started |
| python 20 | a8fa303f80b7c3054 | just started |

After resuming those 9, launch 1 more from `python3 tools/q.py next 1` to make 10.

Fix-swarm item: recapture go ch1–ch9 with the new secondary (capture.py builds Go 1.24.7 with -modfile=.go124.mod),
then update footers and any "1.24.7 refused" wording.

## Preview site
Live preview artifact: https://claude.ai/artifact/J3ryFGrEXinwwCDPsDEGcU (published from dist/publish/index.html).
To refresh: `python3 tools/gen_index.py && python3 tools/build.py --preview`, then publish dist/publish/index.html again
with root=dist/publish and the full file list (same file_path keeps the URL). Preview mode ships only finished chapters
and points "next chapter" links at not-ready chapters to that book's contents page.

2026-11-08 04:10 CT: the scheduled resume fired. All 9 paused agents were resumed and rust 11 launched (agent a0777be2966903a97), so 10 are running.
Note: the preview now has more than 255 files, so publish in two calls to the same file_path (the second call adds to the first).

## Review swarm (prepared, starts only after all 132 chapters are done)
- Brief: tools/REVIEW_BRIEF.md. Queue: tools/review_queue.json (85 reviewers: 49 content x3 chapters, 30 visual x5 chapters, 5 book, 1 engine). Findings go to tools/review/<id>.json. Reviewers don't edit.
- Loop: `QUEUE=review python3 tools/q.py next 1` → launch Agent with prompt "Your task is in /home/claude/comic-site/tools/review_queue.json: it is the `prompt` field of the entry with "lang": "review" and "n": N. Read that file, find your entry, and carry out its prompt exactly." → `QUEUE=review python3 tools/q.py start review N` → on finish `... done review N`.
- Then the fix swarm: group findings by chapter and apply, with INTEGRATION_TODO items handled by an engine fixer first.

## Review swarm agent map (session after compaction)
n1 a39d280a900ba6199 · n2 a07f2f9667fc749d8 · n3 a16f623f46d99e97a · n4 a1a141b4a599d2648 · n5 a66dc5cf1536c5c6d · n6 a9aae726bca2839df · n50 a2216c14d6fafd0a5 · n51 ad98a607a2d611309 · n85 add6968ca3edc478f · n80 a6804a45ade2c169d
n7 ad90ca309f67f8780
n8 aef3f4b8ee4cdc505 · n9 (launched with n8)
engine-refresh adb7552c934bbf73d (owns assets/comic*)

## 2026-11-08 09:30: owner asked for Emil Kowalski skills (design reviews) and shadcn/ui (components)
- Vendored: tools/vendor/emil-skills (commit in COMMIT) and tools/vendor/shadcn-ref (component .tsx, globals.css, LICENSE).
- Engine refresh agent (ENGINE_REFRESH_BRIEF.md) owns assets/comic* until it reports. It writes tools/DESIGN_SYSTEM.md and tools/review/engine-refresh-chapter-todo.md.
- REVIEW_BRIEF visual lens updated to Emil's standards and component consistency.
- HOLD visual reviews n52–79 until the engine refresh lands (n50 is done, n51 ran on the old engine; re-run py 6-10 visual afterwards if its findings are mostly engine-level).
- Content (n22–49) and book (n81–84) reviews continue meanwhile, keeping about 9 agents alongside the engine agent.
n31 a4709abeda69c2ff1 · n32 a88e746715838b1e8 · n33 a8efef6776c8322fb · n34 a015fe2f528d66f47 · n35 a1aab7511befd133c · n36 aeca13cd66da37d84 · n37 a2365a8e6ce558ae8 · n38 abd6c9f36a59dbcf5 · n39 a6f7ff8442ad5d609 · n81 abea38ba42dc4a904 · n82 ae58d379576472759

## Fix round preparation (done while reviews finish)
- tools/fix_bundle.py → tools/fix/<prefix>-chN.md (per-chapter findings + TODO lines) and _crosscutting.md. Re-run after the last review lands.
- tools/audit_chapter.py <page>: leads for CHOICE-LENGTH, LEFT-RIGHT, NONDET, HIDDEN-REWRITE/SETUP, TRUNCATED, PARSONS-PIN, RUST-E0412, LAST-LINE (JS).
- capture.py: 2-slot lock (/tmp/comic-locks), C++ secondary swaps g++→clang++, merged rerun validated, nondet always flagged from the sidecar.
- tools/FIX_BRIEF.md: the fix-agent brief. Plan: about 48 agents × 3 consecutive chapters, about 16 concurrent; checker serialised with flock /tmp/comic-locks/check.lock.
- Order: engine refresh lands → visual reviews (28) → fix_bundle.py → fix swarm → integration pass (requests/, gen_index, build, publish, laptop copy).
visual n52 a0dd96b9fd949db92 · n53 a038cdfcae3d8db1b · n54 ae443ff7e7faf846a · n55 abc313222e9e8e8a2 · n56 a7b6de9a481ec5c0d · n57 abe45b61f14bbb9ab · n58 aeeb5b636040a24b0 · n59 a4e3fd9e4cda0cfaf · n60 a3d2681c090c60b84 · n61 ae047aafe9dc25a56 (engine refresh DONE 09:53)
visual go: n62 a50c9a83f3c6730f3 · n63 aa148ca42e1814162 · n64 a2097f8a7acd18db8 · n65 aefbf979343a0b518 · n66 ab39e7a432295615a · n67 adb0a4feec2fc8eb9. Browser runs now go through tools/slot.sh (3 slots), not the single check.lock.
engine pass 2: a636c5a3f8c0910b1 (owns assets/comic* from 11:45 local; main session must not edit the engine until it reports)

## Fix swarm (ready, starts when engine pass 2 and the last visual review land)
- tools/fix_queue.json: 49 groups × ≤3 chapters (py 9, rs 10, go 10, cpp 10, js 10). `QUEUE=fix python3 tools/q.py next K | start fix N | done fix N | stat`.
- Agent prompt: "Your task is in /home/claude/comic-site/tools/fix_queue.json: it is the `prompt` field of the entry with "lang": "fix" and "n": N. Read that file, find your entry, and carry out its prompt exactly."
- Before launch: `python3 tools/fix_bundle.py` (it now reads engine-pass2-chapter-todo.md too). Run about 16 concurrent; captures 2 slots, browsers 3 slots.
- After: process tools/fix/requests/, re-run gen_index.py, update the plans, run audit_chapter.py on all, build.py, publish (two calls), laptop copy.
fix 1-16 launched 12:20 local: ade9898d219677e1d a4cbcb44c7aa6a94f a5d345a1ee671caf8 a11a29a5af1bccd6b aa80ae459c2e741ea a43d71577a84196de ace562d4b2b009a0c acc581d415a1d2efa a4522a9409a7017b7 a1a44b87c2e1d66d4 a40c76ba4b479e790 abe5bdafc9511b45c a520f63252f3a4eda a14262e45877e8165 ada2d3092ed0d696f a4cd8dca35d775a27 (in order n1..n16)
engine pass 2 DONE ~12:50 local (141/142 frozen; checker now fails clipped panels/gutter loss). Bundles regenerated with engine-pass2-chapter-todo.

## 2026-11-08 status (main session)
- FIX ROUND COMPLETE: all 49 groups done, every chapter PASS at 1280/390 per its fixer. All request files processed (tools/fix/requests/done/).
- capture.py main-session fixes this round: merged-view digit-normalised compare; go.mod backups outside chapter folders (/home/you/.capture-bak); cmd_sidecar keeps the g++->clang++ swap (all affected cpp chapters recaptured by owners or the clang-recapture agent).
- NEXT: engine pass 3 (tools/ENGINE_PASS3_BRIEF.md) -> integration checks (INTEGRATION_TODO [integration] lines, journey cards, kickers, metaphor decisions, data mtime > capture.py mtime for cpp, gen_index, audit + checker on all 142) -> build.py -> publish (dist/publish/index.html, https://claude.ai/artifact/J3ryFGrEXinwwCDPsDEGcU) -> laptop copy D:\pip-and-friends.
