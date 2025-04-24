const { createAlmacen, updateStock } = require('../dao/AlmacenDAO');
const AlmacenService = require('../services/AlmacenService');

const AlmacenController = {
    async createAlmacen(req, res, next) {
        try {
            const { nombre, imagen, direccion } = req.body;
            const almacen = await AlmacenService.createAlmacen(nombre, imagen, direccion);
            res.json({ almacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getAlmacen(req, res, next) {
        try {
            const { nombre } = req.params;
            const almacen = await AlmacenService.getAlmacen(nombre);
            res.json({ almacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getAllAlmacen(req, res, next) {
        try {
            const almacen = await AlmacenService.getAllAlmacen();
            res.json({ almacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

}

module.exports = AlmacenController