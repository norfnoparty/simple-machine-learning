#include <stdio.h>
#include <time.h> // Pustaka untuk waktu dan tanggal

int main() {
    time_t current_time; // Deklarasi variabel untuk waktu numerik

    // Mendapatkan waktu saat ini dalam detik sejak Epoch
    current_time = time(NULL);

    // time(NULL) akan mengembalikan waktu saat ini.
    printf("Waktu saat ini (detik sejak Epoch): %ld\n", current_time);

    // Lanjut ke langkah 2
    return 0;
}