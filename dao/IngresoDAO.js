const db = require('../config/db')

class IngresoDAO{
    static async createIngreso(idCaja, idDetalleAlmacen){
        try{
            const [result] = await db.execute(`INSERT INTO Ingreso (Caja_idCaja, Detalle_almacen_idDetalle_almacen)
                VALUES (?, ?)`,[idCaja, idDetalleAlmacen]);
            if(result.affectedRows === 0){
                const errorIngreso = new Error("No se pudo crear el Ingreso de la caja");
                errorIngreso.status = 404;
                throw errorIngreso;
            }

            return {message:"Caja Ingresa con exito"}
        }catch(error){
            throw error.status? error: {status: 500, message: "Error interno del servidor al crear el ingreso"};
        }
    }

    static async getIngresoByCaja(idCaja){
        try{
            const [rows] = await db.execute(`SELECT * FROM Ingreso WHERE Caja_idCaja = ?`, [idCaja]);
            return rows.length > 0 ? rows[0] : null;
        }catch(error){
            throw  {status: 500, message: "Error interno del servidor al obtener el ingreso por caja"};
        }
    } 

    static async getAllIngresosByDetalleAlmacen(idDetalleAlmacen){
        try{
            const [rows] = await db.execute(`SELECT * FROM Ingreso WHERE Detalle_almacen_idDetalle_almacen = ?`, [idDetalleAlmacen]);
            if(rows.affectedRows === 0){
                throw new Error("No se encontraron Ingresos con el Detalle de Almacen proporcionado");
            }
            return rows;
        }catch(error){
            console.log("Error al obtener la caja", error);
            throw error;
        }
    }

}

module.exports = IngresoDAO