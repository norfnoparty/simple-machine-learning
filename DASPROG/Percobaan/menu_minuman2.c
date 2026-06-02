#include <stdio.h>

int main (){

    int pilihan;

    printf("Menu Minuman\n");
    printf("1. Teh\n");
    printf("2. Kopi\n");
    printf("3. Susu\n");
    printf("Masukkan pilihan (1-3): ");
    scanf("%d", &pilihan);

    switch (pilihan)
    {
    case 1:
        printf("Anda memilih Teh.");
        break;
    case 2: 
        printf("Anda memilih Kopi.");
        break;
    case 3: 
        printf("Anda memilih Susu.");
        break;
    default:
        printf("Pilihan tidak valid.");
        break;
    }

    return 0;

}