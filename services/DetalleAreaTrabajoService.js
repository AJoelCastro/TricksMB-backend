const DetalleAreaTrabajoDAO = require('../dao/DetalleAreaTrabajoDAO');
const CaracteristicasService = require('./CaracteristicasService');
const DetallePedidoService = require('./DetallePedidoService');
const AreaTrabajoService = require('./AreaTrabajoService');
const GuiaSalidaService = require('./GuiaSalidaService');

const DetalleAreaTrabajoService = {

    async createDetalleAreaTrabajo(nomArea,codigoPedido) {
        try {
            if (!codigoPedido) {
                const errorCodigoPedido = new Error("Codigo del pedido es requerido");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            }
            if(nomArea=="Alistado"){
                let cantidad = 0;
                await GuiaSalidaService.createGuiaSalida(codigoPedido, cantidad);
            }   
            const data = await AreaTrabajoService.getAreaTrabajoByNombre(nomArea);
            let idAreaTrabajo = data.idArea_trabajo;
            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            const detallesCreados = await Promise.all(
                caracteristicas.map(caracteristica =>
                    DetalleAreaTrabajoDAO.crearDetalleAreaTrabajo(
                        idAreaTrabajo, 
                        caracteristica.idCaracteristicas,
                        0,
                        "",
                        0
                    )
                )
            );
            return {message: "El siguiente proceso esta listo",detallesCreados, status: 200};
        } catch (error) {
            throw error.status ? error : {status:500, message:"Error en Detalle Area Trabajo"};
        }
    },

    async getDetalleAreaTrabajo(codigoPedido) {
        try {
            if (!codigoPedido) {
                const errorCodigoPedido = new Error("Codigo del pedido es requerido");
                errorCodigoPedido.status = 400;
                throw errorCodigoPedido;
            }
            const DetallePedidoService = require('./DetallePedidoService');

            const {idDetalle_pedido} = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            const detallesAreaTrabajo = await Promise.all(
                caracteristicas.map((caracteristica) =>
                DetalleAreaTrabajoDAO.getDetalleAreaTrabajo(caracteristica.idCaracteristicas)
                )
            );
            return detallesAreaTrabajo.flat();
        } catch (error) {
            throw error.status?error:{ status: 500, message: "Error en Detalle Area Trabajo"};
        }
    },

    async updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado) {
        try {
            if (!idCaracteristicas) {
                const errorIdCaracteristicas = new Error("Id de caracteristicas es requerido");
                errorIdCaracteristicas.status = 400;
                throw errorIdCaracteristicas;
            }

            if (cantidadAvance < 0) {
                const errorCantidadAvance = new Error("La cantidad de avance no puede ser negativa");
                errorCantidadAvance.status = 400;
                throw errorCantidadAvance;
            }

            const obj = await DetalleAreaTrabajoDAO.updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario, estado);
            if (!obj) {
                const errorObj = new Error("No se encontró el detalle de area de trabajo");
                errorObj.status = 404;
                throw errorObj;
            }
            return obj;
        } catch (error) {
            throw error.status?error:{ status: 500, message: "Error en Detalle Area Trabajo" };
        }
    },

    /*async updateidAreaTrabajo(codigoPedido){
        try{
            if (!codigoPedido) throw { status: 400, message: "Codigo de pedido es requerido" };

            const DetalleAreaTrabajo = await this.getDetalleAreaTrabajo(codigoPedido);
            if (!DetalleAreaTrabajo || DetalleAreaTrabajo.length === 0) 
                throw { status: 404, message: "No se encontraron detalles del área de trabajo" };

            const todosCompletos =  DetalleAreaTrabajo.every(detalle => detalle.Estado === 1);
            if(todosCompletos){
                let nuevoIdAreaTrabajo;
                const areaTrabajoActual = DetalleAreaTrabajo[0].Area_trabajo_idArea_trabajo;
                console.log("areaTrabajoActual",areaTrabajoActual); 
                switch(areaTrabajoActual){
                    case 1 : nuevoIdAreaTrabajo = 2; break;
                    case 2 : nuevoIdAreaTrabajo = 3; break;
                    case 3 : nuevoIdAreaTrabajo = 4; break;
                    case 4 : 
                        const DetallePedidoService = require("./DetallePedidoService");
                        await DetallePedidoService.updateEstado(codigoPedido,"Finalizado");
                        return {message: "El pedido a finalizado"};
                    default: throw { status: 400, message: "idAreaTrabajo no válido" }; 
                }
                
                await Promise.all(
                    DetalleAreaTrabajo.map(detalle =>
                        DetalleAreaTrabajoDAO.updateidAreaTrabajo(nuevoIdAreaTrabajo, detalle.Caracteristicas_idCaracteristicas))
                );

                return { message: "II: Se actualizó correctamente el área de trabajo", nuevoIdAreaTrabajo };
            }
            
            return { message: "No se actualizó el área de trabajo porque al menos un estado es 0" };
        }catch(error){
            if (error.status) throw error;
            throw { status: 500, message: "Error en DetalleAreaTrabajo", detalle: error.message };
        }
    },*/

};

module.exports = DetalleAreaTrabajoService;
