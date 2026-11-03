/* JavaScript book, chapter 28 additions ("Theater and Mail"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch28.html. It adds one prop character and no widget, so it claims nothing
   about program output (every output on the page comes from the engine's captured terminals and widgets).

   data-char="replyletter"   The envelope that fetch always brings back: the comic's picture of a Response.
                             data-state = "ok"       (a sealed envelope with a green-ink "200 OK" stamp and a happy face)
                                        | "returned" (a stamped envelope with a "RETURN TO SENDER" bar, a dashed
                                                      border and a worried face: it arrived, but the status says no)
                                        | "lost"     (no envelope at all: a dashed outline with a question mark,
                                                      the network failed, so fetch rejects)
                             data-label = the status text on the stamp, e.g. "200 OK" or "404" (default by state).
                             The state is always written on the drawing in words, never shown by colour alone. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch28.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";

  L.cast.replyletter = { vb: "0 0 190 150", draw: function (el) {
    var state = el.getAttribute("data-state") || "ok";
    var label = el.getAttribute("data-label") || (state === "ok" ? "200 OK" : state === "returned" ? "404" : "NO REPLY");
    var out = '<g class="bob">';
    if (state === "lost") {
      out += '<rect x="22" y="30" width="146" height="96" rx="10" fill="#F3F3F3" stroke="' + INK + '" stroke-width="4" stroke-dasharray="10 7"/>';
      out += '<text x="95" y="96" text-anchor="middle" font-family="Bangers, Impact, sans-serif" font-size="54" fill="' + INK + '">?</text>';
      out += '<rect x="25" y="2" width="140" height="32" rx="6" fill="#FFFFFF"' + S(3) + '/>';
      out += '<text x="95" y="26" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="19" fill="' + INK + '"' + (label.length > 10 ? ' textLength="128" lengthAdjust="spacingAndGlyphs"' : "") + ">" + esc(label) + "</text>";
      return out + "</g>";
    }
    var body = state === "ok" ? "#FFF6CC" : "#FFE1E1";
    var dash = state === "returned" ? ' stroke-dasharray="10 6"' : "";
    // the envelope and its flap
    out += '<rect x="14" y="30" width="162" height="104" rx="8" fill="' + body + '" stroke="' + INK + '" stroke-width="4"' + dash + "/>";
    out += '<path d="M16 34 L95 92 L174 34" fill="none"' + S(4) + "/>";
    // stamp in the corner
    out += '<rect x="132" y="40" width="34" height="38" fill="#FFFFFF"' + S(2.5) + ' stroke-dasharray="3 3"/>';
    out += '<path d="M140 66 q9 -18 18 0" fill="none"' + S(2.5) + "/>";
    // face
    out += '<g class="eyes"><circle cx="72" cy="104" r="4" fill="' + INK + '"/><circle cx="104" cy="104" r="4" fill="' + INK + '"/></g>';
    out += state === "ok" ? '<path d="M78 116 q10 9 20 0" fill="none"' + S(3) + "/>" : '<path d="M78 121 q10 -9 20 0" fill="none"' + S(3) + "/>";
    // status stamp on top
    out += '<g transform="rotate(-6 70 18)"><rect x="12" y="4" width="116" height="30" rx="6" fill="#FFFFFF"' + S(3.5) + "/>";
    out += '<text x="70" y="26" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="800" font-size="19" fill="' + INK + '"' + (label.length > 9 ? ' textLength="104" lengthAdjust="spacingAndGlyphs"' : "") + ">" + esc(label) + "</text></g>";
    if (state === "returned") {
      // a bar stamped right across the envelope (and over the stamp): 16 units stays 12px+ at the 150px card size
      out += '<rect x="18" y="56" width="154" height="26" rx="3" fill="#FFFFFF"' + S(2.5) + "/>";
      out += '<text x="95" y="75" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-weight="700" font-size="16" textLength="142" lengthAdjust="spacingAndGlyphs" fill="' + INK + '">RETURN TO SENDER</text>';
    }
    return out + "</g>";
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
