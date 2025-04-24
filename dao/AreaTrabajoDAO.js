const db = require('../config/db');

class AreaTrabajoDAO{
    
    static async createAreaTrabajo(Nombre){
        try{
            const query = 'INSERT INTO Area_trabajo (Nombre) VALUES (?)';
            const [rows] = await db.execute(query, [Nombre]);
            return rows;
        }catch(error){
            console.error('Error al crear area de trabajo. ', error);
            throw error;
        }
    }
    
    static async getByNombre(nombre){
        try{
            const query =  'SELECT * FROM Area_trabajo WHERE Nombre = ?';
            const rows = await db.execute(query, [nombre]);
            return rows[0];
        }catch(error){
            console.error('Error al buscar area de trabajo por nombre. ', error);
            throw error;
        }
    }
}

module.exports = AreaTrabajoDAO;