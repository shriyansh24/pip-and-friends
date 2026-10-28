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
  "workdir": "/home/you/javascript-ch20",
  "versionDifferences": [
   "boss_fill.js",
   "fill_upsert.js",
   "for_of_object.js",
   "iter_concat.js",
   "map_not_entry.js",
   "predict_spread_obj.js",
   "set_method_array.js",
   "set_not_iterable.js",
   "upsert.js",
   "weak_forof.js",
   "weak_string.js",
   "weakset_number.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_fill.js, fill_upsert.js, for_of_object.js, iter_concat.js, map_not_entry.js, predict_spread_obj.js, set_method_array.js, set_not_iterable.js, upsert.js, weak_forof.js, weak_string.js, weakset_number.js."
 },
 "programs": {
  "array_helpers.js": {
   "src": "const prices = [3, 5, 7, 2];\nconst cheap = prices.values().filter((p) => p < 6).map((p) => p * 2);\nconsole.log(cheap);\nconsole.log(cheap.toArray());\nconsole.log(prices.filter((p) => p < 6).map((p) => p * 2));\n",
   "stdout": "Object [Iterator Helper] {}\n[ 6, 10, 4 ]\n[ 6, 10, 4 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node array_helpers.js",
     "out": "Object [Iterator Helper] {}\n[ 6, 10, 4 ]\n[ 6, 10, 4 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "class Wardrobe {\n  #hooks = new Map();\n  hang(owner, item) {\n    this.#hooks.getOrInsert(owner, []).push(item);\n  }\n  *[Symbol.iterator]() {\n    for (const [owner, items] of this.#hooks) {\n      yield `${owner}: ${items.join(\" + \")}`;\n    }\n  }\n}\nconst w = new Wardrobe();\nw.hang(\"Ada\", \"scarf\");\nw.hang(\"Bo\", \"hat\");\nw.hang(\"Ada\", \"gloves\");\nconsole.log([...w]);\n",
   "stdout": "[ 'Ada: scarf + gloves', 'Bo: hat' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "[ 'Ada: scarf + gloves', 'Bo: hat' ]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/boss_fill.js:4\n    this.#hooks.getOrInsert(owner, []).push(item);\n                ^\n\nTypeError: this[#hooks].getOrInsert is not a function\n    at Wardrobe.hang (file:///home/you/javascript-ch20/boss_fill.js:4:17)\n    at file:///home/you/javascript-ch20/boss_fill.js:13:3\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node boss_fill.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/boss_fill.js:4\n    this.#hooks.getOrInsert(owner, []).push(item);\n                ^\n\nTypeError: this[#hooks].getOrInsert is not a function\n    at Wardrobe.hang (file:///home/you/javascript-ch20/boss_fill.js:4:17)\n    at file:///home/you/javascript-ch20/boss_fill.js:13:3\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_parsons.js": {
   "src": "function* rolls() {\n  yield* [4, 1, 2, 4, 6, 3];\n}\nconst firstEvens = rolls()\n  .filter((n) => n % 2 === 0)\n  .take(4);\nconst distinct = new Set(firstEvens);\nconsole.log(distinct);\n",
   "stdout": "Set(3) { 4, 2, 6 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "Set(3) { 4, 2, 6 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const ada = { name: \"Ada\" };\nconst seen = new Set([ada, { name: \"Ada\" }, ada]);\nconst roles = new Map([[ada, \"lead\"]]);\nroles.set({ name: \"Ada\" }, \"understudy\");\nfunction* names(set) {\n  for (const p of set) yield p.name;\n}\nconsole.log(seen.size, roles.size, roles.get(ada));\nconsole.log([...new Set(names(seen))]);\n",
   "stdout": "2 2 lead\n[ 'Ada' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "2 2 lead\n[ 'Ada' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "const prices = new Map();\nprices.set([\"A\", 1], 40);\nprices.set([\"A\", 2], 40);\nfunction priceOf(row, seat) {\n  return prices.get([row, seat]) ?? \"unknown\";\n}\nconsole.log(priceOf(\"A\", 1), prices.size);\n",
   "stdout": "unknown 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "unknown 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "function* draws() {\n  yield* [3, 5, 3, 8, 5];\n}\nconst seen = new Set();\nlet step = 0;\nfor (const n of draws()) {\n  step++;\n  const fresh = !seen.has(n);\n  seen.add(n);\n  console.log(step, n, fresh, seen.size);\n}\n",
   "stdout": "1 3 true 1\n2 5 true 2\n3 3 false 2\n4 8 true 3\n5 5 false 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 3 true 1\n2 5 true 2\n3 3 false 2\n4 8 true 3\n5 5 false 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "clash.js": {
   "src": "const ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\" };\nconst coats = {};\ncoats[ada] = \"red scarf\";\ncoats[bo] = \"blue hat\";\nconsole.log(coats);\nconsole.log(coats[ada]);\n",
   "stdout": "{ '[object Object]': 'blue hat' }\nblue hat\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node clash.js",
     "out": "{ '[object Object]': 'blue hat' }\nblue hat\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "countdown.js": {
   "src": "const countdown = {\n  from: 3,\n  [Symbol.iterator]() {\n    let n = this.from;\n    return {\n      next() {\n        if (n > 0) return { value: n--, done: false };\n        return { value: undefined, done: true };\n      },\n    };\n  },\n};\nconsole.log([...countdown]);\nfor (const n of countdown) console.log(n, \"...\");\nconsole.log(\"GO!\");\n",
   "stdout": "[ 3, 2, 1 ]\n3 ...\n2 ...\n1 ...\nGO!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node countdown.js",
     "out": "[ 3, 2, 1 ]\n3 ...\n2 ...\n1 ...\nGO!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "countdown_gen.js": {
   "src": "const countdown = {\n  from: 3,\n  *[Symbol.iterator]() {\n    for (let n = this.from; n > 0; n--) yield n;\n  },\n};\nconsole.log([...countdown]);\nconsole.log([...countdown]);\n",
   "stdout": "[ 3, 2, 1 ]\n[ 3, 2, 1 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node countdown_gen.js",
     "out": "[ 3, 2, 1 ]\n[ 3, 2, 1 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "early_exit.js": {
   "src": "function* tickets() {\n  try {\n    yield \"A1\";\n    yield \"A2\";\n    yield \"A3\";\n  } finally {\n    console.log(\"tidying the ticket booth\");\n  }\n}\nfor (const t of tickets()) {\n  console.log(t);\n  if (t === \"A2\") break;\n}\nconst roll = tickets();\nconsole.log(roll.next().value);\nconsole.log(roll.return(\"closed\"));\nconsole.log(roll.next());\n",
   "stdout": "A1\nA2\ntidying the ticket booth\nA1\ntidying the ticket booth\n{ value: 'closed', done: true }\n{ value: undefined, done: true }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node early_exit.js",
     "out": "A1\nA2\ntidying the ticket booth\nA1\ntidying the ticket booth\n{ value: 'closed', done: true }\n{ value: undefined, done: true }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "exhausted.js": {
   "src": "const queue = [\"Ada\", \"Bo\"];\nconst it = queue[Symbol.iterator]();\nconsole.log([...it]);\nconsole.log([...it]);\nconsole.log([...queue]);\nconsole.log([...queue]);\nconsole.log(it[Symbol.iterator]() === it);\n",
   "stdout": "[ 'Ada', 'Bo' ]\n[]\n[ 'Ada', 'Bo' ]\n[ 'Ada', 'Bo' ]\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node exhausted.js",
     "out": "[ 'Ada', 'Bo' ]\n[]\n[ 'Ada', 'Bo' ]\n[ 'Ada', 'Bo' ]\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_dedupe.js": {
   "src": "const tickets = [\"A1\", \"B2\", \"A1\", \"C3\", \"B2\"];\nconst unique = [...new Set(tickets)];\nconsole.log(unique.length, unique.join(\" \"));\n",
   "stdout": "3 A1 B2 C3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_dedupe.js",
     "out": "3 A1 B2 C3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_iterable.js": {
   "src": "const lights = {\n  colors: [\"red\", \"amber\", \"green\"],\n  [Symbol.iterator]() {\n    let i = 0;\n    const colors = this.colors;\n    return {\n      next() {\n        if (i < colors.length) return { value: colors[i++], done: false };\n        return { value: undefined, done: true };\n      },\n    };\n  },\n};\nconsole.log([...lights].join(\" -> \"));\n",
   "stdout": "red -> amber -> green\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_iterable.js",
     "out": "red -> amber -> green\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_range.js": {
   "src": "function* seatNumbers(first, last, gap) {\n  for (let n = first; n <= last; n += gap) {\n    yield n;\n  }\n}\nconsole.log([...seatNumbers(2, 11, 3)].join(\" \"));\n",
   "stdout": "2 5 8 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_range.js",
     "out": "2 5 8 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_upsert.js": {
   "src": "const script = \"to be or not to be\".split(\" \");\nconst freq = new Map();\nfor (const word of script) {\n  freq.set(word, freq.getOrInsert(word, 0) + 1);\n}\nconsole.log([...freq].join(\" | \"));\n",
   "stdout": "to,2 | be,2 | or,1 | not,1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_upsert.js",
     "out": "to,2 | be,2 | or,1 | not,1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/fill_upsert.js:4\n  freq.set(word, freq.getOrInsert(word, 0) + 1);\n                      ^\n\nTypeError: freq.getOrInsert is not a function\n    at file:///home/you/javascript-ch20/fill_upsert.js:4:23\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node fill_upsert.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/fill_upsert.js:4\n  freq.set(word, freq.getOrInsert(word, 0) + 1);\n                      ^\n\nTypeError: freq.getOrInsert is not a function\n    at file:///home/you/javascript-ch20/fill_upsert.js:4:23\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "for_of_desugar.js": {
   "src": "const candies = [\"red\", \"lime\", \"plum\"];\nfor (const c of candies) console.log(\"for...of:\", c);\nconst it = candies[Symbol.iterator]();\nlet step = it.next();\nwhile (!step.done) {\n  console.log(\"by hand:\", step.value);\n  step = it.next();\n}\n",
   "stdout": "for...of: red\nfor...of: lime\nfor...of: plum\nby hand: red\nby hand: lime\nby hand: plum\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node for_of_desugar.js",
     "out": "for...of: red\nfor...of: lime\nfor...of: plum\nby hand: red\nby hand: lime\nby hand: plum\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "for_of_object.js": {
   "src": "const prices = { tea: 3, cake: 5 };\nfor (const [item, price] of Object.entries(prices)) {\n  console.log(item, price);\n}\nfor (const item of prices) {\n  console.log(item);\n}\n",
   "stdout": "tea 3\ncake 5\n",
   "stderr": "file:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node for_of_object.js",
     "out": "tea 3\ncake 5\n",
     "err": "file:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "tea 3\ncake 5\nfile:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "tea 3\ncake 5\n",
    "stderr": "file:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node for_of_object.js",
      "out": "tea 3\ncake 5\n",
      "err": "file:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "tea 3\ncake 5\nfile:///home/you/javascript-ch20/for_of_object.js:5\nfor (const item of prices) {\n                   ^\n\nTypeError: prices is not iterable\n    at file:///home/you/javascript-ch20/for_of_object.js:5:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "gen_break.js": {
   "src": "function* cues() {\n  try {\n    yield \"lights\";\n    yield \"music\";\n  } finally {\n    console.log(\"(stage cleared)\");\n  }\n}\nfor (const c of cues()) {\n  console.log(\"cue:\", c);\n  break;\n}\nconsole.log(\"curtain down\");\n",
   "stdout": "cue: lights\n(stage cleared)\ncurtain down\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_break.js",
     "out": "cue: lights\n(stage cleared)\ncurtain down\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_finish.js": {
   "src": "function* cues() {\n  yield \"lights\";\n  yield \"music\";\n}\nfor (const c of cues()) console.log(\"cue:\", c);\nconsole.log(\"curtain down\");\n",
   "stdout": "cue: lights\ncue: music\ncurtain down\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_finish.js",
     "out": "cue: lights\ncue: music\ncurtain down\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_lazy.js": {
   "src": "function* tickets() {\n  console.log(\"printing tickets!\");\n  yield \"A1\";\n}\nconst roll = tickets();\nconsole.log(\"made the roll\");\nconsole.log(roll);\nconsole.log(typeof roll.next, roll[Symbol.iterator]() === roll);\nconsole.log(roll.next());\n",
   "stdout": "made the roll\nObject [Generator] {}\nfunction true\nprinting tickets!\n{ value: 'A1', done: false }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_lazy.js",
     "out": "made the roll\nObject [Generator] {}\nfunction true\nprinting tickets!\n{ value: 'A1', done: false }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_never.js": {
   "src": "function* cues() {\n  console.log(\"cue: lights\");\n  yield \"lights\";\n}\nconst unused = cues();\nconsole.log(\"the show was cancelled\");\n",
   "stdout": "the show was cancelled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_never.js",
     "out": "the show was cancelled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "gen_story.js": {
   "src": "function* story() {\n  console.log(\"[story] once upon a time...\");\n  yield \"a dragon\";\n  console.log(\"[story] and then...\");\n  yield \"a knight\";\n  console.log(\"[story] the end\");\n}\nconst teller = story();\nconsole.log(\"ready\");\nconsole.log(teller.next());\nconsole.log(teller.next());\nconsole.log(teller.next());\n",
   "stdout": "ready\n[story] once upon a time...\n{ value: 'a dragon', done: false }\n[story] and then...\n{ value: 'a knight', done: false }\n[story] the end\n{ value: undefined, done: true }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node gen_story.js",
     "out": "ready\n[story] once upon a time...\n{ value: 'a dragon', done: false }\n[story] and then...\n{ value: 'a knight', done: false }\n[story] the end\n{ value: undefined, done: true }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "infinite.js": {
   "src": "function* naturals() {\n  let n = 1;\n  while (true) yield n++;\n}\nconst first3 = naturals().take(3).toArray();\nconsole.log(first3);\nconst squares = naturals().map((n) => n * n);\nconsole.log(squares.next().value, squares.next().value);\nconst odd = naturals().filter((n) => n % 2 === 1).drop(2).take(3);\nconsole.log([...odd]);\nconsole.log(naturals().some((n) => n > 1000));\nconsole.log(naturals().find((n) => n * n > 50));\n",
   "stdout": "[ 1, 2, 3 ]\n1 4\n[ 5, 7, 9 ]\ntrue\n8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node infinite.js",
     "out": "[ 1, 2, 3 ]\n1 4\n[ 5, 7, 9 ]\ntrue\n8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "iter_concat.js": {
   "src": "function* encore() {\n  yield \"bow\";\n}\nconst show = Iterator.concat(\n  [\"act 1\", \"act 2\"],\n  new Set([\"interval\"]),\n  encore(),\n);\nconsole.log([...show]);\n",
   "stdout": "[ 'act 1', 'act 2', 'interval', 'bow' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node iter_concat.js",
     "out": "[ 'act 1', 'act 2', 'interval', 'bow' ]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/iter_concat.js:4\nconst show = Iterator.concat(\n                      ^\n\nTypeError: Iterator.concat is not a function\n    at file:///home/you/javascript-ch20/iter_concat.js:4:23\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node iter_concat.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/iter_concat.js:4\nconst show = Iterator.concat(\n                      ^\n\nTypeError: Iterator.concat is not a function\n    at file:///home/you/javascript-ch20/iter_concat.js:4:23\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "iterables.js": {
   "src": "function showArgs() {\n  return [...arguments];\n}\nconst word = \"café\";\nconst seats = new Map([[\"A1\", \"Ada\"], [\"A2\", \"Bo\"]]);\nconst tags = new Set([\"new\", \"hot\"]);\nconsole.log([...word]);\nconsole.log([...seats]);\nconsole.log([...tags]);\nconsole.log(showArgs(1, 2));\nconst [first, second] = tags;\nconsole.log(first, second);\nconsole.log(Array.from(seats.keys()));\nconsole.log(new Set(\"aab\"));\nconsole.log(Math.max(...new Set([3, 9, 4])));\nconsole.log(typeof [][Symbol.iterator], typeof {}[Symbol.iterator]);\n",
   "stdout": "[ 'c', 'a', 'f', 'é' ]\n[ [ 'A1', 'Ada' ], [ 'A2', 'Bo' ] ]\n[ 'new', 'hot' ]\n[ 1, 2 ]\nnew hot\n[ 'A1', 'A2' ]\nSet(2) { 'a', 'b' }\n9\nfunction undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node iterables.js",
     "out": "[ 'c', 'a', 'f', 'é' ]\n[ [ 'A1', 'Ada' ], [ 'A2', 'Bo' ] ]\n[ 'new', 'hot' ]\n[ 1, 2 ]\nnew hot\n[ 'A1', 'A2' ]\nSet(2) { 'a', 'b' }\n9\nfunction undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lazy_log.js": {
   "src": "function* naturals() {\n  let n = 1;\n  while (true) {\n    console.log(\"  make\", n);\n    yield n++;\n  }\n}\nconst doubled = naturals().map((n) => {\n  console.log(\"  double\", n);\n  return n * 2;\n});\nconst firstTwo = doubled.take(2);\nconsole.log(\"nothing made yet\");\nconsole.log(firstTwo.toArray());\n",
   "stdout": "nothing made yet\n  make 1\n  double 1\n  make 2\n  double 2\n[ 2, 4 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lazy_log.js",
     "out": "nothing made yet\n  make 1\n  double 1\n  make 2\n  double 2\n[ 2, 4 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_any_key.js": {
   "src": "const ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\" };\nconst coats = new Map();\ncoats.set(ada, \"red scarf\");\ncoats.set(bo, \"blue hat\");\nconsole.log(coats.get(ada), \"/\", coats.get(bo));\nconsole.log(coats.get({ name: \"Ada\" }));\ncoats.set(1, \"number one\").set(\"1\", \"text one\");\nconsole.log(coats.get(1), \"/\", coats.get(\"1\"));\nconsole.log(coats.size);\n",
   "stdout": "red scarf / blue hat\nundefined\nnumber one / text one\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_any_key.js",
     "out": "red scarf / blue hat\nundefined\nnumber one / text one\n4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_basics.js": {
   "src": "const coats = new Map();\ncoats.set(\"Ada\", \"red scarf\");\ncoats.set(\"Bo\", \"blue hat\").set(\"Cy\", \"green cape\");\nconsole.log(coats);\nconsole.log(coats.get(\"Bo\"));\nconsole.log(coats.get(\"Dee\"));\nconsole.log(coats.has(\"Cy\"), coats.has(\"Dee\"));\nconsole.log(coats.size);\ncoats.set(\"Ada\", \"gold scarf\");\nconsole.log(coats.delete(\"Bo\"), coats.delete(\"Bo\"));\nconsole.log(coats);\ncoats.clear();\nconsole.log(coats.size);\n",
   "stdout": "Map(3) {\n  'Ada' => 'red scarf',\n  'Bo' => 'blue hat',\n  'Cy' => 'green cape'\n}\nblue hat\nundefined\ntrue false\n3\ntrue false\nMap(2) { 'Ada' => 'gold scarf', 'Cy' => 'green cape' }\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_basics.js",
     "out": "Map(3) {\n  'Ada' => 'red scarf',\n  'Bo' => 'blue hat',\n  'Cy' => 'green cape'\n}\nblue hat\nundefined\ntrue false\n3\ntrue false\nMap(2) { 'Ada' => 'gold scarf', 'Cy' => 'green cape' }\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_brackets.js": {
   "src": "const coats = new Map();\ncoats[\"Ada\"] = \"red scarf\";\nconsole.log(coats.size);\nconsole.log(coats.get(\"Ada\"));\nconsole.log(coats.has(\"Ada\"));\nconsole.log(coats);\nconsole.log(coats.Ada);\n",
   "stdout": "0\nundefined\nfalse\nMap(0) { Ada: 'red scarf' }\nred scarf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_brackets.js",
     "out": "0\nundefined\nfalse\nMap(0) { Ada: 'red scarf' }\nred scarf\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_entry_fix.js": {
   "src": "const seats = new Map([[1, \"Ada\"], [2, \"Bo\"]]);\nconsole.log(seats);\nconst names = [\"Ada\", \"Bo\", \"Cy\"];\nconsole.log(new Map(names.map((name, i) => [i + 1, name])));\n",
   "stdout": "Map(2) { 1 => 'Ada', 2 => 'Bo' }\nMap(3) { 1 => 'Ada', 2 => 'Bo', 3 => 'Cy' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_entry_fix.js",
     "out": "Map(2) { 1 => 'Ada', 2 => 'Bo' }\nMap(3) { 1 => 'Ada', 2 => 'Bo', 3 => 'Cy' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_iterate.js": {
   "src": "const prices = new Map([[\"tea\", 3], [\"cake\", 5], [\"soup\", 7]]);\nprices.set(\"bun\", 2);\nfor (const [item, price] of prices) {\n  console.log(`${item} costs ${price}`);\n}\nconsole.log([...prices.keys()]);\nconsole.log([...prices.values()]);\nconsole.log([...prices]);\nprices.forEach((price, item) => console.log(item, price));\nconst menu = { juice: 4, pie: 6 };\nconst fromObj = new Map(Object.entries(menu));\nconsole.log(fromObj);\nconsole.log(Object.fromEntries(prices));\n",
   "stdout": "tea costs 3\ncake costs 5\nsoup costs 7\nbun costs 2\n[ 'tea', 'cake', 'soup', 'bun' ]\n[ 3, 5, 7, 2 ]\n[ [ 'tea', 3 ], [ 'cake', 5 ], [ 'soup', 7 ], [ 'bun', 2 ] ]\ntea 3\ncake 5\nsoup 7\nbun 2\nMap(2) { 'juice' => 4, 'pie' => 6 }\n{ tea: 3, cake: 5, soup: 7, bun: 2 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_iterate.js",
     "out": "tea costs 3\ncake costs 5\nsoup costs 7\nbun costs 2\n[ 'tea', 'cake', 'soup', 'bun' ]\n[ 3, 5, 7, 2 ]\n[ [ 'tea', 3 ], [ 'cake', 5 ], [ 'soup', 7 ], [ 'bun', 2 ] ]\ntea 3\ncake 5\nsoup 7\nbun 2\nMap(2) { 'juice' => 4, 'pie' => 6 }\n{ tea: 3, cake: 5, soup: 7, bun: 2 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_json.js": {
   "src": "const coats = new Map([[\"Ada\", \"red scarf\"], [\"Bo\", \"blue hat\"]]);\nconsole.log(JSON.stringify(coats));\nconsole.log(JSON.stringify(Object.fromEntries(coats)));\nconsole.log(JSON.stringify([...coats]));\nconst back = new Map(JSON.parse('[[\"Ada\",\"red scarf\"]]'));\nconsole.log(back.get(\"Ada\"));\n",
   "stdout": "{}\n{\"Ada\":\"red scarf\",\"Bo\":\"blue hat\"}\n[[\"Ada\",\"red scarf\"],[\"Bo\",\"blue hat\"]]\nred scarf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_json.js",
     "out": "{}\n{\"Ada\":\"red scarf\",\"Bo\":\"blue hat\"}\n[[\"Ada\",\"red scarf\"],[\"Bo\",\"blue hat\"]]\nred scarf\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_not_entry.js": {
   "src": "const seats = new Map([1, 2]);\nconsole.log(seats);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch20/map_not_entry.js:1\nconst seats = new Map([1, 2]);\n              ^\n\nTypeError: Iterator value 1 is not an entry object\n    at new Map (<anonymous>)\n    at file:///home/you/javascript-ch20/map_not_entry.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node map_not_entry.js",
     "out": "",
     "err": "file:///home/you/javascript-ch20/map_not_entry.js:1\nconst seats = new Map([1, 2]);\n              ^\n\nTypeError: Iterator value 1 is not an entry object\n    at new Map (<anonymous>)\n    at file:///home/you/javascript-ch20/map_not_entry.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/map_not_entry.js:1\nconst seats = new Map([1, 2]);\n              ^\n\nTypeError: Iterator value 1 is not an entry object\n    at new Map (<anonymous>)\n    at file:///home/you/javascript-ch20/map_not_entry.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node map_not_entry.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/map_not_entry.js:1\nconst seats = new Map([1, 2]);\n              ^\n\nTypeError: Iterator value 1 is not an entry object\n    at new Map (<anonymous>)\n    at file:///home/you/javascript-ch20/map_not_entry.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "map_vs_object.js": {
   "src": "const plain = {};\nconsole.log(\"constructor\" in plain, typeof plain.constructor);\nconst map = new Map();\nconsole.log(map.has(\"constructor\"), map.get(\"constructor\"));\nconst obj = { 1: \"one\" };\nconsole.log(Object.keys(obj), typeof Object.keys(obj)[0]);\nconsole.log([...new Map([[1, \"one\"]]).keys()]);\nconsole.log(Object.keys({ a: 1, b: 2 }).length, new Map([[\"a\", 1], [\"b\", 2]]).size);\n",
   "stdout": "true function\nfalse undefined\n[ '1' ] string\n[ 1 ]\n2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node map_vs_object.js",
     "out": "true function\nfalse undefined\n[ '1' ] string\n[ 1 ]\n2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "next_by_hand.js": {
   "src": "const candies = [\"red\", \"lime\"];\nconst dispenser = candies[Symbol.iterator]();\nconsole.log(dispenser.next());\nconsole.log(dispenser.next());\nconsole.log(dispenser.next());\nconsole.log(dispenser.next());\n",
   "stdout": "{ value: 'red', done: false }\n{ value: 'lime', done: false }\n{ value: undefined, done: true }\n{ value: undefined, done: true }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node next_by_hand.js",
     "out": "{ value: 'red', done: false }\n{ value: 'lime', done: false }\n{ value: undefined, done: true }\n{ value: undefined, done: true }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_gen.js": {
   "src": "function* knock(times) {\n  for (let i = 1; i <= times; i++) {\n    yield `knock ${i}`;\n  }\n}\nconst lines = [...knock(3)];\nconsole.log(lines.join(\", \"));\n",
   "stdout": "knock 1, knock 2, knock 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_gen.js",
     "out": "knock 1, knock 2, knock 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_map.js": {
   "src": "const votes = [\"tea\", \"cake\", \"tea\"];\nconst tally = new Map();\nfor (const v of votes) {\n  tally.set(v, (tally.get(v) ?? 0) + 1);\n}\nfor (const [item, n] of tally) {\n  console.log(`${item}: ${n}`);\n}\n",
   "stdout": "tea: 2\ncake: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_map.js",
     "out": "tea: 2\ncake: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_exhausted.js": {
   "src": "const tickets = new Set([\"A1\", \"B2\", \"C3\"]);\nconst it = tickets.values();\nit.next();\nfor (const t of it) console.log(\"first loop\", t);\nfor (const t of it) console.log(\"second loop\", t);\nconsole.log(\"done\");\n",
   "stdout": "first loop B2\nfirst loop C3\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_exhausted.js",
     "out": "first loop B2\nfirst loop C3\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_helpers.js": {
   "src": "function* naturals() {\n  let n = 1;\n  while (true) yield n++;\n}\nconst picks = naturals()\n  .filter((n) => n % 3 === 0)\n  .map((n) => n * 10)\n  .take(3);\nconsole.log(picks.toArray());\n",
   "stdout": "[ 30, 60, 90 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_helpers.js",
     "out": "[ 30, 60, 90 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_keys.js": {
   "src": "const m = new Map();\nm.set(1, \"a\");\nm.set(\"1\", \"b\");\nm.set(1, \"c\");\nconsole.log(m.size, m.get(1), m.get(\"1\"));\n",
   "stdout": "2 c b\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_keys.js",
     "out": "2 c b\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_return.js": {
   "src": "function* steps() {\n  yield \"standby\";\n  yield \"go\";\n  return \"bow\";\n}\nfor (const s of steps()) console.log(s);\nconsole.log([...steps()].length);\n",
   "stdout": "standby\ngo\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_return.js",
     "out": "standby\ngo\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_set.js": {
   "src": "const s = new Set([NaN, 0]);\ns.add(NaN);\ns.add(-0);\ns.add([7]);\ns.add([7]);\nconsole.log(s.size, s.has(NaN), s.has([7]));\n",
   "stdout": "4 true false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_set.js",
     "out": "4 true false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_spread_obj.js": {
   "src": "const seat = { row: \"A\", number: 7 };\nconsole.log({ ...seat });\nconsole.log([...seat]);\n",
   "stdout": "{ row: 'A', number: 7 }\n",
   "stderr": "file:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_spread_obj.js",
     "out": "{ row: 'A', number: 7 }\n",
     "err": "file:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "{ row: 'A', number: 7 }\nfile:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "{ row: 'A', number: 7 }\n",
    "stderr": "file:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_spread_obj.js",
      "out": "{ row: 'A', number: 7 }\n",
      "err": "file:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "{ row: 'A', number: 7 }\nfile:///home/you/javascript-ch20/predict_spread_obj.js:3\nconsole.log([...seat]);\n                ^\n\nTypeError: seat is not iterable\n    at file:///home/you/javascript-ch20/predict_spread_obj.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "range.js": {
   "src": "function* range(start, end, step = 1) {\n  for (let n = start; n < end; n += step) {\n    yield n;\n  }\n}\nconsole.log([...range(0, 5)]);\nconsole.log([...range(10, 30, 5)]);\nfor (const row of range(1, 4)) console.log(\"row\", row);\nconst [a, b] = range(100, 1000, 50);\nconsole.log(a, b);\n",
   "stdout": "[ 0, 1, 2, 3, 4 ]\n[ 10, 15, 20, 25 ]\nrow 1\nrow 2\nrow 3\n100 150\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node range.js",
     "out": "[ 0, 1, 2, 3, 4 ]\n[ 10, 15, 20, 25 ]\nrow 1\nrow 2\nrow 3\n100 150\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "same_member.js": {
   "src": "const sizeOf = (...values) => new Set(values).size;\nconsole.log(\"NaN === NaN is\", NaN === NaN);\nconsole.log(\"NaN, NaN -> size\", sizeOf(NaN, NaN));\nconsole.log(\"0, -0 -> size\", sizeOf(0, -0));\nconsole.log(\"1, \\\"1\\\" -> size\", sizeOf(1, \"1\"));\nconsole.log(\"[1], [1] -> size\", sizeOf([1], [1]));\nconst seat = [1];\nconsole.log(\"seat, seat -> size\", sizeOf(seat, seat));\nconsole.log(\"{}, {} -> size\", sizeOf({}, {}));\n",
   "stdout": "NaN === NaN is false\nNaN, NaN -> size 1\n0, -0 -> size 1\n1, \"1\" -> size 2\n[1], [1] -> size 2\nseat, seat -> size 1\n{}, {} -> size 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node same_member.js",
     "out": "NaN === NaN is false\nNaN, NaN -> size 1\n0, -0 -> size 1\n1, \"1\" -> size 2\n[1], [1] -> size 2\nseat, seat -> size 1\n{}, {} -> size 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "set_basics.js": {
   "src": "const guests = new Set();\nguests.add(\"Ada\");\nguests.add(\"Bo\").add(\"Ada\");\nconsole.log(guests);\nconsole.log(guests.size);\nconsole.log(guests.has(\"Bo\"), guests.has(\"Cy\"));\nguests.delete(\"Bo\");\nfor (const name of guests) {\n  console.log(\"welcome\", name);\n}\nconst signups = [\"Cy\", \"Ada\", \"Cy\", \"Dee\", \"Ada\"];\nconst unique = [...new Set(signups)];\nconsole.log(unique);\nconsole.log(new Set(\"banana\"));\n",
   "stdout": "Set(2) { 'Ada', 'Bo' }\n2\ntrue false\nwelcome Ada\n[ 'Cy', 'Ada', 'Dee' ]\nSet(3) { 'b', 'a', 'n' }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node set_basics.js",
     "out": "Set(2) { 'Ada', 'Bo' }\n2\ntrue false\nwelcome Ada\n[ 'Cy', 'Ada', 'Dee' ]\nSet(3) { 'b', 'a', 'n' }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "set_method_array.js": {
   "src": "const cast = new Set([\"Ada\", \"Bo\"]);\nconsole.log(cast.union(new Set([\"Dee\"])));\nconsole.log(cast.union([\"Dee\"]));\n",
   "stdout": "Set(3) { 'Ada', 'Bo', 'Dee' }\n",
   "stderr": "file:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node set_method_array.js",
     "out": "Set(3) { 'Ada', 'Bo', 'Dee' }\n",
     "err": "file:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Set(3) { 'Ada', 'Bo', 'Dee' }\nfile:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Set(3) { 'Ada', 'Bo', 'Dee' }\n",
    "stderr": "file:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node set_method_array.js",
      "out": "Set(3) { 'Ada', 'Bo', 'Dee' }\n",
      "err": "file:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Set(3) { 'Ada', 'Bo', 'Dee' }\nfile:///home/you/javascript-ch20/set_method_array.js:3\nconsole.log(cast.union([\"Dee\"]));\n                 ^\n\nTypeError: The .size property is NaN\n    at Set.union (<anonymous>)\n    at file:///home/you/javascript-ch20/set_method_array.js:3:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "set_methods.js": {
   "src": "const cast = new Set([\"Ada\", \"Bo\", \"Cy\"]);\nconst crew = new Set([\"Cy\", \"Dee\"]);\nconsole.log(cast.union(crew));\nconsole.log(cast.intersection(crew));\nconsole.log(cast.difference(crew));\nconsole.log(crew.difference(cast));\nconsole.log(cast.symmetricDifference(crew));\nconsole.log(new Set([\"Ada\"]).isSubsetOf(cast));\nconsole.log(cast.isSupersetOf(new Set([\"Bo\", \"Cy\"])));\nconsole.log(cast.isDisjointFrom(crew));\n",
   "stdout": "Set(4) { 'Ada', 'Bo', 'Cy', 'Dee' }\nSet(1) { 'Cy' }\nSet(2) { 'Ada', 'Bo' }\nSet(1) { 'Dee' }\nSet(3) { 'Ada', 'Bo', 'Dee' }\ntrue\ntrue\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node set_methods.js",
     "out": "Set(4) { 'Ada', 'Bo', 'Cy', 'Dee' }\nSet(1) { 'Cy' }\nSet(2) { 'Ada', 'Bo' }\nSet(1) { 'Dee' }\nSet(3) { 'Ada', 'Bo', 'Dee' }\ntrue\ntrue\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "set_not_iterable.js": {
   "src": "const seats = new Set(5);\nconsole.log(seats);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch20/set_not_iterable.js:1\nconst seats = new Set(5);\n              ^\n\nTypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))\n    at new Set (<anonymous>)\n    at file:///home/you/javascript-ch20/set_not_iterable.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node set_not_iterable.js",
     "out": "",
     "err": "file:///home/you/javascript-ch20/set_not_iterable.js:1\nconst seats = new Set(5);\n              ^\n\nTypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))\n    at new Set (<anonymous>)\n    at file:///home/you/javascript-ch20/set_not_iterable.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/set_not_iterable.js:1\nconst seats = new Set(5);\n              ^\n\nTypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))\n    at new Set (<anonymous>)\n    at file:///home/you/javascript-ch20/set_not_iterable.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node set_not_iterable.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/set_not_iterable.js:1\nconst seats = new Set(5);\n              ^\n\nTypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))\n    at new Set (<anonymous>)\n    at file:///home/you/javascript-ch20/set_not_iterable.js:1:15\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_brackets.js": {
   "src": "const stock = new Map([[\"pens\", 4]]);\nfunction restock(item, n) {\n  stock[item] = (stock.get(item) ?? 0) + n;\n}\nrestock(\"pens\", 10);\nrestock(\"mugs\", 3);\nconsole.log(stock.get(\"pens\"), stock.get(\"mugs\"), stock.size);\n",
   "stdout": "4 undefined 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_brackets.js",
     "out": "4 undefined 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_gen.js": {
   "src": "function* evens(limit) {\n  for (let n = 0; n <= limit; n += 2) {\n    return n;\n  }\n}\nconsole.log([...evens(6)]);\n",
   "stdout": "[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_gen.js",
     "out": "[]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_gen.js": {
   "src": "function* steps() {\n  yield \"standby\";\n  yield \"go\";\n  return \"bow\";\n}\nconst cue = steps();\nfor (let call = 1; call <= 4; call++) {\n  const { value, done } = cue.next();\n  console.log(call, value, done);\n}\n",
   "stdout": "1 standby false\n2 go false\n3 bow true\n4 undefined true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_gen.js",
     "out": "1 standby false\n2 go false\n3 bow true\n4 undefined true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_guests.js": {
   "src": "const guests = new Set();\nfor (const name of [\"Ada\", \"Bo\", \"Ada\", \"Cy\", \"Bo\"]) {\n  const already = guests.has(name);\n  guests.add(name);\n  console.log(name, already, guests.size);\n}\n",
   "stdout": "Ada false 1\nBo false 2\nAda true 2\nCy false 3\nBo true 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_guests.js",
     "out": "Ada false 1\nBo false 2\nAda true 2\nCy false 3\nBo true 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_next.js": {
   "src": "const it = \"Hi!\"[Symbol.iterator]();\nfor (let call = 1; call <= 4; call++) {\n  const { value, done } = it.next();\n  console.log(call, value, done);\n}\n",
   "stdout": "1 H false\n2 i false\n3 ! false\n4 undefined true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_next.js",
     "out": "1 H false\n2 i false\n3 ! false\n4 undefined true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "upsert.js": {
   "src": "const byRole = new Map();\nconst cast = [[\"Ada\", \"lead\"], [\"Bo\", \"chorus\"], [\"Cy\", \"chorus\"]];\nfor (const [name, role] of cast) {\n  byRole.getOrInsert(role, []).push(name);\n}\nconsole.log(byRole);\nconst lengths = new Map();\nconst measure = (word) => {\n  console.log(`measuring ${word}...`);\n  return word.length;\n};\nconsole.log(lengths.getOrInsertComputed(\"curtain\", measure));\nconsole.log(lengths.getOrInsertComputed(\"curtain\", measure));\n",
   "stdout": "Map(2) { 'lead' => [ 'Ada' ], 'chorus' => [ 'Bo', 'Cy' ] }\nmeasuring curtain...\n7\n7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node upsert.js",
     "out": "Map(2) { 'lead' => [ 'Ada' ], 'chorus' => [ 'Bo', 'Cy' ] }\nmeasuring curtain...\n7\n7\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/upsert.js:4\n  byRole.getOrInsert(role, []).push(name);\n         ^\n\nTypeError: byRole.getOrInsert is not a function\n    at file:///home/you/javascript-ch20/upsert.js:4:10\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node upsert.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/upsert.js:4\n  byRole.getOrInsert(role, []).push(name);\n         ^\n\nTypeError: byRole.getOrInsert is not a function\n    at file:///home/you/javascript-ch20/upsert.js:4:10\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "weak_cache.js": {
   "src": "const notes = new WeakMap();\nlet ada = { name: \"Ada\" };\nnotes.set(ada, \"allergic to feathers\");\nconsole.log(notes.get(ada));\nconsole.log(notes.has(ada), notes.has({ name: \"Ada\" }));\nconsole.log(notes.size);\nconsole.log(notes);\nada = null;\nconsole.log(\"Ada left the building\");\n",
   "stdout": "allergic to feathers\ntrue false\nundefined\nWeakMap { <items unknown> }\nAda left the building\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node weak_cache.js",
     "out": "allergic to feathers\ntrue false\nundefined\nWeakMap { <items unknown> }\nAda left the building\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weak_forof.js": {
   "src": "const notes = new WeakMap([[{ name: \"Ada\" }, \"feathers\"]]);\nfor (const entry of notes) {\n  console.log(entry);\n}\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch20/weak_forof.js:2\nfor (const entry of notes) {\n                    ^\n\nTypeError: notes is not iterable\n    at file:///home/you/javascript-ch20/weak_forof.js:2:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node weak_forof.js",
     "out": "",
     "err": "file:///home/you/javascript-ch20/weak_forof.js:2\nfor (const entry of notes) {\n                    ^\n\nTypeError: notes is not iterable\n    at file:///home/you/javascript-ch20/weak_forof.js:2:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/weak_forof.js:2\nfor (const entry of notes) {\n                    ^\n\nTypeError: notes is not iterable\n    at file:///home/you/javascript-ch20/weak_forof.js:2:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node weak_forof.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/weak_forof.js:2\nfor (const entry of notes) {\n                    ^\n\nTypeError: notes is not iterable\n    at file:///home/you/javascript-ch20/weak_forof.js:2:21\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "weak_ok.js": {
   "src": "const notes = new WeakMap();\nconst ada = { name: \"Ada\" };\nnotes.set(ada, \"allergic to feathers\");\nconsole.log(\"stored:\", notes.get(ada));\n",
   "stdout": "stored: allergic to feathers\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node weak_ok.js",
     "out": "stored: allergic to feathers\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weak_string.js": {
   "src": "const notes = new WeakMap();\nnotes.set(\"Ada\", \"allergic to feathers\");\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch20/weak_string.js:2\nnotes.set(\"Ada\", \"allergic to feathers\");\n      ^\n\nTypeError: Invalid value used as weak map key\n    at WeakMap.set (<anonymous>)\n    at file:///home/you/javascript-ch20/weak_string.js:2:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node weak_string.js",
     "out": "",
     "err": "file:///home/you/javascript-ch20/weak_string.js:2\nnotes.set(\"Ada\", \"allergic to feathers\");\n      ^\n\nTypeError: Invalid value used as weak map key\n    at WeakMap.set (<anonymous>)\n    at file:///home/you/javascript-ch20/weak_string.js:2:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/weak_string.js:2\nnotes.set(\"Ada\", \"allergic to feathers\");\n      ^\n\nTypeError: Invalid value used as weak map key\n    at WeakMap.set (<anonymous>)\n    at file:///home/you/javascript-ch20/weak_string.js:2:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node weak_string.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/weak_string.js:2\nnotes.set(\"Ada\", \"allergic to feathers\");\n      ^\n\nTypeError: Invalid value used as weak map key\n    at WeakMap.set (<anonymous>)\n    at file:///home/you/javascript-ch20/weak_string.js:2:7\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "weak_symbol.js": {
   "src": "const notes = new WeakMap();\nconst badge = Symbol(\"badge\");\nnotes.set(badge, \"backstage pass\");\nconsole.log(\"symbol key:\", notes.get(badge));\n",
   "stdout": "symbol key: backstage pass\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node weak_symbol.js",
     "out": "symbol key: backstage pass\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weakset.js": {
   "src": "const seen = new WeakSet();\nfunction greet(guest) {\n  if (seen.has(guest)) return `${guest.name} again!`;\n  seen.add(guest);\n  return `Welcome, ${guest.name}`;\n}\nconst ada = { name: \"Ada\" };\nconsole.log(greet(ada));\nconsole.log(greet(ada));\nconsole.log(greet({ name: \"Ada\" }));\n",
   "stdout": "Welcome, Ada\nAda again!\nWelcome, Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node weakset.js",
     "out": "Welcome, Ada\nAda again!\nWelcome, Ada\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "weakset_number.js": {
   "src": "const seen = new WeakSet();\nseen.add(42);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch20/weakset_number.js:2\nseen.add(42);\n     ^\n\nTypeError: Invalid value used in weak set\n    at WeakSet.add (<anonymous>)\n    at file:///home/you/javascript-ch20/weakset_number.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node weakset_number.js",
     "out": "",
     "err": "file:///home/you/javascript-ch20/weakset_number.js:2\nseen.add(42);\n     ^\n\nTypeError: Invalid value used in weak set\n    at WeakSet.add (<anonymous>)\n    at file:///home/you/javascript-ch20/weakset_number.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch20/weakset_number.js:2\nseen.add(42);\n     ^\n\nTypeError: Invalid value used in weak set\n    at WeakSet.add (<anonymous>)\n    at file:///home/you/javascript-ch20/weakset_number.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node weakset_number.js",
      "out": "",
      "err": "file:///home/you/javascript-ch20/weakset_number.js:2\nseen.add(42);\n     ^\n\nTypeError: Invalid value used in weak set\n    at WeakSet.add (<anonymous>)\n    at file:///home/you/javascript-ch20/weakset_number.js:2:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "word_count.js": {
   "src": "const words = \"the constructor and the actor\".split(\" \");\nconst counts = new Map();\nfor (const w of words) {\n  counts.set(w, (counts.get(w) ?? 0) + 1);\n}\nconsole.log(counts);\nconsole.log(counts.get(\"the\"), counts.size);\n",
   "stdout": "Map(4) { 'the' => 2, 'constructor' => 1, 'and' => 1, 'actor' => 1 }\n2 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node word_count.js",
     "out": "Map(4) { 'the' => 2, 'constructor' => 1, 'and' => 1, 'actor' => 1 }\n2 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "word_count_object.js": {
   "src": "const words = \"the constructor and the actor\".split(\" \");\nconst counts = {};\nfor (const w of words) {\n  counts[w] = (counts[w] || 0) + 1;\n}\nconsole.log(counts);\n",
   "stdout": "{\n  the: 2,\n  constructor: 'function Object() { [native code] }1',\n  and: 1,\n  actor: 1\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node word_count_object.js",
     "out": "{\n  the: 2,\n  constructor: 'function Object() { [native code] }1',\n  and: 1,\n  actor: 1\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "yield_star.js": {
   "src": "function* act1() {\n  yield \"scene 1\";\n  yield \"scene 2\";\n}\nfunction* play() {\n  yield \"overture\";\n  yield* act1();\n  yield* [\"interval\", \"finale\"];\n}\nconsole.log([...play()]);\n",
   "stdout": "[ 'overture', 'scene 1', 'scene 2', 'interval', 'finale' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node yield_star.js",
     "out": "[ 'overture', 'scene 1', 'scene 2', 'interval', 'finale' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
