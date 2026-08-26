/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "python",
  "capturedWith": [
   "CPython 3.15.2",
   "CPython 3.13.18"
  ],
  "primary": "CPython 3.15.2",
  "date": "2026-11-08",
  "workdir": "/home/you/python-ch26",
  "versionDifferences": [
   "crash.py",
   "patch_typo.py",
   "pred_side.py",
   "test_typo.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): crash.py, patch_typo.py, pred_side.py, test_typo.py."
 },
 "programs": {
  "boss_predict.py": {
   "src": "import logging\nimport sys\n\nlogging.basicConfig(stream=sys.stdout, level=logging.WARNING,\n                    format=\"%(name)s %(levelname)s %(message)s\")\nradio = logging.getLogger(\"radio\")\nradio.setLevel(logging.DEBUG)\nfuel = logging.getLogger(\"fuel\")\n\nradio.debug(\"switching to channel 2\")\nfuel.info(\"tank at 80%\")\nfuel.warning(\"tank at 15%\")\nlogging.error(\"tower lost\")\n",
   "stdout": "radio DEBUG switching to channel 2\nfuel WARNING tank at 15%\nroot ERROR tower lost\n",
   "stderr": "",
   "exit": 0
  },
  "boss_trace.py": {
   "src": "from unittest import mock\n\nfake_radar = mock.Mock(side_effect=[30, 70, 10])\nfor city in [\"Oslo\", \"Rome\", \"Oslo\"]:\n    wind = fake_radar(city)\n    print(city, wind, fake_radar.call_count)\n",
   "stdout": "Oslo 30 1\nRome 70 2\nOslo 10 3\n",
   "stderr": "",
   "exit": 0
  },
  "cramped.py": {
   "src": "def fuel(km,reserve = 50) :\n    return km*3+reserve\nlegs=[ 120,80 ,200 ]\nprint( [fuel(k) for k in legs] )\n",
   "stdout": "--- cramped.py\n+++ cramped.py\n@@ -1,4 +1,6 @@\n-def fuel(km,reserve = 50) :\n-    return km*3+reserve\n-legs=[ 120,80 ,200 ]\n-print( [fuel(k) for k in legs] )\n+def fuel(km, reserve=50):\n+    return km * 3 + reserve\n+\n+\n+legs = [120, 80, 200]\n+print([fuel(k) for k in legs])\n\n",
   "stderr": "1 file would be reformatted\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "ruff format --diff cramped.py",
     "out": "--- cramped.py\n+++ cramped.py\n@@ -1,4 +1,6 @@\n-def fuel(km,reserve = 50) :\n-    return km*3+reserve\n-legs=[ 120,80 ,200 ]\n-print( [fuel(k) for k in legs] )\n+def fuel(km, reserve=50):\n+    return km * 3 + reserve\n+\n+\n+legs = [120, 80, 200]\n+print([fuel(k) for k in legs])\n\n",
     "err": "1 file would be reformatted\n",
     "exit": 1,
     "merged": "--- cramped.py\n+++ cramped.py\n@@ -1,4 +1,6 @@\n-def fuel(km,reserve = 50) :\n-    return km*3+reserve\n-legs=[ 120,80 ,200 ]\n-print( [fuel(k) for k in legs] )\n+def fuel(km, reserve=50):\n+    return km * 3 + reserve\n+\n+\n+legs = [120, 80, 200]\n+print([fuel(k) for k in legs])\n\n1 file would be reformatted\n"
    }
   ]
  },
  "crash.py": {
   "src": "def average(scores):\n    return sum(scores) / len(scores)\n\n\ndef report(team):\n    avg = average(team[\"scores\"])\n    return f\"{team['name']}: {avg:.1f}\"\n\n\nteams = [{\"name\": \"Hawks\", \"scores\": [7, 9]},\n         {\"name\": \"Owls\", \"scores\": []}]\nfor t in teams:\n    print(report(t))\n",
   "stdout": "> /home/you/python-ch26/crash.py(1)<module>()\n-> def average(scores):\n(Pdb) Hawks: 8.0\nUncaught exception. Entering post mortem debugging\nRunning 'cont' or 'step' will restart the program\n> /home/you/python-ch26/crash.py(2)average()\n-> return sum(scores) / len(scores)\n(Pdb) []\n(Pdb) > /home/you/python-ch26/crash.py(6)report()\n-> avg = average(team[\"scores\"])\n(Pdb) {'name': 'Owls', 'scores': []}\n(Pdb)   5  \tdef report(team):\n  6  ->\t    avg = average(team[\"scores\"])\n  7  \t    return f\"{team['name']}: {avg:.1f}\"\n(Pdb) ",
   "stderr": "Traceback (most recent call last):\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 3873, in main\n    pdb._run(target)\n    ~~~~~~~~^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 2770, in _run\n    self.run(target.code)\n    ~~~~~~~~^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/bdb.py\", line 912, in run\n    exec(cmd, globals, locals)\n    ~~~~^^^^^^^^^^^^^^^^^^^^^^\n  File \"<string>\", line 1, in <module>\n  File \"/home/you/python-ch26/crash.py\", line 13, in <module>\n    print(report(t))\n          ~~~~~~^^^\n  File \"/home/you/python-ch26/crash.py\", line 6, in report\n    avg = average(team[\"scores\"])\n  File \"/home/you/python-ch26/crash.py\", line 2, in average\n    return sum(scores) / len(scores)\n           ~~~~~~~~~~~~^~~~~~~~~~~~~\nZeroDivisionError: division by zero\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pdb crash.py",
     "out": "> /home/you/python-ch26/crash.py(1)<module>()\n-> def average(scores):\n(Pdb) Hawks: 8.0\nUncaught exception. Entering post mortem debugging\nRunning 'cont' or 'step' will restart the program\n> /home/you/python-ch26/crash.py(2)average()\n-> return sum(scores) / len(scores)\n(Pdb) []\n(Pdb) > /home/you/python-ch26/crash.py(6)report()\n-> avg = average(team[\"scores\"])\n(Pdb) {'name': 'Owls', 'scores': []}\n(Pdb)   5  \tdef report(team):\n  6  ->\t    avg = average(team[\"scores\"])\n  7  \t    return f\"{team['name']}: {avg:.1f}\"\n(Pdb) ",
     "err": "Traceback (most recent call last):\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 3873, in main\n    pdb._run(target)\n    ~~~~~~~~^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 2770, in _run\n    self.run(target.code)\n    ~~~~~~~~^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/bdb.py\", line 912, in run\n    exec(cmd, globals, locals)\n    ~~~~^^^^^^^^^^^^^^^^^^^^^^\n  File \"<string>\", line 1, in <module>\n  File \"/home/you/python-ch26/crash.py\", line 13, in <module>\n    print(report(t))\n          ~~~~~~^^^\n  File \"/home/you/python-ch26/crash.py\", line 6, in report\n    avg = average(team[\"scores\"])\n  File \"/home/you/python-ch26/crash.py\", line 2, in average\n    return sum(scores) / len(scores)\n           ~~~~~~~~~~~~^~~~~~~~~~~~~\nZeroDivisionError: division by zero\n",
     "exit": 0,
     "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
    }
   ],
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "> /home/you/python-ch26/crash.py(1)<module>()\n-> def average(scores):\n(Pdb) Hawks: 8.0\nUncaught exception. Entering post mortem debugging\nRunning 'cont' or 'step' will restart the program\n> /home/you/python-ch26/crash.py(2)average()\n-> return sum(scores) / len(scores)\n(Pdb) []\n(Pdb) > /home/you/python-ch26/crash.py(6)report()\n-> avg = average(team[\"scores\"])\n(Pdb) {'name': 'Owls', 'scores': []}\n(Pdb)   5  \tdef report(team):\n  6  ->\t    avg = average(team[\"scores\"])\n  7  \t    return f\"{team['name']}: {avg:.1f}\"\n(Pdb) ",
    "stderr": "Traceback (most recent call last):\n  File \"/usr/local/lib/python3.13/pdb.py\", line 2524, in main\n    pdb._run(target)\n    ~~~~~~~~^^^^^^^^\n  File \"/usr/local/lib/python3.13/pdb.py\", line 2264, in _run\n    self.run(target.code)\n    ~~~~~~~~^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/bdb.py\", line 680, in run\n    exec(cmd, globals, locals)\n    ~~~~^^^^^^^^^^^^^^^^^^^^^^\n  File \"<string>\", line 1, in <module>\n  File \"/home/you/python-ch26/crash.py\", line 13, in <module>\n    print(report(t))\n          ~~~~~~^^^\n  File \"/home/you/python-ch26/crash.py\", line 6, in report\n    avg = average(team[\"scores\"])\n  File \"/home/you/python-ch26/crash.py\", line 2, in average\n    return sum(scores) / len(scores)\n           ~~~~~~~~~~~~^~~~~~~~~~~~~\nZeroDivisionError: division by zero\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "python3 -m pdb crash.py",
      "out": "> /home/you/python-ch26/crash.py(1)<module>()\n-> def average(scores):\n(Pdb) Hawks: 8.0\nUncaught exception. Entering post mortem debugging\nRunning 'cont' or 'step' will restart the program\n> /home/you/python-ch26/crash.py(2)average()\n-> return sum(scores) / len(scores)\n(Pdb) []\n(Pdb) > /home/you/python-ch26/crash.py(6)report()\n-> avg = average(team[\"scores\"])\n(Pdb) {'name': 'Owls', 'scores': []}\n(Pdb)   5  \tdef report(team):\n  6  ->\t    avg = average(team[\"scores\"])\n  7  \t    return f\"{team['name']}: {avg:.1f}\"\n(Pdb) ",
      "err": "Traceback (most recent call last):\n  File \"/usr/local/lib/python3.13/pdb.py\", line 2524, in main\n    pdb._run(target)\n    ~~~~~~~~^^^^^^^^\n  File \"/usr/local/lib/python3.13/pdb.py\", line 2264, in _run\n    self.run(target.code)\n    ~~~~~~~~^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/bdb.py\", line 680, in run\n    exec(cmd, globals, locals)\n    ~~~~^^^^^^^^^^^^^^^^^^^^^^\n  File \"<string>\", line 1, in <module>\n  File \"/home/you/python-ch26/crash.py\", line 13, in <module>\n    print(report(t))\n          ~~~~~~^^^\n  File \"/home/you/python-ch26/crash.py\", line 6, in report\n    avg = average(team[\"scores\"])\n  File \"/home/you/python-ch26/crash.py\", line 2, in average\n    return sum(scores) / len(scores)\n           ~~~~~~~~~~~~^~~~~~~~~~~~~\nZeroDivisionError: division by zero\n",
      "exit": 0,
      "mergedDropped": "the re-run for the merged view printed different lines (stateful step?)"
     }
    ]
   },
   "stdin": "c\np scores\nu\np team\nll\nq\n",
   "screen": "> /home/you/python-ch26/crash.py(1)<module>()\n-> def average(scores):\n(Pdb) c\nHawks: 8.0\nTraceback (most recent call last):\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 3873, in main\n    pdb._run(target)\n    ~~~~~~~~^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/pdb.py\", line 2770, in _run\n    self.run(target.code)\n    ~~~~~~~~^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/bdb.py\", line 912, in run\n    exec(cmd, globals, locals)\n    ~~~~^^^^^^^^^^^^^^^^^^^^^^\n  File \"<string>\", line 1, in <module>\n  File \"/home/you/python-ch26/crash.py\", line 13, in <module>\n    print(report(t))\n          ~~~~~~^^^\n  File \"/home/you/python-ch26/crash.py\", line 6, in report\n    avg = average(team[\"scores\"])\n  File \"/home/you/python-ch26/crash.py\", line 2, in average\n    return sum(scores) / len(scores)\n           ~~~~~~~~~~~~^~~~~~~~~~~~~\nZeroDivisionError: division by zero\nUncaught exception. Entering post mortem debugging\nRunning 'cont' or 'step' will restart the program\n> /home/you/python-ch26/crash.py(2)average()\n-> return sum(scores) / len(scores)\n(Pdb) p scores\n[]\n(Pdb) u\n> /home/you/python-ch26/crash.py(6)report()\n-> avg = average(team[\"scores\"])\n(Pdb) p team\n{'name': 'Owls', 'scores': []}\n(Pdb) ll\n  5  \tdef report(team):\n  6  ->\t    avg = average(team[\"scores\"])\n  7  \t    return f\"{team['name']}: {avg:.1f}\"\n(Pdb) q\n"
  },
  "debug_prints.py": {
   "src": "def fuel_needed(km):\n    litres = km * 3 + 50\n    print(\"DEBUG litres =\", litres)\n    return litres\n\n\ntotal = fuel_needed(120) + fuel_needed(80)\nprint(f\"Load {total} litres.\")\n",
   "stdout": "DEBUG litres = 410\nDEBUG litres = 290\nLoad 700 litres.\n",
   "stderr": "",
   "exit": 0
  },
  "dial.py": {
   "src": "import logging\nimport sys\n\nlog = logging.getLogger(\"cockpit\")\nhandler = logging.StreamHandler(sys.stdout)\nhandler.setFormatter(logging.Formatter(\"  %(levelname)s %(message)s\"))\nlog.addHandler(handler)\n\nfor dial in [\"DEBUG\", \"INFO\", \"WARNING\", \"ERROR\", \"CRITICAL\"]:\n    log.setLevel(dial)\n    print(\"dial at\", dial)\n    log.debug(\"flaps at 10 degrees\")\n    log.info(\"climbing to 3000 m\")\n    log.warning(\"light turbulence ahead\")\n    log.error(\"left engine is coughing\")\n    log.critical(\"both engines stopped\")\n",
   "stdout": "dial at DEBUG\n  DEBUG flaps at 10 degrees\n  INFO climbing to 3000 m\n  WARNING light turbulence ahead\n  ERROR left engine is coughing\n  CRITICAL both engines stopped\ndial at INFO\n  INFO climbing to 3000 m\n  WARNING light turbulence ahead\n  ERROR left engine is coughing\n  CRITICAL both engines stopped\ndial at WARNING\n  WARNING light turbulence ahead\n  ERROR left engine is coughing\n  CRITICAL both engines stopped\ndial at ERROR\n  ERROR left engine is coughing\n  CRITICAL both engines stopped\ndial at CRITICAL\n  CRITICAL both engines stopped\n",
   "stderr": "",
   "exit": 0
  },
  "doc_fuel.py": {
   "src": "def fuel_needed(km):\n    \"\"\"Litres for a trip: 3 per km, plus a 50 litre reserve.\n\n    >>> fuel_needed(10)\n    80\n    >>> fuel_needed(0)\n    50\n    \"\"\"\n    return km * 3 + 50\n",
   "stdout": ".                                                                        [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED doc_fuel.py::doc_fuel.fuel_needed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA --doctest-modules doc_fuel.py",
     "out": ".                                                                        [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED doc_fuel.py::doc_fuel.fuel_needed\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "docless.py": {
   "src": "def fuel_needed(km, reserve=50):\n    return km * 3 + reserve\n",
   "stdout": "docless.py:1:1: D100 Missing docstring in public module\ndocless.py:1:5: D103 Missing docstring in public function\nFound 2 errors.\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "ruff check --select D docless.py",
     "out": "docless.py:1:1: D100 Missing docstring in public module\ndocless.py:1:5: D103 Missing docstring in public function\nFound 2 errors.\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "documented.py": {
   "src": "\"\"\"Fuel sums for Pip Air.\"\"\"\n\n\ndef fuel_needed(km, reserve=50):\n    \"\"\"Work out the fuel a trip needs.\n\n    Args:\n        km: How far the plane flies, in kilometres.\n        reserve: Extra litres kept for emergencies.\n\n    Returns:\n        The litres to load: 3 per kilometre, plus the reserve.\n    \"\"\"\n    return km * 3 + reserve\n\n\nhelp(fuel_needed)\n",
   "stdout": "Help on function fuel_needed in module __main__:\n\nfuel_needed(km, reserve=50)\n    Work out the fuel a trip needs.\n\n    Args:\n        km: How far the plane flies, in kilometres.\n        reserve: Extra litres kept for emergencies.\n\n    Returns:\n        The litres to load: 3 per kilometre, plus the reserve.\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ruff check --select D documented.py",
     "out": "All checks passed!\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "python3 documented.py",
     "out": "Help on function fuel_needed in module __main__:\n\nfuel_needed(km, reserve=50)\n    Work out the fuel a trip needs.\n\n    Args:\n        km: How far the plane flies, in kilometres.\n        reserve: Extra litres kept for emergencies.\n\n    Returns:\n        The litres to load: 3 per kilometre, plus the reserve.\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "egroup.py": {
   "src": "def preflight(plane):\n    problems = []\n    if plane[\"fuel\"] < 50:\n        problems.append(ValueError(f\"fuel {plane['fuel']} is below 50\"))\n    if not plane[\"doors_shut\"]:\n        err = RuntimeError(\"cabin door open\")\n        err.add_note(\"Check door 2L, behind the galley.\")\n        problems.append(err)\n    if problems:\n        raise ExceptionGroup(\"preflight failed\", problems)\n\n\npreflight({\"fuel\": 30, \"doors_shut\": False})\n",
   "stdout": "",
   "stderr": "  + Exception Group Traceback (most recent call last):\n  |   File \"/home/you/python-ch26/egroup.py\", line 13, in <module>\n  |     preflight({\"fuel\": 30, \"doors_shut\": False})\n  |     ~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  |   File \"/home/you/python-ch26/egroup.py\", line 10, in preflight\n  |     raise ExceptionGroup(\"preflight failed\", problems)\n  | ExceptionGroup: preflight failed (2 sub-exceptions)\n  +-+---------------- 1 ----------------\n    | ValueError: fuel 30 is below 50\n    +---------------- 2 ----------------\n    | RuntimeError: cabin door open\n    | Check door 2L, behind the galley.\n    +------------------------------------\n",
   "exit": 1
  },
  "engine.py": {
   "src": "import logging\n\nlog = logging.getLogger(__name__)\n\n\ndef start(fuel):\n    log.debug(\"start() called with fuel=%s\", fuel)\n    if fuel < 20:\n        log.warning(\"only %s litres left\", fuel)\n    return fuel > 0\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "ex_basic.py": {
   "src": "import logging\nimport sys\n\nlogging.basicConfig(stream=sys.stdout, level=logging.DEBUG,\n                    format=\"%(levelname)s %(message)s\")\nlogging.debug(\"pitot heat on\")\nlogging.info(\"taxiing to runway 2\")\n",
   "stdout": "DEBUG pitot heat on\nINFO taxiing to runway 2\n",
   "stderr": "",
   "exit": 0
  },
  "ex_cases.py": {
   "src": "def fuel_needed(km):\n    return km * 3 + 50\n\n\ncases = [(10, 80), (0, 50), (100, 300)]\nfor km, expected in cases:\n    got = fuel_needed(km)\n    print(km, got, got == expected)\n",
   "stdout": "10 80 True\n0 50 True\n100 350 False\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fixture.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef runway():\n    print(\"open the runway\")\n    yield \"runway 2\"\n    print(\"close the runway\")\n\n\ndef test_land(runway):\n    print(\"land on\", runway)\n    assert runway == \"runway 2\"\n",
   "stdout": "open the runway\nland on runway 2\n.close the runway\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -s ex_fixture.py",
     "out": "open the runway\nland on runway 2\n.close the runway\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ex_fixture_alt.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef runway():\n    print(\"open the runway\")\n    yield \"runway 2\"\n    print(\"close the runway\")\n\n\ndef test_land(runway):\n    assert runway == \"runway 2\"\n    print(\"land on\", runway)\n",
   "stdout": "open the runway\nland on runway 2\n.close the runway\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -s ex_fixture_alt.py",
     "out": "open the runway\nland on runway 2\n.close the runway\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ex_late.py": {
   "src": "import logging\nimport sys\n\nlogging.warning(\"checking the weather\")\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO)\nlogging.info(\"wind 12 km/h\")\nlogging.info(\"visibility 10 km\")\n",
   "stdout": "",
   "stderr": "WARNING:root:checking the weather\n",
   "exit": 0
  },
  "ex_yield.py": {
   "src": "def plane():\n    print(\"crew: fuel up\")\n    yield \"plane 7\"\n    print(\"crew: park\")\n\n\ncrew = plane()\np = next(crew)\nprint(\"test: fly\", p)\nnext(crew, None)\nprint(\"report: done\")\n",
   "stdout": "crew: fuel up\ntest: fly plane 7\ncrew: park\nreport: done\n",
   "stderr": "",
   "exit": 0
  },
  "fare.py": {
   "src": "def fare(age):\n    if age < 2:\n        return 0\n    if age < 12:\n        return 50\n    return 100\n\n\nprint(fare(30))\nprint(fare(8))\n",
   "stdout": "    1: def fare(age):\n    2:     if age < 2:\n>>>>>>         return 0\n    2:     if age < 12:\n    1:         return 50\n    1:     return 100\n       \n       \n    1: print(fare(30))\n    1: print(fare(8))\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m trace --count --missing -C . fare.py",
     "out": "100\n50\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch26"
    },
    {
     "cmd": "cat fare.cover",
     "out": "    1: def fare(age):\n    2:     if age < 2:\n>>>>>>         return 0\n    2:     if age < 12:\n    1:         return 50\n    1:     return 100\n       \n       \n    1: print(fare(30))\n    1: print(fare(8))\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch26"
    }
   ]
  },
  "flightlog.py": {
   "src": "\"\"\"Pip Air's flight log: turn log lines into totals.\"\"\"\n\nimport logging\n\nlog = logging.getLogger(__name__)\n\n\ndef parse_leg(line):\n    \"\"\"Turn \"LHR-CDG 340\" into (\"LHR-CDG\", 340).\n\n    Raises:\n        ValueError: If the distance is missing or negative.\n    \"\"\"\n    route, _, km = line.partition(\" \")\n    if not km:\n        raise ValueError(f\"no distance in {line!r}\")\n    distance = int(km)\n    if distance < 0:\n        raise ValueError(f\"negative distance in {line!r}\")\n    log.debug(\"parsed %s: %s km\", route, distance)\n    return route, distance\n\n\ndef total_km(lines):\n    \"\"\"Add up the distances, skipping blank lines.\"\"\"\n    return sum(parse_leg(line)[1] for line in lines if line.strip())\n",
   "stdout": ".....                                                                    [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "ruff check flightlog.py test_flightlog.py",
     "out": "All checks passed!\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch26"
    },
    {
     "cmd": "ruff format --check flightlog.py test_flightlog.py",
     "out": "2 files already formatted\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch26"
    },
    {
     "cmd": "python3 -m pytest -qq test_flightlog.py",
     "out": ".....                                                                    [100%]\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch26"
    }
   ]
  },
  ".pre-commit-config.yaml": {
   "src": "# Runs before every `git commit`. If any hook fails, the commit stops.\nrepos:\n  - repo: https://github.com/astral-sh/ruff-pre-commit\n    rev: v0.16.9\n    hooks:\n      - id: ruff-check\n      - id: ruff-format\n  - repo: local\n    hooks:\n      - id: pytest\n        name: pytest\n        entry: python3 -m pytest -qq\n        language: system\n        pass_filenames: false\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "forgot_bp.py": {
   "src": "total = 0\nfor km in [120, 80]:\n    breakpoint()\n    total += km * 3\nprint(\"fuel used:\", total)\n",
   "stdout": "fuel used: 600\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "PYTHONBREAKPOINT=0 python3 forgot_bp.py",
     "out": "fuel used: 600\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fuel_log.py": {
   "src": "legs = [120, 80, -40, 200]\ntotal = 0\nfor km in legs:\n    total += km * 3\nprint(\"fuel used:\", total)\n",
   "stdout": "> /home/you/python-ch26/fuel_log.py(1)<module>()\n-> legs = [120, 80, -40, 200]\n(Pdb) Breakpoint 1 at /home/you/python-ch26/fuel_log.py:4\n(Pdb) > /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) (-40, 600)\n(Pdb) display total: 600\n(Pdb) > /home/you/python-ch26/fuel_log.py(3)<module>()\n-> for km in legs:\ndisplay total: 480  [old: 600]\n(Pdb) > /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) ",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pdb fuel_log.py",
     "out": "> /home/you/python-ch26/fuel_log.py(1)<module>()\n-> legs = [120, 80, -40, 200]\n(Pdb) Breakpoint 1 at /home/you/python-ch26/fuel_log.py:4\n(Pdb) > /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) (-40, 600)\n(Pdb) display total: 600\n(Pdb) > /home/you/python-ch26/fuel_log.py(3)<module>()\n-> for km in legs:\ndisplay total: 480  [old: 600]\n(Pdb) > /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) ",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "b 4, km < 0\nc\np km, total\ndisplay total\nn\nn\nq\n",
   "screen": "> /home/you/python-ch26/fuel_log.py(1)<module>()\n-> legs = [120, 80, -40, 200]\n(Pdb) b 4, km < 0\nBreakpoint 1 at /home/you/python-ch26/fuel_log.py:4\n(Pdb) c\n> /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) p km, total\n(-40, 600)\n(Pdb) display total\ndisplay total: 600\n(Pdb) n\n> /home/you/python-ch26/fuel_log.py(3)<module>()\n-> for km in legs:\ndisplay total: 480  [old: 600]\n(Pdb) n\n> /home/you/python-ch26/fuel_log.py(4)<module>()\n-> total += km * 3\n(Pdb) q\n"
  },
  "levels.py": {
   "src": "import logging\n\ndial = logging.INFO\nfor name in [\"DEBUG\", \"INFO\", \"WARNING\", \"ERROR\"]:\n    number = getattr(logging, name)\n    print(name, number, number >= dial)\n",
   "stdout": "DEBUG 10 False\nINFO 20 True\nWARNING 30 True\nERROR 40 True\n",
   "stderr": "",
   "exit": 0
  },
  "lint_ex.py": {
   "src": "def seats_left(capacity, booked):\n    free = capacity - booked\n    if booked > capacity:\n        overbooked = booked - capacity\n    return free\n\n\nprint(seats_left(180, 175))\n",
   "stdout": "lint_ex.py:4:9: F841 Local variable `overbooked` is assigned to but never used\nFound 1 error.\nNo fixes available (1 hidden fix can be enabled with the `--unsafe-fixes` option).\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 lint_ex.py",
     "out": "5\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "ruff check lint_ex.py",
     "out": "lint_ex.py:4:9: F841 Local variable `overbooked` is assigned to but never used\nFound 1 error.\nNo fixes available (1 hidden fix can be enabled with the `--unsafe-fixes` option).\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "log_default.py": {
   "src": "import logging\n\nlogging.debug(\"checking the flaps\")\nlogging.info(\"fuel is fine\")\nlogging.warning(\"low on coffee\")\nlogging.error(\"left engine won't start\")\nprint(\"program finished\")\n",
   "stdout": "program finished\n",
   "stderr": "WARNING:root:low on coffee\nERROR:root:left engine won't start\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 log_default.py",
     "out": "program finished\n",
     "err": "WARNING:root:low on coffee\nERROR:root:left engine won't start\n",
     "exit": 0,
     "merged": "WARNING:root:low on coffee\nERROR:root:left engine won't start\nprogram finished\n"
    }
   ]
  },
  "log_ex.py": {
   "src": "import logging\nimport sys\n\nlogging.basicConfig(stream=sys.stdout, level=logging.INFO,\n                    format=\"%(levelname)s:%(name)s:%(message)s\")\nlog = logging.getLogger(\"gate\")\n\nlog.debug(\"door sensor ok\")\nlog.info(\"boarding group A\")\nlogging.warning(\"gate changed to B7\")\nlog.error(\"jet bridge stuck\")\n",
   "stdout": "INFO:gate:boarding group A\nWARNING:root:gate changed to B7\nERROR:gate:jet bridge stuck\n",
   "stderr": "",
   "exit": 0
  },
  "log_force.py": {
   "src": "import logging\n\nlogging.warning(\"tower is not answering\")\nlogging.basicConfig(level=logging.DEBUG, force=True)\nlogging.info(\"trying the backup radio\")\nlogging.debug(\"radio channel 2\")\n",
   "stdout": "",
   "stderr": "WARNING:root:tower is not answering\nINFO:root:trying the backup radio\nDEBUG:root:radio channel 2\n",
   "exit": 0
  },
  "log_late.py": {
   "src": "import logging\n\nlogging.warning(\"tower is not answering\")\nlogging.basicConfig(level=logging.DEBUG)\nlogging.info(\"trying the backup radio\")\nlogging.debug(\"radio channel 2\")\n",
   "stdout": "",
   "stderr": "WARNING:root:tower is not answering\n",
   "exit": 0
  },
  "log_setup.py": {
   "src": "import logging\n\nimport engine\n\nlogging.basicConfig(level=logging.INFO,\n                    format=\"%(levelname)-8s %(name)s: %(message)s\")\nlog = logging.getLogger(__name__)\n\nlog.info(\"preflight starting\")\nengine.start(15)\nlog.info(\"engine running\")\n",
   "stdout": "",
   "stderr": "INFO     __main__: preflight starting\nWARNING  engine: only 15 litres left\nINFO     __main__: engine running\n",
   "exit": 0
  },
  "messy.py": {
   "src": "import os, sys\nimport json\n\n\ndef add_passenger(name, manifest=[]):\n    unused = len(name)\n    manifest.append(name)\n    if manifest == None:\n        return []\n    return manifest\n\n\nprint(add_passenger(\"Ada\"))\nprint(add_passenger(\"Grace\"))\n",
   "stdout": "messy.py:1:1: E401 [*] Multiple imports on one line\nmessy.py:1:1: I001 [*] Import block is un-sorted or un-formatted\nmessy.py:1:8: F401 [*] `os` imported but unused\nmessy.py:1:12: F401 [*] `sys` imported but unused\nmessy.py:2:8: F401 [*] `json` imported but unused\nmessy.py:5:34: B006 Do not use mutable data structures for argument defaults\nmessy.py:6:5: F841 Local variable `unused` is assigned to but never used\nmessy.py:8:20: E711 Comparison to `None` should be `cond is None`\nFound 8 errors.\n[*] 5 fixable with the `--fix` option (3 hidden fixes can be enabled with the `--unsafe-fixes` option).\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 messy.py",
     "out": "['Ada']\n['Ada', 'Grace']\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "ruff check messy.py",
     "out": "messy.py:1:1: E401 [*] Multiple imports on one line\nmessy.py:1:1: I001 [*] Import block is un-sorted or un-formatted\nmessy.py:1:8: F401 [*] `os` imported but unused\nmessy.py:1:12: F401 [*] `sys` imported but unused\nmessy.py:2:8: F401 [*] `json` imported but unused\nmessy.py:5:34: B006 Do not use mutable data structures for argument defaults\nmessy.py:6:5: F841 Local variable `unused` is assigned to but never used\nmessy.py:8:20: E711 Comparison to `None` should be `cond is None`\nFound 8 errors.\n[*] 5 fixable with the `--fix` option (3 hidden fixes can be enabled with the `--unsafe-fixes` option).\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "ruff.toml": {
   "src": "# Pip's linter settings: which checks ruff runs, and how it reports them.\noutput-format = \"concise\"\nline-length = 79\n\n[lint]\nselect = [\"E\", \"F\", \"W\", \"I\", \"B\"]\n\n[lint.pydocstyle]\nconvention = \"google\"\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "patch_demo.py": {
   "src": "from unittest import mock\n\nimport radar\nimport tower\n\nwith mock.patch(\"radar.wind_speed\", return_value=20):\n    try:\n        print(\"patched radar:\", tower.cleared_for_takeoff())\n    except ConnectionError as err:\n        print(\"patched radar: the real one ran!\", err)\n\nwith mock.patch(\"tower.wind_speed\", return_value=20):\n    print(\"patched tower:\", tower.cleared_for_takeoff())\n\nprint(\"after:\", tower.wind_speed is radar.wind_speed)\n",
   "stdout": "patched radar: the real one ran! no network in the hangar\npatched tower: True\nafter: True\n",
   "stderr": "",
   "exit": 0
  },
  "patch_typo.py": {
   "src": "from unittest import mock\n\nimport tower\n\nwith mock.patch(\"tower.wind_sped\", return_value=20):\n    print(tower.cleared_for_takeoff())\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch26/patch_typo.py\", line 5, in <module>\n    with mock.patch(\"tower.wind_sped\", return_value=20):\n         ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/unittest/mock.py\", line 1510, in __enter__\n    original, local = self.get_original()\n                      ~~~~~~~~~~~~~~~~~^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/unittest/mock.py\", line 1480, in get_original\n    raise AttributeError(\n        \"%s does not have the attribute %r\" % (target, name)\n    )\nAttributeError: <module 'tower' from '/home/you/python-ch26/tower.py'> does not have the attribute 'wind_sped'\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch26/patch_typo.py\", line 5, in <module>\n    with mock.patch(\"tower.wind_sped\", return_value=20):\n         ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/unittest/mock.py\", line 1503, in __enter__\n    original, local = self.get_original()\n                      ~~~~~~~~~~~~~~~~~^^\n  File \"/usr/local/lib/python3.13/unittest/mock.py\", line 1473, in get_original\n    raise AttributeError(\n        \"%s does not have the attribute %r\" % (target, name)\n    )\nAttributeError: <module 'tower' from '/home/you/python-ch26/tower.py'> does not have the attribute 'wind_sped'\n",
    "exit": 1
   }
  },
  "pred_side.py": {
   "src": "from unittest import mock\n\nfake = mock.Mock(side_effect=[30, 70])\nprint(fake(\"Oslo\"))\nprint(fake(\"Rome\"))\nprint(fake.call_count)\nprint(fake(\"Oslo\"))\n",
   "stdout": "30\n70\n2\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch26/pred_side.py\", line 7, in <module>\n    print(fake(\"Oslo\"))\n          ~~~~^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/unittest/mock.py\", line 1176, in __call__\n    return self._mock_call(*args, **kwargs)\n           ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/unittest/mock.py\", line 1180, in _mock_call\n    return self._execute_mock_call(*args, **kwargs)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/unittest/mock.py\", line 1243, in _execute_mock_call\n    result = next(effect)\nStopIteration\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "30\n70\n2\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch26/pred_side.py\", line 7, in <module>\n    print(fake(\"Oslo\"))\n          ~~~~^^^^^^^^\n  File \"/usr/local/lib/python3.13/unittest/mock.py\", line 1169, in __call__\n    return self._mock_call(*args, **kwargs)\n           ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/unittest/mock.py\", line 1173, in _mock_call\n    return self._execute_mock_call(*args, **kwargs)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/unittest/mock.py\", line 1236, in _execute_mock_call\n    result = next(effect)\nStopIteration\n",
    "exit": 1
   }
  },
  "prop_chunk.py": {
   "src": "import random\n\n\ndef chunks(items, size):\n    \"\"\"Split items into groups of `size`, like rows of seats.\"\"\"\n    last_start = len(items) - size + 1\n    return [items[i:i + size] for i in range(0, last_start, size)]\n\n\n# Example tests: both pass.\nassert chunks([1, 2, 3, 4], 2) == [[1, 2], [3, 4]]\nassert chunks([1, 2, 3, 4, 5, 6], 3) == [[1, 2, 3], [4, 5, 6]]\nprint(\"example tests: passed\")\n\n# Property: gluing the chunks back together gives the items back.\nrandom.seed(26)\nfor attempt in range(1, 101):\n    items = random.sample(range(10), random.randint(0, 6))\n    size = random.randint(1, 4)\n    glued = [x for chunk in chunks(items, size) for x in chunk]\n    if glued != items:\n        lost = items[len(glued):]\n        print(f\"attempt {attempt}: chunks({items}, {size}) lost {lost}\")\n        break\nelse:\n    print(\"property held 100 times\")\n",
   "stdout": "example tests: passed\nattempt 3: chunks([9, 8, 2, 5, 3], 2) lost [3]\n",
   "stderr": "",
   "exit": 0
  },
  "radar.py": {
   "src": "def wind_speed():\n    \"\"\"Ask the weather service for the wind in km/h.\"\"\"\n    raise ConnectionError(\"no network in the hangar\")\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "test_announce.py": {
   "src": "def announce(gate):\n    print(f\"Now boarding at gate {gate}\")\n\n\ndef test_announce_wrong(capsys):\n    announce(\"B4\")\n    captured = capsys.readouterr()\n    assert captured.out == \"Now boarding at gate B4\"\n\n\ndef test_announce_right(capsys):\n    announce(\"B4\")\n    captured = capsys.readouterr()\n    assert captured.out == \"Now boarding at gate B4\\n\"\n",
   "stdout": "F.                                                                       [100%]\n=================================== FAILURES ===================================\n_____________________________ test_announce_wrong ______________________________\ntest_announce.py:8: in test_announce_wrong\n    assert captured.out == \"Now boarding at gate B4\"\nE   AssertionError: assert 'Now boarding at gate B4\\n' == 'Now boarding at gate B4'\nE     \nE     - Now boarding at gate B4\nE     + Now boarding at gate B4\nE     ?                        +\n=========================== short test summary info ============================\nFAILED test_announce.py::test_announce_wrong - AssertionError: assert 'Now bo...\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq --tb=short test_announce.py",
     "out": "F.                                                                       [100%]\n=================================== FAILURES ===================================\n_____________________________ test_announce_wrong ______________________________\ntest_announce.py:8: in test_announce_wrong\n    assert captured.out == \"Now boarding at gate B4\"\nE   AssertionError: assert 'Now boarding at gate B4\\n' == 'Now boarding at gate B4'\nE     \nE     - Now boarding at gate B4\nE     + Now boarding at gate B4\nE     ?                        +\n=========================== short test summary info ============================\nFAILED test_announce.py::test_announce_wrong - AssertionError: assert 'Now bo...\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_board.py": {
   "src": "import pytest\n\n\ndef boarding_group(row):\n    if row < 5:\n        return \"A\"\n    if row <= 20:\n        return \"B\"\n    return \"C\"\n\n\n@pytest.mark.parametrize(\"row, group\", [\n    (1, \"A\"),\n    (5, \"A\"),\n    (6, \"B\"),\n    (20, \"B\"),\n    (21, \"C\"),\n])\ndef test_boarding_group(row, group):\n    assert boarding_group(row) == group\n",
   "stdout": ".F...                                                                    [100%]\n=================================== FAILURES ===================================\n___________________________ test_boarding_group[5-A] ___________________________\n\nrow = 5, group = 'A'\n\n    @pytest.mark.parametrize(\"row, group\", [\n        (1, \"A\"),\n        (5, \"A\"),\n        (6, \"B\"),\n        (20, \"B\"),\n        (21, \"C\"),\n    ])\n    def test_boarding_group(row, group):\n>       assert boarding_group(row) == group\nE       AssertionError: assert 'B' == 'A'\nE         \nE         - A\nE         + B\n\ntest_board.py:20: AssertionError\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_board.py::test_boarding_group[1-A]\nPASSED test_board.py::test_boarding_group[6-B]\nPASSED test_board.py::test_boarding_group[20-B]\nPASSED test_board.py::test_boarding_group[21-C]\nFAILED test_board.py::test_boarding_group[5-A] - AssertionError: assert 'B' =...\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_board.py",
     "out": ".F...                                                                    [100%]\n=================================== FAILURES ===================================\n___________________________ test_boarding_group[5-A] ___________________________\n\nrow = 5, group = 'A'\n\n    @pytest.mark.parametrize(\"row, group\", [\n        (1, \"A\"),\n        (5, \"A\"),\n        (6, \"B\"),\n        (20, \"B\"),\n        (21, \"C\"),\n    ])\n    def test_boarding_group(row, group):\n>       assert boarding_group(row) == group\nE       AssertionError: assert 'B' == 'A'\nE         \nE         - A\nE         + B\n\ntest_board.py:20: AssertionError\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_board.py::test_boarding_group[1-A]\nPASSED test_board.py::test_boarding_group[6-B]\nPASSED test_board.py::test_boarding_group[20-B]\nPASSED test_board.py::test_boarding_group[21-C]\nFAILED test_board.py::test_boarding_group[5-A] - AssertionError: assert 'B' =...\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_board_copy.py": {
   "src": "def boarding_group(row):\n    if row < 5:\n        return \"A\"\n    if row <= 20:\n        return \"B\"\n    return \"C\"\n\n\ndef test_row_1():\n    assert boarding_group(1) == \"A\"\n\n\ndef test_row_6():\n    assert boarding_group(6) == \"B\"\n\n\ndef test_row_20():\n    assert boarding_group(20) == \"B\"\n\n\ndef test_row_21():\n    assert boarding_group(21) == \"C\"\n",
   "stdout": "....                                                                     [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_board_copy.py",
     "out": "....                                                                     [100%]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_boss_fill.py": {
   "src": "import pytest\n\n\ndef gate_sign(gate, delayed):\n    status = \"DELAYED\" if delayed else \"ON TIME\"\n    print(f\"{gate}: {status}\")\n\n\n@pytest.mark.parametrize(\"delayed, word\", [(True, \"DELAYED\"), (False, \"ON TIME\")])\ndef test_gate_sign(capsys, delayed, word):\n    gate_sign(\"B7\", delayed)\n    out = capsys.readouterr().out\n    assert out == f\"B7: {word}\\n\"\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_boss_fill.py::test_gate_sign[True-DELAYED]\nPASSED test_boss_fill.py::test_gate_sign[False-ON TIME]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_boss_fill.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_boss_fill.py::test_gate_sign[True-DELAYED]\nPASSED test_boss_fill.py::test_gate_sign[False-ON TIME]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_boss_parsons.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef cabin():\n    return {\"seats\": 4, \"booked\": []}\n\n\n@pytest.mark.parametrize(\"name\", [\"Ada\", \"Grace\"])\ndef test_book_one(cabin, name):\n    cabin[\"booked\"].append(name)\n    assert cabin[\"booked\"] == [name]\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_boss_parsons.py::test_book_one[Ada]\nPASSED test_boss_parsons.py::test_book_one[Grace]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_boss_parsons.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_boss_parsons.py::test_book_one[Ada]\nPASSED test_boss_parsons.py::test_book_one[Grace]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_boss_spot.py": {
   "src": "import pytest\n\n\ndef fuel_needed(km):\n    return km * 3 + 50\n\n\n@pytest.mark.parametrize(\"km, litres\", [(10, 80), (100, 350)])\ndef test_fuel_needed(km, litres):\n    assert fuel_needed(10) == litres\n",
   "stdout": ".F                                                                       [100%]\n=================================== FAILURES ===================================\n__________________________ test_fuel_needed[100-350] ___________________________\ntest_boss_spot.py:10: in test_fuel_needed\n    assert fuel_needed(10) == litres\nE   assert 80 == 350\nE    +  where 80 = fuel_needed(10)\n=========================== short test summary info ============================\nFAILED test_boss_spot.py::test_fuel_needed[100-350] - assert 80 == 350\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq --tb=short test_boss_spot.py",
     "out": ".F                                                                       [100%]\n=================================== FAILURES ===================================\n__________________________ test_fuel_needed[100-350] ___________________________\ntest_boss_spot.py:10: in test_fuel_needed\n    assert fuel_needed(10) == litres\nE   assert 80 == 350\nE    +  where 80 = fuel_needed(10)\n=========================== short test summary info ============================\nFAILED test_boss_spot.py::test_fuel_needed[100-350] - assert 80 == 350\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_engine_log.py": {
   "src": "import logging\n\nimport engine\n\n\ndef test_low_fuel_warns(caplog):\n    with caplog.at_level(logging.WARNING):\n        engine.start(15)\n    assert \"only 15 litres left\" in caplog.text\n\n\ndef test_full_tank_is_quiet(caplog):\n    with caplog.at_level(logging.WARNING):\n        engine.start(80)\n    assert caplog.text == \"\"\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n_____________________________ test_low_fuel_warns ______________________________\n------------------------------ Captured log call -------------------------------\nWARNING  engine:engine.py:9 only 15 litres left\n=========================== short test summary info ============================\nPASSED test_engine_log.py::test_low_fuel_warns\nPASSED test_engine_log.py::test_full_tank_is_quiet\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_engine_log.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n_____________________________ test_low_fuel_warns ______________________________\n------------------------------ Captured log call -------------------------------\nWARNING  engine:engine.py:9 only 15 litres left\n=========================== short test summary info ============================\nPASSED test_engine_log.py::test_low_fuel_warns\nPASSED test_engine_log.py::test_full_tank_is_quiet\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_env.py": {
   "src": "import os\n\n\ndef captain():\n    return os.environ.get(\"CAPTAIN\", \"nobody yet\")\n\n\ndef test_captain_set(monkeypatch):\n    monkeypatch.setenv(\"CAPTAIN\", \"Pip\")\n    assert captain() == \"Pip\"\n\n\ndef test_captain_missing(monkeypatch):\n    monkeypatch.delenv(\"CAPTAIN\", raising=False)\n    assert captain() == \"nobody yet\"\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_env.py::test_captain_set\nPASSED test_env.py::test_captain_missing\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_env.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_env.py::test_captain_set\nPASSED test_env.py::test_captain_missing\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_ex_monkey.py": {
   "src": "import tower\n\n\ndef test_gusty_day(monkeypatch):\n    monkeypatch.setattr(tower, \"wind_speed\", lambda: 50)\n    assert tower.cleared_for_takeoff() is False\n",
   "stdout": ".                                                                        [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_ex_monkey.py",
     "out": ".                                                                        [100%]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_ex_noassert.py": {
   "src": "def greet(name):\n    print(f\"Welcome aboard, {name}?\")\n\n\ndef test_greet(capsys):\n    greet(\"Ada\")\n    captured = capsys.readouterr()\n    captured.out == \"Welcome aboard, Ada!\\n\"\n",
   "stdout": ".                                                                        [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_ex_noassert.py",
     "out": ".                                                                        [100%]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_ex_param.py": {
   "src": "import pytest\n\n\ndef seat_class(row):\n    if row <= 3:\n        return \"first\"\n    return \"economy\"\n\n\n@pytest.mark.parametrize(\"row, expected\", [\n    (1, \"first\"),\n    (3, \"first\"),\n    (4, \"economy\"),\n])\ndef test_seat_class(row, expected):\n    assert seat_class(row) == expected\n",
   "stdout": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_ex_param.py::test_seat_class[1-first]\nPASSED test_ex_param.py::test_seat_class[3-first]\nPASSED test_ex_param.py::test_seat_class[4-economy]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_ex_param.py",
     "out": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_ex_param.py::test_seat_class[1-first]\nPASSED test_ex_param.py::test_seat_class[3-first]\nPASSED test_ex_param.py::test_seat_class[4-economy]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_ex_tmp.py": {
   "src": "def count_lines(path):\n    return len(path.read_text(encoding=\"utf-8\").splitlines())\n\n\ndef test_count_lines(tmp_path):\n    notes = tmp_path / \"notes.txt\"\n    notes.write_text(\"one\\ntwo\\nthree\\n\", encoding=\"utf-8\")\n    assert count_lines(notes) == 3\n",
   "stdout": ".                                                                        [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_ex_tmp.py",
     "out": ".                                                                        [100%]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_ex_unit.py": {
   "src": "import unittest\n\n\ndef to_km(miles):\n    return miles * 1.609344\n\n\nclass TestToKm(unittest.TestCase):\n    def setUp(self):\n        self.miles = 0.1\n\n    def test_tenth_of_a_mile(self):\n        self.assertAlmostEqual(to_km(self.miles), 0.1609344)\n",
   "stdout": ".                                                                        [100%]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_ex_unit.py",
     "out": ".                                                                        [100%]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_flightlog.py": {
   "src": "import pytest\n\nfrom flightlog import parse_leg, total_km\n\n\n@pytest.mark.parametrize(\n    \"line, expected\",\n    [\n        (\"LHR-CDG 340\", (\"LHR-CDG\", 340)),\n        (\"CDG-FCO 1100\", (\"CDG-FCO\", 1100)),\n    ],\n)\ndef test_parse_leg(line, expected):\n    assert parse_leg(line) == expected\n\n\n@pytest.mark.parametrize(\"bad\", [\"LHR-CDG\", \"LHR-CDG -5\"])\ndef test_parse_leg_rejects(bad):\n    with pytest.raises(ValueError):\n        parse_leg(bad)\n\n\ndef test_total_skips_blank_lines():\n    assert total_km([\"LHR-CDG 340\", \"\", \"CDG-FCO 1100\"]) == 1440\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "test_iso.py": {
   "src": "LOG = []\n\n\ndef record(event):\n    LOG.append(event)\n    return len(LOG)\n\n\ndef test_record_takeoff():\n    assert record(\"takeoff\") == 1\n\n\ndef test_log_starts_empty():\n    assert LOG == []\n",
   "stdout": ".F                                                                       [100%]\n=================================== FAILURES ===================================\n____________________________ test_log_starts_empty _____________________________\ntest_iso.py:14: in test_log_starts_empty\n    assert LOG == []\nE   AssertionError: assert ['takeoff'] == []\nE     \nE     Left contains one more item: 'takeoff'\nE     Use -v to get more diff\n=========================== short test summary info ============================\nFAILED test_iso.py::test_log_starts_empty - AssertionError: assert ['takeoff'...\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq --tb=short test_iso.py::test_log_starts_empty",
     "out": ".                                                                        [100%]\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "python3 -m pytest -qq --tb=short test_iso.py",
     "out": ".F                                                                       [100%]\n=================================== FAILURES ===================================\n____________________________ test_log_starts_empty _____________________________\ntest_iso.py:14: in test_log_starts_empty\n    assert LOG == []\nE   AssertionError: assert ['takeoff'] == []\nE     \nE     Left contains one more item: 'takeoff'\nE     Use -v to get more diff\n=========================== short test summary info ============================\nFAILED test_iso.py::test_log_starts_empty - AssertionError: assert ['takeoff'...\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_iso_fixed.py": {
   "src": "import pytest\n\n\ndef record(log, event):\n    log.append(event)\n    return len(log)\n\n\n@pytest.fixture\ndef log():\n    return []\n\n\ndef test_record_takeoff(log):\n    assert record(log, \"takeoff\") == 1\n\n\ndef test_log_starts_empty(log):\n    assert log == []\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_iso_fixed.py::test_record_takeoff\nPASSED test_iso_fixed.py::test_log_starts_empty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_iso_fixed.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_iso_fixed.py::test_record_takeoff\nPASSED test_iso_fixed.py::test_log_starts_empty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_life_error.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef plane():\n    print(\"crew: fuel the plane\")\n    tank = {\"fuel\": 100}\n    tank[\"oil\"] += 5\n    yield tank\n    print(\"crew: park the plane\")\n\n\ndef test_fuel(plane):\n    print(\"test: check the fuel\")\n    assert plane[\"fuel\"] == 100\n",
   "stdout": "crew: fuel the plane\nE\n=========================== short test summary info ============================\nERROR test_life_error.py::test_fuel - KeyError: 'oil'\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -s --tb=no test_life_error.py",
     "out": "crew: fuel the plane\nE\n=========================== short test summary info ============================\nERROR test_life_error.py::test_fuel - KeyError: 'oil'\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_life_fail.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef plane():\n    print(\"crew: fuel the plane\")\n    yield {\"fuel\": 100}\n    print(\"crew: park the plane\")\n\n\ndef test_fuel(plane):\n    print(\"test: check the fuel\")\n    assert plane[\"fuel\"] == 90\n",
   "stdout": "crew: fuel the plane\ntest: check the fuel\nFcrew: park the plane\n\n=========================== short test summary info ============================\nFAILED test_life_fail.py::test_fuel - assert 100 == 90\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -s --tb=no test_life_fail.py",
     "out": "crew: fuel the plane\ntest: check the fuel\nFcrew: park the plane\n\n=========================== short test summary info ============================\nFAILED test_life_fail.py::test_fuel - assert 100 == 90\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_life_pass.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef plane():\n    print(\"crew: fuel the plane\")\n    yield {\"fuel\": 100}\n    print(\"crew: park the plane\")\n\n\ndef test_fuel(plane):\n    print(\"test: check the fuel\")\n    assert plane[\"fuel\"] == 100\n",
   "stdout": "crew: fuel the plane\ntest: check the fuel\n.crew: park the plane\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -s --tb=no test_life_pass.py",
     "out": "crew: fuel the plane\ntest: check the fuel\n.crew: park the plane\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_logbook.py": {
   "src": "def save_log(folder, entries):\n    path = folder / \"logbook.txt\"\n    path.write_text(\"\\n\".join(entries) + \"\\n\", encoding=\"utf-8\")\n    return path\n\n\ndef test_save_log(tmp_path):\n    path = save_log(tmp_path, [\"takeoff 09:00\", \"landing 10:15\"])\n    assert path.name == \"logbook.txt\"\n    assert path.read_text(encoding=\"utf-8\") == \"takeoff 09:00\\nlanding 10:15\\n\"\n\n\ndef test_folder_starts_empty(tmp_path):\n    assert list(tmp_path.iterdir()) == []\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_logbook.py::test_save_log\nPASSED test_logbook.py::test_folder_starts_empty\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_logbook.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_logbook.py::test_save_log\nPASSED test_logbook.py::test_folder_starts_empty\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_plane.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef plane():\n    return {\"fuel\": 100, \"seats\": []}\n\n\ndef test_board_ada(plane):\n    plane[\"seats\"].append(\"Ada\")\n    assert plane[\"seats\"] == [\"Ada\"]\n\n\ndef test_seats_start_empty(plane):\n    assert plane[\"seats\"] == []\n\n\ndef test_full_tank(plane):\n    assert plane[\"fuel\"] == 100\n",
   "stdout": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_plane.py::test_board_ada\nPASSED test_plane.py::test_seats_start_empty\nPASSED test_plane.py::test_full_tank\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_plane.py",
     "out": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_plane.py::test_board_ada\nPASSED test_plane.py::test_seats_start_empty\nPASSED test_plane.py::test_full_tank\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_preflight.py": {
   "src": "def fuel_needed(km):\n    \"\"\"Litres for a trip: 3 per km, plus 50 kept in reserve.\"\"\"\n    return km * 3 + 50\n\n\ndef test_short_hop():\n    assert fuel_needed(10) == 80\n\n\ndef test_no_trip_still_has_reserve():\n    assert fuel_needed(0) == 50\n\n\ndef test_long_haul():\n    assert fuel_needed(1000) == 3050\n",
   "stdout": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_preflight.py::test_short_hop\nPASSED test_preflight.py::test_no_trip_still_has_reserve\nPASSED test_preflight.py::test_long_haul\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_preflight.py",
     "out": "...                                                                      [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_preflight.py::test_short_hop\nPASSED test_preflight.py::test_no_trip_still_has_reserve\nPASSED test_preflight.py::test_long_haul\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_tower_monkey.py": {
   "src": "import tower\n\n\ndef test_calm_day(monkeypatch):\n    monkeypatch.setattr(tower, \"wind_speed\", lambda: 20)\n    assert tower.cleared_for_takeoff() is True\n\n\ndef test_storm(monkeypatch):\n    monkeypatch.setattr(tower, \"wind_speed\", lambda: 80)\n    assert tower.cleared_for_takeoff() is False\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_tower_monkey.py::test_calm_day\nPASSED test_tower_monkey.py::test_storm\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_tower_monkey.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_tower_monkey.py::test_calm_day\nPASSED test_tower_monkey.py::test_storm\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_tower_right.py": {
   "src": "from unittest import mock\n\nimport tower\n\n\ndef test_calm_day():\n    with mock.patch(\"tower.wind_speed\", return_value=20) as fake:\n        assert tower.cleared_for_takeoff() is True\n    fake.assert_called_once()\n",
   "stdout": ".                                                                        [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_tower_right.py::test_calm_day\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_tower_right.py",
     "out": ".                                                                        [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_tower_right.py::test_calm_day\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_tower_wrong.py": {
   "src": "from unittest import mock\n\nimport tower\n\n\ndef test_calm_day():\n    with mock.patch(\"radar.wind_speed\", return_value=20):\n        assert tower.cleared_for_takeoff() is True\n",
   "stdout": "F                                                                        [100%]\n=================================== FAILURES ===================================\n________________________________ test_calm_day _________________________________\ntest_tower_wrong.py:8: in test_calm_day\n    assert tower.cleared_for_takeoff() is True\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^\ntower.py:5: in cleared_for_takeoff\n    return wind_speed() < 50\n           ^^^^^^^^^^^^\nradar.py:3: in wind_speed\n    raise ConnectionError(\"no network in the hangar\")\nE   ConnectionError: no network in the hangar\n=========================== short test summary info ============================\nFAILED test_tower_wrong.py::test_calm_day - ConnectionError: no network in th...\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq --tb=short test_tower_wrong.py",
     "out": "F                                                                        [100%]\n=================================== FAILURES ===================================\n________________________________ test_calm_day _________________________________\ntest_tower_wrong.py:8: in test_calm_day\n    assert tower.cleared_for_takeoff() is True\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^\ntower.py:5: in cleared_for_takeoff\n    return wind_speed() < 50\n           ^^^^^^^^^^^^\nradar.py:3: in wind_speed\n    raise ConnectionError(\"no network in the hangar\")\nE   ConnectionError: no network in the hangar\n=========================== short test summary info ============================\nFAILED test_tower_wrong.py::test_calm_day - ConnectionError: no network in th...\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "test_trip.py": {
   "src": "from flightlog import parse_leg, total_km\n\n\ndef test_parse_one_leg():\n    assert parse_leg(\"LHR-CDG 340\") == (\"LHR-CDG\", 340)\n\n\ndef test_total_from_a_real_file(tmp_path):\n    logbook = tmp_path / \"legs.txt\"\n    logbook.write_text(\"LHR-CDG 340\\n\\nCDG-FCO 1100\\n\", encoding=\"utf-8\")\n    lines = logbook.read_text(encoding=\"utf-8\").splitlines()\n    assert total_km(lines) == 1440\n",
   "stdout": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_trip.py::test_parse_one_leg\nPASSED test_trip.py::test_total_from_a_real_file\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq -rA test_trip.py",
     "out": "..                                                                       [100%]\n==================================== PASSES ====================================\n=========================== short test summary info ============================\nPASSED test_trip.py::test_parse_one_leg\nPASSED test_trip.py::test_total_from_a_real_file\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "test_typo.py": {
   "src": "import pytest\n\n\n@pytest.fixture\ndef plane():\n    return {\"fuel\": 100}\n\n\ndef test_fuel(plain):\n    assert plain[\"fuel\"] == 100\n",
   "stdout": "E                                                                        [100%]\n==================================== ERRORS ====================================\n_________________________ ERROR at setup of test_fuel __________________________\nfile /home/you/python-ch26/test_typo.py, line 9\n  def test_fuel(plain):\nE       fixture 'plain' not found\n>       available fixtures: cache, capfd, capfdbinary, caplog, capsys, capsysbinary, capteesys, doctest_namespace, monkeypatch, plane, pytestconfig, record_property, record_testsuite_property, record_xml_attribute, recwarn, subtests, tmp_path, tmp_path_factory, tmpdir, tmpdir_factory\n>       use 'pytest --fixtures [testpath]' for help on them.\n\n/home/you/python-ch26/test_typo.py:9\n=========================== short test summary info ============================\nERROR test_typo.py::test_fuel\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m pytest -qq test_typo.py",
     "out": "E                                                                        [100%]\n==================================== ERRORS ====================================\n_________________________ ERROR at setup of test_fuel __________________________\nfile /home/you/python-ch26/test_typo.py, line 9\n  def test_fuel(plain):\nE       fixture 'plain' not found\n>       available fixtures: cache, capfd, capfdbinary, caplog, capsys, capsysbinary, capteesys, doctest_namespace, monkeypatch, plane, pytestconfig, record_property, record_testsuite_property, record_xml_attribute, recwarn, subtests, tmp_path, tmp_path_factory, tmpdir, tmpdir_factory\n>       use 'pytest --fixtures [testpath]' for help on them.\n\n/home/you/python-ch26/test_typo.py:9\n=========================== short test summary info ============================\nERROR test_typo.py::test_fuel\n",
     "err": "",
     "exit": 1
    }
   ],
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "E                                                                        [100%]\n==================================== ERRORS ====================================\n_________________________ ERROR at setup of test_fuel __________________________\nfile /home/you/python-ch26/test_typo.py, line 9\n  def test_fuel(plain):\nE       fixture 'plain' not found\n>       available fixtures: anyio_backend, anyio_backend_name, anyio_backend_options, cache, capfd, capfdbinary, caplog, capsys, capsysbinary, capteesys, doctest_namespace, free_tcp_port, free_tcp_port_factory, free_udp_port, free_udp_port_factory, monkeypatch, plane, platformdirs_isolated, pytestconfig, record_property, record_testsuite_property, record_xml_attribute, recwarn, subtests, tmp_path, tmp_path_factory, tmpdir, tmpdir_factory\n>       use 'pytest --fixtures [testpath]' for help on them.\n\n/home/you/python-ch26/test_typo.py:9\n=========================== short test summary info ============================\nERROR test_typo.py::test_fuel\n",
    "stderr": "",
    "exit": 1,
    "steps": [
     {
      "cmd": "python3 -m pytest -qq test_typo.py",
      "out": "E                                                                        [100%]\n==================================== ERRORS ====================================\n_________________________ ERROR at setup of test_fuel __________________________\nfile /home/you/python-ch26/test_typo.py, line 9\n  def test_fuel(plain):\nE       fixture 'plain' not found\n>       available fixtures: anyio_backend, anyio_backend_name, anyio_backend_options, cache, capfd, capfdbinary, caplog, capsys, capsysbinary, capteesys, doctest_namespace, free_tcp_port, free_tcp_port_factory, free_udp_port, free_udp_port_factory, monkeypatch, plane, platformdirs_isolated, pytestconfig, record_property, record_testsuite_property, record_xml_attribute, recwarn, subtests, tmp_path, tmp_path_factory, tmpdir, tmpdir_factory\n>       use 'pytest --fixtures [testpath]' for help on them.\n\n/home/you/python-ch26/test_typo.py:9\n=========================== short test summary info ============================\nERROR test_typo.py::test_fuel\n",
      "err": "",
      "exit": 1
     }
    ]
   }
  },
  "test_unit.py": {
   "src": "import unittest\n\n\ndef split_bill(total, people):\n    return total / people\n\n\nclass TestSplitBill(unittest.TestCase):\n    def setUp(self):\n        self.total = 0.3\n\n    def test_exact(self):\n        self.assertEqual(split_bill(self.total, 3), 0.1)\n\n    def test_close_enough(self):\n        self.assertAlmostEqual(split_bill(self.total, 3), 0.1)\n\n    def test_nobody(self):\n        with self.assertRaises(ZeroDivisionError):\n            split_bill(self.total, 0)\n\n\nif __name__ == \"__main__\":\n    unittest.main()\n",
   "stdout": "",
   "stderr": ".F.\n======================================================================\nFAIL: test_exact (__main__.TestSplitBill.test_exact)\n----------------------------------------------------------------------\nTraceback (most recent call last):\n  File \"/home/you/python-ch26/test_unit.py\", line 13, in test_exact\n    self.assertEqual(split_bill(self.total, 3), 0.1)\n    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nAssertionError: 0.09999999999999999 != 0.1\n\n----------------------------------------------------------------------\nRan 3 tests in 0.001s\n\nFAILED (failures=1)\n",
   "exit": 1,
   "nondeterministic": true
  },
  "tower.py": {
   "src": "from radar import wind_speed\n\n\ndef cleared_for_takeoff():\n    return wind_speed() < 50\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "warn_demo.py": {
   "src": "import warnings\n\n\ndef old_fuel_check(litres):\n    warnings.warn(\"old_fuel_check() is deprecated; use fuel_ok()\",\n                  DeprecationWarning, stacklevel=2)\n    return litres > 50\n\n\nfor litres in [80, 60, 40]:\n    print(litres, old_fuel_check(litres))\nwarnings.warn(\"the coffee machine is making odd noises\")\nprint(\"done\")\n",
   "stdout": "",
   "stderr": "/home/you/python-ch26/warn_demo.py:11: DeprecationWarning: old_fuel_check() is deprecated; use fuel_ok()\n  print(litres, old_fuel_check(litres))\n/home/you/python-ch26/warn_demo.py:12: UserWarning: the coffee machine is making odd noises\n  warnings.warn(\"the coffee machine is making odd noises\")\nTraceback (most recent call last):\n  File \"/home/you/python-ch26/warn_demo.py\", line 11, in <module>\n    print(litres, old_fuel_check(litres))\n                  ~~~~~~~~~~~~~~^^^^^^^^\n  File \"/home/you/python-ch26/warn_demo.py\", line 5, in old_fuel_check\n    warnings.warn(\"old_fuel_check() is deprecated; use fuel_ok()\",\n    ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n                  DeprecationWarning, stacklevel=2)\n                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nDeprecationWarning: old_fuel_check() is deprecated; use fuel_ok()\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 warn_demo.py",
     "out": "80 True\n60 True\n40 False\ndone\n",
     "err": "/home/you/python-ch26/warn_demo.py:11: DeprecationWarning: old_fuel_check() is deprecated; use fuel_ok()\n  print(litres, old_fuel_check(litres))\n/home/you/python-ch26/warn_demo.py:12: UserWarning: the coffee machine is making odd noises\n  warnings.warn(\"the coffee machine is making odd noises\")\n",
     "exit": 0,
     "merged": "/home/you/python-ch26/warn_demo.py:11: DeprecationWarning: old_fuel_check() is deprecated; use fuel_ok()\n  print(litres, old_fuel_check(litres))\n/home/you/python-ch26/warn_demo.py:12: UserWarning: the coffee machine is making odd noises\n  warnings.warn(\"the coffee machine is making odd noises\")\n80 True\n60 True\n40 False\ndone\n"
    },
    {
     "cmd": "python3 -W error warn_demo.py",
     "out": "",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch26/warn_demo.py\", line 11, in <module>\n    print(litres, old_fuel_check(litres))\n                  ~~~~~~~~~~~~~~^^^^^^^^\n  File \"/home/you/python-ch26/warn_demo.py\", line 5, in old_fuel_check\n    warnings.warn(\"old_fuel_check() is deprecated; use fuel_ok()\",\n    ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n                  DeprecationWarning, stacklevel=2)\n                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nDeprecationWarning: old_fuel_check() is deprecated; use fuel_ok()\n",
     "exit": 1
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
