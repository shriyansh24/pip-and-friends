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
  "workdir": "/home/you/python-ch15",
  "versionDifferences": [
   "attr_typo.py",
   "ex_spot_str.py",
   "id_peek.py",
   "list_no_repr.py",
   "print_plain.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): attr_typo.py, ex_spot_str.py, id_peek.py, list_no_repr.py, print_plain.py."
 },
 "programs": {
  "attr_typo.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\nrex = Pet(\"Rex\")\nprint(rex.nme)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/attr_typo.py\", line 6, in <module>\n    print(rex.nme)\n          ^^^^^^^\nAttributeError: 'Pet' object has no attribute 'nme'. Did you mean '.name' instead of '.nme'?\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/attr_typo.py\", line 6, in <module>\n    print(rex.nme)\n          ^^^^^^^\nAttributeError: 'Pet' object has no attribute 'nme'. Did you mean: 'name'?\n",
    "exit": 1
   }
  },
  "boss_bank.py": {
   "src": "class Account:\n    def __init__(self, owner):\n        self.owner = owner\n        self.balance = 0\n\n    def deposit(self, amount):\n        self.balance = self.balance + amount\n\ndef gift(account):\n    account.deposit(10)\n\nmine = Account(\"Ada\")\nyours = Account(\"Bo\")\nours = mine\ngift(ours)\nmine.deposit(5)\nprint(mine.balance, yours.balance, ours.balance)\nprint(ours is mine)\n",
   "stdout": "15 0 15\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "boss_fill.py": {
   "src": "class Light:\n    def __init__(self, color):\n        self.color = color\n\n    def __str__(self):\n        return \"A \" + self.color + \" light\"\n\n    def __repr__(self):\n        return \"Light('\" + self.color + \"')\"\n\nlights = [Light(\"red\"), Light(\"green\")]\nprint(lights[0])\nprint(lights)\n",
   "stdout": "A red light\n[Light('red'), Light('green')]\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "def clean(words):\n    for w in words[:]:\n        if w == \"\":\n            words.remove(w)\nitems = [\"a\", \"\", \"b\", \"\"]\nclean(items)\nprint(items)\n",
   "stdout": "['a', 'b']\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons_alt.py": {
   "src": "items = [\"a\", \"\", \"b\", \"\"]\ndef clean(words):\n    for w in words[:]:\n        if w == \"\":\n            words.remove(w)\nclean(items)\nprint(items)\n",
   "stdout": "['a', 'b']\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "class Ticket:\n    def __init__(self, seat):\n        self.seat = seat\n\n    def label():\n        return \"Seat \" + self.seat\n\nt = Ticket(\"12A\")\nprint(t.label())\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/boss_spot.py\", line 9, in <module>\n    print(t.label())\n          ~~~~~~~^^\nTypeError: Ticket.label() takes 0 positional arguments but 1 was given\n",
   "exit": 1
  },
  "boss_trace.py": {
   "src": "class Jar:\n    def __init__(self):\n        self.cookies = []\n\n    def add(self, name):\n        self.cookies.append(name)\n\n    def eat(self):\n        return self.cookies.pop()\n\njar = Jar()\nfor action in [\"add\", \"add\", \"eat\", \"add\"]:\n    if action == \"add\":\n        jar.add(\"choc\")\n    else:\n        jar.eat()\n    print(action, len(jar.cookies))\n",
   "stdout": "add 1\nadd 2\neat 1\nadd 2\n",
   "stderr": "",
   "exit": 0
  },
  "dict_loop_change.py": {
   "src": "stock = {\"tea\": 0, \"jam\": 2, \"fig\": 0}\nfor item in stock:\n    if stock[item] == 0:\n        del stock[item]\nprint(stock)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/dict_loop_change.py\", line 2, in <module>\n    for item in stock:\n                ^^^^^\nRuntimeError: dictionary changed size during iteration\n",
   "exit": 1
  },
  "dict_loop_fixed.py": {
   "src": "stock = {\"tea\": 0, \"jam\": 2, \"fig\": 0}\nfor item in list(stock):\n    if stock[item] == 0:\n        del stock[item]\nprint(stock)\n",
   "stdout": "{'jam': 2}\n",
   "stderr": "",
   "exit": 0
  },
  "dot_extra.py": {
   "src": "class Pet:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n\n    def greet(self):\n        return f\"{self.sound}! I am {self.name}\"\n\nrex = Pet(\"Rex\", \"Woof\")\nprint(rex.greet(\"hi\"))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/dot_extra.py\", line 10, in <module>\n    print(rex.greet(\"hi\"))\n          ~~~~~~~~~^^^^^^\nTypeError: Pet.greet() takes 1 positional argument but 2 were given\n",
   "exit": 1
  },
  "dot_noself.py": {
   "src": "class Pet:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n\n    def greet(self):\n        return f\"{self.sound}! I am {self.name}\"\n\nrex = Pet(\"Rex\", \"Woof\")\nprint(Pet.greet())\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/dot_noself.py\", line 10, in <module>\n    print(Pet.greet())\n          ~~~~~~~~~^^\nTypeError: Pet.greet() missing 1 required positional argument: 'self'\n",
   "exit": 1
  },
  "dot_unfold.py": {
   "src": "class Pet:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n\n    def greet(self):\n        return f\"{self.sound}! I am {self.name}\"\n\nrex = Pet(\"Rex\", \"Woof\")\ntom = Pet(\"Tom\", \"Meow\")\nprint(rex.greet())\nprint(Pet.greet(rex))\nprint(tom.greet())\nprint(Pet.greet(tom))\n",
   "stdout": "Woof! I am Rex\nWoof! I am Rex\nMeow! I am Tom\nMeow! I am Tom\n",
   "stderr": "",
   "exit": 0
  },
  "ex_coin_predict.py": {
   "src": "class Coin:\n    def __init__(self, value):\n        self.value = value\n\n    def __str__(self):\n        return f\"{self.value}c coin\"\n\n    def __repr__(self):\n        return f\"Coin({self.value})\"\n\npurse = [Coin(5), Coin(20)]\nprint(purse[1])\nprint(purse)\nprint(len(purse))\n",
   "stdout": "20c coin\n[Coin(5), Coin(20)]\n2\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_book.py": {
   "src": "class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nb = Book(\"Dune\", 412)\nprint(b.title, \"has\", b.pages, \"pages\")\n",
   "stdout": "Dune has 412 pages\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_recipe.py": {
   "src": "class Recipe:\n    def __init__(self, name, serves):\n        self.name = name\n        self.serves = serves\n        self.items = {}\n\n    def add(self, food, grams):\n        self.items[food] = grams\n\n    def total_grams(self):\n        total = 0\n        for food in self.items:\n            total = total + self.items[food]\n        return total\n\nsoup = Recipe(\"Soup\", 4)\nsoup.add(\"carrot\", 300)\nsoup.add(\"onion\", 150)\nprint(soup.total_grams())\n",
   "stdout": "450\n",
   "stderr": "",
   "exit": 0
  },
  "ex_is_predict.py": {
   "src": "x = [\"tea\"]\ny = [\"tea\"]\nz = y\nz.append(\"jam\")\nprint(x == y)\nprint(y is z)\nprint(y)\n",
   "stdout": "False\nTrue\n['tea', 'jam']\n",
   "stderr": "",
   "exit": 0
  },
  "ex_lend_predict.py": {
   "src": "def shout_all(words):\n    for i in range(len(words)):\n        words[i] = words[i].upper()\n\ndef replace_all(words):\n    words = [\"NEW\"]\n\nteam = [\"ada\", \"bo\"]\nreplace_all(team)\nprint(team)\nshout_all(team)\nprint(team)\n",
   "stdout": "['ada', 'bo']\n['ADA', 'BO']\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_badge.py": {
   "src": "class Badge:\n    def __init__(self, name):\n        self.name = name\n        self.text = \"Hi, I am \" + self.name\nada = Badge(\"Ada\")\nada.name = \"Ada L.\"\nprint(ada.name)\nprint(ada.text)\n",
   "stdout": "Ada L.\nHi, I am Ada\n",
   "stderr": "",
   "exit": 0
  },
  "ex_plant_predict.py": {
   "src": "class Plant:\n    def __init__(self, name):\n        self.name = name\n        self.height = 1\n\nfern = Plant(\"Fern\")\nivy = Plant(\"Ivy\")\nivy.height = 5\nfern.height = fern.height + ivy.height\nprint(fern.name, fern.height)\nprint(ivy.name, ivy.height)\n",
   "stdout": "Fern 6\nIvy 5\n",
   "stderr": "",
   "exit": 0
  },
  "ex_robot_predict.py": {
   "src": "class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def beep():\n        return \"beep\"\n\nr = Robot(\"R2\")\nprint(r.name)\nprint(r.beep())\n",
   "stdout": "R2\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/ex_robot_predict.py\", line 10, in <module>\n    print(r.beep())\n          ~~~~~~^^\nTypeError: Robot.beep() takes 0 positional arguments but 1 was given\n",
   "exit": 1
  },
  "ex_spot_guests.py": {
   "src": "guests = [\"Ada\", \"Bo\", \"Cy\", \"Di\"]\nfor name in guests:\n    if name != \"Di\":\n        guests.remove(name)\nprint(guests)\n",
   "stdout": "['Bo', 'Di']\n",
   "stderr": "",
   "exit": 0
  },
  "ex_spot_score.py": {
   "src": "class Score:\n    def __init__(self, player):\n        self.player = player\n        points = 0\n\n    def add(self, n):\n        self.points = self.points + n\n\ns = Score(\"Ada\")\ns.add(5)\nprint(s.player, s.points)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/ex_spot_score.py\", line 10, in <module>\n    s.add(5)\n    ~~~~~^^^\n  File \"/home/you/python-ch15/ex_spot_score.py\", line 7, in add\n    self.points = self.points + n\n                  ^^^^^^^^^^^\nAttributeError: 'Score' object has no attribute 'points'\n",
   "exit": 1
  },
  "ex_spot_str.py": {
   "src": "class Coin:\n    def __init__(self, value):\n        self.value = value\n\n    def __str__(self):\n        print(f\"{self.value}c coin\")\n\nc = Coin(5)\nprint(c)\n",
   "stdout": "5c coin\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/ex_spot_str.py\", line 9, in <module>\n    print(c)\n    ~~~~~^^^\nTypeError: Coin.__str__() must return a str, not NoneType\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "5c coin\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/ex_spot_str.py\", line 9, in <module>\n    print(c)\n    ~~~~~^^^\nTypeError: __str__ returned non-string (type NoneType)\n",
    "exit": 1
   }
  },
  "ex_trace_counter.py": {
   "src": "class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def click(self, step):\n        self.count = self.count + step\n\nc = Counter()\nfor step in [1, 2, 5]:\n    c.click(step)\n    print(step, c.count)\n",
   "stdout": "1 1\n2 3\n5 8\n",
   "stderr": "",
   "exit": 0
  },
  "ex_trace_remove.py": {
   "src": "nums = [1, 2, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\n    print(n, len(nums))\n",
   "stdout": "1 5\n2 4\n3 4\n4 3\n",
   "stderr": "",
   "exit": 0
  },
  "first_class.py": {
   "src": "class Cookie:\n    pass\n\na = Cookie()\nb = Cookie()\nprint(type(a))\nprint(a is b)\nprint(a == b)\n",
   "stdout": "<class '__main__.Cookie'>\nFalse\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "forgot_dot.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        name = name\n\nrex = Pet(\"Rex\")\nprint(rex.name)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/forgot_dot.py\", line 6, in <module>\n    print(rex.name)\n          ^^^^^^^^\nAttributeError: 'Pet' object has no attribute 'name'\n",
   "exit": 1
  },
  "forgot_self.py": {
   "src": "class Pet:\n    def hello():\n        print(\"Hello!\")\n\nrex = Pet()\nrex.hello()\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/forgot_self.py\", line 6, in <module>\n    rex.hello()\n    ~~~~~~~~~^^\nTypeError: Pet.hello() takes 0 positional arguments but 1 was given\n",
   "exit": 1
  },
  "grade_class.py": {
   "src": "class Student:\n    def __init__(self, name):\n        self.name = name\n        self.scores = []\n\n    def add_score(self, score):\n        self.scores.append(score)\n\n    def average(self):\n        return sum(self.scores) / len(self.scores)\n\n    def __str__(self):\n        return f\"{self.name}: {self.average():.1f}\"\n\nada = Student(\"Ada\")\nfor s in [90, 80, 100]:\n    ada.add_score(s)\nprint(ada.name, ada.average())\nprint(ada)\n",
   "stdout": "Ada 90.0\nAda: 90.0\n",
   "stderr": "",
   "exit": 0
  },
  "grade_dict.py": {
   "src": "def add_score(student, score):\n    student[\"scores\"].append(score)\n\ndef average(student):\n    return sum(student[\"scores\"]) / len(student[\"scores\"])\n\nada = {\"name\": \"Ada\", \"scores\": [90, 80]}\nadd_score(ada, 100)\nprint(ada[\"name\"], average(ada))\n",
   "stdout": "Ada 90.0\n",
   "stderr": "",
   "exit": 0
  },
  "id_peek.py": {
   "src": "a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\nprint(id(a))\nprint(id(b))\nprint(id(c))\nprint(id(a) == id(c))\n",
   "stdout": "139639903874048\n139639904009664\n139639903874048\nTrue\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "139650252431360\n139650257475200\n139650252431360\nTrue\n",
    "stderr": "",
    "exit": 0
   }
  },
  "init_return.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n        return self\n\nrex = Pet(\"Rex\", \"dog\")\nprint(rex.name, \"the\", rex.kind)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/init_return.py\", line 7, in <module>\n    rex = Pet(\"Rex\", \"dog\")\nTypeError: __init__() should return None, not 'Pet'\n",
   "exit": 1
  },
  "init_typo.py": {
   "src": "class Pet:\n    def __init_(self, name, kind):\n        self.name = name\n        self.kind = kind\n\nrex = Pet(\"Rex\", \"dog\")\nprint(rex.name, \"the\", rex.kind)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/init_typo.py\", line 6, in <module>\n    rex = Pet(\"Rex\", \"dog\")\nTypeError: Pet() takes no arguments\n",
   "exit": 1
  },
  "lend_list.py": {
   "src": "def add_snack(bag):\n    bag.append(\"fig\")\n    print(\"in add_snack:\", bag)\n\ndef new_bag(bag):\n    bag = [\"plum\"]\n    print(\"in new_bag:\", bag)\n\nsnacks = [\"kiwi\"]\nadd_snack(snacks)\nnew_bag(snacks)\nprint(\"back home:\", snacks)\n",
   "stdout": "in add_snack: ['kiwi', 'fig']\nin new_bag: ['plum']\nback home: ['kiwi', 'fig']\n",
   "stderr": "",
   "exit": 0
  },
  "list_no_repr.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\n    def __str__(self):\n        return self.name\n\npets = [Pet(\"Rex\"), Pet(\"Tom\")]\nprint(pets[0])\nprint(pets)\n",
   "stdout": "Rex\n[<__main__.Pet object at 0x7f1a9c59c980>, <__main__.Pet object at 0x7f1a9c57c7d0>]\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Rex\n[<__main__.Pet object at 0x7f216ace2f90>, <__main__.Pet object at 0x7f216a974cd0>]\n",
    "stderr": "",
    "exit": 0
   }
  },
  "method_nameerror.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\n    def hello(self):\n        print(\"Hello, I am\", name)\n\nrex = Pet(\"Rex\")\nrex.hello()\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/method_nameerror.py\", line 9, in <module>\n    rex.hello()\n    ~~~~~~~~~^^\n  File \"/home/you/python-ch15/method_nameerror.py\", line 6, in hello\n    print(\"Hello, I am\", name)\n                         ^^^^\nNameError: name 'name' is not defined. Did you mean: 'self.name'?\n",
   "exit": 1
  },
  "methods_tour.py": {
   "src": "word = \"pip\"\nprint(word.upper())\nprint(str.upper(word))\nnums = [3, 1]\nnums.append(2)\nprint(nums)\nprint(type(word), type(nums))\n",
   "stdout": "PIP\nPIP\n[3, 1, 2]\n<class 'str'> <class 'list'>\n",
   "stderr": "",
   "exit": 0
  },
  "missing_arg.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n\nrex = Pet(\"Rex\")\nprint(rex.name, \"the\", rex.kind)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch15/missing_arg.py\", line 6, in <module>\n    rex = Pet(\"Rex\")\nTypeError: Pet.__init__() missing 1 required positional argument: 'kind'\n",
   "exit": 1
  },
  "nb_eq_default.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\na = Pet(\"Rex\")\nb = Pet(\"Rex\")\nprint(a == b)\nprint(a.name == b.name)\nprint(a == a)\n",
   "stdout": "False\nTrue\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "nb_everything.py": {
   "src": "class Pet:\n    pass\n\nfor thing in [5, \"hi\", [1], len, Pet, Pet()]:\n    print(type(thing).__name__, isinstance(thing, object))\n",
   "stdout": "int True\nstr True\nlist True\nbuiltin_function_or_method True\ntype True\nPet True\n",
   "stderr": "",
   "exit": 0
  },
  "nb_ints.py": {
   "src": "n = 5\nm = n\nn = n + 1\nprint(m, n)\nprint(m is n)\n",
   "stdout": "5 6\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "nb_is_literal.py": {
   "src": "name = \"Rex\"\nif name is \"Rex\":\n    print(\"found Rex\")\n",
   "stdout": "found Rex\n",
   "stderr": "/home/you/python-ch15/nb_is_literal.py:2: SyntaxWarning: \"is\" with 'str' literal. Did you mean \"==\"?\n  if name is \"Rex\":\n",
   "exit": 0
  },
  "nb_vars.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return \"Hi, I am \" + self.name\n\nrex = Pet(\"Rex\")\nprint(vars(rex))\nrex.age = 4\nprint(vars(rex))\nprint(type(rex).__name__)\nprint(\"greet\" in vars(Pet), \"greet\" in vars(rex))\n",
   "stdout": "{'name': 'Rex'}\n{'name': 'Rex', 'age': 4}\nPet\nTrue False\n",
   "stderr": "",
   "exit": 0
  },
  "new_or_same.py": {
   "src": "word = \"hi\"\nsaved = word\nword = word + \"!\"\nnums = [1, 2]\nsame = nums\nnums.append(3)\nprint(saved, word)\nprint(same, same is nums)\n",
   "stdout": "hi hi!\n[1, 2, 3] True\n",
   "stderr": "",
   "exit": 0
  },
  "pet.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n        self.hunger = 3\n\nrex = Pet(\"Rex\", \"dog\")\ntom = Pet(\"Tom\", \"cat\")\nprint(rex.name, rex.kind, rex.hunger)\nprint(tom.name, tom.kind)\n",
   "stdout": "Rex dog 3\nTom cat\n",
   "stderr": "",
   "exit": 0
  },
  "pet_methods.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n        self.hunger = 3\n\n    def feed(self, snacks):\n        self.hunger = self.hunger - snacks\n\n    def status(self):\n        return f\"{self.name}: hunger {self.hunger}\"\n\nrex = Pet(\"Rex\")\ntom = Pet(\"Tom\")\nrex.feed(2)\nprint(rex.status())\nprint(tom.status())\n",
   "stdout": "Rex: hunger 1\nTom: hunger 3\n",
   "stderr": "",
   "exit": 0
  },
  "pet_repr.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n\n    def __str__(self):\n        return f\"{self.name} the {self.kind}\"\n\n    def __repr__(self):\n        return f\"Pet('{self.name}', '{self.kind}')\"\n\npets = [Pet(\"Rex\", \"dog\"), Pet(\"Tom\", \"cat\")]\nprint(pets[0])\nprint(pets)\nprint(repr(pets[0]))\n",
   "stdout": "Rex the dog\n[Pet('Rex', 'dog'), Pet('Tom', 'cat')]\nPet('Rex', 'dog')\n",
   "stderr": "",
   "exit": 0
  },
  "pet_str.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n\n    def __str__(self):\n        return f\"{self.name} the {self.kind}\"\n\nrex = Pet(\"Rex\", \"dog\")\nprint(rex)\nprint(f\"Say hi to {rex}!\")\nprint(str(rex).upper())\n",
   "stdout": "Rex the dog\nSay hi to Rex the dog!\nREX THE DOG\n",
   "stderr": "",
   "exit": 0
  },
  "print_plain.py": {
   "src": "class Pet:\n    def __init__(self, name):\n        self.name = name\n\nrex = Pet(\"Rex\")\nprint(rex)\n",
   "stdout": "<__main__.Pet object at 0x7fbeb5598980>\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "<__main__.Pet object at 0x7f3b016aaf90>\n",
    "stderr": "",
    "exit": 0
   }
  },
  "recipe_v1.py": {
   "src": "class Recipe:\n    def __init__(self, name, serves):\n        self.name = name\n        self.serves = serves\n        self.items = {}\n\n    def add(self, food, grams):\n        self.items[food] = grams\n\n    def __str__(self):\n        return f\"{self.name} (serves {self.serves})\"\n\npancakes = Recipe(\"Pancakes\", 2)\npancakes.add(\"flour\", 100)\npancakes.add(\"milk\", 250)\nprint(pancakes)\nprint(pancakes.items)\n",
   "stdout": "Pancakes (serves 2)\n{'flour': 100, 'milk': 250}\n",
   "stderr": "",
   "exit": 0
  },
  "recipe_v2.py": {
   "src": "class Recipe:\n    def __init__(self, name, serves):\n        self.name = name\n        self.serves = serves\n        self.items = {}\n\n    def add(self, food, grams):\n        self.items[food] = grams\n\n    def __str__(self):\n        return f\"{self.name} (serves {self.serves})\"\n\n    def scaled(self, serves):\n        bigger = Recipe(self.name, serves)\n        for food in self.items:\n            bigger.add(food, self.items[food] * serves // self.serves)\n        return bigger\n\npancakes = Recipe(\"Pancakes\", 2)\npancakes.add(\"flour\", 100)\npancakes.add(\"milk\", 250)\nparty = pancakes.scaled(6)\nprint(party)\nprint(party.items)\nprint(pancakes.items)\n",
   "stdout": "Pancakes (serves 6)\n{'flour': 300, 'milk': 750}\n{'flour': 100, 'milk': 250}\n",
   "stderr": "",
   "exit": 0
  },
  "recipe_v3.py": {
   "src": "class Recipe:\n    def __init__(self, name, serves):\n        self.name = name\n        self.serves = serves\n        self.items = {}\n\n    def add(self, food, grams):\n        self.items[food] = grams\n\n    def __str__(self):\n        return f\"{self.name} (serves {self.serves})\"\n\n    def scaled(self, serves):\n        bigger = Recipe(self.name, serves)\n        for food in self.items:\n            bigger.add(food, self.items[food] * serves // self.serves)\n        return bigger\n\n    def show(self):\n        print(self)\n        for food, grams in self.items.items():\n            print(f\"  {food}: {grams} g\")\n\nbook = [Recipe(\"Pancakes\", 2), Recipe(\"Tea\", 1)]\nbook[0].add(\"flour\", 100)\nbook[0].add(\"milk\", 250)\nbook[1].add(\"leaves\", 3)\nbook.append(book[0].scaled(6))\nfor recipe in book:\n    recipe.show()\n",
   "stdout": "Pancakes (serves 2)\n  flour: 100 g\n  milk: 250 g\nTea (serves 1)\n  leaves: 3 g\nPancakes (serves 6)\n  flour: 300 g\n  milk: 750 g\n",
   "stderr": "",
   "exit": 0
  },
  "remove_fixed.py": {
   "src": "nums = [1, 2, 2, 3, 4]\nfor n in nums[:]:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)\n\nnums = [1, 2, 2, 3, 4]\nodds = []\nfor n in nums:\n    if n % 2 != 0:\n        odds.append(n)\nprint(odds)\n",
   "stdout": "[1, 3]\n[1, 3]\n",
   "stderr": "",
   "exit": 0
  },
  "remove_while_looping.py": {
   "src": "nums = [1, 2, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)\nprint(nums)\n",
   "stdout": "[1, 2, 3]\n",
   "stderr": "",
   "exit": 0
  },
  "road_ok.py": {
   "src": "class Pet:\n    def __init__(self, name, kind):\n        self.name = name\n        self.kind = kind\n\nrex = Pet(\"Rex\", \"dog\")\nprint(rex.name, \"the\", rex.kind)\n",
   "stdout": "Rex the dog\n",
   "stderr": "",
   "exit": 0
  },
  "same_or_equal.py": {
   "src": "a = [1, 2, 3]\nb = [1, 2, 3]\nc = a\nprint(a == b)\nprint(a is b)\nprint(a is c)\n",
   "stdout": "True\nFalse\nTrue\n",
   "stderr": "",
   "exit": 0
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
