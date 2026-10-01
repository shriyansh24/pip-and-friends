# Fix bundle: python/ch22.html

12 review findings, 1 INTEGRATION_TODO lines, 0 engine-refresh notes.
Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.

## Review findings (most severe first)
1. **[medium] [visual] panel 27 @390** (visual-py-21-25): The exception-group tree's three leaves break class names in the middle: 'TypeErro|r("name must be text")', 'ValueErr|or("age must be a number")', which reads like different code to a beginner.
   - evidence: py-ch22.css:46 .ch22-group .kid code { overflow-wrap: anywhere } in 3 columns of ~105px; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/crop22-27.png (from /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a22/w390-043-p27.png).
   - fix: Before: .ch22-group .kid code { font-size: 0.875rem; overflow-wrap: anywhere; } → After: .ch22-group .kid code { font-size: 0.8125rem; overflow-wrap: normal; } plus <wbr> after '(' in the markup, or @media (max-width:640px) { .ch22-group .kids { grid-template-columns: minmax(0,1fr); } } (why: break at punctuation, never inside an identifier).
2. **[medium] [book] panel 37** (book-py): Chapter 22 sends readers to Chapter 18 for generators; generators and yield are taught in Chapter 16 (Chapter 18 is decorators).
   - evidence: 'contextlib.contextmanager builds one from a generator (Chapter 18): code before yield is the card going in…'
   - fix: Change to 'from a generator (Chapter 16), using a decorator (Chapter 18)'.
3. **[medium] [content] panel 37** (content-py-22-24): Wrong cross-reference: generators and yield are taught in Chapter 16 (Lazy Conveyor Belts), not Chapter 18 (Backpacks and Gift Wrap: closures and decorators).
   - evidence: Panel 37: "contextlib.contextmanager builds one from a generator (Chapter 18)". python/ch16.html meta description: "...generators with yield, pipelines and itertools"; python/ch18.html contains no 'yield'. tools/plans/python.json n=18 scope: closures, nonlocal, decorators.
   - fix: Change "(Chapter 18)" to "(Chapter 16)".
4. **[medium] [visual] panel 41 @390** (visual-py-21-25): The contextlib toolbox table splits every tool name mid-word on phones: 'suppre|ss(Erro|r)', 'redire|ct_stdo|ut(f)', 'closin|g(thing|)', 'ExitSt|ack()'.
   - evidence: py-ch22.css:68 .ch22-table code { overflow-wrap: anywhere }; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a22/sheets/w390-08.png (p41).
   - fix: Before: .ch22-table code { overflow-wrap: anywhere; } → After: .ch22-table code { white-space: nowrap; } inside the existing .ch22-tablewrap scroller, or stack the rows at ≤640px (why: tool names are what the reader must recognise; let the table scroll instead).
5. **[medium] [book] panel 47 (teaser) and next-chapter strip** (book-py): Chapter 22's teaser asks where ShopError and its friends will live, but Chapter 23 never mentions ShopError or Chapter 22's exception classes.
   - evidence: ch22 Panel 47: 'Pip's shop code has outgrown one file… Where should ShopError and all its friends live? A folder of modules, maybe, with floors and rooms.' grep -c ShopError python/ch23.html = 0; ch23's package is a hardware 'store' (saw.py, hammer.py, hose.py) with no errors module.
   - fix: Either add an errors.py room to ch23's store package diagram (Panel 2) with one sentence ('exceptions get their own room, like ShopError in Chapter 22'), or reword the ch22 teaser to 'Pip's shop code has outgrown one file…' without naming ShopError.
6. **[medium] [visual] panel 8 @390** (visual-py-21-25): Panel 8 exists to show the new SyntaxWarning, but on phones the whole warning sits off the right edge: the visible text is only '/home/you/python-ch22/finally_retur…' and 'return "saved!"'.
   - evidence: capture stderr: "/home/you/python-ch22/finally_return.py:5: SyntaxWarning: 'return' in a 'finally' block"; crop /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a22/sheets/w390-01.png (p8). Same clipping of the key line in p2 (3.13 'SyntaxError: multiple exception typ…'), p18/p20 ('The above exception was the direct …', 'During handling of the above except…') and p21.
   - fix: Before: <pre class="term" data-run="finally_return.py"> (ch22.html:220) → After: <pre class="term wrap" …>; same for recap_comma.py (ch22.html:88), chain_from.py, chain_implicit.py, chain_none.py (why: the engine wrap keeps carets aligned and makes the message itself visible).
