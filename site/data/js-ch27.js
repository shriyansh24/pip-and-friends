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
  "workdir": "/home/you/javascript-ch27",
  "versionDifferences": [
   "argv_peek.js",
   "boss_spot.test.js",
   "cover.test.js",
   "emitter_error.js",
   "equal_trap.test.js",
   "hooks_before.test.js",
   "hooks_fail.test.js",
   "mock_leak.test.js",
   "spot_path.js",
   "spot_throws.test.js",
   "tdd_red.test.js",
   "throws.test.js",
   "timers.test.js",
   "trace_timers.js",
   "where_away.js"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): argv_peek.js, boss_spot.test.js, cover.test.js, emitter_error.js, equal_trap.test.js, hooks_before.test.js, hooks_fail.test.js, mock_leak.test.js, spot_path.js, spot_throws.test.js, tdd_red.test.js, throws.test.js, timers.test.js, trace_timers.js, where_away.js."
 },
 "programs": {
  "argv_peek.js": {
   "src": "console.log(process.argv);\nconsole.log('your words:', process.argv.slice(2));\n",
   "stdout": "[\n  '/opt/node26/bin/node',\n  '/home/you/javascript-ch27/argv_peek.js',\n  '--seat',\n  '12A',\n  'Ada Lovelace'\n]\nyour words: [ '--seat', '12A', 'Ada Lovelace' ]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node argv_peek.js --seat 12A 'Ada Lovelace'",
     "out": "[\n  '/opt/node26/bin/node',\n  '/home/you/javascript-ch27/argv_peek.js',\n  '--seat',\n  '12A',\n  'Ada Lovelace'\n]\nyour words: [ '--seat', '12A', 'Ada Lovelace' ]\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "[\n  '/opt/node22/bin/node',\n  '/home/you/javascript-ch27/argv_peek.js',\n  '--seat',\n  '12A',\n  'Ada Lovelace'\n]\nyour words: [ '--seat', '12A', 'Ada Lovelace' ]\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "node argv_peek.js --seat 12A 'Ada Lovelace'",
      "out": "[\n  '/opt/node22/bin/node',\n  '/home/you/javascript-ch27/argv_peek.js',\n  '--seat',\n  '12A',\n  'Ada Lovelace'\n]\nyour words: [ '--seat', '12A', 'Ada Lovelace' ]\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "ask.js": {
   "src": "import * as readline from 'node:readline';\n\nconst rl = readline.createInterface({ input: process.stdin });\nconst lines = rl[Symbol.asyncIterator]();\n\nasync function ask(question) {\n  process.stdout.write(question);\n  const { value } = await lines.next();\n  return value;\n}\n\nconst name = await ask('Pilot name? ');\nconst hours = await ask('Hours flown? ');\nrl.close();\n\nconst rank = Number(hours) >= 1000 ? 'captain' : 'first officer';\nconsole.log(`Welcome aboard, ${name} (${hours} hours: ${rank})`);\nconsole.log(typeof hours);\n",
   "stdout": "Pilot name? Hours flown? Welcome aboard, Amelia (1250 hours: captain)\nstring\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node ask.js",
     "out": "Pilot name? Hours flown? Welcome aboard, Amelia (1250 hours: captain)\nstring\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Amelia\n1250\n",
   "screen": "Pilot name? Amelia\nHours flown? 1250\nWelcome aboard, Amelia (1250 hours: captain)\nstring\n"
  },
  "ask_question.js": {
   "src": "import * as readline from 'node:readline/promises';\n\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nconst name = await rl.question('Pilot name? ');\nconst hours = await rl.question('Hours flown? ');\nrl.close();\n\nconsole.log(`Welcome aboard, ${name} (${hours} hours)`);\n",
   "stdout": "Pilot name? Hours flown? ",
   "stderr": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch27/ask_question.js:6\nconst hours = await rl.question('Hours flown? ');\n              ^\n\n\n\n",
   "exit": 13,
   "steps": [
    {
     "cmd": "printf 'Amelia\\n1250\\n' | node ask_question.js",
     "out": "Pilot name? Hours flown? ",
     "err": "Warning: Detected unsettled top-level await at file:///home/you/javascript-ch27/ask_question.js:6\nconst hours = await rl.question('Hours flown? ');\n              ^\n\n\n\n",
     "exit": 13,
     "merged": "Pilot name? Hours flown? Warning: Detected unsettled top-level await at file:///home/you/javascript-ch27/ask_question.js:6\nconst hours = await rl.question('Hours flown? ');\n              ^\n\n\n\n"
    }
   ]
  },
  "async.test.js": {
   "src": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { askTower } from './lib/plane.js';\n\ndescribe('the tower radio', () => {\n  it('clears us (await the answer)', async () => {\n    const answer = await askTower('Gatwick');\n    assert.equal(answer, 'Gatwick: cleared for takeoff');\n  });\n  it('clears us (return the promise)', () => {\n    return askTower('Luton').then((answer) => {\n      assert.equal(answer, 'Luton: cleared for takeoff');\n    });\n  });\n  it('reports a closed tower', async () => {\n    await assert.rejects(askTower('closed'), {\n      message: 'no answer from tower',\n    });\n  });\n});\n",
   "stdout": "▶ the tower radio\n  ✔ clears us (await the answer) (…ms)\n  ✔ clears us (return the promise) (…ms)\n  ✔ reports a closed tower (…ms)\n✔ the tower radio (…ms)\nℹ tests 3\nℹ suites 1\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec async.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ the tower radio\n  ✔ clears us (await the answer) (…ms)\n  ✔ clears us (return the promise) (…ms)\n  ✔ reports a closed tower (…ms)\n✔ the tower radio (…ms)\nℹ tests 3\nℹ suites 1\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "lib/plane.js": {
   "src": "// The flight computer: the code our tests check.\nexport function fuelFor(km, litresPerKm = 3) {\n  if (typeof km !== 'number' || Number.isNaN(km)) {\n    throw new TypeError(`km must be a number, got ${typeof km}`);\n  }\n  if (km < 0) throw new RangeError('km must be 0 or more');\n  return km * litresPerKm;\n}\n\nexport function preflight(plane) {\n  const problems = [];\n  if (plane.fuel < 100) problems.push('low fuel');\n  if (!plane.flapsDown) problems.push('flaps up');\n  return problems;\n}\n\nexport function callSign(name) {\n  return name.trim().toUpperCase().replaceAll(' ', '-');\n}\n\nexport async function askTower(tower) {\n  await new Promise((resolve) => setTimeout(resolve, 5));\n  if (tower === 'closed') throw new Error('no answer from tower');\n  return `${tower}: cleared for takeoff`;\n}\n\nexport function inspectFleet(planes, report) {\n  for (const plane of planes) {\n    for (const problem of preflight(plane)) report(plane.name, problem);\n  }\n}\n\nexport function weather() {\n  return Math.random() < 0.2 ? 'stormy' : 'clear';\n}\n\nexport function remindLater(say) {\n  setTimeout(() => say('check fuel'), 60_000);\n}\n\nexport function greeting() {\n  const hour = new Date().getUTCHours();\n  return hour < 12 ? 'Good morning, pilot' : 'Good evening, pilot';\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "big_count.js": {
   "src": "import { writeFile, mkdir, stat } from 'node:fs/promises';\nimport { createReadStream } from 'node:fs';\nimport * as readline from 'node:readline';\n\nawait mkdir('scratch', { recursive: true });\nconst line = 'radar ping: all clear\\n';\nawait writeFile('scratch/radar.log', line.repeat(50_000));\nconsole.log('file size:', (await stat('scratch/radar.log')).size, 'bytes');\n\nlet chunks = 0;\nfor await (const chunk of createReadStream('scratch/radar.log')) chunks++;\nconsole.log('read in', chunks, 'chunks of at most 65536 bytes');\n\nlet lines = 0;\nconst rl = readline.createInterface({ input: createReadStream('scratch/radar.log') });\nfor await (const _ of rl) lines++;\nconsole.log('lines:', lines);\n",
   "stdout": "file size: 1100000 bytes\nread in 17 chunks of at most 65536 bytes\nlines: 50000\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node big_count.js",
     "out": "file size: 1100000 bytes\nread in 17 chunks of at most 65536 bytes\nlines: 50000\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { weather, askTower } from './lib/plane.js';\n\nit('storm day: the tower closes', async (t) => {\n  t.mock.method(Math, 'random', () => 0.05);\n  assert.equal(weather(), 'stormy');\n  await assert.rejects(askTower('closed'), { message: /no answer/ });\n  assert.equal(Math.random.mock.callCount(), 1);\n});\n",
   "stdout": "✔ storm day: the tower closes (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec boss_fill.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ storm day: the tower closes (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "boss_parsons.js": {
   "src": "import { readFile, writeFile, mkdir } from 'node:fs/promises';\nimport path from 'node:path';\n\nconst dir = import.meta.dirname;\nawait mkdir(path.join(dir, 'scratch'), { recursive: true });\nconst raw = await readFile(path.join(dir, 'data', 'fleet.json'), 'utf8');\nconst fleet = JSON.parse(raw);\nconst names = fleet.planes.map((p) => p.name.toUpperCase());\nawait writeFile(path.join(dir, 'scratch', 'names.txt'), names.join('\\n') + '\\n');\nconsole.log('wrote', names.length, 'names:', names.join(' '));\n",
   "stdout": "wrote 4 names: SKYLARK PUFFIN KESTREL WREN\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_parsons.js",
     "out": "wrote 4 names: SKYLARK PUFFIN KESTREL WREN\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.js": {
   "src": "const [trips = '1', ...cargo] = process.argv.slice(2);\nconst pilot = process.env.PILOT ?? 'autopilot';\n\nconsole.log(`${pilot} flies ${trips} trips`);\nconsole.log(cargo.length ? cargo.join('+') : 'empty hold');\nconsole.log(trips + 1);\nif (!process.env.TOWER) process.exitCode = 3;\nconsole.log('exit code will be', process.exitCode);\n",
   "stdout": "Ada flies 3 trips\nmail+parcels\n31\nexit code will be 3\n",
   "stderr": "",
   "exit": 3,
   "steps": [
    {
     "cmd": "PILOT=Ada node boss_predict.js 3 mail parcels",
     "out": "Ada flies 3 trips\nmail+parcels\n31\nexit code will be 3\n",
     "err": "",
     "exit": 3
    }
   ]
  },
  "boss_spot.test.js": {
   "src": "import { describe, it, before } from 'node:test';\nimport assert from 'node:assert/strict';\n\ndescribe('fuel tank', () => {\n  let tank;\n  before(() => {\n    tank = { litres: 100 };\n  });\n  it('burns 30 litres on takeoff', () => {\n    tank.litres -= 30;\n    assert.equal(tank.litres, 70);\n  });\n  it('burns 50 litres on a climb', () => {\n    tank.litres -= 50;\n    assert.equal(tank.litres, 50);\n  });\n});\n",
   "stdout": "▶ fuel tank\n  ✔ burns 30 litres on takeoff (…ms)\n  ✖ burns 50 litres on a climb (…ms)\n✖ fuel tank (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at boss_spot.test.js:13:3\n✖ burns 50 litres on a climb (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  20 !== 50\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/boss_spot.test.js:15:12)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:974:7) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 20,\n    expected: 50,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec boss_spot.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ fuel tank\n  ✔ burns 30 litres on takeoff (…ms)\n  ✖ burns 50 litres on a climb (…ms)\n✖ fuel tank (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at boss_spot.test.js:13:3\n✖ burns 50 litres on a climb (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  20 !== 50\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/boss_spot.test.js:15:12)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:974:7) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 20,\n    expected: 50,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "▶ fuel tank\n  ✔ burns 30 litres on takeoff (…ms)\n  ✖ burns 50 litres on a climb (…ms)\n✖ fuel tank (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at boss_spot.test.js:13:3\n✖ burns 50 litres on a climb (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  20 !== 50\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/boss_spot.test.js:15:12)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:744:7) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 20,\n    expected: 50,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec boss_spot.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "▶ fuel tank\n  ✔ burns 30 litres on takeoff (…ms)\n  ✖ burns 50 litres on a climb (…ms)\n✖ fuel tank (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at boss_spot.test.js:13:3\n✖ burns 50 litres on a climb (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  20 !== 50\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/boss_spot.test.js:15:12)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:744:7) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 20,\n    expected: 50,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "boss_trace.js": {
   "src": "import { EventEmitter } from 'node:events';\n\nconst tower = new EventEmitter();\nconst crew = () => {};\ntower.on('land', crew);\ntower.once('land', () => {});\n\nfor (const round of [1, 2, 3]) {\n  if (round === 3) tower.off('land', crew);\n  const before = tower.listenerCount('land');\n  const heard = tower.emit('land');\n  console.log(round, before, heard, tower.listenerCount('land'));\n}\n",
   "stdout": "1 2 true 1\n2 1 true 1\n3 0 false 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node boss_trace.js",
     "out": "1 2 true 1\n2 1 true 1\n3 0 false 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "buffer_basics.js": {
   "src": "const word = 'Hi ✈';\nconst buf = Buffer.from(word, 'utf8');\n\nconsole.log(word.length, 'characters');\nconsole.log(buf.length, 'bytes');\nconsole.log(buf);\nconsole.log([...buf]);\nconsole.log(buf.toString('base64'));\nconsole.log(Buffer.from('SGkg4pyI', 'base64').toString('utf8'));\n",
   "stdout": "4 characters\n6 bytes\n<Buffer 48 69 20 e2 9c 88>\n[ 72, 105, 32, 226, 156, 136 ]\nSGkg4pyI\nHi ✈\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node buffer_basics.js",
     "out": "4 characters\n6 bytes\n<Buffer 48 69 20 e2 9c 88>\n[ 72, 105, 32, 226, 156, 136 ]\nSGkg4pyI\nHi ✈\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cli_ada.js": {
   "src": "// This entry runs bin/boarding.js; see its .cmd file for the command.\n",
   "stdout": "Boarding pass: Ada, any seat\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bin/boarding.js Ada",
     "out": "Boarding pass: Ada, any seat\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bin/boarding.js": {
   "src": "// Usage: node bin/boarding.js <name> [seat] [--shout]\nconst args = process.argv.slice(2);\nconst shout = args.includes('--shout');\nconst [name, seat = 'any seat'] = args.filter((a) => a !== '--shout');\n\nif (!name) {\n  console.error('usage: node bin/boarding.js <name> [seat] [--shout]');\n  process.exitCode = 2;\n} else {\n  const pass = `Boarding pass: ${name}, ${seat}`;\n  console.log(shout ? pass.toUpperCase() : pass);\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cli_none.js": {
   "src": "// This entry runs bin/boarding.js; see its .cmd file for the command.\n",
   "stdout": "",
   "stderr": "usage: node bin/boarding.js <name> [seat] [--shout]\n",
   "exit": 2,
   "steps": [
    {
     "cmd": "node bin/boarding.js",
     "out": "",
     "err": "usage: node bin/boarding.js <name> [seat] [--shout]\n",
     "exit": 2
    }
   ]
  },
  "cli_seat.js": {
   "src": "// This entry runs bin/boarding.js; see its .cmd file for the command.\n",
   "stdout": "Boarding pass: Ada, 14C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bin/boarding.js Ada 14C",
     "out": "Boarding pass: Ada, 14C\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cli_shout.js": {
   "src": "// This entry runs bin/boarding.js; see its .cmd file for the command.\n",
   "stdout": "BOARDING PASS: ADA, 14C\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bin/boarding.js --shout Ada 14C",
     "out": "BOARDING PASS: ADA, 14C\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cover.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fuelFor } from './lib/fuel.js';\n\nit('needs 3 litres per km', () => {\n  assert.equal(fuelFor(10), 30);\n});\n",
   "stdout": "✔ needs 3 litres per km (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\nℹ start of coverage report\nℹ ----------------------------------------------------------\nℹ file      | line % | branch % | funcs % | uncovered lines\nℹ ----------------------------------------------------------\nℹ lib       |        |          |         | \nℹ  fuel.js  |  55.56 |    50.00 |  100.00 | 3-4 6-7\nℹ ----------------------------------------------------------\nℹ all files |  55.56 |    50.00 |  100.00 | \nℹ ----------------------------------------------------------\nℹ end of coverage report\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec --experimental-test-coverage cover.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ needs 3 litres per km (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\nℹ start of coverage report\nℹ ----------------------------------------------------------\nℹ file      | line % | branch % | funcs % | uncovered lines\nℹ ----------------------------------------------------------\nℹ lib       |        |          |         | \nℹ  fuel.js  |  55.56 |    50.00 |  100.00 | 3-4 6-7\nℹ ----------------------------------------------------------\nℹ all files |  55.56 |    50.00 |  100.00 | \nℹ ----------------------------------------------------------\nℹ end of coverage report\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✔ needs 3 litres per km (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\nℹ start of coverage report\nℹ ---------------------------------------------------------------\nℹ file           | line % | branch % | funcs % | uncovered lines\nℹ ---------------------------------------------------------------\nℹ cover.test.js  | 100.00 |   100.00 |  100.00 | \nℹ lib            |        |          |         | \nℹ  fuel.js       |  55.56 |    50.00 |  100.00 | 3-4 6-7\nℹ ---------------------------------------------------------------\nℹ all files      |  75.00 |    66.67 |  100.00 | \nℹ ---------------------------------------------------------------\nℹ end of coverage report\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec --experimental-test-coverage cover.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✔ needs 3 litres per km (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\nℹ start of coverage report\nℹ ---------------------------------------------------------------\nℹ file           | line % | branch % | funcs % | uncovered lines\nℹ ---------------------------------------------------------------\nℹ cover.test.js  | 100.00 |   100.00 |  100.00 | \nℹ lib            |        |          |         | \nℹ  fuel.js       |  55.56 |    50.00 |  100.00 | 3-4 6-7\nℹ ---------------------------------------------------------------\nℹ all files      |  75.00 |    66.67 |  100.00 | \nℹ ---------------------------------------------------------------\nℹ end of coverage report\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "lib/fuel.js": {
   "src": "export function fuelFor(km, litresPerKm = 3) {\n  if (typeof km !== 'number') {\n    throw new TypeError('km must be a number');\n  }\n  if (km < 0) {\n    throw new RangeError('km must be 0 or more');\n  }\n  return km * litresPerKm;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "emitter.js": {
   "src": "import { EventEmitter } from 'node:events';\n\nconst tower = new EventEmitter();\n\ntower.on('landing', (plane) => console.log('ground crew: meet', plane));\ntower.on('landing', (plane) => console.log('fuel truck: refill', plane));\ntower.once('landing', () => console.log('photographer: first landing!'));\n\nconsole.log('emit 1 heard?', tower.emit('landing', 'Skylark'));\nconsole.log('emit 2 heard?', tower.emit('landing', 'Wren'));\nconsole.log('takeoff heard?', tower.emit('takeoff', 'Puffin'));\nconsole.log('listeners:', tower.listenerCount('landing'));\n",
   "stdout": "ground crew: meet Skylark\nfuel truck: refill Skylark\nphotographer: first landing!\nemit 1 heard? true\nground crew: meet Wren\nfuel truck: refill Wren\nemit 2 heard? true\ntakeoff heard? false\nlisteners: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node emitter.js",
     "out": "ground crew: meet Skylark\nfuel truck: refill Skylark\nphotographer: first landing!\nemit 1 heard? true\nground crew: meet Wren\nfuel truck: refill Wren\nemit 2 heard? true\ntakeoff heard? false\nlisteners: 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "emitter_error.js": {
   "src": "import { EventEmitter } from 'node:events';\n\nconst runway = new EventEmitter();\nconsole.log('opening the runway');\nrunway.emit('error', new Error('runway closed: fog'));\nconsole.log('never printed');\n",
   "stdout": "opening the runway\n",
   "stderr": "file:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "node emitter_error.js",
     "out": "opening the runway\n",
     "err": "file:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n",
     "exit": 1,
     "merged": "opening the runway\nfile:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:105:5)\n\nNode.js v26.13.0\n"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "opening the runway\n",
    "stderr": "file:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "node emitter_error.js",
      "out": "opening the runway\n",
      "err": "file:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n",
      "exit": 1,
      "merged": "opening the runway\nfile:///home/you/javascript-ch27/emitter_error.js:5\nrunway.emit('error', new Error('runway closed: fog'));\n                     ^\n\nError: runway closed: fog\n    at file:///home/you/javascript-ch27/emitter_error.js:5:22\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\nEmitted 'error' event at:\n    at file:///home/you/javascript-ch27/emitter_error.js:5:8\n    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)\n    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)\n\nNode.js v22.23.4\n"
     }
    ]
   }
  },
  "env.js": {
   "src": "const tower = process.env.TOWER ?? 'no tower set';\nconst key = process.env.RADIO_KEY;\n\nconsole.log('tower:', tower);\nconsole.log('radio key:', key ? `set (${key.length} characters)` : 'missing');\n",
   "stdout": "tower: Heathrow\nradio key: set (9 characters)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node env.js",
     "out": "tower: no tower set\nradio key: missing\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "TOWER=Gatwick node env.js",
     "out": "tower: Gatwick\nradio key: missing\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --env-file=flight.env env.js",
     "out": "tower: Heathrow\nradio key: set (9 characters)\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "flight.env": {
   "src": "TOWER=Heathrow\nRADIO_KEY=s3cret-77\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "equal_trap.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { preflight } from './lib/plane.js';\n\nit('lists the problems (equal)', () => {\n  assert.equal(preflight({ fuel: 20, flapsDown: true }), ['low fuel']);\n});\nit('lists the problems (deepEqual)', () => {\n  assert.deepEqual(preflight({ fuel: 20, flapsDown: true }), ['low fuel']);\n});\n",
   "stdout": "✖ lists the problems (equal) (…ms)\n✔ lists the problems (deepEqual) (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at equal_trap.test.js:5:1\n✖ lists the problems (equal) (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    'low fuel'\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/equal_trap.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 'low fuel' ],\n    expected: [ 'low fuel' ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec equal_trap.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✖ lists the problems (equal) (…ms)\n✔ lists the problems (deepEqual) (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at equal_trap.test.js:5:1\n✖ lists the problems (equal) (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    'low fuel'\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/equal_trap.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 'low fuel' ],\n    expected: [ 'low fuel' ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✖ lists the problems (equal) (…ms)\n✔ lists the problems (deepEqual) (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at equal_trap.test.js:5:1\n✖ lists the problems (equal) (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    'low fuel'\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/equal_trap.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 'low fuel' ],\n    expected: [ 'low fuel' ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec equal_trap.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✖ lists the problems (equal) (…ms)\n✔ lists the problems (deepEqual) (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at equal_trap.test.js:5:1\n✖ lists the problems (equal) (…ms)\n  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:\n  \n  [\n    'low fuel'\n  ]\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/equal_trap.test.js:6:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: [ 'low fuel' ],\n    expected: [ 'low fuel' ],\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "exit_codes.js": {
   "src": "const fuel = Number(process.argv[2]);\n\nif (Number.isNaN(fuel) || fuel < 100) {\n  console.error(`not enough fuel: ${process.argv[2]}`);\n  process.exitCode = 1;\n} else {\n  console.log(`fuel ok: ${fuel} litres`);\n}\nconsole.log('checklist finished');\n",
   "stdout": "checklist finished\n1\n",
   "stderr": "not enough fuel: 20\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "node exit_codes.js 500; echo $?",
     "out": "fuel ok: 500 litres\nchecklist finished\n0\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "node exit_codes.js 20; echo $?",
     "out": "checklist finished\n1\n",
     "err": "not enough fuel: 20\n",
     "exit": 0,
     "merged": "not enough fuel: 20\nchecklist finished\n1\n"
    }
   ]
  },
  "fill_asserts.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fuelFor, preflight, callSign, askTower } from './lib/plane.js';\n\nit('four kinds of check', async () => {\n  assert.deepEqual(preflight({ fuel: 0, flapsDown: true }), ['low fuel']);\n  assert.throws(() => fuelFor(-1), RangeError);\n  assert.match(callSign('kestrel two'), /^KESTREL/);\n  await assert.rejects(askTower('closed'), /no answer/);\n});\n",
   "stdout": "✔ four kinds of check (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec fill_asserts.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ four kinds of check (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "fill_exit.js": {
   "src": "const [km] = process.argv.slice(2);\n\nif (km === undefined) {\n  console.error('usage: node fill_exit.js <km>');\n  process.exitCode = 2;\n} else {\n  console.log(`fuel for ${km} km: ${Number(km) * 3} litres`);\n}\n",
   "stdout": "fuel for 40 km: 120 litres\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_exit.js 40",
     "out": "fuel for 40 km: 120 litres\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_mock.test.js": {
   "src": "import { it, mock } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { inspectFleet } from './lib/plane.js';\n\nit('stays silent for a ready fleet', () => {\n  const radio = mock.fn();\n  inspectFleet([{ name: 'Wren', fuel: 300, flapsDown: true }], radio);\n  assert.equal(radio.mock.callCount(), 0);\n});\n",
   "stdout": "✔ stays silent for a ready fleet (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec fill_mock.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ stays silent for a ready fleet (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "fill_path.js": {
   "src": "import { readFile } from 'node:fs/promises';\nimport path from 'node:path';\n\nconst where = path.join(import.meta.dirname, 'data', 'checklist.txt');\nconst steps = (await readFile(where, 'utf8')).trim().split('\\n');\nconsole.log(path.basename(where), 'has', steps.length, 'steps');\n",
   "stdout": "checklist.txt has 3 steps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fill_path.js",
     "out": "checklist.txt has 3 steps\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fixtures.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { preflight } from './lib/plane.js';\n\n// A fixture factory: a ready plane, with any detail changed.\nfunction makePlane(changes = {}) {\n  return { name: 'Skylark', fuel: 500, flapsDown: true, ...changes };\n}\n\nit('spots low fuel', () => {\n  // Arrange\n  const plane = makePlane({ fuel: 40 });\n  // Act\n  const problems = preflight(plane);\n  // Assert\n  assert.deepEqual(problems, ['low fuel']);\n});\n\nit('spots flaps that are up', () => {\n  const plane = makePlane({ flapsDown: false });\n  const problems = preflight(plane);\n  assert.deepEqual(problems, ['flaps up']);\n});\n",
   "stdout": "✔ spots low fuel (…ms)\n✔ spots flaps that are up (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec fixtures.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ spots low fuel (…ms)\n✔ spots flaps that are up (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "flags.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { callSign } from './lib/plane.js';\n\nit('shouts the call sign', () => {\n  assert.equal(callSign(' red kite '), 'RED-KITE');\n});\nit.skip('lands in fog', () => {\n  assert.fail('the fog simulator is broken');\n});\nit('lands on water', { skip: 'no seaplane yet' }, () => {});\nit.todo('lands on a moving ship');\n",
   "stdout": "✔ shouts the call sign (…ms)\n﹣ lands in fog (…ms) # SKIP\n﹣ lands on water (…ms) # no seaplane yet\n✔ lands on a moving ship (…ms) # TODO\nℹ tests 4\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 2\nℹ todo 1\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec flags.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ shouts the call sign (…ms)\n﹣ lands in fog (…ms) # SKIP\n﹣ lands on water (…ms) # no seaplane yet\n✔ lands on a moving ship (…ms) # TODO\nℹ tests 4\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 2\nℹ todo 1\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "fleet_tool.js": {
   "src": "import { readFile, writeFile, mkdir } from 'node:fs/promises';\nimport path from 'node:path';\n\nconst dataDir = path.join(import.meta.dirname, 'data');\nconst config = JSON.parse(await readFile(path.join(dataDir, 'tool-config.json'), 'utf8'));\nconsole.log('config:', config.input, '->', config.output, 'over', config.maxHours);\nconst fleet = JSON.parse(await readFile(path.join(dataDir, config.input), 'utf8'));\nconst due = fleet.planes\n  .filter((p) => p.hours > config.maxHours)\n  .map((p) => ({ name: p.name, over: p.hours - config.maxHours }))\n  .toSorted((a, b) => b.over - a.over);\nconsole.log('due for service:', due.length);\nconst outDir = path.join(import.meta.dirname, 'scratch');\nawait mkdir(outDir, { recursive: true });\nawait writeFile(path.join(outDir, config.output), JSON.stringify(due, null, 2) + '\\n');\nconsole.log(await readFile(path.join(outDir, config.output), 'utf8'));\n",
   "stdout": "config: fleet.json -> service.json over 500\ndue for service: 3\n[\n  {\n    \"name\": \"Kestrel\",\n    \"over\": 440\n  },\n  {\n    \"name\": \"Skylark\",\n    \"over\": 120\n  },\n  {\n    \"name\": \"Wren\",\n    \"over\": 5\n  }\n]\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fleet_tool.js",
     "out": "config: fleet.json -> service.json over 500\ndue for service: 3\n[\n  {\n    \"name\": \"Kestrel\",\n    \"over\": 440\n  },\n  {\n    \"name\": \"Skylark\",\n    \"over\": 120\n  },\n  {\n    \"name\": \"Wren\",\n    \"over\": 5\n  }\n]\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "data/tool-config.json": {
   "src": "{ \"input\": \"fleet.json\", \"output\": \"service.json\", \"maxHours\": 500 }\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "data/fleet.json": {
   "src": "{\n  \"planes\": [\n    { \"name\": \"Skylark\", \"hours\": 620, \"seats\": 4 },\n    { \"name\": \"Puffin\", \"hours\": 180, \"seats\": 2 },\n    { \"name\": \"Kestrel\", \"hours\": 940, \"seats\": 6 },\n    { \"name\": \"Wren\", \"hours\": 505, \"seats\": 2 }\n  ]\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "forgot_await.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { askTower } from './lib/plane.js';\n\nit('hears from the tower', () => {\n  askTower('Stansted').then((answer) => {\n    assert.equal(answer, 'Stansted: go around');\n  });\n});\n",
   "stdout": "✔ hears from the tower (…ms)\nℹ Error: Test \"hears from the tower\" at forgot_await.test.js:5:1 generated asynchronous activity after the test ended. This activity created the error \"AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 'Stansted: cleared for takeoff'\n- 'Stansted: go around'\n             ^\n\" and would have caused the test to fail, but instead triggered an unhandledRejection event.\n✖ forgot_await.test.js (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at forgot_await.test.js:1:1\n✖ forgot_await.test.js (…ms)\n  'test failed'\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec forgot_await.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ hears from the tower (…ms)\nℹ Error: Test \"hears from the tower\" at forgot_await.test.js:5:1 generated asynchronous activity after the test ended. This activity created the error \"AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n+ actual - expected\n\n+ 'Stansted: cleared for takeoff'\n- 'Stansted: go around'\n             ^\n\" and would have caused the test to fail, but instead triggered an unhandledRejection event.\n✖ forgot_await.test.js (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at forgot_await.test.js:1:1\n✖ forgot_await.test.js (…ms)\n  'test failed'\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "fs_tour.js": {
   "src": "import { mkdir, writeFile, appendFile, readdir, stat, readFile, rm } from 'node:fs/promises';\n\nawait rm('scratch/logbook', { recursive: true, force: true });\nawait mkdir('scratch/logbook', { recursive: true });\n\nawait writeFile('scratch/logbook/day1.txt', 'Skylark: 2 hours\\n');\nawait writeFile('scratch/logbook/day2.txt', 'Wren: 1 hour\\n');\nawait appendFile('scratch/logbook/day2.txt', 'Puffin: 3 hours\\n');\n\nconst names = await readdir('scratch/logbook');\nconsole.log('files:', names.sort());\n\nconst info = await stat('scratch/logbook/day2.txt');\nconsole.log('day2 size:', info.size, 'bytes; file?', info.isFile());\n\nconsole.log(await readFile('scratch/logbook/day2.txt', 'utf8'));\n",
   "stdout": "files: [ 'day1.txt', 'day2.txt' ]\nday2 size: 29 bytes; file? true\nWren: 1 hour\nPuffin: 3 hours\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node fs_tour.js",
     "out": "files: [ 'day1.txt', 'day2.txt' ]\nday2 size: 29 bytes; file? true\nWren: 1 hour\nPuffin: 3 hours\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "globals.js": {
   "src": "console.log('window:', typeof window);\nconsole.log('document:', typeof document);\nconsole.log('globalThis:', typeof globalThis);\nconsole.log('same as global?', globalThis === global);\nconsole.log('process:', typeof process);\nconsole.log('require:', typeof require);\nconsole.log('fetch:', typeof fetch);\n",
   "stdout": "window: undefined\ndocument: undefined\nglobalThis: object\nsame as global? true\nprocess: object\nrequire: undefined\nfetch: function\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node globals.js",
     "out": "window: undefined\ndocument: undefined\nglobalThis: object\nsame as global? true\nprocess: object\nrequire: undefined\nfetch: function\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hooks_before.test.js": {
   "src": "import { describe, it, before, beforeEach, afterEach, after } from 'node:test';\n\ndescribe('cockpit', () => {\n  before(() => {\n    console.error('before: power on the simulator');\n    throw new Error('no power');\n  });\n  beforeEach(() => console.error('  beforeEach: fresh plane'));\n  afterEach(() => console.error('  afterEach: tidy the cockpit'));\n  after(() => console.error('after: power off'));\n\n  it('takeoff', () => console.error('    test: takeoff'));\n  it('landing', () => console.error('    test: landing'));\n});\n",
   "stdout": "▶ cockpit\n  ✖ takeoff\n  ✖ landing\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 0\nℹ fail 0\nℹ cancelled 2\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_before.test.js:12:3\n✖ takeoff\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:13:3\n✖ landing\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:3:1\n✖ cockpit (…ms)\n  Error: no power\n      at SuiteContext.<anonymous> (file:///home/you/javascript-ch27/hooks_before.test.js:6:11)\n      at TestHook.runInAsyncScope (node:async_hooks:226:14)\n      at TestHook.run (node:internal/test_runner/test:1402:25)\n      at TestHook.run (node:internal/test_runner/test:1757:18)\n      at TestHook.run (node:internal/util:581:20)\n      at Suite.runHook (node:internal/test_runner/test:1289:20)\n      at Suite.run (node:internal/test_runner/test:1899:18)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3)\n",
   "stderr": "before: power on the simulator\nafter: power off\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test-reporter=spec hooks_before.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ cockpit\n  ✖ takeoff\n  ✖ landing\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 0\nℹ fail 0\nℹ cancelled 2\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_before.test.js:12:3\n✖ takeoff\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:13:3\n✖ landing\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:3:1\n✖ cockpit (…ms)\n  Error: no power\n      at SuiteContext.<anonymous> (file:///home/you/javascript-ch27/hooks_before.test.js:6:11)\n      at TestHook.runInAsyncScope (node:async_hooks:226:14)\n      at TestHook.run (node:internal/test_runner/test:1402:25)\n      at TestHook.run (node:internal/test_runner/test:1757:18)\n      at TestHook.run (node:internal/util:581:20)\n      at Suite.runHook (node:internal/test_runner/test:1289:20)\n      at Suite.run (node:internal/test_runner/test:1899:18)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3)\n",
     "err": "before: power on the simulator\nafter: power off\n",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "▶ cockpit\n  ✖ takeoff\n  ✖ landing\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 0\nℹ fail 0\nℹ cancelled 2\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_before.test.js:12:3\n✖ takeoff\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:13:3\n✖ landing\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:3:1\n✖ cockpit (…ms)\n  Error: no power\n      at SuiteContext.<anonymous> (file:///home/you/javascript-ch27/hooks_before.test.js:6:11)\n      at TestHook.runInAsyncScope (node:async_hooks:214:14)\n      at TestHook.run (node:internal/test_runner/test:1047:25)\n      at TestHook.run (node:internal/test_runner/test:1354:18)\n      at TestHook.run (node:internal/util:580:20)\n      at Suite.runHook (node:internal/test_runner/test:965:20)\n      at Suite.run (node:internal/test_runner/test:1436:18)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)\n",
    "stderr": "before: power on the simulator\nafter: power off\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test-reporter=spec hooks_before.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "▶ cockpit\n  ✖ takeoff\n  ✖ landing\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 0\nℹ fail 0\nℹ cancelled 2\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_before.test.js:12:3\n✖ takeoff\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:13:3\n✖ landing\n  'test did not finish before its parent and was cancelled'\n\ntest at hooks_before.test.js:3:1\n✖ cockpit (…ms)\n  Error: no power\n      at SuiteContext.<anonymous> (file:///home/you/javascript-ch27/hooks_before.test.js:6:11)\n      at TestHook.runInAsyncScope (node:async_hooks:214:14)\n      at TestHook.run (node:internal/test_runner/test:1047:25)\n      at TestHook.run (node:internal/test_runner/test:1354:18)\n      at TestHook.run (node:internal/util:580:20)\n      at Suite.runHook (node:internal/test_runner/test:965:20)\n      at Suite.run (node:internal/test_runner/test:1436:18)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)\n",
      "err": "before: power on the simulator\nafter: power off\n",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "hooks_fail.test.js": {
   "src": "import { describe, it, before, beforeEach, afterEach, after } from 'node:test';\n\ndescribe('cockpit', () => {\n  before(() => console.error('before: power on the simulator'));\n  beforeEach(() => console.error('  beforeEach: fresh plane'));\n  afterEach(() => console.error('  afterEach: tidy the cockpit'));\n  after(() => console.error('after: power off'));\n\n  it('takeoff', () => {\n    console.error('    test: takeoff');\n    throw new Error('wheels stuck');\n  });\n  it('landing', () => console.error('    test: landing'));\n});\n",
   "stdout": "▶ cockpit\n  ✖ takeoff (…ms)\n  ✔ landing (…ms)\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_fail.test.js:9:3\n✖ takeoff (…ms)\n  Error: wheels stuck\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/hooks_fail.test.js:11:11)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at async Promise.all (index 0)\n      at async Suite.run (node:internal/test_runner/test:1905:7)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3)\n",
   "stderr": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test-reporter=spec hooks_fail.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ cockpit\n  ✖ takeoff (…ms)\n  ✔ landing (…ms)\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_fail.test.js:9:3\n✖ takeoff (…ms)\n  Error: wheels stuck\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/hooks_fail.test.js:11:11)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at async Promise.all (index 0)\n      at async Suite.run (node:internal/test_runner/test:1905:7)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3)\n",
     "err": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "▶ cockpit\n  ✖ takeoff (…ms)\n  ✔ landing (…ms)\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_fail.test.js:9:3\n✖ takeoff (…ms)\n  Error: wheels stuck\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/hooks_fail.test.js:11:11)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at async Promise.all (index 0)\n      at async Suite.run (node:internal/test_runner/test:1442:7)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)\n",
    "stderr": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test-reporter=spec hooks_fail.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "▶ cockpit\n  ✖ takeoff (…ms)\n  ✔ landing (…ms)\n✖ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at hooks_fail.test.js:9:3\n✖ takeoff (…ms)\n  Error: wheels stuck\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/hooks_fail.test.js:11:11)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at async Promise.all (index 0)\n      at async Suite.run (node:internal/test_runner/test:1442:7)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3)\n",
      "err": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "hooks_pass.test.js": {
   "src": "import { describe, it, before, beforeEach, afterEach, after } from 'node:test';\n\ndescribe('cockpit', () => {\n  before(() => console.error('before: power on the simulator'));\n  beforeEach(() => console.error('  beforeEach: fresh plane'));\n  afterEach(() => console.error('  afterEach: tidy the cockpit'));\n  after(() => console.error('after: power off'));\n\n  it('takeoff', () => console.error('    test: takeoff'));\n  it('landing', () => console.error('    test: landing'));\n});\n",
   "stdout": "▶ cockpit\n  ✔ takeoff (…ms)\n  ✔ landing (…ms)\n✔ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test-reporter=spec hooks_pass.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ cockpit\n  ✔ takeoff (…ms)\n  ✔ landing (…ms)\n✔ cockpit (…ms)\nℹ tests 2\nℹ suites 1\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "before: power on the simulator\n  beforeEach: fresh plane\n    test: takeoff\n  afterEach: tidy the cockpit\n  beforeEach: fresh plane\n    test: landing\n  afterEach: tidy the cockpit\nafter: power off\n",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "mock_fn.test.js": {
   "src": "import { it, mock } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { inspectFleet } from './lib/plane.js';\n\nit('reports each problem to the radio', () => {\n  const radio = mock.fn();\n  const fleet = [\n    { name: 'Skylark', fuel: 500, flapsDown: true },\n    { name: 'Puffin', fuel: 30, flapsDown: false },\n  ];\n\n  inspectFleet(fleet, radio);\n\n  assert.equal(radio.mock.callCount(), 2);\n  assert.deepEqual(radio.mock.calls[0].arguments, ['Puffin', 'low fuel']);\n  assert.deepEqual(radio.mock.calls[1].arguments, ['Puffin', 'flaps up']);\n});\n",
   "stdout": "✔ reports each problem to the radio (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec mock_fn.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ reports each problem to the radio (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "mock_leak.test.js": {
   "src": "import { it, mock } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { weather } from './lib/plane.js';\n\nit('reports a storm when the dice roll low', () => {\n  mock.method(Math, 'random', () => 0.1);\n  assert.equal(weather(), 'stormy');\n});\n\nit('Math.random is random again', () => {\n  const rolls = new Set([Math.random(), Math.random(), Math.random()]);\n  assert.equal(rolls.size, 3);\n});\n",
   "stdout": "✔ reports a storm when the dice roll low (…ms)\n✖ Math.random is random again (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at mock_leak.test.js:10:1\n✖ Math.random is random again (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  1 !== 3\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/mock_leak.test.js:12:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 1,\n    expected: 3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec mock_leak.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ reports a storm when the dice roll low (…ms)\n✖ Math.random is random again (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at mock_leak.test.js:10:1\n✖ Math.random is random again (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  1 !== 3\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/mock_leak.test.js:12:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 1,\n    expected: 3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✔ reports a storm when the dice roll low (…ms)\n✖ Math.random is random again (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at mock_leak.test.js:10:1\n✖ Math.random is random again (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  1 !== 3\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/mock_leak.test.js:12:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 1,\n    expected: 3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec mock_leak.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✔ reports a storm when the dice roll low (…ms)\n✖ Math.random is random again (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at mock_leak.test.js:10:1\n✖ Math.random is random again (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  1 !== 3\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/mock_leak.test.js:12:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 1,\n    expected: 3,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "mock_method.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { weather } from './lib/plane.js';\n\nit('reports a storm when the dice roll low', (t) => {\n  t.mock.method(Math, 'random', () => 0.1);\n  assert.equal(weather(), 'stormy');\n  assert.equal(Math.random.mock.callCount(), 1);\n});\n\nit('reports clear skies when the dice roll high', (t) => {\n  t.mock.method(Math, 'random', () => 0.9);\n  assert.equal(weather(), 'clear');\n});\n",
   "stdout": "✔ reports a storm when the dice roll low (…ms)\n✔ reports clear skies when the dice roll high (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec mock_method.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ reports a storm when the dice roll low (…ms)\n✔ reports clear skies when the dice roll high (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "only_flag.test.js": {
   "src": "import { it } from 'node:test';\n\nit('slow full-flight test', () => console.log('slow test ran'));\nit.only('the one I am fixing', () => console.log('focused test ran'));\n",
   "stdout": "focused test ran\n✔ the one I am fixing (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec --test-only only_flag.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "focused test ran\n✔ the one I am fixing (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "os_child.js": {
   "src": "import os from 'node:os';\nimport { execFileSync } from 'node:child_process';\n\nconsole.log('platform:', os.platform());\nconsole.log('line ending:', JSON.stringify(os.EOL));\nconst out = execFileSync(process.execPath, ['-e', 'console.log(6 * 7)'], { encoding: 'utf8' });\nconsole.log('the child said:', out.trim());\n",
   "stdout": "platform: linux\nline ending: \"\\n\"\nthe child said: 42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node os_child.js",
     "out": "platform: linux\nline ending: \"\\n\"\nthe child said: 42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_async.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { askTower } from './lib/plane.js';\n\nit('Bristol clears us', async () => {\n  const answer = await askTower('Bristol');\n  assert.match(answer, /cleared/);\n});\n",
   "stdout": "✔ Bristol clears us (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec parsons_async.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ Bristol clears us (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 1\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "paths.js": {
   "src": "import path from 'node:path';\nimport { fileURLToPath } from 'node:url';\n\nconst file = 'data/fleet.json';\nconsole.log(path.join('data', 'reports', '..', 'fleet.json'));\nconsole.log(path.basename(file), path.extname(file), path.dirname(file));\nconsole.log(process.cwd());\nconsole.log(path.resolve(file));\nconsole.log(import.meta.url);\nconsole.log(fileURLToPath(import.meta.url));\nconsole.log(import.meta.filename);\nconsole.log(import.meta.dirname);\n",
   "stdout": "data/fleet.json\nfleet.json .json data\n/home/you/javascript-ch27\n/home/you/javascript-ch27/data/fleet.json\nfile:///home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node paths.js",
     "out": "data/fleet.json\nfleet.json .json data\n/home/you/javascript-ch27\n/home/you/javascript-ch27/data/fleet.json\nfile:///home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27/paths.js\n/home/you/javascript-ch27\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "pipeline.js": {
   "src": "import { createReadStream, createWriteStream } from 'node:fs';\nimport { mkdir, readFile } from 'node:fs/promises';\nimport { pipeline } from 'node:stream/promises';\nimport { Transform } from 'node:stream';\n\nconst shout = new Transform({\n  transform(chunk, encoding, done) {\n    done(null, chunk.toString().toUpperCase());\n  },\n});\n\nawait mkdir('scratch', { recursive: true });\nawait pipeline(\n  createReadStream('data/checklist.txt'),\n  shout,\n  createWriteStream('scratch/CHECKLIST.txt'),\n);\nconsole.log(await readFile('scratch/CHECKLIST.txt', 'utf8'));\n",
   "stdout": "CHECK FUEL\nSET FLAPS\nLIGHTS ON\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node pipeline.js",
     "out": "CHECK FUEL\nSET FLAPS\nLIGHTS ON\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_argv.js": {
   "src": "const [, , first, ...rest] = process.argv;\nconsole.log(first);\nconsole.log(rest.length);\nconsole.log(typeof rest[0]);\nconsole.log(rest.map(Number).reduce((a, b) => a + b, 0));\n",
   "stdout": "climb\n2\nstring\n500\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_argv.js climb 200 300",
     "out": "climb\n2\nstring\n500\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_asserts.js": {
   "src": "import assert from 'node:assert/strict';\n\nfunction check(label, fn) {\n  try {\n    fn();\n    console.log(label, 'pass');\n  } catch (err) {\n    console.log(label, 'FAIL');\n  }\n}\n\ncheck('A', () => assert.equal([1, 2], [1, 2]));\ncheck('B', () => assert.deepEqual([1, 2], [1, 2]));\ncheck('C', () => assert.deepEqual({ seats: 4 }, { seats: '4' }));\ncheck('D', () => assert.equal(0.1 + 0.2, 0.3));\ncheck('E', () => assert.match('JET-7', /^[A-Z]+-\\d$/));\n",
   "stdout": "A FAIL\nB pass\nC FAIL\nD FAIL\nE pass\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_asserts.js",
     "out": "A FAIL\nB pass\nC FAIL\nD FAIL\nE pass\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_buffer.js": {
   "src": "import { readFile } from 'node:fs/promises';\n\nconst a = await readFile('data/hello.txt');\nconst b = await readFile('data/hello.txt', 'utf8');\nconsole.log(typeof a, a.length);\nconsole.log(typeof b, b.length);\nconsole.log(a.toString() === b);\n",
   "stdout": "object 3\nstring 3\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_buffer.js",
     "out": "object 3\nstring 3\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_emitter.js": {
   "src": "import { EventEmitter } from 'node:events';\n\nconst bell = new EventEmitter();\nbell.on('ring', (n) => console.log('A', n));\nbell.once('ring', (n) => console.log('B', n));\nconsole.log('start');\nbell.emit('ring', 1);\nbell.emit('ring', 2);\nconsole.log('end');\n",
   "stdout": "start\nA 1\nB 1\nA 2\nend\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_emitter.js",
     "out": "start\nA 1\nB 1\nA 2\nend\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_mock.js": {
   "src": "import { mock } from 'node:test';\n\nconst double = mock.fn((n) => n * 2);\ndouble(4);\ndouble(10);\n\nconsole.log(double.mock.callCount());\nconsole.log(double.mock.calls[0].arguments);\nconsole.log(double.mock.calls[1].result);\n",
   "stdout": "2\n[ 4 ]\n20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node predict_mock.js",
     "out": "2\n[ 4 ]\n20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "read_buffer.js": {
   "src": "import { readFile } from 'node:fs/promises';\n\nconst raw = await readFile('data/hello.txt');\nconsole.log(raw);\n\nconst text = await readFile('data/hello.txt', 'utf8');\nconsole.log(text);\nconsole.log(JSON.stringify(text));\n",
   "stdout": "<Buffer 48 69 0a>\nHi\n\n\"Hi\\n\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node read_buffer.js",
     "out": "<Buffer 48 69 0a>\nHi\n\n\"Hi\\n\"\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "safe_path.js": {
   "src": "import path from 'node:path';\n\nconst hangar = path.resolve('data');\n\nfunction safeFile(userInput) {\n  const full = path.resolve(hangar, userInput);\n  if (!full.startsWith(hangar + path.sep)) {\n    throw new Error(`refused: ${userInput}`);\n  }\n  return path.relative(process.cwd(), full);\n}\n\nfor (const asked of ['fleet.json', 'reports/may.json', '../package.json', '/etc/passwd']) {\n  try {\n    console.log('ok     ', safeFile(asked));\n  } catch (err) {\n    console.log('blocked', err.message);\n  }\n}\n",
   "stdout": "ok      data/fleet.json\nok      data/reports/may.json\nblocked refused: ../package.json\nblocked refused: /etc/passwd\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node safe_path.js",
     "out": "ok      data/fleet.json\nok      data/reports/may.json\nblocked refused: ../package.json\nblocked refused: /etc/passwd\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "server.js": {
   "src": "import http from 'node:http';\n\nconst server = http.createServer((req, res) => {\n  if (req.url === '/status') {\n    res.writeHead(200, { 'content-type': 'application/json' });\n    res.end(JSON.stringify({ runway: 'open', planes: 3 }));\n  } else {\n    res.writeHead(404, { 'content-type': 'text/plain' });\n    res.end('no such page');\n  }\n});\n\nserver.listen(0);\nawait new Promise((resolve) => server.once('listening', resolve));\nconst base = `http://localhost:${server.address().port}`;\n\nconst ok = await fetch(`${base}/status`);\nconsole.log(ok.status, ok.headers.get('content-type'), await ok.json());\n\nconst missing = await fetch(`${base}/hangar`);\nconsole.log(missing.status, await missing.text());\n\nserver.close();\n",
   "stdout": "200 application/json { runway: 'open', planes: 3 }\n404 no such page\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node server.js",
     "out": "200 application/json { runway: 'open', planes: 3 }\n404 no such page\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sim.test.js": {
   "src": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fuelFor, preflight } from './lib/plane.js';\n\ndescribe('fuelFor', () => {\n  it('needs 3 litres per km by default', () => {\n    assert.equal(fuelFor(10), 30);\n  });\n  it('uses the litres per km you give it', () => {\n    assert.equal(fuelFor(10, 2), 20);\n  });\n  it('needs nothing for 0 km', () => {\n    assert.equal(fuelFor(0), 0);\n  });\n});\n\ndescribe('preflight', () => {\n  it('finds no problems on a ready plane', () => {\n    assert.deepEqual(preflight({ fuel: 500, flapsDown: true }), []);\n  });\n  it('lists every problem it finds', () => {\n    assert.deepEqual(preflight({ fuel: 20, flapsDown: false }), ['low fuel', 'flaps up']);\n  });\n});\n",
   "stdout": "▶ fuelFor\n  ✔ needs 3 litres per km by default (…ms)\n  ✔ uses the litres per km you give it (…ms)\n  ✔ needs nothing for 0 km (…ms)\n✔ fuelFor (…ms)\n▶ preflight\n  ✔ finds no problems on a ready plane (…ms)\n  ✔ lists every problem it finds (…ms)\n✔ preflight (…ms)\nℹ tests 5\nℹ suites 2\nℹ pass 5\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec sim.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ fuelFor\n  ✔ needs 3 litres per km by default (…ms)\n  ✔ uses the litres per km you give it (…ms)\n  ✔ needs nothing for 0 km (…ms)\n✔ fuelFor (…ms)\n▶ preflight\n  ✔ finds no problems on a ready plane (…ms)\n  ✔ lists every problem it finds (…ms)\n✔ preflight (…ms)\nℹ tests 5\nℹ suites 2\nℹ pass 5\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "spot_await.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { askTower } from './lib/plane.js';\n\nit('Gatwick tower is closed tonight', async () => {\n  const reply = askTower('Gatwick');\n  assert.rejects(reply, /no answer/);\n  console.log('checked the tower');\n});\n",
   "stdout": "checked the tower\n✔ Gatwick tower is closed tonight (…ms)\nℹ Error: Test \"Gatwick tower is closed tonight\" at spot_await.test.js:5:1 generated asynchronous activity after the test ended. This activity created the error \"AssertionError [ERR_ASSERTION]: Missing expected rejection.\" and would have caused the test to fail, but instead triggered an unhandledRejection event.\n✖ spot_await.test.js (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_await.test.js:1:1\n✖ spot_await.test.js (…ms)\n  'test failed'\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec spot_await.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "checked the tower\n✔ Gatwick tower is closed tonight (…ms)\nℹ Error: Test \"Gatwick tower is closed tonight\" at spot_await.test.js:5:1 generated asynchronous activity after the test ended. This activity created the error \"AssertionError [ERR_ASSERTION]: Missing expected rejection.\" and would have caused the test to fail, but instead triggered an unhandledRejection event.\n✖ spot_await.test.js (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_await.test.js:1:1\n✖ spot_await.test.js (…ms)\n  'test failed'\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "spot_path.js": {
   "src": "import { readFile } from 'node:fs/promises';\nimport path from 'node:path';\n\nconst here = import.meta.dirname;\nconsole.log('script folder:', path.basename(here));\nconst fleet = JSON.parse(await readFile('data/fleet.json', 'utf8'));\nconsole.log('planes:', fleet.planes.length);\n",
   "stdout": "script folder: javascript-ch27\n",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[Error: ENOENT: no such file or directory, open 'data/fleet.json'] {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/fleet.json'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd ..",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node javascript-ch27/spot_path.js",
     "out": "script folder: javascript-ch27\n",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[Error: ENOENT: no such file or directory, open 'data/fleet.json'] {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/fleet.json'\n}\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "script folder: javascript-ch27\n",
    "stderr": "node:internal/fs/promises:639\n  return new FileHandle(await PromisePrototypeThen(\n                        ^\n\nError: ENOENT: no such file or directory, open 'data/fleet.json'\n    at async open (node:internal/fs/promises:639:25)\n    at async readFile (node:internal/fs/promises:1252:14)\n    at async file:///home/you/javascript-ch27/spot_path.js:6:26 {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/fleet.json'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd ..",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node javascript-ch27/spot_path.js",
      "out": "script folder: javascript-ch27\n",
      "err": "node:internal/fs/promises:639\n  return new FileHandle(await PromisePrototypeThen(\n                        ^\n\nError: ENOENT: no such file or directory, open 'data/fleet.json'\n    at async open (node:internal/fs/promises:639:25)\n    at async readFile (node:internal/fs/promises:1252:14)\n    at async file:///home/you/javascript-ch27/spot_path.js:6:26 {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/fleet.json'\n}\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~"
     }
    ]
   }
  },
  "spot_throws.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fuelFor } from './lib/plane.js';\n\nit('refuses a negative distance', () => {\n  assert.throws(fuelFor(-5), RangeError);\n});\n",
   "stdout": "✖ refuses a negative distance (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_throws.test.js:5:1\n✖ refuses a negative distance (…ms)\n  RangeError [Error]: km must be 0 or more\n      at fuelFor (file:///home/you/javascript-ch27/lib/plane.js:6:21)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/spot_throws.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17)\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec spot_throws.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✖ refuses a negative distance (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_throws.test.js:5:1\n✖ refuses a negative distance (…ms)\n  RangeError [Error]: km must be 0 or more\n      at fuelFor (file:///home/you/javascript-ch27/lib/plane.js:6:21)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/spot_throws.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.start (node:internal/test_runner/test:1262:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:387:17)\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✖ refuses a negative distance (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_throws.test.js:5:1\n✖ refuses a negative distance (…ms)\n  RangeError: km must be 0 or more\n      at fuelFor (file:///home/you/javascript-ch27/lib/plane.js:6:21)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/spot_throws.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec spot_throws.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✖ refuses a negative distance (…ms)\nℹ tests 1\nℹ suites 0\nℹ pass 0\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at spot_throws.test.js:5:1\n✖ refuses a negative distance (…ms)\n  RangeError: km must be 0 or more\n      at fuelFor (file:///home/you/javascript-ch27/lib/plane.js:6:21)\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/spot_throws.test.js:6:17)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.start (node:internal/test_runner/test:944:17)\n      at startSubtestAfterBootstrap (node:internal/test_runner/harness:296:17)\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "streams_out.js": {
   "src": "console.log('09:00 engines on');\nconsole.error('warning: crosswind 25 knots');\nconsole.log('09:05 takeoff');\n",
   "stdout": "09:00 engines on\n09:05 takeoff\n",
   "stderr": "warning: crosswind 25 knots\nwarning: crosswind 25 knots\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "node streams_out.js",
     "out": "09:00 engines on\n09:05 takeoff\n",
     "err": "warning: crosswind 25 knots\n",
     "exit": 0,
     "merged": "09:00 engines on\nwarning: crosswind 25 knots\n09:05 takeoff\n"
    },
    {
     "cmd": "node streams_out.js > scratch/log.txt",
     "out": "",
     "err": "warning: crosswind 25 knots\n",
     "exit": 0
    },
    {
     "cmd": "cat scratch/log.txt",
     "out": "09:00 engines on\n09:05 takeoff\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "swap_trace.js": {
   "src": "import { mock } from 'node:test';\n\nconst real = Math.random;\nmock.method(Math, 'random', () => 0.1);\nconsole.log(Math.random(), Math.random === real);\nmock.restoreAll();\nconsole.log(Math.random === real);\n",
   "stdout": "0.1 false\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node swap_trace.js",
     "out": "0.1 false\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tdd_green.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { landingSpeed } from './lib/landing.js';\n\nit('adds 10 knots of margin to the stall speed', () => {\n  assert.equal(landingSpeed(60), 70);\n});\nit('adds 5 more knots in a crosswind', () => {\n  assert.equal(landingSpeed(60, { crosswind: true }), 75);\n});\n",
   "stdout": "✔ adds 10 knots of margin to the stall speed (…ms)\n✔ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec tdd_green.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ adds 10 knots of margin to the stall speed (…ms)\n✔ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 2\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  },
  "lib/landing.js": {
   "src": "export function landingSpeed(stall, { crosswind = false } = {}) {\n  const margin = crosswind ? 15 : 10;\n  return stall + margin;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "tdd_red.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { landingSpeed } from './lib/landing_v1.js';\n\nit('adds 10 knots of margin to the stall speed', () => {\n  assert.equal(landingSpeed(60), 70);\n});\nit('adds 5 more knots in a crosswind', () => {\n  assert.equal(landingSpeed(60, { crosswind: true }), 75);\n});\n",
   "stdout": "✔ adds 10 knots of margin to the stall speed (…ms)\n✖ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at tdd_red.test.js:8:1\n✖ adds 5 more knots in a crosswind (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  70 !== 75\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/tdd_red.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 70,\n    expected: 75,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec tdd_red.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ adds 10 knots of margin to the stall speed (…ms)\n✖ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at tdd_red.test.js:8:1\n✖ adds 5 more knots in a crosswind (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  70 !== 75\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/tdd_red.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:387:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 70,\n    expected: 75,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "✔ adds 10 knots of margin to the stall speed (…ms)\n✖ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at tdd_red.test.js:8:1\n✖ adds 5 more knots in a crosswind (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  70 !== 75\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/tdd_red.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 70,\n    expected: 75,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec tdd_red.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "✔ adds 10 knots of margin to the stall speed (…ms)\n✖ adds 5 more knots in a crosswind (…ms)\nℹ tests 2\nℹ suites 0\nℹ pass 1\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at tdd_red.test.js:8:1\n✖ adds 5 more knots in a crosswind (…ms)\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n  \n  70 !== 75\n  \n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/tdd_red.test.js:9:10)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Test.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:296:3) {\n    generatedMessage: true,\n    code: 'ERR_ASSERTION',\n    actual: 70,\n    expected: 75,\n    operator: 'strictEqual',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "lib/landing_v1.js": {
   "src": "export function landingSpeed(stall) {\n  return stall + 10;\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "throws.test.js": {
   "src": "import { describe, it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { fuelFor, callSign } from './lib/plane.js';\n\ndescribe('the error paths', () => {\n  it('refuses a negative distance', () => {\n    assert.throws(() => fuelFor(-5), RangeError);\n  });\n  it('explains a wrong kind of distance', () => {\n    assert.throws(() => fuelFor('ten'), {\n      name: 'TypeError',\n      message: /got string/,\n    });\n  });\n  it('makes call signs from letters and dashes', () => {\n    assert.match(callSign(' blue heron '), /^[A-Z-]+$/);\n  });\n  it('fails when nothing is thrown', () => {\n    assert.throws(() => fuelFor(10), RangeError);\n  });\n});\n",
   "stdout": "▶ the error paths\n  ✔ refuses a negative distance (…ms)\n  ✔ explains a wrong kind of distance (…ms)\n  ✔ makes call signs from letters and dashes (…ms)\n  ✖ fails when nothing is thrown (…ms)\n✖ the error paths (…ms)\nℹ tests 4\nℹ suites 1\nℹ pass 3\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws.test.js:18:3\n✖ fails when nothing is thrown (…ms)\n  AssertionError [ERR_ASSERTION]: Missing expected exception (RangeError).\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/throws.test.js:19:12)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Suite.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:974:7) {\n    generatedMessage: false,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    operator: 'throws',\n    diff: 'simple'\n  }\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec throws.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "▶ the error paths\n  ✔ refuses a negative distance (…ms)\n  ✔ explains a wrong kind of distance (…ms)\n  ✔ makes call signs from letters and dashes (…ms)\n  ✖ fails when nothing is thrown (…ms)\n✖ the error paths (…ms)\nℹ tests 4\nℹ suites 1\nℹ pass 3\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws.test.js:18:3\n✖ fails when nothing is thrown (…ms)\n  AssertionError [ERR_ASSERTION]: Missing expected exception (RangeError).\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/throws.test.js:19:12)\n      at Test.runInAsyncScope (node:async_hooks:226:14)\n      at Test.run (node:internal/test_runner/test:1402:25)\n      at Suite.processPendingSubtests (node:internal/test_runner/test:974:18)\n      at Test.postRun (node:internal/test_runner/test:1542:19)\n      at Test.run (node:internal/test_runner/test:1467:12)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:974:7) {\n    generatedMessage: false,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    operator: 'throws',\n    diff: 'simple'\n  }\n",
     "err": "",
     "exit": 1,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "▶ the error paths\n  ✔ refuses a negative distance (…ms)\n  ✔ explains a wrong kind of distance (…ms)\n  ✔ makes call signs from letters and dashes (…ms)\n  ✖ fails when nothing is thrown (…ms)\n✖ the error paths (…ms)\nℹ tests 4\nℹ suites 1\nℹ pass 3\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws.test.js:18:3\n✖ fails when nothing is thrown (…ms)\n  AssertionError [ERR_ASSERTION]: Missing expected exception (RangeError).\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/throws.test.js:19:12)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Suite.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:744:7) {\n    generatedMessage: false,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    operator: 'throws',\n    diff: 'simple'\n  }\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec throws.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "▶ the error paths\n  ✔ refuses a negative distance (…ms)\n  ✔ explains a wrong kind of distance (…ms)\n  ✔ makes call signs from letters and dashes (…ms)\n  ✖ fails when nothing is thrown (…ms)\n✖ the error paths (…ms)\nℹ tests 4\nℹ suites 1\nℹ pass 3\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n\n✖ failing tests:\n\ntest at throws.test.js:18:3\n✖ fails when nothing is thrown (…ms)\n  AssertionError [ERR_ASSERTION]: Missing expected exception (RangeError).\n      at TestContext.<anonymous> (file:///home/you/javascript-ch27/throws.test.js:19:12)\n      at Test.runInAsyncScope (node:async_hooks:214:14)\n      at Test.run (node:internal/test_runner/test:1047:25)\n      at Suite.processPendingSubtests (node:internal/test_runner/test:744:18)\n      at Test.postRun (node:internal/test_runner/test:1173:19)\n      at Test.run (node:internal/test_runner/test:1101:12)\n      at async Suite.processPendingSubtests (node:internal/test_runner/test:744:7) {\n    generatedMessage: false,\n    code: 'ERR_ASSERTION',\n    actual: undefined,\n    operator: 'throws',\n    diff: 'simple'\n  }\n",
      "err": "",
      "exit": 1,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "timers.test.js": {
   "src": "import { it } from 'node:test';\nimport assert from 'node:assert/strict';\nimport { remindLater, greeting } from './lib/plane.js';\n\nit('reminds us after one minute, not before', (t) => {\n  t.mock.timers.enable({ apis: ['setTimeout'] });\n  const say = t.mock.fn();\n  remindLater(say);\n  t.mock.timers.tick(59_999);\n  assert.equal(say.mock.callCount(), 0);\n  t.mock.timers.tick(1);\n  assert.deepEqual(say.mock.calls[0].arguments, ['check fuel']);\n});\n\nit('says good morning at 09:00 UTC', (t) => {\n  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-11-08T09:00:00Z') });\n  assert.equal(greeting(), 'Good morning, pilot');\n});\n\nit('says good evening at 21:00 UTC', (t) => {\n  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-11-08T21:00:00Z') });\n  assert.equal(greeting(), 'Good evening, pilot');\n});\n",
   "stdout": "✔ reminds us after one minute, not before (…ms)\n✔ says good morning at 09:00 UTC (…ms)\n✔ says good evening at 21:00 UTC (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node --test --test-reporter=spec timers.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
     "out": "✔ reminds us after one minute, not before (…ms)\n✔ says good morning at 09:00 UTC (…ms)\n✔ says good evening at 21:00 UTC (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "(node:5715) ExperimentalWarning: The MockTimers API is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\n✔ reminds us after one minute, not before (…ms)\n✔ says good morning at 09:00 UTC (…ms)\n✔ says good evening at 21:00 UTC (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node --test --test-reporter=spec timers.test.js | sed -E 's/[0-9.]+ms/…ms/; s/_ms [0-9.]+/_ms …/'",
      "out": "(node:5715) ExperimentalWarning: The MockTimers API is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\n✔ reminds us after one minute, not before (…ms)\n✔ says good morning at 09:00 UTC (…ms)\n✔ says good evening at 21:00 UTC (…ms)\nℹ tests 3\nℹ suites 0\nℹ pass 3\nℹ fail 0\nℹ cancelled 0\nℹ skipped 0\nℹ todo 0\nℹ duration_ms …\n",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     }
    ]
   }
  },
  "trace_ask.js": {
   "src": "import * as readline from 'node:readline';\n\nconst rl = readline.createInterface({ input: process.stdin });\nlet total = 0;\nprocess.stderr.write('leg in km? ');\nfor await (const answer of rl) {\n  if (answer === 'done') break;\n  total += Number(answer);\n  console.log(answer, typeof answer, total);\n  process.stderr.write('leg in km? ');\n}\nrl.close();\n",
   "stdout": "120 string 120\n80 string 200\n45 string 245\n",
   "stderr": "leg in km? leg in km? leg in km? leg in km? ",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_ask.js",
     "out": "120 string 120\n80 string 200\n45 string 245\n",
     "err": "leg in km? leg in km? leg in km? leg in km? ",
     "exit": 0,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "stdin": "120\n80\n45\ndone\n",
   "screen": "leg in km? 120\n120 string 120\nleg in km? 80\n80 string 200\nleg in km? 45\n45 string 245\nleg in km? done\n"
  },
  "trace_hooks.test.js": {
   "src": "import { describe, it, before, beforeEach, afterEach, after } from 'node:test';\n\ndescribe('drills', () => {\n  before(() => console.log('before -'));\n  beforeEach((t) => console.log('beforeEach', t.name));\n  afterEach((t) => console.log('afterEach', t.name));\n  after(() => console.log('after -'));\n\n  it('stall', () => console.log('test stall'));\n  it('engine-fire', () => console.log('test engine-fire'));\n});\n",
   "stdout": "before -\nbeforeEach stall\ntest stall\nafterEach stall\nbeforeEach engine-fire\ntest engine-fire\nafterEach engine-fire\nafter -\n",
   "stderr": "...\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "node --test-reporter=dot --test-reporter-destination=stderr trace_hooks.test.js",
     "out": "before -\nbeforeEach stall\ntest stall\nafterEach stall\nbeforeEach engine-fire\ntest engine-fire\nafterEach engine-fire\nafter -\n",
     "err": "...\n",
     "exit": 0,
     "merged": "before -\nbeforeEach stall\ntest stall\nafterEach stall\nbeforeEach engine-fire\ntest engine-fire\nafterEach engine-fire\nafter -\n...\n"
    }
   ]
  },
  "trace_timers.js": {
   "src": "import { mock } from 'node:test';\n\nmock.timers.enable({ apis: ['setTimeout'] });\nconst log = [];\nsetTimeout(() => log.push('gear'), 300);\nsetTimeout(() => log.push('flaps'), 100);\nsetTimeout(() => log.push('lights'), 500);\n\nlet now = 0;\nfor (const step of [100, 100, 200, 200]) {\n  mock.timers.tick(step);\n  now += step;\n  console.log(now, log.join(',') || '-');\n}\n",
   "stdout": "100 flaps\n200 flaps\n400 flaps,gear\n600 flaps,gear,lights\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node trace_timers.js",
     "out": "100 flaps\n200 flaps\n400 flaps,gear\n600 flaps,gear,lights\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "100 flaps\n200 flaps\n400 flaps,gear\n600 flaps,gear,lights\n",
    "stderr": "(node:5871) ExperimentalWarning: The MockTimers API is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "node trace_timers.js",
      "out": "100 flaps\n200 flaps\n400 flaps,gear\n600 flaps,gear,lights\n",
      "err": "(node:5871) ExperimentalWarning: The MockTimers API is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\n",
      "exit": 0,
      "merged": "100 flaps\n200 flaps\n400 flaps,gear\n600 flaps,gear,lights\n(node:5878) ExperimentalWarning: The MockTimers API is an experimental feature and might change at any time\n(Use `node --trace-warnings ...` to show where the warning was created)\n"
     }
    ]
   }
  },
  "where_away.js": {
   "src": "// This entry runs a script in bin/ from another folder; see its .cmd file.\n",
   "stdout": "",
   "stderr": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[Error: ENOENT: no such file or directory, open 'data/flights.json'] {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/flights.json'\n}\n\nNode.js v26.13.0\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd ..",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node javascript-ch27/bin/load_rel.js",
     "out": "",
     "err": "node:internal/modules/run_main:111\n    triggerUncaughtException(\n    ^\n\n[Error: ENOENT: no such file or directory, open 'data/flights.json'] {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/flights.json'\n}\n\nNode.js v26.13.0\n",
     "exit": 1,
     "dir": "~"
    }
   ],
   "alt": {
    "version": "Node.js 22.23.4",
    "stdout": "",
    "stderr": "node:internal/fs/promises:639\n  return new FileHandle(await PromisePrototypeThen(\n                        ^\n\nError: ENOENT: no such file or directory, open 'data/flights.json'\n    at async open (node:internal/fs/promises:639:25)\n    at async readFile (node:internal/fs/promises:1252:14)\n    at async file:///home/you/javascript-ch27/bin/load_rel.js:3:14 {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/flights.json'\n}\n\nNode.js v22.23.4\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd ..",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/javascript-ch27"
     },
     {
      "cmd": "node javascript-ch27/bin/load_rel.js",
      "out": "",
      "err": "node:internal/fs/promises:639\n  return new FileHandle(await PromisePrototypeThen(\n                        ^\n\nError: ENOENT: no such file or directory, open 'data/flights.json'\n    at async open (node:internal/fs/promises:639:25)\n    at async readFile (node:internal/fs/promises:1252:14)\n    at async file:///home/you/javascript-ch27/bin/load_rel.js:3:14 {\n  errno: -2,\n  code: 'ENOENT',\n  syscall: 'open',\n  path: 'data/flights.json'\n}\n\nNode.js v22.23.4\n",
      "exit": 1,
      "dir": "~"
     }
    ]
   }
  },
  "bin/load_rel.js": {
   "src": "import { readFile } from 'node:fs/promises';\n\nconst text = await readFile('data/flights.json', 'utf8');\nconsole.log('flights:', JSON.parse(text).today.join(' / '));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "where_fixed.js": {
   "src": "// This entry runs a script in bin/ from another folder; see its .cmd file.\n",
   "stdout": "flights: Skylark to Bristol / Wren to Leeds\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd ..",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    },
    {
     "cmd": "node javascript-ch27/bin/load_fixed.js",
     "out": "flights: Skylark to Bristol / Wren to Leeds\n",
     "err": "",
     "exit": 0,
     "dir": "~"
    }
   ]
  },
  "bin/load_fixed.js": {
   "src": "import { readFile } from 'node:fs/promises';\nimport path from 'node:path';\n\nconst where = path.join(import.meta.dirname, '..', 'data', 'flights.json');\nconst text = await readFile(where, 'utf8');\nconsole.log('flights:', JSON.parse(text).today.join(' / '));\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "where_here.js": {
   "src": "// This entry runs a script in bin/ from another folder; see its .cmd file.\n",
   "stdout": "flights: Skylark to Bristol / Wren to Leeds\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "node bin/load_rel.js",
     "out": "flights: Skylark to Bristol / Wren to Leeds\n",
     "err": "",
     "exit": 0,
     "dir": "~/javascript-ch27"
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
