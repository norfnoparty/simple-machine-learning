#include <stdio.h>

int main(){
    int week, rkwd = 95000, rkwe = 125000, rawd = 150000, rawe = 175000, 
    pkwd = 150000, pawd = 200000, pkwe = 175000, pawe = 225000, hari, tiket, umur;

    printf("=== JAKARTA AQUARIUM ===\n");
    printf("-WEEKDAYS-\n");
    printf("1. Regular Kids : IDR 95.000\n");
    printf("2. Regular Adult: IDR 150.000\n");
    printf("3. Premium Kids : IDR 150.000\n");
    printf("4. Premium Adult: IDR 200.000\n\n");
    printf("-WEEKEND-\n");
    printf("1. Regular Kids : IDR 125.000\n");
    printf("2. Regular Adult: IDR 175.000\n");
    printf("3. Premium Kids : IDR 175.000\n");
    printf("4. Premium Adult: IDR 225.000\n\n");

    printf("Silahkan pilih tanggal\n");
    printf("1. Weekday\n");
    printf("2. Weekend\n");
    printf("Pilih hari (1/2): ");
    scanf("%d", &hari);

    printf("\nSilahkan pilih tiket\n");
    printf("1. Regular\n");
    printf("2. Premium\n");
    printf("Pilih tiket (1/2): ");
    scanf("%d", &tiket);

    printf("\nAnak-anak atau dewasa\n");
    printf("1. Anak-anak\n");
    printf("2. Dewasa\n");
    printf("Pilih tiket (1/2): ");
    scanf("%d", &umur);
    
    if (hari == 1){
        if (tiket == 1){
            if (umur == 1){
                printf("Anda harus membayar: %d", rkwd);
            } else if (umur == 2){
                printf("Anda harus membayar: %d", rawd);
            }
            
        } else if (tiket == 2){
            if (umur == 1){
                printf("Anda harus membayar: %d", pkwd);
            } else if (umur == 2){
                printf("Anda harus membayar: %d", pawd);
            }
        } else {
            printf("Pilihan hanya 1 atau 2");
        }
    } else if (hari == 2){
        if (tiket == 1){
            if (umur == 1){
                printf("Anda harus membayar: %d", rkwe);
            } else if (umur == 2){
                printf("Anda harus membayar: %d", rawe);
            } 
        } else if (tiket == 2){
            if (umur == 1){
                printf("Anda harus membayar: %d", pkwe);
            } else if (umur == 2){
                printf("Anda harus membayar: %d", pawe);
            } 
        } else {
            printf("Pilihan hanya 1 atau 2");
        }
    } else {
        printf("Pilihan hanya 1 atau 2");
    }
    return 0;
}