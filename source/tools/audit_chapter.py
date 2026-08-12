#!/usr/bin/env python3
"""Scripted checks for the patterns the review swarm found again and again. Run on a chapter before and after fixing it.

    python3 tools/audit_chapter.py rust/ch24.html [more pages...]

Each check prints the places to look at. These are leads, not verdicts: decide each one by reading the page.
  CHOICE-LENGTH  the correct option is the longest by a clear margin (>= 1.25x the next), so it can be guessed
  LEFT-RIGHT     "left"/"right" wording; true only if the two things really sit side by side at the widths that matter
  NONDET         a program marked nondeterministic is used in a panel that never says "one possible run"
  HIDDEN-REWRITE a .cmd step whose real command filters/rewrites output or fakes the exit code in a way the shown one doesn't
  HIDDEN-SETUP   a .cmd step wrapped in setup (staging, cd, a runner) around the shown command: needs an on-page note
  TRUNCATED      a .cmd that isn't a session and stopped early, so its later steps never ran
  PARSONS-PIN    a parsons puzzle whose first lines are imports/package/#include/use with no "pin" (any order is valid there)
  RUST-E0412     E0412 is no longer emitted (merged into E0425 on both captured toolchains)
  CODE-IN-TITLE  code-like text in a heading or card title outside <code> (the title font is capitals only)
  LAST-LINE      JavaScript only: "last line first" advice (wrong for Node, whose last line is the version footer)
Exit status is 0 always: the fix agent judges, the script only points.
"""
import html as H, json, re, sys
from pathlib import Path

SITE = Path("/home/claude/comic-site")
PREFIX = {"python": "py", "rust": "rs", "go": "go", "cpp": "cpp", "javascript": "js"}
MODEL = re.compile(r'<script type="application/json" id="([^"]+)">(.*?)</script>', re.S)


def text_of(fragment):
    return H.unescape(re.sub(r"<[^>]+>", " ", fragment))


def panels(page):
    """(start, end, html) for each panel/section-level block, so a hit can be tied to the panel it sits in."""
    out = []
    for m in re.finditer(r'<(section|div)\b[^>]*class="[^"]*\bpanel\b[^"]*"[^>]*>', page):
        out.append(m.start())
    out.append(len(page))
    return [(out[i], out[i + 1], page[out[i]:out[i + 1]]) for i in range(len(out) - 1)]


def panel_no(block):
    m = re.search(r'class="panel-no"[^>]*>\s*([^<]+)<', block)
    return m.group(1).strip() if m else "?"


