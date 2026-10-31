const express = require('express');
const router = express.Router();
const evenementController = require('../controllers/evenement.controller');
const verifierToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware'); // la même config multer que pour les couteaux

router.get('/', evenementController.getEvenements);
router.post('/', verifierToken, upload.array('photos', 3), evenementController.createEvenement);
router.put('/:id', verifierToken, upload.array('photos', 3), evenementController.updateEvenement);
router.delete('/:id', verifierToken, evenementController.deleteEvenement);

module.exports = router;