const CaracteristicasController = require('../controllers/CaracteristicasController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/crear', authMiddleware, CaracteristicasController.createCaracteristica);
router.get('/todos/:idDetallePedido', authMiddleware, CaracteristicasController.getCaracteristicas);
router.put('/editar', authMiddleware, CaracteristicasController.editCaracteristicas);
router.delete('/eliminar/:idCaracteristicas', authMiddleware, CaracteristicasController.deleteCaracteristicas);
router.get('/buscar/:idCaracteristicas', authMiddleware, CaracteristicasController.getCaracteristica);

module.exports = router;