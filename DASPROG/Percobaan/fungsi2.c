#include <stdio.h>

int minimum (int, int);

int main (){
    int a, b, kecil;

    printf("Masukkan nilai a: ");
    scanf("%d", &a);
    printf("Masukkan nilai b: ");
    scanf("%d", &b);

    kecil = minimum (a, b);
    printf("\nBilangan terkecil antara %d dan %d adalah %d\n", b, a, kecil);

}

int minimum (int x, int y){
    if (x < y){
        return x;
    } else {
        return y;
    }
}