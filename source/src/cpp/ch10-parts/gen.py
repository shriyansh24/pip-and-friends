#!/usr/bin/env python3
"""Writes every program, project folder and sidecar for C++ chapter 10 into /home/you/cpp-ch10."""
import json
from pathlib import Path

D = Path("/home/you/cpp-ch10")
D.mkdir(exist_ok=True)
FLAGS = "-std=c++23 -Wall -Wextra -g"


def w(rel, text):
    p = D / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text.lstrip("\n"))


def cmd(name, steps, show=None, session=False):
    spec = {"steps": steps}
    if show:
        spec["show"] = show
    if session:
        spec["session"] = True
    (D / (name + ".cmd")).write_text(json.dumps(spec, indent=1) + "\n")


def proj_steps(folder, driver, target, cmds):
    """cmds: list of (display, real-without-cd). The first command also copies the driver file into place."""
    out = []
    for i, (disp, real) in enumerate(cmds):
        pre = f"cd {folder} && " + (f"cp ../{driver[0]} {driver[1]} && rm -f *.o {target} && " if i == 0 else "")
        out.append([disp, pre + real, f"~/cpp-ch10/{folder}"])
    return out


ORDER_GUARD_EARLY = """
#pragma once
// order.h: what one table ordered
struct Order {
    int soups;
    int pies;
};
"""
# ---------------------------------------------------------------- the diner: menu, kitchen, dining room
MENU_H = """
// menu.h: the menu. It promises dishes. It cooks nothing.
int price_of(int item);              // item 1 is soup, item 2 is pie
int bill_for(int soups, int pies);
"""
KITCHEN = """
// kitchen.cpp: the kitchen cooks every dish the menu promises.
#include "menu.h"

int price_of(int item) {
    if (item == 1) return 4;         // soup
    if (item == 2) return 3;         // pie
    return 0;                        // not on the menu
}

int bill_for(int soups, int pies) {
    return soups * price_of(1) + pies * price_of(2);
}
"""
MAIN = """
// main.cpp: the dining room. It orders from the menu.
#include <iostream>
#include "menu.h"

int main() {
    std::cout << "Item 1 costs $" << price_of(1) << '\\n';
    std::cout << "Table 4 owes $" << bill_for(2, 3) << '\\n';
}
"""
for folder in ("diner", "forgot", "angle", "quiz"):
    w(f"{folder}/menu.h", MENU_H)
    w(f"{folder}/kitchen.cpp", KITCHEN)

w("diner_one.cpp", """
#include <iostream>

int price_of(int item) {
    if (item == 1) return 4;         // soup
    if (item == 2) return 3;         // pie
    return 0;                        // not on the menu
}

int bill_for(int soups, int pies) {
    return soups * price_of(1) + pies * price_of(2);
}

int main() {
    std::cout << "Item 1 costs $" << price_of(1) << '\\n';
    std::cout << "Table 4 owes $" << bill_for(2, 3) << '\\n';
}
""")

w("diner.cpp", MAIN)
cmd("diner", proj_steps("diner", ("diner.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} main.cpp kitchen.cpp -o diner", f"g++ {FLAGS} main.cpp kitchen.cpp -o diner"),
    ("./diner", "./diner")]), show=["diner/menu.h", "diner/kitchen.cpp"])

# the same three files, built in two steps, in one shell
w("diner_steps.cpp", MAIN)
cmd("diner_steps", [
    ["ls", "cd diner && cp ../diner_steps.cpp main.cpp && rm -f *.o diner && ls -C", "~/cpp-ch10/diner"],
    [f"g++ {FLAGS} -c main.cpp", f"g++ {FLAGS} -c main.cpp", "~/cpp-ch10/diner"],
    [f"g++ {FLAGS} -c kitchen.cpp", f"g++ {FLAGS} -c kitchen.cpp", "~/cpp-ch10/diner"],
    ["ls", "ls -C", "~/cpp-ch10/diner"],
    ["g++ main.o kitchen.o -o diner", "g++ main.o kitchen.o -o diner", "~/cpp-ch10/diner"],
    ["./diner", "./diner", "~/cpp-ch10/diner"]], session=True)

