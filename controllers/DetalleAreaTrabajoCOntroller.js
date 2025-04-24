const DetalleAreaTrabajoService = require('../services/DetalleAreaTrabajoService');

const DetalleAreaTrabajoController = {
    async createDetalleAreaTrabajo(req, res, next) {
        try {
            const { nomArea, codigoPedido } = req.body;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.createDetalleAreaTrabajo(nomArea, codigoPedido);
            res.json({ detallesAreaTrabajo, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getDetalleAreaTrabajo(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const detallesAreaTrabajo = await DetalleAreaTrabajoService.getDetalleAreaTrabajo(codigoPedido);
            res.json({ detallesAreaTrabajo, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async updateDetalleAreaTrabajo(req, res, next) {
        try {
            const { idCaracteristicas } = req.params;
            const { cantidadAvance, comentario, estado } = req.body;
            const detalleAreaTrabajo = await DetalleAreaTrabajoService.updateDetalleAreaTrabajo(
                idCaracteristicas,
                cantidadAvance,
                comentario,
                estado
            );
            res.json({ detalleAreaTrabajo, status: 200 });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = DetalleAreaTrabajoController;
