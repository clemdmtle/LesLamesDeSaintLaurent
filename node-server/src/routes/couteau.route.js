const express = require('express');
const router = express.Router();
const couteauController = require('../controllers/couteau.controller');

router.get('/', couteauController.getCouteaux);
router.post('/', couteauController.createCouteau);
router.put('/:id', couteauController.updateCouteau);
router.delete('/:id', couteauController.deleteCouteau);

module.exports = router;