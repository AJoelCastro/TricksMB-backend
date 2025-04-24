const db = require('../config/db');
const PedidoService = require('../services/PedidoService');

class CaracteristicasDAO {

    static async createCaracteristicas(idDetallePedido, talla, cantidad, color){
        try{
            const query = 'INSERT INTO Caracteristicas (Detalle_pedido_idDetalle_pedido, Talla, Cantidad, Color) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [idDetallePedido, talla, cantidad, color]);
            return { idCaracteristicas: result.insertId, idDetallePedido, talla, cantidad, color };
        }catch(error){
            throw error;
        }
    }

    static async getCaracteristicasByIdDetallePedido(idDetallePedido){
        try{
            const query = 'SELECT * FROM Caracteristicas WHERE Detalle_pedido_idDetalle_pedido = ?';
            const [result] = await db.execute(query, [idDetallePedido]);
            if(result.length === 0){
                const errorCaracteristicas = new Error("No se encontraron características para el detalle de pedido proporcionado.");
                errorCaracteristicas.status = 404;
                throw errorCaracteristicas;
            }
            return result;
        }catch(error){
            throw error.status?error: {status: 500, message: "Error al obtener características por id del detalle de pedido"};
        }
    }

    static async editCaracteristicas(idCaracteristicas, talla, cantidad, color){
        try{
            const query = `UPDATE Caracteristicas SET Talla = ?, Cantidad = ?, Color = ?
            WHERE idCaracteristicas = ?`;
            
            const [result] = await db.execute(query, [talla, cantidad, color,idCaracteristicas]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontró la caracteristica con el id proporcionado.");
            }

            return { message: "Características editadas correctamente." };
        }catch(error){
            throw error;
        }
    }

    static async deleteCaractericticas(idCaracteristicas){
        try{
            const query = 'DELETE FROM Caracteristicas WHERE idCaracteristicas = ?';
            const [result] = await db.execute(query, [idCaracteristicas]);
            if (result.affectedRows === 0) {
                throw new Error("No se encontró la caracteristica con el id proporcionado.");
            }
            return { message: "Caracteristica eliminada correctamente." };
        }catch(error){
            throw error;
        }
    }

    static async getCaracteristicaByIdCaracteristicas(idCaracteristicas){
        try{
            const query = 'SELECT * FROM Caracteristicas WHERE idCaracteristicas = ?';
            const [result] = await db.execute(query, [idCaracteristicas]);
            if(result.length === 0){
                const errorCaracteristica = new Error("No se encontró la caracteristica con el id proporcionado.");
                errorCaracteristica.status = 404;
                throw errorCaracteristica;
            }
            return result[0];
        }catch(error){
            throw error.status?error:{status: 500, message: "Error interno al obtener la caracteristica del servidor."};
        }
    }

    static async getAllCaracteristicas(){
        try{
            const query = 'SELECT * FROM Caracteristicas';
            const [result] = await db.execute(query);
            return result;
        }catch(error){
            throw error.status?error:{status: 500, message: "Error interno al obtener las caracteristicas del servidor."};
        }
    }
}

module.exports = CaracteristicasDAO;