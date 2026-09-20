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
  "workdir": "/home/you/go-ch6",
  "versionDifferences": [
   "obo.go",
   "picker_var.go",
   "spot_obo.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): obo.go, picker_var.go, spot_obo.go."
 },
 "programs": {
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttotal := 0\n\tfor i := 1; i <= 3; i++ {\n\t\ttotal += i\n\t}\n\tif total > 5 {\n\t\tbreak\n\t}\n\tfmt.Println(total)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:11:3: break is not in a loop, switch, or select\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:11:3: break is not in a loop, switch, or select\n",
     "exit": 1
    }
   ]
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\nsearch:\n\tfor a := 1; a <= 9; a++ {\n\t\tfor b := a; b <= 9; b++ {\n\t\t\tif a*b == 24 && a+b == 10 {\n\t\t\t\tfmt.Println(a, b)\n\t\t\t\tbreak search\n\t\t\t}\n\t\t}\n\t}\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "4 6\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "4 6\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tnums := [5]int{3, 8, 1, 9, 4}\n\tbiggest := nums[0]\n\tfor _, n := range nums {\n\t\tif n > biggest {\n\t\t\tbiggest = n\n\t\t}\n\t}\n\tfmt.Println(\"biggest:\", biggest)\n}\n",
   "stdout": "biggest: 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "biggest: 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tfor j := 1; j <= 3; j++ {\n\t\t\tif j == i {\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tfmt.Printf(\"%d%d \", i, j)\n\t\t}\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "12 13 \n21 23 \n31 32 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "12 13 \n21 23 \n31 32 \n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t// Serve drinks, but stop at the first empty cup\n\tcups := [5]string{\"tea\", \"milk\", \"\", \"juice\", \"soda\"}\n\tfor i, cup := range cups {\n\t\tswitch cup {\n\t\tcase \"\":\n\t\t\tfmt.Println(\"empty cup at\", i)\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(\"serve\", cup)\n\t}\n}\n",
   "stdout": "serve tea\nserve milk\nempty cup at 2\nserve \nserve juice\nserve soda\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "serve tea\nserve milk\nempty cup at 2\nserve \nserve juice\nserve soda\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tn := 100\n\tsteps := 0\n\tfor n > 1 {\n\t\tif n%2 == 0 {\n\t\t\tn = n / 2\n\t\t} else {\n\t\t\tn = n - 1\n\t\t}\n\t\tsteps++\n\t\tfmt.Println(steps, n)\n\t}\n}\n",
   "stdout": "1 50\n2 25\n3 24\n4 12\n5 6\n6 3\n7 2\n8 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "1 50\n2 25\n3 24\n4 12\n5 6\n6 3\n7 2\n8 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "carton.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar eggs [3]string\n\tfmt.Println(len(eggs))\n\teggs[0] = \"brown\"\n\teggs[2] = \"white\"\n\tfmt.Println(eggs)\n\tfmt.Printf(\"%q\\n\", eggs)\n\tfmt.Println(eggs[0], \"and\", eggs[2])\n}\n",
   "stdout": "3\n[brown  white]\n[\"brown\" \"\" \"white\"]\nbrown and white\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run carton.go",
     "out": "3\n[brown  white]\n[\"brown\" \"\" \"white\"]\nbrown and white\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compare.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := [3]int{1, 2, 3}\n\tb := [3]int{1, 2, 3}\n\tc := [3]int{3, 2, 1}\n\tfmt.Println(a == b)\n\tfmt.Println(a == c)\n\tb[2] = 0\n\tfmt.Println(a == b, b)\n}\n",
   "stdout": "true\nfalse\nfalse [1 2 0]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run compare.go",
     "out": "true\nfalse\nfalse [1 2 0]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compare_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := [3]int{1, 2, 3}\n\td := [4]int{1, 2, 3, 0}\n\tfmt.Println(a == d)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./compare_err.go:8:19: invalid operation: a == d (mismatched types [3]int and [4]int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run compare_err.go",
     "out": "",
     "err": "# command-line-arguments\n./compare_err.go:8:19: invalid operation: a == d (mismatched types [3]int and [4]int)\n",
     "exit": 1
    }
   ]
  },
  "const_idx.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [3]string{\"brown\", \"white\", \"blue\"}\n\tfmt.Println(\"checking the eggs\")\n\tfmt.Println(eggs[3])\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./const_idx.go:8:19: invalid argument: index 3 out of bounds [0:3]\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run const_idx.go",
     "out": "",
     "err": "# command-line-arguments\n./const_idx.go:8:19: invalid argument: index 3 out of bounds [0:3]\n",
     "exit": 1
    }
   ]
  },
  "cont_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tparcels := 0\n\tif parcels == 0 {\n\t\tcontinue\n\t}\n\tfmt.Println(parcels)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./cont_err.go:8:3: continue is not in a loop\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run cont_err.go",
     "out": "",
     "err": "# command-line-arguments\n./cont_err.go:8:3: continue is not in a loop\n",
     "exit": 1
    }
   ]
  },
  "copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta := [3]int{1, 2, 3}\n\tb := a\n\tb[0] = 9\n\tfmt.Println(\"a:\", a)\n\tfmt.Println(\"b:\", b)\n}\n",
   "stdout": "a: [1 2 3]\nb: [9 2 3]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copy.go",
     "out": "a: [1 2 3]\nb: [9 2 3]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "copypaste.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Deliver to house 1\")\n\tfmt.Println(\"Deliver to house 2\")\n\tfmt.Println(\"Deliver to house 3\")\n\tfmt.Println(\"Deliver to house 4\")\n\tfmt.Println(\"Deliver to house 5\")\n}\n",
   "stdout": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nDeliver to house 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run copypaste.go",
     "out": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nDeliver to house 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "count_rule.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ta, b, c := 0, 0, 0\n\tfor i := 0; i < 5; i++ {\n\t\ta++\n\t}\n\tfor i := 1; i <= 5; i++ {\n\t\tb++\n\t}\n\tfor i := 1; i < 5; i++ {\n\t\tc++\n\t}\n\tfmt.Println(a, b, c)\n}\n",
   "stdout": "5 5 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run count_rule.go",
     "out": "5 5 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_bounds.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor n := 1; n <= 5; n++ {\n\t\tfmt.Println(n, \"squared is\", n*n)\n\t}\n}\n",
   "stdout": "1 squared is 1\n2 squared is 4\n3 squared is 9\n4 squared is 16\n5 squared is 25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_bounds.go",
     "out": "1 squared is 1\n2 squared is 4\n3 squared is 9\n4 squared is 16\n5 squared is 25\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_dots.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tnums := [...]int{4, 8, 15, 16}\n\tfmt.Println(nums, len(nums))\n}\n",
   "stdout": "[4 8 15 16] 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_dots.go",
     "out": "[4 8 15 16] 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "find.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor house := 15; house <= 30; house++ {\n\t\tif house%7 == 0 {\n\t\t\tfmt.Println(\"Found it:\", house)\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(\"Not\", house)\n\t}\n\tfmt.Println(\"Back on the bike\")\n}\n",
   "stdout": "Not 15\nNot 16\nNot 17\nNot 18\nNot 19\nNot 20\nFound it: 21\nBack on the bike\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run find.go",
     "out": "Not 15\nNot 16\nNot 17\nNot 18\nNot 19\nNot 20\nFound it: 21\nBack on the bike\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fizzbuzz.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 15; i++ {\n\t\tswitch {\n\t\tcase i%15 == 0:\n\t\t\tfmt.Println(\"FizzBuzz\")\n\t\tcase i%3 == 0:\n\t\t\tfmt.Println(\"Fizz\")\n\t\tcase i%5 == 0:\n\t\t\tfmt.Println(\"Buzz\")\n\t\tdefault:\n\t\t\tfmt.Println(i)\n\t\t}\n\t}\n}\n",
   "stdout": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fizzbuzz.go",
     "out": "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forever.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tn := 6\n\tsteps := 0\n\tfor {\n\t\tif n == 1 {\n\t\t\tbreak\n\t\t}\n\t\tif n%2 == 0 {\n\t\t\tn = n / 2\n\t\t} else {\n\t\t\tn = 3*n + 1\n\t\t}\n\t\tsteps++\n\t\tfmt.Println(n)\n\t}\n\tfmt.Println(\"reached 1 in\", steps, \"steps\")\n}\n",
   "stdout": "3\n10\n5\n16\n8\n4\n2\n1\nreached 1 in 8 steps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run forever.go",
     "out": "3\n10\n5\n16\n8\n4\n2\n1\nreached 1 in 8 steps\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "grid.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar board [3][3]string\n\tfor r := 0; r < 3; r++ {\n\t\tfor c := 0; c < 3; c++ {\n\t\t\tboard[r][c] = \".\"\n\t\t}\n\t}\n\tboard[1][1] = \"X\"\n\tboard[0][2] = \"O\"\n\tfor _, row := range board {\n\t\tfmt.Println(row)\n\t}\n\tfmt.Println(len(board), len(board[0]))\n}\n",
   "stdout": "[. . O]\n[. X .]\n[. . .]\n3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run grid.go",
     "out": "[. . O]\n[. X .]\n[. . .]\n3 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "label_unused.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\nlaps:\n\tfor i := 0; i < 2; i++ {\n\t\tfmt.Println(i)\n\t}\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./label_unused.go:6:1: label laps defined and not used\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run label_unused.go",
     "out": "",
     "err": "# command-line-arguments\n./label_unused.go:6:1: label laps defined and not used\n",
     "exit": 1
    }
   ]
  },
  "labels.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\nshelves:\n\tfor shelf := 1; shelf <= 3; shelf++ {\n\t\tfor slot := 1; slot <= 3; slot++ {\n\t\t\tfmt.Println(\"check\", shelf, slot)\n\t\t\tif shelf == 2 && slot == 2 {\n\t\t\t\tfmt.Println(\"found it!\")\n\t\t\t\tbreak shelves\n\t\t\t}\n\t\t}\n\t}\n\tfmt.Println(\"off to deliver\")\n}\n",
   "stdout": "check 1 1\ncheck 1 2\ncheck 1 3\ncheck 2 1\ncheck 2 2\nfound it!\noff to deliver\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run labels.go",
     "out": "check 1 1\ncheck 1 2\ncheck 1 3\ncheck 2 1\ncheck 2 2\nfound it!\noff to deliver\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "labels_plain.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor shelf := 1; shelf <= 3; shelf++ {\n\t\tfor slot := 1; slot <= 3; slot++ {\n\t\t\tfmt.Println(\"check\", shelf, slot)\n\t\t\tif shelf == 2 && slot == 2 {\n\t\t\t\tfmt.Println(\"found it!\")\n\t\t\t\tbreak\n\t\t\t}\n\t\t}\n\t}\n\tfmt.Println(\"off to deliver\")\n}\n",
   "stdout": "check 1 1\ncheck 1 2\ncheck 1 3\ncheck 2 1\ncheck 2 2\nfound it!\ncheck 3 1\ncheck 3 2\ncheck 3 3\noff to deliver\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run labels_plain.go",
     "out": "check 1 1\ncheck 1 2\ncheck 1 3\ncheck 2 1\ncheck 2 2\nfound it!\ncheck 3 1\ncheck 3 2\ncheck 3 3\noff to deliver\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "laps.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor house := 1; house <= 5; house++ {\n\t\tfmt.Println(\"Deliver to house\", house)\n\t}\n\tfmt.Println(\"All done!\")\n}\n",
   "stdout": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nDeliver to house 5\nAll done!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run laps.go",
     "out": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nDeliver to house 5\nAll done!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "literals.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscores := [3]int{90, 75, 82}\n\tdays := [...]string{\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"}\n\tfew := [5]int{1, 2}\n\tfmt.Println(scores, len(scores))\n\tfmt.Println(days, len(days))\n\tfmt.Println(few)\n\tfmt.Printf(\"%T %T %T\\n\", scores, days, few)\n}\n",
   "stdout": "[90 75 82] 3\n[Mon Tue Wed Thu Fri] 5\n[1 2 0 0 0]\n[3]int [5]string [5]int\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run literals.go",
     "out": "[90 75 82] 3\n[Mon Tue Wed Thu Fri] 5\n[1 2 0 0 0]\n[3]int [5]string [5]int\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_plain.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tfmt.Println(\"lap\", i)\n\t}\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "lap 1\nlap 2\nlap 3\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_plain.go",
     "out": "lap 1\nlap 2\nlap 3\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_skip.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tif i == 2 {\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Println(\"lap\", i)\n\t}\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "lap 1\nlap 3\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_skip.go",
     "out": "lap 1\nlap 3\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "map_stop.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tif i == 2 {\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(\"lap\", i)\n\t}\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "lap 1\ndone\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run map_stop.go",
     "out": "lap 1\ndone\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "obo.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [3]string{\"brown\", \"white\", \"blue\"}\n\tfor i := 0; i <= len(eggs); i++ {\n\t\tfmt.Println(eggs[i])\n\t}\n\tfmt.Println(\"all eggs checked\")\n}\n",
   "stdout": "brown\nwhite\nblue\n",
   "stderr": "panic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0xff\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run obo.go",
     "out": "brown\nwhite\nblue\n",
     "err": "panic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0xff\nexit status 2\n",
     "exit": 1,
     "merged": "brown\nwhite\nblue\npanic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0xff\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "brown\nwhite\nblue\n",
    "stderr": "panic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0x11b\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run obo.go",
      "out": "brown\nwhite\nblue\n",
      "err": "panic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0x11b\nexit status 2\n",
      "exit": 1,
      "merged": "brown\nwhite\nblue\npanic: runtime error: index out of range [3] with length 3\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/obo.go:8 +0x11b\nexit status 2\n"
     }
    ]
   }
  },
  "parsons_table.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tfor row := 1; row <= 3; row++ {\n\t\tfor star := 1; star <= row; star++ {\n\t\t\tfmt.Print(\"*\")\n\t\t}\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "*\n**\n***\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_table.go",
     "out": "*\n**\n***\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_while.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tfuel := 10\n\tfor fuel > 0 {\n\t\tfmt.Println(\"fuel:\", fuel)\n\t\tfuel = fuel - 4\n\t}\n\tfmt.Println(\"refuel!\")\n}\n",
   "stdout": "fuel: 10\nfuel: 6\nfuel: 2\nrefuel!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_while.go",
     "out": "fuel: 10\nfuel: 6\nfuel: 2\nrefuel!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "picker.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [4]string{\"brown\", \"white\", \"speckled\", \"blue\"}\n\tfmt.Println(eggs[0])\n\tfmt.Println(eggs[1])\n\tfmt.Println(eggs[len(eggs)-1])\n}\n",
   "stdout": "brown\nwhite\nblue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run picker.go",
     "out": "brown\nwhite\nblue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "picker_const.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [4]string{\"brown\", \"white\", \"speckled\", \"blue\"}\n\tfmt.Println(eggs[4])\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./picker_const.go:7:19: invalid argument: index 4 out of bounds [0:4]\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run picker_const.go",
     "out": "",
     "err": "# command-line-arguments\n./picker_const.go:7:19: invalid argument: index 4 out of bounds [0:4]\n",
     "exit": 1
    }
   ]
  },
  "picker_var.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [4]string{\"brown\", \"white\", \"speckled\", \"blue\"}\n\ti := 4\n\tfmt.Println(eggs[i])\n}\n",
   "stdout": "",
   "stderr": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/picker_var.go:8 +0x9\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run picker_var.go",
     "out": "",
     "err": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/picker_var.go:8 +0x9\nexit status 2\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/picker_var.go:8 +0x15\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run picker_var.go",
      "out": "",
      "err": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/picker_var.go:8 +0x15\nexit status 2\n",
      "exit": 1
     }
    ]
   }
  },
  "plusplus_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tlap := 1\n\tnext := lap++\n\tfmt.Println(next)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./plusplus_err.go:7:13: syntax error: unexpected ++ at end of statement\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run plusplus_err.go",
     "out": "",
     "err": "# command-line-arguments\n./plusplus_err.go:7:13: syntax error: unexpected ++ at end of statement\n",
     "exit": 1
    }
   ]
  },
  "predict_constidx.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tprices := [5]int{5, 7, 9, 4, 6}\n\ttotal := prices[1] + prices[2] + prices[3] + prices[4] + prices[5]\n\tfmt.Println(total)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./predict_constidx.go:7:66: invalid argument: index 5 out of bounds [0:5]\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run predict_constidx.go",
     "out": "",
     "err": "# command-line-arguments\n./predict_constidx.go:7:66: invalid argument: index 5 out of bounds [0:5]\n",
     "exit": 1
    }
   ]
  },
  "predict_copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tweek := [3]string{\"rain\", \"sun\", \"fog\"}\n\tplan := week\n\tplan[1] = \"snow\"\n\tweek[2] = \"wind\"\n\tfmt.Println(week)\n\tfmt.Println(plan)\n}\n",
   "stdout": "[rain sun wind]\n[rain snow fog]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_copy.go",
     "out": "[rain sun wind]\n[rain snow fog]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_countdown.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor n := 3; n > 0; n-- {\n\t\tfmt.Println(n)\n\t}\n\tfmt.Println(\"Go!\")\n}\n",
   "stdout": "3\n2\n1\nGo!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_countdown.go",
     "out": "3\n2\n1\nGo!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_fizz.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 9; i <= 15; i++ {\n\t\tswitch {\n\t\tcase i%15 == 0:\n\t\t\tfmt.Println(\"FizzBuzz\")\n\t\tcase i%3 == 0:\n\t\t\tfmt.Println(\"Fizz\")\n\t\tcase i%5 == 0:\n\t\t\tfmt.Println(\"Buzz\")\n\t\tdefault:\n\t\t\tfmt.Println(i)\n\t\t}\n\t}\n}\n",
   "stdout": "Fizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_fizz.go",
     "out": "Fizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_range.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := range 4 {\n\t\tfmt.Println(i * 10)\n\t}\n\tfor range 2 {\n\t\tfmt.Println(\"hop\")\n\t}\n}\n",
   "stdout": "0\n10\n20\n30\nhop\nhop\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_range.go",
     "out": "0\n10\n20\n30\nhop\nhop\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_skip.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor n := 1; n <= 10; n++ {\n\t\tif n%2 == 1 {\n\t\t\tcontinue\n\t\t}\n\t\tif n > 6 {\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(n)\n\t}\n\tfmt.Println(\"end\")\n}\n",
   "stdout": "2\n4\n6\nend\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_skip.go",
     "out": "2\n4\n6\nend\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_sum.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tweights := [4]int{50, 62, 58, 70}\n\ttotal := 0\n\tfor _, w := range weights {\n\t\ttotal += w\n\t}\n\tfmt.Println(\"total:\", total)\n}\n",
   "stdout": "total: 240\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_sum.go",
     "out": "total: 240\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_while.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tn := 50\n\tfor n > 5 {\n\t\tn = n / 3\n\t\tfmt.Println(n)\n\t}\n}\n",
   "stdout": "16\n5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_while.go",
     "out": "16\n5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "preinc_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcount := 3\n\t++count\n\tfmt.Println(count)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./preinc_err.go:7:2: syntax error: unexpected ++, expected }\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run preinc_err.go",
     "out": "",
     "err": "# command-line-arguments\n./preinc_err.go:7:2: syntax error: unexpected ++, expected }\n",
     "exit": 1
    }
   ]
  },
  "range_arr.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\teggs := [4]string{\"brown\", \"white\", \"speckled\", \"blue\"}\n\tfor i, egg := range eggs {\n\t\tfmt.Println(i, egg)\n\t}\n}\n",
   "stdout": "0 brown\n1 white\n2 speckled\n3 blue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run range_arr.go",
     "out": "0 brown\n1 white\n2 speckled\n3 blue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "range_int.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := range 3 {\n\t\tfmt.Println(\"Lap\", i)\n\t}\n\tfor range 2 {\n\t\tfmt.Println(\"Beep!\")\n\t}\n}\n",
   "stdout": "Lap 0\nLap 1\nLap 2\nBeep!\nBeep!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run range_int.go",
     "out": "Lap 0\nLap 1\nLap 2\nBeep!\nBeep!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "s_rangeold.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := range 3 {\n\t\tfmt.Println(\"Lap\", i)\n\t}\n}\n",
   "stdout": "",
   "stderr": "# example/oldlaps\n./main.go:6:17: cannot range over 3 (untyped int constant): requires go1.22 or later (-lang was set to go1.21; check go.mod)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cat go.mod",
     "out": "module example/oldlaps\n\ngo 1.21\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch6/oldlaps"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/oldlaps\n./main.go:6:17: cannot range over 3 (untyped int constant): requires go1.22 or later (-lang was set to go1.21; check go.mod)\n",
     "exit": 1,
     "dir": "~/go-ch6/oldlaps"
    }
   ]
  },
  "saving.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcoins := 1\n\tdays := 0\n\tfor coins < 100 {\n\t\tcoins = coins * 2\n\t\tdays++\n\t}\n\tfmt.Println(\"days:\", days, \"coins:\", coins)\n}\n",
   "stdout": "days: 7 coins: 128\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run saving.go",
     "out": "days: 7 coins: 128\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "skip.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor parcel := 1; parcel <= 6; parcel++ {\n\t\tif parcel%3 == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Println(\"Deliver parcel\", parcel)\n\t}\n\tfmt.Println(\"Van takes 3 and 6\")\n}\n",
   "stdout": "Deliver parcel 1\nDeliver parcel 2\nDeliver parcel 4\nDeliver parcel 5\nVan takes 3 and 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run skip.go",
     "out": "Deliver parcel 1\nDeliver parcel 2\nDeliver parcel 4\nDeliver parcel 5\nVan takes 3 and 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_fence.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t// Deliver to houses 1 to 5, then go home\n\tfor house := 1; house < 5; house++ {\n\t\tfmt.Println(\"Deliver to house\", house)\n\t}\n\tfmt.Println(\"Home!\")\n}\n",
   "stdout": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nHome!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_fence.go",
     "out": "Deliver to house 1\nDeliver to house 2\nDeliver to house 3\nDeliver to house 4\nHome!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_obo.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstops := [4]string{\"bakery\", \"school\", \"park\", \"zoo\"}\n\tfor i := 1; i <= len(stops); i++ {\n\t\tfmt.Println(\"Next stop:\", stops[i])\n\t}\n}\n",
   "stdout": "Next stop: school\nNext stop: park\nNext stop: zoo\n",
   "stderr": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x116\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_obo.go",
     "out": "Next stop: school\nNext stop: park\nNext stop: zoo\n",
     "err": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x116\nexit status 2\n",
     "exit": 1,
     "merged": "Next stop: school\nNext stop: park\nNext stop: zoo\npanic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x116\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Next stop: school\nNext stop: park\nNext stop: zoo\n",
    "stderr": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x12b\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run spot_obo.go",
      "out": "Next stop: school\nNext stop: park\nNext stop: zoo\n",
      "err": "panic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x12b\nexit status 2\n",
      "exit": 1,
      "merged": "Next stop: school\nNext stop: park\nNext stop: zoo\npanic: runtime error: index out of range [4] with length 4\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch6/spot_obo.go:8 +0x12b\nexit status 2\n"
     }
    ]
   }
  },
  "steps.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 0; i <= 10; i += 5 {\n\t\tfmt.Println(\"i is\", i)\n\t}\n\tscore := 7\n\tscore++\n\tscore--\n\tscore--\n\tfmt.Println(\"score:\", score)\n}\n",
   "stdout": "i is 0\ni is 5\ni is 10\nscore: 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run steps.go",
     "out": "i is 0\ni is 5\ni is 10\nscore: 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sum.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttotal := 0\n\tfor i := 1; i <= 4; i++ {\n\t\ttotal = total + i\n\t}\n\tfmt.Println(\"total:\", total)\n}\n",
   "stdout": "total: 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sum.go",
     "out": "total: 10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "switch_label.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\nlaps:\n\tfor i := 0; i < 3; i++ {\n\t\tswitch i {\n\t\tcase 1:\n\t\t\tfmt.Println(\"stop!\")\n\t\t\tbreak laps\n\t\t}\n\t\tfmt.Println(i)\n\t}\n}\n",
   "stdout": "0\nstop!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run switch_label.go",
     "out": "0\nstop!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "switch_trap.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 0; i < 3; i++ {\n\t\tswitch i {\n\t\tcase 1:\n\t\t\tfmt.Println(\"stop!\")\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(i)\n\t}\n}\n",
   "stdout": "0\nstop!\n1\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run switch_trap.go",
     "out": "0\nstop!\n1\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "table.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor row := 1; row <= 4; row++ {\n\t\tfor col := 1; col <= 4; col++ {\n\t\t\tfmt.Printf(\"%4d\", row*col)\n\t\t}\n\t\tfmt.Println()\n\t}\n}\n",
   "stdout": "   1   2   3   4\n   2   4   6   8\n   3   6   9  12\n   4   8  12  16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run table.go",
     "out": "   1   2   3   4\n   2   4   6   8\n   3   6   9  12\n   4   8  12  16\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_laps.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstamps := 1\n\tfor day := 1; day <= 5; day++ {\n\t\tstamps = stamps * 2\n\t\tfmt.Println(day, stamps)\n\t}\n}\n",
   "stdout": "1 2\n2 4\n3 8\n4 16\n5 32\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_laps.go",
     "out": "1 2\n2 4\n3 8\n4 16\n5 32\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_nested.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tfor j := i; j <= 3; j++ {\n\t\t\tfmt.Println(i, j)\n\t\t}\n\t}\n}\n",
   "stdout": "1 1\n1 2\n1 3\n2 2\n2 3\n3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_nested.go",
     "out": "1 1\n1 2\n1 3\n2 2\n2 3\n3 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "type_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tsmall := [3]int{1, 2, 3}\n\tvar big [4]int\n\tbig = small\n\tfmt.Println(big)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./type_err.go:8:8: cannot use small (variable of type [3]int) as [4]int value in assignment\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run type_err.go",
     "out": "",
     "err": "# command-line-arguments\n./type_err.go:8:8: cannot use small (variable of type [3]int) as [4]int value in assignment\n",
     "exit": 1
    }
   ]
  },
  "walk_laps.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Ready\")\n\tfor lap := 1; lap <= 3; lap++ {\n\t\tfmt.Println(\"Lap\", lap)\n\t}\n\tfmt.Println(\"Finish!\")\n}\n",
   "stdout": "Ready\nLap 1\nLap 2\nLap 3\nFinish!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run walk_laps.go",
     "out": "Ready\nLap 1\nLap 2\nLap 3\nFinish!\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
