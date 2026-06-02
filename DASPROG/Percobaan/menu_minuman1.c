#include <stdio.h>

int main(){

    int pilihan;

    printf("Menu Minuman\n");
    printf("1. Teh\n");
    printf("2. Kopi\n");
    printf("3. Susu\n");
    printf("Masukkan pilihan (1-3): ");
    scanf("%d", &pilihan);

    if (pilihan == 1){
        printf("Anda memilih Teh.\n");
    } else if (pilihan == 2){
        printf("Anda memilih Kopi.\n");
    } else if (pilihan == 3){
        printf("Anda memilih Susu.\n");
    } else {
        printf("Pilihan tidak valid\n");
    }

    return 0;
} 