#include <stdio.h>

int main(){
    float absen, uas, uts, tugas, akhir;

    printf("Masukkan nilai absensi: ", absen);
    scanf("%f", &absen);
    printf("Masukkan nilai tugas: ", tugas);
    scanf("%f", &tugas);
    printf("Masukkan nilai UTS: ", uts);
    scanf("%f", &uts);
    printf("Masukkan nilai UAS: ", uas);
    scanf("%f", &uas);

    akhir = (absen * 0.1) + (tugas * 0.2) + (uts * 0.3) + (uas * 0.4);

    printf("Nilai akhir yang diperoleh sebesar = %.2f", akhir);

    return 0;
}