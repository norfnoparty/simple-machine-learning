#include <stdio.h>

int main(){
    int total_belanja, diskon;

    printf("Masukkan total belanja anda: ");
    scanf("%d", &total_belanja);

    if (total_belanja >= 500000){
        diskon = total_belanja * 0.1;
        total_belanja -= diskon ;
        printf("Selamat!! anda mendapatkan diskon 10 persen, total belanja anda menjadi %d", total_belanja);

    } else if (total_belanja >= 250000 && total_belanja <500000){
        diskon = total_belanja * 0.05;
        total_belanja -= diskon ;
        printf("Selamat!! anda mendapatkan diskon 5 persen, total belanja anda menjadi %d", total_belanja);

    } else if (total_belanja < 250000){
        printf("Total belanja anda adalah %d", total_belanja);
    } 
    return 0;
}