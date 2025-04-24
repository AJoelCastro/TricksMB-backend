const ModeloService = require('../services/ModeloService');

const ModeloController = {

    async createModelo(req, res, next) {
        try {
            const { idTipo, nombre } = req.body;
            const modelo = await ModeloService.createModelo(idTipo, nombre);
            res.json({ modelo, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getAllModelo(req, res, next) {
        try {
            const modelos = await ModeloService.getAllModelo();
            res.json({ modelos, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getAllModeloById(req, res, next) {
        try {
            const id = req.query.id;
            const modelo = await ModeloService.getAllModeloById(id);
            res.json({ modelo, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getModeloByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const modelo = await ModeloService.getModeloByCodigoPedido(codigoPedido);
            res.json({ modelo, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async inventarioPorAlmacen(req, res, next){
        try{
            const stock = await ModeloService.inventarioPorAlmacen();
            res.json({stock, status: 200});
        }catch(error){
            next(error);
        }
    }
};

module.exports = ModeloController;
