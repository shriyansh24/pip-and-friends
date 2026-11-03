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
  "workdir": "/home/you/javascript-ch19",
  "versionDifferences": [
   "accessor_only.js",
   "deep.js",
   "fresh_key.js",
   "fz_add.js",
   "fz_delete.js",
   "fz_push.cjs",
   "fz_strict.js",
   "hidden_ink.js",
   "lab_deep.js",
   "locked.js",
   "machine_bad.js",
   "no_primitive.js",
   "nonobject.js",
   "readonly.js",
   "symbol_math.js",
   "symbol_plus.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): accessor_only.js, deep.js, fresh_key.js, fz_add.js, fz_delete.js, fz_push.cjs, fz_strict.js, hidden_ink.js, lab_deep.js, locked.js, machine_bad.js, no_primitive.js, nonobject.js, readonly.js, symbol_math.js, symbol_plus.js."
 },
 "programs": {
  "accessor.js": {
   "src": "const ticket = {\n  cents: 1250,\n  get price() { return \"$\" + (this.cents / 100).toFixed(2); },\n  set price(text) { this.cents = Math.round(text.slice(1) * 100); },\n};\n\nconsole.log(ticket.price);\nticket.price = \"$9.99\";\nconsole.log(ticket.cents, ticket.price);\nconsole.log(Object.getOwnPropertyDescriptor(ticket, \"price\"));\n",
   "stdout": "$12.50\n999 $9.99\n{\n  get: [Function: get price],\n  set: [Function: set price],\n  enumerable: true,\n  configurable: true\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node accessor.js",
     "out": "$12.50\n999 $9.99\n{\n  get: [Function: get price],\n  set: [Function: set price],\n  enumerable: true,\n  configurable: true\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "accessor_only.js": {
   "src": "const poster = {\n  first: \"Ada\", last: \"Byron\",\n  get credit() { return this.first + \" \" + this.last; },\n};\n\nconsole.log(poster.credit);\nposter.credit = \"Bo Diddley\";\n",
   "stdout": "Ada Byron\n",
   "stderr": "file:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node accessor_only.js",
     "out": "Ada Byron\n",
     "err": "file:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Ada Byron\nfile:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Ada Byron\n",
    "stderr": "file:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node accessor_only.js",
      "out": "Ada Byron\n",
      "err": "file:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Ada Byron\nfile:///home/you/javascript-ch19/accessor_only.js:7\nposter.credit = \"Bo Diddley\";\n              ^\n\nTypeError: Cannot set property credit of #<Object> which has only a getter\n    at file:///home/you/javascript-ch19/accessor_only.js:7:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "assign.js": {
   "src": "const defaults = { lights: \"on\", volume: 5, crew: { size: 4 } };\nconst options = { volume: 9 };\n\nconst settings = Object.assign({}, defaults, options);\nconsole.log(settings);\nsettings.crew.size = 6;\nconsole.log(\"defaults crew:\", defaults.crew.size);\n\nconst target = { title: \"Hamlet\" };\nconst same = Object.assign(target, { seats: 120 });\nconsole.log(same === target, target);\nconsole.log({ ...defaults, volume: 1 });\n",
   "stdout": "{ lights: 'on', volume: 9, crew: { size: 4 } }\ndefaults crew: 6\ntrue { title: 'Hamlet', seats: 120 }\n{ lights: 'on', volume: 1, crew: { size: 6 } }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node assign.js",
     "out": "{ lights: 'on', volume: 9, crew: { size: 4 } }\ndefaults crew: 6\ntrue { title: 'Hamlet', seats: 120 }\n{ lights: 'on', volume: 1, crew: { size: 6 } }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "block_plus.js": {
   "src": "console.log(eval(\"({}) + []\"));\nconsole.log(eval(\"{} + []\"));\n",
   "stdout": "[object Object]\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node block_plus.js",
     "out": "[object Object]\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "class Money {\n  constructor(cents) { this.cents = cents; }\n  [Symbol.toPrimitive](hint) {\n    const dollars = this.cents / 100;\n    return hint === \"number\" ? dollars : `$${dollars.toFixed(2)}`;\n  }\n  get [Symbol.toStringTag]() { return \"Money\"; }\n}\n\nconst ticket = new Money(1250);\nconsole.log(`Ticket: ${ticket}`);\nconsole.log(ticket * 2);\nconsole.log(Object.prototype.toString.call(ticket));\n",
   "stdout": "Ticket: $12.50\n25\n[object Money]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "Ticket: $12.50\n25\n[object Money]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "const sales = [[\"Fri\", 30], [\"Sat\", 45], [\"Fri\", 12]];\nconst byNight = Object.groupBy(sales, ([night]) => night);\nconst totals = Object.entries(byNight).map(([night, rows]) => [\n  night,\n  rows.reduce((sum, [, n]) => sum + n, 0),\n]);\nconsole.log(Object.fromEntries(totals));\n",
   "stdout": "{ Fri: 42, Sat: 45 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "{ Fri: 42, Sat: 45 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const key = Symbol(\"key\");\nconst box = { label: \"props\", [key]: \"crown\", items: [\"mask\"] };\nObject.freeze(box);\nbox.items.push(\"cape\");\nconst copy = { ...box, label: \"spare\" };\ncopy.items = [...copy.items, \"wig\"];\nconsole.log(Object.keys(copy).length, copy[key]);\nconsole.log(box.items.length, copy.items.length);\nconsole.log(Object.isFrozen(copy), JSON.stringify(box));\n",
   "stdout": "2 crown\n2 3\nfalse {\"label\":\"props\",\"items\":[\"mask\",\"cape\"]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "2 crown\n2 3\nfalse {\"label\":\"props\",\"items\":[\"mask\",\"cape\"]}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "function deepFreeze(obj) {\n  Object.freeze(obj);\n  for (const value of Object.values(obj)) {\n    if (typeof value === \"object\" && value !== null) Object.freeze(value);\n  }\n  return obj;\n}\n\nconst set = deepFreeze({ stage: { lights: { color: \"blue\" } } });\nset.stage.lights.color = \"red\";\nconsole.log(set.stage.lights.color);\n",
   "stdout": "red\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "red\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "const prop = { name: \"crown\" };\nconst steps = [\n  () => Object.defineProperty(prop, \"id\", { value: 1 }),\n  () => { prop.color = \"gold\"; },\n  () => Object.defineProperty(prop, \"color\", { enumerable: false }),\n  () => { prop[Symbol(\"note\")] = \"ink\"; },\n  () => { delete prop.name; },\n];\nsteps.forEach((step, i) => {\n  step();\n  const listed = Object.keys(prop).length;\n  console.log(i + 1, listed, Reflect.ownKeys(prop).length);\n});\n",
   "stdout": "1 1 2\n2 2 3\n3 1 3\n4 1 4\n5 0 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 1 2\n2 2 3\n3 1 3\n4 1 4\n5 0 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "builtins_flags.js": {
   "src": "console.log(Object.getOwnPropertyDescriptor(Math, \"PI\"));\nconsole.log(Object.getOwnPropertyDescriptor([10, 20], \"length\"));\nconst proto = Object.prototype;\nconst toStr = Object.getOwnPropertyDescriptor(proto, \"toString\");\nconsole.log(\"toString enumerable?\", toStr.enumerable);\n",
   "stdout": "{\n  value: 3.141592653589793,\n  writable: false,\n  enumerable: false,\n  configurable: false\n}\n{ value: 2, writable: true, enumerable: false, configurable: false }\ntoString enumerable? false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node builtins_flags.js",
     "out": "{\n  value: 3.141592653589793,\n  writable: false,\n  enumerable: false,\n  configurable: false\n}\n{ value: 2, writable: true, enumerable: false, configurable: false }\ntoString enumerable? false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "const_freeze.js": {
   "src": "const a = { seats: 120 };\na.seats = 99;\nconsole.log(\"const, drawer changed:\", a.seats);\n\nlet b = Object.freeze({ seats: 120 });\nb = { seats: 99 };\nconsole.log(\"frozen, tag moved:\", b.seats);\n",
   "stdout": "const, drawer changed: 99\nfrozen, tag moved: 99\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node const_freeze.js",
     "out": "const, drawer changed: 99\nfrozen, tag moved: 99\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "date_hint.js": {
   "src": "const opening = new Date(Date.UTC(2026, 10, 8, 19, 30));\n\nconsole.log(opening - 0);\nconsole.log(opening + 0);\nconsole.log(`${opening}`);\n",
   "stdout": "1794166200000\nSun Nov 08 2026 19:30:00 GMT+0000 (Coordinated Universal Time)0\nSun Nov 08 2026 19:30:00 GMT+0000 (Coordinated Universal Time)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node date_hint.js",
     "out": "1794166200000\nSun Nov 08 2026 19:30:00 GMT+0000 (Coordinated Universal Time)0\nSun Nov 08 2026 19:30:00 GMT+0000 (Coordinated Universal Time)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "deep.js": {
   "src": "function deepFreeze(obj) {\n  for (const value of Object.values(obj)) {\n    if (typeof value === \"object\" && value !== null) deepFreeze(value);\n  }\n  return Object.freeze(obj);\n}\n\nconst show = deepFreeze({\n  title: \"Hamlet\", cast: [\"Ada\"], lights: { color: \"blue\" },\n});\nconsole.log(Object.isFrozen(show.cast), Object.isFrozen(show.lights));\nshow.lights.color = \"red\";\n",
   "stdout": "true true\n",
   "stderr": "file:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node deep.js",
     "out": "true true\n",
     "err": "file:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "true true\nfile:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "true true\n",
    "stderr": "file:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node deep.js",
      "out": "true true\n",
      "err": "file:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "true true\nfile:///home/you/javascript-ch19/deep.js:12\nshow.lights.color = \"red\";\n                  ^\n\nTypeError: Cannot assign to read only property 'color' of object '#<Object>'\n    at file:///home/you/javascript-ch19/deep.js:12:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "define.js": {
   "src": "const show = { title: \"Hamlet\" };\nObject.defineProperty(show, \"id\", { value: 7 });\n\nconsole.log(show.id);\nconsole.log(Object.getOwnPropertyDescriptor(show, \"id\"));\nconsole.log(Object.keys(show));\nconsole.log(JSON.stringify(show));\nconsole.log(show);\n",
   "stdout": "7\n{ value: 7, writable: false, enumerable: false, configurable: false }\n[ 'title' ]\n{\"title\":\"Hamlet\"}\n{ title: 'Hamlet' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node define.js",
     "out": "7\n{ value: 7, writable: false, enumerable: false, configurable: false }\n[ 'title' ]\n{\"title\":\"Hamlet\"}\n{ title: 'Hamlet' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "entries.js": {
   "src": "const prices = { adult: 12, child: 6, senior: 8 };\n\nconsole.log(Object.keys(prices));\nconsole.log(Object.values(prices));\nconsole.log(Object.entries(prices));\n\nconst sale = Object.fromEntries(\n  Object.entries(prices).map(([kind, price]) => [kind, price / 2]),\n);\nconsole.log(sale);\n",
   "stdout": "[ 'adult', 'child', 'senior' ]\n[ 12, 6, 8 ]\n[ [ 'adult', 12 ], [ 'child', 6 ], [ 'senior', 8 ] ]\n{ adult: 6, child: 3, senior: 4 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node entries.js",
     "out": "[ 'adult', 'child', 'senior' ]\n[ 12, 6, 8 ]\n[ [ 'adult', 12 ], [ 'child', 6 ], [ 'senior', 8 ] ]\n{ adult: 6, child: 3, senior: 4 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_accessor.js": {
   "src": "const volume = {\n  level: 3,\n  get loud() { return this.level > 7; },\n  set loud(on) { this.level = on ? 10 : 3; },\n};\n\nconsole.log(volume.loud);\nvolume.loud = true;\nconsole.log(volume.level, volume.loud);\n",
   "stdout": "false\n10 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_accessor.js",
     "out": "false\n10 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_groupby.js": {
   "src": "const tickets = [\n  { seat: \"A1\", night: \"Fri\" },\n  { seat: \"B4\", night: \"Sat\" },\n  { seat: \"C2\", night: \"Fri\" },\n];\n\nconst byNight = Object.groupBy(tickets, (t) => t.night);\nfor (const [night, list] of Object.entries(byNight)) {\n  console.log(night, list.map((t) => t.seat).join(\",\"));\n}\n",
   "stdout": "Fri A1,C2\nSat B4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_groupby.js",
     "out": "Fri A1,C2\nSat B4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_temp.js": {
   "src": "class Temperature {\n  constructor(celsius) { this.celsius = celsius; }\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"string\") return `${this.celsius}°C`;\n    return this.celsius;\n  }\n}\n\nconst low = new Temperature(18);\nconst high = new Temperature(24);\nconsole.log(`Low ${low}, high ${high}`);\nconsole.log(\"Spread:\", high - low);\n",
   "stdout": "Low 18°C, high 24°C\nSpread: 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_temp.js",
     "out": "Low 18°C, high 24°C\nSpread: 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fresh_key.js": {
   "src": "const crew = { name: \"Kit\" };\ncrew[Symbol(\"badge\")] = \"STAGE-1\";\nconsole.log(crew[Symbol(\"badge\")]);\n\nconst badge = Symbol(\"badge\");\ncrew[badge] = \"STAGE-2\";\nconsole.log(crew[badge]);\nconsole.log(crew);\n",
   "stdout": "undefined\nSTAGE-2\n{ name: 'Kit', Symbol(badge): 'STAGE-1', Symbol(badge): 'STAGE-2' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fresh_key.js",
     "out": "undefined\nSTAGE-2\n{ name: 'Kit', Symbol(badge): 'STAGE-1', Symbol(badge): 'STAGE-2' }\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "undefined\nSTAGE-2\n{ name: 'Kit', [Symbol(badge)]: 'STAGE-1', [Symbol(badge)]: 'STAGE-2' }\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "node fresh_key.js",
      "out": "undefined\nSTAGE-2\n{ name: 'Kit', [Symbol(badge)]: 'STAGE-1', [Symbol(badge)]: 'STAGE-2' }\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "fz_add.js": {
   "src": "const show = Object.freeze({ title: \"Hamlet\", seats: 120 });\nshow.director = \"Kit\";\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/fz_add.js:2\nshow.director = \"Kit\";\n              ^\n\nTypeError: Cannot add property director, object is not extensible\n    at file:///home/you/javascript-ch19/fz_add.js:2:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node fz_add.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/fz_add.js:2\nshow.director = \"Kit\";\n              ^\n\nTypeError: Cannot add property director, object is not extensible\n    at file:///home/you/javascript-ch19/fz_add.js:2:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/fz_add.js:2\nshow.director = \"Kit\";\n              ^\n\nTypeError: Cannot add property director, object is not extensible\n    at file:///home/you/javascript-ch19/fz_add.js:2:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node fz_add.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/fz_add.js:2\nshow.director = \"Kit\";\n              ^\n\nTypeError: Cannot add property director, object is not extensible\n    at file:///home/you/javascript-ch19/fz_add.js:2:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "fz_delete.js": {
   "src": "const show = Object.freeze({ title: \"Hamlet\", seats: 120 });\ndelete show.title;\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/fz_delete.js:2\ndelete show.title;\n^\n\nTypeError: Cannot delete property 'title' of #<Object>\n    at file:///home/you/javascript-ch19/fz_delete.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node fz_delete.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/fz_delete.js:2\ndelete show.title;\n^\n\nTypeError: Cannot delete property 'title' of #<Object>\n    at file:///home/you/javascript-ch19/fz_delete.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/fz_delete.js:2\ndelete show.title;\n^\n\nTypeError: Cannot delete property 'title' of #<Object>\n    at file:///home/you/javascript-ch19/fz_delete.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node fz_delete.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/fz_delete.js:2\ndelete show.title;\n^\n\nTypeError: Cannot delete property 'title' of #<Object>\n    at file:///home/you/javascript-ch19/fz_delete.js:2:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "fz_nested.js": {
   "src": "const show = Object.freeze({ title: \"Hamlet\", cast: [\"Ada\"] });\nshow.cast.push(\"Bo\");\nconsole.log(\"cast is now\", show.cast.join(\" and \"));\n",
   "stdout": "cast is now Ada and Bo\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fz_nested.js",
     "out": "cast is now Ada and Bo\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fz_push.cjs": {
   "src": "const cast = Object.freeze([\"Ada\", \"Bo\"]);\ncast[0] = \"Cy\";\nconsole.log(\"cast[0] is still\", cast[0]);\ncast.push(\"Cy\");\n",
   "stdout": "cast[0] is still Ada\n",
   "stderr": "/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node fz_push.cjs",
     "out": "cast[0] is still Ada\n",
     "err": "/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "cast[0] is still Ada\n/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1968:14)\n    at Object..js (node:internal/modules/cjs/loader:2108:10)\n    at Module.load (node:internal/modules/cjs/loader:1690:32)\n    at Module._load (node:internal/modules/cjs/loader:1480:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)\n    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:33:47\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "cast[0] is still Ada\n",
    "stderr": "/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node fz_push.cjs",
      "out": "cast[0] is still Ada\n",
      "err": "/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "cast[0] is still Ada\n/home/you/javascript-ch19/fz_push.cjs:4\ncast.push(\"Cy\");\n     ^\n\nTypeError: Cannot add property 2, object is not extensible\n    at Array.push (<anonymous>)\n    at Object.<anonymous> (/home/you/javascript-ch19/fz_push.cjs:4:6)\n    at Module._compile (node:internal/modules/cjs/loader:1781:14)\n    at Object..js (node:internal/modules/cjs/loader:1913:10)\n    at Module.load (node:internal/modules/cjs/loader:1505:32)\n    at Function._load (node:internal/modules/cjs/loader:1309:12)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)\n    at node:internal/main/run_main_module:36:49\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "fz_sloppy.cjs": {
   "src": "const show = Object.freeze({ title: \"Hamlet\", seats: 120 });\nshow.seats = 0;\nconsole.log(\"seats is still\", show.seats);\n",
   "stdout": "seats is still 120\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fz_sloppy.cjs",
     "out": "seats is still 120\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fz_strict.js": {
   "src": "const show = Object.freeze({ title: \"Hamlet\", seats: 120 });\nshow.seats = 0;\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/fz_strict.js:2\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/fz_strict.js:2:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node fz_strict.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/fz_strict.js:2\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/fz_strict.js:2:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/fz_strict.js:2\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/fz_strict.js:2:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node fz_strict.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/fz_strict.js:2\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/fz_strict.js:2:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "groupby.js": {
   "src": "const orders = [\n  { item: \"popcorn\", kind: \"snack\", price: 4 },\n  { item: \"lemonade\", kind: \"drink\", price: 3 },\n  { item: \"pretzel\", kind: \"snack\", price: 5 },\n  { item: \"water\", kind: \"drink\", price: 2 },\n  { item: \"poster\", kind: \"merch\", price: 15 },\n];\n\nconst byKind = Object.groupBy(orders, (order) => order.kind);\nconsole.log(Object.keys(byKind));\nconsole.log(byKind.snack.map((order) => order.item));\nconsole.log(byKind.merch.length, byKind.toy);\n\nconst nums = [1, 2, 3, 4, 5];\nconst parity = Object.groupBy(nums, (n) => (n % 2 ? \"odd\" : \"even\"));\nconsole.log(parity);\n",
   "stdout": "[ 'snack', 'drink', 'merch' ]\n[ 'popcorn', 'pretzel' ]\n1 undefined\n[Object: null prototype] { odd: [ 1, 3, 5 ], even: [ 2, 4 ] }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node groupby.js",
     "out": "[ 'snack', 'drink', 'merch' ]\n[ 'popcorn', 'pretzel' ]\n1 undefined\n[Object: null prototype] { odd: [ 1, 3, 5 ], even: [ 2, 4 ] }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "groupby_map.js": {
   "src": "const prices = [4, 3, 5, 2, 15];\n\nconst bands = Map.groupBy(prices, (p) => (p >= 5 ? \"big\" : \"small\"));\nconsole.log(bands);\nconsole.log(bands.get(\"small\"));\nconsole.log(bands.size);\n",
   "stdout": "Map(2) { 'small' => [ 4, 3, 2 ], 'big' => [ 5, 15 ] }\n[ 4, 3, 2 ]\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node groupby_map.js",
     "out": "Map(2) { 'small' => [ 4, 3, 2 ], 'big' => [ 5, 15 ] }\n[ 4, 3, 2 ]\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hasown.js": {
   "src": "const prop = { name: \"skull\" };\n\nconsole.log(\"name\" in prop, Object.hasOwn(prop, \"name\"));\nconsole.log(\"toString\" in prop, Object.hasOwn(prop, \"toString\"));\n\nconst bare = Object.create(null);\nbare.name = \"crown\";\nconsole.log(Object.hasOwn(bare, \"name\"), \"toString\" in bare);\n",
   "stdout": "true true\ntrue false\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hasown.js",
     "out": "true true\ntrue false\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hidden.js": {
   "src": "const ticket = { show: \"Hamlet\", seat: \"C7\" };\nObject.defineProperty(ticket, \"barcode\", {\n  value: \"X-4471\", enumerable: false,\n});\n\nconsole.log(ticket.barcode);\nconsole.log(Object.keys(ticket));\nfor (const key in ticket) console.log(\"for...in:\", key);\nconsole.log(JSON.stringify(ticket));\nconsole.log({ ...ticket });\nconsole.log(ticket);\nconsole.log(Object.hasOwn(ticket, \"barcode\"));\nconsole.log(Object.getOwnPropertyNames(ticket));\n",
   "stdout": "X-4471\n[ 'show', 'seat' ]\nfor...in: show\nfor...in: seat\n{\"show\":\"Hamlet\",\"seat\":\"C7\"}\n{ show: 'Hamlet', seat: 'C7' }\n{ show: 'Hamlet', seat: 'C7' }\ntrue\n[ 'show', 'seat', 'barcode' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hidden.js",
     "out": "X-4471\n[ 'show', 'seat' ]\nfor...in: show\nfor...in: seat\n{\"show\":\"Hamlet\",\"seat\":\"C7\"}\n{ show: 'Hamlet', seat: 'C7' }\n{ show: 'Hamlet', seat: 'C7' }\ntrue\n[ 'show', 'seat', 'barcode' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hidden_ink.js": {
   "src": "const note = Symbol(\"note\");\nconst prop = { name: \"crown\", weight: 2 };\nprop[note] = \"glue the left side\";\n\nconsole.log(prop[note]);\nconsole.log(Object.keys(prop));\nfor (const key in prop) console.log(\"for...in:\", key);\nconsole.log(JSON.stringify(prop));\nconsole.log(prop);\nconsole.log(Object.getOwnPropertySymbols(prop));\nconsole.log(Reflect.ownKeys(prop));\nconsole.log(Object.assign({}, prop)[note]);\n",
   "stdout": "glue the left side\n[ 'name', 'weight' ]\nfor...in: name\nfor...in: weight\n{\"name\":\"crown\",\"weight\":2}\n{ name: 'crown', weight: 2, Symbol(note): 'glue the left side' }\n[ Symbol(note) ]\n[ 'name', 'weight', Symbol(note) ]\nglue the left side\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hidden_ink.js",
     "out": "glue the left side\n[ 'name', 'weight' ]\nfor...in: name\nfor...in: weight\n{\"name\":\"crown\",\"weight\":2}\n{ name: 'crown', weight: 2, Symbol(note): 'glue the left side' }\n[ Symbol(note) ]\n[ 'name', 'weight', Symbol(note) ]\nglue the left side\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "glue the left side\n[ 'name', 'weight' ]\nfor...in: name\nfor...in: weight\n{\"name\":\"crown\",\"weight\":2}\n{ name: 'crown', weight: 2, [Symbol(note)]: 'glue the left side' }\n[ Symbol(note) ]\n[ 'name', 'weight', Symbol(note) ]\nglue the left side\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "node hidden_ink.js",
      "out": "glue the left side\n[ 'name', 'weight' ]\nfor...in: name\nfor...in: weight\n{\"name\":\"crown\",\"weight\":2}\n{ name: 'crown', weight: 2, [Symbol(note)]: 'glue the left side' }\n[ Symbol(note) ]\n[ 'name', 'weight', Symbol(note) ]\nglue the left side\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "hints.js": {
   "src": "const spy = {\n  [Symbol.toPrimitive](hint) {\n    console.log(\"  asked with hint:\", hint);\n    return hint === \"string\" ? \"SPY\" : 7;\n  },\n};\nconsole.log(`${spy}`);\nconsole.log(String(spy));\nconsole.log(+spy);\nconsole.log(spy * 2);\nconsole.log(spy > 5);\nconsole.log(spy + 1);\nconsole.log(spy == 7);\nconsole.log(Number(spy));\nconsole.log(spy - 1, spy / 7, spy % 4);\nconsole.log(spy <= 7);\nconst drawers = {};\ndrawers[spy] = \"found\";\nconsole.log(drawers);\n",
   "stdout": "  asked with hint: string\nSPY\n  asked with hint: string\nSPY\n  asked with hint: number\n7\n  asked with hint: number\n14\n  asked with hint: number\ntrue\n  asked with hint: default\n8\n  asked with hint: default\ntrue\n  asked with hint: number\n7\n  asked with hint: number\n  asked with hint: number\n  asked with hint: number\n6 1 3\n  asked with hint: number\ntrue\n  asked with hint: string\n{ SPY: 'found' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hints.js",
     "out": "  asked with hint: string\nSPY\n  asked with hint: string\nSPY\n  asked with hint: number\n7\n  asked with hint: number\n14\n  asked with hint: number\ntrue\n  asked with hint: default\n8\n  asked with hint: default\ntrue\n  asked with hint: number\n7\n  asked with hint: number\n  asked with hint: number\n  asked with hint: number\n6 1 3\n  asked with hint: number\ntrue\n  asked with hint: string\n{ SPY: 'found' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lab_deep.js": {
   "src": "function deepFreeze(obj) {\n  for (const value of Object.values(obj)) {\n    if (typeof value === \"object\" && value !== null) deepFreeze(value);\n  }\n  return Object.freeze(obj);\n}\n\nconst show = deepFreeze({\n  title: \"Hamlet\",\n  cast: [\"Ada\"],\n  lights: { color: \"blue\" },\n});\nshow.cast.push(\"Bo\");\nshow.lights.color = \"red\";\nconsole.log(show);\nconsole.log(Object.isFrozen(show), Object.isFrozen(show.cast));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/lab_deep.js:13\nshow.cast.push(\"Bo\");\n          ^\n\nTypeError: Cannot add property 1, object is not extensible\n    at Array.push (<anonymous>)\n    at file:///home/you/javascript-ch19/lab_deep.js:13:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node lab_deep.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/lab_deep.js:13\nshow.cast.push(\"Bo\");\n          ^\n\nTypeError: Cannot add property 1, object is not extensible\n    at Array.push (<anonymous>)\n    at file:///home/you/javascript-ch19/lab_deep.js:13:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/lab_deep.js:13\nshow.cast.push(\"Bo\");\n          ^\n\nTypeError: Cannot add property 1, object is not extensible\n    at Array.push (<anonymous>)\n    at file:///home/you/javascript-ch19/lab_deep.js:13:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node lab_deep.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/lab_deep.js:13\nshow.cast.push(\"Bo\");\n          ^\n\nTypeError: Cannot add property 1, object is not extensible\n    at Array.push (<anonymous>)\n    at file:///home/you/javascript-ch19/lab_deep.js:13:11\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "level_checks.js": {
   "src": "const open = { seats: 120 };\nconst sealed = Object.seal({ seats: 120 });\nconst frozen = Object.freeze({ seats: 120 });\n\nfor (const o of [open, sealed, frozen]) {\n  const ext = Object.isExtensible(o);\n  console.log(ext, Object.isSealed(o), Object.isFrozen(o));\n}\nconsole.log(Object.getOwnPropertyDescriptor(frozen, \"seats\"));\n",
   "stdout": "true false false\nfalse true false\nfalse true true\n{ value: 120, writable: false, enumerable: true, configurable: false }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node level_checks.js",
     "out": "true false false\nfalse true false\nfalse true true\n{ value: 120, writable: false, enumerable: true, configurable: false }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "levels.js": {
   "src": "function attempt(job) {\n  try { job(); return \"ok\"; } catch { return \"refused\"; }\n}\nconst kinds = {\n  preventExtensions: Object.preventExtensions({ seats: 120 }),\n  seal: Object.seal({ seats: 120 }),\n  freeze: Object.freeze({ seats: 120 }),\n};\nfor (const [name, obj] of Object.entries(kinds)) {\n  const add = attempt(() => { obj.extra = 1; });\n  const change = attempt(() => { obj.seats = 99; });\n  const remove = attempt(() => { delete obj.seats; });\n  console.log(name.padEnd(17), \"add:\", add.padEnd(7),\n    \"change:\", change.padEnd(7), \"delete:\", remove);\n}\n",
   "stdout": "preventExtensions add: refused change: ok      delete: ok\nseal              add: refused change: ok      delete: refused\nfreeze            add: refused change: refused delete: refused\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node levels.js",
     "out": "preventExtensions add: refused change: ok      delete: ok\nseal              add: refused change: ok      delete: refused\nfreeze            add: refused change: refused delete: refused\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "locked.js": {
   "src": "const stage = { name: \"Main\" };\nObject.defineProperty(stage, \"capacity\", {\n  value: 300, writable: true, enumerable: true, configurable: false,\n});\n\nstage.capacity = 280;\nconsole.log(stage.capacity);\nObject.defineProperty(stage, \"capacity\", { writable: false });\nconsole.log(Object.getOwnPropertyDescriptor(stage, \"capacity\"));\nObject.defineProperty(stage, \"capacity\", { writable: true });\n",
   "stdout": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\n",
   "stderr": "file:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node locked.js",
     "out": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\n",
     "err": "file:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\nfile:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\n",
    "stderr": "file:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node locked.js",
      "out": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\n",
      "err": "file:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "280\n{ value: 280, writable: false, enumerable: true, configurable: false }\nfile:///home/you/javascript-ch19/locked.js:10\nObject.defineProperty(stage, \"capacity\", { writable: true });\n       ^\n\nTypeError: Cannot redefine property: capacity\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/locked.js:10:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "machine_bad.js": {
   "src": "const temp = {\n  [Symbol.toPrimitive](hint) {\n    return { celsius: 21 };\n  },\n};\nconsole.log(temp + 1);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/machine_bad.js:6\nconsole.log(temp + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/machine_bad.js:6:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node machine_bad.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/machine_bad.js:6\nconsole.log(temp + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/machine_bad.js:6:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/machine_bad.js:6\nconsole.log(temp + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/machine_bad.js:6:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node machine_bad.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/machine_bad.js:6\nconsole.log(temp + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/machine_bad.js:6:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "machine_temp.js": {
   "src": "const temp = {\n  celsius: 21,\n  [Symbol.toPrimitive](hint) {\n    return hint === \"string\" ? `${this.celsius}°C` : this.celsius;\n  },\n};\nconsole.log(`${temp}`);\nconsole.log(temp + 1);\nconsole.log(temp * 2);\nconsole.log(temp + \"!\");\nconsole.log(temp > 25);\nconsole.log(Number(temp) - 1);\n",
   "stdout": "21°C\n22\n42\n21!\nfalse\n20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node machine_temp.js",
     "out": "21°C\n22\n42\n21!\nfalse\n20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_primitive.js": {
   "src": "const prop = {\n  valueOf() { return this; },\n  toString() { return this; },\n};\nconsole.log(prop + 1);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch19/no_primitive.js:5\nconsole.log(prop + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/no_primitive.js:5:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node no_primitive.js",
     "out": "",
     "err": "file:///home/you/javascript-ch19/no_primitive.js:5\nconsole.log(prop + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/no_primitive.js:5:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch19/no_primitive.js:5\nconsole.log(prop + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/no_primitive.js:5:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node no_primitive.js",
      "out": "",
      "err": "file:///home/you/javascript-ch19/no_primitive.js:5\nconsole.log(prop + 1);\n                 ^\n\nTypeError: Cannot convert object to primitive value\n    at file:///home/you/javascript-ch19/no_primitive.js:5:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "nonobject.js": {
   "src": "const seats = 120;\nconsole.log(Object.freeze(seats));\nObject.defineProperty(seats, \"max\", { value: 200 });\n",
   "stdout": "120\n",
   "stderr": "file:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node nonobject.js",
     "out": "120\n",
     "err": "file:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "120\nfile:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Object.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "120\n",
    "stderr": "file:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node nonobject.js",
      "out": "120\n",
      "err": "file:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "120\nfile:///home/you/javascript-ch19/nonobject.js:3\nObject.defineProperty(seats, \"max\", { value: 200 });\n       ^\n\nTypeError: Object.defineProperty called on non-object\n    at Function.defineProperty (<anonymous>)\n    at file:///home/you/javascript-ch19/nonobject.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "order.js": {
   "src": "const seatMap = {};\nseatMap.b = \"Bo\";\nseatMap[10] = \"row ten\";\nseatMap.a = \"Ada\";\nseatMap[2] = \"row two\";\nseatMap[\"-1\"] = \"minus one\";\nseatMap[Symbol(\"note\")] = \"ink\";\n\nconsole.log(Object.keys(seatMap));\nconsole.log(Reflect.ownKeys(seatMap));\n",
   "stdout": "[ '2', '10', 'b', 'a', '-1' ]\n[ '2', '10', 'b', 'a', '-1', Symbol(note) ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node order.js",
     "out": "[ '2', '10', 'b', 'a', '-1' ]\n[ '2', '10', 'b', 'a', '-1', Symbol(note) ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_lock.js": {
   "src": "const config = { venue: \"Globe\" };\nObject.defineProperty(config, \"venue\", { writable: false });\ntry {\n  config.venue = \"Rose\";\n} catch (err) {\n  console.log(\"Refused:\", err.message);\n}\nconsole.log(config.venue);\n",
   "stdout": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_lock.js",
     "out": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_lock_alt1.js": {
   "src": "const config = { venue: \"Globe\" };\ntry {\nObject.defineProperty(config, \"venue\", { writable: false });\n  config.venue = \"Rose\";\n} catch (err) {\n  console.log(\"Refused:\", err.message);\n}\nconsole.log(config.venue);\n",
   "stdout": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_lock_alt1.js",
     "out": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_lock_alt2.js": {
   "src": "const config = { venue: \"Globe\" };\nObject.defineProperty(config, \"venue\", { writable: false });\ntry {\n  config.venue = \"Rose\";\n} catch (err) {\n  console.log(\"Refused:\", err.message);\nconsole.log(config.venue);\n}\n",
   "stdout": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_lock_alt2.js",
     "out": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_lock_alt3.js": {
   "src": "const config = { venue: \"Globe\" };\ntry {\nObject.defineProperty(config, \"venue\", { writable: false });\n  config.venue = \"Rose\";\n} catch (err) {\n  console.log(\"Refused:\", err.message);\nconsole.log(config.venue);\n}\n",
   "stdout": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_lock_alt3.js",
     "out": "Refused: Cannot assign to read only property 'venue' of object '#<Object>'\nGlobe\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_pipe.js": {
   "src": "const menu = { tea: 2, cake: 4, soup: 6 };\nconst entries = Object.entries(menu);\nconst pricier = entries.map(([dish, price]) => [dish, price + 1]);\nconst cheap = pricier.filter(([dish, price]) => price < 6);\nconst result = Object.fromEntries(cheap);\nconsole.log(result);\n",
   "stdout": "{ tea: 3, cake: 5 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_pipe.js",
     "out": "{ tea: 3, cake: 5 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_tag.js": {
   "src": "function shout(strings, ...values) {\n  let out = strings[0];\n  for (let i = 0; i < values.length; i++) {\n    out += String(values[i]).toUpperCase() + strings[i + 1];\n  }\n  return out;\n}\nconst hero = \"Kit\";\nconst villain = \"Iago\";\nconsole.log(shout`${hero}: beware of ${villain}!`);\n",
   "stdout": "KIT: beware of IAGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_tag.js",
     "out": "KIT: beware of IAGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "plain_plus.js": {
   "src": "const list = [];\nconst obj = {};\nconsole.log(list + obj);\n",
   "stdout": "[object Object]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node plain_plus.js",
     "out": "[object Object]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "plus_mystery.js": {
   "src": "const list = [];\nconst obj = {};\n\nconsole.log(list + obj);\nconsole.log(list.valueOf() === list, obj.valueOf() === obj);\nconsole.log(JSON.stringify(list.toString()), obj.toString());\nconsole.log([1, 2] + [3]);\nconsole.log(obj + 1);\n",
   "stdout": "[object Object]\ntrue true\n\"\" [object Object]\n1,23\n[object Object]1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node plus_mystery.js",
     "out": "[object Object]\ntrue true\n\"\" [object Object]\n1,23\n[object Object]1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_assign.js": {
   "src": "const base = Object.freeze({ act: 1, scene: 1 });\nconst next = Object.assign({}, base, { scene: 2 }, { scene: 3 });\n\nnext.act = 2;\nconsole.log(next);\nconsole.log(Object.isFrozen(base), Object.isFrozen(next));\n",
   "stdout": "{ act: 2, scene: 3 }\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_assign.js",
     "out": "{ act: 2, scene: 3 }\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_hints.js": {
   "src": "const seat = {\n  row: 3,\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"number\") return this.row;\n    if (hint === \"string\") return `row ${this.row}`;\n    return \"seat\";\n  },\n};\nconsole.log(`${seat}`);\nconsole.log(seat * 10);\nconsole.log(seat + 1);\nconsole.log(+seat + 1);\nconsole.log(String(seat).length);\nconsole.log(seat == \"seat\");\n",
   "stdout": "row 3\n30\nseat1\n4\n5\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_hints.js",
     "out": "row 3\n30\nseat1\n4\n5\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_order.js": {
   "src": "const lockers = { zed: 1 };\nlockers[7] = \"seven\";\nlockers.amy = 2;\nlockers[\"3\"] = \"three\";\nlockers[\"07\"] = \"oh seven\";\n\nconsole.log(Object.keys(lockers).join(\" \"));\n",
   "stdout": "3 7 zed amy 07\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_order.js",
     "out": "3 7 zed amy 07\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_seal.js": {
   "src": "const ticket = Object.seal({ seat: \"C7\", paid: false });\nconst no = (err) => console.log(\"No:\", err.message);\n\nticket.paid = true;\ntry { ticket.vip = true; } catch (err) { no(err); }\ntry { delete ticket.seat; } catch (err) { no(err); }\nconsole.log(ticket);\nconsole.log(Object.isSealed(ticket), Object.isFrozen(ticket));\n",
   "stdout": "No: Cannot add property vip, object is not extensible\nNo: Cannot delete property 'seat' of #<Object>\n{ seat: 'C7', paid: true }\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_seal.js",
     "out": "No: Cannot add property vip, object is not extensible\nNo: Cannot delete property 'seat' of #<Object>\n{ seat: 'C7', paid: true }\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_sloppy.cjs": {
   "src": "const poster = { title: \"Macbeth\", color: \"red\" };\nObject.defineProperty(poster, \"title\", { writable: false });\n\nposter.title = \"Hamlet\";\nposter.color = \"blue\";\nconsole.log(poster.title, poster.color);\n",
   "stdout": "Macbeth blue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_sloppy.cjs",
     "out": "Macbeth blue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "raw.js": {
   "src": "const path = \"C:\\new\\table\";\nconsole.log(path);\nconsole.log(String.raw`C:\\new\\table`);\nconsole.log(String.raw`Sum: ${2 + 3}\\n`);\nconsole.log(path.length, String.raw`C:\\new\\table`.length);\n",
   "stdout": "C:\new\table\nC:\\new\\table\nSum: 5\\n\n10 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node raw.js",
     "out": "C:\new\table\nC:\\new\\table\nSum: 5\\n\n10 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "readonly.js": {
   "src": "const show = { title: \"Hamlet\", seats: 120 };\nObject.defineProperty(show, \"seats\", { writable: false });\n\nconsole.log(\"seats:\", show.seats);\nshow.seats = 0;\nconsole.log(\"never printed\");\n",
   "stdout": "seats: 120\n",
   "stderr": "file:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node readonly.js",
     "out": "seats: 120\n",
     "err": "file:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "seats: 120\nfile:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "seats: 120\n",
    "stderr": "file:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node readonly.js",
      "out": "seats: 120\n",
      "err": "file:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "seats: 120\nfile:///home/you/javascript-ch19/readonly.js:5\nshow.seats = 0;\n           ^\n\nTypeError: Cannot assign to read only property 'seats' of object '#<Object>'\n    at file:///home/you/javascript-ch19/readonly.js:5:12\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "readonly_sloppy.cjs": {
   "src": "const show = { title: \"Hamlet\", seats: 120 };\nObject.defineProperty(show, \"seats\", { writable: false });\n\nconsole.log(\"seats:\", show.seats);\nshow.seats = 0;\nconsole.log(\"after the write:\", show.seats);\n",
   "stdout": "seats: 120\nafter the write: 120\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node readonly_sloppy.cjs",
     "out": "seats: 120\nafter the write: 120\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "registry.js": {
   "src": "const a = Symbol.for(\"crew.badge\");\nconst b = Symbol.for(\"crew.badge\");\nconsole.log(a === b);\nconsole.log(Symbol.keyFor(a));\n\nconst local = Symbol(\"crew.badge\");\nconsole.log(local === a, Symbol.keyFor(local), local.description);\n",
   "stdout": "true\ncrew.badge\nfalse undefined crew.badge\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node registry.js",
     "out": "true\ncrew.badge\nfalse undefined crew.badge\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shallow.js": {
   "src": "const show = Object.freeze({\n  title: \"Hamlet\",\n  cast: [\"Ada\"],\n  lights: { color: \"blue\" },\n});\nshow.cast.push(\"Bo\");\nshow.lights.color = \"red\";\nconsole.log(show);\nconsole.log(Object.isFrozen(show), Object.isFrozen(show.cast));\n",
   "stdout": "{ title: 'Hamlet', cast: [ 'Ada', 'Bo' ], lights: { color: 'red' } }\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node shallow.js",
     "out": "{ title: 'Hamlet', cast: [ 'Ada', 'Bo' ], lights: { color: 'red' } }\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_enum.js": {
   "src": "const cast = {};\nfunction addRole(role, actor) {\n  Object.defineProperty(cast, role, { value: actor, writable: true });\n}\naddRole(\"Hamlet\", \"Ada\");\naddRole(\"Ophelia\", \"Bo\");\nconsole.log(\"Roles:\", Object.keys(cast).length);\nconsole.log(cast.Hamlet);\n",
   "stdout": "Roles: 0\nAda\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_enum.js",
     "out": "Roles: 0\nAda\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_fresh.js": {
   "src": "const secret = Symbol(\"secret\");\nconst door = { name: \"stage door\", [secret]: \"open sesame\" };\n\nfunction readSecret(obj) {\n  return obj[Symbol(\"secret\")];\n}\nconsole.log(door.name, readSecret(door));\n",
   "stdout": "stage door undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_fresh.js",
     "out": "stage door undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "switches.js": {
   "src": "const show = { title: \"Hamlet\", seats: 120 };\n\nconst panel = Object.getOwnPropertyDescriptor(show, \"title\");\nconsole.log(panel);\nconsole.log(Object.getOwnPropertyDescriptor(show, \"seats\"));\nconsole.log(Object.getOwnPropertyDescriptor(show, \"director\"));\n",
   "stdout": "{\n  value: 'Hamlet',\n  writable: true,\n  enumerable: true,\n  configurable: true\n}\n{ value: 120, writable: true, enumerable: true, configurable: true }\nundefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node switches.js",
     "out": "{\n  value: 'Hamlet',\n  writable: true,\n  enumerable: true,\n  configurable: true\n}\n{ value: 120, writable: true, enumerable: true, configurable: true }\nundefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "symbol_basics.js": {
   "src": "const note = Symbol(\"note\");\nconst other = Symbol(\"note\");\n\nconsole.log(typeof note);\nconsole.log(note.description);\nconsole.log(note.toString());\nconsole.log(note === other);\nconsole.log(note === note);\n",
   "stdout": "symbol\nnote\nSymbol(note)\nfalse\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node symbol_basics.js",
     "out": "symbol\nnote\nSymbol(note)\nfalse\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "symbol_math.js": {
   "src": "const seats = Symbol(\"seats\");\nconsole.log(seats.toString());\nconsole.log(seats * 2);\n",
   "stdout": "Symbol(seats)\n",
   "stderr": "file:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node symbol_math.js",
     "out": "Symbol(seats)\n",
     "err": "file:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Symbol(seats)\nfile:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Symbol(seats)\n",
    "stderr": "file:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node symbol_math.js",
      "out": "Symbol(seats)\n",
      "err": "file:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Symbol(seats)\nfile:///home/you/javascript-ch19/symbol_math.js:3\nconsole.log(seats * 2);\n                  ^\n\nTypeError: Cannot convert a Symbol value to a number\n    at file:///home/you/javascript-ch19/symbol_math.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "symbol_plus.js": {
   "src": "const note = Symbol(\"note\");\nconsole.log(String(note));\nconsole.log(note.description);\ntry { `${note}`; } catch (err) { console.log(\"template:\", err.message); }\nconsole.log(\"Note: \" + note);\n",
   "stdout": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\n",
   "stderr": "file:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node symbol_plus.js",
     "out": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\n",
     "err": "file:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\nfile:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\n",
    "stderr": "file:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node symbol_plus.js",
      "out": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\n",
      "err": "file:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Symbol(note)\nnote\ntemplate: Cannot convert a Symbol value to a string\nfile:///home/you/javascript-ch19/symbol_plus.js:5\nconsole.log(\"Note: \" + note);\n                     ^\n\nTypeError: Cannot convert a Symbol value to a string\n    at file:///home/you/javascript-ch19/symbol_plus.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "tag_basic.js": {
   "src": "function show(strings, ...values) {\n  console.log(strings);\n  console.log(values);\n  return \"done\";\n}\n\nconst who = \"Ada\";\nconst seat = 7;\nconst result = show`Hello ${who}, seat ${seat}!`;\nconsole.log(result);\n",
   "stdout": "[ 'Hello ', ', seat ', '!' ]\n[ 'Ada', 7 ]\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tag_basic.js",
     "out": "[ 'Hello ', ', seat ', '!' ]\n[ 'Ada', 7 ]\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tag_safe.js": {
   "src": "function safe(strings, ...values) {\n  let out = strings[0];\n  values.forEach((value, i) => {\n    const text = String(value)\n      .replaceAll(\"<\", \"&lt;\").replaceAll(\">\", \"&gt;\");\n    out += text + strings[i + 1];\n  });\n  return out;\n}\n\nconst name = \"<b>Bo</b>\";\nconsole.log(`Welcome, ${name}!`);\nconsole.log(safe`Welcome, ${name}!`);\n",
   "stdout": "Welcome, <b>Bo</b>!\nWelcome, &lt;b&gt;Bo&lt;/b&gt;!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tag_safe.js",
     "out": "Welcome, <b>Bo</b>!\nWelcome, &lt;b&gt;Bo&lt;/b&gt;!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "temperature.js": {
   "src": "class Temperature {\n  constructor(celsius) { this.celsius = celsius; }\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"string\") return `${this.celsius}°C`;\n    return this.celsius;\n  }\n}\n\nconst morning = new Temperature(12);\nconst noon = new Temperature(21);\nconsole.log(`Morning ${morning}, noon ${noon}`);\nconsole.log(\"Rise:\", noon - morning);\nconsole.log(\"Average:\", (morning + noon) / 2);\nconsole.log(noon > morning);\nconsole.log(\"Plus: \" + noon);\nconsole.log(\"String: \" + String(noon));\n",
   "stdout": "Morning 12°C, noon 21°C\nRise: 9\nAverage: 16.5\ntrue\nPlus: 21\nString: 21°C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node temperature.js",
     "out": "Morning 12°C, noon 21°C\nRise: 9\nAverage: 16.5\ntrue\nPlus: 21\nString: 21°C\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tostringtag.js": {
   "src": "class Ticket {\n  constructor(seat) { this.seat = seat; }\n  get [Symbol.toStringTag]() { return \"Ticket\"; }\n}\nconst plain = { seat: \"C7\" };\nconst ticket = new Ticket(\"C7\");\n\nconsole.log(String(plain));\nconsole.log(String(ticket));\nconsole.log(Object.prototype.toString.call([1, 2]));\nconsole.log(Object.prototype.toString.call(null));\nconsole.log(String(new Map()));\n",
   "stdout": "[object Object]\n[object Ticket]\n[object Array]\n[object Null]\n[object Map]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tostringtag.js",
     "out": "[object Object]\n[object Ticket]\n[object Array]\n[object Null]\n[object Map]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tp_string.js": {
   "src": "const temp = {\n  celsius: 21,\n  [Symbol.toPrimitive](hint) {\n    return hint === \"string\" ? `${this.celsius}°C` : this.celsius;\n  },\n};\nconsole.log(`${temp}`);\n",
   "stdout": "21°C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tp_string.js",
     "out": "21°C\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_entries.js": {
   "src": "const stock = { pens: 4, maps: 0, hats: 7, mugs: 2 };\nconst restock = Object.fromEntries(\n  Object.entries(stock)\n    .filter(([item, n]) => n < 5)\n    .map(([item, n]) => [item, n + 10]),\n);\nfor (const [item, n] of Object.entries(restock)) {\n  console.log(item, stock[item], n);\n}\n",
   "stdout": "pens 4 14\nmaps 0 10\nmugs 2 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_entries.js",
     "out": "pens 4 14\nmaps 0 10\nmugs 2 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_tag.js": {
   "src": "function tag(strings, ...values) {\n  strings.forEach((s, i) => {\n    const value = i < values.length ? values[i] : \"-\";\n    console.log(i, s.length, value);\n  });\n}\n\nconst act = 3;\nconst scene = 2;\ntag`Act ${act}, scene ${scene}`;\n",
   "stdout": "0 4 3\n1 8 2\n2 0 -\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_tag.js",
     "out": "0 4 3\n1 8 2\n2 0 -\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "valueof_eq.js": {
   "src": "const price = { valueOf() { return 5; } };\nconst same = { valueOf() { return 5; } };\n\nconsole.log(price == 5);\nconsole.log(price === 5);\nconsole.log(price + 1);\nconsole.log(`${price}`);\nconsole.log(price == same);\nconsole.log(price <= same && price >= same);\n",
   "stdout": "true\nfalse\n6\n[object Object]\nfalse\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node valueof_eq.js",
     "out": "true\nfalse\n6\n[object Object]\nfalse\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "valueof_plus.js": {
   "src": "const price = { valueOf() { return 42; } };\nconsole.log(price + \"\");\n",
   "stdout": "42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node valueof_plus.js",
     "out": "42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "valueof_template.js": {
   "src": "const price = { valueOf() { return 42; } };\nconsole.log(`${price}`);\n",
   "stdout": "[object Object]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node valueof_template.js",
     "out": "[object Object]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wellknown.js": {
   "src": "const names = Object.getOwnPropertyNames(Symbol)\n  .filter((k) => typeof Symbol[k] === \"symbol\");\nconsole.log(names.length, \"well-known symbols\");\nconsole.log(names.join(\" \"));\nconsole.log(typeof Symbol.iterator, Symbol.iterator.description);\n",
   "stdout": "15 well-known symbols\nasyncIterator hasInstance isConcatSpreadable iterator match matchAll replace search species split toPrimitive toStringTag unscopables dispose asyncDispose\nsymbol Symbol.iterator\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node wellknown.js",
     "out": "15 well-known symbols\nasyncIterator hasInstance isConcatSpreadable iterator match matchAll replace search species split toPrimitive toStringTag unscopables dispose asyncDispose\nsymbol Symbol.iterator\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
