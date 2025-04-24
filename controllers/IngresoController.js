const IngresoService = require("../services/IngresoService");

const IngresoController = {
    async createIngreso(req, res, next) {
        try {
            const { idCaja, codigoPedido } = req.body;
            const ingreso = await IngresoService.createIngreso(idCaja, codigoPedido);
            res.json({ ingreso, status: 201 });
        } catch (error) {
            next(error);
        }
    },
    async getIngresosByCaja(req, res, next) {
        try {
            const { idCaja } = req.params;
            const ingreso = await IngresoService.getIngresosByCaja(idCaja);
            //Aqui retorna NULL o el OBJETO para que el frontend pueda saber que la caja ha sido o no ingresada al almacén
            return res.json({ ingreso, status: 201 });
        } catch (error) {
            next(error);
        }
    },

}

module.exports = IngresoController