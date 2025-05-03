const bcrypt = require('bcrypt');

const UsuarioDAO = require('../dao/UsuarioDAO');

const UsuarioService = {

    async getUserByCorreo(correo) {
        const user = await UsuarioDAO.getByCorreo(correo);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    async createUser(idEmpleado, idRol, correo, contrasenia) {
        const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
        return await UsuarioDAO.createUser(idEmpleado, idRol, correo, hashedContrasenia);
    },

    async findUser(correo, contrasenia) {
        const user = await UsuarioDAO.encUser(correo);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(contrasenia, user.Contrasenia);
        if (!isPasswordValid) return null; 
        return user;
    },

    async getUserByIdRol(idRol) {
        const user = await UsuarioDAO.getByIdRol(idRol);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    async getUserById(idUsuario) {
        const user = await UsuarioDAO.getById(idUsuario);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },
};

module.exports = UsuarioService;