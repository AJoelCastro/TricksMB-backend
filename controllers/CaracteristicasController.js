const CaracteristicasService = require('../services/CaracteristicasService');

const CaracteristicasController = {
    async createCaracteristica(req, res, next) {
        try {
            let { idDetallePedido, talla, cantidad, color } = req.body;

            const convertirNumero = (valor, nombreCampo) => {
                const numero = Number(valor);
                if (isNaN(numero)) {
                    return res.status(400).json({ error: `El campo ${nombreCampo} debe ser un número`, status: 400 });
                }
                return numero;
            };

            talla = convertirNumero(talla, "talla");
            cantidad = convertirNumero(cantidad, "cantidad");

            const caracteristica = await CaracteristicasService.createCaracteristicas(
                idDetallePedido,
                talla,
                cantidad,
                color
            );
            res.json({caracteristica, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getCaracteristicas(req, res, next) {
        try {
            const { idDetallePedido } = req.params;
            const caracteristicas = await CaracteristicasService.getCaracteristicasByIdDetallePedido(idDetallePedido);
            res.json({ caracteristicas, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async editCaracteristicas(req, res, next) {
        try {
            const { idCaracteristicas, talla, cantidad, color } = req.body;
            const caracteristica = await CaracteristicasService.editCaracteristicas(
                idCaracteristicas,
                talla,
                cantidad,
                color
            );
            res.json({caracteristica, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async deleteCaracteristicas(req, res, next) {
        try {
            const { idCaracteristicas } = req.params;
            const result = await CaracteristicasService.deleteCaracteristicas(idCaracteristicas);
            res.json({ result, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getCaracteristica(req, res, next) {
        try {
            const { idCaracteristicas } = req.params;
            const caracteristica = await CaracteristicasService.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
            res.json({ caracteristica, status: 200 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = CaracteristicasController;
