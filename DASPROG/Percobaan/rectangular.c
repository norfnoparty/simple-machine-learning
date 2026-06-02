#include <stdio.h>

int main (){
    int keliling, luas, panjang, lebar;
    
    printf("Masukkan panjang: ", panjang);
    scanf("%d", &panjang);
    printf("Masukkan lebar: ", lebar);
    scanf("%d", &lebar);

    luas = panjang * lebar ;
    printf("Luas persegi panjang: %d\n", luas);
    keliling = 2*(panjang + lebar);
    printf("Keliling persegi panjang: %d\n", keliling);

    return 0;
}