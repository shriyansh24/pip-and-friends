#!/usr/bin/env python3
"""Capture real program runs for one chapter and write the page's data file.

Why: every code sample, output, traceback, compiler message and exercise answer on a chapter page comes from a real run,
never from text typed by hand. Pages prove it with parity checks against this data.

Usage:
    python3 tools/capture.py <lang> <chapter>      lang = python | rust | go | cpp | javascript
    e.g. python3 tools/capture.py rust 3           runs /home/you/rust-ch3/*.rs, writes data/rs-ch3.js (+ .json)

Program files live in /home/you/<lang>-ch<N>/ (python: .py, rust: .rs, go: .go, cpp: .cpp, javascript: .js .mjs .html).
Per-program sidecars next to name.<ext> (all optional):
    name.stdin    keyboard input. The run step is executed twice: piped (clean stdout, used for parity) and in a
                  pseudo-terminal (`screen`: what a terminal shows, with typing echoed after each prompt).
    name.nondet   output legitimately varies run to run (thread order, HashMap/map order, set of strings). Recorded with
                  "nondeterministic": true; such a program must never be an exercise answer key.
    name.deps     rust only: lines placed under [dependencies] in the generated Cargo.toml (e.g. rand = "0.9").
    name.edition  rust only: edition for the generated project (default 2024), e.g. "2021" to show an edition difference.
    name.release  rust only: run with `cargo run -q --release` (e.g. to show overflow wrapping instead of panicking).
    name.abort    rust only: the program aborts (stack overflow, process::abort): run it under a PID-1 shell so the abort is real
                  (the main thread id then prints as 2, not 1).
    name.san      cpp only: compile with -fsanitize=address,undefined -fno-sanitize-recover=all (how this course shows undefined
                  behaviour: the program stops at the first report instead of printing a garbage value afterwards).
    name.tsan     cpp only: compile with -fsanitize=thread (data races; g++ only).
    name.flags    cpp only: extra compiler flags on one line, e.g. "-Wconversion -Wpedantic" (shown in the displayed command).
                  cpp unit tests: #include "doctest.h" (doctest 2.4.12, vendored at /home/you/vendor; -I is added automatically).
                  CMake 3.28 and Ninja are installed for build-system chapters (use a name.cmd).
    name.args     command-line arguments for the run step, one per line.
    name.actions.json  javascript .html only: list of browser actions, e.g. [{"click":"#go"},{"type":["#name","Ada"]},{"wait":200}].
    name.cmd      JSON escape hatch for multi-file projects / tool commands:
                  {"steps": [["display text", "shell command run in the program's folder", "~/optional/prompt/dir"], ...], "show": ["util.h"]}
                  The display text is what the page shows; keep it identical to the real command unless a wrapper is needed.
                  Add "session": true to run all steps in ONE shell (cd, variables and $? carry over, and each prompt shows
                  the real folder after the previous step). Without it, each step runs in a fresh shell in the program's folder.
                  Files in "show" are recorded source-only so pages can display them.

What each language runs (the page shows the display commands; wrappers below are hidden and documented in meta):
    python      python3 name.py                                     (CPython 3.15.2; secondary 3.13.18)
    rust        cargo run -q   in a generated project ~/rust-chN/name/ (Rust 1.99.1, edition 2024; secondary 1.97.0)
    go          go run name.go  (go1.27.3, chapter folder has go.mod "go 1.27"; secondary go1.24.7 builds with -modfile=.go124.mod, "go 1.24";
                in .cmd sessions every module go.mod is lowered to go 1.24 for the secondary run only, then restored;
                also for .cmd steps that stay in the chapter folder)
    cpp         g++ -std=c++23 -Wall -Wextra -g name.cpp -o name ; ./name   (g++ 13.3; secondary clang++ 18)
    javascript  node name.js   (Node 26.13.0 LTS, TZ=UTC, LANG=en_US.UTF-8; secondary Node 22.23.4)
                name.html      opened in headless Chromium; console.log -> stdout, console.error/warn and uncaught errors -> stderr
Determinism: rust/go/cpp run steps execute in a fresh PID namespace with address randomisation off
(`unshare -p -f --mount-proc setarch x86_64 -R`), so thread ids and sanitizer addresses are the same on every run. These are real
outputs, not edits: the main thread really is thread 1 inside that namespace.

Checks (the tool prints every problem, writes nothing, and exits non-zero; nothing is silently accepted):
    - each step finishes within its time limit (compile 180 s, run 10 s)
    - the primary toolchain gives identical output on two runs, unless name.nondet exists
    - the secondary toolchain's output is recorded under "alt" when it differs, and listed in meta.versionDifferences
"""
import json
import os
import pty
import re
import select
import shutil
import subprocess
import sys
import time
from datetime import date
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
RUN_TIMEOUT, COMPILE_TIMEOUT = 10, 180
ISOLATE = ["unshare", "-p", "-f", "--mount-proc", "setarch", "x86_64", "-R"]
# Inside the namespace the first process is PID 1, and PID 1 ignores signals such as SIGABRT. For C++ (and Rust programs
# with a name.abort sidecar) a small sh stays PID 1 and runs the program as its child, so abort() really kills it: exit 134
# and the shell's "Aborted" line, as in a normal terminal.
ISOLATE_SH = ["unshare", "-p", "-f", "--mount-proc", "/bin/sh", "-c", 'setarch x86_64 -R "$@"; exit $?', "sh"]
RUST_TC = "/root/.rustup/toolchains/1.99.1-x86_64-unknown-linux-gnu/bin"
RUST_TC2 = "/root/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin"
GO_TC = "/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/bin"
GO_TC2 = "/usr/local/go/bin"
NODE_TC, NODE_TC2 = "/opt/node26/bin", "/opt/node22/bin"


