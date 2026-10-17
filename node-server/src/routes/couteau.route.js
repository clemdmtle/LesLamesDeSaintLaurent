const express = require('express');
const router = express.Router();
const couteauController = require('../controllers/couteau.controller');

const verifierToken = require('../middlewares/auth.middleware');

router.get('/', couteauController.getCouteaux);
router.post('/', verifierToken, couteauController.createCouteau);
router.put('/:id', verifierToken, couteauController.updateCouteau);
router.delete('/:id', verifierToken, couteauController.deleteCouteau);

module.exports = router;