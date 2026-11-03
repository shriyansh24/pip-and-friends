/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "javascript",
  "capturedWith": [
   "Node.js 26.13.0 LTS",
   "Node.js 22.23.4"
  ],
  "primary": "Node.js 26.13.0 LTS",
  "date": "2026-11-08",
  "workdir": "/home/you/javascript-ch14",
  "versionDifferences": [
   "boss_spot.js",
   "edge_red.test.js",
   "import_in_cjs.cjs",
   "lists.test.js",
   "module_in_esm.js",
   "money.test.js",
   "open_shop.js",
   "predict_default.js",
   "prefix_only.js",
   "print_not_return.test.js",
   "ref_array.js",
   "ref_float.js",
   "ref_string.js",
   "require_in_esm.js",
   "road_missing.js",
   "road_nodot.js",
   "road_noext.js",
   "run_scripts.js",
   "spot_path.js",
   "spot_require.js",
   "stock_up.js",
   "throws_trap.test.js",
   "window_peek.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_spot.js, edge_red.test.js, import_in_cjs.cjs, lists.test.js, module_in_esm.js, money.test.js, open_shop.js, predict_default.js, prefix_only.js, print_not_return.test.js, ref_array.js, ref_float.js, ref_string.js, require_in_esm.js, road_missing.js, road_nodot.js, road_noext.js, run_scripts.js, spot_path.js, spot_require.js, stock_up.js, throws_trap.test.js, window_peek.js."
 },
 "programs": {
  "any_name.js": {
   "src": "import bake from \"./shops/bakery.js\";\nimport makeBread from \"./shops/bakery.js\";\n\nconsole.log(bake(\"rolls\"));\nconsole.log(makeBread(\"buns\"));\nconsole.log(bake === makeBread);\n",
   "stdout": "Bakery: ovens on\nfresh rolls\nfresh buns\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node any_name.js",
     "out": "Bakery: ovens on\nfresh rolls\nfresh buns\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/bakery.js": {
   "src": "console.log(\"Bakery: ovens on\");\n\nexport default function bake(item) {\n  return \"fresh \" + item;\n}\n\nexport const OPENS = 7;\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_fill.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { average } from \"./shops/cart_v2.js\";\n\ntest(\"average of 3 and 5\", () => {\n  assert.equal(average([3, 5]), 4);\n});\n\ntest(\"an empty cart\", () => {\n  assert.equal(average([]), 0);\n});\n",
   "stdout": "✔ average of 3 and 5 (…ms)\n✔ an empty cart (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec boss_fill.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ average of 3 and 5 (…ms)\n✔ an empty cart (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "shops/cart_v2.js": {
   "src": "export function total(prices) {\n  let sum = 0;\n  for (const price of prices) {\n    sum += price;\n  }\n  return sum;\n}\n\nexport function average(prices) {\n  if (prices.length === 0) {\n    return 0;\n  }\n  return total(prices) / prices.length;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_parsons.test.js": {
   "src": "import { describe, it } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { checkPrice } from \"./shops/cart.js\";\n\ndescribe(\"checkPrice()\", () => {\n  it(\"refuses a price below zero\", () => {\n    const bad = -5;\n    assert.throws(() => checkPrice(bad), RangeError);\n  });\n});\n",
   "stdout": "▶ checkPrice()\n  ✔ refuses a price below zero (…ms)\n✔ checkPrice() (…ms)\nℹ tests 1\nℹ suites 1\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec boss_parsons.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ checkPrice()\n  ✔ refuses a price below zero (…ms)\n✔ checkPrice() (…ms)\nℹ tests 1\nℹ suites 1\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "shops/cart.js": {
   "src": "export function total(prices) {\n  let sum = 0;\n  for (const price of prices) {\n    sum += price;\n  }\n  return sum;\n}\n\nexport function average(prices) {\n  return total(prices) / prices.length;\n}\n\nexport function cheapestFirst(prices) {\n  return [...prices].sort((a, b) => a - b);\n}\n\nexport function checkPrice(price) {\n  if (typeof price !== \"number\") {\n    throw new TypeError(\"price must be a number\");\n  }\n  if (price < 0) {\n    throw new RangeError(\"price can't be negative: \" + price);\n  }\n  return price;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_predict.js": {
   "src": "import { seatsLeft, SEATS } from \"./shops/tickets.js\";\nimport oven from \"./shops/bakery.js\";\nimport { OPENS } from \"./shops/bakery.js\";\n\nconsole.log(oven(\"pies\"), \"at\", OPENS);\nconsole.log(seatsLeft(SEATS - 3));\n",
   "stdout": "Bakery: ovens on\nfresh pies at 7\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "Bakery: ovens on\nfresh pies at 7\n3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/tickets.js": {
   "src": "export const SEATS = 40;\n\nexport function seatsLeft(sold) {\n  return SEATS - sold;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_spot.js": {
   "src": "import { withTax } from \"./shops/prices.js\";\nimport { seatsLeft } from \"shops/tickets.js\";\nimport { join } from \"node:path\";\n\nconsole.log(withTax(10), seatsLeft(5), join(\"a\", \"b\"));\n",
   "stdout": "",
   "stderr": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/boss_spot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "",
     "err": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/boss_spot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/boss_spot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node boss_spot.js",
      "out": "",
      "err": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/boss_spot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.js": {
   "src": "function discount(price, percent) {\n  if (percent > 100) percent = 100;\n  return price - (price * percent) / 100;\n}\n\nconst cases = [[50, 10, 45], [50, 0, 50], [50, 100, 0], [50, 150, 0], [50, -10, 50]];\nfor (const [price, percent, expected] of cases) {\n  const actual = discount(price, percent);\n  console.log(price, percent, expected, actual, actual === expected ? \"PASS\" : \"FAIL\");\n}\n",
   "stdout": "50 10 45 45 PASS\n50 0 50 50 PASS\n50 100 0 0 PASS\n50 150 0 0 PASS\n50 -10 50 55 FAIL\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "50 10 45 45 PASS\n50 0 50 50 PASS\n50 100 0 0 PASS\n50 150 0 0 PASS\n50 -10 50 55 FAIL\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "builtins.js": {
   "src": "import { readFileSync } from \"node:fs\";\nimport { basename } from \"node:path\";\n\nconst file = \"shops/menu.txt\";\nconst text = readFileSync(file, \"utf8\");\nconsole.log(\"Reading\", basename(file));\nconsole.log(text.trim().split(\"\\n\").length, \"items on the menu\");\n",
   "stdout": "Reading menu.txt\n3 items on the menu\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node builtins.js",
     "out": "Reading menu.txt\n3 items on the menu\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cents.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total } from \"./shops/cart.js\";\n\ntest(\"count money in cents\", () => {\n  assert.equal(total([10, 20]), 30);\n});\n\ntest(\"or check it is close enough\", () => {\n  const diff = Math.abs(total([0.1, 0.2]) - 0.3);\n  assert.ok(diff < 0.000001);\n});\n",
   "stdout": "✔ count money in cents (…ms)\n✔ or check it is close enough (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec cents.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ count money in cents (…ms)\n✔ or check it is close enough (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "edge_green.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { average } from \"./shops/cart_v2.js\";\n\ntest(\"averages two prices\", () => {\n  assert.equal(average([2, 4]), 3);\n});\n\ntest(\"an empty cart averages 0\", () => {\n  assert.equal(average([]), 0);\n});\n",
   "stdout": "✔ averages two prices (…ms)\n✔ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec edge_green.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ averages two prices (…ms)\n✔ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "edge_red.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { average } from \"./shops/cart.js\";\n\ntest(\"averages two prices\", () => {\n  assert.equal(average([2, 4]), 3);\n});\n\ntest(\"an empty cart averages 0\", () => {\n  assert.equal(average([]), 0);\n});\n",
   "stdout": "✔ averages two prices (…ms)\n✖ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at edge_red.test.js:9:1\n✖ an empty cart averages 0 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  NaN !== 0\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/edge_red.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: NaN,\n    expected: 0,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec edge_red.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ averages two prices (…ms)\n✖ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at edge_red.test.js:9:1\n✖ an empty cart averages 0 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  NaN !== 0\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/edge_red.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: NaN,\n    expected: 0,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch14"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✔ averages two prices (…ms)\n✖ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at edge_red.test.js:9:1\n✖ an empty cart averages 0 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  NaN !== 0\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/edge_red.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: NaN,\n    expected: 0,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node --test --test-reporter=spec edge_red.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✔ averages two prices (…ms)\n✖ an empty cart averages 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at edge_red.test.js:9:1\n✖ an empty cart averages 0 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  NaN !== 0\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/edge_red.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: NaN,\n    expected: 0,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch14"
     }
    ]
   }
  },
  "fill_asserts.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total, cheapestFirst, checkPrice } from \"./shops/cart.js\";\n\ntest(\"total of 1 and 2\", () => {\n  assert.equal(total([1, 2]), 3);\n});\n\ntest(\"cheapest first\", () => {\n  assert.deepEqual(cheapestFirst([5, 1]), [1, 5]);\n});\n\ntest(\"refuses -3\", () => {\n  assert.throws(() => checkPrice(-3), RangeError);\n});\n",
   "stdout": "✔ total of 1 and 2 (…ms)\n✔ cheapest first (…ms)\n✔ refuses -3 (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec fill_asserts.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ total of 1 and 2 (…ms)\n✔ cheapest first (…ms)\n✔ refuses -3 (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "fill_cjs.cjs": {
   "src": "const { withTax } = require(\"./old/prices.cjs\");\nconst path = require(\"node:path\");\n\nconsole.log(\"Lemonade costs\", withTax(1.75));\nconsole.log(path.basename(\"old/prices.cjs\"));\n",
   "stdout": "Lemonade costs 2.1\nprices.cjs\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_cjs.cjs",
     "out": "Lemonade costs 2.1\nprices.cjs\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_import.js": {
   "src": "import { seatsLeft } from \"./shops/tickets.js\";\nimport bake from \"./shops/bakery.js\";\n\nconsole.log(\"Seats left:\", seatsLeft(38));\nconsole.log(bake(\"scones\"));\n",
   "stdout": "Bakery: ovens on\nSeats left: 2\nfresh scones\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_import.js",
     "out": "Bakery: ovens on\nSeats left: 2\nfresh scones\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "first.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total } from \"./shops/cart.js\";\n\ntest(\"adds up three prices\", () => {\n  assert.equal(total([2, 3, 5]), 10);\n});\n\ntest(\"an empty cart costs 0\", () => {\n  assert.equal(total([]), 0);\n});\n",
   "stdout": "✔ adds up three prices (…ms)\n✔ an empty cart costs 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec first.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ adds up three prices (…ms)\n✔ an empty cart costs 0 (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "giant.js": {
   "src": "// snack bar: prices\nconst TAX_RATE = 0.2;\nfunction roundCents(amount) {\n  return Math.round(amount * 100) / 100;\n}\nfunction withTax(price) {\n  return roundCents(price * (1 + TAX_RATE));\n}\n// snack bar: labels\nconst CURRENCY = \"$\";\nfunction label(name, price) {\n  return name.padEnd(10, \".\") + \" \" + CURRENCY + price.toFixed(2);\n}\n// snack bar: the menu board\nconst menu = [[\"Popcorn\", 2.5], [\"Lemonade\", 1.75], [\"Pretzel\", 3]];\nfor (const [name, price] of menu) {\n  console.log(label(name, withTax(price)));\n}\n// ...and 400 more lines: tickets, seats, lights, the cast list...\n",
   "stdout": "Popcorn... $3.00\nLemonade.. $2.10\nPretzel... $3.60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node giant.js",
     "out": "Popcorn... $3.00\nLemonade.. $2.10\nPretzel... $3.60\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "import_in_cjs.cjs": {
   "src": "import { withTax } from \"./shops/prices.js\";\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\n",
   "stdout": "",
   "stderr": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/import_in_cjs.cjs. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/import_in_cjs.cjs:1\nimport { withTax } from \"./shops/prices.js\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node import_in_cjs.cjs",
     "out": "",
     "err": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/import_in_cjs.cjs. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/import_in_cjs.cjs:1\nimport { withTax } from \"./shops/prices.js\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/import_in_cjs.cjs. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/import_in_cjs.cjs:1\nimport { withTax } from \"./shops/prices.js\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node import_in_cjs.cjs",
      "out": "",
      "err": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/import_in_cjs.cjs. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/import_in_cjs.cjs:1\nimport { withTax } from \"./shops/prices.js\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "kiosk.js": {
   "src": "import { withTax } from \"./shops/prices.js\";\nimport { label } from \"./shops/labels.js\";\n\nconst menu = [[\"Popcorn\", 2.5], [\"Lemonade\", 1.75], [\"Pretzel\", 3]];\nfor (const [name, price] of menu) {\n  console.log(label(name, withTax(price)));\n}\n",
   "stdout": "Popcorn... $3.00\nLemonade.. $2.10\nPretzel... $3.60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node kiosk.js",
     "out": "Popcorn... $3.00\nLemonade.. $2.10\nPretzel... $3.60\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/prices.js": {
   "src": "const TAX_RATE = 0.2;\n\nfunction roundCents(amount) {\n  return Math.round(amount * 100) / 100;\n}\n\nexport function withTax(price) {\n  return roundCents(price * (1 + TAX_RATE));\n}\n\nexport const CURRENCY = \"$\";\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shops/labels.js": {
   "src": "import { CURRENCY } from \"./prices.js\";\n\nexport function label(name, price) {\n  return name.padEnd(10, \".\") + \" \" + CURRENCY + price.toFixed(2);\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "lists.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { cheapestFirst } from \"./shops/cart.js\";\n\ntest(\"sorts with equal\", () => {\n  assert.equal(cheapestFirst([3, 1, 2]), [1, 2, 3]);\n});\n\ntest(\"sorts with deepEqual\", () => {\n  assert.deepEqual(cheapestFirst([3, 1, 2]), [1, 2, 3]);\n});\n",
   "stdout": "✖ sorts with equal (…ms)\n✔ sorts with deepEqual (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at lists.test.js:5:1\n✖ sorts with equal (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    1,\n    2,\n    3\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/lists.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 1, 2, 3 ],\n    expected: [ 1, 2, 3 ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec lists.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✖ sorts with equal (…ms)\n✔ sorts with deepEqual (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at lists.test.js:5:1\n✖ sorts with equal (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    1,\n    2,\n    3\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/lists.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 1, 2, 3 ],\n    expected: [ 1, 2, 3 ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch14"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✖ sorts with equal (…ms)\n✔ sorts with deepEqual (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at lists.test.js:5:1\n✖ sorts with equal (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    1,\n    2,\n    3\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/lists.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 1, 2, 3 ],\n    expected: [ 1, 2, 3 ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node --test --test-reporter=spec lists.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✖ sorts with equal (…ms)\n✔ sorts with deepEqual (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at lists.test.js:5:1\n✖ sorts with equal (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    1,\n    2,\n    3\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/lists.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 1, 2, 3 ],\n    expected: [ 1, 2, 3 ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch14"
     }
    ]
   }
  },
  "module_in_esm.js": {
   "src": "function withTax(price) {\n  return Math.round(price * 1.2 * 100) / 100;\n}\n\nmodule.exports = { withTax };\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch14/module_in_esm.js:5\nmodule.exports = { withTax };\n^\n\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/module_in_esm.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node module_in_esm.js",
     "out": "",
     "err": "file:///home/you/javascript-ch14/module_in_esm.js:5\nmodule.exports = { withTax };\n^\n\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/module_in_esm.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch14/module_in_esm.js:5\nmodule.exports = { withTax };\n^\n\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/module_in_esm.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node module_in_esm.js",
      "out": "",
      "err": "file:///home/you/javascript-ch14/module_in_esm.js:5\nmodule.exports = { withTax };\n^\n\nReferenceError: module is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/module_in_esm.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "money.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total } from \"./shops/cart.js\";\n\ntest(\"adds up whole prices\", () => {\n  assert.equal(total([2, 3]), 5);\n});\n\ntest(\"adds up prices with cents\", () => {\n  assert.equal(total([0.1, 0.2]), 0.3);\n});\n",
   "stdout": "✔ adds up whole prices (…ms)\n✖ adds up prices with cents (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at money.test.js:9:1\n✖ adds up prices with cents (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  + actual - expected\n  \n  + 0.30000000000000004\n  - 0.3\n       ^\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/money.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 0.30000000000000004,\n    expected: 0.3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec money.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ adds up whole prices (…ms)\n✖ adds up prices with cents (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at money.test.js:9:1\n✖ adds up prices with cents (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  + actual - expected\n  \n  + 0.30000000000000004\n  - 0.3\n       ^\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/money.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 0.30000000000000004,\n    expected: 0.3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch14"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✔ adds up whole prices (…ms)\n✖ adds up prices with cents (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at money.test.js:9:1\n✖ adds up prices with cents (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  + actual - expected\n  \n  + 0.30000000000000004\n  - 0.3\n       ^\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/money.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 0.30000000000000004,\n    expected: 0.3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node --test --test-reporter=spec money.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✔ adds up whole prices (…ms)\n✖ adds up prices with cents (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at money.test.js:9:1\n✖ adds up prices with cents (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  + actual - expected\n  \n  + 0.30000000000000004\n  - 0.3\n       ^\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/money.test.js:10:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 0.30000000000000004,\n    expected: 0.3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch14"
     }
    ]
   }
  },
  "never_fail.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nfunction halfPrice(price) {\n  return price * 2;\n}\n\ntest(\"half price of 8 is 4\", () => {\n  const result = halfPrice(8);\n  assert.equal(result, result);\n});\n",
   "stdout": "✔ half price of 8 is 4 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec never_fail.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ half price of 8 is 4 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "old_street.cjs": {
   "src": "const { withTax } = require(\"./old/prices.cjs\");\nconst path = require(\"node:path\");\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\nconsole.log(path.join(\"old\", \"prices.cjs\"));\n",
   "stdout": "Popcorn costs 3\nold/prices.cjs\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node old_street.cjs",
     "out": "Popcorn costs 3\nold/prices.cjs\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "old/prices.cjs": {
   "src": "function withTax(price) {\n  return Math.round(price * 1.2 * 100) / 100;\n}\n\nmodule.exports = { withTax };\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "open_shop.js": {
   "src": "// Anchor for the terminal session in open_shop.cmd (run inside corner-shop/).\n// The page shows corner-shop/index.js and the session's real commands.\n",
   "stdout": "Corner shop open! Aisle: snacks/popcorn\n",
   "stderr": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/corner-shop/index.js. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/corner-shop/index.js:1\nimport { join } from \"node:path\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd corner-shop",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "npm init -y",
     "out": "Wrote to /home/you/javascript-ch14/corner-shop/package.json:\n\n{\n  \"name\": \"corner-shop\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"type\": \"commonjs\"\n}\n\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/corner-shop"
    },
    {
     "cmd": "node index.js",
     "out": "",
     "err": "(node:1) Warning: Failed to load the ES module: /home/you/javascript-ch14/corner-shop/index.js. Make sure to set \"type\": \"module\" in the nearest package.json file or use the .mjs extension.\n(Use `node --trace-warnings ...` to show where the warning was created)\n/home/you/javascript-ch14/corner-shop/index.js:1\nimport { join } from \"node:path\";\n^^^^^^\n\nSyntaxError: Cannot use import statement outside a module\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~/javascript-ch14/corner-shop"
    },
    {
     "cmd": "npm pkg set type=module",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/corner-shop"
    },
    {
     "cmd": "node index.js",
     "out": "Corner shop open! Aisle: snacks/popcorn\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/corner-shop"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Corner shop open! Aisle: snacks/popcorn\n",
    "stderr": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch14/corner-shop/index.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch14/corner-shop/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cd corner-shop",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "npm init -y",
      "out": "Wrote to /home/you/javascript-ch14/corner-shop/package.json:\n\n{\n  \"name\": \"corner-shop\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\"\n}\n\n\n\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/corner-shop"
     },
     {
      "cmd": "node index.js",
      "out": "Corner shop open! Aisle: snacks/popcorn\n",
      "err": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch14/corner-shop/index.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch14/corner-shop/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
      "exit": 0,
      "dir": "~/javascript-ch14/corner-shop"
     },
     {
      "cmd": "npm pkg set type=module",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/corner-shop"
     },
     {
      "cmd": "node index.js",
      "out": "Corner shop open! Aisle: snacks/popcorn\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/corner-shop"
     }
    ]
   }
  },
  "corner-shop/index.js": {
   "src": "import { join } from \"node:path\";\n\nconsole.log(\"Corner shop open! Aisle:\", join(\"snacks\", \"popcorn\"));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "parsons_test.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total } from \"./shops/cart.js\";\n\ntest(\"three snacks cost 9\", () => {\n  const prices = [2, 3, 4];\n  const result = total(prices);\n  assert.equal(result, 9);\n});\n",
   "stdout": "✔ three snacks cost 9 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec parsons_test.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ three snacks cost 9 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "predict_default.js": {
   "src": "import { bake } from \"./shops/bakery.js\";\n\nconsole.log(bake(\"bagels\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch14/predict_default.js:1\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_default.js",
     "out": "",
     "err": "file:///home/you/javascript-ch14/predict_default.js:1\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch14/predict_default.js:1\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_default.js",
      "out": "",
      "err": "file:///home/you/javascript-ch14/predict_default.js:1\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_float.js": {
   "src": "console.log(0.1 + 0.2 === 0.3);\nconsole.log(10 + 20 === 30);\nconsole.log(Math.abs(0.1 + 0.2 - 0.3) < 0.000001);\n",
   "stdout": "false\ntrue\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_float.js",
     "out": "false\ntrue\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_shops.js": {
   "src": "import { seatsLeft } from \"./shops/tickets.js\";\nimport bake from \"./shops/bakery.js\";\n\nconsole.log(\"Left:\", seatsLeft(15));\nconsole.log(bake(\"muffins\"));\n",
   "stdout": "Bakery: ovens on\nLeft: 25\nfresh muffins\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_shops.js",
     "out": "Bakery: ovens on\nLeft: 25\nfresh muffins\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "prefix_only.js": {
   "src": "import { test } from \"test\";\n\ntest(\"never runs\", () => {});\n",
   "stdout": "",
   "stderr": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'test' imported from /home/you/javascript-ch14/prefix_only.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node prefix_only.js",
     "out": "",
     "err": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'test' imported from /home/you/javascript-ch14/prefix_only.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'test' imported from /home/you/javascript-ch14/prefix_only.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node prefix_only.js",
      "out": "",
      "err": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'test' imported from /home/you/javascript-ch14/prefix_only.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "print_not_return.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nfunction tax(price) {\n  console.log(price * 0.2);\n}\n\ntest(\"tax on 10 is 2\", () => {\n  assert.equal(tax(10), 2);\n});\n",
   "stdout": "2\n✖ tax on 10 is 2 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at print_not_return.test.js:8:1\n✖ tax on 10 is 2 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  undefined !== 2\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/print_not_return.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    expected: 2,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec print_not_return.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "2\n✖ tax on 10 is 2 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at print_not_return.test.js:8:1\n✖ tax on 10 is 2 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  undefined !== 2\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/print_not_return.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    expected: 2,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch14"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "2\n✖ tax on 10 is 2 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at print_not_return.test.js:8:1\n✖ tax on 10 is 2 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  undefined !== 2\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/print_not_return.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    expected: 2,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node --test --test-reporter=spec print_not_return.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "2\n✖ tax on 10 is 2 (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at print_not_return.test.js:8:1\n✖ tax on 10 is 2 (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  undefined !== 2\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/print_not_return.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    expected: 2,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch14"
     }
    ]
   }
  },
  "ref_array.js": {
   "src": "import assert from \"node:assert/strict\";\n\nassert.equal([1, 2], [1, 2]);\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n\n[\n  1,\n  2\n]\n\n    at file:///home/you/javascript-ch14/ref_array.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: [ 1, 2 ],\n  expected: [ 1, 2 ],\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node ref_array.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n\n[\n  1,\n  2\n]\n\n    at file:///home/you/javascript-ch14/ref_array.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: [ 1, 2 ],\n  expected: [ 1, 2 ],\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n\n[\n  1,\n  2\n]\n\n    at file:///home/you/javascript-ch14/ref_array.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: [ 1, 2 ],\n  expected: [ 1, 2 ],\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node ref_array.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n\n[\n  1,\n  2\n]\n\n    at file:///home/you/javascript-ch14/ref_array.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: [ 1, 2 ],\n  expected: [ 1, 2 ],\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "ref_float.js": {
   "src": "import assert from \"node:assert/strict\";\n\nassert.equal(0.1 + 0.2, 0.3);\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 0.30000000000000004\n- 0.3\n     ^\n\n    at file:///home/you/javascript-ch14/ref_float.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: 0.30000000000000004,\n  expected: 0.3,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node ref_float.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 0.30000000000000004\n- 0.3\n     ^\n\n    at file:///home/you/javascript-ch14/ref_float.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: 0.30000000000000004,\n  expected: 0.3,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 0.30000000000000004\n- 0.3\n     ^\n\n    at file:///home/you/javascript-ch14/ref_float.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: 0.30000000000000004,\n  expected: 0.3,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node ref_float.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 0.30000000000000004\n- 0.3\n     ^\n\n    at file:///home/you/javascript-ch14/ref_float.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: 0.30000000000000004,\n  expected: 0.3,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "ref_pass.js": {
   "src": "import assert from \"node:assert/strict\";\n\nconsole.log(\"A:\", assert.equal(2 + 3, 5));\nconsole.log(\"B:\", assert.equal(\"pop\" + \"corn\", \"popcorn\"));\n",
   "stdout": "A: undefined\nB: undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node ref_pass.js",
     "out": "A: undefined\nB: undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ref_string.js": {
   "src": "import assert from \"node:assert/strict\";\n\nassert.equal(\"5\", 5);\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n\n'5' !== 5\n\n    at file:///home/you/javascript-ch14/ref_string.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: '5',\n  expected: 5,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node ref_string.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n\n'5' !== 5\n\n    at file:///home/you/javascript-ch14/ref_string.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: '5',\n  expected: 5,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n\n'5' !== 5\n\n    at file:///home/you/javascript-ch14/ref_string.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: '5',\n  expected: 5,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node ref_string.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nAssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n\n'5' !== 5\n\n    at file:///home/you/javascript-ch14/ref_string.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  generatedMessage: true,\n  code: 'ERR_ASSERTION',\n  actual: '5',\n  expected: 5,\n  operator: 'strictEqual',\n  diff: 'simple'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "require_in_esm.js": {
   "src": "const { withTax } = require(\"./old/prices.cjs\");\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch14/require_in_esm.js:1\nconst { withTax } = require(\"./old/prices.cjs\");\n                    ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/require_in_esm.js:1:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node require_in_esm.js",
     "out": "",
     "err": "file:///home/you/javascript-ch14/require_in_esm.js:1\nconst { withTax } = require(\"./old/prices.cjs\");\n                    ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/require_in_esm.js:1:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch14/require_in_esm.js:1\nconst { withTax } = require(\"./old/prices.cjs\");\n                    ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/require_in_esm.js:1:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node require_in_esm.js",
      "out": "",
      "err": "file:///home/you/javascript-ch14/require_in_esm.js:1\nconst { withTax } = require(\"./old/prices.cjs\");\n                    ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/require_in_esm.js:1:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_builtin.js": {
   "src": "import { join, extname } from \"node:path\";\n\nconsole.log(join(\"shops\", \"prices.js\"));\nconsole.log(extname(\"prices.js\"));\n",
   "stdout": "shops/prices.js\n.js\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_builtin.js",
     "out": "shops/prices.js\n.js\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_missing.js": {
   "src": "import { sum } from \"lodash\";\n\nconsole.log(sum([2, 3]));\n",
   "stdout": "",
   "stderr": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'lodash' imported from /home/you/javascript-ch14/road_missing.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node road_missing.js",
     "out": "",
     "err": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'lodash' imported from /home/you/javascript-ch14/road_missing.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'lodash' imported from /home/you/javascript-ch14/road_missing.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node road_missing.js",
      "out": "",
      "err": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'lodash' imported from /home/you/javascript-ch14/road_missing.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_nodot.js": {
   "src": "import { withTax } from \"shops/prices.js\";\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\n",
   "stdout": "",
   "stderr": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/road_nodot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node road_nodot.js",
     "out": "",
     "err": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/road_nodot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/road_nodot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node road_nodot.js",
      "out": "",
      "err": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'shops' imported from /home/you/javascript-ch14/road_nodot.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_noext.js": {
   "src": "import { withTax } from \"./shops/prices\";\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/prices' imported from /home/you/javascript-ch14/road_noext.js\nDid you mean to import \"./shops/prices.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/prices'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node road_noext.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/prices' imported from /home/you/javascript-ch14/road_noext.js\nDid you mean to import \"./shops/prices.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/prices'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/prices' imported from /home/you/javascript-ch14/road_noext.js\nDid you mean to import \"./shops/prices.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/prices'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node road_noext.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/prices' imported from /home/you/javascript-ch14/road_noext.js\nDid you mean to import \"./shops/prices.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/prices'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_ok.js": {
   "src": "import { withTax } from \"./shops/prices.js\";\n\nconsole.log(\"Popcorn costs\", withTax(2.5));\n",
   "stdout": "Popcorn costs 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_ok.js",
     "out": "Popcorn costs 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_pkg.js": {
   "src": "import { shout } from \"shout-lib\";\n\nconsole.log(shout(\"popcorn\"));\n",
   "stdout": "POPCORN!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_pkg.js",
     "out": "POPCORN!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "package.json": {
   "src": "{\n  \"type\": \"module\",\n  \"dependencies\": {\n    \"shout-lib\": \"file:market/shout-lib\"\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "sample/package.json": {
   "src": "{\n  \"name\": \"snack-bar-site\",\n  \"version\": \"1.4.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node server.js\",\n    \"test\": \"node --test\",\n    \"format\": \"prettier --write .\"\n  },\n  \"dependencies\": {\n    \"sparkle\": \"^2.1.0\"\n  },\n  \"devDependencies\": {\n    \"prettier\": \"^3.8.1\"\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "market/shout-lib/package.json": {
   "src": "{\n  \"name\": \"shout-lib\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Makes any text LOUD.\",\n  \"type\": \"module\",\n  \"main\": \"index.js\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "market/shout-lib/index.js": {
   "src": "export function shout(text) {\n  return text.toUpperCase() + \"!\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "run_scripts.js": {
   "src": "// Anchor for the terminal session in run_scripts.cmd (run inside snack-bar/).\n// snack-bar/.npmrc sets logs-max=0, so npm writes no timestamped log file and says so; npm test's timings go\n// through the sed shown in the command, with set -o pipefail so the exit code is npm's.\n",
   "stdout": "",
   "stderr": "npm error Missing script: \"manu\"\nnpm error\nnpm error Did you mean this?\nnpm error   npm run menu # run the \"menu\" package script\nnpm error\nnpm error To see a list of scripts, run:\nnpm error   npm run\nnpm error Log files were not written due to the config logs-max=0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd snack-bar",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/snack-bar"
    },
    {
     "cmd": "npm run menu",
     "out": "\n> snack-bar@1.0.0 menu\n> node menu.js\n\nPopcorn, Lemonade, Pretzel\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/snack-bar"
    },
    {
     "cmd": "npm start",
     "out": "\n> snack-bar@1.0.0 start\n> node index.js\n\nSnack bar open for the interval!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/snack-bar"
    },
    {
     "cmd": "npm test | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "\n> snack-bar@1.0.0 test\n> node --test\n\n✔ joins items with commas (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/snack-bar"
    },
    {
     "cmd": "npm run",
     "out": "Lifecycle scripts included in snack-bar@1.0.0:\n  start\n    node index.js\n  test\n    node --test\navailable via `npm run`:\n  menu\n    node menu.js\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/snack-bar"
    },
    {
     "cmd": "npm run manu",
     "out": "",
     "err": "npm error Missing script: \"manu\"\nnpm error\nnpm error Did you mean this?\nnpm error   npm run menu # run the \"menu\" package script\nnpm error\nnpm error To see a list of scripts, run:\nnpm error   npm run\nnpm error Log files were not written due to the config logs-max=0\n",
     "exit": 1,
     "dir": "~/javascript-ch14/snack-bar"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "npm error Missing script: \"manu\"\nnpm error\nnpm error Did you mean this?\nnpm error   npm run menu # run the \"menu\" package script\nnpm error\nnpm error To see a list of scripts, run:\nnpm error   npm run\nnpm error Log files were not written due to the config logs-max=0\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd snack-bar",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/snack-bar"
     },
     {
      "cmd": "npm run menu",
      "out": "\n> snack-bar@1.0.0 menu\n> node menu.js\n\nPopcorn, Lemonade, Pretzel\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/snack-bar"
     },
     {
      "cmd": "npm start",
      "out": "\n> snack-bar@1.0.0 start\n> node index.js\n\nSnack bar open for the interval!\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/snack-bar"
     },
     {
      "cmd": "npm test | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "\n> snack-bar@1.0.0 test\n> node --test\n\nTAP version 13\n# Subtest: joins items with commas\nok 1 - joins items with commas\n  ---\n  duration_ms: 0.615127\n  type: 'test'\n  ...\n1..1\n# tests 1\n# suites 0\n# pass 1\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n# duration_ms …\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/snack-bar"
     },
     {
      "cmd": "npm run",
      "out": "Lifecycle scripts included in snack-bar@1.0.0:\n  start\n    node index.js\n  test\n    node --test\navailable via `npm run-script`:\n  menu\n    node menu.js\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/snack-bar"
     },
     {
      "cmd": "npm run manu",
      "out": "",
      "err": "npm error Missing script: \"manu\"\nnpm error\nnpm error Did you mean this?\nnpm error   npm run menu # run the \"menu\" package script\nnpm error\nnpm error To see a list of scripts, run:\nnpm error   npm run\nnpm error Log files were not written due to the config logs-max=0\n",
      "exit": 1,
      "dir": "~/javascript-ch14/snack-bar"
     }
    ]
   }
  },
  "snack-bar/package.json": {
   "src": "{\n  \"name\": \"snack-bar\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node index.js\",\n    \"menu\": \"node menu.js\",\n    \"test\": \"node --test\"\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "snack-bar/.npmrc": {
   "src": "logs-max=0\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "snack-bar/index.js": {
   "src": "console.log(\"Snack bar open for the interval!\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "snack-bar/menu.js": {
   "src": "import { menuLine } from \"./menu-line.js\";\n\nconsole.log(menuLine([\"Popcorn\", \"Lemonade\", \"Pretzel\"]));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "snack-bar/menu-line.js": {
   "src": "export function menuLine(items) {\n  return items.join(\", \");\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "snack-bar/menu-line.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { menuLine } from \"./menu-line.js\";\n\ntest(\"joins items with commas\", () => {\n  assert.equal(menuLine([\"Tea\", \"Cake\"]), \"Tea, Cake\");\n});\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "spot_path.js": {
   "src": "import { withTax } from \"./shops/prices.js\";\nimport { label } from \"./shops/labels\";\nimport { seatsLeft } from \"./shops/tickets.js\";\n\nconsole.log(label(\"Popcorn\", withTax(2.5)));\nconsole.log(\"Seats left:\", seatsLeft(10));\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/labels' imported from /home/you/javascript-ch14/spot_path.js\nDid you mean to import \"./shops/labels.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/labels'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_path.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/labels' imported from /home/you/javascript-ch14/spot_path.js\nDid you mean to import \"./shops/labels.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/labels'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/labels' imported from /home/you/javascript-ch14/spot_path.js\nDid you mean to import \"./shops/labels.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/labels'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_path.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch14/shops/labels' imported from /home/you/javascript-ch14/spot_path.js\nDid you mean to import \"./shops/labels.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch14/shops/labels'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_require.js": {
   "src": "import { withTax } from \"./shops/prices.js\";\nconst { label } = require(\"./shops/labels.js\");\n\nconsole.log(label(\"Popcorn\", withTax(2.5)));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch14/spot_require.js:2\nconst { label } = require(\"./shops/labels.js\");\n                  ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/spot_require.js:2:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_require.js",
     "out": "",
     "err": "file:///home/you/javascript-ch14/spot_require.js:2\nconst { label } = require(\"./shops/labels.js\");\n                  ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/spot_require.js:2:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch14/spot_require.js:2\nconst { label } = require(\"./shops/labels.js\");\n                  ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/spot_require.js:2:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_require.js",
      "out": "",
      "err": "file:///home/you/javascript-ch14/spot_require.js:2\nconst { label } = require(\"./shops/labels.js\");\n                  ^\n\nReferenceError: require is not defined in ES module scope, you can use import instead\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch14/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch14/spot_require.js:2:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "stock_up.js": {
   "src": "// Anchor for the terminal session in stock_up.cmd (run inside popcorn-cart/).\n// The first step also puts popcorn-cart back as it started (package.json copied from package.start.json,\n// no node_modules, no lock file), so every capture run begins from the same place.\n",
   "stdout": "*~ Hello from npx ~*\n",
   "stderr": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'sparkle' imported from /home/you/javascript-ch14/popcorn-cart/index.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd popcorn-cart",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node index.js",
     "out": "",
     "err": "node:internal/modules/package_json_reader:343\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'sparkle' imported from /home/you/javascript-ch14/popcorn-cart/index.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:343:9)\n    at packageResolve (node:internal/modules/esm/resolve:751:25)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~/javascript-ch14/popcorn-cart"
    },
    {
     "cmd": "npm install ../market/sparkle | sed -E 's/ in [0-9.]+m?s$/ in …/'",
     "out": "\nadded 1 package, and audited 3 packages in …\n\nfound 0 vulnerabilities\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/popcorn-cart"
    },
    {
     "cmd": "cat package.json",
     "out": "{\n  \"name\": \"popcorn-cart\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node index.js\"\n  },\n  \"dependencies\": {\n    \"sparkle\": \"file:../market/sparkle\"\n  }\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/popcorn-cart"
    },
    {
     "cmd": "ls node_modules",
     "out": "sparkle\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/popcorn-cart"
    },
    {
     "cmd": "node index.js",
     "out": "*~ Fresh popcorn ~*\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/popcorn-cart"
    },
    {
     "cmd": "npx sparkle Hello from npx",
     "out": "*~ Hello from npx ~*\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14/popcorn-cart"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "*~ Hello from npx ~*\n",
    "stderr": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'sparkle' imported from /home/you/javascript-ch14/popcorn-cart/index.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "cd popcorn-cart",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node index.js",
      "out": "",
      "err": "node:internal/modules/package_json_reader:314\n  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);\n        ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find package 'sparkle' imported from /home/you/javascript-ch14/popcorn-cart/index.js\n    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:314:9)\n    at packageResolve (node:internal/modules/esm/resolve:772:81)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND'\n}\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~/javascript-ch14/popcorn-cart"
     },
     {
      "cmd": "npm install ../market/sparkle | sed -E 's/ in [0-9.]+m?s$/ in …/'",
      "out": "\nadded 1 package in …\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/popcorn-cart"
     },
     {
      "cmd": "cat package.json",
      "out": "{\n  \"name\": \"popcorn-cart\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node index.js\"\n  },\n  \"dependencies\": {\n    \"sparkle\": \"file:../market/sparkle\"\n  }\n}\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/popcorn-cart"
     },
     {
      "cmd": "ls node_modules",
      "out": "sparkle\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/popcorn-cart"
     },
     {
      "cmd": "node index.js",
      "out": "*~ Fresh popcorn ~*\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/popcorn-cart"
     },
     {
      "cmd": "npx sparkle Hello from npx",
      "out": "*~ Hello from npx ~*\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14/popcorn-cart"
     }
    ]
   }
  },
  "popcorn-cart/index.js": {
   "src": "import { sparkle } from \"sparkle\";\n\nconsole.log(sparkle(\"Fresh popcorn\"));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "popcorn-cart/.gitignore": {
   "src": "node_modules/\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "street.js": {
   "src": "import bake from \"./shops/bakery.js\";\nimport { OPENS } from \"./shops/bakery.js\";\n\nconsole.log(\"Kit walks down the street\");\nconst loaf = bake(\"bread\");\nconsole.log(loaf);\nconsole.log(\"Bakery opens at\", OPENS);\n",
   "stdout": "Bakery: ovens on\nKit walks down the street\nfresh bread\nBakery opens at 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node street.js",
     "out": "Bakery: ovens on\nKit walks down the street\nfresh bread\nBakery opens at 7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "suite.test.js": {
   "src": "import { describe, it } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { total, average } from \"./shops/cart.js\";\n\ndescribe(\"total()\", () => {\n  it(\"adds up prices\", () => {\n    assert.equal(total([2, 3, 5]), 10);\n  });\n  it(\"is 0 for an empty cart\", () => {\n    assert.equal(total([]), 0);\n  });\n});\n\ndescribe(\"average()\", () => {\n  it(\"averages prices\", () => {\n    assert.equal(average([2, 4]), 3);\n  });\n});\n",
   "stdout": "▶ total()\n  ✔ adds up prices (…ms)\n  ✔ is 0 for an empty cart (…ms)\n✔ total() (…ms)\n▶ average()\n  ✔ averages prices (…ms)\n✔ average() (…ms)\nℹ tests 3\nℹ suites 2\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec suite.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ total()\n  ✔ adds up prices (…ms)\n  ✔ is 0 for an empty cart (…ms)\n✔ total() (…ms)\n▶ average()\n  ✔ averages prices (…ms)\n✔ average() (…ms)\nℹ tests 3\nℹ suites 2\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "throws.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { checkPrice } from \"./shops/cart.js\";\n\ntest(\"a good price comes back unchanged\", () => {\n  assert.equal(checkPrice(4), 4);\n});\n\ntest(\"a negative price is refused\", () => {\n  assert.throws(() => checkPrice(-1), RangeError);\n});\n\ntest(\"text is refused\", () => {\n  assert.throws(() => checkPrice(\"4\"), TypeError);\n});\n",
   "stdout": "✔ a good price comes back unchanged (…ms)\n✔ a negative price is refused (…ms)\n✔ text is refused (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec throws.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ a good price comes back unchanged (…ms)\n✔ a negative price is refused (…ms)\n✔ text is refused (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    }
   ]
  },
  "throws_trap.test.js": {
   "src": "import { test } from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { checkPrice } from \"./shops/cart.js\";\n\ntest(\"a negative price is refused\", () => {\n  assert.throws(checkPrice(-1), RangeError);\n});\n",
   "stdout": "✖ a negative price is refused (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws_trap.test.js:5:1\n✖ a negative price is refused (…ms)\n  RangeError [Error]: price can't be negative: -1\n      at checkPrice (file:///home/you/javascript-ch14/shops/cart.js:22:11)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/throws_trap.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17)\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch14"
    },
    {
     "cmd": "node --test --test-reporter=spec throws_trap.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✖ a negative price is refused (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws_trap.test.js:5:1\n✖ a negative price is refused (…ms)\n  RangeError [Error]: price can't be negative: -1\n      at checkPrice (file:///home/you/javascript-ch14/shops/cart.js:22:11)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/throws_trap.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17)\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch14"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✖ a negative price is refused (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws_trap.test.js:5:1\n✖ a negative price is refused (…ms)\n  RangeError: price can't be negative: -1\n      at checkPrice (file:///home/you/javascript-ch14/shops/cart.js:22:11)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/throws_trap.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch14"
     },
     {
      "cmd": "node --test --test-reporter=spec throws_trap.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✖ a negative price is refused (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws_trap.test.js:5:1\n✖ a negative price is refused (…ms)\n  RangeError: price can't be negative: -1\n      at checkPrice (file:///home/you/javascript-ch14/shops/cart.js:22:11)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch14/throws_trap.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch14"
     }
    ]
   }
  },
  "trace_ref.js": {
   "src": "function isAdult(age) {\n  return age > 18;\n}\n\nconst cases = [[30, true], [5, false], [18, true], [0, false]];\nfor (const [age, expected] of cases) {\n  const actual = isAdult(age);\n  const verdict = actual === expected ? \"PASS\" : \"FAIL\";\n  console.log(age, expected, actual, verdict);\n}\n",
   "stdout": "30 true true PASS\n5 false false PASS\n18 true false FAIL\n0 false false PASS\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_ref.js",
     "out": "30 true true PASS\n5 false false PASS\n18 true false FAIL\n0 false false PASS\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "window_peek.js": {
   "src": "import { withTax, roundCents } from \"./shops/prices.js\";\n\nconsole.log(withTax(2.5));\nconsole.log(roundCents(1.005));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch14/window_peek.js:1\nimport { withTax, roundCents } from \"./shops/prices.js\";\n                  ^^^^^^^^^^\nSyntaxError: The requested module './shops/prices.js' does not provide an export named 'roundCents'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node window_peek.js",
     "out": "",
     "err": "file:///home/you/javascript-ch14/window_peek.js:1\nimport { withTax, roundCents } from \"./shops/prices.js\";\n                  ^^^^^^^^^^\nSyntaxError: The requested module './shops/prices.js' does not provide an export named 'roundCents'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch14/window_peek.js:1\nimport { withTax, roundCents } from \"./shops/prices.js\";\n                  ^^^^^^^^^^\nSyntaxError: The requested module './shops/prices.js' does not provide an export named 'roundCents'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node window_peek.js",
      "out": "",
      "err": "file:///home/you/javascript-ch14/window_peek.js:1\nimport { withTax, roundCents } from \"./shops/prices.js\";\n                  ^^^^^^^^^^\nSyntaxError: The requested module './shops/prices.js' does not provide an export named 'roundCents'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
