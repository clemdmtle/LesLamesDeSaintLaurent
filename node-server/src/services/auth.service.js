const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');

const login = async (email, password) => {
    const user = await Utilisateur.findOne({ where: { email } });

    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Mot de passe incorrect');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

    return {
        token,
        user: { id: user.id, email: user.email, role: user.role }
    };
};

const verifierSession = async (id) => {
    const user = await Utilisateur.findByPk(id);
    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return { id: user.id, email: user.email, role: user.role };
};

module.exports = {
    login,
    verifierSession
};