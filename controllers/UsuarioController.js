const { stat } = require('fs');
const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');

const UsuarioController = {
    async register(req, res, next) {
        try {
            const { idEmpleado, idRol, correo, contrasenia } = req.body;
            if (!idEmpleado || !idRol || !correo || !contrasenia) {
                const errorData = new Error("Faltan datos para registrar un usuario");
                errorData.status = 400;
                throw errorData;
            }
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
            if (!user) {
                const errorData = new Error("Credenciales incorrectas");
                errorData.status = 401;
                throw errorData;
            }
            const token = jwt.sign(
                { userId: user.idUsuario, correo: user.Correo },
                process.env.JWT_SECRET,
                { expiresIn: '16h' }
            );
            res.json({ token, rol:user.Rol_idRol, status: 200 });
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
        console.log(user);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

};

module.exports = UsuarioController;
