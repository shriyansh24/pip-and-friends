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
  "workdir": "/home/you/go-ch7",
  "versionDifferences": [
   "args.go",
   "share_zero.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): args.go, share_zero.go."
 },
 "programs": {
  "area.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// area returns the size of a w-by-h rectangle.\nfunc area(w int, h int) int {\n\treturn w * h\n}\n\nfunc main() {\n\ta := area(3, 4)\n\tfmt.Println(\"a:\", a)\n\tfmt.Println(\"double:\", area(5, 2)*2)\n\ttotal := area(2, 2) + area(3, 3)\n\tfmt.Println(\"total:\", total)\n}\n",
   "stdout": "a: 12\ndouble: 20\ntotal: 13\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run area.go",
     "out": "a: 12\ndouble: 20\ntotal: 13\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "args.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"words:\", len(os.Args))\n\tfmt.Println(\"yours:\", os.Args[1:])\n\tfmt.Println(\"first:\", os.Args[1])\n}\n",
   "stdout": "words: 1\nyours: []\n",
   "stderr": "panic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x19a\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run args.go Ada 3",
     "out": "words: 3\nyours: [Ada 3]\nfirst: Ada\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "go run args.go",
     "out": "words: 1\nyours: []\n",
     "err": "panic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x19a\nexit status 2\n",
     "exit": 1,
     "merged": "words: 1\nyours: []\npanic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x19a\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "words: 1\nyours: []\n",
    "stderr": "panic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x198\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run args.go Ada 3",
      "out": "words: 3\nyours: [Ada 3]\nfirst: Ada\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "go run args.go",
      "out": "words: 1\nyours: []\n",
      "err": "panic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x198\nexit status 2\n",
      "exit": 1,
      "merged": "words: 1\nyours: []\npanic: runtime error: index out of range [1] with length 1\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch7/args.go:11 +0x198\nexit status 2\n"
     }
    ]
   }
  },
  "args_few.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc area(w, h int) int {\n\treturn w * h\n}\n\nfunc main() {\n\tfmt.Println(area(3))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./args_few.go:10:19: not enough arguments in call to area\n\thave (number)\n\twant (int, int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run args_few.go",
     "out": "",
     "err": "# command-line-arguments\n./args_few.go:10:19: not enough arguments in call to area\n\thave (number)\n\twant (int, int)\n",
     "exit": 1
    }
   ]
  },
  "args_type.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc area(w, h int) int {\n\treturn w * h\n}\n\nfunc main() {\n\tfmt.Println(area(\"3\", 4))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./args_type.go:10:19: cannot use \"3\" (untyped string constant) as int value in argument to area\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run args_type.go",
     "out": "",
     "err": "# command-line-arguments\n./args_type.go:10:19: cannot use \"3\" (untyped string constant) as int value in argument to area\n",
     "exit": 1
    }
   ]
  },
  "atoi.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn, err := strconv.Atoi(\"42\")\n\tfmt.Println(n+1, err)\n}\n",
   "stdout": "43 <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atoi.go",
     "out": "43 <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "atoi_machine.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn, err := strconv.Atoi(\"42\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"-7\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"007\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"abc\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"3.5\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\" 42\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"\")\n\tfmt.Println(n, err)\n\tn, err = strconv.Atoi(\"99999999999999999999\")\n\tfmt.Println(n, err)\n}\n",
   "stdout": "42 <nil>\n-7 <nil>\n7 <nil>\n0 strconv.Atoi: parsing \"abc\": invalid syntax\n0 strconv.Atoi: parsing \"3.5\": invalid syntax\n0 strconv.Atoi: parsing \" 42\": invalid syntax\n0 strconv.Atoi: parsing \"\": invalid syntax\n9223372036854775807 strconv.Atoi: parsing \"99999999999999999999\": value out of range\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atoi_machine.go",
     "out": "42 <nil>\n-7 <nil>\n7 <nil>\n0 strconv.Atoi: parsing \"abc\": invalid syntax\n0 strconv.Atoi: parsing \"3.5\": invalid syntax\n0 strconv.Atoi: parsing \" 42\": invalid syntax\n0 strconv.Atoi: parsing \"\": invalid syntax\n9223372036854775807 strconv.Atoi: parsing \"99999999999999999999\": value out of range\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "atoi_mismatch.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn := strconv.Atoi(\"42\")\n\tfmt.Println(n + 1)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./atoi_mismatch.go:9:7: assignment mismatch: 1 variable but strconv.Atoi returns 2 values\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run atoi_mismatch.go",
     "out": "",
     "err": "# command-line-arguments\n./atoi_mismatch.go:9:7: assignment mismatch: 1 variable but strconv.Atoi returns 2 values\n",
     "exit": 1
    }
   ]
  },
  "atoi_sum.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"First number: \")\n\tscanner.Scan()\n\ta, errA := strconv.Atoi(scanner.Text())\n\tfmt.Print(\"Second number: \")\n\tscanner.Scan()\n\tb, errB := strconv.Atoi(scanner.Text())\n\tfmt.Println(\"Sum:\", a+b)\n\tfmt.Println(\"Errors:\", errA, errB)\n}\n",
   "stdout": "First number: Second number: Sum: 8\nErrors: <nil> <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atoi_sum.go",
     "out": "First number: Second number: Sum: 8\nErrors: <nil> <nil>\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "5\n3\n",
   "screen": "First number: 5\nSecond number: 3\nSum: 8\nErrors: <nil> <nil>\n"
  },
  "atoi_sum_bad.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"First number: \")\n\tscanner.Scan()\n\ta, errA := strconv.Atoi(scanner.Text())\n\tfmt.Print(\"Second number: \")\n\tscanner.Scan()\n\tb, errB := strconv.Atoi(scanner.Text())\n\tfmt.Println(\"Sum:\", a+b)\n\tfmt.Println(\"Errors:\", errA, errB)\n}\n",
   "stdout": "First number: Second number: Sum: 5\nErrors: <nil> strconv.Atoi: parsing \"three\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run atoi_sum_bad.go",
     "out": "First number: Second number: Sum: 5\nErrors: <nil> strconv.Atoi: parsing \"three\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "5\nthree\n",
   "screen": "First number: 5\nSecond number: three\nSum: 5\nErrors: <nil> strconv.Atoi: parsing \"three\": invalid syntax\n"
  },
  "atoi_unused.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn, err := strconv.Atoi(\"42\")\n\tfmt.Println(n + 1)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./atoi_unused.go:9:5: declared and not used: err\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run atoi_unused.go",
     "out": "",
     "err": "# command-line-arguments\n./atoi_unused.go:9:5: declared and not used: err\n",
     "exit": 1
    }
   ]
  },
  "blank.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc divide(sweets, kids int) (int, int) {\n\treturn sweets / kids, sweets % kids\n}\n\nfunc main() {\n\teach, _ := divide(17, 5)\n\tfmt.Println(\"each kid gets\", each)\n\t_, left := divide(17, 5)\n\tfmt.Println(\"the dog gets\", left)\n}\n",
   "stdout": "each kid gets 3\nthe dog gets 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run blank.go",
     "out": "each kid gets 3\nthe dog gets 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_atoi.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\ta, errA := strconv.Atoi(strings.TrimSpace(\" 40 \"))\n\tb, errB := strconv.Atoi(\"2 \")\n\tfmt.Println(a+b, errA)\n\tfmt.Println(b, errB)\n}\n",
   "stdout": "40 <nil>\n0 strconv.Atoi: parsing \"2 \": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_atoi.go",
     "out": "40 <nil>\n0 strconv.Atoi: parsing \"2 \": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// stats returns the sum and the biggest of three numbers.\nfunc stats(a, b, c int) (sum, biggest int) {\n\tsum = a + b + c\n\tbiggest = a\n\tif b > biggest {\n\t\tbiggest = b\n\t}\n\tif c > biggest {\n\t\tbiggest = c\n\t}\n\treturn\n}\n\nfunc main() {\n\ts, big := stats(4, 9, 2)\n\tfmt.Println(s, big)\n}\n",
   "stdout": "15 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "15 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\nimport \"fmt\"\nfunc stamps(parcels int) (int, int) {\n\tsheets := parcels / 10\n\tloose := parcels - sheets*10\n\treturn sheets, loose\n}\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\ts, l := stamps(n)\n\tfmt.Println(s, \"sheets and\", l, \"loose stamps\")\n}\n",
   "stdout": "4 sheets and 7 loose stamps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "4 sheets and 7 loose stamps\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "47\n",
   "screen": "47\n4 sheets and 7 loose stamps\n"
  },
  "boss_parsons_alt.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tvar n int\n\tfmt.Scan(&n)\n\ts, l := stamps(n)\n\tfmt.Println(s, \"sheets and\", l, \"loose stamps\")\n}\nfunc stamps(parcels int) (int, int) {\n\tsheets := parcels / 10\n\tloose := parcels - sheets*10\n\treturn sheets, loose\n}\n",
   "stdout": "4 sheets and 7 loose stamps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons_alt.go",
     "out": "4 sheets and 7 loose stamps\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "47\n",
   "screen": "47\n4 sheets and 7 loose stamps\n"
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc bump(n int) int {\n\tn = n + 1\n\treturn n * 2\n}\n\nfunc main() {\n\tn := 3\n\tm := bump(n)\n\tfmt.Println(n, m)\n\tn = bump(m)\n\tfmt.Println(n, m)\n}\n",
   "stdout": "3 8\n18 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "3 8\n18 8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_scan.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar first, last string\n\tfmt.Print(\"First name: \")\n\tfmt.Scan(&first)\n\tfmt.Print(\"Last name: \")\n\tfmt.Scan(&last)\n\tfmt.Println(\"Hi,\", first, \"/\", last)\n}\n",
   "stdout": "First name: Last name: Hi, Grace / Hopper\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_scan.go",
     "out": "First name: Last name: Hi, Grace / Hopper\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Grace Hopper\n",
   "screen": "First name: Grace Hopper\nLast name: Hi, Grace / Hopper\n"
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// lastDigit splits n into everything but its last digit, and the last digit.\nfunc lastDigit(n int) (int, int) {\n\treturn n / 10, n % 10\n}\n\nfunc main() {\n\tn := 4096\n\tsum := 0\n\tfor n > 0 {\n\t\tvar d int\n\t\tn, d = lastDigit(n)\n\t\tsum += d\n\t\tfmt.Println(n, d, sum)\n\t}\n}\n",
   "stdout": "409 6 6\n40 9 15\n4 0 15\n0 4 19\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "409 6 6\n40 9 15\n4 0 15\n0 4 19\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bufio_name.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Full name: \")\n\tscanner.Scan()\n\tname := scanner.Text()\n\tfmt.Println(\"Parcel for\", name)\n}\n",
   "stdout": "Full name: Parcel for Ada Lovelace\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run bufio_name.go",
     "out": "Full name: Parcel for Ada Lovelace\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Ada Lovelace\n",
   "screen": "Full name: Ada Lovelace\nParcel for Ada Lovelace\n"
  },
  "byvalue.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc addBonus(coins int) {\n\tcoins = coins + 10\n\tfmt.Println(\"inside:\", coins)\n}\n\nfunc main() {\n\tcoins := 5\n\taddBonus(coins)\n\tfmt.Println(\"outside:\", coins)\n}\n",
   "stdout": "inside: 15\noutside: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run byvalue.go",
     "out": "inside: 15\noutside: 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "byvalue_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc addBonus(coins int) int {\n\treturn coins + 10\n}\n\nfunc main() {\n\tcoins := 5\n\tcoins = addBonus(coins)\n\tfmt.Println(\"now:\", coins)\n}\n",
   "stdout": "now: 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run byvalue_fix.go",
     "out": "now: 15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "concat.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"First number: \")\n\tscanner.Scan()\n\ta := scanner.Text()\n\tfmt.Print(\"Second number: \")\n\tscanner.Scan()\n\tb := scanner.Text()\n\tfmt.Println(\"Sum:\", a+b)\n}\n",
   "stdout": "First number: Second number: Sum: 53\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run concat.go",
     "out": "First number: Second number: Sum: 53\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "5\n3\n",
   "screen": "First number: 5\nSecond number: 3\nSum: 53\n"
  },
  "divmod.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// divide shares sweets between kids.\n// It returns the share and the leftovers.\nfunc divide(sweets, kids int) (int, int) {\n\teach := sweets / kids\n\tleft := sweets % kids\n\treturn each, left\n}\n\nfunc main() {\n\teach, left := divide(17, 5)\n\tfmt.Println(\"each:\", each, \"left over:\", left)\n}\n",
   "stdout": "each: 3 left over: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run divmod.go",
     "out": "each: 3 left over: 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "doc.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// fee returns the price of a trip of km kilometres:\n// 2 coins to start, plus 4 coins for every kilometre.\nfunc fee(km int) int {\n\treturn 2 + km*4\n}\n\nfunc main() {\n\tfmt.Println(fee(10))\n}\n",
   "stdout": "42\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run doc.go",
     "out": "42\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "doc_atoi.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"see the terminal\")\n}\n",
   "stdout": "package strconv // import \"strconv\"\n\nfunc Atoi(s string) (int, error)\n    Atoi is equivalent to ParseInt(s, 10, 0), converted to type int.\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go doc strconv.Atoi",
     "out": "package strconv // import \"strconv\"\n\nfunc Atoi(s string) (int, error)\n    Atoi is equivalent to ParseInt(s, 10, 0), converted to type int.\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fee.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// fee returns a trip's price: 2 coins, plus 4 per km.\nfunc fee(km int) int {\n\treturn 2 + km*4\n}\n\nfunc main() {\n\tfmt.Println(\"Parcel 1 costs\", fee(3))\n\tfmt.Println(\"Parcel 2 costs\", fee(5))\n\tfmt.Println(\"Parcel 3 costs\", fee(8))\n}\n",
   "stdout": "Parcel 1 costs 14\nParcel 2 costs 22\nParcel 3 costs 34\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fee.go",
     "out": "Parcel 1 costs 14\nParcel 2 costs 22\nParcel 3 costs 34\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_atoi.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\ttyped := \"12\"\n\tn, err := strconv.Atoi(typed)\n\tfmt.Println(n*3, err)\n\tback := strconv.Itoa(n * 3)\n\tfmt.Println(back + \"!\")\n}\n",
   "stdout": "36 <nil>\n36!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_atoi.go",
     "out": "36 <nil>\n36!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_scanner.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Town: \")\n\tscanner.Scan()\n\ttown := scanner.Text()\n\tfmt.Println(\"Delivering to\", town)\n}\n",
   "stdout": "Town: Delivering to New York\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_scanner.go",
     "out": "Town: Delivering to New York\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "New York\n",
   "screen": "Town: New York\nDelivering to New York\n"
  },
  "fill_sig.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// perimeter returns the distance round a w-by-h rectangle.\nfunc perimeter(w, h int) int {\n\treturn 2*w + 2*h\n}\n\nfunc main() {\n\tfmt.Println(perimeter(3, 4))\n\tfmt.Println(perimeter(10, 1))\n}\n",
   "stdout": "14\n22\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_sig.go",
     "out": "14\n22\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "func_inside.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfunc greet() {\n\t\tfmt.Println(\"hi\")\n\t}\n\tgreet()\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./func_inside.go:6:7: syntax error: unexpected name greet, expected (\n./func_inside.go:9:2: syntax error: non-declaration statement outside function body\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run func_inside.go",
     "out": "",
     "err": "# command-line-arguments\n./func_inside.go:6:7: syntax error: unexpected name greet, expected (\n./func_inside.go:9:2: syntax error: non-declaration statement outside function body\n",
     "exit": 1
    }
   ]
  },
  "greet.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc greet() {\n\tfmt.Println(\"Hi! I'm Scoot.\")\n\tfmt.Println(\"Parcel for you!\")\n}\n\nfunc main() {\n\tfmt.Println(\"Knock knock\")\n\tgreet()\n\tfmt.Println(\"Knock knock\")\n\tgreet()\n}\n",
   "stdout": "Knock knock\nHi! I'm Scoot.\nParcel for you!\nKnock knock\nHi! I'm Scoot.\nParcel for you!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run greet.go",
     "out": "Knock knock\nHi! I'm Scoot.\nParcel for you!\nKnock knock\nHi! I'm Scoot.\nParcel for you!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "greet_name.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc greet(name string) {\n\tfmt.Println(\"Parcel for\", name+\"!\")\n}\n\nfunc main() {\n\tgreet(\"Ada\")\n\tgreet(\"Grace\")\n\tfriend := \"Linus\"\n\tgreet(friend)\n}\n",
   "stdout": "Parcel for Ada!\nParcel for Grace!\nParcel for Linus!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run greet_name.go",
     "out": "Parcel for Ada!\nParcel for Grace!\nParcel for Linus!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "itoa.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn := 7\n\ts := strconv.Itoa(n)\n\tfmt.Println(s + \" parcels\")\n\tfmt.Printf(\"%T %T\\n\", n, s)\n\n\tf, err := strconv.ParseFloat(\"2.5\", 64)\n\tfmt.Println(f*2, err)\n\t_, err = strconv.ParseFloat(\"two\", 64)\n\tfmt.Println(err)\n}\n",
   "stdout": "7 parcels\nint string\n5 <nil>\nstrconv.ParseFloat: parsing \"two\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run itoa.go",
     "out": "7 parcels\nint string\n5 <nil>\nstrconv.ParseFloat: parsing \"two\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lines.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tcount := 0\n\tfor scanner.Scan() {\n\t\tcount++\n\t\tfmt.Println(count, scanner.Text())\n\t}\n\tfmt.Println(\"orders:\", count)\n}\n",
   "stdout": "1 pizza\n2 books\n3 shoes\norders: 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cat orders.txt",
     "out": "pizza\nbooks\nshoes\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "go run lines.go < orders.txt",
     "out": "1 pizza\n2 books\n3 shoes\norders: 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "orders.txt": {
   "src": "pizza\nbooks\nshoes\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "long_main.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t// parcel 1: 3 km\n\tfee1 := 2 + 3*4\n\tfmt.Println(\"Parcel 1 costs\", fee1)\n\t// parcel 2: 5 km\n\tfee2 := 2 + 5*4\n\tfmt.Println(\"Parcel 2 costs\", fee2)\n\t// parcel 3: 8 km\n\tfee3 := 2 + 8*4\n\tfmt.Println(\"Parcel 3 costs\", fee3)\n}\n",
   "stdout": "Parcel 1 costs 14\nParcel 2 costs 22\nParcel 3 costs 34\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run long_main.go",
     "out": "Parcel 1 costs 14\nParcel 2 costs 22\nParcel 3 costs 34\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "mismatch_own.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc divide(sweets, kids int) (int, int) {\n\treturn sweets / kids, sweets % kids\n}\n\nfunc main() {\n\teach := divide(17, 5)\n\tfmt.Println(each)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./mismatch_own.go:10:10: assignment mismatch: 1 variable but divide returns 2 values\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run mismatch_own.go",
     "out": "",
     "err": "# command-line-arguments\n./mismatch_own.go:10:10: assignment mismatch: 1 variable but divide returns 2 values\n",
     "exit": 1
    }
   ]
  },
  "missing_ret.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// size sorts parcels by kg.\nfunc size(kg int) string {\n\tswitch {\n\tcase kg < 5:\n\t\treturn \"small\"\n\tcase kg >= 5:\n\t\treturn \"large\"\n\t}\n}\n\nfunc main() {\n\tfmt.Println(size(3))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./missing_ret.go:13:1: missing return\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run missing_ret.go",
     "out": "",
     "err": "# command-line-arguments\n./missing_ret.go:13:1: missing return\n",
     "exit": 1
    }
   ]
  },
  "missing_ret_ok.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// size sorts parcels by kg.\nfunc size(kg int) string {\n\tswitch {\n\tcase kg < 5:\n\t\treturn \"small\"\n\tdefault:\n\t\treturn \"large\"\n\t}\n}\n\nfunc main() {\n\tfmt.Println(size(3), size(9))\n}\n",
   "stdout": "small large\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run missing_ret_ok.go",
     "out": "small large\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "named.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// divide returns each kid's share and the leftovers.\nfunc divide(sweets, kids int) (each, left int) {\n\teach = sweets / kids\n\tleft = sweets % kids\n\treturn\n}\n\n// nothing never sets its result.\nfunc nothing() (count int) {\n\treturn\n}\n\nfunc main() {\n\tfmt.Println(divide(17, 5))\n\tfmt.Println(nothing())\n}\n",
   "stdout": "3 2\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run named.go",
     "out": "3 2\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "order.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"main runs first\")\n\tlater()\n}\n\n// later is written below main, and that's fine.\nfunc later() {\n\tfmt.Println(\"later() was found anyway\")\n}\n",
   "stdout": "main runs first\nlater() was found anyway\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order.go",
     "out": "main runs first\nlater() was found anyway\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_minmax.go": {
   "src": "package main\nimport \"fmt\"\nfunc minMax(a, b int) (int, int) {\n\tif a < b {\n\t\treturn a, b\n\t}\n\treturn b, a\n}\nfunc main() {\n\tlo, hi := minMax(9, 4)\n\tfmt.Println(\"low:\", lo, \"high:\", hi)\n}\n",
   "stdout": "low: 4 high: 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_minmax.go",
     "out": "low: 4 high: 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_minmax_alt.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tlo, hi := minMax(9, 4)\n\tfmt.Println(\"low:\", lo, \"high:\", hi)\n}\nfunc minMax(a, b int) (int, int) {\n\tif a < b {\n\t\treturn a, b\n\t}\n\treturn b, a\n}\n",
   "stdout": "low: 4 high: 9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_minmax_alt.go",
     "out": "low: 4 high: 9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_args.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(len(os.Args) - 1)\n\tfmt.Println(os.Args[2])\n}\n",
   "stdout": "3\ngreen\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_args.go red green blue",
     "out": "3\ngreen\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_atoi.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\ta, err1 := strconv.Atoi(\"12\")\n\tb, err2 := strconv.Atoi(\"x2\")\n\tfmt.Println(a + b)\n\tfmt.Println(err1)\n\tfmt.Println(err2)\n}\n",
   "stdout": "12\n<nil>\nstrconv.Atoi: parsing \"x2\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_atoi.go",
     "out": "12\n<nil>\nstrconv.Atoi: parsing \"x2\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_calls.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc hello() {\n\tfmt.Println(\"hello\")\n}\n\nfunc bye() {\n\tfmt.Println(\"bye\")\n}\n\nfunc main() {\n\tbye()\n\thello()\n\tbye()\n}\n",
   "stdout": "bye\nhello\nbye\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_calls.go",
     "out": "bye\nhello\nbye\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc reset(score int) {\n\tscore = 0\n\tfmt.Println(\"reset says\", score)\n}\n\nfunc main() {\n\tscore := 42\n\treset(score)\n\tscore = score + 1\n\tfmt.Println(\"main says\", score)\n}\n",
   "stdout": "reset says 0\nmain says 43\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_copy.go",
     "out": "reset says 0\nmain says 43\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_multi.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc swap(a, b string) (string, string) {\n\treturn b, a\n}\n\nfunc main() {\n\tx, y := swap(\"left\", \"right\")\n\tfmt.Println(x, y)\n\tx, y = swap(x, y)\n\tfmt.Println(x, y)\n}\n",
   "stdout": "right left\nleft right\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_multi.go",
     "out": "right left\nleft right\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_retmany.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// sumDiff returns a+b and a-b.\nfunc sumDiff(a, b int) int {\n\treturn a + b, a - b\n}\n\nfunc main() {\n\tfmt.Println(sumDiff(5, 3))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./predict_retmany.go:7:16: too many return values\n\thave (int, int)\n\twant (int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run predict_retmany.go",
     "out": "",
     "err": "# command-line-arguments\n./predict_retmany.go:7:16: too many return values\n\thave (int, int)\n\twant (int)\n",
     "exit": 1
    }
   ]
  },
  "predict_return.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc triple(n int) int {\n\treturn n * 3\n}\n\nfunc main() {\n\ta := triple(2)\n\tb := triple(a) - 1\n\tfmt.Println(a, b)\n\tfmt.Println(triple(triple(1)))\n}\n",
   "stdout": "6 17\n9\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_return.go",
     "out": "6 17\n9\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_scanln.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar name string\n\tfmt.Print(\"Name: \")\n\tfmt.Scanln(&name)\n\tfmt.Println(\"[\" + name + \"]\")\n}\n",
   "stdout": "Name: [Ada]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_scanln.go",
     "out": "Name: [Ada]\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Ada Lovelace\n",
   "screen": "Name: Ada Lovelace\n[Ada]\n"
  },
  "readage_ret.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\n// readAge turns typed text into an age.\nfunc readAge(s string) (int, error) {\n\tif s == \"\" {\n\t\treturn 0\n\t}\n\treturn strconv.Atoi(s)\n}\n\nfunc main() {\n\tfmt.Println(readAge(\"12\"))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./readage_ret.go:11:10: not enough return values\n\thave (number)\n\twant (int, error)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run readage_ret.go",
     "out": "",
     "err": "# command-line-arguments\n./readage_ret.go:11:10: not enough return values\n\thave (number)\n\twant (int, error)\n",
     "exit": 1
    }
   ]
  },
  "receipt.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tsub := subtotal(3, 4)\n\tfee := deliveryFee(sub)\n\tprintReceipt(sub, fee)\n}\n\n// subtotal returns the cost of n parcels at price coins each.\nfunc subtotal(n, price int) int {\n\treturn n * price\n}\n\n// deliveryFee is free for orders of 20 coins or more.\nfunc deliveryFee(sub int) int {\n\tif sub >= 20 {\n\t\treturn 0\n\t}\n\treturn 3\n}\n\n// printReceipt shows the bill, one line per part.\nfunc printReceipt(sub, fee int) {\n\tfmt.Println(\"subtotal:\", sub)\n\tfmt.Println(\"delivery:\", fee)\n\tfmt.Println(\"to pay:  \", sub+fee)\n}\n",
   "stdout": "subtotal: 12\ndelivery: 3\nto pay:   15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run receipt.go",
     "out": "subtotal: 12\ndelivery: 3\nto pay:   15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ret_few.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// split returns n/2 and n%2.\nfunc split(n int) (int, int) {\n\treturn n / 2\n}\n\nfunc main() {\n\tfmt.Println(split(7))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./ret_few.go:7:9: not enough return values\n\thave (int)\n\twant (int, int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run ret_few.go",
     "out": "",
     "err": "# command-line-arguments\n./ret_few.go:7:9: not enough return values\n\thave (int)\n\twant (int, int)\n",
     "exit": 1
    }
   ]
  },
  "ret_many.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// half returns n / 2.\nfunc half(n int) int {\n\treturn n / 2, n % 2\n}\n\nfunc main() {\n\tfmt.Println(half(7))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./ret_many.go:7:16: too many return values\n\thave (int, int)\n\twant (int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run ret_many.go",
     "out": "",
     "err": "# command-line-arguments\n./ret_many.go:7:16: too many return values\n\thave (int, int)\n\twant (int)\n",
     "exit": 1
    }
   ]
  },
  "scan_int_bad.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar n int\n\tfmt.Print(\"How many parcels? \")\n\t_, err := fmt.Scan(&n)\n\tfmt.Println(\"n:\", n)\n\tfmt.Println(\"err:\", err)\n}\n",
   "stdout": "How many parcels? n: 0\nerr: expected integer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_int_bad.go",
     "out": "How many parcels? n: 0\nerr: expected integer\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "abc\n",
   "screen": "How many parcels? abc\nn: 0\nerr: expected integer\n"
  },
  "scan_name.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar name string\n\tfmt.Print(\"What's your name? \")\n\tfmt.Scan(&name)\n\tfmt.Println(\"Parcel for\", name)\n}\n",
   "stdout": "What's your name? Parcel for Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_name.go",
     "out": "What's your name? Parcel for Ada\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Ada\n",
   "screen": "What's your name? Ada\nParcel for Ada\n"
  },
  "scan_noamp.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar n int\n\tfmt.Print(\"How many? \")\n\t_, err := fmt.Scan(n)\n\tfmt.Println(\"n:\", n, \"err:\", err)\n}\n",
   "stdout": "How many? n: 0 err: type not a pointer: int\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_noamp.go",
     "out": "How many? n: 0 err: type not a pointer: int\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "scan_two.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar name string\n\tvar parcels int\n\tfmt.Print(\"Name and parcels: \")\n\tfmt.Scan(&name, &parcels)\n\tfmt.Println(name, \"gets\", parcels*2, \"stamps\")\n}\n",
   "stdout": "Name and parcels: Ada gets 6 stamps\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_two.go",
     "out": "Name and parcels: Ada gets 6 stamps\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Ada 3\n",
   "screen": "Name and parcels: Ada 3\nAda gets 6 stamps\n"
  },
  "scanln_full.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar name string\n\tfmt.Print(\"Full name: \")\n\tfmt.Scanln(&name)\n\tfmt.Println(\"Parcel for\", name)\n}\n",
   "stdout": "Full name: Parcel for Ada\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scanln_full.go",
     "out": "Full name: Parcel for Ada\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "Ada Lovelace\n",
   "screen": "Full name: Ada Lovelace\nParcel for Ada\n"
  },
  "scope_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc total(a, b int) int {\n\tsum := a + b\n\treturn sum\n}\n\nfunc main() {\n\tfmt.Println(total(2, 3))\n\tfmt.Println(sum)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./scope_err.go:12:14: undefined: sum\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run scope_err.go",
     "out": "",
     "err": "# command-line-arguments\n./scope_err.go:12:14: undefined: sum\n",
     "exit": 1
    }
   ]
  },
  "share.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// share splits sweets evenly between kids and returns each kid's share.\nfunc share(sweets, kids int) int {\n\treturn sweets / kids\n}\n\nfunc main() {\n\tfmt.Println(share(12, 4))\n\tfmt.Println(share(10, 3))\n\tfmt.Println(share(7, 7))\n\tfmt.Println(share(3, 5))\n}\n",
   "stdout": "3\n3\n1\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run share.go",
     "out": "3\n3\n1\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "share_zero.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// share splits sweets evenly between kids and returns each kid's share.\nfunc share(sweets, kids int) int {\n\treturn sweets / kids\n}\n\nfunc main() {\n\tfmt.Println(\"sharing...\")\n\tfmt.Println(share(5, 0))\n}\n",
   "stdout": "sharing...\n",
   "stderr": "panic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4b\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run share_zero.go",
     "out": "sharing...\n",
     "err": "panic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4b\nexit status 2\n",
     "exit": 1,
     "merged": "sharing...\npanic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4b\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "sharing...\n",
    "stderr": "panic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4c\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run share_zero.go",
      "out": "sharing...\n",
      "err": "panic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4c\nexit status 2\n",
      "exit": 1,
      "merged": "sharing...\npanic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.share(...)\n\t/home/you/go-ch7/share_zero.go:7\nmain.main()\n\t/home/you/go-ch7/share_zero.go:12 +0x4c\nexit status 2\n"
     }
    ]
   }
  },
  "shared.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// volume returns the space inside a w-by-h-by-d box.\nfunc volume(w, h, d int) int {\n\treturn w * h * d\n}\n\n// label prints a sticker for a box.\nfunc label(name string, w, h int) {\n\tfmt.Printf(\"%s: %d x %d\\n\", name, w, h)\n}\n\nfunc main() {\n\tfmt.Println(volume(2, 3, 4))\n\tlabel(\"books\", 30, 20)\n}\n",
   "stdout": "24\nbooks: 30 x 20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shared.go",
     "out": "24\nbooks: 30 x 20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_discard.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// addTip returns the bill plus a 10% tip.\nfunc addTip(bill int) int {\n\treturn bill + bill/10\n}\n\nfunc main() {\n\tbill := 50\n\taddTip(bill)\n\tfmt.Println(\"Pay:\", bill)\n}\n",
   "stdout": "Pay: 50\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_discard.go",
     "out": "Pay: 50\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_ret.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// half returns half of n, rounded down.\nfunc half(n int) int {\n\tfmt.Println(\"halving\", n)\n\tn / 2\n}\n\nfunc main() {\n\tfmt.Println(half(10))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_ret.go:8:2: n / 2 (value of type int) is not used\n./spot_ret.go:9:1: missing return\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_ret.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_ret.go:8:2: n / 2 (value of type int) is not used\n./spot_ret.go:9:1: missing return\n",
     "exit": 1
    }
   ]
  },
  "spot_trim.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"How many? \")\n\tscanner.Scan()\n\tn, err := strconv.Atoi(scanner.Text())\n\tfmt.Println(\"double:\", n*2)\n\tfmt.Println(\"err:\", err)\n}\n",
   "stdout": "How many? double: 0\nerr: strconv.Atoi: parsing \" 21\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_trim.go",
     "out": "How many? double: 0\nerr: strconv.Atoi: parsing \" 21\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": " 21\n",
   "screen": "How many?  21\ndouble: 0\nerr: strconv.Atoi: parsing \" 21\": invalid syntax\n"
  },
  "text_plus.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Your age: \")\n\tscanner.Scan()\n\tage := scanner.Text()\n\tfmt.Println(\"Next year:\", age+1)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./text_plus.go:14:28: invalid operation: age + 1 (mismatched types string and untyped int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run text_plus.go",
     "out": "",
     "err": "# command-line-arguments\n./text_plus.go:14:28: invalid operation: age + 1 (mismatched types string and untyped int)\n",
     "exit": 1
    }
   ]
  },
  "tipcalc.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n\t\"strings\"\n)\n\n// tip returns the tip on a bill, for a percent such as 15.\nfunc tip(bill, percent int) int {\n\treturn bill * percent / 100\n}\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Bill (coins): \")\n\tscanner.Scan()\n\tbill, err := strconv.Atoi(strings.TrimSpace(scanner.Text()))\n\tfmt.Println(\"  err:\", err)\n\tfmt.Print(\"Tip percent: \")\n\tscanner.Scan()\n\tpercent, err := strconv.Atoi(strings.TrimSpace(scanner.Text()))\n\tfmt.Println(\"  err:\", err)\n\tt := tip(bill, percent)\n\tfmt.Println(\"Tip:\", t, \"Total:\", bill+t)\n}\n",
   "stdout": "Bill (coins):   err: <nil>\nTip percent:   err: <nil>\nTip: 6 Total: 46\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run tipcalc.go",
     "out": "Bill (coins):   err: <nil>\nTip percent:   err: <nil>\nTip: 6 Total: 46\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "40\n 15 \n",
   "screen": "Bill (coins): 40\n  err: <nil>\nTip percent:  15 \n  err: <nil>\nTip: 6 Total: 46\n"
  },
  "tipcalc_oops.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n\t\"strings\"\n)\n\n// tip returns the tip on a bill, for a percent such as 15.\nfunc tip(bill, percent int) int {\n\treturn bill * percent / 100\n}\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Bill (coins): \")\n\tscanner.Scan()\n\tbill, err := strconv.Atoi(strings.TrimSpace(scanner.Text()))\n\tfmt.Println(\"  err:\", err)\n\tfmt.Print(\"Tip percent: \")\n\tscanner.Scan()\n\tpercent, err := strconv.Atoi(strings.TrimSpace(scanner.Text()))\n\tfmt.Println(\"  err:\", err)\n\tt := tip(bill, percent)\n\tfmt.Println(\"Tip:\", t, \"Total:\", bill+t)\n}\n",
   "stdout": "Bill (coins):   err: <nil>\nTip percent:   err: strconv.Atoi: parsing \"fifteen\": invalid syntax\nTip: 0 Total: 40\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run tipcalc_oops.go",
     "out": "Bill (coins):   err: <nil>\nTip percent:   err: strconv.Atoi: parsing \"fifteen\": invalid syntax\nTip: 0 Total: 40\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "40\nfifteen\n",
   "screen": "Bill (coins): 40\n  err: <nil>\nTip percent: fifteen\n  err: strconv.Atoi: parsing \"fifteen\": invalid syntax\nTip: 0 Total: 40\n"
  },
  "trace_calls.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc square(n int) int {\n\treturn n * n\n}\n\nfunc main() {\n\ttotal := 0\n\tfor i := 1; i <= 4; i++ {\n\t\ttotal += square(i)\n\t\tfmt.Println(i, square(i), total)\n\t}\n}\n",
   "stdout": "1 1 1\n2 4 5\n3 9 14\n4 16 30\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_calls.go",
     "out": "1 1 1\n2 4 5\n3 9 14\n4 16 30\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_scan.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tline := 0\n\tletters := 0\n\tfor scanner.Scan() {\n\t\tword := scanner.Text()\n\t\tline++\n\t\tletters += len(word)\n\t\tfmt.Println(line, word, len(word), letters)\n\t}\n}\n",
   "stdout": "1 go 2 2\n2 fast 4 6\n3 Scoot 5 11\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_scan.go < words.txt",
     "out": "1 go 2 2\n2 fast 4 6\n3 Scoot 5 11\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "words.txt": {
   "src": "go\nfast\nScoot\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "trim.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\tscanner := bufio.NewScanner(os.Stdin)\n\tfmt.Print(\"Name: \")\n\tscanner.Scan()\n\traw := scanner.Text()\n\tclean := strings.TrimSpace(raw)\n\tfmt.Printf(\"raw:   %q\\n\", raw)\n\tfmt.Printf(\"clean: %q\\n\", clean)\n\tfmt.Println(raw == \"Ada\", clean == \"Ada\")\n}\n",
   "stdout": "Name: raw:   \"   Ada   \"\nclean: \"Ada\"\nfalse true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trim.go",
     "out": "Name: raw:   \"   Ada   \"\nclean: \"Ada\"\nfalse true\n",
     "err": "",
     "exit": 0
    }
   ],
   "stdin": "   Ada   \n",
   "screen": "Name:    Ada   \nraw:   \"   Ada   \"\nclean: \"Ada\"\nfalse true\n"
  },
  "unused_call.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc area(w, h int) int {\n\treturn w * h\n}\n\nfunc main() {\n\tarea(3, 4)\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "done\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run unused_call.go",
     "out": "done\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "walk_call.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(n int) int {\n\treturn n * 2\n}\n\nfunc main() {\n\tfmt.Println(\"start\")\n\tx := double(4)\n\ty := double(x)\n\tfmt.Println(x, y)\n}\n",
   "stdout": "start\n8 16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run walk_call.go",
     "out": "start\n8 16\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
