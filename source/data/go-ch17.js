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
  "workdir": "/home/you/go-ch17",
  "versionDifferences": [
   "boss_err.go",
   "nil_func.go",
   "predict_trap_new.go",
   "trap_new.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_err.go, nil_func.go, predict_trap_new.go, trap_new.go."
 },
 "programs": {
  "anon.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc apply(nums []int, f func(int) int) []int {\n\tout := make([]int, 0, len(nums))\n\tfor _, n := range nums {\n\t\tout = append(out, f(n))\n\t}\n\treturn out\n}\n\nfunc main() {\n\tnums := []int{1, 2, 3}\n\tfmt.Println(apply(nums, func(n int) int { return n + 10 }))\n\n\tshout := func(s string) string { return s + \"!\" }\n\tfmt.Println(shout(\"go\"))\n\n\tfunc() {\n\t\tfmt.Println(\"ran right away\")\n\t}()\n}\n",
   "stdout": "[11 12 13]\ngo!\nran right away\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run anon.go",
     "out": "[11 12 13]\ngo!\nran right away\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "apply.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc apply(nums []int, f func(int) int) []int {\n\tout := make([]int, 0, len(nums))\n\tfor _, n := range nums {\n\t\tout = append(out, f(n))\n\t}\n\treturn out\n}\n\nfunc double(n int) int { return n * 2 }\n\nfunc square(n int) int { return n * n }\n\nfunc main() {\n\tnums := []int{1, 2, 3}\n\tfmt.Println(apply(nums, double))\n\tfmt.Println(apply(nums, square))\n}\n",
   "stdout": "[2 4 6]\n[1 4 9]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run apply.go",
     "out": "[2 4 6]\n[1 4 9]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "backpack.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tgreeting := \"Hi\"\n\thello := func(name string) {\n\t\tfmt.Println(greeting, name)\n\t}\n\thello(\"Ana\")\n\tgreeting = \"Yo\"\n\thello(\"Bo\")\n\n\tcount := 0\n\ttick := func() { count++ }\n\ttick()\n\ttick()\n\tfmt.Println(count)\n}\n",
   "stdout": "Hi Ana\nYo Bo\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run backpack.go",
     "out": "Hi Ana\nYo Bo\n2\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bad_compare.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Person struct {\n\tName string\n\tAge  int\n}\n\nfunc younger(a, b Person) bool {\n\treturn a.Age < b.Age\n}\n\nfunc main() {\n\tcrew := []Person{{\"Ana\", 31}, {\"Bo\", 25}}\n\tslices.SortFunc(crew, younger)\n\tfmt.Println(crew)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./bad_compare.go:19:24: in call to slices.SortFunc, type func(a Person, b Person) bool of younger does not match inferred type func(a Person, b Person) int for func(a E, b E) int\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run bad_compare.go",
     "out": "",
     "err": "# command-line-arguments\n./bad_compare.go:19:24: in call to slices.SortFunc, type func(a Person, b Person) bool of younger does not match inferred type func(a Person, b Person) int for func(a E, b E) int\n",
     "exit": 1
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tactions := map[string]func(){\n\t\t\"go\":   func() { fmt.Println(\"going\") },\n\t\t\"stop\": func() { fmt.Println(\"stopping\") },\n\t}\n\tactions[\"go\"]()\n\tactions[\"jump\"]()\n}\n",
   "stdout": "going\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499f30]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x150\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "going\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499f30]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x150\nexit status 2\n",
     "exit": 1,
     "merged": "going\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x499f30]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x150\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "going\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491c2a]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x14a\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "going\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491c2a]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x14a\nexit status 2\n",
      "exit": 1,
      "merged": "going\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x491c2a]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/boss_err.go:11 +0x14a\nexit status 2\n"
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Racer struct {\n\tName  string\n\tScore int\n}\n\nfunc main() {\n\tboard := []Racer{{\"Bo\", 70}, {\"Ana\", 90}, {\"Cy\", 70}}\n\tslices.SortFunc(board, func(a, b Racer) int {\n\t\treturn cmp.Or(\n\t\t\tcmp.Compare(b.Score, a.Score),\n\t\t\tcmp.Compare(a.Name, b.Name),\n\t\t)\n\t})\n\tfmt.Println(board)\n}\n",
   "stdout": "[{Ana 90} {Bo 70} {Cy 70}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "[{Ana 90} {Bo 70} {Cy 70}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc power(base, exp int) int {\n\tif exp == 0 {\n\t\treturn 1\n\t}\n\treturn base * power(base, exp-1)\n}\n\nfunc main() {\n\tfmt.Println(power(2, 5))\n}\n",
   "stdout": "32\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "32\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tscore := 0\n\tmoves := []func(){\n\t\tfunc() { score += 5 },\n\t\tfunc() { score *= 2 },\n\t\tfunc() { score -= 1 },\n\t}\n\tfor _, move := range moves {\n\t\tmove()\n\t}\n\tmoves[1]()\n\tfmt.Println(score)\n}\n",
   "stdout": "18\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "18\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc makeCounter() func() int {\n\tn := 0\n\treturn func() int {\n\t\tn++\n\t\treturn n\n\t}\n}\n\nfunc main() {\n\tfor _, name := range []string{\"Ana\", \"Bo\", \"Cy\"} {\n\t\tnext := makeCounter()\n\t\tfmt.Println(name, \"is visitor\", next())\n\t}\n}\n",
   "stdout": "Ana is visitor 1\nBo is visitor 1\nCy is visitor 1\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "Ana is visitor 1\nBo is visitor 1\nCy is visitor 1\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc digits(n int) int {\n\tif n < 10 {\n\t\tfmt.Println(n, n)\n\t\treturn n\n\t}\n\ts := n%10 + digits(n/10)\n\tfmt.Println(n, s)\n\treturn s\n}\n\nfunc main() {\n\tdigits(4096)\n}\n",
   "stdout": "4 4\n40 4\n409 13\n4096 19\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "4 4\n40 4\n409 13\n4096 19\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "compare_machine.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n)\n\ntype Person struct {\n\tName string\n\tAge  int\n}\n\nfunc byAge(a, b Person) int {\n\treturn cmp.Compare(a.Age, b.Age)\n}\n\nfunc main() {\n\tana := Person{\"Ana\", 31}\n\tbo := Person{\"Bo\", 25}\n\tdi := Person{\"Di\", 25}\n\tfmt.Println(\"byAge(Bo, Ana) =\", byAge(bo, ana))\n\tfmt.Println(\"byAge(Ana, Bo) =\", byAge(ana, bo))\n\tfmt.Println(\"byAge(Bo, Di) =\", byAge(bo, di))\n}\n",
   "stdout": "byAge(Bo, Ana) = -1\nbyAge(Ana, Bo) = 1\nbyAge(Bo, Di) = 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run compare_machine.go",
     "out": "byAge(Bo, Ana) = -1\nbyAge(Ana, Bo) = 1\nbyAge(Bo, Di) = 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "counter.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc makeCounter() func() int {\n\tn := 0\n\treturn func() int {\n\t\tn++\n\t\treturn n\n\t}\n}\n\nfunc main() {\n\tc1 := makeCounter()\n\tfmt.Println(c1(), c1(), c1())\n\tc2 := makeCounter()\n\tfmt.Println(c2())\n\tfmt.Println(c1())\n}\n",
   "stdout": "1 2 3\n1\n4\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run counter.go",
     "out": "1 2 3\n1\n4\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "doc_println.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"tea\", 2, true)\n}\n",
   "stdout": "package fmt // import \"fmt\"\n\nfunc Println(a ...any) (n int, err error)\n    Println formats using the default formats for its operands and writes to\n    standard output. Spaces are always added between operands and a newline\n    is appended. It returns the number of bytes written and any write error\n    encountered.\n\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go doc fmt.Println",
     "out": "package fmt // import \"fmt\"\n\nfunc Println(a ...any) (n int, err error)\n    Println formats using the default formats for its operands and writes to\n    standard output. Spaces are always added between operands and a newline\n    is appended. It returns the number of bytes written and any write error\n    encountered.\n\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fact3.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc fact(n int) int {\n\tif n == 0 {\n\t\treturn 1\n\t}\n\treturn n * fact(n-1)\n}\n\nfunc main() {\n\tr := fact(3)\n\tfmt.Println(\"fact(3) =\", r)\n}\n",
   "stdout": "fact(3) = 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fact3.go",
     "out": "fact(3) = 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "factorial.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc fact(n int) int {\n\tif n == 0 {\n\t\treturn 1\n\t}\n\treturn n * fact(n-1)\n}\n\nfunc main() {\n\tfmt.Println(fact(3))\n\tfmt.Println(fact(5))\n\tfmt.Println(fact(10))\n}\n",
   "stdout": "6\n120\n3628800\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run factorial.go",
     "out": "6\n120\n3628800\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_func.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc onEach(words []string, f func(string) string) {\n\tfor _, w := range words {\n\t\tfmt.Println(f(w))\n\t}\n}\n\nfunc main() {\n\tonEach([]string{\"tea\", \"jam\"}, strings.ToUpper)\n}\n",
   "stdout": "TEA\nJAM\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_func.go",
     "out": "TEA\nJAM\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_sort.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Parcel struct {\n\tTo string\n\tKg int\n}\n\nfunc main() {\n\tvan := []Parcel{{\"Ana\", 7}, {\"Bo\", 2}, {\"Cy\", 5}}\n\tslices.SortFunc(van, func(a, b Parcel) int {\n\t\treturn cmp.Compare(a.Kg, b.Kg)\n\t})\n\tfmt.Println(van)\n}\n",
   "stdout": "[{Bo 2} {Cy 5} {Ana 7}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_sort.go",
     "out": "[{Bo 2} {Cy 5} {Ana 7}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_spread.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc average(nums ...float64) float64 {\n\ttotal := 0.0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total / float64(len(nums))\n}\n\nfunc main() {\n\ttemps := []float64{18, 21, 24}\n\tfmt.Println(average(temps...))\n}\n",
   "stdout": "21\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_spread.go",
     "out": "21\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "func_errors.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc apply(nums []int, f func(int) int) []int {\n\tout := make([]int, 0, len(nums))\n\tfor _, n := range nums {\n\t\tout = append(out, f(n))\n\t}\n\treturn out\n}\n\nfunc double(n int) int { return n * 2 }\n\nfunc shout(s string) string { return s + \"!\" }\n\nfunc main() {\n\tnums := []int{1, 2, 3}\n\tfmt.Println(apply(nums, double()))\n\tfmt.Println(apply(nums, shout))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./func_errors.go:19:26: not enough arguments in call to double\n\thave ()\n\twant (int)\n./func_errors.go:19:26: cannot use double() (value of type int) as func(int) int value in argument to apply\n./func_errors.go:20:26: cannot use shout (value of type func(s string) string) as func(int) int value in argument to apply\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run func_errors.go",
     "out": "",
     "err": "# command-line-arguments\n./func_errors.go:19:26: not enough arguments in call to double\n\thave ()\n\twant (int)\n./func_errors.go:19:26: cannot use double() (value of type int) as func(int) int value in argument to apply\n./func_errors.go:20:26: cannot use shout (value of type func(s string) string) as func(int) int value in argument to apply\n",
     "exit": 1
    }
   ]
  },
  "func_value.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(n int) int {\n\treturn n * 2\n}\n\nfunc square(n int) int {\n\treturn n * n\n}\n\nfunc main() {\n\tf := double\n\tfmt.Println(f(5))\n\tfmt.Printf(\"%T\\n\", f)\n\tf = square\n\tfmt.Println(f(5))\n}\n",
   "stdout": "10\nfunc(int) int\n25\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run func_value.go",
     "out": "10\nfunc(int) int\n25\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "generic_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc Id[T any](x T) T {\n\treturn x\n}\n\nfunc main() {\n\tf := Id[int]\n\tfmt.Println(f(7))\n\tfmt.Printf(\"%T\\n\", f)\n}\n",
   "stdout": "7\nfunc(int) int\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run generic_fix.go",
     "out": "7\nfunc(int) int\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "generic_id.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc Id[T any](x T) T {\n\treturn x\n}\n\nfunc main() {\n\tf := Id\n\tfmt.Println(f(7))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./generic_id.go:10:7: cannot use generic function Id without instantiation\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run generic_id.go",
     "out": "",
     "err": "# command-line-arguments\n./generic_id.go:10:7: cannot use generic function Id without instantiation\n",
     "exit": 1
    }
   ]
  },
  "method_value.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Bell struct{ sound string }\n\nfunc (b Bell) Ring() { fmt.Println(b.sound) }\n\ntype Tally struct{ n int }\n\nfunc (t *Tally) Add() { t.n++ }\n\nfunc main() {\n\tb := Bell{\"ding\"}\n\tring := b.Ring\n\tring()\n\tb.sound = \"dong\"\n\tring()\n\tb.Ring()\n\n\tt := Tally{}\n\tadd := t.Add\n\tadd()\n\tadd()\n\tfmt.Println(t.n)\n\tfmt.Printf(\"%T\\n\", add)\n}\n",
   "stdout": "ding\nding\ndong\n2\nfunc()\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run method_value.go",
     "out": "ding\nding\ndong\n2\nfunc()\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "nil_func.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar f func(int) int\n\tfmt.Println(f == nil)\n\tfmt.Printf(\"%T\\n\", f)\n\tfmt.Println(f(3))\n}\n",
   "stdout": "true\nfunc(int) int\n",
   "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49b76d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8d\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nil_func.go",
     "out": "true\nfunc(int) int\n",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49b76d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8d\nexit status 2\n",
     "exit": 1,
     "merged": "true\nfunc(int) int\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49b76d]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8d\nexit status 2\n"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "true\nfunc(int) int\n",
    "stderr": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49350e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8e\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run nil_func.go",
      "out": "true\nfunc(int) int\n",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49350e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8e\nexit status 2\n",
      "exit": 1,
      "merged": "true\nfunc(int) int\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x49350e]\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch17/nil_func.go:9 +0x8e\nexit status 2\n"
     }
    ]
   }
  },
  "options_func.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Order struct {\n\tSize  string\n\tShots int\n\tMilk  string\n}\n\ntype Option func(*Order)\n\nfunc WithSize(s string) Option {\n\treturn func(o *Order) { o.Size = s }\n}\n\nfunc WithShots(n int) Option {\n\treturn func(o *Order) { o.Shots = n }\n}\n\nfunc WithMilk(m string) Option {\n\treturn func(o *Order) { o.Milk = m }\n}\n\nfunc NewOrder(opts ...Option) Order {\n\to := Order{Size: \"medium\", Shots: 1, Milk: \"none\"}\n\tfor _, opt := range opts {\n\t\topt(&o)\n\t}\n\treturn o\n}\n\nfunc main() {\n\tfmt.Println(NewOrder())\n\tfmt.Println(NewOrder(WithSize(\"large\"), WithMilk(\"oat\")))\n\tfmt.Println(NewOrder(WithShots(0)))\n}\n",
   "stdout": "{medium 1 none}\n{large 1 oat}\n{medium 0 none}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run options_func.go",
     "out": "{medium 1 none}\n{large 1 oat}\n{medium 0 none}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "options_struct.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Order struct {\n\tSize  string\n\tShots int\n\tMilk  string\n}\n\nfunc NewOrder(o Order) Order {\n\tif o.Size == \"\" {\n\t\to.Size = \"medium\"\n\t}\n\tif o.Shots == 0 {\n\t\to.Shots = 1\n\t}\n\tif o.Milk == \"\" {\n\t\to.Milk = \"none\"\n\t}\n\treturn o\n}\n\nfunc main() {\n\tfmt.Println(NewOrder(Order{}))\n\tfmt.Println(NewOrder(Order{Size: \"large\", Milk: \"oat\"}))\n\tfmt.Println(NewOrder(Order{Shots: 0}))\n}\n",
   "stdout": "{medium 1 none}\n{large 1 oat}\n{medium 1 none}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run options_struct.go",
     "out": "{medium 1 none}\n{large 1 oat}\n{medium 1 none}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_countdown.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc countdown(n int) {\n\tif n == 0 {\n\t\tfmt.Println(\"liftoff!\")\n\t\treturn\n\t}\n\tfmt.Println(n)\n\tcountdown(n - 1)\n}\n\nfunc main() {\n\tcountdown(3)\n}\n",
   "stdout": "3\n2\n1\nliftoff!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_countdown.go",
     "out": "3\n2\n1\nliftoff!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_options.go": {
   "src": "package main\n\nimport \"fmt\"\n\ntype Pizza struct{ Cheese, Olives bool }\n\ntype Topping func(*Pizza)\n\nfunc WithOlives(p *Pizza) { p.Olives = true }\n\nfunc Make(tops ...Topping) Pizza {\n\tp := Pizza{Cheese: true}\n\tfor _, t := range tops {\n\t\tt(&p)\n\t}\n\treturn p\n}\n\nfunc main() {\n\tfmt.Println(Make(), Make(WithOlives))\n}\n",
   "stdout": "{true false} {true true}\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_options.go",
     "out": "{true false} {true true}\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_desc.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc main() {\n\twords := []string{\"fig\", \"banana\", \"kiwi\"}\n\tslices.SortFunc(words, func(a, b string) int {\n\t\treturn cmp.Compare(len(b), len(a))\n\t})\n\tfmt.Println(words)\n}\n",
   "stdout": "[banana kiwi fig]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_desc.go",
     "out": "[banana kiwi fig]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_longest.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc longest(words ...string) int {\n\tbest := 0\n\tfor _, w := range words {\n\t\tif len(w) > best {\n\t\t\tbest = len(w)\n\t\t}\n\t}\n\treturn best\n}\n\nfunc main() {\n\tfmt.Println(longest(\"go\", \"scoot\", \"map\"))\n\tfmt.Println(longest())\n}\n",
   "stdout": "5\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_longest.go",
     "out": "5\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_shout.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"strings\"\n)\n\nfunc shout(words ...string) {\n\tfor i := range words {\n\t\twords[i] = strings.ToUpper(words[i])\n\t}\n}\n\nfunc main() {\n\tw := []string{\"hi\", \"yo\"}\n\tshout(\"ok\", \"go\")\n\tfmt.Println(w)\n\tshout(w...)\n\tfmt.Println(w)\n}\n",
   "stdout": "[hi yo]\n[HI YO]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_shout.go",
     "out": "[hi yo]\n[HI YO]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_stepper.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc makeStepper(step int) func() int {\n\ttotal := 0\n\treturn func() int {\n\t\ttotal += step\n\t\treturn total\n\t}\n}\n\nfunc main() {\n\tbyTwo := makeStepper(2)\n\tbyTen := makeStepper(10)\n\tbyTwo()\n\tfmt.Println(byTwo(), byTen(), byTwo())\n}\n",
   "stdout": "4 10 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_stepper.go",
     "out": "4 10 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_trap.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar calls []func()\n\tfor _, name := range []string{\"Ana\", \"Bo\", \"Cy\"} {\n\t\tcalls = append(calls, func() { fmt.Println(\"hi\", name) })\n\t}\n\tfor _, call := range calls {\n\t\tcall()\n\t}\n}\n",
   "stdout": "hi Cy\nhi Cy\nhi Cy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd oldnames",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/oldnames\n\ngo 1.21\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/oldnames"
    },
    {
     "cmd": "go run .",
     "out": "hi Cy\nhi Cy\nhi Cy\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/oldnames"
    }
   ]
  },
  "predict_trap_new.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar calls []func()\n\tfor _, name := range []string{\"Ana\", \"Bo\", \"Cy\"} {\n\t\tcalls = append(calls, func() { fmt.Println(\"hi\", name) })\n\t}\n\tfor _, call := range calls {\n\t\tcall()\n\t}\n}\n",
   "stdout": "hi Ana\nhi Bo\nhi Cy\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd newnames",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/newnames\n\ngo 1.27\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/newnames"
    },
    {
     "cmd": "go run .",
     "out": "hi Ana\nhi Bo\nhi Cy\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/newnames"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "hi Ana\nhi Bo\nhi Cy\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cd newnames",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/newnames\n\ngo 1.24",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17/newnames"
     },
     {
      "cmd": "go run .",
      "out": "hi Ana\nhi Bo\nhi Cy\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17/newnames"
     }
    ]
   }
  },
  "predict_twice.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc twice(f func(int) int, x int) int {\n\treturn f(f(x))\n}\n\nfunc main() {\n\tfmt.Println(twice(func(n int) int { return n + 3 }, 1))\n\tfmt.Println(twice(func(n int) int { return n * n }, 3))\n}\n",
   "stdout": "7\n81\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_twice.go",
     "out": "7\n81\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sort_multi.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Person struct {\n\tName string\n\tAge  int\n}\n\nfunc main() {\n\tcrew := []Person{{\"Di\", 25}, {\"Ana\", 31}, {\"Cy\", 40}, {\"Bo\", 25}}\n\n\tslices.SortFunc(crew, func(a, b Person) int {\n\t\treturn cmp.Compare(b.Age, a.Age)\n\t})\n\tfmt.Println(crew)\n\n\tslices.SortFunc(crew, func(a, b Person) int {\n\t\treturn cmp.Or(\n\t\t\tcmp.Compare(a.Age, b.Age),\n\t\t\tcmp.Compare(a.Name, b.Name),\n\t\t)\n\t})\n\tfmt.Println(crew)\n}\n",
   "stdout": "[{Cy 40} {Ana 31} {Di 25} {Bo 25}]\n[{Bo 25} {Di 25} {Ana 31} {Cy 40}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sort_multi.go",
     "out": "[{Cy 40} {Ana 31} {Di 25} {Bo 25}]\n[{Bo 25} {Di 25} {Ana 31} {Cy 40}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "sort_people.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Person struct {\n\tName string\n\tAge  int\n}\n\nfunc main() {\n\tcrew := []Person{{\"Ana\", 31}, {\"Bo\", 25}, {\"Cy\", 40}, {\"Di\", 28}}\n\tslices.SortFunc(crew, func(a, b Person) int {\n\t\treturn cmp.Compare(a.Age, b.Age)\n\t})\n\tfmt.Println(crew)\n}\n",
   "stdout": "[{Bo 25} {Di 28} {Ana 31} {Cy 40}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sort_people.go",
     "out": "[{Bo 25} {Di 28} {Ana 31} {Cy 40}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_call.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc greet(name string) string {\n\treturn \"hi \" + name\n}\n\nfunc each(names []string, f func(string) string) {\n\tfor _, n := range names {\n\t\tfmt.Println(f(n))\n\t}\n}\n\nfunc main() {\n\tcrew := []string{\"Ana\", \"Bo\"}\n\teach(crew, greet(\"Ana\"))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_call.go:17:13: cannot use greet(\"Ana\") (value of type string) as func(string) string value in argument to each\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_call.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_call.go:17:13: cannot use greet(\"Ana\") (value of type string) as func(string) string value in argument to each\n",
     "exit": 1
    }
   ]
  },
  "spot_sort.go": {
   "src": "package main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\ntype Person struct {\n\tName string\n\tAge  int\n}\n\nfunc main() {\n\tqueue := []Person{{\"Ana\", 31}, {\"Bo\", 9}, {\"Cy\", 67}}\n\tslices.SortFunc(queue, func(a, b Person) int {\n\t\treturn cmp.Compare(b.Age, a.Age)\n\t})\n\tfmt.Println(\"youngest first:\", queue)\n}\n",
   "stdout": "youngest first: [{Cy 67} {Ana 31} {Bo 9}]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_sort.go",
     "out": "youngest first: [{Cy 67} {Ana 31} {Bo 9}]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_spread.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc best(scores ...int) int {\n\ttop := 0\n\tfor _, s := range scores {\n\t\ttop = max(top, s)\n\t}\n\treturn top\n}\n\nfunc main() {\n\tweek := []int{40, 75, 62}\n\tfmt.Println(\"best day:\", best(week))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_spread.go:15:32: cannot use week (variable of type []int) as int value in argument to best\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_spread.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_spread.go:15:32: cannot use week (variable of type []int) as int value in argument to best\n",
     "exit": 1
    }
   ]
  },
  "spread.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc sum(nums ...int) int {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\nfunc main() {\n\tprices := []int{3, 4, 5}\n\tfmt.Println(sum(prices...))\n\n\titems := []any{\"tea\", 2, true}\n\tfmt.Println(items...)\n\tfmt.Println(items)\n}\n",
   "stdout": "12\ntea 2 true\n[tea 2 true]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spread.go",
     "out": "12\ntea 2 true\n[tea 2 true]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spread_errors.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc sum(nums ...int) int {\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\nfunc main() {\n\tprices := []int{3, 4, 5}\n\tfmt.Println(sum(prices))\n\tfmt.Println(sum(1, prices...))\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spread_errors.go:15:18: cannot use prices (variable of type []int) as int value in argument to sum\n./spread_errors.go:16:21: too many arguments in call to sum\n\thave (number, []int...)\n\twant (...int)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spread_errors.go",
     "out": "",
     "err": "# command-line-arguments\n./spread_errors.go:15:18: cannot use prices (variable of type []int) as int value in argument to sum\n./spread_errors.go:16:21: too many arguments in call to sum\n\thave (number, []int...)\n\twant (...int)\n",
     "exit": 1
    }
   ]
  },
  "sum.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc sum(nums ...int) int {\n\tfmt.Printf(\"got %v (%T, len %d) -> \", nums, nums, len(nums))\n\ttotal := 0\n\tfor _, n := range nums {\n\t\ttotal += n\n\t}\n\treturn total\n}\n\nfunc main() {\n\tfmt.Println(sum())\n\tfmt.Println(sum(5))\n\tfmt.Println(sum(1, 2, 3))\n}\n",
   "stdout": "got [] ([]int, len 0) -> 0\ngot [5] ([]int, len 1) -> 5\ngot [1 2 3] ([]int, len 3) -> 6\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run sum.go",
     "out": "got [] ([]int, len 0) -> 0\ngot [5] ([]int, len 1) -> 5\ngot [1 2 3] ([]int, len 3) -> 6\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "total_rec.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc total(nums []int) int {\n\tif len(nums) == 0 {\n\t\treturn 0\n\t}\n\treturn nums[0] + total(nums[1:])\n}\n\nfunc main() {\n\tfmt.Println(total([]int{4, 1, 5}))\n\tfmt.Println(total(nil))\n}\n",
   "stdout": "10\n0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run total_rec.go",
     "out": "10\n0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_fact.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc fact(n int) int {\n\tif n == 0 {\n\t\tfmt.Println(n, 1)\n\t\treturn 1\n\t}\n\tr := n * fact(n-1)\n\tfmt.Println(n, r)\n\treturn r\n}\n\nfunc main() {\n\tfact(4)\n}\n",
   "stdout": "0 1\n1 1\n2 2\n3 6\n4 24\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_fact.go",
     "out": "0 1\n1 1\n2 2\n3 6\n4 24\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_tips.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc makeTipJar() func(int) int {\n\ttotal := 0\n\treturn func(coins int) int {\n\t\ttotal += coins\n\t\treturn total\n\t}\n}\n\nfunc main() {\n\tjar := makeTipJar()\n\tfor day, coins := range []int{5, 3, 0, 7} {\n\t\tfmt.Println(day, coins, jar(coins))\n\t}\n}\n",
   "stdout": "0 5 5\n1 3 8\n2 0 8\n3 7 15\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_tips.go",
     "out": "0 5 5\n1 3 8\n2 0 8\n3 7 15\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trap_fix.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar later []func()\n\tfor i := 0; i < 3; i++ {\n\t\ti := i\n\t\tlater = append(later, func() { fmt.Println(i) })\n\t}\n\tfor _, f := range later {\n\t\tf()\n\t}\n}\n",
   "stdout": "0\n1\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd oldfix",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/oldfix\n\ngo 1.21\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/oldfix"
    },
    {
     "cmd": "go run .",
     "out": "0\n1\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/oldfix"
    }
   ]
  },
  "trap_new.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar later []func()\n\tfor i := 0; i < 3; i++ {\n\t\tlater = append(later, func() { fmt.Println(i) })\n\t}\n\tfor _, f := range later {\n\t\tf()\n\t}\n}\n",
   "stdout": "0\n1\n2\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd new127",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/new127\n\ngo 1.27\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/new127"
    },
    {
     "cmd": "go run .",
     "out": "0\n1\n2\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/new127"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "0\n1\n2\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "cd new127",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/new127\n\ngo 1.24",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17/new127"
     },
     {
      "cmd": "go run .",
      "out": "0\n1\n2\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch17/new127"
     }
    ]
   }
  },
  "trap_old.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar later []func()\n\tfor i := 0; i < 3; i++ {\n\t\tlater = append(later, func() { fmt.Println(i) })\n\t}\n\tfor _, f := range later {\n\t\tf()\n\t}\n}\n",
   "stdout": "3\n3\n3\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "cd old121",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/old121\n\ngo 1.21\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/old121"
    },
    {
     "cmd": "go run .",
     "out": "3\n3\n3\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch17/old121"
    }
   ]
  },
  "unused_closure.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tcount := 0\n\ttick := func() { count++ }\n\tfmt.Println(count)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./unused_closure.go:7:2: declared and not used: tick\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unused_closure.go",
     "out": "",
     "err": "# command-line-arguments\n./unused_closure.go:7:2: declared and not used: tick\n",
     "exit": 1
    }
   ]
  },
  "variadic_share.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc double(nums ...int) {\n\tfor i := range nums {\n\t\tnums[i] *= 2\n\t}\n}\n\nfunc main() {\n\ta := []int{1, 2, 3}\n\tdouble(1, 2, 3)\n\tfmt.Println(a)\n\tdouble(a...)\n\tfmt.Println(a)\n}\n",
   "stdout": "[1 2 3]\n[2 4 6]\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run variadic_share.go",
     "out": "[1 2 3]\n[2 4 6]\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "wallet.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc makeWallet() (func(int), func() int) {\n\tmoney := 0\n\tdeposit := func(n int) { money += n }\n\tbalance := func() int { return money }\n\treturn deposit, balance\n}\n\nfunc main() {\n\tdeposit, balance := makeWallet()\n\tdeposit(5)\n\tdeposit(7)\n\tfmt.Println(balance())\n}\n",
   "stdout": "12\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run wallet.go",
     "out": "12\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
