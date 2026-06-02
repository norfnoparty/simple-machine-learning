#include <stdio.h>

int main(){
    float cc, dp, lp;

    // Input diamter piston dan langkah piston
    printf("Masukkan diameter piston: ");
    scanf("%f", &dp);
    printf("Masukkan langkah piston: ");
    scanf("%f", &lp);

    /*0.785 adalah konstanta phi karena phi dibagi 
    dengan 4 jika menggunakan diameter*/
    cc = (0.785 * dp * dp * lp) / 1000 ;

    printf("CC motor anda adalah %.2f CC", cc);

    return 0;
}