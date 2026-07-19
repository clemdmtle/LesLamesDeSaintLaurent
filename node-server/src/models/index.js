const Utilisateur = require('./utilisateur.model');
const Couteau = require('./couteau.model');
const Evenement = require('./evenement.model');


Utilisateur.hasMany(Couteau,{
    foreignKey:'utilisateur_id'
});

Couteau.belongsTo(Utilisateur,{
    foreignKey:'utilisateur_id'
});



Utilisateur.hasMany(Evenement,{
    foreignKey:'utilisateur_id'
});

Evenement.belongsTo(Utilisateur,{
    foreignKey:'utilisateur_id'
});


module.exports={
    Utilisateur,
    Couteau,
    Evenement
};