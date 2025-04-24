const db = require('../config/db');

class PedidoDAO {

    static async createPedido(idCliente, fechaEntrega, serieInicio, serieFin){
    try {
        const query = 'INSERT INTO Pedido (Cliente_idCliente, Fecha_entrega, Serie_inicio, Serie_final ) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [idCliente, fechaEntrega, serieInicio, serieFin]);
        if(result.length === 0){
            const errorRows = new Error("Pedido no creado");
            errorRows.status = 404;
            throw errorRows;
        };
        return { idPedido: result.insertId, idCliente, fechaEntrega, serieInicio, serieFin };
        } catch (error) {
            throw error.status ? error : {status:500, message:"Error interno al crear pedido"};
        }
    }

    static async getPedidoByCodigoPedido(codigoPedido) {
        try {
            const query = `
                SELECT p.* 
                FROM Pedido p
                INNER JOIN Detalle_pedido dp ON p.idPedido = dp.Pedido_idPedido
                WHERE dp.Codigo_pedido = ?`;
            const [result] = await db.execute(query, [codigoPedido]);
            if (result.length === 0) {
                const errorRows = new Error("Pedido no encontrado");
                errorRows.status = 404;
                throw errorRows;
            }
            return result[0];
        } catch (error) {
            throw error.status ? error : { status: 500, message: "Error interno al obtener pedido" };
        }
    }


    static async updatePedido(codigoPedido,fechaEntrega, serieInicio, serieFinal){
        try {
            const queryGetPedido = `SELECT Pedido_idPedido FROM Detalle_pedido WHERE Codigo_pedido = ?`;
            const [rows] = await db.execute(queryGetPedido, [codigoPedido]);

            if (rows.length === 0) {
                throw new Error("No se encontró el pedido con el código proporcionado.");
            }
            const idPedido = rows[0].Pedido_idPedido;

            const queryUpdatePedido = `
            UPDATE Pedido 
            SET Fecha_entrega = ?, Serie_inicio = ?, Serie_final = ?
            WHERE idPedido = ?`;

            await db.execute(queryUpdatePedido, [fechaEntrega, serieInicio, serieFinal, idPedido]);

            return { mensaje: "Pedido actualizado correctamente", codigoPedido, fechaEntrega, serieInicio, serieFinal };

        }catch (error) {
            console.error("Error al actualizar pedido:", error);
            throw error;
        }
    }
}

module.exports = PedidoDAO;