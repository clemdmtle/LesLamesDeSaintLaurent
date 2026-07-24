const { login : loginService } = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginService(email, password);

        res.cookie('access_token', result.token, { 
            httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 
        }); // 30 jours

        res.status(200).json({ result : result.user, message: 'Connexion réussie' });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax'
    });
    res.status(200).json({ message: 'Déconnexion réussie' });
};

module.exports = {
    login,
    logout
};