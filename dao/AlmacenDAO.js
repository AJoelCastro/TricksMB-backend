const db = require('../config/db');

class AlmacenDAO {

    static async createAlmacen (nombre, imagen, direccion){
        try{
            const query = `INSERT INTO Almacen (Nombre, Imagen, Direccion) VALUE (?, ?, ?)`;
            const [result] = await db.execute(query, [nombre, imagen, direccion]);
            if(result.affectedRows === 0){
                throw new Error("No se pudo crear el Almace")
            }
            return { message: result.insertId, nombre, imagen,  direccion};
        }catch(error){
            console.error("Error al crear el tipo de almacen", error);
            throw error;
        }
    }

    static async getAlmacen(nombre){
        try{
            const [result] = await db.execute(`SELECT * FROM Almacen WHERE Nombre = ?`,[nombre])
            if(result.affectedRows === 0){
                const errorAlmacen = new Error("No se pudo obtener el almacen");
                errorAlmacen.status = 404;
                throw errorAlmacen;
            }
            return result[0];
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error interno del servidor al obtener el almacen"};
        }
    }

    static async getAlmacenById(idAlmacen){
        try{

            const [result] = await db.execute(`SELECT * FROM Almacen WHERE idAlmacen = ?`, [idAlmacen]);

            if(result.affectedRows === 0){
                const errorAlmacen = new Error("No se pudo obtener el almacen");
                errorAlmacen.status = 404;
                throw errorAlmacen;
            }

            return result[0];

        }catch(error){
            throw error.status ? error : {status: 500, message: "Error interno del servidor al obtener el almacen"};
        }
    }

    static async getAllAlmacen(){
        try{
            const [result] = await db.execute(`SELECT * FROM Almacen`);
            return result;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error interno del servidor al obtener los almacenes"};
        }
    }

    static async updateStock(idAlmacen, cantidad){
        try{
            const [result] = await db.execute(`UPDATE Almacen SET Stock = ? WHERE idAlmacen = ?`,
                [cantidad, idAlmacen])

            if (result.affectedRows === 0) {
                const errorAlmacen = new Error("No se encontró el almacén");
                errorAlmacen.status = 404;
                throw errorAlmacen;
            }

            if (result.changedRows === 0) {
                const errorStock = new Error("El stock ya tenía el mismo valor. No se realizaron cambios.");
                errorStock.status = 400;
                throw errorStock;
            }

            return {message:"Se actualizo el stock del almacen"}
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error interno del servidor al actualizar el stock"};
        }
    }
}

module.exports = AlmacenDAO