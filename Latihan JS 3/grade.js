const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Siapa namamu? ', (jawaban) => {
  console.log(`Nama mu adalah ${jawaban}`);
});
