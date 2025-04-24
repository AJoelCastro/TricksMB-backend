const GuiaSalida = require("../dao/GuiSalida")

const GuiaSalidaService = {
    createGuiaSalida: async (codigoPedido, cantidad) => {
        const PedidoService = require('./PedidoService');
        try{
            const pedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
            const guiaSalida = await GuiaSalida.createGuiaSalida(pedido.Cliente_idCliente, cantidad);
            return guiaSalida;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en GuiaSalida Service al crear"};
        }
    },

    async getGuiaSalidaByIdCliente(idCliente) { 
        try{
            if(!idCliente){
                const errorCampos = new Error("Campos requeridos");
                errorCampos.status = 401;
                throw errorCampos;
            }
            const guiaSalida = await GuiaSalida.getGuiaSalidaByIdCliente(idCliente);
            return guiaSalida;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en Guia Salida Service cliente"};
        }
    },

    async updateCantidad(idCliente, cantidad) {
        try{
            if(!idCliente || !cantidad){
                const errorCampos = new Error("Campos requeridos");
                errorCampos.status = 401;
                throw errorCampos;
            }
            const guiaSalida = await GuiaSalida.updateCantidad(idCliente, cantidad);
            return guiaSalida;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en GuiaSalida Service"};
        }    
    },


}

module.exports = GuiaSalidaService