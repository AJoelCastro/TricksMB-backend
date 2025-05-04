const TipoAlmacenService = require('../services/TipoAlmacenService.js');
const TipoAlmacenController = {
    createTipoAlmacen: async (req, res, next) => {
        try {
            const { nombre } = req.body;
            const salida = await TipoAlmacenService.createTipoAlmacen(nombre);
            res.json({salida, status: 201});
        } catch (error) {
            next(error);
        }
    },
    getAllTipoAlmacen: async (req, res, next) => {
        try {
            const salida = await TipoAlmacenService.getTiposAlmacen();
            res.json({salida, status: 200});
        }catch(error){
            next(error);
        }
    }
};

module.exports = TipoAlmacenController;