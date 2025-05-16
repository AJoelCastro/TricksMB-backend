const db = require('../config/db'); // Asegúrate de tener tu conexión a la base de datos configurada

class UsuarioDAO {
    static async createUser(idEmpleado, idRol, correo, contrasenia) {
        try {
            const query = 'INSERT INTO usuario (Empleado_idEmpleado, Rol_idRol, Correo, Contrasenia) VALUES (?, ?, ?, ?)';
            const [result] = await db.execute(query, [idEmpleado, idRol, correo, contrasenia]);
            return { id: result.insertId, correo };
        } catch (error) {
            throw error.status? error : new Error('Error al crear el usuario');
        }
    }

    static async createAdminUser(idEmpleado, idRol, correo, contrasenia) {
        try {
            const query = 'INSERT INTO usuario (Empleado_idEmpleado, Rol_idRol, Correo, Contrasenia) VALUES (?,?,?,?)';
            const [result] = await db.execute(query, [idEmpleado, idRol, correo, contrasenia]);
            return { id: result.insertId, correo };
        }catch (error) {
            throw error.status? error : new Error('Error al crear el usuario ADMIN');
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

    static async getByIdRol(idRol) {
        try {
            const query = 'SELECT * FROM usuario WHERE Rol_idRol = ?';
            const [rows] = await db.execute(query, [idRol]);

            return rows[0];
        } catch (error) {
            console.error("Error al buscar usuario por idRol:", error);
            throw error;
        }
    }

    static async getById(idUsuario) {
        try {
            const query = 'SELECT * FROM usuario WHERE idUsuario = ?';
            const [rows] = await db.execute(query, [idUsuario]);
            if (rows.length === 0) {
                const errorData = new Error("Usuario no encontrado");
                errorData.status = 404;
                throw errorData;
            }
            return rows[0];
        } catch (error) {
            throw error.status? error : new Error('Error al obtener el usuario');
        }
    }
}


module.exports = UsuarioDAO;
