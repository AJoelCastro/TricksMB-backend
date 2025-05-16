const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const RolController = require('../controllers/RolController');

// Rutas públicas
router.post('/crear', RolController.createRol);

module.exports = router;
