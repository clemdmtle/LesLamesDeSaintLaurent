// hash-password.js
const bcrypt = require('bcrypt');

const motDePasse = process.argv[2];

if (!motDePasse) {
    console.error('Usage : node hash-password.js "tonMotDePasse"');
    process.exit(1);
}

bcrypt.hash(motDePasse, 10).then(hash => {
    console.log('Hash généré :');
    console.log(hash);
});