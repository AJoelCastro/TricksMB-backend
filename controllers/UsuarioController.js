const { stat } = require('fs');
const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');

const UsuarioController = {
    async register(req, res, next) {
        const { idEmpleado, idRol, correo, contrasenia } = req.body;

        try {
            const result = await UsuarioService.createUser(idEmpleado, idRol, correo, contrasenia);
            res.json({result, status: 201});
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        const { correo, contrasenia } = req.body;
        
        try {
            const user = await UsuarioService.findUser(correo, contrasenia);
            console.log(user);
            if (!user) {
                return res.json({ error: "Correo o contraseña incorrectos", status: 400 });
            }
            const token = jwt.sign(
                    { userId: user.idUsuario, correo: user.Correo },
                    process.env.JWT_SECRET,
                    { expiresIn: '16h' }
                );
                res.json({ token, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getByCorreo(req, res, next) {
        const { correo } = req.params;
        try {
            const user = await UsuarioService.getUserByCorreo(correo);
            res.json({user, status: 200});
        } catch (error) {
            next(error);
        }
    },

    async getByIdRol(req, res, next) {
        const { idRol } = req.params;
        try {
            const user = await UsuarioService.getUserByIdRol(idRol);
            res.json({user, status: 200});
        } catch (error) {
            next(error);
        }
    },

    async perfil(req, res, next) {
    try {
        const idUsuario = req.user.userId;
        const user = await UsuarioService.getUserById(idUsuario);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

};

module.exports = UsuarioController;
