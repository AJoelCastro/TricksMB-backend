const mysql = require('mysql2');
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
db.promise().getConnection()
    .then((connection) => {
        console.log('✅ Conexión a la base de datos establecida.');
        connection.release(); // Libera la conexión de vuelta al pool
    })
    .catch((error) => {
        console.error('❌ Error al conectar a la base de datos:', error);
    });

module.exports = db.promise(); // Exportamos la versión con promesas