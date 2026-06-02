#include <stdio.h>

int main (){
    char nama[30];
    int umur;

    printf("Siapa namamu?: ");
    fgets(nama, sizeof(nama), stdin);
    printf("Berapa umur mu?: ");
    scanf("%d", &umur);
   
    printf("Hallo %s", nama);
    printf("Umurmu sekarang %d", umur);
    printf(" tahun yaa");

    return 0;

}