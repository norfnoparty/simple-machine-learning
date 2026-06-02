#include <stdio.h>    // Untuk input/output (printf, scanf)
#include <stdlib.h>   // Untuk exit (jika diperlukan)
#include <string.h>   // Untuk manipulasi string (misalnya strcpy)
#include <time.h>     // Untuk penanganan tanggal dan waktu
#include <stdbool.h>  // Untuk tipe data boolean

// Maksimum karakter untuk string (judul, nama, dll.)
#define MAX_JUDUL 50
#define MAX_PENULIS 50
#define MAX_NAMA 50

// Maksimum entri dalam array
#define MAX_ENTRI 100

// --- Struktur Data ---

// Struktur untuk merepresentasikan sebuah Buku
typedef struct {
    char judul[MAX_JUDUL];
    char penulis[MAX_PENULIS];
    int tahunTerbit;
} Buku;

// Struktur untuk merepresentasikan Peminjaman
typedef struct {
    char namaPengunjung[MAX_NAMA];
    char judulBuku[MAX_JUDUL];
    time_t tanggalPinjam;   // time_t untuk menyimpan tanggal
    time_t tanggalKembali;
} Peminjaman;

// --- Variabel Global ---
Buku daftarBuku[MAX_ENTRI];
Peminjaman daftarPeminjaman[MAX_ENTRI];
int jumlahBuku = 0;
int jumlahPeminjaman = 0;

// --- Prototype Fungsi ---
void tampilkanMenu();
void tambahBuku();
void tampilkanBuku();
void tambahPeminjaman();
void tampilkanRiwayat();
time_t parseTanggal(const char *tanggalStr);
void formatTanggal(time_t tanggal, char *outputStr);

// --- Fungsi Utama ---
int main() {
    int pilihan;

    do {
        tampilkanMenu();
        printf("Pilihan Anda: ");
        // Menggunakan scanf untuk input integer
        if (scanf("%d", &pilihan) != 1) {
            // Penanganan error jika input bukan integer
            while (getchar() != '\n'); // Membersihkan buffer
            pilihan = 0; // Atur pilihan tidak valid
        } else {
            while (getchar() != '\n'); // Membersihkan buffer setelah scanf
        }

        switch (pilihan) {
            case 1:
                tambahBuku();
                break;
            case 2:
                tampilkanBuku();
                break;
            case 3:
                tambahPeminjaman();
                break;
            case 4:
                tampilkanRiwayat();
                break;
            case 5:
                printf("Terima kasih!\n");
                break;
            default:
                printf("Pilihan tidak valid.\n");
        }

        printf("\n");
    } while (pilihan != 5);

    return 0;
}

// --- Implementasi Fungsi ---

// Menampilkan menu program
void tampilkanMenu() {
    printf("=== Sistem Perpustakaan ===\n");
    printf("1. Tambah Buku\n");
    printf("2. Tampilkan Daftar Buku\n");
    printf("3. Tambah Peminjaman\n");
    printf("4. Tampilkan Riwayat Peminjaman\n");
    printf("5. Keluar\n");
}

// Menambahkan buku baru
void tambahBuku() {
    if (jumlahBuku >= MAX_ENTRI) {
        printf("Kapasitas daftar buku penuh.\n");
        return;
    }

    Buku *buku = &daftarBuku[jumlahBuku]; // Pointer ke lokasi baru

    printf("Judul Buku: ");
    // Menggunakan fgets untuk membaca string dengan spasi
    if (fgets(buku->judul, MAX_JUDUL, stdin)) {
        buku->judul[strcspn(buku->judul, "\n")] = 0; // Hapus newline
    }

    printf("Penulis: ");
    if (fgets(buku->penulis, MAX_PENULIS, stdin)) {
        buku->penulis[strcspn(buku->penulis, "\n")] = 0; // Hapus newline
    }

    printf("Tahun Terbit: ");
    if (scanf("%d", &buku->tahunTerbit) != 1) {
        printf("Input tahun terbit tidak valid.\n");
        while (getchar() != '\n');
        return;
    }
    while (getchar() != '\n'); // Membersihkan buffer

    jumlahBuku++;
    printf("Buku berhasil ditambahkan.\n");
}

// Menampilkan daftar semua buku
void tampilkanBuku() {
    printf("=== Daftar Buku ===\n");
    if (jumlahBuku == 0) {
        printf("Belum ada buku dalam daftar.\n");
        return;
    }

    for (int i = 0; i < jumlahBuku; i++) {
        printf("%d. %s - %s (%d)\n", (i + 1),
               daftarBuku[i].judul,
               daftarBuku[i].penulis,
               daftarBuku[i].tahunTerbit);
    }
}

