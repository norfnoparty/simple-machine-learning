#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main (){
    /* 
    Gunting = 0
    Batu = 1
    Kertas = 2
    */

    int player, bot, batas;

    batas = 3;
    srand(time(NULL));

    printf("=== SUIT!! ====\n");
    printf("0 = Gunting \n1 = Batu \n2 = Kertas \nAYO MULAII\n");

    bot = rand() % batas;

    printf("Pilih gacoan suit: ");
    scanf("%d", &player);

    // kondisi pertama jika player memilih gunting
    if (player == 0){
        if (bot == 0){
            printf("SERI COYY");
        } else if (bot == 1){
            printf("WADUH KAMU KALAH!!");
        } else if (bot == 2){
            printf("KAMU MENANG!!");
        }
    // kondisi kedua jika player memilih batu
    } else if (player == 1){
        if (bot == 0){
            printf("WADUH KAMU KALAH!!");
        } else if (bot == 1){
            printf("SERI COYY");
        } else if (bot == 2){
            printf("KAMU MENANG!!");
        } 
    //kondisi ketiga jika player memilih kertas
    } else if (player == 2){
        if (bot == 0){
            printf("WADUH KAMU KALAH!!");
        } else if (bot == 1){
            printf("KAMU MENANG!!");
        } else if (bot == 2){
            printf("SERI COYY");
        } 
    //kondisi jika player tidak memilih 0, 1, atau 2
    } else {
        printf("pilih duluu gacoan kamu dongg!!");
    }
    return 0;
}