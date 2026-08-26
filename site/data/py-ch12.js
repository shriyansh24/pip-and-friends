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
  "workdir": "/home/you/python-ch12",
  "versionDifferences": [
   "json_bad.py",
   "json_tuple_key.py"
  ],
  "isolation": "none",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): json_bad.py, json_tuple_key.py."
 },
 "programs": {
  "boss_fill.py": {
   "src": "import csv\nimport json\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\nby_subject = {}\nfor row in rows:\n    subject = row[\"subject\"]\n    if subject not in by_subject:\n        by_subject[subject] = []\n    by_subject[subject].append(int(row[\"score\"]))\nprint(json.dumps(by_subject))\n",
   "stdout": "{\"math\": [91, 78, 88], \"art\": [85, 93, 70]}\n",
   "stderr": "",
   "exit": 0
  },
  "boss_parsons.py": {
   "src": "clubs = {\"chess\": [\"Ada\", \"Bo\"], \"art\": [\"Cy\"]}\nfor club, members in clubs.items():\n    print(club + \":\")\n    for name in members:\n        print(\" \", name)\nprint(\"Clubs:\", len(clubs))\n",
   "stdout": "chess:\n  Ada\n  Bo\nart:\n  Cy\nClubs: 2\n",
   "stderr": "",
   "exit": 0
  },
  "boss_predict.py": {
   "src": "library = {\n    \"fiction\": [{\"title\": \"Robots\", \"out\": False}],\n    \"science\": [{\"title\": \"Stars\", \"out\": True}, {\"title\": \"Bugs\", \"out\": False}],\n}\nlibrary[\"fiction\"].append({\"title\": \"Dragons\", \"out\": True})\nlibrary[\"science\"][1][\"out\"] = True\nfor shelf, books in library.items():\n    count = 0\n    for book in books:\n        if book[\"out\"]:\n            count = count + 1\n    print(shelf, count, len(books))\n",
   "stdout": "fiction 1 2\nscience 2 2\n",
   "stderr": "",
   "exit": 0
  },
  "boss_spot.py": {
   "src": "import copy\nweek = [[\"Mon\", 0], [\"Tue\", 0]]\nbackup = week.copy()\nweek[0][1] = 5\nprint(\"Backup:\", backup)\n",
   "stdout": "Backup: [['Mon', 5], ['Tue', 0]]\n",
   "stderr": "",
   "exit": 0
  },
  "boss_trace.py": {
   "src": "grid = [[1, 2, 3], [4, 5, 6]]\ntotal = 0\nfor r in range(2):\n    for c in range(3):\n        total = total + grid[r][c]\n        print(r, c, grid[r][c], total)\n",
   "stdout": "0 0 1 1\n0 1 2 3\n0 2 3 6\n1 0 4 10\n1 1 5 15\n1 2 6 21\n",
   "stderr": "",
   "exit": 0
  },
  "cabinet.py": {
   "src": "school = {\n    \"math\": [{\"name\": \"Ada\", \"score\": 91}, {\"name\": \"Bo\", \"score\": 78}],\n    \"art\": [{\"name\": \"Cy\", \"score\": 70}],\n}\nprint(school[\"math\"][0][\"name\"])\nprint(school[\"math\"][1][\"score\"])\nprint(len(school[\"math\"]))\n",
   "stdout": "Ada\n78\n2\n",
   "stderr": "",
   "exit": 0
  },
  "count_kinds.py": {
   "src": "pets = [(\"Rex\", \"dog\"), (\"Tom\", \"cat\"), (\"Fido\", \"dog\")]\ncounts = {}\nfor name, kind in pets:\n    counts[kind] = counts.get(kind, 0) + 1\nprint(counts)\n",
   "stdout": "{'dog': 2, 'cat': 1}\n",
   "stderr": "",
   "exit": 0
  },
  "csv_dict.py": {
   "src": "import csv\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\nprint(len(rows))\nprint(rows[0])\nprint(rows[0][\"score\"] + rows[1][\"score\"])\nprint(int(rows[0][\"score\"]) + int(rows[1][\"score\"]))\n",
   "stdout": "6\n{'name': 'Ada', 'subject': 'math', 'score': '91'}\n9178\n169\n",
   "stderr": "",
   "exit": 0
  },
  "csv_reader.py": {
   "src": "import csv\nwith open(\"menu.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    for row in csv.reader(f):\n        print(row)\n",
   "stdout": "['dish', 'price']\n['mac, cheese', '6']\n['soup', '4']\n",
   "stderr": "",
   "exit": 0
  },
  "csv_split.py": {
   "src": "with open(\"menu.csv\", encoding=\"utf-8\") as f:\n    for line in f:\n        print(line.strip().split(\",\"))\n",
   "stdout": "['dish', 'price']\n['\"mac', ' cheese\"', '6']\n['soup', '4']\n",
   "stderr": "",
   "exit": 0
  },
  "csv_write.py": {
   "src": "import csv\nrows = [{\"dish\": \"mac, cheese\", \"price\": 6}, {\"dish\": \"soup\", \"price\": 4}]\nwith open(\"menu_copy.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as f:\n    writer = csv.DictWriter(f, fieldnames=[\"dish\", \"price\"])\n    writer.writeheader()\n    writer.writerows(rows)\nwith open(\"menu_copy.csv\", encoding=\"utf-8\") as f:\n    print(f.read(), end=\"\")\n",
   "stdout": "dish,price\n\"mac, cheese\",6\nsoup,4\n",
   "stderr": "",
   "exit": 0
  },
  "ex_copy.py": {
   "src": "import copy\nteam = [[\"Ada\"], [\"Bo\"]]\ntwin = team.copy()\nclone = copy.deepcopy(team)\nteam[0].append(\"Cy\")\nteam.append([\"Di\"])\nprint(twin)\nprint(clone)\nprint(len(team), len(twin))\n",
   "stdout": "[['Ada', 'Cy'], ['Bo']]\n[['Ada'], ['Bo']]\n3 2\n",
   "stderr": "",
   "exit": 0
  },
  "ex_csv_fill.py": {
   "src": "import csv\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\ntotal = 0\nfor row in rows:\n    total = total + int(row[\"score\"])\nprint(len(rows), total)\n",
   "stdout": "6 505\n",
   "stderr": "",
   "exit": 0
  },
  "ex_csv_glue.py": {
   "src": "import csv\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\nfirst = rows[0]\nprint(first[\"name\"], first[\"score\"])\nprint(first[\"score\"] * 2)\nprint(int(first[\"score\"]) * 2)\n",
   "stdout": "Ada 91\n9191\n182\n",
   "stderr": "",
   "exit": 0
  },
  "ex_group_predict.py": {
   "src": "scores = [(\"Ada\", 7), (\"Bo\", 9), (\"Ada\", 10), (\"Cy\", 4), (\"Bo\", 6)]\nbest = {}\nfor name, points in scores:\n    if name not in best:\n        best[name] = []\n    best[name].append(points)\nprint(best)\nprint(best[\"Ada\"][1], len(best))\n",
   "stdout": "{'Ada': [7, 10], 'Bo': [9, 6], 'Cy': [4]}\n10 3\n",
   "stderr": "",
   "exit": 0
  },
  "ex_items.py": {
   "src": "ages = {\"Ada\": 36, \"Bob\": 41}\nfor name, age in ages:\n    print(name, \"is\", age)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/ex_items.py\", line 2, in <module>\n    for name, age in ages:\n        ^^^^^^^^^\nValueError: too many values to unpack (expected 2)\n",
   "exit": 1
  },
  "ex_json_keys.py": {
   "src": "import json\nlockers = {7: \"Ada\", 12: \"Bo\"}\nsaved = json.dumps(lockers)\nback = json.loads(saved)\nprint(saved)\nprint(back.get(7))\nprint(back.get(\"7\"))\n",
   "stdout": "{\"7\": \"Ada\", \"12\": \"Bo\"}\nNone\nAda\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_group.py": {
   "src": "words = [\"ant\", \"bee\", \"cat\", \"bat\"]\nby_letter = {}\nfor word in words:\n    first = word[0]\n    if first not in by_letter:\n        by_letter[first] = []\n    by_letter[first].append(word)\nprint(by_letter)\n",
   "stdout": "{'a': ['ant'], 'b': ['bee', 'bat'], 'c': ['cat']}\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_group_alt.py": {
   "src": "by_letter = {}\nwords = [\"ant\", \"bee\", \"cat\", \"bat\"]\nfor word in words:\n    first = word[0]\n    if first not in by_letter:\n        by_letter[first] = []\n    by_letter[first].append(word)\nprint(by_letter)\n",
   "stdout": "{'a': ['ant'], 'b': ['bee', 'bat'], 'c': ['cat']}\n",
   "stderr": "",
   "exit": 0
  },
  "ex_parsons_json.py": {
   "src": "import json\nbook = {\"Ada\": [9, 7], \"Bo\": [8]}\nwith open(\"book.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(book, f)\nwith open(\"book.json\", encoding=\"utf-8\") as f:\n    back = json.load(f)\nprint(back[\"Ada\"][1])\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0
  },
  "ex_path_fill.py": {
   "src": "zoo = {\n    \"cats\": [{\"name\": \"Tom\", \"age\": 4}, {\"name\": \"Luna\", \"age\": 2}],\n    \"dogs\": [{\"name\": \"Rex\", \"age\": 7}],\n}\nprint(zoo[\"cats\"][1][\"name\"])\nprint(zoo[\"dogs\"][0][\"age\"])\n",
   "stdout": "Luna\n7\n",
   "stderr": "",
   "exit": 0
  },
  "ex_paths.py": {
   "src": "shop = {\n    \"fruit\": [\"apple\", \"pear\", \"fig\"],\n    \"prices\": {\"apple\": 3, \"pear\": 2},\n}\nprint(shop[\"fruit\"][-1])\nprint(shop[\"prices\"][\"pear\"])\nprint(len(shop[\"fruit\"]))\nprint(shop[\"fruit\"][0][0])\n",
   "stdout": "fig\n2\n3\na\n",
   "stderr": "",
   "exit": 0
  },
  "ex_silent.py": {
   "src": "rooms = {\"A1\": \"lab\", \"B2\": \"gym\"}\nfor code, use in rooms:\n    print(use, code)\n",
   "stdout": "1 A\n2 B\n",
   "stderr": "",
   "exit": 0
  },
  "ex_spot_grid.py": {
   "src": "board = [[\"-\"] * 3] * 3\nboard[1][1] = \"X\"\nfor row in board:\n    print(\" \".join(row))\n",
   "stdout": "- X -\n- X -\n- X -\n",
   "stderr": "",
   "exit": 0
  },
  "ex_spot_layer.py": {
   "src": "teams = {\"red\": [\"Ada\", \"Bo\"], \"blue\": [\"Cy\"]}\nprint(\"Teams:\", len(teams))\nfor team in teams:\n    print(team, teams[team])\nprint(teams[0][0])\n",
   "stdout": "Teams: 2\nred ['Ada', 'Bo']\nblue ['Cy']\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/ex_spot_layer.py\", line 5, in <module>\n    print(teams[0][0])\n          ~~~~~^^^\nKeyError: 0\n",
   "exit": 1
  },
  "ex_star_fill.py": {
   "src": "line = [\"Pip\", 7, 9, 8]\nname, *scores = line\nprint(name)\nprint(scores)\nprint(sum(scores))\n",
   "stdout": "Pip\n[7, 9, 8]\n24\n",
   "stderr": "",
   "exit": 0
  },
  "ex_strict.py": {
   "src": "days = [\"Mon\", \"Tue\", \"Wed\"]\ntemps = [12, 15]\nfor day, temp in zip(days, temps, strict=True):\n    print(day, temp)\n",
   "stdout": "Mon 12\nTue 15\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/ex_strict.py\", line 3, in <module>\n    for day, temp in zip(days, temps, strict=True):\n                     ~~~^^^^^^^^^^^^^^^^^^^^^^^^^^\nValueError: zip() argument 2 is shorter than argument 1\n",
   "exit": 1
  },
  "ex_trace_orders.py": {
   "src": "basket = [\n    {\"item\": \"tea\", \"qty\": 2, \"price\": 3},\n    {\"item\": \"cake\", \"qty\": 1, \"price\": 5},\n    {\"item\": \"jam\", \"qty\": 3, \"price\": 2},\n]\ntotal = 0\nfor row in basket:\n    cost = row[\"qty\"] * row[\"price\"]\n    total = total + cost\n    print(row[\"item\"], cost, total)\n",
   "stdout": "tea 6 6\ncake 5 11\njam 6 17\n",
   "stderr": "",
   "exit": 0
  },
  "ex_trap.py": {
   "src": "rows = [[\".\"] * 2] * 2\nrows[1][0] = \"X\"\nprint(rows)\nprint(rows[0][0])\n",
   "stdout": "[['X', '.'], ['X', '.']]\nX\n",
   "stderr": "",
   "exit": 0
  },
  "ex_zip.py": {
   "src": "colors = [\"red\", \"green\", \"blue\"]\ncodes = [\"R\", \"G\"]\nfor color, code in zip(colors, codes):\n    print(code, color)\nprint(len(list(zip(colors, codes))))\n",
   "stdout": "R red\nG green\n2\n",
   "stderr": "",
   "exit": 0
  },
  "gb_v1.py": {
   "src": "import csv\n\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\n\nfor row in rows:\n    print(row[\"name\"], row[\"subject\"], row[\"score\"])\n",
   "stdout": "Ada math 91\nBo math 78\nCy math 88\nAda art 85\nBo art 93\nCy art 70\n",
   "stderr": "",
   "exit": 0
  },
  "gb_v2.py": {
   "src": "import csv\n\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\n\nby_name = {}\nfor row in rows:\n    name = row[\"name\"]\n    if name not in by_name:\n        by_name[name] = []\n    by_name[name].append(int(row[\"score\"]))\nprint(by_name)\n",
   "stdout": "{'Ada': [91, 85], 'Bo': [78, 93], 'Cy': [88, 70]}\n",
   "stderr": "",
   "exit": 0
  },
  "gb_v3.py": {
   "src": "import csv\nimport json\nfrom pathlib import Path\n\nwith open(\"grades.csv\", newline=\"\", encoding=\"utf-8\") as f:\n    rows = list(csv.DictReader(f))\n\nby_name = {}\nfor row in rows:\n    name = row[\"name\"]\n    if name not in by_name:\n        by_name[name] = []\n    by_name[name].append(int(row[\"score\"]))\n\nreport = {}\nfor name, scores in by_name.items():\n    average = sum(scores) / len(scores)\n    report[name] = {\"scores\": scores, \"average\": average}\n    print(f\"{name:<4}{str(scores):<10} average {average:5.1f}\")\n\nPath(\"report.json\").write_text(json.dumps(report, indent=2), encoding=\"utf-8\")\nprint(\"Saved\", len(report), \"students to report.json\")\n",
   "stdout": "Ada [91, 85]   average  88.0\nBo  [78, 93]   average  85.5\nCy  [88, 70]   average  79.0\nSaved 3 students to report.json\n",
   "stderr": "",
   "exit": 0
  },
  "gb_v4.py": {
   "src": "import json\nfrom pathlib import Path\n\nreport = json.loads(Path(\"report.json\").read_text(encoding=\"utf-8\"))\nbest = \"\"\nfor name, info in report.items():\n    if best == \"\" or info[\"average\"] > report[best][\"average\"]:\n        best = name\nprint(\"Top of the class:\", best, report[best][\"average\"])\nprint(\"Their scores:\", report[best][\"scores\"])\n",
   "stdout": "Top of the class: Ada 88.0\nTheir scores: [91, 85]\n",
   "stderr": "",
   "exit": 0
  },
  "grid.py": {
   "src": "board = [\n    [\"X\", \"O\", \"X\"],\n    [\".\", \"X\", \"O\"],\n    [\"O\", \".\", \"X\"],\n]\nprint(board[1])\nprint(board[1][2])\nboard[1][0] = \"O\"\nfor row in board:\n    print(\" \".join(row))\n",
   "stdout": "['.', 'X', 'O']\nO\nX O X\nO X O\nO . X\n",
   "stderr": "",
   "exit": 0
  },
  "grid_safe.py": {
   "src": "grid = []\nfor row in range(3):\n    grid.append([0] * 3)\ngrid[0][0] = 1\nprint(grid)\n",
   "stdout": "[[1, 0, 0], [0, 0, 0], [0, 0, 0]]\n",
   "stderr": "",
   "exit": 0
  },
  "grid_trap.py": {
   "src": "grid = [[0] * 3] * 3\ngrid[0][0] = 1\nprint(grid)\n",
   "stdout": "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]\n",
   "stderr": "",
   "exit": 0
  },
  "group.py": {
   "src": "pets = [(\"Rex\", \"dog\"), (\"Tom\", \"cat\"), (\"Fido\", \"dog\")]\nby_kind = {}\nfor name, kind in pets:\n    if kind not in by_kind:\n        by_kind[kind] = []\n    by_kind[kind].append(name)\nprint(by_kind)\n",
   "stdout": "{'dog': ['Rex', 'Fido'], 'cat': ['Tom']}\n",
   "stderr": "",
   "exit": 0
  },
  "group_keyerror.py": {
   "src": "pets = [(\"Rex\", \"dog\"), (\"Tom\", \"cat\"), (\"Fido\", \"dog\")]\nby_kind = {}\nfor name, kind in pets:\n    by_kind[kind].append(name)\nprint(by_kind)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/group_keyerror.py\", line 4, in <module>\n    by_kind[kind].append(name)\n    ~~~~~~~^^^^^^\nKeyError: 'dog'\n",
   "exit": 1
  },
  "group_overwrite.py": {
   "src": "pets = [(\"Rex\", \"dog\"), (\"Tom\", \"cat\"), (\"Fido\", \"dog\")]\nby_kind = {}\nfor name, kind in pets:\n    by_kind[kind] = [name]\nprint(by_kind)\n",
   "stdout": "{'dog': ['Fido'], 'cat': ['Tom']}\n",
   "stderr": "",
   "exit": 0
  },
  "groups.py": {
   "src": "by_kind = {\n    \"dog\": [\"Rex\", \"Fido\"],\n    \"cat\": [\"Tom\"],\n    \"bird\": [\"Kiwi\", \"Polly\", \"Sky\"],\n}\nprint(by_kind[\"bird\"])\nprint(by_kind[\"bird\"][0])\nprint(len(by_kind[\"dog\"]))\nby_kind[\"cat\"].append(\"Luna\")\nprint(by_kind[\"cat\"])\n",
   "stdout": "['Kiwi', 'Polly', 'Sky']\nKiwi\n2\n['Tom', 'Luna']\n",
   "stderr": "",
   "exit": 0
  },
  "items_bug.py": {
   "src": "stock = {\"apples\": 4, \"pears\": 7}\nfor fruit, count in stock:\n    print(fruit, count)\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/items_bug.py\", line 2, in <module>\n    for fruit, count in stock:\n        ^^^^^^^^^^^^\nValueError: too many values to unpack (expected 2)\n",
   "exit": 1
  },
  "items_fixed.py": {
   "src": "codes = {\"NO\": \"Norway\", \"PE\": \"Peru\"}\nfor code, country in codes.items():\n    print(code, country)\n",
   "stdout": "NO Norway\nPE Peru\n",
   "stderr": "",
   "exit": 0
  },
  "items_silent.py": {
   "src": "codes = {\"NO\": \"Norway\", \"PE\": \"Peru\"}\nfor code, country in codes:\n    print(code, country)\n",
   "stdout": "N O\nP E\n",
   "stderr": "",
   "exit": 0
  },
  "json_bad.py": {
   "src": "import json\ntext = \"{'name': 'Rex'}\"\nprint(\"Reading:\", text)\npet = json.loads(text)\nprint(pet)\n",
   "stdout": "Reading: {'name': 'Rex'}\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/json_bad.py\", line 4, in <module>\n    pet = json.loads(text)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/__init__.py\", line 371, in loads\n    return _default_decoder.decode(s)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/decoder.py\", line 358, in decode\n    obj, end = self.raw_decode(s, idx=_w(s, 0).end())\n               ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/decoder.py\", line 374, in raw_decode\n    obj, end = self.scan_once(s, idx)\n               ~~~~~~~~~~~~~~^^^^^^^^\njson.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "Reading: {'name': 'Rex'}\n",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/json_bad.py\", line 4, in <module>\n    pet = json.loads(text)\n  File \"/usr/local/lib/python3.13/json/__init__.py\", line 352, in loads\n    return _default_decoder.decode(s)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^\n  File \"/usr/local/lib/python3.13/json/decoder.py\", line 345, in decode\n    obj, end = self.raw_decode(s, idx=_w(s, 0).end())\n               ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/json/decoder.py\", line 361, in raw_decode\n    obj, end = self.scan_once(s, idx)\n               ~~~~~~~~~~~~~~^^^^^^^^\njson.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)\n",
    "exit": 1
   }
  },
  "json_keys.py": {
   "src": "import json\nseats = {1: \"Ada\", 2: \"Bo\"}\ntext = json.dumps(seats)\nprint(text)\nback = json.loads(text)\nprint(back)\nprint(back == seats)\nprint(back.get(1), back.get(\"1\"))\n",
   "stdout": "{\"1\": \"Ada\", \"2\": \"Bo\"}\n{'1': 'Ada', '2': 'Bo'}\nFalse\nNone Ada\n",
   "stderr": "",
   "exit": 0
  },
  "json_machine.py": {
   "src": "import json\nprint(json.dumps({\"name\": \"Rex\"}))\nprint(json.dumps([True, False, None]))\nprint(json.dumps((1, 2)))\nprint(json.dumps({1: \"a\", 2: \"b\"}))\nprint(json.dumps(\"café\"))\n",
   "stdout": "{\"name\": \"Rex\"}\n[true, false, null]\n[1, 2]\n{\"1\": \"a\", \"2\": \"b\"}\n\"caf\\u00e9\"\n",
   "stderr": "",
   "exit": 0
  },
  "json_save.py": {
   "src": "import json\nbook = {\"Ada\": [91, 85], \"Bo\": [78]}\nwith open(\"scores.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(book, f, indent=2)\nwith open(\"scores.json\", encoding=\"utf-8\") as f:\n    back = json.load(f)\nprint(back)\nprint(back == book)\nprint(type(back[\"Ada\"][0]))\n",
   "stdout": "{'Ada': [91, 85], 'Bo': [78]}\nTrue\n<class 'int'>\n",
   "stderr": "",
   "exit": 0
  },
  "json_text.py": {
   "src": "import json\npet = {\"name\": \"Rex\", \"age\": 3, \"tags\": [\"good\", \"loud\"], \"vet\": None, \"chipped\": True}\nprint(pet)\nprint(json.dumps(pet))\nprint(json.dumps(pet, indent=2))\n",
   "stdout": "{'name': 'Rex', 'age': 3, 'tags': ['good', 'loud'], 'vet': None, 'chipped': True}\n{\"name\": \"Rex\", \"age\": 3, \"tags\": [\"good\", \"loud\"], \"vet\": null, \"chipped\": true}\n{\n  \"name\": \"Rex\",\n  \"age\": 3,\n  \"tags\": [\n    \"good\",\n    \"loud\"\n  ],\n  \"vet\": null,\n  \"chipped\": true\n}\n",
   "stderr": "",
   "exit": 0
  },
  "json_tuple_key.py": {
   "src": "import json\nprint(json.dumps({(0, 0): \"start\"}))\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/json_tuple_key.py\", line 2, in <module>\n    print(json.dumps({(0, 0): \"start\"}))\n          ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/__init__.py\", line 234, in dumps\n    return _default_encoder.encode(obj)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^^^\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/encoder.py\", line 202, in encode\n    chunks = self.iterencode(o, _one_shot=True)\n  File \"/root/.local/share/uv/python/cpython-3.15.2-linux-x86_64-gnu/lib/python3.15/json/encoder.py\", line 263, in iterencode\n    return _iterencode(o, 0)\nTypeError: keys must be str, int, float, bool or None, not tuple\n",
   "exit": 1,
   "alt": {
    "version": "CPython 3.13.18",
    "stdout": "",
    "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/json_tuple_key.py\", line 2, in <module>\n    print(json.dumps({(0, 0): \"start\"}))\n          ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.13/json/__init__.py\", line 235, in dumps\n    return _default_encoder.encode(obj)\n           ~~~~~~~~~~~~~~~~~~~~~~~^^^^^\n  File \"/usr/local/lib/python3.13/json/encoder.py\", line 202, in encode\n    chunks = self.iterencode(o, _one_shot=True)\n  File \"/usr/local/lib/python3.13/json/encoder.py\", line 263, in iterencode\n    return _iterencode(o, 0)\nTypeError: keys must be str, int, float, bool or None, not tuple\n",
    "exit": 1
   }
  },
  "lookup.py": {
   "src": "students = {\n    \"s01\": {\"name\": \"Ada\", \"year\": 7},\n    \"s02\": {\"name\": \"Bo\", \"year\": 8},\n}\nprint(students[\"s02\"])\nprint(students[\"s02\"][\"name\"])\nstudents[\"s01\"][\"year\"] = 8\nstudents[\"s03\"] = {\"name\": \"Cy\", \"year\": 7}\nprint(students[\"s01\"])\nprint(len(students))\n",
   "stdout": "{'name': 'Bo', 'year': 8}\nBo\n{'name': 'Ada', 'year': 8}\n3\n",
   "stderr": "",
   "exit": 0
  },
  "nb_dict_copy.py": {
   "src": "import copy\nbook = {\"Ada\": [91], \"Bo\": [78]}\nbackup = book.copy()\nsafe = copy.deepcopy(book)\nbook[\"Ada\"].append(85)\nbook[\"Cy\"] = [70]\nprint(book)\nprint(backup)\nprint(safe)\n",
   "stdout": "{'Ada': [91, 85], 'Bo': [78], 'Cy': [70]}\n{'Ada': [91, 85], 'Bo': [78]}\n{'Ada': [91], 'Bo': [78]}\n",
   "stderr": "",
   "exit": 0
  },
  "orders.py": {
   "src": "orders = [\n    {\"item\": \"tea\", \"qty\": 2, \"price\": 3},\n    {\"item\": \"cake\", \"qty\": 1, \"price\": 5},\n    {\"item\": \"tea\", \"qty\": 1, \"price\": 3},\n]\ntotal = 0\nfor order in orders:\n    cost = order[\"qty\"] * order[\"price\"]\n    total = total + cost\n    print(order[\"item\"], cost, total)\nprint(\"Total:\", total)\n",
   "stdout": "tea 6 6\ncake 5 11\ntea 3 14\nTotal: 14\n",
   "stderr": "",
   "exit": 0
  },
  "path_far.py": {
   "src": "school = {\n    \"pip\": {\"age\": 9, \"scores\": [7, 9, 8]},\n    \"ada\": {\"age\": 10, \"scores\": [10, 6]},\n}\nprint(school[\"ada\"][\"scores\"][2])\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/path_far.py\", line 5, in <module>\n    print(school[\"ada\"][\"scores\"][2])\n          ~~~~~~~~~~~~~~~~~~~~~~~^^^\nIndexError: list index out of range\n",
   "exit": 1
  },
  "path_key0.py": {
   "src": "school = {\n    \"pip\": {\"age\": 9, \"scores\": [7, 9, 8]},\n    \"ada\": {\"age\": 10, \"scores\": [10, 6]},\n}\nprint(school[\"pip\"][0])\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/path_key0.py\", line 5, in <module>\n    print(school[\"pip\"][0])\n          ~~~~~~~~~~~~~^^^\nKeyError: 0\n",
   "exit": 1
  },
  "path_str.py": {
   "src": "school = {\n    \"pip\": {\"age\": 9, \"scores\": [7, 9, 8]},\n    \"ada\": {\"age\": 10, \"scores\": [10, 6]},\n}\nprint(school[\"pip\"][\"scores\"][\"1\"])\n",
   "stdout": "",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/path_str.py\", line 5, in <module>\n    print(school[\"pip\"][\"scores\"][\"1\"])\n          ~~~~~~~~~~~~~~~~~~~~~~~^^^^^\nTypeError: list indices must be integers or slices, not str\n",
   "exit": 1
  },
  "path_walk.py": {
   "src": "school = {\n    \"pip\": {\"age\": 9, \"scores\": [7, 9, 8]},\n    \"ada\": {\"age\": 10, \"scores\": [10, 6]},\n}\nprint(school)\nprint(school[\"pip\"])\nprint(school[\"pip\"][\"scores\"])\nprint(school[\"pip\"][\"scores\"][1])\nprint(school[\"ada\"])\nprint(school[\"ada\"][\"age\"])\nprint(school[\"ada\"][\"scores\"])\n",
   "stdout": "{'pip': {'age': 9, 'scores': [7, 9, 8]}, 'ada': {'age': 10, 'scores': [10, 6]}}\n{'age': 9, 'scores': [7, 9, 8]}\n[7, 9, 8]\n9\n{'age': 10, 'scores': [10, 6]}\n10\n[10, 6]\n",
   "stderr": "",
   "exit": 0
  },
  "paths.py": {
   "src": "from pathlib import Path\ndata = Path(\"grades.csv\")\nprint(data.exists())\nprint(Path(\"nope.csv\").exists())\nreport = Path(\"reports\") / \"june\" / \"notes.txt\"\nprint(report)\nprint(report.name, report.suffix, report.parent)\nPath(\"hello.txt\").write_text(\"Hi from Pip!\\n\", encoding=\"utf-8\")\nprint(Path(\"hello.txt\").read_text(encoding=\"utf-8\"), end=\"\")\n",
   "stdout": "True\nFalse\nreports/june/notes.txt\nnotes.txt .txt reports/june\nHi from Pip!\n",
   "stderr": "",
   "exit": 0
  },
  "pick_dict.py": {
   "src": "phones = {\"Ada\": \"555-0101\", \"Bo\": \"555-0199\"}\nprint(phones[\"Bo\"])\n",
   "stdout": "555-0199\n",
   "stderr": "",
   "exit": 0
  },
  "pick_list.py": {
   "src": "playlist = [\"intro\", \"song\", \"song\"]\nplaylist.append(\"outro\")\nprint(playlist)\n",
   "stdout": "['intro', 'song', 'song', 'outro']\n",
   "stderr": "",
   "exit": 0
  },
  "pick_set.py": {
   "src": "visited = {\"Oslo\", \"Lima\"}\nvisited.add(\"Oslo\")\nprint(len(visited), \"different cities\")\n",
   "stdout": "2 different cities\n",
   "stderr": "",
   "exit": 0
  },
  "pick_tuple.py": {
   "src": "point = (3, 4)\nx, y = point\nprint(\"x is\", x, \"and y is\", y)\n",
   "stdout": "x is 3 and y is 4\n",
   "stderr": "",
   "exit": 0
  },
  "records.py": {
   "src": "pets = [\n    {\"name\": \"Rex\", \"kind\": \"dog\", \"age\": 3},\n    {\"name\": \"Tom\", \"kind\": \"cat\", \"age\": 5},\n    {\"name\": \"Kiwi\", \"kind\": \"bird\", \"age\": 1},\n]\nprint(len(pets))\nprint(pets[0])\nprint(pets[1][\"name\"])\nfor pet in pets:\n    print(pet[\"name\"], \"is a\", pet[\"kind\"])\n",
   "stdout": "3\n{'name': 'Rex', 'kind': 'dog', 'age': 3}\nTom\nRex is a dog\nTom is a cat\nKiwi is a bird\n",
   "stderr": "",
   "exit": 0
  },
  "report.py": {
   "src": "teams = {\"red\": [\"Ada\", \"Bo\"], \"blue\": [\"Cy\", \"Di\", \"Eve\"]}\nfor team, members in teams.items():\n    print(team.upper(), \"team:\")\n    for name in members:\n        print(\"  -\", name)\n",
   "stdout": "RED team:\n  - Ada\n  - Bo\nBLUE team:\n  - Cy\n  - Di\n  - Eve\n",
   "stderr": "",
   "exit": 0
  },
  "setdefault_demo.py": {
   "src": "pets = [(\"Rex\", \"dog\"), (\"Tom\", \"cat\"), (\"Fido\", \"dog\")]\nby_kind = {}\nfor name, kind in pets:\n    by_kind.setdefault(kind, []).append(name)\nprint(by_kind)\n",
   "stdout": "{'dog': ['Rex', 'Fido'], 'cat': ['Tom']}\n",
   "stderr": "",
   "exit": 0
  },
  "shallow.py": {
   "src": "import copy\nseats = [[\"Ada\", \"Bo\"], [\"Cy\", \"Di\"]]\nshallow = seats.copy()\ndeep = copy.deepcopy(seats)\nseats[0].append(\"Eve\")\nprint(shallow)\nprint(deep)\n",
   "stdout": "[['Ada', 'Bo', 'Eve'], ['Cy', 'Di']]\n[['Ada', 'Bo'], ['Cy', 'Di']]\n",
   "stderr": "",
   "exit": 0
  },
  "show_data.py": {
   "src": "from pathlib import Path\nfor name in [\"grades.csv\", \"menu.csv\", \"report.json\"]:\n    print(name, \"is here:\", Path(name).exists())\n",
   "stdout": "grades.csv is here: True\nmenu.csv is here: True\nreport.json is here: True\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "python3 show_data.py",
     "out": "grades.csv is here: True\nmenu.csv is here: True\nreport.json is here: True\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "grades.csv": {
   "src": "name,subject,score\nAda,math,91\nBo,math,78\nCy,math,88\nAda,art,85\nBo,art,93\nCy,art,70\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "menu.csv": {
   "src": "dish,price\n\"mac, cheese\",6\nsoup,4\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "report.json": {
   "src": "{\n  \"Ada\": {\n    \"scores\": [\n      91,\n      85\n    ],\n    \"average\": 88.0\n  },\n  \"Bo\": {\n    \"scores\": [\n      78,\n      93\n    ],\n    \"average\": 85.5\n  },\n  \"Cy\": {\n    \"scores\": [\n      88,\n      70\n    ],\n    \"average\": 79.0\n  }\n}",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "scores.json": {
   "src": "{\n  \"Ada\": [\n    91,\n    85\n  ],\n  \"Bo\": [\n    78\n  ]\n}",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "star.py": {
   "src": "first, *rest = [10, 20, 30, 40]\nprint(first)\nprint(rest)\nhead, *middle, tail = [1, 2, 3, 4, 5]\nprint(head, middle, tail)\nwinner, *others = [\"Ada\"]\nprint(winner, others)\n",
   "stdout": "10\n[20, 30, 40]\n1 [2, 3, 4] 5\nAda []\n",
   "stderr": "",
   "exit": 0
  },
  "star_two.py": {
   "src": "*left, *right = [1, 2, 3]\nprint(left, right)\n",
   "stdout": "",
   "stderr": "  File \"/home/you/python-ch12/star_two.py\", line 1\n    *left, *right = [1, 2, 3]\n    ^^^^^^^^^^^^^\nSyntaxError: multiple starred expressions in assignment\n",
   "exit": 1
  },
  "teaser_shape.py": {
   "src": "pets = [{\"name\": \"Rex\", \"kind\": \"dog\"}, {\"name\": \"Tom\", \"knid\": \"cat\"}]\nfor pet in pets:\n    print(pet[\"name\"], pet.get(\"kind\", \"???\"))\n",
   "stdout": "Rex dog\nTom ???\n",
   "stderr": "",
   "exit": 0
  },
  "tuple_keys.py": {
   "src": "treasure = {(0, 0): \"start\", (2, 1): \"gold\", (3, 4): \"dragon\"}\nprint(treasure[(2, 1)])\nprint(treasure.get((1, 1), \"sand\"))\nfor (x, y), thing in treasure.items():\n    print(f\"x={x} y={y}: {thing}\")\n",
   "stdout": "gold\nsand\nx=0 y=0: start\nx=2 y=1: gold\nx=3 y=4: dragon\n",
   "stderr": "",
   "exit": 0
  },
  "wrong_layer.py": {
   "src": "by_kind = {\"dog\": [\"Rex\", \"Fido\"], \"cat\": [\"Tom\"]}\nprint(\"Dogs:\", by_kind[\"dog\"])\nprint(by_kind[0][\"name\"])\n",
   "stdout": "Dogs: ['Rex', 'Fido']\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/wrong_layer.py\", line 3, in <module>\n    print(by_kind[0][\"name\"])\n          ~~~~~~~^^^\nKeyError: 0\n",
   "exit": 1
  },
  "wrong_layer2.py": {
   "src": "pets = [{\"name\": \"Rex\", \"kind\": \"dog\"}, {\"name\": \"Tom\", \"kind\": \"cat\"}]\nprint(\"First pet:\", pets[0])\nprint(pets[\"name\"])\n",
   "stdout": "First pet: {'name': 'Rex', 'kind': 'dog'}\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/wrong_layer2.py\", line 3, in <module>\n    print(pets[\"name\"])\n          ~~~~^^^^^^^^\nTypeError: list indices must be integers or slices, not str\n",
   "exit": 1
  },
  "zip_dict.py": {
   "src": "items = [\"tea\", \"cake\", \"pie\"]\nprices = [2, 5, 4]\nmenu = dict(zip(items, prices))\nprint(menu)\nprint(menu[\"pie\"])\n",
   "stdout": "{'tea': 2, 'cake': 5, 'pie': 4}\n4\n",
   "stderr": "",
   "exit": 0
  },
  "zip_lazy.py": {
   "src": "pairs = zip([\"a\", \"b\"], [1, 2])\nprint(type(pairs))\nprint(list(pairs))\nprint(list(pairs))\n",
   "stdout": "<class 'zip'>\n[('a', 1), ('b', 2)]\n[]\n",
   "stderr": "",
   "exit": 0
  },
  "zip_machine.py": {
   "src": "print(list(zip([1, 2, 3], [\"a\", \"b\", \"c\"])))\nprint(list(zip([1, 2, 3], [\"a\", \"b\"])))\nprint(list(zip(\"Pip\", \"abc\")))\nprint(list(zip([], [1, 2])))\n",
   "stdout": "[(1, 'a'), (2, 'b'), (3, 'c')]\n[(1, 'a'), (2, 'b')]\n[('P', 'a'), ('i', 'b'), ('p', 'c')]\n[]\n",
   "stderr": "",
   "exit": 0
  },
  "zip_pairs.py": {
   "src": "names = [\"Ada\", \"Bo\", \"Cy\"]\nscores = [91, 78, 85]\nfor name, score in zip(names, scores):\n    print(name, \"scored\", score)\nprint(list(zip(names, scores)))\n",
   "stdout": "Ada scored 91\nBo scored 78\nCy scored 85\n[('Ada', 91), ('Bo', 78), ('Cy', 85)]\n",
   "stderr": "",
   "exit": 0
  },
  "zip_strict.py": {
   "src": "names = [\"Ada\", \"Bo\", \"Cy\", \"Di\"]\nscores = [91, 78, 85]\nprint(\"Pairing up...\")\npairs = list(zip(names, scores, strict=True))\nprint(pairs)\n",
   "stdout": "Pairing up...\n",
   "stderr": "Traceback (most recent call last):\n  File \"/home/you/python-ch12/zip_strict.py\", line 4, in <module>\n    pairs = list(zip(names, scores, strict=True))\nValueError: zip() argument 2 is shorter than argument 1\n",
   "exit": 1
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
