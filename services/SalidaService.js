const SalidaDAO = require("../dao/SalidaDAO")

const SalidaService = {
    createSalida: async (idCaja, codigoPedido) => {
        const DetalleAlmacenService = require('./DetalleAlmacenService');
        const pedidoService = require('./PedidoService');
        const GuiaSalidaService = require('./GuiaSalidaService');
        try{
            if(!codigoPedido || !idCaja){
                const errorCampos = new Error("Campos requeridos (Codigo Pedido, idCaja)");
                errorCampos.status = 401;
                throw errorCampos;
            }
            const pedido = await pedidoService.getPedidoByCodigoPedido(codigoPedido);

            const detalleAlmacen = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);

            const guiaSalida = await GuiaSalidaService.getGuiaSalidaByIdCliente(pedido.Cliente_idCliente);

            const salida = await SalidaDAO.createSalida(detalleAlmacen[0].idDetalle_almacen, idCaja, guiaSalida[0].idGuia_salida);
            return salida;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en Salida Service"}
        }
    },
    async getSalidasByCaja(idCaja)  {
        try{
            if(!idCaja) {
                const erroridCaja = new Error("idCaja requerido");
                erroridCaja.status = 400;
                throw erroridCaja;
            }
            return await SalidaDAO.getSalidaByCaja(idCaja);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    },
}

module.exports = SalidaService;