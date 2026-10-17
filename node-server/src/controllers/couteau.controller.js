const couteauService = require('../services/couteau.service');

const getCouteaux = async (req, res) => {
    try {
        const couteaux = await couteauService.getCouteaux();
        res.json(couteaux); 
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

const createCouteau = async (req, res) => {
    try {
        const photos = (req.files || []).map(f => `/uploads/${f.filename}`);

        const data = {
            gamme: req.body.gamme,
            lame: req.body.lame,
            garde: req.body.garde || null,
            manche: req.body.manche || null,
            etui: req.body.etui || null,
            prix: req.body.prix ? parseFloat(req.body.prix) : null,
            vendu: req.body.vendu === 'true',
            photo_1: photos[0] || null,
            photo_2: photos[1] || null,
            photo_3: photos[2] || null,
            utilisateur_id: req.utilisateur.id
        };

        const couteau = await couteauService.createCouteau(data);
        res.status(201).json(couteau);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const updateCouteau = async (req, res) => {
    try {
        const couteau = await couteauService.updateCouteau(req.params.id, req.body);
        res.json(couteau);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

const deleteCouteau = async (req, res) => {
    try {
        const couteau = await couteauService.deleteCouteau(req.params.id);
        res.json(couteau);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}

module.exports = {
    getCouteaux,
    createCouteau,
    updateCouteau,
    deleteCouteau
}

