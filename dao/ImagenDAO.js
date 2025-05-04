const db = require('../config/db');

class ImagenDAO {
    static async createImagen(idModelo, url){
        try{
            const query = `INSERT INTO Imagen (Modelo_idModelo, url) VALUES (?,?)`;
            const [result] = await db.execute(query,[idModelo,url]);
            if(result.affectedRows === 0){
                const errorImagen= new Error("Error al crear la imagen");
                errorImagen.status = 400;
                throw errorImagen;
            }
            return result;
        }catch(error){
            throw {status: 500, message: "Error interno del servidor al crear la imagen"};
        }
    }
    static async getImagen(idModelo){
        try{
            const query = `SELECT * FROM Imagen WHERE Modelo_idModelo = ?`;
            const [rows] = await db.execute(query,[idModelo]);
            return rows;
        } catch(error){
            throw {status: 500, message: "Error interno del servidor al obtener las imagenes"};
        }
    }
}

module.exports = ImagenDAO