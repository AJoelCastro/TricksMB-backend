const ClienteDAO = require('../dao/ClienteDAO');

const ClienteService = {
    async createCliente(tipoCliente) {
        try{
            if (!tipoCliente) throw new Error('Tipo de cliente es requerido');
            return await ClienteDAO.createCliente(tipoCliente);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al crear cliente en servicio"};
        }
    },

    async createClienteNatural(idCliente, nombre, dni, telefono) {
        try{
            if (!idCliente || !nombre || !dni || !telefono) {
                const errorCrearClienteNatural = new Error('Todos los campos son requeridos');
                errorCrearClienteNatural.status = 400;
                throw errorCrearClienteNatural;
            }
            return await ClienteDAO.createClienteNatural(idCliente, nombre, dni, telefono);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al crear cliente natural en servicio"};
        }
    },

    async createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono) {
        try{
            if (!idCliente || !razonSocial || !ruc || !representanteLegal || !telefono){
                const errorCrearClienteJuridico = new Error('Todos los campos son requeridos');
                errorCrearClienteJuridico.status = 400;
                throw errorCrearClienteJuridico;
            }
            return await ClienteDAO.createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono);
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al crear cliente juridico en servicio"};
        }
    },

    async getClienteNaturalByDni(dni) {
        try{
            if (!dni) return null; // Si DNI no está definido, devuelve null
            const clienteNatural = await ClienteDAO.getClienteNaturalByDni(dni);
            return clienteNatural || null; // Si no hay resultados, devuelve null en lugar de lanzar error
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al obtener cliente natural por dni en servicio"};
        }
    },

    async getClienteJuridicoByRuc(ruc) {
        try{
            if (!ruc) return null;
            const clienteJuridico = await ClienteDAO.getClienteJuridicoByRuc(ruc);
            return clienteJuridico || null;
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al obtener cliente juridico por ruc en servicio"};
        }
    },

    async getClienteJuridicoByRazonSocial(razonSocial) {
        try{
            if (!razonSocial) return null;
            const clienteJuridico = await ClienteDAO.getClienteJuridicoByRazonSocial(razonSocial);
            return clienteJuridico || null;
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al obtener cliente juridico por razon social en servicio"};
        }
    },

    async getCliente(value){
        try{
            if(value.length === 8){
                return await ClienteDAO.getClienteNaturalByDni(value); 
            }else if(value.length == 11){
                return await ClienteDAO.getClienteJuridicoByRuc(value);
            }
        }catch(error){
            throw error.status ? error : {status:500, message:`Error en el servicio al buscar cliente`};
        }
    },

    async getClienteByCodigoPedido(codigoPedido){
        try{
            if(!codigoPedido) throw {status: 400, message: "Código de pedido requerido"};
            return await ClienteDAO.getClienteByCodigoPedido(codigoPedido);
        }catch(error){
            throw error;
        }
    },

    async getAllClientes(){
        try{
            const clientes = await ClienteDAO.getAllClientes();
            if(clientes.length === 0) {
                const errorNoClientes = new Error("No se encontraron clientes");
                errorNoClientes.status = 404;
                throw errorNoClientes;
            }
            return clientes;
        }catch(error){
            throw error.status ? error : {status:500, message:"Error al obtener todos los clientes en servicio"};
        }
    },

    async getClientesById(){
        try{
            const clientes = await ClienteDAO.getClientesById();
            if(clientes.length === 0) {
                const errorClientes = new Error("No hay clientes registrados");
                errorClientes.status = 404;
                throw errorClientes;
            }

            const clientesFiltrados = clientes.map(cliente => {
            return Object.fromEntries(
                Object.entries(cliente).filter(([_, value]) => value !== null)
            );
        });

            return clientesFiltrados;
        }catch(error){
            throw error.status ? error : {status: 500, message: "Error al obtener clientes por id"};
        }
    }
};

module.exports = ClienteService;
