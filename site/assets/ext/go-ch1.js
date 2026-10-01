/* Go book, chapter 1 additions (classic deferred script; loads after comic-cast.js).
   [data-chat]: the terminal as a text-message chat. Every message and reply is read from the captured session steps;
   the rooms picture (folders and files) is checked against the real `ls` replies and shows a parity badge.
   (The engine now draws Scoot in walkers and maps, says "Real run", highlights multi-line comments, and takes each
   prompt's folder from the capture, so this file no longer does any of that.) */
(function (root) {
  "use strict";
  var P = root.POLYGLOT, L = P && P.comic && P.comic.lib;
  if (!L) { if (root.console) root.console.error("[POLYGLOT.comic] go-ch1.js loaded before comic.js"); return; }
  var esc = L.esc, NS = "http://www.w3.org/2000/svg";

  function scootSvg(mood, mouth, arms) {
    var tmp = document.createElementNS(NS, "svg");
    tmp.setAttribute("data-mood", mood || "happy"); tmp.setAttribute("data-mouth", mouth || "smile"); tmp.setAttribute("data-arms", arms || "point");
    return L.cast.courier.draw(tmp);
  }

  function sv(tag, a, parent) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (parent) parent.appendChild(n); return n; }
  function mountChat(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-chat")).textContent);
    var beats = m.beats.map(function (b) {
      var p = L.program(b.program), st = p && p.steps && p.steps[b.step];
      if (!st) { L.report("chat", "no step " + b.step + " in " + b.program); st = { cmd: "?", out: "", err: "", exit: 1 }; }
      return { b: b, st: st };
    });
    // Parity: every `ls` reply must list exactly the files the rooms picture shows for that moment.
    var bad = 0;
    beats.forEach(function (x) {
      if (x.st.cmd !== "ls") return;
      var real = (x.st.out || "").trim().split(/\s+/).filter(Boolean).sort().join(" "), drawn = (x.b.files || []).slice().sort().join(" ");
      if (real !== drawn) { bad++; L.report("chat", "rooms picture shows [" + drawn + "] but ls printed [" + real + "]"); }
    });
    var par = box.querySelector(".parity");
    if (par) { par.textContent = bad ? "The picture does not match the real run" : "Every reply and every file matches the real run"; par.classList.toggle("bad", !!bad); }

    var log = box.querySelector(".chat-log"), pic = box.querySelector(".rooms-svg"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    pic.setAttribute("viewBox", "0 0 300 230");
    // house: the home folder ~ ; inside it, the hello folder
    sv("path", { d: "M14 78 L150 12 L286 78", "class": "rm-roof" }, pic);
    sv("rect", { x: 22, y: 76, width: 256, height: 148, rx: 6, "class": "rm-home" }, pic);
    var tHome = sv("text", { x: 34, y: 100, "class": "rm-label" }, pic); tHome.textContent = "~  (home folder)";
    var room = sv("rect", { x: 124, y: 108, width: 144, height: 110, rx: 6, "class": "rm-room" }, pic);
    var tRoom = sv("text", { x: 134, y: 129, "class": "rm-label" }, pic); tRoom.textContent = "hello";
    var filesG = sv("g", {}, pic);
    // Scoot stands at home (x 52) or in hello (x 210); the walk is a transform on this group, eased by the CSS
    var walk = sv("g", { "class": "rm-walk" }, pic);
    var you = sv("svg", { x: 52, y: 146, width: 46, height: 62, viewBox: L.cast.courier.vb }, walk);
    you.innerHTML = scootSvg("happy", "smile", "wave");

    function render(st, announce) {
      var cur = beats[st.step], b = cur.b;
      // chat log: every message so far, newest last
      log.innerHTML = beats.slice(0, st.step + 1).map(function (x, i) {
        var reply = (x.st.out || "") + (x.st.err || "");
        var errCls = x.st.exit !== 0 ? " bad" : x.st.err ? " info" : "";
        return '<li class="msg-me' + (i === st.step ? " now" : "") + '"><span class="msg-dir">' + esc(x.b.dir) + "$</span><code>" + esc(x.st.cmd) + "</code></li>" +
          '<li class="msg-pc' + errCls + (i === st.step ? " now" : "") + '">' + (reply ? "<pre>" + esc(reply.replace(/\n$/, "")) + "</pre>" : '<em>(no reply: silence means it worked)</em>') +
          (x.st.exit !== 0 ? '<small>✗ exit code ' + x.st.exit + "</small>" : "") + "</li>";
      }).join("");
      log.scrollTop = log.scrollHeight;
      // rooms picture
      room.setAttribute("class", "rm-room" + (b.hello ? "" : " ghost"));
      tRoom.textContent = b.hello ? "hello" : "(no hello yet)";
      filesG.innerHTML = "";
      (b.files || []).forEach(function (f, i) {
        var x = 134, y = 140 + i * 26;
        sv("rect", { x: x, y: y, width: 66, height: 21, rx: 3, "class": "rm-file" + (/\.go$|\.mod$/.test(f) ? "" : " bin") }, filesG);
        var t = sv("text", { x: x + 33, y: y + 15, "text-anchor": "middle", "class": "rm-fname" }, filesG); t.textContent = f;
      });
      var inHello = (b.at || b.dir) === "~/hello";
      walk.style.transform = inHello ? "translate(158px, 0px)" : "translate(0px, 0px)";
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + beats.length + "</span>" + b.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + ". You type " + cur.st.cmd + " in " + b.dir + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = beats.map(function (x, i) {
      var reply = ((x.st.out || "") + (x.st.err || "")).replace(/\n$/, "");
      return "<tr><td>" + (i + 1) + "</td><td><code>" + esc(x.b.dir) + "</code></td><td><code>" + esc(x.st.cmd) + "</code></td><td>" + (reply ? "<code>" + esc(reply).replace(/\n/g, "<br>") + "</code>" : "(no reply)") + "</td><td>" + x.b.note + "</td></tr>";
    }).join("");
    // reserve: the chat log (data-reserve) and narration keep their tallest height, so the buttons never move
    var r = L.runner(box, beats.length, render, { reserve: true });
    r.reset(beats.length);
  }

  P.comic.ext(function () {
    var cs = document.querySelectorAll("[data-chat]");
    for (var i = 0; i < cs.length; i++) { try { mountChat(cs[i]); } catch (e) { L.report("chat", e.message); } }
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
