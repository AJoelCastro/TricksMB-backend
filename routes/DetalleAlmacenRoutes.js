const DetalleAlmacenController = require('../controllers/DetalleAlmacenController');

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/obtener/:codigoPedido',authMiddleware, DetalleAlmacenController.getDetalleAlmacen);
router.put('/actualizar/:codigoPedido',authMiddleware, DetalleAlmacenController.updateIdAlmacen);
router.put('/actualizarCantidadIngreso/:codigoPedido',authMiddleware, DetalleAlmacenController.updateCantidadIngreso);
router.put('/actualizarCantidadSalida/:codigoPedido', DetalleAlmacenController.updateCantidadSalida);

module.exports = router;