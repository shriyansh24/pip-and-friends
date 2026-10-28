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
  "workdir": "/home/you/javascript-ch24",
  "versionDifferences": [
   "all_fail.js",
   "any_fail.js",
   "cause_crash.js",
   "disposable_stack.js",
   "early_catch.js",
   "promise_try.js",
   "realms.js",
   "throw_string.js",
   "trace_using.js",
   "unhandled.js",
   "using_demo.js",
   "visit_bug.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): all_fail.js, any_fail.js, cause_crash.js, disposable_stack.js, early_catch.js, promise_try.js, realms.js, throw_string.js, trace_using.js, unhandled.js, using_demo.js, visit_bug.js."
 },
 "programs": {
  "aggregate.js": {
   "src": "const form = { name: \"\", age: -3, seat: \"B7\" };\nconst problems = [];\nif (form.name === \"\") problems.push(new Error(\"name is empty\"));\nif (form.age < 0) problems.push(new RangeError(\"age is negative\"));\n\nif (problems.length > 0) {\n  const message = `${problems.length} problems in the form`;\n  const err = new AggregateError(problems, message);\n  console.log(err.name, \"-\", err.message);\n  for (const p of err.errors) console.log(\"  *\", p.name, p.message);\n}\n",
   "stdout": "AggregateError - 2 problems in the form\n  * Error name is empty\n  * RangeError age is negative\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node aggregate.js",
     "out": "AggregateError - 2 problems in the form\n  * Error name is empty\n  * RangeError age is negative\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "all_fail.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\nconst orders = [cook(\"tea\", 30), cookOrRefuse(\"lobster\", 15), cook(\"pie\", 20)];\nconst meals = await Promise.all(orders);\nconsole.log(meals);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node all_fail.js",
     "out": "",
     "err": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node all_fail.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "all_loses.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\nconst orders = () => [cook(\"tea\", 30), cookOrRefuse(\"lobster\", 15), cook(\"pie\", 20)];\n\ntry {\n  const meals = await Promise.all(orders());\n  console.log(\"all served:\", meals);\n} catch (err) {\n  console.log(\"Promise.all gave up:\", err.message);\n}\n\nconst results = await Promise.allSettled(orders());\nfor (const r of results) {\n  console.log(r.status, r.status === \"fulfilled\" ? r.value : r.reason.message);\n}\n",
   "stdout": "Promise.all gave up: out of lobster\nfulfilled tea\nrejected out of lobster\nfulfilled pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node all_loses.js",
     "out": "Promise.all gave up: out of lobster\nfulfilled tea\nrejected out of lobster\nfulfilled pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "any_errors.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\ntry {\n  await Promise.any([cookOrRefuse(\"lobster\", 10), cookOrRefuse(\"lobster\", 20)]);\n} catch (err) {\n  console.log(err.name, \"-\", err.message);\n  console.log(err.errors.map((e) => e.message));\n}\n",
   "stdout": "AggregateError - All promises were rejected\n[ 'out of lobster', 'out of lobster' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node any_errors.js",
     "out": "AggregateError - All promises were rejected\n[ 'out of lobster', 'out of lobster' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "any_fail.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\nconst orders = [cookOrRefuse(\"lobster\", 10), cookOrRefuse(\"lobster\", 20)];\nconst meal = await Promise.any(orders);\nconsole.log(meal);\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[AggregateError: All promises were rejected] {\n  [errors]: [\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:685:17)\n        at process.processTimers (node:internal/timers:618:7),\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:685:17)\n        at process.processTimers (node:internal/timers:618:7)\n  ]\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node any_fail.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[AggregateError: All promises were rejected] {\n  [errors]: [\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:685:17)\n        at process.processTimers (node:internal/timers:618:7),\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:685:17)\n        at process.processTimers (node:internal/timers:618:7)\n  ]\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\n[AggregateError: All promises were rejected] {\n  [errors]: [\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:585:17)\n        at process.processTimers (node:internal/timers:521:7),\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:585:17)\n        at process.processTimers (node:internal/timers:521:7)\n  ]\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node any_fail.js",
      "out": "",
      "err": "node:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\n\n[AggregateError: All promises were rejected] {\n  [errors]: [\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:585:17)\n        at process.processTimers (node:internal/timers:521:7),\n    Error: out of lobster\n        at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n        at listOnTimeout (node:internal/timers:585:17)\n        at process.processTimers (node:internal/timers:521:7)\n  ]\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\nconst orders = [cook(\"tea\", 30), cookOrRefuse(\"lobster\", 10), cook(\"pie\", 20)];\nconst results = await Promise.allSettled(orders);\nconst served = results\n  .filter((r) => r.status === \"fulfilled\")\n  .map((r) => r.value);\nconst failed = results\n  .filter((r) => r.status === \"rejected\")\n  .map((r) => r.reason.message);\nconsole.log(\"served:\", served.join(\", \"));\nconsole.log(\"failed:\", failed.join(\", \"));\n",
   "stdout": "served: tea, pie\nfailed: out of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "served: tea, pie\nfailed: out of lobster\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "import { cookLater } from \"./old_kitchen.js\";\n\nfunction cookAsync(dish, ms) {\n  return new Promise((resolve, reject) => {\n    cookLater(dish, ms, (err, result) => {\n      if (err) reject(err);\n      else resolve(result);\n    });\n  });\n}\n\nconsole.log(await cookAsync(\"soup\", 20));\nconsole.log(await cookAsync(\"lobster\", 10).catch((err) => err.message));\n",
   "stdout": "soup\nout of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "soup\nout of lobster\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\nconsole.log(\"order\");\ncook(\"soup\", 30)\n  .then((soup) => {\n    console.log(\"starter\", soup);\n    return cookOrRefuse(\"lobster\", 10);\n  })\n  .then((main) => console.log(\"main\", main))\n  .catch((err) => {\n    console.log(\"sorry\", err.message);\n    return cook(\"pasta\", 10);\n  })\n  .then((main) => console.log(\"main\", main))\n  .finally(() => console.log(\"bill\"));\nsetTimeout(() => console.log(\"music\"), 20);\nconsole.log(\"chat\");\n",
   "stdout": "order\nchat\nmusic\nstarter soup\nsorry out of lobster\nmain pasta\nbill\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "order\nchat\nmusic\nstarter soup\nsorry out of lobster\nmain pasta\nbill\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "class SeatError extends Error {\n  constructor(seat) {\n    this.name = \"SeatError\";\n    super(`seat ${seat} is taken`);\n  }\n}\n\ntry {\n  throw new SeatError(\"B7\");\n} catch (err) {\n  console.log(err.name);\n  console.log(err.message);\n}\n",
   "stdout": "ReferenceError\nMust call super constructor in derived class before accessing 'this' or returning from derived constructor\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "ReferenceError\nMust call super constructor in derived class before accessing 'this' or returning from derived constructor\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "let step = 0;\nfunction log(where, value) {\n  step++;\n  console.log(step, where, value);\n  return value;\n}\n\nPromise.resolve(3)\n  .then((n) => log(\"then\", n * 2))\n  .then((n) => {\n    if (n > 5) throw new RangeError(`too big: ${n}`);\n    return log(\"then\", n);\n  })\n  .catch((err) => log(\"catch\", err.message.length))\n  .then((n) => log(\"then\", n + 1))\n  .finally(() => log(\"finally\", step));\n",
   "stdout": "1 then 6\n2 catch 10\n3 then 11\n4 finally 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 then 6\n2 catch 10\n3 then 11\n4 finally 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cause_crash.js": {
   "src": "function loadSettings(text) {\n  try {\n    return JSON.parse(text);\n  } catch (err) {\n    throw new Error(\"could not load settings\", { cause: err });\n  }\n}\n\nloadSettings(\"{ volume: 11 }\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch24/cause_crash.js:5\n    throw new Error(\"could not load settings\", { cause: err });\n          ^\n\nError: could not load settings\n    at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:5:11)\n    at file:///home/you/javascript-ch24/cause_crash.js:9:1\n    ... 2 lines matching cause stack trace ...\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  [cause]: SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n      at JSON.parse (<anonymous>)\n      at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:3:17)\n      at file:///home/you/javascript-ch24/cause_crash.js:9:1\n      at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n      at async node:internal/modules/esm/loader:650:26\n      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node cause_crash.js",
     "out": "",
     "err": "file:///home/you/javascript-ch24/cause_crash.js:5\n    throw new Error(\"could not load settings\", { cause: err });\n          ^\n\nError: could not load settings\n    at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:5:11)\n    at file:///home/you/javascript-ch24/cause_crash.js:9:1\n    ... 2 lines matching cause stack trace ...\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  [cause]: SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n      at JSON.parse (<anonymous>)\n      at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:3:17)\n      at file:///home/you/javascript-ch24/cause_crash.js:9:1\n      at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n      at async node:internal/modules/esm/loader:650:26\n      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/cause_crash.js:5\n    throw new Error(\"could not load settings\", { cause: err });\n          ^\n\nError: could not load settings\n    at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:5:11)\n    at file:///home/you/javascript-ch24/cause_crash.js:9:1\n    ... 2 lines matching cause stack trace ...\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  [cause]: SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n      at JSON.parse (<anonymous>)\n      at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:3:17)\n      at file:///home/you/javascript-ch24/cause_crash.js:9:1\n      at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node cause_crash.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/cause_crash.js:5\n    throw new Error(\"could not load settings\", { cause: err });\n          ^\n\nError: could not load settings\n    at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:5:11)\n    at file:///home/you/javascript-ch24/cause_crash.js:9:1\n    ... 2 lines matching cause stack trace ...\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  [cause]: SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n      at JSON.parse (<anonymous>)\n      at loadSettings (file:///home/you/javascript-ch24/cause_crash.js:3:17)\n      at file:///home/you/javascript-ch24/cause_crash.js:9:1\n      at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n      at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "chain.js": {
   "src": "const p1 = Promise.resolve(2);\nconst p2 = p1.then((n) => n * 10);\nconst p3 = p2.then((n) => n + 1);\n\nconsole.log(p1 === p2, p2 === p3);\np3.then((n) => console.log(\"end of the chain:\", n));\nconsole.log(p2);\n",
   "stdout": "false false\nPromise { <pending> }\nend of the chain: 21\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node chain.js",
     "out": "false false\nPromise { <pending> }\nend of the chain: 21\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "chain_throw.js": {
   "src": "Promise.resolve(\"ticket\")\n  .then((t) => {\n    console.log(\"1 check the\", t);\n    throw new Error(\"the ticket is torn\");\n  })\n  .then(() => console.log(\"2 find a seat\"))\n  .then(() => console.log(\"3 watch the show\"))\n  .catch((err) => console.log(\"4 catch:\", err.message))\n  .then(() => console.log(\"5 buy popcorn\"))\n  .finally(() => console.log(\"6 finally: go home\"));\n",
   "stdout": "1 check the ticket\n4 catch: the ticket is torn\n5 buy popcorn\n6 finally: go home\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node chain_throw.js",
     "out": "1 check the ticket\n4 catch: the ticket is torn\n5 buy popcorn\n6 finally: go home\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "combine.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\nconst good = () => [cook(\"tea\", 30), cook(\"soup\", 10), cook(\"pie\", 20)];\nconst mixed = () => [cook(\"tea\", 30), cookOrRefuse(\"lobster\", 15),\n  cook(\"pie\", 20)];\n\nconsole.log(\"all:\", await Promise.all(good()));\nconsole.log(\"race:\", await Promise.race(good()));\nconsole.log(\"any:\", await Promise.any(mixed()));\n\nconst report = await Promise.allSettled(mixed());\nconst words = report.map((r) =>\n  r.status === \"fulfilled\" ? r.value : `(${r.reason.message})`);\nconsole.log(\"allSettled:\", words.join(\", \"));\n\nconst first = await Promise.race(mixed())\n  .catch((err) => `rejected, ${err.message}`);\nconsole.log(\"race, mixed:\", first);\n",
   "stdout": "all: [ 'tea', 'soup', 'pie' ]\nrace: soup\nany: pie\nallSettled: tea, (out of lobster), pie\nrace, mixed: rejected, out of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node combine.js",
     "out": "all: [ 'tea', 'soup', 'pie' ]\nrace: soup\nany: pie\nallSettled: tea, (out of lobster), pie\nrace, mixed: rejected, out of lobster\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "custom_error.js": {
   "src": "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"ValidationError\";\n  }\n}\n\nfunction checkAge(age) {\n  if (!Number.isInteger(age)) {\n    throw new ValidationError(`age must be a whole number, got ${age}`);\n  }\n  return age;\n}\n\ntry {\n  checkAge(\"seven\");\n} catch (err) {\n  console.log(err.name);\n  console.log(err.message);\n  console.log(err instanceof ValidationError, err instanceof Error);\n}\n",
   "stdout": "ValidationError\nage must be a whole number, got seven\ntrue true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node custom_error.js",
     "out": "ValidationError\nage must be a whole number, got seven\ntrue true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "desk.js": {
   "src": "import { ValidationError, NotFoundError } from \"./errors.js\";\n\nconst seats = [\"A1\", \"B7\", \"C3\"];\n\nfunction lookup(code) {\n  const seat = code.trim();\n  if (seat === \"\") throw new ValidationError(\"no seat typed\");\n  if (!seats.includes(seat)) throw new NotFoundError(`no seat ${seat}`);\n  return seat;\n}\n\nfunction desk(code) {\n  try {\n    return lookup(code);\n  } catch (err) {\n    if (err instanceof ValidationError) {\n      console.log(`desk treats it: ${err.message}`);\n      return null;\n    }\n    throw err;                      // not ours: refer it upward\n  } finally {\n    console.log(\"desk: next patient, please\");\n  }\n}\n\nexport function visit(code) {\n  try {\n    const seat = desk(code);\n    console.log(`visit over, seat: ${seat}`);\n  } catch (err) {\n    if (err instanceof NotFoundError) {\n      console.log(`specialist treats it: ${err.message}`);\n    } else {\n      throw err;                    // nobody here can treat this\n    }\n  }\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node desk.js",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "disposable_stack.js": {
   "src": "const cleanup = new DisposableStack();\ncleanup.defer(() => console.log(\"put the props away\"));\ncleanup.defer(() => console.log(\"switch off the lights\"));\n\nconsole.log(\"the show is running\");\ncleanup.dispose();\nconsole.log(\"disposed:\", cleanup.disposed);\n",
   "stdout": "the show is running\nswitch off the lights\nput the props away\ndisposed: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node disposable_stack.js",
     "out": "the show is running\nswitch off the lights\nput the props away\ndisposed: true\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/disposable_stack.js:1\nconst cleanup = new DisposableStack();\n                ^\n\nReferenceError: DisposableStack is not defined\n    at file:///home/you/javascript-ch24/disposable_stack.js:1:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node disposable_stack.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/disposable_stack.js:1\nconst cleanup = new DisposableStack();\n                ^\n\nReferenceError: DisposableStack is not defined\n    at file:///home/you/javascript-ch24/disposable_stack.js:1:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "early_catch.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\ncookOrRefuse(\"lobster\", 50)\n  .catch((err) => console.log(\"sorry:\", err.message))\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n",
   "stdout": "sorry: out of lobster\n",
   "stderr": "file:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node early_catch.js",
     "out": "sorry: out of lobster\n",
     "err": "file:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "sorry: out of lobster\nfile:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "sorry: out of lobster\n",
    "stderr": "file:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node early_catch.js",
      "out": "sorry: out of lobster\n",
      "err": "file:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "sorry: out of lobster\nfile:///home/you/javascript-ch24/early_catch.js:5\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()));\n                                              ^\n\nTypeError: Cannot read properties of undefined (reading 'toUpperCase')\n    at file:///home/you/javascript-ch24/early_catch.js:5:47\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "edge.js": {
   "src": "function main() {\n  console.log(\"loading the show...\");\n  const cast = JSON.parse('[\"Ada\", \"Grace\"');\n  console.log(cast);\n}\n\ntry {\n  main();\n} catch (err) {\n  console.error(\"The show could not start.\");\n  console.error(err.stack.split(\"\\n\").slice(0, 2).join(\"\\n\"));\n  process.exitCode = 1;\n}\n",
   "stdout": "loading the show...\n",
   "stderr": "The show could not start.\nSyntaxError: Expected ',' or ']' after array element in JSON at position 15 (line 1 column 16)\n    at JSON.parse (<anonymous>)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node edge.js",
     "out": "loading the show...\n",
     "err": "The show could not start.\nSyntaxError: Expected ',' or ']' after array element in JSON at position 15 (line 1 column 16)\n    at JSON.parse (<anonymous>)\n",
     "exit": 1,
     "merged": "loading the show...\nThe show could not start.\nSyntaxError: Expected ',' or ']' after array element in JSON at position 15 (line 1 column 16)\n    at JSON.parse (<anonymous>)\n"
    }
   ]
  },
  "errors.js": {
   "src": "// The theatre's own family of errors. Other files import them.\nexport class AppError extends Error {\n  constructor(message, options) {\n    super(message, options);\n    this.name = this.constructor.name;\n  }\n}\n\nexport class ValidationError extends AppError {}\nexport class SeatTakenError extends ValidationError {}\nexport class NotFoundError extends AppError {}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node errors.js",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "executor_sync.js": {
   "src": "console.log(\"A before new Promise\");\nconst p = new Promise((resolve) => {\n  console.log(\"B inside the executor\");\n  resolve(\"done\");\n  console.log(\"C still inside, after resolve\");\n});\np.then((value) => console.log(\"E then:\", value));\nconsole.log(\"D after new Promise\");\n",
   "stdout": "A before new Promise\nB inside the executor\nC still inside, after resolve\nD after new Promise\nE then: done\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node executor_sync.js",
     "out": "A before new Promise\nB inside the executor\nC still inside, after resolve\nD after new Promise\nE then: done\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_chain.js": {
   "src": "import { cook, cookOrRefuse } from \"./kitchen.js\";\n\ncook(\"soup\", 20)\n  .then((soup) => {\n    console.log(\"starter:\", soup);\n    return cookOrRefuse(\"lobster\", 20);\n  })\n  .then((main) => console.log(\"main:\", main))\n  .catch((err) => console.log(\"sorry:\", err.message))\n  .finally(() => console.log(\"the bill, please\"));\n",
   "stdout": "starter: soup\nsorry: out of lobster\nthe bill, please\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_chain.js",
     "out": "starter: soup\nsorry: out of lobster\nthe bill, please\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_hierarchy.js": {
   "src": "class AppError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = this.constructor.name;\n  }\n}\nclass PaymentError extends AppError {}\nclass CardDeclinedError extends PaymentError {}\n\nconst err = new CardDeclinedError(\"card ending 4242 declined\");\nconsole.log(err.name, \"|\", err.message);\nconsole.log(err instanceof PaymentError, err instanceof AppError);\nconsole.log(err instanceof TypeError);\n",
   "stdout": "CardDeclinedError | card ending 4242 declined\ntrue true\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_hierarchy.js",
     "out": "CardDeclinedError | card ending 4242 declined\ntrue true\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_sleep.js": {
   "src": "function sleep(ms) {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}\n\nconsole.log(\"Lights down...\");\nawait sleep(100);\nconsole.log(\"Curtain up!\");\n",
   "stdout": "Lights down...\nCurtain up!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_sleep.js",
     "out": "Lights down...\nCurtain up!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "finally_cleanup.js": {
   "src": "function playScene(n) {\n  console.log(\"lights on\");\n  try {\n    if (n === 2) throw new Error(\"an actor is missing\");\n    console.log(`scene ${n} played`);\n    return \"applause\";\n  } finally {\n    console.log(\"lights off\");\n  }\n}\n\nconsole.log(playScene(1));\ntry {\n  playScene(2);\n} catch (err) {\n  console.log(`caught: ${err.message}`);\n}\n",
   "stdout": "lights on\nscene 1 played\nlights off\napplause\nlights on\nlights off\ncaught: an actor is missing\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node finally_cleanup.js",
     "out": "lights on\nscene 1 played\nlights off\napplause\nlights on\nlights off\ncaught: an actor is missing\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forgot_return.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\ncook(\"soup\", 50)\n  .then((dish) => {\n    console.log(\"got\", dish);\n    cook(\"bread\", 30);\n  })\n  .then((dish) => console.log(\"got\", dish));\n",
   "stdout": "got soup\ngot undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node forgot_return.js",
     "out": "got soup\ngot undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_await.js": {
   "src": "import { promisify } from \"node:util\";\nimport { cookLater } from \"./old_kitchen.js\";\n\nconst cook = promisify(cookLater);\n\ntry {\n  const soup = await cook(\"soup\", 30);\n  const bread = await cook(\"bread\", 20);\n  const pie = await cook(\"pie\", 10);\n  console.log(\"dinner:\", soup, bread, pie);\n} catch (err) {\n  console.log(\"failed:\", err.message);\n}\n",
   "stdout": "dinner: soup bread pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_await.js",
     "out": "dinner: soup bread pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_then.js": {
   "src": "import { promisify } from \"node:util\";\nimport { cookLater } from \"./old_kitchen.js\";\n\nconst cook = promisify(cookLater);\nlet soup, bread;\n\ncook(\"soup\", 30)\n  .then((s) => { soup = s; return cook(\"bread\", 20); })\n  .then((b) => { bread = b; return cook(\"pie\", 10); })\n  .then((pie) => console.log(\"dinner:\", soup, bread, pie))\n  .catch((err) => console.log(\"failed:\", err.message));\n",
   "stdout": "dinner: soup bread pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_then.js",
     "out": "dinner: soup bread pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hell.js": {
   "src": "import { cookLater } from \"./old_kitchen.js\";\n\ncookLater(\"soup\", 30, (err, soup) => {\n  if (err) return console.log(\"failed:\", err.message);\n  cookLater(\"bread\", 20, (err, bread) => {\n    if (err) return console.log(\"failed:\", err.message);\n    cookLater(\"pie\", 10, (err, pie) => {\n      if (err) return console.log(\"failed:\", err.message);\n      console.log(\"dinner:\", soup, bread, pie);\n    });\n  });\n});\n",
   "stdout": "dinner: soup bread pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hell.js",
     "out": "dinner: soup bread pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hierarchy.js": {
   "src": "import { AppError, ValidationError, SeatTakenError, NotFoundError } from \"./errors.js\";\n\nconst patients = [\n  new SeatTakenError(\"B7 is taken\"),\n  new NotFoundError(\"no show called Hamlet\"),\n  new TypeError(\"x is not a function\"),\n];\n\nfor (const err of patients) {\n  console.log(err.name, err instanceof ValidationError,\n    err instanceof AppError, err instanceof Error);\n}\n",
   "stdout": "SeatTakenError true true true\nNotFoundError false true true\nTypeError false false true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hierarchy.js",
     "out": "SeatTakenError true true true\nNotFoundError false true true\nTypeError false false true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "kitchen.js": {
   "src": "// The kitchen: each function starts a job and hands back a pager (a promise).\nexport function cook(dish, ms) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(dish), ms);\n  });\n}\n\nexport function cookOrRefuse(dish, ms) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n      else resolve(dish);\n    }, ms);\n  });\n}\n",
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
  "late_catch.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\ncookOrRefuse(\"lobster\", 50)\n  .then((dish) => console.log(\"serving\", dish.toUpperCase()))\n  .catch((err) => console.log(\"sorry:\", err.message));\n",
   "stdout": "sorry: out of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node late_catch.js",
     "out": "sorry: out of lobster\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "logging.js": {
   "src": "function countTickets(text) {\n  return JSON.parse(text).tickets;\n}\n\nfunction loadOrder(id, text) {\n  try {\n    return countTickets(text);\n  } catch (err) {\n    throw new Error(`order ${id}: could not read the tickets`, { cause: err });\n  }\n}\n\ntry {\n  loadOrder(7, '{\"tickets\": 4,}');\n} catch (err) {\n  console.error(`[box office] ${err.message}`);\n  console.error(`  because ${err.cause.name}: ${err.cause.message}`);\n  process.exitCode = 1;\n}\n",
   "stdout": "",
   "stderr": "[box office] order 7: could not read the tickets\n  because SyntaxError: Expected double-quoted property name in JSON at position 14 (line 1 column 15)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node logging.js",
     "out": "",
     "err": "[box office] order 7: could not read the tickets\n  because SyntaxError: Expected double-quoted property name in JSON at position 14 (line 1 column 15)\n",
     "exit": 1
    }
   ]
  },
  "lost_cause.js": {
   "src": "function readSettings(text) {\n  return JSON.parse(text);\n}\n\nfunction loadSettings(text) {\n  try {\n    return readSettings(text);\n  } catch (err) {\n    throw new Error(\"could not load settings\");\n  }\n}\n\ntry {\n  loadSettings(\"{ volume: 11 }\");\n} catch (err) {\n  console.log(err.message);\n  console.log(err.cause);\n}\n",
   "stdout": "could not load settings\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lost_cause.js",
     "out": "could not load settings\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "make_pager.js": {
   "src": "const pager = new Promise((resolve, reject) => {\n  setTimeout(() => resolve(\"soup\"), 100);\n});\n\nconsole.log(pager);\nconst dish = await pager;\nconsole.log(dish);\nconsole.log(pager);\n",
   "stdout": "Promise { <pending> }\nsoup\nPromise { 'soup' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node make_pager.js",
     "out": "Promise { <pending> }\nsoup\nPromise { 'soup' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "names.js": {
   "src": "class Nameless extends Error {}\n\nclass Named extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"Named\";\n  }\n}\n\nconsole.log(String(new Nameless(\"seat B7 is taken\")));\nconsole.log(String(new Named(\"seat B7 is taken\")));\n",
   "stdout": "Error: seat B7 is taken\nNamed: seat B7 is taken\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node names.js",
     "out": "Error: seat B7 is taken\nNamed: seat B7 is taken\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "never_plain.js": {
   "src": "const p = new Promise((resolve) => {\n  console.log(\"order taken\");\n});\np.then(() => console.log(\"served\"));\nconsole.log(\"end of the script\");\n",
   "stdout": "order taken\nend of the script\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node never_plain.js",
     "out": "order taken\nend of the script\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "old_kitchen.js": {
   "src": "// An old-style kitchen: you hand it a callback, error first.\nexport function cookLater(dish, ms, callback) {\n  setTimeout(() => {\n    if (dish === \"lobster\") callback(new Error(`out of ${dish}`));\n    else callback(null, dish);\n  }, ms);\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node old_kitchen.js",
     "out": "",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_cause.js": {
   "src": "function parsePort(text) {\n  const port = Number(text);\n  if (Number.isNaN(port)) throw new RangeError(`not a number: ${text}`);\n  return port;\n}\n\ntry {\n  parsePort(\"eighty\");\n} catch (err) {\n  const wrapped = new Error(\"bad config file\", { cause: err });\n  console.log(wrapped.message, \"<-\", wrapped.cause.message);\n}\n",
   "stdout": "bad config file <- not a number: eighty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_cause.js",
     "out": "bad config file <- not a number: eighty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_chain.js": {
   "src": "Promise.resolve(1)\n  .then((n) => n + 1)\n  .then((n) => {\n    throw new Error(`bad ${n}`);\n  })\n  .then((n) => console.log(\"skipped?\", n))\n  .catch((err) => {\n    console.log(\"caught\", err.message);\n    return 10;\n  })\n  .then((n) => console.log(\"after catch\", n))\n  .finally(() => console.log(\"finally\"));\n",
   "stdout": "caught bad 2\nafter catch 10\nfinally\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_chain.js",
     "out": "caught bad 2\nafter catch 10\nfinally\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_executor.js": {
   "src": "console.log(\"order placed\");\nconst pager = new Promise((resolve) => {\n  console.log(\"kitchen starts\");\n  setTimeout(() => {\n    console.log(\"kitchen finishes\");\n    resolve(\"noodles\");\n  }, 10);\n  console.log(\"pager handed over\");\n});\npager.then((dish) => console.log(\"eat\", dish));\nconsole.log(\"find a table\");\n",
   "stdout": "order placed\nkitchen starts\npager handed over\nfind a table\nkitchen finishes\neat noodles\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_executor.js",
     "out": "order placed\nkitchen starts\npager handed over\nfind a table\nkitchen finishes\neat noodles\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_finally.js": {
   "src": "function serve(dish) {\n  try {\n    if (dish === \"\") throw new Error(\"no dish\");\n    return `serving ${dish}`;\n  } catch (err) {\n    console.log(\"caught:\", err.message);\n    return \"serving bread instead\";\n  } finally {\n    console.log(\"wipe the table\");\n  }\n}\n\nconsole.log(serve(\"soup\"));\nconsole.log(serve(\"\"));\n",
   "stdout": "wipe the table\nserving soup\ncaught: no dish\nwipe the table\nserving bread instead\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_finally.js",
     "out": "wipe the table\nserving soup\ncaught: no dish\nwipe the table\nserving bread instead\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "promise_try.js": {
   "src": "function plate(dish) {\n  if (dish === \"lobster\") throw new Error(\"out of lobster\");\n  return `${dish} on a plate`;\n}\n\nPromise.try(plate, \"soup\").then((v) => console.log(\"then:\", v));\nPromise.try(plate, \"lobster\").catch((e) => console.log(\"catch:\", e.message));\nconsole.log(\"script done\");\n",
   "stdout": "script done\nthen: soup on a plate\ncatch: out of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node promise_try.js",
     "out": "script done\nthen: soup on a plate\ncatch: out of lobster\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/promise_try.js:6\nPromise.try(plate, \"soup\").then((v) => console.log(\"then:\", v));\n           ^\n\nTypeError: Promise.try is not a function\n    at file:///home/you/javascript-ch24/promise_try.js:6:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node promise_try.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/promise_try.js:6\nPromise.try(plate, \"soup\").then((v) => console.log(\"then:\", v));\n           ^\n\nTypeError: Promise.try is not a function\n    at file:///home/you/javascript-ch24/promise_try.js:6:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "promisify.js": {
   "src": "import { promisify } from \"node:util\";\nimport { cookLater } from \"./old_kitchen.js\";\n\nconst cook = promisify(cookLater);\n\nconst pager = cook(\"soup\", 30);\nconsole.log(pager);\nconsole.log(await pager);\n\ntry {\n  await cook(\"lobster\", 10);\n} catch (err) {\n  console.log(\"rejected:\", err.message);\n}\n",
   "stdout": "Promise { <pending> }\nsoup\nrejected: out of lobster\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node promisify.js",
     "out": "Promise { <pending> }\nsoup\nrejected: out of lobster\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "realms.js": {
   "src": "import vm from \"node:vm\";\n\nconst local = new Error(\"made here\");\nconst foreign = vm.runInNewContext('new Error(\"made in another realm\")');\n\nconsole.log(local instanceof Error, foreign instanceof Error);\nconsole.log(local.name, foreign.name);\nconsole.log(Error.isError(local), Error.isError(foreign));\nconsole.log(Error.isError({ name: \"Error\", message: \"a fake\" }));\n",
   "stdout": "true false\nError Error\ntrue true\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node realms.js",
     "out": "true false\nError Error\ntrue true\nfalse\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "true false\nError Error\n",
    "stderr": "file:///home/you/javascript-ch24/realms.js:8\nconsole.log(Error.isError(local), Error.isError(foreign));\n                  ^\n\nTypeError: Error.isError is not a function\n    at file:///home/you/javascript-ch24/realms.js:8:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node realms.js",
      "out": "true false\nError Error\n",
      "err": "file:///home/you/javascript-ch24/realms.js:8\nconsole.log(Error.isError(local), Error.isError(foreign));\n                  ^\n\nTypeError: Error.isError is not a function\n    at file:///home/you/javascript-ch24/realms.js:8:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "true false\nError Error\nfile:///home/you/javascript-ch24/realms.js:8\nconsole.log(Error.isError(local), Error.isError(foreign));\n                  ^\n\nTypeError: Error.isError is not a function\n    at file:///home/you/javascript-ch24/realms.js:8:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "result.js": {
   "src": "function parseSeat(text) {\n  const match = /^([A-H])(\\d{1,2})$/.exec(text);\n  if (!match) return { ok: false, error: `\"${text}\" is not a seat` };\n  return { ok: true, value: { row: match[1], number: Number(match[2]) } };\n}\n\nfor (const text of [\"B7\", \"seven\", \"C12\"]) {\n  const result = parseSeat(text);\n  if (result.ok) {\n    console.log(\"seat: row\", result.value.row, \"number\", result.value.number);\n  } else {\n    console.log(\"problem:\", result.error);\n  }\n}\n",
   "stdout": "seat: row B number 7\nproblem: \"seven\" is not a seat\nseat: row C number 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node result.js",
     "out": "seat: row B number 7\nproblem: \"seven\" is not a seat\nseat: row C number 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "return_promise.js": {
   "src": "import { cook } from \"./kitchen.js\";\n\ncook(\"soup\", 50)\n  .then((dish) => {\n    console.log(\"got\", dish);\n    return cook(\"bread\", 30);      // a pager: the chain waits for it\n  })\n  .then((dish) => {\n    console.log(\"got\", dish);\n    return \"the dessert menu\";     // a plain value: passed on at once\n  })\n  .then((thing) => console.log(\"got\", thing));\n",
   "stdout": "got soup\ngot bread\ngot the dessert menu\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node return_promise.js",
     "out": "got soup\ngot bread\ngot the dessert menu\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sleep.js": {
   "src": "const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));\n\nconsole.log(\"Stand by...\");\nawait sleep(200);\nconsole.log(\"GO!\");\n",
   "stdout": "Stand by...\nGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sleep.js",
     "out": "Stand by...\nGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sleep_builtin.js": {
   "src": "import { setTimeout as sleep } from \"node:timers/promises\";\n\nconsole.log(\"Stand by...\");\nconst word = await sleep(200, \"GO!\");\nconsole.log(word);\n",
   "stdout": "Stand by...\nGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sleep_builtin.js",
     "out": "Stand by...\nGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sleep_promisify.js": {
   "src": "import { promisify } from \"node:util\";\n\nconst sleep = promisify(setTimeout);\nconsole.log(\"Stand by...\");\nconst word = await sleep(200, \"GO!\");\nconsole.log(word);\n",
   "stdout": "Stand by...\nGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sleep_promisify.js",
     "out": "Stand by...\nGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_return.js": {
   "src": "const addFee = (n) => n + 1;\n\nPromise.resolve(4)\n  .then((price) => price * 2)\n  .then((total) => {\n    console.log(\"adding the booking fee\");\n    addFee(total);\n  })\n  .then((total) => console.log(`Total: ${total}`));\n",
   "stdout": "adding the booking fee\nTotal: undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_return.js",
     "out": "adding the booking fee\nTotal: undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_swallow.js": {
   "src": "function countTickets(text) {\n  return JSON.parse(text).tickets;\n}\n\nlet tickets = 0;\ntry {\n  tickets = countTickets('{\"tickets\": 4,}');\n} catch (err) {\n  console.log(\"error\");\n}\nconsole.log(`Printing ${tickets} tickets`);\n",
   "stdout": "error\nPrinting 0 tickets\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_swallow.js",
     "out": "error\nPrinting 0 tickets\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "state_later.js": {
   "src": "const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve(\"soup\"), 50);\n});\nconsole.log(p);\np.then((value) => console.log(\"fulfilled:\", value));\n",
   "stdout": "Promise { <pending> }\nfulfilled: soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node state_later.js",
     "out": "Promise { <pending> }\nfulfilled: soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "state_never.js": {
   "src": "const p = new Promise((resolve, reject) => {\n  console.log(\"order taken\");\n});\nconsole.log(\"waiting...\");\nawait p;\nconsole.log(\"served\");\n",
   "stdout": "order taken\nwaiting...\n",
   "stderr": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch24/state_never.js:5\nawait p;\n^\n\n\n\n",
   "exit": 13,
   "steps": [
    {
     "cmd": "node state_never.js",
     "out": "order taken\nwaiting...\n",
     "err": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch24/state_never.js:5\nawait p;\n^\n\n\n\n",
     "exit": 13,
     "merged": "order taken\nwaiting...\nWarning: Detected unsettled top-level await at file:///home/you/javascript-ch24/state_never.js:5\nawait p;\n^\n\n\n\n"
    }
   ]
  },
  "state_throw.js": {
   "src": "const p = new Promise((resolve, reject) => {\n  throw new Error(\"kitchen fire\");\n});\nconsole.log(\"promise made\");\np.then((value) => console.log(\"fulfilled:\", value))\n  .catch((err) => console.log(\"rejected:\", err.message));\n",
   "stdout": "promise made\nrejected: kitchen fire\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node state_throw.js",
     "out": "promise made\nrejected: kitchen fire\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "state_twice.js": {
   "src": "const p = new Promise((resolve, reject) => {\n  resolve(\"soup\");\n  reject(new Error(\"too late\"));\n  resolve(\"pie\");\n});\nconsole.log(p);\np.then((value) => console.log(\"fulfilled:\", value))\n  .catch((err) => console.log(\"rejected:\", err.message));\n",
   "stdout": "Promise { 'soup' }\nfulfilled: soup\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node state_twice.js",
     "out": "Promise { 'soup' }\nfulfilled: soup\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "throw_string.js": {
   "src": "function refuse() {\n  throw \"out of lobster\";\n}\n\ntry {\n  refuse();\n} catch (err) {\n  console.log(typeof err);\n  console.log(err.message);\n  console.log(err.stack);\n}\n\nrefuse();\n",
   "stdout": "string\nundefined\nundefined\n",
   "stderr": "\nnode:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node throw_string.js",
     "out": "string\nundefined\nundefined\n",
     "err": "\nnode:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "string\nundefined\nundefined\n\nnode:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "string\nundefined\nundefined\n",
    "stderr": "\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node throw_string.js",
      "out": "string\nundefined\nundefined\n",
      "err": "\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "string\nundefined\nundefined\n\nnode:internal/modules/run_main:123\n    triggerUncaughtException(\n    ^\nout of lobster\n(Use `node --trace-uncaught ...` to show where the exception was thrown)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "trace_handlers.js": {
   "src": "import { ValidationError, SeatTakenError, NotFoundError } from \"./errors.js\";\n\nfunction whoTreats(err) {\n  if (err instanceof ValidationError) return \"desk\";\n  if (err instanceof NotFoundError) return \"specialist\";\n  return \"nobody\";\n}\n\nconst arrivals = [\n  new NotFoundError(\"a\"),\n  new TypeError(\"b\"),\n  new SeatTakenError(\"c\"),\n  new ValidationError(\"d\"),\n];\nlet turn = 0;\nfor (const err of arrivals) {\n  turn++;\n  console.log(turn, err.name, whoTreats(err));\n}\n",
   "stdout": "1 NotFoundError specialist\n2 TypeError nobody\n3 SeatTakenError desk\n4 ValidationError desk\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_handlers.js",
     "out": "1 NotFoundError specialist\n2 TypeError nobody\n3 SeatTakenError desk\n4 ValidationError desk\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_using.js": {
   "src": "let step = 0;\nfunction door(name) {\n  step++;\n  console.log(step, \"open\", name);\n  return {\n    [Symbol.dispose]() {\n      step++;\n      console.log(step, \"close\", name);\n    },\n  };\n}\n\n{\n  using a = door(\"stage\");\n  using b = door(\"props\");\n  step++;\n  console.log(step, \"play\", \"-\");\n}\n",
   "stdout": "1 open stage\n2 open props\n3 play -\n4 close props\n5 close stage\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_using.js",
     "out": "1 open stage\n2 open props\n3 play -\n4 close props\n5 close stage\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/trace_using.js:14\n  using a = door(\"stage\");\n        ^\n\nSyntaxError: Unexpected identifier 'a'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node trace_using.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/trace_using.js:14\n  using a = door(\"stage\");\n        ^\n\nSyntaxError: Unexpected identifier 'a'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "unhandled.js": {
   "src": "import { cookOrRefuse } from \"./kitchen.js\";\n\ncookOrRefuse(\"lobster\", 50).then((dish) => console.log(\"eat\", dish));\nsetTimeout(() => console.log(\"dessert\"), 100);\nconsole.log(\"ordered\");\n",
   "stdout": "ordered\n",
   "stderr": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node unhandled.js",
     "out": "ordered\n",
     "err": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "ordered\nfile:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "ordered\n",
    "stderr": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node unhandled.js",
      "out": "ordered\n",
      "err": "file:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "ordered\nfile:///home/you/javascript-ch24/kitchen.js:11\n      if (dish === \"lobster\") reject(new Error(`out of ${dish}`));\n                                     ^\n\nError: out of lobster\n    at Timeout._onTimeout (file:///home/you/javascript-ch24/kitchen.js:11:38)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "using_demo.js": {
   "src": "function openDoor(name) {\n  console.log(`open ${name}`);\n  return {\n    [Symbol.dispose]() {\n      console.log(`close ${name}`);\n    },\n  };\n}\n\nfunction rehearse(fail) {\n  using stage = openDoor(\"stage door\");\n  using props = openDoor(\"prop room\");\n  console.log(\"rehearsing\");\n  if (fail) throw new Error(\"an actor tripped\");\n  console.log(\"bows\");\n}\n\nrehearse(false);\ntry {\n  rehearse(true);\n} catch (err) {\n  console.log(`caught: ${err.message}`);\n}\n",
   "stdout": "open stage door\nopen prop room\nrehearsing\nbows\nclose prop room\nclose stage door\nopen stage door\nopen prop room\nrehearsing\nclose prop room\nclose stage door\ncaught: an actor tripped\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node using_demo.js",
     "out": "open stage door\nopen prop room\nrehearsing\nbows\nclose prop room\nclose stage door\nopen stage door\nopen prop room\nrehearsing\nclose prop room\nclose stage door\ncaught: an actor tripped\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch24/using_demo.js:11\n  using stage = openDoor(\"stage door\");\n        ^^^^^\n\nSyntaxError: Unexpected identifier 'stage'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node using_demo.js",
      "out": "",
      "err": "file:///home/you/javascript-ch24/using_demo.js:11\n  using stage = openDoor(\"stage door\");\n        ^^^^^\n\nSyntaxError: Unexpected identifier 'stage'\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "visit_bug.js": {
   "src": "import { visit } from \"./desk.js\";\n\nvisit(42);\n",
   "stdout": "desk: next patient, please\n",
   "stderr": "file:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node visit_bug.js",
     "out": "desk: next patient, please\n",
     "err": "file:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "desk: next patient, please\nfile:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "desk: next patient, please\n",
    "stderr": "file:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node visit_bug.js",
      "out": "desk: next patient, please\n",
      "err": "file:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "desk: next patient, please\nfile:///home/you/javascript-ch24/desk.js:6\n  const seat = code.trim();\n                    ^\n\nTypeError: code.trim is not a function\n    at lookup (file:///home/you/javascript-ch24/desk.js:6:21)\n    at desk (file:///home/you/javascript-ch24/desk.js:14:12)\n    at visit (file:///home/you/javascript-ch24/desk.js:28:18)\n    at file:///home/you/javascript-ch24/visit_bug.js:3:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "visit_empty.js": {
   "src": "import { visit } from \"./desk.js\";\n\nvisit(\"   \");\n",
   "stdout": "desk treats it: no seat typed\ndesk: next patient, please\nvisit over, seat: null\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node visit_empty.js",
     "out": "desk treats it: no seat typed\ndesk: next patient, please\nvisit over, seat: null\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "visit_missing.js": {
   "src": "import { visit } from \"./desk.js\";\n\nvisit(\"Z9\");\n",
   "stdout": "desk: next patient, please\nspecialist treats it: no seat Z9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node visit_missing.js",
     "out": "desk: next patient, please\nspecialist treats it: no seat Z9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "visit_ok.js": {
   "src": "import { visit } from \"./desk.js\";\n\nvisit(\"B7\");\n",
   "stdout": "desk: next patient, please\nvisit over, seat: B7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node visit_ok.js",
     "out": "desk: next patient, please\nvisit over, seat: B7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "with_cause.js": {
   "src": "function readSettings(text) {\n  return JSON.parse(text);\n}\n\nfunction loadSettings(text) {\n  try {\n    return readSettings(text);\n  } catch (err) {\n    throw new Error(\"could not load settings\", { cause: err });\n  }\n}\n\ntry {\n  loadSettings(\"{ volume: 11 }\");\n} catch (err) {\n  console.log(err.message);\n  console.log(\"cause:\", err.cause.name);\n  console.log(\"cause message:\", err.cause.message);\n}\n",
   "stdout": "could not load settings\ncause: SyntaxError\ncause message: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node with_cause.js",
     "out": "could not load settings\ncause: SyntaxError\ncause message: Expected property name or '}' in JSON at position 2 (line 1 column 3)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "with_resolvers.js": {
   "src": "const { promise, resolve, reject } = Promise.withResolvers();\n\nsetTimeout(() => resolve(\"table for two\"), 50);\n\nconsole.log(\"waiting for a table\");\nconsole.log(await promise);\n",
   "stdout": "waiting for a table\ntable for two\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node with_resolvers.js",
     "out": "waiting for a table\ntable for two\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
