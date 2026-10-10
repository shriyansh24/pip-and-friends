const { chromium } = require("playwright");
(async () => {
  const [w, ...labels] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: +w, height: 900 }, reducedMotion: "reduce" })).newPage();
  await p.goto("file:///home/claude/comic-site/cpp/ch10.html"); await p.waitForTimeout(500);
  for (const l of labels) {
    const el = p.locator(`section[aria-label^="Panel ${l}:"]`).first();
    await el.screenshot({ path: `p${l}_${w}.png` });
  }
  await b.close();
})();
