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
  "workdir": "/home/you/go-ch16",
  "versionDifferences": [
   "panicky.go",
   "panicky_short.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): panicky.go, panicky_short.go."
 },
 "programs": {
  "args.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tif len(os.Args) != 3 {\n\t\tfmt.Fprintln(os.Stderr, \"usage: args WHO ITEM\")\n\t\tos.Exit(1)\n\t}\n\tfmt.Println(\"words after the program name:\", len(os.Args)-1)\n\tfmt.Println(\"who:\", os.Args[1])\n\tfmt.Println(\"item:\", os.Args[2])\n}\n",
   "stdout": "words after the program name: 2\nwho: Scoot\nitem: crown\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run args.go Scoot crown",
     "out": "words after the program name: 2\nwho: Scoot\nitem: crown\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "args2.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(len(os.Args))\n\tfmt.Println(os.Args[1], \"found a\", os.Args[2])\n\tfmt.Println(\"points:\", os.Args[3]+\"0\")\n}\n",
   "stdout": "4\nKit found a gem\npoints: 150\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run args2.go Kit gem 15",
     "out": "4\nKit found a gem\npoints: 150\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "args_missing.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tif len(os.Args) != 3 {\n\t\tfmt.Fprintln(os.Stderr, \"usage: args WHO ITEM\")\n\t\tos.Exit(1)\n\t}\n\tfmt.Println(\"words after the program name:\", len(os.Args)-1)\n\tfmt.Println(\"who:\", os.Args[1])\n\tfmt.Println(\"item:\", os.Args[2])\n}\n",
   "stdout": "",
   "stderr": "usage: args WHO ITEM\nexit status 1\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run args.go",
     "out": "",
     "err": "usage: args WHO ITEM\nexit status 1\n",
     "exit": 1
    }
   ]
  },
  "board_s1.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\n// Haul is one line of the log: who found what, for how many points.\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\n// parseLine turns \"Scoot crown 50\" into a Haul, or says what is wrong.\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, fmt.Errorf(\"points %q is not a whole number\", f[2])\n\t}\n\treturn Haul{Who: f[0], Item: f[1], Points: pts}, nil\n}\n",
   "stdout": "=== RUN   TestParseLine\n    loot_test.go:30: parseLine(\"Kit coin -5\") = {Kit coin -5}, \"\"; want {  0}, \"points must be more than 0, got -5\"\n--- FAIL: TestParseLine (…s)\nFAIL\nexit status 1\nFAIL\texample/loot\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd loot_s1",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_s1"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestParseLine\n    loot_test.go:30: parseLine(\"Kit coin -5\") = {Kit coin -5}, \"\"; want {  0}, \"points must be more than 0, got -5\"\n--- FAIL: TestParseLine (…s)\nFAIL\nexit status 1\nFAIL\texample/loot\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch16/loot_s1"
    }
   ]
  },
  "loot_s1/loot_test.go": {
   "src": "package main\n\nimport (\n\t\"testing\"\n)\n\n// errText turns an error into its message, and \"no error\" into \"\".\nfunc errText(err error) string {\n\tif err == nil {\n\t\treturn \"\"\n\t}\n\treturn err.Error()\n}\n\nfunc TestParseLine(t *testing.T) {\n\ttests := []struct {\n\t\tline    string\n\t\twant    Haul\n\t\twantErr string\n\t}{\n\t\t{\"Scoot crown 50\", Haul{\"Scoot\", \"crown\", 50}, \"\"},\n\t\t{\"  Wren   map  20 \", Haul{\"Wren\", \"map\", 20}, \"\"},\n\t\t{\"Scoot crown\", Haul{}, \"want 3 words, got 2\"},\n\t\t{\"Kit gem lots\", Haul{}, `points \"lots\" is not a whole number`},\n\t\t{\"Kit coin -5\", Haul{}, \"points must be more than 0, got -5\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := parseLine(tt.line)\n\t\tif got != tt.want || errText(err) != tt.wantErr {\n\t\t\tt.Errorf(\"parseLine(%q) = %v, %q; want %v, %q\",\n\t\t\t\ttt.line, got, errText(err), tt.want, tt.wantErr)\n\t\t}\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "board_s2.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\n// Haul is one line of the log: who found what, for how many points.\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\n// parseLine turns \"Scoot crown 50\" into a Haul, or says what is wrong.\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, fmt.Errorf(\"points %q is not a whole number\", f[2])\n\t}\n\tif pts <= 0 {\n\t\treturn Haul{}, fmt.Errorf(\"points must be more than 0, got %d\", pts)\n\t}\n\treturn Haul{Who: f[0], Item: f[1], Points: pts}, nil\n}\n",
   "stdout": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\nPASS\nok  \texample/loot\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot_s2",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_s2"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\nPASS\nok  \texample/loot\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_s2"
    }
   ]
  },
  "loot_s2/loot_test.go": {
   "src": "package main\n\nimport (\n\t\"strings\"\n\t\"testing\"\n)\n\n// errText turns an error into its message, and \"no error\" into \"\".\nfunc errText(err error) string {\n\tif err == nil {\n\t\treturn \"\"\n\t}\n\treturn err.Error()\n}\n\nfunc TestParseLine(t *testing.T) {\n\ttests := []struct {\n\t\tline    string\n\t\twant    Haul\n\t\twantErr string\n\t}{\n\t\t{\"Scoot crown 50\", Haul{\"Scoot\", \"crown\", 50}, \"\"},\n\t\t{\"  Wren   map  20 \", Haul{\"Wren\", \"map\", 20}, \"\"},\n\t\t{\"Scoot crown\", Haul{}, \"want 3 words, got 2\"},\n\t\t{\"Kit gem lots\", Haul{}, `points \"lots\" is not a whole number`},\n\t\t{\"Kit coin -5\", Haul{}, \"points must be more than 0, got -5\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := parseLine(tt.line)\n\t\tif got != tt.want || errText(err) != tt.wantErr {\n\t\t\tt.Errorf(\"parseLine(%q) = %v, %q; want %v, %q\",\n\t\t\t\ttt.line, got, errText(err), tt.want, tt.wantErr)\n\t\t}\n\t}\n}\n\nfunc TestReadHauls(t *testing.T) {\n\ttests := []struct {\n\t\tinput   string\n\t\twant    int\n\t\twantErr string\n\t}{\n\t\t{\"Scoot crown 50\\n\\nWren map 20\\n\", 2, \"\"},\n\t\t{\"Scoot crown 50\\nKit gem lots\\n\", 0, `line 2: points \"lots\" is not a whole number`},\n\t\t{\"\", 0, \"no loot lines to count\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := readHauls(strings.NewReader(tt.input))\n\t\tif len(got) != tt.want || errText(err) != tt.wantErr {\n\t\t\tt.Errorf(\"readHauls(%q) = %d hauls, %q; want %d, %q\",\n\t\t\t\ttt.input, len(got), errText(err), tt.want, tt.wantErr)\n\t\t}\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "board_s3.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// report draws the table: a heading, a row per crew member, the total.\nfunc report(totals []Total) string {\n\tout := fmt.Sprintf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\titems, points := 0, 0\n\tfor i := 0; i < len(totals)-1; i++ {\n\t\tt := totals[i]\n\t\tout += fmt.Sprintf(\"%-8s %5d %6d\\n\", t.Who, t.Items, t.Points)\n\t\titems += t.Items\n\t\tpoints += t.Points\n\t}\n\tout += fmt.Sprintf(\"%-8s %5d %6d\\n\", \"TOTAL\", items, points)\n\treturn out\n}\n",
   "stdout": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\n=== RUN   TestTally\n--- PASS: TestTally (…s)\n=== RUN   TestReport\n    loot_test.go:87: report([{Scoot 1 50}]) gave:\n        CREW     ITEMS POINTS\n        TOTAL        0      0\n        want:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        TOTAL        1     50\n    loot_test.go:87: report([{Scoot 1 50} {Wren 2 25}]) gave:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        TOTAL        1     50\n        want:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        Wren         2     25\n        TOTAL        3     75\n--- FAIL: TestReport (…s)\nFAIL\nexit status 1\nFAIL\texample/loot\t…s\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd loot_s3",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_s3"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\n=== RUN   TestTally\n--- PASS: TestTally (…s)\n=== RUN   TestReport\n    loot_test.go:87: report([{Scoot 1 50}]) gave:\n        CREW     ITEMS POINTS\n        TOTAL        0      0\n        want:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        TOTAL        1     50\n    loot_test.go:87: report([{Scoot 1 50} {Wren 2 25}]) gave:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        TOTAL        1     50\n        want:\n        CREW     ITEMS POINTS\n        Scoot        1     50\n        Wren         2     25\n        TOTAL        3     75\n--- FAIL: TestReport (…s)\nFAIL\nexit status 1\nFAIL\texample/loot\t…s\n",
     "err": "",
     "exit": 1,
     "dir": "~/go-ch16/loot_s3"
    }
   ]
  },
  "board_s4.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// report draws the table: a heading, a row per crew member, the total.\nfunc report(totals []Total) string {\n\tout := fmt.Sprintf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\titems, points := 0, 0\n\tfor _, t := range totals {\n\t\tout += fmt.Sprintf(\"%-8s %5d %6d\\n\", t.Who, t.Items, t.Points)\n\t\titems += t.Items\n\t\tpoints += t.Points\n\t}\n\tout += fmt.Sprintf(\"%-8s %5d %6d\\n\", \"TOTAL\", items, points)\n\treturn out\n}\n",
   "stdout": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\n=== RUN   TestTally\n--- PASS: TestTally (…s)\n=== RUN   TestReport\n--- PASS: TestReport (…s)\nPASS\nok  \texample/loot\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestParseLine\n--- PASS: TestParseLine (…s)\n=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\n=== RUN   TestTally\n--- PASS: TestTally (…s)\n=== RUN   TestReport\n--- PASS: TestReport (…s)\nPASS\nok  \texample/loot\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "loot/loot_test.go": {
   "src": "package main\n\nimport (\n\t\"slices\"\n\t\"strings\"\n\t\"testing\"\n)\n\n// errText turns an error into its message, and \"no error\" into \"\".\nfunc errText(err error) string {\n\tif err == nil {\n\t\treturn \"\"\n\t}\n\treturn err.Error()\n}\n\nfunc TestParseLine(t *testing.T) {\n\ttests := []struct {\n\t\tline    string\n\t\twant    Haul\n\t\twantErr string\n\t}{\n\t\t{\"Scoot crown 50\", Haul{\"Scoot\", \"crown\", 50}, \"\"},\n\t\t{\"  Wren   map  20 \", Haul{\"Wren\", \"map\", 20}, \"\"},\n\t\t{\"Scoot crown\", Haul{}, \"want 3 words, got 2\"},\n\t\t{\"Kit gem lots\", Haul{}, `points \"lots\" is not a whole number`},\n\t\t{\"Kit coin -5\", Haul{}, \"points must be more than 0, got -5\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := parseLine(tt.line)\n\t\tif got != tt.want || errText(err) != tt.wantErr {\n\t\t\tt.Errorf(\"parseLine(%q) = %v, %q; want %v, %q\",\n\t\t\t\ttt.line, got, errText(err), tt.want, tt.wantErr)\n\t\t}\n\t}\n}\n\nfunc TestReadHauls(t *testing.T) {\n\ttests := []struct {\n\t\tinput   string\n\t\twant    int\n\t\twantErr string\n\t}{\n\t\t{\"Scoot crown 50\\n\\nWren map 20\\n\", 2, \"\"},\n\t\t{\"Scoot crown 50\\nKit gem lots\\n\", 0, `line 2: points \"lots\" is not a whole number`},\n\t\t{\"\", 0, \"no loot lines to count\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := readHauls(strings.NewReader(tt.input))\n\t\tif len(got) != tt.want || errText(err) != tt.wantErr {\n\t\t\tt.Errorf(\"readHauls(%q) = %d hauls, %q; want %d, %q\",\n\t\t\t\ttt.input, len(got), errText(err), tt.want, tt.wantErr)\n\t\t}\n\t}\n}\n\nfunc TestTally(t *testing.T) {\n\ttests := []struct {\n\t\thauls []Haul\n\t\twant  []Total\n\t}{\n\t\t{[]Haul{{\"Scoot\", \"crown\", 50}}, []Total{{\"Scoot\", 1, 50}}},\n\t\t{[]Haul{{\"Wren\", \"map\", 20}, {\"Scoot\", \"crown\", 50}, {\"Wren\", \"key\", 5}},\n\t\t\t[]Total{{\"Scoot\", 1, 50}, {\"Wren\", 2, 25}}},\n\t}\n\tfor _, tt := range tests {\n\t\tgot := tally(tt.hauls)\n\t\tif !slices.Equal(got, tt.want) {\n\t\t\tt.Errorf(\"tally(%v) = %v; want %v\", tt.hauls, got, tt.want)\n\t\t}\n\t}\n}\n\nfunc TestReport(t *testing.T) {\n\ttests := []struct {\n\t\ttotals []Total\n\t\twant   string\n\t}{\n\t\t{[]Total{{\"Scoot\", 1, 50}},\n\t\t\t\"CREW     ITEMS POINTS\\nScoot        1     50\\nTOTAL        1     50\\n\"},\n\t\t{[]Total{{\"Scoot\", 1, 50}, {\"Wren\", 2, 25}},\n\t\t\t\"CREW     ITEMS POINTS\\nScoot        1     50\\nWren         2     25\\nTOTAL        3     75\\n\"},\n\t}\n\tfor _, tt := range tests {\n\t\tgot := report(tt.totals)\n\t\tif got != tt.want {\n\t\t\tt.Errorf(\"report(%v) gave:\\n%swant:\\n%s\", tt.totals, got, tt.want)\n\t\t}\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "loot/parse.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\n// Haul is one line of the log: who found what, for how many points.\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\n// parseLine turns \"Scoot crown 50\" into a Haul, or says what is wrong.\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, fmt.Errorf(\"points %q is not a whole number\", f[2])\n\t}\n\tif pts <= 0 {\n\t\treturn Haul{}, fmt.Errorf(\"points must be more than 0, got %d\", pts)\n\t}\n\treturn Haul{Who: f[0], Item: f[1], Points: pts}, nil\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "loot/read.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"errors\"\n\t\"fmt\"\n\t\"io\"\n\t\"strings\"\n)\n\n// readHauls reads every line of r, skips blank ones, and stops at a bad one.\nfunc readHauls(r io.Reader) ([]Haul, error) {\n\tvar hauls []Haul\n\tsc := bufio.NewScanner(r)\n\tlineNo := 0\n\tfor sc.Scan() {\n\t\tlineNo++\n\t\tline := sc.Text()\n\t\tif strings.TrimSpace(line) == \"\" {\n\t\t\tcontinue\n\t\t}\n\t\th, err := parseLine(line)\n\t\tif err != nil {\n\t\t\treturn nil, fmt.Errorf(\"line %d: %w\", lineNo, err)\n\t\t}\n\t\thauls = append(hauls, h)\n\t}\n\tif err := sc.Err(); err != nil {\n\t\treturn nil, err\n\t}\n\tif len(hauls) == 0 {\n\t\treturn nil, errors.New(\"no loot lines to count\")\n\t}\n\treturn hauls, nil\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "loot/tally.go": {
   "src": "package main\n\nimport (\n\t\"maps\"\n\t\"slices\"\n)\n\n// Total is one crew member's score so far.\ntype Total struct {\n\tWho    string\n\tItems  int\n\tPoints int\n}\n\n// tally adds up the hauls for each crew member, sorted by name.\nfunc tally(hauls []Haul) []Total {\n\tbyWho := map[string]Total{}\n\tfor _, h := range hauls {\n\t\tt := byWho[h.Who]\n\t\tt.Who = h.Who\n\t\tt.Items++\n\t\tt.Points += h.Points\n\t\tbyWho[h.Who] = t\n\t}\n\tvar totals []Total\n\tfor _, who := range slices.Sorted(maps.Keys(byWho)) {\n\t\ttotals = append(totals, byWho[who])\n\t}\n\treturn totals\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss6_run.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "",
   "stderr": "loot: line 8: points must be more than 0, got 0\nexit status 1\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "cat ../boss6.txt",
     "out": "Wren map 20\nScoot crown 50\nKit gem 15\nWren key 5\n\nScoot coin 10\nWren cup 12\nKit gem 0\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "go run . < ../boss6.txt",
     "out": "",
     "err": "loot: line 8: points must be more than 0, got 0\nexit status 1\n",
     "exit": 1,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\ntype Total struct {\n\tWho    string\n\tItems  int\n\tPoints int\n}\n\nfunc tally(hauls []Haul) []Total {\n\tbyWho := map[string]Total{}\n\tfor _, h := range hauls {\n\t\tt := byWho[h.Who]\n\t\tt.Who = h.Who\n\t\tt.Items++\n\t\tt.Points += h.Points\n\t\tbyWho[h.Who] = t\n\t}\n\tvar totals []Total\n\tfor _, who := range slices.Sorted(maps.Keys(byWho)) {\n\t\ttotals = append(totals, byWho[who])\n\t}\n\treturn totals\n}\n\nfunc main() {\n\thauls := []Haul{\n\t\t{\"Wren\", \"map\", 20}, {\"Kit\", \"gem\", 15}, {\"Wren\", \"key\", 5},\n\t}\n\tfor _, t := range tally(hauls) {\n\t\tfmt.Println(t.Who, t.Items, t.Points)\n\t}\n}\n",
   "stdout": "Kit 1 15\nWren 2 25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "Kit 1 15\nWren 2 25\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tsc := bufio.NewScanner(strings.NewReader(\"Kit gem 7\\n\\nWren map 20\\n\"))\n\tlineNo, kept := 0, 0\n\tfor sc.Scan() {\n\t\tlineNo++\n\t\tline := sc.Text()\n\t\tif strings.TrimSpace(line) == \"\" {\n\t\t\tfmt.Println(lineNo, \"skipped\")\n\t\t\tcontinue\n\t\t}\n\t\tkept++\n\t\tfmt.Println(lineNo, \"kept, haul number\", kept)\n\t}\n\tfmt.Println(kept, \"of\", lineNo, \"lines kept\")\n}\n",
   "stdout": "1 kept, haul number 1\n2 skipped\n3 kept, haul number 2\n2 of 3 lines kept\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "1 kept, haul number 1\n2 skipped\n3 kept, haul number 2\n2 of 3 lines kept\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n\t\"slices\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\tlog := \"Kit gem 7\\nWren map 20\\n\\nKit cup 3\\nWren key\\nScoot coin 4\"\n\tpoints := map[string]int{}\n\tfor i, line := range strings.Split(log, \"\\n\") {\n\t\tf := strings.Fields(line)\n\t\tif len(f) == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tif len(f) != 3 {\n\t\t\tfmt.Println(\"skip line\", i+1)\n\t\t\tcontinue\n\t\t}\n\t\tp, err := strconv.Atoi(f[2])\n\t\tif err != nil {\n\t\t\tfmt.Println(\"skip line\", i+1)\n\t\t\tcontinue\n\t\t}\n\t\tpoints[f[0]] += p\n\t}\n\tfor _, who := range slices.Sorted(maps.Keys(points)) {\n\t\tfmt.Printf(\"%-6s%3d\\n\", who, points[who])\n\t}\n}\n",
   "stdout": "skip line 5\nKit    10\nScoot   4\nWren   20\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "skip line 5\nKit    10\nScoot   4\nWren   20\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\ntype Total struct {\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\thauls := []Haul{\n\t\t{\"Wren\", \"map\", 20}, {\"Scoot\", \"crown\", 50}, {\"Wren\", \"key\", 5},\n\t}\n\tbyWho := map[string]Total{}\n\tfor _, h := range hauls {\n\t\tt := byWho[h.Who]\n\t\tt.Items++\n\t\tt.Points += h.Points\n\t\tbyWho[h.Item] = t\n\t}\n\tfmt.Println(byWho)\n}\n",
   "stdout": "map[crown:{1 50} key:{1 5} map:{1 20}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "map[crown:{1 50} key:{1 5} map:{1 20}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc check(line string) string {\n\tf := strings.Fields(line)\n\tif len(f) == 0 {\n\t\treturn \"blank\"\n\t}\n\tif len(f) != 3 {\n\t\treturn \"words\"\n\t}\n\tp, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn \"number\"\n\t}\n\tif p <= 0 {\n\t\treturn \"zero-or-less\"\n\t}\n\treturn \"ok\"\n}\n\nfunc main() {\n\tlines := []string{\n\t\t\"Kit gem 7\", \"Wren map\", \"   \", \"Scoot coin 0\", \"Wren key five\", \"Kit cup 3 4\",\n\t}\n\tfor i, line := range lines {\n\t\tfmt.Println(i+1, len(strings.Fields(line)), check(line))\n\t}\n}\n",
   "stdout": "1 3 ok\n2 2 words\n3 0 blank\n4 3 zero-or-less\n5 3 number\n6 4 words\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "1 3 ok\n2 2 words\n3 0 blank\n4 3 zero-or-less\n5 3 number\n6 4 words\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fields_trace.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc main() {\n\tlines := []string{\n\t\t\"Scoot crown 50\", \"  Wren   map  20 \", \"Kit gem\", \"\", \"Kit coin 5 extra\",\n\t}\n\tfor i, line := range lines {\n\t\tf := strings.Fields(line)\n\t\tfmt.Println(i+1, len(f))\n\t}\n}\n",
   "stdout": "1 3\n2 3\n3 2\n4 0\n5 4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fields_trace.go",
     "out": "1 3\n2 3\n3 2\n4 0\n5 4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_parse.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, err\n\t}\n\treturn Haul{Who: f[0], Item: f[1], Points: pts}, nil\n}\n\nfunc main() {\n\th, err := parseLine(\"Wren map 20\")\n\tfmt.Println(h.Who, h.Points, err)\n\t_, err = parseLine(\"Wren map\")\n\tfmt.Println(err)\n}\n",
   "stdout": "Wren 20 <nil>\nwant 3 words, got 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_parse.go",
     "out": "Wren 20 <nil>\nwant 3 words, got 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_report.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Total struct {\n\tWho    string\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\ttotals := []Total{{\"Kit\", 1, 15}, {\"Scoot\", 2, 60}}\n\tfmt.Printf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\tfor _, t := range totals {\n\t\tfmt.Printf(\"%-8s %5d %6d\\n\", t.Who, t.Items, t.Points)\n\t}\n}\n",
   "stdout": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_report.go",
     "out": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_want.go": {
   "src": "package main\n\nimport (\n\t\"slices\"\n\t\"testing\"\n)\n\nfunc TestTally(t *testing.T) {\n\ttests := []struct {\n\t\thauls []Haul\n\t\twant  []Total\n\t}{\n\t\t{[]Haul{{\"Kit\", \"gem\", 15}}, []Total{{\"Kit\", 1, 15}}},\n\t\t{[]Haul{{\"Kit\", \"gem\", 15}, {\"Kit\", \"cup\", 8}}, []Total{{\"Kit\", 2, 23}}},\n\t\t{[]Haul{{\"Wren\", \"map\", 20}, {\"Kit\", \"gem\", 15}}, []Total{{\"Kit\", 1, 15}, {\"Wren\", 1, 20}}},\n\t}\n\tfor _, tt := range tests {\n\t\tgot := tally(tt.hauls)\n\t\tif !slices.Equal(got, tt.want) {\n\t\t\tt.Errorf(\"tally(%v) = %v; want %v\", tt.hauls, got, tt.want)\n\t\t}\n\t}\n}\n",
   "stdout": "=== RUN   TestTally\n--- PASS: TestTally (…s)\nPASS\nok  \texample/loot\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot_tt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_tt"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestTally\n--- PASS: TestTally (…s)\nPASS\nok  \texample/loot\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_tt"
    }
   ]
  },
  "mapfield.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Total struct {\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\tbyWho := map[string]Total{}\n\tbyWho[\"Wren\"] = Total{}\n\tbyWho[\"Wren\"].Items++\n\tfmt.Println(byWho)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./mapfield.go:13:2: cannot assign to struct field byWho[\"Wren\"].Items in map\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run mapfield.go",
     "out": "",
     "err": "# command-line-arguments\n./mapfield.go:13:2: cannot assign to struct field byWho[\"Wren\"].Items in map\n",
     "exit": 1
    }
   ]
  },
  "monolith.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\titems := map[string]int{}\n\tpoints := map[string]int{}\n\tvar names []string\n\tsc := bufio.NewScanner(os.Stdin)\n\tfor sc.Scan() {\n\t\tf := strings.Fields(sc.Text())\n\t\tif len(f) == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tp, _ := strconv.Atoi(f[2])\n\t\tif items[f[0]] == 0 {\n\t\t\tnames = append(names, f[0])\n\t\t}\n\t\titems[f[0]]++\n\t\tpoints[f[0]] += p\n\t}\n\tfmt.Printf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\tti, tp := 0, 0\n\tfor _, n := range names {\n\t\tfmt.Printf(\"%-8s %5d %6d\\n\", n, items[n], points[n])\n\t\tti += items[n]\n\t\ttp += points[n]\n\t}\n\tfmt.Printf(\"%-8s %5d %6d\\n\", \"TOTAL\", ti, tp)\n}\n",
   "stdout": "CREW     ITEMS POINTS\nWren         3     37\nScoot        2     60\nKit          1     15\nTOTAL        6    112\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run monolith.go < haul.txt",
     "out": "CREW     ITEMS POINTS\nWren         3     37\nScoot        2     60\nKit          1     15\nTOTAL        6    112\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "monolith_bad.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\titems := map[string]int{}\n\tpoints := map[string]int{}\n\tvar names []string\n\tsc := bufio.NewScanner(os.Stdin)\n\tfor sc.Scan() {\n\t\tf := strings.Fields(sc.Text())\n\t\tif len(f) == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tp, _ := strconv.Atoi(f[2])\n\t\tif items[f[0]] == 0 {\n\t\t\tnames = append(names, f[0])\n\t\t}\n\t\titems[f[0]]++\n\t\tpoints[f[0]] += p\n\t}\n\tfmt.Printf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\tti, tp := 0, 0\n\tfor _, n := range names {\n\t\tfmt.Printf(\"%-8s %5d %6d\\n\", n, items[n], points[n])\n\t\tti += items[n]\n\t\ttp += points[n]\n\t}\n\tfmt.Printf(\"%-8s %5d %6d\\n\", \"TOTAL\", ti, tp)\n}\n",
   "stdout": "CREW     ITEMS POINTS\nScoot        1     50\nKit          1      0\nWren         1     20\nTOTAL        3     70\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run monolith.go < bad.txt",
     "out": "CREW     ITEMS POINTS\nScoot        1     50\nKit          1      0\nWren         1     20\nTOTAL        3     70\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "noreturn.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, err\n\t}\n\treturn Haul{f[0], f[1], pts}\n}\n\nfunc main() {\n\tfmt.Println(parseLine(\"Scoot crown 50\"))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./noreturn.go:21:9: not enough return values\n\thave (Haul)\n\twant (Haul, error)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run noreturn.go",
     "out": "",
     "err": "# command-line-arguments\n./noreturn.go:21:9: not enough return values\n\thave (Haul)\n\twant (Haul, error)\n",
     "exit": 1
    }
   ]
  },
  "offbyone.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Total struct {\n\tWho    string\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\ttotals := []Total{\n\t\t{\"Kit\", 1, 15}, {\"Scoot\", 2, 60}, {\"Wren\", 3, 37},\n\t}\n\tfmt.Printf(\"%-8s %5s %6s\\n\", \"CREW\", \"ITEMS\", \"POINTS\")\n\titems, points := 0, 0\n\tfor i := 0; i < len(totals)-1; i++ {\n\t\tt := totals[i]\n\t\tfmt.Printf(\"%-8s %5d %6d\\n\", t.Who, t.Items, t.Points)\n\t\titems += t.Items\n\t\tpoints += t.Points\n\t}\n\tfmt.Printf(\"%-8s %5d %6d\\n\", \"TOTAL\", items, points)\n}\n",
   "stdout": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nTOTAL        3     75\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run offbyone.go",
     "out": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nTOTAL        3     75\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "osexit_defer.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tdefer fmt.Println(\"sticky note: tidy up\")\n\tfmt.Println(\"counting the loot...\")\n\tfmt.Fprintln(os.Stderr, \"loot: line 2 is broken\")\n\tos.Exit(1)\n}\n",
   "stdout": "counting the loot...\n",
   "stderr": "loot: line 2 is broken\nexit status 1\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run osexit_defer.go",
     "out": "counting the loot...\n",
     "err": "loot: line 2 is broken\nexit status 1\n",
     "exit": 1,
     "merged": "counting the loot...\nloot: line 2 is broken\nexit status 1\n"
    }
   ]
  },
  "panicky.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\tlines := []string{\"Scoot crown 50\", \"Kit gem lots\", \"Wren map 20\"}\n\tfor _, line := range lines {\n\t\tf := strings.Fields(line)\n\t\tpts, err := strconv.Atoi(f[2])\n\t\tif err != nil {\n\t\t\tpanic(err)\n\t\t}\n\t\tfmt.Println(f[0], \"found\", f[1], \"worth\", pts)\n\t}\n\tfmt.Println(\"all lines counted\")\n}\n",
   "stdout": "Scoot found crown worth 50\n",
   "stderr": "panic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x1fa\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run panicky.go",
     "out": "Scoot found crown worth 50\n",
     "err": "panic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x1fa\nexit status 2\n",
     "exit": 1,
     "merged": "Scoot found crown worth 50\npanic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x1fa\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Scoot found crown worth 50\n",
    "stderr": "panic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x21a\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run panicky.go",
      "out": "Scoot found crown worth 50\n",
      "err": "panic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x21a\nexit status 2\n",
      "exit": 1,
      "merged": "Scoot found crown worth 50\npanic: strconv.Atoi: parsing \"lots\": invalid syntax\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky.go:15 +0x21a\nexit status 2\n"
     }
    ]
   }
  },
  "panicky_short.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\nfunc main() {\n\tlines := []string{\"Scoot crown 50\", \"Wren map\"}\n\tfor _, line := range lines {\n\t\tf := strings.Fields(line)\n\t\tpts, err := strconv.Atoi(f[2])\n\t\tif err != nil {\n\t\t\tpanic(err)\n\t\t}\n\t\tfmt.Println(f[0], \"found\", f[1], \"worth\", pts)\n\t}\n}\n",
   "stdout": "Scoot found crown worth 50\n",
   "stderr": "panic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1aa\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run panicky_short.go",
     "out": "Scoot found crown worth 50\n",
     "err": "panic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1aa\nexit status 2\n",
     "exit": 1,
     "merged": "Scoot found crown worth 50\npanic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1aa\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Scoot found crown worth 50\n",
    "stderr": "panic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1d2\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run panicky_short.go",
      "out": "Scoot found crown worth 50\n",
      "err": "panic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1d2\nexit status 2\n",
      "exit": 1,
      "merged": "Scoot found crown worth 50\npanic: runtime error: index out of range [2] with length 2\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch16/panicky_short.go:13 +0x1d2\nexit status 2\n"
     }
    ]
   }
  },
  "parse_machine.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"strconv\"\n\t\"strings\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, fmt.Errorf(\"points %q is not a whole number\", f[2])\n\t}\n\tif pts <= 0 {\n\t\treturn Haul{}, fmt.Errorf(\"points must be more than 0, got %d\", pts)\n\t}\n\treturn Haul{Who: f[0], Item: f[1], Points: pts}, nil\n}\n\nfunc main() {\n\tlines := []string{\n\t\t\"Scoot crown 50\", \"  Wren   map  20 \", \"Scoot crown\",\n\t\t\"Kit gem lots\", \"Kit coin -5\", \"Kit gem 7 shiny\",\n\t}\n\tfor _, line := range lines {\n\t\th, err := parseLine(line)\n\t\tif err != nil {\n\t\t\tfmt.Fprintln(os.Stderr, \"error:\", err)\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Printf(\"%+v\\n\", h)\n\t}\n}\n",
   "stdout": "{Who:Scoot Item:crown Points:50}\n{Who:Wren Item:map Points:20}\n",
   "stderr": "error: want 3 words, got 2\nerror: points \"lots\" is not a whole number\nerror: points must be more than 0, got -5\nerror: want 3 words, got 4\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parse_machine.go",
     "out": "{Who:Scoot Item:crown Points:50}\n{Who:Wren Item:map Points:20}\n",
     "err": "error: want 3 words, got 2\nerror: points \"lots\" is not a whole number\nerror: points must be more than 0, got -5\nerror: want 3 words, got 4\n",
     "exit": 0,
     "merged": "{Who:Scoot Item:crown Points:50}\n{Who:Wren Item:map Points:20}\nerror: want 3 words, got 2\nerror: points \"lots\" is not a whole number\nerror: points must be more than 0, got -5\nerror: want 3 words, got 4\n"
    }
   ]
  },
  "parse_three.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, fmt.Errorf(\"points %q is not a whole number\", f[2])\n\t}\n\treturn Haul{f[0], f[1], pts}, nil\n}\n\nfunc main() {\n\tfmt.Println(parseLine(\"Kit gem 15\"))\n\tfmt.Println(parseLine(\"Kit gem\"))\n\tfmt.Println(parseLine(\"Kit gem many\"))\n}\n",
   "stdout": "{Kit gem 15} <nil>\n{  0} want 3 words, got 2\n{  0} points \"many\" is not a whole number\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parse_three.go",
     "out": "{Kit gem 15} <nil>\n{  0} want 3 words, got 2\n{  0} points \"many\" is not a whole number\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_test.go": {
   "src": "package main\n\nimport (\n\t\"strings\"\n\t\"testing\"\n)\n\nfunc TestReadHauls(t *testing.T) {\n\ttests := []struct {\n\t\tinput string\n\t\twant  int\n\t}{\n\t\t{\"Kit gem 15\\n\", 1},\n\t\t{\"Kit gem 15\\n\\n\\nWren map 20\\n\", 2},\n\t}\n\tfor _, tt := range tests {\n\t\tgot, err := readHauls(strings.NewReader(tt.input))\n\t\tif err != nil {\n\t\t\tt.Fatalf(\"readHauls(%q) error: %v\", tt.input, err)\n\t\t}\n\t\tif len(got) != tt.want {\n\t\t\tt.Errorf(\"readHauls(%q) = %d hauls; want %d\", tt.input, len(got), tt.want)\n\t\t}\n\t}\n}\n",
   "stdout": "=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\nPASS\nok  \texample/loot\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot_pz",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "set -o pipefail",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_pz"
    },
    {
     "cmd": "go test -v | sed -E 's/[0-9]+\\.[0-9]+s/…s/'",
     "out": "=== RUN   TestReadHauls\n--- PASS: TestReadHauls (…s)\nPASS\nok  \texample/loot\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot_pz"
    }
   ]
  },
  "run_bad.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "",
   "stderr": "loot: line 2: points \"lots\" is not a whole number\nexit status 1\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "cat bad.txt",
     "out": "Scoot crown 50\nKit gem lots\nWren map 20\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "go run . < bad.txt",
     "out": "",
     "err": "loot: line 2: points \"lots\" is not a whole number\nexit status 1\n",
     "exit": 1,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "run_empty.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "",
   "stderr": "loot: no loot lines to count\nexit status 1\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "go run . < empty.txt",
     "out": "",
     "err": "loot: no loot lines to count\nexit status 1\n",
     "exit": 1,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "run_good.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nWren         3     37\nTOTAL        6    112\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "cat haul.txt",
     "out": "Wren map 20\nScoot crown 50\nKit gem 15\nWren key 5\n\nScoot coin 10\nWren cup 12\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "go run . < haul.txt",
     "out": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nWren         3     37\nTOTAL        6    112\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "scan_lines.go": {
   "src": "package main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tsc := bufio.NewScanner(os.Stdin)\n\tlineNo := 0\n\tfor sc.Scan() {\n\t\tlineNo++\n\t\tfmt.Printf(\"line %d: %q\\n\", lineNo, sc.Text())\n\t}\n\tfmt.Println(\"lines read:\", lineNo)\n}\n",
   "stdout": "line 1: \"Wren map 20\"\nline 2: \"Scoot crown 50\"\nline 3: \"Kit gem 15\"\nline 4: \"Wren key 5\"\nline 5: \"\"\nline 6: \"Scoot coin 10\"\nline 7: \"Wren cup 12\"\nlines read: 7\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run scan_lines.go < haul.txt",
     "out": "line 1: \"Wren map 20\"\nline 2: \"Scoot crown 50\"\nline 3: \"Kit gem 15\"\nline 4: \"Wren key 5\"\nline 5: \"\"\nline 6: \"Scoot coin 10\"\nline 7: \"Wren cup 12\"\nlines read: 7\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ship.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "1\n",
   "stderr": "loot: line 2: points \"lots\" is not a whole number\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "rm -f loot scores.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "go build",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "ls",
     "out": "bad.txt\nempty.txt\ngo.mod\nhaul.txt\nloot\nloot_test.go\nmain.go\nparse.go\nread.go\nreport.go\ntally.go\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "./loot < haul.txt",
     "out": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nWren         3     37\nTOTAL        6    112\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "./loot < bad.txt",
     "out": "",
     "err": "loot: line 2: points \"lots\" is not a whole number\n",
     "exit": 1,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "echo $?",
     "out": "1\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "ship_redirect.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\thauls, err := readHauls(os.Stdin)\n\tif err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"loot:\", err)\n\t\tos.Exit(1)\n\t}\n\ttotals := tally(hauls)\n\tfmt.Print(report(totals))\n}\n",
   "stdout": "",
   "stderr": "loot: line 2: points \"lots\" is not a whole number\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd loot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16"
    },
    {
     "cmd": "go build",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "./loot < haul.txt > scores.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "cat scores.txt",
     "out": "CREW     ITEMS POINTS\nKit          1     15\nScoot        2     60\nWren         3     37\nTOTAL        6    112\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "./loot < bad.txt > scores.txt",
     "out": "",
     "err": "loot: line 2: points \"lots\" is not a whole number\n",
     "exit": 1,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "echo $?",
     "out": "1\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    },
    {
     "cmd": "cat scores.txt",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch16/loot"
    }
   ]
  },
  "swallow.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n)\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\nfunc parseLine(line string) (Haul, error) {\n\tf := strings.Fields(line)\n\tif len(f) != 3 {\n\t\treturn Haul{}, fmt.Errorf(\"want 3 words, got %d\", len(f))\n\t}\n\tpts, err := strconv.Atoi(f[2])\n\tif err != nil {\n\t\treturn Haul{}, err\n\t}\n\treturn Haul{f[0], f[1], pts}, nil\n}\n\nfunc main() {\n\tlines := []string{\"Scoot crown 50\", \"Kit gem lots\", \"Wren map 20\"}\n\tcount, total := 0, 0\n\tfor _, line := range lines {\n\t\th, _ := parseLine(line)\n\t\tcount++\n\t\ttotal += h.Points\n\t\tfmt.Println(h)\n\t}\n\tfmt.Println(count, \"hauls,\", total, \"points\")\n}\n",
   "stdout": "{Scoot crown 50}\n{  0}\n{Wren map 20}\n3 hauls, 70 points\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run swallow.go",
     "out": "{Scoot crown 50}\n{  0}\n{Wren map 20}\n3 hauls, 70 points\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tally_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\ntype Total struct {\n\tWho    string\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\thauls := []Haul{\n\t\t{\"Wren\", \"map\", 20},\n\t\t{\"Scoot\", \"crown\", 50},\n\t\t{\"Wren\", \"key\", 5},\n\t}\n\tbyWho := map[string]Total{}\n\tfor _, h := range hauls {\n\t\tt := byWho[h.Who]\n\t\tt.Who = h.Who\n\t\tt.Items++\n\t\tt.Points += h.Points\n\t\tbyWho[h.Who] = t\n\t}\n\tfmt.Println(byWho)\n}\n",
   "stdout": "map[Scoot:{Scoot 1 50} Wren:{Wren 2 25}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run tally_trace.go",
     "out": "map[Scoot:{Scoot 1 50} Wren:{Wren 2 25}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_tally.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Haul struct {\n\tWho    string\n\tItem   string\n\tPoints int\n}\n\ntype Total struct {\n\tItems  int\n\tPoints int\n}\n\nfunc main() {\n\thauls := []Haul{\n\t\t{\"Kit\", \"gem\", 15}, {\"Wren\", \"map\", 20}, {\"Kit\", \"cup\", 8},\n\t\t{\"Scoot\", \"crown\", 50}, {\"Wren\", \"key\", 5},\n\t}\n\tbyWho := map[string]Total{}\n\tfor _, h := range hauls {\n\t\tt := byWho[h.Who]\n\t\tt.Items++\n\t\tt.Points += h.Points\n\t\tbyWho[h.Who] = t\n\t\tfmt.Println(h.Who, t.Items, t.Points)\n\t}\n}\n",
   "stdout": "Kit 1 15\nWren 1 20\nKit 2 23\nScoot 1 50\nWren 2 25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_tally.go",
     "out": "Kit 1 15\nWren 1 20\nKit 2 23\nScoot 1 50\nWren 2 25\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unused_err.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tpts, err := strconv.Atoi(\"lots\")\n\tfmt.Println(\"points:\", pts)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./unused_err.go:9:7: declared and not used: err\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unused_err.go",
     "out": "",
     "err": "# command-line-arguments\n./unused_err.go:9:7: declared and not used: err\n",
     "exit": 1
    }
   ]
  },
  "widths.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Printf(\"[%s]\\n\", \"Kit\")\n\tfmt.Printf(\"[%8s]\\n\", \"Kit\")\n\tfmt.Printf(\"[%-8s]\\n\", \"Kit\")\n\tfmt.Printf(\"[%5d]\\n\", 42)\n\tfmt.Printf(\"[%-5d]\\n\", 42)\n\tfmt.Printf(\"[%3d]\\n\", 12345)\n\tfmt.Printf(\"[%-8s]\\n\", \"Scoot-the-Swift\")\n}\n",
   "stdout": "[Kit]\n[     Kit]\n[Kit     ]\n[   42]\n[42   ]\n[12345]\n[Scoot-the-Swift]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run widths.go",
     "out": "[Kit]\n[     Kit]\n[Kit     ]\n[   42]\n[42   ]\n[12345]\n[Scoot-the-Swift]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "widths_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Printf(\"[%-6s][%4d]\\n\", \"Kit\", 7)\n\tfmt.Printf(\"[%-6s][%4d]\\n\", \"Scoot\", 150)\n}\n",
   "stdout": "[Kit   ][   7]\n[Scoot ][ 150]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run widths_predict.go",
     "out": "[Kit   ][   7]\n[Scoot ][ 150]\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
