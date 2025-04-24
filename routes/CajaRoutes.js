const CajaController = require('../controllers/CajaController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/crear/:codigoPedido', CajaController.createCaja);
//router.get('/obtener/:codigoPedido', CajaController.getAllCajaByPedido);
router.get('/obtener/:id',authMiddleware, CajaController.getCajaById);

module.exports = router;