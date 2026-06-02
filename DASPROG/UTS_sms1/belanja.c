#include <stdio.h>

int main(){
    int jumlahBarang, tBelanja, bayar, kembalian;
    int barang = 10000;

    printf("Jumlah barang: ");
    scanf("%d", &jumlahBarang);
    printf("Bayar: ");
    scanf("%d", &bayar);

    tBelanja = barang * jumlahBarang;
    kembalian = bayar - tBelanja;

    printf("Total: %d\n", tBelanja);
    printf("Kembalian: %d", kembalian);

    return 0;
    

}