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
  "workdir": "/home/you/python-ch2",
  "versionDifferences": [
   "keywords.py",
   "swap_dis.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): keywords.py, swap_dis.py."
 },
 "programs": {
  "age_plus_one.py": {
   "src": "age = input(\"How old are you? \")\nprint(age + 1)\n",
   "stdout": "How old are you? ",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/age_plus_one.py\", line 2, in <module>\n    print(age + 1)\n          ~~~~^~~\nTypeError: can only concatenate str (not \"int\") to str\n",
   "exit": 1,
   "stdin": "12\n",
   "screen": "How old are you? 12\nTraceback (most recent call last):\n  File \"/home/you/python-ch2/age_plus_one.py\", line 2, in <module>\n    print(age + 1)\n          ~~~~^~~\nTypeError: can only concatenate str (not \"int\") to str\n"
  },
  "backwards.py": {
   "src": "\"pizza\" = snack\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch2/backwards.py\", line 1\n    \"pizza\" = snack\n    ^^^^^^^\nSyntaxError: cannot assign to literal here. Maybe you meant '==' instead of '='?\n",
   "exit": 1
  },
  "bad_dash.py": {
   "src": "first-name = \"Pip\"\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch2/bad_dash.py\", line 1\n    first-name = \"Pip\"\n    ^^^^^^^^^^\nSyntaxError: cannot assign to expression here. Maybe you meant '==' instead of '='?\n",
   "exit": 1
  },
  "bad_digit.py": {
   "src": "2nd_place = \"Pip\"\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch2/bad_digit.py\", line 1\n    2nd_place = \"Pip\"\n    ^\nSyntaxError: invalid decimal literal\n",
   "exit": 1
  },
  "bad_keyword.py": {
   "src": "class = \"Python 101\"\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch2/bad_keyword.py\", line 1\n    class = \"Python 101\"\n          ^\nSyntaxError: invalid syntax\n",
   "exit": 1
  },
  "bad_space.py": {
   "src": "my name = \"Pip\"\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch2/bad_space.py\", line 1\n    my name = \"Pip\"\n       ^^^^\nSyntaxError: invalid syntax\n",
   "exit": 1
  },
  "boss_badge.py": {
   "src": "first_name = input(\"First name? \")\nlast_name = input(\"Last name? \")\nfull_name = first_name + \" \" + last_name\nprint(f\"Welcome, {full_name}!\")\nprint(f\"Your badge says: {fullname}\")\n",
   "stdout": "First name? Last name? Welcome, Ada Lovelace!\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/boss_badge.py\", line 5, in <module>\n    print(f\"Your badge says: {fullname}\")\n                              ^^^^^^^^\nNameError: name 'fullname' is not defined. Did you mean: 'full_name'?\n",
   "exit": 1,
   "stdin": "Ada\nLovelace\n",
   "screen": "First name? Ada\nLast name? Lovelace\nWelcome, Ada Lovelace!\nTraceback (most recent call last):\n  File \"/home/you/python-ch2/boss_badge.py\", line 5, in <module>\n    print(f\"Your badge says: {fullname}\")\n                              ^^^^^^^^\nNameError: name 'fullname' is not defined. Did you mean: 'full_name'?\n"
  },
  "boss_card.py": {
   "src": "MAX_LEVEL = 10\nplayer = input(\"Player? \")\nlevel = 1\nlevel += 2\nprint(f\"{player}: level {level} of {MAX_LEVEL}\")\n",
   "stdout": "Player? Zed: level 3 of 10\n",
   "stderr": "",
   "exit": 0,
   "stdin": "Zed\n",
   "screen": "Player? Zed\nZed: level 3 of 10\n"
  },
  "boss_fill.py": {
   "src": "left, right = \"cat\", \"dog\"\nleft, right = right, left\nleft += \"!\"\nprint(left, right)\n",
   "stdout": "dog! cat\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "first = input(\"First? \")\nsecond = input(\"Second? \")\nfirst, second = second, first\nmessage = f\"{first} then {second}\"\nmessage += \"!\"\nprint(message)\n",
   "stdout": "First? Second? cake then soup!\n",
   "stderr": "",
   "exit": 0,
   "stdin": "soup\ncake\n",
   "screen": "First? soup\nSecond? cake\ncake then soup!\n"
  },
  "boss_rotate.py": {
   "src": "a, b, c = \"red\", \"green\", \"blue\"\nprint(a, b, c)\na, b, c = b, c, a\nprint(a, b, c)\na, b, c = b, c, a\nprint(a, b, c)\n",
   "stdout": "red green blue\ngreen blue red\nblue red green\n",
   "stderr": "",
   "exit": 0
  },
  "choice_objects.py": {
   "src": "drink = \"cocoa\"\nfavorite = drink\norder = favorite\n",
   "stdout": "",
   "stderr": "",
   "exit": 0
  },
  "concat_error.py": {
   "src": "age = 3\nprint(\"I am \" + age + \" years old\")\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/concat_error.py\", line 2, in <module>\n    print(\"I am \" + age + \" years old\")\n          ~~~~~~~~^~~~~\nTypeError: can only concatenate str (not \"int\") to str\n",
   "exit": 1
  },
  "constants.py": {
   "src": "SLICES_PER_PIZZA = 8\npizzas = 3\nprint(pizzas, \"pizzas make\", pizzas * SLICES_PER_PIZZA, \"slices\")\n",
   "stdout": "3 pizzas make 24 slices\n",
   "stderr": "",
   "exit": 0
  },
  "counter.py": {
   "src": "score = 0\nscore = score + 1\nscore = score + 1\nprint(score)\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0
  },
  "echo_food.py": {
   "src": "food = input(\"Favorite food? \")\nprint(\"Yum,\", food)\nprint(food + food)\n",
   "stdout": "Favorite food? Yum, taco\ntacotaco\n",
   "stderr": "",
   "exit": 0,
   "stdin": "taco\n",
   "screen": "Favorite food? taco\nYum, taco\ntacotaco\n"
  },
  "eof.py": {
   "src": "name = input(\"Name? \")\nprint(\"Hi,\", name)\n",
   "stdout": "Name? ",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/eof.py\", line 1, in <module>\n    name = input(\"Name? \")\nEOFError: EOF when reading a line\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 eof.py < /dev/null",
     "out": "Name? ",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/eof.py\", line 1, in <module>\n    name = input(\"Name? \")\nEOFError: EOF when reading a line\n",
     "exit": 1,
     "merged": "Name? Traceback (most recent call last):\n  File \"/home/you/python-ch2/eof.py\", line 1, in <module>\n    name = input(\"Name? \")\nEOFError: EOF when reading a line\n"
    }
   ]
  },
  "fill_fstring.py": {
   "src": "hero = \"Pip\"\npower = \"debugging\"\nprint(f\"{hero} has the power of {power}!\")\n",
   "stdout": "Pip has the power of debugging!\n",
   "stderr": "",
   "exit": 0
  },
  "fill_pluseq.py": {
   "src": "stars = 5\nstars += 2\nstars += 2\nprint(stars)\n",
   "stdout": "9\n",
   "stderr": "",
   "exit": 0
  },
  "fstring_expr.py": {
   "src": "pizzas = 3\nSLICES_PER_PIZZA = 8\nprint(f\"{pizzas} pizzas = {pizzas * SLICES_PER_PIZZA} slices\")\n",
   "stdout": "3 pizzas = 24 slices\n",
   "stderr": "",
   "exit": 0
  },
  "good_names.py": {
   "src": "player_name = \"Pip\"\nlevel2 = \"forest\"\n_secret = \"shh\"\nPip = \"robot\"\npip = \"seed\"\nprint(player_name, level2, _secret)\nprint(Pip, pip)\n",
   "stdout": "Pip forest shh\nrobot seed\n",
   "stderr": "",
   "exit": 0
  },
  "greet.py": {
   "src": "name = input(\"What is your name? \")\nprint(\"Hello,\", name)\nprint(\"Nice to meet you,\", name)\n",
   "stdout": "What is your name? Hello, Maya\nNice to meet you, Maya\n",
   "stderr": "",
   "exit": 0,
   "stdin": "Maya\n",
   "screen": "What is your name? Maya\nHello, Maya\nNice to meet you, Maya\n"
  },
  "haha.py": {
   "src": "laugh = \"ha\"\nlaugh += \"ha\"\nlaugh += \"ha\"\nprint(laugh)\n",
   "stdout": "hahaha\n",
   "stderr": "",
   "exit": 0
  },
  "input_machine.py": {
   "src": "answer = input()\nprint(repr(answer))\nanswer = input()\nprint(repr(answer))\nanswer = input()\nprint(repr(answer))\nanswer = input()\nprint(repr(answer))\n",
   "stdout": "'Ada'\n'12'\n'3.5'\n''\n",
   "stderr": "",
   "exit": 0,
   "stdin": "Ada\n12\n3.5\n\n",
   "screen": "Ada\n'Ada'\n12\n'12'\n3.5\n'3.5'\n\n''\n"
  },
  "input_str.py": {
   "src": "age = input(\"How old are you? \")\nprint(age + age)\n",
   "stdout": "How old are you? 1212\n",
   "stderr": "",
   "exit": 0,
   "stdin": "12\n",
   "screen": "How old are you? 12\n1212\n"
  },
  "join_msg.py": {
   "src": "name = \"Pip\"\nage = 3\nprint(\"I am \" + name)\nprint(\"I am\", name, \"and I am\", age)\nprint(\"I am \" + str(age) + \" years old\")\nprint(f\"I am {name} and I am {age} years old\")\n",
   "stdout": "I am Pip\nI am Pip and I am 3\nI am 3 years old\nI am Pip and I am 3 years old\n",
   "stderr": "",
   "exit": 0
  },
  "keywords.py": {
   "src": "import keyword\nprint(len(keyword.kwlist), \"keywords\")\nprint(keyword.kwlist)\nprint(\"soft keywords:\", keyword.softkwlist)\n",
   "stdout": "35 keywords\n['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']\nsoft keywords: ['_', 'case', 'lazy', 'match', 'type']\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "35 keywords\n['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']\nsoft keywords: ['_', 'case', 'match', 'type']\n",
    "stderr": "",
    "exit": 0
   }
  },
  "map_ok.py": {
   "src": "snack = \"pizza\"\nsnack = snack + \"!\"\nprint(snack)\n",
   "stdout": "pizza!\n",
   "stderr": "",
   "exit": 0
  },
  "meaningful_good.py": {
   "src": "pizzas = 3\nslices_each = 8\ntotal_slices = pizzas * slices_each\nprint(total_slices)\n",
   "stdout": "24\n",
   "stderr": "",
   "exit": 0
  },
  "meaningful_x.py": {
   "src": "x = 3\ny = 8\nz = x * y\nprint(z)\n",
   "stdout": "24\n",
   "stderr": "",
   "exit": 0
  },
  "missing_f.py": {
   "src": "name = \"Pip\"\nprint(\"Hello, {name}!\")\nprint(f\"Hello, {name}!\")\n",
   "stdout": "Hello, {name}!\nHello, Pip!\n",
   "stderr": "",
   "exit": 0
  },
  "name_typo.py": {
   "src": "player = \"Ada\"\nprint(\"Go,\", Player)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/name_typo.py\", line 2, in <module>\n    print(\"Go,\", Player)\n                 ^^^^^^\nNameError: name 'Player' is not defined. Did you mean: 'player'?\n",
   "exit": 1
  },
  "parsons_greet.py": {
   "src": "name = input(\"Name? \")\nfood = input(\"Favorite food? \")\nmessage = f\"{name} loves {food}\"\nmessage += \"!\"\nprint(message)\n",
   "stdout": "Name? Favorite food? Sam loves noodles!\n",
   "stderr": "",
   "exit": 0,
   "stdin": "Sam\nnoodles\n",
   "screen": "Name? Sam\nFavorite food? noodles\nSam loves noodles!\n"
  },
  "parsons_swap.py": {
   "src": "morning, evening = \"tea\", \"cocoa\"\nspare = morning\nmorning = evening\nevening = spare\nprint(\"Morning:\", morning)\nprint(\"Evening:\", evening)\n",
   "stdout": "Morning: cocoa\nEvening: tea\n",
   "stderr": "",
   "exit": 0
  },
  "plus_equals.py": {
   "src": "coins = 10\ncoins += 5\nprint(coins)\ncoins -= 3\nprint(coins)\n",
   "stdout": "15\n12\n",
   "stderr": "",
   "exit": 0
  },
  "predict_case.py": {
   "src": "total_score = 10\nTotal_Score = 20\nprint(total_Score)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/predict_case.py\", line 3, in <module>\n    print(total_Score)\n          ^^^^^^^^^^^\nNameError: name 'total_Score' is not defined. Did you mean: 'total_score'?\n",
   "exit": 1
  },
  "predict_counter.py": {
   "src": "lives = 3\nlives = lives - 1\nlives = lives - 1\nlives = lives + 5\nprint(lives)\n",
   "stdout": "6\n",
   "stderr": "",
   "exit": 0
  },
  "predict_two_tags.py": {
   "src": "best_friend = \"Ada\"\ncaptain = best_friend\nbest_friend = \"Grace\"\nprint(captain)\nprint(best_friend)\n",
   "stdout": "Ada\nGrace\n",
   "stderr": "",
   "exit": 0
  },
  "quote_or_not.py": {
   "src": "snack = \"pizza\"\nprint(snack)\nprint(\"snack\")\n",
   "stdout": "pizza\nsnack\n",
   "stderr": "",
   "exit": 0
  },
  "right_first.py": {
   "src": "apples = 3\npears = 4\nfruit = apples + pears\nprint(fruit)\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0
  },
  "same_object.py": {
   "src": "hero = \"Pip\"\nsidekick = hero\nprint(hero is sidekick)\nprint(id(hero) == id(sidekick))\nhero = \"Professor\"\nprint(hero is sidekick)\n",
   "stdout": "True\nTrue\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "score_unknown.py": {
   "src": "print(\"Starting...\")\nscore = score + 1\nprint(score)\n",
   "stdout": "Starting...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/score_unknown.py\", line 2, in <module>\n    score = score + 1\n            ^^^^^\nNameError: name 'score' is not defined\n",
   "exit": 1
  },
  "shadow_print.py": {
   "src": "print = \"Hello\"\nprint(\"Hi, Pip!\")\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/shadow_print.py\", line 2, in <module>\n    print(\"Hi, Pip!\")\n    ~~~~~^^^^^^^^^^^^\nTypeError: 'str' object is not callable\n",
   "exit": 1
  },
  "shop.py": {
   "src": "shop = \"Pip's Pizza Palace\"\nprint(\"Welcome to\", shop)\nprint(\"Thank you for visiting\", shop)\nprint(shop, \"is open until 9\")\n",
   "stdout": "Welcome to Pip's Pizza Palace\nThank you for visiting Pip's Pizza Palace\nPip's Pizza Palace is open until 9\n",
   "stderr": "",
   "exit": 0
  },
  "spot_concat.py": {
   "src": "name = \"Pip\"\nlevel = 5\nprint(f\"Player: {name}\")\nprint(\"Level: \" + level)\n",
   "stdout": "Player: Pip\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/spot_concat.py\", line 4, in <module>\n    print(\"Level: \" + level)\n          ~~~~~~~~~~^~~~~~~\nTypeError: can only concatenate str (not \"int\") to str\n",
   "exit": 1
  },
  "spot_shadow.py": {
   "src": "print(\"Menu\")\nprint = \"Pizza\"\nprint(\"Today:\", print)\n",
   "stdout": "Menu\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/spot_shadow.py\", line 3, in <module>\n    print(\"Today:\", print)\n    ~~~~~^^^^^^^^^^^^^^^^^\nTypeError: 'str' object is not callable\n",
   "exit": 1
  },
  "swap_bad.py": {
   "src": "mug = \"milk\"\ncup = \"juice\"\nmug = cup\ncup = mug\nprint(mug, cup)\n",
   "stdout": "juice juice\n",
   "stderr": "",
   "exit": 0
  },
  "swap_dis.py": {
   "src": "import dis\ndis.dis(\"a, b = b, a\")\n",
   "stdout": "  0           RESUME                   0\n\n  1           LOAD_NAME                0 (b)\n              LOAD_NAME                1 (a)\n              SWAP                     2\n              STORE_NAME               1 (a)\n              STORE_NAME               0 (b)\n              LOAD_COMMON_CONSTANT     7 (None)\n              RETURN_VALUE\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "  0           RESUME                   0\n\n  1           LOAD_NAME                0 (b)\n              LOAD_NAME                1 (a)\n              SWAP                     2\n              STORE_NAME               1 (a)\n              STORE_NAME               0 (b)\n              RETURN_CONST             0 (None)\n",
    "stderr": "",
    "exit": 0
   }
  },
  "swap_pair.py": {
   "src": "mug = \"milk\"\ncup = \"juice\"\nmug, cup = cup, mug\nprint(mug, cup)\n",
   "stdout": "juice milk\n",
   "stderr": "",
   "exit": 0
  },
  "swap_temp.py": {
   "src": "mug = \"milk\"\ncup = \"juice\"\ntemp = mug\nmug = cup\ncup = temp\nprint(mug, cup)\n",
   "stdout": "juice milk\n",
   "stderr": "",
   "exit": 0
  },
  "tags.py": {
   "src": "snack = \"pizza\"\nprint(snack)\nsnack = \"tacos\"\nprint(snack)\n",
   "stdout": "pizza\ntacos\n",
   "stderr": "",
   "exit": 0
  },
  "too_early.py": {
   "src": "print(\"Score:\", score)\nscore = 0\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch2/too_early.py\", line 1, in <module>\n    print(\"Score:\", score)\n                    ^^^^^\nNameError: name 'score' is not defined\n",
   "exit": 1
  },
  "trace_coins.py": {
   "src": "coins = 2\nbonus = 3\nprint(coins, bonus)\ncoins = coins + bonus\nprint(coins, bonus)\nbonus = coins\nprint(coins, bonus)\ncoins += 1\nprint(coins, bonus)\n",
   "stdout": "2 3\n5 3\n5 5\n6 5\n",
   "stderr": "",
   "exit": 0
  },
  "two_tags.py": {
   "src": "hero = \"Pip\"\nsidekick = hero\nprint(sidekick)\nhero = \"Professor\"\nprint(hero)\nprint(sidekick)\n",
   "stdout": "Pip\nProfessor\nPip\n",
   "stderr": "",
   "exit": 0
  },
  "unshadow.py": {
   "src": "print = \"Hello\"\ndel print\nprint(\"Back to normal\")\n",
   "stdout": "Back to normal\n",
   "stderr": "",
   "exit": 0
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
