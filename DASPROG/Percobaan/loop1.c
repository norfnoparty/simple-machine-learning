#include <stdio.h>

int main() {
// n is number of rows
    int n = 5;
// Loop for each row
        for(int i = 1; i <= n; i++) {
// Print stars in a row
            for(int j = 1; j <= i; j++) {
            printf("*");
            }
// Move to next row
        printf("\n");
        }
    return 0;
}