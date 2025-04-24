const db = require('../config/db')

class DetalleAreaTrabajoDAO{

    static async crearDetalleAreaTrabajo(idAreaTrabajo,idCaracteristicas, cantidadAvance, comentario, estado){
        try{
            const query = `
                INSERT INTO Detalle_areaTrabajo (
                    Area_Trabajo_idArea_trabajo, Caracteristicas_idCaracteristicas, Cantidad_avance, Comentario, Estado
                ) VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario, estado]);
            return{idDetalleAreaTrabajo: result.insertId, idAreaTrabajo, idCaracteristicas, cantidadAvance, comentario, estado};
        }catch(error){
            throw error;   
        }
    }

    static async getDetalleAreaTrabajo(idCaracteristicas){
        try{
            const query = `
                SELECT * FROM Detalle_areaTrabajo WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [rows] = await db.execute(query, [idCaracteristicas]);
            let mayor = 0;
            for (const item of rows) {
                if (item.Area_trabajo_idArea_trabajo > mayor) {
                    mayor = item.Area_trabajo_idArea_trabajo;
                }
            }
            const data = await rows.filter(item => item.Area_trabajo_idArea_trabajo === mayor);
            return data;
        }catch(error){
            throw error;
        }
    }

    static async updateDetalleAreaTrabajo(idCaracteristicas, cantidadAvance, comentario,estado){
        try{
            const query = `
                UPDATE detalle_areatrabajo SET
                    Cantidad_avance = ?, Comentario = ?, Estado = ?
                WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [result] = await db.execute(query, [cantidadAvance, comentario, estado, idCaracteristicas]);
            if(result.affectedRows === 0){
                const errorResult = new Error("No se encontró el detalle de área de trabajo con el id de caracteristicas proporcionado");
                errorResult.status = 404;
                throw errorResult;
            }
            return result;
        }
        catch(error){
            throw error.status? error: { status: 500, message: "Error en DetalleAreaTrabajo Service", detalle: error.message };
        }
    }

    static async updateidAreaTrabajo(idArea, idCaracteristicas){
        try{
            const query = ` UPDATE Detalle_areaTrabajo SET Area_Trabajo_idArea_trabajo = ? WHERE Caracteristicas_idCaracteristicas = ?`;
            const [result] = await db.execute(query, [idArea, idCaracteristicas]);
            if(result.affectedRows === 0){
                throw new Error("No se encontró el detalle de área de trabajo con el id de caracteristicas proporcionado");
            }
            return { message: "I: Área de trabajo actualizada correctamente", result };
        }catch(error){
            throw error;
        }
    }
}
module.exports = DetalleAreaTrabajoDAO;