const fs = require('fs');

const dossierUploads = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(dossierUploads, { recursive: true });