7. **[low] [content] panel 28** (content-py-22-24): The caption muddles what an except* desk receives: the desk gets a smaller ExceptionGroup (eg), and eg.exceptions is the tuple inside it.
   - evidence: Panel 28: "Each desk takes its share of the group, as a smaller group in `eg.exceptions`". group_star.py prints `eg.exceptions` as a tuple, e.g. (ValueError('age must be a number'),); notebook nb_star_wraps.py shows type(eg) is ExceptionGroup.
   - fix: "Each desk takes its share as a smaller group, named `eg` here; `eg.exceptions` holds the alarms inside it."
8. **[low] [content] panel 30** (content-py-22-24): The callout calls line 6 'the first use after the block', but line 5 already uses f (it reads f.closed). Line 6 is the first write.
   - evidence: closed_after.py: 5 print("after: closed?", f.closed); 6 f.write("Buy eggs\n"). Callout: "line 6 / Where: the first use after the block."
   - fix: "Where: the first write after the block (reading `f.closed` on line 5 is fine)."
9. **[low] [content] panel 42, 43, after 43 (exitstack_demo.py, multi_with.py, trace_cards.py)** (content-py-22-24): Right after the catchphrase 'TEARDOWN GOES IN FINALLY. Every @contextmanager that sets something up needs it', three @contextmanager examples leave out try/finally around yield.
   - evidence: Panel 39 Pip: "Every `@contextmanager` that sets something up needs it." exitstack_demo.py, multi_with.py and trace_cards.py all use `print(...)`, `yield`, `print(...)` with no try/finally (a body that raised would skip 'off'/'out').
   - fix: Wrap the yield in try/finally in those three programs and recapture (outputs don't change), or add a caption line saying these demos skip finally because their blocks can't fail.
10. **[low] [visual] panel 9 (SILENCED plates), 31 and cover (key card) @390** (visual-py-21-25): Small text inside the chapter's drawings: the alarm bells' 'SILENCED' plates are 9.4px, the key card's 'card in' / 'no card' 9.6–11.2px. In p31 at 390 the middle step's Pip is drawn about 230px tall between two small key cards, which makes the three-step strip lopsided.
   - evidence: /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a22/audit.json small list; /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/review-visual-py-21-25/a22/sheets/w390-01.png (p9), w390-05.png (p31).
   - fix: Before: alarmbell plate fs 12 for labels > 11 chars (py-ch22.js) and key-card text font-size 13 → After: fs 15 and 16 respectively, widen the plate; .ch22-steps .char { width: min(70%,190px) } → min(50%,150px) for the Pip step (why: 12px floor; even visual weight across the three steps).
11. **[low] [book] panel ch22 47 (teaser picture), ch24 43 (teaser picture)** (book-py): Two teasers use creatures against their fixed meaning: the dict cabinet holds standard-library module names, and the list crate stands for bytes (ch25 itself likens bytes to a tuple).
   - evidence: ch22 teaser: 'a cabinet with drawers labelled Counter, deque, datetime and Decimal'; ch24 teaser: 'a crate of three numbered boxes, standing for bytes'; ch25 Panel: 'A bytes object works like a frozen row of numbered boxes (Chapter 7's tuples)'. AUTHORING: 'once jelly means float, it always means float.'
   - fix: Draw a shop shelf/aisle sign for the ch22 teaser and the byte boxes from the ch25 cover (63 61 66 …) or the sealed crate for ch24.
12. **[low] [content] panel notebook: In real programs** (content-py-22-24): pytest.raises is credited to Chapter 26, but Chapter 14 introduces it; Chapter 26 only mentions it in its recap.
   - evidence: ch22: "Tests: `pytest.raises(ValueError)` passes only if the block raises that error (Chapter 26)." python/ch26.html panel 2: "Chapter 14 built the first checklist lines: pytest, assert, edge cases, pytest.raises..."; ch14.html has 6 uses of pytest.raises.
   - fix: "(Chapter 14; Chapter 26 goes further with testing)".

## INTEGRATION_TODO lines naming this chapter
- ## From python ch22 (Alarms and Key Cards)
