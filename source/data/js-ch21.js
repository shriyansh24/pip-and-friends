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
  "workdir": "/home/you/javascript-ch21",
  "versionDifferences": [
   "boss_spot.js",
   "freeze_sort.js",
   "lab_frozen.js",
   "lab_limit.js",
   "loop_vs_rec.js",
   "no_base.js",
   "pipe_bad.js",
   "predict_empty.js",
   "predict_overflow.js",
   "reduce_empty.js",
   "road_half.js",
   "same_input.js",
   "skip_base.js",
   "tail.js",
   "with_bad.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_spot.js, freeze_sort.js, lab_frozen.js, lab_limit.js, loop_vs_rec.js, no_base.js, pipe_bad.js, predict_empty.js, predict_overflow.js, reduce_empty.js, road_half.js, same_input.js, skip_base.js, tail.js, with_bad.js."
 },
 "programs": {
  "belt.js": {
   "src": "const pipe = (...fns) => (x) =>\n  fns.reduce((value, fn) => fn(value), x);\n\nconst trim = (s) => s.trim();\nconst lower = (s) => s.toLowerCase();\nconst dashes = (s) => s.replaceAll(\" \", \"-\");\n\nconst slug = pipe(trim, lower, dashes);\nconsole.log(slug(\"  Big Finale \"));\n",
   "stdout": "big-finale\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node belt.js",
     "out": "big-finale\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\nconst add = (a) => (b) => a + b;\nconst times = (a) => (b) => a * b;\n\nconst ticketPrice = pipe(add(2), times(3));\nconsole.log(ticketPrice(10), [1, 2].map(ticketPrice));\n",
   "stdout": "36 [ 9, 12 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "36 [ 9, 12 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "const leaf = { kids: [] };\nconst tree = { kids: [leaf, { kids: [leaf, leaf] }] };\nfunction countLeaves(node) {\n  if (node.kids.length === 0) return 1;\n  return node.kids\n    .map(countLeaves)\n    .reduce((a, b) => a + b, 0);\n}\nconsole.log(countLeaves(tree), countLeaves(leaf));\n",
   "stdout": "3 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "3 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const cues = [3, 1, 2];\nconst sorted = cues.toSorted();\nconst flipped = cues.reverse();\nconst marked = sorted.with(0, 9);\nconsole.log(cues, sorted, marked);\nconsole.log(flipped === cues, marked.reduce((a, b) => a + b));\n",
   "stdout": "[ 2, 1, 3 ] [ 1, 2, 3 ] [ 9, 2, 3 ]\ntrue 14\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "[ 2, 1, 3 ] [ 1, 2, 3 ] [ 9, 2, 3 ]\ntrue 14\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "const props = {\n  name: \"Prop room\",\n  boxes: [{ name: \"Hats\", boxes: [] }, { name: \"Masks\", boxes: [] }],\n};\n\nfunction countBoxes(box) {\n  let count = 1;\n  for (const inner of box.boxes) {\n    count += countBoxes(box);\n  }\n  return count;\n}\n\nconsole.log(countBoxes(props));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch21/boss_spot.js:8\n  for (const inner of box.boxes) {\n                          ^\n\nRangeError: Maximum call stack size exceeded\n    at Array.values (<anonymous>)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:8:27)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "",
     "err": "file:///home/you/javascript-ch21/boss_spot.js:8\n  for (const inner of box.boxes) {\n                          ^\n\nRangeError: Maximum call stack size exceeded\n    at Array.values (<anonymous>)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:8:27)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch21/boss_spot.js:8\n  for (const inner of box.boxes) {\n                          ^\n\nRangeError: Maximum call stack size exceeded\n    at Array.values (<anonymous>)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:8:27)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node boss_spot.js",
      "out": "",
      "err": "file:///home/you/javascript-ch21/boss_spot.js:8\n  for (const inner of box.boxes) {\n                          ^\n\nRangeError: Maximum call stack size exceeded\n    at Array.values (<anonymous>)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:8:27)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n    at countBoxes (file:///home/you/javascript-ch21/boss_spot.js:9:14)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.js": {
   "src": "function walk(area, depth) {\n  let total = area.lights;\n  for (const inner of area.areas) {\n    total += walk(inner, depth + 1);\n  }\n  console.log(area.name, depth, total);\n  return total;\n}\n\nconst loft = { name: \"Loft\", lights: 4, areas: [] };\nconst wing = { name: \"Wing\", lights: 1, areas: [loft] };\nconst pit = { name: \"Pit\", lights: 3, areas: [] };\nwalk({ name: \"Hall\", lights: 2, areas: [wing, pit] }, 0);\n",
   "stdout": "Loft 2 4\nWing 1 5\nPit 1 3\nHall 0 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "Loft 2 4\nWing 1 5\nPit 1 3\nHall 0 10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "clever.js": {
   "src": "const sales = [[\"Fri\", 20], [\"Sat\", 35], [\"Fri\", 25], [\"Sun\", 0]];\nconst best = Object.entries(sales.filter(([, n]) => n).reduce((m, [d, n]) => ({ ...m, [d]: (m[d] ?? 0) + n }), {})).toSorted(([, x], [, y]) => y - x)[0][0];\nconsole.log(best);\n",
   "stdout": "Fri\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node clever.js",
     "out": "Fri\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compose.js": {
   "src": "const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\nconst compose = (...fns) => (x) => fns.reduceRight((value, fn) => fn(value), x);\n\nconst minusFive = (n) => n - 5;\nconst double = (n) => n * 2;\n\nconsole.log(pipe(minusFive, double)(50));\nconsole.log(compose(minusFive, double)(50));\nconsole.log(compose(minusFive, double)(50) === minusFive(double(50)));\n",
   "stdout": "90\n95\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node compose.js",
     "out": "90\n95\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "copy_machine.js": {
   "src": "const show = JSON.stringify;\n\nfunction tryIt(label, job) {\n  const nums = [30, 10, 20];\n  const result = job(nums);\n  console.log(label, \"gives\", show(result), \"· original\", show(nums));\n}\n\ntryIt(\"sort\", (a) => a.sort((x, y) => x - y));\ntryIt(\"toSorted\", (a) => a.toSorted((x, y) => x - y));\ntryIt(\"reverse\", (a) => a.reverse());\ntryIt(\"toReversed\", (a) => a.toReversed());\ntryIt(\"splice\", (a) => a.splice(1, 1));\ntryIt(\"toSpliced\", (a) => a.toSpliced(1, 1));\ntryIt(\"with\", (a) => a.with(0, 99));\n",
   "stdout": "sort gives [10,20,30] · original [10,20,30]\ntoSorted gives [10,20,30] · original [30,10,20]\nreverse gives [20,10,30] · original [20,10,30]\ntoReversed gives [20,10,30] · original [30,10,20]\nsplice gives [10] · original [30,20]\ntoSpliced gives [30,20] · original [30,10,20]\nwith gives [99,10,20] · original [30,10,20]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node copy_machine.js",
     "out": "sort gives [10,20,30] · original [10,20,30]\ntoSorted gives [10,20,30] · original [30,10,20]\nreverse gives [20,10,30] · original [20,10,30]\ntoReversed gives [20,10,30] · original [30,10,20]\nsplice gives [10] · original [30,20]\ntoSpliced gives [30,20] · original [30,10,20]\nwith gives [99,10,20] · original [30,10,20]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "copy_more.js": {
   "src": "const lineup = [\"Ada\", \"Bo\", \"Cy\", \"Di\"];\nconsole.log(lineup.toSpliced(1, 2));\nconsole.log(lineup.toSpliced(1, 0, \"Eve\"));\nconsole.log(lineup.with(-1, \"Zed\"));\nconsole.log(lineup.toReversed());\nconsole.log(lineup);\n",
   "stdout": "[ 'Ada', 'Di' ]\n[ 'Ada', 'Eve', 'Bo', 'Cy', 'Di' ]\n[ 'Ada', 'Bo', 'Cy', 'Zed' ]\n[ 'Di', 'Cy', 'Bo', 'Ada' ]\n[ 'Ada', 'Bo', 'Cy', 'Di' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node copy_more.js",
     "out": "[ 'Ada', 'Di' ]\n[ 'Ada', 'Eve', 'Bo', 'Cy', 'Di' ]\n[ 'Ada', 'Bo', 'Cy', 'Zed' ]\n[ 'Di', 'Cy', 'Bo', 'Ada' ]\n[ 'Ada', 'Bo', 'Cy', 'Di' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "count.js": {
   "src": "const votes = [\"tea\", \"cake\", \"tea\", \"pie\", \"tea\", \"cake\"];\n\nconst tally = votes.reduce((counts, vote) => {\n  counts[vote] = (counts[vote] ?? 0) + 1;\n  return counts;\n}, {});\n\nconsole.log(tally);\nconsole.log(votes.length);\n",
   "stdout": "{ tea: 3, cake: 2, pie: 1 }\n6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node count.js",
     "out": "{ tea: 3, cake: 2, pie: 1 }\n6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "countdown.js": {
   "src": "function countdown(n) {\n  if (n === 0) {\n    console.log(\"Curtain up!\");\n    return;\n  }\n  console.log(n);\n  countdown(n - 1);\n}\n\ncountdown(3);\n",
   "stdout": "3\n2\n1\nCurtain up!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node countdown.js",
     "out": "3\n2\n1\nCurtain up!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "curry.js": {
   "src": "const price = (rate) => (seats) => seats * rate;\n\nconst matinee = price(8);\nconst evening = price(15);\nconsole.log(matinee(2), evening(2));\nconsole.log(price(15)(4));\nconsole.log(price(15));\n\nfunction greet(greeting, name) {\n  return `${greeting}, ${name}!`;\n}\nconst hello = (name) => greet(\"Hello\", name);\nconst hi = greet.bind(null, \"Hi\");\nconsole.log(hello(\"Ada\"), hi(\"Bo\"));\n",
   "stdout": "16 30\n60\n[Function (anonymous)]\nHello, Ada! Hi, Bo!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node curry.js",
     "out": "16 30\n60\n[Function (anonymous)]\nHello, Ada! Hi, Bo!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "debounce.js": {
   "src": "function debounce(fn, wait) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n}\n\nconst save = debounce((text) => console.log(\"Saved:\", text), 100);\nsave(\"H\");\nsave(\"He\");\nsave(\"Hello\");\nconsole.log(\"Typing done\");\n",
   "stdout": "Typing done\nSaved: Hello\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node debounce.js",
     "out": "Typing done\nSaved: Hello\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "declarative.js": {
   "src": "const scores = [40, 95, 70, 85, 60];\nconst passed = scores\n  .filter((s) => s >= 60)\n  .map((s) => s + 5);\nconsole.log(passed);\n",
   "stdout": "[ 100, 75, 90, 65 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node declarative.js",
     "out": "[ 100, 75, 90, 65 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "deep_flatten.js": {
   "src": "function flatten(items) {\n  const out = [];\n  for (const item of items) {\n    if (Array.isArray(item)) {\n      out.push(...flatten(item));\n    } else {\n      out.push(item);\n    }\n  }\n  return out;\n}\n\nconst boxes = [1, [2, [3, [4]], 5], [[6]]];\nconsole.log(flatten(boxes));\nconsole.log(boxes.flat(Infinity));\nconsole.log(boxes.length);\n",
   "stdout": "[ 1, 2, 3, 4, 5, 6 ]\n[ 1, 2, 3, 4, 5, 6 ]\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node deep_flatten.js",
     "out": "[ 1, 2, 3, 4, 5, 6 ]\n[ 1, 2, 3, 4, 5, 6 ]\n3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "effects.js": {
   "src": "const cast = [\"Ada\", \"Bo\"];\n\nfunction addActor(list, name) {\n  list.push(name);\n  return list.length;\n}\n\nfunction withActor(list, name) {\n  return [...list, name];\n}\n\nconsole.log(addActor(cast, \"Cy\"), cast);\nconst bigger = withActor(cast, \"Di\");\nconsole.log(bigger, cast);\n",
   "stdout": "3 [ 'Ada', 'Bo', 'Cy' ]\n[ 'Ada', 'Bo', 'Cy', 'Di' ] [ 'Ada', 'Bo', 'Cy' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node effects.js",
     "out": "3 [ 'Ada', 'Bo', 'Cy' ]\n[ 'Ada', 'Bo', 'Cy', 'Di' ] [ 'Ada', 'Bo', 'Cy' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fact4.js": {
   "src": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nconst answer = factorial(4);\nconsole.log(answer);\n",
   "stdout": "24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fact4.js",
     "out": "24\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "factorial.js": {
   "src": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(4));\nconsole.log(factorial(1));\nconsole.log(factorial(10));\n",
   "stdout": "24\n1\n3628800\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node factorial.js",
     "out": "24\n1\n3628800\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fib.js": {
   "src": "let calls = 0;\nfunction fib(n) {\n  calls++;\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\nconsole.log(fib(25), \"after\", calls, \"calls\");\n\nconst memo = new Map();\nlet memoCalls = 0;\nfunction fastFib(n) {\n  memoCalls++;\n  if (n < 2) return n;\n  if (memo.has(n)) return memo.get(n);\n  const result = fastFib(n - 1) + fastFib(n - 2);\n  memo.set(n, result);\n  return result;\n}\nconsole.log(fastFib(25), \"after\", memoCalls, \"calls\");\n",
   "stdout": "75025 after 242785 calls\n75025 after 49 calls\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fib.js",
     "out": "75025 after 242785 calls\n75025 after 49 calls\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_base.js": {
   "src": "function power(base, exp) {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}\n\nconsole.log(power(2, 5), power(7, 0));\n",
   "stdout": "32 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_base.js",
     "out": "32 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_compose.js": {
   "src": "const compose = (...fns) => (x) => fns.reduceRight((value, fn) => fn(value), x);\nconst cheer = compose((s) => s + \"!\", (s) => s.repeat(2));\nconsole.log(cheer(\"go\"));\n",
   "stdout": "gogo!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_compose.js",
     "out": "gogo!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_from.js": {
   "src": "const tens = Array.from({ length: 4 }, (_, i) => i * 10);\nconsole.log(tens);\n",
   "stdout": "[ 0, 10, 20, 30 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_from.js",
     "out": "[ 0, 10, 20, 30 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_with.js": {
   "src": "const seats = [\"A1\", \"A2\", \"A3\"];\nconst swapped = seats.with(1, \"XX\");\nconst fewer = seats.toSpliced(0, 1);\nconsole.log(swapped, fewer, seats);\n",
   "stdout": "[ 'A1', 'XX', 'A3' ] [ 'A2', 'A3' ] [ 'A1', 'A2', 'A3' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_with.js",
     "out": "[ 'A1', 'XX', 'A3' ] [ 'A2', 'A3' ] [ 'A1', 'A2', 'A3' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fixed.js": {
   "src": "function topThree(scores) {\n  return scores.toSorted((a, b) => b - a).slice(0, 3);\n}\n\nconst signups = [40, 95, 70, 85, 60];\nconsole.log(topThree(signups));\nconsole.log(signups);\n",
   "stdout": "[ 95, 85, 70 ]\n[ 40, 95, 70, 85, 60 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fixed.js",
     "out": "[ 95, 85, 70 ]\n[ 40, 95, 70, 85, 60 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "flat.js": {
   "src": "const rows = [[\"A1\", \"A2\"], [\"B1\"], [[\"C1\", \"C2\"]]];\nconsole.log(rows.flat());\nconsole.log(rows.flat(2));\n\nconst orders = [\"2 tea\", \"1 cake\"];\nconsole.log(orders.map((o) => o.split(\" \")));\nconsole.log(orders.flatMap((o) => o.split(\" \")));\nconsole.log([1, 2, 3].flatMap((n) => (n === 2 ? [] : [n, n])));\n",
   "stdout": "[ 'A1', 'A2', 'B1', [ 'C1', 'C2' ] ]\n[ 'A1', 'A2', 'B1', 'C1', 'C2' ]\n[ [ '2', 'tea' ], [ '1', 'cake' ] ]\n[ '2', 'tea', '1', 'cake' ]\n[ 1, 1, 3, 3 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node flat.js",
     "out": "[ 'A1', 'A2', 'B1', [ 'C1', 'C2' ] ]\n[ 'A1', 'A2', 'B1', 'C1', 'C2' ]\n[ [ '2', 'tea' ], [ '1', 'cake' ] ]\n[ '2', 'tea', '1', 'cake' ]\n[ 1, 1, 3, 3 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "freeze_sort.js": {
   "src": "const cast = Object.freeze([\"Cy\", \"Ada\", \"Bo\"]);\nconsole.log(cast.toSorted());\ncast.sort();\nconsole.log(\"never printed\");\n",
   "stdout": "[ 'Ada', 'Bo', 'Cy' ]\n",
   "stderr": "file:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node freeze_sort.js",
     "out": "[ 'Ada', 'Bo', 'Cy' ]\n",
     "err": "file:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "[ 'Ada', 'Bo', 'Cy' ]\nfile:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "[ 'Ada', 'Bo', 'Cy' ]\n",
    "stderr": "file:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node freeze_sort.js",
      "out": "[ 'Ada', 'Bo', 'Cy' ]\n",
      "err": "file:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "[ 'Ada', 'Bo', 'Cy' ]\nfile:///home/you/javascript-ch21/freeze_sort.js:3\ncast.sort();\n     ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at file:///home/you/javascript-ch21/freeze_sort.js:3:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "from.js": {
   "src": "const seats = Array.from({ length: 5 }, (_, i) => i + 1);\nconsole.log(seats);\n\nconst rows = Array.from({ length: 3 }, (_, i) => \"Row \" + \"ABC\"[i]);\nconsole.log(rows);\n\nconst grid = Array.from({ length: 2 }, () => [\"·\", \"·\", \"·\"]);\ngrid[0][0] = \"X\";\nconsole.log(grid);\n\nconst bad = Array(2).fill([\"·\", \"·\", \"·\"]);\nbad[0][0] = \"X\";\nconsole.log(bad);\n",
   "stdout": "[ 1, 2, 3, 4, 5 ]\n[ 'Row A', 'Row B', 'Row C' ]\n[ [ 'X', '·', '·' ], [ '·', '·', '·' ] ]\n[ [ 'X', '·', '·' ], [ 'X', '·', '·' ] ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node from.js",
     "out": "[ 1, 2, 3, 4, 5 ]\n[ 'Row A', 'Row B', 'Row C' ]\n[ [ 'X', '·', '·' ], [ '·', '·', '·' ] ]\n[ [ 'X', '·', '·' ], [ 'X', '·', '·' ] ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hidden.js": {
   "src": "function topThree(scores) {\n  return scores.sort((a, b) => b - a).slice(0, 3);\n}\n\nconst signups = [40, 95, 70, 85, 60];\nconsole.log(topThree(signups));\nconsole.log(signups);\n",
   "stdout": "[ 95, 85, 70 ]\n[ 95, 85, 70, 60, 40 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hidden.js",
     "out": "[ 95, 85, 70 ]\n[ 95, 85, 70, 60, 40 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hof.js": {
   "src": "function twice(fn, value) {\n  return fn(fn(value));\n}\n\nfunction makeAdder(amount) {\n  return (n) => n + amount;\n}\n\nconst addTen = makeAdder(10);\nconsole.log(twice(addTen, 1));\nconsole.log([1, 2, 3].map(addTen));\nconsole.log(twice((s) => s + \"!\", \"Go\"));\n",
   "stdout": "21\n[ 11, 12, 13 ]\nGo!!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node hof.js",
     "out": "21\n[ 11, 12, 13 ]\nGo!!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "imperative.js": {
   "src": "const scores = [40, 95, 70, 85, 60];\nconst passed = [];\nfor (const s of scores) {\n  if (s >= 60) {\n    passed.push(s + 5);\n  }\n}\nconsole.log(passed);\n",
   "stdout": "[ 100, 75, 90, 65 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node imperative.js",
     "out": "[ 100, 75, 90, 65 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "impure.js": {
   "src": "let discount = 0;\n\nfunction price(seats) {\n  discount = discount + 5;\n  return seats * 20 - discount;\n}\n\nconsole.log(price(2));\nconsole.log(price(2));\nconsole.log(price(2));\n",
   "stdout": "35\n30\n25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node impure.js",
     "out": "35\n30\n25\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "index.js": {
   "src": "const actors = [\n  { id: 7, name: \"Ada\", role: \"lead\" },\n  { id: 3, name: \"Bo\", role: \"chorus\" },\n  { id: 9, name: \"Cy\", role: \"chorus\" },\n];\n\nconst byId = actors.reduce((index, actor) => {\n  index[actor.id] = actor.name;\n  return index;\n}, {});\nconsole.log(byId, byId[9]);\n\nconst byRole = actors.reduce((groups, actor) => {\n  if (!groups[actor.role]) groups[actor.role] = [];\n  groups[actor.role].push(actor.name);\n  return groups;\n}, {});\nconsole.log(byRole);\nconsole.log(Object.groupBy(actors, (actor) => actor.role).chorus.length);\n",
   "stdout": "{ '3': 'Bo', '7': 'Ada', '9': 'Cy' } Cy\n{ lead: [ 'Ada' ], chorus: [ 'Bo', 'Cy' ] }\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node index.js",
     "out": "{ '3': 'Bo', '7': 'Ada', '9': 'Cy' } Cy\n{ lead: [ 'Ada' ], chorus: [ 'Bo', 'Cy' ] }\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "json_walk.js": {
   "src": "const text = '{\"show\":\"Hamlet\",\"cast\":[{\"name\":\"Ada\",\"props\":[\"sword\"]},{\"name\":\"Bo\"}],\"crew\":{\"lights\":{\"name\":\"Cy\"}}}';\nconst data = JSON.parse(text);\n\nfunction findNames(value, found) {\n  if (Array.isArray(value)) {\n    for (const item of value) findNames(item, found);\n  } else if (typeof value === \"object\" && value !== null) {\n    for (const [key, inner] of Object.entries(value)) {\n      if (key === \"name\") found.push(inner);\n      else findNames(inner, found);\n    }\n  }\n  return found;\n}\n\nconsole.log(findNames(data, []));\n",
   "stdout": "[ 'Ada', 'Bo', 'Cy' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node json_walk.js",
     "out": "[ 'Ada', 'Bo', 'Cy' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lab_frozen.js": {
   "src": "function topThree(scores) {\n  return scores.sort((a, b) => b - a).slice(0, 3);\n}\n\nconst signups = [40, 95, 70, 85, 60];\nObject.freeze(signups);\nconsole.log(topThree(signups));\nconsole.log(signups);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch21/lab_frozen.js:2\n  return scores.sort((a, b) => b - a).slice(0, 3);\n                ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at topThree (file:///home/you/javascript-ch21/lab_frozen.js:2:17)\n    at file:///home/you/javascript-ch21/lab_frozen.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node lab_frozen.js",
     "out": "",
     "err": "file:///home/you/javascript-ch21/lab_frozen.js:2\n  return scores.sort((a, b) => b - a).slice(0, 3);\n                ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at topThree (file:///home/you/javascript-ch21/lab_frozen.js:2:17)\n    at file:///home/you/javascript-ch21/lab_frozen.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch21/lab_frozen.js:2\n  return scores.sort((a, b) => b - a).slice(0, 3);\n                ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at topThree (file:///home/you/javascript-ch21/lab_frozen.js:2:17)\n    at file:///home/you/javascript-ch21/lab_frozen.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node lab_frozen.js",
      "out": "",
      "err": "file:///home/you/javascript-ch21/lab_frozen.js:2\n  return scores.sort((a, b) => b - a).slice(0, 3);\n                ^\n\nTypeError: Cannot assign to read only property '0' of object '[object Array]'\n    at Array.sort (<anonymous>)\n    at topThree (file:///home/you/javascript-ch21/lab_frozen.js:2:17)\n    at file:///home/you/javascript-ch21/lab_frozen.js:7:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "lab_limit.js": {
   "src": "Error.stackTraceLimit = 3;\nfunction trays(n) {\n  return 1 + trays(n - 1);\n}\n\nconsole.log(\"Stacking trays...\");\nconsole.log(trays(3));\n",
   "stdout": "Stacking trays...\n",
   "stderr": "file:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node lab_limit.js",
     "out": "Stacking trays...\n",
     "err": "file:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Stacking trays...\nfile:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Stacking trays...\n",
    "stderr": "file:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node lab_limit.js",
      "out": "Stacking trays...\n",
      "err": "file:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Stacking trays...\nfile:///home/you/javascript-ch21/lab_limit.js:3\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:3)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n    at trays (file:///home/you/javascript-ch21/lab_limit.js:3:14)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "lab_noreturn.js": {
   "src": "function factorial(n, depth) {\n  const pad = \"  \".repeat(depth);\n  console.log(`${pad}factorial(${n}) starts`);\n  if (n <= 1) {\n    console.log(`${pad}factorial(${n}) returns 1`);\n    return 1;\n  }\n  const result = n * factorial(n - 1, depth + 1);\n  console.log(`${pad}factorial(${n}) returns ${result}`);\n}\n\nfactorial(4, 0);\n",
   "stdout": "factorial(4) starts\n  factorial(3) starts\n    factorial(2) starts\n      factorial(1) starts\n      factorial(1) returns 1\n    factorial(2) returns 2\n  factorial(3) returns NaN\nfactorial(4) returns NaN\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lab_noreturn.js",
     "out": "factorial(4) starts\n  factorial(3) starts\n    factorial(2) starts\n      factorial(1) starts\n      factorial(1) returns 1\n    factorial(2) returns 2\n  factorial(3) returns NaN\nfactorial(4) returns NaN\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "loop_vs_rec.js": {
   "src": "function sumLoop(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) total += i;\n  return total;\n}\n\nfunction sumRec(n) {\n  if (n === 0) return 0;\n  return n + sumRec(n - 1);\n}\n\nconsole.log(sumLoop(100), sumRec(100));\nconsole.log(sumLoop(100000));\nconsole.log(sumRec(100000));\n",
   "stdout": "5050 5050\n5000050000\n",
   "stderr": "file:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node loop_vs_rec.js",
     "out": "5050 5050\n5000050000\n",
     "err": "file:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "5050 5050\n5000050000\nfile:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "5050 5050\n5000050000\n",
    "stderr": "file:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node loop_vs_rec.js",
      "out": "5050 5050\n5000050000\n",
      "err": "file:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "5050 5050\n5000050000\nfile:///home/you/javascript-ch21/loop_vs_rec.js:7\nfunction sumRec(n) {\n               ^\n\nRangeError: Maximum call stack size exceeded\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:7:16)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n    at sumRec (file:///home/you/javascript-ch21/loop_vs_rec.js:9:14)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "memoize.js": {
   "src": "function memoize(fn) {\n  const cache = new Map();\n  return (n) => {\n    if (!cache.has(n)) cache.set(n, fn(n));\n    return cache.get(n);\n  };\n}\n\nconst slowSquare = (n) => {\n  console.log(\"  working out\", n);\n  return n * n;\n};\nconst square = memoize(slowSquare);\nconsole.log(square(9));\nconsole.log(square(9));\nconsole.log(square(4));\n",
   "stdout": "  working out 9\n81\n81\n  working out 4\n16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node memoize.js",
     "out": "  working out 9\n81\n81\n  working out 4\n16\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "no_base.js": {
   "src": "function trays(n) {\n  return 1 + trays(n - 1);\n}\n\nconsole.log(\"Stacking trays...\");\nconsole.log(trays(3));\n",
   "stdout": "Stacking trays...\n",
   "stderr": "file:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node no_base.js",
     "out": "Stacking trays...\n",
     "err": "file:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Stacking trays...\nfile:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Stacking trays...\n",
    "stderr": "file:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node no_base.js",
      "out": "Stacking trays...\n",
      "err": "file:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Stacking trays...\nfile:///home/you/javascript-ch21/no_base.js:2\n  return 1 + trays(n - 1);\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:3)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n    at trays (file:///home/you/javascript-ch21/no_base.js:2:14)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "no_return.js": {
   "src": "function factorial(n) {\n  if (n <= 1) return 1;\n  n * factorial(n - 1);\n}\n\nconsole.log(factorial(4));\nconsole.log(factorial(1));\n",
   "stdout": "undefined\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node no_return.js",
     "out": "undefined\n1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_deep.js": {
   "src": "function deepSum(items) {\n  let total = 0;\n  for (const item of items) {\n    total += Array.isArray(item) ? deepSum(item) : item;\n  }\n  return total;\n}\nconsole.log(deepSum([1, [2, [3]], 4]));\n",
   "stdout": "10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_deep.js",
     "out": "10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_index.js": {
   "src": "const props = [{ name: \"mask\", qty: 2 }, { name: \"cape\", qty: 1 }];\nconst stock = props.reduce((index, p) => {\n  index[p.name] = p.qty;\n  return index;\n}, {});\nconsole.log(stock);\n",
   "stdout": "{ mask: 2, cape: 1 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_index.js",
     "out": "{ mask: 2, cape: 1 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_pipe.js": {
   "src": "const prices = [12, 5, 30, 8];\nconst cheapestTwo = prices\n  .filter((p) => p >= 8)\n  .map((p) => p * 2)\n  .toSorted((a, b) => a - b)\n  .slice(0, 2);\nconsole.log(cheapestTwo);\n",
   "stdout": "[ 16, 24 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_pipe.js",
     "out": "[ 16, 24 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_pipe_alt1.js": {
   "src": "const prices = [12, 5, 30, 8];\nconst cheapestTwo = prices\n  .filter((p) => p >= 8)\n  .toSorted((a, b) => a - b)\n  .map((p) => p * 2)\n  .slice(0, 2);\nconsole.log(cheapestTwo);\n",
   "stdout": "[ 16, 24 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_pipe_alt1.js",
     "out": "[ 16, 24 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_pipe_alt2.js": {
   "src": "const prices = [12, 5, 30, 8];\nconst cheapestTwo = prices\n  .toSorted((a, b) => a - b)\n  .filter((p) => p >= 8)\n  .map((p) => p * 2)\n  .slice(0, 2);\nconsole.log(cheapestTwo);\n",
   "stdout": "[ 16, 24 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_pipe_alt2.js",
     "out": "[ 16, 24 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pipe_bad.js": {
   "src": "const pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\nconst lower = (s) => s.toLowerCase();\n\nconst slug = pipe(lower, \"trim\");\nconsole.log(slug(\"HELLO \"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch21/pipe_bad.js:1\nconst pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\n                                                          ^\n\nTypeError: fn is not a function\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:59\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:37\n    at file:///home/you/javascript-ch21/pipe_bad.js:5:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node pipe_bad.js",
     "out": "",
     "err": "file:///home/you/javascript-ch21/pipe_bad.js:1\nconst pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\n                                                          ^\n\nTypeError: fn is not a function\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:59\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:37\n    at file:///home/you/javascript-ch21/pipe_bad.js:5:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch21/pipe_bad.js:1\nconst pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\n                                                          ^\n\nTypeError: fn is not a function\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:59\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:37\n    at file:///home/you/javascript-ch21/pipe_bad.js:5:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node pipe_bad.js",
      "out": "",
      "err": "file:///home/you/javascript-ch21/pipe_bad.js:1\nconst pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\n                                                          ^\n\nTypeError: fn is not a function\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:59\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/pipe_bad.js:1:37\n    at file:///home/you/javascript-ch21/pipe_bad.js:5:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "pipeline.js": {
   "src": "const trim = (s) => s.trim();\nconst lower = (s) => s.toLowerCase();\nconst dashes = (s) => s.replaceAll(\" \", \"-\");\n\nconst raw = \"  Opening Night Gala \";\nconsole.log(dashes(lower(trim(raw))));\n\nconst pipe = (...fns) => (x) => fns.reduce((value, fn) => fn(value), x);\nconst slug = pipe(trim, lower, dashes);\nconsole.log(slug(raw));\nconsole.log(slug(\" Closing  Party\"));\n",
   "stdout": "opening-night-gala\nopening-night-gala\nclosing--party\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pipeline.js",
     "out": "opening-night-gala\nopening-night-gala\nclosing--party\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_copy.js": {
   "src": "const queue = [\"Cy\", \"Ada\", \"Bo\"];\nconst a = queue.toSorted();\nconst b = queue.reverse();\nconsole.log(a);\nconsole.log(queue);\nconsole.log(b === queue);\n",
   "stdout": "[ 'Ada', 'Bo', 'Cy' ]\n[ 'Bo', 'Ada', 'Cy' ]\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_copy.js",
     "out": "[ 'Ada', 'Bo', 'Cy' ]\n[ 'Bo', 'Ada', 'Cy' ]\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_curry.js": {
   "src": "const tag = (color) => (size) => (text) => `[${color} ${size}] ${text}`;\nconst red = tag(\"red\");\nconst bigRed = red(\"big\");\nconsole.log(bigRed(\"SALE\"));\nconsole.log(red(\"small\")(\"hi\"));\nconsole.log(typeof red(\"tiny\"));\n",
   "stdout": "[red big] SALE\n[red small] hi\nfunction\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_curry.js",
     "out": "[red big] SALE\n[red small] hi\nfunction\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_echo.js": {
   "src": "function echo(word) {\n  if (word.length === 0) return \"\";\n  return word[0] + echo(word.slice(1)) + word[0];\n}\n\nconsole.log(echo(\"abc\"));\nconsole.log(echo(\"x\"));\n",
   "stdout": "abccba\nxx\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_echo.js",
     "out": "abccba\nxx\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_effect.js": {
   "src": "let calls = 0;\n\nfunction double(n) {\n  calls++;\n  return n * 2;\n}\n\nconst a = double(4);\nconst b = double(4);\nconsole.log(a === b, calls);\n",
   "stdout": "true 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_effect.js",
     "out": "true 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_empty.js": {
   "src": "const late = [];\nconst minutes = late.reduce((a, b) => a + b, 0);\nconsole.log(\"minutes:\", minutes);\nconst longest = late.reduce((a, b) => Math.max(a, b));\nconsole.log(\"longest:\", longest);\n",
   "stdout": "minutes: 0\n",
   "stderr": "file:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_empty.js",
     "out": "minutes: 0\n",
     "err": "file:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "minutes: 0\nfile:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "minutes: 0\n",
    "stderr": "file:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_empty.js",
      "out": "minutes: 0\n",
      "err": "file:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "minutes: 0\nfile:///home/you/javascript-ch21/predict_empty.js:4\nconst longest = late.reduce((a, b) => Math.max(a, b));\n                     ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at file:///home/you/javascript-ch21/predict_empty.js:4:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "predict_flat.js": {
   "src": "const crates = [[1, [2]], [3]];\nconsole.log(crates.flat());\nconsole.log(crates.flatMap((c) => c.length));\n",
   "stdout": "[ 1, [ 2 ], 3 ]\n[ 2, 1 ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_flat.js",
     "out": "[ 1, [ 2 ], 3 ]\n[ 2, 1 ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_overflow.js": {
   "src": "function ping(n) {\n  if (n === 10) return \"done\";\n  return ping(n + 3);\n}\n\nconsole.log(ping(1));\nconsole.log(ping(0));\n",
   "stdout": "done\n",
   "stderr": "file:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node predict_overflow.js",
     "out": "done\n",
     "err": "file:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "done\nfile:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "done\n",
    "stderr": "file:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node predict_overflow.js",
      "out": "done\n",
      "err": "file:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "done\nfile:///home/you/javascript-ch21/predict_overflow.js:2\n  if (n === 10) return \"done\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:2:3)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n    at ping (file:///home/you/javascript-ch21/predict_overflow.js:3:10)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "pure.js": {
   "src": "function price(seats, discount) {\n  return seats * 20 - discount;\n}\n\nconsole.log(price(2, 5));\nconsole.log(price(2, 5));\nconsole.log(price(2, 10));\n",
   "stdout": "35\n35\n30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pure.js",
     "out": "35\n35\n30\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "readable.js": {
   "src": "const sales = [[\"Fri\", 20], [\"Sat\", 35], [\"Fri\", 25], [\"Sun\", 0]];\n\nconst sold = sales.filter(([day, amount]) => amount > 0);\nconst totals = {};\nfor (const [day, amount] of sold) {\n  totals[day] = (totals[day] ?? 0) + amount;\n}\nconst ranked = Object.entries(totals).toSorted((a, b) => b[1] - a[1]);\nconsole.log(totals);\nconsole.log(ranked[0][0]);\n",
   "stdout": "{ Fri: 45, Sat: 35 }\nFri\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node readable.js",
     "out": "{ Fri: 45, Sat: 35 }\nFri\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "reduce_empty.js": {
   "src": "function total(prices) {\n  return prices.reduce((sum, p) => sum + p);\n}\n\nconsole.log(total([5, 10]));\nconsole.log(total([]));\n",
   "stdout": "15\n",
   "stderr": "file:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node reduce_empty.js",
     "out": "15\n",
     "err": "file:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "15\nfile:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "15\n",
    "stderr": "file:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node reduce_empty.js",
      "out": "15\n",
      "err": "file:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "15\nfile:///home/you/javascript-ch21/reduce_empty.js:2\n  return prices.reduce((sum, p) => sum + p);\n                ^\n\nTypeError: Reduce of empty array with no initial value\n    at Array.reduce (<anonymous>)\n    at total (file:///home/you/javascript-ch21/reduce_empty.js:2:17)\n    at file:///home/you/javascript-ch21/reduce_empty.js:6:13\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "reduce_safe.js": {
   "src": "function total(prices) {\n  return prices.reduce((sum, p) => sum + p, 0);\n}\n\nconsole.log(total([5, 10]));\nconsole.log(total([]));\nconsole.log([42].reduce((sum, p) => sum + p));\n",
   "stdout": "15\n0\n42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node reduce_safe.js",
     "out": "15\n0\n42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_half.js": {
   "src": "function countdown(n) {\n  if (n === 0) return \"Lift off!\";\n  return countdown(n - 1);\n}\n\nconsole.log(countdown(0.5));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch21/road_half.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/road_half.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node road_half.js",
     "out": "",
     "err": "file:///home/you/javascript-ch21/road_half.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/road_half.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch21/road_half.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/road_half.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node road_half.js",
      "out": "",
      "err": "file:///home/you/javascript-ch21/road_half.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/road_half.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/road_half.js:3:10)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_two.js": {
   "src": "function countdown(n) {\n  if (n === 0) return \"Lift off!\";\n  return countdown(n - 1);\n}\n\nconsole.log(countdown(2));\n",
   "stdout": "Lift off!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_two.js",
     "out": "Lift off!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_zero.js": {
   "src": "function countdown(n) {\n  if (n === 0) return \"Lift off!\";\n  return countdown(n - 1);\n}\n\nconsole.log(countdown(0));\n",
   "stdout": "Lift off!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_zero.js",
     "out": "Lift off!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "same_fixed.js": {
   "src": "function total(list) {\n  if (list.length === 0) return 0;\n  return list[0] + total(list.slice(1));\n}\n\nconsole.log(total([]));\nconsole.log(total([4, 5, 6]));\n",
   "stdout": "0\n15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node same_fixed.js",
     "out": "0\n15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "same_input.js": {
   "src": "function total(list) {\n  if (list.length === 0) return 0;\n  return list[0] + total(list);\n}\n\nconsole.log(total([]));\nconsole.log(total([4, 5, 6]));\n",
   "stdout": "0\n",
   "stderr": "file:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node same_input.js",
     "out": "0\n",
     "err": "file:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "0\nfile:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "0\n",
    "stderr": "file:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node same_input.js",
      "out": "0\n",
      "err": "file:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "0\nfile:///home/you/javascript-ch21/same_input.js:2\n  if (list.length === 0) return 0;\n           ^\n\nRangeError: Maximum call stack size exceeded\n    at total (file:///home/you/javascript-ch21/same_input.js:2:12)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n    at total (file:///home/you/javascript-ch21/same_input.js:3:20)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "skip_base.js": {
   "src": "function countdown(n) {\n  if (n === 0) return \"Lift off!\";\n  return countdown(n - 1);\n}\n\nconsole.log(countdown(3));\nconsole.log(countdown(2.5));\n",
   "stdout": "Lift off!\n",
   "stderr": "file:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node skip_base.js",
     "out": "Lift off!\n",
     "err": "file:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Lift off!\nfile:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Lift off!\n",
    "stderr": "file:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node skip_base.js",
      "out": "Lift off!\n",
      "err": "file:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Lift off!\nfile:///home/you/javascript-ch21/skip_base.js:2\n  if (n === 0) return \"Lift off!\";\n  ^\n\nRangeError: Maximum call stack size exceeded\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:2:3)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n    at countdown (file:///home/you/javascript-ch21/skip_base.js:3:10)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "spot_return.js": {
   "src": "function digitSum(n) {\n  if (n < 10) return n;\n  const last = n % 10;\n  last + digitSum(Math.floor(n / 10));\n}\n\nconsole.log(digitSum(472));\n",
   "stdout": "undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_return.js",
     "out": "undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_sort.js": {
   "src": "function cheapest(prices) {\n  const sorted = prices.sort((a, b) => a - b);\n  return sorted[0];\n}\n\nconst menu = [9, 4, 7];\nconsole.log(cheapest(menu));\nconsole.log(menu[0], \"should still be 9\");\n",
   "stdout": "4\n4 should still be 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_sort.js",
     "out": "4\n4 should still be 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "staircase.js": {
   "src": "function factorial(n, depth) {\n  const pad = \"  \".repeat(depth);\n  console.log(`${pad}factorial(${n}) starts`);\n  if (n <= 1) {\n    console.log(`${pad}factorial(${n}) returns 1`);\n    return 1;\n  }\n  const result = n * factorial(n - 1, depth + 1);\n  console.log(`${pad}factorial(${n}) returns ${result}`);\n  return result;\n}\n\nfactorial(4, 0);\n",
   "stdout": "factorial(4) starts\n  factorial(3) starts\n    factorial(2) starts\n      factorial(1) starts\n      factorial(1) returns 1\n    factorial(2) returns 2\n  factorial(3) returns 6\nfactorial(4) returns 24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node staircase.js",
     "out": "factorial(4) starts\n  factorial(3) starts\n    factorial(2) starts\n      factorial(1) starts\n      factorial(1) returns 1\n    factorial(2) returns 2\n  factorial(3) returns 6\nfactorial(4) returns 24\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "strings.js": {
   "src": "function reverse(text) {\n  if (text === \"\") return \"\";\n  return reverse(text.slice(1)) + text[0];\n}\n\nfunction isPalindrome(word) {\n  if (word.length <= 1) return true;\n  if (word[0] !== word.at(-1)) return false;\n  return isPalindrome(word.slice(1, -1));\n}\n\nconsole.log(reverse(\"stage\"));\nconsole.log(isPalindrome(\"level\"), isPalindrome(\"kit\"));\n",
   "stdout": "egats\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node strings.js",
     "out": "egats\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tail.js": {
   "src": "function sumTo(n, total = 0) {\n  if (n === 0) return total;\n  return sumTo(n - 1, total + n);\n}\n\nconsole.log(sumTo(1000));\nconsole.log(sumTo(100000));\n",
   "stdout": "500500\n",
   "stderr": "file:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node tail.js",
     "out": "500500\n",
     "err": "file:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "500500\nfile:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "500500\n",
    "stderr": "file:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node tail.js",
      "out": "500500\n",
      "err": "file:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "500500\nfile:///home/you/javascript-ch21/tail.js:1\nfunction sumTo(n, total = 0) {\n              ^\n\nRangeError: Maximum call stack size exceeded\n    at sumTo (file:///home/you/javascript-ch21/tail.js:1:15)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n    at sumTo (file:///home/you/javascript-ch21/tail.js:3:10)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "trace_sum.js": {
   "src": "function sumTo(n, depth) {\n  if (n === 0) {\n    console.log(n, depth, 0);\n    return 0;\n  }\n  const result = n + sumTo(n - 1, depth + 1);\n  console.log(n, depth, result);\n  return result;\n}\n\nsumTo(3, 1);\n",
   "stdout": "0 4 0\n1 3 1\n2 2 3\n3 1 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_sum.js",
     "out": "0 4 0\n1 3 1\n2 2 3\n3 1 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_tally.js": {
   "src": "const votes = [\"tea\", \"cake\", \"tea\", \"tea\", \"cake\"];\n\nvotes.reduce((counts, vote) => {\n  counts[vote] = (counts[vote] ?? 0) + 1;\n  console.log(vote, counts.tea ?? 0, counts.cake ?? 0);\n  return counts;\n}, {});\n",
   "stdout": "tea 1 0\ncake 1 1\ntea 2 1\ntea 3 1\ncake 3 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_tally.js",
     "out": "tea 1 0\ncake 1 1\ntea 2 1\ntea 3 1\ncake 3 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tree.js": {
   "src": "const stage = {\n  name: \"Main stage\", lights: 4, areas: [\n    { name: \"Left wing\", lights: 2, areas: [] },\n    { name: \"Right wing\", lights: 3, areas: [\n      { name: \"Balcony\", lights: 1, areas: [] },\n    ] },\n  ],\n};\n\nfunction countLights(area) {\n  let total = area.lights;\n  for (const inner of area.areas) {\n    total += countLights(inner);\n  }\n  return total;\n}\n\nconsole.log(countLights(stage));\nconsole.log(countLights(stage.areas[1]));\n",
   "stdout": "10\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tree.js",
     "out": "10\n4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tree_small.js": {
   "src": "function countLights(area) {\n  let total = area.lights;\n  for (const inner of area.areas) {\n    total += countLights(inner);\n  }\n  return total;\n}\n\nconst balcony = { lights: 1, areas: [] };\nconst wing = { lights: 3, areas: [balcony] };\nconsole.log(countLights(wing));\n",
   "stdout": "4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tree_small.js",
     "out": "4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "update.js": {
   "src": "const show = { title: \"Hamlet\", cast: [\"Ada\"] };\nconst renamed = { ...show, title: \"Macbeth\" };\nconst bigger = { ...show, cast: [...show.cast, \"Bo\"] };\n\nconsole.log(show);\nconsole.log(renamed);\nconsole.log(bigger);\nconsole.log(renamed.cast === show.cast, bigger.cast === show.cast);\n",
   "stdout": "{ title: 'Hamlet', cast: [ 'Ada' ] }\n{ title: 'Macbeth', cast: [ 'Ada' ] }\n{ title: 'Hamlet', cast: [ 'Ada', 'Bo' ] }\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node update.js",
     "out": "{ title: 'Hamlet', cast: [ 'Ada' ] }\n{ title: 'Macbeth', cast: [ 'Ada' ] }\n{ title: 'Hamlet', cast: [ 'Ada', 'Bo' ] }\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "with_bad.js": {
   "src": "const lineup = [\"Ada\", \"Bo\", \"Cy\"];\nconst fixed = lineup.with(3, \"Di\");\nconsole.log(fixed);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch21/with_bad.js:2\nconst fixed = lineup.with(3, \"Di\");\n                         ^\n\nRangeError: Invalid index : 3\n    at Array.with (<anonymous>)\n    at file:///home/you/javascript-ch21/with_bad.js:2:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node with_bad.js",
     "out": "",
     "err": "file:///home/you/javascript-ch21/with_bad.js:2\nconst fixed = lineup.with(3, \"Di\");\n                         ^\n\nRangeError: Invalid index : 3\n    at Array.with (<anonymous>)\n    at file:///home/you/javascript-ch21/with_bad.js:2:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch21/with_bad.js:2\nconst fixed = lineup.with(3, \"Di\");\n                         ^\n\nRangeError: Invalid index : 3\n    at Array.with (<anonymous>)\n    at file:///home/you/javascript-ch21/with_bad.js:2:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node with_bad.js",
      "out": "",
      "err": "file:///home/you/javascript-ch21/with_bad.js:2\nconst fixed = lineup.with(3, \"Di\");\n                         ^\n\nRangeError: Invalid index : 3\n    at Array.with (<anonymous>)\n    at file:///home/you/javascript-ch21/with_bad.js:2:26\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
