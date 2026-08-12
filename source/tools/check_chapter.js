#!/usr/bin/env node
/* Browser check for one or more chapter pages, opened over file:// exactly as a learner would.
   Usage: node tools/check_chapter.js python/ch3.html [more pages...] [--shots DIR]
   For each page, at 1280px and 390px (the 390px pass with reduced motion):
     - no console errors or page errors (widgets report problems with console.error, so this catches parity failures too)
     - no ".parity.bad" badge anywhere
     - no empty code or terminal blocks
     - no horizontal page overflow, also with every <details> opened (notebook pages, text versions, hints)
     - no panel whose content is wider than the panel itself (panels clip it silently), with every <details> open
     - every relative link and script/style reference resolves to a file
     - every stepper is walked to its last step, every machine input and map road is clicked (errors surface)
     - P.comic.selfTest(): every exercise, solved with its answer key, is accepted by its own checker
   Exits 1 if any check fails. Screenshots (full page) go to --shots DIR when given. */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const args = process.argv.slice(2);
let shots = null;
const pages = [];
for (let i = 0; i < args.length; i++) { if (args[i] === "--shots") shots = args[++i]; else pages.push(args[i]); }
if (!pages.length) { console.error("usage: check_chapter.js <page.html>... [--shots DIR]"); process.exit(2); }
const SITE = path.resolve(__dirname, "..");

