#!/usr/bin/env python3
"""Fills {{OUT prog N}} placeholders in the ch10 template with the first N lines of a captured run's stdout
(N = all for every line), as a JSON array, and writes cpp/ch10.html. The page itself re-checks these against the
captures (walker/tracer parity), so this only saves hand-copying."""
import json
import re
from pathlib import Path

HERE = Path(__file__).parent
SITE = Path("/home/claude/comic-site")
caps = json.loads((SITE / "data/cpp-ch10.json").read_text())["programs"]
tpl = (HERE / "ch10.tpl.html").read_text()


def out(m):
    prog, n = m.group(1), m.group(2)
    p = caps[prog]
    text = p["screen"] if p.get("screen") is not None else p["stdout"]
    lines = text[:-1].split("\n") if text.endswith("\n") else text.split("\n")
    lines = lines if n == "all" else lines[: int(n)]
    return json.dumps(lines, ensure_ascii=False)


html = re.sub(r"\{\{OUT ([\w.]+) (\w+)\}\}", out, tpl)
left = re.findall(r"\{\{[^}]*\}\}", html)
if left:
    raise SystemExit(f"unfilled placeholders: {left}")
(SITE / "cpp/ch10.html").write_text(html)
print("wrote cpp/ch10.html", len(html.splitlines()), "lines")
