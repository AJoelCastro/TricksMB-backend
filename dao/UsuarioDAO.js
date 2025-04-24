const db = require('../config/db'); // Asegúrate de tener tu conexión a la base de datos configurada

class UsuarioDAO {
    static async createUser(idEmpleado, correo, contrasenia) {
        try {
            const query = 'INSERT INTO usuario (Empleado_idEmpleado, Correo, Contrasenia) VALUES (?, ?, ?)';
            const [result] = await db.execute(query, [idEmpleado, correo, contrasenia]);
            return { id: result.insertId, correo };
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    }

    static async encUser(correo) {
        try {
            const query = 'SELECT * FROM usuario WHERE Correo = ?';
            const [rows] = await db.execute(query, [correo]);
            
            // Corrección: Verificar si `rows` está vacío
           // if (!rows.length) {
               // console.log("No se encontró ningún usuario con el correo proporcionado.");
                //return null;
            //}

            return rows[0];
        } catch (error) {
            console.error("Error al buscar usuario por correo:", error);
            throw error;
        }
    }

    static async getByCorreo(correo) {
        try {
            const query = 'SELECT * FROM usuario WHERE Correo = ?';
            const [rows] = await db.execute(query, [correo]);

            return rows[0];
        } catch (error) {
            console.error("Error al buscar usuario por Correo:", error);
            throw error;
        }
    }
}

module.exports = UsuarioDAO;
