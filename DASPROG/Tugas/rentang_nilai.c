#include <stdio.h>

int main(){
    int nilai;

    printf("Masukkan nilai: ");
    scanf("%d", &nilai);

    if (nilai >= 90){
        printf("Nilai anda adalah %d dengan huruf mutu A", nilai);
    } else if (nilai >= 75 && nilai < 90){
        printf("Nilai anda adalah %d dengan huruf mutu B", nilai);
    } else if (nilai >= 60 && nilai < 75 ){
        printf("Nilai anda adalah %d dengan huruf mutu C", nilai);
    } else {
        printf("Nilai anda adalah %d dengan huruf mutu D", nilai);
    }
    return 0;
}