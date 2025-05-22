const db = require('../config/db');

class RolDAO {
    static async createRol(nombreRol) {
        try {
            const query = 'INSERT INTO rol (Nombre) VALUES (?)';
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
            return rows[0];
        } catch (error) {
            throw error.status ? error : new Error('Error al obtener el rol');
        }
    }
    static async getAllRols() {
        try {
            const rows = await db.execute('SELECT * FROM rol');
            return rows;
        } catch (error) {
            throw error.status ? error : new Error('Error al obtener los roles');
        }
    }

    static async updateRol(idRol, nombreRol) {
        try {
            const query = 'UPDATE rol SET Nombre = ? WHERE idRol = ?';
            const [result] = await db.execute(query, [nombreRol, idRol]);
            if (result.affectedRows === 0) {
                const errorData = new Error("Rol no encontrado");
                errorData.status = 404;
                throw errorData; // Lanza la excepción
            }
            return { id: idRol, nombreRol };
        } catch (error) {
            throw error.status ? error : new Error('Error al actualizar el rol');
        }
    }
}
module.exports = RolDAO;