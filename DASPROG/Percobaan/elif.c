#include <stdio.h>
#include <math.h>

int main (){
    int bilangan;
    printf("Masukkan bilangan: ", bilangan);
    scanf("%d", &bilangan);

   if (bilangan >= 3 ){
    printf("batu lu", bilangan);
   } else {
    printf("bego lu", bilangan);
   }
}