# fill the include line (same dining room)
w("include_fill.cpp", MAIN)
cmd("include_fill", proj_steps("diner", ("include_fill.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} main.cpp kitchen.cpp -o diner", f"g++ {FLAGS} main.cpp kitchen.cpp -o diner"),
    ("./diner", "./diner")]))

# predict: another dining room against the same kitchen
w("predict_split.cpp", """
// main.cpp: a different table orders from the same menu.
#include <iostream>
#include "menu.h"

int main() {
    std::cout << bill_for(1, 2) << '\\n';
    std::cout << price_of(3) << '\\n';
    std::cout << bill_for(0, 0) + price_of(2) << '\\n';
}
""")
cmd("predict_split", proj_steps("quiz", ("predict_split.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} main.cpp kitchen.cpp -o diner", f"g++ {FLAGS} main.cpp kitchen.cpp -o diner"),
    ("./diner", "./diner")]))

# angle brackets: <menu.h> is looked for only in the system folders
w("angle.cpp", MAIN.replace('#include "menu.h"', "#include <menu.h>"))
cmd("angle", proj_steps("angle", ("angle.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} main.cpp kitchen.cpp -o diner", f"g++ {FLAGS} main.cpp kitchen.cpp -o diner")]))

for f in ("table.h", "table.cpp"):
    pass
w("angle2/order.h", ORDER_GUARD_EARLY)
w("angle2/main.cpp", """
// main.cpp
#include <iostream>
#include <order.h>

int main() {
    Order t4{2, 3};
    std::cout << t4.soups << " soups\\n";
}
""")
w("angle_missing.cpp", (D / "angle2/main.cpp").read_text())
cmd("angle_missing", proj_steps("angle2", ("angle_missing.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} main.cpp -o diner", f"g++ {FLAGS} main.cpp -o diner")]), show=["angle2/order.h"])

# #include is copy and paste: show the preprocessor's output
w("paste/shout.h", """
// shout.h: one promise
void shout(int times);
""")
w("paste.cpp", """
#include "shout.h"

int main() {
    shout(3);
}
""")
cmd("paste", proj_steps("paste", ("paste.cpp", "main.cpp"), "main", [("g++ -E -P main.cpp", "g++ -E -P main.cpp")]),
    show=["paste/shout.h"])

w("paste2/sizes.h", """
// sizes.h
int small();
int large();
""")
w("paste2/drinks.h", """
// drinks.h
#include "sizes.h"
int lemonade(int size);
""")
w("paste_quiz.cpp", """
#include "drinks.h"
int main() {
    return lemonade(large());
}
""")
cmd("paste_quiz", proj_steps("paste2", ("paste_quiz.cpp", "main.cpp"), "main", [("g++ -E -P main.cpp", "g++ -E -P main.cpp")]),
    show=["paste2/sizes.h", "paste2/drinks.h"])

# ---------------------------------------------------------------- the waiter (linker) complains
w("forgot.cpp", MAIN)
cmd("forgot", proj_steps("forgot", ("forgot.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} -c main.cpp", f"g++ {FLAGS} -c main.cpp"),
    ("g++ main.o -o diner", "g++ main.o -o diner")]))
w("forgot_clang.cpp", MAIN)
cmd("forgot_clang", proj_steps("forgot", ("forgot_clang.cpp", "main.cpp"), "diner", [
    (f"clang++ {FLAGS} -c main.cpp", f"clang++ {FLAGS} -c main.cpp"),
    ("clang++ main.o -o diner", "clang++ main.o -o diner")]))

