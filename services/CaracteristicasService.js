const CaracteristicasDAO = require('../dao/CaracteristicasDAO');

const CaracteristicasService = {
    async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            if(!idDetallePedido || !talla || !cantidad || !color) throw {status: 400, message: "Parametros incorrectos"};

            if(cantidad <= 0 || talla<=0) throw {status: 400, message: "Cantidad, talla o altura deben ser mayores a 0"};
            
            if (!Number.isInteger(cantidad) || !Number.isInteger(talla)) {
                throw { status: 400, message: "Cantidad y talla deben ser números enteros válidos" };
            }
            return await CaracteristicasDAO.createCaracteristicas(idDetallePedido, talla, cantidad, color);
        }catch(error){
            throw error;
        }
    },

    async getCaracteristicasByIdDetallePedido(idDetallePedido){
        try{
            if(!idDetallePedido){
                const errorIdDetallePedido = new Error("El id del detalle de pedido es requerido");
                errorIdDetallePedido.status = 400;
                throw errorIdDetallePedido;
            }
            return await CaracteristicasDAO.getCaracteristicasByIdDetallePedido(idDetallePedido);
        }catch(error){
            throw error.status?error: {status: 500, message: error.message};
        }
    },

    async editCaracteristicas(idCaracteristicas, talla, cantidad, color){
        try{
            if(!idCaracteristicas || !talla || !cantidad || !color) throw {status: 400, message: "Parametros incorrectos"}
            if(cantidad <= 0 || talla<=0) throw {status: 400, message: "Cantidad, talla o altura deben ser mayores a 0"};

            if (!Number.isInteger(cantidad) || !Number.isInteger(talla)) {
                throw { status: 400, message: "Cantidad y talla deben ser números enteros válidos" };
            }

            return await CaracteristicasDAO.editCaracteristicas(idCaracteristicas, talla, cantidad, color);
        }catch(error){
            throw error;
        }
    },

    async deleteCaracteristicas(idCaracteristicas){
        try{
            if(!idCaracteristicas) throw {status: 400, message: "Parametros incorrectos"};
            return await CaracteristicasDAO.deleteCaractericticas(idCaracteristicas);
        }catch(error){
            throw error;
        }
    },

    async getCaracteristicaByIdCaracteristicas(idCaracteristicas){
        try{
            if(!idCaracteristicas){
                const errorIdCaracteristicas = new Error("El id de la caracteristica es requerido");
                errorIdCaracteristicas.status = 400;
                throw errorIdCaracteristicas;
            };
            return await CaracteristicasDAO.getCaracteristicaByIdCaracteristicas(idCaracteristicas);
        }catch(error){
            throw error.status?error:{status: 500, message: "Error interno en el servicio."};
        }
    },

    async getAllCaracteristicas(){
        try{
            return await CaracteristicasDAO.getAllCaracteristicas();
        }catch(error){
            throw error.status?error:{status: 500, message: "Error interno en el servicio."};
        }
    }

}

module.exports = CaracteristicasService;