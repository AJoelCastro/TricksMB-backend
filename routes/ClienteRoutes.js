const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ClienteController = require('../controllers/ClienteController');

//router.post('/', authMiddleware, ClienteController.registrarCliente);
router.post('/natural', authMiddleware, ClienteController.registrarCliente);
router.post('/juridico', authMiddleware, ClienteController.registrarCliente);
router.get('/clientesId', authMiddleware, ClienteController.getClientesById);
router.get('/buscar/natural', authMiddleware, ClienteController.buscarClienteNatural);
router.get('/buscar/juridico', authMiddleware, ClienteController.buscarClienteJuridico);
router.get('/obtenerTodo', ClienteController.getAllClientes);
router.get('/cliente/:codigoPedido', authMiddleware, ClienteController.getClienteByCodigoPedido);
module.exports = router;
