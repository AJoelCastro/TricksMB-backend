const db='../config/db.js';

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
            console.log(idRol);
            const query = 'SELECT * FROM rol WHERE idRol = ?';
            const [rows] = await db.execute(query, [idRol]);
            console.log(rows);
            return rows;
        } catch (error) {
            throw error.status ? error : new Error('Error al obtener el rol');
        }
    }
}
module.exports = RolDAO;