    //Gunting = 0
    //Batu = 1
    //Kertas = 2

    const playerPick = '2'
    let computerPick = Math.floor(Math.random() * 3)
    let result = '0'

    if (playerPick == '0') {
        if (computerPick == '0') {
            result = 'Draw'
        }
        if (computerPick == '1') {
            result = 'Computer Won'
        }
        if (computerPick == '2') {
            result = 'Player Won'
        }
    }
    if (playerPick == '1') {
        if (computerPick == '0') {
            result = 'Player Won'
        }
        if (computerPick == '1') {
            result = 'Draw'
        }
        if (computerPick == '2') {
            result = 'Computer Won'
        }
    }
    if (playerPick == '2') {
        if (computerPick == '0') {
            result = 'Computer Won'
        }
        if (computerPick == '1') {
            result = 'Player Won'
        }
        if (computerPick == '2') {
            result = 'Draw'
        }
    }
    if (playerPick > 2) {
        console.log('Pilih gacoan suitt!!');
        return
    } 


    console.log('Player pick:', playerPick)
    console.log('Computer pick:', computerPick)
    console.log('Result:', result)