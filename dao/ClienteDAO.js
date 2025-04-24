const db = require('../config/db');

class ClienteDAO {
    // Crear un cliente base
    static async createCliente(tipoCliente) {
        try {
            const query = 'INSERT INTO Cliente (Tipo_cliente) VALUES (?)';
            const [result] = await db.execute(query, [tipoCliente]);
            return { idCliente: result.insertId, tipoCliente };
        } catch (error) {
            throw {status:500, message:"Error al crear cliente en DAO"};
        }
    }

    // Crear cliente natural
    static async createClienteNatural(idCliente, nombre, dni, telefono) {
        try {
            const query = 'INSERT INTO Cliente_natural (Cliente_idCliente, Nombre, Dni, Telefono) VALUES (?, ?, ?, ?)';
            await db.execute(query, [idCliente, nombre, dni, telefono]);
            return { idCliente, nombre, dni, telefono };
        } catch (error) {
            throw {status:500, message:"Error al crear cliente natural en DAO"};
        }
    }

    // Crear cliente jurídico
    static async createClienteJuridico(idCliente, razonSocial, ruc, representanteLegal, telefono) {
        try {
            const query = 'INSERT INTO Cliente_juridico (Cliente_idCliente, Razon_social, Ruc, Representante_legal, Telefono) VALUES (?, ?, ?, ?, ?)';
            await db.execute(query, [idCliente, razonSocial, ruc, representanteLegal, telefono]);
            return { idCliente, razonSocial, ruc, representanteLegal, telefono };
        } catch (error) {
            throw {status:500, message:"Error al crear cliente juridico en DAO"};
        }
    }

    // Buscar cliente natural por DNI
    static async getClienteNaturalByDni(dni) {
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, cn.Nombre, cn.Dni, cn.Telefono
                FROM Cliente_natural cn
                INNER JOIN Cliente c ON cn.Cliente_idCliente = c.idCliente
                WHERE cn.Dni = ?`;
            const [rows] = await db.execute(query, [dni])
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw {status:500, message:"Error interno al buscar cliente natural por DNI"};
        }
    }

    // Buscar cliente jurídico por RUC
    static async getClienteJuridicoByRuc(ruc) {
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, cj.Razon_social, cj.Ruc, cj.Representante_legal, cj.Telefono
                FROM Cliente_juridico cj
                INNER JOIN Cliente c ON cj.Cliente_idCliente = c.idCliente
                WHERE cj.Ruc = ?`;
            const [rows] = await db.execute(query, [ruc]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw {status:500, message:"Error interno al buscar cliente jurídico por RUC"};
        }
    }

    static async getClienteJuridicoByRazonSocial(razonSocial){
        try {
            const query = `
                SELECT c.idCliente, c.Tipo_cliente, cj.Razon_social, cj.Ruc, cj.Representante_legal, cj.Telefono
                FROM Cliente_juridico cj
                INNER JOIN Cliente c ON cj.Cliente_idCliente = c.idCliente
                WHERE cj.Razon_social = ?`;
            const [rows] = await db.execute(query, [razonSocial]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw {status:500, message:"Error interno al buscar cliente jurídico por Razon Social"};
        }
    }

    // Obtener todos los clientes
    static async getAllClientes() {
        try {
            const query = `
                SELECT 
                    c.idCliente,
                    c.Tipo_cliente,
                    COALESCE(cn.Nombre, cj.Razon_social) AS nombre,
                    cn.Dni,
                    cj.Ruc
                FROM Cliente c
                LEFT JOIN Cliente_natural cn ON c.idCliente = cn.Cliente_idCliente
                LEFT JOIN Cliente_juridico cj ON c.idCliente = cj.Cliente_idCliente`;
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw {status:500, message:"Error al obtener todos los clientes en DAO"};
        }
    }

    static async getClienteByCodigoPedido(codigoPedido) {
        try {
            // Obtener el ID del cliente directamente desde Detalle_pedido y Pedido en una sola consulta
            const query = `
                SELECT p.Cliente_idCliente 
                FROM Detalle_pedido dp
                JOIN Pedido p ON dp.Pedido_idPedido = p.idPedido
                WHERE dp.Codigo_pedido = ?`;

            const [rows] = await db.execute(query, [codigoPedido]);

            if (rows.length === 0 || !rows[0].Cliente_idCliente) {
                const errorNoCliente = new Error("No se encontró un cliente asociado al pedido.");
                errorNoCliente.status = 404;
                throw errorNoCliente;
            }

            const idCliente = rows[0].Cliente_idCliente;

            // Obtener los datos del cliente (natural o jurídico)
            const queryGetCliente = `
                SELECT 
                    c.idCliente,
                    c.Tipo_cliente,
                    COALESCE(cn.Nombre, cj.Razon_social) AS nombre,
                    cn.Dni,
                    cj.Ruc
                FROM Cliente c
                LEFT JOIN Cliente_natural cn ON c.idCliente = cn.Cliente_idCliente
                LEFT JOIN Cliente_juridico cj ON c.idCliente = cj.Cliente_idCliente
                WHERE c.idCliente = ?`;

            const [cliente] = await db.execute(queryGetCliente, [idCliente]);

            if (cliente.length === 0) {
                const errorNoCliente2 = new Error("No se encontró información del cliente.");
                errorNoCliente2.status = 404;
                throw errorNoCliente2;
            }

            return cliente[0];

        } catch (error) {
            throw error.status ? error : {status:500, message:"Error al obtener cliente por código de pedido en DAO"};
        }
    }

    static async getClientesById() {
        try{
            const query = `SELECT COALESCE(cn.Dni, cj.Ruc) AS identificador
                FROM Cliente_natural cn 
                LEFT JOIN Cliente_juridico cj 
                ON cn.Cliente_idCliente = cj.Cliente_idCliente

                UNION

                SELECT COALESCE(cn.Dni, cj.Ruc) AS identificador
                FROM Cliente_juridico cj
                LEFT JOIN Cliente_natural cn 
                ON cj.Cliente_idCliente = cn.Cliente_idCliente`;
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            throw {status:500, message:"Error al obtener clientes por ID en DAO"};
        }
    }

}

module.exports = ClienteDAO