def base_env(extra=None):
    env = {"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/home/you", "LANG": "C.UTF-8", "LC_ALL": "C.UTF-8",
           "TERM": "dumb", "NO_COLOR": "1", "TZ": "UTC"}
    env.update(extra or {})
    return env


class Step:
    """One command the page shows. argv runs it; display is what the reader sees typed at the prompt."""
    def __init__(self, display, argv, cwd, run=False, timeout=None, shell=False, dirlabel=None):
        self.display, self.argv, self.cwd, self.run, self.shell, self.dirlabel = display, argv, cwd, run, shell, dirlabel
        self.timeout = timeout or (RUN_TIMEOUT if run else COMPILE_TIMEOUT)


def shown_args(a):
    """Arguments as the reader must type them: an argument with a space or a shell character gets quotes, so the shown
    command produces the same argv as the real run (js ch27 showed `--seat 12A Ada Lovelace` for ONE argument)."""
    import shlex
    return " ".join(shlex.quote(x) for x in a)


def args_of(f):
    a = f.with_suffix(".args")
    return [l for l in a.read_text().splitlines() if l.strip()] if a.exists() else []


def cmd_sidecar(f, env_extra, isolate, spec=None):
    """Steps from a name.cmd file: every command runs through bash in the program's folder.
    `spec` is the already-loaded (and possibly rewritten, e.g. g++ -> clang++ on the C++ secondary) .cmd; re-reading the
    file here lost that rewrite, so before 2026-11-08 non-session C++ .cmd builds still ran g++ on the "clang++" run
    (found by fix-cpp-ch28-29)."""
    if spec is None:
        spec = json.loads(f.with_suffix(".cmd").read_text())
    steps = []
    for i, st in enumerate(spec["steps"]):
        display, real = st[0], st[1]
        dirlabel = st[2] if len(st) > 2 else None          # optional: the folder the prompt shows, e.g. "~/go-ch1/hello"
        last = i == len(spec["steps"]) - 1
        argv = (ISOLATE if (isolate and last) else []) + ["bash", "-c", real]
        steps.append(Step(display, argv, f.parent, run=last, timeout=COMPILE_TIMEOUT if not last else RUN_TIMEOUT * 3, dirlabel=dirlabel))
    return steps, spec.get("show", [])


# ---------------- languages ----------------
def py_steps(f, tool):
    a = args_of(f)
    return [Step("python3 " + f.name + ("" if not a else " " + shown_args(a)), [tool, f.name] + a, f.parent, run=True)], []


def rust_steps(f, tool):
    stem = f.stem
    proj = f.parent / stem
    (proj / "src").mkdir(parents=True, exist_ok=True)
    deps = f.with_suffix(".deps").read_text() if f.with_suffix(".deps").exists() else ""
    edition = f.with_suffix(".edition").read_text().strip() if f.with_suffix(".edition").exists() else "2024"
    toml = f'[package]\nname = "{stem.replace("-", "_")}"\nversion = "0.1.0"\nedition = "{edition}"\n\n[dependencies]\n{deps}'
    if not (proj / "Cargo.toml").exists() or (proj / "Cargo.toml").read_text() != toml:
        (proj / "Cargo.toml").write_text(toml)
    shutil.copyfile(f, proj / "src" / "main.rs")
    a = args_of(f)
    rel = ["--release"] if f.with_suffix(".release").exists() else []
    disp = "cargo run -q" + (" --release" if rel else "") + ((" -- " + shown_args(a)) if a else "")
    iso = ISOLATE_SH if f.with_suffix(".abort").exists() else ISOLATE
    return [Step(disp, iso + [os.path.join(tool, "cargo"), "run", "-q"] + rel + (["--"] + a if a else []), proj, run=True,
                 timeout=COMPILE_TIMEOUT, dirlabel=f"~/{f.parent.name}/{stem}")], []


