const TipoCalzadoDAO = require('../dao/TipoCalzadoDAO');

const TipoCalzadoService = {


    async createTipoModelo(nombre){
        try{
            if(!nombre) throw { status: 400, message: "Nombre es requerido" };
            return await TipoCalzadoDAO.createTipoModelo(nombre);
        }catch(error){
            throw error;
        }
    },
    async getAllTipoCalzado(){
        try{
            return await TipoCalzadoDAO.getAllTipoCalzado();
        }catch(error){
            throw error;
        }
    },

    async getTipoCalzadoByNombre(nombre){
        try{
            const calzado =  await TipoCalzadoDAO.getTipoCalzadoByNombre(nombre);
            if(!calzado){
                return res.status(404).json({ error: "Tipo de calzado no encontrado" });
            }else{
                return calzado;
            }
        }catch(error){
            throw error;
        }
    },

    async getTipoCalzadoByCodigoPedido(codigoPedido){
        try{
            return await TipoCalzadoDAO.getTipoCalzadoByCodigoPedido(codigoPedido);
        }catch(error){
            throw error.status? error: { status: 500, message: "Error al obtener el tipo de calzado" };
        }
    }

}

module.exports = TipoCalzadoService;