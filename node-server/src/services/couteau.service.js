const { Couteau } = require('../models');

const getCouteaux = async () => {
    return await Couteau.findAll();
};

const createCouteau = async (couteauData) => {
    return await Couteau.create(couteauData);
};

const updateCouteau = async (id, couteauData) => {
    const couteau = await Couteau.findByPk(id);
    if (!couteau) {
        throw new Error('Couteau non trouvé');
    }

    const updatedData = {
        photo_1: couteauData.photo_1 ?? couteau.photo_1,
        photo_2: couteauData.photo_2 ?? couteau.photo_2,
        photo_3: couteauData.photo_3 ?? couteau.photo_3,
        lame: couteauData.lame ?? couteau.lame,
        garde: couteauData.garde ?? couteau.garde,
        etui: couteauData.etui ?? couteau.etui,
        prix: couteauData.prix ?? couteau.prix,
        manche: couteauData.manche ?? couteau.manche,
        gamme: couteauData.gamme ?? couteau.gamme,
        vendu: couteauData.vendu ?? couteau.vendu

    }
    await couteau.update(updatedData);

    return couteau;
}

const deleteCouteau = async (id) => {
    const couteau = await Couteau.findByPk(id);

    if (!couteau) {
        throw new Error('Couteau non trouvé');
    }
    
    await couteau.destroy();
    return { message: 'Couteau supprimé avec succès' };
}

module.exports = {
    getCouteaux,
    createCouteau,
    updateCouteau,
    deleteCouteau
};  