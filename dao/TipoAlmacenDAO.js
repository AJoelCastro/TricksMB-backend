const db = require('../config/db');

class TipoAlmacenDAO {
  static async createTipoAlmacen(nombre) {
    try {
      const query = "INSERT INTO Tipo_almacen (nombre) VALUES (?)";
      const [result] = await db.execute(query, [nombre]);
      if (result.affectedRows === 0) {
        const errorRows = new Error("Tipo de almacen no creado");
        errorRows.status = 404;
        throw errorRows;
      }
      return { idTipoAlmacen: result.insertId, status: 201 };
    }catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear tipo de almacen" };
    }
  }

  static async getTiposAlmacen() {
    try {
      const query = "SELECT * FROM Tipo_almacen";
      const [result] = await db.execute(query);
      if (result.length === 0) {
        const errorRows = new Error("No hay tipos de almacen");
        errorRows.status = 404;
        throw errorRows;
      }
      return result;
    }catch (error) {
      throw error.status
       ? error
        : { status: 500, message: "Error interno al obtener tipos de almacen" };
    }
  }
}

module.exports = TipoAlmacenDAO;
