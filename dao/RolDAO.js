const db = require('../config/db');

class RolDAO {
    static async createRol(nombreRol) {
        try {
            const query = 'INSERT INTO rol (NombreRol) VALUES (?)';
            const [result] = await db.execute(query, [nombreRol]);
            return { id: result.insertId, nombreRol };
        } catch (error) {
            throw error.status ? error : new Error('Error al crear el rol');
        }
    }

    static async getRolById(idRol) {
        try {
            const rows = await db.execute(`SELECT * FROM Rol WHERE idRol = ?`, [idRol]);
            if (rows.length === 0) {
                const errorData = new Error("Rol no encontrado");
                errorData.status = 404;
                throw errorData; // Lanza la excepció
            }
            console.log("Rol rows",rows);
            return rows;
        } catch (error) {
            throw error.status ? error : new Error('Error al obtener el rol');
        }
    }
}
module.exports = RolDAO;