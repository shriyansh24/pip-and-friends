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
  "workdir": "/home/you/go-ch15",
  "versionDifferences": [
   "lab_rename.go",
   "not_exported.go",
   "quote.go",
   "s_init.go",
   "vet_fail.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): lab_rename.go, not_exported.go, quote.go, s_init.go, vet_fail.go."
 },
 "programs": {
  "all_pkgs.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example.com/school/calc\"\n\t\"example.com/school/greet\"\n)\n\nfunc main() {\n\tfmt.Println(greet.Hello(\"class\"))\n\tfmt.Println(\"2 + 3 =\", calc.Add(2, 3))\n}\n",
   "stdout": "?   \texample.com/school\t[no test files]\nok  \texample.com/school/calc\t…s\nok  \texample.com/school/greet\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd school",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "go test -count=1 ./... | sed -E 's/[0-9.]+s$/…s/'",
     "out": "?   \texample.com/school\t[no test files]\nok  \texample.com/school/calc\t…s\nok  \texample.com/school/greet\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    }
   ]
  },
  "school/greet/greet.go": {
   "src": "// Package greet makes friendly messages.\npackage greet\n\n// Hello greets someone by name.\nfunc Hello(name string) string {\n\treturn \"Hello, \" + name + \"!\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "school/greet/greet_test.go": {
   "src": "package greet\n\nimport \"testing\"\n\nfunc TestHello(t *testing.T) {\n\tgot := Hello(\"Scoot\")\n\twant := \"Hello, Scoot!\"\n\tif got != want {\n\t\tt.Errorf(\"Hello(%q) = %q, want %q\", \"Scoot\", got, want)\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"example/garden/plants\"\n\nfunc main() {\n\tplants.Grow(\"tomato\")\n\tplants.water(\"rose\")\n}\n",
   "stdout": "",
   "stderr": "# example/garden\n./main.go:7:9: undefined: plants.water\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd garden",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/garden\n./main.go:7:9: undefined: plants.water\n",
     "exit": 1,
     "dir": "~/go-ch15/garden"
    }
   ]
  },
  "garden/plants/plants.go": {
   "src": "// Package plants looks after the garden.\npackage plants\n\nimport \"fmt\"\n\n// Grow waters a plant, then says how tall it is.\nfunc Grow(name string) {\n\twater(name)\n\tfmt.Println(name, \"is taller\")\n}\n\nfunc water(name string) {\n\tfmt.Println(\"watering the\", name)\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/zoo/animals\"\n)\n\nfunc main() {\n\tcow := animals.Sound(\"cow\")\n\tfmt.Println(cow, animals.Sound(\"duck\"))\n}\n",
   "stdout": "moo quack\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd zoo",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "moo quack\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/zoo"
    }
   ]
  },
  "zoo/animals/animals.go": {
   "src": "// Package animals knows what animals say.\npackage animals\n\n// Sound returns the noise an animal makes.\nfunc Sound(name string) string {\n\tswitch name {\n\tcase \"cow\":\n\t\treturn \"moo\"\n\tcase \"duck\":\n\t\treturn \"quack\"\n\t}\n\treturn \"...\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_parsons.go": {
   "src": "package shout\n\nimport \"testing\"\n\nfunc TestShout(t *testing.T) {\n\tcases := []struct{ in, want string }{\n\t\t{\"hi\", \"HI!\"},\n\t\t{\"go\", \"GO!\"},\n\t}\n\tfor _, tc := range cases {\n\t\tgot := Shout(tc.in)\n\t\tif got != tc.want {\n\t\t\tt.Errorf(\"Shout(%q) = %q, want %q\", tc.in, got, tc.want)\n\t\t}\n\t}\n}\n",
   "stdout": "=== RUN   TestShout\n--- PASS: TestShout (0.00s)\nPASS\nok  \texample.com/shout\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd shout",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/shout"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestShout\n--- PASS: TestShout (0.00s)\nPASS\nok  \texample.com/shout\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/shout"
    }
   ]
  },
  "shout/shout.go": {
   "src": "package shout\n\nimport \"strings\"\n\n// Shout turns s into capitals and adds \"!\".\nfunc Shout(s string) string {\n\treturn strings.ToUpper(s) + \"!\"\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_predict.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/bakery/oven\"\n)\n\nfunc main() {\n\tfmt.Println(oven.Bake(2))\n\tfmt.Println(oven.Bake(3) + \"!\")\n\tfmt.Println(\"total:\", oven.Baked())\n}\n",
   "stdout": "oo\nooo!\ntotal: 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd bakery",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "oo\nooo!\ntotal: 5\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/bakery"
    }
   ]
  },
  "bakery/oven/oven.go": {
   "src": "// Package oven bakes bread and remembers how much.\npackage oven\n\nimport \"strings\"\n\nvar baked int\n\n// Bake makes n loaves and returns them as a row of o's.\nfunc Bake(n int) string {\n\tbaked += n\n\treturn strings.Repeat(\"o\", n)\n}\n\n// Baked reports how many loaves were made so far.\nfunc Baked() int {\n\treturn baked\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_spot.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tgot := Add(2, 3)\n\tif got == 5 {\n\t\tt.Errorf(\"Add(2, 3) = %d, want 5\", got)\n\t}\n}\n",
   "stdout": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:8: Add(2, 3) = 5, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_flip",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_flip"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:8: Add(2, 3) = 5, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_flip"
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc Max(a, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn a\n}\n\nfunc main() {\n\tcases := []struct{ a, b, want int }{\n\t\t{9, 2, 9},\n\t\t{1, 6, 6},\n\t\t{4, 4, 4},\n\t\t{-5, 0, 0},\n\t}\n\tfails := 0\n\tfor _, tc := range cases {\n\t\tgot := Max(tc.a, tc.b)\n\t\tif got != tc.want {\n\t\t\tfails++\n\t\t}\n\t\tfmt.Println(tc.a, tc.b, got, tc.want, fails)\n\t}\n}\n",
   "stdout": "9 2 9 9 0\n1 6 1 6 1\n4 4 4 4 1\n-5 0 -5 0 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "9 2 9 9 0\n1 6 1 6 1\n4 4 4 4 1\n-5 0 -5 0 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cached.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example.com/school/calc\"\n\t\"example.com/school/greet\"\n)\n\nfunc main() {\n\tfmt.Println(greet.Hello(\"class\"))\n\tfmt.Println(\"2 + 3 =\", calc.Add(2, 3))\n}\n",
   "stdout": "PASS\nok  \texample.com/school/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd school",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "go clean -testcache",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "go test ./... | sed -E 's/[0-9.]+s$/…s/'",
     "out": "?   \texample.com/school\t[no test files]\nok  \texample.com/school/calc\t…s\nok  \texample.com/school/greet\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "go test ./... | sed -E 's/[0-9.]+s$/…s/'",
     "out": "?   \texample.com/school\t[no test files]\nok  \texample.com/school/calc\t(cached)\nok  \texample.com/school/greet\t(cached)\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "cd calc",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/school/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school/calc"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/school/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/school/calc"
    }
   ]
  },
  "cycle.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/import_cycle/a\"\n)\n\nfunc main() {\n\tfmt.Println(a.Ping())\n}\n",
   "stdout": "",
   "stderr": "package example/import_cycle\n\timports example/import_cycle/a from main.go\n\timports example/import_cycle/b from a.go\n\timports example/import_cycle/a from b.go: import cycle not allowed\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd cycle",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "package example/import_cycle\n\timports example/import_cycle/a from main.go\n\timports example/import_cycle/b from a.go\n\timports example/import_cycle/a from b.go: import cycle not allowed\n",
     "exit": 1,
     "dir": "~/go-ch15/cycle"
    }
   ]
  },
  "cycle/a/a.go": {
   "src": "package a\n\nimport \"example/import_cycle/b\"\n\n// Ping says ping, then asks b.\nfunc Ping() string {\n\treturn \"ping \" + b.Pong()\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "cycle/b/b.go": {
   "src": "package b\n\nimport \"example/import_cycle/a\"\n\n// Pong says pong, then asks a.\nfunc Pong() string {\n\treturn \"pong \" + a.Ping()\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "errorf.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tif got := Add(2, 3); got != 5 {\n\t\tt.Errorf(\"Add(2, 3) = %d, want 5\", got)\n\t}\n\tif got := Add(10, 1); got != 11 {\n\t\tt.Errorf(\"Add(10, 1) = %d, want 11\", got)\n\t}\n}\n",
   "stdout": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:7: Add(2, 3) = -1, want 5\n    calc_test.go:10: Add(10, 1) = 9, want 11\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_errorf",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_errorf"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:7: Add(2, 3) = -1, want 5\n    calc_test.go:10: Add(10, 1) = 9, want 11\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_errorf"
    }
   ]
  },
  "example_bad.go": {
   "src": "package calc\n\nimport \"fmt\"\n\nfunc ExampleAdd() {\n\tfmt.Println(Add(2, 2))\n\t// Output: 5\n}\n",
   "stdout": "--- FAIL: ExampleAdd (0.00s)\ngot:\n4\nwant:\n5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_exbad",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_exbad"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: ExampleAdd (0.00s)\ngot:\n4\nwant:\n5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_exbad"
    }
   ]
  },
  "example_ok.go": {
   "src": "package calc\n\nimport \"fmt\"\n\nfunc ExampleAdd() {\n\tfmt.Println(Add(2, 2))\n\t// Output: 4\n}\n",
   "stdout": "=== RUN   ExampleAdd\n--- PASS: ExampleAdd (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_example",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_example"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   ExampleAdd\n--- PASS: ExampleAdd (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_example"
    }
   ]
  },
  "fatal.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tif got := Add(2, 3); got != 5 {\n\t\tt.Fatalf(\"Add(2, 3) = %d, want 5\", got)\n\t}\n\tif got := Add(10, 1); got != 11 {\n\t\tt.Fatalf(\"Add(10, 1) = %d, want 11\", got)\n\t}\n}\n",
   "stdout": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:7: Add(2, 3) = -1, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_fatal",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_fatal"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:7: Add(2, 3) = -1, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_fatal"
    }
   ]
  },
  "fill_double.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestDouble(t *testing.T) {\n\tgot := Double(21)\n\tif got != 42 {\n\t\tt.Errorf(\"Double(21) = %d, want 42\", got)\n\t}\n}\n",
   "stdout": "=== RUN   TestDouble\n--- PASS: TestDouble (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_fill",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_fill"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestDouble\n--- PASS: TestDouble (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_fill"
    }
   ]
  },
  "calc_fill/calc.go": {
   "src": "package calc\n\n// Double returns twice n.\nfunc Double(n int) int {\n\treturn n * 2\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_import.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\twords := strings.Fields(\"  deliver   the   mail  \")\n\tfmt.Println(len(words), strings.Join(words, \"-\"))\n}\n",
   "stdout": "3 deliver-the-mail\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_import.go",
     "out": "3 deliver-the-mail\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_sign.go": {
   "src": "package sign\n\nimport \"strings\"\n\n// Shout makes a sign that everyone can read.\nfunc Shout(text string) string {\n\treturn frame(strings.ToUpper(text))\n}\n\nfunc frame(text string) string {\n\treturn \"** \" + text + \" **\"\n}\n",
   "stdout": "** FRESH BREAD **\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd kiosk",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "** FRESH BREAD **\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/kiosk"
    }
   ]
  },
  "kiosk/main.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/kiosk/sign\"\n)\n\nfunc main() {\n\tfmt.Println(sign.Shout(\"fresh bread\"))\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "fill_want.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestDouble(t *testing.T) {\n\tcases := []struct {\n\t\tname string\n\t\tn    int\n\t\twant int\n\t}{\n\t\t{\"one\", 1, 2},\n\t\t{\"five\", 5, 10},\n\t\t{\"negative\", -3, -6},\n\t\t{\"zero\", 0, 0},\n\t}\n\tfor _, tc := range cases {\n\t\tt.Run(tc.name, func(t *testing.T) {\n\t\t\tif got := Double(tc.n); got != tc.want {\n\t\t\t\tt.Errorf(\"Double(%d) = %d, want %d\", tc.n, got, tc.want)\n\t\t\t}\n\t\t})\n\t}\n}\n",
   "stdout": "=== RUN   TestDouble\n=== RUN   TestDouble/one\n=== RUN   TestDouble/five\n=== RUN   TestDouble/negative\n=== RUN   TestDouble/zero\n--- PASS: TestDouble (0.00s)\n    --- PASS: TestDouble/one (0.00s)\n    --- PASS: TestDouble/five (0.00s)\n    --- PASS: TestDouble/negative (0.00s)\n    --- PASS: TestDouble/zero (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_want",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_want"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestDouble\n=== RUN   TestDouble/one\n=== RUN   TestDouble/five\n=== RUN   TestDouble/negative\n=== RUN   TestDouble/zero\n--- PASS: TestDouble (0.00s)\n    --- PASS: TestDouble/one (0.00s)\n    --- PASS: TestDouble/five (0.00s)\n    --- PASS: TestDouble/negative (0.00s)\n    --- PASS: TestDouble/zero (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_want"
    }
   ]
  },
  "lab_mixed.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"the price is\", 4)\n}\n",
   "stdout": "",
   "stderr": "found packages main (main.go) and shop (price.go) in /home/you/go-ch15/lab_mixed\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd lab_mixed",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "found packages main (main.go) and shop (price.go) in /home/you/go-ch15/lab_mixed\n",
     "exit": 1,
     "dir": "~/go-ch15/lab_mixed"
    }
   ]
  },
  "lab_rename.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\tfmt.Println(shop.Welcome(\"Scoot\"))\n}\n",
   "stdout": "",
   "stderr": "main.go:6:2: package example/market/shop is not in std (/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/example/market/shop)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd lab_rename",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "main.go:6:2: package example/market/shop is not in std (/root/go/pkg/mod/golang.org/toolchain@v0.0.1-go1.27.3.linux-amd64/src/example/market/shop)\n",
     "exit": 1,
     "dir": "~/go-ch15/lab_rename"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "main.go:6:2: package example/market/shop is not in std (/usr/local/go1.24.7/src/example/market/shop)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd lab_rename",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15"
     },
     {
      "cmd": "go run .",
      "out": "",
      "err": "main.go:6:2: package example/market/shop is not in std (/usr/local/go1.24.7/src/example/market/shop)\n",
      "exit": 1,
      "dir": "~/go-ch15/lab_rename"
     }
    ]
   }
  },
  "lab_unused.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tfmt.Println(\"hello\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lab_unused.go:5:2: \"strings\" imported and not used\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lab_unused.go",
     "out": "",
     "err": "# command-line-arguments\n./lab_unused.go:5:2: \"strings\" imported and not used\n",
     "exit": 1
    }
   ]
  },
  "market_fee.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\tc := shop.Cart{Owner: \"Scoot\"}\n\tc.Add(4)\n\tfmt.Println(\"the bag costs\", shop.bagFee())\n\tfmt.Println(c.Owner, \"pays\", c.Total())\n}\n",
   "stdout": "",
   "stderr": "# example/market\n./main.go:12:36: name bagFee not exported by package shop\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd market_fee",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/market\n./main.go:12:36: name bagFee not exported by package shop\n",
     "exit": 1,
     "dir": "~/go-ch15/market_fee"
    }
   ]
  },
  "market_field.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\tc := shop.Cart{Owner: \"Scoot\"}\n\tc.Add(4)\n\tc.Add(5)\n\tfmt.Println(c.Owner, \"pays\", c.total)\n}\n",
   "stdout": "",
   "stderr": "# example/market\n./main.go:13:33: c.total undefined (type shop.Cart has no field or method total, but does have method Total)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd market_field",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/market\n./main.go:13:33: c.total undefined (type shop.Cart has no field or method total, but does have method Total)\n",
     "exit": 1,
     "dir": "~/go-ch15/market_field"
    }
   ]
  },
  "market_lit.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\ta := shop.Cart{Owner: \"Ada\"}\n\ta.Add(2)\n\tb := shop.Cart{Owner: \"Bo\", total: 7}\n\tfmt.Println(a.Total(), b.Total())\n}\n",
   "stdout": "",
   "stderr": "# example/market\n./main.go:12:30: cannot refer to unexported field total in struct literal of type shop.Cart\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd market_lit",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/market\n./main.go:12:30: cannot refer to unexported field total in struct literal of type shop.Cart\n",
     "exit": 1,
     "dir": "~/go-ch15/market_lit"
    }
   ]
  },
  "market_noinline.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\tc := shop.Cart{Owner: \"Scoot\"}\n\tc.Add(4)\n\tfmt.Println(\"the bag costs\", shop.bagFee())\n\tfmt.Println(c.Owner, \"pays\", c.Total())\n}\n",
   "stdout": "",
   "stderr": "# example/market\n./main.go:12:36: undefined: shop.bagFee\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd market_noinline",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "# example/market\n./main.go:12:36: undefined: shop.bagFee\n",
     "exit": 1,
     "dir": "~/go-ch15/market_noinline"
    }
   ]
  },
  "market_ok.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"example/market/shop\"\n)\n\nfunc main() {\n\tfmt.Println(shop.Welcome(\"Scoot\"))\n\tc := shop.Cart{Owner: \"Scoot\"}\n\tc.Add(4)\n\tc.Add(5)\n\tfmt.Println(c.Owner, \"pays\", c.Total())\n}\n",
   "stdout": "Welcome to the market, Scoot!\nScoot pays 10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd market",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "Welcome to the market, Scoot!\nScoot pays 10\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/market"
    }
   ]
  },
  "market/shop/cart.go": {
   "src": "// Package shop keeps track of what a customer buys.\npackage shop\n\n// Cart is one customer's basket.\ntype Cart struct {\n\tOwner string\n\ttotal int\n}\n\n// Add puts the price of one item in the cart.\nfunc (c *Cart) Add(price int) {\n\tc.total += price\n}\n\n// Total reports what the cart costs, bag included.\nfunc (c *Cart) Total() int {\n\treturn c.total + bagFee()\n}\n\n// Welcome greets a customer by name.\nfunc Welcome(name string) string {\n\treturn \"Welcome to the market, \" + name + \"!\"\n}\n\nfunc bagFee() int {\n\treturn 1\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "mk_five.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn 5\n}\n",
   "stdout": "PASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_five",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_five"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_five"
    }
   ]
  },
  "mk_minus.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a - b\n}\n",
   "stdout": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:9: Add(2, 3) = -1, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_minus",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_minus"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:9: Add(2, 3) = -1, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_minus"
    }
   ]
  },
  "mk_plus.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a + b\n}\n",
   "stdout": "PASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc"
    }
   ]
  },
  "mk_times.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a * b\n}\n",
   "stdout": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:9: Add(2, 3) = 6, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_times",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_times"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "--- FAIL: TestAdd (0.00s)\n    calc_test.go:9: Add(2, 3) = 6, want 5\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_times"
    }
   ]
  },
  "never_fail.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tgot := Add(2, 3)\n\twant := Add(2, 3)\n\tif got != want {\n\t\tt.Errorf(\"Add(2, 3) = %d, want %d\", got, want)\n\t}\n}\n",
   "stdout": "PASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_never",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_never"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_never"
    }
   ]
  },
  "calc_never/calc.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a * b\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "not_exported.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tfmt.Println(strings.toUpper(\"scoot\"))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./not_exported.go:9:22: undefined: strings.toUpper (but have ToUpper)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run not_exported.go",
     "out": "",
     "err": "# command-line-arguments\n./not_exported.go:9:22: undefined: strings.toUpper (but have ToUpper)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./not_exported.go:9:22: undefined: strings.toUpper\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run not_exported.go",
      "out": "",
      "err": "# command-line-arguments\n./not_exported.go:9:22: undefined: strings.toUpper\n",
      "exit": 1
     }
    ]
   }
  },
  "parsons_aaa.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestMax(t *testing.T) {\n\t// Arrange\n\ta, b := 3, 9\n\t// Act\n\tgot := Max(a, b)\n\t// Assert\n\tif got != 9 {\n\t\tt.Errorf(\"Max(3, 9) = %d, want 9\", got)\n\t}\n}\n",
   "stdout": "=== RUN   TestMax\n--- PASS: TestMax (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_aaa",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_aaa"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestMax\n--- PASS: TestMax (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_aaa"
    }
   ]
  },
  "calc_aaa/calc.go": {
   "src": "package calc\n\n// Max returns the bigger of a and b.\nfunc Max(a, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "predict_doc.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tfmt.Println(strings.Repeat(\"ab\", 2) + \"!\")\n\tfmt.Println(strings.Count(\"banana\", \"a\"))\n\tfmt.Println(strings.HasPrefix(\"gopher\", \"go\"))\n}\n",
   "stdout": "abab!\n3\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_doc.go",
     "out": "abab!\n3\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "quote.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\n\t\"rsc.io/quote\"\n)\n\nfunc main() {\n\tfmt.Println(quote.Go())\n}\n",
   "stdout": "Don't communicate by sharing memory, share memory by communicating.\n",
   "stderr": "main.go:6:2: no required module provides package rsc.io/quote; to add it:\n\tgo get rsc.io/quote\ngo: finding module for package rsc.io/quote\ngo: downloading rsc.io/quote v1.5.2\ngo: found rsc.io/quote in rsc.io/quote v1.5.2\ngo: downloading rsc.io/sampler v1.3.0\ngo: downloading golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run .",
     "out": "",
     "err": "main.go:6:2: no required module provides package rsc.io/quote; to add it:\n\tgo get rsc.io/quote\n",
     "exit": 1,
     "dir": "~/go-ch15/quote"
    },
    {
     "cmd": "go mod tidy",
     "out": "",
     "err": "go: finding module for package rsc.io/quote\ngo: downloading rsc.io/quote v1.5.2\ngo: found rsc.io/quote in rsc.io/quote v1.5.2\ngo: downloading rsc.io/sampler v1.3.0\ngo: downloading golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c\n",
     "exit": 0,
     "dir": "~/go-ch15/quote"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/hello\n\ngo 1.27.3\n\nrequire rsc.io/quote v1.5.2\n\nrequire (\n\tgolang.org/x/text v0.0.0-20170915032832-14c0d48ead0c // indirect\n\trsc.io/sampler v1.3.0 // indirect\n)\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/quote"
    },
    {
     "cmd": "cat go.sum",
     "out": "golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c h1:qgOY6WgZOaTkIIMiVjBQcw93ERBE4m30iBm00nkL0i8=\ngolang.org/x/text v0.0.0-20170915032832-14c0d48ead0c/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=\nrsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=\nrsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=\nrsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/QiW4=\nrsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9JXDnKaTXpA=\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/quote"
    },
    {
     "cmd": "go run .",
     "out": "Don't communicate by sharing memory, share memory by communicating.\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/quote"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "go: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\ngo: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\ncat: go.sum: No such file or directory\ngo: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run .",
      "out": "",
      "err": "go: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch15/quote"
     },
     {
      "cmd": "go mod tidy",
      "out": "",
      "err": "go: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch15/quote"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/hello\n\ngo 1.27.3\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15/quote"
     },
     {
      "cmd": "cat go.sum",
      "out": "",
      "err": "cat: go.sum: No such file or directory\n",
      "exit": 1,
      "dir": "~/go-ch15/quote"
     },
     {
      "cmd": "go run .",
      "out": "",
      "err": "go: go.mod requires go >= 1.27.3 (running go 1.24.7; GOTOOLCHAIN=local)\n",
      "exit": 1,
      "dir": "~/go-ch15/quote"
     }
    ]
   }
  },
  "rp_table.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a - b\n}\n",
   "stdout": "=== RUN   TestAdd\n=== RUN   TestAdd/positives\n    calc_test.go:19: Add(2, 3) = -1, want 5\n=== RUN   TestAdd/zeros\n=== RUN   TestAdd/negatives\n    calc_test.go:19: Add(-2, -3) = 1, want -5\n--- FAIL: TestAdd (0.00s)\n    --- FAIL: TestAdd/positives (0.00s)\n    --- PASS: TestAdd/zeros (0.00s)\n    --- FAIL: TestAdd/negatives (0.00s)\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_tbug",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_tbug"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestAdd\n=== RUN   TestAdd/positives\n    calc_test.go:19: Add(2, 3) = -1, want 5\n=== RUN   TestAdd/zeros\n=== RUN   TestAdd/negatives\n    calc_test.go:19: Add(-2, -3) = 1, want -5\n--- FAIL: TestAdd (0.00s)\n    --- FAIL: TestAdd/positives (0.00s)\n    --- PASS: TestAdd/zeros (0.00s)\n    --- FAIL: TestAdd/negatives (0.00s)\nFAIL\nexit status 1\nFAIL\texample.com/calc\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch15/calc_tbug"
    }
   ]
  },
  "s_doc.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tfmt.Println(strings.Repeat(\"=\", 10))\n}\n",
   "stdout": "package strings // import \"strings\"\n\nfunc Count(s, substr string) int\n    Count counts the number of non-overlapping instances of substr in s.\n    If substr is an empty string, Count returns 1 + the number of Unicode code\n    points in s.\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go doc strings.Repeat",
     "out": "package strings // import \"strings\"\n\nfunc Repeat(s string, count int) string\n    Repeat returns a new string consisting of count copies of the string s.\n\n    It panics if count is negative or if the result of (len(s) * count)\n    overflows.\n\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "go doc strings.Count",
     "out": "package strings // import \"strings\"\n\nfunc Count(s, substr string) int\n    Count counts the number of non-overlapping instances of substr in s.\n    If substr is an empty string, Count returns 1 + the number of Unicode code\n    points in s.\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "s_init.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"the shop is open\")\n}\n",
   "stdout": "the shop is open\n",
   "stderr": "go: creating new go.mod: module example/shop\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go mod init example/shop",
     "out": "",
     "err": "go: creating new go.mod: module example/shop\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
     "exit": 0,
     "dir": "~/go-ch15/newshop"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/shop\n\ngo 1.27.3\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/newshop"
    },
    {
     "cmd": "go run .",
     "out": "the shop is open\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/newshop"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "the shop is open\n",
    "stderr": "go: creating new go.mod: module example/shop\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "go mod init example/shop",
      "out": "",
      "err": "go: creating new go.mod: module example/shop\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
      "exit": 0,
      "dir": "~/go-ch15/newshop"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/shop\n\ngo 1.24.7\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15/newshop"
     },
     {
      "cmd": "go run .",
      "out": "the shop is open\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15/newshop"
     }
    ]
   }
  },
  "std_tour.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"math\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\tfmt.Println(strings.ToUpper(\"scoot\"))\n\tfmt.Println(strings.Repeat(\"go\", 3))\n\tfmt.Println(math.Sqrt(81))\n\tn, err := strconv.Atoi(\"42\")\n\tfmt.Println(n+1, err)\n}\n",
   "stdout": "SCOOT\ngogogo\n9\n43 <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run std_tour.go",
     "out": "SCOOT\ngogogo\n9\n43 <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "t_first.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tgot := Add(2, 3)\n\twant := 5\n\tif got != want {\n\t\tt.Errorf(\"Add(2, 3) = %d, want %d\", got, want)\n\t}\n}\n",
   "stdout": "=== RUN   TestAdd\n--- PASS: TestAdd (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "PASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestAdd\n--- PASS: TestAdd (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc"
    }
   ]
  },
  "calc/calc.go": {
   "src": "package calc\n\n// Add returns the sum of a and b.\nfunc Add(a, b int) int {\n\treturn a + b\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "table_loop.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc Add(a, b int) int {\n\treturn a - b\n}\n\nfunc main() {\n\tcases := []struct {\n\t\tname string\n\t\ta, b int\n\t\twant int\n\t}{\n\t\t{\"positives\", 2, 3, 5},\n\t\t{\"zeros\", 0, 0, 0},\n\t}\n\tfor _, tc := range cases {\n\t\tgot := Add(tc.a, tc.b)\n\t\tok := got == tc.want\n\t\tfmt.Println(tc.name, got, ok)\n\t}\n}\n",
   "stdout": "positives -1 false\nzeros 0 true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run table_loop.go",
     "out": "positives -1 false\nzeros 0 true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "table_pass.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tcases := []struct {\n\t\tname string\n\t\ta, b int\n\t\twant int\n\t}{\n\t\t{\"positives\", 2, 3, 5},\n\t\t{\"zeros\", 0, 0, 0},\n\t\t{\"negatives\", -2, -3, -5},\n\t}\n\tfor _, tc := range cases {\n\t\tt.Run(tc.name, func(t *testing.T) {\n\t\t\tgot := Add(tc.a, tc.b)\n\t\t\tif got != tc.want {\n\t\t\t\tt.Errorf(\"Add(%d, %d) = %d, want %d\", tc.a, tc.b, got, tc.want)\n\t\t\t}\n\t\t})\n\t}\n}\n",
   "stdout": "=== RUN   TestAdd\n=== RUN   TestAdd/positives\n=== RUN   TestAdd/zeros\n=== RUN   TestAdd/negatives\n--- PASS: TestAdd (0.00s)\n    --- PASS: TestAdd/positives (0.00s)\n    --- PASS: TestAdd/zeros (0.00s)\n    --- PASS: TestAdd/negatives (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd calc_table",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_table"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9.]+s$/…s/'",
     "out": "=== RUN   TestAdd\n=== RUN   TestAdd/positives\n=== RUN   TestAdd/zeros\n=== RUN   TestAdd/negatives\n--- PASS: TestAdd (0.00s)\n    --- PASS: TestAdd/positives (0.00s)\n    --- PASS: TestAdd/zeros (0.00s)\n    --- PASS: TestAdd/negatives (0.00s)\nPASS\nok  \texample.com/calc\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_table"
    }
   ]
  },
  "trace_mark.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tanswers := []int{5, 7, 9, 12}\n\tkey := []int{5, 8, 9, 11}\n\tscore := 0\n\tfor i := range key {\n\t\tok := answers[i] == key[i]\n\t\tif ok {\n\t\t\tscore++\n\t\t}\n\t\tfmt.Println(i+1, answers[i], key[i], ok, score)\n\t}\n}\n",
   "stdout": "1 5 5 true 1\n2 7 8 false 1\n3 9 9 true 2\n4 12 11 false 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_mark.go",
     "out": "1 5 5 true 1\n2 7 8 false 1\n3 9 9 true 2\n4 12 11 false 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "two_pkgs.go": {
   "src": "package util\n\n// Double returns twice n.\nfunc Double(n int) int {\n\treturn n * 2\n}\n",
   "stdout": "",
   "stderr": "found packages main (main.go) and util (util.go) in /home/you/go-ch15/twopkg\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd twopkg",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "go run .",
     "out": "",
     "err": "found packages main (main.go) and util (util.go) in /home/you/go-ch15/twopkg\n",
     "exit": 1,
     "dir": "~/go-ch15/twopkg"
    }
   ]
  },
  "twopkg/main.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(Double(21))\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "vet_fail.go": {
   "src": "package calc\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n\tgot := Add(2, 3)\n\tif got != 5 {\n\t\tt.Errorf(\"Add(2, 3) = %d, want %d\", got)\n\t}\n}\n",
   "stdout": "FAIL\texample.com/calc [build failed]\n",
   "stderr": "# example.com/calc\n# [example.com/calc]\n./calc_test.go:8:34: (*testing.common).Errorf format %d reads arg #2, but call has 1 arg\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd calc_vet",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch15/calc_vet"
    },
    {
     "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
     "out": "FAIL\texample.com/calc [build failed]\n",
     "err": "# example.com/calc\n# [example.com/calc]\n./calc_test.go:8:34: (*testing.common).Errorf format %d reads arg #2, but call has 1 arg\n",
     "exit": 1,
     "dir": "~/go-ch15/calc_vet"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "FAIL\texample.com/calc [build failed]\n",
    "stderr": "# example.com/calc\n# [example.com/calc]\n./calc_test.go:8:3: (*testing.common).Errorf format %d reads arg #2, but call has 1 arg\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd calc_vet",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15"
     },
     {
      "cmd": "set -o pipefail",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch15/calc_vet"
     },
     {
      "cmd": "go test | sed -E 's/[0-9.]+s$/…s/'",
      "out": "FAIL\texample.com/calc [build failed]\n",
      "err": "# example.com/calc\n# [example.com/calc]\n./calc_test.go:8:3: (*testing.common).Errorf format %d reads arg #2, but call has 1 arg\n",
      "exit": 1,
      "dir": "~/go-ch15/calc_vet"
     }
    ]
   }
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
