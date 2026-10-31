const evenementService = require('../services/evenement.service');

const getEvenements = async (req, res) => {
    try {
        const evenements = await evenementService.getEvenements();
        res.json(evenements);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const createEvenement = async (req, res) => {
    try {
        const evenement = await evenementService.createEvenement(req.body, req.files ?? []);
        res.json(evenement);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const updateEvenement = async (req, res) => {
    try {
        const evenement = await evenementService.updateEvenement(req.params.id, req.body, req.files ?? []);
        res.json(evenement);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const deleteEvenement = async (req, res) => {
    try {
        const resultat = await evenementService.deleteEvenement(req.params.id);
        res.json(resultat);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getEvenements,
    createEvenement,
    updateEvenement,
    deleteEvenement,
};