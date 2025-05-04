const ImagenService = require('../services/ImagenService');

const ImagenController = {
    async createImagen(req, res, next) {
        try {
            const { idModelo, url } = req.params;
            const imagen = await ImagenService.createImagen(idModelo, url);
            res.json({ imagen, status: 201 });
        } catch (error) {
            next(error);
        }
    },
    async getImagen(req, res, next) {
        try {
            const { idModelo } = req.params;
            const imagen = await ImagenService.getImagen(idModelo);
            res.json({ imagen, status: 200 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ImagenController;
