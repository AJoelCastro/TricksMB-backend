const AreaTrabajoService = require('../services/AreaTrabajoService');

const AreaTrabajoController = {
    async createAreaTrabajo(req, res, next) {
        try {
            const { nombre } = req.body;
            const areaTrabajo = await AreaTrabajoService.createAreaTrabajo(nombre);
            res.json({ areaTrabajo, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getAreaTrabajobyNombre(req, res, next) {
        try {
            const { nombre } = req.params;
            const areaTrabajo = await AreaTrabajoService.getAreaTrabajoByNombre(nombre);
            res.json({ areaTrabajo, status: 200 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = AreaTrabajoController;
