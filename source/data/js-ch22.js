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
  "workdir": "/home/you/javascript-ch22",
  "versionDifferences": [
   "bad_class.js",
   "bad_group.js",
   "bad_regexp.js",
   "escape.js",
   "replaceall_bad.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): bad_class.js, bad_group.js, bad_regexp.js, escape.js, replaceall_bad.js."
 },
 "programs": {
  "alt.js": {
   "src": "console.log(\"I like cats and dogs\".match(/cat|dog/g));\nconsole.log(/^(Mon|Tues)day$/.test(\"Tuesday\"), /^(Mon|Tues)day$/.test(\"Wednesday\"));\nconsole.log(\"Tuesday\".match(/^(?:Mon|Tues)day$/).length);\n\nconst script = \"and the the lights go go down\";\nconsole.log(script.match(/\\b(\\w+) \\1\\b/g));\nconsole.log(script.replace(/\\b(\\w+) \\1\\b/g, \"$1\"));\n",
   "stdout": "[ 'cat', 'dog' ]\ntrue false\n1\n[ 'the the', 'go go' ]\nand the lights go down\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node alt.js",
     "out": "[ 'cat', 'dog' ]\ntrue false\n1\n[ 'the the', 'go go' ]\nand the lights go down\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "anchors.js": {
   "src": "const onlyDigits = /^\\d+$/;\nconsole.log(onlyDigits.test(\"123\"), onlyDigits.test(\"12a\"), onlyDigits.test(\"a123\"));\nconsole.log(/\\d+/.test(\"12a\"));\n\nconst words = \"cat category bobcat cat.\";\nconsole.log(words.match(/cat/g).length);\nconsole.log(words.match(/\\bcat\\b/g).length);\nconsole.log(words.replace(/\\bcat\\b/g, \"DOG\"));\n",
   "stdout": "true false false\ntrue\n4\n2\nDOG category bobcat DOG.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node anchors.js",
     "out": "true false false\ntrue\n4\n2\nDOG category bobcat DOG.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bad_class.js": {
   "src": "const seat = new RegExp(\"^[A-Z\\\\d{1,3}$\");\nconsole.log(seat.test(\"B12\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch22/bad_class.js:1\nconst seat = new RegExp(\"^[A-Z\\\\d{1,3}$\");\n             ^\n\nSyntaxError: Invalid regular expression: /^[A-Z\\d{1,3}$/: Unterminated character class\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_class.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node bad_class.js",
     "out": "",
     "err": "file:///home/you/javascript-ch22/bad_class.js:1\nconst seat = new RegExp(\"^[A-Z\\\\d{1,3}$\");\n             ^\n\nSyntaxError: Invalid regular expression: /^[A-Z\\d{1,3}$/: Unterminated character class\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_class.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch22/bad_class.js:1\nconst seat = new RegExp(\"^[A-Z\\\\d{1,3}$\");\n             ^\n\nSyntaxError: Invalid regular expression: /^[A-Z\\d{1,3}$/: Unterminated character class\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_class.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node bad_class.js",
      "out": "",
      "err": "file:///home/you/javascript-ch22/bad_class.js:1\nconst seat = new RegExp(\"^[A-Z\\\\d{1,3}$\");\n             ^\n\nSyntaxError: Invalid regular expression: /^[A-Z\\d{1,3}$/: Unterminated character class\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_class.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "bad_group.js": {
   "src": "const date = new RegExp(\"(?<num>\\\\d{4})-(?<num>\\\\d{2})\");\nconsole.log(date.test(\"2026-11\"));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch22/bad_group.js:1\nconst date = new RegExp(\"(?<num>\\\\d{4})-(?<num>\\\\d{2})\");\n             ^\n\nSyntaxError: Invalid regular expression: /(?<num>\\d{4})-(?<num>\\d{2})/: Duplicate capture group name\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_group.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node bad_group.js",
     "out": "",
     "err": "file:///home/you/javascript-ch22/bad_group.js:1\nconst date = new RegExp(\"(?<num>\\\\d{4})-(?<num>\\\\d{2})\");\n             ^\n\nSyntaxError: Invalid regular expression: /(?<num>\\d{4})-(?<num>\\d{2})/: Duplicate capture group name\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_group.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch22/bad_group.js:1\nconst date = new RegExp(\"(?<num>\\\\d{4})-(?<num>\\\\d{2})\");\n             ^\n\nSyntaxError: Invalid regular expression: /(?<num>\\d{4})-(?<num>\\d{2})/: Duplicate capture group name\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_group.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node bad_group.js",
      "out": "",
      "err": "file:///home/you/javascript-ch22/bad_group.js:1\nconst date = new RegExp(\"(?<num>\\\\d{4})-(?<num>\\\\d{2})\");\n             ^\n\nSyntaxError: Invalid regular expression: /(?<num>\\d{4})-(?<num>\\d{2})/: Duplicate capture group name\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_group.js:1:14\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "bad_regexp.js": {
   "src": "const typed = \"(\";\nconsole.log(\"Searching for\", typed);\nconst pattern = new RegExp(typed);\nconsole.log(pattern.test(\"Act (1)\"));\n",
   "stdout": "Searching for (\n",
   "stderr": "file:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node bad_regexp.js",
     "out": "Searching for (\n",
     "err": "file:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Searching for (\nfile:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Searching for (\n",
    "stderr": "file:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node bad_regexp.js",
      "out": "Searching for (\n",
      "err": "file:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Searching for (\nfile:///home/you/javascript-ch22/bad_regexp.js:3\nconst pattern = new RegExp(typed);\n                ^\n\nSyntaxError: Invalid regular expression: /(/: Unterminated group\n    at new RegExp (<anonymous>)\n    at file:///home/you/javascript-ch22/bad_regexp.js:3:17\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "badge.js": {
   "src": "const names = [\"Ada Lovelace\", \"Mo 🎭\", \"Bo 🎭🎭🎭🎭\"];\n\nfor (const name of names) {\n  const fits = name.length <= 10;\n  console.log(name, name.length, fits ? \"fits\" : \"TOO LONG\");\n}\n",
   "stdout": "Ada Lovelace 12 TOO LONG\nMo 🎭 5 fits\nBo 🎭🎭🎭🎭 11 TOO LONG\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node badge.js",
     "out": "Ada Lovelace 12 TOO LONG\nMo 🎭 5 fits\nBo 🎭🎭🎭🎭 11 TOO LONG\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.js": {
   "src": "const log = \"cue=L4 at=19:30; cue=S2 at=19:45\";\nconst nice = log.replace(/cue=(?<cue>\\w+) at=(?<time>[\\d:]+)/g, \"$<time> $<cue>\");\nconsole.log(nice);\n",
   "stdout": "19:30 L4; 19:45 S2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "19:30 L4; 19:45 S2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "const bill = \"Tea $3, cake $12, tip 2\";\nconst amounts = bill.match(/(?<=\\$)\\d+/g);\nconst numbers = amounts.map(Number);\nconst total = numbers.reduce((a, b) => a + b, 0);\nconsole.log(amounts, total);\n",
   "stdout": "[ '3', '12' ] 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "[ '3', '12' ] 15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const seg = new Intl.Segmenter(\"en\", { granularity: \"grapheme\" });\nconst tag = \"Mo 👍🏽!\";\nconsole.log(tag.length, [...tag].length, [...seg.segment(tag)].length);\nconsole.log(tag.replace(/./g, \"*\"));\nconsole.log(tag.replace(/./gu, \"*\"));\n",
   "stdout": "8 6 5\n********\n******\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "8 6 5\n********\n******\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "const search = \"1.5\";\nconst pattern = new RegExp(search);\nconst weights = [\"1.5 kg\", \"105 g\", \"2.5 kg\"];\nconsole.log(weights.filter((w) => pattern.test(w)));\n",
   "stdout": "[ '1.5 kg', '105 g' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "[ '1.5 kg', '105 g' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.js": {
   "src": "const re = /\\d+/g;\nconst text = \"a1 b22 c333\";\nlet m;\nwhile ((m = re.exec(text)) !== null) {\n  console.log(m[0], m.index, re.lastIndex);\n}\n",
   "stdout": "1 1 2\n22 4 6\n333 8 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 1 2\n22 4 6\n333 8 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "classes.js": {
   "src": "const note = \"Rows A-C: seats 7, 12 and 104. Call 555-0199!\";\n\nconsole.log(note.match(/\\d/g));\nconsole.log(note.match(/[A-C]/g));\nconsole.log(note.match(/\\s/g).length);\nconsole.log(note.match(/[^\\w\\s]/g));\nconsole.log(\"a.b axb\".match(/a.b/g));\nconsole.log(\"a.b axb\".match(/a\\.b/g));\n",
   "stdout": "[\n  '7', '1', '2', '1',\n  '0', '4', '5', '5',\n  '5', '0', '1', '9',\n  '9'\n]\n[ 'A', 'C', 'C' ]\n8\n[ '-', ':', ',', '.', '-', '!' ]\n[ 'a.b', 'axb' ]\n[ 'a.b' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node classes.js",
     "out": "[\n  '7', '1', '2', '1',\n  '0', '4', '5', '5',\n  '5', '0', '1', '9',\n  '9'\n]\n[ 'A', 'C', 'C' ]\n8\n[ '-', ':', ',', '.', '-', '!' ]\n[ 'a.b', 'axb' ]\n[ 'a.b' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cut.js": {
   "src": "const word = \"Hi😀\";\nconsole.log(word[2]);\nconsole.log(word.slice(0, 3));\nconsole.log(word.slice(0, 3).length);\nconsole.log([...word].slice(0, 3).join(\"\"));\nconsole.log(word.codePointAt(3).toString(16));\nconsole.log(word.at(-1) === \"\\uDE00\");\n",
   "stdout": "�\nHi�\n3\nHi😀\nde00\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node cut.js",
     "out": "�\nHi�\n3\nHi😀\nde00\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "date.js": {
   "src": "const stamp = \"Opening night: 2026-11-08, 19:30\";\nconst m = stamp.match(/(\\d{4})-(\\d{2})-(\\d{2})/);\n\nconsole.log(m[0]);\nconsole.log(m[1], m[2], m[3]);\nconsole.log(m.index);\nconsole.log(m.length);\n",
   "stdout": "2026-11-08\n2026 11 08\n15\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node date.js",
     "out": "2026-11-08\n2026 11 08\n15\n4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "dot.js": {
   "src": "console.log(\"a.b\".split(\".\"));\nconsole.log(new RegExp(\"a.b\").test(\"axb\"));\nconsole.log(new RegExp(\"a\\\\.b\").test(\"axb\"));\nconsole.log(\"\\d+\");\nconsole.log(new RegExp(\"\\\\d+\").source);\nconst row = 12;\nconsole.log(new RegExp(\"^Row \" + row + \"$\").test(\"Row 12\"));\n",
   "stdout": "[ 'a', 'b' ]\ntrue\nfalse\nd+\n\\d+\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node dot.js",
     "out": "[ 'a', 'b' ]\ntrue\nfalse\nd+\n\\d+\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "escape.js": {
   "src": "const search = \"1.5+\";\nconst prices = [\"1.5+ kg\", \"105 g\", \"1.55 kg\"];\n\nconst careless = new RegExp(search);\nconsole.log(prices.filter((p) => careless.test(p)));\nconst safe = new RegExp(RegExp.escape(search));\nconsole.log(safe.source);\nconsole.log(prices.filter((p) => safe.test(p)));\n",
   "stdout": "[ '1.5+ kg', '105 g', '1.55 kg' ]\n\\x31\\.5\\+\n[ '1.5+ kg' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node escape.js",
     "out": "[ '1.5+ kg', '105 g', '1.55 kg' ]\n\\x31\\.5\\+\n[ '1.5+ kg' ]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "[ '1.5+ kg', '105 g', '1.55 kg' ]\n",
    "stderr": "file:///home/you/javascript-ch22/escape.js:6\nconst safe = new RegExp(RegExp.escape(search));\n                               ^\n\nTypeError: RegExp.escape is not a function\n    at file:///home/you/javascript-ch22/escape.js:6:32\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node escape.js",
      "out": "[ '1.5+ kg', '105 g', '1.55 kg' ]\n",
      "err": "file:///home/you/javascript-ch22/escape.js:6\nconst safe = new RegExp(RegExp.escape(search));\n                               ^\n\nTypeError: RegExp.escape is not a function\n    at file:///home/you/javascript-ch22/escape.js:6:32\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "[ '1.5+ kg', '105 g', '1.55 kg' ]\nfile:///home/you/javascript-ch22/escape.js:6\nconst safe = new RegExp(RegExp.escape(search));\n                               ^\n\nTypeError: RegExp.escape is not a function\n    at file:///home/you/javascript-ch22/escape.js:6:32\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "family.js": {
   "src": "const family = \"👨‍👩‍👧\";\nconsole.log(family.length);\nconsole.log([...family].length);\nfor (const piece of family) {\n  console.log(\"U+\" + piece.codePointAt(0).toString(16).toUpperCase(), piece.length);\n}\nconsole.log(family === \"\\u{1F468}\\u200D\\u{1F469}\\u200D\\u{1F467}\");\n",
   "stdout": "8\n5\nU+1F468 2\nU+200D 1\nU+1F469 2\nU+200D 1\nU+1F467 2\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node family.js",
     "out": "8\n5\nU+1F468 2\nU+200D 1\nU+1F469 2\nU+200D 1\nU+1F467 2\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_badge.js": {
   "src": "const names = [\"Ada Lovelace\", \"Bo 🎭🎭🎭🎭\"];\nfor (const name of names) {\n  const size = [...name].length;\n  console.log(name, size, size <= 10 ? \"fits\" : \"TOO LONG\");\n}\n",
   "stdout": "Ada Lovelace 12 TOO LONG\nBo 🎭🎭🎭🎭 7 fits\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_badge.js",
     "out": "Ada Lovelace 12 TOO LONG\nBo 🎭🎭🎭🎭 7 fits\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_named.js": {
   "src": "const stamp = \"Opening night: 2026-11-08\";\nconst m = stamp.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);\nconst { year, month, day } = m.groups;\nconsole.log(`${day}/${month}/${year}`);\n",
   "stdout": "08/11/2026\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_named.js",
     "out": "08/11/2026\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_seats.js": {
   "src": "const note = \"Free seats: B12, C7, and A104. Broken: D3.\";\nconst seats = note.match(/[A-Z]\\d+/g);\nconsole.log(seats);\n",
   "stdout": "[ 'B12', 'C7', 'A104', 'D3' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_seats.js",
     "out": "[ 'B12', 'C7', 'A104', 'D3' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "first.js": {
   "src": "const note = \"Seat B12 is free\";\nconst seat = /B12/;\n\nconsole.log(seat.test(note));\nconsole.log(note.search(seat));\nconsole.log(note.match(seat)[0]);\nconsole.log(/b12/.test(note));\nconsole.log(/b12/i.test(note));\nconsole.log(typeof seat, seat.source, JSON.stringify(seat.flags));\n",
   "stdout": "true\n5\nB12\nfalse\ntrue\nobject B12 \"\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node first.js",
     "out": "true\n5\nB12\nfalse\ntrue\nobject B12 \"\"\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "flags.js": {
   "src": "const poem = \"Act 1\\nact 2\";\nconsole.log(poem.match(/^act \\d$/gim));\nconsole.log(/1.act/.test(poem), /1.act/s.test(poem));\nconsole.log(\"😀\".match(/./)[0].length, \"😀\".match(/./u)[0].length);\nconsole.log(\"Kit 🎭 and Mo 🎪\".match(/\\p{Emoji_Presentation}/gu));\nconsole.log(\"Ünïcode\".match(/[\\p{L}--[a-z]]/gv));\nconst d = /c(a)t/d.exec(\"a cat\");\nconsole.log(d.indices[0], d.indices[1]);\nconsole.log(/x/gimsuyd.flags);\n",
   "stdout": "[ 'Act 1', 'act 2' ]\nfalse true\n1 2\n[ '🎭', '🎪' ]\n[ 'Ü', 'ï' ]\n[ 2, 5 ] [ 3, 4 ]\ndgimsuy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node flags.js",
     "out": "[ 'Act 1', 'act 2' ]\nfalse true\n1 2\n[ '🎭', '🎪' ]\n[ 'Ü', 'ï' ]\n[ 2, 5 ] [ 3, 4 ]\ndgimsuy\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "greedy.js": {
   "src": "const html = \"<b>Kit</b> and <b>Mo</b>\";\n\nconsole.log(html.match(/<b>.*<\\/b>/)[0]);\nconsole.log(html.match(/<b>.*?<\\/b>/)[0]);\nconsole.log(html.match(/<b>.*?<\\/b>/g));\nconsole.log(html.match(/<b>[^<]*<\\/b>/g));\n",
   "stdout": "<b>Kit</b> and <b>Mo</b>\n<b>Kit</b>\n[ '<b>Kit</b>', '<b>Mo</b>' ]\n[ '<b>Kit</b>', '<b>Mo</b>' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node greedy.js",
     "out": "<b>Kit</b> and <b>Mo</b>\n<b>Kit</b>\n[ '<b>Kit</b>', '<b>Mo</b>' ]\n[ '<b>Kit</b>', '<b>Mo</b>' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lastindex.js": {
   "src": "const hasA = /a/g;\n\nconsole.log(hasA.test(\"cat\"));\nconsole.log(hasA.lastIndex);\nconsole.log(hasA.test(\"cat\"));\nconsole.log(hasA.lastIndex);\nconsole.log(hasA.test(\"cat\"));\n",
   "stdout": "true\n2\nfalse\n0\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node lastindex.js",
     "out": "true\n2\nfalse\n0\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "look.js": {
   "src": "const prices = \"Tea 3€, cake $12, juice 4€, tip 2\";\n\nconsole.log(prices.match(/\\d+(?=€)/g));\nconsole.log(prices.match(/(?<=\\$)\\d+/g));\nconsole.log(prices.match(/\\b\\d+\\b(?!€)/g));\nconst strong = /^(?=.*\\d)(?=.*[A-Z]).{8,}$/;\nconsole.log(strong.test(\"stagelights\"), strong.test(\"Stage1ights\"), strong.test(\"St4ge\"));\n",
   "stdout": "[ '3', '4' ]\n[ '12' ]\n[ '12', '2' ]\nfalse true false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node look.js",
     "out": "[ '3', '4' ]\n[ '12' ]\n[ '12', '2' ]\nfalse true false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "m_date.js": {
   "src": "const date = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nfor (const text of [\"2026-11-08\", \"Due 2026-01-31!\", \"2026-1-8\", \"26-11-08\", \"20261108\"]) {\n  const m = text.match(date);\n  const result = m ? `year ${m.groups.year}, month ${m.groups.month}, day ${m.groups.day}` : \"null\";\n  console.log(JSON.stringify(text), \"->\", result);\n}\n",
   "stdout": "\"2026-11-08\" -> year 2026, month 11, day 08\n\"Due 2026-01-31!\" -> year 2026, month 01, day 31\n\"2026-1-8\" -> null\n\"26-11-08\" -> null\n\"20261108\" -> null\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node m_date.js",
     "out": "\"2026-11-08\" -> year 2026, month 11, day 08\n\"Due 2026-01-31!\" -> year 2026, month 01, day 31\n\"2026-1-8\" -> null\n\"26-11-08\" -> null\n\"20261108\" -> null\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "m_length.js": {
   "src": "console.log(\"cat ->\", \"cat\".length);\nconsole.log(\"smile ->\", \"😀\".length);\nconsole.log(\"family ->\", \"👨‍👩‍👧\".length);\nconsole.log(\"e + accent mark ->\", \"e\\u0301\".length);\nconsole.log(\"thumbs up + skin tone ->\", \"👍🏽\".length);\nconsole.log(\"empty ->\", \"\".length);\n",
   "stdout": "cat -> 3\nsmile -> 2\nfamily -> 8\ne + accent mark -> 2\nthumbs up + skin tone -> 4\nempty -> 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node m_length.js",
     "out": "cat -> 3\nsmile -> 2\nfamily -> 8\ne + accent mark -> 2\nthumbs up + skin tone -> 4\nempty -> 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "m_seat.js": {
   "src": "const seat = /^[A-Z]\\d{1,3}$/;\nfor (const text of [\"B12\", \"b12\", \"B1234\", \"Z9\", \" B12\", \"AB1\"]) {\n  console.log(JSON.stringify(text), \"->\", seat.test(text));\n}\n",
   "stdout": "\"B12\" -> true\n\"b12\" -> false\n\"B1234\" -> false\n\"Z9\" -> true\n\" B12\" -> false\n\"AB1\" -> false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node m_seat.js",
     "out": "\"B12\" -> true\n\"b12\" -> false\n\"B1234\" -> false\n\"Z9\" -> true\n\" B12\" -> false\n\"AB1\" -> false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "methods.js": {
   "src": "const cues = \"L1 at 0:05, S2 at 1:30, L3 at 2:45\";\n\nconsole.log(cues.match(/\\d:\\d\\d/));\nconsole.log(cues.match(/\\d:\\d\\d/g));\nfor (const m of cues.matchAll(/([LS])(\\d) at (\\d:\\d\\d)/g)) {\n  console.log(m[1], m[2], m[3], \"found at\", m.index);\n}\nconsole.log(cues.search(/S/), cues.search(/X/));\n",
   "stdout": "[\n  '0:05',\n  index: 6,\n  input: 'L1 at 0:05, S2 at 1:30, L3 at 2:45',\n  groups: undefined\n]\n[ '0:05', '1:30', '2:45' ]\nL 1 0:05 found at 0\nS 2 1:30 found at 12\nL 3 2:45 found at 24\n12 -1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node methods.js",
     "out": "[\n  '0:05',\n  index: 6,\n  input: 'L1 at 0:05, S2 at 1:30, L3 at 2:45',\n  groups: undefined\n]\n[ '0:05', '1:30', '2:45' ]\nL 1 0:05 found at 0\nS 2 1:30 found at 12\nL 3 2:45 found at 24\n12 -1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "named.js": {
   "src": "const stamp = \"Opening night: 2026-11-08, 19:30\";\nconst m = stamp.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);\n\nconsole.log(m.groups);\nconsole.log(m.groups.month);\nconst { year, month, day } = m.groups;\nconsole.log(`${day}/${month}/${year}`);\n",
   "stdout": "[Object: null prototype] { year: '2026', month: '11', day: '08' }\n11\n08/11/2026\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node named.js",
     "out": "[Object: null prototype] { year: '2026', month: '11', day: '08' }\n11\n08/11/2026\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "normalize.js": {
   "src": "const composed = \"caf\\u00e9\";\nconst decomposed = \"cafe\\u0301\";\nconsole.log(composed, decomposed);\nconsole.log(composed === decomposed);\nconsole.log(composed.length, decomposed.length);\nconsole.log(composed.normalize(\"NFC\") === decomposed.normalize(\"NFC\"));\nconsole.log(decomposed.normalize(\"NFC\").length, composed.normalize(\"NFD\").length);\nconsole.log(decomposed.includes(\"é\"), decomposed.normalize().includes(\"é\"));\n",
   "stdout": "café café\nfalse\n4 5\ntrue\n4 5\nfalse true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node normalize.js",
     "out": "café café\nfalse\n4 5\ntrue\n4 5\nfalse true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_replace.js": {
   "src": "const menu = \"tea 3, cake 5, juice 4\";\nconst doubled = menu.replace(/\\d+/g, (price) => {\n  const n = Number(price);\n  return String(n * 2);\n});\nconsole.log(doubled);\n",
   "stdout": "tea 6, cake 10, juice 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_replace.js",
     "out": "tea 6, cake 10, juice 8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_reverse.js": {
   "src": "const seg = new Intl.Segmenter(\"en\", { granularity: \"grapheme\" });\nconst text = \"Kit 👋🏽!\";\nconst pieces = [...seg.segment(text)];\nconst letters = pieces.map((p) => p.segment);\nconst backwards = letters.reverse().join(\"\");\nconsole.log(backwards);\n",
   "stdout": "!👋🏽 tiK\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_reverse.js",
     "out": "!👋🏽 tiK\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "points.js": {
   "src": "const word = \"Hi😀!\";\nconsole.log(word.length);\nconsole.log([...word].length);\nconsole.log([...word]);\nconsole.log(Array.from(word).length);\nfor (const ch of word) {\n  console.log(ch, \"U+\" + ch.codePointAt(0).toString(16).toUpperCase());\n}\n",
   "stdout": "5\n4\n[ 'H', 'i', '😀', '!' ]\n4\nH U+48\ni U+69\n😀 U+1F600\n! U+21\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node points.js",
     "out": "5\n4\n[ 'H', 'i', '😀', '!' ]\n4\nH U+48\ni U+69\n😀 U+1F600\n! U+21\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_alt.js": {
   "src": "const re = /^cat|dog$/;\nconsole.log(re.test(\"catalog\"));\nconsole.log(re.test(\"hotdog\"));\nconsole.log(re.test(\"my dog's bone\"));\nconsole.log(/^(cat|dog)$/.test(\"catalog\"));\n",
   "stdout": "true\ntrue\nfalse\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_alt.js",
     "out": "true\ntrue\nfalse\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_flags.js": {
   "src": "const text = \"Act 1\\nact 2\\nACT 3\";\nconsole.log(text.match(/^act \\d/g));\nconsole.log(text.match(/^act \\d/gi));\nconsole.log(text.match(/^act \\d/gim));\n",
   "stdout": "null\n[ 'Act 1' ]\n[ 'Act 1', 'act 2', 'ACT 3' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_flags.js",
     "out": "null\n[ 'Act 1' ]\n[ 'Act 1', 'act 2', 'ACT 3' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_greedy.js": {
   "src": "const line = \"(Kit) and (Mo)\";\nconsole.log(line.match(/\\(.*\\)/)[0]);\nconsole.log(line.match(/\\(.*?\\)/)[0]);\nconsole.log(line.match(/\\(.*?\\)/g));\n",
   "stdout": "(Kit) and (Mo)\n(Kit)\n[ '(Kit)', '(Mo)' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_greedy.js",
     "out": "(Kit) and (Mo)\n(Kit)\n[ '(Kit)', '(Mo)' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_lengths.js": {
   "src": "console.log(\"hello\".length);\nconsole.log(\"🎭\".length);\nconsole.log(\"Kit 🎭\".length);\nconsole.log([...\"Kit 🎭\"].length);\nconsole.log(\"\".length);\n",
   "stdout": "5\n2\n6\n5\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_lengths.js",
     "out": "5\n2\n6\n5\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_normalize.js": {
   "src": "const typed = \"Zoe\\u0308\";\nconst stored = \"Zo\\u00eb\";\nconsole.log(typed === stored);\nconsole.log(typed.length, stored.length);\nconsole.log(typed.normalize() === stored.normalize());\n",
   "stdout": "false\n4 3\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_normalize.js",
     "out": "false\n4 3\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "quant.js": {
   "src": "const note = \"Free: B12, C7 and A104. Call 555-0199.\";\n\nconsole.log(note.match(/[A-Z]\\d+/g));\nconsole.log(note.match(/\\d{3}-\\d{4}/));\nconsole.log(note.match(/\\d{2,3}/g));\nconsole.log(\"color colour colouur\".match(/colou?r/g));\nconsole.log(\"Ahh! Ah? A.\".match(/Ah*/g));\n",
   "stdout": "[ 'B12', 'C7', 'A104' ]\n[\n  '555-0199',\n  index: 29,\n  input: 'Free: B12, C7 and A104. Call 555-0199.',\n  groups: undefined\n]\n[ '12', '104', '555', '019' ]\n[ 'color', 'colour' ]\n[ 'Ahh', 'Ah', 'A' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node quant.js",
     "out": "[ 'B12', 'C7', 'A104' ]\n[\n  '555-0199',\n  index: 29,\n  input: 'Free: B12, C7 and A104. Call 555-0199.',\n  groups: undefined\n]\n[ '12', '104', '555', '019' ]\n[ 'color', 'colour' ]\n[ 'Ahh', 'Ah', 'A' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "replace.js": {
   "src": "const stamp = \"Doors 2026-11-08, show 2026-11-09\";\n\nconsole.log(stamp.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, \"$3/$2/$1\"));\nconsole.log(stamp.replace(/(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})/g, \"$<d>/$<m>/$<y>\"));\nconsole.log(\"kit and mo\".replace(/\\b\\w/g, (letter) => letter.toUpperCase()));\nconsole.log(\"tea 3, cake 5\".replace(/\\d+/g, (price) => String(Number(price) * 2)));\n",
   "stdout": "Doors 08/11/2026, show 2026-11-09\nDoors 08/11/2026, show 09/11/2026\nKit And Mo\ntea 6, cake 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node replace.js",
     "out": "Doors 08/11/2026, show 2026-11-09\nDoors 08/11/2026, show 09/11/2026\nKit And Mo\ntea 6, cake 10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "replaceall_bad.js": {
   "src": "const script = \"Kit enters. Kit waves.\";\nconsole.log(script.replaceAll(\"Kit\", \"Mo\"));\nconsole.log(script.replaceAll(/Kit/g, \"Mo\"));\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n",
   "stdout": "Mo enters. Mo waves.\nMo enters. Mo waves.\n",
   "stderr": "file:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node replaceall_bad.js",
     "out": "Mo enters. Mo waves.\nMo enters. Mo waves.\n",
     "err": "file:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Mo enters. Mo waves.\nMo enters. Mo waves.\nfile:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Mo enters. Mo waves.\nMo enters. Mo waves.\n",
    "stderr": "file:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node replaceall_bad.js",
      "out": "Mo enters. Mo waves.\nMo enters. Mo waves.\n",
      "err": "file:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Mo enters. Mo waves.\nMo enters. Mo waves.\nfile:///home/you/javascript-ch22/replaceall_bad.js:4\nconsole.log(script.replaceAll(/Kit/, \"Mo\"));\n                   ^\n\nTypeError: String.prototype.replaceAll called with a non-global RegExp argument\n    at String.replaceAll (<anonymous>)\n    at file:///home/you/javascript-ch22/replaceall_bad.js:4:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "reverse.js": {
   "src": "const seg = new Intl.Segmenter(\"en\", { granularity: \"grapheme\" });\nconst text = \"Hi😀 👍🏽\";\n\nconsole.log(text.split(\"\").reverse().join(\"\"));\nconsole.log([...text].reverse().join(\"\"));\nconst pieces = [...seg.segment(text)].map((s) => s.segment);\nconsole.log(pieces.reverse().join(\"\"));\n",
   "stdout": "�🁍� ��iH\n🏽👍 😀iH\n👍🏽 😀iH\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node reverse.js",
     "out": "�🁍� ��iH\n🏽👍 😀iH\n👍🏽 😀iH\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rr_12pt.js": {
   "src": "const size = /^\\d+(px|em)$/;\nconst m = \"12pt\".match(size);\nconsole.log(m ? \"match, unit \" + m[1] : \"no match\");\n",
   "stdout": "no match\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rr_12pt.js",
     "out": "no match\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rr_12px.js": {
   "src": "const size = /^\\d+(px|em)$/;\nconst m = \"12px\".match(size);\nconsole.log(m ? \"match, unit \" + m[1] : \"no match\");\n",
   "stdout": "match, unit px\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rr_12px.js",
     "out": "match, unit px\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rr_3em.js": {
   "src": "const size = /^\\d+(px|em)$/;\nconst m = \"3em\".match(size);\nconsole.log(m ? \"match, unit \" + m[1] : \"no match\");\n",
   "stdout": "match, unit em\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rr_3em.js",
     "out": "match, unit em\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rr_px.js": {
   "src": "const size = /^\\d+(px|em)$/;\nconst m = \"px\".match(size);\nconsole.log(m ? \"match, unit \" + m[1] : \"no match\");\n",
   "stdout": "no match\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rr_px.js",
     "out": "no match\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "segment.js": {
   "src": "const seg = new Intl.Segmenter(\"en\", { granularity: \"grapheme\" });\nconst graphemes = (text) => [...seg.segment(text)].length;\n\nfor (const text of [\"cat\", \"😀\", \"👨‍👩‍👧\", \"👍🏽\", \"e\\u0301\"]) {\n  console.log(text, text.length, [...text].length, graphemes(text));\n}\nconsole.log([...seg.segment(\"a👍🏽\")]);\n",
   "stdout": "cat 3 3 3\n😀 2 1 1\n👨‍👩‍👧 8 5 1\n👍🏽 4 2 1\né 2 2 1\n[\n  { segment: 'a', index: 0, input: 'a👍🏽' },\n  { segment: '👍🏽', index: 1, input: 'a👍🏽' }\n]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node segment.js",
     "out": "cat 3 3 3\n😀 2 1 1\n👨‍👩‍👧 8 5 1\n👍🏽 4 2 1\né 2 2 1\n[\n  { segment: 'a', index: 0, input: 'a👍🏽' },\n  { segment: '👍🏽', index: 1, input: 'a👍🏽' }\n]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "slide.js": {
   "src": "const text = \"my cat sat\";\nconst stencil = /cat/y;\n\nfor (let start = 0; start <= text.length - 3; start++) {\n  stencil.lastIndex = start;\n  const found = stencil.test(text);\n  console.log(start, found ? \"match\" : \"no\");\n  if (found) break;\n}\nconsole.log(\"search says:\", text.search(/cat/));\n",
   "stdout": "0 no\n1 no\n2 no\n3 match\nsearch says: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node slide.js",
     "out": "0 no\n1 no\n2 no\n3 match\nsearch says: 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sort.js": {
   "src": "const cast = [\"zoe\", \"Émile\", \"adam\", \"Zack\", \"éva\"];\nconsole.log([...cast].sort());\nconsole.log([...cast].sort((a, b) => a.localeCompare(b, \"en\")));\nconsole.log(\"a\".localeCompare(\"á\", \"en\"));\nconsole.log(\"a\".localeCompare(\"á\", \"en\", { sensitivity: \"base\" }));\nconsole.log(\"Row 10\".localeCompare(\"Row 9\", \"en\", { numeric: true }));\n",
   "stdout": "[ 'Zack', 'adam', 'zoe', 'Émile', 'éva' ]\n[ 'adam', 'Émile', 'éva', 'Zack', 'zoe' ]\n-1\n0\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sort.js",
     "out": "[ 'Zack', 'adam', 'zoe', 'Émile', 'éva' ]\n[ 'adam', 'Émile', 'éva', 'Zack', 'zoe' ]\n-1\n0\n1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "split.js": {
   "src": "const typed = \"tea, cake;juice   pie\";\n\nconsole.log(typed.split(\",\"));\nconsole.log(typed.split(/[,;\\s]+/));\nconsole.log(\"1+2-3\".split(/([+-])/));\nconsole.log(\"a1b22c333\".split(/\\d+/));\n",
   "stdout": "[ 'tea', ' cake;juice   pie' ]\n[ 'tea', 'cake', 'juice', 'pie' ]\n[ '1', '+', '2', '-', '3' ]\n[ 'a', 'b', 'c', '' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node split.js",
     "out": "[ 'tea', ' cake;juice   pie' ]\n[ 'tea', 'cake', 'juice', 'pie' ]\n[ '1', '+', '2', '-', '3' ]\n[ 'a', 'b', 'c', '' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_badge.js": {
   "src": "const name = \"Mo 🎭🎭\";\nconst badge = name.slice(0, 4);\nconsole.log(badge + \"|\");\n",
   "stdout": "Mo �|\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_badge.js",
     "out": "Mo �|\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_lastindex.js": {
   "src": "const hasDigit = /\\d/g;\nconst codes = [\"A1\", \"B2\", \"C3\", \"D4\"];\nconst valid = codes.filter((code) => hasDigit.test(code));\nconsole.log(valid);\n",
   "stdout": "[ 'A1', 'C3' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_lastindex.js",
     "out": "[ 'A1', 'C3' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_newregexp.js": {
   "src": "const code = \"Row 12, Row 7\";\nconst digits = new RegExp(\"\\d+\", \"g\");\nconsole.log(code.match(digits));\n",
   "stdout": "null\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_newregexp.js",
     "out": "null\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_noglobal.js": {
   "src": "const script = \"Kit enters. Kit waves. Kit exits.\";\nconst renamed = script.replace(/Kit/, \"Mo\");\nconsole.log(renamed);\n",
   "stdout": "Mo enters. Kit waves. Kit exits.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_noglobal.js",
     "out": "Mo enters. Kit waves. Kit exits.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sticky.js": {
   "src": "const word = /[a-z]+/y;\nconst text = \"go now\";\n\nword.lastIndex = 0;\nconsole.log(word.exec(text)?.[0], word.lastIndex);\nconsole.log(word.exec(text)?.[0], word.lastIndex);\nword.lastIndex = 3;\nconsole.log(word.exec(text)?.[0], word.lastIndex);\nconsole.log(/[a-z]+/g.exec(\"  hi\")?.index, /[a-z]+/y.exec(\"  hi\"));\n",
   "stdout": "go 2\nundefined 0\nnow 6\n2 null\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sticky.js",
     "out": "go 2\nundefined 0\nnow 6\n2 null\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sticky_match.js": {
   "src": "const seat = /B\\d/y;\nconst text = \"B1 B2\";\nconsole.log(text.match(seat)?.[0], seat.lastIndex);\nconsole.log(text.match(seat), seat.lastIndex);\nconsole.log(text.replace(seat, \"--\"), seat.lastIndex);\n",
   "stdout": "B1 2\nnull 0\n-- B2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node sticky_match.js",
     "out": "B1 2\nnull 0\n-- B2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_count.js": {
   "src": "const seg = new Intl.Segmenter(\"en\", { granularity: \"grapheme\" });\nfor (const text of [\"hi\", \"👋\", \"👋🏽\", \"a👋b\"]) {\n  const graphemes = [...seg.segment(text)].length;\n  console.log(text, text.length, [...text].length, graphemes);\n}\n",
   "stdout": "hi 2 2 2\n👋 2 1 1\n👋🏽 4 2 1\na👋b 4 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_count.js",
     "out": "hi 2 2 2\n👋 2 1 1\n👋🏽 4 2 1\na👋b 4 3 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_matchall.js": {
   "src": "const cues = \"L1@0:05 S2@1:30 L3@2:45\";\nfor (const m of cues.matchAll(/(?<kind>[LS])(?<num>\\d)@(?<time>\\d:\\d\\d)/g)) {\n  console.log(m.groups.kind, m.groups.num, m.groups.time, m.index);\n}\n",
   "stdout": "L 1 0:05 0\nS 2 1:30 8\nL 3 2:45 16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_matchall.js",
     "out": "L 1 0:05 0\nS 2 1:30 8\nL 3 2:45 16\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "units.js": {
   "src": "const smile = \"😀\";\nconsole.log(smile.length);\nconsole.log(smile.charCodeAt(0).toString(16), smile.charCodeAt(1).toString(16));\nconsole.log(smile.codePointAt(0).toString(16));\nconsole.log(smile.codePointAt(0));\nconsole.log(String.fromCodePoint(0x1f600));\nconsole.log(\"\\u{1F600}\" === smile, \"\\uD83D\\uDE00\" === smile);\n",
   "stdout": "2\nd83d de00\n1f600\n128512\n😀\ntrue true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node units.js",
     "out": "2\nd83d de00\n1f600\n128512\n😀\ntrue true\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
