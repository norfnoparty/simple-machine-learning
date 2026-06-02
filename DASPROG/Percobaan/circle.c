#include <stdio.h>
#include <math.h>

int main (){
    float luas;
    float keliling;
    int jari; 

    printf("Masukkan jari-jari: ", jari);
    scanf("%d", &jari);

    luas = 3.14 * jari * jari;
    printf("Luas lingkaran: %.2f\n", luas);
    keliling = 3.14 * 2 * jari;
    printf("Keliling lingkaran: %.2f", keliling);


    return 0;
}