const TipoAlmacenDAO = require("../dao/TipoAlmacenDAO")

const TipoAlmacenService = {
    createTipoAlmacen: async (nombre) => {
        try {
            if(!nombre){
                const errorNombre = new Error("El nombre del tipo de almacen es requerido");
                errorNombre.status = 400;
                throw errorNombre;
            }
            return await TipoAlmacenDAO.createTipoAlmacen(nombre);
        }catch(error){
            throw error.status? error : {status: 500, message: "Error en Tipo Almacen Service"};
        }
    }
}

module.exports = TipoAlmacenService;