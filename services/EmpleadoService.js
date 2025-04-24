const EmpleadoDAO = require('../dao/EmpleadoDAO');

const EmpleadoService = {

    async createEmpleado(idAreaTrabajo, nombre, telefono, dni){
        try{
            if(!idAreaTrabajo) throw {status: 400, message: "idAreaTrabajo requerido para crear empleado"};
            if(!nombre) throw {status: 400, message: "nombre requerido para crear empleado"};
            if(!telefono) throw {status: 400, message: "telefono requerido para crear empleado"};
            if(!dni) throw {status: 400, message: "dni requerido para crear empleado"};

            return await EmpleadoDAO.createEmpleado(
            idAreaTrabajo,
            nombre,
            telefono,
            dni
            );
        } catch(error){
            throw error;
        }
    },

    async getByDni(dni){
        try{
            if(!dni)    
                throw {status: 400, message: "dni requerido para buscar empleado"};
            return await EmpleadoDAO.getByDni(dni);
        } catch(error){
            throw error;
        }
    },

    async getEmpleados(nomArea){
        try{
            if(!nomArea) {
                const errorNomArea = new Error("nombre de area requerido para buscar empleados");
                errorNomArea.status = 400;
                throw errorNomArea;
            };

            const AreaTrabajoService = require('./AreaTrabajoService');
            const {idArea_trabajo} = await AreaTrabajoService.getAreaTrabajoByNombre(nomArea);

            if(!idArea_trabajo) {
                const errorIdArea = new Error("No se encontró el area de trabajo");
                errorIdArea.status = 404;
                throw errorIdArea;
            }

            return await EmpleadoDAO.getEmpleados(idArea_trabajo);
        } catch(error){
            throw error.status? error: { status: 500, message: "Error interno en el servicio." };
        }
    }
}

module.exports = EmpleadoService;