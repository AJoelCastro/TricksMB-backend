const db = require("../config/db");

class GuiaSalida {
  static async createGuiaSalida(idCliente, cantidad) {
    try {
      const query =
        "INSERT INTO Guia_salida (Cliente_idCliente, Cantidad) VALUES (?, ?)";
      const [result] = await db.execute(query, [idCliente,cantidad]);
      if (result.affectedRows === 0) {
        const errorRows = new Error("Guia de salida no creada");
        errorRows.status = 404;
        throw errorRows;
      }
      return result;
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al crear guia de salida" };
    }
  }

  static async getGuiaSalidaByIdCliente(idCliente) {
    try {
      const query = "SELECT * FROM Guia_salida WHERE Cliente_idCliente = ?";
      const [result] = await db.execute(query, [idCliente]);
      if (result.length === 0) {
        const errorRows = new Error("Guia de salida no encontrada");
        errorRows.status = 404;
        throw errorRows;
      }
      return result;
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al obtener guia de salida" };
    }
  }

  static async updateCantidad(idCliente, cantidad) {
    try {
      const query = "UPDATE Guia_salida SET Cantidad = ? WHERE Cliente_idCliente = ?";
      const [result] = await db.execute(query, [cantidad,idCliente]);
      if (result.affectedRows === 0) {
        const errorRows = new Error("Guia de salida no actualizada");
        errorRows.status = 404;
        throw errorRows;
      }
      return {idCliente,cantidad};
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error interno al actualizar guia de salida" };
    }
  }

  
}

module.exports = GuiaSalida;
