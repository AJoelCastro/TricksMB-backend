const express = require('express');
const tipoCalzadoController = require('../controllers/TipoCalzadoController')
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/crear',tipoCalzadoController.createTipoModelo);
router.get('/todos',authMiddleware,tipoCalzadoController.getAllTipoCalzado);
router.get('/nombre',authMiddleware,tipoCalzadoController.getTipoCalzadoByNombre);
router.get('/obtener/:codigoPedido',authMiddleware,tipoCalzadoController.getTipoCalzadoByCodigoPedido);

module.exports = router;