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
  "workdir": "/home/you/python-ch18",
  "versionDifferences": [
   "timer.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): timer.py."
 },
 "programs": {
  "args_wrapper.py": {
   "src": "def announce(func):\n    def wrapper(*args, **kwargs):\n        print(\"calling\", func.__name__, args, kwargs)\n        result = func(*args, **kwargs)\n        print(\"got back\", result)\n        return result\n    return wrapper\n\n@announce\ndef add(a, b):\n    return a + b\n\n@announce\ndef badge(name, color=\"red\"):\n    return name + \" (\" + color + \")\"\n\ntotal = add(2, 3)\nprint(badge(\"Pip\", color=\"blue\"))\nprint(total * 10)\n",
   "stdout": "calling add (2, 3) {}\ngot back 5\ncalling badge ('Pip',) {'color': 'blue'}\ngot back Pip (blue)\nPip (blue)\n50\n",
   "stderr": "",
   "exit": 0
  },
  "at_syntax.py": {
   "src": "def announce(func):\n    def wrapper():\n        print(\"** opening the gift **\")\n        func()\n        print(\"** all done **\")\n    return wrapper\n\n@announce\ndef greet():\n    print(\"Hello from Pip!\")\n\ngreet()\n",
   "stdout": "** opening the gift **\nHello from Pip!\n** all done **\n",
   "stderr": "",
   "exit": 0
  },
  "boss_error.py": {
   "src": "def make_timer():\n    seconds = 0\n    def tick():\n        seconds = seconds + 1\n        return seconds\n    return tick\n\nt = make_timer()\nprint(\"ready\")\nprint(t())\n",
   "stdout": "ready\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/boss_error.py\", line 10, in <module>\n    print(t())\n          ~^^\n  File \"/home/you/python-ch18/boss_error.py\", line 4, in tick\n    seconds = seconds + 1\n              ^^^^^^^\nUnboundLocalError: cannot access local variable 'seconds' where it is not associated with a value\n",
   "exit": 1
  },
  "boss_fill.py": {
   "src": "from functools import wraps\n\ndef shout(func):\n    @wraps(func)\n    def wrapper(text):\n        return func(text).upper()\n    return wrapper\n\n@shout\ndef echo(text):\n    \"\"\"Say it back.\"\"\"\n    return text\n\nprint(echo(\"hi\"), echo.__name__, echo.__doc__)\n",
   "stdout": "HI echo Say it back.\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "def prefix(word):\n    def decorator(func):\n        def wrapper(name):\n            return word + \" \" + func(name)\n        return wrapper\n    return decorator\n@prefix(\"Dear\")\ndef letter(name):\n    return name + \",\"\nprint(letter(\"Ada\"))\n",
   "stdout": "Dear Ada,\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "def make_tally():\n    seen = []\n    def tally(func):\n        def wrapper(*args):\n            seen.append(func.__name__)\n            return func(*args)\n        return wrapper\n    return tally, seen\n\ntrack, history = make_tally()\n\n@track\ndef add(a, b):\n    return a + b\n\n@track\ndef neg(n):\n    return -n\n\nprint(add(neg(2), 5))\nprint(history)\n",
   "stdout": "3\n['neg', 'add']\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "from functools import wraps\n\ndef repeat(times):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat\ndef cheer(name):\n    print(\"Go, \" + name + \"!\")\n\ncheer(\"Ada\")\nprint(\"done\")\n",
   "stdout": "done\n",
   "stderr": "",
   "exit": 0
  },
  "boss_trace.py": {
   "src": "def counted(func):\n    count = 0\n    def wrapper(x):\n        nonlocal count\n        count += 1\n        result = func(x)\n        print(count, x, result)\n        return result\n    return wrapper\n\n@counted\ndef half(x):\n    return x // 2\n\nn = 20\nwhile n > 1:\n    n = half(n)\n",
   "stdout": "1 20 10\n2 10 5\n3 5 2\n4 2 1\n",
   "stderr": "",
   "exit": 0
  },
  "cache_demo.py": {
   "src": "from functools import cache\n\n@cache\ndef slow_square(n):\n    print(\"  working out\", n)\n    return n * n\n\nprint(slow_square(4))\nprint(slow_square(4))\nprint(slow_square(5))\nprint(slow_square.cache_info())\n",
   "stdout": "  working out 4\n16\n16\n  working out 5\n25\nCacheInfo(hits=1, misses=2, maxsize=None, currsize=2)\n",
   "stderr": "",
   "exit": 0
  },
  "class_deco.py": {
   "src": "registry = []\n\ndef register(cls):\n    registry.append(cls.__name__)\n    return cls\n\n@register\nclass Cat:\n    pass\n\n@register\nclass Dog:\n    pass\n\nprint(registry)\nprint(Cat.__name__)\n",
   "stdout": "['Cat', 'Dog']\nCat\n",
   "stderr": "",
   "exit": 0
  },
  "counter.py": {
   "src": "def make_counter():\n    count = 0\n    def tick():\n        nonlocal count\n        count += 1\n        return count\n    return tick\n\na = make_counter()\nb = make_counter()\nprint(a(), a(), a())\nprint(b())\nprint(a())\n",
   "stdout": "1 2 3\n1\n4\n",
   "stderr": "",
   "exit": 0
  },
  "counter_broken.py": {
   "src": "def make_counter():\n    count = 0\n    def tick():\n        count += 1\n        return count\n    return tick\n\nclicker = make_counter()\nprint(clicker())\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/counter_broken.py\", line 9, in <module>\n    print(clicker())\n          ~~~~~~~^^\n  File \"/home/you/python-ch18/counter_broken.py\", line 4, in tick\n    count += 1\n    ^^^^^\nUnboundLocalError: cannot access local variable 'count' where it is not associated with a value\n",
   "exit": 1
  },
  "counter_trace.py": {
   "src": "def make_counter():\n    count = 0\n    def tick():\n        nonlocal count\n        count += 1\n        return count\n    return tick\n\nclicker = make_counter()\nprint(clicker())\nprint(clicker())\n",
   "stdout": "1\n2\n",
   "stderr": "",
   "exit": 0
  },
  "curry.py": {
   "src": "def add3(a, b, c):\n    return a + b + c\n\ndef curried_add3(a):\n    def take_b(b):\n        def take_c(c):\n            return a + b + c\n        return take_c\n    return take_b\n\nprint(add3(1, 2, 3))\nprint(curried_add3(1)(2)(3))\nadd_one_two = curried_add3(1)(2)\nprint(add_one_two(10))\n",
   "stdout": "6\n6\n13\n",
   "stderr": "",
   "exit": 0
  },
  "factory.py": {
   "src": "def make_multiplier(n):\n    def times(x):\n        return x * n\n    return times\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(5))\nprint(triple(5))\nprint(double(triple(10)))\n",
   "stdout": "10\n15\n60\n",
   "stderr": "",
   "exit": 0
  },
  "factory_trace.py": {
   "src": "def make_multiplier(n):\n    def times(x):\n        return x * n\n    return times\n\ndouble = make_multiplier(2)\nprint(double(5))\n",
   "stdout": "10\n",
   "stderr": "",
   "exit": 0
  },
  "fill_bind.py": {
   "src": "taxes = []\nfor rate in [5, 10, 20]:\n    taxes.append(lambda price, rate=rate: price * rate // 100)\n\nprint([tax(200) for tax in taxes])\n",
   "stdout": "[10, 20, 40]\n",
   "stderr": "",
   "exit": 0
  },
  "fill_counter.py": {
   "src": "def make_scoreboard():\n    points = 0\n    def score(n):\n        nonlocal points\n        points += n\n        return points\n    return score\n\nboard = make_scoreboard()\nboard(3)\nprint(board(4))\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0
  },
  "fill_factory.py": {
   "src": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nadd_ten = make_adder(10)\nprint(add_ten(5))\nprint(make_adder(1)(1))\n",
   "stdout": "15\n2\n",
   "stderr": "",
   "exit": 0
  },
  "fill_return_wrapper.py": {
   "src": "def polite(func):\n    def wrapper(name):\n        return \"Please, \" + func(name)\n    return wrapper\n\n@polite\ndef order(name):\n    return name + \", pass the salt.\"\n\nprint(order(\"Bo\"))\n",
   "stdout": "Please, Bo, pass the salt.\n",
   "stderr": "",
   "exit": 0
  },
  "inner_hidden.py": {
   "src": "def greet_party(host):\n    def welcome(guest):\n        return host + \" welcomes \" + guest\n    print(welcome(\"Ada\"))\n\ngreet_party(\"Pip\")\nprint(welcome(\"Bo\"))\n",
   "stdout": "Pip welcomes Ada\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/inner_hidden.py\", line 7, in <module>\n    print(welcome(\"Bo\"))\n          ^^^^^^^\nNameError: name 'welcome' is not defined\n",
   "exit": 1
  },
  "late.py": {
   "src": "buttons = [lambda: i for i in range(3)]\nprint([press() for press in buttons])\n",
   "stdout": "[2, 2, 2]\n",
   "stderr": "",
   "exit": 0
  },
  "late_fixed.py": {
   "src": "early = [lambda i=i: i for i in range(3)]\nprint([press() for press in early])\n\ndef make_button(n):\n    return lambda: n\n\nfactory = [make_button(i) for i in range(3)]\nprint([press() for press in factory])\n",
   "stdout": "[0, 1, 2]\n[0, 1, 2]\n",
   "stderr": "",
   "exit": 0
  },
  "late_trace.py": {
   "src": "def make_buttons():\n    buttons = []\n    for i in range(3):\n        buttons.append(lambda: i)\n    return buttons\n\nbuttons = make_buttons()\npresses = [press() for press in buttons]\nprint(presses)\n",
   "stdout": "[2, 2, 2]\n",
   "stderr": "",
   "exit": 0
  },
  "legb.py": {
   "src": "where = \"global\"\n\ndef outer():\n    where = \"enclosing\"\n    def inner():\n        where = \"local\"\n        print(\"L:\", where)\n    inner()\n    print(\"E:\", where)\n\nouter()\nprint(\"G:\", where)\nprint(\"B:\", len(\"Pip\"))\n",
   "stdout": "L: local\nE: enclosing\nG: global\nB: 3\n",
   "stderr": "",
   "exit": 0
  },
  "legb_climb.py": {
   "src": "color = \"blue\"\n\ndef outer():\n    size = \"big\"\n    def inner():\n        shape = \"round\"\n        print(shape, size, color, len(shape))\n    inner()\n\nouter()\n",
   "stdout": "round big blue 5\n",
   "stderr": "",
   "exit": 0
  },
  "live_backpack.py": {
   "src": "def make_note():\n    message = \"see you at 3\"\n    def read():\n        return message\n    message = \"see you at 5\"\n    return read\n\nnote = make_note()\nprint(note())\n",
   "stdout": "see you at 5\n",
   "stderr": "",
   "exit": 0
  },
  "log_calls.py": {
   "src": "from functools import wraps\n\ndef log_calls(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        print(\"call\", wrapper.calls, \"->\", func.__name__, args)\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@log_calls\ndef area(w, h):\n    return w * h\n\narea(2, 3)\narea(4, 5)\nprint(area(1, 1), \"after\", area.calls, \"calls\")\n",
   "stdout": "call 1 -> area (2, 3)\ncall 2 -> area (4, 5)\ncall 3 -> area (1, 1)\n1 after 3 calls\n",
   "stderr": "",
   "exit": 0
  },
  "loud_number.py": {
   "src": "def loud(func):\n    def wrapper(*args):\n        return func(*args).upper() + \"!\"\n    return wrapper\n\n@loud\ndef how_many():\n    return 3\n\nprint(how_many())\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/loud_number.py\", line 10, in <module>\n    print(how_many())\n          ~~~~~~~~^^\n  File \"/home/you/python-ch18/loud_number.py\", line 3, in wrapper\n    return func(*args).upper() + \"!\"\n           ^^^^^^^^^^^^^^^^^\nAttributeError: 'int' object has no attribute 'upper'\n",
   "exit": 1
  },
  "lru_demo.py": {
   "src": "from functools import lru_cache\n\n@lru_cache(maxsize=2)\ndef lookup(word):\n    print(\"  fetching\", word)\n    return len(word)\n\nfor w in [\"cat\", \"dog\", \"cat\", \"emu\", \"dog\"]:\n    lookup(w)\nprint(lookup.cache_info())\n",
   "stdout": "  fetching cat\n  fetching dog\n  fetching emu\n  fetching dog\nCacheInfo(hits=1, misses=4, maxsize=2, currsize=2)\n",
   "stderr": "",
   "exit": 0
  },
  "machine_loud.py": {
   "src": "def loud(func):\n    def wrapper(*args):\n        return func(*args).upper() + \"!\"\n    return wrapper\n\n@loud\ndef hello():\n    return \"hello\"\n\n@loud\ndef welcome(name):\n    return \"welcome, \" + name\n\n@loud\ndef repeat(word, times):\n    return \" \".join([word] * times)\n\nprint(hello())\nprint(welcome(\"Ada\"))\nprint(repeat(\"go\", 3))\n",
   "stdout": "HELLO!\nWELCOME, ADA!\nGO GO GO!\n",
   "stderr": "",
   "exit": 0
  },
  "mutate_ok.py": {
   "src": "def make_logbook():\n    entries = []\n    def log(text):\n        entries.append(text)\n        return len(entries)\n    return log\n\nlog = make_logbook()\nlog(\"woke up\")\nprint(log(\"ate toast\"))\n",
   "stdout": "2\n",
   "stderr": "",
   "exit": 0
  },
  "name_lost.py": {
   "src": "def announce(func):\n    def wrapper(*args, **kwargs):\n        print(\"calling\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@announce\ndef add(a, b):\n    \"\"\"Add two numbers.\"\"\"\n    return a + b\n\nprint(add.__name__)\nprint(add.__doc__)\n",
   "stdout": "wrapper\nNone\n",
   "stderr": "",
   "exit": 0
  },
  "nb_any_expression.py": {
   "src": "def loud(func):\n    def wrapper():\n        return func().upper()\n    return wrapper\n\ndef quiet(func):\n    def wrapper():\n        return func().lower()\n    return wrapper\n\nstyles = {\"loud\": loud, \"quiet\": quiet}\n\n@styles[\"loud\"]\ndef hi():\n    return \"Hi there\"\n\nprint(hi())\n",
   "stdout": "HI THERE\n",
   "stderr": "",
   "exit": 0
  },
  "nb_new_each_call.py": {
   "src": "def make_multiplier(n):\n    def times(x):\n        return x * n\n    return times\n\na = make_multiplier(2)\nb = make_multiplier(2)\nprint(a is b)\nprint(a.__code__ is b.__code__)\nprint(a(7), b(7))\n",
   "stdout": "False\nTrue\n14 14\n",
   "stderr": "",
   "exit": 0
  },
  "nb_routes.py": {
   "src": "routes = {}\n\ndef route(path):\n    def decorator(func):\n        routes[path] = func\n        return func\n    return decorator\n\n@route(\"/\")\ndef home():\n    return \"Welcome home\"\n\n@route(\"/about\")\ndef about():\n    return \"About Pip\"\n\nfor path in [\"/about\", \"/\"]:\n    print(path, \"->\", routes[path]())\n",
   "stdout": "/about -> About Pip\n/ -> Welcome home\n",
   "stderr": "",
   "exit": 0
  },
  "nb_shared_cell.py": {
   "src": "def make_pair():\n    count = 0\n    def up():\n        nonlocal count\n        count += 1\n    def show():\n        return count\n    return up, show\n\nup, show = make_pair()\nup()\nup()\nprint(show())\nprint(up.__closure__[0] is show.__closure__[0])\n",
   "stdout": "2\nTrue\n",
   "stderr": "",
   "exit": 0
  },
  "nb_unwrap.py": {
   "src": "from functools import wraps, cache\n\ndef announce(func):\n    @wraps(func)\n    def wrapper(*args):\n        print(\"calling\", func.__name__)\n        return func(*args)\n    return wrapper\n\n@announce\n@cache\ndef square(n):\n    return n * n\n\nprint(square(3))\nprint(square.__wrapped__.__name__, square.__wrapped__.cache_info())\nprint(square.__wrapped__.__wrapped__(4))\n",
   "stdout": "calling square\n9\nsquare CacheInfo(hits=0, misses=1, maxsize=None, currsize=1)\n16\n",
   "stderr": "",
   "exit": 0
  },
  "nested.py": {
   "src": "def greet_party(host):\n    def welcome(guest):\n        return host + \" welcomes \" + guest\n    print(welcome(\"Ada\"))\n    print(welcome(\"Bo\"))\n\ngreet_party(\"Pip\")\n",
   "stdout": "Pip welcomes Ada\nPip welcomes Bo\n",
   "stderr": "",
   "exit": 0
  },
  "no_return.py": {
   "src": "def announce(func):\n    def wrapper():\n        print(\"** opening the gift **\")\n        func()\n\n@announce\ndef greet():\n    print(\"Hello from Pip!\")\n\ngreet()\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/no_return.py\", line 10, in <module>\n    greet()\n    ~~~~~^^\nTypeError: 'NoneType' object is not callable\n",
   "exit": 1
  },
  "nonlocal_no_outer.py": {
   "src": "total = 0\n\ndef add(n):\n    nonlocal total\n    total += n\n\nadd(5)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch18/nonlocal_no_outer.py\", line 4\n    nonlocal total\n    ^^^^^^^^^^^^^^\nSyntaxError: no binding for nonlocal 'total' found\n",
   "exit": 1
  },
  "parsons_factory.py": {
   "src": "def make_label(prefix):\n    def label(text):\n        return prefix + \": \" + text\n    return label\nwarn = make_label(\"WARNING\")\nprint(warn(\"low battery\"))\n",
   "stdout": "WARNING: low battery\n",
   "stderr": "",
   "exit": 0
  },
  "parsons_stack.py": {
   "src": "def stars(func):\n    def wrapper():\n        return \"*\" + func() + \"*\"\n    return wrapper\n@stars\ndef title():\n    return \"PIP\"\nprint(title())\n",
   "stdout": "*PIP*\n",
   "stderr": "",
   "exit": 0
  },
  "peek_backpack.py": {
   "src": "def make_multiplier(n):\n    def times(x):\n        return x * n\n    return times\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double.__name__)\nprint(double.__code__.co_freevars)\nprint(double.__closure__[0].cell_contents)\nprint(triple.__closure__[0].cell_contents)\n",
   "stdout": "times\n('n',)\n2\n3\n",
   "stderr": "",
   "exit": 0
  },
  "pred_cache.py": {
   "src": "from functools import cache\n\n@cache\ndef shout(word):\n    print(\"making\", word)\n    return word.upper()\n\nshout(\"hi\")\nshout(\"yo\")\nshout(\"hi\")\nprint(shout.cache_info().hits)\n",
   "stdout": "making hi\nmaking yo\n1\n",
   "stderr": "",
   "exit": 0
  },
  "pred_factory.py": {
   "src": "def make_greeter(greeting):\n    def greet(name):\n        return greeting + \", \" + name + \"!\"\n    return greet\n\nhi = make_greeter(\"Hi\")\nyo = make_greeter(\"Yo\")\nprint(hi(\"Ada\"))\nprint(yo(\"Ada\"))\nprint(hi(\"Bo\"))\n",
   "stdout": "Hi, Ada!\nYo, Ada!\nHi, Bo!\n",
   "stderr": "",
   "exit": 0
  },
  "pred_late.py": {
   "src": "shouts = []\nfor word in [\"hi\", \"yo\", \"hey\"]:\n    shouts.append(lambda: word.upper())\n\nprint(shouts[0]())\nword = \"bye\"\nprint(shouts[0]())\n",
   "stdout": "HEY\nBYE\n",
   "stderr": "",
   "exit": 0
  },
  "pred_legb.py": {
   "src": "x = \"G\"\n\ndef outer():\n    x = \"E\"\n    def middle():\n        def inner():\n            return x\n        return inner()\n    return middle()\n\nprint(outer())\nprint(x)\n",
   "stdout": "E\nG\n",
   "stderr": "",
   "exit": 0
  },
  "pred_live.py": {
   "src": "def make_show():\n    toys = [\"ball\"]\n    def show():\n        return toys\n    toys.append(\"kite\")\n    toys = [\"drum\"]\n    return show\n\nprint(make_show()())\n",
   "stdout": "['drum']\n",
   "stderr": "",
   "exit": 0
  },
  "pred_order.py": {
   "src": "def tag(func):\n    print(\"tagging\", func.__name__)\n    def wrapper():\n        print(\"[\", end=\"\")\n        func()\n        print(\"]\")\n    return wrapper\n\n@tag\ndef one():\n    print(\"1\", end=\"\")\n\n@tag\ndef two():\n    print(\"2\", end=\"\")\n\ntwo()\none()\n",
   "stdout": "tagging one\ntagging two\n[2]\n[1]\n",
   "stderr": "",
   "exit": 0
  },
  "pred_stack.py": {
   "src": "def plus_one(func):\n    def wrapper(n):\n        return func(n) + 1\n    return wrapper\n\ndef double(func):\n    def wrapper(n):\n        return func(n) * 2\n    return wrapper\n\n@plus_one\n@double\ndef same(n):\n    return n\n\n@double\n@plus_one\ndef again(n):\n    return n\n\nprint(same(5))\nprint(again(5))\n",
   "stdout": "11\n12\n",
   "stderr": "",
   "exit": 0
  },
  "repeat.py": {
   "src": "from functools import wraps\n\ndef repeat(times):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef cheer(name):\n    print(\"Go, \" + name + \"!\")\n\ncheer(\"Ada\")\n",
   "stdout": "Go, Ada!\nGo, Ada!\nGo, Ada!\n",
   "stderr": "",
   "exit": 0
  },
  "repeat_by_hand.py": {
   "src": "from functools import wraps\n\ndef repeat(times):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\ndef cheer(name):\n    print(\"Go, \" + name + \"!\")\n\ntwice = repeat(2)\ncheer = twice(cheer)\ncheer(\"Bo\")\nprint(cheer.__name__)\n",
   "stdout": "Go, Bo!\nGo, Bo!\ncheer\n",
   "stderr": "",
   "exit": 0
  },
  "scope_kinds.py": {
   "src": "mood = \"global calm\"\n\ndef house():\n    mood = \"house calm\"\n\n    def plain():\n        mood = \"plain change\"\n\n    def with_nonlocal():\n        nonlocal mood\n        mood = \"nonlocal change\"\n\n    def with_global():\n        global mood\n        mood = \"global change\"\n\n    plain()\n    print(\"after plain:\", mood)\n    with_nonlocal()\n    print(\"after nonlocal:\", mood)\n    with_global()\n    print(\"after global:\", mood)\n\nhouse()\nprint(\"top level:\", mood)\n",
   "stdout": "after plain: house calm\nafter nonlocal: nonlocal change\nafter global: nonlocal change\ntop level: global change\n",
   "stderr": "",
   "exit": 0
  },
  "spot_global.py": {
   "src": "def make_piggy_bank():\n    total = 0\n    def save(coins):\n        global total\n        total += coins\n        return total\n    return save\n\npiggy = make_piggy_bank()\nprint(piggy(5))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch18/spot_global.py\", line 10, in <module>\n    print(piggy(5))\n          ~~~~~^^^\n  File \"/home/you/python-ch18/spot_global.py\", line 5, in save\n    total += coins\n    ^^^^^\nNameError: name 'total' is not defined\n",
   "exit": 1
  },
  "spot_lost_result.py": {
   "src": "def announce(func):\n    def wrapper(*args, **kwargs):\n        print(\"calling\", func.__name__)\n        func(*args, **kwargs)\n    return wrapper\n\n@announce\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))\n",
   "stdout": "calling add\nNone\n",
   "stderr": "",
   "exit": 0
  },
  "stack.py": {
   "src": "def bold(func):\n    def wrapper():\n        return \"<b>\" + func() + \"</b>\"\n    return wrapper\n\ndef italic(func):\n    def wrapper():\n        return \"<i>\" + func() + \"</i>\"\n    return wrapper\n\n@bold\n@italic\ndef hello():\n    return \"hello\"\n\nprint(hello())\n",
   "stdout": "<b><i>hello</i></b>\n",
   "stderr": "",
   "exit": 0
  },
  "stack_order.py": {
   "src": "def no_negatives(func):\n    def wrapper(n):\n        return max(func(n), 0)\n    return wrapper\n\ndef minus_ten(func):\n    def wrapper(n):\n        return func(n) - 10\n    return wrapper\n\n@no_negatives\n@minus_ten\ndef price_a(n):\n    return n\n\n@minus_ten\n@no_negatives\ndef price_b(n):\n    return n\n\nprint(price_a(4), price_b(4))\nprint(price_a(25), price_b(25))\n",
   "stdout": "0 -6\n15 15\n",
   "stderr": "",
   "exit": 0
  },
  "timer.py": {
   "src": "import time\nfrom functools import wraps\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        seconds = time.perf_counter() - start\n        print(func.__name__, \"took\", round(seconds, 4), \"seconds\")\n        return result\n    return wrapper\n\n@timed\ndef add_up(n):\n    return sum(range(n))\n\nprint(add_up(1_000_000))\n",
   "stdout": "add_up took 0.0657 seconds\n499999500000\n",
   "stderr": "",
   "exit": 0,
   "nondeterministic": true,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "add_up took 0.0371 seconds\n499999500000\n",
    "stderr": "",
    "exit": 0
   }
  },
  "timer_check.py": {
   "src": "import time\nfrom functools import wraps\n\ndef timed(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        seconds = time.perf_counter() - start\n        print(func.__name__, \"under a second:\", seconds < 1)\n        return result\n    return wrapper\n\n@timed\ndef add_up(n):\n    return sum(range(n))\n\nprint(add_up(1_000))\n",
   "stdout": "add_up under a second: True\n499500\n",
   "stderr": "",
   "exit": 0
  },
  "trace_counter.py": {
   "src": "def make_counter(start):\n    count = start\n    def tick():\n        nonlocal count\n        count += 1\n        return count\n    return tick\n\nred = make_counter(0)\nblue = make_counter(10)\nfor name in [\"red\", \"blue\", \"red\", \"red\", \"blue\"]:\n    machine = red if name == \"red\" else blue\n    print(name, machine())\n",
   "stdout": "red 1\nblue 11\nred 2\nred 3\nblue 12\n",
   "stderr": "",
   "exit": 0
  },
  "trace_log.py": {
   "src": "def log_calls(func):\n    def wrapper(n):\n        result = func(n)\n        print(n, result)\n        return result\n    return wrapper\n\n@log_calls\ndef square(n):\n    return n * n\n\nfor k in [3, 1, 4]:\n    square(k)\n",
   "stdout": "3 9\n1 1\n4 16\n",
   "stderr": "",
   "exit": 0
  },
  "walk_order.py": {
   "src": "def announce(func):\n    print(\"wrapping\", func.__name__)\n    def wrapper():\n        print(\"before\")\n        func()\n        print(\"after\")\n    return wrapper\n\n@announce\ndef greet():\n    print(\"hello\")\n\nprint(\"program starts\")\ngreet()\ngreet()\n",
   "stdout": "wrapping greet\nprogram starts\nbefore\nhello\nafter\nbefore\nhello\nafter\n",
   "stderr": "",
   "exit": 0
  },
  "with_wraps.py": {
   "src": "from functools import wraps\n\ndef announce(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        print(\"calling\", func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@announce\ndef add(a, b):\n    \"\"\"Add two numbers.\"\"\"\n    return a + b\n\nprint(add.__name__)\nprint(add.__doc__)\nprint(add.__wrapped__(2, 3))\n",
   "stdout": "add\nAdd two numbers.\n5\n",
   "stderr": "",
   "exit": 0
  },
  "wrap_by_hand.py": {
   "src": "def announce(func):\n    def wrapper():\n        print(\"** opening the gift **\")\n        func()\n        print(\"** all done **\")\n    return wrapper\n\ndef greet():\n    print(\"Hello from Pip!\")\n\ngreet = announce(greet)\ngreet()\n",
   "stdout": "** opening the gift **\nHello from Pip!\n** all done **\n",
   "stderr": "",
   "exit": 0
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
