const SalidaController = require('../controllers/SalidaController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/crear/:idCaja', authMiddleware, SalidaController.createSalida);
router.get("/obtener/:idCaja", authMiddleware, SalidaController.getSalidasByCaja);
module.exports = router;