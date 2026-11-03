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
  "workdir": "/home/you/javascript-ch13",
  "versionDifferences": [
   "bigint.js",
   "boss_spot.js",
   "circular.js",
   "jam_comma.js",
   "jam_comment.js",
   "jam_empty.js",
   "jam_single.js",
   "jam_undefined.js",
   "name_error.js",
   "parse_single.js",
   "road_crash.js",
   "spot_json.js",
   "typo.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): bigint.js, boss_spot.js, circular.js, jam_comma.js, jam_comment.js, jam_empty.js, jam_single.js, jam_undefined.js, name_error.js, parse_single.js, road_crash.js, spot_json.js, typo.js."
 },
 "programs": {
  "bad_names.js": {
   "src": "const d = 3;\nconst x = 120;\nconst y = 45;\nconsole.log(x * d - y);\n",
   "stdout": "315\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bad_names.js",
     "out": "315\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "big_parse.js": {
   "src": "const text = '{\"pennies\":12345678901234567890}';\nconsole.log(JSON.parse(text).pennies);\n",
   "stdout": "12345678901234567000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node big_parse.js",
     "out": "12345678901234567000\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bigint.js": {
   "src": "const boxOffice = { title: \"Hamlet\", pennies: 12345678901234567890n };\nconsole.log(JSON.stringify(boxOffice));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch13/bigint.js:2\nconsole.log(JSON.stringify(boxOffice));\n                 ^\n\nTypeError: Do not know how to serialize a BigInt\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/bigint.js:2:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node bigint.js",
     "out": "",
     "err": "file:///home/you/javascript-ch13/bigint.js:2\nconsole.log(JSON.stringify(boxOffice));\n                 ^\n\nTypeError: Do not know how to serialize a BigInt\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/bigint.js:2:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch13/bigint.js:2\nconsole.log(JSON.stringify(boxOffice));\n                 ^\n\nTypeError: Do not know how to serialize a BigInt\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/bigint.js:2:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node bigint.js",
      "out": "",
      "err": "file:///home/you/javascript-ch13/bigint.js:2\nconsole.log(JSON.stringify(boxOffice));\n                 ^\n\nTypeError: Do not know how to serialize a BigInt\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/bigint.js:2:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.js": {
   "src": "const tour = JSON.parse(`{\"show\":\"Oz\",\"stops\":[{\"sold\":120},{\"sold\":95}]}`);\nconst total = tour.stops.reduce((sum, stop) => sum + stop.sold, 0);\nconst summary = { show: tour.show, total };\nconsole.log(JSON.stringify(summary, null, 2));\n",
   "stdout": "{\n  \"show\": \"Oz\",\n  \"total\": 215\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_fill.js",
     "out": "{\n  \"show\": \"Oz\",\n  \"total\": 215\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.js": {
   "src": "function loadCrew(text) {\n  try {\n    return JSON.parse(text).crew;\n  } catch {\n    return [];\n  }\n}\nconsole.log(loadCrew('{\"crew\":[\"Ada\",\"Bo\"]}'));\nconsole.log(loadCrew(\"{crew:['Cy']}\"));\n",
   "stdout": "[ 'Ada', 'Bo' ]\n[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "[ 'Ada', 'Bo' ]\n[]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons_alt1.js": {
   "src": "console.log(loadCrew('{\"crew\":[\"Ada\",\"Bo\"]}'));\nconsole.log(loadCrew(\"{crew:['Cy']}\"));\nfunction loadCrew(text) {\n  try {\n    return JSON.parse(text).crew;\n  } catch {\n    return [];\n  }\n}\n",
   "stdout": "[ 'Ada', 'Bo' ]\n[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons_alt1.js",
     "out": "[ 'Ada', 'Bo' ]\n[]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons_alt2.js": {
   "src": "console.log(loadCrew('{\"crew\":[\"Ada\",\"Bo\"]}'));\nfunction loadCrew(text) {\n  try {\n    return JSON.parse(text).crew;\n  } catch {\n    return [];\n  }\n}\nconsole.log(loadCrew(\"{crew:['Cy']}\"));\n",
   "stdout": "[ 'Ada', 'Bo' ]\n[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons_alt2.js",
     "out": "[ 'Ada', 'Bo' ]\n[]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const cue = { id: 7, note: undefined, tags: [\"fog\", undefined], go() {} };\nconst text = JSON.stringify(cue);\nconsole.log(text);\nconst back = JSON.parse(text);\nconsole.log(Object.keys(back).length, back.tags.length);\nconsole.log(back.tags[1] === null);\n",
   "stdout": "{\"id\":7,\"tags\":[\"fog\",null]}\n2 2\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_predict.js",
     "out": "{\"id\":7,\"tags\":[\"fog\",null]}\n2 2\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.js": {
   "src": "const SALES_JSON = `{\"show\":\"Oz\",\"stops\":[{\"city\":\"Rome\",\"sold\":150},{\"city\":\"Kyiv\",\"sold\":270}]}`;\n\nfunction totalSold(stops) {\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n}\n\nconst tour = SALES_JSON;\nconsole.log(`${tour.show}: ${totalSold(tour.stops)} sold`);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch13/boss_spot.js:4\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n               ^\n\nTypeError: Cannot read properties of undefined (reading 'reduce')\n    at totalSold (file:///home/you/javascript-ch13/boss_spot.js:4:16)\n    at file:///home/you/javascript-ch13/boss_spot.js:8:30\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node boss_spot.js",
     "out": "",
     "err": "file:///home/you/javascript-ch13/boss_spot.js:4\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n               ^\n\nTypeError: Cannot read properties of undefined (reading 'reduce')\n    at totalSold (file:///home/you/javascript-ch13/boss_spot.js:4:16)\n    at file:///home/you/javascript-ch13/boss_spot.js:8:30\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch13/boss_spot.js:4\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n               ^\n\nTypeError: Cannot read properties of undefined (reading 'reduce')\n    at totalSold (file:///home/you/javascript-ch13/boss_spot.js:4:16)\n    at file:///home/you/javascript-ch13/boss_spot.js:8:30\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node boss_spot.js",
      "out": "",
      "err": "file:///home/you/javascript-ch13/boss_spot.js:4\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n               ^\n\nTypeError: Cannot read properties of undefined (reading 'reduce')\n    at totalSold (file:///home/you/javascript-ch13/boss_spot.js:4:16)\n    at file:///home/you/javascript-ch13/boss_spot.js:8:30\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_trace.js": {
   "src": "const text = `[{\"city\":\"Rome\",\"sold\":150,\"seats\":200},{\"city\":\"Kyiv\",\"sold\":270,\"seats\":300},{\"city\":\"Nice\",\"sold\":88,\"seats\":110}]`;\nlet total = 0;\nfor (const stop of JSON.parse(text)) {\n  total += stop.sold;\n  console.log(stop.city, Math.round((stop.sold / stop.seats) * 100), total);\n}\n",
   "stdout": "Rome 75 150\nKyiv 90 420\nNice 80 508\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "Rome 75 150\nKyiv 90 420\nNice 80 508\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "check_examples.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nfunction countWords(words) {\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n\nconst examples = [\"To be, or not to be.\", \"Go, go, GO!\", \"\"];\nfor (const text of examples) {\n  console.log(`\"${text}\" ->`, countWords(toWords(text)));\n}\n",
   "stdout": "\"To be, or not to be.\" -> { to: 2, be: 2, or: 1, not: 1 }\n\"Go, go, GO!\" -> { go: 3 }\n\"\" -> {}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node check_examples.js",
     "out": "\"To be, or not to be.\" -> { to: 2, be: 2, or: 1, not: 1 }\n\"Go, go, GO!\" -> { go: 3 }\n\"\" -> {}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "circular.js": {
   "src": "const ada = { name: \"Ada\" };\nconst bo = { name: \"Bo\", partner: ada };\nada.partner = bo;\nconsole.log(JSON.stringify(ada));\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch13/circular.js:4\nconsole.log(JSON.stringify(ada));\n                 ^\n\nTypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'Object'\n    |     property 'partner' -> object with constructor 'Object'\n    --- property 'partner' closes the circle\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/circular.js:4:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node circular.js",
     "out": "",
     "err": "file:///home/you/javascript-ch13/circular.js:4\nconsole.log(JSON.stringify(ada));\n                 ^\n\nTypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'Object'\n    |     property 'partner' -> object with constructor 'Object'\n    --- property 'partner' closes the circle\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/circular.js:4:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch13/circular.js:4\nconsole.log(JSON.stringify(ada));\n                 ^\n\nTypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'Object'\n    |     property 'partner' -> object with constructor 'Object'\n    --- property 'partner' closes the circle\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/circular.js:4:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node circular.js",
      "out": "",
      "err": "file:///home/you/javascript-ch13/circular.js:4\nconsole.log(JSON.stringify(ada));\n                 ^\n\nTypeError: Converting circular structure to JSON\n    --> starting at object with constructor 'Object'\n    |     property 'partner' -> object with constructor 'Object'\n    --- property 'partner' closes the circle\n    at JSON.stringify (<anonymous>)\n    at file:///home/you/javascript-ch13/circular.js:4:18\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "clear.js": {
   "src": "function countWords(text) {\n  const words = text.toLowerCase().split(\" \");\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n\nconsole.log(countWords(\"Go go GO\"));\n",
   "stdout": "{ go: 3 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node clear.js",
     "out": "{ go: 3 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "constants.js": {
   "src": "const TICKET_PRICE = 12;\nconst BOOKING_FEE = 2; // per ticket, set by the box office\n\nconst tickets = 40;\nconsole.log(\"Box office:\", tickets * TICKET_PRICE);\nconsole.log(\"With fees:\", tickets * (TICKET_PRICE + BOOKING_FEE));\n",
   "stdout": "Box office: 480\nWith fees: 560\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node constants.js",
     "out": "Box office: 480\nWith fees: 560\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_nested.js": {
   "src": "const text = `{\"tour\":[{\"city\":\"Oslo\",\"nights\":3},{\"city\":\"Lima\",\"nights\":2}]}`;\nconst data = JSON.parse(text);\nconsole.log(data.tour[1].city);\nconsole.log(data.tour[0].nights + data.tour[1].nights);\n",
   "stdout": "Lima\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_nested.js",
     "out": "Lima\n5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_percent.js": {
   "src": "function percentFull(stop) {\n  return Math.round((stop.sold / stop.seats) * 100);\n}\n\nconsole.log(percentFull({ city: \"Oslo\", sold: 380, seats: 400 }));\nconsole.log(percentFull({ city: \"Pune\", sold: 295, seats: 300 }));\n",
   "stdout": "95\n98\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_percent.js",
     "out": "95\n98\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_pipeline.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nfunction countWords(words) {\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n\nconst line = \"Lights up! Lights down.\";\nconst words = toWords(line);\nconst counts = countWords(words);\nconsole.log(counts);\n",
   "stdout": "{ lights: 2, up: 1, down: 1 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_pipeline.js",
     "out": "{ lights: 2, up: 1, down: 1 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_pretty.js": {
   "src": "const crew = { lead: \"Kit\", team: [\"Ada\", \"Bo\"] };\nconsole.log(JSON.stringify(crew, null, 4));\n",
   "stdout": "{\n    \"lead\": \"Kit\",\n    \"team\": [\n        \"Ada\",\n        \"Bo\"\n    ]\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_pretty.js",
     "out": "{\n    \"lead\": \"Kit\",\n    \"team\": [\n        \"Ada\",\n        \"Bo\"\n    ]\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "good_names.js": {
   "src": "const shows = 3;\nconst seatsPerShow = 120;\nconst unsoldSeats = 45;\nconsole.log(seatsPerShow * shows - unsoldSeats);\n",
   "stdout": "315\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node good_names.js",
     "out": "315\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "jam_comma.js": {
   "src": "JSON.parse('{\"a\":1,}');\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\n{\"a\":1,}\n       ^\n\nSyntaxError: Expected double-quoted property name in JSON at position 7 (line 1 column 8)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comma.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node jam_comma.js",
     "out": "",
     "err": "<anonymous_script>:1\n{\"a\":1,}\n       ^\n\nSyntaxError: Expected double-quoted property name in JSON at position 7 (line 1 column 8)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comma.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\n{\"a\":1,}\n       ^\n\nSyntaxError: Expected double-quoted property name in JSON at position 7 (line 1 column 8)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comma.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node jam_comma.js",
      "out": "",
      "err": "<anonymous_script>:1\n{\"a\":1,}\n       ^\n\nSyntaxError: Expected double-quoted property name in JSON at position 7 (line 1 column 8)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comma.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "jam_comment.js": {
   "src": "JSON.parse('{\"a\":1} // note');\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\n{\"a\":1} // note\n        ^\n\nSyntaxError: Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comment.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node jam_comment.js",
     "out": "",
     "err": "<anonymous_script>:1\n{\"a\":1} // note\n        ^\n\nSyntaxError: Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comment.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\n{\"a\":1} // note\n        ^\n\nSyntaxError: Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comment.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node jam_comment.js",
      "out": "",
      "err": "<anonymous_script>:1\n{\"a\":1} // note\n        ^\n\nSyntaxError: Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_comment.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "jam_empty.js": {
   "src": "JSON.parse(\"\");\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\n\n\nSyntaxError: Unexpected end of JSON input\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_empty.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node jam_empty.js",
     "out": "",
     "err": "<anonymous_script>:1\n\n\nSyntaxError: Unexpected end of JSON input\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_empty.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\n\n\nSyntaxError: Unexpected end of JSON input\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_empty.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node jam_empty.js",
      "out": "",
      "err": "<anonymous_script>:1\n\n\nSyntaxError: Unexpected end of JSON input\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_empty.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "jam_single.js": {
   "src": "JSON.parse(\"{'a':1}\");\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\n{'a':1}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_single.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node jam_single.js",
     "out": "",
     "err": "<anonymous_script>:1\n{'a':1}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_single.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\n{'a':1}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_single.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node jam_single.js",
      "out": "",
      "err": "<anonymous_script>:1\n{'a':1}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_single.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "jam_undefined.js": {
   "src": "JSON.parse(undefined);\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_undefined.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node jam_undefined.js",
     "out": "",
     "err": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_undefined.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_undefined.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node jam_undefined.js",
      "out": "",
      "err": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/jam_undefined.js:1:6\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "magic.js": {
   "src": "const tickets = 40;\nconsole.log(\"Box office:\", tickets * 12);\nconsole.log(\"With fees:\", tickets * 12 + tickets * 2);\n",
   "stdout": "Box office: 480\nWith fees: 560\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node magic.js",
     "out": "Box office: 480\nWith fees: 560\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "messy.js": {
   "src": "const cast = ['Ada', \"Bo\", `Cy`]\n    for (const name of cast)\n  {\nconsole.log(\"Hello, \" + name + '!')\n        }\n",
   "stdout": "Hello, Ada!\nHello, Bo!\nHello, Cy!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node messy.js",
     "out": "Hello, Ada!\nHello, Bo!\nHello, Cy!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "name_error.js": {
   "src": "const settings = { volume: 7 };\nconst saved = JSON.parse(settings.savedCues);\nconsole.log(saved);\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/name_error.js:2:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node name_error.js",
     "out": "",
     "err": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/name_error.js:2:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/name_error.js:2:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node name_error.js",
      "out": "",
      "err": "<anonymous_script>:1\nundefined\n^\n\nSyntaxError: \"undefined\" is not valid JSON\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/name_error.js:2:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "ninja.js": {
   "src": "const f = (a) => a.toLowerCase().split(\" \").reduce((b, c) => ((b[c] = (b[c] || 0) + 1), b), {});\nconsole.log(f(\"Go go GO\"));\n",
   "stdout": "{ go: 3 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node ninja.js",
     "out": "{ go: 3 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pack.js": {
   "src": "const show = { title: \"Hamlet\", city: \"Oslo\", nights: 3, onSale: true };\nconst text = JSON.stringify(show);\nconsole.log(show);\nconsole.log(text);\nconsole.log(typeof show, typeof text);\nconsole.log(text.length, text.title);\n",
   "stdout": "{ title: 'Hamlet', city: 'Oslo', nights: 3, onSale: true }\n{\"title\":\"Hamlet\",\"city\":\"Oslo\",\"nights\":3,\"onSale\":true}\nobject string\n57 undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pack.js",
     "out": "{ title: 'Hamlet', city: 'Oslo', nights: 3, onSale: true }\n{\"title\":\"Hamlet\",\"city\":\"Oslo\",\"nights\":3,\"onSale\":true}\nobject string\n57 undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parse_ok.js": {
   "src": "console.log(JSON.parse('{\"a\":1}'));\nconsole.log(JSON.parse(\"[1,2,3]\"));\nconsole.log(JSON.parse('\"hi\"'));\nconsole.log(JSON.parse(\"true\"));\n",
   "stdout": "{ a: 1 }\n[ 1, 2, 3 ]\nhi\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parse_ok.js",
     "out": "{ a: 1 }\n[ 1, 2, 3 ]\nhi\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parse_single.js": {
   "src": "console.log(\"Reading the tour file...\");\nconst text = \"{'title': 'Hamlet'}\";\nconst show = JSON.parse(text);\nconsole.log(show.title);\n",
   "stdout": "Reading the tour file...\n",
   "stderr": "<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node parse_single.js",
     "out": "Reading the tour file...\n",
     "err": "<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "Reading the tour file...\n<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "Reading the tour file...\n",
    "stderr": "<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node parse_single.js",
      "out": "Reading the tour file...\n",
      "err": "<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "Reading the tour file...\n<anonymous_script>:1\n{'title': 'Hamlet'}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/parse_single.js:3:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "parsons_longest.js": {
   "src": "function longestWord(words) {\n  let best = \"\";\n  for (const word of words) {\n    if (word.length > best.length) best = word;\n  }\n  return best;\n}\nconsole.log(longestWord([\"cue\", \"lights\", \"fog\", \"curtain\", \"bow\"]));\n",
   "stdout": "curtain\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_longest.js",
     "out": "curtain\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_longest_alt.js": {
   "src": "console.log(longestWord([\"cue\", \"lights\", \"fog\", \"curtain\", \"bow\"]));\nfunction longestWord(words) {\n  let best = \"\";\n  for (const word of words) {\n    if (word.length > best.length) best = word;\n  }\n  return best;\n}\n",
   "stdout": "curtain\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node parsons_longest_alt.js",
     "out": "curtain\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_count.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nconst words = toWords(\"Stand by, stand by... GO!\");\nconsole.log(words.length);\nconsole.log(words.join(\"|\"));\n",
   "stdout": "5\nstand|by|stand|by|go\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_count.js",
     "out": "5\nstand|by|stand|by|go\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_roundtrip.js": {
   "src": "const cue = { name: \"Fog\", at: new Date(\"2026-11-08T19:30:00Z\"), go() {} };\nconst back = JSON.parse(JSON.stringify(cue));\nconsole.log(typeof cue.at, typeof back.at);\nconsole.log(back.at.slice(0, 10));\nconsole.log(\"go\" in cue, \"go\" in back);\n",
   "stdout": "object string\n2026-11-08\ntrue false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_roundtrip.js",
     "out": "object string\n2026-11-08\ntrue false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_stringify.js": {
   "src": "const cue = {\n  name: \"Lights\",\n  delay: undefined,\n  level: NaN,\n  at: new Date(\"2026-11-08T19:30:00Z\"),\n  go() {},\n};\nconsole.log(JSON.stringify(cue));\nconsole.log(JSON.stringify([undefined, NaN, \"fog\"]));\n",
   "stdout": "{\"name\":\"Lights\",\"level\":null,\"at\":\"2026-11-08T19:30:00.000Z\"}\n[null,null,\"fog\"]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_stringify.js",
     "out": "{\"name\":\"Lights\",\"level\":null,\"at\":\"2026-11-08T19:30:00.000Z\"}\n[null,null,\"fog\"]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_tie.js": {
   "src": "const text = `[{\"city\":\"Rome\",\"sold\":150,\"seats\":200},{\"city\":\"Kyiv\",\"sold\":270,\"seats\":300},{\"city\":\"Nice\",\"sold\":99,\"seats\":110}]`;\nconst stops = JSON.parse(text);\n\nfunction percentFull(stop) {\n  return Math.round((stop.sold / stop.seats) * 100);\n}\n\nlet best = stops[0];\nfor (const stop of stops) {\n  if (percentFull(stop) > percentFull(best)) best = stop;\n}\nconsole.log(stops.map(percentFull).join(\" \"));\nconsole.log(best.city);\n",
   "stdout": "75 90 90\nKyiv\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_tie.js",
     "out": "75 90 90\nKyiv\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pretty.js": {
   "src": "const show = { title: \"Hamlet\", cast: [\"Ada\", \"Bo\"], venue: { city: \"Oslo\", seats: 400 } };\nconsole.log(JSON.stringify(show));\nconsole.log(JSON.stringify(show, null, 2));\n",
   "stdout": "{\"title\":\"Hamlet\",\"cast\":[\"Ada\",\"Bo\"],\"venue\":{\"city\":\"Oslo\",\"seats\":400}}\n{\n  \"title\": \"Hamlet\",\n  \"cast\": [\n    \"Ada\",\n    \"Bo\"\n  ],\n  \"venue\": {\n    \"city\": \"Oslo\",\n    \"seats\": 400\n  }\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pretty.js",
     "out": "{\"title\":\"Hamlet\",\"cast\":[\"Ada\",\"Bo\"],\"venue\":{\"city\":\"Oslo\",\"seats\":400}}\n{\n  \"title\": \"Hamlet\",\n  \"cast\": [\n    \"Ada\",\n    \"Bo\"\n  ],\n  \"venue\": {\n    \"city\": \"Oslo\",\n    \"seats\": 400\n  }\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "report.js": {
   "src": "const SALES_JSON = `{\n  \"show\": \"Hamlet\",\n  \"stops\": [\n    { \"city\": \"Oslo\", \"sold\": 380, \"seats\": 400 },\n    { \"city\": \"Lima\", \"sold\": 410, \"seats\": 500 },\n    { \"city\": \"Pune\", \"sold\": 295, \"seats\": 300 }\n  ]\n}`;\n\nfunction percentFull(stop) {\n  return Math.round((stop.sold / stop.seats) * 100);\n}\n\nfunction totalSold(stops) {\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n}\n\nfunction fullestStop(stops) {\n  let best = stops[0];\n  for (const stop of stops) {\n    if (percentFull(stop) > percentFull(best)) best = stop;\n  }\n  return best;\n}\n\nfunction formatReport(tour) {\n  const lines = [`${tour.show} tour report`];\n  for (const stop of tour.stops) {\n    lines.push(`${stop.city}: ${stop.sold} of ${stop.seats} (${percentFull(stop)}%)`);\n  }\n  lines.push(`Total sold: ${totalSold(tour.stops)}`);\n  lines.push(`Fullest house: ${fullestStop(tour.stops).city}`);\n  return lines.join(\"\\n\");\n}\n\nconst tour = JSON.parse(SALES_JSON);\nconsole.log(formatReport(tour));\n",
   "stdout": "Hamlet tour report\nOslo: 380 of 400 (95%)\nLima: 410 of 500 (82%)\nPune: 295 of 300 (98%)\nTotal sold: 1085\nFullest house: Pune\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node report.js",
     "out": "Hamlet tour report\nOslo: 380 of 400 (95%)\nLima: 410 of 500 (82%)\nPune: 295 of 300 (98%)\nTotal sold: 1085\nFullest house: Pune\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "report_pack.js": {
   "src": "const SALES_JSON = `{\"show\":\"Hamlet\",\"stops\":[{\"city\":\"Oslo\",\"sold\":380},{\"city\":\"Lima\",\"sold\":410}]}`;\nconst BROKEN_JSON = `{\"show\":\"Hamlet\",\"stops\":[{\"city\":\"Oslo\",\"sold\":380},]}`;\n\nfunction totalSold(stops) {\n  return stops.reduce((sum, stop) => sum + stop.sold, 0);\n}\n\nfunction packSummary(salesText) {\n  let tour;\n  try {\n    tour = JSON.parse(salesText);\n  } catch (error) {\n    return `Could not read the sales: ${error.message}`;\n  }\n  const summary = { show: tour.show, stops: tour.stops.length, sold: totalSold(tour.stops) };\n  return JSON.stringify(summary, null, 2);\n}\n\nconsole.log(packSummary(SALES_JSON));\nconsole.log(packSummary(BROKEN_JSON));\n",
   "stdout": "{\n  \"show\": \"Hamlet\",\n  \"stops\": 2,\n  \"sold\": 790\n}\nCould not read the sales: Unexpected token ']', ...\"old\":380},]}\" is not valid JSON\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node report_pack.js",
     "out": "{\n  \"show\": \"Hamlet\",\n  \"stops\": 2,\n  \"sold\": 790\n}\nCould not read the sales: Unexpected token ']', ...\"old\":380},]}\" is not valid JSON\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_bad.js": {
   "src": "function parseOr(text, fallback) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    console.log(\"Bad JSON:\", error.message);\n    return fallback;\n  }\n}\n\nconst venue = parseOr(\"{seats:400}\", { seats: 0 });\nconsole.log(\"Seats:\", venue.seats);\n",
   "stdout": "Bad JSON: Expected property name or '}' in JSON at position 1 (line 1 column 2)\nSeats: 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_bad.js",
     "out": "Bad JSON: Expected property name or '}' in JSON at position 1 (line 1 column 2)\nSeats: 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "road_crash.js": {
   "src": "const venue = JSON.parse(\"{seats:400}\");\nconsole.log(\"Seats:\", venue.seats);\n",
   "stdout": "",
   "stderr": "<anonymous_script>:1\n{seats:400}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/road_crash.js:1:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node road_crash.js",
     "out": "",
     "err": "<anonymous_script>:1\n{seats:400}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/road_crash.js:1:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:1\n{seats:400}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/road_crash.js:1:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node road_crash.js",
      "out": "",
      "err": "<anonymous_script>:1\n{seats:400}\n ^\n\nSyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/road_crash.js:1:20\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "road_ok.js": {
   "src": "function parseOr(text, fallback) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    console.log(\"Bad JSON:\", error.message);\n    return fallback;\n  }\n}\n\nconst venue = parseOr('{\"seats\":400}', { seats: 0 });\nconsole.log(\"Seats:\", venue.seats);\n",
   "stdout": "Seats: 400\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node road_ok.js",
     "out": "Seats: 400\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "roundtrip.js": {
   "src": "const show = { title: \"Hamlet\", nights: 3 };\nconst text = JSON.stringify(show);\nconst copy = JSON.parse(text);\ncopy.nights = 4;\nconsole.log(show.nights, copy.nights);\nconsole.log(show === copy);\n",
   "stdout": "3 4\nfalse\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node roundtrip.js",
     "out": "3 4\nfalse\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rules.js": {
   "src": "const text = `{\"title\": \"Hamlet\", \"cast\": [\"Ada\", \"Bo\"], \"nights\": 3, \"onTour\": false, \"budget\": null}`;\nconst show = JSON.parse(text);\nconsole.log(show);\n",
   "stdout": "{\n  title: 'Hamlet',\n  cast: [ 'Ada', 'Bo' ],\n  nights: 3,\n  onTour: false,\n  budget: null\n}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rules.js",
     "out": "{\n  title: 'Hamlet',\n  cast: [ 'Ada', 'Bo' ],\n  nights: 3,\n  onTour: false,\n  budget: null\n}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "rush.js": {
   "src": "// Kit's first try, typed straight away.\nconst line = \"To be, or not to be.\";\nconst counts = {};\nfor (const word of line.split(\" \")) {\n  counts[word] = (counts[word] ?? 0) + 1;\n}\nconsole.log(counts);\n",
   "stdout": "{ To: 1, 'be,': 1, or: 1, not: 1, to: 1, 'be.': 1 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node rush.js",
     "out": "{ To: 1, 'be,': 1, or: 1, not: 1, to: 1, 'be.': 1 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "safe_parse.js": {
   "src": "function parseOr(text, fallback) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    console.log(\"Bad JSON:\", error.message);\n    return fallback;\n  }\n}\n\nconsole.log(parseOr('{\"seats\":400}', {}));\nconsole.log(parseOr(\"{seats:400}\", {}));\nconsole.log(parseOr(undefined, { seats: 0 }));\n",
   "stdout": "{ seats: 400 }\nBad JSON: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n{}\nBad JSON: \"undefined\" is not valid JSON\n{ seats: 0 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node safe_parse.js",
     "out": "{ seats: 400 }\nBad JSON: Expected property name or '}' in JSON at position 1 (line 1 column 2)\n{}\nBad JSON: \"undefined\" is not valid JSON\n{ seats: 0 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_dry.js": {
   "src": "const evening = 40;\nconst matinee = 20;\nconsole.log(\"Evening:\", evening * 15);\nconsole.log(\"Matinee:\", matinee * 12);\nconsole.log(\"Total:\", evening * 15 + matinee * 15);\n",
   "stdout": "Evening: 600\nMatinee: 240\nTotal: 900\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node spot_dry.js",
     "out": "Evening: 600\nMatinee: 240\nTotal: 900\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_json.js": {
   "src": "const text = `{\n  \"title\": \"Hamlet\",\n  \"nights\": 3,\n}`;\nconst show = JSON.parse(text);\nconsole.log(show.title);\n",
   "stdout": "",
   "stderr": "<anonymous_script>:4\n}\n^\n\nSyntaxError: Expected double-quoted property name in JSON at position 38 (line 4 column 1)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/spot_json.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node spot_json.js",
     "out": "",
     "err": "<anonymous_script>:4\n}\n^\n\nSyntaxError: Expected double-quoted property name in JSON at position 38 (line 4 column 1)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/spot_json.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "<anonymous_script>:4\n}\n^\n\nSyntaxError: Expected double-quoted property name in JSON at position 38 (line 4 column 1)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/spot_json.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node spot_json.js",
      "out": "",
      "err": "<anonymous_script>:4\n}\n^\n\nSyntaxError: Expected double-quoted property name in JSON at position 38 (line 4 column 1)\n    at JSON.parse (<anonymous>)\n    at file:///home/you/javascript-ch13/spot_json.js:5:19\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "step1.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nconsole.log(toWords(\"To be, or not to be.\"));\n",
   "stdout": "[ 'to', 'be', 'or', 'not', 'to', 'be' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node step1.js",
     "out": "[ 'to', 'be', 'or', 'not', 'to', 'be' ]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "step2.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nfunction countWords(words) {\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n\nconsole.log(countWords(toWords(\"To be, or not to be.\")));\n",
   "stdout": "{ to: 2, be: 2, or: 1, not: 1 }\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node step2.js",
     "out": "{ to: 2, be: 2, or: 1, not: 1 }\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "stringify_machine.js": {
   "src": "const opening = new Date(\"2026-11-08T19:30:00Z\");\nconsole.log('\"Hamlet\"                  ->', JSON.stringify(\"Hamlet\"));\nconsole.log(\"{ seats: 400 }            ->\", JSON.stringify({ seats: 400 }));\nconsole.log(\"{ understudy: undefined } ->\", JSON.stringify({ understudy: undefined }));\nconsole.log(\"[1, undefined, 3]         ->\", JSON.stringify([1, undefined, 3]));\nconsole.log(\"{ price: NaN }            ->\", JSON.stringify({ price: NaN }));\nconsole.log(\"{ bow() {} }              ->\", JSON.stringify({ bow() {} }));\nconsole.log(\"opening (a Date)          ->\", JSON.stringify(opening));\nconsole.log('() => \"bow\"               ->', JSON.stringify(() => \"bow\"));\n",
   "stdout": "\"Hamlet\"                  -> \"Hamlet\"\n{ seats: 400 }            -> {\"seats\":400}\n{ understudy: undefined } -> {}\n[1, undefined, 3]         -> [1,null,3]\n{ price: NaN }            -> {\"price\":null}\n{ bow() {} }              -> {}\nopening (a Date)          -> \"2026-11-08T19:30:00.000Z\"\n() => \"bow\"               -> undefined\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node stringify_machine.js",
     "out": "\"Hamlet\"                  -> \"Hamlet\"\n{ seats: 400 }            -> {\"seats\":400}\n{ understudy: undefined } -> {}\n[1, undefined, 3]         -> [1,null,3]\n{ price: NaN }            -> {\"price\":null}\n{ bow() {} }              -> {}\nopening (a Date)          -> \"2026-11-08T19:30:00.000Z\"\n() => \"bow\"               -> undefined\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tidy.js": {
   "src": "const cast = [\"Ada\", \"Bo\", \"Cy\"];\nfor (const name of cast) {\n  console.log(`Hello, ${name}!`);\n}\n",
   "stdout": "Hello, Ada!\nHello, Bo!\nHello, Cy!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node tidy.js",
     "out": "Hello, Ada!\nHello, Bo!\nHello, Cy!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_count.js": {
   "src": "const words = [\"to\", \"be\", \"or\", \"not\", \"to\", \"be\"];\nconst counts = {};\nfor (const word of words) {\n  counts[word] = (counts[word] ?? 0) + 1;\n  console.log(word, counts[word]);\n}\n",
   "stdout": "to 1\nbe 1\nor 1\nnot 1\nto 2\nbe 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_count.js",
     "out": "to 1\nbe 1\nor 1\nnot 1\nto 2\nbe 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_parse.js": {
   "src": "const inbox = ['{\"seats\":400}', \"{seats:400}\", \"400\", '\"Ada\"', \"\"];\nfor (const text of inbox) {\n  let kind;\n  try {\n    kind = typeof JSON.parse(text);\n  } catch {\n    kind = \"broken\";\n  }\n  console.log(text.length, kind);\n}\n",
   "stdout": "13 object\n11 broken\n3 number\n5 string\n0 broken\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_parse.js",
     "out": "13 object\n11 broken\n3 number\n5 string\n0 broken\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "typo.js": {
   "src": "let total = 0;\nfor (const price of [12, 15, 9]) {\n  totl = total + price;\n}\nconsole.log(total);\n",
   "stdout": "",
   "stderr": "file:///home/you/javascript-ch13/typo.js:3\n  totl = total + price;\n       ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch13/typo.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node typo.js",
     "out": "",
     "err": "file:///home/you/javascript-ch13/typo.js:3\n  totl = total + price;\n       ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch13/typo.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "file:///home/you/javascript-ch13/typo.js:3\n  totl = total + price;\n       ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch13/typo.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node typo.js",
      "out": "",
      "err": "file:///home/you/javascript-ch13/typo.js:3\n  totl = total + price;\n       ^\n\nReferenceError: totl is not defined\n    at file:///home/you/javascript-ch13/typo.js:3:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1
     }
    ]
   }
  },
  "unpack.js": {
   "src": "const text = `{\"title\":\"Hamlet\",\"venue\":{\"city\":\"Oslo\",\"seats\":400},\"cast\":[\"Ada\",\"Bo\",\"Cy\"]}`;\nconst show = JSON.parse(text);\nconsole.log(typeof text, typeof show);\nconsole.log(show.venue.city);\nconsole.log(show.cast[1]);\nconsole.log(show.venue.seats + 100);\n",
   "stdout": "string object\nOslo\nBo\n500\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node unpack.js",
     "out": "string object\nOslo\nBo\n500\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "what_comments.js": {
   "src": "let seats = 120; // set seats to 120\nseats = seats - 2; // subtract 2 from seats\nconsole.log(seats); // print seats\n",
   "stdout": "118\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node what_comments.js",
     "out": "118\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "why_comments.js": {
   "src": "let seats = 120;\n// Seats A1 and A2 are behind a pillar, so the box office never sells them.\nseats = seats - 2;\nconsole.log(seats);\n",
   "stdout": "118\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node why_comments.js",
     "out": "118\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wordcount.js": {
   "src": "const PUNCTUATION = [\",\", \".\", \"!\", \"?\"];\n\nfunction toWords(text) {\n  let clean = text.toLowerCase();\n  for (const mark of PUNCTUATION) clean = clean.replaceAll(mark, \"\");\n  return clean.split(\" \").filter((word) => word !== \"\");\n}\n\nfunction countWords(words) {\n  const counts = {};\n  for (const word of words) {\n    counts[word] = (counts[word] ?? 0) + 1;\n  }\n  return counts;\n}\n\nfunction formatReport(counts) {\n  const rows = Object.entries(counts).map(([word, n]) => `${word}: ${n}`);\n  return rows.join(\"\\n\");\n}\n\nconst line = \"To be, or not to be.\";\nconst words = toWords(line);\nconst counts = countWords(words);\nconsole.log(formatReport(counts));\n",
   "stdout": "to: 2\nbe: 2\nor: 1\nnot: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node wordcount.js",
     "out": "to: 2\nbe: 2\nor: 1\nnot: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
