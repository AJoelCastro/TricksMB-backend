const db = require('../config/db');

class TipoCalzadoDAO{

    static async createTipoModelo(nombre){
        try{
            const query = `INSERT INTO Tipo (Nombre) VALUES (?)`;
            const [rows] = await db.execute(query, [nombre]);
            return {idTipo: rows.insertId, nombre};
        } catch(error){
            console.error("Errror al crear el tipo de calzado", error);
            throw error;
        }
    }
    static async getAllTipoCalzado(){
        try{
            const query = 'SELECT * FROM Tipo';
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            console.error("Error al obtener tipos de calzado:", error);
            throw error;
        }
    }

    static async getTipoCalzadoByNombre(nombre){
        try{
            const query = 'SELECT * FROM Tipo WHERE Nombre = ?';
            const [rows] = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error("Error al obtener tipo de calzado por ID:", error);
            throw error;
        }
    }

    static async getTipoCalzadoByCodigoPedido(codigoPedido) {
        try {
            const query = `
                SELECT t.Nombre 
                FROM Detalle_pedido dp
                JOIN Modelo m ON dp.Modelo_idModelo = m.idModelo
                JOIN Tipo t ON m.Tipo_idTipo = t.idTipo
                WHERE dp.Codigo_pedido = ?`;

            const [rows] = await db.execute(query, [codigoPedido]);

            if (rows.length === 0) {
                const errorRows = new Error("No se encontró el tipo de calzado con el código proporcionado.");
                errorRows.status = 404;
                throw errorRows;
            }

            return rows[0]; // Devuelve el objeto con el nombre del tipo de calzado
        } catch (error) {
            throw error.status? error: { status: 500, message: "Error internoal obtener el tipo de calzado" };
        }
    }
    
}

module.exports = TipoCalzadoDAO;