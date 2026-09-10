// Per-panel screenshots + layout heuristics. Usage: node audit.js <page.html> <outdir>
const path = require("path");
const fs = require("fs");
const { chromium } = require(require.resolve("playwright", { paths: ["/home/claude/comic-site/tools", "/home/claude/comic-site"] }));
const SITE = "/home/claude/comic-site";
const [rel, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const result = {};
  for (const w of [1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto("file://" + path.join(SITE, rel));
    await page.waitForTimeout(1200);
    // open notebook pages and transcripts? only notebook pages
    await page.evaluate(() => { document.querySelectorAll(".notebook details").forEach((d) => (d.open = true)); });
    await page.waitForTimeout(400);
    const rep = await page.evaluate(() => {
      const blocks = [];
      const main = document.querySelector("main.strip");
      const add = (el, kind) => { if (el.getBoundingClientRect().height > 2) blocks.push([el, kind]); };
      [...main.children].forEach((c) => add(c, "main"));
      const nb = document.querySelector(".notebook");
      if (nb) [...nb.children].forEach((c) => add(c, "nb"));
      document.querySelectorAll("body > nav.ch-nav, body > footer").forEach((c) => add(c, "tail"));
      let lastPanel = "0";
      const meta = blocks.map(([el, kind], i) => {
        const al = el.getAttribute("aria-label") || "";
        const m = al.match(/Panel (\d+)/);
        if (m) lastPanel = m[1];
        const tag = m ? "p" + m[1] : kind + "-after-p" + lastPanel + "-" + (el.className || el.tagName).toString().split(" ")[0];
        el.setAttribute("data-audit", String(i));
        return { i, tag, label: al || (el.querySelector("h2,h3,summary,.ex-q,legend") || {}).textContent || el.className };
      });
      const panelOf = (n) => { const b = n.closest("[data-audit]"); return b ? meta[+b.getAttribute("data-audit")].tag : "?"; };
      const vis = (el) => {
        if (!el) return false;
        if (el.closest(".sr-only,[hidden],template,script,style,noscript")) return false;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return false;
        let p = el; while (p && p !== document.body) { if (p.tagName === "DETAILS" && !p.open && !(p.firstElementChild && p.firstElementChild.contains(el))) return false; p = p.parentElement; }
        const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1;
      };
      // ---- small text
      const small = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let tn;
      while ((tn = tw.nextNode())) {
        if (!tn.nodeValue.trim()) continue;
        const el = tn.parentElement; if (!vis(el)) continue;
        if (!el.closest("[data-audit]")) continue;
        textNodes.push(tn);
        let size;
        if (el instanceof SVGElement) {
          const fs = parseFloat(getComputedStyle(el).fontSize);
          const svg = el.ownerSVGElement || el; const ctm = (el.getScreenCTM && el.getScreenCTM()) || { a: 1, d: 1 };
          size = fs * Math.sqrt(Math.abs(ctm.a * ctm.d));
        } else size = parseFloat(getComputedStyle(el).fontSize);
        if (size < 12) small.push({ panel: panelOf(el), svg: el instanceof SVGElement, size: +size.toFixed(1), text: tn.nodeValue.trim().slice(0, 50) });
      }
      // ---- clipped / overflow beyond panel
      const clipped = [], scrollers = [], beyond = [];
      document.querySelectorAll("[data-audit] *").forEach((el) => {
        if (!vis(el)) return;
        const cs = getComputedStyle(el);
        const ox = cs.overflowX;
        if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
          if (ox === "auto" || ox === "scroll") scrollers.push({ panel: panelOf(el), el: el.tagName.toLowerCase() + "." + [...el.classList].join("."), sw: el.scrollWidth, cw: el.clientWidth });
          else if (ox === "hidden" || ox === "clip") clipped.push({ panel: panelOf(el), el: el.tagName.toLowerCase() + "." + [...el.classList].join("."), sw: el.scrollWidth, cw: el.clientWidth, text: (el.textContent || "").trim().slice(0, 60) });
        }
        if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0 && (cs.overflowY === "hidden" || cs.overflowY === "clip") && !(el instanceof SVGElement) && el.textContent.trim())
          clipped.push({ panel: panelOf(el), vertical: true, el: el.tagName.toLowerCase() + "." + [...el.classList].join("."), sh: el.scrollHeight, ch: el.clientHeight, text: (el.textContent || "").trim().slice(0, 60) });
      });
      document.querySelectorAll("[data-audit]").forEach((b) => {
        const br = b.getBoundingClientRect();
        b.querySelectorAll("*").forEach((el) => {
          if (!vis(el)) return;
          // skip if inside a scroller
          let p = el.parentElement, inScroll = false;
          while (p && p !== b) { const o = getComputedStyle(p).overflowX; if (o === "auto" || o === "scroll" || o === "hidden") { inScroll = true; break; } p = p.parentElement; }
          if (inScroll) return;
          const r = el.getBoundingClientRect();
          if (r.right > br.right + 3 || r.left < br.left - 3) {
            if (!el.parentElement || el.parentElement.getBoundingClientRect().right <= br.right + 3 || el.parentElement === b)
              beyond.push({ panel: panelOf(el), el: el.tagName.toLowerCase() + "." + [...el.classList].join("."), l: Math.round(r.left - br.left), r: Math.round(r.right - br.right), text: (el.textContent || "").trim().slice(0, 40) });
          }
        });
      });
      // ---- text overlap (text node rects, same block)
      const rectsBy = {};
      for (const t of textNodes) {
        const el = t.parentElement;
        let p = el.parentElement, inScroll = false;
        const rg = document.createRange(); rg.selectNodeContents(t);
        const rs = [...rg.getClientRects()].filter((r) => r.width > 2 && r.height > 2);
        const key = panelOf(el);
        (rectsBy[key] = rectsBy[key] || []).push(...rs.map((r) => ({ r, t, el })));
      }
      const overlaps = [];
      for (const [k, arr] of Object.entries(rectsBy)) {
        for (let a = 0; a < arr.length; a++) for (let b = a + 1; b < arr.length; b++) {
          const A = arr[a], B = arr[b]; if (A.t === B.t) continue;
          const ix = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left);
          const iy = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
          if (ix <= 1 || iy <= 1) continue;
          const area = ix * iy, sm = Math.min(A.r.width * A.r.height, B.r.width * B.r.height);
          if (area / sm < 0.25) continue;
          // ignore element pairs hidden behind scroll clips
          overlaps.push({ panel: k, a: A.t.nodeValue.trim().slice(0, 30), b: B.t.nodeValue.trim().slice(0, 30), frac: +(area / sm).toFixed(2), y: Math.round(A.r.top + scrollY) });
          if (overlaps.length > 400) break;
        }
      }
      // ---- contrast
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
      const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
      const bgOf = (el) => { let p = el; while (p) { if (p instanceof Element) { const c = parse(getComputedStyle(p).backgroundColor); if (c && c.a > 0.5) return c; if (getComputedStyle(p).backgroundImage !== "none" && p !== document.body) return null; } p = p.parentElement; } return { r: 255, g: 255, b: 255 }; };
      const lowc = []; const seen = new Set();
      for (const t of textNodes) {
        const el = t.parentElement; if (el instanceof SVGElement) continue;
        const fg = parse(getComputedStyle(el).color); const bg = bgOf(el); if (!fg || !bg) continue;
        const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        if (ratio < 7) { const key = panelOf(el) + getComputedStyle(el).color + JSON.stringify(bg); if (seen.has(key)) continue; seen.add(key); lowc.push({ panel: panelOf(el), ratio: +ratio.toFixed(2), fg: getComputedStyle(el).color, bg: `rgb(${bg.r},${bg.g},${bg.b})`, text: t.nodeValue.trim().slice(0, 40) }); }
      }
      // ---- ligatures
      const lig = [];
      document.querySelectorAll("[data-audit] pre, [data-audit] code, [data-audit] kbd, [data-audit] samp").forEach((el) => {
        const cs = getComputedStyle(el);
        if (/Mono/i.test(cs.fontFamily) && cs.fontVariantLigatures !== "none" && !/"liga" 0|"calt" 0/.test(cs.fontFeatureSettings)) lig.push({ panel: panelOf(el), el: el.tagName, flv: cs.fontVariantLigatures, ffs: cs.fontFeatureSettings });
      });
      return { meta, small, clipped, scrollers, beyond, overlaps, lowc, lig: lig.slice(0, 20), ligCount: lig.length, docOverflow: document.scrollingElement.scrollWidth - innerWidth };
    });
    // screenshots
    for (const m of rep.meta) {
      const el = await page.$(`[data-audit="${m.i}"]`);
      try { await el.screenshot({ path: path.join(out, `w${w}-${String(m.i).padStart(3, "0")}-${m.tag}.png`) }); } catch (e) { m.shotErr = e.message; }
    }
    result[w] = rep;
    await ctx.close();
  }
  fs.writeFileSync(path.join(out, "audit.json"), JSON.stringify(result, null, 1));
  await browser.close();
  for (const w of [1280, 390]) {
    const r = result[w];
    console.log(`== ${w}: blocks ${r.meta.length}, small ${r.small.length}, clipped ${r.clipped.length}, scrollers ${r.scrollers.length}, beyond ${r.beyond.length}, overlaps ${r.overlaps.length}, lowcontrast ${r.lowc.length}, lig ${r.ligCount}, docOverflow ${r.docOverflow}`);
  }
})();