def go_steps(f, tool):
    gomod = f.parent / "go.mod"
    if not gomod.exists():
        gomod.write_text(f"module {f.parent.name.replace('-', '')}\n\ngo 1.27\n")
    a = args_of(f)
    # The chapter go.mod says "go 1.27", which the secondary Go 1.24.7 refuses outright (GOTOOLCHAIN=local), so every
    # secondary run used to record only "go.mod requires go >= 1.27". The secondary therefore builds against a sibling
    # module file that says "go 1.24": programs that need newer language or library features then fail with a real
    # compiler message, and everything else is a genuine second run. The displayed command stays "go run name.go".
    extra = []
    if tool == GO_TC2:
        alt = f.parent / ".go124.mod"
        want = f"module {f.parent.name.replace('-', '')}\n\ngo 1.24\n"
        if not alt.exists() or alt.read_text() != want:
            alt.write_text(want)
        extra = ["-modfile=" + alt.name]
    return [Step("go run " + f.name + ("" if not a else " " + shown_args(a)), ISOLATE + [os.path.join(tool, "go"), "run"] + extra + [f.name] + a,
                 f.parent, run=True, timeout=COMPILE_TIMEOUT)], []


def cpp_steps(f, tool):
    san, tsan = f.with_suffix(".san").exists(), f.with_suffix(".tsan").exists()
    flags = ["-std=c++23", "-Wall", "-Wextra", "-g"] + (["-fsanitize=address,undefined", "-fno-sanitize-recover=all", "-fno-omit-frame-pointer"] if san else []) \
        + (["-fsanitize=thread"] if tsan else []) + (["-I/home/you/vendor"] if "doctest.h" in f.read_text() else []) \
        + (f.with_suffix(".flags").read_text().split() if f.with_suffix(".flags").exists() else [])
    comp = os.path.basename(tool)
    a = args_of(f)
    return [Step(" ".join([comp] + flags + [f.name, "-o", f.stem]), [tool] + flags + [f.name, "-o", f.stem], f.parent),
            Step("./" + f.stem + ("" if not a else " " + shown_args(a)), ISOLATE_SH + ["./" + f.stem] + a, f.parent, run=True)], []


def js_steps(f, tool):
    if f.suffix == ".html":
        acts = f.with_name(f.stem + ".actions.json")
        argv = [os.path.join(NODE_TC, "node"), str(SITE / "tools" / "browser_capture.js"), str(f)] + ([str(acts)] if acts.exists() else [])
        return [Step("open " + f.name + " in a browser (console shown)", argv, f.parent, run=True, timeout=60)], []
    a = args_of(f)
    return [Step("node " + f.name + ("" if not a else " " + shown_args(a)), [os.path.join(tool, "node"), f.name] + a, f.parent, run=True)], []


