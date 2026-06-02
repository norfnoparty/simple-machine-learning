#include <stdio.h>

int main(){
    int pilihan;

    do {
        printf("1. Say hello\n");
        printf("2. Say goodbye\n");
        printf("3. Keluar\n");
        printf("Pilih menu: ");
        scanf("%d", &pilihan);

        switch (pilihan)
        {
        case 1: 
            printf("Helloo\n\n");
            break;
        case 2: 
            printf("Gutbay\n\n");
            break;
        case 3: 
            printf("Keluar dari program\n\n");
            break;
        default:
            printf("Pilihan tidak valid\n\n");
            break;
        }

    } while (pilihan != 3);
    
    return 0;

}