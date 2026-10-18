const couteauService = require('../services/couteau.service');

const extraireDonnees = (body) => ({
    gamme: body.gamme,
    lame: body.lame,
    garde: body.garde || null,
    manche: body.manche || null,
    etui: body.etui || null,
    prix: body.prix ? parseFloat(body.prix) : null,
    vendu: body.vendu === 'true',
});

const cheminsUploades = (req) => (req.files || []).map((f) => `/uploads/${f.filename}`);

const getCouteaux = async (req, res) => {
    try {
        const couteaux = await couteauService.getCouteaux();
        res.json(couteaux);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const createCouteau = async (req, res) => {
    try {
        const photos = cheminsUploades(req);

        if (photos.length === 0) {
            return res.status(400).json({ message: 'Au moins une photo est requise.' });
        }

        const data = extraireDonnees(req.body);
        if (!data.gamme || !data.lame) {
            couteauService.supprimerFichiers(photos);
            return res.status(400).json({ message: 'La gamme et la lame sont requises.' });
        }

        const couteau = await couteauService.createCouteau({
            ...data,
            photo_1: photos[0] || null,
            photo_2: photos[1] || null,
            photo_3: photos[2] || null,
            utilisateur_id: req.utilisateur.id,
        });
        res.status(201).json(couteau);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const updateCouteau = async (req, res) => {
    const nouvelles = cheminsUploades(req);
    try {
        let conservees = [];
        try {
            conservees = JSON.parse(req.body.photosConservees || '[]');
        } catch {
            couteauService.supprimerFichiers(nouvelles);
            return res.status(400).json({ message: 'Liste de photos invalide.' });
        }

        const data = extraireDonnees(req.body);
        if (!data.gamme || !data.lame) {
            couteauService.supprimerFichiers(nouvelles);
            return res.status(400).json({ message: 'La gamme et la lame sont requises.' });
        }

        const couteau = await couteauService.updateCouteau(req.params.id, data, conservees, nouvelles);
        res.json(couteau);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const deleteCouteau = async (req, res) => {
    try {
        await couteauService.deleteCouteau(req.params.id);
        res.json({ message: 'Couteau supprimé' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getCouteaux,
    createCouteau,
    updateCouteau,
    deleteCouteau,
};