LANGS = {
    "python": {"prefix": "py", "exts": [".py"], "steps": py_steps, "isolate": False,
               "primary": {"label": "CPython 3.15.2", "tool": "/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/bin/python3.15"},
               "secondary": {"label": "CPython 3.13.18", "tool": "/usr/local/bin/python3.13"},
               "env": lambda seed: {"PYTHONHASHSEED": str(seed), "PYTHONDONTWRITEBYTECODE": "1", "PYTHON_COLORS": "0"}},
    "rust": {"prefix": "rs", "exts": [".rs"], "steps": rust_steps, "isolate": True,
             "primary": {"label": "Rust 1.99.1 (edition 2024)", "tool": RUST_TC},
             "secondary": {"label": "Rust 1.97.0 (edition 2024)", "tool": RUST_TC2},
             "env": lambda seed: {"CARGO_HOME": "/root/.cargo", "RUSTUP_HOME": "/root/.rustup", "CARGO_TERM_COLOR": "never",
                                  "CARGO_TARGET_DIR": "/home/you/.target", "RUST_BACKTRACE": "0"}},
    "go": {"prefix": "go", "exts": [".go"], "steps": go_steps, "isolate": True,
           "primary": {"label": "Go 1.27.3", "tool": GO_TC},
           "secondary": {"label": "Go 1.24.7", "tool": GO_TC2},
           "env": lambda seed: {"GOPATH": "/root/go", "GOMODCACHE": "/root/go/pkg/mod", "GOCACHE": "/root/.cache/go-build",
                                "GOTOOLCHAIN": "local", "GOFLAGS": "-modcacherw", "CGO_ENABLED": "0"}},
    "cpp": {"prefix": "cpp", "exts": [".cpp"], "steps": cpp_steps, "isolate": True,
            "primary": {"label": "g++ 13.3 (-std=c++23)", "tool": "/usr/bin/g++"},
            "secondary": {"label": "clang++ 18.1 (-std=c++23)", "tool": "/usr/bin/clang++"},
            "env": lambda seed: {"ASAN_OPTIONS": "detect_leaks=1:color=never", "UBSAN_OPTIONS": "print_stacktrace=1:color=never"}},
    "javascript": {"prefix": "js", "exts": [".js", ".mjs", ".cjs", ".ts", ".html"], "steps": js_steps, "isolate": False,
                   "primary": {"label": "Node.js 26.13.0 LTS", "tool": NODE_TC},
                   "secondary": {"label": "Node.js 22.23.4", "tool": NODE_TC2},
                   "env": lambda seed: {"LANG": "en_US.UTF-8", "LC_ALL": "en_US.UTF-8", "NODE_DISABLE_COLORS": "1", "FORCE_COLOR": "0",
                                        "NODE_PATH": "/opt/npm-tools/node_modules", "PLAYWRIGHT_BROWSERS_PATH": os.environ.get("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")}},
}


def run_step(step, env, stdin_text):
    p = subprocess.run(step.argv, cwd=step.cwd, input=stdin_text or "", capture_output=True, text=True,
                       timeout=step.timeout, env=env)
    return {"out": p.stdout, "err": p.stderr, "exit": p.returncode}


def run_pty(argv, cwd, env, stdin_text, timeout):
    """Run in a pseudo-terminal and type each stdin line only after output goes quiet (i.e. at the prompt),
    so the transcript interleaves prompts and echoed input exactly as a terminal shows them."""
    lines = stdin_text.splitlines(keepends=True)
    pid, fd = pty.fork()
    if pid == 0:
        os.chdir(cwd)
        exe = shutil.which(argv[0], path=env["PATH"]) or argv[0]
        os.execve(exe, argv, env)
    out, deadline, quiet_since, status = b"", time.time() + timeout, time.time(), None
    # Type the next line only after the program has printed something new (its prompt) and then gone quiet.
    # A slow start (cargo building on a busy machine) therefore cannot make typing land before the prompt.
    # If a program reads without printing a prompt first, typing goes ahead after 5 s of waiting.
    need, waited_from = 1, time.time()
    while True:
        if time.time() > deadline:
            os.kill(pid, 9)
            raise TimeoutError(f"pty run exceeded {timeout}s")
        r, _, _ = select.select([fd], [], [], 0.05)
        if r:
            try:
                chunk = os.read(fd, 4096)
            except OSError:
                chunk = b""
            if chunk:
                out += chunk
                quiet_since = time.time()
                continue
        done, st = os.waitpid(pid, os.WNOHANG)
        if done:
            status = st
            try:
                while True:
                    r, _, _ = select.select([fd], [], [], 0.05)
                    if not r:
                        break
                    chunk = os.read(fd, 4096)
                    if not chunk:
                        break
                    out += chunk
            except OSError:
                pass
            break
        ready = len(out) >= need or time.time() - waited_from > 5
        if lines and ready and time.time() - quiet_since > 0.35:
            line = lines.pop(0).encode()
            os.write(fd, line)
            quiet_since = time.time()
            need, waited_from = len(out) + len(line) + 1, time.time()   # the echo of the line, plus at least one new byte
    os.close(fd)
    return out.decode("utf-8", "replace").replace("\r\n", "\n"), os.waitstatus_to_exitcode(status)


MARK = "\x1eSTEP\x1e"


