const ImagenService = require('../services/ImagenService');

const ImagenController = {
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
