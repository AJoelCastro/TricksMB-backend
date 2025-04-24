const db = require('../config/db');

class DetallePedidoDAO {
    static async createDetallePedido(idPedido, idModelo,codigoPedido, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorios, forro) {
        try {
            const query = `
                INSERT INTO Detalle_pedido (
                    Pedido_idPedido, Modelo_idModelo, Codigo_pedido,
                    Nombre_taco, Altura_taco, Material, Tipo_material, Suela, Accesorios, Forro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.execute(query, [
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro
            ]);

            return {
                idDetallePedido: result.insertId, // Retorna el ID del nuevo registro
                idPedido, idModelo, codigoPedido, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro
            };

        } catch (error) {
            throw { status: 500, message: "Error interno al crear detalle de pedido" };
        }
    }

    static async getDetallePedidoByCodigoPedido(codigoPedido) {
        try {
            const query = 'SELECT * FROM Detalle_pedido WHERE Codigo_pedido = ?';
            const [rows] = await db.execute(query, [codigoPedido]);

            if (rows.length === 0) {
                const errorDetallePedido = new Error("No se encontró un detalle de pedido con el código proporcionado.");
                errorDetallePedido.status = 404;
                throw errorDetallePedido;
            }
            return rows[0];
        } catch (error) {
            throw error.status ? error : {status: 500, message: "Error interno del servidor al obtener el detalle de pedido"};
        }
    }

    static async  updateDetallePedido(codigoPedido, nombreTaco, alturaTaco, material,
        tipoMaterial, suela, accesorios, forro) {
        try {
            const query = `
                UPDATE Detalle_pedido SET
                    Nombre_taco = ?, Altura_taco = ?, Material = ?, Tipo_material = ?, Suela = ?, Accesorios = ?, Forro = ?
                WHERE Codigo_pedido = ?`;
            
            const [result] = await db.execute(query, [nombreTaco, alturaTaco, material, tipoMaterial, 
                suela, accesorios, forro, codigoPedido]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontró el pedido con el código proporcionado.");
            }

            return { mensaje: "Detalle de pedido actualizado correctamente", codigoPedido, nombreTaco, alturaTaco, material,
                tipoMaterial, suela, accesorios, forro };
        } catch (error) {
            console.error("Error al actualizar detalle de pedido:", error);
            throw error;
        }
    }
    static async  updateEstado(codigoPedido, estado) {
        try {
            const query = `
                UPDATE Detalle_pedido SET Estado = ? WHERE Codigo_pedido = ?`;
            
            const [result] = await db.execute(query, [estado, codigoPedido]);
            
            if (result.affectedRows === 0) {
                throw new Error("No se encontró el pedido con el código proporcionado.");
            }

            return { mensaje: "Estado del pedido actualizado correctamente", codigoPedido, estado };
        } catch (error) {
            console.error("Error al actualizar estado del pedido:", error);
            throw error;
        }
    }

    static async getAllCodigosPedidos(){
        try{
            const query = `SELECT Codigo_pedido FROM Detalle_pedido`
            const [rows] = await db.execute(query);
            return rows;
        } catch(error){
            const errorDao = new Error("Error interno del servidor");
            errorDao.status = 500;
            throw errorDao;
        }
    }

    static async getDetallePedidoById(idDetallePedido){
        try{
            const query = `SELECT * FROM Detalle_pedido WHERE idDetalle_pedido = ?`;
            const [rows] = await db.execute(query,[idDetallePedido]);
            return rows[0];
        }catch(error){
            const errorDao = new Error("Error interno del servidor");
            errorDao.status = 500;
            throw errorDao;
        }
    }

    static async getAllDetallesPedidos(){
        try{
            const query = `SELECT * FROM Detalle_pedido`;
            const [rows] = await db.execute(query);
            return rows;
        }catch(error){
            console.error("Error al obtener detalles de los pedidos", error);
            throw error;
        }
    }

    static async updateCantidad(idDetallePedido, cantidad){
        
        try{
            const query = `UPDATE Detalle_pedido SET Cantidad = ? WHERE idDetalle_pedido = ?`;
            const [rows] = await db.execute(query,[cantidad, idDetallePedido]);
            return rows;
        }catch(error){
            throw {status: 500, message: "Error interno del servidor al actualizar la cantidad del pedido"};
        }
    }
}

module.exports = DetallePedidoDAO;
