#include <cstdlib>
#include <iostream>

void check_plates(int plates) {
    if (plates < 0) {
        std::cerr << "Impossible: " << plates << " plates!\n";
        std::abort();
    }
}

int serve(int plates, int tables) {
    int left = plates - tables * 2;
    check_plates(left);
    return left;
}

int main() {
    std::cout << "Left: " << serve(10, 3) << '\n';
    std::cout << "Left: " << serve(4, 3) << '\n';
}