# a definition with a different shape from its promise
TIP_H = """
// tips.h
int tip_for(int food);
"""
TIP_MAIN = """
// main.cpp
#include <iostream>
#include "tips.h"

int main() {
    std::cout << "Tip: $" << tip_for(20) << '\\n';
}
"""
w("tip/tips.h", TIP_H)
w("tip/main.cpp", TIP_MAIN)
w("tip.cpp", """
// kitchen.cpp
#include "tips.h"

int tip_for(double food) {
    return food / 5;
}
""")
cmd("tip", proj_steps("tip", ("tip.cpp", "kitchen.cpp"), "bill", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp"),
    ("g++ main.o kitchen.o -o bill", "g++ main.o kitchen.o -o bill")]), show=["tip/tips.h", "tip/main.cpp"])

# spot: bill_for promised with two slots, cooked with one
w("spotk/menu.h", MENU_H)
w("spotk/main.cpp", MAIN)
w("spot_kitchen.cpp", """
// kitchen.cpp
#include "menu.h"

int price_of(int item) {
    if (item == 1) return 4;
    if (item == 2) return 3;
    return 0;
}

int bill_for(int soups) {
    int pies = 3;
    return soups * price_of(1) + pies * price_of(2);
}
""")
cmd("spot_kitchen", proj_steps("spotk", ("spot_kitchen.cpp", "kitchen.cpp"), "diner", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp"),
    ("g++ main.o kitchen.o -o diner", "g++ main.o kitchen.o -o diner")]))

# ---------------------------------------------------------------- guards
ORDER_BARE = """
// order.h: what one table ordered
struct Order {
    int soups;
    int pies;
};
"""
ORDER_GUARD = """
#ifndef ORDER_H
#define ORDER_H
// order.h: what one table ordered
struct Order {
    int soups;
    int pies;
};
#endif
"""
ORDER_PRAGMA = """
#pragma once
// order.h: what one table ordered
struct Order {
    int soups;
    int pies;
};
"""
w("guards/table.h", """
// table.h: what a table can do with its order
#include "order.h"

int order_total(const Order& o);
""")
w("guards/table.cpp", """
// table.cpp
#include "table.h"

int order_total(const Order& o) {
    return o.soups * 4 + o.pies * 3;
}
""")
w("guards/main.cpp", """
// main.cpp
#include <iostream>
#include "order.h"
#include "table.h"

int main() {
    Order t4{2, 3};
    std::cout << t4.soups << " soups, " << t4.pies << " pies\\n";
    std::cout << "Table 4 owes $" << order_total(t4) << '\\n';
}
""")
GSTEPS = [(f"g++ {FLAGS} main.cpp table.cpp -o diner", f"g++ {FLAGS} main.cpp table.cpp -o diner"), ("./diner", "./diner")]
w("guards_bad.cpp", ORDER_BARE)
cmd("guards_bad", proj_steps("guards", ("guards_bad.cpp", "order.h"), "diner", GSTEPS[:1]),
    show=["guards/table.h", "guards/table.cpp", "guards/main.cpp"])
w("guards_fixed.cpp", ORDER_GUARD)
cmd("guards_fixed", proj_steps("guards", ("guards_fixed.cpp", "order.h"), "diner", GSTEPS))
w("guards_pragma.cpp", ORDER_PRAGMA)
cmd("guards_pragma", proj_steps("guards", ("guards_pragma.cpp", "order.h"), "diner", GSTEPS))
w("guard_parsons.cpp", ORDER_GUARD.replace("// order.h: what one table ordered\n", ""))
cmd("guard_parsons", proj_steps("guards", ("guard_parsons.cpp", "order.h"), "diner", GSTEPS))

# ---------------------------------------------------------------- one definition rule
SPECIAL_MAIN = """
// main.cpp
#include <iostream>
#include "specials.h"
#include "menu.h"

int main() {
    std::cout << "Special: item " << todays_special() << '\\n';
    std::cout << "It costs $" << special_price() << '\\n';
}
"""
SPECIAL_MENU = """
// menu.h
int special_price();
"""
SPECIAL_KITCHEN = """
// kitchen.cpp
#include "specials.h"
#include "menu.h"

int special_price() {
    return todays_special() * 2;
}
"""
for folder in ("twice", "twice_ok", "boss_odr"):
    w(f"{folder}/main.cpp", SPECIAL_MAIN)
    w(f"{folder}/menu.h", SPECIAL_MENU)
    w(f"{folder}/kitchen.cpp", SPECIAL_KITCHEN)
