const ImagenDAO = require('../dao/ImagenDAO');

const ImagenService = {

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
            throw error.status ? error : {status: 500, message: "Error en Modelo Service"};
        }
    }
}

module.exports = ImagenService;