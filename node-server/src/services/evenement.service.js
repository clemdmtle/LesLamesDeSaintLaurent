const { Evenement } = require('../models');

const getEvenements = async () => {
    return await Evenement.findAll();
};

const createEvenement = async (evenementData) => {
    return await Evenement.create(evenementData);
};

const updateEvenement = async (id, evenementData) => {
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
        throw new Error('Événement non trouvé');
    }
    return await evenement.update(evenementData);
};

const deleteEvenement = async (id) => {
    const evenement = await Evenement.findByPk(id);
    if (!evenement) {
        throw new Error('Événement non trouvé');
    }
    return await evenement.destroy();
};

module.exports = {
    getEvenements,
    createEvenement,
    updateEvenement,
    deleteEvenement
};