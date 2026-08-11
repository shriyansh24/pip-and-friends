#!/usr/bin/env node
/* Runs one .html program in headless Chromium for tools/capture.py and prints a JSON-free transcript:
   console.log/info/debug -> stdout, console.warn/error and uncaught errors -> stderr. Exit code 1 if the page threw.
   Optional second argument: a JSON list of actions run in order after load:
     {"click": "css"}  {"type": ["css", "text"]}  {"press": ["css", "Enter"]}  {"wait": 200}
   Deterministic setup: fixed viewport, timezone UTC, locale en-US, no network beyond file://. */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
(async () => {
  const [file, actionsFile] = process.argv.slice(2);
  const actions = actionsFile ? JSON.parse(fs.readFileSync(actionsFile, "utf8")) : [];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 800, height: 600 }, timezoneId: "UTC", locale: "en-US" });
  const page = await ctx.newPage();
  /* Lines are written the moment they happen, each to its own stream. On Linux, writes to pipes and files are
     synchronous in Node, so a run with stderr merged into stdout (capture.py's "merged" rerun) keeps the real
     interleaving a live DevTools Console shows. */
  let threw = false;
  page.on("console", (m) => { const t = m.type(), line = m.text() + "\n"; if (t === "error" || t === "warning") process.stderr.write(line); else process.stdout.write(line); });
  page.on("pageerror", (e) => {
    threw = true;
    // Errors from <script src> files on file:// arrive with "Uncaught " already in e.name; don't print it twice.
    const msg = String(e.message).replace(/^Uncaught\s+/, "");
    const name = String(e.name || "Error").replace(/^Uncaught\s+/, "");
    const named = /^[A-Za-z]*Error\b/.test(msg) ? msg : name + ": " + msg;
    process.stderr.write("Uncaught " + named + "\n");
  });
  await ctx.route(/^(?!file:)/, (r) => r.abort());
  await page.goto("file://" + path.resolve(file));
  await page.waitForTimeout(150);
  for (const a of actions) {
    if (a.click) await page.click(a.click);
    else if (a.type) await page.fill(a.type[0], a.type[1]);
    else if (a.press) await page.press(a.press[0], a.press[1]);
    else if (a.wait) await page.waitForTimeout(a.wait);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(150);
  await browser.close();
  process.exit(threw ? 1 : 0);
})().catch((e) => { process.stderr.write("browser_capture: " + e.message + "\n"); process.exit(2); });
