/* Pip & Python — comic runtime. Classic deferred script, one namespace (window.POLYGLOT.comic).
   Characters are drawn in SVG from code so every panel shows the same cast and every part can animate.
   Steppers and the map are teaching models; each checks its claims against captured CPython runs (parity).
   Pure functions (stepState, rng, starPoints, highlight) are exported for Node tests. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT = root.POLYGLOT || {};

  /* ---------- pure helpers ---------- */
  function stepState(state, action) {
    var last = state.total - 1;
    switch (action.type) {
      case "next": return { total: state.total, step: Math.min(state.step + 1, last), playing: state.step + 1 < last && state.playing };
      case "prev": return { total: state.total, step: Math.max(state.step - 1, 0), playing: false };
      case "reset": return { total: state.total, step: 0, playing: false };
      case "toggle-play": return { total: state.total, step: state.step === last ? 0 : state.step, playing: !state.playing };
      default: return state;
    }
  }
  function rng(seed) {
    var a = seed >>> 0;
    return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function starPoints(seed, n, cx, cy, ro, ri, sy) {
    var r = rng(seed), pts = [];
    for (var i = 0; i < n * 2; i++) {
      var ang = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      var rad = (i % 2 ? ri : ro) * (0.9 + r() * 0.2);
      pts.push((cx + Math.cos(ang) * rad).toFixed(1) + "," + (cy + Math.sin(ang) * rad * sy).toFixed(1));
    }
    return pts.join(" ");
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  /* Highlighter, one regex pass per language: strings, comments, numbers, keywords, built-ins. Anything it does not
     recognise stays plain text. Language: the explicit argument, else "html" for markup, else the chapter's captures meta. */
  function words(s) { var o = {}; s.split(" ").forEach(function (w) { o[w] = 1; }); return o; }
  var NUM = "\\b\\d[\\d_']*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[a-zA-Z0-9]*\\b";
  var CSTR = "\"(?:\\\\.|[^\"\\\\\\n])*\"?";
  var CCOM = "//[^\\n]*|/\\*[\\s\\S]*?(?:\\*/|(?![\\s\\S]))";   // an unclosed block comment runs to the end of the text, not the line
  var HL = {
    python: { str: "(?:[rRbBfFuU]{1,2}(?=[\"']))?\"\"\"[\\s\\S]*?(?:\"\"\"|(?![\\s\\S]))|(?:[rRbBfFuU]{1,2}(?=[\"']))?'''[\\s\\S]*?(?:'''|(?![\\s\\S]))|(?:[rRbBfFuU]{1,2}(?=[\"']))?\"(?:\\\\.|[^\"\\\\\\n])*\"?|(?:[rRbBfFuU]{1,2}(?=[\"']))?'(?:\\\\.|[^'\\\\\\n])*'?", com: "#[^\\n]*",
      kw: words("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case"),
      fn: words("print type int str len bool float input range list dict set tuple sorted sum min max abs round open enumerate zip isinstance repr reversed any all map filter") },
    // Raw strings end only at a quote followed by the same number of # as they opened with: r#"say "hi""# is one string.
    rust: { str: "b?r###\"[\\s\\S]*?\"###|b?r##\"[\\s\\S]*?\"##|b?r#\"[\\s\\S]*?\"#|b?r\"[^\"]*\"|b?" + CSTR + "|b?'(?:\\\\.|[^'\\\\\\n])'", com: CCOM,
      kw: words("as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type unsafe use where while"),
      fn: words("String Vec Option Some None Result Ok Err Box HashMap HashSet BTreeMap Rc Arc RefCell i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str"), macro: true },
    go: { str: CSTR + "|`[^`]*`?|'(?:\\\\.|[^'\\\\\\n])+'", com: CCOM,
      kw: words("break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var true false nil iota"),
      fn: words("fmt Println Printf Sprintf Print Errorf len cap append make new panic recover delete copy close string int int64 float64 error bool byte rune any") },
    cpp: { str: "R\"\\([\\s\\S]*?\\)\"|" + CSTR + "|'(?:\\\\.|[^'\\\\\\n])+'", com: CCOM + "|#\\s*\\w+(?:\\s*<[^>\\n]*>)?",
      kw: words("auto bool break case catch char class const constexpr consteval constinit continue default delete do double else enum explicit export extern false float for friend if inline int long mutable namespace new noexcept nullptr operator private protected public return short signed sizeof static static_cast struct switch template this throw true try typedef typename union unsigned using virtual void volatile while"),
      fn: words("std cout cin cerr endl string vector array map set unordered_map size_t main unique_ptr shared_ptr make_unique make_shared format optional getline move") , pre: true },
    javascript: { str: CSTR + "|'(?:\\\\.|[^'\\\\\\n])*'?|`(?:\\\\.|[^`\\\\])*`?", com: CCOM,
      kw: words("async await break case catch class const continue debugger default delete do else export extends false finally for function if import in instanceof let new null of return static super switch this throw true try typeof undefined var void while yield using"),
      fn: words("console log Math JSON Object Array Promise document window fetch setTimeout parseInt parseFloat Number String Boolean Map Set Error") },
    html: { str: "\"[^\"\\n]*\"?|'[^'\\n]*'?", com: "<!--[\\s\\S]*?(?:-->|(?![\\s\\S]))", tag: true, kw: {}, fn: {} }
  };
  var HLRE = {};
  /* Markup only when '<' starts a tag (<div, </p, <!doctype, <?xml) on a page whose language can hold markup
     (JavaScript, HTML, or no captures). A C++ line starting with "<< x" or a Rust "<T as Trait>::f()" keeps its language. */
  function hlLang(src, lang) {
    if (lang && HL[lang]) return lang;
    var m = P.data && P.data.captures && P.data.captures.meta && P.data.captures.meta.lang;
    if (/^\s*<[A-Za-z!\/?]/.test(src) && (!HL[m] || m === "javascript" || m === "html")) return "html";
    return HL[m] ? m : "python";
  }
  /* Rust block comments nest: an inner comment opened inside a comment needs its own close. Split the source into code and comment chunks with a small
     scanner that steps over strings, raw strings, char literals and // comments, so a "/*" inside them opens nothing.
     Code chunks go through the regex highlighter; comment chunks are drawn as comments one line at a time. */
  function rustChunks(src) {
    var out = [], i = 0, start = 0, n = src.length, raw;
    while (i < n) {
      var c = src[i], d = src[i + 1];
      if ((raw = /^b?r(#*)"/.exec(src.slice(i, i + 12))) && !/[A-Za-z0-9_]/.test(src[i - 1] || "")) {   // raw string
        var close = '"' + raw[1], end = src.indexOf(close, i + raw[0].length);
        i = end < 0 ? n : end + close.length; continue;
      }
      if (c === '"') { i++; while (i < n && src[i] !== '"') i += src[i] === "\\" ? 2 : 1; i++; continue; }
      if (c === "'" && /^'(?:\\.|[^'\\\n])'/.test(src.slice(i, i + 4))) { i += src[i + 1] === "\\" ? 4 : 3; continue; }   // char literal; a lifetime 'a has no closing quote
      if (c === "/" && d === "/") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "/" && d === "*") {
        if (i > start) out.push({ code: src.slice(start, i) });
        var depth = 0, j = i;
        while (j < n) {
          if (src[j] === "/" && src[j + 1] === "*") { depth++; j += 2; continue; }
          if (src[j] === "*" && src[j + 1] === "/") { depth--; j += 2; if (!depth) break; continue; }
          j++;
        }
        out.push({ com: src.slice(i, j) }); i = start = j; continue;
      }
      i++;
    }
    if (start < n) out.push({ code: src.slice(start) });
    return out;
  }
  function highlight(src, lang) {
    var L2 = hlLang(String(src), lang), cfg = HL[L2];
    if (L2 === "rust" && String(src).indexOf("/*") >= 0) {
      return rustChunks(String(src)).map(function (ch) {
        return ch.code != null ? highlightRe(ch.code, "rust") : ch.com.split("\n").map(function (l) { return l ? '<span class="tok-com">' + esc(l) + "</span>" : ""; }).join("\n");
      }).join("");
    }
    return highlightRe(src, L2);
  }
  function highlightRe(src, L2) {
    var cfg = HL[L2];
    var re = HLRE[L2] || (HLRE[L2] = new RegExp("(" + cfg.str + ")|(" + cfg.com + ")|(" + NUM + ")|(" + (cfg.tag ? "</?[A-Za-z][\\w-]*|/?>" : "[A-Za-z_][A-Za-z0-9_]*") + ")|([\\s\\S])", "gm"));
    re.lastIndex = 0;
    var out = "", m;
    while ((m = re.exec(src)) !== null) {
      if (m[1]) out += '<span class="tok-str">' + esc(m[1]) + "</span>";
      else if (m[2]) out += (cfg.pre && /^#/.test(m[2]) ? '<span class="tok-kw">' : '<span class="tok-com">') + esc(m[2]) + "</span>";
      else if (m[3]) out += '<span class="tok-num">' + esc(m[3]) + "</span>";
      else if (m[4]) {
        var w = m[4], isMacro = cfg.macro && src.charAt(re.lastIndex) === "!";
        // After a dot a word is an attribute, not a keyword: re.match, obj.type, x.case (Python soft keywords, JS obj.new).
        // Exception: Rust's postfix .await IS the keyword.
        var attr = !cfg.tag && src.charAt(m.index - 1) === "." && src.charAt(m.index - 2) !== "." && !(L2 === "rust" && w === "await");
        out += cfg.tag ? '<span class="tok-kw">' + esc(w) + "</span>" : (cfg.kw[w] && !attr) ? '<span class="tok-kw">' + w + "</span>" : (cfg.fn[w] || isMacro) ? '<span class="tok-fn">' + w + "</span>" : w;
      }
      else out += esc(m[5]);
    }
    return out;
  }

  /* ---------- environment ---------- */
  function report(where, msg) { if (root.console) root.console.error("[POLYGLOT.comic] widget=" + where + " error=" + msg); }
  var store = {
    get: function (k, d) { try { var v = root.localStorage.getItem("polyglot.v1.comic." + k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { root.localStorage.setItem("polyglot.v1.comic." + k, v); } catch (e) { /* storage unavailable: setting lasts for this page only */ } }
  };
  function reduced() { return !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches); }
  /* motionOn(): may scripts MOVE things (typing, replays, chapter animations)? Only when the toggle is on and the reader
     has not asked their system for reduced motion. CSS still gives reduced-motion readers short fades (comic.css). */
  function motionOn() { return document.documentElement.classList.contains("motion") && !reduced(); }
  /* What a terminal shows: the pseudo-terminal transcript for programs that read input, otherwise stdout. */
  function shown(q) { return q.screen != null ? q.screen : q.stdout; }
  function program(name) {
    var c = P.data && P.data.captures;
    if (!c || !c.programs[name]) { report("captures", "missing captured program " + name); return null; }
    return c.programs[name];
  }

  /* ---------- the cast ---------- */
  var INK = "#111111";
  function stroke(w) { return ' stroke="' + INK + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"'; }
  function eyes(mood) {
    switch (mood) {
      case "happy": return '<path d="M51 60 q7 -9 14 0 M75 60 q7 -9 14 0" fill="none"' + stroke(4.5) + "/>";
      case "surprised": return '<circle cx="58" cy="57" r="8" fill="#fff"' + stroke(3) + '/><circle cx="82" cy="57" r="8" fill="#fff"' + stroke(3) + '/><circle cx="58" cy="58" r="3.5" fill="' + INK + '"/><circle cx="82" cy="58" r="3.5" fill="' + INK + '"/><path d="M48 42 l14 -4 M78 38 l14 4" fill="none"' + stroke(3.5) + "/>";
      case "focus": return '<path d="M51 57 h13 M76 57 h13" fill="none"' + stroke(5) + '/><path d="M50 47 l14 3 M90 47 l-14 3" fill="none"' + stroke(3) + "/>";
      case "worried": return '<circle cx="58" cy="59" r="5" fill="' + INK + '"/><circle cx="82" cy="59" r="5" fill="' + INK + '"/><path d="M50 47 l13 -4 M90 47 l-13 -4" fill="none"' + stroke(3.5) + "/>";
      default: return '<circle cx="58" cy="58" r="5.5" fill="' + INK + '"/><circle cx="82" cy="58" r="5.5" fill="' + INK + '"/>';
    }
  }
  function mouth(m) {
    switch (m) {
      case "shout": return '<path d="M56 67 h28 q-2 15 -14 15 q-12 0 -14 -15 z" fill="' + INK + '"/><path d="M62 75 q8 5 16 0" fill="none" stroke="#FF5A4E" stroke-width="3"/>';
      case "o": return '<circle cx="70" cy="72" r="5.5" fill="' + INK + '"/>';
      case "flat": return '<path d="M60 72 h20" fill="none"' + stroke(4) + "/>";
      case "frown": return '<path d="M58 76 q12 -9 24 0" fill="none"' + stroke(4) + "/>";
      default: return '<path d="M57 69 q13 11 26 0" fill="none"' + stroke(4.5) + "/>";
    }
  }
  function arm(x1, y1, x2, y2, cls) {
    return '<g class="' + (cls || "") + '"><path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none"' + stroke(8) + '/><path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '" fill="none" stroke="#7FB2FF" stroke-width="3" stroke-linecap="round"/><circle cx="' + x2 + '" cy="' + y2 + '" r="8" fill="#fff"' + stroke(3) + "/></g>";
  }
  /* The guide of the current book: <html data-book="rust"> picks Mabel, and so on. Python (or no data-book) is Pip. */
  var GUIDES = { python: "pip", rust: "librarian", go: "courier", cpp: "mechanic", javascript: "stagehand" };
  function guide(o) {
    var book = document.documentElement.getAttribute("data-book") || "python", name = GUIDES[book] || "pip", c = CAST[name];
    if (name === "pip" || !c) return pip(o);
    var tmp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (o.mood) tmp.setAttribute("data-mood", o.mood);
    if (o.mouth) tmp.setAttribute("data-mouth", o.mouth);
    if (o.arms) tmp.setAttribute("data-arms", o.arms);
    return c.draw(tmp);
  }
  var GUIDE_NAMES = { python: "Pip", rust: "Mabel", go: "Scoot", cpp: "Wren", javascript: "Kit" };
  function guideName() { return GUIDE_NAMES[document.documentElement.getAttribute("data-book") || "python"] || "Pip"; }
  function guideViewBox() {
    var name = GUIDES[document.documentElement.getAttribute("data-book") || "python"] || "pip", c = CAST[name];
    return c ? (typeof c.vb === "function" ? c.vb(document.createElementNS("http://www.w3.org/2000/svg", "svg")) : c.vb) : "0 0 140 190";
  }
  function pip(o) {
    o = o || {};
    var arms = {
      down: arm(38, 112, 22, 142) + arm(102, 112, 118, 142),
      wave: arm(38, 112, 22, 142) + arm(102, 112, 126, 76, "wave"),
      point: arm(38, 112, 22, 142) + arm(102, 112, 138, 102),
      pointL: arm(38, 112, 2, 102) + arm(102, 112, 118, 142),
      cheer: arm(38, 112, 14, 78) + arm(102, 112, 126, 78),
      shrug: arm(38, 112, 10, 100) + arm(102, 112, 130, 100)
    }[o.arms || "down"];
    return '<g class="bob">' +
      '<path d="M70 26 V10" fill="none"' + stroke(4) + '/><circle cx="70" cy="9" r="7" fill="#FF5A4E"' + stroke(3) + "/>" +
      '<rect x="10" y="46" width="14" height="26" rx="5" fill="#FFD60A"' + stroke(3.5) + '/><rect x="116" y="46" width="14" height="26" rx="5" fill="#FFD60A"' + stroke(3.5) + "/>" +
      '<rect x="22" y="24" width="96" height="70" rx="18" fill="#7FB2FF"' + stroke(4) + "/>" +
      '<rect x="33" y="35" width="74" height="48" rx="12" fill="#fff"' + stroke(3) + "/>" +
      '<g class="eyes">' + eyes(o.mood) + "</g>" + mouth(o.mouth) +
      '<rect x="38" y="98" width="64" height="54" rx="14" fill="#FFD60A"' + stroke(4) + "/>" +
      '<text class="lbl-deco" x="70" y="132" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="19" fill="' + INK + '">&gt;_</text>' +   // decorative: hidden when it would be under 12px (fitLabels; never drawn on the walker or map token)
      arms +
      '<rect x="48" y="150" width="14" height="22" rx="5" fill="#7FB2FF"' + stroke(3.5) + '/><rect x="78" y="150" width="14" height="22" rx="5" fill="#7FB2FF"' + stroke(3.5) + "/>" +
      '<ellipse cx="54" cy="176" rx="14" ry="6.5" fill="' + INK + '"/><ellipse cx="86" cy="176" rx="14" ry="6.5" fill="' + INK + '"/>' +
      "</g>";
  }
  function chef() {
    return '<g class="bob">' +
      '<path d="M42 50 q-18 -2 -14 -20 q4 -16 22 -10 q6 -16 22 -12 q16 -2 20 12 q18 -6 22 10 q2 18 -16 20 z" fill="#fff"' + stroke(4) + '/><rect x="44" y="44" width="54" height="16" fill="#fff"' + stroke(4) + "/>" +
      '<circle cx="71" cy="84" r="26" fill="#F3C9A1"' + stroke(4) + '/><circle cx="62" cy="80" r="3.5" fill="' + INK + '"/><circle cx="80" cy="80" r="3.5" fill="' + INK + '"/>' +
      '<path d="M57 92 q7 6 14 0 q7 6 14 0" fill="none"' + stroke(4) + '/><path d="M62 100 q9 5 18 0" fill="none"' + stroke(3) + "/>" +
      '<path d="M40 176 L46 120 q25 -12 50 0 L102 176 z" fill="#fff"' + stroke(4) + '/><path d="M60 128 h22 v30 h-22 z" fill="#FFD60A"' + stroke(3) + "/>" +
      '<path d="M46 124 L18 104 M96 124 L124 104" fill="none"' + stroke(8) + '/><circle cx="16" cy="102" r="8" fill="#F3C9A1"' + stroke(3) + '/><circle cx="126" cy="102" r="8" fill="#F3C9A1"' + stroke(3) + "/>" +
      "</g>";
  }
  function proofreader() {
    return '<g class="bob">' +
      '<circle cx="66" cy="62" r="30" fill="#FFE0B5"' + stroke(4) + "/>" +
      '<path d="M32 50 q34 -26 68 0 l-6 4 q-28 -16 -56 0 z" fill="#2E9E57"' + stroke(3.5) + "/>" +
      '<circle cx="55" cy="64" r="10" fill="#fff"' + stroke(4) + '/><circle cx="79" cy="64" r="10" fill="#fff"' + stroke(4) + '/><path d="M65 64 h4" fill="none"' + stroke(3) + "/>" +
      '<circle cx="55" cy="65" r="3.5" fill="' + INK + '"/><circle cx="79" cy="65" r="3.5" fill="' + INK + '"/><path d="M45 50 l16 4 M89 50 l-16 4" fill="none"' + stroke(3.5) + "/>" +
      '<path d="M58 82 h16" fill="none"' + stroke(4) + "/>" +
      '<path d="M30 180 L36 104 q30 -14 60 0 L102 180 z" fill="#8FD19E"' + stroke(4) + "/>" +
      '<path d="M96 112 L118 96" fill="none"' + stroke(8) + '/><circle cx="130" cy="86" r="17" fill="#DDE8FF"' + stroke(5) + '/><path d="M118 98 L106 110" fill="none"' + stroke(7) + "/>" +
      '<path d="M38 116 L22 150" fill="none"' + stroke(8) + '/><circle cx="21" cy="152" r="8" fill="#FFE0B5"' + stroke(3) + "/>" +
      "</g>";
  }
  function bouncer() {
    return '<g class="bob">' +
      '<rect x="48" y="14" width="64" height="56" rx="14" fill="#E3B98F"' + stroke(4) + "/>" +
      '<rect x="52" y="34" width="56" height="14" rx="4" fill="' + INK + '"/><path d="M66 60 h28" fill="none"' + stroke(4) + "/>" +
      '<path d="M20 196 L22 92 q58 -26 116 0 L140 196 z" fill="#B79CFF"' + stroke(4) + "/>" +
      '<text class="lbl-deco" x="80" y="176" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="22" letter-spacing="2" fill="' + INK + '">CREW</text>' +
      '<rect x="28" y="110" width="104" height="22" rx="11" fill="#B79CFF"' + stroke(4) + '/><rect x="34" y="132" width="92" height="22" rx="11" fill="#B79CFF"' + stroke(4) + "/>" +
      "</g>";
  }
  var CAST = {
    pip: { vb: "0 0 140 190", draw: function (el) { return pip({ mood: el.getAttribute("data-mood"), mouth: el.getAttribute("data-mouth"), arms: el.getAttribute("data-arms") }); } },
    chef: { vb: "0 0 142 190", draw: chef },
    proofreader: { vb: "0 0 150 190", draw: proofreader },
    bouncer: { vb: "0 0 160 200", draw: bouncer }
  };
  function drawCast(scope) {
    var els = (scope || document).querySelectorAll("svg[data-char]");
    for (var i = 0; i < els.length; i++) {
      var c = CAST[els[i].getAttribute("data-char")];
      if (!c) { report("cast", "unknown character " + els[i].getAttribute("data-char")); continue; }
      els[i].setAttribute("viewBox", typeof c.vb === "function" ? c.vb(els[i]) : c.vb);   // a function sizes the frame to the content
      els[i].setAttribute("aria-hidden", "true");
      els[i].setAttribute("focusable", "false");
      els[i].innerHTML = c.draw(els[i]);
    }
    /* A drawing redrawn after the page was laid out (a stepper changing a character's state) gets its labels fitted again:
       innerHTML reset the hidden plates and grown labels to their drawn size. */
    if (laidOut && els.length) fitLabels(scope && scope.nodeType === 1 ? scope : null);
  }
  var laidOut = false;

  /* ---------- sound-effect bursts ---------- */
  function drawSfx() {
    var els = document.querySelectorAll("svg[data-sfx]");
    for (var i = 0; i < els.length; i++) {
      var word = els[i].getAttribute("data-sfx"), seed = Number(els[i].getAttribute("data-seed") || 7);
      var fill = els[i].getAttribute("data-fill") || "#FFD60A";
      els[i].setAttribute("viewBox", "0 0 200 130");
      els[i].setAttribute("aria-hidden", "true");
      els[i].innerHTML = '<polygon points="' + starPoints(seed, 13, 100, 65, 96, 64, 0.62) + '" fill="' + fill + '" stroke="#111" stroke-width="4" stroke-linejoin="round"/>' +
        '<text x="100" y="80" text-anchor="middle" fill="#FF5A4E" stroke="#111" stroke-width="3" paint-order="stroke" transform="rotate(-6 100 65)">' + esc(word) + "</text>";
    }
  }

  /* ---------- code, terminals, typing ---------- */
  function termSegments(name, withExit, alt) {
    var q = program(name); if (!q) return null;
    if (alt) {   // data-alt: show the secondary toolchain's run (only programs whose runs differ have one)
      if (!q.alt) { report("terminal", name + " has no second-version run (its runs were identical)"); return null; }
      q = q.alt;
    }
    var meta = (P.data.captures.meta || {}), dir = String(meta.workdir || "/home/you").replace(/^\/home\/you/, "~");
    var segs = [];
    function outErr(out, err, screen) {
      // Programs that read input were also run in a terminal: show that transcript (prompts plus echoed typing).
      if (screen != null) { out = screen; if (err && out.slice(-err.length) === err) out = out.slice(0, -err.length); else err = ""; }
      if (out) segs.push({ cls: "", t: out.replace(/\n$/, "") + (err ? "\n" : "") });
      if (err) segs.push({ cls: "err", t: err.replace(/\n$/, "") });
    }
    if (q.steps) {            // compiled languages and tools: one prompt per command (compile, then run)
      q.steps.forEach(function (st, i) {
        if (i) segs.push({ cls: "", t: "\n" });
        segs.push({ cls: "prompt", t: "you@laptop:" + (st.dir || dir) + "$ " }, { cls: "", t: st.cmd + ((st.out || st.err || (i === q.steps.length - 1 && q.screen)) ? "\n" : "") });
        if (st.merged != null && !(i === q.steps.length - 1 && q.screen != null)) {
          // both streams printed: show them in the order the terminal really showed them; stderr lines stay red
          var cls = mergedClassifier(st.out, st.err);
          st.merged.replace(/\n$/, "").split("\n").forEach(function (l, k, all) { segs.push({ cls: cls(l), t: l + (k < all.length - 1 ? "\n" : "") }); });
        } else outErr(st.out, st.err, i === q.steps.length - 1 ? q.screen : null);
      });
    } else {
      segs.push({ cls: "prompt", t: "you@laptop:" + dir + "$ " }, { cls: "", t: "python3 " + name + "\n" });
      outErr(q.stdout, q.stderr, q.screen);
    }
    if (withExit) segs.push({ cls: "prompt", t: "\n[exit code " + q.exit + (q.exit === 0 ? ": success]" : ": failure]") });
    return segs;
  }
  /* Which merged line was stderr? `merged` comes from a separate run (capture.py re-runs the step with the streams
     joined), so a value that changes per run (a thread id, a process id, an address, a timing) can differ from the
     split stdout/stderr records. Rule, in order: a line equal to a stderr line is an error; a line equal to a stdout
     line is output; otherwise compare with every digit run (and 0x... hex address) replaced by one placeholder, and call
     it an error only if it matches a stderr line that way and matches no stdout line that way. */
  function normDigits(l) { return l.replace(/0x[0-9a-fA-F]+|\d+/g, "#"); }
  function mergedClassifier(out, err) {
    var e = {}, o = {}, en = {}, on = {};
    String(err || "").split("\n").forEach(function (l) { if (l) { e[l] = 1; en[normDigits(l)] = 1; } });
    String(out || "").split("\n").forEach(function (l) { if (l) { o[l] = 1; on[normDigits(l)] = 1; } });
    return function (l) { return !l ? "" : e[l] ? "err" : o[l] ? "" : (en[normDigits(l)] && !on[normDigits(l)]) ? "err" : ""; };
  }
  /* Compiler caret lines: Python/Node "    ^^^^" or "~~~~^^^^", rustc/gcc "  |     ^^^ label", "5 |  ---", "  | |____^".
     Returns the column of the first marker, or -1. */
  var GUTTER = /^(\s*\d*\s*\|)/;
  function caretCol(l) {
    var g = GUTTER.exec(l), lead = g ? g[1].length : 0, rest = l.slice(lead);
    var m = /^[\s|_\/\\]*/.exec(rest)[0].length, mk = rest.slice(m);
    // marker groups may be separated by spaces (gcc underlines operands around the caret: `~ ^ ~~~~~`); one holds a ^
    if (/^(?:[\^~\-+]+[ \t]+)*[\^~\-+]*\^[\^~\-+]*(?:\s|$)/.test(mk) || (g && /^(?:[\-~+]{2,}|[\-^])(?:\s|$)/.test(mk))) return lead + m;
    return -1;
  }
  function isConnector(l) { return /^\s*\d*\s*\|[\s|]*$/.test(l) && /\|.*\|/.test(l); }   // gcc "      |      |" under a caret
  /* HTML for a terminal. A .wrap terminal gets one .tl block per line (each still ends in its own newline, so the text
     is unchanged), marked so the CSS can keep compiler carets aligned: the line a caret points into is .tl-src (never
     wraps), the caret line is .tl-caret with --ind at its first marker (its label wraps under the markers). */
  function segHtml(segs, upto, wrap) {
    var out = "", left = upto == null ? Infinity : upto, i;
    if (!wrap) {
      for (i = 0; i < segs.length && left > 0; i++) {
        var t = segs[i].t.slice(0, left); left -= t.length;
        out += segs[i].cls ? '<span class="' + segs[i].cls + '">' + esc(t) + "</span>" : esc(t);
      }
      return out;
    }
    var lines = [[]];
    for (i = 0; i < segs.length && left > 0; i++) {
      var tt = segs[i].t.slice(0, left); left -= tt.length;
      tt.split("\n").forEach(function (part, k) { if (k) lines.push([]); if (part) lines[lines.length - 1].push({ cls: segs[i].cls, t: part }); });
    }
    var text = lines.map(function (ps) { return ps.map(function (p) { return p.t; }).join(""); }), kind = text.map(function () { return ""; }), col = {};
    text.forEach(function (l, k) {
      var c = caretCol(l); if (c < 0) return;
      kind[k] = "caret"; col[k] = c;
      for (var j = k - 1; j >= 0; j--) {   // the code line above (skipping other caret and connector lines) never wraps
        if (kind[j] === "caret" || isConnector(text[j])) continue;
        if (text[j].trim() && !/^\s*\d*\s*\|\s*$/.test(text[j])) kind[j] = "src";
        break;
      }
    });
    // Label lines under a caret ("      |   |   |" and "      |   int Coins", gcc and rustc) line up with the markers
    // above: they never wrap either (a long one scrolls).
    text.forEach(function (l, k) {
      if (kind[k] !== "caret") return;
      for (var j = k + 1; j < text.length && /^\s*\|/.test(text[j]) && kind[j] !== "caret"; j++) if (!kind[j]) kind[j] = "src";
    });
    return lines.map(function (ps, k) {
      var attrs = kind[k] === "caret" ? ' class="tl tl-caret" data-mark="' + col[k] + '"' : kind[k] === "src" ? ' class="tl tl-src"' : ' class="tl"';
      return "<span" + attrs + ">" + ps.map(function (p) { return p.cls ? '<span class="' + p.cls + '">' + esc(p.t) + "</span>" : esc(p.t); }).join("") + (k < lines.length - 1 ? "\n" : "") + "</span>";
    }).join("");
  }
  /* Hanging indent for code lines that may wrap. For each line element: its leading whitespace (or, for a caret line,
     everything before the first marker) moves into <span class="lead">, the rest into <span class="rest">, and --ind is
     set to the lead's width in columns, using the line's own tab-size. The CSS then starts every continuation line
     under the first character (comic.css "Wrapped code lines"). Text content is unchanged. */
  function textPos(el, n) {
    var w = document.createTreeWalker(el, 4, null), node, seen = 0;
    while ((node = w.nextNode())) { if (seen + node.nodeValue.length >= n) return { node: node, off: n - seen }; seen += node.nodeValue.length; }
    return null;
  }
  function hangLines(els) {
    if (!els || !els.length) return;
    var cs0 = root.getComputedStyle ? root.getComputedStyle(els[0]) : { tabSize: 8, whiteSpace: "pre-wrap" };
    var ts = parseInt(cs0.tabSize, 10) || 8, noBreaks = /^(pre|nowrap)$/.test(cs0.whiteSpace) && !!els[0].closest(".recipe");   // a chapter that set its walker to white-space: pre wants no wrapping
    for (var i = 0; i < els.length; i++) {
      var el = els[i]; if (el.querySelector(":scope > .rest")) continue;
      var txt = el.textContent.replace(/\n$/, ""), mark = el.getAttribute("data-mark"), n, cols = 0;
      n = mark != null ? Number(mark) : /^[ \t]*/.exec(txt)[0].length;
      if (n >= txt.length) n = 0;   // a blank or whitespace-only line: nothing to hang
      for (var k = 0; k < n; k++) cols = txt[k] === "\t" ? (Math.floor(cols / ts) + 1) * ts : cols + 1;
      var tail = null, last = el.lastChild;
      if (last && last.nodeType === 3 && /\n$/.test(last.nodeValue)) { tail = last.nodeValue.length > 1 ? last.splitText(last.nodeValue.length - 1) : last; el.removeChild(tail); }
      var lead = null;
      if (n > 0) {
        var pos = textPos(el, n); if (!pos) { if (tail) el.appendChild(tail); continue; }
        var r = document.createRange(); r.setStart(el, 0); r.setEnd(pos.node, pos.off);
        lead = document.createElement("span"); lead.className = "lead"; lead.appendChild(r.extractContents());
        el.insertBefore(lead, el.firstChild);
      }
      var rest = document.createElement("span"); rest.className = "rest";
      while ((lead ? lead.nextSibling : el.firstChild)) rest.appendChild(lead ? lead.nextSibling : el.firstChild);
      el.appendChild(rest);
      if (tail) el.appendChild(tail);
      el.style.setProperty("--ind", String(cols));
      if (el.classList.contains("tl")) keepHyphens(rest);   // terminal text breaks at spaces only: `-Wextra`, `go-ch8/x.go` stay whole
      else if (!noBreaks) {
        addBreaks(rest);
        // A short string literal never wraps inside itself: replace(" ", "-") must not end a row with `"` and start the
        // next with `"`, and the space that is the point of the string must stay visible. Long strings still wrap at spaces.
        // In a longer string, the opening quote stays with its first word and the closing quote with its last, so a row
        // never ends in a lone `print("`.
        var strs = rest.querySelectorAll(".tok-str");
        for (var q = 0; q < strs.length; q++) {
          var st = strs[q], sv = st.textContent;
          if (sv.length <= 9) { st.classList.add("nobr"); continue; }
          if (st.childNodes.length !== 1 || st.firstChild.nodeType !== 3 || !/\s/.test(sv)) continue;
          var hm = /^\S*\s*\S+/.exec(sv), tm = /\S+\s*\S*$/.exec(sv);
          if (!hm || !tm || tm.index <= hm[0].length) continue;
          st.textContent = "";
          [[sv.slice(0, hm[0].length), 1], [sv.slice(hm[0].length, tm.index), 0], [sv.slice(tm.index), 1]].forEach(function (pc) {
            if (!pc[1]) { st.appendChild(document.createTextNode(pc[0])); return; }
            var sp = document.createElement("span"); sp.className = "nobr"; sp.textContent = pc[0]; st.appendChild(sp);
          });
        }
      }
    }
  }
  /* Break opportunities after punctuation (. , ( [ { / ; and ::), so a wrapped line breaks at "line.strip()." and not
     inside "split". <wbr> adds no text. Chrome breaks at <wbr> even under white-space: pre, so the CSS hides them
     (display: none removes the opportunity) except where the line is meant to wrap.
     Never inside a string or char literal ("{name}", '.', "a, b"), and not after the dot of a receiver shorter than 3
     characters (`b.WriteString(` stays whole instead of stranding `b.` on its own row). */
  /* Browsers break after a hyphen even in pre-wrap text; a terminal must not (`-Wextra -g` read as `-Wextra -` / `g`).
     Each space-delimited piece holding a hyphen goes into a <span class="nobr"> (white-space: pre); text is unchanged. */
  function keepHyphens(el) {
    var w = document.createTreeWalker(el, 4, null), nodes = [], n;
    while ((n = w.nextNode())) if (n.nodeValue.indexOf("-") >= 0) nodes.push(n);
    nodes.forEach(function (t) {
      var frag = document.createDocumentFragment();
      t.nodeValue.split(/(\S*-\S*)/).forEach(function (part, i) {
        if (!part) return;
        if (i % 2) { var sp = document.createElement("span"); sp.className = "nobr"; sp.textContent = part; frag.appendChild(sp); }
        else frag.appendChild(document.createTextNode(part));
      });
      t.parentNode.replaceChild(frag, t);
    });
  }
  var BREAK_AFTER = /(::|[.,(\[{\/;])(?=[^\s.,;)\]}])/g;
  function addBreaks(el) {
    var w = document.createTreeWalker(el, 4, null), nodes = [], n;
    while ((n = w.nextNode())) {
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest(".tok-str")) continue;
      BREAK_AFTER.lastIndex = 0; if (BREAK_AFTER.test(n.nodeValue)) nodes.push(n);
    }
    nodes.forEach(function (t) {
      var s = t.nodeValue, frag = document.createDocumentFragment(), from = 0, m;
      BREAK_AFTER.lastIndex = 0;
      while ((m = BREAK_AFTER.exec(s)) !== null) {
        var end = m.index + m[1].length;
        if (m[1] === "." && /(?:^|[^\w])\w{1,2}$/.test(s.slice(Math.max(0, m.index - 3), m.index))) continue;   // short receiver
        frag.appendChild(document.createTextNode(s.slice(from, end))); frag.appendChild(document.createElement("wbr")); from = end;
      }
      if (from === 0) return;
      if (from < s.length) frag.appendChild(document.createTextNode(s.slice(from)));
      t.parentNode.replaceChild(frag, t);
    });
  }
  function fillCode() {
    var codes = document.querySelectorAll("[data-src]");
    for (var i = 0; i < codes.length; i++) {
      var p = program(codes[i].getAttribute("data-src")); if (!p) continue;
      var src = p.src.replace(/\n$/, ""), range = codes[i].getAttribute("data-lines");
      /* data-lines="a-b" (1-based, inclusive; "a" alone is one line): show only that part of a long captured program. */
      if (range) {
        var rm = /^\s*(\d+)\s*(?:-\s*(\d+))?\s*$/.exec(range), all = src.split("\n");
        if (!rm || +rm[1] < 1 || +(rm[2] || rm[1]) > all.length || +(rm[2] || rm[1]) < +rm[1]) report("code", codes[i].getAttribute("data-src") + ": data-lines=\"" + range + "\" is not a range inside its " + all.length + " lines");
        else { src = all.slice(+rm[1] - 1, +(rm[2] || rm[1])).join("\n"); codes[i].setAttribute("data-from", rm[1]); }
      }
      codes[i].innerHTML = highlight(src);
    }
    /* Code in side-by-side cards wraps like a terminal: one .cl block per line with the hanging indent (comic-widgets.css),
       instead of pre-wrap + overflow-wrap: anywhere, which split tokens mid-name on phones. */
    var cardCodes = document.querySelectorAll(".duo-card pre.code");
    for (var cc = 0; cc < cardCodes.length; cc++) codeLines(cardCodes[cc]);
    /* Terminals in side-by-side cards wrap like .term.wrap (their column is narrow at every width): per-line blocks, so a
       compiler caret stays under the code it marks and tokens are never split. */
    var cardTerms = document.querySelectorAll(".duo-card pre.term");
    for (var c = 0; c < cardTerms.length; c++) cardTerms[c].classList.add("wrap");
    var terms = document.querySelectorAll("[data-run]");
    for (var j = 0; j < terms.length; j++) {
      var t = terms[j], segs = termSegments(t.getAttribute("data-run"), t.hasAttribute("data-exit"), t.hasAttribute("data-alt"));
      /* Failing runs wrap on phones (.wrap-sm): the line a chapter tells readers to look at first (the error) is usually
         the longest, and a real 390px terminal would wrap it too. data-nowrap opts out. */
      var q = segs && program(t.getAttribute("data-run")); if (q && t.hasAttribute("data-alt") && q.alt) q = q.alt;
      if (q && q.exit !== 0 && !t.hasAttribute("data-nowrap") && !t.classList.contains("wrap")) t.classList.add("wrap-sm");
      if (segs && t.hasAttribute("data-fold")) segs = foldSegs(t, segs);
      if (segs) { t._segs = segs; paintTerm(t); }
    }
    // Hand-written wrapping terminals (no data-run) get the same per-line blocks, when their markup is plain text and spans.
    var statics = document.querySelectorAll("pre.term.wrap:not([data-run])");
    for (var k = 0; k < statics.length; k++) { var ss = staticSegs(statics[k]); if (ss) { statics[k]._segs = ss; paintTerm(statics[k]); } }
  }
  /* codeLines(pre): one <span class="cl"> block per source line (each still ends in its own newline, so the text is
     unchanged), then the hanging indent and break points of hangLines. Only for plain markup (text and the highlighter's
     flat spans); a block written with other markup is left exactly as written. */
  function codeLines(pre) {
    if (!pre || pre.querySelector(".cl") || !pre.textContent) return;
    var kids = [].slice.call(pre.childNodes), lines = [[]];
    for (var i = 0; i < kids.length; i++) {
      var n = kids[i];
      if (n.nodeType === 8) continue;
      if (!(n.nodeType === 3 || (n.nodeType === 1 && n.tagName === "SPAN" && !n.children.length))) return;
      n.textContent.split("\n").forEach(function (t, k) {
        if (k) lines.push([]);
        if (!t) return;
        var c = n.nodeType === 3 ? document.createTextNode(t) : n.cloneNode(false);
        if (n.nodeType === 1) c.textContent = t;
        lines[lines.length - 1].push(c);
      });
    }
    pre.textContent = "";
    lines.forEach(function (ns, k) {
      var sp = document.createElement("span"); sp.className = "cl";
      ns.forEach(function (x) { sp.appendChild(x); });
      if (k < lines.length - 1) sp.appendChild(document.createTextNode("\n"));
      pre.appendChild(sp);
    });
    hangLines(pre.querySelectorAll(":scope > .cl"));
  }
  function staticSegs(el) {
    if (!el.textContent.trim() || el.querySelector(".tl")) return null;
    var segs = [], kids = el.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var n = kids[i];
      if (n.nodeType === 3) segs.push({ cls: "", t: n.nodeValue });
      else if (n.nodeType === 1 && n.tagName === "SPAN" && !n.children.length && n.attributes.length === (n.hasAttribute("class") ? 1 : 0)) segs.push({ cls: n.className, t: n.textContent });
      else if (n.nodeType === 8) continue;
      else return null;   // other markup (links, bold, nested spans): leave the terminal exactly as written
    }
    return segs;
  }
  /* data-fold: runs of stack-frame lines inside the runtime itself (Node's "at ... (node:internal/...)") collapse into one
     marked line; the complete, unedited output stays one click away in a details box right after the terminal. */
  var FOLD_RE = /^\s+at .*\(?node:[a-z_]+[/:]/;   // node:internal/..., node:diagnostics_channel:...
  function foldSegs(el, segs) {
    var full = segs.map(function (s) { return s.t; }).join(""), out = [], joined = [];
    segs.forEach(function (s) {   // merge neighbours of the same style first (merged-stream terminals arrive one line per segment)
      var last = joined[joined.length - 1];
      if (last && last.cls === s.cls) last.t += s.t; else joined.push({ cls: s.cls, t: s.t });
    });
    // The fold note is the page's own words, not program output: it gets its own style (.fold), never error red.
    joined.forEach(function (s) {
      var lines = s.t.split("\n"), keep = [], run = 0;
      function note() { return "    \u2026 " + run + " line" + (run > 1 ? "s" : "") + " inside Node itself (folded; full text below)"; }
      function flushNote(last) {
        if (keep.length) out.push({ cls: s.cls, t: keep.join("\n") + "\n" });
        out.push({ cls: "fold", t: note() + (last ? "" : "\n") }); keep = []; run = 0;
      }
      lines.forEach(function (l, i) {
        if (FOLD_RE.test(l)) { run++; return; }
        if (run) flushNote(false);
        keep.push(l);
      });
      if (run) flushNote(true);
      else if (keep.length) out.push({ cls: s.cls, t: keep.join("\n") });
    });
    if (!el.nextElementSibling || !el.nextElementSibling.classList.contains("fold-full")) {
      var d = document.createElement("details"); d.className = "fold-full";
      d.innerHTML = "<summary>Show the full, unfolded output</summary><pre class=\"term\">" + esc(full) + "</pre>";
      el.parentNode.insertBefore(d, el.nextSibling);
    }
    return out;
  }
  function paintTerm(el, upto) {
    var wrap = el.classList.contains("wrap") || el.classList.contains("wrap-sm");
    el.innerHTML = segHtml(el._segs, upto, wrap);
    if (wrap && upto == null) hangLines(el.querySelectorAll(":scope > .tl"));
  }
  /* data-type: the first run of a chapter types itself out (explanatory, about 2s, once). Skipped when motion is off or
     reduced: the text is simply there. */
  function typeOut(el) {
    if (!el._segs || !motionOn()) return;
    var total = el._segs.reduce(function (n, s) { return n + s.t.length; }, 0);
    var shown = 0, chunk = Math.max(1, Math.ceil(total / 90));
    if (el._timer) root.clearInterval(el._timer);
    paintTerm(el, 0);
    el._timer = root.setInterval(function () {
      shown += chunk;
      paintTerm(el, shown);
      if (shown >= total) { root.clearInterval(el._timer); el._timer = null; paintTerm(el); }
    }, 22);
  }

  /* ---------- panels play once when they come into view; replay on demand ---------- */
  function playPanel(panel) {
    panel.classList.remove("played");
    void panel.offsetWidth; // restart CSS animations
    panel.classList.add("played");
    var ts = panel.querySelectorAll("[data-type]");
    for (var i = 0; i < ts.length; i++) typeOut(ts[i]);
  }
  function initPanels() {
    var panels = document.querySelectorAll(".panel[data-play]");
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".replay"); if (b) playPanel(b.closest(".panel"));
    });
    if (!("IntersectionObserver" in root)) { for (var i = 0; i < panels.length; i++) panels[i].classList.add("played"); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && !en.target._seen) { en.target._seen = true; playPanel(en.target); } });
    }, { threshold: 0.45 });
    for (var k = 0; k < panels.length; k++) io.observe(panels[k]);
  }

  /* ---------- anatomy ---------- */
  function initAnatomy() {
    var boxes = document.querySelectorAll("[data-anatomy]");
    for (var i = 0; i < boxes.length; i++) (function (box) {
      var btns = box.querySelectorAll("[data-part]"), live = box.querySelector("[aria-live]");
      function show(part, say) {
        for (var j = 0; j < btns.length; j++) btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-part") === part ? "true" : "false");
        var parts = box.querySelectorAll(".part");
        for (var k = 0; k < parts.length; k++) parts[k].classList.toggle("on", parts[k].getAttribute("data-p") === part);
        if (say && live) live.textContent = "Highlighted: " + box.querySelector('[data-part="' + part + '"]').textContent.replace(/\s+/g, " ").trim();
      }
      for (var j = 0; j < btns.length; j++) btns[j].addEventListener("click", function () { show(this.getAttribute("data-part"), true); });
      // the anatomy line may wrap between its parts (never inside one) when it is wider than its box
      /* Only between parts that sit directly in a line that may wrap: Chrome breaks at <wbr> even under white-space: pre
         or nowrap, so a chapter's no-break group (`<span class="nobr">{ red }<part>;</part></span>`, cpp ch6) or a
         multi-line `pre` anatomy (cpp ch5) was split where its author said not to. */
      var ls = box.querySelectorAll(".anat-line");
      for (var li = 0; li < ls.length; li++) {
        if (/^(pre|nowrap)$/.test(root.getComputedStyle(ls[li]).whiteSpace)) continue;
        var ps = ls[li].querySelectorAll(":scope > .part");
        for (var q = 1; q < ps.length; q++) if (ps[q].previousSibling) ls[li].insertBefore(document.createElement("wbr"), ps[q]);
      }
      show(btns[0].getAttribute("data-part"), false);
    })(boxes[i]);
  }

  /* ---------- controls shared by the walker and the map ---------- */
  function wireControls(box, getState, dispatch) {
    var bPrev = box.querySelector('[data-act="prev"]'), bNext = box.querySelector('[data-act="next"]');
    var bPlay = box.querySelector('[data-act="play"]'), bReset = box.querySelector('[data-act="reset"]');
    bPrev.addEventListener("click", function () { if (this.getAttribute("aria-disabled") !== "true") dispatch({ type: "prev" }); });
    bNext.addEventListener("click", function () { if (this.getAttribute("aria-disabled") !== "true") dispatch({ type: "next" }); });
    bReset.addEventListener("click", function () { dispatch({ type: "reset" }); });
    bPlay.addEventListener("click", function () { dispatch({ type: "toggle-play" }); });
    box.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var map = { ArrowRight: "next", ArrowLeft: "prev", r: "reset", R: "reset", " ": "toggle-play" };
      if (map[e.key]) { if (e.key === " " && e.target.closest("button")) return; e.preventDefault(); dispatch({ type: map[e.key] }); }
    });
    return function sync() {
      var s = getState();
      bPrev.setAttribute("aria-disabled", s.step === 0 ? "true" : "false");
      bNext.setAttribute("aria-disabled", s.step === s.total - 1 ? "true" : "false");
      bPlay.querySelector("span").textContent = s.playing ? "Pause" : "Play";
      bPlay.setAttribute("aria-pressed", s.playing ? "true" : "false");
    };
  }
  /* runner(box, total, render, opts): the shared stepper. opts.reserve (true, or a selector) reserves the tallest step's
     height for the narration, the screen and any [data-reserve] element, so the buttons below never move between steps
     (see reserveSteps). The engine's walker, map, tracer and stack-and-heap stepper pass it; extensions may too. */
  function runner(box, total, render, opts) {
    opts = opts || {};
    var state = { total: total, step: 0, playing: false }, timer = null, sync, measured = false;
    function getState() { return state; }
    function measure(grow) { reserveSteps(box, state.total, render, getState, opts.reserve === true ? null : opts.reserve, grow); measured = true; }
    function dispatch(action) {
      state = stepState(state, action);
      if (timer) { root.clearInterval(timer); timer = null; }
      if (state.playing) timer = root.setInterval(function () { state = stepState(state, { type: "next" }); if (!state.playing) { root.clearInterval(timer); timer = null; } render(state, true); sync(); }, 1500);
      render(state, true); sync();
      keepInView(box);
    }
    sync = wireControls(box, getState, dispatch);
    if (opts.reserve) {
      whenNear(box, function () { measure(false); });
      var lastW = 0, t2 = null;
      root.addEventListener("resize", function () {
        if (!measured) return;
        root.clearTimeout(t2); t2 = root.setTimeout(function () { var w = box.clientWidth; if (w && w !== lastW) { lastW = w; measure(false); } }, 250);
      });
      lastW = box.clientWidth;
    }
    return { reset: function (n) { if (timer) { root.clearInterval(timer); timer = null; } state = { total: n, step: 0, playing: false }; render(state, false); sync(); if (measured) measure(true); }, state: getState, measure: measure };
  }
  /* reserveHeight(el, heights): give el a min-height equal to the largest of heights (px), so content that changes per
     step never changes the element's height. Returns that height. */
  function reserveHeight(el, heights) {
    var h = 0; (heights || []).forEach(function (v) { if (v > h) h = v; });
    if (el && h > 0) el.style.minHeight = Math.ceil(h) + "px";
    return h;
  }
  /* reserveSteps(box, total, render, getState, selector, grow): render every step once (announce = false), measure each
     element matching selector (default: the narration, the screen and [data-reserve]), reserve the tallest, then render the
     current step again. grow = keep any larger height reserved before (a map switching paths). */
  var RESERVE = ".narration, .screen pre, [data-reserve]";
  function reserveSteps(box, total, render, getState, selector, grow) {
    var els = [].slice.call(box.querySelectorAll(selector || RESERVE));
    if (!els.length || !box.clientWidth) return;
    var hs = els.map(function (e) { var keep = grow ? parseFloat(e.style.minHeight) || 0 : 0; e.style.minHeight = ""; return [keep]; });
    for (var i = 0; i < total; i++) {
      try { render({ total: total, step: i, playing: false }, false); } catch (err) { report("reserve", err.message); break; }
      els.forEach(function (e, k) { hs[k].push(e.getBoundingClientRect().height); });
    }
    render(getState(), false);
    els.forEach(function (e, k) { reserveHeight(e, hs[k]); });
  }
  /* Run fn once, when box comes within 600px of the viewport and the fonts have loaded (heights depend on both). */
  function whenNear(box, fn) {
    function go() { if (document.fonts && document.fonts.ready) document.fonts.ready.then(fn, fn); else fn(); }
    if (!("IntersectionObserver" in root)) { go(); return; }
    var io = new IntersectionObserver(function (en) { if (en.some(function (x) { return x.isIntersecting; })) { io.disconnect(); go(); } }, { rootMargin: "600px 0px" });
    io.observe(box);
  }
  /* After a step the reader asked for, on phones (where the controls stick to the bottom of the screen), scroll the page
     just enough to show the highlighted line or clue (li.now, .hl, [data-now]) above the controls. The buttons stay where
     the finger is, because they are sticky. */
  function keepInView(box) {
    var bar = box.querySelector(":scope > .controls");
    if (!bar || root.getComputedStyle(bar).position !== "sticky") return;
    var tgt = box.querySelector("li.now, .hl, [data-now]"); if (!tgt) return;
    var r = tgt.getBoundingClientRect(), b = bar.getBoundingClientRect(), bottom = Math.min(root.innerHeight, b.top) - 12, delta = 0;
    if (!r.height) return;
    if (r.top < 12) delta = r.top - 12 - Math.min(48, Math.max(0, bottom - 12 - r.height) / 3);
    else if (r.bottom > bottom) delta = Math.min(r.bottom - bottom, r.top - 12);
    if (Math.abs(delta) > 2) root.scrollBy({ top: delta, behavior: motionOn() ? "smooth" : "auto" });
  }

  /* ---------- Pip walks down the recipe card ---------- */
  function initWalkers() {
    var boxes = document.querySelectorAll("[data-walk]");
    for (var i = 0; i < boxes.length; i++) { try { mountWalker(boxes[i]); } catch (e) { report("walker", e.message); } }
  }
  function mountWalker(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-walk")).textContent);
    var prog = program(m.program); if (!prog) return;
    var lines = prog.src.replace(/\n$/, "").split("\n");
    var last = m.steps[m.steps.length - 1];
    var parity = (last.output.length ? last.output.join("\n") + "\n" : "") === shown(prog);
    if (!parity) report("walker", "parity failed for " + m.program);
    var par = (box.querySelector(".controls .parity") || box.querySelector(".parity:not([data-same-src])"));
    if (par) { par.textContent = parity ? "Matches the real run" : "Does not match the real run"; par.classList.toggle("bad", !parity); }
    var ol = box.querySelector(".recipe ol");
    ol.innerHTML = lines.map(function (l) { return "<li>" + highlight(l) + "</li>"; }).join("");
    hangLines(ol.querySelectorAll("li"));
    var lis = ol.querySelectorAll("li"), walker = box.querySelector(".walker"), out = box.querySelector(".screen pre");
    var note = box.querySelector(".narration"), live = box.querySelector("[aria-live]");
    var prevLen = 0;
    function render(st, announce) {
      var s = m.steps[st.step];
      for (var k = 0; k < lis.length; k++) { lis[k].classList.toggle("now", s.line === k + 1); }
      // Pip stands beside the line about to run; after the last line Pip stays beside it, cheering.
      var target = s.line ? lis[s.line - 1] : lis[lis.length - 1];
      var half = (parseFloat(root.getComputedStyle(walker).height) || 82) / 2;   // the guide is smaller on phones (comic.css)
      var y = target.offsetTop + target.offsetHeight / 2 - half;
      walker.style.transform = "translateY(" + y + "px)";
      walker.setAttribute("data-mood", s.mood || "normal");
      walker.setAttribute("data-mouth", s.mouth || "smile");
      walker.setAttribute("data-arms", s.arms || "point");
      walker.setAttribute("viewBox", guideViewBox());
      walker.innerHTML = guide({ mood: s.mood, mouth: s.mouth, arms: s.arms || "point" });
      var o = s.output;
      out.innerHTML = o.length ? o.map(function (l, idx) { return '<span class="' + (idx >= prevLen && announce ? "new" : "") + '">' + esc(l) + "</span>"; }).join("\n") : '<span class="empty">Nothing on the screen yet.</span>';
      prevLen = o.length;
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + m.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = "Step " + (st.step + 1) + " of " + m.steps.length + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
    }
    var tb = box.querySelector(".transcript tbody");
    if (tb) tb.innerHTML = m.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (s.line ? "line " + s.line + ": <code>" + esc(lines[s.line - 1]) + "</code>" : "finished") + "</td><td>" + s.note + "</td><td><code>" + (s.output.length ? esc(s.output.join(" / ")) : "(nothing)") + "</code></td></tr>"; }).join("");
    if (tb) { var tcs = tb.querySelectorAll("td code"); for (var tc = 0; tc < tcs.length; tc++) addBreaks(tcs[tc]); }   // code breaks after . , ( :: in a narrow card
    var r = runner(box, m.steps.length, render, { reserve: true });
    r.reset(m.steps.length);
    root.addEventListener("resize", function () { render(r.state(), false); });
  }

  /* ---------- the map: statechart in sketch style, Pip runs along a path ---------- */
  var NS = "http://www.w3.org/2000/svg";
  function sv(tag, attrs, parent) { var n = document.createElementNS(NS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; }
  function wob(r, pts, amp) {
    var d = "";
    for (var i = 0; i < pts.length - 1; i++) {
      var x1 = pts[i][0], y1 = pts[i][1], x2 = pts[i + 1][0], y2 = pts[i + 1][1], segs = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 40));
      if (i === 0) d += "M" + (x1 + (r() - 0.5) * amp).toFixed(1) + " " + (y1 + (r() - 0.5) * amp).toFixed(1);
      for (var s = 1; s <= segs; s++) { var t = s / segs, jx = s === segs ? 0 : (r() - 0.5) * amp, jy = s === segs ? 0 : (r() - 0.5) * amp; d += " L" + (x1 + (x2 - x1) * t + jx).toFixed(1) + " " + (y1 + (y2 - y1) * t + jy).toFixed(1); }
    }
    return d;
  }
  function wobRect(r, x, y, w, h) { var o = 3, a = 2.2; return wob(r, [[x - o, y], [x + w + o, y]], a) + wob(r, [[x + w, y - o], [x + w, y + h + o]], a) + wob(r, [[x + w + o, y + h], [x - o, y + h]], a) + wob(r, [[x, y + h + o], [x, y - o]], a); }
  function head(pts) { var a = pts[pts.length - 1], b = pts[pts.length - 2], g = Math.atan2(a[1] - b[1], a[0] - b[0]), L = 13; return "M" + (a[0] - L * Math.cos(g - 0.45)).toFixed(1) + " " + (a[1] - L * Math.sin(g - 0.45)).toFixed(1) + " L" + a[0] + " " + a[1] + " L" + (a[0] - L * Math.cos(g + 0.45)).toFixed(1) + " " + (a[1] - L * Math.sin(g + 0.45)).toFixed(1); }
  function rich(t, s) { String(s).split("`").forEach(function (part, i) { if (!part) return; var ts = sv("tspan", i % 2 ? { "class": "c" } : {}, t); ts.textContent = part; }); }
  function paper(g, t) {
    var bb; try { bb = t.getBBox(); } catch (e) { bb = null; }
    if (!bb || !bb.width) { var len = t.textContent.length * 8.4; bb = { x: Number(t.getAttribute("x")) - (t.getAttribute("text-anchor") === "middle" ? len / 2 : t.getAttribute("text-anchor") === "end" ? len : 0), y: Number(t.getAttribute("y")) - 15, width: len, height: 19 }; }
    g.insertBefore(sv("rect", { x: bb.x - 4, y: bb.y - 2, width: bb.width + 8, height: bb.height + 4, rx: 3, "class": "paper" }), g.firstChild); // all paper first, so no label hides another
  }
  function initMaps() {
    var boxes = document.querySelectorAll("[data-map]");
    for (var i = 0; i < boxes.length; i++) { try { mountMap(boxes[i]); } catch (e) { report("map", e.message); } }
  }
  function mountMap(box) {
    var m = JSON.parse(document.getElementById(box.getAttribute("data-map")).textContent);
    var svg = box.querySelector("svg.map-svg"), r = rng(m.seed || 5), byId = {};
    svg.setAttribute("viewBox", "0 0 " + m.size[0] + " " + m.size[1]);
    svg.style.setProperty("--map-w", m.size[0] + "px");   // phones draw the map at natural size (labels at design size) and scroll
    var gl = sv("g", {}, svg), gs = sv("g", {}, svg), gt = sv("g", {}, svg);
    if (m.start) { var g0 = sv("g", { "class": "th", "data-id": "start" }, gl); sv("circle", { cx: m.start[0][0], cy: m.start[0][1], r: 8, "class": "start-dot" }, g0); sv("path", { d: wob(r, m.start, 1), "class": "th-line" }, g0); sv("path", { d: head(m.start), "class": "th-line" }, g0); }
    m.transitions.forEach(function (tr) {
      var g = sv("g", { "class": "th" + (tr.bug ? " bug" : ""), "data-id": tr.id }, gl);
      sv("path", { d: wob(r, tr.pts, 1.4), "class": "th-line" }, g); sv("path", { d: head(tr.pts), "class": "th-line" }, g);
      if (tr.label) { var lg = sv("g", { "class": "th" + (tr.bug ? " bug" : "") }, gt); [].concat(tr.label).forEach(function (line, i) { var t = sv("text", { x: tr.lx, y: tr.ly + i * 19, "class": "th-label" }, lg); if (tr.anchor) t.setAttribute("text-anchor", tr.anchor); rich(t, line); paper(lg, t); }); }
    });
    m.states.forEach(function (st) {
      byId[st.id] = st;
      var g = sv("g", { "class": "st " + (st.kind || ""), "data-id": st.id }, gs);
      sv("rect", { x: st.x, y: st.y, width: st.w, height: st.h, rx: 6, "class": "st-bg" }, g);
      sv("path", { d: wobRect(r, st.x, st.y, st.w, st.h), "class": "st-card" }, g);
      sv("circle", { cx: st.x + st.w / 2, cy: st.y + 2, r: 7, "class": "st-pin" }, g);
      var cy = st.y + st.h / 2 + (st.sub ? -2 : 7);
      var t = sv("text", { x: st.x + st.w / 2, y: cy, "text-anchor": "middle", "class": "st-label" }, g); rich(t, st.label);
      if (st.sub) { var t2 = sv("text", { x: st.x + st.w / 2, y: cy + 21, "text-anchor": "middle", "class": "st-sub" }, g); rich(t2, st.sub); }
    });
    // Pip token: a small Pip that runs to the current state.
    var token = sv("g", { "class": "token" }, svg);
    var inner = sv("svg", { x: -34, y: -78, width: 52, height: 70, viewBox: "0 0 140 190", "aria-hidden": "true" }, token);
    var bar = box.querySelector(".paths"), note = box.querySelector(".narration"), live = box.querySelector("[aria-live]"), out = box.querySelector(".screen pre"), par = (box.querySelector(".controls .parity") || box.querySelector(".parity:not([data-same-src])"));
    bar.insertAdjacentHTML("beforeend", m.paths.map(function (p) { return '<button type="button" class="path-btn' + (p.bug ? " bug" : "") + '" aria-pressed="false" data-path="' + p.id + '">' + esc(p.label) + "</button>"; }).join(""));
    var cur = m.paths[0], wrap = svg.closest(".mapwrap");
    /* On phones the map is drawn at natural size in a sideways scroller: keep the current place in view (the map opens
       scrolled to the start state instead of its empty left edge). */
    function showPlace(at, announce) {
      if (!wrap || wrap.scrollWidth <= wrap.clientWidth + 1) return;
      var sr = svg.getBoundingClientRect(), off = sr.left - wrap.getBoundingClientRect().left - wrap.clientLeft + wrap.scrollLeft;
      var s = sr.width / m.size[0], x0 = off + at.x * s, x1 = off + (at.x + at.w) * s;
      if (x0 >= wrap.scrollLeft + 8 && x1 <= wrap.scrollLeft + wrap.clientWidth - 8) return;
      var left = Math.max(0, Math.min(wrap.scrollWidth - wrap.clientWidth, (x0 + x1) / 2 - wrap.clientWidth / 2));
      if (wrap.scrollTo) wrap.scrollTo({ left: left, behavior: announce && motionOn() ? "smooth" : "auto" }); else wrap.scrollLeft = left;
    }
    function name(id) { return byId[id] ? byId[id].label.replace(/`/g, "") : id; }
    function render(st, announce) {
      var s = cur.steps[st.step];
      var all = svg.querySelectorAll("[data-id]");
      for (var i = 0; i < all.length; i++) { var id = all[i].getAttribute("data-id"); all[i].classList.toggle("on", (s.on || []).indexOf(id) >= 0 || (s.via || []).indexOf(id) >= 0); }
      var at = byId[(s.on || [])[0]];
      var ty = at ? Math.max(at.y + 10, 80) : 0;   // the token draws 78 units above its anchor; keep it inside the map
      if (at) token.setAttribute("transform", "translate(" + (at.x + at.w - 6) + " " + ty + ")");
      if (at) showPlace(at, announce);
      token.style.transform = at ? "translate(" + (at.x + at.w - 6) + "px, " + ty + "px)" : "";
      inner.setAttribute("viewBox", guideViewBox());
      inner.innerHTML = guide({ mood: s.mood || (at && at.kind === "error" ? "surprised" : "happy"), mouth: at && at.kind === "error" ? "o" : "smile", arms: at && at.kind === "end" ? "cheer" : "down" });
      var o = s.output || [];
      out.innerHTML = (o.length ? o.map(esc).join("\n") : (s.error ? "" : '<span class="empty">Nothing on the screen yet.</span>')) + (s.error ? (o.length ? "\n" : "") + '<span class="err">' + esc(s.error) + "</span>" : "");
      note.innerHTML = '<span class="count">Step ' + (st.step + 1) + " of " + cur.steps.length + "</span>" + s.note;
      if (live && announce) live.textContent = cur.label + ", step " + (st.step + 1) + ". " + guideName() + " is at: " + (s.on || []).map(name).join(" and ") + ". " + note.textContent.replace(/^Step \d+ of \d+/, "");
      var bs = bar.querySelectorAll(".path-btn"); for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-path") === cur.id ? "true" : "false");
    }
    function check(p) {
      var q = program(p.program); if (!q) return false;
      var e = p.expect || {}, lastS = p.steps[p.steps.length - 1], ok = true;
      if ("exit" in e && e.exit !== q.exit) ok = false;
      if (e.stdoutExact && ((lastS.output || []).length ? lastS.output.join("\n") + "\n" : "") !== shown(q)) ok = false;
      if (e.stderrContains && q.stderr.indexOf(e.stderrContains) < 0) ok = false;
      if (!ok) report("map-path:" + p.id, "parity failed against " + p.program);
      return ok;
    }
    var rn = runner(box, cur.steps.length, render, { reserve: true });
    function choose(id) {
      cur = m.paths.filter(function (p) { return p.id === id; })[0] || m.paths[0];
      var ok = check(cur);
      if (par) { par.textContent = ok ? "Matches the real run of " + cur.program : "Does not match the real run of " + cur.program; par.classList.toggle("bad", !ok); }
      var tb = box.querySelector(".transcript tbody");
      if (tb) tb.innerHTML = cur.steps.map(function (s, i) { return "<tr><td>" + (i + 1) + "</td><td>" + (s.on || []).map(name).map(esc).join(", ") + "</td><td>" + s.note + "</td></tr>"; }).join("");
      rn.reset(cur.steps.length);
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest(".path-btn"); if (b) { choose(b.getAttribute("data-path")); if (live) live.textContent = "Path chosen: " + b.textContent + "."; } });
    var tv = box.querySelector(".map-text");
    if (tv) tv.innerHTML = "<table><caption>Places on the map</caption><thead><tr><th>Place</th><th>Meaning</th></tr></thead><tbody>" + m.states.map(function (s) { return "<tr><td>" + esc(s.label.replace(/`/g, "")) + "</td><td>" + esc((s.sub || "").replace(/`/g, "")) + (s.kind === "error" ? " (the program stops)" : "") + "</td></tr>"; }).join("") + "</tbody></table>" +
      "<table><caption>Roads between places</caption><thead><tr><th>From</th><th>To</th><th>When</th></tr></thead><tbody>" + m.transitions.map(function (t) { return "<tr><td>" + esc(name(t.from)) + "</td><td>" + esc(name(t.to)) + "</td><td>" + esc([].concat(t.label).join(" ").replace(/`/g, "")) + (t.bug ? " (error road)" : "") + "</td></tr>"; }).join("") + "</tbody></table>";
    choose(m.paths[0].id);
  }

  /* ---------- motion toggle ---------- */
  /* The toggle defaults to on for everyone: with reduced motion the CSS keeps only gentle fades (not zero), and the
     toggle turns even those off. */
  function initMotion() {
    var want = store.get("motion", "on");
    function apply(v) {
      document.documentElement.classList.toggle("motion", v === "on");
      var b = document.getElementById("motion-toggle");
      if (b) { b.setAttribute("aria-pressed", v === "on" ? "true" : "false"); b.textContent = v === "on" ? "Animations: on" : "Animations: off"; }
    }
    apply(want);
    var b = document.getElementById("motion-toggle");
    if (b) b.addEventListener("click", function () { want = want === "on" ? "off" : "on"; store.set("motion", want); apply(want); });
  }

  /* Extension point: comic-widgets.js registers more cast members and widgets before boot runs. */
  var EXT = [];
  /* Character idle loops (bob, blink, wobble, spin) pause while their drawing is off screen. */
  function initIdle() {
    if (!("IntersectionObserver" in root)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle("idle-off", !en.isIntersecting); });
    }, { rootMargin: "200px 0px" });
    var cs = document.querySelectorAll("svg.char");
    for (var i = 0; i < cs.length; i++) io.observe(cs[i]);
  }
  /* ---------- layout helpers that run after every widget is drawn ---------- */
  /* scrollHint(el): a sideways scroller (.picscroll, .mapwrap) gets .scrolls while its content is wider than the box (the
     CSS then shows "Swipe sideways ..." and fades the right edge) and .at-end once scrolled to the end (the fade goes). */
  function scrollHint(el) {
    function upd() {
      var over = el.scrollWidth - el.clientWidth;
      el.classList.toggle("scrolls", over > 8);
      el.classList.toggle("at-end", over <= 8 || el.scrollLeft >= over - 4);
    }
    if (!el._hint) { el._hint = upd; el.addEventListener("scroll", upd, { passive: true }); }
    upd();
  }
  /* Table scrollers (engine pass 3): the trace exercise's table scrolls itself; a chapter's wrapper that scrolls a wide
     table sideways (.vswrap, .cmp-wrap, ... any element holding a table with overflow-x auto or scroll) is marked .tscroll.
     Both get the same hint and edge fade as .picscroll, only while they really overflow. Collapsible boxes, panels and
     notebook pages that happen to scroll are not table scrollers. */
  function tableScrollers() {
    var out = [].slice.call(document.querySelectorAll("table.trace, .tscroll")), ts = document.querySelectorAll("table");
    for (var i = 0; i < ts.length; i++) {
      var w = ts[i].parentElement;
      if (!w || w.classList.contains("tscroll") || /^(DETAILS|BODY|TD|TH)$/.test(w.tagName) || w.matches(".panel, .page-body, .ex-body, .picscroll, .mapwrap, .strip, .notebook")) continue;
      if (!/^(auto|scroll)$/.test(root.getComputedStyle(w).overflowX)) continue;
      w.classList.add("tscroll"); out.push(w);
    }
    return out;
  }
  function initScrollHints() { var els = [].slice.call(document.querySelectorAll(".picscroll, .mapwrap")).concat(tableScrollers()); for (var i = 0; i < els.length; i++) scrollHint(els[i]); }
  /* labelTable(table): text-version tables stack each row as a small card on phones (comic-widgets.css). Each cell gets
     data-h, its column's header, which the card shows as the cell's label; explicit roles keep the table a table for
     screen readers once the CSS changes its display. A data-h written by the page is kept. */
  function labelTable(t) {
    var head = t.querySelectorAll("thead th"), first = t.querySelector("tr");
    if (!head.length && first && first.children.length && [].every.call(first.children, function (c) { return c.tagName === "TH"; })) head = first.children;   // a header row without <thead>
    var hs = [].map.call(head, function (th) { return th.textContent.trim(); });
    t.setAttribute("role", "table");
    [].forEach.call(t.querySelectorAll(":scope > thead, :scope > tbody"), function (g) { g.setAttribute("role", "rowgroup"); });
    [].forEach.call(t.querySelectorAll("tr"), function (tr) {
      tr.setAttribute("role", "row");
      [].forEach.call(tr.children, function (c, i) {
        var isHead = c.tagName === "TH" && (c.parentNode.parentNode.tagName === "THEAD" || [].indexOf.call(head, c) >= 0);
        c.setAttribute("role", isHead ? "columnheader" : c.tagName === "TH" ? "rowheader" : "cell");
        if (c.tagName === "TD" && hs[i] && !c.hasAttribute("data-h")) c.setAttribute("data-h", hs[i]);
      });
    });
  }
  function initTables() {
    var ts = document.querySelectorAll("table.transcript, table.ref-table");
    for (var i = 0; i < ts.length; i++) (function (t) {
      labelTable(t);
      if ("MutationObserver" in root) new MutationObserver(function () { labelTable(t); }).observe(t, { childList: true, subtree: true });   // rows rebuilt later (a map's new path)
    })(ts[i]);
  }
  /* fitLabels(): decorative name plates in character drawings (text.lbl-deco: the Compiler's "rustc", the Inspector's
     hat) are hidden when the drawing is so small that they would render under 12px. The drawings are aria-hidden; the
     name is always in the bubble or the panel's text. */
  /* Every drawing counts, not only svg.char: a character drawn inside a chapter figure (svg[data-char] with no .char
     class, cpp ch1's flow boxes) kept a 9.2px "g++" plate. scope: limit the work to one subtree (after a redraw). */
  var LBL = "svg[data-char] text.lbl-deco, svg.char text.lbl-deco", GROW = "svg[data-char] text.lbl-grow, svg.char text.lbl-grow";
  /* Screen pixels per drawing unit. Taken from the drawing's own screen matrix, not width / viewBox width: a drawing
     whose height is capped (a 54px-tall row of bricks and trains) or one nested inside another svg (py ch14's machine
     in a scene) is drawn smaller than its width suggests. */
  function unitPx(svgEl) {
    if (!svgEl || !svgEl.getBoundingClientRect().width) return 0;
    var m = svgEl.getScreenCTM && svgEl.getScreenCTM();
    if (m && (m.a || m.b)) return Math.sqrt(m.a * m.a + m.b * m.b);
    var vb = svgEl.viewBox && svgEl.viewBox.baseVal;
    return vb && vb.width ? svgEl.getBoundingClientRect().width / vb.width : 0;
  }
  function fitLabels(scope) {
    var sc = scope || document, ts = sc.querySelectorAll(LBL);
    for (var i = 0; i < ts.length; i++) {
      var t = ts[i], k = unitPx(t.ownerSVGElement);
      if (!k) continue;
      var px = Number(t.getAttribute("font-size") || 16) * k;
      if (px < 12) t.setAttribute("visibility", "hidden"); else t.removeAttribute("visibility");
    }
    /* text.lbl-grow (data labels: signpost arms, stamps, index numbers, name plates): when the drawing is small, the
       label grows up to data-maxk (default 1.6) times its drawn size to reach 12px, and is squeezed (textLength) to
       data-fitw units if it then gets too wide. Optional, label-pass additions:
         data-cy="120"  keeps the text's middle at that y as it grows (a label centred on a plate or in a box);
         data-plate="136"  the rect just before the text is its plate: it widens (up to that many units, centred on
                           the text) and gets taller with the grown text, so a grown name stays on its plate. */
    var gs = sc.querySelectorAll(GROW);
    for (var j = 0; j < gs.length; j++) {
      var g = gs[j], k2 = unitPx(g.ownerSVGElement);
      if (!k2) continue;
      if (!g.hasAttribute("data-base")) {
        g.setAttribute("data-base", g.getAttribute("font-size") || "16");
        if (g.hasAttribute("textLength")) g.setAttribute("data-tl", g.getAttribute("textLength"));
        if (g.hasAttribute("data-cy")) g.setAttribute("data-y0", g.getAttribute("y"));
      }
      var base = Number(g.getAttribute("data-base")), maxk = Number(g.getAttribute("data-maxk") || 1.6);
      var size = Math.min(base * maxk, Math.max(base, 12 / k2));
      size = Math.ceil(size * 10) / 10;
      g.setAttribute("font-size", String(size));
      var fitw = Number(g.getAttribute("data-fitw") || 0);
      var est = g.textContent.length * size * (/Bangers/.test(g.getAttribute("font-family") || "") ? 0.5 : 0.62);
      if (fitw && est > fitw) { g.setAttribute("textLength", String(fitw)); g.setAttribute("lengthAdjust", "spacingAndGlyphs"); }
      else if (g.hasAttribute("data-tl")) g.setAttribute("textLength", g.getAttribute("data-tl"));
      else g.removeAttribute("textLength");
      var cy = g.getAttribute("data-cy");
      if (cy != null) g.setAttribute("y", size > base ? String(Math.round((Number(cy) + size * 0.36) * 10) / 10) : g.getAttribute("data-y0"));
      var pl = g.getAttribute("data-plate"), r = g.previousElementSibling;
      if (pl != null && r && r.tagName.toLowerCase() === "rect") {
        if (!r.hasAttribute("data-w0")) { r.setAttribute("data-w0", r.getAttribute("width")); r.setAttribute("data-x0", r.getAttribute("x")); r.setAttribute("data-h0", r.getAttribute("height")); r.setAttribute("data-yr0", r.getAttribute("y")); }
        var w0 = Number(r.getAttribute("data-w0")), h0 = Number(r.getAttribute("data-h0")), x0 = Number(r.getAttribute("data-x0")), y0 = Number(r.getAttribute("data-yr0"));
        var cx = x0 + w0 / 2, pw = size > base ? Math.max(w0, Math.min(Number(pl), Math.min(est, fitw || est) + 14)) : w0;
        var ph = size > base ? Math.max(h0, size * 1.15) : h0, pcy = cy != null ? Number(cy) : y0 + h0 / 2;
        r.setAttribute("width", String(pw)); r.setAttribute("x", String(cx - pw / 2));
        r.setAttribute("height", String(ph)); r.setAttribute("y", String(ph > h0 ? pcy - ph / 2 : y0));
      }
    }
  }
  /* attachTabs(): a .file-tab sits flush on top of the box after it, whatever gap its parent grid uses (the CSS default
     assumes the panel's 14px gap; chapter grids use 6-8px, and the box painted over the file name). */
  function attachTabs() {
    var tabs = [].slice.call(document.querySelectorAll(".file-tab")).filter(function (t) { return t.nextElementSibling && t.getClientRects().length; });
    tabs.forEach(function (t) { t.style.marginBottom = "0px"; });
    var gaps = tabs.map(function (t) {
      var a = t.getBoundingClientRect(), b = t.nextElementSibling.getBoundingClientRect();
      return (b.left < a.right && b.right > a.left) ? b.top - a.bottom : null;
    });
    tabs.forEach(function (t, i) { var g = gaps[i]; t.style.marginBottom = g != null && g >= 0 && g <= 40 ? (-g) + "px" : ""; });
  }
  function initLayout() {
    laidOut = true;
    initScrollHints(); initTables(); fitLabels(); attachTabs();
    var tm = null;
    root.addEventListener("resize", function () { root.clearTimeout(tm); tm = root.setTimeout(function () { initScrollHints(); fitLabels(); attachTabs(); }, 200); });
    // Closed <details> hold drawings, tabs and scrollers that had no size yet.
    document.addEventListener("toggle", function (e) { if (e.target.open) { initScrollHints(); fitLabels(); attachTabs(); } }, true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { initScrollHints(); attachTabs(); });
  }
  function boot() {
    initMotion(); drawCast(); drawSfx(); fillCode(); initAnatomy(); initWalkers(); initMaps();
    EXT.forEach(function (fn) { try { fn(); } catch (e) { report("ext", e.message); } });
    initPanels(); initIdle();
    try { initLayout(); } catch (e) { report("layout", e.message); }
  }
  var api = { stepState: stepState, rng: rng, starPoints: starPoints, highlight: highlight };
  if (typeof module === "object" && module.exports) { module.exports = api; return; }
  P.comic = api;
  P.comic.lib = { program: program, esc: esc, highlight: highlight, runner: runner, rng: rng, sv: sv, wob: wob, wobRect: wobRect, head: head,
    report: report, shown: shown, guide: guide, motionOn: motionOn, store: store, pip: pip, stroke: stroke, cast: CAST, drawCast: drawCast, starPoints: starPoints,
    hangLines: hangLines, addBreaks: addBreaks, codeLines: codeLines, reserveHeight: reserveHeight, reserveSteps: reserveSteps, scrollHint: scrollHint,
    labelTable: labelTable, fitLabels: fitLabels, keepInView: keepInView };
  P.comic.ext = function (fn) { EXT.push(fn); };
  /* Deferred scripts run while readyState is "interactive", before DOMContentLoaded. Waiting for that event
     lets comic-widgets.js (the next deferred script) register its cast and widgets before anything is drawn. */
  if (document.readyState === "complete") boot(); else document.addEventListener("DOMContentLoaded", boot);
})(typeof globalThis !== "undefined" ? globalThis : this);