TSTEPS = [(f"g++ {FLAGS} -c main.cpp kitchen.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp"),
          ("g++ main.o kitchen.o -o diner", "g++ main.o kitchen.o -o diner"), ("./diner", "./diner")]
w("twice.cpp", """
// specials.h
#pragma once

int todays_special() {       // a whole recipe, in the menu!
    return 2;
}
""")
cmd("twice", proj_steps("twice", ("twice.cpp", "specials.h"), "diner", TSTEPS[:2]),
    show=["twice/main.cpp", "twice/kitchen.cpp", "twice/menu.h"])
w("twice_ok/specials.cpp", """
// specials.cpp: the one and only recipe
#include "specials.h"

int todays_special() {
    return 2;
}
""")
w("twice_ok.cpp", """
// specials.h
#pragma once

int todays_special();        // a promise: the recipe is in specials.cpp
""")
cmd("twice_ok", proj_steps("twice_ok", ("twice_ok.cpp", "specials.h"), "diner", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp specials.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp specials.cpp"),
    ("g++ main.o kitchen.o specials.o -o diner", "g++ main.o kitchen.o specials.o -o diner"), ("./diner", "./diner")]),
    show=["twice_ok/specials.cpp"])

# ---------------------------------------------------------------- header rules
w("selfc/main.cpp", """
// main.cpp
#include "menu.h"
#include <iostream>
#include <string>

int main() {
    std::cout << dish_name(1) << '\\n';
}
""")
w("selfc.cpp", """
// menu.h
#pragma once

std::string dish_name(int item);
""")
cmd("selfc", proj_steps("selfc", ("selfc.cpp", "menu.h"), "main.o", [
    (f"g++ {FLAGS} -c main.cpp", f"g++ {FLAGS} -c main.cpp")]), show=["selfc/main.cpp"])

w("ns/tools.h", "")
w("ns.cpp", """
// tools.h: kitchen tools, shared by every file
#pragma once
#include <algorithm>
#include <vector>
using namespace std;     // pours std into every includer

int busiest(const vector<int>& orders);
""")
w("ns/main.cpp", """
// main.cpp
#include <iostream>
#include "tools.h"

int count = 3;           // dishes served today

int main() {
    std::cout << "Served: " << count << '\\n';
}
""")
cmd("ns", proj_steps("ns", ("ns.cpp", "tools.h"), "main.o", [
    (f"g++ {FLAGS} -c main.cpp", f"g++ {FLAGS} -c main.cpp")]), show=["ns/main.cpp"])

# ---------------------------------------------------------------- debugging: prints
w("tips_bug.cpp", """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> tips{4, 6, 9, 5};
    int total = 0;
    for (int i = 1; i < 4; ++i) {
        total += tips[i];
    }
    std::cout << "Total tips: " << total << '\\n';
}
""")
w("tips_debug.cpp", """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> tips{4, 6, 9, 5};
    int total = 0;
    for (int i = 1; i < 4; ++i) {
        std::cerr << "DEBUG i=" << i << " tip=" << tips[i] << '\\n';
        total += tips[i];
    }
    std::cout << "Total tips: " << total << '\\n';
}
""")
w("trace_tips.cpp", """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> tips{4, 6, 9, 5};
    int total = 0;
    for (int i = 0; i < 4; ++i) {
        total += tips[i];
        std::cout << i << ' ' << tips[i] << ' ' << total << '\\n';
    }
}
""")
w("debug_fill.cpp", """
#include <iostream>

int main() {
    int plates = 12;
    std::cerr << "DEBUG plates=" << plates << '\\n';
    plates = plates - 5;
    std::cerr << "DEBUG plates=" << plates << '\\n';
    std::cout << "Plates left: " << plates << '\\n';
}
""")
w("lost.cpp", """
#include <cstdlib>
#include <iostream>

int main() {
    std::cout << "Order 1 saved" << std::endl;  // newline + flush
    std::cout << "Saving order 2... ";  // waits in the bucket
    std::abort();                       // stop right now
}
""")
w("lost_fixed.cpp", """
#include <cstdlib>
#include <iostream>

int main() {
    std::cout << "Order 1 saved" << std::endl;
    std::cerr << "Saving order 2... ";  // no bucket
    std::abort();
}
""")
w("lost_quiz.cpp", """
#include <cstdlib>
#include <iostream>

int main() {
    std::cout << "Table 1 served" << std::endl;
    std::cout << "Table 2 ";
    std::cout << "served" << std::flush;
    std::cout << " and paid" << std::endl;
    std::cout << "Table 3 ";
    std::abort();
}
""")

