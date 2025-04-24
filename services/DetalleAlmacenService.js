const DetalleAlmacenDAO = require('../dao/DetalleAlmacenDAO');

const DetalleAlmacenService = {
    async createDetalleAlmacen(nombreAlmacen, codigoPedido,) {
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        try {
            if(!nombreAlmacen) {
                const errorNombreAlmacen = new Error("nombre de almacen requerido para crear detalle almacen");
                errorNombreAlmacen.status = 400;
                throw errorNombreAlmacen;
            };
            if(!codigoPedido) {
                const errorCodigoPedido = new Error("codigo de pedido requerido para crear detalle almacen");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            };

            const {idAlmacen} = await AlmacenService.getAlmacen(nombreAlmacen);
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);

            const result = await DetalleAlmacenDAO.createDetalleAlmacen(idAlmacen, detallePedido.idDetalle_pedido);
            return result;
        } catch (error) {
            throw error.status ? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }
    },

    async getDetalleAlmacen(codigoPedido){
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!codigoPedido) {
                const error = new Error("codigo de pedido requerido para obtener detalle almacen");
                error.status = 400;
                throw error;
            }
            const data = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            return await DetalleAlmacenDAO.getDetalleAlmacen(data.idDetalle_pedido);
        }catch(error){
            throw error.status? error: {status: 500, message: "Error en DetalleAlmacenService"};
        }
    },

    async getAllDetalleAlmacen(){
        try{
            return await DetalleAlmacenDAO.getAllDetalleAlmacen();
        }catch(error){
            throw error.status? error: {status: 500, message: "Error en DetalleAlmacenService"};
        }
    },

    async updateIdAlmacen(nombreAlmacen, codigoPedido){
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        try{
            if(!nombreAlmacen) throw new Error("nombre de almacen requerido para obtener detalle almacen");
            if(!codigoPedido) throw new Error("codigo de pedido requerido para obtener detalle almacen");
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const {idAlmacen} = await AlmacenService.getAlmacen(nombreAlmacen);
            return await DetalleAlmacenDAO.updateIdAlmacen(idAlmacen, idDetalle_pedido);
        } catch(error){
            throw error.status? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }
    }, 

    async updateCantidadIngreso(codigoPedido, cantidad){
        const DetallePedidoService = require('./DetallePedidoService');
        const AlmacenService = require('./AlmacenService');
        try{
            if(!codigoPedido){
                const errorCodigoPedido = new Error("codigo de pedido requerido para obtener detalle almacen");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            };
            if(!cantidad){ 
                const errorCantidad = new Error("cantidad requerida para actualizar cantidad ingreso");
                errorCantidad.status = 400;
                throw errorCantidad;
            };
            const detalleAlmacen = await this.getDetalleAlmacen(codigoPedido);
            const {Cantidad} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);

            const cantidadIngreso = detalleAlmacen[0].Cantidad_Ingreso + cantidad;

            if(cantidadIngreso === Cantidad) {
                await DetalleAlmacenDAO.updateEstado(detalleAlmacen[0].Detalle_pedido_idDetalle_pedido, "Listo");
            }

            if(cantidadIngreso>Cantidad){
                const errorCantidadIngreso = new Error("Ingresos mayor a la cantidad total del pedido");
                errorCantidadIngreso.status = 400;
                throw errorCantidadIngreso;
            }

            await AlmacenService.updateStockIngreso(detalleAlmacen[0].Almacen_idAlmacen, cantidad);

            return await DetalleAlmacenDAO.updateCantidadIngreso(detalleAlmacen[0].Detalle_pedido_idDetalle_pedido, cantidadIngreso);
        } catch(error){
            throw error.status ? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }
    },

    async updateCantidadSalida(codigoPedido, cantidadSalida){
        const AlmacenService = require('./AlmacenService');
        const DetallePedidoService = require('./DetallePedidoService');
        const GuiaSalidaService = require('./GuiaSalidaService');
        const PedidoService = require('./PedidoService');
        try{
            if(!codigoPedido || !cantidadSalida) {
                const errorCampos = new Error("Campos requeridos para actualizar cantidad salida");
                errorCampos.status = 401;
                throw errorCampos;
            }

            const detalleAlmacen = await this.getDetalleAlmacen(codigoPedido);
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const pedido = await PedidoService.getPedidoByCodigoPedido(codigoPedido);
            const GuiaSalida = await GuiaSalidaService.getGuiaSalidaByIdCliente(pedido.Cliente_idCliente);

            if(cantidadSalida>detallePedido.Cantidad){
                const errorCantidadSalida = new Error("Salida mayor a la cantidad total del pedido");
                errorCantidadSalida.status = 400;
                throw errorCantidadSalida;
            }
            const cantidadSalidaAlmacen = detalleAlmacen[0].Cantidad_Salida + cantidadSalida;
            const updateCantidadSalida = GuiaSalida[0].Cantidad + cantidadSalida;
            await AlmacenService.updateStockSalida(detalleAlmacen[0].Almacen_idAlmacen, cantidadSalida);
            await GuiaSalidaService.updateCantidad(pedido.Cliente_idCliente, updateCantidadSalida);
            
            return await DetalleAlmacenDAO.updateCantidadSalida(detalleAlmacen[0].Detalle_pedido_idDetalle_pedido, cantidadSalidaAlmacen);
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error en Detalle Almacen Service"};
        }

    },


    async getDetallesAlmacenByModelo(idModelo) {
        try {
            if (!idModelo) throw { status: 400, message: "idModelo requerido" };
            return await DetalleAlmacenDAO.getDetallesAlmacenByModelo(idModelo);
        } catch (error) {
            throw error;
        }
    }
    

}

module.exports = DetalleAlmacenService