const db = require('../config/db');

class DetalleAlmacenDAO{
    static async createDetalleAlmacen(idAlmacen, idDetallePedido, ) {
        try {
            const [result] = await db.execute(
                `INSERT INTO Detalle_almacen (Almacen_idAlmacen, Detalle_pedido_idDetalle_pedido) VALUES (?, ?)`, 
                [idAlmacen, idDetallePedido]
            );
            if (result.affectedRows === 0) {
                const errorDetalleAlmacen = new Error("No se pudo crear el Detalle del Almacén.");
                errorDetalleAlmacen.status = 404;
                throw errorDetalleAlmacen;
            }

            return { message: "Detalle almacén creado exitosamente", insertId: result.insertId };
        } catch (error) {
            throw error.status ? error : {status: 500, message: "Error interno del servidor al crear el detalle almacén"};
        }
    }

    static async getDetalleAlmacen(idDetallePedido){
        try{
            const [result] = await db.execute(`SELECT * FROM Detalle_almacen 
                WHERE Detalle_pedido_idDetalle_pedido = ?`, [idDetallePedido]);

            if (result.affectedRows === 0) {
                const errorDetalleAlmacen = new Error("No se a encontrado el detalle almacen.");
                errorDetalleAlmacen.status = 404;
                throw errorDetalleAlmacen;
            }

            return result;
        }catch(error){
            throw error.status? error: {status: 500, message: "Error interno del servidor al obtener el detalle almacén"};
        }
    }

    static async updateCantidadIngreso(idDetallePedido, cantidad) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Cantidad_Ingreso = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [cantidad, idDetallePedido]);
            if (result.affectedRows === 0) {
                const errorCantidadIngreso = new Error("No se pudo actualizar la cantidad de ingreso.");
                errorCantidadIngreso.status = 404;
                throw errorCantidadIngreso;
            }

            return { message: "Cantidad de ingreso actualizada exitosamente" };
        } catch (error) {
            throw error.status ? error : {status: 500, message: "Error interno del servidor al actualizar la cantidad de ingreso"};
        }
    }

    static async updateCantidadSalida(idDetallePedido, cantidad) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Cantidad_Salida = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [cantidad, idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar la cantidad de salida.");
            }

            return { message: "Cantidad de salida actualizada exitosamente" };
        } catch (error) {
            console.error("Error al actualizar la cantidad de salida:", error);
            throw error;
        }
    }

    static async updateEstado(idDetallePedido, estado) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Estado = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;

            const [result] = await db.execute(query, [estado, idDetallePedido]);

            if (result.affectedRows === 0) {
                throw new Error("No se pudo actualizar el estado.");
            }

            return { message: "Estado actualizado exitosamente" };
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            throw error;
        }
    }

    static async updateIdAlmacen(idAlmacen, idDetallePedido) {
        try {
            const query = `
                UPDATE Detalle_almacen 
                SET Almacen_idAlmacen = ? 
                WHERE Detalle_pedido_idDetalle_pedido = ?
            `;
            const [result] = await db.execute(query, [idAlmacen, idDetallePedido]);
            if (result.affectedRows === 0) {
                const errorIdAlmacen = new Error("No se pudo actualizar el id del almacen.");
                errorIdAlmacen.status = 404;
                throw errorIdAlmacen;
            }
            return { message: "Id del almacen actualizado exitosamente" };
        } catch (error) {
            throw error.status? error : {status: 500, message: "Error interno del servidor al actualizar el id del almacen"};
        }
    }

    static async  getAllDetalleAlmacen(){
        try{
            const [result] = await db.execute(`SELECT * FROM Detalle_almacen`);
            return result;
        }catch(error){
            throw error.status? error: {status: 500, message: "Error interno del servidor al obtener el detalle almacén"};
        }
    }

    static async getDetallesAlmacenByModelo(idModelo) {
        try {
            const [result] = await db.execute(`
                SELECT 
                    da.*, dp.idDetalle_pedido, dp.Modelo_idModelo
                FROM 
                    Detalle_almacen da
                JOIN 
                    Detalle_pedido dp ON da.Detalle_pedido_idDetalle_pedido = dp.idDetalle_pedido
                WHERE 
                    dp.Modelo_idModelo = ?`, 
                [idModelo]);

            return result;
        } catch (error) {
            throw {status: 500, message: "Error al obtener detalles del almacén por modelo", detalle: error.message};
        }
    }

    
}

module.exports = DetalleAlmacenDAO;