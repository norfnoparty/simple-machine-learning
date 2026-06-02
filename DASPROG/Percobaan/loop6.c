#include <stdio.h>

int main(void) { 
    printf("## Program Bahasa C Segitiga Angka Terbalik ## \n");
    printf("============================================ \n\n");
    
    int tinggi_segitiga,i,j;
    printf("Input tinggi segitiga: ");
    scanf("%d",&tinggi_segitiga);
    printf("\n");
    for(i = 1; i <= tinggi_segitiga; i++) {
        for(j = 0; j <= tinggi_segitiga-i; j++) {
            printf("%d ",i);
        }
        printf("\n");
    }
    return 0;
}