/* Chapter 13 extension: "Borrowing Toolboxes".
   The critters this page uses (pockets, sneak, fetch) come from comic-critters.js; second-version runs use the engine's
   data-alt. What is left here:
   (1) multi-command terminals [data-cmdrun="name.py"] for programs captured through a name.cmd sidecar (virtual
       environments, pip, running a file from a subfolder). Every command, its output and the folder the prompt shows
       come from the capture's recorded steps. On top of the engine's terminal, the prompt shows "(.venv) " while a
       virtual environment is active, as a real terminal does after `source .venv/bin/activate`. The real commands are
       read from the captured .cmd source (each .cmd lists itself in "show"); wherever one differs from the command
       shown, "How this run was really made" under the terminal says so.
       These terminals are filled when this script runs (deferred, so the page and the captures are already there),
       before the engine boots: the engine then gives `pre.term.wrap` its per-line blocks, as for any hand-written
       wrapping terminal.
   (2) [data-ver] tags naming the Python version above two terminals. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch13.js loaded before the engine"); return; }
  var L = P.comic.lib, esc = L.esc;

  function meta() { return (P.data && P.data.captures && P.data.captures.meta) || {}; }
  function home() { return String(meta().workdir || "/home/you").replace(/^\/home\/you/, "~"); }

  /* ---------------- multi-command terminals ---------------- */
  function mountCmd(el) {
    var name = el.getAttribute("data-cmdrun"), q = L.program(name), side = L.program(name.replace(/\.py$/, ".cmd"));
    if (!q) return;
    if (!side) { L.report("cmdrun:" + name, "no .cmd source in the captures (list the .cmd file in its own \"show\" array)"); return; }
    if (!q.steps) { L.report("cmdrun:" + name, "the capture has no recorded steps"); return; }
    var spec = JSON.parse(side.src), venv = false, html = "", diffs = [];
    if (spec.steps.length !== q.steps.length) L.report("cmdrun:" + name, "the .cmd has " + spec.steps.length + " steps but " + q.steps.length + " were recorded");
    q.steps.forEach(function (st, i) {
      var real = spec.steps[i] ? spec.steps[i][1] : st.cmd;
      if (spec.steps[i] && spec.steps[i][0] !== st.cmd) L.report("cmdrun:" + name, "step " + (i + 1) + " shows a different command from the .cmd");
      if (i) html += "\n";
      html += '<span class="prompt">' + (venv ? "(.venv) " : "") + "you@laptop:" + esc(st.dir || home()) + "$ </span>" + esc(st.cmd);
      if (real !== st.cmd) diffs.push([st.cmd, real]);
      if (st.out) html += "\n" + esc(st.out.replace(/\n$/, ""));
      if (st.err) html += "\n" + '<span class="err">' + esc(st.err.replace(/\n$/, "")) + "</span>";
      if (/^source \S*activate$/.test(st.cmd) && st.exit === 0) venv = true;
      if (st.cmd === "deactivate" && st.exit === 0) venv = false;
    });
    if (el.hasAttribute("data-exit")) html += '\n<span class="prompt">[exit code ' + q.exit + (q.exit === 0 ? ": success]" : ": failure]") + "</span>";
    el.innerHTML = html;
    if (diffs.length && !el.hasAttribute("data-no-behind")) {
      var d = document.createElement("details");
      d.className = "hint behind";
      d.innerHTML = "<summary>How this run was really made</summary><p>" +
        (spec.session ? "All these commands ran one after another in one shell, starting in <code>" : "This command ran in <code>") +
        esc(String(meta().workdir || "")) + "</code>. " + (diffs.length > 1 ? "Some commands" : "One command") + " really ran in a slightly longer form: " +
        diffs.map(function (p) { return "<code>" + esc(p[0]) + "</code> really ran as <code>" + esc(p[1]) + "</code>"; }).join("; ") +
        (diffs.some(function (p) { return /--clear/.test(p[1]); }) ? ". <code>--clear</code> empties a <code>.venv</code> left from an earlier run, so every rerun starts from a brand-new pantry, as yours will." : ".") +
        "</p>";
      el.parentNode.insertBefore(d, el.nextSibling);
    }
  }
  function initCmdTerms() {
    var els = document.querySelectorAll("[data-cmdrun]");
    for (var i = 0; i < els.length; i++) { try { mountCmd(els[i]); } catch (e) { L.report("cmdrun", e.message); } }
  }

  /* ---------------- version tags ---------------- */
  function initTags() {
    var m = meta(), tags = document.querySelectorAll("[data-ver]");
    for (var j = 0; j < tags.length; j++) {
      var which = tags[j].getAttribute("data-ver"), prog = tags[j].getAttribute("data-prog"), p = prog ? L.program(prog) : null;
      if (which === "alt") tags[j].textContent = p && p.alt ? p.alt.version : "?";
      else tags[j].textContent = m.primary || "?";
    }
  }

  initCmdTerms();
  P.comic.ext(initTags);
})(typeof globalThis !== "undefined" ? globalThis : this);
