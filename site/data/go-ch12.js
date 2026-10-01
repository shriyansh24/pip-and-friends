/* Captured from real runs on 2026-11-08 by tools/capture.py. Do not edit by hand; re-run the tool. */
(function (root) {
  "use strict";
  root.POLYGLOT = root.POLYGLOT || {};
  root.POLYGLOT.data = root.POLYGLOT.data || {};
  root.POLYGLOT.data.captures = {
 "meta": {
  "lang": "go",
  "capturedWith": [
   "Go 1.27.3",
   "Go 1.24.7"
  ],
  "primary": "Go 1.27.3",
  "date": "2026-11-08",
  "workdir": "/home/you/go-ch12",
  "versionDifferences": [
   "boss_err.go",
   "order.go",
   "spot_nil.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_err.go, order.go, spot_nil.go."
 },
 "programs": {
  "anon.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tspot := struct {\n\t\tX, Y int\n\t}{X: 3, Y: 4}\n\tfmt.Println(spot, spot.X)\n\tchecks := []struct {\n\t\tword string\n\t\twant int\n\t}{\n\t\t{\"go\", 2},\n\t\t{\"héllo\", 5},\n\t}\n\tfor _, c := range checks {\n\t\tfmt.Println(c.word, len(c.word) == c.want)\n\t}\n}\n",
   "stdout": "{3 4} 3\ngo true\nhéllo false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run anon.go",
     "out": "{3 4} 3\ngo true\nhéllo false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bad_key.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tseen := map[[]int]string{}\n\tfmt.Println(seen)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./bad_key.go:6:14: invalid map key type []int\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run bad_key.go",
     "out": "",
     "err": "# command-line-arguments\n./bad_key.go:6:14: invalid map key type []int\n",
     "exit": 1
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bag struct {\n\tOwner string\n\tItems map[string]int\n}\n\nfunc main() {\n\tb := Bag{Owner: \"Rin\"}\n\tfmt.Println(b.Owner, len(b.Items))\n\tb.Items[\"rope\"] = 1\n\tfmt.Println(b)\n}\n",
   "stdout": "Rin 0\n",
   "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x93\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "Rin 0\n",
     "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x93\nexit status 2\n",
     "exit": 1,
     "merged": "Rin 0\npanic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x93\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Rin 0\n",
    "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x92\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "Rin 0\n",
      "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x92\nexit status 2\n",
      "exit": 1,
      "merged": "Rin 0\npanic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/boss_err.go:13 +0x92\nexit status 2\n"
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\thooks := map[int]string{3: \"ana\", 5: \"bo\"}\n\tif owner, ok := hooks[5]; ok {\n\t\tfmt.Println(\"returning coat to\", owner)\n\t\tdelete(hooks, 5)\n\t}\n\t_, still := hooks[5]\n\tfmt.Println(still, len(hooks))\n}\n",
   "stdout": "returning coat to bo\nfalse 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "returning coat to bo\nfalse 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n)\n\nfunc main() {\n\tgroups := map[string][]string{}\n\tfor _, n := range []string{\"ana\", \"bo\", \"ali\", \"bea\"} {\n\t\tfirst := n[:1]\n\t\tgroups[first] = append(groups[first], n)\n\t}\n\tfor _, k := range slices.Sorted(maps.Keys(groups)) {\n\t\tfmt.Println(k, groups[k])\n\t}\n}\n",
   "stdout": "a [ana ali]\nb [bo bea]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "a [ana ali]\nb [bo bea]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Coat struct {\n\tOwner string\n\tHook  int\n}\n\nfunc main() {\n\tcheck := map[int]Coat{\n\t\t12: {Owner: \"ana\", Hook: 3},\n\t\t7:  {Owner: \"bo\", Hook: 1},\n\t}\n\tc, ok := check[12]\n\tfmt.Println(c.Owner, ok)\n\tc, ok = check[99]\n\tfmt.Printf(\"%+v %v\\n\", c, ok)\n\tfmt.Println(len(check))\n}\n",
   "stdout": "ana true\n{Owner: Hook:0} false\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "ana true\n{Owner: Hook:0} false\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Hero struct {\n\tName string\n\tXP   int\n}\n\nfunc main() {\n\troster := map[string]Hero{\"rin\": {Name: \"Rin\", XP: 40}}\n\troster[\"rin\"].XP += 10\n\tfmt.Println(roster[\"rin\"])\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_spot.go:12:2: cannot assign to struct field roster[\"rin\"].XP in map\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_spot.go:12:2: cannot assign to struct field roster[\"rin\"].XP in map\n",
     "exit": 1
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbag := map[string]int{\"apple\": 2}\n\tfor _, item := range []string{\"apple\", \"rope\", \"apple\", \"map\"} {\n\t\tbag[item]++\n\t\tfmt.Println(item, bag[item], len(bag))\n\t}\n}\n",
   "stdout": "apple 3 1\nrope 1 2\napple 4 2\nmap 1 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "apple 3 1\nrope 1 2\napple 4 2\nmap 1 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "coat_check.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]int{\n\t\t\"ana\": 12,\n\t\t\"bo\":  7,\n\t}\n\tfmt.Println(coats[\"ana\"])\n\tcoats[\"cy\"] = 31\n\tcoats[\"bo\"] = 8\n\tfmt.Println(coats)\n\tfmt.Println(len(coats))\n}\n",
   "stdout": "12\nmap[ana:12 bo:8 cy:31]\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run coat_check.go",
     "out": "12\nmap[ana:12 bo:8 cy:31]\n3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "commaok.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstock := map[string]int{\"tea\": 0, \"jam\": 4}\n\tn, ok := stock[\"tea\"]\n\tfmt.Println(n, ok)\n\tn, ok = stock[\"cake\"]\n\tfmt.Println(n, ok)\n\tif _, found := stock[\"jam\"]; found {\n\t\tfmt.Println(\"jam is on the shelf\")\n\t}\n}\n",
   "stdout": "0 true\n0 false\njam is on the shelf\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run commaok.go",
     "out": "0 true\n0 false\njam is on the shelf\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compare.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tb := Point{X: 1, Y: 2}\n\tc := Point{X: 2, Y: 1}\n\tfmt.Println(a == b, a == c)\n\tseen := map[Point]string{a: \"start\"}\n\tfmt.Println(seen[b])\n}\n",
   "stdout": "true false\nstart\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run compare.go",
     "out": "true false\nstart\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compare_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bag struct {\n\tOwner string\n\tItems []string\n}\n\nfunc main() {\n\tx := Bag{Owner: \"ana\"}\n\ty := Bag{Owner: \"ana\"}\n\tfmt.Println(x == y)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./compare_err.go:13:14: invalid operation: x == y (struct containing []string cannot be compared)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run compare_err.go",
     "out": "",
     "err": "# command-line-arguments\n./compare_err.go:13:14: invalid operation: x == y (struct containing []string cannot be compared)\n",
     "exit": 1
    }
   ]
  },
  "copy_share.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc main() {\n\ta := Point{X: 1, Y: 2}\n\tb := a\n\tb.X = 9\n\tfmt.Println(a, b)\n\tm := map[string]int{\"x\": 1}\n\tn := m\n\tn[\"x\"] = 9\n\tfmt.Println(m, n)\n}\n",
   "stdout": "{1 2} {9 2}\nmap[x:9] map[x:9]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy_share.go",
     "out": "{1 2} {9 2}\nmap[x:9] map[x:9]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "count_words.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\ttext := \"the cat saw the dog\"\n\tcounts := map[string]int{}\n\tfor _, w := range strings.Fields(text) {\n\t\tcounts[w]++\n\t}\n\tfmt.Println(counts)\n}\n",
   "stdout": "map[cat:1 dog:1 saw:1 the:2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run count_words.go",
     "out": "map[cat:1 dog:1 saw:1 the:2]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "delete.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]int{\"ana\": 12, \"bo\": 7, \"cy\": 31}\n\tdelete(coats, \"bo\")\n\tfmt.Println(coats, len(coats))\n\tdelete(coats, \"zed\")\n\tfmt.Println(coats, len(coats))\n}\n",
   "stdout": "map[ana:12 cy:31] 2\nmap[ana:12 cy:31] 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run delete.go",
     "out": "map[ana:12 cy:31] 2\nmap[ana:12 cy:31] 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_commaok.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tseats := map[string]int{\"ana\": 3, \"bo\": 0}\n\tfor _, who := range []string{\"bo\", \"zed\"} {\n\t\tseat, ok := seats[who]\n\t\tif ok {\n\t\t\tfmt.Println(who, \"sits in seat\", seat)\n\t\t} else {\n\t\t\tfmt.Println(who, \"has no ticket\")\n\t\t}\n\t}\n}\n",
   "stdout": "bo sits in seat 0\nzed has no ticket\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_commaok.go",
     "out": "bo sits in seat 0\nzed has no ticket\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_make.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tlockers := make(map[int]string)\n\tlockers[4] = \"skates\"\n\tlockers[7] = \"helmet\"\n\tfmt.Println(lockers[4], len(lockers))\n}\n",
   "stdout": "skates 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_make.go",
     "out": "skates 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_sheet.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Sheet struct {\n\tName  string\n\tClass string\n\tLevel int\n}\n\nfunc main() {\n\ts := Sheet{Name: \"Juno\", Class: \"bard\", Level: 2}\n\tfmt.Println(s.Name, \"the\", s.Class)\n\tfmt.Printf(\"%+v\\n\", s)\n}\n",
   "stdout": "Juno the bard\n{Name:Juno Class:bard Level:2}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_sheet.go",
     "out": "Juno the bard\n{Name:Juno Class:bard Level:2}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "formats.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype P struct {\n\tName string\n\tAge  int\n}\n\nfunc main() {\n\tp := P{Name: \"Ana\", Age: 30}\n\tfmt.Printf(\"%v | %+v | %#v | %T\\n\", p, p, p, p)\n}\n",
   "stdout": "{Ana 30} | {Name:Ana Age:30} | main.P{Name:\"Ana\", Age:30} | main.P\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run formats.go",
     "out": "{Ana 30} | {Name:Ana Age:30} | main.P{Name:\"Ana\", Age:30} | main.P\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "good_keys.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tboard := map[[2]int]string{}\n\tboard[[2]int{0, 0}] = \"X\"\n\tboard[[2]int{1, 2}] = \"O\"\n\tfmt.Println(board[[2]int{1, 2}], len(board))\n\tfmt.Println(board)\n}\n",
   "stdout": "O 2\nmap[[0 0]:X [1 2]:O]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run good_keys.go",
     "out": "O 2\nmap[[0 0]:X [1 2]:O]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hanger.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]string{\"A1\": \"red coat\"}\n\tcoats[\"B2\"] = \"blue scarf\"\n\tc := coats[\"Z9\"]\n\tfmt.Printf(\"%q\\n\", c)\n\tc, ok := coats[\"Z9\"]\n\tfmt.Println(ok)\n\tdelete(coats, \"A1\")\n\tfmt.Println(coats, len(coats))\n}\n",
   "stdout": "\"\"\nfalse\nmap[B2:blue scarf] 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run hanger.go",
     "out": "\"\"\nfalse\nmap[B2:blue scarf] 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "literals.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n\tHP    int\n}\n\nfunc main() {\n\ta := Player{Name: \"Rin\", Level: 3, HP: 20}\n\tb := Player{HP: 12, Name: \"Oz\"}\n\tc := Player{\"Mo\", 1, 8}\n\tfmt.Println(a)\n\tfmt.Println(b)\n\tfmt.Println(c)\n}\n",
   "stdout": "{Rin 3 20}\n{Oz 0 12}\n{Mo 1 8}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run literals.go",
     "out": "{Rin 3 20}\n{Oz 0 12}\n{Mo 1 8}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_machine.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]int{\"ana\": 12, \"bo\": 0}\n\tfor _, k := range []string{\"ana\", \"bo\", \"zed\"} {\n\t\tv, ok := coats[k]\n\t\tfmt.Println(k, \"->\", v, ok)\n\t}\n}\n",
   "stdout": "ana -> 12 true\nbo -> 0 true\nzed -> 0 false\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run lookup_machine.go",
     "out": "ana -> 12 true\nbo -> 0 true\nzed -> 0 false\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lookup_type.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]int{\"ana\": 12}\n\tv, ok := coats[5]\n\tfmt.Println(v, ok)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lookup_type.go:7:17: cannot use 5 (untyped int constant) as string value in map index\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lookup_type.go",
     "out": "",
     "err": "# command-line-arguments\n./lookup_type.go:7:17: cannot use 5 (untyped int constant) as string value in map index\n",
     "exit": 1
    }
   ]
  },
  "make_map.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := make(map[string]int)\n\tscores[\"ana\"] = 3\n\tfmt.Println(scores, len(scores))\n\tempty := map[string]int{}\n\tfmt.Println(empty, len(empty))\n}\n",
   "stdout": "map[ana:3] 1\nmap[] 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run make_map.go",
     "out": "map[ana:3] 1\nmap[] 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_field.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc main() {\n\tpins := map[string]Point{\"home\": {X: 1, Y: 2}}\n\tpins[\"home\"].X = 5\n\tfmt.Println(pins)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./map_field.go:11:2: cannot assign to struct field pins[\"home\"].X in map\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run map_field.go",
     "out": "",
     "err": "# command-line-arguments\n./map_field.go:11:2: cannot assign to struct field pins[\"home\"].X in map\n",
     "exit": 1
    }
   ]
  },
  "map_field_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Point struct {\n\tX, Y int\n}\n\nfunc main() {\n\tpins := map[string]Point{\"home\": {X: 1, Y: 2}}\n\tp := pins[\"home\"]\n\tp.X = 5\n\tpins[\"home\"] = p\n\tfmt.Println(pins)\n}\n",
   "stdout": "map[home:{5 2}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_field_fix.go",
     "out": "map[home:{5 2}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_share.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc addCoat(m map[string]int, who string) {\n\tm[who] = 99\n}\n\nfunc main() {\n\tcoats := map[string]int{\"ana\": 12}\n\tspare := coats\n\tspare[\"bo\"] = 7\n\taddCoat(coats, \"cy\")\n\tfmt.Println(coats)\n\tfmt.Println(spare)\n}\n",
   "stdout": "map[ana:12 bo:7 cy:99]\nmap[ana:12 bo:7 cy:99]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_share.go",
     "out": "map[ana:12 bo:7 cy:99]\nmap[ana:12 bo:7 cy:99]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_slices.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\troutes := map[string][]string{}\n\troutes[\"mon\"] = append(routes[\"mon\"], \"bakery\")\n\troutes[\"mon\"] = append(routes[\"mon\"], \"bank\")\n\troutes[\"tue\"] = append(routes[\"tue\"], \"park\")\n\tfmt.Println(routes)\n\tfmt.Println(len(routes[\"mon\"]), len(routes[\"wed\"]))\n}\n",
   "stdout": "map[mon:[bakery bank] tue:[park]]\n2 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_slices.go",
     "out": "map[mon:[bakery bank] tue:[park]]\n2 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "missing.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoats := map[string]int{\"ana\": 12}\n\tfmt.Println(coats[\"zed\"])\n\tnames := map[int]string{1: \"ana\"}\n\tfmt.Printf(\"%q\\n\", names[9])\n\tpaid := map[string]bool{\"ana\": true}\n\tfmt.Println(paid[\"zed\"])\n\tfmt.Println(len(coats))\n}\n",
   "stdout": "0\n\"\"\nfalse\n1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run missing.go",
     "out": "0\n\"\"\nfalse\n1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nested.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Stats struct {\n\tSTR int\n\tDEX int\n}\n\ntype Hero struct {\n\tName  string\n\tStats Stats\n}\n\nfunc main() {\n\th := Hero{Name: \"Rin\", Stats: Stats{STR: 8, DEX: 12}}\n\th.Stats.DEX++\n\tfmt.Println(h.Stats.DEX)\n\tfmt.Printf(\"%+v\\n\", h)\n}\n",
   "stdout": "13\n{Name:Rin Stats:{STR:8 DEX:13}}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nested.go",
     "out": "13\n{Name:Rin Stats:{STR:8 DEX:13}}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nil_check.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar tally map[string]int\n\tfmt.Println(tally == nil, tally)\n\ttally = map[string]int{}\n\tfmt.Println(tally == nil, tally)\n}\n",
   "stdout": "true map[]\nfalse map[]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nil_check.go",
     "out": "true map[]\nfalse map[]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nil_literal.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttally := map[string]int{}\n\tfmt.Println(\"read:\", tally[\"a\"], len(tally))\n\ttally[\"a\"] = 1\n\tfmt.Println(tally)\n}\n",
   "stdout": "read: 0 0\nmap[a:1]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nil_literal.go",
     "out": "read: 0 0\nmap[a:1]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nil_make.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttally := make(map[string]int)\n\tfmt.Println(\"read:\", tally[\"a\"], len(tally))\n\ttally[\"a\"] = 1\n\tfmt.Println(tally)\n}\n",
   "stdout": "read: 0 0\nmap[a:1]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nil_make.go",
     "out": "read: 0 0\nmap[a:1]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nil_write.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar tally map[string]int\n\tfmt.Println(\"read:\", tally[\"a\"], len(tally))\n\ttally[\"a\"] = 1\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "read: 0 0\n",
   "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/nil_write.go:8 +0xc5\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nil_write.go",
     "out": "read: 0 0\n",
     "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/nil_write.go:8 +0xc5\nexit status 2\n",
     "exit": 1,
     "merged": "read: 0 0\npanic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/nil_write.go:8 +0xc5\nexit status 2\n"
    }
   ]
  },
  "nils.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar s []int\n\tvar m map[string]int\n\tvar err error\n\tvar p *int\n\tfmt.Println(s, m, err, p)\n\tfmt.Printf(\"%#v %#v\\n\", s, m)\n}\n",
   "stdout": "[] map[] <nil> <nil>\n[]int(nil) map[string]int(nil)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nils.go",
     "out": "[] map[] <nil> <nil>\n[]int(nil) map[string]int(nil)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "order.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tm := map[int]bool{}\n\tfor i := 1; i <= 6; i++ {\n\t\tm[i] = true\n\t}\n\tfor round := 1; round <= 5; round++ {\n\t\tfor k := range m {\n\t\t\tfmt.Print(k, \" \")\n\t\t}\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "4 5 6 1 2 3 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n3 4 5 6 1 2 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order.go",
     "out": "4 5 6 1 2 3 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n3 4 5 6 1 2 \n",
     "err": "",
     "exit": 0
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "5 6 1 2 3 4 \n2 3 4 5 6 1 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n4 5 6 1 2 3 \n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run order.go",
      "out": "5 6 1 2 3 4 \n2 3 4 5 6 1 \n1 2 3 4 5 6 \n1 2 3 4 5 6 \n4 5 6 1 2 3 \n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "order_print.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfruit := map[string]int{\"zebra\": 1, \"apple\": 2, \"mango\": 3}\n\tfmt.Println(fruit)\n\tnums := map[int]string{30: \"c\", 10: \"a\", 20: \"b\"}\n\tfmt.Println(nums)\n}\n",
   "stdout": "map[apple:2 mango:3 zebra:1]\nmap[10:a 20:b 30:c]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order_print.go",
     "out": "map[apple:2 mango:3 zebra:1]\nmap[10:a 20:b 30:c]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Box struct {\n\tCount int\n}\n\nfunc main() {\n\tshelf := map[string]Box{\"a1\": {Count: 10}}\n\tb := shelf[\"a1\"]\n\tb.Count -= 3\n\tshelf[\"a1\"] = b\n\tfmt.Println(shelf[\"a1\"].Count)\n}\n",
   "stdout": "7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_fix.go",
     "out": "7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_sorted.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n)\n\nfunc main() {\n\tvotes := map[string]int{\"tea\": 3, \"cocoa\": 5, \"juice\": 1}\n\tnames := slices.Sorted(maps.Keys(votes))\n\tfor _, n := range names {\n\t\tfmt.Println(n, votes[n])\n\t}\n}\n",
   "stdout": "cocoa 5\njuice 1\ntea 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_sorted.go",
     "out": "cocoa 5\njuice 1\ntea 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "party.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\tparty := []Player{\n\t\t{Name: \"Rin\", Level: 3},\n\t\t{Name: \"Oz\", Level: 5},\n\t}\n\tparty = append(party, Player{Name: \"Mo\", Level: 1})\n\tfor i, p := range party {\n\t\tfmt.Println(i, p.Name, p.Level)\n\t}\n\tparty[2].Level = 2\n\tfmt.Println(party)\n}\n",
   "stdout": "0 Rin 3\n1 Oz 5\n2 Mo 1\n[{Rin 3} {Oz 5} {Mo 2}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run party.go",
     "out": "0 Rin 3\n1 Oz 5\n2 Mo 1\n[{Rin 3} {Oz 5} {Mo 2}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "player.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n\tHP    int\n}\n\nfunc main() {\n\thero := Player{Name: \"Rin\", Level: 3, HP: 20}\n\tfmt.Println(hero.Name, hero.Level)\n\thero.HP = hero.HP - 5\n\tfmt.Println(hero)\n\tvar blank Player\n\tfmt.Println(blank)\n\tfmt.Printf(\"%q %d\\n\", blank.Name, blank.HP)\n}\n",
   "stdout": "Rin 3\n{Rin 3 15}\n{ 0 0}\n\"\" 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run player.go",
     "out": "Rin 3\n{Rin 3 15}\n{ 0 0}\n\"\" 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "positional_break.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n\tHP    int\n\tGold  int\n}\n\nfunc main() {\n\tnamed := Player{Name: \"Rin\", Level: 3, HP: 20}\n\told := Player{\"Mo\", 1, 8}\n\tfmt.Println(named, old)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./positional_break.go:14:26: too few values in struct literal of type Player\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run positional_break.go",
     "out": "",
     "err": "# command-line-arguments\n./positional_break.go:14:26: too few values in struct literal of type Player\n",
     "exit": 1
    }
   ]
  },
  "predict_badkey.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvisits := map[[]string]int{}\n\tfmt.Println(len(visits))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./predict_badkey.go:6:16: invalid map key type []string\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run predict_badkey.go",
     "out": "",
     "err": "# command-line-arguments\n./predict_badkey.go:6:16: invalid map key type []string\n",
     "exit": 1
    }
   ]
  },
  "predict_compare.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Card struct {\n\tSuit string\n\tRank int\n}\n\nfunc main() {\n\ta := Card{Suit: \"hearts\", Rank: 7}\n\tb := a\n\tb.Rank = 8\n\tc := Card{\"hearts\", 7}\n\tfmt.Println(a == b, a == c)\n}\n",
   "stdout": "false true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_compare.go",
     "out": "false true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Sheet struct {\n\tName string\n\tHP   int\n}\n\nfunc main() {\n\toriginal := Sheet{Name: \"Rin\", HP: 20}\n\tbackup := original\n\toriginal.HP = 5\n\tbackup.Name = \"Rin (copy)\"\n\tfmt.Println(original)\n\tfmt.Println(backup)\n}\n",
   "stdout": "{Rin 5}\n{Rin (copy) 20}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_copy.go",
     "out": "{Rin 5}\n{Rin (copy) 20}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_delete.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tpets := map[string]string{\"rex\": \"dog\", \"tom\": \"cat\", \"kiki\": \"bird\"}\n\tdelete(pets, \"tom\")\n\tdelete(pets, \"nemo\")\n\tkind, ok := pets[\"tom\"]\n\tfmt.Printf(\"%q %v %d\\n\", kind, ok, len(pets))\n}\n",
   "stdout": "\"\" false 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_delete.go",
     "out": "\"\" false 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_formats.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Item struct {\n\tName  string\n\tCount int\n}\n\nfunc main() {\n\tit := Item{Name: \"rope\", Count: 2}\n\tfmt.Printf(\"%v\\n\", it)\n\tfmt.Printf(\"%+v\\n\", it)\n\tfmt.Printf(\"%T\\n\", it)\n}\n",
   "stdout": "{rope 2}\n{Name:rope Count:2}\nmain.Item\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_formats.go",
     "out": "{rope 2}\n{Name:rope Count:2}\nmain.Item\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_missing.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tages := map[string]int{\"ana\": 9, \"bo\": 11}\n\tages[\"cy\"] = 10\n\tfmt.Println(ages[\"bo\"], ages[\"dee\"])\n\tfmt.Println(len(ages))\n}\n",
   "stdout": "11 0\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_missing.go",
     "out": "11 0\n3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_order.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstock := map[string]int{\"pear\": 4, \"fig\": 9, \"apple\": 2}\n\tstock[\"banana\"] = 6\n\tfmt.Println(stock)\n}\n",
   "stdout": "map[apple:2 banana:6 fig:9 pear:4]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_order.go",
     "out": "map[apple:2 banana:6 fig:9 pear:4]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_zero.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Pet struct {\n\tName string\n\tAge  int\n\tTame bool\n}\n\nfunc main() {\n\tp := Pet{Name: \"Kiki\"}\n\tfmt.Println(p)\n\tfmt.Println(p.Age+1, !p.Tame)\n}\n",
   "stdout": "{Kiki 0 false}\n1 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_zero.go",
     "out": "{Kiki 0 false}\n1 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "range_trap.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Acct struct {\n\tBal int\n}\n\nfunc main() {\n\taccts := []Acct{{Bal: 1}, {Bal: 2}}\n\tfor _, a := range accts {\n\t\ta.Bal += 100\n\t}\n\tfmt.Println(accts)\n\tfor i := range accts {\n\t\taccts[i].Bal += 100\n\t}\n\tfmt.Println(accts)\n}\n",
   "stdout": "[{1} {2}]\n[{101} {102}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run range_trap.go",
     "out": "[{1} {2}]\n[{101} {102}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sorted_keys.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n)\n\nfunc main() {\n\tfruit := map[string]int{\"zebra\": 1, \"apple\": 2, \"mango\": 3}\n\tkeys := slices.Sorted(maps.Keys(fruit))\n\tfmt.Println(keys)\n\tfor _, k := range keys {\n\t\tfmt.Println(k, fruit[k])\n\t}\n}\n",
   "stdout": "[apple mango zebra]\napple 2\nmango 3\nzebra 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sorted_keys.go",
     "out": "[apple mango zebra]\napple 2\nmango 3\nzebra 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_field.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Sheet struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\ts := Sheet{Name: \"Juno\", Level: 2}\n\ts.level = 3\n\tfmt.Println(s)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_field.go:12:4: s.level undefined (type Sheet has no field or method level, but does have field Level)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_field.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_field.go:12:4: s.level undefined (type Sheet has no field or method level, but does have field Level)\n",
     "exit": 1
    }
   ]
  },
  "spot_nil.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar votes map[string]int\n\tfor _, v := range []string{\"tea\", \"jam\", \"tea\"} {\n\t\tvotes[v]++\n\t}\n\tfmt.Println(votes)\n}\n",
   "stdout": "",
   "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/spot_nil.go:8 +0x72\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_nil.go",
     "out": "",
     "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/spot_nil.go:8 +0x72\nexit status 2\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/spot_nil.go:8 +0x85\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run spot_nil.go",
      "out": "",
      "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch12/spot_nil.go:8 +0x85\nexit status 2\n",
      "exit": 1
     }
    ]
   }
  },
  "spot_nil_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvotes := map[string]int{}\n\tfor _, v := range []string{\"tea\", \"jam\", \"tea\"} {\n\t\tvotes[v]++\n\t}\n\tfmt.Println(votes)\n}\n",
   "stdout": "map[jam:1 tea:2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_nil_fix.go",
     "out": "map[jam:1 tea:2]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_range.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\tparty := []Player{{Name: \"Rin\", Level: 3}, {Name: \"Oz\", Level: 5}}\n\tfor _, p := range party {\n\t\tp.Level++\n\t}\n\tfmt.Println(party)\n}\n",
   "stdout": "[{Rin 3} {Oz 5}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_range.go",
     "out": "[{Rin 3} {Oz 5}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_range_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\tparty := []Player{{Name: \"Rin\", Level: 3}, {Name: \"Oz\", Level: 5}}\n\tfor i := range party {\n\t\tparty[i].Level++\n\t}\n\tfmt.Println(party)\n}\n",
   "stdout": "[{Rin 4} {Oz 6}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_range_fix.go",
     "out": "[{Rin 4} {Oz 6}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "struct_or_map.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Sheet struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\trin := Sheet{Name: \"Rin\", Level: 3}\n\tfmt.Println(rin.Level)\n\tinventory := map[string]int{\"rope\": 1, \"apple\": 4}\n\tinventory[\"torch\"] = 2\n\tfmt.Println(inventory)\n}\n",
   "stdout": "3\nmap[apple:4 rope:1 torch:2]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run struct_or_map.go",
     "out": "3\nmap[apple:4 rope:1 torch:2]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_count.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tcounts := map[string]int{}\n\tfor _, w := range strings.Fields(\"go fish go go fish\") {\n\t\tcounts[w]++\n\t\tfmt.Println(w, counts[w], len(counts))\n\t}\n}\n",
   "stdout": "go 1 1\nfish 1 2\ngo 2 2\ngo 3 2\nfish 2 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_count.go",
     "out": "go 1 1\nfish 1 2\ngo 2 2\ngo 3 2\nfish 2 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_party.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName string\n\tHP   int\n}\n\nfunc main() {\n\tparty := []Player{{\"Rin\", 20}, {\"Oz\", 15}, {\"Mo\", 9}}\n\tfor i := range party {\n\t\tparty[i].HP -= 4\n\t\tfmt.Println(i, party[i].Name, party[i].HP)\n\t}\n}\n",
   "stdout": "0 Rin 16\n1 Oz 11\n2 Mo 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_party.go",
     "out": "0 Rin 16\n1 Oz 11\n2 Mo 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unexported.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"goch12/till\"\n)\n\nfunc main() {\n\tc := till.Counter{Name: \"front\"}\n\tfmt.Println(c.Name)\n\tfmt.Println(c.total)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./unexported.go:11:16: c.total undefined (cannot refer to unexported field total)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unexported.go",
     "out": "",
     "err": "# command-line-arguments\n./unexported.go:11:16: c.total undefined (cannot refer to unexported field total)\n",
     "exit": 1
    }
   ]
  },
  "unknown_field.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Player struct {\n\tName  string\n\tLevel int\n}\n\nfunc main() {\n\tp := Player{Name: \"Rin\", Lvl: 3}\n\tfmt.Println(p)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./unknown_field.go:11:27: unknown field Lvl in struct literal of type Player\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unknown_field.go",
     "out": "",
     "err": "# command-line-arguments\n./unknown_field.go:11:27: unknown field Lvl in struct literal of type Player\n",
     "exit": 1
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
