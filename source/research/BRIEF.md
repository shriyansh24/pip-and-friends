# Research brief: beginner + intermediate curriculum map for ONE language

Purpose: the owner is building a comic-book programming course (one book per language, each standalone, assuming NO prior
programming knowledge). He wants "anything and everything that comes under beginner" plus the intermediate layer, and
believes typical outlines are too shallow. Your job: find out, from real sources, how deep and detailed the best free and
well-known curricula go, then produce the most complete, well-ordered beginner + intermediate module map for your language.

## Method (non-negotiable)
- Use WebSearch AND open the pages (WebFetch) you take facts from. A search snippet is not a source.
- Look at the actual table of contents / syllabus / lesson list of each curriculum (chapter and lesson titles, counts of
  lessons/exercises where published). Record counts only if the page shows them; otherwise say "not published".
- Cover at least 10 curricula for your language (the list in your task, plus any strong ones you find). Note university courses,
  books, interactive platforms, roadmaps, and concept-tree syllabi (e.g. Exercism's syllabus/concepts).
- Check current versions/editions as of November 2026 (language version, book editions) on official pages.
- Original synthesis only: do not copy lesson text.

## Output: write ONE file /home/claude/comic-site/research/<lang>.md with exactly these sections

### 1. Depth benchmark
A pipe table, one row per curriculum: `Curriculum (linked) | Format | Size (chapters / lessons / exercises, as published) | How far it goes | What it does unusually well`.
Then 3–5 sentences: how deep the best beginner treatments really are (e.g. how many lessons they spend on strings, on
ownership, on pointers), what almost all of them skip, and what that means for our course.

### 2. Concept dependency order
A numbered list of the module order you recommend, each with "needs: <earlier modules>". Note where curricula disagree on order and why you chose.

### 3. Beginner track (exhaustive)
A pipe table: `# | Module | Concepts (fine-grained, comma-separated: every sub-topic a beginner must meet) | Classic mistakes and the real error/message they produce | Best picture or analogy | Exercise ideas (predict / reorder / fill / spot the bug / trace / choice) | Covered by`.
Aim for completeness over brevity: typically 18–30 modules for the beginner track. Include tooling modules (install, run,
editor, REPL, package manager, debugger, testing basics, reading docs) and "how to think" modules (reading errors,
debugging, decomposing problems) where curricula include them.

### 4. Intermediate track (exhaustive)
Same table shape, typically 15–25 modules (idioms, standard library depth, modules/packages, testing, error-handling design,
concurrency basics, performance basics, the language's signature intermediate features).

### 5. Beyond intermediate (one line each)
Bullet list of advanced topics deliberately left out, so the boundary is explicit.

### 6. Facts for a "real runs only" course
Current stable version and toolchain commands; anything that makes captured output nondeterministic (hash order, UB,
goroutine scheduling, timing); how compile/runtime errors look; anything version-specific a beginner page must flag.

### 7. Sources
Bulleted `[Title](url)` list of pages you actually opened, with an as-of date.

Length: as long as completeness needs (expect 5,000–10,000 words). Tables must be valid markdown (no line breaks inside cells; use ";" between items).

## Boundaries
Write only your own research file. Do not edit anything else in /home/claude/comic-site, do not publish anything, do not spawn agents.
Final message: under 250 words — file path, number of curricula reviewed, module counts per track, the 3 most surprising findings.
