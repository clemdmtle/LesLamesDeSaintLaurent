const fs = require('fs');
const path = require('path');
const { Evenement } = require('../models');

const MAX_PHOTOS = 3;

// Transforme chemins conservés + nouveaux fichiers en photo_1..photo_3
const construirePhotos = (conservees, fichiers) => {
    const chemins = [
        ...conservees,
        ...fichiers.map(f => `/uploads/${f.filename}`),
    ].slice(0, MAX_PHOTOS);

    return {
        photo_1: chemins[0] ?? null,
        photo_2: chemins[1] ?? null,
        photo_3: chemins[2] ?? null,
    };
};

// Lit le JSON envoyé par le front (photosConservees)
const lireConservees = (body) => {
    try {
        const liste = JSON.parse(body.photosConservees ?? '[]');
        return Array.isArray(liste) ? liste : [];
    } catch {
        return [];
    }
};

const supprimerFichier = (chemin) => {
    if (!chemin) return;
    // adapte si ton dossier uploads n'est pas à la racine du projet back
    fs.unlink(path.join(__dirname, '..', chemin), () => {});
};

const erreur = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

const getEvenements = async () => {
    return await Evenement.findAll();
};

const createEvenement = async (body, fichiers = []) => {
    const { titre, description, ville, date, heure } = body;

    return await Evenement.create({
        titre,
        description: description || null,
        ville: ville || null,
        date: date || null,
        heure: heure || null,
        ...construirePhotos([], fichiers),
    });
};

const updateEvenement = async (id, body, fichiers = []) => {
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
        throw erreur('Événement non trouvé', 404);
    }

    const anciennes = [evenement.photo_1, evenement.photo_2, evenement.photo_3].filter(Boolean);

    // On ne garde que des chemins qui existaient vraiment
    const conservees = lireConservees(body).filter(c => anciennes.includes(c));
    const photos = construirePhotos(conservees, fichiers);

    await evenement.update({
    titre: body.titre,
    description: body.description || null,
    ville: body.ville || null,
    date: body.date || null,
    heure: body.heure || null,
    ...photos
});

    // Supprime du disque les photos retirées
    anciennes
        .filter(p => !conservees.includes(p))
        .forEach(supprimerFichier);

    return evenement;
};

const deleteEvenement = async (id) => {
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
        throw erreur('Événement non trouvé', 404);
    }

    const photos = [evenement.photo_1, evenement.photo_2, evenement.photo_3];
    await evenement.destroy();
    photos.forEach(supprimerFichier);

    return { id: Number(id) };
};

module.exports = {
    getEvenements,
    createEvenement,
    updateEvenement,
    deleteEvenement,
};