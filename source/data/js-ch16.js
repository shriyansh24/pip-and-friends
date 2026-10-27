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
  "workdir": "/home/you/javascript-ch16",
  "versionDifferences": [
   "await_in_fn.cjs",
   "await_in_fn.js",
   "crash_reject.js",
   "ignored_pager.js",
   "machine_bad.js",
   "predict_crash.js",
   "predict_syntax.js",
   "spot_now.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): await_in_fn.cjs, await_in_fn.js, crash_reject.js, ignored_pager.js, machine_bad.js, predict_crash.js, predict_syntax.js, spot_now.js."
 },
 "programs": {
  "async_returns.js": {
   "src": "async function greet(name) {\n  return \"Hello, \" + name;\n}\n\nconst result = greet(\"Ada\");\nconsole.log(result);\nconsole.log(result instanceof Promise);\n",
   "stdout": "Promise { 'Hello, Ada' }\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node async_returns.js",
     "out": "Promise { 'Hello, Ada' }\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "await_basic.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nconsole.log(\"Ordering soup...\");\nconst dish = await cook(\"soup\", 200);\nconsole.log(\"Got my \" + dish);\n",
   "stdout": "Ordering soup...\nGot my soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node await_basic.js",
     "out": "Ordering soup...\nGot my soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "await_in_fn.cjs": {
   "src": "async function cookSoup() {\n  return \"soup\";\n}\n\nfunction dinner() {\n  const dish = await cookSoup();\n  console.log(\"Eating \" + dish);\n}\n\ndinner();\n",
   "stdout": "",
   "stderr": "/home/you/javascript-ch16/await_in_fn.cjs:6\n  const dish = await cookSoup();\n               ^^^^^\n\nSyntaxError: await is only valid in async functions and the top level bodies of modules\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node await_in_fn.cjs",
     "out": "",
     "err": "/home/you/javascript-ch16/await_in_fn.cjs:6\n  const dish = await cookSoup();\n               ^^^^^\n\nSyntaxError: await is only valid in async functions and the top level bodies of modules\n    at wrapSafe (node:internal/modules/cjs/loader:1900:18)\n    at Module._compile (node:internal/modules/cjs/loader:1942:20)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "/home/you/javascript-ch16/await_in_fn.cjs:6\n  const dish = await cookSoup();\n               ^^^^^\n\nSyntaxError: await is only valid in async functions and the top level bodies of modules\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node await_in_fn.cjs",
      "out": "",
      "err": "/home/you/javascript-ch16/await_in_fn.cjs:6\n  const dish = await cookSoup();\n               ^^^^^\n\nSyntaxError: await is only valid in async functions and the top level bodies of modules\n    at wrapSafe (node:internal/modules/cjs/loader:1713:18)\n    at Module._compile (node:internal/modules/cjs/loader:1755:20)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "await_in_fn.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nfunction dinner() {\n  const dish = await cook(\"soup\", 100);\n  console.log(\"Eating \" + dish);\n}\n\ndinner();\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch16/await_in_fn.js:4\n  const dish = await cook(\"soup\", 100);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node await_in_fn.js",
     "out": "",
     "err": "file:///home/you/javascript-ch16/await_in_fn.js:4\n  const dish = await cook(\"soup\", 100);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch16/await_in_fn.js:4\n  const dish = await cook(\"soup\", 100);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node await_in_fn.js",
      "out": "",
      "err": "file:///home/you/javascript-ch16/await_in_fn.js:4\n  const dish = await cook(\"soup\", 100);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "await_pauses.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function waiter() {\n  console.log(\"Waiter: order soup\");\n  const dish = await cook(\"soup\", 100);\n  console.log(\"Waiter: serve \" + dish);\n}\n\nwaiter();\nconsole.log(\"Kit: chat with Ada\");\n",
   "stdout": "Waiter: order soup\nKit: chat with Ada\nWaiter: serve soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node await_pauses.js",
     "out": "Waiter: order soup\nKit: chat with Ada\nWaiter: serve soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "await_predict.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function kitchenRun(dish, ms) {\n  console.log(\"start \" + dish);\n  const done = await cook(dish, ms);\n  console.log(\"done \" + done);\n}\n\nkitchenRun(\"rice\", 200);\nkitchenRun(\"tea\", 100);\nconsole.log(\"chatting\");\n",
   "stdout": "start rice\nstart tea\nchatting\ndone tea\ndone rice\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node await_predict.js",
     "out": "start rice\nstart tea\nchatting\ndone tea\ndone rice\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\nconst orders = [\"soup\", \"lobster\", \"pie\"];\nfor (const dish of orders) {\n  try {\n    const plate = await cookOrRefuse(dish, 50);\n    console.log(\"served \" + plate);\n  } catch (error) {\n    console.log(\"skipped: \" + error.message);\n  }\n}\nconsole.log(\"kitchen closed\");\n",
   "stdout": "served soup\nskipped: we are out of lobster\nserved pie\nkitchen closed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "served soup\nskipped: we are out of lobster\nserved pie\nkitchen closed\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "import { openKitchen } from \"./local_kitchen.js\";\nconst kitchen = await openKitchen();\ntry {\n  const res = await fetch(kitchen.url + \"/order\");\n  const order = await res.json();\n  console.log(\"Table \" + order.table + \": \" + order.dish);\n} catch (error) {\n  console.log(\"Failed: \" + error.message);\n}\nkitchen.close();\n",
   "stdout": "Table 7: soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "Table 7: soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function serve(dish, ms) {\n  const plate = await cook(dish, ms);\n  console.log(\"served \" + plate);\n  return plate;\n}\n\nsetTimeout(() => console.log(\"timer 0\"), 0);\nconst first = serve(\"tea\", 60);\nPromise.resolve().then(() => console.log(\"promise\"));\nconsole.log(\"sync\");\nconst late = await serve(\"cake\", 10);\nconsole.log(\"got \" + late);\nconsole.log(first);\n",
   "stdout": "sync\npromise\ntimer 0\nserved cake\ngot cake\nPromise { <pending> }\nserved tea\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "sync\npromise\ntimer 0\nserved cake\ngot cake\nPromise { <pending> }\nserved tea\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "import { openKitchen } from \"./local_kitchen.js\";\n\nconst kitchen = await openKitchen();\nconst res = await fetch(kitchen.url + \"/order\");\nconst order = res.json();\nconsole.log(\"Table \" + order.table + \" ordered \" + order.dish);\nkitchen.close();\n",
   "stdout": "Table undefined ordered undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "Table undefined ordered undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "let turn = 0;\nfunction note(label) {\n  turn = turn + 1;\n  console.log(turn, label);\n}\nsetTimeout(() => {\n  note(\"T1\");\n  Promise.resolve().then(() => note(\"P3\"));\n}, 0);\nsetTimeout(() => note(\"T2\"), 0);\nPromise.resolve().then(() => {\n  note(\"P1\");\n  Promise.resolve().then(() => note(\"P2\"));\n});\nnote(\"S\");\n",
   "stdout": "1 S\n2 P1\n3 P2\n4 T1\n5 P3\n6 T2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 S\n2 P1\n3 P2\n4 T1\n5 P3\n6 T2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "busy.js": {
   "src": "const start = Date.now();\nsetTimeout(() => {\n  console.log(\"Timer runs at last. It asked for 0 ms.\");\n  console.log(\"Waited 300 ms or more?\", Date.now() - start >= 300);\n}, 0);\n\nwhile (Date.now() - start < 300) {\n  // Kit is busy reading a very long cue for 300 ms\n}\nconsole.log(\"Long cue finished\");\n",
   "stdout": "Long cue finished\nTimer runs at last. It asked for 0 ms.\nWaited 300 ms or more? true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node busy.js",
     "out": "Long cue finished\nTimer runs at last. It asked for 0 ms.\nWaited 300 ms or more? true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "callback.js": {
   "src": "function orderFood(dish, callMeBack) {\n  console.log(\"Kitchen: starting the \" + dish);\n  setTimeout(() => {\n    callMeBack(dish + \" is ready\");\n  }, 100);\n}\n\norderFood(\"soup\", (message) => {\n  console.log(\"Kit hears: \" + message);\n});\nconsole.log(\"Kit: back to the show\");\n",
   "stdout": "Kitchen: starting the soup\nKit: back to the show\nKit hears: soup is ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node callback.js",
     "out": "Kitchen: starting the soup\nKit: back to the show\nKit hears: soup is ready\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "crash_reject.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\nconsole.log(\"Ordering lobster...\");\nconst plate = await cookOrRefuse(\"lobster\", 100);\nconsole.log(\"Enjoy your \" + plate);\n",
   "stdout": "Ordering lobster...\n",
   "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node crash_reject.js",
     "out": "Ordering lobster...\n",
     "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Ordering lobster...\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Ordering lobster...\n",
    "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node crash_reject.js",
      "out": "Ordering lobster...\n",
      "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Ordering lobster...\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "fetch_fail.js": {
   "src": "import { closedKitchenUrl } from \"./local_kitchen.js\";\n\nconst url = await closedKitchenUrl();\ntry {\n  const res = await fetch(url + \"/order\");\n  console.log(await res.json());\n} catch (error) {\n  console.log(\"Could not order: \" + error.message);\n  console.log(\"Because: \" + error.cause.code);\n}\nconsole.log(\"Kit makes a sandwich instead\");\n",
   "stdout": "Could not order: fetch failed\nBecause: ECONNREFUSED\nKit makes a sandwich instead\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fetch_fail.js",
     "out": "Could not order: fetch failed\nBecause: ECONNREFUSED\nKit makes a sandwich instead\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fetch_order.js": {
   "src": "import { openKitchen } from \"./local_kitchen.js\";\n\nconst kitchen = await openKitchen();\nconst res = await fetch(kitchen.url + \"/order\");\nconst order = await res.json();\nconsole.log(order);\nconsole.log(\"Table \" + order.table + \" gets the \" + order.dish);\nkitchen.close();\n",
   "stdout": "{ dish: 'soup', table: 7 }\nTable 7 gets the soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fetch_order.js",
     "out": "{ dish: 'soup', table: 7 }\nTable 7 gets the soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_async.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function breakfast() {\n  const toast = await cook(\"toast\", 100);\n  console.log(\"Eating \" + toast);\n}\n\nconsole.log(\"Order in\");\nawait breakfast();\nconsole.log(\"Plate empty\");\n",
   "stdout": "Order in\nEating toast\nPlate empty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_async.js",
     "out": "Order in\nEating toast\nPlate empty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_fetch.js": {
   "src": "import { openKitchen } from \"./local_kitchen.js\";\n\nconst kitchen = await openKitchen();\ntry {\n  const res = await fetch(kitchen.url + \"/menu\");\n  const menu = await res.json();\n  console.log(\"Today: \" + menu.dish);\n} catch (error) {\n  console.log(\"No menu: \" + error.message);\n}\nkitchen.close();\n",
   "stdout": "Today: soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_fetch.js",
     "out": "Today: soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_interval.js": {
   "src": "let pops = 0;\nconst popper = setInterval(() => {\n  pops = pops + 1;\n  console.log(\"POP \" + pops);\n  if (pops === 4) {\n    clearInterval(popper);\n    console.log(\"Popcorn done\");\n  }\n}, 50);\n",
   "stdout": "POP 1\nPOP 2\nPOP 3\nPOP 4\nPopcorn done\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_interval.js",
     "out": "POP 1\nPOP 2\nPOP 3\nPOP 4\nPopcorn done\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forever.js": {
   "src": "setInterval(() => {\n  // nothing to say, but the clock keeps ticking\n}, 500);\nconsole.log(\"Clock started. Nobody will ever stop it.\");\n",
   "stdout": "Clock started. Nobody will ever stop it.\n",
   "stderr": "",
   "exit": 124,
   "steps": [
    {
     "cmd": "timeout 2 node forever.js",
     "out": "Clock started. Nobody will ever stop it.\n",
     "err": "",
     "exit": 124
    }
   ]
  },
  "forgot_await.js": {
   "src": "async function getUser() {\n  return { name: \"Ada\", seat: \"B7\" };\n}\n\nconst user = getUser();\nconsole.log(user);\nconsole.log(user.name);\n",
   "stdout": "Promise { { name: 'Ada', seat: 'B7' } }\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node forgot_await.js",
     "out": "Promise { { name: 'Ada', seat: 'B7' } }\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forgot_json.js": {
   "src": "import { openKitchen } from \"./local_kitchen.js\";\n\nconst kitchen = await openKitchen();\nconst res = await fetch(kitchen.url + \"/order\");\nconst order = res.json();\nconsole.log(order);\nconsole.log(\"Dish: \" + order.dish);\nkitchen.close();\n",
   "stdout": "Promise { <pending> }\nDish: undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node forgot_json.js",
     "out": "Promise { <pending> }\nDish: undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forgot_slow.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function getTicket() {\n  const seat = await cook(\"B7\", 100);\n  return { seat: seat };\n}\n\nconst ticket = getTicket();\nconsole.log(ticket);\nconsole.log(\"Your seat: \" + ticket.seat);\n",
   "stdout": "Promise { <pending> }\nYour seat: undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node forgot_slow.js",
     "out": "Promise { <pending> }\nYour seat: undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ignored_pager.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\ncookOrRefuse(\"lobster\", 100);\nconsole.log(\"Ordered. Not listening for the pager...\");\nsetTimeout(() => console.log(\"Dessert time!\"), 300);\n",
   "stdout": "Ordered. Not listening for the pager...\n",
   "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node ignored_pager.js",
     "out": "Ordered. Not listening for the pager...\n",
     "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Ordered. Not listening for the pager...\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Ordered. Not listening for the pager...\n",
    "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node ignored_pager.js",
      "out": "Ordered. Not listening for the pager...\n",
      "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Ordered. Not listening for the pager...\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "interval.js": {
   "src": "let count = 0;\nconst timer = setInterval(() => {\n  count = count + 1;\n  console.log(\"Tick\", count);\n  if (count === 3) {\n    clearInterval(timer);\n    console.log(\"Clock stopped\");\n  }\n}, 100);\nconsole.log(\"Clock started\");\n",
   "stdout": "Clock started\nTick 1\nTick 2\nTick 3\nClock stopped\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node interval.js",
     "out": "Clock started\nTick 1\nTick 2\nTick 3\nClock stopped\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "kitchen.js": {
   "src": "// The kitchen: each function starts cooking and hands you\n// a pager (a promise) right away. How a pager is built inside\n// is Chapter 24's story. For now, just order and wait.\nexport function cook(dish, ms) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(dish), ms);\n  });\n}\n\nexport function cookOrRefuse(dish, ms) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (dish === \"lobster\") {\n        reject(new Error(\"we are out of \" + dish));\n      } else {\n        resolve(dish);\n      }\n    }, ms);\n  });\n}\n\nexport function lostOrder() {\n  return new Promise(() => {}); // a pager that will never buzz\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node kitchen.js",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "later.js": {
   "src": "console.log(\"Order popcorn\");\nsetTimeout(() => {\n  console.log(\"Popcorn is ready!\");\n}, 200);\nconsole.log(\"Find our seats\");\nconsole.log(\"Chat with Ada\");\n",
   "stdout": "Order popcorn\nFind our seats\nChat with Ada\nPopcorn is ready!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node later.js",
     "out": "Order popcorn\nFind our seats\nChat with Ada\nPopcorn is ready!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "local_kitchen.js": {
   "src": "// A pretend restaurant on this computer, so fetch never needs the internet.\n// openKitchen() starts a tiny web server; every request gets the same JSON order back.\nimport { createServer } from \"node:http\";\nimport { once } from \"node:events\";\n\nexport async function openKitchen() {\n  const server = createServer((request, response) => {\n    response.setHeader(\"Content-Type\", \"application/json\");\n    response.end(JSON.stringify({ dish: \"soup\", table: 7 }));\n  });\n  server.listen(0, \"127.0.0.1\"); // port 0: any free port\n  await once(server, \"listening\");\n  return {\n    url: \"http://127.0.0.1:\" + server.address().port,\n    close: () => server.close(),\n  };\n}\n\n// The address of a kitchen that has just shut its doors: fetching it fails.\nexport async function closedKitchenUrl() {\n  const kitchen = await openKitchen();\n  kitchen.close();\n  return kitchen.url;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node local_kitchen.js",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "machine.js": {
   "src": "async function shout(word) {\n  return word.toUpperCase() + \"!\";\n}\n\nconsole.log(shout(\"ada\"));\nconsole.log(await shout(\"ada\"));\nconsole.log(shout(\"go\"));\nconsole.log(await shout(\"go\"));\n",
   "stdout": "Promise { 'ADA!' }\nADA!\nPromise { 'GO!' }\nGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node machine.js",
     "out": "Promise { 'ADA!' }\nADA!\nPromise { 'GO!' }\nGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "machine_bad.js": {
   "src": "async function shout(word) {\n  return word.toUpperCase() + \"!\";\n}\n\nconsole.log(await shout(42));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch16/machine_bad.js:2\n  return word.toUpperCase() + \"!\";\n              ^\n\nTypeError: word.toUpperCase is not a function\n    at shout (file:///home/you/javascript-ch16/machine_bad.js:2:15)\n    at file:///home/you/javascript-ch16/machine_bad.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node machine_bad.js",
     "out": "",
     "err": "file:///home/you/javascript-ch16/machine_bad.js:2\n  return word.toUpperCase() + \"!\";\n              ^\n\nTypeError: word.toUpperCase is not a function\n    at shout (file:///home/you/javascript-ch16/machine_bad.js:2:15)\n    at file:///home/you/javascript-ch16/machine_bad.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch16/machine_bad.js:2\n  return word.toUpperCase() + \"!\";\n              ^\n\nTypeError: word.toUpperCase is not a function\n    at shout (file:///home/you/javascript-ch16/machine_bad.js:2:15)\n    at file:///home/you/javascript-ch16/machine_bad.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node machine_bad.js",
      "out": "",
      "err": "file:///home/you/javascript-ch16/machine_bad.js:2\n  return word.toUpperCase() + \"!\";\n              ^\n\nTypeError: word.toUpperCase is not a function\n    at shout (file:///home/you/javascript-ch16/machine_bad.js:2:15)\n    at file:///home/you/javascript-ch16/machine_bad.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "pager.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nconst pager = cook(\"soup\", 200);\nconsole.log(\"I got:\", pager);\nconsole.log(\"Sitting down, chatting...\");\n\npager.then((dish) => {\n  console.log(\"BUZZ! Your \" + dish + \" is ready\");\n});\n",
   "stdout": "I got: Promise { <pending> }\nSitting down, chatting...\nBUZZ! Your soup is ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pager.js",
     "out": "I got: Promise { <pending> }\nSitting down, chatting...\nBUZZ! Your soup is ready\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pager_predict.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nconst tea = cook(\"tea\", 100);\ntea.then((drink) => console.log(\"Buzz: \" + drink));\nconsole.log(\"Waiting...\");\nconsole.log(tea);\n",
   "stdout": "Waiting...\nPromise { <pending> }\nBuzz: tea\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pager_predict.js",
     "out": "Waiting...\nPromise { <pending> }\nBuzz: tea\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_async.js": {
   "src": "import { cook } from \"./kitchen.js\";\nconst dinner = async (order) => {\n  const dish = await cook(order, 100);\n  return \"Served: \" + dish;\n};\nconst message = await dinner(\"pasta\");\nconsole.log(message);\n",
   "stdout": "Served: pasta\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_async.js",
     "out": "Served: pasta\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_crash.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\nconsole.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 50);\nconst dish = await cookOrRefuse(\"lobster\", 100);\nconsole.log(\"C\");\n",
   "stdout": "A\nB\n",
   "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_crash.js",
     "out": "A\nB\n",
     "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "A\nB\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "A\nB\n",
    "stderr": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_crash.js",
      "out": "A\nB\n",
      "err": "file:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "A\nB\nfile:///home/you/javascript-ch16/kitchen.js:14\n        reject(new Error(\"we are out of \" + dish));\n               ^\n\nError: we are out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch16/kitchen.js:14:16)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "predict_syntax.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nconst first = await cook(\"soup\", 50);\nconsole.log(first);\n\nconst orders = [\"tea\", \"cake\"];\norders.forEach((item) => {\n  const dish = await cook(item, 50);\n  console.log(dish);\n});\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch16/predict_syntax.js:8\n  const dish = await cook(item, 50);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_syntax.js",
     "out": "",
     "err": "file:///home/you/javascript-ch16/predict_syntax.js:8\n  const dish = await cook(item, 50);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch16/predict_syntax.js:8\n  const dish = await cook(item, 50);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_syntax.js",
      "out": "",
      "err": "file:///home/you/javascript-ch16/predict_syntax.js:8\n  const dish = await cook(item, 50);\n               ^^^^^\n\nSyntaxError: Unexpected reserved word\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "puzzle.js": {
   "src": "console.log(\"A sync: doors open\");\nsetTimeout(() => console.log(\"B timer: popcorn\"), 0);\nPromise.resolve().then(() => console.log(\"C promise: pager\"));\nconsole.log(\"D sync: lights down\");\nsetTimeout(() => console.log(\"E timer: drinks\"), 0);\nPromise.resolve().then(() => console.log(\"F promise: pager\"));\n",
   "stdout": "A sync: doors open\nD sync: lights down\nC promise: pager\nF promise: pager\nB timer: popcorn\nE timer: drinks\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node puzzle.js",
     "out": "A sync: doors open\nD sync: lights down\nC promise: pager\nF promise: pager\nB timer: popcorn\nE timer: drinks\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "puzzle_await.js": {
   "src": "async function show() {\n  console.log(\"B show starts\");\n  await Promise.resolve();\n  console.log(\"D show continues after await\");\n}\n\nconsole.log(\"A script starts\");\nsetTimeout(() => console.log(\"E timer\"), 0);\nshow();\nconsole.log(\"C script ends\");\n",
   "stdout": "A script starts\nB show starts\nC script ends\nD show continues after await\nE timer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node puzzle_await.js",
     "out": "A script starts\nB show starts\nC script ends\nD show continues after await\nE timer\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "puzzle_browser.html": {
   "src": "<!doctype html>\n<script>\n  console.log(\"A sync: doors open\");\n  setTimeout(() => console.log(\"B timer: popcorn\"), 0);\n  Promise.resolve().then(() => console.log(\"C promise: pager\"));\n  console.log(\"D sync: lights down\");\n  setTimeout(() => console.log(\"E timer: drinks\"), 0);\n  Promise.resolve().then(() => console.log(\"F promise: pager\"));\n</script>\n",
   "stdout": "A sync: doors open\nD sync: lights down\nC promise: pager\nF promise: pager\nB timer: popcorn\nE timer: drinks\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open puzzle_browser.html in a browser (console shown)",
     "out": "A sync: doors open\nD sync: lights down\nC promise: pager\nF promise: pager\nB timer: popcorn\nE timer: drinks\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "puzzle_nested.js": {
   "src": "setTimeout(() => {\n  console.log(\"B timer one\");\n  Promise.resolve().then(() => console.log(\"C promise made inside timer one\"));\n}, 0);\nsetTimeout(() => console.log(\"D timer two\"), 0);\nconsole.log(\"A script\");\n",
   "stdout": "A script\nB timer one\nC promise made inside timer one\nD timer two\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node puzzle_nested.js",
     "out": "A script\nB timer one\nC promise made inside timer one\nD timer two\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "puzzle_predict.js": {
   "src": "setTimeout(() => console.log(\"tea\"), 0);\nconsole.log(\"hello\");\nPromise.resolve().then(() => console.log(\"cake\"));\nsetTimeout(() => console.log(\"coffee\"), 0);\nPromise.resolve().then(() => console.log(\"pie\"));\nconsole.log(\"bye\");\n",
   "stdout": "hello\nbye\ncake\npie\ntea\ncoffee\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node puzzle_predict.js",
     "out": "hello\nbye\ncake\npie\ntea\ncoffee\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "remembered.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function getTicket() {\n  const seat = await cook(\"B7\", 100);\n  return { seat: seat };\n}\n\nconst ticket = await getTicket();\nconsole.log(ticket);\nconsole.log(\"Your seat: \" + ticket.seat);\n",
   "stdout": "{ seat: 'B7' }\nYour seat: B7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node remembered.js",
     "out": "{ seat: 'B7' }\nYour seat: B7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_await.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\nasync function getPrice(snack) {\n  const price = await cook(4, 100);\n  return price;\n}\n\nconst popcorn = getPrice(\"popcorn\");\nconst total = popcorn * 2;\nconsole.log(\"Two popcorns cost \" + total);\n",
   "stdout": "Two popcorns cost NaN\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_await.js",
     "out": "Two popcorns cost NaN\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_now.js": {
   "src": "function announce(snack) {\n  console.log(snack + \" is ready!\");\n}\n\nconsole.log(\"Ordering popcorn...\");\nsetTimeout(announce(\"popcorn\"), 200);\nconsole.log(\"Finding seats...\");\n",
   "stdout": "Ordering popcorn...\npopcorn is ready!\n",
   "stderr": "node:timers:124\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:124:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_now.js",
     "out": "Ordering popcorn...\npopcorn is ready!\n",
     "err": "node:timers:124\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:124:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Ordering popcorn...\npopcorn is ready!\nnode:timers:124\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:124:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Ordering popcorn...\npopcorn is ready!\n",
    "stderr": "node:timers:134\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:134:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_now.js",
      "out": "Ordering popcorn...\npopcorn is ready!\n",
      "err": "node:timers:134\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:134:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Ordering popcorn...\npopcorn is ready!\nnode:timers:134\n  validateFunction(callback, 'callback');\n  ^\n\nTypeError [ERR_INVALID_ARG_TYPE]: The \"callback\" argument must be of type function. Received undefined\n    at setTimeout (node:timers:134:3)\n    at file:///home/you/javascript-ch16/spot_now.js:6:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  code: 'ERR_INVALID_ARG_TYPE'\n}\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "total.js": {
   "src": "async function total() {\n  return 2 + 3;\n}\n\nconsole.log(total());\n",
   "stdout": "Promise { 5 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node total.js",
     "out": "Promise { 5 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_order.js": {
   "src": "let turn = 0;\nfunction log(lane, label) {\n  turn = turn + 1;\n  console.log(turn, label, lane);\n}\nsetTimeout(() => log(\"timer\", \"P\"), 0);\nPromise.resolve().then(() => log(\"promise\", \"Q\"));\nlog(\"sync\", \"R\");\nsetTimeout(() => log(\"timer\", \"S\"), 0);\nPromise.resolve().then(() => log(\"promise\", \"T\"));\nlog(\"sync\", \"U\");\n",
   "stdout": "1 R sync\n2 U sync\n3 Q promise\n4 T promise\n5 P timer\n6 S timer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_order.js",
     "out": "1 R sync\n2 U sync\n3 Q promise\n4 T promise\n5 P timer\n6 S timer\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_timers.js": {
   "src": "let turn = 0;\nfunction cue(name, ms) {\n  setTimeout(() => {\n    turn = turn + 1;\n    console.log(turn, ms, name);\n  }, ms);\n}\ncue(\"music\", 300);\ncue(\"lights\", 100);\ncue(\"curtain\", 200);\ncue(\"bow\", 0);\n",
   "stdout": "1 0 bow\n2 100 lights\n3 200 curtain\n4 300 music\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_timers.js",
     "out": "1 0 bow\n2 100 lights\n3 200 curtain\n4 300 music\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "try_await.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\nasync function order(dish) {\n  try {\n    const plate = await cookOrRefuse(dish, 100);\n    console.log(\"Enjoy your \" + plate);\n  } catch (error) {\n    console.log(\"Sorry: \" + error.message);\n  }\n}\n\nawait order(\"pasta\");\nawait order(\"lobster\");\nconsole.log(\"The show goes on\");\n",
   "stdout": "Enjoy your pasta\nSorry: we are out of lobster\nThe show goes on\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node try_await.js",
     "out": "Enjoy your pasta\nSorry: we are out of lobster\nThe show goes on\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unsettled.js": {
   "src": "import { lostOrder } from \"./kitchen.js\";\n\nconsole.log(\"Waiting for an order the kitchen lost...\");\nconst dish = await lostOrder();\nconsole.log(\"Got \" + dish);\n",
   "stdout": "Waiting for an order the kitchen lost...\n",
   "stderr": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch16/unsettled.js:4\nconst dish = await lostOrder();\n             ^\n\n\n\n",
   "exit": 13,
   "steps": [
    {
     "cmd": "node unsettled.js",
     "out": "Waiting for an order the kitchen lost...\n",
     "err": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch16/unsettled.js:4\nconst dish = await lostOrder();\n             ^\n\n\n\n",
     "exit": 13,
     "merged": "Waiting for an order the kitchen lost...\nWarning: Detected unsettled top-level await at file:///home/you/javascript-ch16/unsettled.js:4\nconst dish = await lostOrder();\n             ^\n\n\n\n"
    }
   ]
  },
  "zero.js": {
   "src": "setTimeout(() => console.log(\"A: the timer (0 ms)\"), 0);\nconsole.log(\"B: the next line\");\nconsole.log(\"C: the last line\");\n",
   "stdout": "B: the next line\nC: the last line\nA: the timer (0 ms)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node zero.js",
     "out": "B: the next line\nC: the last line\nA: the timer (0 ms)\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