# ---------------------------------------------------------------- gdb
BILL = """
#include <iostream>

int tip_for(int food) {
    int tip = food / 5;
    return tip;
}

int total_bill(int soup, int pie) {
    int food = soup + pie;
    int total = food + tip_for(food);
    return total;
}

int main() {
    int bill = total_bill(12, 8);
    std::cout << "Bill: " << bill << '\\n';
}
"""


def gdb_prog(name, script_name, script, compile_flags="-std=c++23 -Wall -Wextra -g -O0", src=BILL):
    w(name + ".cpp", src)
    w(f"gdb/{script_name}", "set trace-commands on\n" + script.strip() + "\n")
    exe = name
    cmd(name, [
        [f"g++ {compile_flags} {name}.cpp -o {exe}", f"g++ {compile_flags} {name}.cpp -o {exe}"],
        [f"gdb -q -batch -x {script_name} ./{exe}", f"cp gdb/{script_name} {script_name} && gdb -q -batch -x {script_name} ./{exe}"]],
        show=[f"gdb/{script_name}"])


gdb_prog("bill", "first.gdb", """
break total_bill
run
next
print food
next
info locals
continue
""")
gdb_prog("bill_step", "step.gdb", """
break main
run
step
next
step
next
finish
next
continue
""")
gdb_prog("bill_bt", "frames.gdb", """
break 5
run
bt
info locals
up
print food
print soup + pie
up
continue
""")
TIPS_W = """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> tips{4, 6, 9, 5};
    int total = 0;
    for (int i = 0; i < 4; ++i) {
        total += tips[i];
    }
    std::cout << "Total tips: " << total << '\\n';
}
"""
gdb_prog("tips_watch", "watch.gdb", """
break 7
run
watch total
continue
continue
info locals
delete
continue
""", src=TIPS_W)
w("nog.cpp", BILL)
NOGX = '-ex "break 9" -ex "break tip_for" -ex run -ex bt -ex "info locals" -ex "print food"'
cmd("nog", [["g++ -std=c++23 -Wall -Wextra -O0 nog.cpp -o nog", "g++ -std=c++23 -Wall -Wextra -O0 nog.cpp -o nog"],
            ["gdb -q -batch " + NOGX + " ./nog", "gdb -q -batch " + NOGX + " ./nog"]])
gdb_prog("opt", "opt.gdb", """
break total_bill
run
""", compile_flags="-std=c++23 -Wall -Wextra -g -O2")

CRASH = """
#include <cstdlib>
#include <iostream>

void check_plates(int plates) {
    if (plates < 0) {
        std::cerr << "Impossible: " << plates << " plates!\\n";
        std::abort();
    }
}

int serve(int plates, int tables) {
    int left = plates - tables * 2;
    check_plates(left);
    return left;
}

int main() {
    std::cout << "Left: " << serve(10, 3) << '\\n';
    std::cout << "Left: " << serve(4, 3) << '\\n';
}
"""
w("crash.cpp", CRASH)
gdb_prog("crash_gdb", "crash.gdb", """
run
bt
frame 6
print left
print plates
""", src=CRASH)

