const TipoAlmacenController = require('../controllers/TipoAlmacenController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/crear', authMiddleware, TipoAlmacenController.createTipoAlmacen);

module.exports = router;