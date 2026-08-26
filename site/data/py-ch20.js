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
  "workdir": "/home/you/python-ch20",
  "versionDifferences": [
   "dc_mutable.py",
   "dc_order_err.py",
   "dc_slots.py",
   "dc_unhashable.py",
   "enum_bad.py",
   "enum_key_err.py",
   "eq_unhashable.py",
   "frozendict_demo.py",
   "nb_notimpl_bool.py",
   "pred_hash_err.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): dc_mutable.py, dc_order_err.py, dc_slots.py, dc_unhashable.py, enum_bad.py, enum_key_err.py, eq_unhashable.py, frozendict_demo.py, nb_notimpl_bool.py, pred_hash_err.py."
 },
 "programs": {
  "add_false.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return False\n        return Money(self.cents + other.cents)\n\nclass Coupon:\n    def __init__(self, off):\n        self.off = off\n\n    def __radd__(self, money):\n        return Money(money.cents - self.off)\n\nprice = Money(500) + Coupon(100)\nprint(price)\n",
   "stdout": "False\n",
   "stderr": "",
   "exit": 0
  },
  "add_notimpl.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return NotImplemented\n        return Money(self.cents + other.cents)\n\nclass Coupon:\n    def __init__(self, off):\n        self.off = off\n\n    def __radd__(self, money):\n        return Money(money.cents - self.off)\n\nprice = Money(500) + Coupon(100)\nprint(price.cents)\n",
   "stdout": "400\n",
   "stderr": "",
   "exit": 0
  },
  "bag_full.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = list(things)\n\n    def __repr__(self):\n        return f\"Bag({self.things!r})\"\n\n    def __len__(self):\n        return len(self.things)\n\n    def __getitem__(self, i):\n        return self.things[i]\n\n    def __contains__(self, x):\n        return x in self.things\n\n    def __iter__(self):\n        return iter(self.things)\n\n    def __add__(self, other):\n        return Bag(self.things + other.things)\n\nbag = Bag([\"ball\", \"kite\"])\nmore = Bag([\"yo-yo\"])\nprint(len(bag))\nprint(bag[0])\nprint(bag[-1])\nprint(\"kite\" in bag)\nprint(bag + more)\nprint([thing.upper() for thing in bag])\n",
   "stdout": "2\nball\nkite\nTrue\nBag(['ball', 'kite', 'yo-yo'])\n['BALL', 'KITE']\n",
   "stderr": "",
   "exit": 0
  },
  "bag_iter.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = things\n\n    def __iter__(self):\n        return iter(self.things)\n\nbag = Bag([\"ball\", \"kite\", \"yo-yo\"])\nfor thing in bag:\n    print(thing)\n",
   "stdout": "ball\nkite\nyo-yo\n",
   "stderr": "",
   "exit": 0
  },
  "bag_len.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = things\n\n    def __len__(self):\n        return len(self.things)\n\nbag = Bag([\"ball\", \"kite\"])\nprint(len(bag))\nprint(bag.__len__())\n",
   "stdout": "2\n2\n",
   "stderr": "",
   "exit": 0
  },
  "bag_nolen.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = things\n\nbag = Bag([\"ball\", \"kite\"])\nprint(len(bag))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/bag_nolen.py\", line 6, in <module>\n    print(len(bag))\n          ~~~^^^^^\nTypeError: object of type 'Bag' has no len()\n",
   "exit": 1
  },
  "bool_stack.py": {
   "src": "class Stack:\n    def __init__(self, items):\n        self.items = list(items)\n\n    def __len__(self):\n        return len(self.items)\n\n    def pop(self):\n        return self.items.pop()\n\ns = Stack([3, 5, 8])\nwhile s:\n    top = s.pop()\n    print(top, len(s), bool(s))\n",
   "stdout": "8 2 True\n5 1 True\n3 0 False\n",
   "stderr": "",
   "exit": 0
  },
  "bool_wallet.py": {
   "src": "class Wallet:\n    def __init__(self, coins):\n        self.coins = coins\n\n    def __bool__(self):\n        return self.coins > 0\n\nclass Plain:\n    pass\n\nprint(bool(Wallet(5)))\nprint(bool(Wallet(0)))\nprint(bool(Plain()))\nif not Wallet(0):\n    print(\"Time to save up!\")\n",
   "stdout": "True\nFalse\nTrue\nTime to save up!\n",
   "stderr": "",
   "exit": 0
  },
  "boss_error.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(order=True)\nclass Score:\n    points: int\n    name: str\n\nprint(Score(80, \"Bo\") < Score(95, \"Ada\"))\nprint(Score(80, \"Bo\") < 95)\n",
   "stdout": "True\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/boss_error.py\", line 9, in <module>\n    print(Score(80, \"Bo\") < 95)\n          ^^^^^^^^^^^^^^^^^^^^\nTypeError: '<' not supported between instances of 'Score' and 'int'\n",
   "exit": 1
  },
  "boss_fill.py": {
   "src": "from functools import total_ordering\n\n@total_ordering\nclass Runner:\n    def __init__(self, name, seconds):\n        self.name = name\n        self.seconds = seconds\n\n    def __eq__(self, other):\n        return self.seconds == other.seconds\n\n    def __lt__(self, other):\n        return self.seconds < other.seconds\n\nada, bo = Runner(\"Ada\", 58), Runner(\"Bo\", 61)\nprint(ada < bo, ada >= bo)\nprint(min(ada, bo).name)\n",
   "stdout": "True False\nAda\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "from dataclasses import dataclass, replace\n@dataclass(frozen=True)\nclass Card:\n    rank: int\n    suit: str\n    def __str__(self):\n        return f\"{self.rank} of {self.suit}\"\nseven = Card(7, \"hearts\")\nprint(replace(seven, rank=8))\n",
   "stdout": "8 of hearts\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons_alt.py": {
   "src": "from dataclasses import dataclass, replace\n@dataclass(frozen=True)\nclass Card:\n    def __str__(self):\n        return f\"{self.rank} of {self.suit}\"\n    rank: int\n    suit: str\nseven = Card(7, \"hearts\")\nprint(replace(seven, rank=8))\n",
   "stdout": "8 of hearts\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "from dataclasses import dataclass, field\n\n@dataclass\nclass Playlist:\n    name: str\n    songs: list = field(default_factory=list)\n\n    def __len__(self):\n        return len(self.songs)\n\n    def __contains__(self, song):\n        return song.lower() in self.songs\n\n    def __iter__(self):\n        return iter(sorted(self.songs))\n\nmix = Playlist(\"road trip\", [\"yo\", \"hey\"])\nprint(len(mix), \"HEY\" in mix)\nprint(list(mix))\nprint(bool(Playlist(\"empty\")))\nprint(mix == Playlist(\"road trip\", [\"yo\", \"hey\"]))\n",
   "stdout": "2 True\n['hey', 'yo']\nFalse\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "class Queue:\n    def __init__(self):\n        self.people = []\n\n    def join(self, name):\n        self.people.append(name)\n\n    def __len__(self):\n        len(self.people)\n\nq = Queue()\nq.join(\"Ada\")\nq.join(\"Bo\")\nprint(\"People waiting:\", len(q))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/boss_spot.py\", line 14, in <module>\n    print(\"People waiting:\", len(q))\n                             ~~~^^^\nTypeError: 'NoneType' object cannot be interpreted as an integer\n",
   "exit": 1
  },
  "boss_trace.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Vec:\n    x: int\n    y: int\n\n    def __add__(self, other):\n        return Vec(self.x + other.x, self.y + other.y)\n\npos = Vec(0, 0)\nmoves = [Vec(1, 0), Vec(0, 2), Vec(-3, 1)]\nfor step, move in enumerate(moves, start=1):\n    pos = pos + move\n    print(step, pos.x, pos.y)\n",
   "stdout": "1 1 0\n2 1 2\n3 -2 3\n",
   "stderr": "",
   "exit": 0
  },
  "by_hand.py": {
   "src": "class Point:\n    def __init__(self, x, y=0):\n        self.x = x\n        self.y = y\n\n    def __repr__(self):\n        return f\"Point(x={self.x!r}, y={self.y!r})\"\n\n    def __eq__(self, other):\n        if other.__class__ is not self.__class__:\n            return NotImplemented\n        return (self.x, self.y) == (other.x, other.y)\n\np = Point(3, 4)\nprint(p)\nprint(p == Point(3, 4))\nprint(Point(5))\n",
   "stdout": "Point(x=3, y=4)\nTrue\nPoint(x=5, y=0)\n",
   "stderr": "",
   "exit": 0
  },
  "call_obj.py": {
   "src": "class Multiplier:\n    def __init__(self, n):\n        self.n = n\n        self.calls = 0\n\n    def __call__(self, x):\n        self.calls += 1\n        return x * self.n\n\ntriple = Multiplier(3)\nprint(triple(5))\nprint(triple(10))\nprint(triple.calls)\nprint(callable(triple))\nprint(list(map(triple, [1, 2, 3])))\n",
   "stdout": "15\n30\n2\nTrue\n[3, 6, 9]\n",
   "stderr": "",
   "exit": 0
  },
  "cart_trace.py": {
   "src": "from dataclasses import dataclass, field\n\n@dataclass\nclass Cart:\n    owner: str\n    items: list = field(default_factory=list)\n\nada = Cart(\"Ada\")\nbo = Cart(\"Bo\")\nada.items.append(\"apple\")\nprint(len(ada.items), len(bo.items))\n",
   "stdout": "1 0\n",
   "stderr": "",
   "exit": 0
  },
  "dc_eq_hand.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\na = Point(1, 2)\nb = Point(1, 2)\nc = a\nprint(a == b, a is b)\nprint(c is a)\na.x = 7\nprint(c)\nprint(b)\n",
   "stdout": "True False\nTrue\nPoint(x=7, y=2)\nPoint(x=1, y=2)\n",
   "stderr": "",
   "exit": 0
  },
  "dc_factory.py": {
   "src": "from dataclasses import dataclass, field\n\n@dataclass\nclass Cart:\n    owner: str\n    items: list = field(default_factory=list)\n\nada = Cart(\"Ada\")\nbo = Cart(\"Bo\")\nada.items.append(\"apple\")\nprint(ada)\nprint(bo)\n",
   "stdout": "Cart(owner='Ada', items=['apple'])\nCart(owner='Bo', items=[])\n",
   "stderr": "",
   "exit": 0
  },
  "dc_frozen.py": {
   "src": "from dataclasses import dataclass, replace\n\n@dataclass(frozen=True)\nclass Point:\n    x: int\n    y: int\n\nhome = Point(0, 0)\nmoved = replace(home, x=5)\nprint(home, moved)\nprint({home, moved, Point(0, 0)} == {home, moved})\nprint(\"Changing home.x...\")\nhome.x = 9\n",
   "stdout": "Point(x=0, y=0) Point(x=5, y=0)\nTrue\nChanging home.x...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_frozen.py\", line 13, in <module>\n    home.x = 9\n    ^^^^^^\n  File \"<string>\", line 16, in __setattr__\ndataclasses.FrozenInstanceError: cannot assign to field 'x'\n",
   "exit": 1
  },
  "dc_labels.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nodd = Point(\"left\", None)\nprint(odd)\nprint(Point.__annotations__)\n",
   "stdout": "Point(x='left', y=None)\n{'x': <class 'int'>, 'y': <class 'int'>}\n",
   "stderr": "",
   "exit": 0
  },
  "dc_mutable.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Cart:\n    owner: str\n    items: list = []\n\nada = Cart(\"Ada\")\nprint(ada)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_mutable.py\", line 3, in <module>\n    @dataclass\n     ^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1462, in dataclass\n    return wrap(cls)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1452, in wrap\n    return _process_class(cls, init, repr, eq, order, unsafe_hash,\n                          frozen, match_args, kw_only, slots,\n                          weakref_slot)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1083, in _process_class\n    cls_fields.append(_get_field(cls, name, type, kw_only))\n                      ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 910, in _get_field\n    raise ValueError(f'mutable default {type(f.default)} for field '\n                     f'{f.name} is not allowed: use default_factory')\nValueError: mutable default <class 'list'> for field items is not allowed: use default_factory\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_mutable.py\", line 3, in <module>\n    @dataclass\n     ^^^^^^^^^\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1354, in dataclass\n    return wrap(cls)\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1344, in wrap\n    return _process_class(cls, init, repr, eq, order, unsafe_hash,\n                          frozen, match_args, kw_only, slots,\n                          weakref_slot)\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1008, in _process_class\n    cls_fields.append(_get_field(cls, name, type, kw_only))\n                      ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 860, in _get_field\n    raise ValueError(f'mutable default {type(f.default)} for field '\n                     f'{f.name} is not allowed: use default_factory')\nValueError: mutable default <class 'list'> for field items is not allowed: use default_factory\n",
    "exit": 1
   }
  },
  "dc_order.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(order=True)\nclass Score:\n    points: int\n    name: str\n\nboard = [Score(80, \"Cy\"), Score(95, \"Ada\"), Score(80, \"Bo\")]\nfor s in sorted(board, reverse=True):\n    print(s.points, s.name)\nprint(Score(80, \"Bo\") < Score(80, \"Cy\"))\n",
   "stdout": "95 Ada\n80 Cy\n80 Bo\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "dc_order_err.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Pet:\n    kind: str = \"cat\"\n    name: str\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_order_err.py\", line 3, in <module>\n    @dataclass\n     ^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1462, in dataclass\n    return wrap(cls)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1452, in wrap\n    return _process_class(cls, init, repr, eq, order, unsafe_hash,\n                          frozen, match_args, kw_only, slots,\n                          weakref_slot)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 1153, in _process_class\n    _init_fn(all_init_fields,\n    ~~~~~~~~^^^^^^^^^^^^^^^^^\n             std_init_fields,\n             ^^^^^^^^^^^^^^^^\n    ...<9 lines>...\n             slots,\n             ^^^^^^\n             )\n             ^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/dataclasses.py\", line 680, in _init_fn\n    raise TypeError(f'non-default argument {f.name!r} '\n                    f'follows default argument {seen_default.name!r}')\nTypeError: non-default argument 'name' follows default argument 'kind'\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_order_err.py\", line 3, in <module>\n    @dataclass\n     ^^^^^^^^^\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1354, in dataclass\n    return wrap(cls)\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1344, in wrap\n    return _process_class(cls, init, repr, eq, order, unsafe_hash,\n                          frozen, match_args, kw_only, slots,\n                          weakref_slot)\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 1078, in _process_class\n    _init_fn(all_init_fields,\n    ~~~~~~~~^^^^^^^^^^^^^^^^^\n             std_init_fields,\n             ^^^^^^^^^^^^^^^^\n    ...<9 lines>...\n             slots,\n             ^^^^^^\n             )\n             ^\n  File \"/usr/local/lib/python3.13/dataclasses.py\", line 627, in _init_fn\n    raise TypeError(f'non-default argument {f.name!r} '\n                    f'follows default argument {seen_default.name!r}')\nTypeError: non-default argument 'name' follows default argument 'kind'\n",
    "exit": 1
   }
  },
  "dc_pet.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Pet:\n    name: str\n    kind: str = \"cat\"\n    age: int = 0\n\n    def birthday(self):\n        self.age += 1\n        return f\"Happy birthday, {self.name}!\"\n\ntom = Pet(\"Tom\")\nrex = Pet(\"Rex\", \"dog\", age=3)\nprint(tom)\nprint(rex)\nprint(rex.birthday())\nprint(rex.age)\nprint(tom == Pet(\"Tom\", \"cat\", 0))\n",
   "stdout": "Pet(name='Tom', kind='cat', age=0)\nPet(name='Rex', kind='dog', age=3)\nHappy birthday, Rex!\n4\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "dc_pred.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int = 100\n\na = Book(\"Emma\")\nb = Book(\"Emma\", 100)\nprint(a)\nprint(a == b)\nprint(a is b)\n",
   "stdout": "Book(title='Emma', pages=100)\nTrue\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "dc_slots.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(slots=True)\nclass Robot:\n    name: str\n    battery: int = 100\n\npip = Robot(\"Pip\")\npip.battery = 20\nprint(pip)\npip.batery = 5\n",
   "stdout": "Robot(name='Pip', battery=20)\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_slots.py\", line 11, in <module>\n    pip.batery = 5\n    ^^^^^^^^^^\nAttributeError: 'Robot' object has no attribute 'batery' and no __dict__ for setting new attributes. Did you mean '.battery' instead of '.batery'?\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Robot(name='Pip', battery=20)\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_slots.py\", line 11, in <module>\n    pip.batery = 5\n    ^^^^^^^^^^\nAttributeError: 'Robot' object has no attribute 'batery' and no __dict__ for setting new attributes. Did you mean: 'battery'?\n",
    "exit": 1
   }
  },
  "dc_typo.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Robot:\n    name: str\n    battery: int = 100\n\npip = Robot(\"Pip\")\npip.batery = 20\nprint(pip)\nprint(pip.batery)\n",
   "stdout": "Robot(name='Pip', battery=100)\n20\n",
   "stderr": "",
   "exit": 0
  },
  "dc_unhashable.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(1, 2) == Point(1, 2))\nseen = {Point(1, 2)}\n",
   "stdout": "True\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_unhashable.py\", line 9, in <module>\n    seen = {Point(1, 2)}\n           ^^^^^^^^^^^^^\nTypeError: cannot use 'Point' as a set element (unhashable type: 'Point')\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "True\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/dc_unhashable.py\", line 9, in <module>\n    seen = {Point(1, 2)}\n           ^^^^^^^^^^^^^\nTypeError: unhashable type: 'Point'\n",
    "exit": 1
   }
  },
  "enum_bad.py": {
   "src": "from enum import Enum\n\nclass Light(Enum):\n    RED = 1\n    AMBER = 2\n    GREEN = 3\n\nprint(Light(2))\nprint(Light(5))\n",
   "stdout": "Light.AMBER\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/enum_bad.py\", line 9, in <module>\n    print(Light(5))\n          ~~~~~^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/enum.py\", line 733, in __call__\n    return cls.__new__(cls, value)\n           ~~~~~~~~~~~^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/enum.py\", line 1222, in __new__\n    raise ve_exc\nValueError: 5 is not a valid Light\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Light.AMBER\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/enum_bad.py\", line 9, in <module>\n    print(Light(5))\n          ~~~~~^^^\n  File \"/usr/local/lib/python3.13/enum.py\", line 728, in __call__\n    return cls.__new__(cls, value)\n           ~~~~~~~~~~~^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/enum.py\", line 1205, in __new__\n    raise ve_exc\nValueError: 5 is not a valid Light\n",
    "exit": 1
   }
  },
  "enum_basic.py": {
   "src": "from enum import Enum\n\nclass Light(Enum):\n    RED = 1\n    AMBER = 2\n    GREEN = 3\n\nnow = Light.RED\nprint(now)\nprint(now.name, now.value)\nprint(Light(3))\nprint(Light[\"AMBER\"])\nprint(now == 1)\nprint(now is Light.RED)\nprint([light.name for light in Light])\n",
   "stdout": "Light.RED\nRED 1\nLight.GREEN\nLight.AMBER\nFalse\nTrue\n['RED', 'AMBER', 'GREEN']\n",
   "stderr": "",
   "exit": 0
  },
  "enum_key_err.py": {
   "src": "from enum import Enum\n\nclass Light(Enum):\n    RED = 1\n    AMBER = 2\n    GREEN = 3\n\nprint(Light[\"RED\"])\nprint(Light[\"BLUE\"])\n",
   "stdout": "Light.RED\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/enum_key_err.py\", line 9, in <module>\n    print(Light[\"BLUE\"])\n          ~~~~~^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/enum.py\", line 804, in __getitem__\n    return cls._member_map_[name]\n           ~~~~~~~~~~~~~~~~^^^^^^\nKeyError: 'BLUE'\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Light.RED\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/enum_key_err.py\", line 9, in <module>\n    print(Light[\"BLUE\"])\n          ~~~~~^^^^^^^^\n  File \"/usr/local/lib/python3.13/enum.py\", line 795, in __getitem__\n    return cls._member_map_[name]\n           ~~~~~~~~~~~~~~~~^^^^^^\nKeyError: 'BLUE'\n",
    "exit": 1
   }
  },
  "enum_more.py": {
   "src": "from enum import Enum, IntEnum, Flag, auto\n\nclass Size(Enum):\n    SMALL = auto()\n    LARGE = auto()\n\nclass Priority(IntEnum):\n    LOW = 1\n    HIGH = 3\n\nclass Perm(Flag):\n    READ = auto()\n    WRITE = auto()\n    RUN = auto()\n\nprint(Size.SMALL.value, Size.LARGE.value)\nprint(Priority.HIGH > Priority.LOW, Priority.HIGH == 3)\nmine = Perm.READ | Perm.WRITE\nprint(mine)\nprint(Perm.WRITE in mine, Perm.RUN in mine)\nprint([p.name for p in mine])\n",
   "stdout": "1 2\nTrue True\nPerm.READ|WRITE\nTrue False\n['READ', 'WRITE']\n",
   "stderr": "",
   "exit": 0
  },
  "enum_pred.py": {
   "src": "from enum import Enum, auto\n\nclass Dir(Enum):\n    NORTH = auto()\n    EAST = auto()\n    SOUTH = auto()\n    WEST = auto()\n\ndef turn_right(d):\n    members = list(Dir)\n    return members[(members.index(d) + 1) % len(members)]\n\nprint(turn_right(Dir.NORTH))\nprint(turn_right(Dir.WEST).name)\nprint(Dir.SOUTH.value)\n",
   "stdout": "Dir.EAST\nNORTH\n3\n",
   "stderr": "",
   "exit": 0
  },
  "eq_default.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\na = Card(7, \"hearts\")\nb = Card(7, \"hearts\")\nprint(a == b)\nprint(a == a)\n",
   "stdout": "False\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "eq_defined.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __eq__(self, other):\n        if not isinstance(other, Card):\n            return NotImplemented\n        return (self.rank, self.suit) == (other.rank, other.suit)\n\na = Card(7, \"hearts\")\nb = Card(7, \"hearts\")\nprint(a == b)\nprint(a != b)\nprint(a is b)\nprint(a == \"7 of hearts\")\n",
   "stdout": "True\nFalse\nFalse\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "eq_hash.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __eq__(self, other):\n        if not isinstance(other, Card):\n            return NotImplemented\n        return (self.rank, self.suit) == (other.rank, other.suit)\n\n    def __hash__(self):\n        return hash((self.rank, self.suit))\n\na = Card(7, \"hearts\")\nb = Card(7, \"hearts\")\nprint(len({a, b}))\npoints = {a: 10}\nprint(points[b])\nprint(hash(a) == hash(b))\n",
   "stdout": "1\n10\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "eq_unhashable.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __eq__(self, other):\n        if not isinstance(other, Card):\n            return NotImplemented\n        return (self.rank, self.suit) == (other.rank, other.suit)\n\nprint(Card.__hash__)\nhand = {Card(7, \"hearts\")}\n",
   "stdout": "None\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/eq_unhashable.py\", line 12, in <module>\n    hand = {Card(7, \"hearts\")}\n           ^^^^^^^^^^^^^^^^^^^\nTypeError: cannot use 'Card' as a set element (unhashable type: 'Card')\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "None\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/eq_unhashable.py\", line 12, in <module>\n    hand = {Card(7, \"hearts\")}\n           ^^^^^^^^^^^^^^^^^^^\nTypeError: unhashable type: 'Card'\n",
    "exit": 1
   }
  },
  "fill_factory.py": {
   "src": "from dataclasses import dataclass, field\n\n@dataclass\nclass Player:\n    name: str\n    badges: list = field(default_factory=list)\n\nada = Player(\"Ada\")\nbo = Player(\"Bo\")\nada.badges.append(\"star\")\nprint(ada.badges, bo.badges)\n",
   "stdout": "['star'] []\n",
   "stderr": "",
   "exit": 0
  },
  "fill_hash.py": {
   "src": "class Seat:\n    def __init__(self, row, number):\n        self.row = row\n        self.number = number\n\n    def __eq__(self, other):\n        return (self.row, self.number) == (other.row, other.number)\n\n    def __hash__(self):\n        return hash((self.row, self.number))\n\nbooked = {Seat(\"A\", 1), Seat(\"A\", 1), Seat(\"B\", 4)}\nprint(len(booked))\nprint(Seat(\"B\", 4) in booked)\n",
   "stdout": "2\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "fill_len.py": {
   "src": "class Playlist:\n    def __init__(self, songs):\n        self.songs = songs\n\n    def __len__(self):\n        return len(self.songs)\n\n    def __getitem__(self, i):\n        return self.songs[i]\n\nmix = Playlist([\"Hey\", \"Yo\", \"Ok\"])\nprint(len(mix))\nprint(mix[1])\n",
   "stdout": "3\nYo\n",
   "stderr": "",
   "exit": 0
  },
  "frozendict_demo.py": {
   "src": "colors = frozendict(sky=\"blue\", grass=\"green\")\nprint(colors)\nprint(colors[\"sky\"])\nprint(colors | {\"sun\": \"yellow\"})\nmoods = {colors: \"calm\"}\nprint(moods[frozendict(grass=\"green\", sky=\"blue\")])\ncolors[\"sky\"] = \"grey\"\n",
   "stdout": "frozendict({'sky': 'blue', 'grass': 'green'})\nblue\nfrozendict({'sky': 'blue', 'grass': 'green', 'sun': 'yellow'})\ncalm\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/frozendict_demo.py\", line 7, in <module>\n    colors[\"sky\"] = \"grey\"\n    ~~~~~~^^^^^^^\nTypeError: 'frozendict' object does not support item assignment\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/frozendict_demo.py\", line 1, in <module>\n    colors = frozendict(sky=\"blue\", grass=\"green\")\n             ^^^^^^^^^^\nNameError: name 'frozendict' is not defined. Did you mean: 'frozenset'?\n",
    "exit": 1
   }
  },
  "hash_lost.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __eq__(self, other):\n        return (self.rank, self.suit) == (other.rank, other.suit)\n\n    def __hash__(self):\n        return hash((self.rank, self.suit))\n\ncard = Card(7, \"hearts\")\nhand = {card}\nprint(card in hand)\ncard.rank = 9\nprint(card in hand)\nprint(len(hand))\n",
   "stdout": "True\nFalse\n1\n",
   "stderr": "",
   "exit": 0
  },
  "in_fallback.py": {
   "src": "class Shelf:\n    def __init__(self, books):\n        self.books = books\n\n    def __iter__(self):\n        print(\"  (looking through the shelf)\")\n        return iter(self.books)\n\nshelf = Shelf([\"Dune\", \"Emma\"])\nprint(\"Emma\" in shelf)\n",
   "stdout": "  (looking through the shelf)\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "len_wrong.py": {
   "src": "class Team:\n    def __init__(self, players):\n        self.players = players\n\n    def __len__(self):\n        return f\"{len(self.players)} players\"\n\nteam = Team([\"Ada\", \"Bo\", \"Cy\"])\nprint(\"Team ready\")\nprint(len(team))\n",
   "stdout": "Team ready\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/len_wrong.py\", line 10, in <module>\n    print(len(team))\n          ~~~^^^^^^\nTypeError: 'str' object cannot be interpreted as an integer\n",
   "exit": 1
  },
  "loud.py": {
   "src": "class Loud:\n    def __len__(self):\n        print(\"__len__ runs\")\n        return 3\n\n    def __getitem__(self, i):\n        print(\"__getitem__ runs with\", i)\n        return i * 10\n\n    def __contains__(self, x):\n        print(\"__contains__ runs with\", x)\n        return x == 7\n\nbox = Loud()\nprint(\"len:\", len(box))\nprint(\"item:\", box[2])\nprint(\"has 7?\", 7 in box)\n",
   "stdout": "__len__ runs\nlen: 3\n__getitem__ runs with 2\nitem: 20\n__contains__ runs with 7\nhas 7? True\n",
   "stderr": "",
   "exit": 0
  },
  "lt_sort.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __repr__(self):\n        return f\"Card({self.rank!r}, {self.suit!r})\"\n\n    def __lt__(self, other):\n        return self.rank < other.rank\n\nhand = [Card(9, \"clubs\"), Card(2, \"spades\"), Card(5, \"hearts\")]\nprint(sorted(hand))\nprint(max(hand))\nprint(Card(9, \"clubs\") > Card(2, \"spades\"))\nprint(Card(2, \"spades\") <= Card(9, \"clubs\"))\n",
   "stdout": "[Card(2, 'spades'), Card(5, 'hearts'), Card(9, 'clubs')]\nCard(9, 'clubs')\nTrue\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/lt_sort.py\", line 16, in <module>\n    print(Card(2, \"spades\") <= Card(9, \"clubs\"))\n          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nTypeError: '<=' not supported between instances of 'Card' and 'Card'\n",
   "exit": 1
  },
  "money_add.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __repr__(self):\n        return f\"Money({self.cents})\"\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return NotImplemented\n        return Money(self.cents + other.cents)\n\nlunch = Money(450)\nsnack = Money(125)\nprint(lunch + snack)\nprint(lunch.__add__(snack))\n",
   "stdout": "Money(575)\nMoney(575)\n",
   "stderr": "",
   "exit": 0
  },
  "money_radd.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __repr__(self):\n        return f\"Money({self.cents})\"\n\n    def __add__(self, other):\n        if isinstance(other, int):\n            return Money(self.cents + other)\n        if isinstance(other, Money):\n            return Money(self.cents + other.cents)\n        return NotImplemented\n\n    def __radd__(self, other):\n        return self + other\n\nbills = [Money(450), Money(125), Money(80)]\nprint(sum(bills))\nprint(10 + Money(5))\nprint(Money(5) + 10)\n",
   "stdout": "Money(655)\nMoney(15)\nMoney(15)\n",
   "stderr": "",
   "exit": 0
  },
  "money_sum_fail.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __repr__(self):\n        return f\"Money({self.cents})\"\n\n    def __add__(self, other):\n        if not isinstance(other, Money):\n            return NotImplemented\n        return Money(self.cents + other.cents)\n\nbills = [Money(450), Money(125), Money(80)]\nprint(bills[0] + bills[1])\nprint(sum(bills))\n",
   "stdout": "Money(575)\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/money_sum_fail.py\", line 15, in <module>\n    print(sum(bills))\n          ~~~^^^^^^^\nTypeError: unsupported operand type(s) for +: 'int' and 'Money'\n",
   "exit": 1
  },
  "nb_fields.py": {
   "src": "from dataclasses import dataclass, fields\n\n@dataclass\nclass Point:\n    x: int\n    y: int = 0\n\nprint([f.name for f in fields(Point)])\nprint(Point.__hash__)\nprint(\"__init__\" in Point.__dict__, \"__repr__\" in Point.__dict__)\nprint(Point.__match_args__)\n",
   "stdout": "['x', 'y']\nNone\nTrue True\n('x', 'y')\n",
   "stderr": "",
   "exit": 0
  },
  "nb_getitem_only.py": {
   "src": "class Countdown:\n    def __getitem__(self, i):\n        print(\"  asked for item\", i)\n        if i >= 3:\n            raise IndexError\n        return 3 - i\n\nfor n in Countdown():\n    print(n)\n",
   "stdout": "  asked for item 0\n3\n  asked for item 1\n2\n  asked for item 2\n1\n  asked for item 3\n",
   "stderr": "",
   "exit": 0
  },
  "nb_iadd.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        return Money(self.cents + other.cents)\n\nwallet = Money(100)\nsame = wallet\nwallet += Money(50)\nprint(wallet.cents, same.cents)\nprint(wallet is same)\n",
   "stdout": "150 100\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "nb_notimpl_bool.py": {
   "src": "answer = NotImplemented\nprint(\"Checking...\")\nif answer:\n    print(\"looks true\")\n",
   "stdout": "Checking...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/nb_notimpl_bool.py\", line 3, in <module>\n    if answer:\n       ^^^^^^\nTypeError: NotImplemented should not be used in a boolean context\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Checking...\nlooks true\n",
    "stderr": "/home/you/python-ch20/nb_notimpl_bool.py:3: DeprecationWarning: NotImplemented should not be used in a boolean context\n  if answer:\n",
    "exit": 0
   }
  },
  "nb_on_class.py": {
   "src": "class Box:\n    pass\n\nb = Box()\nb.__len__ = lambda: 5\nprint(b.__len__())\nprint(len(b))\n",
   "stdout": "5\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/nb_on_class.py\", line 7, in <module>\n    print(len(b))\n          ~~~^^^\nTypeError: object of type 'Box' has no len()\n",
   "exit": 1
  },
  "nb_post_init.py": {
   "src": "from dataclasses import dataclass, field\n\n@dataclass\nclass Rect:\n    width: int\n    height: int\n    area: int = field(init=False)\n\n    def __post_init__(self):\n        if self.width < 0 or self.height < 0:\n            raise ValueError(\"sizes must not be negative\")\n        self.area = self.width * self.height\n\nprint(Rect(3, 4))\nprint(Rect(-1, 4))\n",
   "stdout": "Rect(width=3, height=4, area=12)\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/nb_post_init.py\", line 15, in <module>\n    print(Rect(-1, 4))\n          ~~~~^^^^^^^\n  File \"<string>\", line 5, in __init__\n  File \"/home/you/python-ch20/nb_post_init.py\", line 11, in __post_init__\n    raise ValueError(\"sizes must not be negative\")\nValueError: sizes must not be negative\n",
   "exit": 1
  },
  "nt_classic.py": {
   "src": "from collections import namedtuple\n\nColor = namedtuple(\"Color\", [\"red\", \"green\", \"blue\"])\nsky = Color(135, 206, 235)\nprint(sky)\nprint(sky.green)\nprint(max(sky))\n",
   "stdout": "Color(red=135, green=206, blue=235)\n206\n235\n",
   "stderr": "",
   "exit": 0
  },
  "nt_frozen.py": {
   "src": "from typing import NamedTuple\n\nclass Point(NamedTuple):\n    x: int\n    y: int\n\np = Point(3, 4)\nprint(p)\np.x = 10\n",
   "stdout": "Point(x=3, y=4)\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/nt_frozen.py\", line 9, in <module>\n    p.x = 10\n    ^^^\nAttributeError: can't set attribute\n",
   "exit": 1
  },
  "nt_point.py": {
   "src": "from typing import NamedTuple\n\nclass Point(NamedTuple):\n    x: int\n    y: int = 0\n\np = Point(3, 4)\nprint(p)\nprint(p.x, p[1])\nx, y = p\nprint(x + y)\nprint(p == (3, 4))\nprint(p._replace(y=9))\nprint(p._asdict())\n",
   "stdout": "Point(x=3, y=4)\n3 4\n7\nTrue\nPoint(x=3, y=9)\n{'x': 3, 'y': 4}\n",
   "stderr": "",
   "exit": 0
  },
  "one_socket.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = things\n\n    def __iter__(self):\n        return iter(self.things)\n\nbag = Bag([\"kite\", \"ball\", \"yo-yo\"])\nprint(list(bag))\nprint(sorted(bag))\nprint(max(bag))\nprint(\" + \".join(bag))\nprint(\"ball\" in bag)\nfor number, thing in enumerate(bag, start=1):\n    print(number, thing)\n",
   "stdout": "['kite', 'ball', 'yo-yo']\n['ball', 'kite', 'yo-yo']\nyo-yo\nkite + ball + yo-yo\nTrue\n1 kite\n2 ball\n3 yo-yo\n",
   "stderr": "",
   "exit": 0
  },
  "parsons_call.py": {
   "src": "class Greeter:\n    def __init__(self, greeting):\n        self.greeting = greeting\n    def __call__(self, name):\n        return f\"{self.greeting}, {name}!\"\nhi = Greeter(\"Hi\")\nprint(hi(\"Ada\"))\n",
   "stdout": "Hi, Ada!\n",
   "stderr": "",
   "exit": 0
  },
  "parsons_call_alt.py": {
   "src": "class Greeter:\n    def __call__(self, name):\n        return f\"{self.greeting}, {name}!\"\n    def __init__(self, greeting):\n        self.greeting = greeting\nhi = Greeter(\"Hi\")\nprint(hi(\"Ada\"))\n",
   "stdout": "Hi, Ada!\n",
   "stderr": "",
   "exit": 0
  },
  "pred_eq.py": {
   "src": "class Coin:\n    def __init__(self, value):\n        self.value = value\n\nclass Token:\n    def __init__(self, value):\n        self.value = value\n\n    def __eq__(self, other):\n        return self.value == other.value\n\nprint(Coin(5) == Coin(5))\nprint(Token(5) == Token(5))\nprint(Token(5) != Token(6))\n",
   "stdout": "False\nTrue\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "pred_frozen.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Ticket:\n    seat: str\n    price: int\n\nt = Ticket(\"A1\", 12)\nprint(t)\nt.price = 10\nprint(t)\n",
   "stdout": "Ticket(seat='A1', price=12)\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/pred_frozen.py\", line 10, in <module>\n    t.price = 10\n    ^^^^^^^\n  File \"<string>\", line 16, in __setattr__\ndataclasses.FrozenInstanceError: cannot assign to field 'price'\n",
   "exit": 1
  },
  "pred_hash_err.py": {
   "src": "class Token:\n    def __init__(self, value):\n        self.value = value\n\n    def __eq__(self, other):\n        return self.value == other.value\n\nprices = {}\nprices[Token(5)] = \"five\"\nprint(prices)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/pred_hash_err.py\", line 9, in <module>\n    prices[Token(5)] = \"five\"\n    ~~~~~~^^^^^^^^^^\nTypeError: cannot use 'Token' as a dict key (unhashable type: 'Token')\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/pred_hash_err.py\", line 9, in <module>\n    prices[Token(5)] = \"five\"\n    ~~~~~~^^^^^^^^^^\nTypeError: unhashable type: 'Token'\n",
    "exit": 1
   }
  },
  "pred_radd.py": {
   "src": "class Points:\n    def __init__(self, n):\n        self.n = n\n\n    def __add__(self, other):\n        print(\"add\")\n        return Points(self.n + other)\n\n    def __radd__(self, other):\n        print(\"radd\")\n        return Points(self.n + other)\n\np = 1 + Points(2) + 3\nprint(p.n)\n",
   "stdout": "radd\nadd\n6\n",
   "stderr": "",
   "exit": 0
  },
  "pred_sockets.py": {
   "src": "class Shelf:\n    def __init__(self, books):\n        self.books = books\n\n    def __len__(self):\n        return len(self.books)\n\n    def __getitem__(self, i):\n        return self.books[i].upper()\n\nshelf = Shelf([\"dune\", \"emma\", \"ivanhoe\"])\nprint(len(shelf))\nprint(shelf[0])\nprint(shelf[-1])\n",
   "stdout": "3\nDUNE\nIVANHOE\n",
   "stderr": "",
   "exit": 0
  },
  "record_types.py": {
   "src": "from dataclasses import dataclass\nfrom typing import NamedTuple\n\nas_dict = {\"name\": \"Ada\", \"score\": 95}\nas_tuple = (\"Ada\", 95)\n\nclass AsNamedTuple(NamedTuple):\n    name: str\n    score: int\n\n@dataclass\nclass AsDataclass:\n    name: str\n    score: int\n\nprint(as_dict[\"score\"])\nprint(as_tuple[1])\nprint(AsNamedTuple(\"Ada\", 95).score)\nprint(AsDataclass(\"Ada\", 95).score)\nprint(AsNamedTuple(\"Ada\", 95))\nprint(AsDataclass(\"Ada\", 95))\n",
   "stdout": "95\n95\n95\n95\nAsNamedTuple(name='Ada', score=95)\nAsDataclass(name='Ada', score=95)\n",
   "stderr": "",
   "exit": 0
  },
  "repr_conv.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __repr__(self):\n        return f\"Money({self.cents!r})\"\n\n    def __str__(self):\n        return f\"${self.cents / 100:.2f}\"\n\nlunch = Money(450)\nprint(lunch)\nprint(repr(lunch))\nprint([lunch, Money(5)])\nprint(f\"{lunch} is {lunch!r}\")\ncopy = eval(repr(lunch))\nprint(copy.cents)\n",
   "stdout": "$4.50\nMoney(450)\n[Money(450), Money(5)]\n$4.50 is Money(450)\n450\n",
   "stderr": "",
   "exit": 0
  },
  "road_fail.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        print(\"  Money.__add__ was asked\")\n        if isinstance(other, (int, Money)):\n            extra = other if isinstance(other, int) else other.cents\n            return Money(self.cents + extra)\n        return NotImplemented\n\n    def __radd__(self, other):\n        print(\"  Money.__radd__ was asked\")\n        return self + other\n\ntotal = Money(300) + \"50\"\nprint(total.cents)\n",
   "stdout": "  Money.__add__ was asked\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/road_fail.py\", line 16, in <module>\n    total = Money(300) + \"50\"\n            ~~~~~~~~~~~^~~~~~\nTypeError: unsupported operand type(s) for +: 'Money' and 'str'\n",
   "exit": 1
  },
  "road_left.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        print(\"  Money.__add__ was asked\")\n        if isinstance(other, (int, Money)):\n            extra = other if isinstance(other, int) else other.cents\n            return Money(self.cents + extra)\n        return NotImplemented\n\n    def __radd__(self, other):\n        print(\"  Money.__radd__ was asked\")\n        return self + other\n\ntotal = Money(300) + Money(50)\nprint(total.cents)\n",
   "stdout": "  Money.__add__ was asked\n350\n",
   "stderr": "",
   "exit": 0
  },
  "road_right.py": {
   "src": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n\n    def __add__(self, other):\n        print(\"  Money.__add__ was asked\")\n        if isinstance(other, (int, Money)):\n            extra = other if isinstance(other, int) else other.cents\n            return Money(self.cents + extra)\n        return NotImplemented\n\n    def __radd__(self, other):\n        print(\"  Money.__radd__ was asked\")\n        return self + other\n\ntotal = 50 + Money(300)\nprint(total.cents)\n",
   "stdout": "  Money.__radd__ was asked\n  Money.__add__ was asked\n350\n",
   "stderr": "",
   "exit": 0
  },
  "sort_no_lt.py": {
   "src": "class Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\nhand = [Card(9, \"clubs\"), Card(2, \"spades\")]\nprint(\"Sorting...\")\nhand.sort()\n",
   "stdout": "Sorting...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch20/sort_no_lt.py\", line 8, in <module>\n    hand.sort()\n    ~~~~~~~~~^^\nTypeError: '<' not supported between instances of 'Card' and 'Card'\n",
   "exit": 1
  },
  "sum_type.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Circle:\n    radius: float\n\n@dataclass(frozen=True)\nclass Square:\n    side: float\n\ndef area(shape):\n    if isinstance(shape, Circle):\n        return round(3.14159 * shape.radius ** 2, 2)\n    if isinstance(shape, Square):\n        return shape.side ** 2\n    raise TypeError(f\"not a shape: {shape!r}\")\n\nfor shape in [Circle(1.0), Square(3.0)]:\n    print(shape, area(shape))\n",
   "stdout": "Circle(radius=1.0) 3.14\nSquare(side=3.0) 9.0\n",
   "stderr": "",
   "exit": 0
  },
  "total_order.py": {
   "src": "from functools import total_ordering\n\n@total_ordering\nclass Card:\n    def __init__(self, rank, suit):\n        self.rank = rank\n        self.suit = suit\n\n    def __eq__(self, other):\n        return self.rank == other.rank\n\n    def __lt__(self, other):\n        return self.rank < other.rank\n\ntwo, nine = Card(2, \"spades\"), Card(9, \"clubs\")\nprint(two < nine)\nprint(two <= nine)\nprint(two >= nine)\nprint(nine > two)\n",
   "stdout": "True\nTrue\nFalse\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "with_dataclass.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int = 0\n\np = Point(3, 4)\nprint(p)\nprint(p == Point(3, 4))\nprint(Point(5))\n",
   "stdout": "Point(x=3, y=4)\nTrue\nPoint(x=5, y=0)\n",
   "stderr": "",
   "exit": 0
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
