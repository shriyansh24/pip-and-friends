/* Chapter 12 extension: "Boxes Inside Boxes".
   (1) The cast this chapter reuses (sealed, bag, jigsaw, taster, tumble, jangles, sneak) comes from comic-critters.js;
       the copies kept here were removed in engine pass 3.
   (2) the index-path walker [data-pathwalk]: nested data drawn as boxes inside boxes. Each step adds one bracket
       of a path such as school["pip"]["scores"][1] and lights the box that bracket opens.
       Parity: every value the walker shows is computed from the model's data, printed with Python's repr rules,
       and must be a whole line of the captured program's output. Every error it shows is computed with Python's
       rules (KeyError / TypeError / IndexError) and must appear in the captured stderr of that path's program.
       Keyboard: native buttons plus the engine's stepper keys. Text version: a transcript table. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] py-ch12.js loaded before the engine"); return; }
  var L = P.comic.lib, S = L.stroke, esc = L.esc, C = L.cast, INK = "#111111";

  /* ---------------- Python repr and indexing rules for the walker ---------------- */
  function isDict(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }
  function kindOf(v) { return Array.isArray(v) ? "list" : isDict(v) ? "dict" : typeof v === "string" ? "str" : typeof v === "boolean" ? "bool" : v === null ? "NoneType" : "int"; }
  function pyRepr(v) {
    if (v === null) return "None";
    if (v === true) return "True";
    if (v === false) return "False";
    if (typeof v === "string") return "'" + v + "'";
    if (typeof v === "number") return String(v);
    if (Array.isArray(v)) return "[" + v.map(pyRepr).join(", ") + "]";
    return "{" + Object.keys(v).map(function (k) { return "'" + k + "': " + pyRepr(v[k]); }).join(", ") + "}";
  }
  function bracket(k) { return typeof k === "string" ? '["' + k + '"]' : "[" + k + "]"; }
  /* One indexing step with Python's rules: returns {value} or {error}. */
  function index(cur, k) {
    if (isDict(cur)) return Object.prototype.hasOwnProperty.call(cur, String(k)) && typeof k === "string" ? { value: cur[k] } : { error: "KeyError: " + (typeof k === "string" ? "'" + k + "'" : String(k)) };
    if (Array.isArray(cur)) {
      if (typeof k !== "number") return { error: "TypeError: list indices must be integers or slices, not str" };
      var i = k < 0 ? k + cur.length : k;
      return i >= 0 && i < cur.length ? { value: cur[i] } : { error: "IndexError: list index out of range" };
    }
    if (typeof cur === "string") {
      if (typeof k !== "number") return { error: "TypeError: string indices must be integers, not 'str'" };
      var j = k < 0 ? k + cur.length : k;
      return j >= 0 && j < cur.length ? { value: cur[j] } : { error: "IndexError: string index out of range" };
    }
    return { error: "TypeError: '" + kindOf(cur) + "' object is not subscriptable" };
  }
  function pathId(keys) { return keys.map(function (k) { return (typeof k) + ":" + k; }).join("|"); }

  /* ---------------- drawing nested data as boxes ---------------- */
  function drawValue(v, keys, st) {
    var id = pathId(keys), on = st.onId === id, trail = st.trail[id];
    var badge = trail ? '<span class="pw-step" aria-hidden="true">' + trail + "</span>" : "";
    if (!Array.isArray(v) && !isDict(v)) {
      return '<span class="pw-val' + (on ? " on" : "") + (trail && !on ? " trail" : "") + '">' + badge + esc(pyRepr(v)) + (on ? '<span class="pw-here">◀ here</span>' : "") + "</span>";
    }
    var dict = isDict(v), parts = dict ? Object.keys(v) : v.map(function (_, i) { return i; });
    var cls = "pw-box " + (dict ? "pw-dict" : "pw-list") + (on ? " on" : "") + (trail && !on ? " trail" : "");
    var html = '<div class="' + cls + '">' + badge + '<span class="pw-tag">' + (dict ? "dict" : "list") + (on ? " · ◀ here" : "") + "</span>";
    html += '<div class="' + (dict ? "pw-rows" : "pw-cells") + '">';
    parts.forEach(function (k) {
      var child = keys.concat([k]), used = st.usedId === pathId(child);
      if (dict) html += '<div class="pw-row' + (used ? " used" : "") + '"><span class="pw-key">' + (used ? "▶ " : "") + esc('"' + k + '"') + "</span>" + drawValue(v[k], child, st) + "</div>";
      else html += '<div class="pw-cell' + (used ? " used" : "") + '">' + drawValue(v[k], child, st) + '<span class="pw-idx">' + (used ? "▲ " : "") + k + "</span></div>";
    });
    if (st.missAt === id) {
      html += dict ? '<div class="pw-row pw-miss"><span class="pw-key">' + esc(st.missLabel) + '</span><span class="pw-val">no drawer!</span></div>'
        : '<div class="pw-cell pw-miss"><span class="pw-val">?</span><span class="pw-idx">' + esc(st.missLabel) + "</span></div>";
    }
    return html + "</div></div>";
  }

  /* ---------------- the walker ---------------- */
  function mountWalker(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-pathwalk")).textContent);
    var main = L.program(m.program); if (!main) return;
    var mainLines = L.shown(main).replace(/\n$/, "").split("\n"), bad = 0;
    m.paths.forEach(function (p) {
      var cur = m.data, keys = [], steps = [{ keys: [], value: cur, expr: m.name }];
      for (var i = 0; i < p.keys.length; i++) {
        var r = index(cur, p.keys[i]);
        if (r.error) { steps.push({ keys: keys.slice(), miss: p.keys[i], error: r.error, expr: steps[steps.length - 1].expr + bracket(p.keys[i]) }); break; }
        cur = r.value; keys.push(p.keys[i]);
        steps.push({ keys: keys.slice(), value: cur, expr: m.name + keys.map(bracket).join("") });
      }
      p._steps = steps;
      p._label = m.name + p.keys.map(bracket).join("");
      steps.forEach(function (s, si) {
        if (s.error) {
          var q = L.program(p.program || m.program);
          s.ok = !!q && q.stderr.indexOf(s.error) >= 0;
          if (!s.ok) { bad++; L.report("pathwalk:" + p._label, "step " + (si + 1) + ": " + s.error + " is not in the captured stderr of " + (p.program || m.program)); }
        } else {
          s.line = mainLines.indexOf(pyRepr(s.value));
          s.ok = s.line >= 0;
          if (!s.ok) { bad++; L.report("pathwalk:" + p._label, "step " + (si + 1) + ": " + pyRepr(s.value) + " is not a line of " + m.program); }
        }
      });
      if (p.error && !steps[steps.length - 1].error) { bad++; L.report("pathwalk:" + p._label, "expected an error, but every step worked"); }
      if ((p.notes || []).length !== steps.length) { bad++; L.report("pathwalk:" + p._label, "has " + steps.length + " steps but " + (p.notes || []).length + " notes"); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? bad + " step(s) do not match the real runs" : "Every value and error matches a real run"; par.classList.toggle("bad", !!bad); }

    var chips = box.querySelector(".paths"), stage = box.querySelector(".pw-stage"), exprEl = box.querySelector(".pw-expr"), gives = box.querySelector(".pw-gives");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), tb = box.querySelector(".transcript tbody");
    chips.insertAdjacentHTML("beforeend", m.paths.map(function (p, k) {
      return '<button type="button" class="path-btn' + (p._steps[p._steps.length - 1].error ? " bug" : "") + '" aria-pressed="false" data-k="' + k + '"><code>' + esc(p._label) + "</code></button>";
    }).join(""));
    var cur = m.paths[0], run = null;
    function render(st, announce) {
      var s = cur._steps[st.step], trail = {};
      for (var i = 0; i < s.keys.length; i++) trail[pathId(s.keys.slice(0, i))] = i + 1;
      var view = { onId: s.error ? null : pathId(s.keys), trail: trail, usedId: s.keys.length ? pathId(s.keys) : null, missAt: null, missLabel: "" };
      if (s.error) { view.trail[pathId(s.keys)] = s.keys.length + 1; view.missAt = pathId(s.keys); view.missLabel = typeof s.miss === "string" ? '"' + s.miss + '"' : String(s.miss); view.usedId = null; }
      stage.innerHTML = '<div class="pw-root"><span class="pw-name">' + esc(m.name) + "</span>" + drawValue(m.data, [], view) + "</div>";
      // the expression: brackets done so far in bold, the next one marked, the rest dotted
      var html = '<span class="pw-done">' + esc(m.name) + "</span>";
      cur.keys.forEach(function (k, i) {
        var n = i + 1, done = n <= s.keys.length, now = (s.error && n === s.keys.length + 1) || (!s.error && n === s.keys.length);
        html += '<span class="' + (now ? (s.error ? "pw-now err" : "pw-now") : done ? "pw-done" : "pw-todo") + '"' + (now ? " data-now" : "") + ">" + esc(bracket(k)) + "</span>";
      });
      exprEl.innerHTML = "<code>" + html + "</code>";
      gives.innerHTML = s.error ? '<b class="pw-err">Python stops:</b> <code class="pw-err">' + esc(s.error) + '</code> <span class="pw-real">✓ the real error from ' + esc(cur.program || m.program) + "</span>"
        : "<b><code>" + esc(s.expr) + "</code> hands back a " + kindOf(s.value) + ":</b> <code>" + esc(pyRepr(s.value)) + '</code> <span class="pw-real">✓ line ' + (s.line + 1) + " of the real output</span>";
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur._steps.length + "</span>" + (cur.notes[st.step] || "");
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + cur._steps.length + ". " + gives.textContent + " " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    function choose(k, announce) {
      cur = m.paths[k];
      var bs = chips.querySelectorAll(".path-btn");
      for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", String(j === k));
      if (!run) run = L.runner(box, cur._steps.length, render, { reserve: true });
      run.reset(cur._steps.length);
      if (tb) tb.innerHTML = cur._steps.map(function (s, i) {
        return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(s.expr) + "</code></td><td><code>" + esc(s.error || pyRepr(s.value)) + "</code></td><td>" + (cur.notes[i] || "") + "</td></tr>";
      }).join("");
      if (live && announce) live.textContent = "Path chosen: " + cur._label + ".";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) choose(Number(b.getAttribute("data-k")), true); });
    choose(0, false);
  }

  P.comic.ext(function () {
    var boxes = document.querySelectorAll("[data-pathwalk]");
    for (var i = 0; i < boxes.length; i++) { try { mountWalker(boxes[i]); } catch (e) { L.report("pathwalk", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
