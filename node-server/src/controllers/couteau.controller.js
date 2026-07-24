const couteauService = require('../services/couteau.service');

const getCouteaux = async (req, res) => {
    try {
        const couteaux = await couteauService.getCouteaux();
        res.json(couteaux); 
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

const createCouteau = async (req, res) => {
    try {
        const couteau = await couteauService.createCouteau(req.body);
        res.json(couteau);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

const updateCouteau = async (req, res) => {
    try {
        const couteau = await couteauService.updateCouteau(req.params.id, req.body);
        res.json(couteau);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

const deleteCouteau = async (req, res) => {
    try {
        const couteau = await couteauService.deleteCouteau(req.params.id);
        res.json(couteau);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

module.exports = {
    getCouteaux,
    createCouteau,
    updateCouteau,
    deleteCouteau
}

