const db = require('../config/db');

class ModeloDAO{

    static async createModelo(idTipo, nombre){
        try{
            const query = `INSERT INTO Modelo (Tipo_idTipo, Nombre) VALUES (?, ?)`;
            const [rows] = await db.execute(query,[idTipo, nombre])
            return {idModelo: rows.insertId, idTipo, nombre};
        }catch(error){
            throw {status: 500, message: "Error al crear el modelo"};
        }
    }

    static async getAllModelo(){
        try{
            const query = 'SELECT * FROM Modelo';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            throw error;
        }
    }

    static async getModeloByNombre(nombre){
        try{
            const query = 'SELECT * FROM Modelo WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            if(rows.length === 0){
                const errorRows = new Error("Modelo no encontrado");
                errorRows.status = 404;
                throw errorRows;
            };
            return rows[0];
        }catch(error){
            throw error.status ? error : {status:500, message:"Error interno al buscar modelo por nombre"};
        }
    }
    static async getAllModeloById(id){
        try{
            const query = 'SELECT * FROM Modelo WHERE Tipo_idTipo = ?';
            const [rows] = await db.execute(query, [id]);
            if(rows.length === 0){
                const errorRows = new Error("No hay modelos registrados para el id proporcionado");
                errorRows.status = 404;
                throw errorRows;
            };
            return rows;
        }catch(error){
            throw error.status ? error : {status:500, message:"Error interno al buscar modelo por id"};
        }
    }

    static async getModeloByCodigoPedido(codigoPedido){
        try{
            const query = 'SELECT Modelo_idModelo FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(query, [codigoPedido]);
            
            if (rows.length === 0) {
                throw new Error("No se encontró el modelo con el código proporcionado.");
            }

            const idModelo = rows[0].Modelo_idModelo;

            const queryModelo = 'SELECT * FROM Modelo WHERE idModelo = ?';
            const [result] = await db.execute(queryModelo, [idModelo]);

            if (result.length === 0) {
                throw new Error("No se encontró un modelo con el código proporcionado.");
            }

            return result[0];
        }catch(error){
            throw error;
        }
    }

    static async getModeloById(idModelo){
        try{
            const query = 'SELECT * FROM Modelo WHERE idModelo = ?';
            const [rows] = await db.execute(query, [idModelo]);
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    static async getAllDetallesPedidosByModelo(idModelo){
        try{
            const query = 'SELECT * FROM Detalle_pedido WHERE Modelo_idModelo = ?';
            const [rows] = await db.execute(query, [idModelo]);
            return rows;
        }catch(error){
            throw error;
        }
    }
}

module.exports = ModeloDAO;