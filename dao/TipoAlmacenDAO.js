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
}

module.exports = TipoAlmacenDAO;
