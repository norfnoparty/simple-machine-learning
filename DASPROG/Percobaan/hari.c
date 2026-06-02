#include <stdio.h>

int main(){
    int hari;

    printf("=== ITU NAMA NAMA HARI ===\n");
    printf("Mau hari apa?: ");
    scanf("%d", &hari);

    switch (hari)
    {
    case 1:
        printf("Hari Senin aja yaa");
        break;
    case 2:
        printf("Hari Selasa deh");
        break;
    case 3:
        printf("Hari Rabu gimana?");
        break;
    case 4:
        printf("Hari Kamis??");
        break;
    case 5:
        printf("Hari Jumat aku bisaa");
        break;
    case 6:
        printf("Hari Sabtu aku juga bisaa");
        break;
    case 7:
        printf("Hari Minggu aku kosong");
        break;
    default:
        printf("Jadinya mau hari apa?");
        break;
    }
    return 0;

}