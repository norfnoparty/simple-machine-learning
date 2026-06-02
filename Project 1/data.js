const nama = "Riyadh Fadilah"
let usia = 99

let biodata = document.getElementById('biodata');
console.log(biodata);

function generateBiodata(){
    let generasi;

    if ( usia > 11 && usia < 18) {
        generasi = 'generasi remaja'
    } else if (usia > 18 && usia < 59) {
        generasi = 'generasi dewasa'
    } else if (usia > 6 && usia < 11) {
        generasi = 'generasi anak kecil'
    } else if (usia > 60) {
        generasi = 'generasi lansia'
    } else if (usia > 3 && usia < 6) {
        generasi = 'generasi balita'
    } else if (usia >= 0 && usia <= 3) {
        generasi = 'generasi batita'
    }

    return biodata.innerHTML = generasi 


}

generateBiodata()