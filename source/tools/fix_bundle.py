#!/usr/bin/env python3
"""Gather every review finding and integration note for one chapter into tools/fix/<prefix>-chN.md.

The fix round gives each chapter's fix agent one file to work from instead of 85 review files plus a long TODO list.
Sources:
  tools/review/*.json                     findings with "file": "<folder>/chN.html" (content, visual, book, engine lenses)
  tools/INTEGRATION_TODO.md               lines that name the chapter ("rust ch14", "[rs14]", "py ch3", ...)
  tools/review/engine-refresh-chapter-todo.md   chapter clean-ups the engine refresh made possible (if present)
Findings that name no single chapter (engine, book-wide) go to tools/fix/_crosscutting.md.

Usage: python3 tools/fix_bundle.py            (writes all bundles and prints a count table)
"""
import glob, json, re, sys
from collections import defaultdict
from pathlib import Path

SITE = Path("/home/claude/comic-site")
FOLDERS = {"python": "py", "rust": "rs", "go": "go", "cpp": "cpp", "javascript": "js"}
SEV = {"high": 0, "medium": 1, "low": 2}
# How chapters are named in free text: "rust ch14", "rust/ch14", "[rs14]", "rs-ch14", "py ch3", "js ch27" ...
ALIASES = {"python": ["python", "py"], "rust": ["rust", "rs"], "go": ["go"], "cpp": ["cpp", "c\\+\\+"], "javascript": ["javascript", "js"]}


def chapter_pattern(folder, n):
    names = "|".join(ALIASES[folder])
    return re.compile(rf"(?i)(?<![\w-])(?:(?:{names})[ /-]?ch{n}(?!\d)|\[(?:{names}){n}\])")


def main():
    by_ch, cross, bad = defaultdict(list), [], []
    for path in sorted(glob.glob(str(SITE / "tools/review/*.json"))):
        try:
            items = json.load(open(path))
        except (json.JSONDecodeError, OSError) as e:
            bad.append(f"{path}: {e}")
            continue
        src = Path(path).stem
        for it in items if isinstance(items, list) else []:
            m = re.match(r"(python|rust|go|cpp|javascript)/ch(\d+)\.html", str(it.get("file", "")))
            (by_ch[(m.group(1), int(m.group(2)))] if m else cross).append({**it, "_src": src})
    todo = (SITE / "tools/INTEGRATION_TODO.md").read_text().splitlines()
    eng_lines = []
    for name in ("engine-refresh-chapter-todo.md", "engine-pass2-chapter-todo.md"):
        eng = SITE / "tools/review" / name
        if eng.exists():
            eng_lines += eng.read_text().splitlines()
    out = SITE / "tools/fix"
    out.mkdir(exist_ok=True)
    table = []
    for folder, prefix in FOLDERS.items():
        for page in sorted((SITE / folder).glob("ch*.html"), key=lambda p: int(re.sub(r"\D", "", p.stem) or 0)):
            n = int(re.sub(r"\D", "", page.stem))
            pat = chapter_pattern(folder, n)
            items = sorted(by_ch.get((folder, n), []), key=lambda x: (SEV.get(x.get("severity"), 3), str(x.get("panel"))))
            notes = [l.strip() for l in todo if pat.search(l)]
            engn = [l.strip() for l in eng_lines if pat.search(l) or f"{prefix}-ch{n}." in l]
            lines = [f"# Fix bundle: {folder}/ch{n}.html", "",
                     f"{len(items)} review findings, {len(notes)} INTEGRATION_TODO lines, {len(engn)} engine-refresh notes.",
                     "Work through every item. For each, record FIXED / DOCUMENTED / DEFERRED / NOT-A-BUG (with evidence) in your report.", ""]
            if items:
                lines.append("## Review findings (most severe first)")
                for i, it in enumerate(items, 1):
                    lines += [f"{i}. **[{it.get('severity','?')}] [{it.get('lens','?')}] panel {it.get('panel','?')}"
                              f"{' @' + str(it.get('width')) if it.get('width') not in (None, '', 'all') else ''}** "
                              f"({it['_src']}): {it.get('what','')}",
                              f"   - evidence: {it.get('evidence','')}", f"   - fix: {it.get('fix','')}"]
                lines.append("")
            if notes:
                lines += ["## INTEGRATION_TODO lines naming this chapter"] + [f"- {l.lstrip('- ')}" for l in notes] + [""]
            if engn:
                lines += ["## Engine-refresh clean-ups for this chapter"] + [f"- {l.lstrip('- ')}" for l in engn] + [""]
            (out / f"{prefix}-ch{n}.md").write_text("\n".join(lines))
            table.append((f"{prefix}-ch{n}", len(items), sum(1 for x in items if x.get("severity") == "high"), len(notes)))
    cross.sort(key=lambda x: (str(x.get("lens")), SEV.get(x.get("severity"), 3)))
    cl = ["# Cross-cutting findings (no single chapter)", ""]
    for it in cross:
        cl += [f"- **[{it.get('severity','?')}] [{it.get('lens','?')}] {it.get('file','')}** ({it['_src']}): {it.get('what','')}",
               f"  - fix: {it.get('fix','')}"]
    (out / "_crosscutting.md").write_text("\n".join(cl) + "\n")
    tot = sum(t[1] for t in table)
    print(f"fix_bundle: {len(table)} chapter bundles, {tot} chapter findings ({sum(t[2] for t in table)} high), "
          f"{len(cross)} cross-cutting, {len(bad)} unreadable review files")
    for b in bad:
        print("  UNREADABLE", b)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
