#include <stdio.h>
#include <math.h>

int main (){
    int bilangan;

    printf("Masukkan bilangan bulat: ", bilangan);
    scanf("%d", &bilangan);

    if (bilangan % 2 == 0) {
        printf("Bilangan %d adalah bilangan Genap\n", bilangan);
    } else {
        printf("Bilangan %d adalah bilangan Ganjil\n", bilangan);
    } 

    return 0;
}