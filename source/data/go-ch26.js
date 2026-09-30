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
  "workdir": "/home/you/go-ch26",
  "versionDifferences": [
   "boss_err.go",
   "kitchen_vet.go",
   "lostcancel.go",
   "resp_vet.go"
  ],
  "isolation": "run steps execute in a fresh PID namespace with ASLR off",
  "note": "Every program was run with both toolchains. These differ between versions (the page shows the primary run): boss_err.go, kitchen_vet.go, lostcancel.go, resp_vet.go."
 },
 "programs": {
  "allow.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n\t})\n\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(\"DELETE\", \"/hello/gopher\", nil))\n\tfmt.Println(rec.Code, http.StatusText(rec.Code))\n\tfmt.Println(\"Allow:\", rec.Header().Get(\"Allow\"))\n}\n",
   "stdout": "405 Method Not Allowed\nAllow: GET, HEAD\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run allow.go",
     "out": "405 Method Not Allowed\nAllow: GET, HEAD\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bg_fixed.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"time\"\n)\n\nvar report = make(chan string, 1)\n\n// sendReceipt emails a receipt. It takes 100ms.\nfunc sendReceipt(ctx context.Context) {\n\tselect {\n\tcase <-time.After(100 * time.Millisecond):\n\t\treport <- \"receipt sent\"\n\tcase <-ctx.Done():\n\t\treport <- \"receipt lost: \" + ctx.Err().Error()\n\t}\n}\n\nfunc pay(w http.ResponseWriter, r *http.Request) {\n\tgo sendReceipt(context.WithoutCancel(r.Context()))\n\tfmt.Fprint(w, \"thanks for paying\")\n}\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(pay))\n\tdefer srv.Close()\n\n\tresp, err := http.Get(srv.URL + \"/pay\")\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tresp.Body.Close()\n\tfmt.Println(\"customer:\", resp.Status)\n\tfmt.Println(\"later:\", <-report)\n}\n",
   "stdout": "customer: 200 OK\nlater: receipt sent\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run bg_fixed.go",
     "out": "customer: 200 OK\nlater: receipt sent\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "bg_request.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"time\"\n)\n\nvar report = make(chan string, 1)\n\n// sendReceipt emails a receipt. It takes 100ms.\nfunc sendReceipt(ctx context.Context) {\n\tselect {\n\tcase <-time.After(100 * time.Millisecond):\n\t\treport <- \"receipt sent\"\n\tcase <-ctx.Done():\n\t\treport <- \"receipt lost: \" + ctx.Err().Error()\n\t}\n}\n\nfunc pay(w http.ResponseWriter, r *http.Request) {\n\tgo sendReceipt(r.Context())\n\tfmt.Fprint(w, \"thanks for paying\")\n}\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(pay))\n\tdefer srv.Close()\n\n\tresp, err := http.Get(srv.URL + \"/pay\")\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tresp.Body.Close()\n\tfmt.Println(\"customer:\", resp.Status)\n\tfmt.Println(\"later:\", <-report)\n}\n",
   "stdout": "customer: 200 OK\nlater: receipt lost: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run bg_request.go",
     "out": "customer: 200 OK\nlater: receipt lost: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_err.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), time.Second)\n\tdefer cancel()\n\t<-ctx.Done\n\tfmt.Println(\"done\")\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./boss_err.go:12:4: invalid operation: cannot receive from non-channel func() <-chan struct{} ctx.Done (value of type func() <-chan struct{})\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run boss_err.go",
     "out": "",
     "err": "# command-line-arguments\n./boss_err.go:12:4: invalid operation: cannot receive from non-channel func() <-chan struct{} ctx.Done (value of type func() <-chan struct{})\n",
     "exit": 1
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n./boss_err.go:12:4: invalid operation: cannot receive from non-channel ctx.Done (value of type func() <-chan struct{})\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run boss_err.go",
      "out": "",
      "err": "# command-line-arguments\n./boss_err.go:12:4: invalid operation: cannot receive from non-channel ctx.Done (value of type func() <-chan struct{})\n",
      "exit": 1
     }
    ]
   }
  },
  "boss_fill.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"time\"\n)\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"your table is ready\")\n\t}))\n\tdefer srv.Close()\n\n\tctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\n\tdefer cancel()\n\n\treq, err := http.NewRequestWithContext(ctx, \"GET\", srv.URL+\"/table\", nil)\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tresp, err := http.DefaultClient.Do(req)\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(resp.StatusCode, string(body))\n}\n",
   "stdout": "200 your table is ready\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_fill.go",
     "out": "200 your table is ready\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_parsons.go": {
   "src": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\ntype Order struct {\n\tDish string `json:\"dish\"`\n\tQty  int    `json:\"qty\"`\n}\n\nfunc order(w http.ResponseWriter, r *http.Request) {\n\tvar o Order\n\tif err := json.NewDecoder(r.Body).Decode(&o); err != nil {\n\t\thttp.Error(w, \"bad order\", http.StatusBadRequest)\n\t\treturn\n\t}\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprintf(w, \"%d x %s\\n\", o.Qty, o.Dish)\n}\n\nfunc main() {\n\tfor _, body := range []string{`{\"dish\":\"pie\",\"qty\":3}`, `pie please`} {\n\t\trec := httptest.NewRecorder()\n\t\torder(rec, httptest.NewRequest(\"POST\", \"/orders\", strings.NewReader(body)))\n\t\tfmt.Print(rec.Code, \" \", rec.Body.String())\n\t}\n}\n",
   "stdout": "201 3 x pie\n400 bad order\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_parsons.go",
     "out": "201 3 x pie\n400 bad order\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_predict.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc say(text string) http.HandlerFunc {\n\treturn func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, text, r.PathValue(\"id\"))\n\t}\n}\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /dishes/{id}\", say(\"dish \"))\n\tmux.HandleFunc(\"GET /dishes/special\", say(\"special\"))\n\tmux.HandleFunc(\"POST /dishes\", say(\"new dish\"))\n\n\tfor _, t := range []string{\"GET /dishes/special\", \"GET /dishes/9\", \"DELETE /dishes/9\", \"POST /dishes\"} {\n\t\tmethod, path, _ := strings.Cut(t, \" \")\n\t\trec := httptest.NewRecorder()\n\t\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\t\tfmt.Println(rec.Code, strings.TrimSpace(rec.Body.String()))\n\t}\n}\n",
   "stdout": "200 special\n200 dish 9\n405 Method Not Allowed\n200 new dish\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_predict.go",
     "out": "200 special\n200 dish 9\n405 Method Not Allowed\n200 new dish\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_spot.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc cook(ctx context.Context, dish string, d time.Duration) string {\n\tselect {\n\tcase <-time.After(d):\n\t\treturn dish + \" ready\"\n\tcase <-ctx.Done():\n\t\treturn dish + \" canceled\"\n\t}\n}\n\nfunc serve(ctx context.Context) {\n\tfmt.Println(cook(ctx, \"toast\", 10*time.Millisecond))\n\tfmt.Println(cook(context.Background(), \"stew\", 300*time.Millisecond))\n}\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n\tdefer cancel()\n\tserve(ctx)\n\tfmt.Println(\"served after the deadline:\", ctx.Err() != nil)\n}\n",
   "stdout": "toast ready\nstew ready\nserved after the deadline: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_spot.go",
     "out": "toast ready\nstew ready\nserved after the deadline: true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "boss_trace.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"errors\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc state(ctx context.Context) string {\n\tswitch {\n\tcase errors.Is(ctx.Err(), context.DeadlineExceeded):\n\t\treturn \"timeout\"\n\tcase errors.Is(ctx.Err(), context.Canceled):\n\t\treturn \"canceled\"\n\t}\n\treturn \"live\"\n}\n\nfunc main() {\n\troot, stopRoot := context.WithCancel(context.Background())\n\ta, stopA := context.WithTimeout(root, 50*time.Millisecond)\n\tdefer stopA()\n\ta1, stopA1 := context.WithCancel(a)\n\tdefer stopA1()\n\tb, stopB := context.WithTimeout(root, time.Hour)\n\tdefer stopB()\n\n\t<-a1.Done()\n\tfor round := 1; round <= 2; round++ {\n\t\tfmt.Println(round, \"root\", state(root))\n\t\tfmt.Println(round, \"a\", state(a))\n\t\tfmt.Println(round, \"a1\", state(a1))\n\t\tfmt.Println(round, \"b\", state(b))\n\t\tstopRoot()\n\t}\n}\n",
   "stdout": "1 root live\n1 a timeout\n1 a1 timeout\n1 b live\n2 root canceled\n2 a timeout\n2 a1 timeout\n2 b canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run boss_trace.go",
     "out": "1 root live\n1 a timeout\n1 a1 timeout\n1 b live\n2 root canceled\n2 a timeout\n2 a1 timeout\n2 b canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cause.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"errors\"\n\t\"fmt\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithCancelCause(context.Background())\n\tcancel(errors.New(\"kitchen on fire\"))\n\n\tfmt.Println(\"Err:  \", ctx.Err())\n\tfmt.Println(\"Cause:\", context.Cause(ctx))\n\n\tplain, stop := context.WithCancel(context.Background())\n\tstop()\n\tfmt.Println(\"plain Cause:\", context.Cause(plain))\n}\n",
   "stdout": "Err:   context canceled\nCause: kitchen on fire\nplain Cause: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run cause.go",
     "out": "Err:   context canceled\nCause: kitchen on fire\nplain Cause: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "chain.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc region(ctx context.Context, ready chan<- bool) {\n\tfmt.Println(\"region: listening\")\n\tteam(ctx, ready)\n\tfmt.Println(\"region: team is back\")\n}\n\nfunc team(ctx context.Context, ready chan<- bool) {\n\tctx, cancel := context.WithTimeout(ctx, time.Minute)\n\tdefer cancel()\n\tfmt.Println(\"team: listening (my own limit: 1 minute)\")\n\tscout(ctx, ready)\n\tfmt.Println(\"team: scout is back\")\n}\n\nfunc scout(ctx context.Context, ready chan<- bool) {\n\tfmt.Println(\"scout: listening\")\n\tready <- true\n\t<-ctx.Done()\n\tfmt.Println(\"scout: stopping:\", ctx.Err())\n}\n\nfunc main() {\n\tctx, cancel := context.WithCancel(context.Background())\n\tready := make(chan bool)\n\tgo func() {\n\t\t<-ready\n\t\tfmt.Println(\"HQ: abort!\")\n\t\tcancel()\n\t}()\n\tregion(ctx, ready)\n\tfmt.Println(\"HQ: everyone is back:\", ctx.Err())\n}\n",
   "stdout": "region: listening\nteam: listening (my own limit: 1 minute)\nscout: listening\nHQ: abort!\nscout: stopping: context canceled\nteam: scout is back\nregion: team is back\nHQ: everyone is back: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run chain.go",
     "out": "region: listening\nteam: listening (my own limit: 1 minute)\nscout: listening\nHQ: abort!\nscout: stopping: context canceled\nteam: scout is back\nregion: team is back\nHQ: everyone is back: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "client_404.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tsrv := httptest.NewServer(http.NewServeMux())\n\tdefer srv.Close()\n\n\tresp, err := http.Get(srv.URL + \"/menu\")\n\tif err != nil {\n\t\tfmt.Println(\"error:\", err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\tfmt.Println(\"err is nil:\", err == nil)\n\tfmt.Println(\"status:\", resp.StatusCode)\n\tif resp.StatusCode != http.StatusOK {\n\t\tfmt.Println(\"not OK:\", resp.Status)\n\t}\n}\n",
   "stdout": "err is nil: true\nstatus: 404\nnot OK: 404 Not Found\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run client_404.go",
     "out": "err is nil: true\nstatus: 404\nnot OK: 404 Not Found\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "client_ctx.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"time\"\n)\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tselect {\n\t\tcase <-time.After(5 * time.Second):\n\t\tcase <-r.Context().Done():\n\t\t}\n\t}))\n\tdefer srv.Close()\n\n\tctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)\n\tdefer cancel()\n\n\treq, err := http.NewRequestWithContext(ctx, \"GET\", srv.URL+\"/stew\", nil)\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tresp, err := http.DefaultClient.Do(req)\n\tif err != nil {\n\t\tfmt.Println(\"gave up:\", errors.Is(err, context.DeadlineExceeded))\n\t\tfmt.Println(\"ctx says:\", ctx.Err())\n\t\treturn\n\t}\n\tresp.Body.Close()\n}\n",
   "stdout": "gave up: true\nctx says: context deadline exceeded\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run client_ctx.go",
     "out": "gave up: true\nctx says: context deadline exceeded\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "client_get.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tdiner := http.NewServeMux()\n\tdiner.HandleFunc(\"GET /hello/{name}\", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n\t})\n\tsrv := httptest.NewServer(diner)\n\tdefer srv.Close()\n\n\tresp, err := http.Get(srv.URL + \"/hello/gopher\")\n\tif err != nil {\n\t\tfmt.Println(\"no answer:\", err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\n\tbody, err := io.ReadAll(resp.Body)\n\tif err != nil {\n\t\tfmt.Println(\"broken body:\", err)\n\t\treturn\n\t}\n\tfmt.Println(resp.Status)\n\tfmt.Println(resp.Header.Get(\"Content-Type\"))\n\tfmt.Println(string(body))\n}\n",
   "stdout": "200 OK\ntext/plain; charset=utf-8\nhello gopher\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run client_get.go",
     "out": "200 OK\ntext/plain; charset=utf-8\nhello gopher\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "client_timeout.go": {
   "src": "package main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"net/url\"\n\t\"time\"\n)\n\nfunc main() {\n\tkitchen := make(chan string, 1)\n\tslow := func(w http.ResponseWriter, r *http.Request) {\n\t\tselect {\n\t\tcase <-time.After(5 * time.Second):\n\t\t\tfmt.Fprint(w, \"finally, your stew\")\n\t\tcase <-r.Context().Done():\n\t\t\tkitchen <- \"kitchen: customer left: \" + r.Context().Err().Error()\n\t\t}\n\t}\n\tsrv := httptest.NewServer(http.HandlerFunc(slow))\n\tdefer srv.Close()\n\n\tclient := &http.Client{Timeout: 200 * time.Millisecond}\n\t_, err := client.Get(srv.URL + \"/stew\")\n\n\tvar ue *url.Error\n\tif errors.As(err, &ue) {\n\t\tfmt.Println(\"op:\", ue.Op)\n\t\tfmt.Println(\"timeout:\", ue.Timeout())\n\t\tfmt.Println(\"why:\", ue.Err)\n\t}\n\tfmt.Println(<-kitchen)\n}\n",
   "stdout": "op: Get\ntimeout: true\nwhy: context deadline exceeded (Client.Timeout exceeded while awaiting headers)\nkitchen: customer left: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run client_timeout.go",
     "out": "op: Get\ntimeout: true\nwhy: context deadline exceeded (Client.Timeout exceeded while awaiting headers)\nkitchen: customer left: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "cook.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\n// cook takes d to make dish, unless ctx says stop first.\nfunc cook(ctx context.Context, dish string, d time.Duration) error {\n\tselect {\n\tcase <-time.After(d):\n\t\tfmt.Println(dish, \"ready\")\n\t\treturn nil\n\tcase <-ctx.Done():\n\t\treturn fmt.Errorf(\"%s: %w\", dish, ctx.Err())\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 300*time.Millisecond)\n\tdefer cancel()\n\n\tif err := cook(ctx, \"toast\", 20*time.Millisecond); err != nil {\n\t\tfmt.Println(err)\n\t}\n\tif err := cook(ctx, \"stew\", 2*time.Second); err != nil {\n\t\tfmt.Println(err)\n\t}\n\tif err := cook(ctx, \"tea\", 10*time.Millisecond); err != nil {\n\t\tfmt.Println(err)\n\t}\n}\n",
   "stdout": "toast ready\nstew: context deadline exceeded\ntea: context deadline exceeded\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run cook.go",
     "out": "toast ready\nstew: context deadline exceeded\ntea: context deadline exceeded\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ctx_param.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\ntype Oven struct{}\n\nfunc (o Oven) Bake(ctx context.Context, dish string) {\n\tselect {\n\tcase <-time.After(10 * time.Millisecond):\n\t\tfmt.Println(dish, \"baked\")\n\tcase <-ctx.Done():\n\t\tfmt.Println(dish, \"failed:\", ctx.Err())\n\t}\n}\n\nfunc main() {\n\tvar oven Oven\n\tfor _, dish := range []string{\"bread\", \"cake\"} {\n\t\tctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n\t\toven.Bake(ctx, dish)\n\t\tcancel()\n\t}\n}\n",
   "stdout": "bread baked\ncake baked\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run ctx_param.go",
     "out": "bread baked\ncake baked\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "ctx_struct.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\ntype Oven struct {\n\tctx context.Context\n}\n\nfunc (o Oven) Bake(dish string) {\n\tselect {\n\tcase <-time.After(10 * time.Millisecond):\n\t\tfmt.Println(dish, \"baked\")\n\tcase <-o.ctx.Done():\n\t\tfmt.Println(dish, \"failed:\", o.ctx.Err())\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n\tdefer cancel()\n\toven := Oven{ctx: ctx}\n\n\toven.Bake(\"bread\")\n\ttime.Sleep(200 * time.Millisecond)\n\toven.Bake(\"cake\")\n}\n",
   "stdout": "bread baked\ncake failed: context deadline exceeded\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run ctx_struct.go",
     "out": "bread baked\ncake failed: context deadline exceeded\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "deadline.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tclosing := time.Now().Add(80 * time.Millisecond)\n\tctx, cancel := context.WithDeadline(context.Background(), closing)\n\tdefer cancel()\n\n\td, ok := ctx.Deadline()\n\tfmt.Println(\"has a deadline:\", ok, d.Equal(closing))\n\t_, ok = context.Background().Deadline()\n\tfmt.Println(\"Background has one:\", ok)\n\n\t<-ctx.Done()\n\tfmt.Println(\"closing time:\", ctx.Err())\n\tfmt.Println(\"on time or later:\", !time.Now().Before(closing))\n}\n",
   "stdout": "has a deadline: true true\nBackground has one: false\nclosing time: context deadline exceeded\non time or later: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run deadline.go",
     "out": "has a deadline: true true\nBackground has one: false\nclosing time: context deadline exceeded\non time or later: true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "default_mux.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc main() {\n\thttp.HandleFunc(\"GET /hello/{name}\", greet)\n\n\trec := httptest.NewRecorder()\n\thttp.DefaultServeMux.ServeHTTP(rec, httptest.NewRequest(\"GET\", \"/hello/gopher\", nil))\n\tfmt.Println(rec.Code, rec.Body.String())\n\n\t// A real server would now run forever, until you press Ctrl+C:\n\t// http.ListenAndServe(\":8080\", nil)\n}\n",
   "stdout": "200 hello gopher\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run default_mux.go",
     "out": "200 hello gopher\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "diner.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprint(w, \"order placed\")\n}\n\nfunc newDiner() *http.ServeMux {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", greet)\n\tmux.HandleFunc(\"POST /orders\", placeOrder)\n\treturn mux\n}\n\nfunc try(mux *http.ServeMux, method, path string) {\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\tfmt.Println(method, path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n}\n\nfunc main() {\n\tdiner := newDiner()\n\ttry(diner, \"GET\", \"/hello/gopher\")\n\ttry(diner, \"POST\", \"/orders\")\n\ttry(diner, \"POST\", \"/hello/gopher\")\n\ttry(diner, \"GET\", \"/menu\")\n}\n",
   "stdout": "GET /hello/gopher -> 200 hello gopher\nPOST /orders -> 201 order placed\nPOST /hello/gopher -> 405 Method Not Allowed\nGET /menu -> 404 404 page not found\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run diner.go",
     "out": "GET /hello/gopher -> 200 hello gopher\nPOST /orders -> 201 order placed\nPOST /hello/gopher -> 405 Method Not Allowed\nGET /menu -> 404 404 page not found\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "err_m.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tfmt.Println(\"Background:\", context.Background().Err())\n\n\tctx, cancel := context.WithCancel(context.Background())\n\tfmt.Println(\"fresh:\", ctx.Err())\n\tcancel()\n\tfmt.Println(\"after cancel():\", ctx.Err())\n\tcancel()\n\tfmt.Println(\"cancel() twice:\", ctx.Err())\n\n\ttimed, stop := context.WithTimeout(context.Background(), 10*time.Millisecond)\n\tdefer stop()\n\t<-timed.Done()\n\tfmt.Println(\"time ran out:\", timed.Err())\n\n\tparent, cancelParent := context.WithCancel(context.Background())\n\tchild, cancelChild := context.WithCancel(parent)\n\tdefer cancelChild()\n\tcancelParent()\n\tfmt.Println(\"child of a canceled parent:\", child.Err())\n}\n",
   "stdout": "Background: <nil>\nfresh: <nil>\nafter cancel(): context canceled\ncancel() twice: context canceled\ntime ran out: context deadline exceeded\nchild of a canceled parent: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run err_m.go",
     "out": "Background: <nil>\nfresh: <nil>\nafter cancel(): context canceled\ncancel() twice: context canceled\ntime ran out: context deadline exceeded\nchild of a canceled parent: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_body.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"fresh bread\")\n\t}))\n\tdefer srv.Close()\n\n\tresp, err := http.Get(srv.URL + \"/bread\")\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(resp.StatusCode, string(body))\n}\n",
   "stdout": "200 fresh bread\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_body.go",
     "out": "200 fresh bread\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_cancel.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), time.Second)\n\tdefer cancel()\n\n\t_, ok := ctx.Deadline()\n\tfmt.Println(\"deadline set:\", ok)\n\tfmt.Println(\"still open:\", ctx.Err() == nil)\n}\n",
   "stdout": "deadline set: true\nstill open: true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_cancel.go",
     "out": "deadline set: true\nstill open: true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "fill_route.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /soup/{flavor}\", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"one bowl of \", r.PathValue(\"flavor\"))\n\t})\n\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(\"GET\", \"/soup/tomato\", nil))\n\tfmt.Println(rec.Code, rec.Body.String())\n}\n",
   "stdout": "200 one bowl of tomato\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run fill_route.go",
     "out": "200 one bowl of tomato\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "forgot_cancel.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), time.Second)\n\tfmt.Println(ctx.Err())\n}\n",
   "stdout": "",
   "stderr": "# command-line-arguments\n./forgot_cancel.go:10:7: declared and not used: cancel\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run forgot_cancel.go",
     "out": "",
     "err": "# command-line-arguments\n./forgot_cancel.go:10:7: declared and not used: cancel\n",
     "exit": 1
    }
   ]
  },
  "handler_type.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\n// A Menu is a waiter: it has a ServeHTTP method.\ntype Menu struct {\n\tdishes []string\n}\n\nfunc (m Menu) ServeHTTP(w http.ResponseWriter, r *http.Request) {\n\tfor i, d := range m.dishes {\n\t\tfmt.Fprintf(w, \"%d. %s\\n\", i+1, d)\n\t}\n}\n\nfunc main() {\n\tvar h http.Handler = Menu{dishes: []string{\"soup\", \"pie\"}}\n\n\tmux := http.NewServeMux()\n\tmux.Handle(\"GET /menu\", h)\n\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(\"GET\", \"/menu\", nil))\n\tfmt.Print(rec.Body.String())\n}\n",
   "stdout": "1. soup\n2. pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run handler_type.go",
     "out": "1. soup\n2. pie\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "handlerfunc.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc ping(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"pong\")\n}\n\nfunc main() {\n\tvar h http.Handler = http.HandlerFunc(ping)\n\n\trec := httptest.NewRecorder()\n\th.ServeHTTP(rec, httptest.NewRequest(\"GET\", \"/ping\", nil))\n\tfmt.Println(rec.Code, rec.Body.String())\n\tfmt.Printf(\"%T\\n\", h)\n}\n",
   "stdout": "200 pong\nhttp.HandlerFunc\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run handlerfunc.go",
     "out": "200 pong\nhttp.HandlerFunc\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "hello.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc hello(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprintln(w, \"hello, you asked for\", r.URL.Path)\n}\n\nfunc main() {\n\treq := httptest.NewRequest(\"GET\", \"/menu\", nil)\n\trec := httptest.NewRecorder()\n\n\thello(rec, req)\n\n\tfmt.Println(\"status:\", rec.Code)\n\tfmt.Print(\"body: \", rec.Body.String())\n}\n",
   "stdout": "status: 200\nbody: hello, you asked for /menu\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run hello.go",
     "out": "status: 200\nbody: hello, you asked for /menu\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "json_api.go": {
   "src": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\ntype Order struct {\n\tDish string `json:\"dish\"`\n\tQty  int    `json:\"qty\"`\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tvar o Order\n\tif err := json.NewDecoder(r.Body).Decode(&o); err != nil {\n\t\thttp.Error(w, \"bad order: \"+err.Error(), http.StatusBadRequest)\n\t\treturn\n\t}\n\tw.Header().Set(\"Content-Type\", \"application/json\")\n\tw.WriteHeader(http.StatusCreated)\n\tjson.NewEncoder(w).Encode(map[string]any{\"ticket\": 7, \"dish\": o.Dish, \"qty\": o.Qty})\n}\n\nfunc send(body string) {\n\treq := httptest.NewRequest(\"POST\", \"/orders\", strings.NewReader(body))\n\trec := httptest.NewRecorder()\n\tplaceOrder(rec, req)\n\tfmt.Println(rec.Code, rec.Header().Get(\"Content-Type\"))\n\tfmt.Print(rec.Body.String())\n}\n\nfunc main() {\n\tsend(`{\"dish\": \"soup\", \"qty\": 2}`)\n\tsend(`{\"dish\": \"soup\", \"qty\": \"two\"}`)\n}\n",
   "stdout": "201 application/json\n{\"dish\":\"soup\",\"qty\":2,\"ticket\":7}\n400 text/plain; charset=utf-8\nbad order: json: cannot unmarshal string into Go struct field Order.qty of type int\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run json_api.go",
     "out": "201 application/json\n{\"dish\":\"soup\",\"qty\":2,\"ticket\":7}\n400 text/plain; charset=utf-8\nbad order: json: cannot unmarshal string into Go struct field Order.qty of type int\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "kitchen_vet.go": {
   "src": "// Package kitchen cooks orders.\npackage kitchen\n\nimport (\n\t\"context\"\n\t\"time\"\n)\n\n// Cook gives each order one second.\nfunc Cook(parent context.Context) error {\n\tctx, _ := context.WithTimeout(parent, time.Second)\n\treturn ctx.Err()\n}\n",
   "stdout": "",
   "stderr": "kitchen.go:11:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "cd kitchen",
     "out": "",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch26"
    },
    {
     "cmd": "go test -count=1",
     "out": "PASS\nok  \texample.com/kitchen\t0.002s\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch26/kitchen"
    },
    {
     "cmd": "go vet .",
     "out": "",
     "err": "kitchen.go:11:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
     "exit": 1,
     "dir": "~/go-ch26/kitchen"
    }
   ],
   "nondeterministic": true,
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# example.com/kitchen\n# [example.com/kitchen]\n./kitchen.go:11:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "cd kitchen",
      "out": "",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch26"
     },
     {
      "cmd": "go test -count=1",
      "out": "PASS\nok  \texample.com/kitchen\t0.002s\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch26/kitchen"
     },
     {
      "cmd": "go vet .",
      "out": "",
      "err": "# example.com/kitchen\n# [example.com/kitchen]\n./kitchen.go:11:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
      "exit": 1,
      "dir": "~/go-ch26/kitchen"
     }
    ]
   }
  },
  "kitchen/kitchen.go": {
   "src": "// Package kitchen cooks orders.\npackage kitchen\n\nimport (\n\t\"context\"\n\t\"time\"\n)\n\n// Cook gives each order one second.\nfunc Cook(parent context.Context) error {\n\tctx, _ := context.WithTimeout(parent, time.Second)\n\treturn ctx.Err()\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "kitchen/kitchen_test.go": {
   "src": "package kitchen\n\nimport (\n\t\"context\"\n\t\"testing\"\n)\n\nfunc TestCook(t *testing.T) {\n\tif err := Cook(context.Background()); err != nil {\n\t\tt.Errorf(\"Cook: %v\", err)\n\t}\n}\n",
   "stdout": "",
   "stderr": "",
   "exit": 0,
   "sourceOnly": true
  },
  "lostcancel.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, _ := context.WithTimeout(context.Background(), time.Second)\n\tfmt.Println(ctx.Err())\n}\n",
   "stdout": "",
   "stderr": "lostcancel.go:10:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go run lostcancel.go",
     "out": "<nil>\n",
     "err": "",
     "exit": 0,
     "dir": "~/go-ch26"
    },
    {
     "cmd": "go vet lostcancel.go",
     "out": "",
     "err": "lostcancel.go:10:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
     "exit": 1,
     "dir": "~/go-ch26"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n# [command-line-arguments]\n./lostcancel.go:10:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go run lostcancel.go",
      "out": "<nil>\n",
      "err": "",
      "exit": 0,
      "dir": "~/go-ch26"
     },
     {
      "cmd": "go vet lostcancel.go",
      "out": "",
      "err": "# command-line-arguments\n# [command-line-arguments]\n./lostcancel.go:10:7: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak\n",
      "exit": 1,
      "dir": "~/go-ch26"
     }
    ]
   }
  },
  "middleware.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc logger(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Println(\"logger: in\", r.Method, r.URL.Path)\n\t\tnext.ServeHTTP(w, r)\n\t\tfmt.Println(\"logger: out\", r.Method, r.URL.Path)\n\t})\n}\n\nfunc members(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tif r.Header.Get(\"Card\") != \"gold\" {\n\t\t\tfmt.Println(\"members: no card, turned away\")\n\t\t\thttp.Error(w, \"members only\", http.StatusUnauthorized)\n\t\t\treturn\n\t\t}\n\t\tfmt.Println(\"members: card OK\")\n\t\tnext.ServeHTTP(w, r)\n\t})\n}\n\nfunc lounge(w http.ResponseWriter, r *http.Request) {\n\tfmt.Println(\"lounge: serving\")\n\tfmt.Fprint(w, \"welcome to the lounge\")\n}\n\nfunc main() {\n\tapp := logger(members(http.HandlerFunc(lounge)))\n\n\tfor _, card := range []string{\"gold\", \"\"} {\n\t\treq := httptest.NewRequest(\"GET\", \"/lounge\", nil)\n\t\treq.Header.Set(\"Card\", card)\n\t\trec := httptest.NewRecorder()\n\t\tapp.ServeHTTP(rec, req)\n\t\tfmt.Println(\"=>\", rec.Code)\n\t}\n}\n",
   "stdout": "logger: in GET /lounge\nmembers: card OK\nlounge: serving\nlogger: out GET /lounge\n=> 200\nlogger: in GET /lounge\nmembers: no card, turned away\nlogger: out GET /lounge\n=> 401\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run middleware.go",
     "out": "logger: in GET /lounge\nmembers: card OK\nlounge: serving\nlogger: out GET /lounge\n=> 200\nlogger: in GET /lounge\nmembers: no card, turned away\nlogger: out GET /lounge\n=> 401\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "missing_return.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strconv\"\n)\n\nfunc order(w http.ResponseWriter, r *http.Request) {\n\tqty, err := strconv.Atoi(r.URL.Query().Get(\"qty\"))\n\tif err != nil || qty < 1 {\n\t\thttp.Error(w, \"qty must be a positive number\", http.StatusBadRequest)\n\t}\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprintf(w, \"ordered %d\\n\", qty)\n}\n\nfunc main() {\n\trec := httptest.NewRecorder()\n\torder(rec, httptest.NewRequest(\"POST\", \"/order?qty=zero\", nil))\n\tfmt.Println(\"status:\", rec.Code)\n\tfmt.Print(rec.Body.String())\n}\n",
   "stdout": "status: 400\nqty must be a positive number\nordered 0\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run missing_return.go",
     "out": "status: 400\nqty must be a positive number\nordered 0\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "missing_return_srv.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"log\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strconv\"\n)\n\nfunc order(w http.ResponseWriter, r *http.Request) {\n\tqty, err := strconv.Atoi(r.URL.Query().Get(\"qty\"))\n\tif err != nil || qty < 1 {\n\t\thttp.Error(w, \"qty must be a positive number\", http.StatusBadRequest)\n\t}\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprintf(w, \"ordered %d\\n\", qty)\n}\n\nfunc main() {\n\tlog.SetFlags(0)\n\tsrv := httptest.NewServer(http.HandlerFunc(order))\n\tdefer srv.Close()\n\n\tresp, err := http.Post(srv.URL+\"/order?qty=zero\", \"text/plain\", nil)\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(resp.Status)\n\tfmt.Print(string(body))\n}\n",
   "stdout": "400 Bad Request\nqty must be a positive number\nordered 0\n",
   "stderr": "http: superfluous response.WriteHeader call from main.order (missing_return_srv.go:17)\n",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run missing_return_srv.go",
     "out": "400 Bad Request\nqty must be a positive number\nordered 0\n",
     "err": "http: superfluous response.WriteHeader call from main.order (missing_return_srv.go:17)\n",
     "exit": 0,
     "merged": "http: superfluous response.WriteHeader call from main.order (missing_return_srv.go:17)\n400 Bad Request\nqty must be a positive number\nordered 0\n"
    }
   ]
  },
  "parsons_client.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"time\"\n)\n\nfunc get(client *http.Client, url string) {\n\tresp, err := client.Get(url)\n\tif err != nil {\n\t\tfmt.Println(\"no answer\")\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(resp.StatusCode, string(body))\n}\n\nfunc main() {\n\tsrv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"today: soup\")\n\t}))\n\tdefer srv.Close()\n\n\tclient := &http.Client{Timeout: 2 * time.Second}\n\tget(client, srv.URL)\n\tget(client, \"http://localhost:0/\")\n}\n",
   "stdout": "200 today: soup\nno answer\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_client.go",
     "out": "200 today: soup\nno answer\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "parsons_timeout.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n\tdefer cancel()\n\tselect {\n\tcase <-time.After(time.Second):\n\t\tfmt.Println(\"pizza delivered\")\n\tcase <-ctx.Done():\n\t\tfmt.Println(\"refund:\", ctx.Err())\n\t}\n}\n",
   "stdout": "refund: context deadline exceeded\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run parsons_timeout.go",
     "out": "refund: context deadline exceeded\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "patterns.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc say(text string) http.HandlerFunc {\n\treturn func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, text, r.PathValue(\"id\"), r.PathValue(\"rest\"))\n\t}\n}\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /dishes/{id}\", say(\"dish \"))\n\tmux.HandleFunc(\"GET /dishes/special\", say(\"today's special\"))\n\tmux.HandleFunc(\"GET /files/{rest...}\", say(\"file \"))\n\tmux.HandleFunc(\"/\", say(\"front door\"))\n\n\tfor _, path := range []string{\"/dishes/7\", \"/dishes/special\", \"/files/menu/lunch.txt\", \"/anything/else\"} {\n\t\trec := httptest.NewRecorder()\n\t\tmux.ServeHTTP(rec, httptest.NewRequest(\"GET\", path, nil))\n\t\tfmt.Println(path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n\t}\n}\n",
   "stdout": "/dishes/7 -> 200 dish 7\n/dishes/special -> 200 today's special\n/files/menu/lunch.txt -> 200 file menu/lunch.txt\n/anything/else -> 200 front door\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run patterns.go",
     "out": "/dishes/7 -> 200 dish 7\n/dishes/special -> 200 today's special\n/files/menu/lunch.txt -> 200 file menu/lunch.txt\n/anything/else -> 200 front door\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_cancel.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\nfunc check(ctx context.Context) {\n\tselect {\n\tcase <-ctx.Done():\n\t\tfmt.Println(\"closed\")\n\tdefault:\n\t\tfmt.Println(\"open\")\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithCancel(context.Background())\n\tfmt.Println(ctx.Err() == nil)\n\tcheck(ctx)\n\tcancel()\n\tcheck(ctx)\n\tfmt.Println(ctx.Err())\n}\n",
   "stdout": "true\nopen\nclosed\ncontext canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_cancel.go",
     "out": "true\nopen\nclosed\ncontext canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_local.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc team(ctx context.Context) {\n\tctx, cancel := context.WithTimeout(ctx, 50*time.Millisecond)\n\tdefer cancel()\n\tscout(ctx)\n}\n\nfunc scout(ctx context.Context) {\n\t<-ctx.Done()\n\tfmt.Println(\"scout:\", ctx.Err())\n}\n\nfunc main() {\n\thq, cancel := context.WithCancel(context.Background())\n\tdefer cancel()\n\tteam(hq)\n\tfmt.Println(\"hq:\", hq.Err())\n}\n",
   "stdout": "scout: context deadline exceeded\nhq: <nil>\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_local.go",
     "out": "scout: context deadline exceeded\nhq: <nil>\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_mux.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /tables/{n}\", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprint(w, \"table \", r.PathValue(\"n\"))\n\t})\n\n\tfor _, req := range []*http.Request{\n\t\thttptest.NewRequest(\"GET\", \"/tables/4\", nil),\n\t\thttptest.NewRequest(\"PUT\", \"/tables/4\", nil),\n\t\thttptest.NewRequest(\"GET\", \"/tables\", nil),\n\t} {\n\t\trec := httptest.NewRecorder()\n\t\tmux.ServeHTTP(rec, req)\n\t\tfmt.Println(rec.Code)\n\t}\n}\n",
   "stdout": "200\n405\n404\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_mux.go",
     "out": "200\n405\n404\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_mw.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc wrap(name string, next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Println(\"open\", name)\n\t\tnext.ServeHTTP(w, r)\n\t\tfmt.Println(\"close\", name)\n\t})\n}\n\nfunc main() {\n\tcore := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Println(\"serve\")\n\t})\n\tapp := wrap(\"A\", wrap(\"B\", core))\n\n\tapp.ServeHTTP(httptest.NewRecorder(), httptest.NewRequest(\"GET\", \"/\", nil))\n}\n",
   "stdout": "open A\nopen B\nserve\nclose B\nclose A\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_mw.go",
     "out": "open A\nopen B\nserve\nclose B\nclose A\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "predict_select.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 300*time.Millisecond)\n\tdefer cancel()\n\n\tfood := make(chan string, 1)\n\tfood <- \"pizza\"\n\n\tfor range 2 {\n\t\tselect {\n\t\tcase f := <-food:\n\t\t\tfmt.Println(\"got\", f)\n\t\tcase <-ctx.Done():\n\t\t\tfmt.Println(\"stopped:\", ctx.Err())\n\t\t}\n\t}\n}\n",
   "stdout": "got pizza\nstopped: context deadline exceeded\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run predict_select.go",
     "out": "got pizza\nstopped: context deadline exceeded\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "radio.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\nfunc main() {\n\thq := context.Background()\n\tctx, cancel := context.WithCancel(hq)\n\tfmt.Println(\"before:\", ctx.Err())\n\n\tcancel()\n\tfmt.Println(\"after:\", ctx.Err())\n\n\t<-ctx.Done()\n\tfmt.Println(\"the Done channel is closed\")\n\n\tcancel()\n\tfmt.Println(\"again:\", ctx.Err())\n}\n",
   "stdout": "before: <nil>\nafter: context canceled\nthe Done channel is closed\nagain: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run radio.go",
     "out": "before: <nil>\nafter: context canceled\nthe Done channel is closed\nagain: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "resp_vet.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n)\n\nconst menuURL = \"http://localhost:0/menu\"\n\nfunc fetch() {\n\tresp, err := http.Get(menuURL)\n\tdefer resp.Body.Close()\n\tif err != nil {\n\t\tfmt.Println(\"error:\", err)\n\t\treturn\n\t}\n\tfmt.Println(resp.Status)\n}\n\nfunc main() {\n\tfetch()\n}\n",
   "stdout": "",
   "stderr": "resp_vet.go:12:8: using resp before checking for errors\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x40 pc=0x62dc1c]\n\ngoroutine 1 [running]:\nmain.fetch()\n\t/home/you/go-ch26/resp_vet.go:12 +0x3c\nmain.main()\n\t/home/you/go-ch26/resp_vet.go:21 +0xf\nexit status 2\n",
   "exit": 1,
   "steps": [
    {
     "cmd": "go vet resp_vet.go",
     "out": "",
     "err": "resp_vet.go:12:8: using resp before checking for errors\n",
     "exit": 1,
     "dir": "~/go-ch26"
    },
    {
     "cmd": "go run resp_vet.go",
     "out": "",
     "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x40 pc=0x62dc1c]\n\ngoroutine 1 [running]:\nmain.fetch()\n\t/home/you/go-ch26/resp_vet.go:12 +0x3c\nmain.main()\n\t/home/you/go-ch26/resp_vet.go:21 +0xf\nexit status 2\n",
     "exit": 1,
     "dir": "~/go-ch26"
    }
   ],
   "alt": {
    "version": "Go 1.24.7",
    "stdout": "",
    "stderr": "# command-line-arguments\n# [command-line-arguments]\n./resp_vet.go:12:8: using resp before checking for errors\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x40 pc=0x61805c]\n\ngoroutine 1 [running]:\nmain.fetch()\n\t/home/you/go-ch26/resp_vet.go:12 +0x3c\nmain.main()\n\t/home/you/go-ch26/resp_vet.go:21 +0xf\nexit status 2\n",
    "exit": 1,
    "steps": [
     {
      "cmd": "go vet resp_vet.go",
      "out": "",
      "err": "# command-line-arguments\n# [command-line-arguments]\n./resp_vet.go:12:8: using resp before checking for errors\n",
      "exit": 1,
      "dir": "~/go-ch26"
     },
     {
      "cmd": "go run resp_vet.go",
      "out": "",
      "err": "panic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x40 pc=0x61805c]\n\ngoroutine 1 [running]:\nmain.fetch()\n\t/home/you/go-ch26/resp_vet.go:12 +0x3c\nmain.main()\n\t/home/you/go-ch26/resp_vet.go:21 +0xf\nexit status 2\n",
      "exit": 1,
      "dir": "~/go-ch26"
     }
    ]
   }
  },
  "route_404.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprint(w, \"order placed\")\n}\n\nfunc newDiner() *http.ServeMux {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", greet)\n\tmux.HandleFunc(\"POST /orders\", placeOrder)\n\treturn mux\n}\n\nfunc try(mux *http.ServeMux, method, path string) {\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\tfmt.Println(method, path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n}\n\nfunc main() {\n\tdiner := newDiner()\n\ttry(diner, \"GET\", \"/menu\")\n}\n",
   "stdout": "GET /menu -> 404 404 page not found\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run route_404.go",
     "out": "GET /menu -> 404 404 page not found\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "route_405.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprint(w, \"order placed\")\n}\n\nfunc newDiner() *http.ServeMux {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", greet)\n\tmux.HandleFunc(\"POST /orders\", placeOrder)\n\treturn mux\n}\n\nfunc try(mux *http.ServeMux, method, path string) {\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\tfmt.Println(method, path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n}\n\nfunc main() {\n\tdiner := newDiner()\n\ttry(diner, \"POST\", \"/hello/gopher\")\n}\n",
   "stdout": "POST /hello/gopher -> 405 Method Not Allowed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run route_405.go",
     "out": "POST /hello/gopher -> 405 Method Not Allowed\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "route_get.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprint(w, \"order placed\")\n}\n\nfunc newDiner() *http.ServeMux {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", greet)\n\tmux.HandleFunc(\"POST /orders\", placeOrder)\n\treturn mux\n}\n\nfunc try(mux *http.ServeMux, method, path string) {\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\tfmt.Println(method, path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n}\n\nfunc main() {\n\tdiner := newDiner()\n\ttry(diner, \"GET\", \"/hello/gopher\")\n}\n",
   "stdout": "GET /hello/gopher -> 200 hello gopher\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run route_get.go",
     "out": "GET /hello/gopher -> 200 hello gopher\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "route_order.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"strings\"\n)\n\nfunc greet(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprint(w, \"hello \", r.PathValue(\"name\"))\n}\n\nfunc placeOrder(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tfmt.Fprint(w, \"order placed\")\n}\n\nfunc newDiner() *http.ServeMux {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"GET /hello/{name}\", greet)\n\tmux.HandleFunc(\"POST /orders\", placeOrder)\n\treturn mux\n}\n\nfunc try(mux *http.ServeMux, method, path string) {\n\trec := httptest.NewRecorder()\n\tmux.ServeHTTP(rec, httptest.NewRequest(method, path, nil))\n\tfmt.Println(method, path, \"->\", rec.Code, strings.TrimSpace(rec.Body.String()))\n}\n\nfunc main() {\n\tdiner := newDiner()\n\ttry(diner, \"POST\", \"/orders\")\n}\n",
   "stdout": "POST /orders -> 201 order placed\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run route_order.go",
     "out": "POST /orders -> 201 order placed\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_early.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc cook(ctx context.Context, dish string) error {\n\tselect {\n\tcase <-time.After(10 * time.Millisecond):\n\t\tfmt.Println(dish, \"ready\")\n\t\treturn nil\n\tcase <-ctx.Done():\n\t\treturn fmt.Errorf(\"%s: %w\", dish, ctx.Err())\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), time.Second)\n\tcancel()\n\n\tif err := cook(ctx, \"soup\"); err != nil {\n\t\tfmt.Println(err)\n\t}\n}\n",
   "stdout": "soup: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_early.go",
     "out": "soup: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "spot_return.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc table(w http.ResponseWriter, r *http.Request) {\n\tname := r.URL.Query().Get(\"name\")\n\tif name == \"\" {\n\t\thttp.Error(w, \"who is the booking for?\", http.StatusBadRequest)\n\t}\n\tfmt.Fprintf(w, \"table booked for %q\\n\", name)\n}\n\nfunc main() {\n\trec := httptest.NewRecorder()\n\ttable(rec, httptest.NewRequest(\"POST\", \"/book\", nil))\n\tfmt.Println(rec.Code)\n\tfmt.Print(rec.Body.String())\n}\n",
   "stdout": "400\nwho is the booking for?\ntable booked for \"\"\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run spot_return.go",
     "out": "400\nwho is the booking for?\ntable booked for \"\"\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "status.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n)\n\nfunc main() {\n\tcodes := []int{200, 201, 301, 400, 401, 404, 405, 500}\n\tfor _, c := range codes {\n\t\tfmt.Println(c, http.StatusText(c))\n\t}\n\tfmt.Println(http.StatusNotFound, http.StatusMethodNotAllowed)\n}\n",
   "stdout": "200 OK\n201 Created\n301 Moved Permanently\n400 Bad Request\n401 Unauthorized\n404 Not Found\n405 Method Not Allowed\n500 Internal Server Error\n404 405\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run status.go",
     "out": "200 OK\n201 Created\n301 Moved Permanently\n400 Bad Request\n401 Unauthorized\n404 Not Found\n405 Method Not Allowed\n500 Internal Server Error\n404 405\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "team.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\nfunc team(ctx context.Context, reports chan<- int, done chan<- bool) {\n\tfor n := 1; ; n++ {\n\t\tselect {\n\t\tcase reports <- n:\n\t\tcase <-ctx.Done():\n\t\t\tfmt.Println(\"team: abort heard:\", ctx.Err())\n\t\t\tdone <- true\n\t\t\treturn\n\t\t}\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithCancel(context.Background())\n\treports := make(chan int)\n\tdone := make(chan bool)\n\tgo team(ctx, reports, done)\n\n\tfor range 3 {\n\t\tfmt.Println(\"HQ heard report\", <-reports)\n\t}\n\tfmt.Println(\"HQ: abort!\")\n\tcancel()\n\t<-done\n\tfmt.Println(\"HQ: the team is back\")\n}\n",
   "stdout": "HQ heard report 1\nHQ heard report 2\nHQ heard report 3\nHQ: abort!\nteam: abort heard: context canceled\nHQ: the team is back\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run team.go",
     "out": "HQ heard report 1\nHQ heard report 2\nHQ heard report 3\nHQ: abort!\nteam: abort heard: context canceled\nHQ: the team is back\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "timeout.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"errors\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)\n\tdefer cancel()\n\n\tselect {\n\tcase <-time.After(2 * time.Second):\n\t\tfmt.Println(\"the stew is ready\")\n\tcase <-ctx.Done():\n\t\tfmt.Println(\"gave up waiting\")\n\t}\n\n\terr := ctx.Err()\n\tfmt.Println(err, errors.Is(err, context.DeadlineExceeded))\n}\n",
   "stdout": "gave up waiting\ncontext deadline exceeded true\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run timeout.go",
     "out": "gave up waiting\ncontext deadline exceeded true\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_routes.go": {
   "src": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"net/http/httptest\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tok := func(w http.ResponseWriter, r *http.Request) {}\n\tmux.HandleFunc(\"GET /menu\", ok)\n\tmux.HandleFunc(\"POST /orders\", ok)\n\tmux.HandleFunc(\"DELETE /orders/{id}\", ok)\n\n\ttries := [][2]string{\n\t\t{\"GET\", \"/menu\"},\n\t\t{\"POST\", \"/menu\"},\n\t\t{\"POST\", \"/orders\"},\n\t\t{\"DELETE\", \"/orders/9\"},\n\t\t{\"GET\", \"/orders/9\"},\n\t\t{\"GET\", \"/bill\"},\n\t}\n\tfor _, t := range tries {\n\t\trec := httptest.NewRecorder()\n\t\tmux.ServeHTTP(rec, httptest.NewRequest(t[0], t[1], nil))\n\t\tfmt.Println(t[0], t[1], rec.Code)\n\t}\n}\n",
   "stdout": "GET /menu 200\nPOST /menu 405\nPOST /orders 200\nDELETE /orders/9 200\nGET /orders/9 405\nGET /bill 404\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_routes.go",
     "out": "GET /menu 200\nPOST /menu 405\nPOST /orders 200\nDELETE /orders/9 200\nGET /orders/9 405\nGET /bill 404\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "trace_tree.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\nfunc state(ctx context.Context) string {\n\tif ctx.Err() != nil {\n\t\treturn \"stopped\"\n\t}\n\treturn \"live\"\n}\n\nfunc main() {\n\thq, stopHQ := context.WithCancel(context.Background())\n\tdefer stopHQ()\n\tkitchen, stopKitchen := context.WithCancel(hq)\n\toven, stopOven := context.WithCancel(kitchen)\n\tdefer stopOven()\n\tbar, stopBar := context.WithCancel(hq)\n\tdefer stopBar()\n\n\tstopKitchen()\n\n\tfmt.Println(\"hq\", state(hq))\n\tfmt.Println(\"kitchen\", state(kitchen))\n\tfmt.Println(\"oven\", state(oven))\n\tfmt.Println(\"bar\", state(bar))\n}\n",
   "stdout": "hq live\nkitchen stopped\noven stopped\nbar live\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run trace_tree.go",
     "out": "hq live\nkitchen stopped\noven stopped\nbar live\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "tree.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\thq, stopHQ := context.WithCancel(context.Background())\n\tkitchen, stopKitchen := context.WithCancel(hq)\n\tdefer stopKitchen()\n\toven, stopOven := context.WithTimeout(kitchen, time.Hour)\n\tdefer stopOven()\n\n\tstopHQ()\n\tfmt.Println(\"hq:\", hq.Err())\n\tfmt.Println(\"kitchen:\", kitchen.Err())\n\tfmt.Println(\"oven:\", oven.Err())\n}\n",
   "stdout": "hq: context canceled\nkitchen: context canceled\noven: context canceled\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run tree.go",
     "out": "hq: context canceled\nkitchen: context canceled\noven: context canceled\n",
     "err": "",
     "exit": 0
    }
   ]
  },
  "values.go": {
   "src": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n)\n\ntype ticketKey struct{}\n\nfunc cook(ctx context.Context, dish string) {\n\tticket, ok := ctx.Value(ticketKey{}).(string)\n\tif !ok {\n\t\tticket = \"no ticket\"\n\t}\n\tfmt.Println(ticket, \"->\", dish)\n}\n\nfunc main() {\n\tctx := context.WithValue(context.Background(), ticketKey{}, \"T-42\")\n\tcook(ctx, \"soup\")\n\tcook(context.Background(), \"pie\")\n}\n",
   "stdout": "T-42 -> soup\nno ticket -> pie\n",
   "stderr": "",
   "exit": 0,
   "steps": [
    {
     "cmd": "go run values.go",
     "out": "T-42 -> soup\nno ticket -> pie\n",
     "err": "",
     "exit": 0
    }
   ]
  }
 }
};
})(typeof globalThis !== "undefined" ? globalThis : this);
