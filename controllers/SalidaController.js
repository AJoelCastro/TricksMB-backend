const SalidaService = require('../services/SalidaService.js');
const SalidaController = {
    createSalida: async (req, res, next) => {
        try {
            const { idCaja } = req.params;
            const { codigoPedido } = req.body;
            const salida = await SalidaService.createSalida(idCaja, codigoPedido);
            res.json({salida, status: 200});
        } catch (error) {
            next(error);
        }
    },
    getSalidasByCaja: async (req, res, next) => {
        try {
            const { idCaja } = req.params;
            const salida = await SalidaService.getSalidasByCaja(idCaja);
            //Aqui retorna NULL o el OBJETO para que el frontend pueda saber que la caja ha sido o no ingresada al almacén
            return res.json({ salida, status: 201 });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = SalidaController;