def run_session(spec, f, env, isolate):
    """A .cmd with "session": true runs every step in ONE bash process, so cd, variables and $? carry from step to step
    as in a real terminal. Markers split stdout and stderr per step; the prompt folder after each step comes from pwd."""
    lines = []
    for st in spec["steps"]:
        # command and marker share one line, so bash's own "line N" in error messages equals the step number
        lines.append(st[1] + f'; __rc=$?; printf "{MARK}%s %s\\n" "$__rc" "$PWD"; printf "{MARK}\\n" >&2; (exit $__rc)')
    script = "\n".join(lines) + "\n"
    argv = (ISOLATE if isolate else []) + ["bash", "-c", script]
    p = subprocess.run(argv, cwd=f.parent, capture_output=True, text=True, timeout=COMPILE_TIMEOUT, env=env)
    outs, errs = p.stdout.split(MARK), p.stderr.split(MARK + "\n")
    rec, start_dir = [], str(f.parent)
    cwd = start_dir
    for i, st in enumerate(spec["steps"]):
        chunk = outs[i] if i < len(outs) else ""
        if i > 0:                                   # the chunk starts with the previous step's "rc pwd" line
            head, _, chunk = chunk.partition("\n")
        err = errs[i] if i < len(errs) else ""
        nxt = outs[i + 1] if i + 1 < len(outs) else ""
        rc_pwd = nxt.split("\n", 1)[0].split(" ", 1)
        rc = int(rc_pwd[0]) if rc_pwd and rc_pwd[0].lstrip("-").isdigit() else p.returncode
        label = st[2] if len(st) > 2 else cwd.replace("/home/you", "~", 1)
        rec.append({"cmd": st[0], "out": chunk, "err": err, "exit": rc, "dir": label})
        if len(rc_pwd) > 1:
            cwd = rc_pwd[1]
    return rec


GO_MOD_LINE = re.compile(r"^go\s+(\d+)\.(\d+)(?:\.\d+)?\s*$", re.M)
BAK_ROOT = Path("/home/you/.capture-bak")      # go.mod backups for the secondary run; outside every chapter folder


def go_mod_backup(folder, gm):
    return BAK_ROOT / folder.name / gm.relative_to(folder).parent / "go.mod"


def go_mods_for_secondary(folder):
    """Go .cmd sessions often build modules in subfolders whose go.mod (written by the real `go mod init` on 1.27.3) says
    "go 1.27.3", which Go 1.24.7 refuses outright, so the secondary comparison was empty. For the secondary run only,
    every go.mod under the chapter folder that asks for more than 1.24 is lowered to "go 1.24" (toolchain lines dropped),
    and restored right after. The backup is kept OUTSIDE the chapter folder, under BAK_ROOT/<chapter folder>/<path>/go.mod,
    so a captured `ls` never lists it (it once showed up as a false version difference, go ch16 ship.go). It exists only
    while the run lasts; restore_go_mods() puts any leftover back first, so a capture killed mid-run cannot leave a
    changed go.mod behind."""
    changed = []
    for gm in folder.rglob("go.mod"):
        if any(part.startswith(".") for part in gm.relative_to(folder).parts[:-1]):
            continue                                   # skip .proxy, module caches and other hidden helper folders
        txt = gm.read_text()
        m = GO_MOD_LINE.search(txt)
        ver = (int(m.group(1)), int(m.group(2))) if m else None
        # Only modules the primary toolchain itself accepts (go 1.25 .. 1.27) are lowered. A go.mod that asks for a
        # newer Go than the primary (e.g. "go 1.28" in a toolchain-gate demo) is left alone, so the comparison run
        # refuses it too instead of silently losing the point of the demo.
        if not ver or ver <= (1, 24) or ver > (1, 27):
            continue
        bak = go_mod_backup(folder, gm)
        bak.parent.mkdir(parents=True, exist_ok=True)
        if not atomic_write(bak, txt):
            print(f"capture: WARNING could not back up {gm}; leaving it unchanged for the secondary run", file=sys.stderr)
            continue
        new = GO_MOD_LINE.sub("go 1.24", txt, count=1)
        new = re.sub(r"^toolchain\s+\S+\s*\n?", "", new, flags=re.M)
        if atomic_write(gm, new):
            changed.append(gm)
    return changed


def atomic_write(path, text):
    """Write via a temp file + rename and read it back, so a full disk can never leave a half-written or empty file
    (a disk-full event once emptied a chapter's go.mod). Returns False, leaving the original intact, on any failure."""
    tmp = path.with_name(path.name + ".capture-tmp")
    try:
        tmp.write_text(text)
        if tmp.read_text() != text:
            raise OSError("read-back mismatch")
        os.replace(tmp, path)
        return True
    except OSError:
        try:
            tmp.unlink()
        except OSError:
            pass
        return False


