#include <stdio.h>

int main(){

    char nama_nasabah [30];
    float saldo_awal, setoran_bulanan, saldo_akhir;
    int jumlah_bulan;

    printf("Nama Nasabah: ");
    fgets(nama_nasabah, sizeof(nama_nasabah), stdin);

    printf("Saldo Awal: ");
    scanf("%f", &saldo_awal);

    printf("Setoran Bulanan: ");
    scanf("%f", &setoran_bulanan);

    saldo_akhir =  (saldo_awal + setoran_bulanan);

    printf("Saldo akhir: %.2f", saldo_akhir);

    return 0;


}