const { getDetalleAlmacen, updateCantidadSalida } = require('../dao/DetalleAlmacenDAO');
const DetalleAlmacenService = require('../services/DetalleAlmacenService');

const DetalleAlmacenController = {

    async getDetalleAlmacen(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detalleAlmacen = await DetalleAlmacenService.getDetalleAlmacen(codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateIdAlmacen(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const { nombreAlmacen } = req.body;
            const detalleAlmacen = await DetalleAlmacenService.updateIdAlmacen(nombreAlmacen, codigoPedido);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateCantidadIngreso(req, res, next) {
        try{
            const { codigoPedido } = req.params; 
            const { cantidad } = req.body;
            const detalleAlmacen = await DetalleAlmacenService.updateCantidadIngreso(codigoPedido, cantidad);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateCantidadSalida(req, res, next) {
        try{
            const { codigoPedido } = req.params; 
            const { cantidad } = req.body;
            const detalleAlmacen = await DetalleAlmacenService.updateCantidadSalida(codigoPedido, cantidad);
            res.json({ detalleAlmacen, status: 200 });
        } catch (error) {
            next(error);
        }
    },
}

module.exports = DetalleAlmacenController