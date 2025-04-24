const PedidoService = require('../services/PedidoService');
const DetallePedidoService = require('../services/DetallePedidoService');
const ModeloService = require('../services/ModeloService');
const ClienteService = require('../services/ClienteService');
const { updateCantidad } = require('../dao/DetallePedidoDAO');

const DetallePedidoController = {
    async createPedido(req, res, next) {
        try {
            let { 
                clienteTipo, fechaEntrega, serieInicio, serieFinal, nomModelo, nombreTaco, 
                alturaTaco, material, tipoMaterial, suela, accesorios, forro 
            } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) throw new Error(`${nombreCampo} debe ser un número válido`);
                return numero;
            };

            serieInicio = convertirNumero(serieInicio, "serieInicio");
            serieFinal = convertirNumero(serieFinal, "serieFinal");
            alturaTaco = convertirNumero(alturaTaco, "alturaTaco");

            const { idCliente } = await ClienteService.getCliente(clienteTipo);
            const { idModelo } = await ModeloService.getModeloByNombre(nomModelo);
            const { idPedido } = await PedidoService.createPedido(idCliente, fechaEntrega, serieInicio, serieFinal);

            const fecha = new Date();
            const fechaStr = fecha.toISOString().split("T")[0];
            const codigoPedido = `COD${fechaStr}${idPedido}`;

            const detallePedido = await DetallePedidoService.createDetallePedido(
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material, 
                tipoMaterial, suela, accesorios, forro
            );

            res.json({ detallePedido, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getDetallePedidoByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detallePedido = await DetallePedidoService.getDetallePedidoByCodigoPedido(codigoPedido);
            res.json({ detallePedido, status:200 });
        } catch (error) {
            next(error);
        }
    },

    async updateDetallePedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro } = req.body;

            const detallePedido = await DetallePedidoService.updateDetallePedido(
                codigoPedido, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro
            );
            res.json({ detallePedido, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateEstado(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { estado } = req.body;
            const detallePedido = await DetallePedidoService.updateEstado(codigoPedido, estado);
            res.json({ detallePedido, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getAllCodigosPedidos(req, res, next) {
        try {
            const detallesPedidos = await DetallePedidoService.getAllCodigosPedidos();
            res.json({ detallesPedidos, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getHistorialPedidos(req, res, next){
        try{
            const historialPedidos = await DetallePedidoService.getHistorialPedidos();
            res.json({historialPedidos, status: 200});
        }catch(error){
            next(error);
        }
    },

    async updateCantidad(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detallePedido = await DetallePedidoService.updateCantidad(codigoPedido);
            res.json({ detallePedido, status: 200 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = DetallePedidoController;
