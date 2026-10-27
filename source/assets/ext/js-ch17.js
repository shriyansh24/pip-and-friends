/* JavaScript book, chapter 17 additions ("Backpacks and Ventriloquists"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch17.html. It adds two prop characters and no widget, so it claims nothing
   about program output (every output on the page comes from the engine's captured terminals and widgets).

   data-char="roompack"  The closure backpack (named roompack because rust ch20 and python ch18 draw other "backpack"s): the comic's picture of the variables a function carries from where it was born.
                         data-items = up to 3 comma-separated tags sticking out of the open top, e.g. "count = 0,step = 2".
                         data-label = the name on the luggage tag (the function that carries it), e.g. "tickets".
                         data-state = "faded" draws it with a dashed outline and "NO OWNER" on the tag: a backpack nobody can
                         reach any more, ready for the garbage collector. The state is written as words, never colour alone.
   data-char="puppet"    The ventriloquist's puppet: the comic's picture of a function whose "me" (this) is chosen by whoever
                         works it. data-label = the words on its placard, e.g. "me = Ada" (default "me = ?").
                         data-mouth = "open" (talking) or "shut" (default). The placard floats above its head like a sign. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch17.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  function bpItems(el) { return (el.getAttribute("data-items") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 3); }
  function bpTop(n) { return n ? 12 + n * 30 + 6 : 40; }
  L.cast.roompack = { vb: function (el) { return "-10 0 200 " + (bpTop(bpItems(el).length) + 186); }, draw: function (el) {
    var faded = el.getAttribute("data-state") === "faded";
    var items = bpItems(el);
    var label = faded ? "NO OWNER" : (el.getAttribute("data-label") || "");
    var line = faded ? ' stroke="' + INK + '" stroke-width="4" stroke-dasharray="9 6" stroke-linejoin="round"' : S(4);
    var out = '<g class="bob">';
    // tags poking out of the open top: each fits its text (the font shrinks for long tags, never below 15 units, so a
    // tag stays at 12px or more wherever the page draws the bag at 160px or wider)
    items.forEach(function (it, i) {
      var fs = Math.max(15, Math.min(17, 170 / (it.length * 0.62))), w = Math.min(196, it.length * fs * 0.62 + 18), y = 12 + i * 30;
      out += '<rect x="' + (90 - w / 2).toFixed(1) + '" y="' + y + '" width="' + w.toFixed(1) + '" height="27" rx="5" fill="#FFFFFF"' + S(2.5) + "/>" +
        '<text x="90" y="' + (y + 19) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(it) + "</text>";
    });
    var top = bpTop(items.length), bot = top + 136;
    // straps
    out += '<path d="M48 ' + (top + 10) + ' q-24 50 -6 ' + (bot - top - 16) + ' M132 ' + (top + 10) + ' q24 50 6 ' + (bot - top - 16) + '" fill="none"' + line + "/>";
    // body of the bag
    out += '<path d="M40 ' + (top + 6) + ' q50 -16 100 0 l8 ' + (bot - top - 6) + ' q-58 12 -116 0 z" fill="' + (faded ? "#F3F3F3" : "#FFD60A") + '"' + line + "/>";
    // front pocket
    out += '<rect x="58" y="' + (top + 56) + '" width="64" height="58" rx="12" fill="' + (faded ? "#FFFFFF" : "#FFF6CC") + '"' + line + "/>";
    out += '<path d="M58 ' + (top + 72) + ' h64" fill="none"' + S(2.5) + "/>";
    // the open lip
    out += '<path d="M40 ' + (top + 6) + ' q50 18 100 0" fill="none"' + line + "/>";
    // luggage tag hanging below the bag
    if (label) {
      var tw = Math.min(196, Math.max(60, label.length * 9.6 + 18));
      out += '<path d="M90 ' + (bot + 4) + ' v6" fill="none"' + S(2.5) + "/>" +
        '<rect x="' + (90 - tw / 2).toFixed(1) + '" y="' + (bot + 10) + '" width="' + tw.toFixed(1) + '" height="26" rx="5" fill="#FFFFFF"' + S(2.5) + "/>" +
        '<text x="90" y="' + (bot + 28) + '" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="15" fill="' + INK + '">' + esc(label) + "</text>";
    }
    return out + "</g>";
  } };

  L.cast.puppet = { vb: "0 0 170 250", draw: function (el) {
    var label = el.getAttribute("data-label") || "me = ?", open = el.getAttribute("data-mouth") === "open";
    // placard above the head, sized to its text
    var fs = Math.max(13, Math.min(20, 150 / (label.length * 0.62))), w = Math.min(166, label.length * fs * 0.62 + 22);
    var out = '<rect x="' + (85 - w / 2).toFixed(1) + '" y="4" width="' + w.toFixed(1) + '" height="36" rx="7" fill="#FFFFFF"' + S(3) + "/>" +
      '<text x="85" y="29" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="' + fs.toFixed(1) + '" fill="' + INK + '">' + esc(label) + "</text>" +
      '<path d="M78 40 l7 9 l7 -9" fill="#FFFFFF"' + S(3) + "/>";
    out += '<g class="bob" transform="translate(5 40)">';
    // body: a little jacket with a bow tie
    out += '<path d="M44 206 l6 -66 q30 -14 60 0 l6 66 z" fill="#DDE8FF"' + S(4) + "/>";
    out += '<path d="M66 140 l14 20 l14 -20" fill="none"' + S(3) + "/>";
    out += '<path d="M68 146 l12 6 l-12 6 z M92 146 l-12 6 l12 6 z" fill="#FF5A4E"' + S(2.5) + "/>";
    // head
    out += '<ellipse cx="80" cy="96" rx="34" ry="38" fill="#FFF6CC"' + S(4) + "/>";
    out += '<path d="M48 80 q32 -40 64 0 q-10 -30 -32 -32 q-22 2 -32 32 z" fill="#2B2B2B"' + S(3) + "/>";
    out += '<g class="eyes"><circle cx="68" cy="92" r="6" fill="#FFFFFF"' + S(2.5) + '/><circle cx="92" cy="92" r="6" fill="#FFFFFF"' + S(2.5) + '/>' +
      '<circle cx="69" cy="93" r="2.6" fill="' + INK + '"/><circle cx="93" cy="93" r="2.6" fill="' + INK + '"/></g>';
    out += '<circle cx="58" cy="108" r="5" fill="#FFE1E1"/><circle cx="102" cy="108" r="5" fill="#FFE1E1"/>';
    // the hinged jaw: two lines down from the corners of the mouth, the classic dummy look
    out += '<path d="M66 112 v18 M94 112 v18" fill="none"' + S(2.5) + "/>";
    out += open ? '<path d="M68 114 q12 6 24 0 l-2 10 q-10 5 -20 0 z" fill="#B00020"' + S(2.5) + "/>" : '<path d="M68 114 q12 6 24 0" fill="none"' + S(3) + "/>";
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
