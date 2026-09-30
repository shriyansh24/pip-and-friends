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
  "workdir": "/home/you/go-ch28",
  "versionDifferences": [
   "allocs_m.go",
   "profile.go",
   "slices_grow.go",
   "vet_me.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): allocs_m.go, profile.go, slices_grow.go, vet_me.go."
 },
 "programs": {
  "allocs.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n\t\"testing\"\n)\n\nvar words = []string{\"red\", \"cap\", \"green\", \"jacket\", \"satchel\", \"of\", \"letters\", \"!\"}\n\nvar keep string // results go here, so the work can't be skipped\n\nfunc plus() string {\n\ts := \"\"\n\tfor _, w := range words {\n\t\ts += w\n\t}\n\treturn s\n}\n\nfunc builder() string {\n\tvar b strings.Builder\n\tfor _, w := range words {\n\t\tb.WriteString(w)\n\t}\n\treturn b.String()\n}\n\nfunc main() {\n\tfmt.Println(\"+=      :\", testing.AllocsPerRun(100, func() { keep = plus() }))\n\tfmt.Println(\"Builder :\", testing.AllocsPerRun(100, func() { keep = builder() }))\n\tfmt.Println(keep)\n}\n",
   "stdout": "+=      : 7\nBuilder : 4\nredcapgreenjacketsatchelofletters!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run allocs.go",
     "out": "+=      : 7\nBuilder : 4\nredcapgreenjacketsatchelofletters!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "allocs_m.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n\t\"strings\"\n\t\"testing\"\n)\n\nvar (\n\tkeepS   string\n\tkeepInt []int\n\tkeepMap map[int]bool\n\twords   = []string{\"red\", \"cap\", \"green\", \"jacket\", \"satchel\", \"of\", \"letters\", \"!\"}\n)\n\nfunc count(name string, f func()) {\n\tfmt.Println(name+\":\", testing.AllocsPerRun(100, f))\n}\n\nfunc main() {\n\tcount(\"+= 8 words\", func() {\n\t\ts := \"\"\n\t\tfor _, w := range words {\n\t\t\ts += w\n\t\t}\n\t\tkeepS = s\n\t})\n\tcount(\"Builder 8 words\", func() {\n\t\tvar b strings.Builder\n\t\tfor _, w := range words {\n\t\t\tb.WriteString(w)\n\t\t}\n\t\tkeepS = b.String()\n\t})\n\tcount(\"Builder with Grow\", func() {\n\t\tvar b strings.Builder\n\t\tb.Grow(40)\n\t\tfor _, w := range words {\n\t\t\tb.WriteString(w)\n\t\t}\n\t\tkeepS = b.String()\n\t})\n\tcount(\"append 1000, no cap\", func() {\n\t\tvar s []int\n\t\tfor i := range 1000 {\n\t\t\ts = append(s, i)\n\t\t}\n\t\tkeepInt = s\n\t})\n\tcount(\"append 1000, cap 1000\", func() {\n\t\ts := make([]int, 0, 1000)\n\t\tfor i := range 1000 {\n\t\t\ts = append(s, i)\n\t\t}\n\t\tkeepInt = s\n\t})\n\tcount(\"map 1000, no size\", func() {\n\t\tm := map[int]bool{}\n\t\tfor i := range 1000 {\n\t\t\tm[i] = true\n\t\t}\n\t\tkeepMap = m\n\t})\n\tcount(\"map 1000, size 1000\", func() {\n\t\tm := make(map[int]bool, 1000)\n\t\tfor i := range 1000 {\n\t\t\tm[i] = true\n\t\t}\n\t\tkeepMap = m\n\t})\n\tcount(\"strconv.Itoa(42)\", func() { keepS = strconv.Itoa(42) })\n\tcount(\"fmt.Sprint(4242)\", func() { keepS = fmt.Sprint(4242) })\n}\n",
   "stdout": "+= 8 words: 7\nBuilder 8 words: 4\nBuilder with Grow: 1\nappend 1000, no cap: 9\nappend 1000, cap 1000: 1\nmap 1000, no size: 22\nmap 1000, size 1000: 6\nstrconv.Itoa(42): 0\nfmt.Sprint(4242): 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run allocs_m.go",
     "out": "+= 8 words: 7\nBuilder 8 words: 4\nBuilder with Grow: 1\nappend 1000, no cap: 9\nappend 1000, cap 1000: 1\nmap 1000, no size: 22\nmap 1000, size 1000: 6\nstrconv.Itoa(42): 0\nfmt.Sprint(4242): 1\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "+= 8 words: 7\nBuilder 8 words: 4\nBuilder with Grow: 1\nappend 1000, no cap: 12\nappend 1000, cap 1000: 1\nmap 1000, no size: 22\nmap 1000, size 1000: 6\nstrconv.Itoa(42): 0\nfmt.Sprint(4242): 1\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run allocs_m.go",
      "out": "+= 8 words: 7\nBuilder 8 words: 4\nBuilder with Grow: 1\nappend 1000, no cap: 12\nappend 1000, cap 1000: 1\nmap 1000, no size: 22\nmap 1000, size 1000: 6\nstrconv.Itoa(42): 0\nfmt.Sprint(4242): 1\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "append_alias.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc withExtra(base []string, extra string) []string {\n\treturn append(base, extra)\n}\n\nfunc main() {\n\tbase := make([]string, 2, 4)\n\tbase[0], base[1] = \"Ada\", \"Bo\"\n\ta := withExtra(base, \"Cy\")\n\tb := withExtra(base, \"Di\")\n\tfmt.Println(a, b)\n}\n",
   "stdout": "[Ada Bo Di] [Ada Bo Di]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run append_alias.go",
     "out": "[Ada Bo Di] [Ada Bo Di]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "append_fix.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc withExtra(base []string, extra string) []string {\n\treturn append(slices.Clip(base), extra)\n}\n\nfunc main() {\n\tbase := make([]string, 2, 4)\n\tbase[0], base[1] = \"Ada\", \"Bo\"\n\ta := withExtra(base, \"Cy\")\n\tb := withExtra(base, \"Di\")\n\tfmt.Println(a, b)\n}\n",
   "stdout": "[Ada Bo Cy] [Ada Bo Di]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run append_fix.go",
     "out": "[Ada Bo Cy] [Ada Bo Di]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bench.go": {
   "src": "package labels\n\nimport \"testing\"\n\nvar lines = []string{\n\t\"Ada\", \"12 Hill Road\", \"Flat 3\", \"Northtown\",\n\t\"NT1 2AB\", \"Fragile\", \"Leave with a neighbour\", \"Thanks!\",\n\t\"Ada\", \"12 Hill Road\", \"Flat 3\", \"Northtown\",\n\t\"NT1 2AB\", \"Fragile\", \"Leave with a neighbour\", \"Thanks!\",\n}\n\nfunc BenchmarkPlus(b *testing.B) {\n\tfor b.Loop() {\n\t\tJoinPlus(lines)\n\t}\n}\n\nfunc BenchmarkBuilder(b *testing.B) {\n\tfor b.Loop() {\n\t\tJoinBuilder(lines)\n\t}\n}\n\nfunc BenchmarkGrow(b *testing.B) {\n\tfor b.Loop() {\n\t\tJoinGrow(lines)\n\t}\n}\n",
   "stdout": "goos: linux\ngoarch: amd64\npkg: example.com/labels\ncpu: Intel(R) Xeon(R) Processor @ 2.10GHz\nBenchmarkPlus-2      \t    1000\t… ns/op\t    1444 B/op\t      16 allocs/op\nBenchmarkBuilder-2   \t    1000\t… ns/op\t     504 B/op\t       6 allocs/op\nBenchmarkGrow-2      \t    1000\t… ns/op\t     176 B/op\t       1 allocs/op\nPASS\nok  \texample.com/labels\t…s\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd labels",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28"
    },
    {
     "cmd": "go test -bench=. -benchmem -benchtime=1000x | sed -E 's/\\t *[0-9.]+ ns\\/op/\\t… ns\\/op/; s/\\t[0-9.]+s$/\\t…s/'",
     "out": "goos: linux\ngoarch: amd64\npkg: example.com/labels\ncpu: Intel(R) Xeon(R) Processor @ 2.10GHz\nBenchmarkPlus-2      \t    1000\t… ns/op\t    1444 B/op\t      16 allocs/op\nBenchmarkBuilder-2   \t    1000\t… ns/op\t     504 B/op\t       6 allocs/op\nBenchmarkGrow-2      \t    1000\t… ns/op\t     176 B/op\t       1 allocs/op\nPASS\nok  \texample.com/labels\t…s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28/labels"
    }
   ]
  },
  "labels/label.go": {
   "src": "// Package labels builds the address labels Scoot prints each morning.\npackage labels\n\nimport \"strings\"\n\n// JoinPlus glues the lines together with +=.\nfunc JoinPlus(lines []string) string {\n\ts := \"\"\n\tfor _, l := range lines {\n\t\ts += l + \"\\n\"\n\t}\n\treturn s\n}\n\n// JoinBuilder glues the lines together with a strings.Builder.\nfunc JoinBuilder(lines []string) string {\n\tvar b strings.Builder\n\tfor _, l := range lines {\n\t\tb.WriteString(l)\n\t\tb.WriteString(\"\\n\")\n\t}\n\treturn b.String()\n}\n\n// JoinGrow measures first, reserves room once, then writes.\nfunc JoinGrow(lines []string) string {\n\tn := 0\n\tfor _, l := range lines {\n\t\tn += len(l) + 1\n\t}\n\tvar b strings.Builder\n\tb.Grow(n)\n\tfor _, l := range lines {\n\t\tb.WriteString(l)\n\t\tb.WriteString(\"\\n\")\n\t}\n\treturn b.String()\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "boss_err.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvar err error\n\tif true {\n\t\tn, err := strconv.Atoi(\"7\")\n\t\tfmt.Println(n)\n\t}\n\tfmt.Println(err)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:11:6: declared and not used: err\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:11:6: declared and not used: err\n",
     "exit": 1
    }
   ]
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc summary(orders []string) string {\n\tcounts := make(map[string]int, len(orders))\n\tfor _, o := range orders {\n\t\tcounts[o]++\n\t}\n\tvar b strings.Builder\n\tb.Grow(16 * len(counts))\n\tfor _, item := range []string{\"tea\", \"books\", \"socks\"} {\n\t\tfmt.Fprintf(&b, \"%s=%d \", item, counts[item])\n\t}\n\treturn b.String()\n}\n\nfunc main() {\n\tfmt.Println(summary([]string{\"tea\", \"socks\", \"tea\", \"books\", \"tea\"}))\n}\n",
   "stdout": "tea=3 books=1 socks=1 \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "tea=3 books=1 socks=1 \n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n\t\"testing\"\n)\n\nfunc label(lines []string) string {\n\tvar b strings.Builder\n\tn := 0\n\tfor _, l := range lines {\n\t\tn += len(l) + 1\n\t}\n\tb.Grow(n)\n\tfor _, l := range lines {\n\t\tb.WriteString(l)\n\t\tb.WriteString(\"\\n\")\n\t}\n\treturn b.String()\n}\n\nfunc main() {\n\tlines := []string{\"Ada\", \"12 Hill Road\", \"Northtown\"}\n\tfmt.Print(label(lines))\n\tfmt.Println(\"allocs:\", testing.AllocsPerRun(100, func() { label(lines) }))\n}\n",
   "stdout": "Ada\n12 Hill Road\nNorthtown\nallocs: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "Ada\n12 Hill Road\nNorthtown\nallocs: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Tally struct{ n int }\n\nfunc (t Tally) Bump() { t.n++ }\n\nfunc main() {\n\ttallies := []Tally{{1}, {2}}\n\tfor _, t := range tallies {\n\t\tt.n += 10\n\t}\n\ttallies[0].Bump()\n\ttotal := 0\n\tfor _, t := range tallies {\n\t\ttotal := total + t.n\n\t\tfmt.Println(total)\n\t}\n\tfmt.Println(total)\n}\n",
   "stdout": "1\n2\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "1\n2\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\ntype Route struct {\n\tstops []string\n}\n\nfunc (r Route) AddStop(s string) {\n\tr.stops = append(r.stops, s)\n}\n\nfunc (r *Route) String() string {\n\treturn strings.Join(r.stops, \" -> \")\n}\n\nfunc main() {\n\tr := &Route{stops: []string{\"Depot\"}}\n\tr.AddStop(\"Hill Road\")\n\tr.AddStop(\"Market\")\n\tfmt.Println(r.String())\n}\n",
   "stdout": "Depot\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "Depot\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot_fix.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\ntype Route struct {\n\tstops []string\n}\n\nfunc (r *Route) AddStop(s string) {\n\tr.stops = append(r.stops, s)\n}\n\nfunc (r *Route) String() string {\n\treturn strings.Join(r.stops, \" -> \")\n}\n\nfunc main() {\n\tr := &Route{stops: []string{\"Depot\"}}\n\tr.AddStop(\"Hill Road\")\n\tr.AddStop(\"Market\")\n\tfmt.Println(r.String())\n}\n",
   "stdout": "Depot -> Hill Road -> Market\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot_fix.go",
     "out": "Depot -> Hill Road -> Market\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := make([]int, 0, 3)\n\tfor i := 1; i <= 7; i++ {\n\t\ts = append(s, i)\n\t\tfmt.Println(i, len(s), cap(s))\n\t}\n}\n",
   "stdout": "1 1 3\n2 2 3\n3 3 3\n4 4 6\n5 5 6\n6 6 6\n7 7 12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "1 1 3\n2 2 3\n3 3 3\n4 4 6\n5 5 6\n6 6 6\n7 7 12\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "clever.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"testing\"\n)\n\nvar keepN int\nvar keepS string\n\n// fee: the readable version.\nfunc fee(kg int) int {\n\tif kg <= 5 {\n\t\treturn 5\n\t}\n\treturn 5 + 2*(kg-5)\n}\n\n// feeClever: an afternoon of \"optimising\", with no stopwatch.\nfunc feeClever(kg int) int {\n\td := kg - 5\n\treturn 5 + (d&^(d>>63))<<1\n}\n\nfunc label(lines []string) string {\n\ts := \"\"\n\tfor _, l := range lines {\n\t\ts += l + \"\\n\"\n\t}\n\treturn s\n}\n\nfunc main() {\n\tlines := []string{\"Ada\", \"12 Hill Road\", \"Flat 3\", \"Northtown\", \"NT1 2AB\", \"Fragile\", \"Thanks!\", \"Ada\"}\n\tfmt.Println(\"same answers:\", fee(3) == feeClever(3), fee(9) == feeClever(9))\n\tfmt.Println(\"fee       allocs:\", testing.AllocsPerRun(100, func() { keepN = fee(9) }))\n\tfmt.Println(\"feeClever allocs:\", testing.AllocsPerRun(100, func() { keepN = feeClever(9) }))\n\tfmt.Println(\"label     allocs:\", testing.AllocsPerRun(100, func() { keepS = label(lines) }))\n}\n",
   "stdout": "same answers: true true\nfee       allocs: 0\nfeeClever allocs: 0\nlabel     allocs: 8\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run clever.go",
     "out": "same answers: true true\nfee       allocs: 0\nfeeClever allocs: 0\nlabel     allocs: 8\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "conv.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"strings\"\n\t\"testing\"\n)\n\nvar parcel = bytes.Repeat([]byte(\"box,\"), 250) // 1000 bytes from a file\nvar n int\n\nfunc main() {\n\t// converts all 1000 bytes into a new string, just to count commas\n\tfmt.Println(\"strings.Count(string(b)):\", testing.AllocsPerRun(100, func() {\n\t\tn = strings.Count(string(parcel), \",\")\n\t}))\n\t// the bytes package has the same function for []byte\n\tfmt.Println(\"bytes.Count(b):          \", testing.AllocsPerRun(100, func() {\n\t\tn = bytes.Count(parcel, []byte(\",\"))\n\t}))\n\tfmt.Println(\"commas:\", n)\n}\n",
   "stdout": "strings.Count(string(b)): 1\nbytes.Count(b):           0\ncommas: 250\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run conv.go",
     "out": "strings.Count(string(b)): 1\nbytes.Count(b):           0\ncommas: 250\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "defer_args.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstatus := \"packing\"\n\tdefer fmt.Println(\"final status:\", status)\n\tstatus = \"delivered\"\n\tfmt.Println(\"status now:\", status)\n}\n",
   "stdout": "status now: delivered\nfinal status: packing\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run defer_args.go",
     "out": "status now: delivered\nfinal status: packing\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "defer_args_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tstatus := \"packing\"\n\tdefer func() { fmt.Println(\"final status:\", status) }()\n\tstatus = \"delivered\"\n\tfmt.Println(\"status now:\", status)\n}\n",
   "stdout": "status now: delivered\nfinal status: delivered\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run defer_args_fix.go",
     "out": "status now: delivered\nfinal status: delivered\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "defer_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Door struct{ n int }\n\nfunc open(n int) *Door {\n\tfmt.Println(\"open door\", n)\n\treturn &Door{n}\n}\n\nfunc (d *Door) Close() { fmt.Println(\"close door\", d.n) }\n\nfunc deliver(i int) {\n\td := open(i)\n\tdefer d.Close() // runs when deliver returns: every lap\n\tfmt.Println(\"deliver through door\", i)\n}\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tdeliver(i)\n\t}\n\tfmt.Println(\"all delivered\")\n}\n",
   "stdout": "open door 1\ndeliver through door 1\nclose door 1\nopen door 2\ndeliver through door 2\nclose door 2\nopen door 3\ndeliver through door 3\nclose door 3\nall delivered\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run defer_fix.go",
     "out": "open door 1\ndeliver through door 1\nclose door 1\nopen door 2\ndeliver through door 2\nclose door 2\nopen door 3\ndeliver through door 3\nclose door 3\nall delivered\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "defer_loop.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Door struct{ n int }\n\nfunc open(n int) *Door {\n\tfmt.Println(\"open door\", n)\n\treturn &Door{n}\n}\n\nfunc (d *Door) Close() { fmt.Println(\"close door\", d.n) }\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\td := open(i)\n\t\tdefer d.Close() // waits until main returns\n\t\tfmt.Println(\"deliver through door\", i)\n\t}\n\tfmt.Println(\"all delivered\")\n}\n",
   "stdout": "open door 1\ndeliver through door 1\nopen door 2\ndeliver through door 2\nopen door 3\ndeliver through door 3\nall delivered\nclose door 3\nclose door 2\nclose door 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run defer_loop.go",
     "out": "open door 1\ndeliver through door 1\nopen door 2\ndeliver through door 2\nopen door 3\ndeliver through door 3\nall delivered\nclose door 3\nclose door 2\nclose door 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "docs.go": {
   "src": "// Package depot keeps track of the parcels waiting at a courier depot.\npackage depot\n\n// A Shelf holds parcels in the order they arrived.\n// The zero value is an empty shelf, ready to use.\ntype Shelf struct {\n\towner   string\n\tparcels []string\n}\n\n// Owner returns the name of the courier who looks after the shelf.\nfunc (s *Shelf) Owner() string { return s.owner }\n\n// SetOwner hands the shelf to a courier.\nfunc (s *Shelf) SetOwner(name string) { s.owner = name }\n\n// Add puts a parcel on the end of the shelf.\nfunc (s *Shelf) Add(parcel string) { s.parcels = append(s.parcels, parcel) }\n\n// Len reports how many parcels are waiting.\nfunc (s *Shelf) Len() int { return len(s.parcels) }\n",
   "stdout": "package depot // import \"example.com/depot\"\n\nPackage depot keeps track of the parcels waiting at a courier depot.\n\nTYPES\n\ntype Shelf struct {\n\t// Has unexported fields.\n}\n    A Shelf holds parcels in the order they arrived. The zero value is an empty\n    shelf, ready to use.\n\nfunc (s *Shelf) Add(parcel string)\n    Add puts a parcel on the end of the shelf.\n\nfunc (s *Shelf) Len() int\n    Len reports how many parcels are waiting.\n\nfunc (s *Shelf) Owner() string\n    Owner returns the name of the courier who looks after the shelf.\n\nfunc (s *Shelf) SetOwner(name string)\n    SetOwner hands the shelf to a courier.\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd depot",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28"
    },
    {
     "cmd": "go doc -all",
     "out": "package depot // import \"example.com/depot\"\n\nPackage depot keeps track of the parcels waiting at a courier depot.\n\nTYPES\n\ntype Shelf struct {\n\t// Has unexported fields.\n}\n    A Shelf holds parcels in the order they arrived. The zero value is an empty\n    shelf, ready to use.\n\nfunc (s *Shelf) Add(parcel string)\n    Add puts a parcel on the end of the shelf.\n\nfunc (s *Shelf) Len() int\n    Len reports how many parcels are waiting.\n\nfunc (s *Shelf) Owner() string\n    Owner returns the name of the courier who looks after the shelf.\n\nfunc (s *Shelf) SetOwner(name string)\n    SetOwner hands the shelf to a courier.\n\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28/depot"
    }
   ]
  },
  "escape.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tTo string\n\tKg int\n}\n\nfunc weigh(kg int) int {\n\tp := Parcel{To: \"Ada\", Kg: kg} // used here, then forgotten\n\treturn p.Kg * 2\n}\n\nfunc newParcel(kg int) *Parcel {\n\tp := Parcel{To: \"Ada\", Kg: kg}\n\treturn &p // the address leaves the function\n}\n\nfunc main() {\n\tw := weigh(3)\n\tq := newParcel(5)\n\tfmt.Println(w, q.Kg)\n}\n",
   "stdout": "6 5\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go build -gcflags=-m escape.go 2>&1 | grep heap",
     "out": "./escape.go:16:2: moved to heap: p\n./escape.go:23:14: w escapes to heap\n./escape.go:23:18: q.Kg escapes to heap\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "./escape",
     "out": "6 5\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_builder.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc label(lines []string) string {\n\tvar b strings.Builder\n\tfor _, l := range lines {\n\t\tb.WriteString(l)\n\t\tb.WriteString(\" / \")\n\t}\n\treturn b.String()\n}\n\nfunc main() {\n\tfmt.Println(label([]string{\"Ada\", \"12 Hill Road\", \"Northtown\"}))\n}\n",
   "stdout": "Ada / 12 Hill Road / Northtown / \n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_builder.go",
     "out": "Ada / 12 Hill Road / Northtown / \n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_make.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc weights(orders []string) []int {\n\tkgs := make([]int, 0, len(orders))\n\tfor _, o := range orders {\n\t\tkgs = append(kgs, len(o))\n\t}\n\treturn kgs\n}\n\nfunc main() {\n\tws := weights([]string{\"tea\", \"books\", \"ok\"})\n\tfmt.Println(ws, len(ws), cap(ws))\n}\n",
   "stdout": "[3 5 2] 3 3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_make.go",
     "out": "[3 5 2] 3 3\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "flat.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc ship(kg int, address string) error {\n\tif kg <= 0 {\n\t\treturn errors.New(\"no weight\")\n\t}\n\tif address == \"\" {\n\t\treturn errors.New(\"no address\")\n\t}\n\tif kg > 20 {\n\t\treturn errors.New(\"too heavy\")\n\t}\n\tfmt.Println(\"shipping\", kg, \"kg to\", address)\n\treturn nil\n}\n\nfunc main() {\n\tfmt.Println(ship(3, \"Hill Road\"))\n\tfmt.Println(ship(30, \"Hill Road\"))\n\tfmt.Println(ship(3, \"\"))\n\tfmt.Println(ship(0, \"Hill Road\"))\n}\n",
   "stdout": "shipping 3 kg to Hill Road\n<nil>\ntoo heavy\nno address\nno weight\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run flat.go",
     "out": "shipping 3 kg to Hill Road\n<nil>\ntoo heavy\nno address\nno weight\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "growth.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n\t\"testing\"\n)\n\nvar keep string\n\nfunc plus(parts int) string {\n\ts := \"\"\n\tfor range parts {\n\t\ts += \"abcd\"\n\t}\n\treturn s\n}\n\nfunc builder(parts int) string {\n\tvar b strings.Builder\n\tfor range parts {\n\t\tb.WriteString(\"abcd\")\n\t}\n\treturn b.String()\n}\n\nfunc main() {\n\tfor parts := 1; parts <= 64; parts *= 2 {\n\t\tp := testing.AllocsPerRun(50, func() { keep = plus(parts) })\n\t\tb := testing.AllocsPerRun(50, func() { keep = builder(parts) })\n\t\tfmt.Println(parts, p, b)\n\t}\n}\n",
   "stdout": "1 0 1\n2 1 1\n4 3 2\n8 7 3\n16 15 4\n32 31 5\n64 63 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run growth.go",
     "out": "1 0 1\n2 1 1\n4 3 2\n8 7 3\n16 15 4\n32 31 5\n64 63 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "json_empty.go": {
   "src": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n)\n\ntype Report struct {\n\tCourier string   `json:\"courier\"`\n\tLate    []string `json:\"late\"`\n}\n\nfunc lateParcels(all map[string]bool) []string {\n\tlate := []string{} // empty, not nil: JSON says []\n\tfor id, isLate := range all {\n\t\tif isLate {\n\t\t\tlate = append(late, id)\n\t\t}\n\t}\n\treturn late\n}\n\nfunc main() {\n\tr := Report{\"Scoot\", lateParcels(map[string]bool{\"p1\": false})}\n\tout, _ := json.Marshal(r)\n\tfmt.Println(string(out))\n}\n",
   "stdout": "{\"courier\":\"Scoot\",\"late\":[]}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run json_empty.go",
     "out": "{\"courier\":\"Scoot\",\"late\":[]}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "json_nil.go": {
   "src": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n)\n\ntype Report struct {\n\tCourier string   `json:\"courier\"`\n\tLate    []string `json:\"late\"`\n}\n\nfunc lateParcels(all map[string]bool) []string {\n\tvar late []string // nil until something is late\n\tfor id, isLate := range all {\n\t\tif isLate {\n\t\t\tlate = append(late, id)\n\t\t}\n\t}\n\treturn late\n}\n\nfunc main() {\n\tr := Report{\"Scoot\", lateParcels(map[string]bool{\"p1\": false})}\n\tout, _ := json.Marshal(r)\n\tfmt.Println(string(out))\n}\n",
   "stdout": "{\"courier\":\"Scoot\",\"late\":null}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run json_nil.go",
     "out": "{\"courier\":\"Scoot\",\"late\":null}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nested.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc ship(kg int, address string) error {\n\tif kg > 0 {\n\t\tif address != \"\" {\n\t\t\tif kg <= 20 {\n\t\t\t\tfmt.Println(\"shipping\", kg, \"kg to\", address)\n\t\t\t\treturn nil\n\t\t\t} else {\n\t\t\t\treturn errors.New(\"too heavy\")\n\t\t\t}\n\t\t} else {\n\t\t\treturn errors.New(\"no address\")\n\t\t}\n\t} else {\n\t\treturn errors.New(\"no weight\")\n\t}\n}\n\nfunc main() {\n\tfmt.Println(ship(3, \"Hill Road\"))\n\tfmt.Println(ship(30, \"Hill Road\"))\n\tfmt.Println(ship(3, \"\"))\n\tfmt.Println(ship(0, \"Hill Road\"))\n}\n",
   "stdout": "shipping 3 kg to Hill Road\n<nil>\ntoo heavy\nno address\nno weight\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nested.go",
     "out": "shipping 3 kg to Hill Road\n<nil>\ntoo heavy\nno address\nno weight\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nilmap.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Depot struct {\n\tstock map[string]int // zero value: nil\n}\n\nfunc (d *Depot) Receive(item string) {\n\td.stock[item]++\n}\n\nfunc main() {\n\tvar d Depot\n\tfmt.Println(\"reading is fine:\", d.stock[\"box\"])\n\td.Receive(\"box\")\n\tfmt.Println(\"never printed\")\n}\n",
   "stdout": "reading is fine: 0\n",
   "stderr": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.(*Depot).Receive(...)\n\t/home/you/go-ch28/nilmap.go:10\nmain.main()\n\t/home/you/go-ch28/nilmap.go:16 +0xb4\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nilmap.go",
     "out": "reading is fine: 0\n",
     "err": "panic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.(*Depot).Receive(...)\n\t/home/you/go-ch28/nilmap.go:10\nmain.main()\n\t/home/you/go-ch28/nilmap.go:16 +0xb4\nexit status 2\n",
     "exit": 1,
     "merged": "reading is fine: 0\npanic: assignment to entry in nil map\n\ngoroutine 1 [running]:\nmain.(*Depot).Receive(...)\n\t/home/you/go-ch28/nilmap.go:10\nmain.main()\n\t/home/you/go-ch28/nilmap.go:16 +0xb4\nexit status 2\n"
    }
   ]
  },
  "nilslice.go": {
   "src": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n)\n\nfunc main() {\n\tvar a []string  // nil slice\n\tb := []string{} // empty, but not nil\n\tfmt.Println(len(a), len(b))\n\tfmt.Println(a == nil, b == nil)\n\tja, _ := json.Marshal(a)\n\tjb, _ := json.Marshal(b)\n\tfmt.Println(string(ja), string(jb))\n\ta = append(a, \"x\")\n\tfmt.Println(a)\n}\n",
   "stdout": "0 0\ntrue false\nnull []\n[x]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run nilslice.go",
     "out": "0 0\ntrue false\nnull []\n[x]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "once.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"log\"\n\t\"os\"\n)\n\nfunc load(name string) error {\n\t_, err := os.ReadFile(name)\n\tif err != nil {\n\t\treturn fmt.Errorf(\"read %s: %w\", name, err)\n\t}\n\treturn nil\n}\n\nfunc route(day string) error {\n\tif err := load(day + \".txt\"); err != nil {\n\t\treturn fmt.Errorf(\"load route: %w\", err)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tlog.SetFlags(0)\n\tlog.SetOutput(os.Stdout)\n\tif err := route(\"monday\"); err != nil {\n\t\tlog.Println(\"giving up:\", err)\n\t\tfmt.Println(errors.Is(err, os.ErrNotExist))\n\t}\n}\n",
   "stdout": "giving up: load route: read monday.txt: open monday.txt: no such file or directory\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run once.go",
     "out": "giving up: load route: read monday.txt: open monday.txt: no such file or directory\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_flat.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc ship(kg int, address string) error {\n\tif address == \"\" {\n\t\treturn errors.New(\"no address\")\n\t}\n\tif kg <= 0 {\n\t\treturn errors.New(\"no weight\")\n\t}\n\tfmt.Println(\"shipping\", kg, \"kg to\", address)\n\treturn nil\n}\n\nfunc main() {\n\tfmt.Println(ship(2, \"Market\"))\n\tfmt.Println(ship(0, \"\"))\n\tfmt.Println(ship(0, \"Market\"))\n}\n",
   "stdout": "shipping 2 kg to Market\n<nil>\nno address\nno weight\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_flat.go",
     "out": "shipping 2 kg to Market\n<nil>\nno address\nno weight\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_allocs.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n\t\"testing\"\n)\n\nvar (\n\twords = []string{\"one\", \"two\", \"three\", \"four\", \"five\"}\n\tkeepS string\n\tkeepI []int\n)\n\nfunc main() {\n\tfmt.Println(\"+=:\", testing.AllocsPerRun(100, func() {\n\t\ts := \"\"\n\t\tfor _, w := range words {\n\t\t\ts += w\n\t\t}\n\t\tkeepS = s\n\t}))\n\tfmt.Println(\"Grow:\", testing.AllocsPerRun(100, func() {\n\t\tvar b strings.Builder\n\t\tb.Grow(64)\n\t\tfor _, w := range words {\n\t\t\tb.WriteString(w)\n\t\t}\n\t\tkeepS = b.String()\n\t}))\n\tfmt.Println(\"make:\", testing.AllocsPerRun(100, func() {\n\t\ts := make([]int, 0, len(words))\n\t\tfor i := range words {\n\t\t\ts = append(s, i)\n\t\t}\n\t\tkeepI = s\n\t}))\n}\n",
   "stdout": "+=: 4\nGrow: 1\nmake: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_allocs.go",
     "out": "+=: 4\nGrow: 1\nmake: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_defer.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 3; i++ {\n\t\tdefer fmt.Println(\"defer\", i)\n\t\tfmt.Println(\"lap\", i)\n\t}\n\tfmt.Println(\"end\")\n}\n",
   "stdout": "lap 1\nlap 2\nlap 3\nend\ndefer 3\ndefer 2\ndefer 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_defer.go",
     "out": "lap 1\nlap 2\nlap 3\nend\ndefer 3\ndefer 2\ndefer 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_shadow.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttotal := 10\n\tfor _, kg := range []int{1, 2, 3} {\n\t\ttotal := total + kg\n\t\tfmt.Println(total)\n\t}\n\tfmt.Println(total)\n}\n",
   "stdout": "11\n12\n13\n10\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_shadow.go",
     "out": "11\n12\n13\n10\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_shadow_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ttotal := 10\n\tfor _, kg := range []int{1, 2, 3} {\n\t\ttotal += kg\n\t\tfmt.Println(total)\n\t}\n\tfmt.Println(total)\n}\n",
   "stdout": "11\n13\n16\n16\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_shadow_fix.go",
     "out": "11\n13\n16\n16\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "profile.go": {
   "src": "package profile\n\nimport \"testing\"\n\nfunc BenchmarkMorning(b *testing.B) {\n\tlines := make([]string, 200)\n\tfor i := range lines {\n\t\tlines[i] = \"12 Hill Road, Northtown\"\n\t}\n\tfor b.Loop() {\n\t\tShout(JoinPlus(lines))\n\t}\n}\n",
   "stdout": "File: profile.test\nBuild ID: 95d521a71c115133c7d6c582a352e13c0a1b5a71\nType: alloc_space\nTime: 2026-11-08 18:58:19 UTC\nShowing nodes accounting for 540.27MB, 99.60% of 542.46MB total\nDropped 14 nodes (cum <= 2.71MB)\nShowing top 5 nodes out of 9\n      flat  flat%   sum%        cum   cum%\n  535.75MB 98.76% 98.76%   535.75MB 98.76%  example.com/profile.JoinPlus (inline)\n    4.52MB  0.83% 99.60%     4.52MB  0.83%  internal/bytealg.MakeNoZero\n         0     0% 99.60%   540.27MB 99.60%  example.com/profile.BenchmarkMorning\n         0     0% 99.60%     4.52MB  0.83%  example.com/profile.Shout (inline)\n         0     0% 99.60%     4.52MB  0.83%  strings.(*Builder).Grow\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd profile",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28"
    },
    {
     "cmd": "go test -bench=. -benchmem -cpuprofile=cpu.out -memprofile=mem.out",
     "out": "goos: linux\ngoarch: amd64\npkg: example.com/profile\ncpu: Intel(R) Xeon(R) Processor @ 2.10GHz\nBenchmarkMorning-2   \t    1107\t   1193272 ns/op\t  521554 B/op\t     201 allocs/op\nPASS\nok  \texample.com/profile\t1.373s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28/profile"
    },
    {
     "cmd": "go tool pprof -top -cum -nodecount=8 cpu.out",
     "out": "File: profile.test\nBuild ID: 95d521a71c115133c7d6c582a352e13c0a1b5a71\nType: cpu\nTime: 2026-11-08 18:58:18 UTC\nDuration: 1.33s, Total samples = 420ms (31.63%)\nShowing nodes accounting for 0, 0% of 420ms total\nShowing top 8 nodes out of 84\n      flat  flat%   sum%        cum   cum%\n         0     0%     0%      200ms 47.62%  example.com/profile.BenchmarkMorning\n         0     0%     0%      200ms 47.62%  example.com/profile.JoinPlus (inline)\n         0     0%     0%      200ms 47.62%  runtime.concatstring3\n         0     0%     0%      200ms 47.62%  runtime.concatstrings\n         0     0%     0%      200ms 47.62%  testing.(*B).run1.func1\n         0     0%     0%      200ms 47.62%  testing.(*B).runN\n         0     0%     0%      130ms 30.95%  runtime.goschedImpl\n         0     0%     0%      130ms 30.95%  runtime.gosched_m\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28/profile"
    },
    {
     "cmd": "go tool pprof -sample_index=alloc_space -top -nodecount=5 mem.out",
     "out": "File: profile.test\nBuild ID: 95d521a71c115133c7d6c582a352e13c0a1b5a71\nType: alloc_space\nTime: 2026-11-08 18:58:19 UTC\nShowing nodes accounting for 540.27MB, 99.60% of 542.46MB total\nDropped 14 nodes (cum <= 2.71MB)\nShowing top 5 nodes out of 9\n      flat  flat%   sum%        cum   cum%\n  535.75MB 98.76% 98.76%   535.75MB 98.76%  example.com/profile.JoinPlus (inline)\n    4.52MB  0.83% 99.60%     4.52MB  0.83%  internal/bytealg.MakeNoZero\n         0     0% 99.60%   540.27MB 99.60%  example.com/profile.BenchmarkMorning\n         0     0% 99.60%     4.52MB  0.83%  example.com/profile.Shout (inline)\n         0     0% 99.60%     4.52MB  0.83%  strings.(*Builder).Grow\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch28/profile"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "File: profile.test\nBuild ID: 1ec952394a99fcb10246a6f425c8904b528fe642\nType: alloc_space\nTime: 2026-11-08 18:58:26 UTC\nShowing nodes accounting for 1026.37MB, 99.50% of 1031.53MB total\nDropped 33 nodes (cum <= 5.16MB)\nShowing top 5 nodes out of 8\n      flat  flat%   sum%        cum   cum%\n 1011.81MB 98.09% 98.09%  1011.81MB 98.09%  example.com/profile.JoinPlus\n   14.57MB  1.41% 99.50%    14.57MB  1.41%  strings.(*Builder).grow\n         0     0% 99.50%  1026.37MB 99.50%  example.com/profile.BenchmarkMorning\n         0     0% 99.50%    14.57MB  1.41%  example.com/profile.Shout\n         0     0% 99.50%    14.57MB  1.41%  strings.(*Builder).Grow\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cd profile",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch28"
     },
     {
      "cmd": "go test -bench=. -benchmem -cpuprofile=cpu.out -memprofile=mem.out",
      "out": "goos: linux\ngoarch: amd64\npkg: example.com/profile\ncpu: Intel(R) Xeon(R) Processor @ 2.10GHz\nBenchmarkMorning-2   \t    2113\t    486147 ns/op\t  521553 B/op\t     201 allocs/op\nPASS\nok  \texample.com/profile\t1.161s\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch28/profile"
     },
     {
      "cmd": "go tool pprof -top -cum -nodecount=8 cpu.out",
      "out": "File: profile.test\nBuild ID: 1ec952394a99fcb10246a6f425c8904b528fe642\nType: cpu\nTime: 2026-11-08 18:58:25 UTC\nDuration: 1.13s, Total samples = 660ms (58.16%)\nShowing nodes accounting for 10ms, 1.52% of 660ms total\nShowing top 8 nodes out of 84\n      flat  flat%   sum%        cum   cum%\n         0     0%     0%      330ms 50.00%  runtime.bgsweep\n         0     0%     0%      280ms 42.42%  example.com/profile.BenchmarkMorning\n         0     0%     0%      280ms 42.42%  testing.(*B).run1.func1\n         0     0%     0%      280ms 42.42%  testing.(*B).runN\n         0     0%     0%      260ms 39.39%  example.com/profile.JoinPlus\n         0     0%     0%      260ms 39.39%  runtime.concatstring3\n      10ms  1.52%  1.52%      260ms 39.39%  runtime.concatstrings\n         0     0%  1.52%      170ms 25.76%  runtime.lock (partial-inline)\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch28/profile"
     },
     {
      "cmd": "go tool pprof -sample_index=alloc_space -top -nodecount=5 mem.out",
      "out": "File: profile.test\nBuild ID: 1ec952394a99fcb10246a6f425c8904b528fe642\nType: alloc_space\nTime: 2026-11-08 18:58:26 UTC\nShowing nodes accounting for 1026.37MB, 99.50% of 1031.53MB total\nDropped 33 nodes (cum <= 5.16MB)\nShowing top 5 nodes out of 8\n      flat  flat%   sum%        cum   cum%\n 1011.81MB 98.09% 98.09%  1011.81MB 98.09%  example.com/profile.JoinPlus\n   14.57MB  1.41% 99.50%    14.57MB  1.41%  strings.(*Builder).grow\n         0     0% 99.50%  1026.37MB 99.50%  example.com/profile.BenchmarkMorning\n         0     0% 99.50%    14.57MB  1.41%  example.com/profile.Shout\n         0     0% 99.50%    14.57MB  1.41%  strings.(*Builder).Grow\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch28/profile"
     }
    ]
   }
  },
  "profile/label.go": {
   "src": "// Package profile is the label code again, ready for the profiler.\npackage profile\n\nimport \"strings\"\n\n// JoinPlus glues the lines together with +=.\nfunc JoinPlus(lines []string) string {\n\ts := \"\"\n\tfor _, l := range lines {\n\t\ts += l + \"\\n\"\n\t}\n\treturn s\n}\n\n// Shout upper-cases a label.\nfunc Shout(s string) string { return strings.ToUpper(s) }\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "range_copy.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Courier struct {\n\tName      string\n\tDelivered int\n}\n\nfunc main() {\n\tteam := []Courier{{\"Scoot\", 0}, {\"Bo\", 0}}\n\tfor _, c := range team {\n\t\tc.Delivered++ // c is a copy of the element\n\t}\n\tfmt.Println(team)\n\tfor i := range team {\n\t\tteam[i].Delivered++ // changes the element itself\n\t}\n\tfmt.Println(team)\n}\n",
   "stdout": "[{Scoot 0} {Bo 0}]\n[{Scoot 1} {Bo 1}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run range_copy.go",
     "out": "[{Scoot 0} {Bo 0}]\n[{Scoot 1} {Bo 1}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "range_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tTo   string\n\tPaid bool\n}\n\nfunc payAll(parcels []Parcel) {\n\tfor i := range parcels {\n\t\tparcels[i].Paid = true\n\t}\n}\n\nfunc main() {\n\tps := []Parcel{{\"Ada\", false}, {\"Bo\", false}}\n\tpayAll(ps)\n\tfmt.Println(ps)\n}\n",
   "stdout": "[{Ada true} {Bo true}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run range_fix.go",
     "out": "[{Ada true} {Bo true}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "receiver.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Counter struct {\n\tn int\n}\n\nfunc (c Counter) Add() { c.n++ } // value receiver: works on a copy\n\nfunc (c *Counter) Inc() { c.n++ } // pointer receiver: works on the original\n\nfunc (c *Counter) Value() int { return c.n }\n\nfunc main() {\n\tvar c Counter\n\tc.Add()\n\tc.Add()\n\tfmt.Println(\"after two Adds:\", c.Value())\n\tc.Inc()\n\tc.Inc()\n\tfmt.Println(\"after two Incs:\", c.Value())\n}\n",
   "stdout": "after two Adds: 0\nafter two Incs: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run receiver.go",
     "out": "after two Adds: 0\nafter two Incs: 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shadow.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvar n int\n\tvar err error\n\tif true {\n\t\tn, err := strconv.Atoi(\"42\")\n\t\tfmt.Println(\"inside:\", n, err)\n\t}\n\tfmt.Println(\"outside:\", n, err)\n}\n",
   "stdout": "inside: 42 <nil>\noutside: 0 <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shadow.go",
     "out": "inside: 42 <nil>\noutside: 0 <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shadow_fix.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tvar n int\n\tvar err error\n\tif true {\n\t\tn, err = strconv.Atoi(\"42\")\n\t\tfmt.Println(\"inside:\", n, err)\n\t}\n\tfmt.Println(\"outside:\", n, err)\n}\n",
   "stdout": "inside: 42 <nil>\noutside: 42 <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shadow_fix.go",
     "out": "inside: 42 <nil>\noutside: 42 <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "shadow_x.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tx := 1\n\tif true {\n\t\tx := 2 // a NEW x, only inside these braces\n\t\tfmt.Println(\"inside:\", x)\n\t}\n\tfmt.Println(\"outside:\", x)\n}\n",
   "stdout": "inside: 2\noutside: 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run shadow_x.go",
     "out": "inside: 2\noutside: 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "slices_grow.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar grow []int\n\tlastCap := cap(grow)\n\tfor i := range 100 {\n\t\tgrow = append(grow, i)\n\t\tif cap(grow) != lastCap {\n\t\t\tfmt.Println(\"len\", len(grow), \"-> new array, cap\", cap(grow))\n\t\t\tlastCap = cap(grow)\n\t\t}\n\t}\n\n\tready := make([]int, 0, 100)\n\tfor i := range 100 {\n\t\tready = append(ready, i)\n\t}\n\tfmt.Println(\"ready: len\", len(ready), \"cap\", cap(ready))\n}\n",
   "stdout": "len 1 -> new array, cap 4\nlen 5 -> new array, cap 8\nlen 9 -> new array, cap 16\nlen 17 -> new array, cap 32\nlen 33 -> new array, cap 64\nlen 65 -> new array, cap 128\nready: len 100 cap 100\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run slices_grow.go",
     "out": "len 1 -> new array, cap 4\nlen 5 -> new array, cap 8\nlen 9 -> new array, cap 16\nlen 17 -> new array, cap 32\nlen 33 -> new array, cap 64\nlen 65 -> new array, cap 128\nready: len 100 cap 100\n",
     "err": "",
     "exit": 0
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "len 1 -> new array, cap 1\nlen 2 -> new array, cap 2\nlen 3 -> new array, cap 4\nlen 5 -> new array, cap 8\nlen 9 -> new array, cap 16\nlen 17 -> new array, cap 32\nlen 33 -> new array, cap 64\nlen 65 -> new array, cap 128\nready: len 100 cap 100\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go run slices_grow.go",
      "out": "len 1 -> new array, cap 1\nlen 2 -> new array, cap 2\nlen 3 -> new array, cap 4\nlen 5 -> new array, cap 8\nlen 9 -> new array, cap 16\nlen 17 -> new array, cap 32\nlen 33 -> new array, cap 64\nlen 65 -> new array, cap 128\nready: len 100 cap 100\n",
      "err": "",
      "exit": 0
     }
    ]
   }
  },
  "spot_range.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Parcel struct {\n\tTo   string\n\tPaid bool\n}\n\nfunc payAll(parcels []Parcel) {\n\tfor _, p := range parcels {\n\t\tp.Paid = true\n\t}\n}\n\nfunc main() {\n\tps := []Parcel{{\"Ada\", false}, {\"Bo\", false}}\n\tpayAll(ps)\n\tfmt.Println(ps)\n}\n",
   "stdout": "[{Ada false} {Bo false}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_range.go",
     "out": "[{Ada false} {Bo false}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_shadow.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc parseWeights(fields []string) (total int, err error) {\n\tfor _, f := range fields {\n\t\tkg, err := strconv.Atoi(f)\n\t\tif err != nil {\n\t\t\tbreak\n\t\t}\n\t\ttotal += kg\n\t}\n\treturn total, err\n}\n\nfunc main() {\n\ttotal, err := parseWeights([]string{\"3\", \"4\", \"lots\", \"5\"})\n\tfmt.Println(total, err)\n}\n",
   "stdout": "7 <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_shadow.go",
     "out": "7 <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_twice.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"log\"\n\t\"os\"\n\t\"strconv\"\n)\n\nfunc weight(field string) (int, error) {\n\tkg, err := strconv.Atoi(field)\n\tif err != nil {\n\t\tlog.Println(\"bad weight:\", err)\n\t\treturn 0, fmt.Errorf(\"weight %q: %w\", field, err)\n\t}\n\treturn kg, nil\n}\n\nfunc main() {\n\tlog.SetFlags(0)\n\tlog.SetOutput(os.Stdout)\n\tif _, err := weight(\"heavy\"); err != nil {\n\t\tlog.Println(\"skipping parcel:\", err)\n\t}\n}\n",
   "stdout": "bad weight: strconv.Atoi: parsing \"heavy\": invalid syntax\nskipping parcel: weight \"heavy\": strconv.Atoi: parsing \"heavy\": invalid syntax\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_twice.go",
     "out": "bad weight: strconv.Atoi: parsing \"heavy\": invalid syntax\nskipping parcel: weight \"heavy\": strconv.Atoi: parsing \"heavy\": invalid syntax\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "twice.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"log\"\n\t\"os\"\n)\n\nfunc load(name string) error {\n\t_, err := os.ReadFile(name)\n\tif err != nil {\n\t\tlog.Println(\"could not read\", name)\n\t\treturn err\n\t}\n\treturn nil\n}\n\nfunc route(day string) error {\n\terr := load(day + \".txt\")\n\tif err != nil {\n\t\tlog.Println(\"could not load route:\", err)\n\t\treturn err\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tlog.SetFlags(0)\n\tlog.SetOutput(os.Stdout)\n\tif err := route(\"monday\"); err != nil {\n\t\tlog.Println(\"giving up:\", err)\n\t\tfmt.Println(errors.Is(err, os.ErrNotExist))\n\t}\n}\n",
   "stdout": "could not read monday.txt\ncould not load route: open monday.txt: no such file or directory\ngiving up: open monday.txt: no such file or directory\ntrue\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run twice.go",
     "out": "could not read monday.txt\ncould not load route: open monday.txt: no such file or directory\ngiving up: open monday.txt: no such file or directory\ntrue\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "vet_me.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tkg := \"3\"\n\tfmt.Printf(\"parcel weighs %d kg\\n\", kg)\n}\n",
   "stdout": "",
   "stderr": "vet_me.go:7:28: fmt.Printf format %d has arg kg of wrong type string\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run vet_me.go",
     "out": "parcel weighs %!d(string=3) kg\n",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "gofmt -l .",
     "out": "",
     "err": "",
     "exit": 0
    },
    {
     "cmd": "go vet vet_me.go",
     "out": "",
     "err": "vet_me.go:7:28: fmt.Printf format %d has arg kg of wrong type string\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n# [command-line-arguments]\n./vet_me.go:7:2: fmt.Printf format %d has arg kg of wrong type string\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run vet_me.go",
      "out": "parcel weighs %!d(string=3) kg\n",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "gofmt -l .",
      "out": "",
      "err": "",
      "exit": 0
     },
     {
      "cmd": "go vet vet_me.go",
      "out": "",
      "err": "# command-line-arguments\n# [command-line-arguments]\n./vet_me.go:7:2: fmt.Printf format %d has arg kg of wrong type string\n",
      "exit": 1
     }
    ]
   }
  },
  "writer.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"strings\"\n)\n\n// printLabel needs only one thing: somewhere to Write.\nfunc printLabel(w io.Writer, to string, kg int) {\n\tfmt.Fprintf(w, \"TO: %s (%d kg)\\n\", to, kg)\n}\n\nfunc main() {\n\tprintLabel(os.Stdout, \"Ada\", 3) // the terminal\n\n\tvar b strings.Builder\n\tprintLabel(&b, \"Bo\", 5) // a string being built\n\tfmt.Print(\"built: \", b.String())\n\n\tf, err := os.Create(\"labels.txt\") // a file\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tprintLabel(f, \"Cy\", 1)\n\tf.Close()\n\tdata, _ := os.ReadFile(\"labels.txt\")\n\tfmt.Print(\"file: \", string(data))\n}\n",
   "stdout": "TO: Ada (3 kg)\nbuilt: TO: Bo (5 kg)\nfile: TO: Cy (1 kg)\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run writer.go",
     "out": "TO: Ada (3 kg)\nbuilt: TO: Bo (5 kg)\nfile: TO: Cy (1 kg)\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "zero.go": {
   "src": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"strings\"\n\t\"sync\"\n)\n\ntype Tally struct {\n\tmu    sync.Mutex // zero value: an unlocked lock\n\tcount int        // zero value: 0\n}\n\nfunc (t *Tally) Add() {\n\tt.mu.Lock()\n\tt.count++\n\tt.mu.Unlock()\n}\n\nfunc main() {\n\tvar b strings.Builder // ready to use, no constructor needed\n\tb.WriteString(\"hello\")\n\tvar buf bytes.Buffer\n\tbuf.WriteString(\"depot\")\n\tvar s []string\n\ts = append(s, \"parcel\") // append works on a nil slice\n\tvar t Tally\n\tt.Add()\n\tt.Add()\n\tfmt.Println(b.String(), buf.String(), s, t.count)\n}\n",
   "stdout": "hello depot [parcel] 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run zero.go",
     "out": "hello depot [parcel] 2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "zero_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Depot struct {\n\tstock map[string]int // zero value: nil\n}\n\nfunc (d *Depot) Receive(item string) {\n\tif d.stock == nil {\n\t\td.stock = make(map[string]int) // make the zero value useful\n\t}\n\td.stock[item]++\n}\n\nfunc main() {\n\tvar d Depot\n\tfmt.Println(\"reading is fine:\", d.stock[\"box\"])\n\td.Receive(\"box\")\n\td.Receive(\"box\")\n\tfmt.Println(\"boxes:\", d.stock[\"box\"])\n}\n",
   "stdout": "reading is fine: 0\nboxes: 2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run zero_fix.go",
     "out": "reading is fine: 0\nboxes: 2\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
