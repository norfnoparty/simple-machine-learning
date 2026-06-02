#include <stdio.h>
#include <time.h>
#include <string.h>

// Fungsi untuk memeriksa apakah hari itu weekend
void check_weekend(const struct tm *t) {
    // tm_wday: 0 = Minggu, 6 = Sabtu
    if (t->tm_wday == 0 || t->tm_wday == 6) {
        printf("Hari ini adalah hari weekend (Sabtu/Minggu).\n");
    } else {
        printf("Hari ini adalah hari kerja.\n");
    }
}
// ... (Fungsi check_weekend tetap sama) ...
int main() {
    char input_date[20];
    struct tm tanggal = {0}; // Inisialisasi ke nol
    int tahun, bulan, hari;
    
    printf("Masukkan tanggal (format  DD-MM-YYYY): ");
    if (fgets(input_date, sizeof(input_date), stdin) == NULL) {
        printf("Gagal membaca input.\n");
        return 1;
    }
    
    // 1. Mengubah String Tanggal ke komponen numerik menggunakan sscanf()
    // %4d, %2d, %2d memastikan format dan batasan digit
    if (sscanf(input_date, "%2d-%2d-%4d", &hari, &bulan, &tahun) != 3) {
        printf("Format tanggal tidak valid (harus DD-MM-YYYY).\n");
        return 1;
    }
    
    // 2. Mengisi struct tm
    // tm_year: tahun - 1900
    // tm_mon: bulan - 1 (0=Januari, 11=Desember)
    // tm_mday: hari (1-31)
    tanggal.tm_year = tahun - 1900;
    tanggal.tm_mon = bulan - 1;
    tanggal.tm_mday = hari;

    // 3. Mengkonversi struct tm ke time_t untuk mengisi tm_wday
    time_t t = mktime(&tanggal);

    if (t == (time_t)-1) {
        printf("Gagal mengkonversi tanggal.\n");
        return 1;
    }

    // 4. Mengecek Hari Weekend
    // (Panggil fungsi check_weekend di sini)
    check_weekend(&tanggal);
    return 0;
}