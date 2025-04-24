const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UsuarioController = require('../controllers/UsuarioController');

// Rutas públicas
router.post('/register', UsuarioController.register);
router.post('/login',UsuarioController.login);

// Rutas protegidas (solo accesibles con token)
router.get('/perfil', authMiddleware, (req, res) => {
    res.json({ success: true, message: "Ruta protegida", user: req.user });
});

module.exports = router;
