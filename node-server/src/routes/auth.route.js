const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const verifierToken = require('../middlewares/auth.middleware');
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', verifierToken, authController.me);

module.exports = router;