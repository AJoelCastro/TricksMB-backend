const CajaDAO = require("../dao/CajaDAO");
const PdfService = require("./PdfService");
const db = require("../config/db");


const CajaService = {
    async createCaja(codigoPedido) {
        const DetallePedido = require("./DetallePedidoService");
        const Caracteristica = require("./CaracteristicasService");
        const DetallPedidoService = require("./DetallePedidoService");
        const ModeloService = require("./ModeloService");
        const TipoCalzadoService = require("./TipoCalzadoService");
        try {

            // Obtener detalle del pedido
            const { idDetalle_pedido } = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);

            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(idDetalle_pedido);

            const cajas = [];
            for (const caracteristica of caracteristicas) {
                console.log(caracteristica);
                const detallePedido= await DetallPedidoService.getDetallePedidoByidDetallePedido(caracteristica.Detalle_pedido_idDetalle_pedido);
                console.log(detallePedido);
                const modelo= await ModeloService.getModeloById(detallePedido.Modelo_idModelo);
                const tipoCalzado= await TipoCalzadoService.getTipoCalzadoByCodigoPedido(detallePedido.Codigo_pedido);
                for (let i = 0; i < caracteristica.Cantidad; i++) {
                    const caja = await CajaDAO.createCaja(caracteristica.idCaracteristicas);
                    if(!caja){
                        const error = new Error("Error al crear la caja");
                        error.status = 400;
                        throw error;
                    }
                    caja.talla=caracteristica.Talla;
                    caja.color=caracteristica.Color;
                    caja.codigoPedido=detallePedido.Codigo_pedido;
                    caja.modelo=modelo.Nombre;
                    caja.tipoCalzado=tipoCalzado.Nombre;
                    cajas.push(caja);
                }
            }

            const pdfBuffer = await PdfService.generatePDF(cajas);
            await PdfService.sendPDFToTelegram(pdfBuffer, `Cajas_Pedido_${codigoPedido}.pdf`);

            return {status: 200, message: "Cajas creadas y PDF enviado por telegram."};
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error interno en la creación de cajas." };
        }
    },

    async getAllCajaByPedido(codigoPedido){
        try{
            const DetallePedido = require("./DetallePedidoService");
            const Caracteristica = require("./CaracteristicasService");

            const {idDetalle_pedido} = await DetallePedido.getDetallePedidoByCodigoPedido(codigoPedido);
            if(!idDetalle_pedido) throw {status: 404, message: "No se encontró el detalle de pedido"};

            const caracteristicas = await Caracteristica.getCaracteristicasByIdDetallePedido(idDetalle_pedido);
            if(caracteristicas.length === 0) throw {status: 404, message: "No se encontraron caracteristicas"};
            
            const cajas = await Promise.all(caracteristicas.map(async (caracteristica) => {
                try {
                    return await CajaDAO.getAllCajaByPedido(caracteristica.idCaracteristicas);
                } catch (error) {
                    console.error(`Error obteniendo cajas para característica ${caracteristica.idCaracteristicas}:`, error);
                    return [];
                }
            }));
            console.log("cajas:",cajas);
            return cajas.flat();
        }catch(error){
            console.error("Error al obtener cajas por pedido:", error);
            throw error;
        }
    },

    async getCajaById(idCaja) {
        
        const CaracteristicasService = require("./CaracteristicasService");
        const DetallePedidoService = require("./DetallePedidoService");
        const ModeloService = require("./ModeloService");
        const TipoCalzadoService = require("./TipoCalzadoService");
        const imagenService = require("./ImagenService");
        try {
            if (!idCaja || typeof idCaja !== "number") {
                const erroridCaja = new Error("ID de caja inválido");
                erroridCaja.status = 400;
                throw erroridCaja;
            };
            const caja = await CajaDAO.getCajaById(idCaja);

            if (!caja) {
                const errorCaja = new Error("Caja no encontrada");
                errorCaja.status = 404;
                throw errorCaja;
            };
            
            const caracteristica = await  CaracteristicasService.getCaracteristicaByIdCaracteristicas(
                caja.Caracteristicas_idCaracteristicas);

            const detallePedido = await DetallePedidoService.getDetallePedidoByidDetallePedido(
                caracteristica.Detalle_pedido_idDetalle_pedido);

            const modelo = await ModeloService.getModeloById(detallePedido.Modelo_idModelo);
            const imagen = await imagenService.getImagen(detallePedido.Modelo_idModelo);
            const tipoCalzado = await TipoCalzadoService.getTipoCalzadoByCodigoPedido(detallePedido.Codigo_pedido);

            return {
                idCaja: caja.idCaja,
                codigoPedido: detallePedido.Codigo_pedido,
                modelo: modelo.Nombre,
                tipoCalzado: tipoCalzado.Nombre,
                imagenUrl: imagen[0].Url,
                talla: caracteristica.Talla,
                color: caracteristica.Color,
                fechaCreacion: new Date(caja.Fecha_creacion).toISOString().split('T')[0]
            };

        } catch (error) {
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
}

}; 

module.exports = CajaService;