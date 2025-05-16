const jwt = require('jsonwebtoken');
const RolService = require('../services/RolService');

const RolController = {
    async createRol(req, res, next) {
        try {
            const { nombre } = req.body;
            if (!nombre) {
                const errorData = new Error("Faltan datos para registrar un rol");
                errorData.status = 400;
                throw errorData;
            }
            const result = await RolService.createRol(nombre);
            res.json({result, status: 201});
        } catch (error) {
            next(error);
        }
    },
};

module.exports = RolController;
