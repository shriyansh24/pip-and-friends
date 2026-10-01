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
  "workdir": "/home/you/go-ch1",
  "versionDifferences": [
   "lower.go",
   "s_init.go",
   "s_version.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): lower.go, s_init.go, s_version.go."
 },
 "programs": {
  "boss_fill.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"All checked out!\")\n}\n",
   "stdout": "All checked out!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "All checked out!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tfmt.Println(\"Pick up the letter\")\n\tfmt.Println(\"Ride across town\")\n\tfmt.Println(\"Knock\"); fmt.Println(\"Wait\")\n\tfmt.Println(\"Hand it over\")\n}\n",
   "stdout": "Pick up the letter\nRide across town\nKnock\nWait\nHand it over\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "Pick up the letter\nRide across town\nKnock\nWait\nHand it over\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"A\") // fmt.Println(\"B\")\n\t/* fmt.Println(\"C\")\n\tfmt.Println(\"D\") */\n\tfmt.Println(\"E\"); fmt.Println(\"F\")\n\tfmt.Println(\"// G\")\n}\n",
   "stdout": "A\nE\nF\n// G\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "A\nE\nF\n// G\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Letter 1\")\n\tfmt.Println(\"Letter 2)\n\tfmt.Println(\"Letter 3\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_spot.go:7:24: newline in string\n./boss_spot.go:7:24: syntax error: unexpected newline in argument list; possibly missing comma or )\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_spot.go:7:24: newline in string\n./boss_spot.go:7:24: syntax error: unexpected newline in argument list; possibly missing comma or )\n",
     "exit": 1
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"write main.go\"); fmt.Println(\"compile it\")\n\t// fmt.Println(\"skip lunch\")\n\tfmt.Println(\"run ./hello\") /* fmt.Println(\"delete hello\") */\n\tfmt.Println(\"see Hello!\")\n}\n",
   "stdout": "write main.go\ncompile it\nrun ./hello\nsee Hello!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "write main.go\ncompile it\nrun ./hello\nsee Hello!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "brace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main()\n{\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./brace.go:6:1: syntax error: unexpected semicolon or newline before {\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run brace.go",
     "out": "",
     "err": "# command-line-arguments\n./brace.go:6:1: syntax error: unexpected semicolon or newline before {\n",
     "exit": 1
    }
   ]
  },
  "comments.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// main is where the program starts.\nfunc main() {\n\tfmt.Println(\"Comments are for humans.\") // skipped\n\t/* A block comment can\n\t   cover several lines. */\n\tfmt.Println(\"// inside quotes is just text\")\n}\n",
   "stdout": "Comments are for humans.\n// inside quotes is just text\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run comments.go",
     "out": "Comments are for humans.\n// inside quotes is just text\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "comments_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t// fmt.Println(\"Ignored\")\n\tfmt.Println(\"Printed\") // fmt.Println(\"Also ignored\")\n\t/* fmt.Println(\"Hidden\") */ fmt.Println(\"Shown\")\n\tfmt.Println(\"/* not a comment */\")\n}\n",
   "stdout": "Printed\nShown\n/* not a comment */\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run comments_predict.go",
     "out": "Printed\nShown\n/* not a comment */\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "comments_trace.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"one apple\") // fmt.Println(\"two pears\")\n\t/* fmt.Println(\"three plums\") */\n\tfmt.Println(\"four //figs\")\n\t// fmt.Println(\"five kiwis\")\n\tfmt.Println(\"six lemons\") /* seven limes */\n}\n",
   "stdout": "one apple\nfour //figs\nsix lemons\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run comments_trace.go",
     "out": "one apple\nfour //figs\nsix lemons\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_hello.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Special delivery!\")\n}\n",
   "stdout": "Special delivery!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_hello.go",
     "out": "Special delivery!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_main.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Brace stays on the line.\")\n}\n",
   "stdout": "Brace stays on the line.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_main.go",
     "out": "Brace stays on the line.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hello.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "Hello, World!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run hello.go",
     "out": "Hello, World!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "lower.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./lower.go:6:6: undefined: fmt.println (but have Println)\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lower.go",
     "out": "",
     "err": "# command-line-arguments\n./lower.go:6:6: undefined: fmt.println (but have Println)\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./lower.go:6:6: undefined: fmt.println\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run lower.go",
      "out": "",
      "err": "# command-line-arguments\n./lower.go:6:6: undefined: fmt.println\n",
      "exit": 1
     }
    ]
   }
  },
  "nomain.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc hello() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\nruntime.main_main·f: function main is undeclared in the main package\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nomain.go",
     "out": "",
     "err": "# command-line-arguments\nruntime.main_main·f: function main is undeclared in the main package\n",
     "exit": 1
    }
   ]
  },
  "nopkg.go": {
   "src": "import \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "nopkg.go:1:1: expected 'package', found 'import'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run nopkg.go",
     "out": "",
     "err": "nopkg.go:1:1: expected 'package', found 'import'\n",
     "exit": 1
    }
   ]
  },
  "noquote.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!)\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./noquote.go:6:29: newline in string\n./noquote.go:6:29: syntax error: unexpected newline in argument list; possibly missing comma or )\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run noquote.go",
     "out": "",
     "err": "# command-line-arguments\n./noquote.go:6:29: newline in string\n./noquote.go:6:29: syntax error: unexpected newline in argument list; possibly missing comma or )\n",
     "exit": 1
    }
   ]
  },
  "order.go": {
   "src": "package main\n\nimport \"fmt\"\n\n// Scoot's morning routine, written in a hurry.\nfunc main() {\n\tfmt.Println(\"Put on shoes\")\n\tfmt.Println(\"Put on socks\")\n\tfmt.Println(\"Tie the laces\")\n}\n",
   "stdout": "Put on shoes\nPut on socks\nTie the laces\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run order.go",
     "out": "Put on shoes\nPut on socks\nTie the laces\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "outside.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfmt.Println(\"Hello, World!\")\n\nfunc main() {\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./outside.go:5:1: syntax error: non-declaration statement outside function body\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run outside.go",
     "out": "",
     "err": "# command-line-arguments\n./outside.go:5:1: syntax error: non-declaration statement outside function body\n",
     "exit": 1
    }
   ]
  },
  "panic.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Crack the eggs\")\n\tfmt.Println(\"Whisk\")\n\tpanic(\"the oven is on fire\")\n\tfmt.Println(\"Bake\")\n}\n",
   "stdout": "Crack the eggs\nWhisk\n",
   "stderr": "panic: the oven is on fire\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic.go:8 +0x98\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run panic.go",
     "out": "Crack the eggs\nWhisk\n",
     "err": "panic: the oven is on fire\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic.go:8 +0x98\nexit status 2\n",
     "exit": 1,
     "merged": "Crack the eggs\nWhisk\npanic: the oven is on fire\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic.go:8 +0x98\nexit status 2\n"
    }
   ]
  },
  "panic_predict.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Ready\")\n\tfmt.Println(\"Steady\")\n\tpanic(\"flat tyre!\")\n\tfmt.Println(\"Go!\")\n}\n",
   "stdout": "Ready\nSteady\n",
   "stderr": "panic: flat tyre!\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic_predict.go:8 +0x98\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run panic_predict.go",
     "out": "Ready\nSteady\n",
     "err": "panic: flat tyre!\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic_predict.go:8 +0x98\nexit status 2\n",
     "exit": 1,
     "merged": "Ready\nSteady\npanic: flat tyre!\n\ngoroutine 1 [running]:\nmain.main()\n\t/home/you/go-ch1/panic_predict.go:8 +0x98\nexit status 2\n"
    }
   ]
  },
  "parsons_hello.go": {
   "src": "package main\nimport \"fmt\"\nfunc main() {\n\tfmt.Println(\"Ready\")\n\tfmt.Println(\"Set\")\n\tfmt.Println(\"Go!\")\n}\n",
   "stdout": "Ready\nSet\nGo!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_hello.go",
     "out": "Ready\nSet\nGo!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "routine.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Pack the satchel\")\n\tfmt.Println(\"Check the map\")\n\tfmt.Println(\"Ride!\")\n}\n",
   "stdout": "Pack the satchel\nCheck the map\nRide!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run routine.go",
     "out": "Pack the satchel\nCheck the map\nRide!\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "s_binname.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "go.mod  hello  main.go\n",
   "stderr": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go mod init example/hello",
     "out": "",
     "err": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
     "exit": 0,
     "dir": "~/proj"
    },
    {
     "cmd": "go build",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/proj"
    },
    {
     "cmd": "ls",
     "out": "go.mod  hello  main.go\n",
     "err": "",
     "exit": 0,
     "dir": "~/proj"
    }
   ]
  },
  "s_build.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "Hello, World!\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go build",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    },
    {
     "cmd": "ls",
     "out": "go.mod  hello  main.go\n",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    },
    {
     "cmd": "./hello",
     "out": "Hello, World!\n",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    }
   ]
  },
  "s_cd.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "bash: cd: hello: No such file or directory\n",
   "stderr": "",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd hello",
     "out": "bash: cd: hello: No such file or directory\n",
     "err": "",
     "exit": 1,
     "dir": "~"
    }
   ]
  },
  "s_init.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "Hello, World!\n",
   "stderr": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "ls",
     "out": "main.go\n",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    },
    {
     "cmd": "go mod init example/hello",
     "out": "",
     "err": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
     "exit": 0,
     "dir": "~/hello"
    },
    {
     "cmd": "cat go.mod",
     "out": "module example/hello\n\ngo 1.27.3\n",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    },
    {
     "cmd": "go run .",
     "out": "Hello, World!\n",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "Hello, World!\n",
    "stderr": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
    "exit": 0,
    "steps": [
     {
      "cmd": "ls",
      "out": "main.go\n",
      "err": "",
      "exit": 0,
      "dir": "~/hello"
     },
     {
      "cmd": "go mod init example/hello",
      "out": "",
      "err": "go: creating new go.mod: module example/hello\ngo: to add module requirements and sums:\n\tgo mod tidy\n",
      "exit": 0,
      "dir": "~/hello"
     },
     {
      "cmd": "cat go.mod",
      "out": "module example/hello\n\ngo 1.24.7\n",
      "err": "",
      "exit": 0,
      "dir": "~/hello"
     },
     {
      "cmd": "go run .",
      "out": "Hello, World!\n",
      "err": "",
      "exit": 0,
      "dir": "~/hello"
     }
    ]
   }
  },
  "s_mkdir.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "mkdir hello",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "cd hello",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "ls",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/hello"
    }
   ]
  },
  "s_nogo.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "bash: go: command not found\n",
   "stderr": "",
   "exit": 127,
   "steps": [
    {
     "cmd": "go version",
     "out": "bash: go: command not found\n",
     "err": "",
     "exit": 127,
     "dir": "~"
    }
   ]
  },
  "s_nomod.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "go: go.mod file not found in current directory or any parent directory; see 'go help modules'\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run .",
     "out": "",
     "err": "go: go.mod file not found in current directory or any parent directory; see 'go help modules'\n",
     "exit": 1,
     "dir": "~/hello"
    }
   ]
  },
  "s_redirect.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"This goes to standard output.\")\n\tfmt.Fprintln(os.Stderr, \"This goes to standard error.\")\n}\n",
   "stdout": "This goes to standard output.\n",
   "stderr": "This goes to standard error.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run streams.go > results.txt",
     "out": "",
     "err": "This goes to standard error.\n",
     "exit": 0,
     "dir": "~/go-ch1"
    },
    {
     "cmd": "cat results.txt",
     "out": "This goes to standard output.\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch1"
    }
   ]
  },
  "s_version.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "go1.27.3\nlinux\namd64\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go version",
     "out": "go version go1.27.3 linux/amd64\n",
     "err": "",
     "exit": 0,
     "dir": "~"
    },
    {
     "cmd": "go env GOVERSION GOOS GOARCH",
     "out": "go1.27.3\nlinux\namd64\n",
     "err": "",
     "exit": 0,
     "dir": "~"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "go1.24.7\nlinux\namd64\n",
    "stderr": "",
    "exit": 0,
    "steps": [
     {
      "cmd": "go version",
      "out": "go version go1.24.7 linux/amd64\n",
      "err": "",
      "exit": 0,
      "dir": "~"
     },
     {
      "cmd": "go env GOVERSION GOOS GOARCH",
      "out": "go1.24.7\nlinux\namd64\n",
      "err": "",
      "exit": 0,
      "dir": "~"
     }
    ]
   }
  },
  "semis.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"One line,\"); fmt.Println(\"two statements.\")\n\tfmt.Println(\"Go adds the other semicolons for you.\")\n}\n",
   "stdout": "One line,\ntwo statements.\nGo adds the other semicolons for you.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run semis.go",
     "out": "One line,\ntwo statements.\nGo adds the other semicolons for you.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "single.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println('Hello, World!')\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./single.go:6:14: more than one character in rune literal\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run single.go",
     "out": "",
     "err": "# command-line-arguments\n./single.go:6:14: more than one character in rune literal\n",
     "exit": 1
    }
   ]
  },
  "spot_outside.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfmt.Println(\"Am I in the right place?\")\n\nfunc main() {\n\tfmt.Println(\"Hello from main\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_outside.go:5:1: syntax error: non-declaration statement outside function body\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_outside.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_outside.go:5:1: syntax error: non-declaration statement outside function body\n",
     "exit": 1
    }
   ]
  },
  "spot_quotes.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Parcel one\")\n\tfmt.Println('Parcel two')\n\tfmt.Println(\"Parcel three\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_quotes.go:7:14: more than one character in rune literal\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_quotes.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_quotes.go:7:14: more than one character in rune literal\n",
     "exit": 1
    }
   ]
  },
  "spot_unused.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"Travelling light\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./spot_unused.go:5:2: \"os\" imported and not used\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run spot_unused.go",
     "out": "",
     "err": "# command-line-arguments\n./spot_unused.go:5:2: \"os\" imported and not used\n",
     "exit": 1
    }
   ]
  },
  "streams.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"This goes to standard output.\")\n\tfmt.Fprintln(os.Stderr, \"This goes to standard error.\")\n}\n",
   "stdout": "This goes to standard output.\n",
   "stderr": "This goes to standard error.\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run streams.go",
     "out": "This goes to standard output.\n",
     "err": "This goes to standard error.\n",
     "exit": 0,
     "merged": "This goes to standard output.\nThis goes to standard error.\n"
    }
   ]
  },
  "three_lines.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Good morning!\")\n\tfmt.Println(\"One line at a time.\")\n\tfmt.Println(\"Top to bottom.\")\n}\n",
   "stdout": "Good morning!\nOne line at a time.\nTop to bottom.\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run three_lines.go",
     "out": "Good morning!\nOne line at a time.\nTop to bottom.\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "unused.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./unused.go:5:2: \"os\" imported and not used\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run unused.go",
     "out": "",
     "err": "# command-line-arguments\n./unused.go:5:2: \"os\" imported and not used\n",
     "exit": 1
    }
   ]
  },
  "upper.go": {
   "src": "package main\n\nimport \"fmt\"\n\nfunc Main() {\n\tfmt.Println(\"Hello, World!\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\nruntime.main_main·f: function main is undeclared in the main package\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run upper.go",
     "out": "",
     "err": "# command-line-arguments\nruntime.main_main·f: function main is undeclared in the main package\n",
     "exit": 1
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
