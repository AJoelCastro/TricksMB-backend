const db = require("../config/db");

class EmpleadoDAO {
  static async createEmpleado(idAreaTrabajo, Nombre, Telefono, Dni) {
    try {
      const query =
        "INSERT INTO Empleado (Area_trabajo_idArea_trabajo, Nombres, Telefono, Dni) VALUES (?, ?, ?, ?)";
      const [rows] = await db.execute(query, [
        idAreaTrabajo,
        Nombre,
        Telefono,
        Dni,
      ]);
      return { id: rows.insertId, idAreaTrabajo, Nombre, Telefono, Dni };
    } catch (error) {
      throw error;
    }
  }

  static async getByDni(Dni) {
    try {
      const query = "SELECT * FROM Empleado WHERE Dni = (?)";
      const [rows] = await db.execute(query, [Dni]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getEmpleados(idArea) {
    try {
      const query =
        "SELECT * FROM Empleado WHERE Area_trabajo_idArea_trabajo = (?)";
      const [rows] = await db.execute(query, [idArea]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error interno en el DAO." };
    }
  }

  static async getEmpleadoPorId(idEmpleado) {
    try {
      const query = `SELECT * FROM Empleado WHERE idEmpleado = ?`;
      const [rows] = await db.execute(query, [idEmpleado]);
      if (rows.length === 0) {
        const error = new Error("Empleado no encontrado");
        error.status = 404;
        throw error;
      }
      return rows[0];
    }
    catch (error) {
      throw error.status?error:{status:500,message:"Error interno en el DAO al buscar empleado por id"};
    }
  }
}

module.exports = EmpleadoDAO;
