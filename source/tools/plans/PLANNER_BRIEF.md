# Planner brief: chapter plan for one language book (beginner + intermediate)

Read first: /home/claude/comic-site/AUTHORING.md, /home/claude/comic-site/tools/BRIEF.md, and your language's research map
/home/claude/comic-site/research/<lang>.md (sections 2–4 are the module order and the exhaustive module tables).

Write /home/claude/comic-site/tools/plans/<lang>.json — exactly this shape:
{
  "lang": "rust",                       // python | rust | go | cpp | javascript
  "book": "Rust",                       // display name
  "prefix": "rs",                       // py | rs | go | cpp | js  (data/<prefix>-chN.js, assets/ext/<prefix>-chN.*)
  "folder": "rust",                     // site folder: python | rust | go | cpp | javascript
  "chapters": [
    { "n": 1, "part": "beginner",       // "beginner" | "intermediate"
      "title": "Two to Four Words",     // fun, memorable, comic-book style; unique within the book
      "nav": "Short",                   // 1–2 word nav label
      "modules": ["B1", "B2"],          // research module ids this chapter covers (every module covered exactly once across the book)
      "scope": "One dense paragraph: every concept, sub-topic, classic mistake and real error message from those modules' research rows that this chapter must teach, in teaching order.",
      "not_yet": "What this chapter must NOT teach yet (owned by a later chapter).",
      "visuals": "2–4 concrete visual-model ideas (walker / tracer / machine / map / extension) and the analogy pictures from the research rows.",
      "cast": "Which characters appear (the language's guide always; Compiler for compile errors; creatures).",
      "capture_notes": "Anything the capture tool must handle for this chapter's programs (stdin, nondeterminism, sanitizers, crates/packages, browser pages, files)."
    }
  ]
}

Rules:
- Pair modules into chapters, normally 2 per chapter (a big module may stand alone; two small ones may share with a third).
  Target about 14–16 beginner chapters and 11–13 intermediate chapters. Every beginner and intermediate module of the research map
  must appear in exactly one chapter. Keep the research map's dependency order.
- Chapter 1 always starts from zero: what a program is, how this language runs one, first program, reading the first error.
- The scope paragraph is what the chapter author works from, so make it complete (it is the depth guarantee). Pull concepts, pitfalls and
  real error messages from the research rows; do not invent facts.
- Each book is standalone: assume no prior programming and no other language.
- Validate the JSON with python3 -m json.tool before finishing.
Final message: under 120 words — chapter count per part, and any module you had to move out of order and why.
