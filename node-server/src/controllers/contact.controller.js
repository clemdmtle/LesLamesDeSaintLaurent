const contactService = require('../services/contact.service');

const envoyerMessage = async (req, res) => {
    try {
        await contactService.envoyerMessage(req.body);
        res.json({ message: 'Message envoyé.' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = { envoyerMessage };