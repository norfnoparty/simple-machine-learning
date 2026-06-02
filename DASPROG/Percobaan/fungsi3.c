#include <stdio.h>

void cetakHello(char nama[]){
    printf("Hello %s!", nama);
}

int main(){
    char nama[30];

    printf("Masukkan nama Anda: ");
    fgets(nama, sizeof(nama), stdin);

    cetakHello(nama);

    return 0;
}