const DetalleEmpleadoPedidoService = require('../services/DetalleEmpleadoPedidoService');

const DetalleEmpleadoPedidoController = {
    async createDetalleEmpleadoPedido(req, res, next) {
        try {
            const { dni, codigoPedido } = req.body;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.createDetalleEmpleadoPedido(dni, codigoPedido);
            res.status(201).json({detalleEmpleadoPedido, status: 201});
        } catch (error) {
            next(error);
        }
    },

    async getAllDetalleEmpleadoPedido(req, res, next) {
        try { 
            const { nomArea, codigoPedido } = req.query;
            const detalleEmpleadoPedido = await DetalleEmpleadoPedidoService.getAllDetalleEmpleadoPedido(nomArea, codigoPedido);
            res.json({detalleEmpleadoPedido, status: 200});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = DetalleEmpleadoPedidoController;
