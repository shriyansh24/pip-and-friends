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
  "workdir": "/home/you/javascript-ch18",
  "versionDifferences": [
   "bare_hasown.js",
   "brand_number.js",
   "class_no_new.js",
   "class_strict.cjs",
   "class_tdz.js",
   "getter_only.js",
   "lost_this.js",
   "new_arrow.js",
   "new_method.js",
   "no_new.js",
   "predict_nonew.js",
   "private_foreign.js",
   "private_outside.js",
   "seat_crash.js",
   "spot_static.js",
   "spot_super.js",
   "super_missing.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): bare_hasown.js, brand_number.js, class_no_new.js, class_strict.cjs, class_tdz.js, getter_only.js, lost_this.js, new_arrow.js, new_method.js, no_new.js, predict_nonew.js, private_foreign.js, private_outside.js, seat_crash.js, spot_static.js, spot_super.js, super_missing.js."
 },
 "programs": {
  "ask_parent.js": {
   "src": "const actor = {\n  kind: \"actor\",\n  bow() { return this.name + \" bows.\"; },\n};\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.name);\nconsole.log(ada.kind);\nconsole.log(ada.bow());\nconsole.log(Object.getPrototypeOf(ada) === actor);\nconsole.log(Object.hasOwn(ada, \"kind\"), \"kind\" in ada);\nconsole.log(ada);\n",
   "stdout": "Ada\nactor\nAda bows.\ntrue\nfalse true\n{ name: 'Ada' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node ask_parent.js",
     "out": "Ada\nactor\nAda bows.\ntrue\nfalse true\n{ name: 'Ada' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bank.js": {
   "src": "class BankAccount {\n  #balance = 0;\n  constructor(owner) {\n    this.owner = owner;\n  }\n  deposit(amount) {\n    if (amount <= 0) return \"Refused: \" + amount;\n    this.#balance += amount;\n    return \"Balance: \" + this.#balance;\n  }\n}\nconst acct = new BankAccount(\"Kit\");\nconsole.log(acct.deposit(50));\nconsole.log(acct.deposit(-999));\nacct.balance = 1000000;\nconsole.log(acct.deposit(1));\nconsole.log(acct);\nconsole.log(Object.keys(acct));\n",
   "stdout": "Balance: 50\nRefused: -999\nBalance: 51\nBankAccount { owner: 'Kit', balance: 1000000 }\n[ 'owner', 'balance' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bank.js",
     "out": "Balance: 50\nRefused: -999\nBalance: 51\nBankAccount { owner: 'Kit', balance: 1000000 }\n[ 'owner', 'balance' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bare_hasown.js": {
   "src": "const seats = Object.create(null);\nseats.A1 = \"Ada\";\nconsole.log(Object.hasOwn(seats, \"A1\"));\nconsole.log(seats.hasOwnProperty(\"A1\"));\n",
   "stdout": "true\n",
   "stderr": "file:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node bare_hasown.js",
     "out": "true\n",
     "err": "file:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "true\nfile:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "true\n",
    "stderr": "file:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node bare_hasown.js",
      "out": "true\n",
      "err": "file:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "true\nfile:///home/you/javascript-ch18/bare_hasown.js:4\nconsole.log(seats.hasOwnProperty(\"A1\"));\n                  ^\n\nTypeError: seats.hasOwnProperty is not a function\n    at file:///home/you/javascript-ch18/bare_hasown.js:4:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "boss_fill.js": {
   "src": "class Counter {\n  static #made = 0;\n  #count = 0;\n  constructor() {\n    Counter.#made += 1;\n  }\n  click() {\n    this.#count += 1;\n    return this.#count;\n  }\n  static get made() {\n    return Counter.#made;\n  }\n}\nclass DoubleCounter extends Counter {\n  click() {\n    super.click();\n    return super.click();\n  }\n}\nconst a = new Counter();\nconst b = new DoubleCounter();\na.click();\nconsole.log(a.click(), b.click(), Counter.made);\n",
   "stdout": "2 2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "2 2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "class Prop {\n  constructor(name) {\n    this.name = name;\n  }\n}\nclass Lamp extends Prop {\n  constructor(name, watts) {\n    super(name);\n    this.watts = watts;\n  }\n}\nconst lamp = new Lamp(\"spot\", 500);\nconsole.log(lamp.name, lamp.watts);\n",
   "stdout": "spot 500\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "spot 500\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "class Badge {\n  #id;\n  constructor(id) { this.#id = id; }\n  static check(x) { return #id in x ? \"badge\" : \"no badge\"; }\n}\nclass VipBadge extends Badge {}\nconsole.log(Badge.check(new Badge(1)));\nconsole.log(Badge.check({ id: 1 }));\nconsole.log(Badge.check(new VipBadge(2)));\nconsole.log(Badge.check(Object.create(Badge.prototype)));\n",
   "stdout": "badge\nno badge\nbadge\nno badge\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "badge\nno badge\nbadge\nno badge\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "class Banner {\n  constructor() {\n    console.log(this.render());\n  }\n  render() { return \"BANNER\"; }\n}\nclass ShowBanner extends Banner {\n  title = \"Hamlet\";\n  render() { return \"Tonight: \" + this.title; }\n}\nnew ShowBanner();\n",
   "stdout": "Tonight: undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "Tonight: undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "class Seat {\n  static sold = 0;\n  price = 20;\n  constructor(row) {\n    this.row = row;\n    Seat.sold += 1;\n  }\n}\nclass VipSeat extends Seat {\n  price = 50;\n}\nconst seats = [new Seat(\"A\"), new VipSeat(\"B\"), new Seat(\"C\")];\nfor (const s of seats) {\n  console.log(s.row, s.price, s instanceof VipSeat, Seat.sold);\n}\n",
   "stdout": "A 20 false 3\nB 50 true 3\nC 20 false 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "A 20 false 3\nB 50 true 3\nC 20 false 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "brand_number.js": {
   "src": "class BankAccount {\n  #balance = 0;\n  static isAccount(thing) {\n    return #balance in thing;\n  }\n}\n\nconsole.log(BankAccount.isAccount({}));\nconsole.log(BankAccount.isAccount(5));\n",
   "stdout": "false\n",
   "stderr": "file:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node brand_number.js",
     "out": "false\n",
     "err": "file:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "false\nfile:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "false\n",
    "stderr": "file:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node brand_number.js",
      "out": "false\n",
      "err": "file:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "false\nfile:///home/you/javascript-ch18/brand_number.js:4\n    return #balance in thing;\n                    ^\n\nTypeError: Cannot use 'in' operator to search for '#balance' in 5\n    at BankAccount.isAccount (file:///home/you/javascript-ch18/brand_number.js:4:21)\n    at file:///home/you/javascript-ch18/brand_number.js:9:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "builtins.js": {
   "src": "class SeatError extends Error {\n  constructor(seat) {\n    super(\"No such seat: \" + seat);\n    this.name = \"SeatError\";\n    this.seat = seat;\n  }\n}\nclass CueList extends Array {\n  next() { return this[0]; }\n}\ntry {\n  throw new SeatError(\"Z9\");\n} catch (err) {\n  console.log(err instanceof SeatError, err instanceof Error);\n  console.log(err.name, \"|\", err.message, \"|\", err.seat);\n}\nconst cues = CueList.from([\"lights\", \"sound\"]);\nconsole.log(cues.next(), cues.length);\nconst loud = cues.map((c) => c.toUpperCase());\nconsole.log(loud, loud instanceof CueList);\n",
   "stdout": "true true\nSeatError | No such seat: Z9 | Z9\nlights 2\nCueList(2) [ 'LIGHTS', 'SOUND' ] true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node builtins.js",
     "out": "true true\nSeatError | No such seat: Z9 | Z9\nlights 2\nCueList(2) [ 'LIGHTS', 'SOUND' ] true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "chain.js": {
   "src": "const actor = { kind: \"actor\" };\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.name);\nconsole.log(ada.kind);\nconsole.log(ada.toString());\nconsole.log(ada.wings);\n",
   "stdout": "Ada\nactor\n[object Object]\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node chain.js",
     "out": "Ada\nactor\n[object Object]\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "class_basic.js": {
   "src": "class Actor {\n  constructor(name, lines) {\n    this.name = name;\n    this.lines = lines;\n  }\n  bow() {\n    return this.name + \" bows.\";\n  }\n}\nconst ada = new Actor(\"Ada\", 42);\nconsole.log(ada.bow());\nconsole.log(ada);\nconsole.log(typeof Actor);\nconsole.log(Object.getPrototypeOf(ada) === Actor.prototype);\nconsole.log(Object.hasOwn(ada, \"bow\"), Object.hasOwn(Actor.prototype, \"bow\"));\n",
   "stdout": "Ada bows.\nActor { name: 'Ada', lines: 42 }\nfunction\ntrue\nfalse true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node class_basic.js",
     "out": "Ada bows.\nActor { name: 'Ada', lines: 42 }\nfunction\ntrue\nfalse true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "class_no_new.js": {
   "src": "class Actor {\n  constructor(name) {\n    this.name = name;\n  }\n}\nconst ada = Actor(\"Ada\");\nconsole.log(ada);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/class_no_new.js:6\nconst ada = Actor(\"Ada\");\n            ^\n\nTypeError: Class constructor Actor cannot be invoked without 'new'\n    at file:///home/you/javascript-ch18/class_no_new.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node class_no_new.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/class_no_new.js:6\nconst ada = Actor(\"Ada\");\n            ^\n\nTypeError: Class constructor Actor cannot be invoked without 'new'\n    at file:///home/you/javascript-ch18/class_no_new.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/class_no_new.js:6\nconst ada = Actor(\"Ada\");\n            ^\n\nTypeError: Class constructor Actor cannot be invoked without 'new'\n    at file:///home/you/javascript-ch18/class_no_new.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node class_no_new.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/class_no_new.js:6\nconst ada = Actor(\"Ada\");\n            ^\n\nTypeError: Class constructor Actor cannot be invoked without 'new'\n    at file:///home/you/javascript-ch18/class_no_new.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "class_strict.cjs": {
   "src": "function sloppy() {\n  oops = \"leaked\";\n}\nsloppy();\nconsole.log(globalThis.oops);\nclass Prop {\n  light() {\n    bulb = \"on\";\n  }\n}\nnew Prop().light();\n",
   "stdout": "leaked\n",
   "stderr": "/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node class_strict.cjs",
     "out": "leaked\n",
     "err": "/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "leaked\n/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "leaked\n",
    "stderr": "/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node class_strict.cjs",
      "out": "leaked\n",
      "err": "/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "leaked\n/home/you/javascript-ch18/class_strict.cjs:8\n    bulb = \"on\";\n         ^\n\nReferenceError: bulb is not defined\n    at Prop.light (/home/you/javascript-ch18/class_strict.cjs:8:10)\n    at Object.<anonymous> (/home/you/javascript-ch18/class_strict.cjs:11:12)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "class_tdz.js": {
   "src": "const lamp = new Prop(\"lamp\");\nclass Prop {\n  constructor(name) {\n    this.name = name;\n  }\n}\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/class_tdz.js:1\nconst lamp = new Prop(\"lamp\");\n             ^\n\nReferenceError: Cannot access 'Prop' before initialization\n    at file:///home/you/javascript-ch18/class_tdz.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node class_tdz.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/class_tdz.js:1\nconst lamp = new Prop(\"lamp\");\n             ^\n\nReferenceError: Cannot access 'Prop' before initialization\n    at file:///home/you/javascript-ch18/class_tdz.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/class_tdz.js:1\nconst lamp = new Prop(\"lamp\");\n             ^\n\nReferenceError: Cannot access 'Prop' before initialization\n    at file:///home/you/javascript-ch18/class_tdz.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node class_tdz.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/class_tdz.js:1\nconst lamp = new Prop(\"lamp\");\n             ^\n\nReferenceError: Cannot access 'Prop' before initialization\n    at file:///home/you/javascript-ch18/class_tdz.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "compose.js": {
   "src": "class Light {\n  constructor(color) { this.color = color; }\n  on() { return this.color + \" light on\"; }\n}\nclass Speaker {\n  play(song) { return \"playing \" + song; }\n}\nclass Stage {\n  constructor() {\n    this.light = new Light(\"blue\");\n    this.speaker = new Speaker();\n  }\n  opening() {\n    return this.light.on() + \", \" + this.speaker.play(\"overture\");\n  }\n}\nconsole.log(new Stage().opening());\n",
   "stdout": "blue light on, playing overture\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node compose.js",
     "out": "blue light on, playing overture\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "constructor_prop.js": {
   "src": "function Actor(name) { this.name = name; }\nconst ada = new Actor(\"Ada\");\nconsole.log(Actor.prototype.constructor === Actor);\nconsole.log(ada.constructor === Actor);\nconsole.log(Object.hasOwn(ada, \"constructor\"));\nconst twin = new ada.constructor(\"Ada II\");\nconsole.log(twin.name);\nconsole.log(Object.getOwnPropertyNames(Actor.prototype));\n",
   "stdout": "true\ntrue\nfalse\nAda II\n[ 'constructor' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node constructor_prop.js",
     "out": "true\ntrue\nfalse\nAda II\n[ 'constructor' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ctor.js": {
   "src": "function Actor(name, lines) {\n  this.name = name;\n  this.lines = lines;\n}\nActor.prototype.bow = function () {\n  return this.name + \" bows.\";\n};\nconst ada = new Actor(\"Ada\", 42);\nconst bo = new Actor(\"Bo\", 7);\nconsole.log(ada.bow(), bo.bow());\nconsole.log(ada.bow === bo.bow);\nconsole.log(Object.getPrototypeOf(ada) === Actor.prototype);\nconsole.log(ada);\n",
   "stdout": "Ada bows. Bo bows.\ntrue\ntrue\nActor { name: 'Ada', lines: 42 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node ctor.js",
     "out": "Ada bows. Bo bows.\ntrue\ntrue\nActor { name: 'Ada', lines: 42 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "dimmer.js": {
   "src": "class Dimmer {\n  #level = 50;\n  get level() {\n    return this.#level;\n  }\n  set level(value) {\n    if (value < 0 || value > 100) {\n      console.log(\"Ignored:\", value);\n      return;\n    }\n    this.#level = value;\n  }\n}\nconst d = new Dimmer();\nd.level = 80;\nconsole.log(d.level);\nd.level = 250;\nconsole.log(d.level);\nconsole.log(Object.keys(d), \"level\" in d);\n",
   "stdout": "80\nIgnored: 250\n80\n[] true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node dimmer.js",
     "out": "80\nIgnored: 250\n80\n[] true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "extend_native.js": {
   "src": "Array.prototype.last = function () {\n  return this[this.length - 1];\n};\nconst cues = [\"lights\", \"sound\", \"curtain\"];\nconsole.log(cues.last());\nfor (const i in cues) {\n  console.log(i, cues[i]);\n}\n",
   "stdout": "curtain\n0 lights\n1 sound\n2 curtain\nlast [Function (anonymous)]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node extend_native.js",
     "out": "curtain\n0 lights\n1 sound\n2 curtain\nlast [Function (anonymous)]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "extends.js": {
   "src": "class Actor {\n  constructor(name) {\n    this.name = name;\n  }\n  bow() {\n    return this.name + \" bows.\";\n  }\n}\nclass Star extends Actor {\n  constructor(name, room) {\n    super(name);\n    this.room = room;\n  }\n  bow() {\n    return super.bow() + \" The crowd cheers!\";\n  }\n}\nconst ada = new Star(\"Ada\", 1);\nconsole.log(ada.bow());\nconsole.log(ada);\nconsole.log(ada instanceof Star, ada instanceof Actor);\nconsole.log(Object.getPrototypeOf(Star.prototype) === Actor.prototype);\n",
   "stdout": "Ada bows. The crowd cheers!\nStar { name: 'Ada', room: 1 }\ntrue true\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node extends.js",
     "out": "Ada bows. The crowd cheers!\nStar { name: 'Ada', room: 1 }\ntrue true\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "extends_chain.js": {
   "src": "class Actor {\n  bow() { return \"bows\"; }\n  wave() { return \"waves\"; }\n}\nclass Star extends Actor {\n  bow() { return \"bows deeply\"; }\n}\nconst ada = new Star();\nconsole.log(ada.bow());\nconsole.log(ada.wave());\n",
   "stdout": "bows deeply\nwaves\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node extends_chain.js",
     "out": "bows deeply\nwaves\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "factory_copies.js": {
   "src": "function makeActor(name) {\n  return { name, bow() { return name + \" bows.\"; } };\n}\nconst ada = makeActor(\"Ada\");\nconst bo = makeActor(\"Bo\");\nconsole.log(ada.bow(), bo.bow());\nconsole.log(ada.bow === bo.bow);\n",
   "stdout": "Ada bows. Bo bows.\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node factory_copies.js",
     "out": "Ada bows. Bo bows.\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fake_new.js": {
   "src": "function Actor(name) {\n  this.name = name;\n}\nActor.prototype.bow = function () { return this.name + \" bows.\"; };\n\nfunction myNew(F, ...args) {\n  const obj = {};                            // 1. a new, empty object\n  Object.setPrototypeOf(obj, F.prototype);   // 2. link it to F.prototype\n  const result = F.apply(obj, args);         // 3. run F with this = obj\n  const gaveObject = typeof result === \"object\" && result !== null;\n  return gaveObject ? result : obj;          // 4. hand the object back\n}\nconst ada = myNew(Actor, \"Ada\");\nconsole.log(ada.bow());\nconsole.log(ada instanceof Actor);\nconsole.log(ada);\n",
   "stdout": "Ada bows.\ntrue\nActor { name: 'Ada' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fake_new.js",
     "out": "Ada bows.\ntrue\nActor { name: 'Ada' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fields.js": {
   "src": "class Ticket {\n  seat = \"unassigned\";\n  scans = [];\n  constructor(show) {\n    this.show = show;\n  }\n}\nconst a = new Ticket(\"Hamlet\");\nconst b = new Ticket(\"Hamlet\");\na.scans.push(\"door 1\");\nconsole.log(a);\nconsole.log(b.scans, a.scans === b.scans);\nconsole.log(Object.hasOwn(a, \"seat\"));\n",
   "stdout": "Ticket { seat: 'unassigned', scans: [ 'door 1' ], show: 'Hamlet' }\n[] false\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fields.js",
     "out": "Ticket { seat: 'unassigned', scans: [ 'door 1' ], show: 'Hamlet' }\n[] false\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_bank.js": {
   "src": "class BankAccount {\n  #balance = 0;\n  deposit(amount) {\n    this.#balance += amount;\n  }\n  withdraw(amount) {\n    if (amount > this.#balance) return \"Not enough money\";\n    this.#balance -= amount;\n    return \"OK\";\n  }\n  get balance() {\n    return this.#balance;\n  }\n}\nconst acct = new BankAccount();\nacct.deposit(30);\nconsole.log(acct.withdraw(50), acct.withdraw(10));\nconsole.log(acct.balance);\n",
   "stdout": "Not enough money OK\n20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_bank.js",
     "out": "Not enough money OK\n20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_hasown.js": {
   "src": "const seats = Object.create(null);\nseats.A1 = \"Ada\";\nseats.B2 = \"Bo\";\nfor (const seat of [\"A1\", \"C3\", \"B2\", \"toString\"]) {\n  console.log(seat, Object.hasOwn(seats, seat) ? seats[seat] : \"empty\");\n}\n",
   "stdout": "A1 Ada\nC3 empty\nB2 Bo\ntoString empty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_hasown.js",
     "out": "A1 Ada\nC3 empty\nB2 Bo\ntoString empty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_new.js": {
   "src": "function Lamp(color) {\n  this.color = color;\n}\nLamp.prototype.shine = function () { return this.color + \" light!\"; };\nfunction myNew(F, ...args) {\n  const obj = Object.create(F.prototype);\n  F.apply(obj, args);\n  return obj;\n}\nconst lamp = myNew(Lamp, \"amber\");\nconsole.log(lamp.shine());\nconsole.log(Object.getPrototypeOf(lamp) === Lamp.prototype);\n",
   "stdout": "amber light!\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_new.js",
     "out": "amber light!\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forin.js": {
   "src": "const defaults = { volume: 5, theme: \"dark\" };\nconst mine = Object.create(defaults);\nmine.theme = \"light\";\nfor (const key in mine) {\n  console.log(\"for...in:\", key, mine[key]);\n}\nconsole.log(\"keys:\", Object.keys(mine));\nfor (const key in mine) {\n  if (Object.hasOwn(mine, key)) console.log(\"own only:\", key);\n}\n",
   "stdout": "for...in: theme light\nfor...in: volume 5\nkeys: [ 'theme' ]\nown only: theme\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node forin.js",
     "out": "for...in: theme light\nfor...in: volume 5\nkeys: [ 'theme' ]\nown only: theme\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "getter_only.js": {
   "src": "class BankAccount {\n  #balance = 50;\n  get balance() {\n    return this.#balance;\n  }\n}\nconst acct = new BankAccount();\nconsole.log(acct.balance);\nacct.balance = 1000000;\n",
   "stdout": "50\n",
   "stderr": "file:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node getter_only.js",
     "out": "50\n",
     "err": "file:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "50\nfile:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "50\n",
    "stderr": "file:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node getter_only.js",
      "out": "50\n",
      "err": "file:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "50\nfile:///home/you/javascript-ch18/getter_only.js:9\nacct.balance = 1000000;\n             ^\n\nTypeError: Cannot set property balance of #<BankAccount> which has only a getter\n    at file:///home/you/javascript-ch18/getter_only.js:9:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "init_order.js": {
   "src": "function log(text) { console.log(text); return text; }\nclass Base {\n  baseField = log(\"2. Base field\");\n  constructor() {\n    log(\"3. Base constructor body\");\n  }\n}\nclass Derived extends Base {\n  derivedField = log(\"4. Derived field\");\n  constructor() {\n    log(\"1. Derived constructor starts\");\n    super();\n    log(\"5. Derived constructor ends\");\n  }\n}\nnew Derived();\n",
   "stdout": "1. Derived constructor starts\n2. Base field\n3. Base constructor body\n4. Derived field\n5. Derived constructor ends\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node init_order.js",
     "out": "1. Derived constructor starts\n2. Base field\n3. Base constructor body\n4. Derived field\n5. Derived constructor ends\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "instanceof.js": {
   "src": "function Actor(name) { this.name = name; }\nconst ada = new Actor(\"Ada\");\nconsole.log(ada instanceof Actor);\nconsole.log(ada instanceof Object);\nconsole.log([] instanceof Array, [] instanceof Object);\nconst fake = Object.create(Actor.prototype);\nconsole.log(fake instanceof Actor, fake.name);\nObject.setPrototypeOf(ada, null);\nconsole.log(ada instanceof Actor, ada instanceof Object);\n",
   "stdout": "true\ntrue\ntrue true\ntrue undefined\nfalse false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node instanceof.js",
     "out": "true\ntrue\ntrue true\ntrue undefined\nfalse false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_none.js": {
   "src": "const actor = { kind: \"actor\" };\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.wings);\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lookup_none.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_own.js": {
   "src": "const actor = { kind: \"actor\" };\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.name);\n",
   "stdout": "Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lookup_own.js",
     "out": "Ada\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_parent.js": {
   "src": "const actor = { kind: \"actor\" };\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.kind);\n",
   "stdout": "actor\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lookup_parent.js",
     "out": "actor\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_top.js": {
   "src": "const actor = { kind: \"actor\" };\nconst ada = Object.create(actor);\nada.name = \"Ada\";\nconsole.log(ada.toString());\n",
   "stdout": "[object Object]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lookup_top.js",
     "out": "[object Object]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lost_this.js": {
   "src": "class Clicker {\n  count = 0;\n  click() {\n    this.count += 1;\n  }\n}\nconst c = new Clicker();\nc.click();\nconsole.log(c.count);\n[\"a\", \"b\"].forEach(c.click);\nconsole.log(c.count);\n",
   "stdout": "1\n",
   "stderr": "file:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node lost_this.js",
     "out": "1\n",
     "err": "file:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "1\nfile:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "1\n",
    "stderr": "file:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node lost_this.js",
      "out": "1\n",
      "err": "file:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "1\nfile:///home/you/javascript-ch18/lost_this.js:4\n    this.count += 1;\n    ^\n\nTypeError: Cannot read properties of undefined (reading 'count')\n    at click (file:///home/you/javascript-ch18/lost_this.js:4:5)\n    at Array.forEach (<anonymous>)\n    at file:///home/you/javascript-ch18/lost_this.js:10:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "mixin.js": {
   "src": "const canGlow = {\n  glow() { return this.name + \" glows.\"; },\n};\nconst canSpin = {\n  spin() { return this.name + \" spins.\"; },\n};\nclass Prop {\n  constructor(name) { this.name = name; }\n}\nclass DiscoBall extends Prop {}\nObject.assign(DiscoBall.prototype, canGlow, canSpin);\nconst ball = new DiscoBall(\"Disco ball\");\nconsole.log(ball.glow(), ball.spin());\nconsole.log(Object.keys(DiscoBall.prototype));\nconsole.log(ball instanceof Prop);\n",
   "stdout": "Disco ball glows. Disco ball spins.\n[ 'glow', 'spin' ]\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node mixin.js",
     "out": "Disco ball glows. Disco ball spins.\n[ 'glow', 'spin' ]\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "mystery.js": {
   "src": "const prop = { item: \"lantern\" };\nconsole.log(prop.toString());\nconsole.log(Object.hasOwn(prop, \"toString\"));\nconsole.log(\"toString\" in prop);\nconsole.log(Object.keys(prop));\n",
   "stdout": "[object Object]\nfalse\ntrue\n[ 'item' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node mystery.js",
     "out": "[object Object]\nfalse\ntrue\n[ 'item' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "natives.js": {
   "src": "const cues = [\"lights\", \"sound\"];\nconsole.log(Object.getPrototypeOf(cues) === Array.prototype);\nconsole.log(Object.hasOwn(cues, \"map\"), Object.hasOwn(Array.prototype, \"map\"));\nconsole.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);\nconsole.log(cues.map((c) => c.toUpperCase()));\nconsole.log(cues.toString());\nconsole.log(Object.hasOwn(Array.prototype, \"toString\"));\n",
   "stdout": "true\nfalse true\ntrue\n[ 'LIGHTS', 'SOUND' ]\nlights,sound\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node natives.js",
     "out": "true\nfalse true\ntrue\n[ 'LIGHTS', 'SOUND' ]\nlights,sound\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "new_arrow.js": {
   "src": "const Spot = (color) => ({ color });\nconsole.log(Spot(\"red\"));\nconst s = new Spot(\"red\");\n",
   "stdout": "{ color: 'red' }\n",
   "stderr": "file:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node new_arrow.js",
     "out": "{ color: 'red' }\n",
     "err": "file:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "{ color: 'red' }\nfile:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "{ color: 'red' }\n",
    "stderr": "file:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node new_arrow.js",
      "out": "{ color: 'red' }\n",
      "err": "file:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "{ color: 'red' }\nfile:///home/you/javascript-ch18/new_arrow.js:3\nconst s = new Spot(\"red\");\n          ^\n\nTypeError: Spot is not a constructor\n    at file:///home/you/javascript-ch18/new_arrow.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "new_machine.js": {
   "src": "class Actor { constructor(name) { this.name = name; } }\nfunction Lamp(color) { this.color = color; }\nconsole.log(new Actor(\"Ada\"));\nconsole.log(new Lamp(\"red\"));\nconsole.log(new Date(0));\nconsole.log(new Map([[\"A1\", \"Ada\"]]));\n",
   "stdout": "Actor { name: 'Ada' }\nLamp { color: 'red' }\n1970-01-01T00:00:00.000Z\nMap(1) { 'A1' => 'Ada' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node new_machine.js",
     "out": "Actor { name: 'Ada' }\nLamp { color: 'red' }\n1970-01-01T00:00:00.000Z\nMap(1) { 'A1' => 'Ada' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "new_method.js": {
   "src": "const ada = { bow() { return \"bows\"; } };\nconsole.log(ada.bow());\nconst b = new ada.bow();\n",
   "stdout": "bows\n",
   "stderr": "file:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node new_method.js",
     "out": "bows\n",
     "err": "file:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "bows\nfile:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "bows\n",
    "stderr": "file:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node new_method.js",
      "out": "bows\n",
      "err": "file:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "bows\nfile:///home/you/javascript-ch18/new_method.js:3\nconst b = new ada.bow();\n          ^\n\nTypeError: ada.bow is not a constructor\n    at file:///home/you/javascript-ch18/new_method.js:3:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "new_steps.js": {
   "src": "function Actor(name) {\n  this.name = name;\n}\nActor.prototype.bow = function () {\n  return this.name + \" bows.\";\n};\nconst ada = new Actor(\"Ada\");\nconsole.log(ada.bow());\n",
   "stdout": "Ada bows.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node new_steps.js",
     "out": "Ada bows.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_ctor.js": {
   "src": "class Actor {\n  constructor(name) { this.name = name; }\n}\nclass Understudy extends Actor {\n  standBy() { return this.name + \" is ready.\"; }\n}\nconst bo = new Understudy(\"Bo\");\nconsole.log(bo.standBy());\n",
   "stdout": "Bo is ready.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node no_ctor.js",
     "out": "Bo is ready.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_new.cjs": {
   "src": "function Actor(name) {\n  this.name = name;\n}\nconst ada = Actor(\"Ada\");\nconsole.log(ada);\nconsole.log(globalThis.name);\n",
   "stdout": "undefined\nAda\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node no_new.cjs",
     "out": "undefined\nAda\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_new.js": {
   "src": "function Actor(name) {\n  this.name = name;\n}\nconst ada = Actor(\"Ada\");\nconsole.log(ada);\nconsole.log(globalThis.name);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/no_new.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at Actor (file:///home/you/javascript-ch18/no_new.js:2:13)\n    at file:///home/you/javascript-ch18/no_new.js:4:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node no_new.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/no_new.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at Actor (file:///home/you/javascript-ch18/no_new.js:2:13)\n    at file:///home/you/javascript-ch18/no_new.js:4:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/no_new.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at Actor (file:///home/you/javascript-ch18/no_new.js:2:13)\n    at file:///home/you/javascript-ch18/no_new.js:4:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node no_new.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/no_new.js:2\n  this.name = name;\n            ^\n\nTypeError: Cannot set properties of undefined (setting 'name')\n    at Actor (file:///home/you/javascript-ch18/no_new.js:2:13)\n    at file:///home/you/javascript-ch18/no_new.js:4:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "own_copy.js": {
   "src": "function Actor(name) {\n  this.name = name;\n  this.wave = function () { return this.name + \" waves.\"; };\n}\nActor.prototype.bow = function () { return this.name + \" bows.\"; };\nconst ada = new Actor(\"Ada\");\nconst bo = new Actor(\"Bo\");\nconsole.log(ada.wave === bo.wave, ada.bow === bo.bow);\nconsole.log(Object.keys(ada));\n",
   "stdout": "false true\n[ 'name', 'wave' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node own_copy.js",
     "out": "false true\n[ 'name', 'wave' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_class.js": {
   "src": "class Counter {\n  constructor() {\n    this.count = 0;\n  }\n  click() {\n    this.count += 1;\n    return this.count;\n  }\n}\nconst c = new Counter();\nc.click();\nconsole.log(c.click());\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_class.js",
     "out": "2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_class_alt.js": {
   "src": "class Counter {\n  click() {\n    this.count += 1;\n    return this.count;\n  }\n  constructor() {\n    this.count = 0;\n  }\n}\nconst c = new Counter();\nc.click();\nconsole.log(c.click());\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_class_alt.js",
     "out": "2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_ctor.js": {
   "src": "function Ticket(seat) {\n  this.seat = seat;\n}\nTicket.prototype.print = function () {\n  return \"Seat \" + this.seat;\n};\nconst t = new Ticket(\"B7\");\nconsole.log(t.print());\n",
   "stdout": "Seat B7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_ctor.js",
     "out": "Seat B7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_ctor_alt.js": {
   "src": "function Ticket(seat) {\n  this.seat = seat;\n}\nconst t = new Ticket(\"B7\");\nTicket.prototype.print = function () {\n  return \"Seat \" + this.seat;\n};\nconsole.log(t.print());\n",
   "stdout": "Seat B7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_ctor_alt.js",
     "out": "Seat B7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_class.js": {
   "src": "class Ticket {\n  constructor(seat) {\n    this.seat = seat;\n    this.used = false;\n  }\n  scan() {\n    if (this.used) return this.seat + \": already used!\";\n    this.used = true;\n    return this.seat + \": welcome\";\n  }\n}\nconst t = new Ticket(\"B7\");\nconsole.log(t.scan());\nconsole.log(t.scan());\nconsole.log(new Ticket(\"C1\").scan());\n",
   "stdout": "B7: welcome\nB7: already used!\nC1: welcome\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_class.js",
     "out": "B7: welcome\nB7: already used!\nC1: welcome\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_ctor.js": {
   "src": "function Lamp(color) {\n  this.color = color;\n  this.on = false;\n}\nLamp.prototype.toggle = function () {\n  this.on = !this.on;\n  return this.color + (this.on ? \" on\" : \" off\");\n};\nconst red = new Lamp(\"red\");\nconst blue = new Lamp(\"blue\");\nconsole.log(red.toggle());\nconsole.log(red.toggle(), blue.toggle());\nconsole.log(Object.keys(red));\n",
   "stdout": "red on\nred off blue on\n[ 'color', 'on' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_ctor.js",
     "out": "red on\nred off blue on\n[ 'color', 'on' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_inst.js": {
   "src": "const bare = Object.create(null);\nconst fakeList = Object.create(Array.prototype);\nconsole.log(bare instanceof Object);\nconsole.log(fakeList instanceof Array);\nconsole.log(fakeList instanceof Object);\n",
   "stdout": "false\ntrue\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_inst.js",
     "out": "false\ntrue\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_mixin.js": {
   "src": "const canBeep = {\n  beep() { return this.name + \": beep\"; },\n};\nclass Robot {\n  constructor(name) { this.name = name; }\n  beep() { return this.name + \": BOOP\"; }\n}\nObject.assign(Robot.prototype, canBeep);\nconst r = new Robot(\"R2\");\nconsole.log(r.beep());\nr.beep = () => \"own beep\";\nconsole.log(r.beep(), Robot.prototype.beep.call(r));\n",
   "stdout": "R2: beep\nown beep R2: beep\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_mixin.js",
     "out": "R2: beep\nown beep R2: beep\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_nonew.js": {
   "src": "function Lamp(color) {\n  this.color = color;\n}\nconst spot = new Lamp(\"red\");\nconsole.log(spot.color);\nconst flood = Lamp(\"blue\");\nconsole.log(flood.color);\n",
   "stdout": "red\n",
   "stderr": "file:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_nonew.js",
     "out": "red\n",
     "err": "file:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "red\nfile:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "red\n",
    "stderr": "file:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_nonew.js",
      "out": "red\n",
      "err": "file:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "red\nfile:///home/you/javascript-ch18/predict_nonew.js:2\n  this.color = color;\n             ^\n\nTypeError: Cannot set properties of undefined (setting 'color')\n    at Lamp (file:///home/you/javascript-ch18/predict_nonew.js:2:14)\n    at file:///home/you/javascript-ch18/predict_nonew.js:6:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "predict_order.js": {
   "src": "class Light {\n  color = \"white\";\n  constructor() {\n    console.log(\"Light sees:\", this.color);\n  }\n}\nclass Spot extends Light {\n  color = \"red\";\n  constructor() {\n    super();\n    console.log(\"Spot sees:\", this.color);\n  }\n}\nnew Spot();\n",
   "stdout": "Light sees: white\nSpot sees: red\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_order.js",
     "out": "Light sees: white\nSpot sees: red\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_own.js": {
   "src": "const crew = { team: \"lights\", shout() { return \"Ready!\"; } };\nconst kit = Object.create(crew);\nkit.name = \"Kit\";\nconsole.log(kit.team, kit.shout());\nconsole.log(Object.hasOwn(kit, \"team\"), Object.hasOwn(kit, \"name\"));\nconsole.log(Object.keys(kit));\n",
   "stdout": "lights Ready!\nfalse true\n[ 'name' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_own.js",
     "out": "lights Ready!\nfalse true\n[ 'name' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "private_foreign.js": {
   "src": "class BankAccount {\n  #balance = 0;\n  static balanceOf(account) {\n    return account.#balance;\n  }\n  static isAccount(thing) {\n    return #balance in thing;\n  }\n}\nconst real = new BankAccount();\nconst fake = { \"#balance\": 1000000 };\nconsole.log(BankAccount.isAccount(real), BankAccount.isAccount(fake));\nconsole.log(BankAccount.balanceOf(real));\nconsole.log(BankAccount.balanceOf(fake));\n",
   "stdout": "true false\n0\n",
   "stderr": "file:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node private_foreign.js",
     "out": "true false\n0\n",
     "err": "file:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "true false\n0\nfile:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "true false\n0\n",
    "stderr": "file:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node private_foreign.js",
      "out": "true false\n0\n",
      "err": "file:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "true false\n0\nfile:///home/you/javascript-ch18/private_foreign.js:4\n    return account.#balance;\n                   ^\n\nTypeError: Cannot read private member #balance from an object whose class did not declare it\n    at BankAccount.balanceOf (file:///home/you/javascript-ch18/private_foreign.js:4:20)\n    at file:///home/you/javascript-ch18/private_foreign.js:14:25\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "private_method.js": {
   "src": "class Ticket {\n  #code;\n  constructor(seat) {\n    this.seat = seat;\n    this.#code = this.#makeCode();\n  }\n  #makeCode() {\n    return \"TKT-\" + this.seat.toUpperCase();\n  }\n  matches(text) {\n    return text === this.#code;\n  }\n}\nconst t = new Ticket(\"b7\");\nconsole.log(t.matches(\"TKT-B7\"), t.matches(\"TKT-A1\"));\nconsole.log(typeof t.makeCode, typeof t[\"#makeCode\"]);\nconsole.log(t);\n",
   "stdout": "true false\nundefined undefined\nTicket { seat: 'b7' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node private_method.js",
     "out": "true false\nundefined undefined\nTicket { seat: 'b7' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "private_outside.js": {
   "src": "class BankAccount {\n  #balance = 0;\n  deposit(amount) {\n    this.#balance += amount;\n  }\n}\nconst acct = new BankAccount();\nconsole.log(\"Opening the account...\");\nacct.deposit(50);\nconsole.log(acct.#balance);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/private_outside.js:10\nconsole.log(acct.#balance);\n                ^\n\nSyntaxError: Private field '#balance' must be declared in an enclosing class\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node private_outside.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/private_outside.js:10\nconsole.log(acct.#balance);\n                ^\n\nSyntaxError: Private field '#balance' must be declared in an enclosing class\n    at compileSourceTextModule (node:internal/modules/esm/utils:355:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:94:18)\n    at #translate (node:internal/modules/esm/loader:441:20)\n    at afterLoad (node:internal/modules/esm/loader:509:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:12)\n    at #getOrCreateModuleJobAfterResolve (node:internal/modules/esm/loader:567:36)\n    at afterResolve (node:internal/modules/esm/loader:614:52)\n    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:620:12)\n    at node:internal/modules/esm/loader:639:32\n    at TracingChannel.tracePromise (node:diagnostics_channel:582:22)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/private_outside.js:10\nconsole.log(acct.#balance);\n                ^\n\nSyntaxError: Private field '#balance' must be declared in an enclosing class\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node private_outside.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/private_outside.js:10\nconsole.log(acct.#balance);\n                ^\n\nSyntaxError: Private field '#balance' must be declared in an enclosing class\n    at compileSourceTextModule (node:internal/modules/esm/utils:346:16)\n    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:110:18)\n    at #translate (node:internal/modules/esm/loader:559:20)\n    at afterLoad (node:internal/modules/esm/loader:612:29)\n    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:617:12)\n    at #createModuleJob (node:internal/modules/esm/loader:640:36)\n    at #getJobFromResolveResult (node:internal/modules/esm/loader:353:34)\n    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:321:41)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:680:25)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "proto_tools.js": {
   "src": "const actor = { kind: \"actor\" };\nconst crew = { kind: \"crew\" };\nconst kit = Object.create(actor);\nconsole.log(Object.getPrototypeOf(kit) === actor, kit.kind);\nObject.setPrototypeOf(kit, crew);\nconsole.log(Object.getPrototypeOf(kit) === crew, kit.kind);\nconsole.log(kit.__proto__ === crew);\nconst bo = { __proto__: actor, name: \"Bo\" };\nconsole.log(bo.kind, Object.getPrototypeOf(bo) === actor);\nconsole.log(Object.getPrototypeOf(Object.prototype));\n",
   "stdout": "true actor\ntrue crew\ntrue\nactor true\nnull\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node proto_tools.js",
     "out": "true actor\ntrue crew\ntrue\nactor true\nnull\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "seat_crash.js": {
   "src": "class SeatError extends Error {\n  constructor(seat) {\n    super(\"No such seat: \" + seat);\n    this.name = \"SeatError\";\n    this.seat = seat;\n  }\n}\nthrow new SeatError(\"Z9\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/seat_crash.js:8\nthrow new SeatError(\"Z9\");\n      ^\n\nSeatError: No such seat: Z9\n    at file:///home/you/javascript-ch18/seat_crash.js:8:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  seat: 'Z9'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node seat_crash.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/seat_crash.js:8\nthrow new SeatError(\"Z9\");\n      ^\n\nSeatError: No such seat: Z9\n    at file:///home/you/javascript-ch18/seat_crash.js:8:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5) {\n  seat: 'Z9'\n}\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/seat_crash.js:8\nthrow new SeatError(\"Z9\");\n      ^\n\nSeatError: No such seat: Z9\n    at file:///home/you/javascript-ch18/seat_crash.js:8:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  seat: 'Z9'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node seat_crash.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/seat_crash.js:8\nthrow new SeatError(\"Z9\");\n      ^\n\nSeatError: No such seat: Z9\n    at file:///home/you/javascript-ch18/seat_crash.js:8:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {\n  seat: 'Z9'\n}\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "shadow.js": {
   "src": "const actor = { kind: \"actor\", lines: 10 };\nconst ada = Object.create(actor);\nada.kind = \"star\";\nconsole.log(ada.kind, actor.kind);\nada.lines += 5;\nconsole.log(ada.lines, actor.lines);\ndelete ada.kind;\nconsole.log(ada.kind);\nconsole.log(Object.keys(ada));\n",
   "stdout": "star actor\n15 10\nactor\n[ 'lines' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node shadow.js",
     "out": "star actor\n15 10\nactor\n[ 'lines' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_copied.js": {
   "src": "function Actor(name) {\n  this.name = name;\n  this.bow = function () { return this.name + \" bows.\"; };\n}\nconst ada = new Actor(\"Ada\");\nActor.prototype.bow = function () { return this.name + \" bows deeply.\"; };\nconsole.log(ada.bow());\n",
   "stdout": "Ada bows.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_copied.js",
     "out": "Ada bows.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_static.js": {
   "src": "class Ticket {\n  constructor(seat) { this.seat = seat; }\n  static fromCode(text) { return new Ticket(text.split(\":\")[1]); }\n}\nconst first = new Ticket(\"A1\");\nconst second = first.fromCode(\"seat:B7\");\nconsole.log(second.seat);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/spot_static.js:6\nconst second = first.fromCode(\"seat:B7\");\n                     ^\n\nTypeError: first.fromCode is not a function\n    at file:///home/you/javascript-ch18/spot_static.js:6:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_static.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/spot_static.js:6\nconst second = first.fromCode(\"seat:B7\");\n                     ^\n\nTypeError: first.fromCode is not a function\n    at file:///home/you/javascript-ch18/spot_static.js:6:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/spot_static.js:6\nconst second = first.fromCode(\"seat:B7\");\n                     ^\n\nTypeError: first.fromCode is not a function\n    at file:///home/you/javascript-ch18/spot_static.js:6:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_static.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/spot_static.js:6\nconst second = first.fromCode(\"seat:B7\");\n                     ^\n\nTypeError: first.fromCode is not a function\n    at file:///home/you/javascript-ch18/spot_static.js:6:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_super.js": {
   "src": "class Prop {\n  constructor(name) {\n    this.name = name;\n  }\n}\nclass Lamp extends Prop {\n  constructor(name, watts) {\n    this.watts = watts;\n  }\n}\nconst lamp = new Lamp(\"spot\", 500);\nconsole.log(lamp.name, lamp.watts);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/spot_super.js:8\n    this.watts = watts;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Lamp (file:///home/you/javascript-ch18/spot_super.js:8:5)\n    at file:///home/you/javascript-ch18/spot_super.js:11:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_super.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/spot_super.js:8\n    this.watts = watts;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Lamp (file:///home/you/javascript-ch18/spot_super.js:8:5)\n    at file:///home/you/javascript-ch18/spot_super.js:11:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/spot_super.js:8\n    this.watts = watts;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Lamp (file:///home/you/javascript-ch18/spot_super.js:8:5)\n    at file:///home/you/javascript-ch18/spot_super.js:11:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_super.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/spot_super.js:8\n    this.watts = watts;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Lamp (file:///home/you/javascript-ch18/spot_super.js:8:5)\n    at file:///home/you/javascript-ch18/spot_super.js:11:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_wallet.js": {
   "src": "class Wallet {\n  #cash = 0;\n  add(n) {\n    this.#cash += n;\n  }\n  get total() {\n    return this.cash;\n  }\n}\nconst w = new Wallet();\nw.add(5);\nconsole.log(w.total);\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_wallet.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "statics.js": {
   "src": "class Ticket {\n  static count = 0;\n  static rows;\n  static {\n    Ticket.rows = [];\n    for (let i = 0; i < 3; i++) Ticket.rows.push(String.fromCharCode(65 + i));\n  }\n  constructor(seat) {\n    Ticket.count += 1;\n    this.seat = seat;\n  }\n  static fromCode(text) {\n    return new Ticket(text.split(\":\")[1]);\n  }\n}\nnew Ticket(\"A1\");\nconst t = Ticket.fromCode(\"seat:B7\");\nconsole.log(t, Ticket.count);\nconsole.log(Ticket.rows);\nconsole.log(Object.hasOwn(Ticket, \"fromCode\"), \"fromCode\" in t);\n",
   "stdout": "Ticket { seat: 'B7' } 2\n[ 'A', 'B', 'C' ]\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node statics.js",
     "out": "Ticket { seat: 'B7' } 2\n[ 'A', 'B', 'C' ]\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sugar_class.js": {
   "src": "class Lamp {\n  constructor(color) {\n    this.color = color;\n  }\n  shine() {\n    return this.color + \" light!\";\n  }\n}\nconsole.log(new Lamp(\"red\").shine());\n",
   "stdout": "red light!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sugar_class.js",
     "out": "red light!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sugar_func.js": {
   "src": "function Lamp(color) {\n  this.color = color;\n}\nLamp.prototype.shine = function () {\n  return this.color + \" light!\";\n};\nconsole.log(new Lamp(\"red\").shine());\n",
   "stdout": "red light!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sugar_func.js",
     "out": "red light!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "super_missing.js": {
   "src": "class Actor {\n  constructor(name) { this.name = name; }\n}\nclass Star extends Actor {\n  constructor(name, room) {\n    this.room = room;\n    super(name);\n  }\n}\nconst ada = new Star(\"Ada\", 1);\nconsole.log(ada);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch18/super_missing.js:6\n    this.room = room;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Star (file:///home/you/javascript-ch18/super_missing.js:6:5)\n    at file:///home/you/javascript-ch18/super_missing.js:10:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node super_missing.js",
     "out": "",
     "err": "file:///home/you/javascript-ch18/super_missing.js:6\n    this.room = room;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Star (file:///home/you/javascript-ch18/super_missing.js:6:5)\n    at file:///home/you/javascript-ch18/super_missing.js:10:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch18/super_missing.js:6\n    this.room = room;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Star (file:///home/you/javascript-ch18/super_missing.js:6:5)\n    at file:///home/you/javascript-ch18/super_missing.js:10:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node super_missing.js",
      "out": "",
      "err": "file:///home/you/javascript-ch18/super_missing.js:6\n    this.room = room;\n    ^\n\nReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor\n    at new Star (file:///home/you/javascript-ch18/super_missing.js:6:5)\n    at file:///home/you/javascript-ch18/super_missing.js:10:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "three_fixes.js": {
   "src": "class Clicker {\n  count = 0;\n  click() { this.count += 1; }\n  tap = () => { this.count += 1; };\n}\nconst c = new Clicker();\n[\"a\", \"b\"].forEach(() => c.click());\n[\"a\", \"b\"].forEach(c.click.bind(c));\n[\"a\", \"b\"].forEach(c.tap);\nconsole.log(c.count);\nconsole.log(Object.hasOwn(c, \"tap\"), Object.hasOwn(c, \"click\"));\n",
   "stdout": "6\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node three_fixes.js",
     "out": "6\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_dimmer.js": {
   "src": "class Dimmer {\n  #level = 50;\n  get level() { return this.#level; }\n  set level(v) { this.#level = Math.min(100, Math.max(0, v)); }\n}\nconst d = new Dimmer();\nfor (const v of [70, 120, -5, 30]) {\n  d.level = v;\n  console.log(v, d.level);\n}\n",
   "stdout": "70 70\n120 100\n-5 0\n30 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_dimmer.js",
     "out": "70 70\n120 100\n-5 0\n30 30\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_override.js": {
   "src": "class Prop {\n  price() { return 10; }\n}\nclass Lamp extends Prop {\n  price() { return super.price() + 5; }\n}\nclass Spotlight extends Lamp {\n  price() { return super.price() * 2; }\n}\nfor (const p of [new Prop(), new Lamp(), new Spotlight()]) {\n  console.log(p.constructor.name, p.price());\n}\n",
   "stdout": "Prop 10\nLamp 15\nSpotlight 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_override.js",
     "out": "Prop 10\nLamp 15\nSpotlight 30\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_shadow.js": {
   "src": "const parent = { n: 1 };\nconst kid = Object.create(parent);\nconsole.log(1, kid.n, parent.n);\nparent.n = 2;\nconsole.log(2, kid.n, parent.n);\nkid.n = 5;\nconsole.log(3, kid.n, parent.n);\nparent.n = 3;\nconsole.log(4, kid.n, parent.n);\ndelete kid.n;\nconsole.log(5, kid.n, parent.n);\n",
   "stdout": "1 1 1\n2 2 2\n3 5 2\n4 5 3\n5 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_shadow.js",
     "out": "1 1 1\n2 2 2\n3 5 2\n4 5 3\n5 3 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "word_count.js": {
   "src": "const words = [\"cue\", \"constructor\", \"cue\"];\nconst plain = {};\nconst bare = Object.create(null);\nfor (const w of words) {\n  plain[w] = (plain[w] || 0) + 1;\n  bare[w] = (bare[w] || 0) + 1;\n}\nconsole.log(plain.cue, bare.cue);\nconsole.log(plain.constructor);\nconsole.log(bare.constructor);\nconsole.log(bare);\n",
   "stdout": "2 2\nfunction Object() { [native code] }1\n1\n[Object: null prototype] { cue: 2, constructor: 1 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node word_count.js",
     "out": "2 2\nfunction Object() { [native code] }1\n1\n[Object: null prototype] { cue: 2, constructor: 1 }\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
