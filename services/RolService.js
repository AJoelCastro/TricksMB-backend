const RolDAO = require('../dao/RolDAO');

const RolService = {

    async createRol(nombre) {
        try {
            return await RolDAO.createRol(nombre);
        } catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al crear el Rol' };
        }
    },
    
};

module.exports = RolService;