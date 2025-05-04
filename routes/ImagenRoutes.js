const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const ImagenController = require('../controllers/ImagenController');

router.post('/crear', authMiddleware, ImagenController.createImagen);
router.get('/obtener/:id', authMiddleware, ImagenController.getImagen);
module.exports = router;