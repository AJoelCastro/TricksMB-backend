const db = require('../config/db');
const CodQR = require('qrcode');

class CajaDAO{

    static async createCaja(idCaracteristica){
        try{
            const query = `INSERT INTO Caja (Caracteristicas_idCaracteristicas, CodigoQR) VALUES (?, ?)`;
            const [result] = await db.execute(query, [idCaracteristica, "tempQR"]);
            const idCaja = result.insertId;
            const URL = `http://tricks.com/caja/${idCaja}`;
            const qrImage = await CodQR.toDataURL(URL);
            await db.query(`UPDATE Caja SET CodigoQR = ? WHERE idCaja = ?`, [qrImage, idCaja]);

            return {idCaja, idCaracteristica, qrImage};
        }catch(error){
            const cajaDao = new Error("Error interno al crear la caja.");
            cajaDao.status = 500;
            throw cajaDao;
        }
    } 

    static async getAllCajaByPedido(idCaracteristica){
        try{
            const query = `
                SELECT * 
                FROM Caja
                WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [rows] = await db.execute(query, [idCaracteristica]);
            return rows;
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    static async getCajaById(idCaja){
        try{
            const query = `SELECT * FROM Caja WHERE idCaja = ?`;
            const [rows] = await db.execute(query, [idCaja]);
            return rows[0];
        }catch(error){
            const cajaDao = new Error("Error interno al obtener la caja del servidor.");
            cajaDao.status = 500;
            throw cajaDao;
        }
    }

}

module.exports = CajaDAO;