#include <iostream>
#include <vector>

int main() {
    std::vector<int> tips{4, 6, 9, 5};
    int total = 0;
    for (int i = 0; i < 4; ++i) {
        total += tips[i];
    }
    std::cout << "Total tips: " << total << '\n';
}
