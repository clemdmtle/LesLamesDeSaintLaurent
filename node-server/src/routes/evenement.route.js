const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenement.controller');

const verifierToken = require('../middlewares/auth.middleware');  
router.get('/', evenementController.getEvenements);
router.post('/', verifierToken, evenementController.createEvenement);
router.put('/:id', verifierToken, evenementController.updateEvenement);
router.delete('/:id', verifierToken, evenementController.deleteEvenement);

module.exports = router;