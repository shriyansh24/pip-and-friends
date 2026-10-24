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
  "workdir": "/home/you/javascript-ch2",
  "versionDifferences": [
   "asi_paren.js",
   "asi_paren_spot.js",
   "braces.js",
   "case.js",
   "case_spot.js",
   "check.js",
   "end_of_input.js",
   "m_case.js",
   "m_paren.js",
   "m_quote.js",
   "module_strict.js",
   "nested_comment.js",
   "nothing_runs.js",
   "repl_typeof.js",
   "reserved.js",
   "strict.cjs",
   "typo_comma.js",
   "typo_extra.js",
   "typo_open.js",
   "typo_paren.js",
   "typo_quote.js",
   "unexpected_token.js",
   "unterminated.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): asi_paren.js, asi_paren_spot.js, braces.js, case.js, case_spot.js, check.js, end_of_input.js, m_case.js, m_paren.js, m_quote.js, module_strict.js, nested_comment.js, nothing_runs.js, repl_typeof.js, reserved.js, strict.cjs, typo_comma.js, typo_extra.js, typo_open.js, typo_paren.js, typo_quote.js, unexpected_token.js, unterminated.js."
 },
 "programs": {
  "arrays.js": {
   "src": "console.log(typeof [1, 2, 3]);\nconsole.log(typeof { seat: 7 });\nconsole.log(Array.isArray([1, 2, 3]));\nconsole.log(Array.isArray({ seat: 7 }));\n",
   "stdout": "object\nobject\ntrue\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node arrays.js",
     "out": "object\nobject\ntrue\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "asi_fixed.js": {
   "src": "function ticketPrice() {\n  return 42;\n}\nconsole.log(ticketPrice());\n",
   "stdout": "42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node asi_fixed.js",
     "out": "42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "asi_paren.js": {
   "src": "console.log(\"Ready\")\n(1 + 2)\n",
   "stdout": "Ready\n",
   "stderr": "file:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node asi_paren.js",
     "out": "Ready\n",
     "err": "file:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Ready\nfile:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Ready\n",
    "stderr": "file:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node asi_paren.js",
      "out": "Ready\n",
      "err": "file:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Ready\nfile:///home/you/javascript-ch2/asi_paren.js:2\n(1 + 2)\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "asi_paren_fixed.js": {
   "src": "console.log(\"Ready\");\n(1 + 2);\nconsole.log(\"Done\");\n",
   "stdout": "Ready\nDone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node asi_paren_fixed.js",
     "out": "Ready\nDone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "asi_paren_spot.js": {
   "src": "console.log(\"Doors open\");\nconsole.log(\"Lights down\")\n(\"Music in\");\nconsole.log(\"Curtain up\");\n",
   "stdout": "Doors open\nLights down\n",
   "stderr": "file:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node asi_paren_spot.js",
     "out": "Doors open\nLights down\n",
     "err": "file:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Doors open\nLights down\nfile:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Doors open\nLights down\n",
    "stderr": "file:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node asi_paren_spot.js",
      "out": "Doors open\nLights down\n",
      "err": "file:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Doors open\nLights down\nfile:///home/you/javascript-ch2/asi_paren_spot.js:3\n(\"Music in\");\n^\n\nTypeError: console.log(...) is not a function\n    at file:///home/you/javascript-ch2/asi_paren_spot.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "asi_return.js": {
   "src": "function ticketPrice() {\n  return\n    42;\n}\nconsole.log(ticketPrice());\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node asi_return.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_comments.js": {
   "src": "/* Act 1 */ console.log(\"Overture\");\nconsole.log(\"Scene\", 1); // console.log(\"Scene\", 2);\n// console.log(\"Fireworks\");\nconsole.log(\"Bow\" /* , \"again\" */)\nconsole.log(1 + \"1\", 1 + 1);\n",
   "stdout": "Overture\nScene 1\nBow\n11 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_comments.js",
     "out": "Overture\nScene 1\nBow\n11 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "console.log(typeof null);\nconsole.log(Array.isArray([]));\nconsole.log(typeof undefined);\n",
   "stdout": "object\ntrue\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "object\ntrue\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "console.log(\"NaN\", typeof NaN);\nconsole.log(\"[]\", typeof []);\nconsole.log(\"null\", typeof null);\nconsole.log(\"''\", typeof \"\");\nconsole.log(\"Math.max\", typeof Math.max);\nconsole.log(\"0n\", typeof 0n);\n",
   "stdout": "NaN number\n[] object\nnull object\n'' string\nMath.max function\n0n bigint\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "NaN number\n[] object\nnull object\n'' string\nMath.max function\n0n bigint\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_typeof.js": {
   "src": "console.log(typeof typeof 42);\nconsole.log(typeof \"typeof\");\nconsole.log(typeof (1 + \"1\"));\nconsole.log(typeof (1 + 1));\n",
   "stdout": "string\nstring\nstring\nnumber\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_typeof.js",
     "out": "string\nstring\nstring\nnumber\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "braces.js": {
   "src": "console.log(\"Start\");\nif (2 > 1) {\n  console.log(\"Two is bigger\");\n}}\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/braces.js:4\n}}\n ^\n\nSyntaxError: Unexpected token '}'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node braces.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/braces.js:4\n}}\n ^\n\nSyntaxError: Unexpected token '}'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/braces.js:4\n}}\n ^\n\nSyntaxError: Unexpected token '}'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node braces.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/braces.js:4\n}}\n ^\n\nSyntaxError: Unexpected token '}'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "case.js": {
   "src": "console.log(\"Stand by...\");\nConsole.log(\"GO!\");\n",
   "stdout": "Stand by...\n",
   "stderr": "file:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node case.js",
     "out": "Stand by...\n",
     "err": "file:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Stand by...\nfile:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Stand by...\n",
    "stderr": "file:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node case.js",
      "out": "Stand by...\n",
      "err": "file:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Stand by...\nfile:///home/you/javascript-ch2/case.js:2\nConsole.log(\"GO!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/case.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "case_spot.js": {
   "src": "console.log(\"Lights up\");\nconsole.log(\"Music in\");\nconsole.Log(\"Curtain\");\nconsole.log(\"Bow\");\n",
   "stdout": "Lights up\nMusic in\n",
   "stderr": "file:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node case_spot.js",
     "out": "Lights up\nMusic in\n",
     "err": "file:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Lights up\nMusic in\nfile:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Lights up\nMusic in\n",
    "stderr": "file:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node case_spot.js",
      "out": "Lights up\nMusic in\n",
      "err": "file:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Lights up\nMusic in\nfile:///home/you/javascript-ch2/case_spot.js:3\nconsole.Log(\"Curtain\");\n        ^\n\nTypeError: console.Log is not a function\n    at file:///home/you/javascript-ch2/case_spot.js:3:9\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "check.js": {
   "src": "// check.cmd asks Node to check the grammar of two files without running them\n",
   "stdout": "",
   "stderr": "/home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node --check stage_ok.js",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "node --check unterminated.js",
     "out": "",
     "err": "/home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at checkSyntax (node:internal/main/check_syntax:84:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "/home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node --check stage_ok.js",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "node --check unterminated.js",
      "out": "",
      "err": "/home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at checkSyntax (node:internal/main/check_syntax:74:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "comments.js": {
   "src": "// Opening night checklist\nconsole.log(\"Lights\");   // the stage lights\n// console.log(\"Smoke machine\");\n/* The band is late,\n   so the music cue waits.\nconsole.log(\"Music\"); */\nconsole.log(\"Curtain\");\n",
   "stdout": "Lights\nCurtain\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node comments.js",
     "out": "Lights\nCurtain\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "comments_predict.js": {
   "src": "console.log(\"A\"); // console.log(\"B\");\n// console.log(\"C\");\nconsole.log(\"D\" /* , \"E\" */);\n/* console.log(\"F\"); */ console.log(\"G\");\n",
   "stdout": "A\nD\nG\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node comments_predict.js",
     "out": "A\nD\nG\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "end_of_input.js": {
   "src": "console.log(\"Checking the stage...\");\nif (10 > 3) {\n  console.log(\"Big stage!\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/end_of_input.js:4\n\n\n\nSyntaxError: Unexpected end of input\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node end_of_input.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/end_of_input.js:4\n\n\n\nSyntaxError: Unexpected end of input\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/end_of_input.js:4\n\n\n\nSyntaxError: Unexpected end of input\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node end_of_input.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/end_of_input.js:4\n\n\n\nSyntaxError: Unexpected end of input\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "fill_args.js": {
   "src": "console.log(\"Act\", 2, \"of\", 3);\nconsole.log(\"Seats left:\", 50 - 8);\n",
   "stdout": "Act 2 of 3\nSeats left: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_args.js",
     "out": "Act 2 of 3\nSeats left: 42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_comment.js": {
   "src": "// The smoke machine is broken tonight.\nconsole.log(\"Lights\");\n// console.log(\"Smoke\");\nconsole.log(\"Curtain\");\n",
   "stdout": "Lights\nCurtain\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_comment.js",
     "out": "Lights\nCurtain\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_isarray.js": {
   "src": "console.log(Array.isArray([\"Kit\", \"Ada\"]));\nconsole.log(typeof \"Kit\");\n",
   "stdout": "true\nstring\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_isarray.js",
     "out": "true\nstring\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "five.js": {
   "src": "console.log(5, \"5\");\nconsole.log(typeof 5, typeof \"5\");\nconsole.log(5 + 1, \"5\" + 1);\nconsole.log([5, \"5\"]);\n",
   "stdout": "5 5\nnumber string\n6 51\n[ 5, '5' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node five.js",
     "out": "5 5\nnumber string\n6 51\n[ 5, '5' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "full_stops.js": {
   "src": "console.log(\"Lights\"); console.log(\"Sound\");\nconsole.log(\"Curtain\")\nconsole.log(\"Go!\");\n",
   "stdout": "Lights\nSound\nCurtain\nGo!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node full_stops.js",
     "out": "Lights\nSound\nCurtain\nGo!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "functions_type.js": {
   "src": "console.log(typeof console.log);\nconsole.log(typeof Math.max);\nconsole.log(typeof Math);\nconsole.log(typeof console);\n",
   "stdout": "function\nfunction\nobject\nobject\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node functions_type.js",
     "out": "function\nfunction\nobject\nobject\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "literals.js": {
   "src": "console.log(42, 3.14, -7);\nconsole.log(\"double quotes\", 'single quotes', `backticks`);\nconsole.log(true, false);\nconsole.log(undefined, null);\nconsole.log(10n);\n",
   "stdout": "42 3.14 -7\ndouble quotes single quotes backticks\ntrue false\nundefined null\n10n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node literals.js",
     "out": "42 3.14 -7\ndouble quotes single quotes backticks\ntrue false\nundefined null\n10n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "m_case.js": {
   "src": "Console.log(\"Hi!\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/m_case.js:1\nConsole.log(\"Hi!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/m_case.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node m_case.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/m_case.js:1\nConsole.log(\"Hi!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/m_case.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/m_case.js:1\nConsole.log(\"Hi!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/m_case.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node m_case.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/m_case.js:1\nConsole.log(\"Hi!\");\n^\n\nReferenceError: Console is not defined\n    at file:///home/you/javascript-ch2/m_case.js:1:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "m_ok.js": {
   "src": "console.log(\"Hi!\");\n",
   "stdout": "Hi!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node m_ok.js",
     "out": "Hi!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "m_paren.js": {
   "src": "console.log(\"Hi!\";\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/m_paren.js:1\nconsole.log(\"Hi!\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node m_paren.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/m_paren.js:1\nconsole.log(\"Hi!\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/m_paren.js:1\nconsole.log(\"Hi!\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node m_paren.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/m_paren.js:1\nconsole.log(\"Hi!\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "m_quote.js": {
   "src": "console.log(\"Hi!);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/m_quote.js:1\nconsole.log(\"Hi!);\n            ^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node m_quote.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/m_quote.js:1\nconsole.log(\"Hi!);\n            ^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/m_quote.js:1\nconsole.log(\"Hi!);\n            ^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node m_quote.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/m_quote.js:1\nconsole.log(\"Hi!);\n            ^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "many_args.js": {
   "src": "console.log(\"Kit\", \"runs\", \"the\", \"show\");\nconsole.log(\"Act\", 1, \"Scene\", 2);\nconsole.log(\"Kit\" + \"runs\");\n",
   "stdout": "Kit runs the show\nAct 1 Scene 2\nKitruns\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node many_args.js",
     "out": "Kit runs the show\nAct 1 Scene 2\nKitruns\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "module_strict.js": {
   "src": "console.log(\"Seat\", 010);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/module_strict.js:1\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node module_strict.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/module_strict.js:1\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/module_strict.js:1\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node module_strict.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/module_strict.js:1\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "nan.js": {
   "src": "console.log(\"pizza\" * 2);\nconsole.log(typeof NaN);\nconsole.log(typeof (\"pizza\" * 2));\n",
   "stdout": "NaN\nnumber\nnumber\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node nan.js",
     "out": "NaN\nnumber\nnumber\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nested_comment.js": {
   "src": "console.log(\"Before\");\n/* outer /* inner */ */\nconsole.log(\"After\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/nested_comment.js:2\n/* outer /* inner */ */\n                     ^\n\nSyntaxError: Unexpected token '*'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node nested_comment.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/nested_comment.js:2\n/* outer /* inner */ */\n                     ^\n\nSyntaxError: Unexpected token '*'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/nested_comment.js:2\n/* outer /* inner */ */\n                     ^\n\nSyntaxError: Unexpected token '*'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node nested_comment.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/nested_comment.js:2\n/* outer /* inner */ */\n                     ^\n\nSyntaxError: Unexpected token '*'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "nothing_runs.js": {
   "src": "console.log(\"Line 1\");\nconsole.log(\"Line 2\");\nconsole.log(\"Line 3\";\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/nothing_runs.js:3\nconsole.log(\"Line 3\";\n            ^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node nothing_runs.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/nothing_runs.js:3\nconsole.log(\"Line 3\";\n            ^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/nothing_runs.js:3\nconsole.log(\"Line 3\";\n            ^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node nothing_runs.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/nothing_runs.js:3\nconsole.log(\"Line 3\";\n            ^^^^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "null_bug.js": {
   "src": "console.log(typeof null);\nconsole.log(typeof { seat: 7 });\nconsole.log(typeof null === \"object\");\n",
   "stdout": "object\nobject\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node null_bug.js",
     "out": "object\nobject\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "one_and_ones.js": {
   "src": "console.log(1, \"1\", 1 + 1, \"1\" + 1);\n",
   "stdout": "1 1 2 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node one_and_ones.js",
     "out": "1 1 2 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_show.js": {
   "src": "console.log(\"Act 1\");\nconsole.log(\"Kit:\", \"Stand by...\");\nconsole.log(\"Kit:\", \"GO!\");\nconsole.log(\"Lights:\", 3 * 4, \"lamps on\");\nconsole.log(\"End of act\", 1);\n",
   "stdout": "Act 1\nKit: Stand by...\nKit: GO!\nLights: 12 lamps on\nEnd of act 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_show.js",
     "out": "Act 1\nKit: Stand by...\nKit: GO!\nLights: 12 lamps on\nEnd of act 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_types.js": {
   "src": "console.log(\"Props table\");\nconsole.log(\"sword:\", typeof \"sword\");\nconsole.log(\"count:\", typeof 3);\nconsole.log(\"ready:\", typeof true);\nconsole.log(\"Total props:\", 1 + 2);\n",
   "stdout": "Props table\nsword: string\ncount: number\nready: boolean\nTotal props: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_types.js",
     "out": "Props table\nsword: string\ncount: number\nready: boolean\nTotal props: 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rare_jars.js": {
   "src": "console.log(10n, typeof 10n);\nconsole.log(Symbol(\"seat\"), typeof Symbol(\"seat\"));\nconsole.log(2n ** 64n);\n",
   "stdout": "10n bigint\nSymbol(seat) symbol\n18446744073709551616n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rare_jars.js",
     "out": "10n bigint\nSymbol(seat) symbol\n18446744073709551616n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "repl_typeof.js": {
   "src": "// What you type at the > prompt (the session itself is recorded from a real terminal)\ntypeof 42\ntypeof \"42\"\ntypeof null\ntypeof []\nArray.isArray([])\n.exit\n",
   "stdout": "Welcome to Node.js v26.13.0.\nType \".help\" for more information.\n> 'number'\n> 'string'\n> 'object'\n> 'object'\n> true\n> ",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node",
     "out": "Welcome to Node.js v26.13.0.\nType \".help\" for more information.\n> 'number'\n> 'string'\n> 'object'\n> 'object'\n> true\n> ",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Welcome to Node.js v22.23.4.\nType \".help\" for more information.\n> 'number'\n> 'string'\n> 'object'\n> 'object'\n> true\n> ",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "node",
      "out": "Welcome to Node.js v22.23.4.\nType \".help\" for more information.\n> 'number'\n> 'string'\n> 'object'\n> 'object'\n> true\n> ",
      "err": "",
      "exit": 0
     }
    ]
   },
   "stdin": "typeof 42\ntypeof \"42\"\ntypeof null\ntypeof []\nArray.isArray([])\n.exit\n",
   "screen": "Welcome to Node.js v26.13.0.\nType \".help\" for more information.\n> typeof 42\r\n'number'\n> typeof \"42\"\r\n'string'\n> typeof null\r\n'object'\n> typeof []\r\n'object'\n> Array.isArray([])\r\ntrue\n> .exit\r\n"
  },
  "reserved.js": {
   "src": "console.log(\"The word is:\");\nconsole.log(if);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/reserved.js:2\nconsole.log(if);\n            ^^\n\nSyntaxError: Unexpected token 'if'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node reserved.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/reserved.js:2\nconsole.log(if);\n            ^^\n\nSyntaxError: Unexpected token 'if'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/reserved.js:2\nconsole.log(if);\n            ^^\n\nSyntaxError: Unexpected token 'if'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node reserved.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/reserved.js:2\nconsole.log(if);\n            ^^\n\nSyntaxError: Unexpected token 'if'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "seat_fixed.js": {
   "src": "console.log(\"Seat\", \"010\");\nconsole.log(\"Seat\", 10);\n",
   "stdout": "Seat 010\nSeat 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node seat_fixed.js",
     "out": "Seat 010\nSeat 10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shelf.js": {
   "src": "console.log(typeof 7);\nconsole.log(typeof \"seven\");\nconsole.log(typeof true);\nconsole.log(typeof undefined);\nconsole.log(typeof null);\nconsole.log(typeof 7n);\nconsole.log(typeof Symbol(\"seat\"));\nconsole.log(typeof { seat: 7 });\n",
   "stdout": "number\nstring\nboolean\nundefined\nobject\nbigint\nsymbol\nobject\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node shelf.js",
     "out": "number\nstring\nboolean\nundefined\nobject\nbigint\nsymbol\nobject\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sloppy.cjs": {
   "src": "console.log(\"Seat\", 010);\n",
   "stdout": "Seat 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sloppy.cjs",
     "out": "Seat 8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spacing.js": {
   "src": "console.log(   \"Wide\"   ,   \"spaces\"   );\nconsole.log(\"Tight\",\"spaces\");\n      console.log(\"Indented\");\nconsole\n  .log(\"Split over two lines\");\nconsole.log(\"   spaces inside quotes count\");\n",
   "stdout": "Wide spaces\nTight spaces\nIndented\nSplit over two lines\n   spaces inside quotes count\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spacing.js",
     "out": "Wide spaces\nTight spaces\nIndented\nSplit over two lines\n   spaces inside quotes count\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stage_ok.js": {
   "src": "console.log(\"Checking the stage...\");\nif (10 > 3) {\n  console.log(\"Big stage!\");\n}\n",
   "stdout": "Checking the stage...\nBig stage!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node stage_ok.js",
     "out": "Checking the stage...\nBig stage!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "statements.js": {
   "src": "console.log(\"Curtain up!\");\nconsole.log(2 + 3);\nconsole.log(\"2 + 3\");\nconsole.log(\"Seats:\", 40 + 2);\n",
   "stdout": "Curtain up!\n5\n2 + 3\nSeats: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node statements.js",
     "out": "Curtain up!\n5\n2 + 3\nSeats: 42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "strict.cjs": {
   "src": "\"use strict\";\nconsole.log(\"Seat\", 010);\n",
   "stdout": "",
   "stderr": "/home/you/javascript-ch2/strict.cjs:2\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node strict.cjs",
     "out": "",
     "err": "/home/you/javascript-ch2/strict.cjs:2\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "/home/you/javascript-ch2/strict.cjs:2\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node strict.cjs",
      "out": "",
      "err": "/home/you/javascript-ch2/strict.cjs:2\nconsole.log(\"Seat\", 010);\n                    ^^^\n\nSyntaxError: Octal literals are not allowed in strict mode.\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "typeof_all.js": {
   "src": "console.log(typeof 42);\nconsole.log(typeof 3.14);\nconsole.log(typeof \"hi\");\nconsole.log(typeof true);\nconsole.log(typeof undefined);\nconsole.log(typeof null);\nconsole.log(typeof 10n);\nconsole.log(typeof Symbol(\"id\"));\nconsole.log(typeof [1, 2]);\nconsole.log(typeof console.log);\n",
   "stdout": "number\nnumber\nstring\nboolean\nundefined\nobject\nbigint\nsymbol\nobject\nfunction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node typeof_all.js",
     "out": "number\nnumber\nstring\nboolean\nundefined\nobject\nbigint\nsymbol\nobject\nfunction\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "typeof_trace.js": {
   "src": "console.log(\"42\", typeof 42);\nconsole.log(\"'42'\", typeof \"42\");\nconsole.log(\"false\", typeof false);\nconsole.log(\"'false'\", typeof \"false\");\nconsole.log(\"undefined\", typeof undefined);\nconsole.log(\"-0.5\", typeof -0.5);\n",
   "stdout": "42 number\n'42' string\nfalse boolean\n'false' string\nundefined undefined\n-0.5 number\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node typeof_trace.js",
     "out": "42 number\n'42' string\nfalse boolean\n'false' string\nundefined undefined\n-0.5 number\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "typo_comma.js": {
   "src": "console.log(\"Act\", 1, \"begins\");\nconsole.log(\"Act\", 1,, \"ends\");\nconsole.log(\"Intermission\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/typo_comma.js:2\nconsole.log(\"Act\", 1,, \"ends\");\n                     ^\n\nSyntaxError: Unexpected token ','\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo_comma.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/typo_comma.js:2\nconsole.log(\"Act\", 1,, \"ends\");\n                     ^\n\nSyntaxError: Unexpected token ','\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/typo_comma.js:2\nconsole.log(\"Act\", 1,, \"ends\");\n                     ^\n\nSyntaxError: Unexpected token ','\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo_comma.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/typo_comma.js:2\nconsole.log(\"Act\", 1,, \"ends\");\n                     ^\n\nSyntaxError: Unexpected token ','\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "typo_extra.js": {
   "src": "console.log(\"Doors open\");\nconsole.log(\"Find your seat\");\nconsole.log(\"Phones off\"));\nconsole.log(\"Enjoy!\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/typo_extra.js:3\nconsole.log(\"Phones off\"));\n                         ^\n\nSyntaxError: Unexpected token ')'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo_extra.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/typo_extra.js:3\nconsole.log(\"Phones off\"));\n                         ^\n\nSyntaxError: Unexpected token ')'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/typo_extra.js:3\nconsole.log(\"Phones off\"));\n                         ^\n\nSyntaxError: Unexpected token ')'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo_extra.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/typo_extra.js:3\nconsole.log(\"Phones off\"));\n                         ^\n\nSyntaxError: Unexpected token ')'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "typo_open.js": {
   "src": "console.log(\"Curtain call\");\nconsole.log \"Encore\";\nconsole.log(\"Good night\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/typo_open.js:2\nconsole.log \"Encore\";\n            ^^^^^^^^\n\nSyntaxError: Unexpected string\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo_open.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/typo_open.js:2\nconsole.log \"Encore\";\n            ^^^^^^^^\n\nSyntaxError: Unexpected string\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/typo_open.js:2\nconsole.log \"Encore\";\n            ^^^^^^^^\n\nSyntaxError: Unexpected string\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo_open.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/typo_open.js:2\nconsole.log \"Encore\";\n            ^^^^^^^^\n\nSyntaxError: Unexpected string\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "typo_paren.js": {
   "src": "console.log(\"Lights\");\nconsole.log(\"Music\");\nconsole.log(\"Bow\";\nconsole.log(\"Curtain\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/typo_paren.js:3\nconsole.log(\"Bow\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo_paren.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/typo_paren.js:3\nconsole.log(\"Bow\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/typo_paren.js:3\nconsole.log(\"Bow\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo_paren.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/typo_paren.js:3\nconsole.log(\"Bow\";\n            ^^^^^\n\nSyntaxError: missing ) after argument list\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "typo_quote.js": {
   "src": "console.log(\"Act 1\");\nconsole.log(\"Encore');\nconsole.log(\"Act 2\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/typo_quote.js:2\nconsole.log(\"Encore');\n            ^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo_quote.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/typo_quote.js:2\nconsole.log(\"Encore');\n            ^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/typo_quote.js:2\nconsole.log(\"Encore');\n            ^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo_quote.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/typo_quote.js:2\nconsole.log(\"Encore');\n            ^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "undefined_null.js": {
   "src": "console.log(console.log(\"Kit says hi\"));\nconsole.log(typeof undefined, typeof null);\nconsole.log(undefined, null);\n",
   "stdout": "Kit says hi\nundefined\nundefined object\nundefined null\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node undefined_null.js",
     "out": "Kit says hi\nundefined\nundefined object\nundefined null\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unexpected_token.js": {
   "src": "console.log(\"Checking the stage...\");\nif (10 > 3 {\n  console.log(\"Big stage!\");\n}\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/unexpected_token.js:2\nif (10 > 3 {\n           ^\n\nSyntaxError: Unexpected token '{'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node unexpected_token.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/unexpected_token.js:2\nif (10 > 3 {\n           ^\n\nSyntaxError: Unexpected token '{'\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/unexpected_token.js:2\nif (10 > 3 {\n           ^\n\nSyntaxError: Unexpected token '{'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node unexpected_token.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/unexpected_token.js:2\nif (10 > 3 {\n           ^\n\nSyntaxError: Unexpected token '{'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "unterminated.js": {
   "src": "console.log(\"Checking the stage...\");\nconsole.log(\"Break a leg!);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node unterminated.js",
     "out": "",
     "err": "file:///home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node unterminated.js",
      "out": "",
      "err": "file:///home/you/javascript-ch2/unterminated.js:2\nconsole.log(\"Break a leg!);\n            ^^^^^^^^^^^^^^^\n\nSyntaxError: Invalid or unexpected token\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
