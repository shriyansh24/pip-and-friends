const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  for (const w of [1280, 390]) {
    const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
    await p.goto("file:///home/claude/comic-site/python/ch19.html"); await p.waitForTimeout(500);
    for (const [sel, steps] of [["#tr-look-box", 6], ["#tr-trap-box", 7], ['[data-walk="walk-super"]', 7]]) {
      const box = await p.$(sel);
      for (let i = 0; i < steps; i++) await (await box.$('[data-act="next"]')).click();
      await p.waitForTimeout(200);
      await box.screenshot({ path: `${process.argv[2]}/snap-${w}-${sel.replace(/[^a-z]/g, "")}.png` });
    }
    for (const sel of ['[aria-label="Panel 12: the gatekeeper picture"]', '[aria-label="Panel 37: family tree or toolbelt"]', '[aria-label="Panel 2: one whiteboard, many notebooks"]']) {
      await (await p.$(sel)).screenshot({ path: `${process.argv[2]}/snap-${w}-${sel.replace(/[^0-9]/g, "")}.png` });
    }
  }
  await b.close();
})();
