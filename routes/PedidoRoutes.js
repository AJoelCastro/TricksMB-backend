const PedidoController = require('../controllers/PedidoController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/obtener/:codigoPedido', authMiddleware, PedidoController.getPedidoByCodigoPedido);
router.put('/actualizar/:codigoPedido', authMiddleware, PedidoController.updatePedido);

module.exports = router;
