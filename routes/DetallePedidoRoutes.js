const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const DetallePedidoController = require('../controllers/DetallePedidoController');
const DetallePedidoService = require('../services/DetallePedidoService');

const router = express.Router();


router.post('/crear', authMiddleware,DetallePedidoController.createPedido);
router.get('/obtener/:codigoPedido', authMiddleware, DetallePedidoController.getDetallePedidoByCodigoPedido);
router.get('/todos', authMiddleware,DetallePedidoController.getAllCodigosPedidos);
router.put('/actualizar/:codigoPedido', authMiddleware, DetallePedidoController.updateDetallePedido);
router.put('/actualizarEstado/:codigoPedido', authMiddleware, DetallePedidoController.updateEstado);
router.get('/historial', authMiddleware, DetallePedidoController.getHistorialPedidos);
router.put('/actualizarCantidad/:codigoPedido', authMiddleware, DetallePedidoController.updateCantidad);

module.exports = router;
