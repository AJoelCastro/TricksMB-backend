const ClienteService = require('../services/ClienteService');

const ClienteController = {
    async registrarCliente(req, res, next) {
        try {
            const { tipoCliente, nombre, dni, razonSocial, ruc, representanteLegal, telefono } = req.body;

            if (!["natural", "juridico"].includes(tipoCliente)) {
                const errorTipoCliente = new Error('Tipo de cliente inválido');
                errorTipoCliente.status = 400;
                throw errorTipoCliente;
            }

            if (tipoCliente === "natural" && (!nombre || !dni || !telefono)) {
                const errorFaltanDatosNatural = new Error('Faltan datos para cliente natural');
                errorFaltanDatosNatural.status = 400;
                throw errorFaltanDatosNatural;
            }
            if (tipoCliente === "juridico" && (!razonSocial || !ruc || !telefono)) {
                const errorFaltanDatosJuridico = new Error('Faltan datos para cliente jurídico');
                errorFaltanDatosJuridico.status = 400;
                throw errorFaltanDatosJuridico;
            }

            if (tipoCliente === "natural") {
                const clienteNatural = await ClienteService.getClienteNaturalByDni(dni);
                if (clienteNatural) {
                    const errorDniRegistrado = new Error('El DNI ya está registrado');
                    errorDniRegistrado.status = 409;
                    throw errorDniRegistrado;
                }
            } else if (tipoCliente === "juridico") {
                const clienteJuridicoRuc = await ClienteService.getClienteJuridicoByRuc(ruc);
                const clienteJuridicoRazonSocial = await ClienteService.getClienteJuridicoByRazonSocial(razonSocial);
                if (clienteJuridicoRuc || clienteJuridicoRazonSocial) {
                    const errorRucRazonSocialRegistrado = new Error('El RUC o la Razón Social ya están registrados');
                    errorRucRazonSocialRegistrado.status = 409;
                    throw errorRucRazonSocialRegistrado;
                }
            }

            const nuevoCliente = await ClienteService.createCliente(tipoCliente);

            if (tipoCliente === "natural") {
                await ClienteService.createClienteNatural(nuevoCliente.idCliente, nombre, dni, telefono);
            } else {
                await ClienteService.createClienteJuridico(nuevoCliente.idCliente, razonSocial, ruc, representanteLegal, telefono);
            }

            res.status(201).json({ nuevoCliente });

        } catch (error) {
            next(error);
        }
    },
    
    async buscarClienteNatural(req, res, next) {
        try {
            const { tipoCliente, identificador } = req.query;

            if (tipoCliente === "natural") {
                const cliente = await ClienteService.getClienteNaturalByDni(identificador);
                res.json({ cliente, status: 200 });
            } 
        } catch (error) {
            next(error);
        }
    },

    async buscarClienteJuridico(req, res, next) {
        try {
            const { tipoCliente, identificador } = req.query;

            if (tipoCliente === "juridico") {
                const cliente = await ClienteService.getClienteJuridicoByRuc(identificador);
                res.json({ cliente, status: 200 });
            }
        } catch (error) {
            next(error);
        }
    },

    async getAllClientes(req, res, next) {
        try {
            const clientes = await ClienteService.getAllClientes();
            res.json({ clientes, status: 200 });
        } catch (error) {
            next(error);
        }
    },

    async getClienteByCodigoPedido(req, res, next) {
        try {
            const { codigoPedido } = req.params;
            const cliente = await ClienteService.getClienteByCodigoPedido(codigoPedido);
            res.json({ cliente, status: 200 });
        } catch (error) {
            next(error);
        }
    },
    
    async getClientesById(req, res, next) {
        try {
            const cliente = await ClienteService.getClientesById();
            res.status(200).json({ cliente });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ClienteController;
