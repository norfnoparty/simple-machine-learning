#include <stdio.h>

int main (){
    int bilangan;
    
    printf("Masukkan bilangan: ");
    scanf("%d", &bilangan);

    if (bilangan % 2 == 0){
        printf("Bilangan genap");
    }

    return 0;
}