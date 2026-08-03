# Brief for chapter authors (all books)

You are writing ONE chapter of "Pip & Friends", a comic-book programming course for complete beginners. There is one book per language, and each book is standalone: assume the reader has never programmed. In the owner's words:

> "have a lot of stunning visuals diagrams animations explainers etc and have a lot of hands on problems for side by side self checking correction ... our goal be thorough, more detailed than any curriculum out there ... explain and learn easily in a friendly and rememberable manner, fun, easy to remember and apply, check your knowledge."

The owner loved the chapter-1 pilot (`src/python/ch1-pilot.html`). The finished Python chapters `python/ch1.html` to `ch10.html` are the quality bar: match their look and voice, and go further in depth wherever your topic allows.

## Before writing anything

1. Read `/home/claude/comic-site/AUTHORING.md` completely, especially §7 (books in every language). It is the contract.
2. Read your entry in `tools/plans/<lang>.json` (the one whose `n` is your chapter). Then read your modules' rows in `research/<lang>.md`: concepts, real errors, analogies, exercise ideas, sources.
3. Read the house style:
   - one finished Python chapter close to your topic, for example `python/ch6.html` for functions or `python/ch7.html` for collections
   - `tools/fixture/widgets.html`, which shows every widget
   - `tools/fixture/cast.html` and `assets/CAST.md` for your book's guide and the Compiler
   - the class lists in `assets/comic.css` and `assets/comic-widgets.css`
   - the shared engine extras, which you should use instead of redrawing your own:
     - `assets/comic-memory.js`: the `[data-mem]` stack-and-heap stepper and the `key` ownership creature
     - `assets/comic-critters.js`: the shared characters
     - AUTHORING.md's engine notes, including the value-box `label` in tracers
4. Research your topic with WebSearch/WebFetch in the free curricula the research map lists, to check how they sequence it and which pitfalls they warn about. Write original material only. If a site is declined, don't go around it with a mirror, cache or curl: use another source (MDN, the official docs, the spec), or cite it from the research map and say you didn't fetch it.
5. Plan the chapter: list the panels, the visual models and the exercises, placing each exercise right after the idea it checks. Then build.

## Size and richness targets (a floor, not a ceiling)

- **Panels:** 30–50 comic panels on the main path, in 4–7 parts, each listed in the `.toc`.
- **Visual models:** at least 4 (recipe walker, memory tracer, machine, map/statechart, chapter extension), chosen to fit the topic.
- **Exercises:** at least 18, covering all six kinds: predict, choice, parsons, fill, spot, trace. Spread them through the chapter after each idea. Finish with a "Boss level" of 4–6 exercises.
- **Errors:** real error messages (compile-time and run-time) for every classic mistake in your modules, each read "like a detective".
- **Recap:** "What you learned", with 3–6 catchphrases.
- **Professor's notebook:** at least 6 pages:
  - under the hood
  - in real programs
  - common wrong ideas
  - lab: run it yourself, with Windows / macOS / Linux notes and the real install/run commands for this language
  - words from this chapter
  - go deeper: official-docs links plus 2–4 free resources
- **Footer:** provenance (real runs, toolchain versions from your data file's meta, folder) and the sources you consulted.

## Process

1. Write the programs in `/home/you/<lang>-chN/`. If a program must contain escape sequences such as `\uXXXX` or `\x41`, check the saved file with `grep -n '\\u' file`: some write paths turn them into the literal characters. Capture them with `python3 tools/capture.py <lang> N`, and re-run it after every program change.
2. Build `<folder>/chN.html`, plus `assets/ext/<prefix>-chN.*` if you need it. You may assemble the page with helper scripts in your scratch folder, but the finished `chN.html` is the only source of truth. The scratchpad isn't kept, and later reviewers edit `chN.html` directly.
3. Run `node tools/check_chapter.js <folder>/chN.html --shots /tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/<prefix>-chN/shots` until it PASSes. Notes about sibling pages not written yet are fine.
4. Look at the screenshots yourself with the Read tool, at 1280 and at 390 widths. Crop tall pages into pieces with PIL. Fix clipping, overlaps, tiny text, empty panels, awkward layouts and ugly composition, then check again.

## Shared machine

This machine has 2 CPU cores and about 7 GB of RAM, shared with several other authors working at the same time:
- Run one checker at a time.
- Close browsers you open.
- Keep scratch files inside `/tmp/claude-0/-home-claude/7f030446-3270-51d4-abc1-d3638614f9af/scratchpad/<prefix>-chN/`. Other authors share the scratchpad, so never write outside your own subfolder.

## Boundaries

- Touch only your own files (AUTHORING §1 and §7).
- Never edit the shared engine (`assets/comic*.js`, `assets/comic*.css`, `tools/*`). If you need an engine change, request it in your report.
- Do not publish artifacts, do not write to the user's computer, and do not spawn other agents.
- Do not use `rm -rf`; overwrite instead.

## Final report

Your last message. Keep it factual and under ~300 words, covering:
- the files you wrote
- the number of panels, and the number of exercises by kind
- the visual models you used
- the number of programs captured, and any version differences
- the checker's PASS lines, verbatim
- the sources you consulted
- known gaps or engine-change requests, each with its reason
