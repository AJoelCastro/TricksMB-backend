const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ModeloController = require('../controllers/ModeloController');
const ImagenController = require('../controllers/ImagenController');

router.post('/crear', ModeloController.createModelo);
router.get('/todos', authMiddleware, ModeloController.getAllModelo);
router.get('/id', authMiddleware,  ModeloController.getAllModeloById);
router.get('/obtener/:codigoPedido', authMiddleware, ModeloController.getModeloByCodigoPedido);
router.get('/imagen/:idModelo', authMiddleware, ImagenController.getImagen);
router.get("/stock",authMiddleware, ModeloController.inventarioPorAlmacen);
module.exports = router;