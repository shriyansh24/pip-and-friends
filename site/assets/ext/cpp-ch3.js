/* C++ book, chapter 3 extension: "Boxes and Odometers".
   Adds (everything it shows about output is read from the captured runs in data/cpp-ch3.js, never typed):
     (the Sanitizer, who appears beside every sanitizer report, now comes from comic-critters.js)
     - [data-sizes="prog.cpp"]  byte bars: one square per byte for each "name: N" line of a real sizeof run
     - [data-odo="MODEL_ID"]    the int odometer: digit wheels you can click upward. Its top value is read from the
       real limits.cpp run; pushing past it shows the real UBSan report from overflow.cpp instead of a number.
       Model: { "program": "limits.cpp", "prefix": "biggest int: ", "report": "overflow.cpp", "start": 2147483000 } */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] cpp-ch3.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc;

  /* ---------------- byte bars from a real sizeof run ---------------- */
  function mountSizes(box) {
    var prog = L.program(box.getAttribute("data-sizes")); if (!prog) return;
    var rows = L.shown(prog).replace(/\n$/, "").split("\n").map(function (l) { var m = /^(.+): (\d+)$/.exec(l); return m ? { name: m[1], n: +m[2] } : null; });
    var ok = rows.length > 0 && rows.every(Boolean);
    var list = box.querySelector(".bytes-list"), par = box.querySelector(".parity");
    if (!ok) { L.report("sizes", "could not read 'name: N' lines from " + box.getAttribute("data-sizes")); }
    else list.innerHTML = rows.map(function (r) {
      var cells = ""; for (var i = 0; i < r.n; i++) cells += '<span class="byte" aria-hidden="true"></span>';
      return '<li><code>' + esc(r.name) + '</code><span class="cells">' + cells + '</span><b>' + r.n + (r.n === 1 ? " byte" : " bytes") + "</b></li>";
    }).join("");
    if (par) { par.textContent = ok ? "Drawn from the real run" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
  }

  /* ---------------- the int odometer ---------------- */
  function group(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function mountOdo(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-odo")).textContent);
    var lim = L.program(m.program), rep = L.program(m.report); if (!lim || !rep) return;
    var line = L.shown(lim).split("\n").filter(function (l) { return l.indexOf(m.prefix) === 0; })[0] || "";
    var top = parseInt(line.slice(m.prefix.length), 10);
    var errLine = (rep.stderr.split("\n").filter(function (l) { return l.indexOf("runtime error:") >= 0; })[0] || "");
    var ok = isFinite(top) && top > 0 && errLine.indexOf(top + " + 1") >= 0;
    if (!ok) L.report("odometer", "top value or sanitizer report not found in the captures");
    var par = box.querySelector(".parity");
    if (par) { par.textContent = ok ? "Top value and report match the real runs" : "Does not match the real run"; par.classList.toggle("bad", !ok); }
    if (!ok) return;
    var width = String(top).length, val = Math.min(m.start || 0, top);
    var wheels = box.querySelector(".odo-wheels"), readout = box.querySelector(".odo-read"), live = box.querySelector("[aria-live]");
    var zone = box.querySelector(".odo-zone"), zoneMsg = box.querySelector(".odo-zone pre");
    wheels.innerHTML = "";
    var cells = [];
    for (var i = 0; i < width; i++) {
      var w = document.createElement("span"); w.className = "odo-digit"; w.setAttribute("aria-hidden", "true");
      wheels.appendChild(w); cells.push(w);
      if ((width - 1 - i) % 3 === 0 && i < width - 1) { var c = document.createElement("span"); c.className = "odo-comma"; c.setAttribute("aria-hidden", "true"); c.textContent = ","; wheels.appendChild(c); }
    }
    box.querySelector(".odo-top").textContent = group(top);
    function draw(say, roll) {
      var s = String(val); while (s.length < width) s = "0" + s;
      for (var k = 0; k < width; k++) {
        if (cells[k].textContent !== s[k]) {
          cells[k].textContent = s[k];
          if (roll && L.motionOn()) { cells[k].classList.remove("roll"); void cells[k].offsetWidth; cells[k].classList.add("roll"); }
        }
      }
      var left = top - val;
      readout.innerHTML = "The box holds <b>" + group(val) + "</b>. Room left before the top: <b>" + group(left) + "</b>.";
      if (say && live) live.textContent = say;
    }
    function add(n) {
      if (val + n > top) {
        zone.hidden = false;
        zoneMsg.textContent = errLine;
        box.classList.add("odo-stop");
        if (live) live.textContent = "Forbidden territory. Adding " + group(n) + " to " + group(val) + " would go past the top, " + group(top) + ". The real sanitizer report says: " + errLine;
        return;
      }
      zone.hidden = true; box.classList.remove("odo-stop");
      val += n; draw("The box now holds " + group(val) + ".", true);
    }
    var btns = box.querySelectorAll("[data-odo-add]");
    for (var b = 0; b < btns.length; b++) (function (btn) { btn.addEventListener("click", function () { add(parseInt(btn.getAttribute("data-odo-add"), 10)); }); })(btns[b]);
    box.querySelector("[data-odo-jump]").addEventListener("click", function () { val = top - 3; zone.hidden = true; box.classList.remove("odo-stop"); draw("Jumped near the top: the box holds " + group(val) + ".", true); });
    box.querySelector("[data-odo-zero]").addEventListener("click", function () { val = 0; zone.hidden = true; box.classList.remove("odo-stop"); draw("Back to zero.", true); });
    draw(null, false);
  }

  P.comic.ext(function () {
    var i, s = document.querySelectorAll("[data-sizes]"), o = document.querySelectorAll("[data-odo]");
    for (i = 0; i < s.length; i++) { try { mountSizes(s[i]); } catch (e) { L.report("sizes", e.message); } }
    for (i = 0; i < o.length; i++) { try { mountOdo(o[i]); } catch (e) { L.report("odometer", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
