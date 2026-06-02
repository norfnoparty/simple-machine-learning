#include <stdio.h>
#include <math.h>

int main (){
    float bilangan1, bilangan2, bilangan3, hasil;

    printf("Masukkan bilangan bulat pertama: ", bilangan1);
    scanf("%f", &bilangan1);

    printf("Masukkan bilangan bulat kedua: ", bilangan2);
    scanf("%f", &bilangan2);

    printf("Masukkan bilangan bulat ketiga: ", bilangan3);
    scanf("%f", &bilangan3);

    hasil = (bilangan1 + bilangan2 + bilangan3) / 3;
    printf ("Rata-rata: %f", hasil);
    
    return 0;
}