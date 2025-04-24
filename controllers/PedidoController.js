const { stat } = require('fs');
const PedidoService = require('../services/PedidoService');

const PedidoController = {

    async getPedidoByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const pedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
            res.json({pedido, status: 200});
        } catch (error) {
            next(error);
        }
    },

    async updatePedido(req, res, next) {
        try {
            const { codigoPedido, fechaEntrega, serieInicio, serieFinal } = req.body;
            const pedido = await PedidoService.updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal);
            res.json({pedido, status: 200});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = PedidoController;
