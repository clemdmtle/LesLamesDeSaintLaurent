const { Couteau } = require('../models');
const path = require('path');

const DOSSIER_UPLOADS = path.join(__dirname, '..', 'uploads');
 
const erreur = (message, status) => {
    const e = new Error(message);
    e.status = status;
    return e;
};
 
// Supprime les fichiers du disque (chemins du type /uploads/xxx.jpg)
const supprimerFichiers = (chemins) => {
    (chemins || []).filter(Boolean).forEach((chemin) => {
        // path.basename empêche toute sortie du dossier uploads
        const fichier = path.join(DOSSIER_UPLOADS, path.basename(chemin));
        fs.unlink(fichier, (err) => {
            if (err && err.code !== 'ENOENT') {
                console.error('Impossible de supprimer', fichier, err.message);
            }
        });
    });
};

const getCouteaux = async () => {
    return await Couteau.findAll();
};

const createCouteau = async (couteauData) => {
    return await Couteau.create(couteauData);
};

const updateCouteau = async (id, data, conservees, nouvelles) => {
    const couteau = await Couteau.findByPk(id);
    if (!couteau) {
        supprimerFichiers(nouvelles);
        throw erreur('Couteau non trouvé', 404);
    }
 
    const existantes = [couteau.photo_1, couteau.photo_2, couteau.photo_3].filter(Boolean);
 
    // On ne garde que des photos qui appartiennent réellement à ce couteau
    const gardees = conservees.filter((p) => existantes.includes(p));
    const finales = [...gardees, ...nouvelles];
 
    if (finales.length < 1 || finales.length > 3) {
        supprimerFichiers(nouvelles);
        throw erreur('Un couteau doit avoir entre 1 et 3 photos.', 400);
    }
 
    await couteau.update({
        ...data,
        photo_1: finales[0] || null,
        photo_2: finales[1] || null,
        photo_3: finales[2] || null,
    });
 
    // Les photos retirées sont supprimées du disque
    supprimerFichiers(existantes.filter((p) => !gardees.includes(p)));
 
    return couteau;
};

const deleteCouteau = async (id) => {
    const couteau = await Couteau.findByPk(id);
    if (!couteau) {
        throw erreur('Couteau non trouvé', 404);
    }
 
    const photos = [couteau.photo_1, couteau.photo_2, couteau.photo_3];
    await couteau.destroy();
    supprimerFichiers(photos);
};
 
module.exports = {
    getCouteaux,
    createCouteau,
    updateCouteau,
    deleteCouteau,
    supprimerFichiers,
};