def audit(rel):
    page = (SITE / rel).read_text()
    folder, ch = rel.split("/")[0], re.sub(r"\D", "", rel.split("/")[1])
    prefix = PREFIX[folder]
    data_p = SITE / f"data/{prefix}-ch{ch}.json"
    data = json.loads(data_p.read_text()) if data_p.exists() else {"programs": {}}
    progs = data.get("programs", {})
    models = {mid: body for mid, body in MODEL.findall(page)}
    hits = []

    # CHOICE-LENGTH
    for m in re.finditer(r'data-ex="choice"[^>]*data-model="([^"]+)"', page):
        try:
            mod = json.loads(models.get(m.group(1), "{}"))
        except json.JSONDecodeError:
            hits.append(("CHOICE-LENGTH", m.group(1), "model JSON did not parse"))
            continue
        opts = mod.get("options", [])
        good = [len(o.get("t", "")) for o in opts if o.get("correct")]
        bad = sorted((len(o.get("t", "")) for o in opts if not o.get("correct")), reverse=True)
        if good and bad and good[0] > bad[0] and good[0] >= 1.25 * max(bad[0], 1):
            hits.append(("CHOICE-LENGTH", m.group(1), f"correct {good[0]} chars vs longest wrong {bad[0]}"))

    blocks = panels(page)
    for s, e, block in blocks:
        t = text_of(re.sub(r"<script\b.*?</script>", "", block, flags=re.S))
        no = panel_no(block)
        # LEFT-RIGHT
        for w in re.finditer(r"(?i)\b(on the (?:left|right)|left:|right:|the (?:left|right)(?:-hand)? (?:one|card|program|file|run|side|column))", t):
            hits.append(("LEFT-RIGHT", f"panel {no}", t[max(0, w.start() - 50):w.end() + 30].replace("\n", " ").strip()))
        # NONDET
        used = set(re.findall(r'data-program="([^"]+)"', block)) | set(re.findall(r'"program":\s*"([^"]+)"', block))
        for p in sorted(used):
            if progs.get(p, {}).get("nondeterministic") and "one possible run" not in t.lower():
                hits.append(("NONDET", f"panel {no}", f"{p} is nondeterministic; the panel never says \"one possible run\""))
        # LAST-LINE
        if folder == "javascript" and re.search(r"(?i)last line first", t):
            hits.append(("LAST-LINE", f"panel {no}", "says 'last line first'"))
        if folder == "rust" and "E0412" in t:
            hits.append(("RUST-E0412", f"panel {no}", "mentions E0412"))

    # CODE-IN-TITLE: Bangers (the title font) has capitals only, so code written in a heading without <code> shows the
    # wrong case (`upper()` reads as UPPER()). Look in headings and recap titles for code-like text outside <code>.
    for m in re.finditer(r'<(h[1-4]|b)\b[^>]*>(.*?)</\1>', page, re.S):
        inner = re.sub(r"<code\b.*?</code>", "", m.group(2), flags=re.S)
        txt = text_of(inner)
        if re.search(r"[A-Za-z_]\w*\(\)|\.[a-z_]\w*\(|\{\w+[=!:]|[a-z]\w*::\w+", txt):
            ctx = page[max(0, m.start() - 400):m.start()]
            if m.group(1) != "b" or re.search(r'class="[^"]*\b(recap|duo-card|boss|part-h|kicker)', ctx):
                hits.append(("CODE-IN-TITLE", m.group(1), txt.strip()[:90]))

    # PARSONS-PIN
    for m in re.finditer(r'data-ex="parsons"[^>]*data-model="([^"]+)"', page):
        try:
            mod = json.loads(models.get(m.group(1), "{}"))
        except json.JSONDecodeError:
            continue
        src = progs.get(mod.get("program", ""), {}).get("src", "")
        head = [l for l in src.splitlines() if l.strip()][:3]
        if not mod.get("pin") and sum(bool(re.match(r"\s*(import|from \S+ import|package|#include|use |using )", l)) for l in head) >= 2:
            hits.append(("PARSONS-PIN", m.group(1), "first lines are imports/includes and nothing is pinned"))

    # HIDDEN-CMD and TRUNCATED, from the program folders
    pdir = Path(f"/home/you/{folder}-ch{ch}")
    for cmd in sorted(pdir.glob("*.cmd")) if pdir.is_dir() else []:
        try:
            spec = json.loads(cmd.read_text())
        except json.JSONDecodeError:
            hits.append(("HIDDEN-CMD", cmd.name, "the .cmd file is not valid JSON"))
            continue
        for st in spec.get("steps", []):
            shown, real = re.sub(r"\s+", " ", st[0]).strip(), re.sub(r"\s+", " ", st[1]).strip()
            if shown == real:
                continue
            # Output-changing extras in the real command that the reader can't see break the house rule (REWRITE).
            # Setup around an otherwise identical command (staging files, cd, a wrapper that runs exactly the shown
            # command) only needs an on-page "how this run was made" note (SETUP).
            extra = real.replace(shown, " ") if shown in real else real
            if re.search(r"\|\s*(sed|tr|awk|grep|sort|head|tail|cut)\b|PIPESTATUS|;\s*exit\b|2>&1", extra) and not re.search(r"\|\s*(sed|tr|awk|grep|sort|head|tail|cut)\b", shown + " "):
                hits.append(("HIDDEN-REWRITE", cmd.name, f"shown `{st[0][:70]}` but ran `{st[1][:120]}`"))
            elif "PIPESTATUS" in real and "PIPESTATUS" not in shown:
                hits.append(("HIDDEN-REWRITE", cmd.name, f"shown `{st[0][:70]}` relies on a hidden PIPESTATUS exit"))
            else:
                hits.append(("HIDDEN-SETUP", cmd.name, f"shown `{st[0][:70]}` but ran `{st[1][:120]}`"))
        prog = next((k for k in progs if Path(k).stem == cmd.stem), None)
        if prog and not spec.get("session") and len(progs[prog].get("steps", [])) < len(spec.get("steps", [])):
            rec_n = len(progs[prog].get("steps", []))
            hits.append(("TRUNCATED", cmd.name, f"{len(spec['steps'])} steps in the .cmd, {rec_n} recorded"))
    return hits


def main():
    import signal
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)   # `| head` must not print a traceback
    pages = sys.argv[1:]
    if not pages:
        sys.exit(__doc__)
    for rel in pages:
        hits = audit(rel)
        kinds = {}
        for k, _, _ in hits:
            kinds[k] = kinds.get(k, 0) + 1
        print(f"== {rel}: " + (", ".join(f"{k} {v}" for k, v in sorted(kinds.items())) or "no leads"))
        for k, where, what in hits:
            print(f"  {k:<14} {where:<22} {what}")


if __name__ == "__main__":
    main()
