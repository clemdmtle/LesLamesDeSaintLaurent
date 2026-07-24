const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenement.controller');

router.get('/', evenementController.getEvenements);
router.post('/', evenementController.createEvenement);
router.put('/:id', evenementController.updateEvenement);
router.delete('/:id', evenementController.deleteEvenement);

module.exports = router;