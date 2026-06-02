#include <stdio.h>

int main(){
    int nilai, usia;

    printf("Masukkan usia: ");
    scanf("%d", &usia);
    printf("Masukkan nilai: ");
    scanf("%d", &nilai);

    if (usia >= 18 && nilai >= 80){
        printf("Lulus seleksi");
    } else if (usia >= 18 && nilai < 80) {
        printf("Gagal karena nilai kurang");
    } else {
        printf("Belum memenuhi usia minimal");
    }

    return 0;
}