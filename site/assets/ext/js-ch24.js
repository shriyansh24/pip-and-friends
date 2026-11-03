/* JavaScript book, chapter 24 additions ("Triage and Pager Chains"). Classic deferred script, loaded after comic-cast.js.
   Everything here is local to javascript/ch24.html. It adds one drawing and no widget, so it claims nothing about
   program output (every output on the page comes from the engine's captured terminals and widgets).

   The restaurant pager (the comic's picture of a promise) is the engine's data-char="pager" from comic-critters.js;
   this chapter's old pager24 copy was removed in the fix round.

   data-char="triagedesk" The hospital triage desk: a desk in the middle and three ways out, each with a written sign:
                          TREAT (a bed with a tick: catch and handle), REFER UP (stairs: rethrow, with a cause) and
                          DISCHARGE (an exit door: finally, tidy up). Decorative; the page carries a text version. */
(function (root) {
  "use strict";
  var P = root.POLYGLOT;
  if (!P || !P.comic || !P.comic.lib) { if (root.console) root.console.error("[POLYGLOT.comic] js-ch24.js loaded before comic.js"); return; }
  var L = P.comic.lib, esc = L.esc, S = L.stroke, INK = "#111111";
  var TITLE = 'font-family="Bangers, Impact, sans-serif" letter-spacing="1" fill="' + INK + '"';
  var MONO = 'font-family="JetBrains Mono, monospace" font-weight="800" fill="' + INK + '"';

  L.cast.triagedesk = { vb: "0 0 600 300", draw: function () {
    var o = "";
    // floor
    o += '<path d="M10 268 H590" fill="none"' + S(4) + "/>";
    // ---- left: TREAT, a bed with a tick
    o += '<rect x="22" y="196" width="150" height="34" rx="8" fill="#C9F2D9"' + S(4) + "/>" +
      '<rect x="22" y="176" width="44" height="24" rx="8" fill="#FFFFFF"' + S(3.5) + "/>" +
      '<path d="M30 230 V264 M164 230 V264" fill="none"' + S(5) + "/>" +
      '<circle cx="118" cy="150" r="24" fill="#FFFFFF"' + S(4) + '/><path d="M106 150 l9 9 l16 -18" fill="none"' + S(5) + "/>" +
      '<text x="97" y="52" text-anchor="middle" font-size="30" ' + TITLE + ">TREAT</text>" +
      '<text x="97" y="76" text-anchor="middle" font-size="15" ' + MONO + ">catch it here</text>" +
      '<path d="M210 186 Q170 150 150 140" fill="none"' + S(4) + '/><path d="M162 132 l-14 7 l10 12" fill="none"' + S(4) + "/>";
    // ---- middle: the desk, with a sign and a bell
    o += '<rect x="226" y="58" width="148" height="44" rx="8" fill="#FFD60A"' + S(4) + "/>" +
      '<text x="300" y="90" text-anchor="middle" font-size="28" ' + TITLE + ">TRIAGE</text>" +
      '<path d="M262 102 V176 M338 102 V176" fill="none"' + S(3) + "/>" +
      '<rect x="214" y="176" width="172" height="88" rx="6" fill="#FFF6CC"' + S(4) + "/>" +
      '<path d="M214 198 H386" fill="none"' + S(3) + "/>" +
      '<path d="M286 176 q14 -26 28 0 z" fill="#FFFFFF"' + S(3.5) + '/><circle cx="300" cy="148" r="4" fill="' + INK + '"/>' +
      '<text x="300" y="236" text-anchor="middle" font-size="15" ' + MONO + ">error arrives</text>";
    // ---- top right: REFER UP, stairs with an arrow
    o += '<path d="M420 264 V236 H448 V208 H476 V180 H504 V152 H532" fill="none"' + S(4) + "/>" +
      '<path d="M436 226 L520 142" fill="none"' + S(4) + '/><path d="M500 142 H522 V164" fill="none"' + S(4) + "/>" +
      '<text x="505" y="52" text-anchor="middle" font-size="30" ' + TITLE + ">REFER UP</text>" +
      '<text x="505" y="76" text-anchor="middle" font-size="15" ' + MONO + ">throw, with cause</text>" +
      '<path d="M390 186 Q410 170 428 168" fill="none"' + S(4) + '/><path d="M416 160 l14 8 l-12 10" fill="none"' + S(4) + "/>";
    // ---- far right: DISCHARGE, an exit door
    o += '<rect x="548" y="150" width="40" height="114" rx="4" fill="#DDE8FF"' + S(4) + '/><circle cx="578" cy="210" r="4" fill="' + INK + '"/>' +
      '<rect x="536" y="104" width="62" height="28" rx="5" fill="#FFFFFF"' + S(3) + "/>" +
      '<text x="567" y="125" text-anchor="middle" font-size="18" ' + TITLE + ">EXIT</text>";
    // the discharge label sits under the floor so it never collides with the stairs
    o += '<text x="420" y="292" text-anchor="middle" font-size="22" ' + TITLE + ">DISCHARGE: finally, tidy up</text>";
    return o;
  } };
})(typeof globalThis !== "undefined" ? globalThis : this);
