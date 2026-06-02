#include <stdio.h>

int main(){
    float vburet, ccmotor, kompresi;

    printf("Masukkan volume burret (ml): ");
    scanf("%f", &vburet);

    printf("Masukkan cc motor: ");
    scanf("%f", &ccmotor);

    vburet -= 0.9; 
    kompresi = (vburet + ccmotor)/vburet;

    printf("Kompresi nya adalah: %.2f", kompresi);

    return 0;

}