# spot by stepping: the biggest order
w("spot_loop.cpp", """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> orders{3, 1, 4, 1, 5};
    int biggest = 0;
    for (int i = 0; i < 5; ++i) {
        if (orders[i] > biggest) {
            biggest = i;
        }
    }
    std::cout << "Biggest order: " << biggest << '\\n';
}
""")
w("trace_biggest.cpp", """
#include <iostream>
#include <vector>

int main() {
    std::vector<int> orders{3, 1, 4, 1, 5};
    int biggest = 0;
    for (int i = 0; i < 5; ++i) {
        if (orders[i] > biggest) {
            biggest = i;
        }
        std::cout << i << ' ' << orders[i] << ' ' << biggest << '\\n';
    }
}
""")

# ---------------------------------------------------------------- boss level
w("boss_link/menu.h", """
// menu.h
int price_of(int item);
int refund(int item);
""")
w("boss_link/kitchen.cpp", """
// kitchen.cpp
#include "menu.h"

int price_of(int item) {
    return item == 1 ? 4 : 3;
}
""")
w("boss_link.cpp", """
// main.cpp
#include <iostream>
#include "menu.h"

int main() {
    std::cout << "Price: " << price_of(1) << '\\n';
    std::cout << "Refund: " << refund(1) << '\\n';
}
""")
cmd("boss_link", proj_steps("boss_link", ("boss_link.cpp", "main.cpp"), "diner", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp"),
    ("g++ main.o kitchen.o -o diner", "g++ main.o kitchen.o -o diner")]), show=["boss_link/menu.h", "boss_link/kitchen.cpp"])

w("boss_spot.cpp", """
// specials.h
#pragma once

int todays_special();

int special_price() {
    return todays_special() * 2;
}
""")
w("boss_odr/specials.cpp", """
// specials.cpp
#include "specials.h"

int todays_special() {
    return 2;
}
""")
w("boss_odr/menu.h", "// menu.h\n")
w("boss_odr/kitchen.cpp", """
// kitchen.cpp
#include "specials.h"

int dessert_price() {
    return special_price() + 1;
}
""")
w("boss_odr/main.cpp", """
// main.cpp
#include <iostream>
#include "specials.h"

int main() {
    std::cout << "It costs $" << special_price() << '\\n';
}
""")
cmd("boss_spot", proj_steps("boss_odr", ("boss_spot.cpp", "specials.h"), "diner", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp specials.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp specials.cpp"),
    ("g++ main.o kitchen.o specials.o -o diner", "g++ main.o kitchen.o specials.o -o diner")]))

w("boss_parsons.cpp", """
#include <iostream>

int main() {
    int total = 0;
    for (int table = 1; table <= 3; ++table) {
        total += table * 4;
        std::cout << "after table " << table << ": " << total << '\\n';
    }
    std::cout << "Total: " << total << '\\n';
}
""")

w("boss_fill/tips.h", TIP_H)
w("boss_fill/main.cpp", TIP_MAIN)
w("boss_fill.cpp", """
// kitchen.cpp
#include "tips.h"

int tip_for(int food) {
    return food / 5;
}
""")
cmd("boss_fill", proj_steps("boss_fill", ("boss_fill.cpp", "kitchen.cpp"), "bill", [
    (f"g++ {FLAGS} -c main.cpp kitchen.cpp", f"g++ {FLAGS} -c main.cpp kitchen.cpp"),
    ("g++ main.o kitchen.o -o bill", "g++ main.o kitchen.o -o bill"), ("./bill", "./bill")]))

w("boss_trace.cpp", """
#include <iostream>

int main() {
    int plates = 20;
    int tables = 0;
    while (plates >= 6) {
        plates -= 6;
        ++tables;
        std::cout << tables << ' ' << plates << '\\n';
    }
}
""")
print("written", sum(1 for _ in D.rglob("*") if _.is_file()), "files")
