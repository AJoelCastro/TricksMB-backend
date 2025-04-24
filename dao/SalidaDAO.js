const db = require('../config/db');

class SalidaDAO {
  static async createSalida(idDetalleAlmacen, idCaja, idGuiSalida) {
    try {
      const query =
        "INSERT INTO Salida (Detalle_almacen_idDetalle_almacen, Caja_idCaja, Guia_salida_idGuia_salida) VALUES (?, ?, ?)";
      const [result] = await db.execute(query, [idDetalleAlmacen,idCaja,idGuiSalida]);
      if (result.affectedRows === 0) {
        const errorRows = new Error("Salida no creada");
        errorRows.status = 404;
        throw errorRows;
      }
      return {idSalida: result.insertId, status: 201};
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear salida" };
    }
  }
  static async getSalidaByCaja(idCaja){
    try{
        const [rows] = await db.execute(`SELECT * FROM Salida WHERE Caja_idCaja = ?`, [idCaja]);
        return rows.length > 0 ? rows[0] : null;
    }catch(error){
        throw  {status: 500, message: "Error interno del servidor al obtener la salida por caja"};
    }
  }
}

module.exports = SalidaDAO;
