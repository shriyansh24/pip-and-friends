#include <iostream>
int add(int a, int b) {
    int s = a + b;
    return s;
}
int main() {
    int total = add(2, 3);
    std::cout << total << '\n';
}
