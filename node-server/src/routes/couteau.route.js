const express = require('express');
const router = express.Router();
const couteauController = require('../controllers/couteau.controller');
const verifierToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/', couteauController.getCouteaux);
router.post('/', verifierToken, upload.array('photos', 3), couteauController.createCouteau);
router.put('/:id', verifierToken, upload.array('photos', 3), couteauController.updateCouteau);
router.delete('/:id', verifierToken, couteauController.deleteCouteau);

module.exports = router;