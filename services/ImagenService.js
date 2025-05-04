const ImagenDAO = require('../dao/ImagenDAO');

const ImagenService = {
    async createImagen(idModelo, url){
        try{
            if(!idModelo || !url) {
                const errorIdModelo = new Error("idModelo y url requeridos");
                errorIdModelo.status = 400;
                throw errorIdModelo;
            };
            const imagen = await ImagenDAO.createImagen(idModelo, url);
            return imagen;
        } catch(error){
            throw error.status ? error : {status: 500, message: "Error en Imagen Service al crear la imagen"};
        }
    },
    async getImagen(idModelo){
        try{
            if(!idModelo) {
                const errorIdModelo = new Error("idModelo requerido");
                errorIdModelo.status = 400;
                throw errorIdModelo;
            };
            
            const imagen = await ImagenDAO.getImagen(idModelo);

            return imagen;
        } catch(error){
            throw error.status ? error : {status: 500, message: "Error en Imagen Service al obtener las imagenes"};
        }
    }
}

module.exports = ImagenService;