const bcrypt = require('bcrypt');

const UsuarioDAO = require('../dao/UsuarioDAO');
const RolDAO = require('../dao/RolDAO');
const EmpleadoDAO = require('../dao/EmpleadoDAO');

const UsuarioService = {

    async getUserByCorreo(correo) {
        try {
            const user = await UsuarioDAO.getByCorreo(correo);
            if (!user){
                const errorData = new Error("Usuario no encontrado");
                errorData.status = 404;
                throw errorData;
            }
            return user;
        } catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al buscar usuario' };
        }
    },

    async createUser(idEmpleado, idRol, correo, contrasenia) {
        try {
            const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
            return await UsuarioDAO.createUser(idEmpleado, idRol, correo, hashedContrasenia);
        } catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al crear usuario' };
        }
    },
    async createAdminUser() {
        try {
            const password = process.env.ADMIN_PASSWORD || 'admin123';
            const hashedPassword = await bcrypt.hash(password, 10);
            await RolDAO.createRol('ADMIN');
            return await UsuarioDAO.createAdminUser(idEmpleado, idRol, correo, hashedPassword);
        } catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al crear usuario' };
        }
    },

    async findUser(correo, contrasenia) {
        try {
            const user = await UsuarioDAO.encUser(correo);
            if (!user){
                const errorData1 = new Error("Usuario no encontrado");
                errorData1.status = 404;
                throw errorData1;
            }
            const isPasswordValid = await bcrypt.compare(contrasenia, user.Contrasenia);
            if (!isPasswordValid){
                const errorData2 = new Error("Contraseña incorrecta");
                errorData2.status = 401;
                throw errorData2;
            }
            return user;   
        } catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al buscar usuario' };
        }
    },

    async getUserByIdRol(idRol) {
        try {

            const users = await UsuarioDAO.getByIdRol(idRol);
            if (!users || users.length === 0){
                const errorData = new Error("Usuario no encontrado");
                errorData.status = 404;
                throw errorData;
            }
            return users;
        }catch (error) {
            throw error.status? error : { status: 500, message: 'Error en el servicio al obtener usuario' };
        }
    },

    async getUserById(idUsuario) {
        try {
            const user = await UsuarioDAO.getById(idUsuario);

            const empleado = await EmpleadoDAO.getEmpleadoPorId(user.Empleado_idEmpleado);

            const rol = await RolDAO.getRolById(user.Rol_idRol);

            return {
                correo: user.Correo,
                nombres: empleado.Nombres,
                rol: rol[0].Nombre,
            };
        } catch (error) {
            throw error.status ? error : { status: 500, message: 'Error en el servicio al obtener usuario' };
        }
    },
};

module.exports = UsuarioService;