(async () => {
  const browser = await chromium.launch();
  let failed = 0;
  for (const rel of pages) {
    const file = path.resolve(SITE, rel);
    if (!fs.existsSync(file)) { console.log(`FAIL ${rel}: file not found`); failed++; continue; }
    for (const vp of [{ w: 1280, h: 900, reduce: false }, { w: 390, h: 844, reduce: true }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: vp.reduce ? "reduce" : "no-preference" });
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
      page.on("requestfailed", (r) => { if (r.url().startsWith("file:") && !/\/(ch\d+|index)\.html$/.test(r.url())) errors.push("missing file: " + r.url()); });
      await page.goto("file://" + file);
      await page.waitForTimeout(400);
      const report = await page.evaluate(async () => {
        const P = window.POLYGLOT || {};
        const out = { problems: [] };
        out.badParity = [...document.querySelectorAll(".parity.bad")].map((e) => (e.closest("section") || e).getAttribute("aria-label") || e.textContent);
        out.parityOk = document.querySelectorAll(".parity:not(.bad)").length;
        out.empty = [...document.querySelectorAll("pre.code, pre.term, .screen pre")].filter((e) => !e.textContent.trim()).map((e) => (e.closest("section") || {}).getAttribute ? e.closest("section").getAttribute("aria-label") : "?");
        out.overflow = document.scrollingElement.scrollWidth - window.innerWidth;
        // walk every stepper to the end and back
        let steppers = 0;
        // any widget with a Next button counts as a stepper, including chapter extensions
        const boxes = new Set([...document.querySelectorAll('[data-act="next"]')].map((b) => b.closest("section, [data-walk], [data-tracer], [data-map], .ex-card, div[data-ext]") || b.parentElement));
        for (const box of boxes) {
          const next = box.querySelector('[data-act="next"]'); if (!next || !box.querySelector('[data-act="reset"]')) continue;
          const paths = box.querySelectorAll(".path-btn");
          const runs = paths.length ? [...paths] : [null];
          for (const p of runs) {
            if (p) p.click();
            let guard = 0;
            while (next.getAttribute("aria-disabled") !== "true" && guard++ < 200) next.click();
            box.querySelector('[data-act="reset"]').click();
            steppers++;
          }
        }
        out.steppers = steppers;
        let feeds = 0;
        // every choice button outside steppers (machines, extension pickers such as rulers) is clicked once
        for (const b of document.querySelectorAll(".path-btn")) { if (!b.closest("[data-walk],[data-tracer],[data-map]")) { b.click(); feeds++; } }
        out.feeds = feeds;
        // links and assets
        out.refs = [...document.querySelectorAll("a[href], script[src], link[rel=stylesheet][href]")]
          .map((e) => e.getAttribute("href") || e.getAttribute("src"))
          .filter((h) => h && !/^(https?:|#|mailto:)/.test(h));
        out.selfTest = P.comic && P.comic.selfTest ? P.comic.selfTest() : null;
        out.exercises = document.querySelectorAll("[data-ex]").length;
        out.panels = document.querySelectorAll(".panel").length;
        // open every <details> (notebook pages, text versions, hints) and measure the page width again, then restore
        const dets = [...document.querySelectorAll("details")], wasOpen = dets.map((d) => d.open);
        dets.forEach((d) => { d.open = true; });
        out.overflowOpen = document.scrollingElement.scrollWidth - window.innerWidth;
        out.overflowOpenAt = out.overflowOpen > 1 ? dets.filter((d) => d.getBoundingClientRect().right > window.innerWidth + 1).map((d) => (d.querySelector("summary") || d).textContent.trim().slice(0, 50)).slice(0, 4) : [];
        // A panel cuts its content at its border (overflow hidden/clip), so content wider than the panel is lost without any
        // page overflow. Children that scroll on purpose (.code, .term, .picscroll, .mapwrap, wrapped tables) don't widen it.
        // The page column itself: a grid track wider than its strip has eaten the page gutter (layout widths, so a tilted
        // panel's rotation doesn't count).
        out.stripWide = [];
        for (const st of document.querySelectorAll(".strip, .notebook")) {
          if (!st.getClientRects().length) continue;
          for (const c of st.children) {
            if (!c.getClientRects().length || c.offsetWidth <= st.clientWidth + 1 || out.stripWide.length >= 3) continue;
            const lab = (c.getAttribute("aria-label") || "").match(/^Panel (\d+)/);
            out.stripWide.push((lab ? "P" + lab[1] : (c.id || c.className || c.tagName).toString().slice(0, 30)) + " +" + (c.offsetWidth - st.clientWidth) + "px");
          }
        }
        out.clipped = [...document.querySelectorAll(".panel")].filter((p) => p.getClientRects().length && p.scrollWidth - p.clientWidth > 2).map((p) => {
          const no = p.querySelector(":scope > .panel-no"), lab = (p.getAttribute("aria-label") || "").match(/^Panel (\d+)/);
          return "P" + (no ? no.textContent.trim() : lab ? lab[1] : "?") + " +" + (p.scrollWidth - p.clientWidth) + "px";
        });
        dets.forEach((d, i) => { d.open = wasOpen[i]; });
        out.words = document.body.innerText.split(/\s+/).length;
        window.scrollTo(0, 0);
        return out;
      });
      const missing = report.refs.map((h) => h.split("#")[0]).filter((h) => h && !fs.existsSync(path.resolve(path.dirname(file), h)));
      const failedEx = (report.selfTest || []).filter((r) => !r.ok);
      const problems = [];
      if (errors.length) problems.push(`${errors.length} console error(s):\n      ` + errors.slice(0, 12).join("\n      "));
      if (report.badParity.length) problems.push("parity failed: " + report.badParity.join(", "));
      if (report.empty.length) problems.push("empty code/terminal blocks in: " + report.empty.join(", "));
      if (report.overflow > 1) problems.push(`horizontal overflow ${report.overflow}px`);
      else if (report.overflowOpen > 1) problems.push(`horizontal overflow ${report.overflowOpen}px with every <details> open` + (report.overflowOpenAt.length ? ` (in: ${report.overflowOpenAt.join(" | ")})` : ""));
      // Links to sibling chapters or book/home pages that other authors have not written yet are warnings, not failures.
      const pending = missing.filter((h) => /(^|\/)(ch\d+|index)\.html$/.test(h)), realMissing = missing.filter((h) => pending.indexOf(h) < 0);
      if (report.stripWide.length) problems.push("panel clip (page column wider than the body, gutter lost): " + report.stripWide.join(", "));
      if (report.clipped.length) problems.push("panel clip (content wider than its panel, with every <details> open): " + report.clipped.join(", "));
      if (realMissing.length) problems.push("missing files: " + realMissing.join(", "));
      if (pending.length) console.log(`note ${rel}: links to pages not written yet (ok while the book is in progress): ${pending.join(", ")}`);
      if (report.selfTest === null && report.exercises) problems.push("exercises present but selfTest() unavailable");
      if (failedEx.length) problems.push("exercises whose answer key fails their own check: " + failedEx.map((r) => r.id + " (" + r.kind + ")").join(", "));
      if (report.selfTest && report.selfTest.length !== report.exercises) problems.push(`${report.exercises} exercise boxes but ${report.selfTest.length} built`);
      const tag = `${rel} @${vp.w}px${vp.reduce ? " reduced-motion" : ""}`;
      if (problems.length) { failed++; console.log(`FAIL ${tag}\n  - ` + problems.join("\n  - ")); }
      else console.log(`PASS ${tag}: ${report.panels} panels, ${report.exercises} exercises (all keys accepted), ${report.parityOk} parity badges, ${report.steppers} stepper runs, ${report.feeds} choice clicks, ~${report.words} words`);
      if (shots) {
        await page.waitForTimeout(1200); // let entry animations finish so the picture shows the settled state
        fs.mkdirSync(shots, { recursive: true });
        await page.screenshot({ path: path.join(shots, rel.replace(/[\/\\]/g, "_").replace(/\.html$/, "") + `-${vp.w}.png`), fullPage: true });
      }
      await ctx.close();
    }
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error("check_chapter: crashed: " + e.stack); process.exit(1); });
