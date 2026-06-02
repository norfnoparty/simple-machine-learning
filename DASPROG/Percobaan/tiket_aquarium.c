#include <stdio.h>

int main() {
    int hari, kelas, umur, tinggi;
    int hargaDewasa = 0;
    int hargaAnak = 0;
    int hargaFinal = 0;

    printf("=================================================\n");
    printf("        NEW PRICELIST JAKARTA AQUARIUM           \n");
    printf("=================================================\n");
    
    printf("A. WEEKDAYS (Senin - Jumat)\n");
    printf("   - Regular Kids   : IDR 95.000\n");
    printf("   - Regular Adult  : IDR 150.000\n");
    printf("   - Premium Kids   : IDR 150.000\n");
    printf("   - Premium Adult  : IDR 200.000\n");
    
    printf("\nB. WEEKEND (Sabtu - Minggu / Libur)\n");
    printf("   - Regular Kids   : IDR 135.000\n");
    printf("   - Regular Adult  : IDR 175.000\n");
    printf("   - Premium Kids   : IDR 175.000\n");
    printf("   - Premium Adult  : IDR 225.000\n");
    
    printf("\n*Info: Anak (Kids) = Tinggi di bawah 120cm\n");
    printf("*Info: Balita (Max 2 th) = GRATIS\n");
    printf("=================================================\n\n");

    printf("--- MULAI INPUT DATA PENGUNJUNG ---\n");
    
    printf("1. Pilih Hari:\n   [1] Weekdays\n   [2] Weekend\n");
    printf("   Jawab (1/2): ");
    scanf("%d", &hari);

    printf("\n2. Pilih Kelas:\n   [1] Regular\n   [2] Premium\n");
    printf("   Jawab (1/2): ");
    scanf("%d", &kelas);

    printf("\n3. Masukkan Umur (tahun): ");
    scanf("%d", &umur);

    printf("4. Masukkan Tinggi Badan (cm): ");
    scanf("%d", &tinggi);

    switch (hari) {
        case 1:
            if (kelas == 1) {
                hargaDewasa = 150000;
                hargaAnak = 95000;
            } else if (kelas == 2) {
                hargaDewasa = 200000;
                hargaAnak = 150000;
            } else {
                printf("\nError: Pilihan kelas tidak valid!\n");
                return 1;
            }
            break;

        case 2:
            if (kelas == 1) {
                hargaDewasa = 175000;
                hargaAnak = 135000;
            } else if (kelas == 2) {
                hargaDewasa = 225000;
                hargaAnak = 175000;
            } else {
                printf("\nError: Pilihan kelas tidak valid!\n");
                return 1;
            }
            break;

        default:
            printf("\nError: Pilihan hari tidak valid!\n");
            return 1;
    }

    printf("\n-------------------------------------------------\n");
    printf("               HASIL PERHITUNGAN                 \n");
    printf("-------------------------------------------------\n");

    if (umur <= 2) {
        hargaFinal = 0;
        printf("Kategori Pengunjung : BALITA\n");
        printf("Keterangan          : Umur <= 2 tahun\n");
        printf("Harga Tiket         : GRATIS (Rp 0)\n");
    } else if (tinggi < 120) {
        hargaFinal = hargaAnak;
        printf("Kategori Pengunjung : KIDS (ANAK)\n");
        printf("Keterangan          : Tinggi < 120 cm\n");
        printf("Harga Tiket         : IDR %d\n", hargaFinal);
    } else {
        hargaFinal = hargaDewasa;
        printf("Kategori Pengunjung : ADULT (DEWASA)\n");
        printf("Keterangan          : Tinggi >= 120 cm\n");
        printf("Harga Tiket         : IDR %d\n", hargaFinal);
    }

    printf("=================================================\n");

    return 0;
} 