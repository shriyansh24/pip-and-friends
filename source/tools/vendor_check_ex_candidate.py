#!/usr/bin/env python3
"""Fix-round helper (fix-cpp-ch25-27): run every fill alternative and parsons reorder for cpp chapters.

    python3 check_ex.py fill 25 26 27        each accept / set substituted, compiled with g++, output compared
    python3 check_ex.py parsons 25           every "move one unpinned line elsewhere" order compiled and compared
    python3 check_ex.py order 25 ex-psq-m 1,2,3,...   run one explicit order (1-based source lines)

Runs in a scratch copy of /home/you/cpp-chN so programs that touch files never change the real folder.
"""
import json, re, shutil, subprocess, sys, os, itertools
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

SITE = Path("/home/claude/comic-site")
SCR = Path(__file__).resolve().parent / "work"
FLAGS = ["-std=c++23", "-Wall", "-Wextra", "-g"]


def models(n):
    page = (SITE / f"cpp/ch{n}.html").read_text()
    ms = dict(re.findall(r'<script type="application/json" id="([^"]+)">(.*?)</script>', page, re.S))
    return [(k, mid, json.loads(ms[mid])) for k, mid in re.findall(r'data-ex="(\w+)" data-model="([^"]+)"', page)]


def data(n):
    return json.loads((SITE / f"data/cpp-ch{n}.json").read_text())["programs"]


def workdir(n):
    w = SCR / f"ch{n}"
    if not w.exists():
        shutil.copytree(f"/home/you/cpp-ch{n}", w, symlinks=True)
    return w


def run_src(n, prog, src, tag):
    """Compile src as if it were prog (same flags as capture, plus .flags/.san) and run it; return (ok_compile, out, exit, err)."""
    w = workdir(n)
    stem = Path(prog).stem
    f = w / f"{stem}__{tag}.cpp"
    f.write_text(src)
    exe = w / f"{stem}__{tag}"
    extra = []
    real = Path(f"/home/you/cpp-ch{n}") / prog
    if real.with_suffix(".flags").exists():
        extra += real.with_suffix(".flags").read_text().split()
    if real.with_suffix(".san").exists():
        extra += ["-fsanitize=address,undefined", "-fno-sanitize-recover=all", "-fno-omit-frame-pointer"]
    c = subprocess.run(["g++", *FLAGS, *extra, f.name, "-o", exe.name], cwd=w, capture_output=True, text=True, timeout=300,
                       env={"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/home/you", "LANG": "C.UTF-8", "LC_ALL": "C.UTF-8"})
    if c.returncode != 0:
        return False, "", c.returncode, c.stderr
    stdin = real.with_suffix(".stdin")
    r = subprocess.run(["./" + exe.name], cwd=w, capture_output=True, text=True, timeout=20,
                       input=stdin.read_text() if stdin.exists() else None,
                       env={"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/home/you", "LANG": "C.UTF-8", "LC_ALL": "C.UTF-8",
                            "ASAN_OPTIONS": "detect_leaks=1:color=never", "UBSAN_OPTIONS": "print_stacktrace=1:color=never"})
    f.unlink(); exe.unlink()
    return True, r.stdout, r.returncode, c.stderr + r.stderr


def fill(n):
    progs = data(n)
    jobs = []
    for kind, mid, m in models(n):
        if kind != "fill":
            continue
        p = progs[m["program"]]
        lines = p["src"].split("\n")
        def subst(vals):
            ls = lines[:]
            cuts = []
            for bi, b in enumerate(m["blanks"]):
                l = ls[b["line"] - 1]
                at = -1; frm = 0
                for _ in range(b.get("nth", 1)):
                    at = l.index(b["text"], frm); frm = at + len(b["text"])
                cuts.append((b["line"] - 1, at, len(b["text"]), vals[bi]))
            for li, at, ln, v in sorted(cuts, key=lambda c: (c[0], -c[1])):
                ls[li] = ls[li][:at] + v + ls[li][at + ln:]
            return "\n".join(ls)
        key = [b["text"] for b in m["blanks"]]
        cands = [("key", key)]
        for bi, b in enumerate(m["blanks"]):
            for a in b.get("accept") or []:
                v = key[:]; v[bi] = a; cands.append((f"blank{bi+1}={a!r}", v))
        for si, st in enumerate(m.get("sets") or []):
            cands.append((f"set{si+1}={st}", [str(x) for x in st]))
        for i, (label, vals) in enumerate(cands):
            jobs.append((mid, m["program"], label, subst(vals), p, f"{mid}{i}"))
    def go(j):
        mid, prog, label, src, p, tag = j
        ok, out, ex, err = run_src(n, prog, src, tag)
        same = ok and out == p["stdout"] and ex == p["exit"]
        return f"{'SAME' if same else 'DIFF'}  ch{n} {mid:16} {label}" + ("" if same else f"\n      compile={'ok' if ok else 'FAIL'} exit={ex} out={out[:200]!r}\n      err={err[-400:]!r}")
    with ThreadPoolExecutor(3) as ex:
        for r in ex.map(go, jobs):
            print(r, flush=True)


def orders_for(m, src_lines):
    """Every order made by moving one unpinned, non-blank line to another unpinned position (blank and pinned lines stay put)."""
    n = len(src_lines)
    if src_lines and src_lines[-1] == "":
        n -= 1
    pin = set(m.get("pin") or [])
    movable = [i + 1 for i in range(n) if (i + 1) not in pin and src_lines[i].strip()]
    base = movable[:]
    seen = set()
    for a in range(len(base)):
        for b in range(len(base)):
            if a == b:
                continue
            seq = base[:]
            x = seq.pop(a); seq.insert(b, x)
            t = tuple(seq)
            if t in seen:
                continue
            seen.add(t)
            order = []
            it = iter(seq)
            for i in range(1, n + 1):
                order.append(next(it) if i in base else i)
            yield order


def parsons(n, only=None):
    progs = data(n)
    for kind, mid, m in models(n):
        if kind != "parsons" or (only and mid != only):
            continue
        p = progs[m["program"]]
        sl = p["src"].split("\n")
        jobs = list(orders_for(m, sl))
        print(f"== ch{n} {mid} {m['program']}: {len(jobs)} orders to try", flush=True)
        def go(ji):
            i, order = ji
            src = "\n".join(sl[k - 1] for k in order) + "\n"
            ok, out, ex, err = run_src(n, m["program"], src, f"{mid}p{i}")
            return order, ok, out == p["stdout"] and ex == p["exit"]
        with ThreadPoolExecutor(3) as ex:
            for order, ok, same in ex.map(go, enumerate(jobs)):
                if same:
                    print(f"  WORKS  {order}", flush=True)
        print(f"  done {mid}", flush=True)


if __name__ == "__main__":
    what = sys.argv[1]
    if what == "fill":
        for n in sys.argv[2:]:
            fill(int(n))
    elif what == "parsons":
        n = int(sys.argv[2]); parsons(n, sys.argv[3] if len(sys.argv) > 3 else None)
    elif what == "order":
        n, mid, order = int(sys.argv[2]), sys.argv[3], [int(x) for x in sys.argv[4].split(",")]
        m = [x for x in models(n) if x[1] == mid][0][2]
        p = data(n)[m["program"]]; sl = p["src"].split("\n")
        ok, out, ex, err = run_src(n, m["program"], "\n".join(sl[k - 1] for k in order) + "\n", "manual")
        print(ok, ex, repr(out), out == p["stdout"])
