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
  "workdir": "/home/you/javascript-ch26",
  "versionDifferences": [
   "assign_import.js",
   "barrel_default.js",
   "boss_spot.js",
   "box_missing.cjs",
   "cycle.js",
   "dirname_esm.js",
   "enum.ts",
   "exports_trap.cjs",
   "json_noattr.js",
   "lint_runtime.js",
   "market_nolock.js",
   "mismatch.mjs",
   "noext.js",
   "pkg_private.js",
   "predict_tla.cjs",
   "require_tla.cjs",
   "road_e.js",
   "spot_exports.cjs",
   "spot_named.js",
   "strict_esm.js",
   "syntax_check.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): assign_import.js, barrel_default.js, boss_spot.js, box_missing.cjs, cycle.js, dirname_esm.js, enum.ts, exports_trap.cjs, json_noattr.js, lint_runtime.js, market_nolock.js, mismatch.mjs, noext.js, pkg_private.js, predict_tla.cjs, require_tla.cjs, road_e.js, spot_exports.cjs, spot_named.js, strict_esm.js, syntax_check.js."
 },
 "programs": {
  "assign_import.js": {
   "src": "import { sold } from \"./shops/counter.js\";\n\nconsole.log(\"sold:\", sold);\nsold = 10;\nconsole.log(\"sold:\", sold);\n",
   "stdout": "sold: 0\n",
   "stderr": "file:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node assign_import.js",
     "out": "sold: 0\n",
     "err": "file:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "sold: 0\nfile:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "sold: 0\n",
    "stderr": "file:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node assign_import.js",
      "out": "sold: 0\n",
      "err": "file:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "sold: 0\nfile:///home/you/javascript-ch26/assign_import.js:4\nsold = 10;\n     ^\n\nTypeError: Assignment to constant variable.\n    at file:///home/you/javascript-ch26/assign_import.js:4:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "bad_call.ts": {
   "src": "function nextSeat(seat: number): number {\n  return seat + 1;\n}\n\nconsole.log(nextSeat(12));\nconsole.log(nextSeat(\"12\"));\n",
   "stdout": "13\n121\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bad_call.ts",
     "out": "13\n121\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "barrel.js": {
   "src": "import { price, bake, florist } from \"./shops/index.js\";\n\nconsole.log(price(\"pie\"));\nconsole.log(bake(\"pie\"));\nconsole.log(florist.bouquet(3));\nconsole.log(florist.rose);\n",
   "stdout": "6\nfresh pie\n3 flowers\nred rose\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node barrel.js",
     "out": "6\nfresh pie\n3 flowers\nred rose\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/index.js": {
   "src": "export * from \"./bakery.js\";\nexport { default as bake } from \"./bakery.js\";\nexport * as florist from \"./florist.js\";\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shops/florist.js": {
   "src": "export const rose = \"red rose\";\n\nexport function bouquet(n) {\n  return `${n} flowers`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "barrel_default.js": {
   "src": "import bake from \"./shops/index.js\";\n\nconsole.log(bake(\"pie\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/barrel_default.js:1\nimport bake from \"./shops/index.js\";\n       ^^^^\nSyntaxError: The requested module './shops/index.js' does not provide an export named 'default'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node barrel_default.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/barrel_default.js:1\nimport bake from \"./shops/index.js\";\n       ^^^^\nSyntaxError: The requested module './shops/index.js' does not provide an export named 'default'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/barrel_default.js:1\nimport bake from \"./shops/index.js\";\n       ^^^^\nSyntaxError: The requested module './shops/index.js' does not provide an export named 'default'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node barrel_default.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/barrel_default.js:1\nimport bake from \"./shops/index.js\";\n       ^^^^\nSyntaxError: The requested module './shops/index.js' does not provide an export named 'default'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.js": {
   "src": "import * as florist from \"./shops/florist.js\";\nimport bake, { price } from \"./shops/bakery.js\";\n\nconst extra = await import(\"./lang/fr.js\");\nconsole.log(florist.bouquet(price(\"rose\")));\nconsole.log(bake(\"brioche\"), extra.default);\n",
   "stdout": "8 flowers\nfresh brioche Français\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "8 flowers\nfresh brioche Français\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "import { readFile } from \"node:fs/promises\";\nimport { join } from \"node:path\";\n\nconst file = join(import.meta.dirname, \"data\", \"menu.json\");\nconst text = await readFile(file, \"utf8\");\nconst menu = JSON.parse(text);\nfor (const snack of menu.snacks) {\n  console.log(`${menu.show}: ${snack}`);\n}\n",
   "stdout": "Cuetown Follies: popcorn\nCuetown Follies: lemonade\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "Cuetown Follies: popcorn\nCuetown Follies: lemonade\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "console.log(\"start\", sold);\nimport { sold, sell } from \"./shops/counter.js\";\nsell();\nconst later = await import(\"./shops/counter.js\");\nlater.sell();\nconsole.log(\"end\", sold, later.sold);\nimport \"./stage/power.js\";\n",
   "stdout": "power up\nstart 0\nend 2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "power up\nstart 0\nend 2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "export const CITY = \"Cuetown\";\nexport function price(item) {\n  return item.length * 2;\n}\nexport default const greeting = `Welcome to ${CITY}`;\nconsole.log(price(\"cake\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/boss_spot.js:5\nexport default const greeting = `Welcome to ${CITY}`;\n               ^^^^^\n\nSyntaxError: Unexpected token 'const'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/boss_spot.js:5\nexport default const greeting = `Welcome to ${CITY}`;\n               ^^^^^\n\nSyntaxError: Unexpected token 'const'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/boss_spot.js:5\nexport default const greeting = `Welcome to ${CITY}`;\n               ^^^^^\n\nSyntaxError: Unexpected token 'const'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node boss_spot.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/boss_spot.js:5\nexport default const greeting = `Welcome to ${CITY}`;\n               ^^^^^\n\nSyntaxError: Unexpected token 'const'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.js": {
   "src": "import semver from \"semver\";\n\nconst range = \"^0.3.1\";\nfor (const v of [\"0.3.0\", \"0.3.1\", \"0.3.9\", \"0.4.0\", \"1.0.0\"]) {\n  console.log(v, semver.satisfies(v, range));\n}\n",
   "stdout": "0.3.0 false\n0.3.1 true\n0.3.9 true\n0.4.0 false\n1.0.0 false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "0.3.0 false\n0.3.1 true\n0.3.9 true\n0.4.0 false\n1.0.0 false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "box_missing.cjs": {
   "src": "console.log(\"ordering...\");\nconst { ticket } = require(\"./old/lib.cjs\");\n\nconsole.log(typeof ticket);\nconsole.log(ticket());\n",
   "stdout": "ordering...\nundefined\n",
   "stderr": "/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node box_missing.cjs",
     "out": "ordering...\nundefined\n",
     "err": "/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "ordering...\nundefined\n/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "ordering...\nundefined\n",
    "stderr": "/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node box_missing.cjs",
      "out": "ordering...\nundefined\n",
      "err": "/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "ordering...\nundefined\n/home/you/javascript-ch26/box_missing.cjs:5\nconsole.log(ticket());\n            ^\n\nTypeError: ticket is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/box_missing.cjs:5:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "old/lib.cjs": {
   "src": "module.exports = function ticket() {\n  return \"one ticket, row B\";\n};\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "browser_file.html": {
   "src": "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><title>An import map</title></head>\n<body>\n<script type=\"importmap\">\n  { \"imports\": { \"stagecraft\": \"./web/stagecraft.js\" } }\n</script>\n<script type=\"module\">\n  import { curtain } from \"stagecraft\";\n  console.log(curtain());\n</script>\n</body>\n</html>\n",
   "stdout": "",
   "stderr": "Access to script at 'file:///home/you/javascript-ch26/web/stagecraft.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-untrusted, data, http, https.\nFailed to load resource: net::ERR_FAILED\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "open browser_file.html in a browser (console shown)",
     "out": "",
     "err": "Access to script at 'file:///home/you/javascript-ch26/web/stagecraft.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-untrusted, data, http, https.\nFailed to load resource: net::ERR_FAILED\n",
     "exit": 0
    }
   ]
  },
  "browser_modules.html": {
   "src": "<!doctype html>\n<html lang=\"en\">\n<head><meta charset=\"utf-8\"><title>Two kinds of script</title></head>\n<body>\n<script type=\"module\">\n  console.log(\"module: runs after the page is read\");\n  console.log(\"module: this is\", this);\n</script>\n<script>\n  console.log(\"classic: runs at once\");\n  console.log(\"classic: this is\", String(this));\n</script>\n</body>\n</html>\n",
   "stdout": "classic: runs at once\nclassic: this is [object Window]\nmodule: runs after the page is read\nmodule: this is undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open browser_modules.html in a browser (console shown)",
     "out": "classic: runs at once\nclassic: this is [object Window]\nmodule: runs after the page is read\nmodule: this is undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bundle.js": {
   "src": "// Runs the commands in bundle.cmd.\n",
   "stdout": "popcorn: 3.00 EUR\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node packing/src/app.js",
     "out": "popcorn: 3.00 EUR\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "npx esbuild packing/src/app.js --bundle --outfile=packing/dist/app.js 2>&1 | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\n  packing/dist/app.js  301b \n\n⚡ Done in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "cat packing/dist/app.js",
     "out": "(() => {\n  // packing/src/prices.js\n  function withTax(cents) {\n    return Math.round(cents * 1.2);\n  }\n\n  // packing/src/labels.js\n  function label(name, cents) {\n    return `${name}: ${(cents / 100).toFixed(2)} EUR`;\n  }\n\n  // packing/src/app.js\n  console.log(label(\"popcorn\", withTax(250)));\n})();\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "node packing/dist/app.js",
     "out": "popcorn: 3.00 EUR\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    }
   ]
  },
  "packing/src/app.js": {
   "src": "import { withTax } from \"./prices.js\";\nimport { label } from \"./labels.js\";\n\nconsole.log(label(\"popcorn\", withTax(250)));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "packing/src/prices.js": {
   "src": "export function withTax(cents) {\n  return Math.round(cents * 1.2);\n}\n\nexport function unused() {\n  return \"nobody calls me\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "packing/src/labels.js": {
   "src": "export function label(name, cents) {\n  return `${name}: ${(cents / 100).toFixed(2)} EUR`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cycle.js": {
   "src": "import \"./cycle/actors.js\";\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/cycle/script.js:3\nconst star = cast[0];\n             ^\n\nReferenceError: Cannot access 'cast' before initialization\n    at file:///home/you/javascript-ch26/cycle/script.js:3:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node cycle.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/cycle/script.js:3\nconst star = cast[0];\n             ^\n\nReferenceError: Cannot access 'cast' before initialization\n    at file:///home/you/javascript-ch26/cycle/script.js:3:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/cycle/script.js:3\nconst star = cast[0];\n             ^\n\nReferenceError: Cannot access 'cast' before initialization\n    at file:///home/you/javascript-ch26/cycle/script.js:3:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node cycle.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/cycle/script.js:3\nconst star = cast[0];\n             ^\n\nReferenceError: Cannot access 'cast' before initialization\n    at file:///home/you/javascript-ch26/cycle/script.js:3:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "cycle/actors.js": {
   "src": "import { opening } from \"./script.js\";\n\nexport const cast = [\"Kit\", \"Ada\"];\nconsole.log(opening());\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cycle/script.js": {
   "src": "import { cast } from \"./actors.js\";\n\nconst star = cast[0];\nexport function opening() {\n  return `${star} walks on stage`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cycle_fixed.js": {
   "src": "import \"./cycle2/actors.js\";\n",
   "stdout": "Kit walks on stage\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node cycle_fixed.js",
     "out": "Kit walks on stage\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cycle2/script.js": {
   "src": "import { cast } from \"./actors.js\";\n\nexport function opening() {\n  return `${cast[0]} walks on stage`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "dirname_esm.js": {
   "src": "console.log(\"I live in\", __dirname);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/dirname_esm.js:1\nconsole.log(\"I live in\", __dirname);\n                         ^\n\nReferenceError: __dirname is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch26/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch26/dirname_esm.js:1:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node dirname_esm.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/dirname_esm.js:1\nconsole.log(\"I live in\", __dirname);\n                         ^\n\nReferenceError: __dirname is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch26/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch26/dirname_esm.js:1:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/dirname_esm.js:1\nconsole.log(\"I live in\", __dirname);\n                         ^\n\nReferenceError: __dirname is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch26/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch26/dirname_esm.js:1:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node dirname_esm.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/dirname_esm.js:1\nconsole.log(\"I live in\", __dirname);\n                         ^\n\nReferenceError: __dirname is not defined in ES module scope\nThis file is being treated as an ES module because it has a '.js' file extension and '/home/you/javascript-ch26/package.json' contains \"type\": \"module\". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.\n    at file:///home/you/javascript-ch26/dirname_esm.js:1:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "dynamic.js": {
   "src": "for (const code of [\"fr\", \"en\", \"xx\"]) {\n  try {\n    const shop = await import(`./lang/${code}.js`);\n    console.log(shop.default, \"->\", shop.hello(\"Kit\"));\n  } catch (err) {\n    console.log(code, \"->\", err.code);\n  }\n}\n",
   "stdout": "Français -> Bonjour, Kit !\nEnglish -> Hello, Kit!\nxx -> ERR_MODULE_NOT_FOUND\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node dynamic.js",
     "out": "Français -> Bonjour, Kit !\nEnglish -> Hello, Kit!\nxx -> ERR_MODULE_NOT_FOUND\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lang/fr.js": {
   "src": "export default \"Français\";\n\nexport function hello(name) {\n  return `Bonjour, ${name} !`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "enum.ts": {
   "src": "enum Seat {\n  Stalls,\n  Balcony,\n}\n\nconsole.log(Seat.Balcony);\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nfile:///home/you/javascript-ch26/enum.ts:1\n  > enum Seat {\n      Stalls,\n      Balcony,\n  > }\n\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode\n    at parseTypeScript (node:internal/modules/typescript:57:40)\n    at processTypeScriptCode (node:internal/modules/typescript:129:37)\n    at Object.stripTypeScriptModuleTypes (node:internal/modules/typescript:172:22)\n    at stripTypeScriptModuleTypes (node:internal/modules/esm/translators:35:49)\n    at ModuleLoader.<anonymous> (node:internal/modules/esm/translators:688:29)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52) {\n  code: 'ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node enum.ts",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nfile:///home/you/javascript-ch26/enum.ts:1\n  > enum Seat {\n      Stalls,\n      Balcony,\n  > }\n\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode\n    at parseTypeScript (node:internal/modules/typescript:57:40)\n    at processTypeScriptCode (node:internal/modules/typescript:129:37)\n    at Object.stripTypeScriptModuleTypes (node:internal/modules/typescript:172:22)\n    at stripTypeScriptModuleTypes (node:internal/modules/esm/translators:35:49)\n    at ModuleLoader.<anonymous> (node:internal/modules/esm/translators:688:29)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52) {\n  code: 'ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nfile:///home/you/javascript-ch26/enum.ts:1\n  > enum Seat {\n      Stalls,\n      Balcony,\n  > }\n\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode\n    at parseTypeScript (node:internal/modules/typescript:63:40)\n    at processTypeScriptCode (node:internal/modules/typescript:133:42)\n    at stripTypeScriptModuleTypes (node:internal/modules/typescript:163:10)\n    at ModuleLoader.<anonymous> (node:internal/modules/esm/translators:660:29)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41) {\n  code: 'ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node enum.ts",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nfile:///home/you/javascript-ch26/enum.ts:1\n  > enum Seat {\n      Stalls,\n      Balcony,\n  > }\n\nSyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode\n    at parseTypeScript (node:internal/modules/typescript:63:40)\n    at processTypeScriptCode (node:internal/modules/typescript:133:42)\n    at stripTypeScriptModuleTypes (node:internal/modules/typescript:163:10)\n    at ModuleLoader.<anonymous> (node:internal/modules/esm/translators:660:29)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41) {\n  code: 'ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "exports_trap.cjs": {
   "src": "const greet = require(\"./old/greeter.cjs\");\n\nconsole.log(greet);\nconsole.log(greet(\"Kit\"));\n",
   "stdout": "{}\n",
   "stderr": "/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node exports_trap.cjs",
     "out": "{}\n",
     "err": "/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "{}\n/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "{}\n",
    "stderr": "/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node exports_trap.cjs",
      "out": "{}\n",
      "err": "/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "{}\n/home/you/javascript-ch26/exports_trap.cjs:4\nconsole.log(greet(\"Kit\"));\n            ^\n\nTypeError: greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/exports_trap.cjs:4:13)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "old/greeter.cjs": {
   "src": "function greet(name) {\n  return `Hi, ${name}!`;\n}\n\nexports = greet;\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_cjs.cjs": {
   "src": "const { withTax } = require(\"./old/prices.cjs\");\n\nfunction label(cents) {\n  return `${withTax(cents)} cents`;\n}\n\nmodule.exports = { label };\nconsole.log(module.exports.label(500));\n",
   "stdout": "600 cents\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_cjs.cjs",
     "out": "600 cents\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "old/prices.cjs": {
   "src": "function withTax(cents) {\n  return Math.round(cents * 1.2);\n}\n\nmodule.exports = { withTax };\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_imports.js": {
   "src": "import bake from \"./shops/bakery.js\";\nimport { giftWrap as wrap } from \"./shops/bakery.js\";\nimport * as bakery from \"./shops/bakery.js\";\n\nconsole.log(bake(\"roll\"));\nconsole.log(wrap(\"tart\"));\nconsole.log(bakery.price(\"tart\"), bakery.CITY);\n",
   "stdout": "fresh roll\n[tart]\n8 Cuetown\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_imports.js",
     "out": "fresh roll\n[tart]\n8 Cuetown\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_meta.js": {
   "src": "import menu from \"./data/menu.json\" with { type: \"json\" };\nimport { join } from \"node:path\";\n\nconst here = import.meta.dirname;\nconsole.log(menu.show);\nconsole.log(join(here, \"data\", \"menu.json\"));\n",
   "stdout": "Cuetown Follies\n/home/you/javascript-ch26/data/menu.json\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_meta.js",
     "out": "Cuetown Follies\n/home/you/javascript-ch26/data/menu.json\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "formats.js": {
   "src": "import { execFileSync } from \"node:child_process\";\n\nconst files = [\"a.mjs\", \"b.cjs\", \"typemod/c.js\",\n  \"typecjs/d.js\", \"notype/e.js\", \"notype/f.js\"];\n\nfor (const file of files) {\n  const out = execFileSync(\"node\", [\"combo/\" + file],\n    { encoding: \"utf8\", stdio: [\"ignore\", \"pipe\", \"ignore\"] });\n  const format = out.includes(\"require is function\") ? \"CommonJS\" : \"ESM\";\n  console.log(file, format);\n}\n",
   "stdout": "a.mjs ESM\nb.cjs CommonJS\ntypemod/c.js ESM\ntypecjs/d.js CommonJS\nnotype/e.js ESM\nnotype/f.js CommonJS\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node formats.js",
     "out": "a.mjs ESM\nb.cjs CommonJS\ntypemod/c.js ESM\ntypecjs/d.js CommonJS\nnotype/e.js ESM\nnotype/f.js CommonJS\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "import_cjs.js": {
   "src": "import ticket from \"./old/lib.cjs\";\nimport { sell } from \"./old/counter.cjs\";\n\nconsole.log(ticket());\nconsole.log(typeof sell);\n",
   "stdout": "one ticket, row B\nfunction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node import_cjs.js",
     "out": "one ticket, row B\nfunction\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "import_forms.js": {
   "src": "import bake from \"./shops/bakery.js\";\nimport { price, CITY } from \"./shops/bakery.js\";\nimport { giftWrap as wrap } from \"./shops/bakery.js\";\nimport * as bakery from \"./shops/bakery.js\";\nimport \"./shops/banner.js\";\n\nconsole.log(bake(\"bread\"));\nconsole.log(price(\"bread\"), CITY);\nconsole.log(wrap(\"cake\"));\nconsole.log(bakery);\nconsole.log(bakery.default === bake);\n",
   "stdout": "~ welcome to Cuetown ~\nfresh bread\n10 Cuetown\n[cake]\n[Module: null prototype] {\n  CITY: 'Cuetown',\n  default: [Function: bake],\n  giftWrap: [Function: wrap],\n  price: [Function: price]\n}\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node import_forms.js",
     "out": "~ welcome to Cuetown ~\nfresh bread\n10 Cuetown\n[cake]\n[Module: null prototype] {\n  CITY: 'Cuetown',\n  default: [Function: bake],\n  giftWrap: [Function: wrap],\n  price: [Function: price]\n}\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/bakery.js": {
   "src": "export const CITY = \"Cuetown\";\n\nexport function price(item) {\n  return item.length * 2;\n}\n\nconst secretRecipe = \"extra butter\";\nfunction wrap(item) {\n  return `[${item}]`;\n}\nexport { wrap as giftWrap };\n\nexport default function bake(item) {\n  return `fresh ${item}`;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shops/banner.js": {
   "src": "console.log(\"~ welcome to Cuetown ~\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "jsdoc_check.js": {
   "src": "// Runs the commands in jsdoc_check.cmd.\n",
   "stdout": "checks/seats.js(9,1): error TS2552: Cannot find name 'totl'. Did you mean 'total'?\nchecks/seats.js(10,22): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.\n",
   "stderr": "",
   "exit": 2,
   "steps": [
    {
     "cmd": "npx tsc --noEmit --allowJs --checkJs checks/seats.js",
     "out": "checks/seats.js(9,1): error TS2552: Cannot find name 'totl'. Did you mean 'total'?\nchecks/seats.js(10,22): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.\n",
     "err": "",
     "exit": 2
    }
   ]
  },
  "checks/seats.js": {
   "src": "// @ts-check\n\n/** @param {number} seat */\nfunction nextSeat(seat) {\n  return seat + 1;\n}\n\nlet total = 0;\ntotl = nextSeat(12);\nconsole.log(nextSeat(\"12\"), total);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "json_import.js": {
   "src": "import menu from \"./data/menu.json\" with { type: \"json\" };\n\nconsole.log(menu.show);\nconsole.log(menu.seats - 20, \"seats left\");\nconsole.log(menu.snacks);\n",
   "stdout": "Cuetown Follies\n100 seats left\n[ 'popcorn', 'lemonade' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node json_import.js",
     "out": "Cuetown Follies\n100 seats left\n[ 'popcorn', 'lemonade' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "data/menu.json": {
   "src": "{ \"show\": \"Cuetown Follies\", \"seats\": 120, \"snacks\": [\"popcorn\", \"lemonade\"] }\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "json_noattr.js": {
   "src": "import menu from \"./data/menu.json\";\n\nconsole.log(menu.show);\n",
   "stdout": "",
   "stderr": "node:internal/modules/esm/assert:110\n        throw new ERR_IMPORT_ATTRIBUTE_MISSING(url, 'type', validType);\n              ^\n\nTypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module \"file:///home/you/javascript-ch26/data/menu.json\" needs an import attribute of \"type: json\"\n    at validateAttributes (node:internal/modules/esm/assert:110:15)\n    at defaultLoadSync (node:internal/modules/esm/load:161:3)\n    at #loadAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:809:12)\n    at #loadSync (node:internal/modules/esm/loader:841:53)\n    at ModuleLoader.load (node:internal/modules/esm/loader:790:26)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:501:31)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_IMPORT_ATTRIBUTE_MISSING'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node json_noattr.js",
     "out": "",
     "err": "node:internal/modules/esm/assert:110\n        throw new ERR_IMPORT_ATTRIBUTE_MISSING(url, 'type', validType);\n              ^\n\nTypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module \"file:///home/you/javascript-ch26/data/menu.json\" needs an import attribute of \"type: json\"\n    at validateAttributes (node:internal/modules/esm/assert:110:15)\n    at defaultLoadSync (node:internal/modules/esm/load:161:3)\n    at #loadAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:809:12)\n    at #loadSync (node:internal/modules/esm/loader:841:53)\n    at ModuleLoader.load (node:internal/modules/esm/loader:790:26)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:501:31)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33) {\n  code: 'ERR_IMPORT_ATTRIBUTE_MISSING'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/esm/assert:88\n        throw new ERR_IMPORT_ATTRIBUTE_MISSING(url, 'type', validType);\n              ^\n\nTypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module \"file:///home/you/javascript-ch26/data/menu.json\" needs an import attribute of \"type: json\"\n    at validateAttributes (node:internal/modules/esm/assert:88:15)\n    at defaultLoadSync (node:internal/modules/esm/load:172:3)\n    at ModuleLoader.load (node:internal/modules/esm/loader:831:12)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:609:31)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41) {\n  code: 'ERR_IMPORT_ATTRIBUTE_MISSING'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node json_noattr.js",
      "out": "",
      "err": "node:internal/modules/esm/assert:88\n        throw new ERR_IMPORT_ATTRIBUTE_MISSING(url, 'type', validType);\n              ^\n\nTypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module \"file:///home/you/javascript-ch26/data/menu.json\" needs an import attribute of \"type: json\"\n    at validateAttributes (node:internal/modules/esm/assert:88:15)\n    at defaultLoadSync (node:internal/modules/esm/load:172:3)\n    at ModuleLoader.load (node:internal/modules/esm/loader:831:12)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:609:31)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41) {\n  code: 'ERR_IMPORT_ATTRIBUTE_MISSING'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "lib.mjs": {
   "src": "export default function ticket() {\n  return \"one ticket, row B\";\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lib.mjs",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lint_runtime.js": {
   "src": "// Runs the commands in lint_runtime.cmd.\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/checks/seats.js:9\ntotl = nextSeat(12);\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/checks/seats.js:9:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node checks/seats.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/checks/seats.js:9\ntotl = nextSeat(12);\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/checks/seats.js:9:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/checks/seats.js:9\ntotl = nextSeat(12);\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/checks/seats.js:9:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node checks/seats.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/checks/seats.js:9\ntotl = nextSeat(12);\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/checks/seats.js:9:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "live.js": {
   "src": "import { sold, sell } from \"./shops/counter.js\";\n\nconsole.log(\"sold:\", sold);\nsell();\nconsole.log(\"sold:\", sold);\nsell();\nsell();\nconsole.log(\"sold:\", sold);\n",
   "stdout": "sold: 0\nsold: 1\nsold: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node live.js",
     "out": "sold: 0\nsold: 1\nsold: 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/counter.js": {
   "src": "export let sold = 0;\n\nexport function sell() {\n  sold = sold + 1;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "live_cjs.cjs": {
   "src": "const { sold, sell } = require(\"./old/counter.cjs\");\n\nconsole.log(\"sold:\", sold);\nsell();\nconsole.log(\"sold:\", sold);\nsell();\nsell();\nconsole.log(\"sold:\", sold);\n",
   "stdout": "sold: 0\nsold: 0\nsold: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node live_cjs.cjs",
     "out": "sold: 0\nsold: 0\nsold: 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "old/counter.cjs": {
   "src": "let sold = 0;\n\nfunction sell() {\n  sold = sold + 1;\n}\n\nmodule.exports = { sold, sell };\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "market_dev.js": {
   "src": "// Runs the terminal session in market_dev.cmd (npm against this book's pretend registry).\n",
   "stdout": "confetti\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd party",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "npm install --save-dev drumroll | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nadded 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npx drumroll",
     "out": "ba-dum-tss!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "cat package.json",
     "out": "{\n  \"name\": \"party\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"dependencies\": {\n    \"confetti\": \"^1.5.0\"\n  },\n  \"devDependencies\": {\n    \"drumroll\": \"^0.9.0\"\n  }\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "rm -rf node_modules",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm ci --omit=dev | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nadded 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "ls node_modules",
     "out": "confetti\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    }
   ]
  },
  "market_install.js": {
   "src": "// Runs the terminal session in market_install.cmd (npm against this book's pretend registry).\n",
   "stdout": "confetti 1.5.0: pop!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd party",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "cat .npmrc",
     "out": "registry=http://127.0.0.1:47326/\naudit=false\nfund=false\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm view confetti versions",
     "out": "[ '1.4.1', '1.4.2', '1.5.0' ]\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm install confetti | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nadded 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "cat package.json",
     "out": "{\n  \"name\": \"party\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"dependencies\": {\n    \"confetti\": \"^1.5.0\"\n  }\n}\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "node index.js",
     "out": "confetti 1.5.0: pop!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    }
   ]
  },
  "party/index.js": {
   "src": "import { pop } from \"confetti\";\n\nconsole.log(pop());\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "party/.npmrc": {
   "src": "registry=http://127.0.0.1:47326/\naudit=false\nfund=false\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "registry/serve.cjs": {
   "src": "// A tiny pretend npm registry for this book's offline computer.\n// It serves every package tarball found in ./shelf, the way the real registry would.\nconst http = require(\"node:http\");\nconst fs = require(\"node:fs\");\nconst path = require(\"node:path\");\nconst crypto = require(\"node:crypto\");\nconst zlib = require(\"node:zlib\");\n\nconst PORT = 47326;\nconst SHELF = path.join(__dirname, \"shelf\");\nconst BASE = `http://127.0.0.1:${PORT}`;\n\n// Read package/package.json out of a .tgz file (a gzipped tar archive of 512-byte blocks).\nfunction manifestOf(tgz) {\n  const tar = zlib.gunzipSync(tgz);\n  for (let at = 0; at + 512 <= tar.length; ) {\n    const file = tar.toString(\"utf8\", at, at + 100).replace(/\\0.*$/s, \"\");\n    const size = parseInt(tar.toString(\"utf8\", at + 124, at + 136), 8) || 0;\n    if (file === \"package/package.json\") return JSON.parse(tar.toString(\"utf8\", at + 512, at + 512 + size));\n    at += 512 + Math.ceil(size / 512) * 512;\n  }\n  return {};\n}\n\nfunction packument(name) {\n  const files = fs.readdirSync(SHELF).filter((f) => f.startsWith(name + \"-\") && f.endsWith(\".tgz\"));\n  if (!files.length) return null;\n  const versions = {}, time = { created: \"2026-01-05T10:00:00.000Z\" };\n  for (const f of files) {\n    const version = f.slice(name.length + 1, -4);\n    const data = fs.readFileSync(path.join(SHELF, f));\n    versions[version] = {\n      ...manifestOf(data),\n      dist: {\n        tarball: `${BASE}/${name}/-/${f}`,\n        shasum: crypto.createHash(\"sha1\").update(data).digest(\"hex\"),\n        integrity: \"sha512-\" + crypto.createHash(\"sha512\").update(data).digest(\"base64\"),\n      },\n    };\n    time[version] = \"2026-01-05T10:00:00.000Z\";\n  }\n  const sorted = Object.keys(versions).sort((a, b) => a.localeCompare(b, \"en\", { numeric: true }));\n  time.modified = \"2026-01-05T10:00:00.000Z\";\n  return { name, \"dist-tags\": { latest: sorted[sorted.length - 1] }, versions, time };\n}\n\nhttp.createServer((req, res) => {\n  const url = decodeURIComponent(req.url.split(\"?\")[0]);\n  res.setHeader(\"Cache-Control\", \"no-store\");\n  const tar = url.match(/^\\/([^/]+)\\/-\\/([^/]+\\.tgz)$/);\n  if (tar && fs.existsSync(path.join(SHELF, tar[2]))) {\n    res.setHeader(\"Content-Type\", \"application/octet-stream\");\n    return res.end(fs.readFileSync(path.join(SHELF, tar[2])));\n  }\n  const doc = /^\\/[^/]+$/.test(url) ? packument(url.slice(1)) : null;\n  res.setHeader(\"Content-Type\", \"application/json\");\n  if (!doc) { res.statusCode = 404; return res.end('{\"error\":\"Not found\"}'); }\n  res.end(JSON.stringify(doc));\n}).listen(PORT, \"127.0.0.1\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "market_later.js": {
   "src": "// Runs the terminal session in market_later.cmd (npm against this book's pretend registry).\n",
   "stdout": "confetti 1.6.0: pop!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd party",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "grep -A2 '\"node_modules/confetti\"' package-lock.json",
     "out": "    \"node_modules/confetti\": {\n      \"version\": \"1.5.0\",\n      \"resolved\": \"http://127.0.0.1:47326/confetti/-/confetti-1.5.0.tgz\",\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "../registry/publish.sh confetti-1.6.0 confetti-2.0.0",
     "out": "published confetti-1.6.0\npublished confetti-2.0.0\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm outdated",
     "out": "Package   Current  Wanted  Latest  Location               Depended by\nconfetti    1.5.0   1.6.0   2.0.0  node_modules/confetti  party\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm ci | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nadded 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "node index.js",
     "out": "confetti 1.5.0: pop!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm update | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nchanged 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "node index.js",
     "out": "confetti 1.6.0: pop!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    }
   ]
  },
  "registry/publish.sh": {
   "src": "#!/usr/bin/env bash\n# Publish package files to this book's pretend registry: copy them onto its shelf.\ncd \"$(dirname \"$0\")\"\nfor t in \"$@\"; do\n  cp \"tarballs/$t.tgz\" shelf/\n  echo \"published $t\"\ndone\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "market_nolock.js": {
   "src": "// Runs the terminal session in market_nolock.cmd (npm against this book's pretend registry).\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/party/index.js:1\nimport { pop } from \"confetti\";\n         ^^^\nSyntaxError: The requested module 'confetti' does not provide an export named 'pop'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd party",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "rm package-lock.json",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "rm -rf node_modules",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm install | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nadded 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "node index.js",
     "out": "confetti 1.6.0: pop!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "npm install confetti@2 | sed -E 's/in [0-9.]+m?s/in …/'",
     "out": "\nchanged 1 package in …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/party"
    },
    {
     "cmd": "node index.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/party/index.js:1\nimport { pop } from \"confetti\";\n         ^^^\nSyntaxError: The requested module 'confetti' does not provide an export named 'pop'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~/javascript-ch26/party"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/party/index.js:1\nimport { pop } from \"confetti\";\n         ^^^\nSyntaxError: The requested module 'confetti' does not provide an export named 'pop'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd party",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26"
     },
     {
      "cmd": "rm package-lock.json",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/party"
     },
     {
      "cmd": "rm -rf node_modules",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/party"
     },
     {
      "cmd": "npm install | sed -E 's/in [0-9.]+m?s/in …/'",
      "out": "\nadded 1 package in …\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/party"
     },
     {
      "cmd": "node index.js",
      "out": "confetti 1.6.0: pop!\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/party"
     },
     {
      "cmd": "npm install confetti@2 | sed -E 's/in [0-9.]+m?s/in …/'",
      "out": "\nchanged 1 package in …\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/party"
     },
     {
      "cmd": "node index.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/party/index.js:1\nimport { pop } from \"confetti\";\n         ^^^\nSyntaxError: The requested module 'confetti' does not provide an export named 'pop'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~/javascript-ch26/party"
     }
    ]
   }
  },
  "minify.js": {
   "src": "// Runs the commands in minify.cmd.\n",
   "stdout": "(()=>{function r(o){return Math.round(o*1.2)}function t(o,n){return`${o}: ${(n/100).toFixed(2)} EUR`}console.log(t(\"popcorn\",r(250)));})();\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "npx esbuild packing/src/app.js --bundle --minify",
     "out": "(()=>{function r(o){return Math.round(o*1.2)}function t(o,n){return`${o}: ${(n/100).toFixed(2)} EUR`}console.log(t(\"popcorn\",r(250)));})();\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "mismatch.mjs": {
   "src": "console.log(\"ordering...\");\nimport { ticket } from \"./lib.mjs\";\n\nconsole.log(ticket());\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/mismatch.mjs:2\nimport { ticket } from \"./lib.mjs\";\n         ^^^^^^\nSyntaxError: The requested module './lib.mjs' does not provide an export named 'ticket'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node mismatch.mjs",
     "out": "",
     "err": "file:///home/you/javascript-ch26/mismatch.mjs:2\nimport { ticket } from \"./lib.mjs\";\n         ^^^^^^\nSyntaxError: The requested module './lib.mjs' does not provide an export named 'ticket'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/mismatch.mjs:2\nimport { ticket } from \"./lib.mjs\";\n         ^^^^^^\nSyntaxError: The requested module './lib.mjs' does not provide an export named 'ticket'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node mismatch.mjs",
      "out": "",
      "err": "file:///home/you/javascript-ch26/mismatch.mjs:2\nimport { ticket } from \"./lib.mjs\";\n         ^^^^^^\nSyntaxError: The requested module './lib.mjs' does not provide an export named 'ticket'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "node_run.js": {
   "src": "// Runs the commands in node_run.cmd.\n",
   "stdout": "",
   "stderr": "Missing script: \"chek\" for /home/you/javascript-ch26/workbench/package.json\n\nAvailable scripts are:\n  start: node show.js\n  check: node --check show.js && node --check broken.js\n  hello: echo hello from a script\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd workbench",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "node --run start",
     "out": "Curtain up!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "node --run hello",
     "out": "hello from a script\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "npm run start",
     "out": "\n> workbench@1.0.0 start\n> node show.js\n\nCurtain up!\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "node --run chek",
     "out": "",
     "err": "Missing script: \"chek\" for /home/you/javascript-ch26/workbench/package.json\n\nAvailable scripts are:\n  start: node show.js\n  check: node --check show.js && node --check broken.js\n  hello: echo hello from a script\n",
     "exit": 1,
     "dir": "~/javascript-ch26/workbench"
    }
   ]
  },
  "workbench/package.json": {
   "src": "{\n  \"name\": \"workbench\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node show.js\",\n    \"check\": \"node --check show.js && node --check broken.js\",\n    \"hello\": \"echo hello from a script\"\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "workbench/show.js": {
   "src": "console.log(\"Curtain up!\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "noext.js": {
   "src": "import { price } from \"./shops/bakery\";\n\nconsole.log(price(\"pie\"));\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch26/shops/bakery' imported from /home/you/javascript-ch26/noext.js\nDid you mean to import \"./shops/bakery.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch26/shops/bakery'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node noext.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch26/shops/bakery' imported from /home/you/javascript-ch26/noext.js\nDid you mean to import \"./shops/bakery.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:241:11)\n    at moduleResolve (node:internal/modules/esm/resolve:846:10)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35)\n    at ModuleJob.syncLink (node:internal/modules/esm/module_job:277:33)\n    at ModuleJob.link (node:internal/modules/esm/module_job:389:17) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch26/shops/bakery'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch26/shops/bakery' imported from /home/you/javascript-ch26/noext.js\nDid you mean to import \"./shops/bakery.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch26/shops/bakery'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node noext.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\nError [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/you/javascript-ch26/shops/bakery' imported from /home/you/javascript-ch26/noext.js\nDid you mean to import \"./shops/bakery.js\"?\n    at finalizeResolution (node:internal/modules/esm/resolve:275:11)\n    at moduleResolve (node:internal/modules/esm/resolve:865:10)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_MODULE_NOT_FOUND',\n  url: 'file:///home/you/javascript-ch26/shops/bakery'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "order.js": {
   "src": "console.log(\"main: first line\");\nimport \"./stage/lights.js\";\nimport \"./stage/sound.js\";\nconsole.log(\"main: last line\");\n",
   "stdout": "power up\nlights on\nsound check\nmain: first line\nmain: last line\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node order.js",
     "out": "power up\nlights on\nsound check\nmain: first line\nmain: last line\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stage/power.js": {
   "src": "console.log(\"power up\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "stage/lights.js": {
   "src": "import \"./power.js\";\nconsole.log(\"lights on\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "stage/sound.js": {
   "src": "import \"./power.js\";\nconsole.log(\"sound check\");\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "parsons_dynamic.js": {
   "src": "async function greet(code) {\n  try {\n    const shop = await import(`./lang/${code}.js`);\n    return shop.hello(\"Ada\");\n  } catch (err) {\n    return `no shop for ${code}: ${err.code}`;\n  }\n}\nconsole.log(await greet(\"fr\"));\nconsole.log(await greet(\"de\"));\n",
   "stdout": "Bonjour, Ada !\nno shop for de: ERR_MODULE_NOT_FOUND\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_dynamic.js",
     "out": "Bonjour, Ada !\nno shop for de: ERR_MODULE_NOT_FOUND\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pkg_exports.js": {
   "src": "import { curtain } from \"stagecraft\";\nimport { spotlight } from \"stagecraft/lights\";\n\nconsole.log(curtain());\nconsole.log(spotlight(\"Kit\"));\n",
   "stdout": "the curtain rises\nspotlight on Kit\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pkg_exports.js",
     "out": "the curtain rises\nspotlight on Kit\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "market/stagecraft/package.json": {
   "src": "{\n  \"name\": \"stagecraft\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"exports\": {\n    \".\": \"./index.js\",\n    \"./lights\": \"./lib/lights.js\"\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "pkg_private.js": {
   "src": "import { fuse } from \"stagecraft/lib/wiring.js\";\n\nconsole.log(fuse);\n",
   "stdout": "",
   "stderr": "node:internal/modules/esm/resolve:282\n  return new ERR_PACKAGE_PATH_NOT_EXPORTED(\n         ^\n\nError [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/wiring.js' is not defined by \"exports\" in /home/you/javascript-ch26/node_modules/stagecraft/package.json imported from /home/you/javascript-ch26/pkg_private.js\n    at exportsNotFound (node:internal/modules/esm/resolve:282:10)\n    at packageExportsResolve (node:internal/modules/esm/resolve:630:9)\n    at packageResolve (node:internal/modules/esm/resolve:759:12)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35) {\n  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node pkg_private.js",
     "out": "",
     "err": "node:internal/modules/esm/resolve:282\n  return new ERR_PACKAGE_PATH_NOT_EXPORTED(\n         ^\n\nError [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/wiring.js' is not defined by \"exports\" in /home/you/javascript-ch26/node_modules/stagecraft/package.json imported from /home/you/javascript-ch26/pkg_private.js\n    at exportsNotFound (node:internal/modules/esm/resolve:282:10)\n    at packageExportsResolve (node:internal/modules/esm/resolve:630:9)\n    at packageResolve (node:internal/modules/esm/resolve:759:12)\n    at moduleResolve (node:internal/modules/esm/resolve:840:18)\n    at defaultResolve (node:internal/modules/esm/resolve:973:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:708:20)\n    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:728:38)\n    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:766:56)\n    at #resolve (node:internal/modules/esm/loader:690:17)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:610:35) {\n  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/esm/resolve:318\n  return new ERR_PACKAGE_PATH_NOT_EXPORTED(\n         ^\n\nError [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/wiring.js' is not defined by \"exports\" in /home/you/javascript-ch26/node_modules/stagecraft/package.json imported from /home/you/javascript-ch26/pkg_private.js\n    at exportsNotFound (node:internal/modules/esm/resolve:318:10)\n    at packageExportsResolve (node:internal/modules/esm/resolve:665:9)\n    at packageResolve (node:internal/modules/esm/resolve:778:12)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node pkg_private.js",
      "out": "",
      "err": "node:internal/modules/esm/resolve:318\n  return new ERR_PACKAGE_PATH_NOT_EXPORTED(\n         ^\n\nError [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/wiring.js' is not defined by \"exports\" in /home/you/javascript-ch26/node_modules/stagecraft/package.json imported from /home/you/javascript-ch26/pkg_private.js\n    at exportsNotFound (node:internal/modules/esm/resolve:318:10)\n    at packageExportsResolve (node:internal/modules/esm/resolve:665:9)\n    at packageResolve (node:internal/modules/esm/resolve:778:12)\n    at moduleResolve (node:internal/modules/esm/resolve:859:18)\n    at defaultResolve (node:internal/modules/esm/resolve:989:11)\n    at #cachedDefaultResolve (node:internal/modules/esm/loader:747:20)\n    at ModuleLoader.resolve (node:internal/modules/esm/loader:724:38)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:320:38)\n    at ModuleJob._link (node:internal/modules/esm/module_job:182:49) {\n  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "predict_dynamic.js": {
   "src": "console.log(\"1 before\");\nconst first = await import(\"./stage/power.js\");\nconsole.log(\"2 between\");\nconst second = await import(\"./stage/power.js\");\nconsole.log(\"3\", first === second);\n",
   "stdout": "1 before\npower up\n2 between\n3 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_dynamic.js",
     "out": "1 before\npower up\n2 between\n3 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_live.js": {
   "src": "import { waiting, admit } from \"./shops/queue.js\";\n\nconst snapshot = waiting;\nadmit();\nadmit();\nconsole.log(waiting, snapshot);\nadmit();\nconsole.log(waiting, snapshot);\n",
   "stdout": "3 5\n2 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_live.js",
     "out": "3 5\n2 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shops/queue.js": {
   "src": "export let waiting = 5;\n\nexport function admit() {\n  waiting = waiting - 1;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "predict_order.js": {
   "src": "console.log(\"A\");\nimport { ready } from \"./stage/props.js\";\nconsole.log(\"B\", ready);\nimport \"./stage/power.js\";\n",
   "stdout": "power up\nprops\nA\nB yes\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_order.js",
     "out": "power up\nprops\nA\nB yes\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stage/props.js": {
   "src": "import \"./power.js\";\nconsole.log(\"props\");\nexport const ready = \"yes\";\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "predict_tla.cjs": {
   "src": "const sync = require(\"./esm/sync.mjs\");\nconsole.log(sync.greeting);\nconst later = require(\"./esm/tla.mjs\");\nconsole.log(later.seats);\n",
   "stdout": "hi from an ES module\n",
   "stderr": "node:internal/modules/esm/module_job:314\n    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);\n    ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\nRequired module: /home/you/javascript-ch26/esm/tla.mjs\nRequire stack:\n- /home/you/javascript-ch26/predict_tla.cjs\n    at ModuleJobSync.throwIfAsyncGraph (node:internal/modules/esm/module_job:314:11)\n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:670:10)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:350:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1786:24)\n    at Module._compile (node:internal/modules/cjs/loader:1950:5)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.require (node:internal/modules/cjs/loader:1713:12) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_tla.cjs",
     "out": "hi from an ES module\n",
     "err": "node:internal/modules/esm/module_job:314\n    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);\n    ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\nRequired module: /home/you/javascript-ch26/esm/tla.mjs\nRequire stack:\n- /home/you/javascript-ch26/predict_tla.cjs\n    at ModuleJobSync.throwIfAsyncGraph (node:internal/modules/esm/module_job:314:11)\n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:670:10)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:350:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1786:24)\n    at Module._compile (node:internal/modules/cjs/loader:1950:5)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.require (node:internal/modules/cjs/loader:1713:12) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "hi from an ES module\nnode:internal/modules/esm/module_job:314\n    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);\n    ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\nRequired module: /home/you/javascript-ch26/esm/tla.mjs\nRequire stack:\n- /home/you/javascript-ch26/predict_tla.cjs\n    at ModuleJobSync.throwIfAsyncGraph (node:internal/modules/esm/module_job:314:11)\n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:670:10)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:350:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1786:24)\n    at Module._compile (node:internal/modules/cjs/loader:1950:5)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.require (node:internal/modules/cjs/loader:1713:12) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "hi from an ES module\n",
    "stderr": "node:internal/modules/esm/module_job:450\n      throw new ERR_REQUIRE_ASYNC_MODULE(filename, parentFilename);\n      ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\n  From /home/you/javascript-ch26/predict_tla.cjs \n  Requiring /home/you/javascript-ch26/esm/tla.mjs \n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:450:13)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:445:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1600:24)\n    at Module._compile (node:internal/modules/cjs/loader:1763:5)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Module.require (node:internal/modules/cjs/loader:1527:12)\n    at require (node:internal/modules/helpers:147:16) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_tla.cjs",
      "out": "hi from an ES module\n",
      "err": "node:internal/modules/esm/module_job:450\n      throw new ERR_REQUIRE_ASYNC_MODULE(filename, parentFilename);\n      ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\n  From /home/you/javascript-ch26/predict_tla.cjs \n  Requiring /home/you/javascript-ch26/esm/tla.mjs \n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:450:13)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:445:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1600:24)\n    at Module._compile (node:internal/modules/cjs/loader:1763:5)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Module.require (node:internal/modules/cjs/loader:1527:12)\n    at require (node:internal/modules/helpers:147:16) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "hi from an ES module\nnode:internal/modules/esm/module_job:450\n      throw new ERR_REQUIRE_ASYNC_MODULE(filename, parentFilename);\n      ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\n  From /home/you/javascript-ch26/predict_tla.cjs \n  Requiring /home/you/javascript-ch26/esm/tla.mjs \n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:450:13)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:445:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1600:24)\n    at Module._compile (node:internal/modules/cjs/loader:1763:5)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Module.require (node:internal/modules/cjs/loader:1527:12)\n    at require (node:internal/modules/helpers:147:16) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "predict_ts.ts": {
   "src": "function add(a: number, b: number): number {\n  return a + b;\n}\n\nconst fromForm: any = \"2\";\nconsole.log(add(2, 3));\nconsole.log(add(fromForm, 3));\n",
   "stdout": "5\n23\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_ts.ts",
     "out": "5\n23\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "price.ts": {
   "src": "function withTax(cents: number, rate: number): number {\n  return Math.round(cents * (1 + rate));\n}\n\nconst total: number = withTax(1000, 0.2);\nconsole.log(total);\n",
   "stdout": "1200\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node price.ts",
     "out": "1200\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "require_esm.cjs": {
   "src": "const shop = require(\"./esm/sync.mjs\");\n\nconsole.log(shop.greeting);\nconsole.log(shop.default);\n",
   "stdout": "hi from an ES module\nthe main product\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node require_esm.cjs",
     "out": "hi from an ES module\nthe main product\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "esm/sync.mjs": {
   "src": "export const greeting = \"hi from an ES module\";\nexport default \"the main product\";\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "require_tla.cjs": {
   "src": "const shop = require(\"./esm/tla.mjs\");\n\nconsole.log(shop.seats);\n",
   "stdout": "",
   "stderr": "node:internal/modules/esm/module_job:314\n    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);\n    ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\nRequired module: /home/you/javascript-ch26/esm/tla.mjs\nRequire stack:\n- /home/you/javascript-ch26/require_tla.cjs\n    at ModuleJobSync.throwIfAsyncGraph (node:internal/modules/esm/module_job:314:11)\n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:670:10)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:350:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1786:24)\n    at Module._compile (node:internal/modules/cjs/loader:1950:5)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.require (node:internal/modules/cjs/loader:1713:12) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node require_tla.cjs",
     "out": "",
     "err": "node:internal/modules/esm/module_job:314\n    throw new ERR_REQUIRE_ASYNC_MODULE(filename, parent, locations);\n    ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\nRequired module: /home/you/javascript-ch26/esm/tla.mjs\nRequire stack:\n- /home/you/javascript-ch26/require_tla.cjs\n    at ModuleJobSync.throwIfAsyncGraph (node:internal/modules/esm/module_job:314:11)\n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:670:10)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:350:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1786:24)\n    at Module._compile (node:internal/modules/cjs/loader:1950:5)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.require (node:internal/modules/cjs/loader:1713:12) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/esm/module_job:450\n      throw new ERR_REQUIRE_ASYNC_MODULE(filename, parentFilename);\n      ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\n  From /home/you/javascript-ch26/require_tla.cjs \n  Requiring /home/you/javascript-ch26/esm/tla.mjs \n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:450:13)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:445:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1600:24)\n    at Module._compile (node:internal/modules/cjs/loader:1763:5)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Module.require (node:internal/modules/cjs/loader:1527:12)\n    at require (node:internal/modules/helpers:147:16) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node require_tla.cjs",
      "out": "",
      "err": "node:internal/modules/esm/module_job:450\n      throw new ERR_REQUIRE_ASYNC_MODULE(filename, parentFilename);\n      ^\n\nError [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.\n  From /home/you/javascript-ch26/require_tla.cjs \n  Requiring /home/you/javascript-ch26/esm/tla.mjs \n    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:450:13)\n    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:445:47)\n    at loadESMFromCJS (node:internal/modules/cjs/loader:1600:24)\n    at Module._compile (node:internal/modules/cjs/loader:1763:5)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Module.require (node:internal/modules/cjs/loader:1527:12)\n    at require (node:internal/modules/helpers:147:16) {\n  code: 'ERR_REQUIRE_ASYNC_MODULE'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "esm/tla.mjs": {
   "src": "export const seats = await Promise.resolve(120);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_a.js": {
   "src": "// Runs the commands in road_a.cmd.\n",
   "stdout": "this is undefined\nrequire is undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node a.mjs",
     "out": "this is undefined\nrequire is undefined\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/combo"
    }
   ]
  },
  "combo/a.mjs": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_b.js": {
   "src": "// Runs the commands in road_b.cmd.\n",
   "stdout": "this is {}\nrequire is function\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node b.cjs",
     "out": "this is {}\nrequire is function\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/combo"
    }
   ]
  },
  "combo/b.cjs": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_c.js": {
   "src": "// Runs the commands in road_c.cmd.\n",
   "stdout": "this is undefined\nrequire is undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node typemod/c.js",
     "out": "this is undefined\nrequire is undefined\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/combo"
    }
   ]
  },
  "combo/typemod/c.js": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "combo/typemod/package.json": {
   "src": "{\n  \"type\": \"module\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_d.js": {
   "src": "// Runs the commands in road_d.cmd.\n",
   "stdout": "this is {}\nrequire is function\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node typecjs/d.js",
     "out": "this is {}\nrequire is function\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/combo"
    }
   ]
  },
  "combo/typecjs/d.js": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "combo/typecjs/package.json": {
   "src": "{\n  \"type\": \"commonjs\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_e.js": {
   "src": "// Runs the commands in road_e.cmd.\n",
   "stdout": "this is undefined\nrequire is undefined\n",
   "stderr": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "node notype/e.js",
     "out": "this is undefined\nrequire is undefined\n",
     "err": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
     "exit": 0,
     "dir": "~/javascript-ch26/combo",
     "merged": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\nthis is undefined\nrequire is undefined\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "this is undefined\nrequire is undefined\n",
    "stderr": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "node notype/e.js",
      "out": "this is undefined\nrequire is undefined\n",
      "err": "(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
      "exit": 0,
      "dir": "~/javascript-ch26/combo",
      "merged": "this is undefined\nrequire is undefined\n(node:1) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/you/javascript-ch26/combo/notype/e.js is not specified and it doesn't parse as CommonJS.\nReparsing as ES module because module syntax was detected. This incurs a performance overhead.\nTo eliminate this warning, add \"type\": \"module\" to /home/you/javascript-ch26/combo/notype/package.json.\n(Use `node --trace-warnings ...` to show where the warning was created)\n"
     }
    ]
   }
  },
  "combo/notype/e.js": {
   "src": "export const shop = \"e\";\nconsole.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "combo/notype/package.json": {
   "src": "{\n  \"name\": \"notype\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "road_f.js": {
   "src": "// Runs the commands in road_f.cmd.\n",
   "stdout": "this is {}\nrequire is function\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node notype/f.js",
     "out": "this is {}\nrequire is function\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/combo"
    }
   ]
  },
  "combo/notype/f.js": {
   "src": "const shop = \"f\";\nconsole.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "semver_machine.js": {
   "src": "import semver from \"semver\";\n\nconst checks = [\n  [\"1.4.1\", \"^1.4.2\"], [\"1.4.9\", \"^1.4.2\"], [\"1.9.0\", \"^1.4.2\"],\n  [\"2.0.0\", \"^1.4.2\"], [\"1.4.9\", \"~1.4.2\"], [\"1.5.0\", \"~1.4.2\"],\n  [\"0.3.9\", \"^0.3.1\"], [\"0.4.0\", \"^0.3.1\"], [\"1.4.2\", \"1.4.2\"],\n];\nfor (const [version, range] of checks) {\n  console.log(version, range, semver.satisfies(version, range));\n}\n",
   "stdout": "1.4.1 ^1.4.2 false\n1.4.9 ^1.4.2 true\n1.9.0 ^1.4.2 true\n2.0.0 ^1.4.2 false\n1.4.9 ~1.4.2 true\n1.5.0 ~1.4.2 false\n0.3.9 ^0.3.1 true\n0.4.0 ^0.3.1 false\n1.4.2 1.4.2 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node semver_machine.js",
     "out": "1.4.1 ^1.4.2 false\n1.4.9 ^1.4.2 true\n1.9.0 ^1.4.2 true\n2.0.0 ^1.4.2 false\n1.4.9 ~1.4.2 true\n1.5.0 ~1.4.2 false\n0.3.9 ^0.3.1 true\n0.4.0 ^0.3.1 false\n1.4.2 1.4.2 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "semver_trace.js": {
   "src": "import semver from \"semver\";\n\nconst range = \"~2.1.0\";\nfor (const v of [\"2.0.9\", \"2.1.0\", \"2.1.7\", \"2.2.0\", \"3.0.0\"]) {\n  console.log(v, semver.satisfies(v, range));\n}\n",
   "stdout": "2.0.9 false\n2.1.0 true\n2.1.7 true\n2.2.0 false\n3.0.0 false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node semver_trace.js",
     "out": "2.0.9 false\n2.1.0 true\n2.1.7 true\n2.2.0 false\n3.0.0 false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sloppy.cjs": {
   "src": "let total = 0;\ntotl = 5;\nconsole.log(total);\nconsole.log(globalThis.totl);\n",
   "stdout": "0\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sloppy.cjs",
     "out": "0\n5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_exports.cjs": {
   "src": "function greet(name) {\n  return `Hi, ${name}!`;\n}\nexports = { greet };\nconsole.log(module.exports.greet(\"Kit\"));\n",
   "stdout": "",
   "stderr": "/home/you/javascript-ch26/spot_exports.cjs:5\nconsole.log(module.exports.greet(\"Kit\"));\n                           ^\n\nTypeError: module.exports.greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/spot_exports.cjs:5:28)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_exports.cjs",
     "out": "",
     "err": "/home/you/javascript-ch26/spot_exports.cjs:5\nconsole.log(module.exports.greet(\"Kit\"));\n                           ^\n\nTypeError: module.exports.greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/spot_exports.cjs:5:28)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "/home/you/javascript-ch26/spot_exports.cjs:5\nconsole.log(module.exports.greet(\"Kit\"));\n                           ^\n\nTypeError: module.exports.greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/spot_exports.cjs:5:28)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_exports.cjs",
      "out": "",
      "err": "/home/you/javascript-ch26/spot_exports.cjs:5\nconsole.log(module.exports.greet(\"Kit\"));\n                           ^\n\nTypeError: module.exports.greet is not a function\n    at Object.<anonymous> (/home/you/javascript-ch26/spot_exports.cjs:5:28)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_named.js": {
   "src": "import { price } from \"./shops/bakery.js\";\nimport { bake } from \"./shops/bakery.js\";\n\nconsole.log(price(\"scone\"));\nconsole.log(bake(\"scone\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/spot_named.js:2\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_named.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/spot_named.js:2\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at #asyncInstantiate (node:internal/modules/esm/module_job:463:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:561:5)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/spot_named.js:2\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_named.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/spot_named.js:2\nimport { bake } from \"./shops/bakery.js\";\n         ^^^^\nSyntaxError: The requested module './shops/bakery.js' does not provide an export named 'bake'\n    at ModuleJob._instantiate (node:internal/modules/esm/module_job:226:21)\n    at async ModuleJob.run (node:internal/modules/esm/module_job:335:5)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "strict_esm.js": {
   "src": "let total = 0;\ntotl = 5;\nconsole.log(total);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch26/strict_esm.js:2\ntotl = 5;\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/strict_esm.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node strict_esm.js",
     "out": "",
     "err": "file:///home/you/javascript-ch26/strict_esm.js:2\ntotl = 5;\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/strict_esm.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch26/strict_esm.js:2\ntotl = 5;\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/strict_esm.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node strict_esm.js",
      "out": "",
      "err": "file:///home/you/javascript-ch26/strict_esm.js:2\ntotl = 5;\n     ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch26/strict_esm.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "syntax_check.js": {
   "src": "// Runs the commands in syntax_check.cmd.\n",
   "stdout": "",
   "stderr": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd workbench",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "node --check show.js",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "echo $?",
     "out": "0\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "node --check broken.js",
     "out": "",
     "err": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~/javascript-ch26/workbench"
    },
    {
     "cmd": "node --run check",
     "out": "",
     "err": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~/javascript-ch26/workbench"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd workbench",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26"
     },
     {
      "cmd": "node --check show.js",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/workbench"
     },
     {
      "cmd": "echo $?",
      "out": "0\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch26/workbench"
     },
     {
      "cmd": "node --check broken.js",
      "out": "",
      "err": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~/javascript-ch26/workbench"
     },
     {
      "cmd": "node --run check",
      "out": "",
      "err": "/home/you/javascript-ch26/workbench/broken.js:2\nconsole.log(\"Act two\";\n            ^^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~/javascript-ch26/workbench"
     }
    ]
   }
  },
  "workbench/broken.js": {
   "src": "console.log(\"Act one\");\nconsole.log(\"Act two\";\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "this_cjs.cjs": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\nconsole.log(\"module is\", typeof module);\nconsole.log(\"__dirname is\", typeof __dirname);\n",
   "stdout": "this is {}\nrequire is function\nmodule is object\n__dirname is string\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node this_cjs.cjs",
     "out": "this is {}\nrequire is function\nmodule is object\n__dirname is string\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "this_esm.mjs": {
   "src": "console.log(\"this is\", this);\nconsole.log(\"require is\", typeof require);\nconsole.log(\"module is\", typeof module);\nconsole.log(\"__dirname is\", typeof __dirname);\n",
   "stdout": "this is undefined\nrequire is undefined\nmodule is undefined\n__dirname is undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node this_esm.mjs",
     "out": "this is undefined\nrequire is undefined\nmodule is undefined\n__dirname is undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_queue.js": {
   "src": "import { waiting, admit } from \"./shops/queue.js\";\n\nconst start = waiting;\nfor (let round = 1; round <= 4; round++) {\n  admit();\n  console.log(round, waiting, start);\n}\n",
   "stdout": "1 4 5\n2 3 5\n3 2 5\n4 1 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_queue.js",
     "out": "1 4 5\n2 3 5\n3 2 5\n4 1 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "transpile.js": {
   "src": "// Runs the commands in transpile.cmd.\n",
   "stdout": "var _a;\nconst seats = { stalls: 0 };\nconst left = (_a = seats.balcony) != null ? _a : \"unknown\";\nconsole.log(seats == null ? void 0 : seats.stalls, left);\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "npx esbuild packing/src/modern.js --target=es2019",
     "out": "var _a;\nconst seats = { stalls: 0 };\nconst left = (_a = seats.balcony) != null ? _a : \"unknown\";\nconsole.log(seats == null ? void 0 : seats.stalls, left);\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "packing/src/modern.js": {
   "src": "const seats = { stalls: 0 };\nconst left = seats.balcony ?? \"unknown\";\nconsole.log(seats?.stalls, left);\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "typecheck.js": {
   "src": "// Runs the commands in typecheck.cmd.\n",
   "stdout": "0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bad_call.ts",
     "out": "13\n121\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "npx tsc --noEmit bad_call.ts",
     "out": "bad_call.ts(6,22): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.\n",
     "err": "",
     "exit": 2,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "npx tsc --noEmit price.ts",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    },
    {
     "cmd": "echo $?",
     "out": "0\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch26"
    }
   ]
  },
  "where.js": {
   "src": "console.log(import.meta.url);\nconsole.log(import.meta.filename);\nconsole.log(import.meta.dirname);\nconsole.log(import.meta.resolve(\"./data/menu.json\"));\n",
   "stdout": "file:///home/you/javascript-ch26/where.js\n/home/you/javascript-ch26/where.js\n/home/you/javascript-ch26\nfile:///home/you/javascript-ch26/data/menu.json\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node where.js",
     "out": "file:///home/you/javascript-ch26/where.js\n/home/you/javascript-ch26/where.js\n/home/you/javascript-ch26\nfile:///home/you/javascript-ch26/data/menu.json\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