def restore_go_mods(folder):
    # (backup, go.mod it belongs to): current location outside the folder, plus the old in-folder name from before the move
    pairs = [(b, folder / b.relative_to(BAK_ROOT / folder.name)) for b in (BAK_ROOT / folder.name).rglob("go.mod")]
    pairs += [(b, b.with_name("go.mod")) for b in folder.rglob("go.mod.capture-bak")]
    for bak, target in pairs:
        txt = bak.read_text()
        if not GO_MOD_LINE.search(txt):        # an empty or broken backup must never overwrite a go.mod
            print(f"capture: WARNING backup {bak} looks broken; go.mod left as is, please check it", file=sys.stderr)
            continue
        if atomic_write(target, txt):
            bak.unlink()
        else:
            print(f"capture: WARNING could not restore {target} from {bak}; fix by hand", file=sys.stderr)


def run_program(cfg, f, which, seed, stdin_text):
    tool = cfg[which]["tool"]
    env = base_env(cfg["env"](seed))
    if cfg["prefix"] == "rs":   # separate build caches per toolchain and chapter: no "Blocking waiting for file lock" between authors
        env["CARGO_TARGET_DIR"] = f"/home/you/.target/{which}/{f.parent.name}"
    if cfg["prefix"] in ("rs",):
        env["PATH"] = tool + ":" + env["PATH"]
        # cargo finds subcommands (cargo clippy, cargo fmt) in $CARGO_HOME/bin BEFORE $PATH, and those are rustup proxies
        # that pick the default toolchain (stable = the secondary). Pin the toolchain so every run uses the one intended.
        env["RUSTUP_TOOLCHAIN"] = os.path.basename(os.path.dirname(tool))
    if f.with_suffix(".cmd").exists():
        env["PATH"] = tool + ":" + env["PATH"] if os.path.isdir(tool) else os.path.dirname(tool) + ":" + env["PATH"]
        spec = json.loads(f.with_suffix(".cmd").read_text())
        # C++ .cmd steps name the compiler (`g++ ...`). Putting clang's folder first on PATH does not change a command
        # that says g++, so before 2026-11-08 the "clang++" comparison of every .cmd program silently re-ran g++ (found by
        # the cpp ch28 review: 154 of 189 .cmd files). On the secondary, the compiler word itself is swapped, in the
        # command that runs and in the one displayed, so the alt record shows what really ran.
        if cfg["prefix"] == "cpp" and which == "secondary":
            swap = lambda s: re.sub(r"(?<![\w.+-])g\+\+(?![\w.+-])", "clang++", s)
            spec["steps"] = [[swap(st[0]), swap(st[1])] + list(st[2:]) for st in spec["steps"]]
            if not any("clang++" in st[1] for st in spec["steps"]):
                print(f"capture: note {f.with_suffix('.cmd').name}: no g++ step to swap, so the secondary run uses the same commands", file=sys.stderr)
        # Go .cmd steps (go vet, go build ...) on the secondary toolchain get the same "go 1.24" module file as plain runs
        # (see go_steps). Only when no step changes folder: a step that cds into its own module keeps that module's go.mod.
        if cfg["prefix"] == "go" and which == "secondary" and not any(re.search(r"(^|[;&|]\s*)cd\s", st[1]) for st in spec["steps"]):
            alt = f.parent / ".go124.mod"
            want = f"module {f.parent.name.replace('-', '')}\n\ngo 1.24\n"
            if not alt.exists() or alt.read_text() != want:
                alt.write_text(want)
            env["GOFLAGS"] = (env.get("GOFLAGS", "") + " -modfile=" + str(alt)).strip()
        if spec.get("session"):
            rec = run_session(spec, f, env, cfg["isolate"])
            last = rec[-1]
            return ({"stdout": last["out"], "stderr": "".join(r["err"] for r in rec), "exit": last["exit"], "steps": rec},
                    [Step(st[0], ["true"], f.parent, run=(i == len(spec["steps"]) - 1)) for i, st in enumerate(spec["steps"])], env,
                    spec.get("show", []))
        steps, show = cmd_sidecar(f, None, cfg["isolate"], spec)
    else:
        steps, show = cfg["steps"](f, tool)
    rec, ran = [], []
    for st in steps:
        r = run_step(st, env, stdin_text if st.run else None)
        rec.append({"cmd": st.display, "out": r["out"], "err": r["err"], "exit": r["exit"], **({"dir": st.dirlabel} if st.dirlabel else {})})
        ran.append(st)
        if r["exit"] != 0 and not st.run:
            break                                     # a failed compile: the program never runs
    # A step that printed to BOTH streams is run once more with stderr merged into stdout, so the page can show the
    # real interleaving (e.g. compiler warnings before the program's output). Parity still uses the separate streams.
    for st, r in zip(ran, rec):
        if r["out"] and r["err"]:
            m = subprocess.run(st.argv, cwd=st.cwd, input=(stdin_text if st.run else None) or "", stdout=subprocess.PIPE,
                               stderr=subprocess.STDOUT, text=True, timeout=st.timeout, env=env)
            # The merged view comes from a SECOND run. For a step that changes state (a build tool that skips work the
            # first run already did: cpp ch17 `cmake --build`), that second run prints different lines, and the page would
            # show output that never happened next to the first run's streams. Keep it only if it holds exactly the
            # same lines as the two separate streams together; otherwise drop it and say why.
            # Compare with digit runs normalised: a re-run legitimately differs in per-run numbers such as a panicking
            # thread's id ("thread '<unnamed>' (56)" vs "(4)"); the engine matches lines the same way when it colours errors.
            norm = lambda t: sorted(re.sub(r"\d+", "#", l) for l in t.splitlines())
            if norm(m.stdout) == norm(r["out"] + r["err"]):
                r["merged"] = m.stdout
            else:
                r["mergedDropped"] = "the re-run for the merged view printed different lines (stateful step?)"
                print(f"capture: note {f.name}: step `{st.display}` gave different lines when re-run for the merged view; "
                      f"merged not recorded (make the step repeatable, e.g. clean first, if the page needs the interleaving)", file=sys.stderr)
    last = rec[-1]
    result = {"stdout": last["out"] if ran[-1].run else "", "stderr": "".join(s["err"] for s in rec), "exit": last["exit"]}
    if cfg["prefix"] != "py" or f.with_suffix(".cmd").exists() or f.with_suffix(".args").exists():   # Python .cmd/.args runs show their real commands too
        result["steps"] = rec
    return result, steps, env, show


