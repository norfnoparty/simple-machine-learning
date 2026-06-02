#include <stdio.h>

int main() {
    int a, b;
    int penjumlahan, pengurangan, perkalian;
    float pembagian;

    // Input dua angka dari pengguna
    printf("Masukkan angka pertama: ");
    scanf("%d", &a);
    printf("Masukkan angka kedua: ");
    scanf("%d",  &b);

    // Operasi perhitungan
    penjumlahan = a + b;
    pengurangan = a - b;
    perkalian = a * b;
    pembagian = (float)a / b;

    // Output hasil operasi
    printf("Hasil penjumlahan: %d\n", penjumlahan);
    printf("Hasil pengurangan: %d\n", pengurangan);
    printf("Hasil perkalian: %d\n", perkalian);
    printf("Hasil pembagian: %.2f\n", pembagian);

    return 0;
}