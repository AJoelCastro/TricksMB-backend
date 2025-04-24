const db = require('../config/db');

class DetalleEmpleadoPedidoDAO{
    static async createDetalleEmpleadoPedido(idEmpleado, idDetalle_pedido){
        try{
            const query = 'INSERT INTO Detalle_empleadoPedido (Empleado_idEmpleado, Detalle_pedido_idDetalle_pedido) VALUES (?, ?)';
            const [rows] = await db.execute(query, [idEmpleado, idDetalle_pedido]);
            return {id: rows.insertId, idEmpleado, idDetalle_pedido};
        } catch(error){
            throw error;
        }
    }

    static async getAllDetallePedido(idArea, idDetalle_pedido){
        try{
            const query = `
                SELECT dep.*, e.Nombres, e.Telefono, e.DNI 
                FROM Detalle_empleadoPedido dep
                JOIN Empleado e ON dep.Empleado_idEmpleado = e.idEmpleado
                WHERE e.Area_trabajo_idArea_trabajo = ? 
                AND dep.Detalle_pedido_idDetalle_pedido = ?
            `;
            const [rows]= await db.execute(query, [idArea, idDetalle_pedido]);
            return rows;
        } catch(error){
            throw error;
        }
    }
}
module.exports = DetalleEmpleadoPedidoDAO;