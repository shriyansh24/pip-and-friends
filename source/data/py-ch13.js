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
  "workdir": "/home/you/python-ch13",
  "versionDifferences": [
   "dice.py",
   "ex_capital.py",
   "lazy_json.py",
   "m_sqrt_neg.py",
   "peek.py",
   "sys_os.py",
   "today.py",
   "typo_module.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): dice.py, ex_capital.py, lazy_json.py, m_sqrt_neg.py, peek.py, sys_os.py, today.py, typo_module.py."
 },
 "programs": {
  "ask_whoami.py": {
   "src": "import whoami\n\nprint(\"ask_whoami.py says: my __name__ is\", __name__)\n",
   "stdout": "whoami.py says: my __name__ is whoami\nask_whoami.py says: my __name__ is __main__\n",
   "stderr": "",
   "exit": 0
  },
  "banner.py": {
   "src": "import pyfiglet\n\nprint(pyfiglet.figlet_format(\"Pip!\"))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/banner.py\", line 1, in <module>\n    import pyfiglet\nModuleNotFoundError: No module named 'pyfiglet'\n",
   "exit": 1
  },
  "boss_err.py": {
   "src": "import math as m\n\nprint(m.sqrt(100))\nprint(math.pi)\n",
   "stdout": "10.0\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/boss_err.py\", line 4, in <module>\n    print(math.pi)\n          ^^^^\nNameError: name 'math' is not defined. Did you forget to import 'math'?\n",
   "exit": 1
  },
  "boss_fill.py": {
   "src": "import statistics as st\n\ntemps = [18, 21, 19, 24]\nprint(st.mean(temps))\nprint(st.median(temps))\n",
   "stdout": "20.5\n20.0\n",
   "stderr": "",
   "exit": 0
  },
  "boss_mod.py": {
   "src": "print(\"B\")\n\n\ndef label(text):\n    return \"[\" + text + \"]\"\n\n\nif __name__ == \"__main__\":\n    print(\"D\")\n",
   "stdout": "B\nD\n",
   "stderr": "",
   "exit": 0
  },
  "boss_order.py": {
   "src": "print(\"A\")\nimport boss_mod\nimport boss_mod\nprint(boss_mod.label(\"C\"))\n",
   "stdout": "A\nB\n[C]\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "from helpers import shout, stars\ndef banner(word):\n    loud = shout(word)\n    return loud + \"\\n\" + stars(len(loud))\nif __name__ == \"__main__\":\n    print(banner(\"toolbox\"))\n",
   "stdout": "TOOLBOX!\n********\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "from random import randint\n\nrandom.seed(5)\nprint(\"Roll:\", randint(1, 6))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/boss_spot.py\", line 3, in <module>\n    random.seed(5)\n    ^^^^^^\nNameError: name 'random' is not defined. Did you forget to import 'random'?\n",
   "exit": 1
  },
  "boss_trace.py": {
   "src": "import math\n\ntotal = 0\nfor r in [1, 2, 3]:\n    area = math.floor(math.pi * r * r)\n    total = total + area\n    print(r, area, total)\n",
   "stdout": "1 3 3\n2 12 15\n3 28 43\n",
   "stderr": "",
   "exit": 0
  },
  "builtin_check.py": {
   "src": "import sys\n\nprint(\"sys\" in sys.builtin_module_names)\nprint(\"math\" in sys.builtin_module_names)\nprint(\"random\" in sys.builtin_module_names)\n",
   "stdout": "True\nTrue\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "dates.py": {
   "src": "from datetime import date\n\ntrip = date(2026, 12, 18)\ntoday = date(2026, 12, 1)\nprint(trip)\nprint(trip.year, trip.month, trip.day)\nprint((trip - today).days, \"days to go\")\nprint(trip.strftime(\"%A\"))\n",
   "stdout": "2026-12-18\n2026 12 18\n17 days to go\nFriday\n",
   "stderr": "",
   "exit": 0
  },
  "dice.py": {
   "src": "import random\n\nprint(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))\n",
   "stdout": "5 4 3\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "6 3 3\n",
    "stderr": "",
    "exit": 0
   }
  },
  "dice_game.py": {
   "src": "import random\nimport dice_tools\n\nrandom.seed(42)\nrolls = dice_tools.roll(5)\ndice_tools.report(rolls)\nif 6 in rolls:\n    print(\"A six! Pip does a happy dance.\")\n",
   "stdout": "Rolls:  [6, 1, 1, 6, 3]\nTotal:  17\nMean:   3.4\nMedian: 3\nA six! Pip does a happy dance.\n",
   "stderr": "",
   "exit": 0
  },
  "dice_seed.py": {
   "src": "import random\n\nrandom.seed(1)\nprint(random.randint(1, 6), random.randint(1, 6), random.randint(1, 6))\n",
   "stdout": "2 5 1\n",
   "stderr": "",
   "exit": 0
  },
  "dice_tools.py": {
   "src": "import random\nimport statistics\n\n\ndef roll(times, sides=6):\n    rolls = []\n    for count in range(times):\n        rolls.append(random.randint(1, sides))\n    return rolls\n\n\ndef report(rolls):\n    print(\"Rolls: \", rolls)\n    print(\"Total: \", sum(rolls))\n    print(\"Mean:  \", statistics.mean(rolls))\n    print(\"Median:\", statistics.median(rolls))\n\n\nif __name__ == \"__main__\":\n    random.seed(1)\n    report(roll(3))\n",
   "stdout": "Rolls:  [2, 5, 1]\nTotal:  8\nMean:   2.6666666666666665\nMedian: 2\n",
   "stderr": "",
   "exit": 0
  },
  "ex_capital.py": {
   "src": "import Random\n\nprint(Random.randint(1, 6))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/ex_capital.py\", line 1, in <module>\n    import Random\nModuleNotFoundError: No module named 'Random'. Did you mean: 'random'?\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/ex_capital.py\", line 1, in <module>\n    import Random\nModuleNotFoundError: No module named 'Random'\n",
    "exit": 1
   }
  },
  "ex_fill_dates.py": {
   "src": "from datetime import date\n\nparty = date(2027, 1, 9)\nprint(party.year)\nprint(party.strftime(\"%A\"))\n",
   "stdout": "2027\nSaturday\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_from.py": {
   "src": "from math import sqrt, floor\n\nprint(sqrt(36))\nprint(floor(9.99))\n",
   "stdout": "6.0\n9\n",
   "stderr": "",
   "exit": 0
  },
  "ex_floor.py": {
   "src": "import math\n\nprint(math.floor(2.5), math.ceil(2.5))\nprint(math.sqrt(25))\n",
   "stdout": "2 3\n5.0\n",
   "stderr": "",
   "exit": 0
  },
  "ex_from_only.py": {
   "src": "from math import sqrt\n\nprint(sqrt(4))\nprint(math.pi)\n",
   "stdout": "2.0\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/ex_from_only.py\", line 4, in <module>\n    print(math.pi)\n          ^^^^\nNameError: name 'math' is not defined. Did you forget to import 'math'?\n",
   "exit": 1
  },
  "ex_guard.py": {
   "src": "def greet(name):\n    return \"Hi, \" + name\n\n\nif __name__ == \"__main__\":\n    print(greet(\"Pip\"))\n",
   "stdout": "Hi, Pip\n",
   "stderr": "",
   "exit": 0
  },
  "ex_guard_typo.py": {
   "src": "def area(w, h):\n    return w * h\n\n\nif __name__ == \"main\":\n    print(\"Demo: area(3, 4) is\", area(3, 4))\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_dice.py": {
   "src": "import random\nrandom.seed(5)\nroll = random.randint(1, 6)\nprint(\"You rolled\", roll)\nif roll > 3:\n    print(\"Move ahead!\")\n",
   "stdout": "You rolled 5\nMove ahead!\n",
   "stderr": "",
   "exit": 0
  },
  "ex_party.py": {
   "src": "import ex_party_tools\n\nprint(\"Main says hi\")\nprint(ex_party_tools.triple(3))\n",
   "stdout": "Tools loaded\nMain says hi\n9\n",
   "stderr": "",
   "exit": 0
  },
  "ex_party_tools.py": {
   "src": "def triple(n):\n    return n * 3\n\n\nprint(\"Tools loaded\")\n",
   "stdout": "Tools loaded\n",
   "stderr": "",
   "exit": 0
  },
  "ex_seed.py": {
   "src": "import random\n\nrandom.seed(1)\nprint(random.randint(1, 6))\nrandom.seed(1)\nprint(random.randint(1, 6))\n",
   "stdout": "2\n2\n",
   "stderr": "",
   "exit": 0
  },
  "ex_star_spot.py": {
   "src": "pow = \"Super jump\"\nfrom math import *\nprint(\"Your power:\", pow)\n",
   "stdout": "Your power: <built-in function pow>\n",
   "stderr": "",
   "exit": 0
  },
  "ex_trace_round.py": {
   "src": "import math\n\nfor n in [1.2, 2.5, 3.9]:\n    print(n, math.floor(n), math.ceil(n))\n",
   "stdout": "1.2 1 2\n2.5 2 3\n3.9 3 4\n",
   "stderr": "",
   "exit": 0
  },
  "fancy_dice.py": {
   "src": "import random\nimport pyfiglet\nimport dice_tools\n\nrandom.seed(42)\nrolls = dice_tools.roll(5)\nprint(\"Rolls:\", rolls)\nprint(pyfiglet.figlet_format(\"Total \" + str(sum(rolls)), font=\"small\"))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/fancy_dice.py\", line 2, in <module>\n    import pyfiglet\nModuleNotFoundError: No module named 'pyfiglet'\n",
   "exit": 1
  },
  "fancy_run.py": {
   "src": "# Run the dice project with its banner, inside the virtual environment.\n# Stand-in file: the real commands are in fancy_run.cmd and run in a terminal.\n",
   "stdout": "Rolls: [6, 1, 1, 6, 3]\n _____    _        _   _ ____ \n|_   _|__| |_ __ _| | / |__  |\n  | |/ _ \\  _/ _` | | | | / / \n  |_|\\___/\\__\\__,_|_| |_|/_/  \n                              \n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels -r requirements.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 fancy_dice.py",
     "out": "Rolls: [6, 1, 1, 6, 3]\n _____    _        _   _ ____ \n|_   _|__| |_ __ _| | / |__  |\n  | |/ _ \\  _/ _` | | | | / / \n  |_|\\___/\\__\\__,_|_| |_|/_/  \n                              \n\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "fancy_run.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels -r requirements.txt\",\n   \"python3 -m pip install -q --no-index --find-links wheels -r requirements.txt\"\n  ],\n  [\n   \"python3 fancy_dice.py\",\n   \"python3 fancy_dice.py\"\n  ]\n ],\n \"show\": [\n  \"fancy_run.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "forgot_activate.py": {
   "src": "# Install into the virtual environment, leave it, then run banner.py.\n# Stand-in file: the real commands are in forgot_activate.cmd and run in a terminal.\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/banner.py\", line 1, in <module>\n    import pyfiglet\nModuleNotFoundError: No module named 'pyfiglet'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels pyfiglet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "deactivate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 banner.py",
     "out": "",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/banner.py\", line 1, in <module>\n    import pyfiglet\nModuleNotFoundError: No module named 'pyfiglet'\n",
     "exit": 1,
     "dir": "~/python-ch13"
    }
   ]
  },
  "forgot_activate.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\",\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\"\n  ],\n  [\n   \"deactivate\",\n   \"deactivate\"\n  ],\n  [\n   \"python3 banner.py\",\n   \"python3 banner.py\"\n  ]\n ],\n \"show\": [\n  \"forgot_activate.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "forgot_import.py": {
   "src": "side = math.sqrt(49)\nprint(\"Each side is\", side)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/forgot_import.py\", line 1, in <module>\n    side = math.sqrt(49)\n           ^^^^\nNameError: name 'math' is not defined. Did you forget to import 'math'?\n",
   "exit": 1
  },
  "greet.py": {
   "src": "import sys\n\nprint(sys.argv)\nprint(\"Hello,\", sys.argv[1])\n",
   "stdout": "['greet.py', 'Ada', '7']\nHello, Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 greet.py Ada 7",
     "out": "['greet.py', 'Ada', '7']\nHello, Ada\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "greet.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 greet.py Ada 7\",\n   \"python3 greet.py Ada 7\"\n  ]\n ],\n \"show\": [\n  \"greet.cmd\"\n ]\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "greet_noargs.py": {
   "src": "# Run greet.py without the words it expects.\n# Stand-in file: the real commands are in greet_noargs.cmd and run in a terminal.\n",
   "stdout": "['greet.py']\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/greet.py\", line 4, in <module>\n    print(\"Hello,\", sys.argv[1])\n                    ~~~~~~~~^^^\nIndexError: list index out of range\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 greet.py",
     "out": "['greet.py']\n",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/greet.py\", line 4, in <module>\n    print(\"Hello,\", sys.argv[1])\n                    ~~~~~~~~^^^\nIndexError: list index out of range\n",
     "exit": 1,
     "merged": "['greet.py']\nTraceback (most recent call last):\n  File \"/home/you/python-ch13/greet.py\", line 4, in <module>\n    print(\"Hello,\", sys.argv[1])\n                    ~~~~~~~~^^^\nIndexError: list index out of range\n"
    }
   ]
  },
  "greet_noargs.cmd": {
   "src": "{\n \"steps\": [\n  [\"python3 greet.py\", \"python3 greet.py\"]\n ],\n \"show\": [\"greet_noargs.cmd\"]\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "help_sqrt.py": {
   "src": "import math\n\nhelp(math.sqrt)\n",
   "stdout": "Help on built-in function sqrt in module math:\n\nsqrt(x, /)\n    Return the square root of x.\n\n",
   "stderr": "",
   "exit": 0
  },
  "helpers.py": {
   "src": "# helpers.py: Pip's own toolbox\n\n\ndef shout(text):\n    return text.upper() + \"!\"\n\n\ndef stars(n):\n    return \"*\" * n\n\n\nif __name__ == \"__main__\":\n    print(\"Testing my helpers...\")\n    print(shout(\"hello\"))\n    print(stars(5))\n",
   "stdout": "Testing my helpers...\nHELLO!\n*****\n",
   "stderr": "",
   "exit": 0
  },
  "import_twice.py": {
   "src": "import noisy_tools\nimport noisy_tools\n\nprint(\"Imported twice, but the demo printed once.\")\n",
   "stdout": "Demo: double(4) is 8\nImported twice, but the demo printed once.\n",
   "stderr": "",
   "exit": 0
  },
  "in_pantry.py": {
   "src": "# Run banner.py inside the virtual environment.\n# Stand-in file: the real commands are in in_pantry.cmd and run in a terminal.\n",
   "stdout": " ____  _       _ \n|  _ \\(_)_ __ | |\n| |_) | | '_ \\| |\n|  __/| | |_) |_|\n|_|   |_| .__/(_)\n        |_|      \n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels pyfiglet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 banner.py",
     "out": " ____  _       _ \n|  _ \\(_)_ __ | |\n| |_) | | '_ \\| |\n|  __/| | |_) |_|\n|_|   |_| .__/(_)\n        |_|      \n\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "in_pantry.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\",\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\"\n  ],\n  [\n   \"python3 banner.py\",\n   \"python3 banner.py\"\n  ]\n ],\n \"show\": [\n  \"in_pantry.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "lazy_json.py": {
   "src": "import sys\nlazy import json\n\nprint(\"json loaded?\", \"json\" in sys.modules)\nprint(json.dumps({\"pip\": 1}))\nprint(\"json loaded?\", \"json\" in sys.modules)\n",
   "stdout": "json loaded? False\n{\"pip\": 1}\njson loaded? True\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "  File \"/home/you/python-ch13/lazy_json.py\", line 2\n    lazy import json\n         ^^^^^^\nSyntaxError: invalid syntax\n",
    "exit": 1
   }
  },
  "m_sqrt.py": {
   "src": "import math\n\nprint(math.sqrt(16))\nprint(math.sqrt(2))\nprint(math.sqrt(0))\n",
   "stdout": "4.0\n1.4142135623730951\n0.0\n",
   "stderr": "",
   "exit": 0
  },
  "m_sqrt_neg.py": {
   "src": "import math\n\nprint(math.sqrt(-1))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/m_sqrt_neg.py\", line 3, in <module>\n    print(math.sqrt(-1))\n          ~~~~~~~~~^^^^\nValueError: expected a nonnegative input, got -1.0\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/m_sqrt_neg.py\", line 3, in <module>\n    print(math.sqrt(-1))\n          ~~~~~~~~~^^^^\nValueError: math domain error\n",
    "exit": 1
   }
  },
  "m_sqrt_text.py": {
   "src": "import math\n\nprint(math.sqrt(\"16\"))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/m_sqrt_text.py\", line 3, in <module>\n    print(math.sqrt(\"16\"))\n          ~~~~~~~~~^^^^^^\nTypeError: must be real number, not str\n",
   "exit": 1
  },
  "main.py": {
   "src": "import helpers\n\nprint(helpers.shout(\"python is fun\"))\nprint(helpers.stars(10))\n",
   "stdout": "PYTHON IS FUN!\n**********\n",
   "stderr": "",
   "exit": 0
  },
  "module_object.py": {
   "src": "import sys\nimport math\n\nprint(type(math))\nprint(math.__name__)\nprint(\"math\" in sys.modules)\nprint(type(math.sqrt))\n",
   "stdout": "<class 'module'>\nmath\nTrue\n<class 'builtin_function_or_method'>\n",
   "stderr": "",
   "exit": 0
  },
  "nickname.py": {
   "src": "import statistics as st\n\nscores = [8, 9, 4, 9, 5]\nprint(st.mean(scores))\nprint(st.median(scores))\nprint(st.mode(scores))\n",
   "stdout": "7\n8\n9\n",
   "stderr": "",
   "exit": 0
  },
  "noisy_tools.py": {
   "src": "def double(n):\n    return n * 2\n\n\nprint(\"Demo: double(4) is\", double(4))\n",
   "stdout": "Demo: double(4) is 8\n",
   "stderr": "",
   "exit": 0
  },
  "one_tool.py": {
   "src": "from math import sqrt, pi\n\nprint(sqrt(81))\nprint(round(pi, 2))\n",
   "stdout": "9.0\n3.14\n",
   "stderr": "",
   "exit": 0
  },
  "pantry_which.py": {
   "src": "# Which python3 runs after activating?\n# Stand-in file: the real commands are in pantry_which.cmd and run in a terminal.\n",
   "stdout": "/home/you/python-ch13/.venv/bin/python3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "which python3",
     "out": "/home/you/python-ch13/.venv/bin/python3\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "pantry_which.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"which python3\",\n   \"which python3\"\n  ]\n ],\n \"show\": [\n  \"pantry_which.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "party.py": {
   "src": "import noisy_tools\n\nprint(\"Party guests:\", noisy_tools.double(21))\n",
   "stdout": "Demo: double(4) is 8\nParty guests: 42\n",
   "stderr": "",
   "exit": 0
  },
  "peek.py": {
   "src": "import math\n\nfor name in dir(math):\n    if name.startswith(\"s\"):\n        print(name)\n",
   "stdout": "signbit\nsin\nsinh\nsqrt\nsumprod\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "sin\nsinh\nsqrt\nsumprod\n",
    "stderr": "",
    "exit": 0
   }
  },
  "pick_shuffle.py": {
   "src": "import random\n\nrandom.seed(7)\nsnacks = [\"apple\", \"pretzel\", \"grapes\", \"cheese\"]\nprint(random.choice(snacks))\nrandom.shuffle(snacks)\nprint(snacks)\nprint(random.randint(10, 20))\n",
   "stdout": "grapes\n['grapes', 'apple', 'cheese', 'pretzel']\n11\n",
   "stderr": "",
   "exit": 0
  },
  "pip_in_python.py": {
   "src": "pip install pyfiglet\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch13/pip_in_python.py\", line 1\n    pip install pyfiglet\n        ^^^^^^^\nSyntaxError: invalid syntax\n",
   "exit": 1
  },
  "pip_install.py": {
   "src": "# Install pyfiglet into a fresh virtual environment.\n# Stand-in file: the real commands are in pip_install.cmd and run in a terminal.\n",
   "stdout": "Looking in links: wheels\nProcessing ./wheels/pyfiglet-1.0.4-py3-none-any.whl\nInstalling collected packages: pyfiglet\nSuccessfully installed pyfiglet-1.0.4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install --no-index --find-links wheels pyfiglet",
     "out": "Looking in links: wheels\nProcessing ./wheels/pyfiglet-1.0.4-py3-none-any.whl\nInstalling collected packages: pyfiglet\nSuccessfully installed pyfiglet-1.0.4\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "pip_install.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install --no-index --find-links wheels pyfiglet\",\n   \"python3 -m pip install --no-index --find-links wheels pyfiglet\"\n  ]\n ],\n \"show\": [\n  \"pip_install.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "pip_list.py": {
   "src": "# List what is inside the virtual environment.\n# Stand-in file: the real commands are in pip_list.cmd and run in a terminal.\n",
   "stdout": "Package  Version\n-------- -------\npip      26.2.2\npyfiglet 1.0.4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels pyfiglet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip list",
     "out": "Package  Version\n-------- -------\npip      26.2.2\npyfiglet 1.0.4\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "pip_list.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\",\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\"\n  ],\n  [\n   \"python3 -m pip list\",\n   \"python3 -m pip list\"\n  ]\n ],\n \"show\": [\n  \"pip_list.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "pip_uninstall.py": {
   "src": "# Remove a package from the virtual environment.\n# Stand-in file: the real commands are in pip_uninstall.cmd and run in a terminal.\n",
   "stdout": "Found existing installation: pyfiglet 1.0.4\nUninstalling pyfiglet-1.0.4:\n  Successfully uninstalled pyfiglet-1.0.4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels pyfiglet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip uninstall -y pyfiglet",
     "out": "Found existing installation: pyfiglet 1.0.4\nUninstalling pyfiglet-1.0.4:\n  Successfully uninstalled pyfiglet-1.0.4\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "pip_uninstall.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\",\n   \"python3 -m pip install -q --no-index --find-links wheels pyfiglet\"\n  ],\n  [\n   \"python3 -m pip uninstall -y pyfiglet\",\n   \"python3 -m pip uninstall -y pyfiglet\"\n  ]\n ],\n \"show\": [\n  \"pip_uninstall.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "quiet_party.py": {
   "src": "import quiet_tools\n\nprint(\"Party guests:\", quiet_tools.double(21))\n",
   "stdout": "Party guests: 42\n",
   "stderr": "",
   "exit": 0
  },
  "quiet_tools.py": {
   "src": "def double(n):\n    return n * 2\n\n\nif __name__ == \"__main__\":\n    print(\"Demo: double(4) is\", double(4))\n",
   "stdout": "Demo: double(4) is 8\n",
   "stderr": "",
   "exit": 0
  },
  "renamed_game.py": {
   "src": "# Run game.py in the renamed folder, where the practice file has a new name.\n# Stand-in file: the real commands are in renamed_game.cmd and run in a terminal.\n",
   "stdout": "You rolled a 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd renamed",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 game.py",
     "out": "You rolled a 4\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13/renamed"
    }
   ],
   "nondeterministic": true
  },
  "renamed_game.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"cd renamed\",\n   \"cd renamed\"\n  ],\n  [\n   \"python3 game.py\",\n   \"python3 game.py\"\n  ]\n ],\n \"show\": [\n  \"renamed_game.cmd\",\n  \"renamed/game.py\",\n  \"renamed/dice_practice.py\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "renamed/game.py": {
   "src": "import random\n\nroll = random.randint(1, 6)\nprint(\"You rolled a\", roll)\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "renamed/dice_practice.py": {
   "src": "# Pip's practice file about dice\nprint(\"Practising dice...\")\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "req_freeze.py": {
   "src": "# Write down exactly what is installed.\n# Stand-in file: the real commands are in req_freeze.cmd and run in a terminal.\n",
   "stdout": "pyfiglet==1.0.4\ntabulate==0.10.0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install -q --no-index --find-links wheels -r requirements.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip freeze",
     "out": "pyfiglet==1.0.4\ntabulate==0.10.0\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "req_freeze.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install -q --no-index --find-links wheels -r requirements.txt\",\n   \"python3 -m pip install -q --no-index --find-links wheels -r requirements.txt\"\n  ],\n  [\n   \"python3 -m pip freeze\",\n   \"python3 -m pip freeze\"\n  ]\n ],\n \"show\": [\n  \"req_freeze.cmd\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "req_install.py": {
   "src": "# Install everything listed in requirements.txt.\n# Stand-in file: the real commands are in req_install.cmd and run in a terminal.\n",
   "stdout": "Looking in links: wheels\nProcessing ./wheels/pyfiglet-1.0.4-py3-none-any.whl (from -r requirements.txt (line 1))\nProcessing ./wheels/tabulate-0.10.0-py3-none-any.whl (from -r requirements.txt (line 2))\nInstalling collected packages: tabulate, pyfiglet\n\nSuccessfully installed pyfiglet-1.0.4 tabulate-0.10.0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 -m venv .venv",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "source .venv/bin/activate",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 -m pip install --no-index --find-links wheels -r requirements.txt",
     "out": "Looking in links: wheels\nProcessing ./wheels/pyfiglet-1.0.4-py3-none-any.whl (from -r requirements.txt (line 1))\nProcessing ./wheels/tabulate-0.10.0-py3-none-any.whl (from -r requirements.txt (line 2))\nInstalling collected packages: tabulate, pyfiglet\n\nSuccessfully installed pyfiglet-1.0.4 tabulate-0.10.0\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    }
   ]
  },
  "req_install.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3 -m venv .venv\",\n   \"python3 -m venv --clear .venv\"\n  ],\n  [\n   \"source .venv/bin/activate\",\n   \"source .venv/bin/activate\"\n  ],\n  [\n   \"python3 -m pip install --no-index --find-links wheels -r requirements.txt\",\n   \"python3 -m pip install --no-index --find-links wheels -r requirements.txt\"\n  ]\n ],\n \"show\": [\n  \"req_install.cmd\",\n  \"requirements.txt\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "requirements.txt": {
   "src": "pyfiglet==1.0.4\ntabulate==0.10.0\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shadow_game.py": {
   "src": "# Run game.py in the shadow folder, next to a file named random.py.\n# Stand-in file: the real commands are in shadow_game.cmd and run in a terminal.\n",
   "stdout": "Practising dice...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/shadow/game.py\", line 3, in <module>\n    roll = random.randint(1, 6)\n           ^^^^^^^^^^^^^^\nAttributeError: module 'random' has no attribute 'randint' (consider renaming '/home/you/python-ch13/shadow/random.py' since it has the same name as the standard library module named 'random' and prevents importing that standard library module)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd shadow",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch13"
    },
    {
     "cmd": "python3 game.py",
     "out": "Practising dice...\n",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/shadow/game.py\", line 3, in <module>\n    roll = random.randint(1, 6)\n           ^^^^^^^^^^^^^^\nAttributeError: module 'random' has no attribute 'randint' (consider renaming '/home/you/python-ch13/shadow/random.py' since it has the same name as the standard library module named 'random' and prevents importing that standard library module)\n",
     "exit": 1,
     "dir": "~/python-ch13/shadow"
    }
   ]
  },
  "shadow_game.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"cd shadow\",\n   \"cd shadow\"\n  ],\n  [\n   \"python3 game.py\",\n   \"python3 game.py\"\n  ]\n ],\n \"show\": [\n  \"shadow_game.cmd\",\n  \"shadow/game.py\",\n  \"shadow/random.py\"\n ],\n \"session\": true\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shadow/game.py": {
   "src": "import random\n\nroll = random.randint(1, 6)\nprint(\"You rolled a\", roll)\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shadow/random.py": {
   "src": "# Pip's practice file about dice\nprint(\"Practising dice...\")\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "shuffle_none.py": {
   "src": "import random\n\nrandom.seed(2)\ncards = [\"A\", \"K\", \"Q\"]\ncards = random.shuffle(cards)\nprint(cards)\n",
   "stdout": "None\n",
   "stderr": "",
   "exit": 0
  },
  "star_fixed.py": {
   "src": "e = \"pip@example.com\"   # e for email\nimport math\nprint(\"Send to:\", e)\nprint(\"Math's e:\", math.e)\n",
   "stdout": "Send to: pip@example.com\nMath's e: 2.718281828459045\n",
   "stderr": "",
   "exit": 0
  },
  "star_trap.py": {
   "src": "e = \"pip@example.com\"   # e for email\nfrom math import *\nprint(\"Send to:\", e)\n",
   "stdout": "Send to: 2.718281828459045\n",
   "stderr": "",
   "exit": 0
  },
  "sys_os.py": {
   "src": "import sys\nimport os\n\nprint(sys.version.split()[0])\nprint(sys.platform)\nprint(os.getcwd())\n",
   "stdout": "3.15.2\nlinux\n/home/you/python-ch13\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "3.13.18\nlinux\n/home/you/python-ch13\n",
    "stderr": "",
    "exit": 0
   }
  },
  "system_pip.py": {
   "src": "# Try to install into this Ubuntu machine's system Python 3.12.\n# Stand-in file: the real commands are in system_pip.cmd and run in a terminal.\n",
   "stdout": "",
   "stderr": "error: externally-managed-environment\n\n× This environment is externally managed\n╰─> To install Python packages system-wide, try apt install\n    python3-xyz, where xyz is the package you are trying to\n    install.\n    \n    If you wish to install a non-Debian-packaged Python package,\n    create a virtual environment using python3 -m venv path/to/venv.\n    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make\n    sure you have python3-full installed.\n    \n    If you wish to install a non-Debian packaged Python application,\n    it may be easiest to use pipx install xyz, which will manage a\n    virtual environment for you. Make sure you have pipx installed.\n    \n    See /usr/share/doc/python3.12/README.venv for more information.\n\nnote: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.\nhint: See PEP 668 for the detailed specification.\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3.12 -m pip install pyfiglet",
     "out": "",
     "err": "error: externally-managed-environment\n\n× This environment is externally managed\n╰─> To install Python packages system-wide, try apt install\n    python3-xyz, where xyz is the package you are trying to\n    install.\n    \n    If you wish to install a non-Debian-packaged Python package,\n    create a virtual environment using python3 -m venv path/to/venv.\n    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make\n    sure you have python3-full installed.\n    \n    If you wish to install a non-Debian packaged Python application,\n    it may be easiest to use pipx install xyz, which will manage a\n    virtual environment for you. Make sure you have pipx installed.\n    \n    See /usr/share/doc/python3.12/README.venv for more information.\n\nnote: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.\nhint: See PEP 668 for the detailed specification.\n",
     "exit": 1
    }
   ]
  },
  "system_pip.cmd": {
   "src": "{\n \"steps\": [\n  [\n   \"python3.12 -m pip install pyfiglet\",\n   \"python3.12 -m pip install pyfiglet\"\n  ]\n ],\n \"show\": [\n  \"system_pip.cmd\"\n ]\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "three_ways.py": {
   "src": "import math\nfrom math import sqrt\nimport statistics as st\n\nprint(math.sqrt(9))\nprint(sqrt(9))\nprint(st.mean([1, 2, 6]))\n",
   "stdout": "3.0\n3.0\n3\n",
   "stderr": "",
   "exit": 0
  },
  "today.py": {
   "src": "from datetime import date, datetime\n\nprint(date.today())\nprint(datetime.now())\n",
   "stdout": "2026-11-08\n2026-11-08 18:24:42.554375\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "2026-11-08\n2026-11-08 18:24:42.633073\n",
    "stderr": "",
    "exit": 0
   }
  },
  "toolbox.py": {
   "src": "import math\n\nprint(math.sqrt(16))\nprint(math.pi)\nprint(math.floor(7.9))\nprint(math.ceil(7.1))\n",
   "stdout": "4.0\n3.141592653589793\n7\n8\n",
   "stderr": "",
   "exit": 0
  },
  "typo_module.py": {
   "src": "import requestz\n\nprint(\"Ready to go online!\")\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/typo_module.py\", line 1, in <module>\n    import requestz\nModuleNotFoundError: No module named 'requestz'. Did you mean: 'requests'?\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/typo_module.py\", line 1, in <module>\n    import requestz\nModuleNotFoundError: No module named 'requestz'\n",
    "exit": 1
   }
  },
  "typo_name_import.py": {
   "src": "from math import sqroot\n\nprint(sqroot(64))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch13/typo_name_import.py\", line 1, in <module>\n    from math import sqroot\nImportError: cannot import name 'sqroot' from 'math' (unknown location). Did you mean: 'sqrt'?\n",
   "exit": 1
  },
  "where.py": {
   "src": "import sys\n\nprint(\"Python looks here first:\")\nprint(sys.path[0])\n",
   "stdout": "Python looks here first:\n/home/you/python-ch13\n",
   "stderr": "",
   "exit": 0
  },
  "whoami.py": {
   "src": "print(\"whoami.py says: my __name__ is\", __name__)\n",
   "stdout": "whoami.py says: my __name__ is __main__\n",
   "stderr": "",
   "exit": 0
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
