const AreaTrabajoDAO = require('../dao/AreaTrabajoDAO');

const AreaTrabajoService = {
    async createAreaTrabajo(nombre){
        try{
            if(!nombre) throw {status: 400, message: "Nombre requerido para crear area de trabajo"};
            return await AreaTrabajoDAO.createAreaTrabajo(nombre);
        } catch(error){
            throw error;
        }
    },

    async getAreaTrabajoByNombre(nombre){
        try{
            if(!nombre) throw {status: 400, message: "Parametros incorrectos incorrecto"};
            const areaTrabajo = await AreaTrabajoDAO.getByNombre(nombre);
            if(!areaTrabajo)
                throw {status: 404,message:"Area de trabajo no encontrado"};
            return areaTrabajo[0];
        } catch(error){
            throw error;
        }
    }
};

module.exports = AreaTrabajoService;