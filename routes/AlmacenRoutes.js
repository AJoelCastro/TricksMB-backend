const AlmacenController = require('../controllers/AlmacenController');
const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/crear', AlmacenController.createAlmacen);
router.get('/obtener/:nombre', authMiddleware, AlmacenController.getAlmacen);
router.get('/obtenerTodos',authMiddleware, AlmacenController.getAllAlmacen);


module.exports = router;