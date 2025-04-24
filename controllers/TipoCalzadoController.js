const { stat } = require('fs');
const TipoCalzadoService = require('../services/TipoCalzadoService');

const TipoCalzadoController = {

    async createTipoModelo(req, res, next) {
        try {
            const { nombre } = req.body;
            const tipoCalzado = await TipoCalzadoService.createTipoModelo(nombre);
            res.json({tipoCalzado, status: 201});
        } catch (error) {;
            next(error);
        }
    },

    async getAllTipoCalzado(req, res, next) {
        try {
            const tipoCalzado = await TipoCalzadoService.getAllTipoCalzado();
            res.json({tipoCalzado, status: 200});
        } catch (error) {
            next(error);
        }
    },

    async getTipoCalzadoByNombre(req, res, next) {
        try {
            const nombre = req.query.nombre;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByNombre(nombre);
            res.json({tipoCalzado, status: 200});
        } catch (error) {
            next(error);
        }
    },

    async getTipoCalzadoByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(codigoPedido);
            res.json({tipoCalzado, status: 200});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = TipoCalzadoController;
