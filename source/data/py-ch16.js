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
  "workdir": "/home/you/python-ch16",
  "versionDifferences": [
   "unpack_comp.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): unpack_comp.py."
 },
 "programs": {
  "any_all_sum.py": {
   "src": "nums = [4, 9, -2, 7]\nprint(sum(nums), sum([]))\nprint(any(n < 0 for n in nums))\nprint(all(n < 10 for n in nums))\nwords = [\"hi\", \"hello\", \"hey\"]\nprint(max(words, key=len), min(words, key=len))\nprint(max([], default=\"nothing\"))\n",
   "stdout": "18 0\nTrue\nTrue\nhello hi\nnothing\n",
   "stderr": "",
   "exit": 0
  },
  "boss_error.py": {
   "src": "colors = [\"red\", \"blue\"]\nit = iter(colors)\nfor c in it:\n    print(c)\nprint(next(it))\n",
   "stdout": "red\nblue\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/boss_error.py\", line 5, in <module>\n    print(next(it))\n          ~~~~^^^^\nStopIteration\n",
   "exit": 1
  },
  "boss_fill.py": {
   "src": "nums = [4, -2, 9, -7, 0]\nsigns = [\"+\" if n > 0 else \"-\" if n < 0 else \"0\" for n in nums]\nprint(signs)\n",
   "stdout": "['+', '-', '+', '-', '0']\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "def words(lines):\n    for line in lines:\n        yield from line.split()\nsizes = {w: len(w) for w in words([\"a cat\", \"sat on\"])}\nprint(sizes)\n",
   "stdout": "{'a': 1, 'cat': 3, 'sat': 3, 'on': 2}\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "def evens_up_to(n):\n    for k in range(0, n + 1, 2):\n        yield k\n\ng = evens_up_to(6)\nfirst = next(g)\nrest = [k * 10 for k in g if k != 4]\nprint(first, rest)\nprint(list(g))\n",
   "stdout": "0 [20, 60]\n[]\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "readings = [12, 15, 11, 18]\nhigh = (r for r in readings if r > 12)\nprint(\"Any high?\", any(high))\nprint(\"High readings:\", list(high))\n",
   "stdout": "Any high? True\nHigh readings: [18]\n",
   "stderr": "",
   "exit": 0
  },
  "boss_trace.py": {
   "src": "def running_total(nums):\n    total = 0\n    for n in nums:\n        total += n\n        yield total\n\nfor step, t in enumerate(running_total([5, 3, 4]), start=1):\n    print(step, t)\n",
   "stdout": "1 5\n2 8\n3 12\n",
   "stderr": "",
   "exit": 0
  },
  "call_runs_nothing.py": {
   "src": "def countdown(n):\n    print(\"Starting!\")\n    while n > 0:\n        yield n\n        n -= 1\n\nc = countdown(3)\nprint(\"Made:\", type(c).__name__)\nprint(list(c))\n",
   "stdout": "Made: generator\nStarting!\n[3, 2, 1]\n",
   "stderr": "",
   "exit": 0
  },
  "clear_loop.py": {
   "src": "products = []\nfor x in range(5):\n    if x % 2 == 1:\n        for y in range(5):\n            if y > x:\n                products.append(x * y)\nprint(products)\n",
   "stdout": "[2, 3, 4, 12]\n",
   "stderr": "",
   "exit": 0
  },
  "cond_no_else.py": {
   "src": "temp = 30\nlabel = \"hot\" if temp > 25\nprint(label)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch16/cond_no_else.py\", line 2\n    label = \"hot\" if temp > 25\n            ^^^^^^^^^^^^^^^^^^\nSyntaxError: expected 'else' after 'if' expression\n",
   "exit": 1
  },
  "dict_set_comp.py": {
   "src": "words = [\"kiwi\", \"fig\", \"banana\", \"fig\"]\nlengths = {w: len(w) for w in words}\nprint(lengths)\nfirsts = {w[0] for w in words}\nprint(sorted(firsts))\n",
   "stdout": "{'kiwi': 4, 'fig': 3, 'banana': 6}\n['b', 'f', 'k']\n",
   "stderr": "",
   "exit": 0
  },
  "dispenser.py": {
   "src": "packet = [\"lemon\", \"cherry\", \"mint\"]\nit = iter(packet)\nprint(next(it))\nprint(next(it))\nprint(next(it))\n",
   "stdout": "lemon\ncherry\nmint\n",
   "stderr": "",
   "exit": 0
  },
  "dispenser_empty.py": {
   "src": "packet = [\"lemon\", \"cherry\", \"mint\"]\nit = iter(packet)\nnext(it)\nnext(it)\nnext(it)\nnext(it)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/dispenser_empty.py\", line 6, in <module>\n    next(it)\n    ~~~~^^^^\nStopIteration\n",
   "exit": 1
  },
  "else_after_for.py": {
   "src": "nums = [3, -1, 4, -5]\nclean = [n for n in nums\n         if n > 0 else 0]\nprint(clean)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch16/else_after_for.py\", line 3\n    if n > 0 else 0]\n             ^^^^\nSyntaxError: invalid syntax\n",
   "exit": 1
  },
  "enum_zip.py": {
   "src": "guests = [\"Ada\", \"Bo\", \"Cy\"]\nfor seat, name in enumerate(guests, start=1):\n    print(seat, name)\nmeals = [\"soup\", \"pie\", \"salad\"]\nfor name, meal in zip(guests, meals):\n    print(name, \"orders\", meal)\n",
   "stdout": "1 Ada\n2 Bo\n3 Cy\nAda orders soup\nBo orders pie\nCy orders salad\n",
   "stderr": "",
   "exit": 0
  },
  "exhaust.py": {
   "src": "g = (n * n for n in range(3))\nprint(list(g))\nprint(list(g))\n",
   "stdout": "[0, 1, 4]\n[]\n",
   "stderr": "",
   "exit": 0
  },
  "factory.py": {
   "src": "prices = [4, 12, 7, 20, 9]\ndeals = [p * 2 for p in prices if p < 10]\nprint(deals)\n",
   "stdout": "[8, 14, 18]\n",
   "stderr": "",
   "exit": 0
  },
  "fill_filter.py": {
   "src": "nums = [5, 8, 11, 14, 17, 20]\nevens = [n for n in nums if n % 2 == 0]\nprint(evens)\n",
   "stdout": "[8, 14, 20]\n",
   "stderr": "",
   "exit": 0
  },
  "fill_key.py": {
   "src": "pets = [\"hamster\", \"cat\", \"parrot\", \"ox\"]\nprint(sorted(pets, key=len))\n",
   "stdout": "['ox', 'cat', 'parrot', 'hamster']\n",
   "stderr": "",
   "exit": 0
  },
  "fill_yield.py": {
   "src": "def squares(n):\n    for i in range(1, n + 1):\n        yield i * i\n\nprint(list(squares(4)))\n",
   "stdout": "[1, 4, 9, 16]\n",
   "stderr": "",
   "exit": 0
  },
  "filter_transform.py": {
   "src": "words = [\"fig\", \"banana\", \"kiwi\", \"plum\", \"apricot\"]\nlong_ones = [w for w in words if len(w) > 4]\nprint(long_ones)\nshouted = [w.upper() for w in words]\nprint(shouted)\nsizes = [len(w) for w in words if w.startswith(\"p\")]\nprint(sizes)\n",
   "stdout": "['banana', 'apricot']\n['FIG', 'BANANA', 'KIWI', 'PLUM', 'APRICOT']\n[4]\n",
   "stderr": "",
   "exit": 0
  },
  "for_plain.py": {
   "src": "packet = [\"lemon\", \"cherry\", \"mint\"]\nfor candy in packet:\n    print(\"Got\", candy)\nprint(\"Empty!\")\n",
   "stdout": "Got lemon\nGot cherry\nGot mint\nEmpty!\n",
   "stderr": "",
   "exit": 0
  },
  "for_underneath.py": {
   "src": "packet = [\"lemon\", \"cherry\", \"mint\"]\nit = iter(packet)\nwhile True:\n    try:\n        candy = next(it)\n    except StopIteration:\n        break\n    print(\"Got\", candy)\nprint(\"Empty!\")\n",
   "stdout": "Got lemon\nGot cherry\nGot mint\nEmpty!\n",
   "stderr": "",
   "exit": 0
  },
  "forever.py": {
   "src": "from itertools import islice\n\ndef ticket_numbers(start):\n    n = start\n    while True:\n        yield n\n        n += 1\n\ntickets = ticket_numbers(100)\nprint(next(tickets), next(tickets))\nprint(list(islice(tickets, 3)))\n",
   "stdout": "100 101\n[102, 103, 104]\n",
   "stderr": "",
   "exit": 0
  },
  "genexp_preview.py": {
   "src": "total = sum(n * n for n in range(1, 6))\nprint(total)\nsquares = (n * n for n in range(1, 6))\nprint(type(squares).__name__)\nprint(list(squares))\n",
   "stdout": "55\ngenerator\n[1, 4, 9, 16, 25]\n",
   "stderr": "",
   "exit": 0
  },
  "groupby_len.py": {
   "src": "from itertools import groupby\n\nwords = [\"bear\", \"ox\", \"cat\", \"lion\", \"emu\", \"yak\"]\nwords = sorted(words, key=len)\nfor size, group in groupby(words, key=len):\n    print(size, list(group))\n",
   "stdout": "2 ['ox']\n3 ['cat', 'emu', 'yak']\n4 ['bear', 'lion']\n",
   "stderr": "",
   "exit": 0
  },
  "groupby_sorted.py": {
   "src": "from itertools import groupby\n\nvotes = [\"cat\", \"dog\", \"cat\", \"cat\", \"dog\"]\nfor animal, group in groupby(sorted(votes)):\n    print(animal, len(list(group)))\n",
   "stdout": "cat 3\ndog 2\n",
   "stderr": "",
   "exit": 0
  },
  "groupby_unsorted.py": {
   "src": "from itertools import groupby\n\nvotes = [\"cat\", \"dog\", \"cat\", \"cat\", \"dog\"]\nfor animal, group in groupby(votes):\n    print(animal, len(list(group)))\n",
   "stdout": "cat 1\ndog 1\ncat 2\ndog 1\n",
   "stderr": "",
   "exit": 0
  },
  "if_no_else_front.py": {
   "src": "nums = [3, -1, 4, -5]\nclean = [n if n > 0 for n in nums]\nprint(clean)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch16/if_no_else_front.py\", line 2\n    clean = [n if n > 0 for n in nums]\n             ^^^^^^^^^^\nSyntaxError: expected 'else' after 'if' expression\n",
   "exit": 1
  },
  "it_combine.py": {
   "src": "from itertools import chain, product, permutations, combinations\n\nprint(list(chain([1, 2], (3,), \"ab\")))\nprint(list(product(\"HT\", repeat=2)))\nprint(list(permutations(\"abc\", 2)))\nprint(list(combinations(\"abcd\", 2)))\n",
   "stdout": "[1, 2, 3, 'a', 'b']\n[('H', 'H'), ('H', 'T'), ('T', 'H'), ('T', 'T')]\n[('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]\n[('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c'), ('b', 'd'), ('c', 'd')]\n",
   "stderr": "",
   "exit": 0
  },
  "it_endless.py": {
   "src": "from itertools import count, cycle, islice\n\nprint(list(islice(count(10, 5), 4)))\nturns = cycle([\"Ada\", \"Bo\"])\nprint([next(turns) for _ in range(5)])\nprint(list(islice(\"abcdefg\", 2, 6)))\n",
   "stdout": "[10, 15, 20, 25]\n['Ada', 'Bo', 'Ada', 'Bo', 'Ada']\n['c', 'd', 'e', 'f']\n",
   "stderr": "",
   "exit": 0
  },
  "it_running.py": {
   "src": "from itertools import accumulate, pairwise, batched\n\nsales = [3, 5, 2, 6]\nprint(list(accumulate(sales)))\nprint(list(pairwise(sales)))\nprint(list(batched(\"abcdefg\", 3)))\n",
   "stdout": "[3, 8, 10, 16]\n[(3, 5), (5, 2), (2, 6)]\n[('a', 'b', 'c'), ('d', 'e', 'f'), ('g',)]\n",
   "stderr": "",
   "exit": 0
  },
  "lazy_big.py": {
   "src": "big = range(10**12)\nprint(len(big))\nsquares = (n * n for n in big)\nprint(next(squares), next(squares), next(squares))\nprint(sum(n for n in range(1_000_001)))\n",
   "stdout": "1000000000000\n0 1 4\n500000500000\n",
   "stderr": "",
   "exit": 0
  },
  "map_filter.py": {
   "src": "texts = [\"3\", \"14\", \"15\"]\nnums = list(map(int, texts))\nprint(nums)\nprint(list(map(str.upper, [\"a\", \"b\"])))\nmixed = [\"7\", \"x\", \"42\", \"\", \"9\"]\nprint(list(filter(str.isdigit, mixed)))\nprint(list(filter(None, mixed)))\n",
   "stdout": "[3, 14, 15]\n['A', 'B']\n['7', '42', '9']\n['7', 'x', '42', '9']\n",
   "stderr": "",
   "exit": 0
  },
  "max_empty.py": {
   "src": "scores = []\nprint(max(scores))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/max_empty.py\", line 2, in <module>\n    print(max(scores))\n          ~~~^^^^^^^^\nValueError: max() iterable argument is empty\n",
   "exit": 1
  },
  "nb_batched_strict.py": {
   "src": "from itertools import batched\n\nprint(list(batched([1, 2, 3, 4, 5], 2)))\nprint(list(batched([1, 2, 3, 4, 5], 2, strict=True)))\n",
   "stdout": "[(1, 2), (3, 4), (5,)]\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/nb_batched_strict.py\", line 4, in <module>\n    print(list(batched([1, 2, 3, 4, 5], 2, strict=True)))\n          ~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nValueError: batched(): incomplete batch\n",
   "exit": 1
  },
  "nb_file_lines.py": {
   "src": "lines = [\"apple,3\", \"kiwi,0\", \"plum,12\", \"fig,5\"]\nin_stock = (line.split(\",\") for line in lines)\ncounts = (int(n) for name, n in in_stock if n != \"0\")\nprint(sum(counts))\n",
   "stdout": "20\n",
   "stderr": "",
   "exit": 0
  },
  "nb_genexp_paren.py": {
   "src": "nums = [3, 1, 2]\nprint(max(n * 2 for n in nums))\nprint(sorted((n, n * n) for n in nums))\n",
   "stdout": "6\n[(1, 1), (2, 4), (3, 9)]\n",
   "stderr": "",
   "exit": 0
  },
  "nb_iter_is_self.py": {
   "src": "nums = [1, 2]\nit = iter(nums)\nprint(iter(it) is it)\nprint(iter(nums) is iter(nums))\n",
   "stdout": "True\nFalse\n",
   "stderr": "",
   "exit": 0
  },
  "nb_matrix.py": {
   "src": "table = [[r * c for c in range(1, 4)] for r in range(1, 4)]\nfor row in table:\n    print(row)\n",
   "stdout": "[1, 2, 3]\n[2, 4, 6]\n[3, 6, 9]\n",
   "stderr": "",
   "exit": 0
  },
  "nb_while_vs_for.py": {
   "src": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n    return \"liftoff\"\n\ng = countdown(2)\nprint(next(g), next(g))\ntry:\n    next(g)\nexcept StopIteration as done:\n    print(\"StopIteration carried:\", done.value)\n",
   "stdout": "2 1\nStopIteration carried: liftoff\n",
   "stderr": "",
   "exit": 0
  },
  "nested_comp.py": {
   "src": "sizes = [\"S\", \"L\"]\ncolors = [\"red\", \"blue\"]\npairs = [s + \"-\" + c for s in sizes for c in colors]\nprint(pairs)\ngrid = [[1, 2, 3], [4, 5, 6]]\nflat = [x for row in grid for x in row]\nprint(flat)\n",
   "stdout": "['S-red', 'S-blue', 'L-red', 'L-blue']\n[1, 2, 3, 4, 5, 6]\n",
   "stderr": "",
   "exit": 0
  },
  "nested_loops.py": {
   "src": "pairs = []\nfor size in [\"S\", \"L\"]:\n    for color in [\"red\", \"blue\"]:\n        pairs.append(size + \"-\" + color)\nprint(pairs)\n",
   "stdout": "['S-red', 'S-blue', 'L-red', 'L-blue']\n",
   "stderr": "",
   "exit": 0
  },
  "no_leak.py": {
   "src": "for i in range(3):\n    pass\nprint(\"the loop left i =\", i)\nsquares = [k * k for k in range(3)]\nprint(\"the comprehension left k =\", k)\n",
   "stdout": "the loop left i = 2\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/no_leak.py\", line 5, in <module>\n    print(\"the comprehension left k =\", k)\n                                        ^\nNameError: name 'k' is not defined\n",
   "exit": 1
  },
  "not_iterable.py": {
   "src": "class Bag:\n    def __init__(self, things):\n        self.things = things\n\nbag = Bag([\"ball\", \"kite\"])\nfor thing in bag:\n    print(thing)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/not_iterable.py\", line 6, in <module>\n    for thing in bag:\n                 ^^^\nTypeError: 'Bag' object is not iterable\n",
   "exit": 1
  },
  "parsons_nested.py": {
   "src": "cards = []\nfor suit in [\"H\", \"S\"]:\n    for rank in [1, 2, 3]:\n        cards.append(suit + str(rank))\nprint(cards)\n",
   "stdout": "['H1', 'H2', 'H3', 'S1', 'S2', 'S3']\n",
   "stderr": "",
   "exit": 0
  },
  "parsons_pipe.py": {
   "src": "lines = [\"3\", \"\", \"8\", \"\", \"4\"]\nfilled = (s for s in lines if s)\nnumbers = (int(s) for s in filled)\ndoubled = (n * 2 for n in numbers)\nprint(list(doubled))\n",
   "stdout": "[6, 16, 8]\n",
   "stderr": "",
   "exit": 0
  },
  "pf_predict.py": {
   "src": "for n in [3, 10, 15]:\n    size = \"big\" if n > 9 else \"small\"\n    print(n, size)\n",
   "stdout": "3 small\n10 big\n15 big\n",
   "stderr": "",
   "exit": 0
  },
  "pipeline.py": {
   "src": "from itertools import islice\n\ndef read(lines):\n    for line in lines:\n        print(\"read:\", line)\n        yield line\n\ndef keep_numbers(items):\n    for item in items:\n        if item.isdigit():\n            yield item\n\ndef to_int(items):\n    for item in items:\n        print(\"  convert:\", item)\n        yield int(item)\n\ndata = [\"7\", \"x\", \"12\", \"5\", \"99\"]\nstage = to_int(keep_numbers(read(data)))\nprint(\"Pipeline built. Nothing read yet.\")\nfor n in islice(stage, 2):\n    print(\"    got:\", n)\n",
   "stdout": "Pipeline built. Nothing read yet.\nread: 7\n  convert: 7\n    got: 7\nread: x\nread: 12\n  convert: 12\n    got: 12\n",
   "stderr": "",
   "exit": 0
  },
  "pocket_fork.py": {
   "src": "n = 7\nprint(\"even\" if n % 2 == 0 else \"odd\")\ntemp = -3\nlabel = \"freezing\" if temp < 0 else \"fine\"\nprint(label)\nlives = 1\nprint(lives, \"life\" if lives == 1 else \"lives\")\n",
   "stdout": "odd\nfreezing\n1 life\n",
   "stderr": "",
   "exit": 0
  },
  "pred_accum.py": {
   "src": "from itertools import accumulate\n\nsteps = [2, 2, 3]\nprint(list(accumulate(steps)))\nprint(list(accumulate([1, 2, 3, 4])))\n",
   "stdout": "[2, 4, 7]\n[1, 3, 6, 10]\n",
   "stderr": "",
   "exit": 0
  },
  "pred_comp.py": {
   "src": "temps = [18, 25, 31, 12]\nwarm = [t for t in temps if t > 20]\nprint(warm)\nprint([t - 10 for t in warm])\n",
   "stdout": "[25, 31]\n[15, 21]\n",
   "stderr": "",
   "exit": 0
  },
  "pred_dict.py": {
   "src": "menu = {\"tea\": 2, \"cake\": 4, \"jam\": 3}\npricey = {item: cost * 2 for item, cost in menu.items() if cost > 2}\nprint(pricey)\n",
   "stdout": "{'cake': 8, 'jam': 6}\n",
   "stderr": "",
   "exit": 0
  },
  "pred_groupby.py": {
   "src": "from itertools import groupby\n\nfor ch, run in groupby(\"aabccca\"):\n    print(ch, len(list(run)))\n",
   "stdout": "a 2\nb 1\nc 3\na 1\n",
   "stderr": "",
   "exit": 0
  },
  "pred_interleave.py": {
   "src": "def gen():\n    print(\"A\")\n    yield 1\n    print(\"B\")\n    yield 2\n\nfor x in gen():\n    print(x)\n",
   "stdout": "A\n1\nB\n2\n",
   "stderr": "",
   "exit": 0
  },
  "pred_leak.py": {
   "src": "x = \"outside\"\ndoubled = [x * 2 for x in \"ab\"]\nprint(doubled)\nprint(x)\n",
   "stdout": "['aa', 'bb']\noutside\n",
   "stderr": "",
   "exit": 0
  },
  "pred_nested.py": {
   "src": "codes = [a + b for a in \"xy\" for b in \"123\"]\nprint(codes)\nprint(len(codes))\n",
   "stdout": "['x1', 'x2', 'x3', 'y1', 'y2', 'y3']\n6\n",
   "stderr": "",
   "exit": 0
  },
  "pred_stop.py": {
   "src": "letters = iter(\"hi\")\nprint(next(letters))\nprint(next(letters))\nprint(next(letters))\n",
   "stdout": "h\ni\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/pred_stop.py\", line 4, in <module>\n    print(next(letters))\n          ~~~~^^^^^^^^^\nStopIteration\n",
   "exit": 1
  },
  "pred_tools.py": {
   "src": "marks = [7, 3, 9, 5]\nprint(sum(marks), max(marks), min(marks))\nprint(any(m > 8 for m in marks), all(m > 3 for m in marks))\nprint(sorted(marks, reverse=True))\n",
   "stdout": "24 9 3\nTrue False\n[9, 7, 5, 3]\n",
   "stderr": "",
   "exit": 0
  },
  "pred_zip_twice.py": {
   "src": "names = [\"Ada\", \"Bo\"]\nages = [36, 7]\npairs = zip(names, ages)\nfor name, age in pairs:\n    print(name, age)\nfor name, age in pairs:\n    print(\"again:\", name)\nprint(\"done\")\n",
   "stdout": "Ada 36\nBo 7\ndone\n",
   "stderr": "",
   "exit": 0
  },
  "return_vs_yield.py": {
   "src": "def first_only(xs):\n    for x in xs:\n        return x * 10\n\ndef every_one(xs):\n    for x in xs:\n        yield x * 10\n\nprint(first_only([1, 2, 3]))\nprint(list(every_one([1, 2, 3])))\n",
   "stdout": "10\n[10, 20, 30]\n",
   "stderr": "",
   "exit": 0
  },
  "side_effect.py": {
   "src": "names = [\"Ada\", \"Bo\"]\nresult = [print(n) for n in names]\nprint(result)\n",
   "stdout": "Ada\nBo\n[None, None]\n",
   "stderr": "",
   "exit": 0
  },
  "single_use.py": {
   "src": "nums = [1, 2, 3]\nr = range(3)\nprint(list(r), list(r))\nz = zip(\"ab\", nums)\nprint(list(z))\nprint(list(z))\nm = map(str, nums)\nprint(type(m).__name__, list(m), list(m))\nd = {\"x\": 1, \"y\": 2}\nprint(d.keys())\n",
   "stdout": "[0, 1, 2] [0, 1, 2]\n[('a', 1), ('b', 2)]\n[]\nmap ['1', '2', '3'] []\ndict_keys(['x', 'y'])\n",
   "stderr": "",
   "exit": 0
  },
  "sort_keys.py": {
   "src": "words = [\"kiwi\", \"Fig\", \"banana\", \"apple\"]\nprint(sorted(words))\nprint(sorted(words, key=str.lower))\nprint(sorted(words, key=len))\nprint(sorted(words, key=len, reverse=True))\nprint(list(reversed(words)))\n",
   "stdout": "['Fig', 'apple', 'banana', 'kiwi']\n['apple', 'banana', 'Fig', 'kiwi']\n['Fig', 'kiwi', 'apple', 'banana']\n['banana', 'apple', 'kiwi', 'Fig']\n['apple', 'banana', 'Fig', 'kiwi']\n",
   "stderr": "",
   "exit": 0
  },
  "spot_else.py": {
   "src": "scores = [55, 72, 38, 90]\nprint(\"Marking\", len(scores), \"tests\")\nresults = [s for s in scores if s >= 50 else \"fail\"]\nprint(results)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch16/spot_else.py\", line 3\n    results = [s for s in scores if s >= 50 else \"fail\"]\n                                            ^^^^\nSyntaxError: invalid syntax\n",
   "exit": 1
  },
  "spot_exhaust.py": {
   "src": "words = [\"tea\", \"cake\", \"jam\"]\nlengths = (len(w) for w in words)\nprint(\"longest:\", max(lengths))\nprint(\"shortest:\", min(lengths))\n",
   "stdout": "longest: 4\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/spot_exhaust.py\", line 4, in <module>\n    print(\"shortest:\", min(lengths))\n                       ~~~^^^^^^^^^\nValueError: min() iterable argument is empty\n",
   "exit": 1
  },
  "spot_sum.py": {
   "src": "words = [\"sun\", \"rise\"]\nprint(len(words), \"words\")\njoined = sum(words)\nprint(joined)\n",
   "stdout": "2 words\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/spot_sum.py\", line 3, in <module>\n    joined = sum(words)\nTypeError: unsupported operand type(s) for +: 'int' and 'str'\n",
   "exit": 1
  },
  "squares_comp.py": {
   "src": "squares = [n * n for n in range(1, 6)]\nprint(squares)\n",
   "stdout": "[1, 4, 9, 16, 25]\n",
   "stderr": "",
   "exit": 0
  },
  "squares_loop.py": {
   "src": "squares = []\nfor n in range(1, 6):\n    squares.append(n * n)\nprint(squares)\n",
   "stdout": "[1, 4, 9, 16, 25]\n",
   "stderr": "",
   "exit": 0
  },
  "stamp_choice.py": {
   "src": "nums = [3, -1, 4, -5]\nclean = [n if n > 0 else 0 for n in nums]\nprint(clean)\nkept = [n for n in nums if n > 0]\nprint(kept)\n",
   "stdout": "[3, 0, 4, 0]\n[3, 4]\n",
   "stderr": "",
   "exit": 0
  },
  "story.py": {
   "src": "def story():\n    print(\"  (wakes up)\")\n    yield \"Once upon a time\"\n    print(\"  (turns a page)\")\n    yield \"a robot met a loop.\"\n    print(\"  (closes the book)\")\n\nteller = story()\nprint(\"Got a teller.\")\nprint(next(teller))\nprint(next(teller))\nprint(\"I stop listening.\")\n",
   "stdout": "Got a teller.\n  (wakes up)\nOnce upon a time\n  (turns a page)\na robot met a loop.\nI stop listening.\n",
   "stderr": "",
   "exit": 0
  },
  "story_for.py": {
   "src": "def story():\n    print(\"  (wakes up)\")\n    yield \"Once upon a time\"\n    print(\"  (turns a page)\")\n    yield \"a robot met a loop.\"\n    print(\"  (closes the book)\")\n\nfor line in story():\n    print(line)\nprint(\"The end.\")\n",
   "stdout": "  (wakes up)\nOnce upon a time\n  (turns a page)\na robot met a loop.\n  (closes the book)\nThe end.\n",
   "stderr": "",
   "exit": 0
  },
  "sum_machine.py": {
   "src": "print(sum([1, 2, 3]))\nprint(sum([]))\nprint(sum([0.5, 0.25]))\nprint(sum(range(101)))\n",
   "stdout": "6\n0\n0.75\n5050\n",
   "stderr": "",
   "exit": 0
  },
  "sum_strings.py": {
   "src": "parts = [\"a\", \"b\", \"c\"]\nprint(sum(parts))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/sum_strings.py\", line 2, in <module>\n    print(sum(parts))\n          ~~~^^^^^^^\nTypeError: unsupported operand type(s) for +: 'int' and 'str'\n",
   "exit": 1
  },
  "ticket.py": {
   "src": "age = 9\nif age < 12:\n    price = 5\nelse:\n    price = 8\nprint(\"if/else:\", price)\nprice = 5 if age < 12 else 8\nprint(\"one line:\", price)\n",
   "stdout": "if/else: 5\none line: 5\n",
   "stderr": "",
   "exit": 0
  },
  "too_clever.py": {
   "src": "print([x * y for x in range(5) if x % 2 for y in range(5) if y > x])\n",
   "stdout": "[2, 3, 4, 12]\n",
   "stderr": "",
   "exit": 0
  },
  "trace_next.py": {
   "src": "it = iter([\"red\", \"green\", \"blue\"])\nfor call in range(1, 4):\n    got = next(it)\n    print(call, got)\n",
   "stdout": "1 red\n2 green\n3 blue\n",
   "stderr": "",
   "exit": 0
  },
  "two_iters.py": {
   "src": "nums = [10, 20, 30]\na = iter(nums)\nb = iter(nums)\nprint(next(a))\nprint(next(a))\nprint(next(b))\nc = a\nprint(next(c))\n",
   "stdout": "10\n20\n10\n30\n",
   "stderr": "",
   "exit": 0
  },
  "unpack_comp.py": {
   "src": "lists = [[1, 2], [3], [4, 5]]\nprint([x for L in lists for x in L])\nprint([*L for L in lists])\n",
   "stdout": "[1, 2, 3, 4, 5]\n[1, 2, 3, 4, 5]\n",
   "stderr": "",
   "exit": 0,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "  File \"/home/you/python-ch16/unpack_comp.py\", line 3\n    print([*L for L in lists])\n           ^^\nSyntaxError: iterable unpacking cannot be used in comprehension\n",
    "exit": 1
   }
  },
  "yield_from.py": {
   "src": "def mains():\n    yield \"soup\"\n    yield \"pie\"\n\ndef menu():\n    yield \"bread\"\n    yield from mains()\n    yield \"ice cream\"\n\nprint(list(menu()))\n",
   "stdout": "['bread', 'soup', 'pie', 'ice cream']\n",
   "stderr": "",
   "exit": 0
  },
  "zip_strict.py": {
   "src": "guests = [\"Ada\", \"Bo\", \"Cy\"]\nmeals = [\"soup\", \"pie\"]\nprint(list(zip(guests, meals)))\nprint(list(zip(guests, meals, strict=True)))\n",
   "stdout": "[('Ada', 'soup'), ('Bo', 'pie')]\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch16/zip_strict.py\", line 4, in <module>\n    print(list(zip(guests, meals, strict=True)))\n          ~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nValueError: zip() argument 2 is shorter than argument 1\n",
   "exit": 1
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
