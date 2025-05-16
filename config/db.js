const mysql = require('mysql2');
const UsuarioService = require('../services/UsuarioService');
require('dotenv').config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Espera a que haya conexiones disponibles
    connectionLimit: 10,      // Límite de conexiones simultáneas
    queueLimit: 0             // Sin límite en la cola de espera
});

// Verificar la conexión inmediatamente
async function verifyConnection() {
    try {
        const connection = await db.promise().getConnection();
        console.log('✅ Conexión a la base de datos establecida.');
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
    }
}
// Crea el usuario ADMIN si no existe
async function ensureAdminUserExists() {
    try {
        const connection = await db.promise().getConnection();

        const [rows] = await connection.query(
            'SELECT * FROM usuario WHERE Rol_idRol = ?',
            ['1']
        );

        if (rows.length === 0) {
            const userAdmin = UsuarioService.createAdminUser();
            console.log('🛡️ Usuario ADMIN creado con éxito.', userAdmin);
        } else {
            console.log('ℹ️ El usuario ADMIN ya existe.');
        }

        connection.release();
    } catch (error) {
        console.error('❌ Error al verificar o crear el usuario ADMIN:', error);
    }
}

// Ejecuta ambas funciones al iniciar
(async () => {
    await verifyConnection();
    await ensureAdminUserExists();
})();

module.exports = db.promise(); // Exportamos la versión con promesas