def capture(lang, chapter):
    cfg = LANGS[lang]
    folder = Path(f"/home/you/{lang}-ch{chapter}")
    if not folder.is_dir():
        sys.exit(f"capture: no folder {folder}")
    files = sorted(p for p in folder.iterdir() if p.is_file() and p.suffix in cfg["exts"] and not p.name.endswith(".actions.json"))
    if not files:
        sys.exit(f"capture: no {' / '.join(cfg['exts'])} files in {folder}")
    programs, problems, diffs = {}, [], []
    for f in files:
        name = f.name
        nondet = f.with_suffix(".nondet").exists()
        stdin_text = f.with_suffix(".stdin").read_text() if f.with_suffix(".stdin").exists() else None
        try:
            a, steps, env, show = run_program(cfg, f, "primary", 1, stdin_text)
            b, _, _, _ = run_program(cfg, f, "primary", 2, stdin_text)
            if f.suffix == ".html" or (f.suffix == ".cpp" and (f.with_suffix(".san").exists() or f.with_suffix(".tsan").exists())):
                c = None                              # no second browser / no sanitizer runtime for clang here
            else:
                if cfg["prefix"] == "go" and f.with_suffix(".cmd").exists():
                    restore_go_mods(folder)
                    go_mods_for_secondary(folder)
                    try:
                        c, _, _, _ = run_program(cfg, f, "secondary", 1, stdin_text)
                    finally:
                        restore_go_mods(folder)
                else:
                    c, _, _, _ = run_program(cfg, f, "secondary", 1, stdin_text)
        except subprocess.TimeoutExpired as e:
            problems.append(f"{name}: timed out ({e.timeout}s) running: {' '.join(map(str, e.cmd))[:160]}")
            continue
        entry = {"src": f.read_text(), **a}
        if nondet:
            # Marked from the sidecar, not only when the two runs happened to differ: go ch24 had 4 of its 8 varying
            # programs unflagged because their two runs matched by chance.
            entry["nondeterministic"] = True
        if a != b:
            if not nondet:
                problems.append(f"{name}: output changes between two runs. Make it deterministic (sort, BTreeMap, join threads "
                                f"before printing...) or add {f.with_suffix('.nondet').name} and never use it as an answer.")
        if c is not None and c != a:
            entry["alt"] = {"version": cfg["secondary"]["label"], **c}
            # versionDifferences lists only real differences. The displayed command of a step differs by toolchain
            # name for C++ (g++ vs clang++), and that alone is not a difference in what the program did. "alt" is
            # still recorded so pages can show the secondary run.
            def same_but_cmd(x):
                y = dict(x)
                y["steps"] = [{k: v for k, v in st.items() if k != "cmd"} for st in x.get("steps", [])]
                return y
            if same_but_cmd(c) != same_but_cmd(a):
                diffs.append(name)
        if stdin_text is not None:
            entry["stdin"] = stdin_text
            run = [s for s in steps if s.run]
            ran_all = cfg["prefix"] == "py" or len(a.get("steps", [])) == len(steps)   # a failed compile never reaches the keyboard
            if run and ran_all:
                try:
                    screen, code = run_pty(run[-1].argv, run[-1].cwd, env, stdin_text, run[-1].timeout)
                except TimeoutError as e:
                    problems.append(f"{name}: {e}")
                    continue
                if code != a["exit"]:
                    problems.append(f"{name}: terminal run exit {code} != piped run exit {a['exit']}")
                entry["screen"] = screen
        programs[name] = entry
        for extra in show:
            p = f.parent / extra
            if p.exists():
                programs[extra] = {"src": p.read_text(), "stdout": "", "stderr": "", "exit": 0, "sourceOnly": True}
            else:
                problems.append(f"{name}: .cmd 'show' lists {extra}, which does not exist")
    meta = {
        "lang": lang,
        "capturedWith": [cfg["primary"]["label"], cfg["secondary"]["label"]],
        "primary": cfg["primary"]["label"],
        "date": date.today().isoformat(),
        "workdir": str(folder),
        "versionDifferences": diffs,
        "isolation": "run steps execute in a fresh PID namespace with ASLR off" if cfg["isolate"] else "none",
        "note": ("Every program was run with both toolchains. " +
                 ("Outputs were identical." if not diffs else
                  "These differ between versions (the page shows the primary run): " + ", ".join(diffs) + ".")),
    }
    if problems:
        for p in problems:
            print("capture: PROBLEM " + p, file=sys.stderr)
        sys.exit(f"capture: {len(problems)} problem(s); data file NOT written")
    data = {"meta": meta, "programs": programs}
    out_json = SITE / "data" / f"{cfg['prefix']}-ch{chapter}.json"
    out_js = SITE / "data" / f"{cfg['prefix']}-ch{chapter}.js"
    out_json.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n")
    out_js.write_text(
        f"/* Captured from real runs on {meta['date']} by tools/capture.py. Do not edit by hand; re-run the tool. */\n"
        "(function (root) {\n  \"use strict\";\n  root.POLYGLOT = root.POLYGLOT || {};\n"
        "  root.POLYGLOT.data = root.POLYGLOT.data || {};\n"
        f"  root.POLYGLOT.data.captures = {json.dumps(data, indent=1, ensure_ascii=False)};\n"
        "})(typeof globalThis !== \"undefined\" ? globalThis : this);\n")
    print(f"capture: {len(programs)} programs from {folder} -> {out_js.relative_to(SITE)}")
    for d in diffs:
        print(f"capture: NOTE {d} differs between {cfg['primary']['label']} and {cfg['secondary']['label']}")


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in LANGS or not sys.argv[2].isdigit():
        sys.exit("usage: capture.py <" + "|".join(LANGS) + "> <chapter-number>")
    # The fix round runs many agents on a 2-core machine. Captures (Rust and C++ builds especially) take a slot: at most
    # CAPTURE_SLOTS run at once; others wait their turn and say so. Two runs of the SAME chapter never overlap.
    import fcntl
    lockdir = Path("/tmp/comic-locks"); lockdir.mkdir(exist_ok=True)
    same = open(lockdir / f"capture-{sys.argv[1]}-{sys.argv[2]}.lock", "w")
    fcntl.flock(same, fcntl.LOCK_EX)
    slots, held, waited = int(os.environ.get("CAPTURE_SLOTS", "2")), None, False
    while held is None:
        for i in range(slots):
            fh = open(lockdir / f"capture-slot-{i}.lock", "w")
            try:
                fcntl.flock(fh, fcntl.LOCK_EX | fcntl.LOCK_NB)
                held = fh
                break
            except BlockingIOError:
                fh.close()
        if held is None:
            if not waited:
                print(f"capture: waiting for a free capture slot ({slots} in use)", file=sys.stderr)
                waited = True
            time.sleep(3)
    capture(sys.argv[1], int(sys.argv[2]))
