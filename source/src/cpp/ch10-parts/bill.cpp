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
    std::cout << "Bill: " << bill << '\n';
}