// Menambahkan catatan peminjaman baru
void tambahPeminjaman() {
    if (jumlahPeminjaman >= MAX_ENTRI) {
        printf("Kapasitas riwayat peminjaman penuh.\n");
        return;
    }

    Peminjaman *pinjam = &daftarPeminjaman[jumlahPeminjaman];
    char tempTanggal[11]; // Format dd-MM-yyyy + \0

    printf("Nama Pengunjung: ");
    if (fgets(pinjam->namaPengunjung, MAX_NAMA, stdin)) {
        pinjam->namaPengunjung[strcspn(pinjam->namaPengunjung, "\n")] = 0;
    }

    printf("Judul Buku yang Dipinjam: ");
    if (fgets(pinjam->judulBuku, MAX_JUDUL, stdin)) {
        pinjam->judulBuku[strcspn(pinjam->judulBuku, "\n")] = 0;
    }

    printf("Tanggal Pinjam (dd-MM-yyyy): ");
    if (fgets(tempTanggal, sizeof(tempTanggal), stdin)) {
        tempTanggal[strcspn(tempTanggal, "\n")] = 0;
        pinjam->tanggalPinjam = parseTanggal(tempTanggal);
    }

    if (pinjam->tanggalPinjam == (time_t)-1) {
        printf("Format tanggal pinjam salah atau tidak valid.\n");
        return;
    }

    printf("Tanggal Kembali (dd-MM-yyyy): ");
    if (fgets(tempTanggal, sizeof(tempTanggal), stdin)) {
        tempTanggal[strcspn(tempTanggal, "\n")] = 0;
        pinjam->tanggalKembali = parseTanggal(tempTanggal);
    }

    if (pinjam->tanggalKembali == (time_t)-1) {
        printf("Format tanggal kembali salah atau tidak valid.\n");
        return;
    }

    jumlahPeminjaman++;
    printf("Peminjaman berhasil dicatat.\n");
}

// Menampilkan riwayat peminjaman
void tampilkanRiwayat() {
    printf("=== Riwayat Peminjaman ===\n");
    if (jumlahPeminjaman == 0) {
        printf("Belum ada riwayat peminjaman.\n");
        return;
    }

    char tglPinjamStr[11];
    char tglKembaliStr[11];

    for (int i = 0; i < jumlahPeminjaman; i++) {
        formatTanggal(daftarPeminjaman[i].tanggalPinjam, tglPinjamStr);
        formatTanggal(daftarPeminjaman[i].tanggalKembali, tglKembaliStr);

        printf("- %s meminjam '%s' pada %s dan mengembalikan pada %s\n",
               daftarPeminjaman[i].namaPengunjung,
               daftarPeminjaman[i].judulBuku,
               tglPinjamStr,
               tglKembaliStr);
    }
}

// Mengkonversi string tanggal "dd-MM-yyyy" menjadi time_t
time_t parseTanggal(const char *tanggalStr) {
    struct tm tm = {0};
    int hari, bulan, tahun;

    // Membaca dd-MM-yyyy
    if (sscanf(tanggalStr, "%d-%d-%d", &hari, &bulan, &tahun) != 3) {
        return (time_t)-1; // Indikasi error
    }

    // Mengisi struct tm (bulan diisi 0-11, tahun diisi tahun-1900)
    tm.tm_mday = hari;
    tm.tm_mon = bulan - 1;
    tm.tm_year = tahun - 1900;
    tm.tm_isdst = -1; // Biarkan mktime menentukan DST

    // Menggunakan mktime untuk mengkonversi struct tm ke time_t
    return mktime(&tm);
}

// Mengkonversi time_t menjadi string tanggal "dd-MM-yyyy"
void formatTanggal(time_t tanggal, char *outputStr) {
    if (tanggal == (time_t)-1) {
        strcpy(outputStr, "N/A");
        return;
    }
    // Mendapatkan struct tm dari time_t
    struct tm *local_time = localtime(&tanggal);
    if (local_time == NULL) {
        strcpy(outputStr, "N/A");
        return;
    }

    // Menggunakan strftime untuk memformat tanggal menjadi "dd-MM-yyyy"
    strftime(outputStr, 11, "%d-%m-%Y", local_time);
}