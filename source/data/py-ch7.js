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
  "workdir": "/home/you/python-ch7",
  "versionDifferences": [
   "boss_error.py",
   "unpack_error.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_error.py, unpack_error.py."
 },
 "programs": {
  "alias_copy.py": {
   "src": "a = [1, 2, 3]\nb = a\nc = a.copy()\nd = a[:]\nb.append(4)\nprint(a)\nprint(c, d)\nprint(b is a, c is a)\n",
   "stdout": "[1, 2, 3, 4]\n[1, 2, 3] [1, 2, 3]\nTrue False\n",
   "stderr": "",
   "exit": 0
  },
  "alias_predict.py": {
   "src": "team = [\"Ana\", \"Ben\"]\nbackup = team\nteam.append(\"Cy\")\nprint(backup)\nsafe = team.copy()\nteam.pop()\nprint(safe)\nprint(team)\n",
   "stdout": "['Ana', 'Ben', 'Cy']\n['Ana', 'Ben', 'Cy']\n['Ana', 'Ben']\n",
   "stderr": "",
   "exit": 0
  },
  "append_none.py": {
   "src": "pets = [\"cat\"]\npets = pets.append(\"dog\")\nprint(pets)\n",
   "stdout": "None\n",
   "stderr": "",
   "exit": 0
  },
  "boss_error.py": {
   "src": "point = (2, 5)\npoint.append(9)\nprint(point)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/boss_error.py\", line 2, in <module>\n    point.append(9)\n    ^^^^^^^^^^^^\nAttributeError: 'tuple' object has no attribute 'append'. Did you mean to use a 'list' object?\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/boss_error.py\", line 2, in <module>\n    point.append(9)\n    ^^^^^^^^^^^^\nAttributeError: 'tuple' object has no attribute 'append'\n",
    "exit": 1
   }
  },
  "boss_fill.py": {
   "src": "word = \"stressed\"\nbackwards = word[::-1]\nprint(backwards)\nprint(word == backwards)\n",
   "stdout": "desserts\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "def first_last(items):\n    return items[0], items[-1]\nnames = \"Ada Grace Linus\".split()\nfirst, last = first_last(names)\nprint(first, \"...\", last)\n",
   "stdout": "Ada ... Linus\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons_alt.py": {
   "src": "names = \"Ada Grace Linus\".split()\ndef first_last(items):\n    return items[0], items[-1]\nfirst, last = first_last(names)\nprint(first, \"...\", last)\n",
   "stdout": "Ada ... Linus\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "a = [3, 1, 2]\nb = a\nc = sorted(a)\na.append(0)\nprint(b)\nprint(c)\nprint(a[-1], c[-1])\n",
   "stdout": "[3, 1, 2, 0]\n[1, 2, 3]\n0 3\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "temps = [18, 21, 19]\ni = 0\nwhile i <= len(temps):\n    print(temps[i])\n    i = i + 1\n",
   "stdout": "18\n21\n19\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/boss_spot.py\", line 4, in <module>\n    print(temps[i])\n          ~~~~~^^^\nIndexError: list index out of range\n",
   "exit": 1
  },
  "boss_trace.py": {
   "src": "word = \"loop\"\nbackwards = \"\"\nfor i, ch in enumerate(word):\n    backwards = ch + backwards\n    print(i, ch, backwards)\n",
   "stdout": "0 l l\n1 o ol\n2 o ool\n3 p pool\n",
   "stderr": "",
   "exit": 0
  },
  "comp_loop.py": {
   "src": "squares = []\nfor n in range(1, 6):\n    squares.append(n * n)\nprint(squares)\n",
   "stdout": "[1, 4, 9, 16, 25]\n",
   "stderr": "",
   "exit": 0
  },
  "comp_more.py": {
   "src": "nums = [4, 7, 10, 13]\nevens = [n for n in nums if n % 2 == 0]\nprint(evens)\nwords = [\"pip\", \"crate\", \"train\"]\nprint([w.upper() for w in words])\nprint([len(w) for w in words])\n",
   "stdout": "[4, 10]\n['PIP', 'CRATE', 'TRAIN']\n[3, 5, 5]\n",
   "stderr": "",
   "exit": 0
  },
  "comp_one.py": {
   "src": "squares = [n * n for n in range(1, 6)]\nprint(squares)\n",
   "stdout": "[1, 4, 9, 16, 25]\n",
   "stderr": "",
   "exit": 0
  },
  "crate_row.py": {
   "src": "snacks = [\"apple\", \"kiwi\", \"fig\", \"plum\"]\nprint(snacks)\nprint(type(snacks))\nempty = []\nprint(empty)\nmixed = [7, \"a\", True, 3.5]\nprint(mixed)\n",
   "stdout": "['apple', 'kiwi', 'fig', 'plum']\n<class 'list'>\n[]\n[7, 'a', True, 3.5]\n",
   "stderr": "",
   "exit": 0
  },
  "csv_line.py": {
   "src": "row = \"Ada,36,London\"\nname, age, city = row.split(\",\")\nprint(name)\nprint(int(age) + 1)\nprint(city.upper())\n",
   "stdout": "Ada\n37\nLONDON\n",
   "stderr": "",
   "exit": 0
  },
  "enumerate_demo.py": {
   "src": "racers = [\"Pip\", \"Bolt\", \"Zed\"]\nfor i, name in enumerate(racers):\n    print(i, name)\nfor place, name in enumerate(racers, start=1):\n    print(\"Place\", place, \"goes to\", name)\n",
   "stdout": "0 Pip\n1 Bolt\n2 Zed\nPlace 1 goes to Pip\nPlace 2 goes to Bolt\nPlace 3 goes to Zed\n",
   "stderr": "",
   "exit": 0
  },
  "fill_join.py": {
   "src": "sentence = \"the quick brown fox\"\nwords = sentence.split()\nprint(len(words))\nprint(\"-\".join(words))\n",
   "stdout": "4\nthe-quick-brown-fox\n",
   "stderr": "",
   "exit": 0
  },
  "fill_slice.py": {
   "src": "days = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]\nworkdays = days[:5]\nweekend = days[5:]\nprint(workdays)\nprint(weekend)\n",
   "stdout": "['Mon', 'Tue', 'Wed', 'Thu', 'Fri']\n['Sat', 'Sun']\n",
   "stderr": "",
   "exit": 0
  },
  "index_error.py": {
   "src": "snacks = [\"apple\", \"kiwi\", \"fig\", \"plum\"]\nprint(\"Last one:\", snacks[3])\nprint(\"One more:\", snacks[4])\n",
   "stdout": "Last one: plum\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/index_error.py\", line 3, in <module>\n    print(\"One more:\", snacks[4])\n                       ~~~~~~^^^\nIndexError: list index out of range\n",
   "exit": 1
  },
  "index_ruler.py": {
   "src": "snacks = [\"apple\", \"kiwi\", \"fig\", \"plum\"]\nprint(\"snacks[0] is\", snacks[0])\nprint(\"snacks[1] is\", snacks[1])\nprint(\"snacks[2] is\", snacks[2])\nprint(\"snacks[3] is\", snacks[3])\nprint(\"snacks[-1] is\", snacks[-1])\nprint(\"snacks[-2] is\", snacks[-2])\nprint(\"snacks[-3] is\", snacks[-3])\nprint(\"snacks[-4] is\", snacks[-4])\n",
   "stdout": "snacks[0] is apple\nsnacks[1] is kiwi\nsnacks[2] is fig\nsnacks[3] is plum\nsnacks[-1] is plum\nsnacks[-2] is fig\nsnacks[-3] is kiwi\nsnacks[-4] is apple\n",
   "stderr": "",
   "exit": 0
  },
  "join_numbers.py": {
   "src": "nums = [1, 2, 3]\nprint(\"-\".join(nums))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/join_numbers.py\", line 2, in <module>\n    print(\"-\".join(nums))\n          ~~~~~~~~^^^^^^\nTypeError: sequence item 0: expected str instance, int found\n",
   "exit": 1
  },
  "join_numbers_fixed.py": {
   "src": "nums = [1, 2, 3]\ntexts = []\nfor n in nums:\n    texts.append(str(n))\nprint(\"-\".join(texts))\n",
   "stdout": "1-2-3\n",
   "stderr": "",
   "exit": 0
  },
  "last_item.py": {
   "src": "names = [\"Ada\", \"Grace\", \"Linus\"]\nlast = names[len(names)]\nprint(\"Last:\", last)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/last_item.py\", line 2, in <module>\n    last = names[len(names)]\n           ~~~~~^^^^^^^^^^^^\nIndexError: list index out of range\n",
   "exit": 1
  },
  "len_int.py": {
   "src": "print(len(42))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/len_int.py\", line 1, in <module>\n    print(len(42))\n          ~~~^^^^\nTypeError: object of type 'int' has no len()\n",
   "exit": 1
  },
  "length.py": {
   "src": "print(len([\"a\", \"b\", \"c\"]))\nprint(len([]))\nprint(len([[1, 2], [3, 4, 5]]))\nprint(len(\"Pip!\"))\n",
   "stdout": "3\n0\n2\n4\n",
   "stderr": "",
   "exit": 0
  },
  "loop_list.py": {
   "src": "snacks = [\"apple\", \"kiwi\", \"fig\"]\nfor snack in snacks:\n    print(\"Yum,\", snack)\nprint(\"All\", len(snacks), \"eaten!\")\n",
   "stdout": "Yum, apple\nYum, kiwi\nYum, fig\nAll 3 eaten!\n",
   "stderr": "",
   "exit": 0
  },
  "membership.py": {
   "src": "pantry = [\"rice\", \"beans\", \"salt\"]\nprint(\"salt\" in pantry)\nprint(\"sugar\" in pantry)\nprint(\"sugar\" not in pantry)\nif \"rice\" in pantry:\n    print(\"We can cook rice!\")\n",
   "stdout": "True\nFalse\nTrue\nWe can cook rice!\n",
   "stderr": "",
   "exit": 0
  },
  "methods_predict.py": {
   "src": "team = [\"Ana\", \"Ben\"]\nteam.append(\"Cy\")\nteam.insert(0, \"Dee\")\nteam.remove(\"Ben\")\nprint(team)\nprint(len(team))\n",
   "stdout": "['Dee', 'Ana', 'Cy']\n3\n",
   "stderr": "",
   "exit": 0
  },
  "min_max.py": {
   "src": "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([7, 3, 9, 4])\nprint(low, high)\nresult = min_max([5, 1])\nprint(result)\nprint(type(result))\n",
   "stdout": "3 9\n(1, 5)\n<class 'tuple'>\n",
   "stderr": "",
   "exit": 0
  },
  "min_max_empty.py": {
   "src": "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nprint(min_max([]))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/min_max_empty.py\", line 4, in <module>\n    print(min_max([]))\n          ~~~~~~~^^^^\n  File \"/home/you/python-ch7/min_max_empty.py\", line 2, in min_max\n    return min(numbers), max(numbers)\n           ~~~^^^^^^^^^\nValueError: min() iterable argument is empty\n",
   "exit": 1
  },
  "min_max_machine.py": {
   "src": "def min_max(numbers):\n    return min(numbers), max(numbers)\n\nprint(min_max([7, 3, 9, 4]))\nprint(min_max([5, 1]))\nprint(min_max([\"kiwi\", \"fig\", \"plum\"]))\n",
   "stdout": "(3, 9)\n(1, 5)\n('fig', 'plum')\n",
   "stderr": "",
   "exit": 0
  },
  "mutate.py": {
   "src": "shopping = [\"egg\", \"nut\"]\nshopping[0] = \"ham\"\nshopping.append(\"jam\")\nshopping.insert(1, \"tea\")\nlast = shopping.pop()\nshopping.remove(\"nut\")\nprint(shopping)\nprint(last)\n",
   "stdout": "['ham', 'tea']\njam\n",
   "stderr": "",
   "exit": 0
  },
  "negative_math.py": {
   "src": "snacks = [\"apple\", \"kiwi\", \"fig\", \"plum\"]\nprint(snacks[-1] == snacks[len(snacks) - 1])\nprint(snacks[-3] == snacks[4 - 3])\n",
   "stdout": "True\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "nested.py": {
   "src": "grid = [[1, 2, 3], [4, 5, 6]]\nprint(len(grid))\nprint(grid[1])\nprint(grid[1][0])\ngrid[0][2] = 99\nprint(grid)\n",
   "stdout": "2\n[4, 5, 6]\n4\n[[1, 2, 99], [4, 5, 6]]\n",
   "stderr": "",
   "exit": 0
  },
  "not_a_tuple.py": {
   "src": "a = (\"p\")\nb = (\"p\",)\nprint(type(a))\nprint(type(b))\n",
   "stdout": "<class 'str'>\n<class 'tuple'>\n",
   "stderr": "",
   "exit": 0
  },
  "parsons_cart.py": {
   "src": "cart = []\ncart.append(\"pen\")\ncart.append(\"ink\")\nprint(cart)\nlast = cart.pop()\nprint(\"Took out\", last)\nprint(cart)\n",
   "stdout": "['pen', 'ink']\nTook out ink\n['pen']\n",
   "stderr": "",
   "exit": 0
  },
  "pop_empty.py": {
   "src": "todo = [\"wash\"]\nprint(todo.pop())\nprint(todo.pop())\n",
   "stdout": "wash\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/pop_empty.py\", line 3, in <module>\n    print(todo.pop())\n          ~~~~~~~~^^\nIndexError: pop from empty list\n",
   "exit": 1
  },
  "predict_index.py": {
   "src": "colors = [\"red\", \"green\", \"blue\"]\nprint(colors[1])\nprint(colors[-1])\nprint(colors[0] + colors[2])\n",
   "stdout": "green\nblue\nredblue\n",
   "stderr": "",
   "exit": 0
  },
  "predict_slice.py": {
   "src": "nums = [10, 20, 30, 40, 50]\nprint(nums[1:3])\nprint(nums[:2])\nprint(nums[-3:])\nprint(nums[::2])\n",
   "stdout": "[20, 30]\n[10, 20]\n[30, 40, 50]\n[10, 30, 50]\n",
   "stderr": "",
   "exit": 0
  },
  "predict_tuple.py": {
   "src": "pair = (\"Pip\", 7)\nname, age = pair\nage = age + 1\nprint(name, age)\nprint(pair)\n",
   "stdout": "Pip 8\n('Pip', 7)\n",
   "stderr": "",
   "exit": 0
  },
  "remove_missing.py": {
   "src": "pantry = [\"rice\", \"beans\", \"salt\"]\npantry.remove(\"sugar\")\nprint(pantry)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/remove_missing.py\", line 2, in <module>\n    pantry.remove(\"sugar\")\n    ~~~~~~~~~~~~~^^^^^^^^^\nValueError: list.remove(x): x not in list\n",
   "exit": 1
  },
  "shallow.py": {
   "src": "grid = [[1, 2], [3, 4]]\ncopy = grid[:]\ncopy.append([5, 6])\ncopy[0][0] = 99\nprint(grid)\nprint(copy)\nprint(copy[0] is grid[0])\n",
   "stdout": "[[99, 2], [3, 4]]\n[[99, 2], [3, 4], [5, 6]]\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "slices.py": {
   "src": "letters = [\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"]\nprint(letters[1:4])\nprint(letters[:3])\nprint(letters[3:])\nprint(letters[::2])\nprint(letters[1:5:2])\nprint(letters[-2:])\nprint(letters[::-1])\nprint(letters[2:99])\n",
   "stdout": "['b', 'c', 'd']\n['a', 'b', 'c']\n['d', 'e', 'f']\n['a', 'c', 'e']\n['b', 'd']\n['e', 'f']\n['f', 'e', 'd', 'c', 'b', 'a']\n['c', 'd', 'e', 'f']\n",
   "stderr": "",
   "exit": 0
  },
  "sort_key.py": {
   "src": "words = [\"pear\", \"apple\", \"Fig\", \"banana\"]\nprint(sorted(words))\nprint(sorted(words, key=str.lower))\nprint(sorted(words, key=len))\n",
   "stdout": "['Fig', 'apple', 'banana', 'pear']\n['apple', 'banana', 'Fig', 'pear']\n['Fig', 'pear', 'apple', 'banana']\n",
   "stderr": "",
   "exit": 0
  },
  "sort_none.py": {
   "src": "ages = [12, 5, 9]\nresult = ages.sort()\nprint(ages)\nprint(result)\nprint(result[0])\n",
   "stdout": "[5, 9, 12]\nNone\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/sort_none.py\", line 5, in <module>\n    print(result[0])\n          ~~~~~~^^^\nTypeError: 'NoneType' object is not subscriptable\n",
   "exit": 1
  },
  "sorting.py": {
   "src": "ages = [12, 5, 9]\ntidy = sorted(ages)\nprint(tidy)\nprint(ages)\nages.sort()\nprint(ages)\nprint(sorted(ages, reverse=True))\nprint(sorted([\"pear\", \"apple\", \"fig\"]))\n",
   "stdout": "[5, 9, 12]\n[12, 5, 9]\n[5, 9, 12]\n[12, 9, 5]\n['apple', 'fig', 'pear']\n",
   "stderr": "",
   "exit": 0
  },
  "split_join.py": {
   "src": "line = \"eggs milk bread\"\nitems = line.split()\nprint(items)\ncolors = \"red,green,blue\".split(\",\")\nprint(colors)\nprint(\" + \".join(items))\nprint(\"\".join([\"P\", \"i\", \"p\"]))\n",
   "stdout": "['eggs', 'milk', 'bread']\n['red', 'green', 'blue']\neggs + milk + bread\nPip\n",
   "stderr": "",
   "exit": 0
  },
  "spot_remove.py": {
   "src": "pets = [\"cat\", \"dog\"]\npets.append(\"fish\")\npets.remove(\"hamster\")\nprint(pets)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/spot_remove.py\", line 3, in <module>\n    pets.remove(\"hamster\")\n    ~~~~~~~~~~~^^^^^^^^^^^\nValueError: list.remove(x): x not in list\n",
   "exit": 1
  },
  "spot_sort.py": {
   "src": "words = [\"kiwi\", \"apple\", \"fig\"]\nwords = words.sort()\nprint(\"First word:\", words[0])\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/spot_sort.py\", line 3, in <module>\n    print(\"First word:\", words[0])\n                         ~~~~~^^^\nTypeError: 'NoneType' object is not subscriptable\n",
   "exit": 1
  },
  "spot_tuple.py": {
   "src": "rgb = (255, 128, 0)\nprint(\"Red is\", rgb[0])\nrgb[2] = 64\nprint(rgb)\n",
   "stdout": "Red is 255\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/spot_tuple.py\", line 3, in <module>\n    rgb[2] = 64\n    ~~~^^^\nTypeError: 'tuple' object does not support item assignment\n",
   "exit": 1
  },
  "stats.py": {
   "src": "scores = [7, 3, 9, 4]\nprint(sum(scores))\nprint(min(scores))\nprint(max(scores))\nprint(sum(scores) / len(scores))\nprint(max([\"kiwi\", \"apple\", \"fig\"]))\n",
   "stdout": "23\n3\n9\n5.75\nkiwi\n",
   "stderr": "",
   "exit": 0
  },
  "str_append.py": {
   "src": "word = \"cat\"\nword.append(\"s\")\nprint(word)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/str_append.py\", line 2, in <module>\n    word.append(\"s\")\n    ^^^^^^^^^^^\nAttributeError: 'str' object has no attribute 'append'\n",
   "exit": 1
  },
  "str_fixed.py": {
   "src": "word = \"cat\"\nword = \"b\" + word[1:]\nprint(word)\n",
   "stdout": "bat\n",
   "stderr": "",
   "exit": 0
  },
  "str_immutable.py": {
   "src": "word = \"cat\"\nword[0] = \"b\"\nprint(word)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/str_immutable.py\", line 2, in <module>\n    word[0] = \"b\"\n    ~~~~^^^\nTypeError: 'str' object does not support item assignment\n",
   "exit": 1
  },
  "string_predict.py": {
   "src": "name = \"Robot\"\nprint(name[0], name[-1])\nprint(name[2:])\nprint(len(name))\nprint(name[::-1])\n",
   "stdout": "R t\nbot\n5\ntoboR\n",
   "stderr": "",
   "exit": 0
  },
  "string_seq.py": {
   "src": "word = \"Pip!\"\nprint(word[0])\nprint(word[-1])\nprint(word[1:3])\nprint(len(word))\nprint(\"i\" in word)\nfor ch in word:\n    print(ch)\n",
   "stdout": "P\n!\nip\n4\nTrue\nP\ni\np\n!\n",
   "stderr": "",
   "exit": 0
  },
  "swap.py": {
   "src": "a = \"left\"\nb = \"right\"\na, b = b, a\nprint(a, b)\n",
   "stdout": "right left\n",
   "stderr": "",
   "exit": 0
  },
  "trace_total.py": {
   "src": "prices = [4, 2, 5]\ntotal = 0\nfor i, p in enumerate(prices):\n    total = total + p\n    print(i, p, total)\n",
   "stdout": "0 4 4\n1 2 6\n2 5 11\n",
   "stderr": "",
   "exit": 0
  },
  "tuple_immutable.py": {
   "src": "point = (3, 4)\npoint[0] = 10\nprint(point)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/tuple_immutable.py\", line 2, in <module>\n    point[0] = 10\n    ~~~~~^^^\nTypeError: 'tuple' object does not support item assignment\n",
   "exit": 1
  },
  "tuples.py": {
   "src": "point = (3, 4)\nprint(point)\nprint(point[0])\nprint(len(point))\nprint(type(point))\none = (5,)\nprint(type(one), type((5)))\n",
   "stdout": "(3, 4)\n3\n2\n<class 'tuple'>\n<class 'tuple'> <class 'int'>\n",
   "stderr": "",
   "exit": 0
  },
  "unpack.py": {
   "src": "point = 3, 4\nx, y = point\nprint(point)\nprint(x)\nprint(y)\n",
   "stdout": "(3, 4)\n3\n4\n",
   "stderr": "",
   "exit": 0
  },
  "unpack_error.py": {
   "src": "x, y = (1, 2, 3)\nprint(x, y)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/unpack_error.py\", line 1, in <module>\n    x, y = (1, 2, 3)\n    ^^^^\nValueError: too many values to unpack (expected 2, got 3)\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch7/unpack_error.py\", line 1, in <module>\n    x, y = (1, 2, 3)\n    ^^^^\nValueError: too many values to unpack (expected 2)\n",
    "exit": 1
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
