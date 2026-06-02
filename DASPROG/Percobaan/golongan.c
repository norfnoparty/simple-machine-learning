#include <stdio.h>

int main(){
    int golongan;

    printf("Kendaraan golongan berapa yang lewat?: ");
    scanf("%d", &golongan);

    switch (golongan)
    {
    case 1:
        printf("Bayar Rp11.000");
        break;
    case 2:
        printf("Bayar Rp16.500");
        break;
    case 3:
        printf("Bayar Rp16.500");
        break;
    case 4:
        printf("Bayar Rp22.000");
        break;
    case 5:
        printf("Bayar Rp22.000");
        break;
    default:
        printf("Golongan tidak valid");
        break;
    }

    return 0;
}