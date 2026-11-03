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
  "workdir": "/home/you/javascript-ch17",
  "versionDifferences": [
   "arrow_ignores.js",
   "lost_callback.js",
   "machine_rate_bad.js",
   "peek.js",
   "spot_lost.js",
   "strict_leak.js",
   "timeout_print.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): arrow_ignores.js, lost_callback.js, machine_rate_bad.js, peek.js, spot_lost.js, strict_leak.js, timeout_print.js."
 },
 "programs": {
  "arrow_ignores.js": {
   "src": "const kit = { name: \"Kit\" };\nconst bo = { name: \"Bo\" };\n\nconst regular = function () {\n  return this?.name;\n};\nconst arrow = () => this?.name;\n\nconsole.log(regular.call(kit), arrow.call(kit));\nconsole.log(regular.bind(bo)(), arrow.bind(bo)());\nconsole.log(new regular() instanceof regular);\nnew arrow();\n",
   "stdout": "Kit undefined\nBo undefined\ntrue\n",
   "stderr": "file:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node arrow_ignores.js",
     "out": "Kit undefined\nBo undefined\ntrue\n",
     "err": "file:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Kit undefined\nBo undefined\ntrue\nfile:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Kit undefined\nBo undefined\ntrue\n",
    "stderr": "file:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node arrow_ignores.js",
      "out": "Kit undefined\nBo undefined\ntrue\n",
      "err": "file:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Kit undefined\nBo undefined\ntrue\nfile:///home/you/javascript-ch17/arrow_ignores.js:12\nnew arrow();\n^\n\nTypeError: arrow is not a constructor\n    at file:///home/you/javascript-ch17/arrow_ignores.js:12:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "backpack.js": {
   "src": "function makeGreeter(greeting) {\n  const mark = \"!\";\n  return function (name) {\n    return greeting + \", \" + name + mark;\n  };\n}\n\nconst hello = makeGreeter(\"Hello\");\nconst howdy = makeGreeter(\"Howdy\");\nconsole.log(hello(\"Ada\"));\nconsole.log(howdy(\"Bo\"));\nconsole.log(hello(\"Cy\"));\n",
   "stdout": "Hello, Ada!\nHowdy, Bo!\nHello, Cy!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node backpack.js",
     "out": "Hello, Ada!\nHowdy, Bo!\nHello, Cy!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "big.js": {
   "src": "function makeSeatCounter() {\n  const seats = new Array(1_000_000).fill(\"empty\");\n  return () => seats.length;\n}\n\nlet countSeats = makeSeatCounter();\nconsole.log(countSeats());\ncountSeats = null;\nconsole.log(\"Nobody can reach the backpack now.\");\n",
   "stdout": "1000000\nNobody can reach the backpack now.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node big.js",
     "out": "1000000\nNobody can reach the backpack now.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bind.js": {
   "src": "function introduce(greeting) {\n  return greeting + \", I am \" + this.name;\n}\n\nconst ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\" };\n\nconst adaSays = introduce.bind(ada);\nconsole.log(adaSays(\"Hello\"));\nbo.speak = adaSays;\nconsole.log(bo.speak(\"Hi\"));\nconsole.log(adaSays.call(bo, \"Hey\"));\nconst again = adaSays.bind(bo);\nconsole.log(again(\"Yo\"));\nconsole.log(introduce === adaSays);\n",
   "stdout": "Hello, I am Ada\nHi, I am Ada\nHey, I am Ada\nYo, I am Ada\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bind.js",
     "out": "Hello, I am Ada\nHi, I am Ada\nHey, I am Ada\nYo, I am Ada\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bind_partial.js": {
   "src": "function ticketPrice(rate, count) {\n  return rate * count;\n}\n\nconst adult = ticketPrice.bind(null, 10);\nconst child = ticketPrice.bind(null, 6);\nconsole.log(adult(2));\nconsole.log(child(3));\nconsole.log(adult.name);\n",
   "stdout": "20\n18\nbound ticketPrice\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bind_partial.js",
     "out": "20\n18\nbound ticketPrice\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "birth_predict.js": {
   "src": "const snack = \"popcorn\";\nfunction makeSeller() {\n  const snack = \"pretzels\";\n  return () => console.log(\"Selling \" + snack);\n}\nfunction intermission(seller) {\n  const snack = \"ice cream\";\n  seller();\n}\nconst seller = makeSeller();\nintermission(seller);\nconsole.log(\"Lobby has \" + snack);\n",
   "stdout": "Selling pretzels\nLobby has popcorn\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node birth_predict.js",
     "out": "Selling pretzels\nLobby has popcorn\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "birthplace.js": {
   "src": "const where = \"the lobby\";\n\nfunction speak() {\n  console.log(\"I was born in \" + where);\n}\n\nfunction stage() {\n  const where = \"the stage\";\n  speak();\n}\n\nstage();\nspeak();\n",
   "stdout": "I was born in the lobby\nI was born in the lobby\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node birthplace.js",
     "out": "I was born in the lobby\nI was born in the lobby\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "borrow.js": {
   "src": "function listGuests() {\n  console.log(Array.isArray(arguments), arguments.length);\n  const guests = Array.prototype.slice.call(arguments);\n  console.log(Array.isArray(guests));\n  return guests.join(\" & \");\n}\n\nconsole.log(listGuests(\"Ada\", \"Bo\", \"Cy\"));\nconst caps = Array.prototype.map.call(\"abc\", (c) => c.toUpperCase());\nconsole.log(caps);\nconsole.log(Math.max.apply(null, [3, 9, 4]));\nconsole.log(Math.max(...[3, 9, 4]));\n",
   "stdout": "false 3\ntrue\nAda & Bo & Cy\n[ 'A', 'B', 'C' ]\n9\n9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node borrow.js",
     "out": "false 3\ntrue\nAda & Bo & Cy\n[ 'A', 'B', 'C' ]\n9\n9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "function makeLogger(prefix) {\n  let lines = 0;\n  return function (message) {\n    lines = lines + 1;\n    console.log(`${prefix} ${lines}: ${message} (${this.name})`);\n  };\n}\nconst log = makeLogger(\"[stage]\");\nconst kit = { name: \"Kit\", log };\nkit.log(\"lights\");\nlog.call({ name: \"Bo\" }, \"sound\");\nconst kitLog = log.bind(kit);\nkitLog(\"curtain\");\n",
   "stdout": "[stage] 1: lights (Kit)\n[stage] 2: sound (Bo)\n[stage] 3: curtain (Kit)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "[stage] 1: lights (Kit)\n[stage] 2: sound (Bo)\n[stage] 3: curtain (Kit)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "const counter = {\n  count: 0,\n  add(n) {\n    this.count = this.count + n;\n  },\n};\nconst addTo = counter.add.bind(counter);\n[1, 2, 3].forEach((n) => addTo(n));\nconsole.log(counter.count);\n",
   "stdout": "6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "function makeHost(name) {\n  let calls = 0;\n  return {\n    name,\n    greet() {\n      calls = calls + 1;\n      return `${this.name} #${calls}`;\n    },\n  };\n}\nconst ada = makeHost(\"Ada\");\nconst bo = makeHost(\"Bo\");\nconsole.log(ada.greet());\nconsole.log(ada.greet.call(bo));\nconsole.log(bo.greet());\nconst g = bo.greet.bind(ada);\nconsole.log(g());\n",
   "stdout": "Ada #1\nBo #2\nBo #1\nAda #2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "Ada #1\nBo #2\nBo #1\nAda #2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "function once(fn) {\n  return () => {\n    let done = false;\n    if (!done) {\n      done = true;\n      fn();\n    }\n  };\n}\nconst launch = once(() => console.log(\"Launch!\"));\nlaunch();\nlaunch();\n",
   "stdout": "Launch!\nLaunch!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "Launch!\nLaunch!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "const jobs = [];\nfor (let i = 1; i <= 3; i++) {\n  let total = 0;\n  jobs.push(() => {\n    total = total + i;\n    console.log(i, total);\n  });\n}\njobs[0]();\njobs[2]();\njobs[0]();\njobs[1]();\njobs[2]();\n",
   "stdout": "1 1\n3 3\n1 2\n2 2\n3 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 1\n3 3\n1 2\n2 2\n3 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "call_apply.js": {
   "src": "function introduce(greeting, mark) {\n  return greeting + \", I am \" + this.name + mark;\n}\n\nconst ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\" };\n\nconsole.log(introduce.call(ada, \"Hello\", \"!\"));\nconsole.log(introduce.call(bo, \"Hi\", \".\"));\nconsole.log(introduce.apply(ada, [\"Hey\", \"?\"]));\nconst words = [\"Howdy\", \"!!\"];\nconsole.log(introduce.apply(bo, words));\n",
   "stdout": "Hello, I am Ada!\nHi, I am Bo.\nHey, I am Ada?\nHowdy, I am Bo!!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node call_apply.js",
     "out": "Hello, I am Ada!\nHi, I am Bo.\nHey, I am Ada?\nHowdy, I am Bo!!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "countdown.js": {
   "src": "function startCountdown(from) {\n  let left = from;\n  const timer = setInterval(() => {\n    console.log(left);\n    left = left - 1;\n    if (left === 0) {\n      clearInterval(timer);\n      console.log(\"Curtain up!\");\n    }\n  }, 20);\n}\n\nstartCountdown(3);\nconsole.log(\"countdown started\");\n",
   "stdout": "countdown started\n3\n2\n1\nCurtain up!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node countdown.js",
     "out": "countdown started\n3\n2\n1\nCurtain up!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "counter.js": {
   "src": "function makeCounter() {\n  let count = 0;\n  return function () {\n    count = count + 1;\n    return count;\n  };\n}\n\nconst tickets = makeCounter();\nconst programs = makeCounter();\nconsole.log(tickets());\nconsole.log(tickets());\nconsole.log(programs());\n",
   "stdout": "1\n2\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node counter.js",
     "out": "1\n2\n1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "default_sloppy.cjs": {
   "src": "function whoAmI() {\n  return this;\n}\nfunction strictWhoAmI() {\n  \"use strict\";\n  return this;\n}\n\nconsole.log(whoAmI() === globalThis);\nconsole.log(strictWhoAmI());\nconsole.log(typeof globalThis.setTimeout);\n",
   "stdout": "true\nundefined\nfunction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node default_sloppy.cjs",
     "out": "true\nundefined\nfunction\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "default_strict.js": {
   "src": "function whoAmI() {\n  return this;\n}\n\nconsole.log(whoAmI());\nconsole.log(this);\n",
   "stdout": "undefined\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node default_strict.js",
     "out": "undefined\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "dom_predict.html": {
   "src": "<!doctype html>\n<button id=\"gong\">Gong</button>\n<script>\n  const gong = document.querySelector(\"#gong\");\n  gong.addEventListener(\"click\", (event) => {\n    console.log(\"first:\", event.currentTarget.id);\n  });\n  gong.addEventListener(\"click\", () => {\n    console.log(\"second:\", this === window ? \"window\" : this);\n  });\n  gong.addEventListener(\"click\", function () {\n    const inner = function () {\n      return this === window ? \"window\" : this;\n    };\n    console.log(\"third:\", this.id, inner());\n  });\n</script>\n",
   "stdout": "first: gong\nsecond: window\nthird: gong window\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open dom_predict.html in a browser (console shown)",
     "out": "first: gong\nsecond: window\nthird: gong window\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "dom_this.html": {
   "src": "<!doctype html>\n<button id=\"bell\">Ring</button>\n<script>\n  const bell = document.querySelector(\"#bell\");\n  bell.addEventListener(\"click\", function () {\n    console.log(\"function handler:\", this.id);\n  });\n  bell.addEventListener(\"click\", () => {\n    console.log(\"arrow handler:\", this === window ? \"window\" : this);\n  });\n  bell.addEventListener(\"click\", (event) => {\n    console.log(\"arrow + event:\", event.currentTarget.id);\n  });\n</script>\n",
   "stdout": "function handler: bell\narrow handler: window\narrow + event: bell\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open dom_this.html in a browser (console shown)",
     "out": "function handler: bell\narrow handler: window\narrow + event: bell\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "dom_this_module.html": {
   "src": "<!doctype html>\n<button id=\"bell\">Ring</button>\n<script type=\"module\">\n  const bell = document.querySelector(\"#bell\");\n  bell.addEventListener(\"click\", function () {\n    console.log(\"function handler:\", this.id);\n  });\n  bell.addEventListener(\"click\", () => {\n    console.log(\"arrow handler:\", this === window ? \"window\" : this);\n  });\n  bell.addEventListener(\"click\", (event) => {\n    console.log(\"arrow + event:\", event.currentTarget.id);\n  });\n</script>\n",
   "stdout": "function handler: bell\narrow handler: undefined\narrow + event: bell\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open dom_this_module.html in a browser (console shown)",
     "out": "function handler: bell\narrow handler: undefined\narrow + event: bell\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_call.js": {
   "src": "function describe(role, act) {\n  return this.name + \" plays \" + role + \" in act \" + act;\n}\nconst ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\" };\nconsole.log(describe.call(ada, \"the lion\", 1));\nconsole.log(describe.apply(bo, [\"the tin man\", 2]));\nconst cySays = describe.bind({ name: \"Cy\" }, \"the scarecrow\");\nconsole.log(cySays(3));\n",
   "stdout": "Ada plays the lion in act 1\nBo plays the tin man in act 2\nCy plays the scarecrow in act 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_call.js",
     "out": "Ada plays the lion in act 1\nBo plays the tin man in act 2\nCy plays the scarecrow in act 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_counter.js": {
   "src": "function makeCounter(step) {\n  let count = 0;\n  return () => {\n    count = count + step;\n    return count;\n  };\n}\nconst byTwo = makeCounter(2);\nconst byFive = makeCounter(5);\nconsole.log(byTwo());\nconsole.log(byTwo());\nconsole.log(byFive());\n",
   "stdout": "2\n4\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_counter.js",
     "out": "2\n4\n5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_fixes.js": {
   "src": "const lamp = {\n  color: \"blue\",\n  shine() {\n    console.log(\"Shining \" + this.color);\n  },\n};\nsetTimeout(() => lamp.shine(), 10);\nsetTimeout(lamp.shine.bind(lamp), 20);\nlamp.shine.call(lamp);\n",
   "stdout": "Shining blue\nShining blue\nShining blue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_fixes.js",
     "out": "Shining blue\nShining blue\nShining blue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_once.js": {
   "src": "function once(fn) {\n  let done = false;\n  return () => {\n    if (done) return;\n    done = true;\n    fn();\n  };\n}\nconst ring = once(() => console.log(\"Ding!\"));\nring();\nring();\nring();\nconsole.log(\"The bell rang once\");\n",
   "stdout": "Ding!\nThe bell rang once\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_once.js",
     "out": "Ding!\nThe bell rang once\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "iife.js": {
   "src": "const booth = (function () {\n  let sold = 0;\n  function sell(n) {\n    sold = sold + n;\n  }\n  function report() {\n    return sold + \" tickets sold\";\n  }\n  return { sell, report };\n})();\n\nbooth.sell(2);\nbooth.sell(3);\nconsole.log(booth.report());\nconsole.log(booth.sold);\nconsole.log(typeof sell);\n",
   "stdout": "5 tickets sold\nundefined\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node iife.js",
     "out": "5 tickets sold\nundefined\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "let_loop.js": {
   "src": "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(\"let lap\", i), 0);\n}\n",
   "stdout": "let lap 0\nlet lap 1\nlet lap 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node let_loop.js",
     "out": "let lap 0\nlet lap 1\nlet lap 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "live.js": {
   "src": "let mood = \"calm\";\nfunction report() {\n  console.log(\"Kit is \" + mood);\n}\nreport();\nmood = \"excited\";\nreport();\n",
   "stdout": "Kit is calm\nKit is excited\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node live.js",
     "out": "Kit is calm\nKit is excited\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "loops_both.js": {
   "src": "for (var v = 0; v < 2; v++) {\n  setTimeout(() => console.log(\"var\", v), 0);\n}\nfor (let l = 0; l < 2; l++) {\n  setTimeout(() => console.log(\"let\", l), 0);\n}\nconsole.log(\"loops done\");\n",
   "stdout": "loops done\nvar 2\nvar 2\nlet 0\nlet 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node loops_both.js",
     "out": "loops done\nvar 2\nvar 2\nlet 0\nlet 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lost_callback.js": {
   "src": "const stage = {\n  name: \"Main Stage\",\n  announce() {\n    console.log(\"Welcome to the \" + this.name);\n  },\n};\n\nstage.announce();\nconst acts = [\"opening\"];\nacts.forEach(stage.announce);\n",
   "stdout": "Welcome to the Main Stage\n",
   "stderr": "file:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node lost_callback.js",
     "out": "Welcome to the Main Stage\n",
     "err": "file:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Welcome to the Main Stage\nfile:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Welcome to the Main Stage\n",
    "stderr": "file:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node lost_callback.js",
      "out": "Welcome to the Main Stage\n",
      "err": "file:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Welcome to the Main Stage\nfile:///home/you/javascript-ch17/lost_callback.js:4\n    console.log(\"Welcome to the \" + this.name);\n                                         ^\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at announce (file:///home/you/javascript-ch17/lost_callback.js:4:42)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch17/lost_callback.js:10:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "machine_rate.js": {
   "src": "function withRate(rate) {\n  return (count) => rate * count;\n}\nconsole.log(withRate(10));\nconsole.log(withRate(10)(2));\nconsole.log(withRate(6)(3));\nconsole.log(typeof withRate(6));\n",
   "stdout": "[Function (anonymous)]\n20\n18\nfunction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node machine_rate.js",
     "out": "[Function (anonymous)]\n20\n18\nfunction\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "machine_rate_bad.js": {
   "src": "function withRate(rate) {\n  return (count) => rate * count;\n}\nconsole.log(withRate(10)(2)(5));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch17/machine_rate_bad.js:4\nconsole.log(withRate(10)(2)(5));\n                           ^\n\nTypeError: withRate(...)(...) is not a function\n    at file:///home/you/javascript-ch17/machine_rate_bad.js:4:28\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node machine_rate_bad.js",
     "out": "",
     "err": "file:///home/you/javascript-ch17/machine_rate_bad.js:4\nconsole.log(withRate(10)(2)(5));\n                           ^\n\nTypeError: withRate(...)(...) is not a function\n    at file:///home/you/javascript-ch17/machine_rate_bad.js:4:28\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch17/machine_rate_bad.js:4\nconsole.log(withRate(10)(2)(5));\n                           ^\n\nTypeError: withRate(...)(...) is not a function\n    at file:///home/you/javascript-ch17/machine_rate_bad.js:4:28\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node machine_rate_bad.js",
      "out": "",
      "err": "file:///home/you/javascript-ch17/machine_rate_bad.js:4\nconsole.log(withRate(10)(2)(5));\n                           ^\n\nTypeError: withRate(...)(...) is not a function\n    at file:///home/you/javascript-ch17/machine_rate_bad.js:4:28\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "memo.js": {
   "src": "function memoize(slowFn) {\n  const cache = {};\n  return (n) => {\n    if (n in cache) {\n      console.log(\"from the cache:\", n);\n      return cache[n];\n    }\n    console.log(\"working out:\", n);\n    cache[n] = slowFn(n);\n    return cache[n];\n  };\n}\n\nconst square = memoize((n) => n * n);\nconsole.log(square(4));\nconsole.log(square(4));\nconsole.log(square(9));\n",
   "stdout": "working out: 4\n16\nfrom the cache: 4\n16\nworking out: 9\n81\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node memo.js",
     "out": "working out: 4\n16\nfrom the cache: 4\n16\nworking out: 9\n81\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "new_rule.js": {
   "src": "function Puppet(name) {\n  this.name = name;\n  this.line = \"Hello, I am \" + name;\n}\n\nconst polly = new Puppet(\"Polly\");\nconsole.log(polly.line);\nconsole.log(polly);\n",
   "stdout": "Hello, I am Polly\nPuppet { name: 'Polly', line: 'Hello, I am Polly' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node new_rule.js",
     "out": "Hello, I am Polly\nPuppet { name: 'Polly', line: 'Hello, I am Polly' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "once.js": {
   "src": "function once(fn) {\n  let done = false;\n  let result;\n  return (...args) => {\n    if (!done) {\n      done = true;\n      result = fn(...args);\n    }\n    return result;\n  };\n}\n\nconst openCurtain = once((who) => {\n  console.log(\"The curtain opens for \" + who);\n  return \"open\";\n});\nconsole.log(openCurtain(\"Ada\"));\nconsole.log(openCurtain(\"Bo\"));\n",
   "stdout": "The curtain opens for Ada\nopen\nopen\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node once.js",
     "out": "The curtain opens for Ada\nopen\nopen\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_factory.js": {
   "src": "function makeTicketMachine(show) {\n  let number = 0;\n  return () => {\n    number = number + 1;\n    return show + \" #\" + number;\n  };\n}\nconst oz = makeTicketMachine(\"Oz\");\noz();\nconsole.log(oz());\n",
   "stdout": "Oz #2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_factory.js",
     "out": "Oz #2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "partial.js": {
   "src": "function ticketPrice(rate, count) {\n  return rate * count;\n}\n\nfunction withRate(rate) {\n  return (count) => ticketPrice(rate, count);\n}\n\nconst adult = withRate(10);\nconst child = withRate(6);\nconsole.log(adult(2));\nconsole.log(child(3));\nconsole.log(adult(1) + child(2));\n",
   "stdout": "20\n18\n22\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node partial.js",
     "out": "20\n18\n22\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "peek.js": {
   "src": "function makeWallet(start) {\n  let balance = start;\n  return { check: () => balance };\n}\nconst wallet = makeWallet(10);\nconsole.log(wallet.check());\nconsole.log(balance);\n",
   "stdout": "10\n",
   "stderr": "file:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node peek.js",
     "out": "10\n",
     "err": "file:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "10\nfile:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "10\n",
    "stderr": "file:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node peek.js",
      "out": "10\n",
      "err": "file:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "10\nfile:///home/you/javascript-ch17/peek.js:7\nconsole.log(balance);\n            ^\n\nReferenceError: balance is not defined\n    at file:///home/you/javascript-ch17/peek.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "predict_bind.js": {
   "src": "function shout() {\n  return this.name.toUpperCase() + \"!\";\n}\nconst kit = { name: \"Kit\" };\nconst ada = { name: \"Ada\", shout };\nconst kitShout = shout.bind(kit);\nconsole.log(ada.shout());\nconsole.log(kitShout());\nconsole.log(kitShout.bind(ada)());\nconsole.log(kitShout.call(ada));\n",
   "stdout": "ADA!\nKIT!\nKIT!\nKIT!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_bind.js",
     "out": "ADA!\nKIT!\nKIT!\nKIT!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_eight.js": {
   "src": "function probe() {\n  return this === undefined ? \"nobody\" : this.name;\n}\nconst ada = { name: \"Ada\", probe };\nconst bo = { name: \"Bo\" };\nconst loose = ada.probe;\nconst tied = probe.bind(bo);\nconst cy = { name: \"Cy\", tied };\n\nconsole.log(ada.probe());\nconsole.log(loose());\nconsole.log(probe.call(ada));\nconsole.log(probe.apply(bo));\nconsole.log(tied());\nconsole.log(cy.tied());\nconsole.log(tied.call(ada));\nconsole.log([\"x\"].map(probe)[0]);\n",
   "stdout": "Ada\nnobody\nAda\nBo\nBo\nBo\nBo\nnobody\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_eight.js",
     "out": "Ada\nnobody\nAda\nBo\nBo\nBo\nBo\nnobody\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_iife.js": {
   "src": "const lights = (function () {\n  let level = 0;\n  return {\n    up() {\n      level = level + 1;\n      return level;\n    },\n    reset() {\n      level = 0;\n    },\n  };\n})();\nconsole.log(lights.up());\nconsole.log(lights.up());\nlights.reset();\nconsole.log(lights.up());\nconsole.log(lights.level);\n",
   "stdout": "1\n2\n1\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_iife.js",
     "out": "1\n2\n1\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_loop.js": {
   "src": "const cards = [];\nfor (var seat = 1; seat <= 3; seat++) {\n  cards.push(() => \"var seat \" + seat);\n}\nfor (let row = 1; row <= 3; row++) {\n  cards.push(() => \"let row \" + row);\n}\nfor (const card of cards) {\n  console.log(card());\n}\n",
   "stdout": "var seat 4\nvar seat 4\nvar seat 4\nlet row 1\nlet row 2\nlet row 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_loop.js",
     "out": "var seat 4\nvar seat 4\nvar seat 4\nlet row 1\nlet row 2\nlet row 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_arrow.js": {
   "src": "const kit = {\n  name: \"Kit\",\n  cue() {\n    const arrow = () => this.name;\n    return arrow.call({ name: \"Bo\" });\n  },\n};\nconsole.log(kit.cue());\n",
   "stdout": "Kit\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_arrow.js",
     "out": "Kit\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_bind.js": {
   "src": "const ada = {\n  name: \"Ada\",\n  who() {\n    return this === undefined ? \"undefined\" : this.name;\n  },\n};\nconst cyWho = ada.who.bind({ name: \"Cy\" });\nconst bo = { name: \"Bo\", who: cyWho };\nconsole.log(bo.who());\n",
   "stdout": "Cy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_bind.js",
     "out": "Cy\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_call.js": {
   "src": "const ada = {\n  name: \"Ada\",\n  who() {\n    return this === undefined ? \"undefined\" : this.name;\n  },\n};\nconst bo = { name: \"Bo\" };\nconsole.log(ada.who.call(bo));\n",
   "stdout": "Bo\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_call.js",
     "out": "Bo\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_callback.js": {
   "src": "const crew = [\"Ada\"];\ncrew.forEach(function () {\n  console.log(this === undefined ? \"undefined\" : this);\n});\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_callback.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_dot.js": {
   "src": "const ada = {\n  name: \"Ada\",\n  who() {\n    return this === undefined ? \"undefined\" : this.name;\n  },\n};\nconsole.log(ada.who());\n",
   "stdout": "Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_dot.js",
     "out": "Ada\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_new.js": {
   "src": "function Puppet(name) {\n  this.name = name;\n}\nconst polly = new Puppet(\"Polly\");\nconsole.log(polly.name);\n",
   "stdout": "Polly\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_new.js",
     "out": "Polly\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_plain.js": {
   "src": "const ada = {\n  name: \"Ada\",\n  who() {\n    return this === undefined ? \"undefined\" : this.name;\n  },\n};\nconst who = ada.who;\nconsole.log(who());\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_plain.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rule_timer.js": {
   "src": "setTimeout(function () {\n  console.log(this.constructor.name);\n}, 0);\n",
   "stdout": "Timeout\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rule_timer.js",
     "out": "Timeout\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sloppy_leak.cjs": {
   "src": "function setName(name) {\n  this.name = name;\n}\n\nsetName(\"Ada\");\nconsole.log(globalThis.name);\n",
   "stdout": "Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sloppy_leak.cjs",
     "out": "Ada\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_lost.js": {
   "src": "const show = {\n  title: \"Oz\",\n  seats: 120,\n  summary() {\n    return this.title + \": \" + this.seats + \" seats\";\n  },\n};\n\nconsole.log(show.summary());\nconst tellLater = show.summary;\nsetTimeout(() => console.log(tellLater()), 10);\n",
   "stdout": "Oz: 120 seats\n",
   "stderr": "file:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_lost.js",
     "out": "Oz: 120 seats\n",
     "err": "file:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Oz: 120 seats\nfile:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:685:17)\n    at process.processTimers (node:internal/timers:618:7)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Oz: 120 seats\n",
    "stderr": "file:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_lost.js",
      "out": "Oz: 120 seats\n",
      "err": "file:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Oz: 120 seats\nfile:///home/you/javascript-ch17/spot_lost.js:5\n    return this.title + \": \" + this.seats + \" seats\";\n                ^\n\nTypeError: Cannot read properties of undefined (reading 'title')\n    at summary (file:///home/you/javascript-ch17/spot_lost.js:5:17)\n    at Timeout._onTimeout (file:///home/you/javascript-ch17/spot_lost.js:11:30)\n    at listOnTimeout (node:internal/timers:585:17)\n    at process.processTimers (node:internal/timers:521:7)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "spot_shared.js": {
   "src": "let count = 0;\nfunction makeCounter() {\n  return () => {\n    count = count + 1;\n    return count;\n  };\n}\nconst doorA = makeCounter();\nconst doorB = makeCounter();\nconsole.log(\"door A:\", doorA());\nconsole.log(\"door A:\", doorA());\nconsole.log(\"door B:\", doorB());\n",
   "stdout": "door A: 1\ndoor A: 2\ndoor B: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_shared.js",
     "out": "door A: 1\ndoor A: 2\ndoor B: 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_stale.js": {
   "src": "let score = 0;\n\nfunction makeAnnouncer(current) {\n  return () => console.log(\"Final score:\", current);\n}\n\nconst announce = makeAnnouncer(score);\nscore = score + 5;\nscore = score + 3;\nsetTimeout(announce, 10);\n",
   "stdout": "Final score: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_stale.js",
     "out": "Final score: 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stale.js": {
   "src": "let settings = { volume: 3 };\n\nfunction makeReporter(s) {\n  return () => console.log(\"reporter says volume\", s.volume);\n}\n\nconst report = makeReporter(settings);\nsettings = { volume: 9 };\nsetTimeout(report, 10);\nsetTimeout(() => console.log(\"settings say\", settings.volume), 20);\n",
   "stdout": "reporter says volume 3\nsettings say 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node stale.js",
     "out": "reporter says volume 3\nsettings say 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stale_fixed.js": {
   "src": "let settings = { volume: 3 };\n\nfunction makeReporter() {\n  return () => console.log(\"reporter says volume\", settings.volume);\n}\n\nconst report = makeReporter();\nsettings = { volume: 9 };\nsetTimeout(report, 10);\n",
   "stdout": "reporter says volume 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node stale_fixed.js",
     "out": "reporter says volume 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "strict_leak.js": {
   "src": "function setName(name) {\n  this.name = name;\n}\n\nsetName(\"Ada\");\nconsole.log(globalThis.name);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch17/strict_leak.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at setName (file:///home/you/javascript-ch17/strict_leak.js:2:13)\n    at file:///home/you/javascript-ch17/strict_leak.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node strict_leak.js",
     "out": "",
     "err": "file:///home/you/javascript-ch17/strict_leak.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at setName (file:///home/you/javascript-ch17/strict_leak.js:2:13)\n    at file:///home/you/javascript-ch17/strict_leak.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch17/strict_leak.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at setName (file:///home/you/javascript-ch17/strict_leak.js:2:13)\n    at file:///home/you/javascript-ch17/strict_leak.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node strict_leak.js",
      "out": "",
      "err": "file:///home/you/javascript-ch17/strict_leak.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at setName (file:///home/you/javascript-ch17/strict_leak.js:2:13)\n    at file:///home/you/javascript-ch17/strict_leak.js:5:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "three_fixes.js": {
   "src": "const stage = {\n  name: \"Main Stage\",\n  announce() {\n    return \"Welcome to the \" + this.name;\n  },\n};\n\nconst viaArrow = () => stage.announce();\nconst viaBind = stage.announce.bind(stage);\n\nclass Booth {\n  name = \"Ticket Booth\";\n  announce = () => \"Welcome to the \" + this.name;\n}\nconst booth = new Booth();\nconst viaField = booth.announce;\n\nconsole.log(viaArrow());\nconsole.log(viaBind());\nconsole.log(viaField());\n",
   "stdout": "Welcome to the Main Stage\nWelcome to the Main Stage\nWelcome to the Ticket Booth\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node three_fixes.js",
     "out": "Welcome to the Main Stage\nWelcome to the Main Stage\nWelcome to the Ticket Booth\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "timeout_print.js": {
   "src": "setTimeout(function () {\n  console.log(this);\n}, 10);\n",
   "stdout": "Timeout {\n  _idleTimeout: 10,\n  _idlePrev: null,\n  _idleNext: null,\n  _idleStart: 28,\n  _onTimeout: [Function (anonymous)],\n  _timerArgs: undefined,\n  _repeat: null,\n  _destroyed: false,\n  Symbol(refed): true,\n  Symbol(kHasPrimitive): false,\n  Symbol(asyncId): 2,\n  Symbol(triggerId): 0,\n  Symbol(kAsyncContextFrame): undefined\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node timeout_print.js",
     "out": "Timeout {\n  _idleTimeout: 10,\n  _idlePrev: null,\n  _idleNext: null,\n  _idleStart: 28,\n  _onTimeout: [Function (anonymous)],\n  _timerArgs: undefined,\n  _repeat: null,\n  _destroyed: false,\n  Symbol(refed): true,\n  Symbol(kHasPrimitive): false,\n  Symbol(asyncId): 2,\n  Symbol(triggerId): 0,\n  Symbol(kAsyncContextFrame): undefined\n}\n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Timeout {\n  _idleTimeout: 10,\n  _idlePrev: null,\n  _idleNext: null,\n  _idleStart: 19,\n  _onTimeout: [Function (anonymous)],\n  _timerArgs: undefined,\n  _repeat: null,\n  _destroyed: false,\n  [Symbol(refed)]: true,\n  [Symbol(kHasPrimitive)]: false,\n  [Symbol(asyncId)]: 2,\n  [Symbol(triggerId)]: 0,\n  [Symbol(kAsyncContextFrame)]: undefined\n}\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "node timeout_print.js",
      "out": "Timeout {\n  _idleTimeout: 10,\n  _idlePrev: null,\n  _idleNext: null,\n  _idleStart: 19,\n  _onTimeout: [Function (anonymous)],\n  _timerArgs: undefined,\n  _repeat: null,\n  _destroyed: false,\n  [Symbol(refed)]: true,\n  [Symbol(kHasPrimitive)]: false,\n  [Symbol(asyncId)]: 2,\n  [Symbol(triggerId)]: 0,\n  [Symbol(kAsyncContextFrame)]: undefined\n}\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "timer_browser.html": {
   "src": "<!doctype html>\n<script>\n  setTimeout(function () {\n    console.log(\"timer this is window:\", this === window);\n  }, 0);\n</script>\n",
   "stdout": "timer this is window: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "open timer_browser.html in a browser (console shown)",
     "out": "timer this is window: true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "timer_this.js": {
   "src": "const kit = {\n  name: \"Kit\",\n  cue() {\n    console.log(\"this is a\", this.constructor.name);\n    console.log(\"this.name is\", this.name);\n  },\n};\n\nkit.cue();\nsetTimeout(kit.cue, 10);\n",
   "stdout": "this is a Object\nthis.name is Kit\nthis is a Timeout\nthis.name is undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node timer_this.js",
     "out": "this is a Object\nthis.name is Kit\nthis is a Timeout\nthis.name is undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_counters.js": {
   "src": "function makeCounter(name, step) {\n  let count = 0;\n  return () => {\n    count = count + step;\n    console.log(name, count);\n  };\n}\nconst ada = makeCounter(\"ada\", 1);\nconst bo = makeCounter(\"bo\", 10);\nada();\nbo();\nada();\nbo();\nada();\n",
   "stdout": "ada 1\nbo 10\nada 2\nbo 20\nada 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_counters.js",
     "out": "ada 1\nbo 10\nada 2\nbo 20\nada 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_memo.js": {
   "src": "function memoize(fn) {\n  const cache = {};\n  let work = 0;\n  return (n) => {\n    if (!(n in cache)) {\n      work = work + 1;\n      cache[n] = fn(n);\n    }\n    console.log(n, cache[n], work);\n  };\n}\nconst triple = memoize((n) => n * 3);\ntriple(2);\ntriple(5);\ntriple(2);\ntriple(5);\ntriple(7);\n",
   "stdout": "2 6 1\n5 15 2\n2 6 2\n5 15 2\n7 21 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_memo.js",
     "out": "2 6 1\n5 15 2\n2 6 2\n5 15 2\n7 21 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "var_loop.js": {
   "src": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(\"var lap\", i), 0);\n}\n",
   "stdout": "var lap 3\nvar lap 3\nvar lap 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node var_loop.js",
     "out": "var lap 3\nvar lap 3\nvar lap 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wallet.js": {
   "src": "function makeWallet(start) {\n  let balance = start;\n  return {\n    pay(amount) {\n      balance = balance - amount;\n    },\n    check() {\n      return balance;\n    },\n  };\n}\n\nconst wallet = makeWallet(10);\nwallet.pay(3);\nconsole.log(wallet.check());\nconsole.log(wallet.balance);\nwallet.balance = 1000;\nconsole.log(wallet.check());\n",
   "stdout": "7\nundefined\n7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node wallet.js",
     "out": "7\nundefined\n7\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
