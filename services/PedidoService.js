const PedidoDAO = require('../dao/PedidoDAO')

const PedidoService = {
    async createPedido(idCliente, FechaEntrega,SerieInicio, SerieFinal){
        try{
            if(!idCliente || !FechaEntrega || !SerieInicio || !SerieFinal) {
                const errorCampos = new Error("Campos requeridos");
                errorCampos.status = 401;
                throw errorCampos;
            }
            const pedido = await PedidoDAO.createPedido(idCliente, FechaEntrega, SerieInicio, SerieFinal);

            return pedido;
        } catch(error){
            throw error.status ? error : {status:500, message:"Error en el servicio al crear pedido"};
        }
    },

    async getPedidoByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido){
                const errorCampos = new Error("Codigo pedido requerido en Pedido Service ");
                errorCampos.status = 401;
                throw errorCampos;
            }
            const pedido = await PedidoDAO.getPedidoByCodigoPedido(codigoPedido);
            return pedido;
        } catch(error){
            throw error.status? error : {status:500, message:"Error en el servicio al obtener pedido"};
        }
    },

    async updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal){
        try{
            if(!codigoPedido || !fechaEntrega || !serieInicio || !serieFinal)
                throw {status: 401, message: "Campos requeridos"};
            const pedido = await PedidoDAO.updatePedido(codigoPedido, fechaEntrega, serieInicio, serieFinal);
            if(!pedido)
                throw {status: 500, message: "No se pudo actualizar el pedido"};
            return pedido;
        } catch(error){
            throw error;
        }
    }
}

module.exports = PedidoService;