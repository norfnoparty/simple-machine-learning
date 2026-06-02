#include <stdio.h>

int main() {
    int n, i, j;

    // Meminta input dari pengguna untuk menentukan ukuran
    printf("Masukkan jumlah baris (setengah belah ketupat, biasanya angka ganjil): ");
    scanf("%d", &n);

    // Pastikan input adalah angka positif
    if (n <= 0) {
        printf("Ukuran harus angka positif.\n");
        return 1;
    }

    // --- Bagian Atas Belah Ketupat (Termasuk Baris Tengah) ---

    // Loop luar untuk baris (i berjalan dari 1 hingga n)
    for (i = 1; i <= n; i++) {
        // Loop 1: Mencetak spasi di awal baris
        // Jumlah spasi berkurang seiring bertambahnya i
        for (j = 1; j <= n - i; j++) {
            printf(" ");
        }

        // Loop 2: Mencetak karakter *
        // Jumlah * bertambah (2*i - 1)
        for (j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }

        // Pindah ke baris baru
        printf("\n");
    }

    // --- Bagian Bawah Belah Ketupat (Tidak Termasuk Baris Tengah) ---

    // Loop luar untuk baris (i berjalan dari n-1 hingga 1)
    for (i = n - 1; i >= 1; i--) {
        // Loop 1: Mencetak spasi di awal baris
        // Jumlah spasi bertambah (n - i)
        for (j = 1; j <= n - i; j++) {
            printf(" ");
        }

        // Loop 2: Mencetak karakter *
        // Jumlah * berkurang (2*i - 1)
        for (j = 1; j <= 2 * i - 1; j++) {
            printf("*");
        }

        // Pindah ke baris baru
        printf("\n");
    }

    return 0;
}