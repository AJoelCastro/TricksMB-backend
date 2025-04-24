const EmpleadoService = require("../services/EmpleadoService");

const EmpleadoController = {
    async createEmpleado(req, res, next) {
        try {
            const { idAreaTrabajo, nombre, telefono, dni } = req.body;
            const empleado = await EmpleadoService.createEmpleado(idAreaTrabajo, nombre, telefono, dni);

            res.json({empleado, status: 201 });
        } catch (error) {
            next(error);
        }
    },

    async getByDni(req, res, next) {
        try {
            const { dni } = req.params;
            const empleado = await EmpleadoService.getByDni(dni);
            res.json({empleado, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getEmpleados(req, res, next) {
        try {
            const { nomArea } = req.query;
            const empleados = await EmpleadoService.getEmpleados(nomArea);
            res.json({ empleados, status: 200 });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = EmpleadoController;
