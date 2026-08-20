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
  "workdir": "/home/you/python-ch21",
  "versionDifferences": [
   "forward_ref.py",
   "nb_annotationlib.py",
   "plus.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): forward_ref.py, nb_annotationlib.py, plus.py."
 },
 "programs": {
  "annotations_peek.py": {
   "src": "def total(price: float, count: int) -> float:\n    return price * count\n\nprint(total.__annotations__)\nprint(total(\"ha\", 2))\n",
   "stdout": "{'price': <class 'float'>, 'count': <class 'int'>, 'return': <class 'float'>}\nhaha\n",
   "stderr": "",
   "exit": 0
  },
  "any_hatch.py": {
   "src": "from typing import Any\n\ndef shout(x: Any) -> str:\n    return x.upper() + \"!\"\n\nprint(shout(\"hi\"))\nprint(shout(5))\n",
   "stdout": "HI!\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/any_hatch.py\", line 7, in <module>\n    print(shout(5))\n          ~~~~~^^^\n  File \"/home/you/python-ch21/any_hatch.py\", line 4, in shout\n    return x.upper() + \"!\"\n           ^^^^^^^\nAttributeError: 'int' object has no attribute 'upper'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "mypy any_hatch.py",
     "out": "Success: no issues found in 1 source file\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "python3 any_hatch.py",
     "out": "HI!\n",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/any_hatch.py\", line 7, in <module>\n    print(shout(5))\n          ~~~~~^^^\n  File \"/home/you/python-ch21/any_hatch.py\", line 4, in shout\n    return x.upper() + \"!\"\n           ^^^^^^^\nAttributeError: 'int' object has no attribute 'upper'\n",
     "exit": 1,
     "dir": "~/python-ch21"
    }
   ]
  },
  "bind.py": {
   "src": "parcel = [\"go\", \"north\"]\nmatch parcel:\n    case [\"look\"]:\n        print(\"looking around\")\n    case [verb, place]:\n        print(verb, \"to\", place)\nprint(\"after match:\", verb, place)\n",
   "stdout": "go to north\nafter match: go north\n",
   "stderr": "",
   "exit": 0
  },
  "boss_error.py": {
   "src": "def where_to(words: list[str]) -> str:\n    match words:\n        case [\"go\", place]:\n            print(\"going\")\n        case [\"stay\"]:\n            print(\"staying\")\n    return place\n\nprint(where_to([\"go\", \"home\"]))\nprint(where_to([\"stay\"]))\n",
   "stdout": "going\nhome\nstaying\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/boss_error.py\", line 10, in <module>\n    print(where_to([\"stay\"]))\n          ~~~~~~~~^^^^^^^^^^\n  File \"/home/you/python-ch21/boss_error.py\", line 7, in where_to\n    return place\n           ^^^^^\nUnboundLocalError: cannot access local variable 'place' where it is not associated with a value\n",
   "exit": 1
  },
  "boss_fill.py": {
   "src": "from typing import TypedDict\n\nclass Job(TypedDict):\n    kind: str\n    pages: int\n\ndef cost(job: Job) -> int:\n    match job:\n        case {\"kind\": \"color\", \"pages\": n}:\n            return 3 * n\n        case {\"kind\": \"mono\" | \"draft\", \"pages\": n}:\n            return n\n        case _:\n            return 0\n\nprint(cost({\"kind\": \"color\", \"pages\": 4}), cost({\"kind\": \"draft\", \"pages\": 9}))\n",
   "stdout": "12 9\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "def greet(cmd: list[str]) -> str:\n    match cmd:\n        case [\"hi\"]:\n            return \"Hello!\"\n        case [\"hi\", *names]:\n            return \"Hello, \" + \" and \".join(names) + \"!\"\n        case _:\n            return \"...\"\nprint(greet([\"hi\"]), greet([\"hi\", \"Ada\", \"Bo\"]))\n",
   "stdout": "Hello! Hello, Ada and Bo!\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Order:\n    item: str\n    qty: int\n\ndef check(o: Order | dict) -> str:\n    match o:\n        case Order(item, qty) if qty > 9:\n            return f\"bulk {item}\"\n        case Order(item=item, qty=1):\n            return f\"single {item}\"\n        case Order(item=item):\n            return f\"few {item}\"\n        case {\"item\": item, **rest}:\n            return f\"dict {item} {len(rest)}\"\n        case _:\n            return \"?\"\n\nprint(check(Order(\"tape\", 1)))\nprint(check(Order(\"box\", 12)))\nprint(check(Order(\"pen\", 3)))\nprint(check({\"item\": \"glue\", \"qty\": 2, \"rush\": True}))\n",
   "stdout": "single tape\nbulk box\nfew pen\ndict glue 2\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\ndef where(p: Point) -> str:\n    match p:\n        case Point():\n            return \"somewhere\"\n        case Point(x=0, y=0):\n            return \"origin\"\n        case Point(x=0):\n            return \"on the y axis\"\n\nprint(where(Point(0, 0)), where(Point(0, 4)), where(Point(5, 5)))\n",
   "stdout": "somewhere somewhere somewhere\n",
   "stderr": "",
   "exit": 0
  },
  "boss_trace.py": {
   "src": "parcels: list[tuple[str, int]] = [(\"book\", 2), (\"piano\", 300), (\"card\", 0), (\"lamp\", 9)]\ntotal = 0\nfor name, kg in parcels:\n    match kg:\n        case 0:\n            fee = 1\n        case n if n > 100:\n            fee = 50\n        case n:\n            fee = 2 * n\n    total += fee\n    print(name, kg, fee, total)\n",
   "stdout": "book 2 4 4\npiano 300 50 54\ncard 0 1 55\nlamp 9 18 73\n",
   "stderr": "",
   "exit": 0
  },
  "callable_hint.py": {
   "src": "from collections.abc import Callable\n\ndef apply_twice(f: Callable[[int], int], x: int) -> int:\n    return f(f(x))\n\nprint(apply_twice(lambda n: n + 3, 10))\nprint(apply_twice(lambda n: n * n, 3))\n",
   "stdout": "16\n81\n",
   "stderr": "",
   "exit": 0
  },
  "chutes.py": {
   "src": "def chute(size: str) -> str:\n    match size:\n        case \"S\":\n            return \"small chute\"\n        case \"M\":\n            return \"medium chute\"\n        case \"L\" | \"XL\":\n            return \"big chute\"\n        case _:\n            return \"returns desk\"\n\nfor size in [\"M\", \"XL\", \"S\", \"Q\"]:\n    print(size, \"->\", chute(size))\n",
   "stdout": "M -> medium chute\nXL -> big chute\nS -> small chute\nQ -> returns desk\n",
   "stderr": "",
   "exit": 0
  },
  "chutes_if.py": {
   "src": "def chute(size: str) -> str:\n    if size == \"S\":\n        return \"small chute\"\n    elif size == \"M\":\n        return \"medium chute\"\n    elif size == \"L\" or size == \"XL\":\n        return \"big chute\"\n    else:\n        return \"returns desk\"\n\nfor size in [\"M\", \"XL\", \"S\", \"Q\"]:\n    print(size, \"->\", chute(size))\n",
   "stdout": "M -> medium chute\nXL -> big chute\nS -> small chute\nQ -> returns desk\n",
   "stderr": "",
   "exit": 0
  },
  "classes.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\ndef where(p: object) -> str:\n    match p:\n        case Point(x=0, y=0):\n            return \"the origin\"\n        case Point(x=0, y=y):\n            return f\"on the y axis at {y}\"\n        case Point(x, 0):\n            return f\"on the x axis at {x}\"\n        case Point(x, y) if x == y:\n            return f\"on the diagonal at {x}\"\n        case Point():\n            return \"somewhere else\"\n        case _:\n            return \"not a point\"\n\nfor p in [Point(0, 0), Point(0, 5), Point(3, 0), Point(2, 2), Point(1, 7), (1, 7)]:\n    print(p, \"->\", where(p))\n",
   "stdout": "Point(x=0, y=0) -> the origin\nPoint(x=0, y=5) -> on the y axis at 5\nPoint(x=3, y=0) -> on the x axis at 3\nPoint(x=2, y=2) -> on the diagonal at 2\nPoint(x=1, y=7) -> somewhere else\n(1, 7) -> not a point\n",
   "stderr": "",
   "exit": 0
  },
  "commands.py": {
   "src": "def handle(text: str) -> str:\n    match text.split():\n        case [\"look\"]:\n            return \"You see a parcel.\"\n        case [\"go\", direction]:\n            return f\"You walk {direction}.\"\n        case [\"drop\", *things]:\n            return f\"You drop {len(things)}: {things}\"\n        case _:\n            return \"Pardon?\"\n\nfor text in [\"look\", \"go north\", \"drop key coin\", \"go\", \"dance now\"]:\n    print(f\"{text:14} {handle(text)}\")\n",
   "stdout": "look           You see a parcel.\ngo north       You walk north.\ndrop key coin  You drop 2: ['key', 'coin']\ngo             Pardon?\ndance now      Pardon?\n",
   "stderr": "",
   "exit": 0
  },
  "crates.py": {
   "src": "scores: list[int] = [7, 9, 4]\nages: dict[str, int] = {\"Pip\": 3, \"Ada\": 36}\npoint: tuple[int, int] = (2, 5)\ntags: set[str] = {\"new\"}\n\ndef best(nums: list[int]) -> int:\n    return max(nums)\n\nprint(best(scores), ages[\"Ada\"], point[0], len(tags))\n",
   "stdout": "9 36 2 1\n",
   "stderr": "",
   "exit": 0
  },
  "dotted.py": {
   "src": "from enum import Enum\n\nclass Color(Enum):\n    RED = \"red\"\n    GREEN = \"green\"\n\ncolor = Color.GREEN\nmatch color:\n    case Color.RED:\n        print(\"Stop!\")\n    case _:\n        print(\"Go!\")\nprint(\"Color.RED is still\", Color.RED)\n",
   "stdout": "Go!\nColor.RED is still Color.RED\n",
   "stderr": "",
   "exit": 0
  },
  "double.py": {
   "src": "def double(n: int) -> int:\n    return n * 2\n\nprint(double(4))\nprint(double(\"ha\"))\n",
   "stdout": "double.py:5: error: Argument 1 to \"double\" has incompatible type \"str\"; expected \"int\"  [arg-type]\nFound 1 error in 1 file (checked 1 source file)\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 double.py",
     "out": "8\nhaha\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "mypy double.py",
     "out": "double.py:5: error: Argument 1 to \"double\" has incompatible type \"str\"; expected \"int\"  [arg-type]\nFound 1 error in 1 file (checked 1 source file)\n",
     "err": "",
     "exit": 1,
     "dir": "~/python-ch21"
    }
   ]
  },
  "double_feed.py": {
   "src": "def double(n: int) -> int:\n    return n * 2\n\nprint(double(21))\nprint(double(2.5))\nprint(double(\"ha\"))\nprint(double([0]))\n",
   "stdout": "42\n5.0\nhaha\n[0, 0]\n",
   "stderr": "",
   "exit": 0
  },
  "double_none.py": {
   "src": "def double(n: int) -> int:\n    return n * 2\n\nprint(double(None))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/double_none.py\", line 4, in <module>\n    print(double(None))\n          ~~~~~~^^^^^^\n  File \"/home/you/python-ch21/double_none.py\", line 2, in double\n    return n * 2\n           ~~^~~\nTypeError: unsupported operand type(s) for *: 'NoneType' and 'int'\n",
   "exit": 1
  },
  "ex_add.py": {
   "src": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))\nprint(add(\"ab\", \"cd\"))\nprint(add(1.5, 2))\n",
   "stdout": "5\nabcd\n3.5\n",
   "stderr": "",
   "exit": 0
  },
  "ex_bool_int.py": {
   "src": "def kind(v: object) -> str:\n    match v:\n        case int():\n            return \"number\"\n        case bool():\n            return \"lamp\"\n        case _:\n            return \"other\"\n\nprint(kind(7), kind(True), kind(\"7\"))\n",
   "stdout": "number number other\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_callable.py": {
   "src": "from collections.abc import Callable\n\ndef shout(word: str) -> str:\n    return word.upper()\n\ndef for_each(f: Callable[[str], str], words: list[str]) -> list[str]:\n    return [f(w) for w in words]\n\nprint(for_each(shout, [\"hi\", \"pip\"]))\n",
   "stdout": "['HI', 'PIP']\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_guard.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Box:\n    w: int\n    h: int\n\ndef shape(b: Box) -> str:\n    match b:\n        case Box(w, h) if w == h:\n            return f\"square {w}x{h}\"\n        case Box(w, h):\n            return f\"rectangle {w}x{h}\"\n\nprint(shape(Box(3, 3)))\nprint(shape(Box(2, 5)))\n",
   "stdout": "square 3x3\nrectangle 2x5\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_hints.py": {
   "src": "def initials(first: str, last: str) -> str:\n    return first[0] + last[0]\n\ndef area(width: int, height: int) -> int:\n    return width * height\n\nprint(initials(\"Ada\", \"Lovelace\"))\nprint(area(3, 4))\n",
   "stdout": "AL\n12\n",
   "stderr": "",
   "exit": 0
  },
  "ex_fill_or.py": {
   "src": "def reply(answer: str) -> str:\n    match answer:\n        case \"y\" | \"yes\":\n            return \"Great!\"\n        case \"n\" | \"no\":\n            return \"Maybe later.\"\n        case _:\n            return \"Please answer yes or no.\"\n\nfor a in [\"yes\", \"n\", \"perhaps\"]:\n    print(reply(a))\n",
   "stdout": "Great!\nMaybe later.\nPlease answer yes or no.\n",
   "stderr": "",
   "exit": 0
  },
  "ex_mapping.py": {
   "src": "def route(parcel: dict) -> str:\n    match parcel:\n        case {\"to\": \"Mars\"}:\n            return \"rocket\"\n        case {\"to\": city, \"fragile\": True}:\n            return f\"van to {city}, gently\"\n        case {\"to\": city}:\n            return f\"van to {city}\"\n        case _:\n            return \"no address\"\n\nprint(route({\"to\": \"Oslo\", \"kg\": 2}))\nprint(route({\"to\": \"Rome\", \"fragile\": True}))\nprint(route({\"to\": \"Mars\", \"fragile\": True}))\nprint(route({\"from\": \"Pip\"}))\n",
   "stdout": "van to Oslo\nvan to Rome, gently\nrocket\nno address\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_class.py": {
   "src": "from dataclasses import dataclass\n@dataclass\nclass Parcel:\n    kg: int\ndef price(p: Parcel) -> int:\n    match p:\n        case Parcel(kg=0):\n            return 0\n        case Parcel(kg=kg):\n            return 5 + kg\nprint(price(Parcel(0)), price(Parcel(3)))\n",
   "stdout": "0 8\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_proto.py": {
   "src": "from typing import Protocol\nclass Glows(Protocol):\n    def glow(self) -> str: ...\nclass Lamp:\n    def glow(self) -> str:\n        return \"bright\"\ndef show(thing: Glows) -> None:\n    print(\"It glows\", thing.glow())\nshow(Lamp())\n",
   "stdout": "It glows bright\n",
   "stderr": "",
   "exit": 0
  },
  "ex_runtime_check.py": {
   "src": "def ship(weight: float) -> str:\n    if weight <= 0:\n        raise ValueError(\"weight must be positive\")\n    return f\"shipping {weight} kg\"\n\nprint(ship(2))\nprint(ship(\"3\"))\n",
   "stdout": "shipping 2 kg\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/ex_runtime_check.py\", line 7, in <module>\n    print(ship(\"3\"))\n          ~~~~^^^^^\n  File \"/home/you/python-ch21/ex_runtime_check.py\", line 2, in ship\n    if weight <= 0:\n       ^^^^^^^^^^^\nTypeError: '<=' not supported between instances of 'str' and 'int'\n",
   "exit": 1
  },
  "ex_spot_return.py": {
   "src": "def count_words(text: str) -> int:\n    words = text.split()\n    return words\n\nn = count_words(\"pip is here\")\nprint(\"words:\", n + 1)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/ex_spot_return.py\", line 6, in <module>\n    print(\"words:\", n + 1)\n                    ~~^~~\nTypeError: can only concatenate list (not \"int\") to list\n",
   "exit": 1
  },
  "ex_spot_shadow.py": {
   "src": "STOP = \"stop\"\n\ndef react(word: str) -> str:\n    match word:\n        case STOP:\n            return \"halting\"\n\nfor w in [\"go\", \"stop\", \"wait\"]:\n    print(w, react(w))\n",
   "stdout": "go halting\nstop halting\nwait halting\n",
   "stderr": "",
   "exit": 0
  },
  "ex_trace_cmd.py": {
   "src": "for text in [\"go east\", \"drop pen\", \"go\", \"look up\"]:\n    match text.split():\n        case [\"go\", where]:\n            result = \"walk\"\n        case [\"drop\", item]:\n            result = \"drop\"\n        case [word]:\n            result = \"one\"\n        case _:\n            result = \"huh\"\n    print(text.replace(\" \", \"_\"), len(text.split()), result)\n",
   "stdout": "go_east 2 walk\ndrop_pen 2 drop\ngo 1 one\nlook_up 2 huh\n",
   "stderr": "",
   "exit": 0
  },
  "ex_trace_maybe.py": {
   "src": "stock: dict[str, int] = {\"tape\": 4, \"box\": 0}\n\ndef count(item: str) -> int | None:\n    return stock.get(item)\n\nfor item in [\"tape\", \"glue\", \"box\"]:\n    n = count(item)\n    if n is None:\n        note = \"unknown\"\n    elif n == 0:\n        note = \"empty\"\n    else:\n        note = \"ok\"\n    print(item, n, note)\n",
   "stdout": "tape 4 ok\nglue None unknown\nbox 0 empty\n",
   "stderr": "",
   "exit": 0
  },
  "ex_unreachable.py": {
   "src": "def size(n: int) -> str:\n    match n:\n        case 0:\n            return \"empty\"\n        case count:\n            return f\"{count} items\"\n        case 1:\n            return \"one item\"\n\nprint(size(1))\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch21/ex_unreachable.py\", line 5\n    case count:\n         ^^^^^\nSyntaxError: name capture 'count' makes remaining patterns unreachable\n",
   "exit": 1
  },
  "ex_which_case.py": {
   "src": "def label(code: str) -> str:\n    match code:\n        case \"A\" | \"B\":\n            return \"first class\"\n        case \"C\":\n            return \"second class\"\n        case _:\n            return \"unknown\"\n\nprint(label(\"B\"))\nprint(label(\"c\"))\nprint(label(\"C\"))\n",
   "stdout": "first class\nunknown\nsecond class\n",
   "stderr": "",
   "exit": 0
  },
  "forward_quoted.py": {
   "src": "class Node:\n    def __init__(self, value: int, next: \"Node | None\" = None):\n        self.value = value\n        self.next = next\n\nchain = Node(1, Node(2))\nprint(chain.value, chain.next.value)\n",
   "stdout": "1 2\n",
   "stderr": "",
   "exit": 0
  },
  "forward_ref.py": {
   "src": "class Node:\n    def __init__(self, value: int, next: Node | None = None):\n        self.value = value\n        self.next = next\n\nchain = Node(1, Node(2))\nprint(chain.value, chain.next.value)\n",
   "stdout": "1 2\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/forward_ref.py\", line 1, in <module>\n    class Node:\n    ...<2 lines>...\n            self.next = next\n  File \"/home/you/python-ch21/forward_ref.py\", line 2, in Node\n    def __init__(self, value: int, next: Node | None = None):\n                                         ^^^^\nNameError: name 'Node' is not defined. Did you mean: 'None'?\n",
    "exit": 1
   }
  },
  "generic_first.py": {
   "src": "def first[T](items: list[T]) -> T:\n    return items[0]\n\nprint(first([3, 1, 2]) + 1)\nprint(first([\"pip\", \"ada\"]).upper())\n",
   "stdout": "4\nPIP\n",
   "stderr": "",
   "exit": 0
  },
  "generic_reveal.py": {
   "src": "def first[T](items: list[T]) -> T:\n    return items[0]\n\nreveal_type(first([3, 1, 2]))\nreveal_type(first([\"pip\", \"ada\"]))\n",
   "stdout": "generic_reveal.py:4: note: Revealed type is \"int\"\ngeneric_reveal.py:5: note: Revealed type is \"str\"\nSuccess: no issues found in 1 source file\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "mypy generic_reveal.py",
     "out": "generic_reveal.py:4: note: Revealed type is \"int\"\ngeneric_reveal.py:5: note: Revealed type is \"str\"\nSuccess: no issues found in 1 source file\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "labels.py": {
   "src": "price: float = 2.5\ncount: int = 3\nname: str = \"Pip\"\n\ndef total(price: float, count: int) -> float:\n    return price * count\n\nprint(name, \"pays\", total(price, count))\n",
   "stdout": "Pip pays 7.5\n",
   "stderr": "",
   "exit": 0
  },
  "lights.py": {
   "src": "from enum import Enum\n\nclass Light(Enum):\n    RED = \"red\"\n    AMBER = \"amber\"\n    GREEN = \"green\"\n\ndef action(light: Light) -> str:\n    match light:\n        case Light.RED:\n            return \"stop\"\n        case Light.AMBER:\n            return \"get ready\"\n        case Light.GREEN:\n            return \"go\"\n\nfor light in Light:\n    print(light.name, \"->\", action(light))\n",
   "stdout": "RED -> stop\nAMBER -> get ready\nGREEN -> go\n",
   "stderr": "",
   "exit": 0
  },
  "map_drop.py": {
   "src": "def handle(text: str) -> str:\n    match text.split():\n        case [\"look\"]:\n            return \"You see a parcel.\"\n        case [\"go\", direction]:\n            return f\"You walk {direction}.\"\n        case [\"drop\", *things]:\n            return f\"You drop {len(things)}: {things}\"\n        case _:\n            return \"Pardon?\"\n\nprint(handle(\"drop key coin\"))\n",
   "stdout": "You drop 2: ['key', 'coin']\n",
   "stderr": "",
   "exit": 0
  },
  "map_go.py": {
   "src": "def handle(text: str) -> str:\n    match text.split():\n        case [\"look\"]:\n            return \"You see a parcel.\"\n        case [\"go\", direction]:\n            return f\"You walk {direction}.\"\n        case [\"drop\", *things]:\n            return f\"You drop {len(things)}: {things}\"\n        case _:\n            return \"Pardon?\"\n\nprint(handle(\"go north\"))\n",
   "stdout": "You walk north.\n",
   "stderr": "",
   "exit": 0
  },
  "map_look.py": {
   "src": "def handle(text: str) -> str:\n    match text.split():\n        case [\"look\"]:\n            return \"You see a parcel.\"\n        case [\"go\", direction]:\n            return f\"You walk {direction}.\"\n        case [\"drop\", *things]:\n            return f\"You drop {len(things)}: {things}\"\n        case _:\n            return \"Pardon?\"\n\nprint(handle(\"look\"))\n",
   "stdout": "You see a parcel.\n",
   "stderr": "",
   "exit": 0
  },
  "map_other.py": {
   "src": "def handle(text: str) -> str:\n    match text.split():\n        case [\"look\"]:\n            return \"You see a parcel.\"\n        case [\"go\", direction]:\n            return f\"You walk {direction}.\"\n        case [\"drop\", *things]:\n            return f\"You drop {len(things)}: {things}\"\n        case _:\n            return \"Pardon?\"\n\nprint(handle(\"go\"))\n",
   "stdout": "Pardon?\n",
   "stderr": "",
   "exit": 0
  },
  "mapping.py": {
   "src": "def handle(event: dict) -> str:\n    match event:\n        case {\"type\": \"move\", \"to\": [x, y]} if x > 0:\n            return f\"move east to ({x}, {y})\"\n        case {\"type\": \"move\", \"to\": [x, y]}:\n            return f\"move west to ({x}, {y})\"\n        case {\"type\": \"say\", \"text\": text}:\n            return f\"say {text!r}\"\n        case {\"type\": kind}:\n            return f\"unknown event {kind!r}\"\n        case _:\n            return \"not an event\"\n\nevents = [\n    {\"type\": \"move\", \"to\": [3, 4]},\n    {\"type\": \"move\", \"to\": [-2, 0]},\n    {\"type\": \"say\", \"text\": \"hi\", \"loud\": True},\n    {\"type\": \"jump\"},\n    {\"kind\": \"move\"},\n]\nfor e in events:\n    print(handle(e))\n",
   "stdout": "move east to (3, 4)\nmove west to (-2, 0)\nsay 'hi'\nunknown event 'jump'\nnot an event\n",
   "stderr": "",
   "exit": 0
  },
  "maybe.py": {
   "src": "ages = {\"Pip\": 3, \"Ada\": 36}\n\ndef find_age(name: str) -> int | None:\n    return ages.get(name)\n\nage = find_age(\"Zed\")\nprint(age + 1)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/maybe.py\", line 7, in <module>\n    print(age + 1)\n          ~~~~^~~\nTypeError: unsupported operand type(s) for +: 'NoneType' and 'int'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "mypy maybe.py",
     "out": "maybe.py:7: error: Unsupported operand types for + (\"None\" and \"int\")  [operator]\nmaybe.py:7: note: Left operand is of type \"int | None\"\nFound 1 error in 1 file (checked 1 source file)\n",
     "err": "",
     "exit": 1,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "python3 maybe.py",
     "out": "",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/maybe.py\", line 7, in <module>\n    print(age + 1)\n          ~~~~^~~\nTypeError: unsupported operand type(s) for +: 'NoneType' and 'int'\n",
     "exit": 1,
     "dir": "~/python-ch21"
    }
   ]
  },
  "maybe_fixed.py": {
   "src": "ages = {\"Pip\": 3, \"Ada\": 36}\n\ndef find_age(name: str) -> int | None:\n    return ages.get(name)\n\nfor who in [\"Ada\", \"Zed\"]:\n    age = find_age(who)\n    if age is None:\n        print(who, \"is not on the list\")\n    else:\n        print(who, \"next year:\", age + 1)\n",
   "stdout": "Ada next year: 37\nZed is not on the list\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "mypy maybe_fixed.py",
     "out": "Success: no issues found in 1 source file\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "python3 maybe_fixed.py",
     "out": "Ada next year: 37\nZed is not on the list\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch21"
    }
   ]
  },
  "nb_annotationlib.py": {
   "src": "from annotationlib import Format, get_annotations\n\ndef ship(box: Parcel, kg: float) -> str:\n    return \"shipped\"\n\nprint(\"ship() was defined without any error\")\nprint(get_annotations(ship, format=Format.STRING))\nprint(get_annotations(ship))\n",
   "stdout": "ship() was defined without any error\n{'box': 'Parcel', 'kg': 'float', 'return': 'str'}\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/nb_annotationlib.py\", line 8, in <module>\n    print(get_annotations(ship))\n          ~~~~~~~~~~~~~~~^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/annotationlib.py\", line 1002, in get_annotations\n    ann = _get_dunder_annotations(obj)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/annotationlib.py\", line 1203, in _get_dunder_annotations\n    ann = getattr(obj, \"__annotations__\", None)\n  File \"/home/you/python-ch21/nb_annotationlib.py\", line 3, in __annotate__\n    def ship(box: Parcel, kg: float) -> str:\n                  ^^^^^^\nNameError: name 'Parcel' is not defined\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/nb_annotationlib.py\", line 1, in <module>\n    from annotationlib import Format, get_annotations\nModuleNotFoundError: No module named 'annotationlib'\n",
    "exit": 1
   }
  },
  "nb_future.py": {
   "src": "from __future__ import annotations\n\nclass Node:\n    def __init__(self, value: int, next: Node | None = None):\n        self.value = value\n        self.next = next\n\nprint(Node(1, Node(2)).next.value)\nprint(Node.__init__.__annotations__)\n",
   "stdout": "2\n{'value': 'int', 'next': 'Node | None'}\n",
   "stderr": "",
   "exit": 0
  },
  "nb_match_args.py": {
   "src": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nclass Plain:\n    def __init__(self, x: int):\n        self.x = x\n\nprint(Point.__match_args__)\nmatch Plain(5):\n    case Plain(x=5):\n        print(\"keyword pattern: fine\")\nmatch Plain(5):\n    case Plain(5):\n        print(\"never printed\")\n",
   "stdout": "('x', 'y')\nkeyword pattern: fine\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/nb_match_args.py\", line 17, in <module>\n    case Plain(5):\n         ~~~~~^^^\nTypeError: Plain() accepts 0 positional sub-patterns (1 given)\n",
   "exit": 1
  },
  "nb_pyright.py": {
   "src": "def double(n: int) -> int:\n    return n * 2\n\nprint(double(\"ha\"))\n",
   "stdout": "/home/you/python-ch21/nb_pyright.py\n  /home/you/python-ch21/nb_pyright.py:4:14 - error: Argument of type \"Literal['ha']\" cannot be assigned to parameter \"n\" of type \"int\" in function \"double\"\n    \"Literal['ha']\" is not assignable to \"int\" (reportArgumentType)\n1 error, 0 warnings, 0 informations\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "pyright nb_pyright.py",
     "out": "/home/you/python-ch21/nb_pyright.py\n  /home/you/python-ch21/nb_pyright.py:4:14 - error: Argument of type \"Literal['ha']\" cannot be assigned to parameter \"n\" of type \"int\" in function \"double\"\n    \"Literal['ha']\" is not assignable to \"int\" (reportArgumentType)\n1 error, 0 warnings, 0 informations\n",
     "err": "",
     "exit": 1
    }
   ]
  },
  "nb_str_seq.py": {
   "src": "for subject in [\"go\", [\"g\", \"o\"], (\"g\", \"o\")]:\n    match subject:\n        case [first, second]:\n            print(repr(subject), \"is a sequence of two:\", first, second)\n        case _:\n            print(repr(subject), \"did not match\")\n",
   "stdout": "'go' did not match\n['g', 'o'] is a sequence of two: g o\n('g', 'o') is a sequence of two: g o\n",
   "stderr": "",
   "exit": 0
  },
  "nb_typevar.py": {
   "src": "from typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:   # the pre-3.12 spelling of def first[T]\n    return items[0]\n\nprint(first([3, 1, 2]), first([\"pip\", \"ada\"]))\n",
   "stdout": "3 pip\n",
   "stderr": "",
   "exit": 0
  },
  "old_spelling.py": {
   "src": "from typing import Optional, Union\n\ndef find(name: str) -> Optional[int]:     # the same as int | None\n    return None\n\ndef show(x: Union[int, str]) -> str:      # the same as int | str\n    return f\"<{x}>\"\n\nprint(find(\"Zed\"), show(5), show(\"hi\"))\n",
   "stdout": "None <5> <hi>\n",
   "stderr": "",
   "exit": 0
  },
  "plus.py": {
   "src": "def describe(n: int) -> str:\n    match n:\n        case -1:\n            return \"one below zero\"\n        case 0:\n            return \"zero\"\n        case +1:\n            return \"one above zero\"\n        case _:\n            return \"far away\"\n\nfor n in [-1, 0, 1, 7]:\n    print(n, describe(n))\n",
   "stdout": "-1 one below zero\n0 zero\n1 one above zero\n7 far away\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "  File \"/home/you/python-ch21/plus.py\", line 7\n    case +1:\n         ^\nSyntaxError: invalid syntax\n",
    "exit": 1
   }
  },
  "protocol.py": {
   "src": "from typing import Protocol\n\nclass Singer(Protocol):\n    def speak(self) -> str: ...\n\nclass Dog:\n    def speak(self) -> str:\n        return \"Woof!\"\n\nclass Rock:\n    pass\n\ndef chorus(singers: list[Singer]) -> None:\n    for s in singers:\n        print(s.speak())\n\nchorus([Dog(), Rock(), Dog()])\n",
   "stdout": "Woof!\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/protocol.py\", line 17, in <module>\n    chorus([Dog(), Rock(), Dog()])\n    ~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/home/you/python-ch21/protocol.py\", line 15, in chorus\n    print(s.speak())\n          ^^^^^^^\nAttributeError: 'Rock' object has no attribute 'speak'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "mypy protocol.py",
     "out": "protocol.py:17: error: List item 1 has incompatible type \"Rock\"; expected \"Singer\"  [list-item]\nFound 1 error in 1 file (checked 1 source file)\n",
     "err": "",
     "exit": 1,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "python3 protocol.py",
     "out": "Woof!\n",
     "err": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/protocol.py\", line 17, in <module>\n    chorus([Dog(), Rock(), Dog()])\n    ~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/home/you/python-ch21/protocol.py\", line 15, in chorus\n    print(s.speak())\n          ^^^^^^^\nAttributeError: 'Rock' object has no attribute 'speak'\n",
     "exit": 1,
     "dir": "~/python-ch21"
    }
   ]
  },
  "runtime_check.py": {
   "src": "def set_age(age: int) -> None:\n    if not isinstance(age, int):\n        raise TypeError(f\"age must be an int, not {type(age).__name__}\")\n    print(\"age set to\", age)\n\nset_age(4)\nset_age(\"4\")\n",
   "stdout": "age set to 4\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch21/runtime_check.py\", line 7, in <module>\n    set_age(\"4\")\n    ~~~~~~~^^^^^\n  File \"/home/you/python-ch21/runtime_check.py\", line 3, in set_age\n    raise TypeError(f\"age must be an int, not {type(age).__name__}\")\nTypeError: age must be an int, not str\n",
   "exit": 1
  },
  "shadow.py": {
   "src": "RED = \"red\"\ncolor = \"green\"\nmatch color:\n    case RED:\n        print(\"Stop! The light is\", RED)\nprint(\"RED is now\", RED)\n",
   "stdout": "Stop! The light is green\nRED is now green\n",
   "stderr": "",
   "exit": 0
  },
  "temps_if.py": {
   "src": "def feel(temp: int) -> str:\n    if temp < 0:\n        return \"freezing\"\n    elif temp < 20:\n        return \"cool\"\n    else:\n        return \"warm\"\n\nfor t in [-5, 12, 25]:\n    print(t, feel(t))\n",
   "stdout": "-5 freezing\n12 cool\n25 warm\n",
   "stderr": "",
   "exit": 0
  },
  "temps_match.py": {
   "src": "def feel(temp: int) -> str:\n    match temp:\n        case t if t < 0:\n            return \"freezing\"\n        case t if t < 20:\n            return \"cool\"\n        case _:\n            return \"warm\"\n\nfor t in [-5, 12, 25]:\n    print(t, feel(t))\n",
   "stdout": "-5 freezing\n12 cool\n25 warm\n",
   "stderr": "",
   "exit": 0
  },
  "typed_dict.py": {
   "src": "from typing import TypedDict\n\nclass Pet(TypedDict):\n    name: str\n    age: int\n\nrex: Pet = {\"name\": \"Rex\", \"age\": 3}\nbo: Pet = {\"name\": \"Bo\"}\nprint(type(rex).__name__, rex[\"name\"], bo[\"name\"])\n",
   "stdout": "typed_dict.py:8: error: Missing key \"age\" for TypedDict \"Pet\"  [typeddict-item]\nFound 1 error in 1 file (checked 1 source file)\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "python3 typed_dict.py",
     "out": "dict Rex Bo\n",
     "err": "",
     "exit": 0,
     "dir": "~/python-ch21"
    },
    {
     "cmd": "mypy typed_dict.py",
     "out": "typed_dict.py:8: error: Missing key \"age\" for TypedDict \"Pet\"  [typeddict-item]\nFound 1 error in 1 file (checked 1 source file)\n",
     "err": "",
     "exit": 1,
     "dir": "~/python-ch21"
    }
   ]
  },
  "types_match.py": {
   "src": "def kind(value: object) -> str:\n    match value:\n        case bool():\n            return \"a lamp (bool)\"\n        case int() | float() as n:\n            return f\"a number: {n}\"\n        case str() as s if s:\n            return f\"some text: {s!r}\"\n        case []:\n            return \"an empty crate\"\n        case [first, *rest]:\n            return f\"a crate starting with {first!r}, plus {len(rest)} more\"\n        case None:\n            return \"a ghost (None)\"\n        case _:\n            return f\"something else: {type(value).__name__} {value!r}\"\n\nfor v in [True, 42, 2.5, \"pip\", \"\", [], [\"a\", \"b\", \"c\"], None]:\n    print(kind(v))\n",
   "stdout": "a lamp (bool)\na number: 42\na number: 2.5\nsome text: 'pip'\nsomething else: str ''\nan empty crate\na crate starting with 'a', plus 2 more\na ghost (None)\n",
   "stderr": "",
   "exit": 0
  },
  "unreachable.py": {
   "src": "RED = \"red\"\ncolor = \"green\"\nmatch color:\n    case RED:\n        print(\"Stop!\")\n    case _:\n        print(\"Go!\")\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch21/unreachable.py\", line 4\n    case RED:\n         ^^^\nSyntaxError: name capture 'RED' makes remaining patterns unreachable\n",
   "exit": 1
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
