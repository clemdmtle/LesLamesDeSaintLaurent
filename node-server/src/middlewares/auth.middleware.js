const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Session invalide ou expirée' });
        }
        req.utilisateur = decoded;
        next();
    });
};

module.exports = verifierToken;