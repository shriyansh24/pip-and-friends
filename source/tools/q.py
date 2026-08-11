#!/usr/bin/env python3
"""Chapter queue bookkeeping for the build swarm. q.py next K | start LANG N | done LANG N | stat"""
import json, os, sys
# QUEUE=review selects tools/review_queue.json (the review swarm), QUEUE=fix tools/fix_queue.json (the fix swarm);
# default is the chapter queue.
P = "/home/claude/comic-site/tools/" + {"review": "review_queue.json", "fix": "fix_queue.json"}.get(os.environ.get("QUEUE", ""), "queue.json")
q = json.load(open(P))
def save(): json.dump(q, open(P, "w"), indent=1)
def order(e):  # interleave languages chapter by chapter; python continues from 11
    if e["lang"] in ("review", "fix"): return (0, e["n"])
    rank = {"rust": 0, "go": 1, "cpp": 2, "javascript": 3, "python": 4}
    n = e["n"] - 10 if e["lang"] == "python" else e["n"]
    return (n, rank[e["lang"]])
cmd = sys.argv[1]
if cmd == "next":
    for e in sorted([e for e in q if e["status"] == "queued"], key=order)[: int(sys.argv[2])]: print(e["lang"], e["n"])
elif cmd in ("start", "done"):
    for e in q:
        if e["lang"] == sys.argv[2] and e["n"] == int(sys.argv[3]): e["status"] = "running" if cmd == "start" else "done"
    save()
elif cmd == "stat":
    from collections import Counter
    print(Counter(e["status"] for e in q), {l: sum(1 for e in q if e["lang"] == l and e["status"] == "done") for l in ["python", "rust", "go", "cpp", "javascript", "review", "fix"]})
