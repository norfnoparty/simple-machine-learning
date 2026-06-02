#include <stdio.h>

int main (){
    int jam, menit, totalMenit;

    printf("Masukkan jam: ");
    scanf("%d", &jam);
    printf("Masukkan menit: ");
    scanf("%d", &menit);

    totalMenit = (jam * 60) + menit;

    printf("Hasilnya adalah %d menit", totalMenit);

    return 0;

}