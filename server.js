const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/ClienteRoutes');
const pedidoRoutes = require('./routes/PedidoRoutes');
const modeloRoutes = require('./routes/ModeloRoutes');
const tipoCalzadoRoutes = require('./routes/TipoCalzadoRoutes');
const DetalleAreaTrabajoRoutes = require('./routes/DetalleAreaTrabajoRoutes');
const caracteristicasRoutes = require('./routes/CaracteristicasRoutes');
const detallePedidoRoutes = require('./routes/DetallePedidoRoutes');
const AreaTrabajoRoutes = require('./routes/AreaTrabajoRoutes');
const Empleado = require('./routes/EmpleadoRoutes');
const CajaRoutes = require('./routes/CajaRoutes');
const AlmacenRoutes= require('./routes/AlmacenRoutes');
const DetalleAlmacenRoutes = require('./routes/DetalleAlmacenRoutes');
const IngresoRoutes = require("./routes/IngresoRoutes");
const SalidaRoutes = require("./routes/SalidaRoutes");
const errorHandler = require('./utils/errorHandler'); // Importamos errorHandler

require('dotenv').config();

// Crear la aplicación
const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permitir solicitudes desde cualquier origen (útil para desarrollo)
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, tokens)
};

// Middleware
app.use(cors(corsOptions)); // Usar la configuración de CORS
app.use(express.json()); // Para parsear JSON en las solicitudes

// Verificar que las variables de entorno estén configuradas
const requiredEnv = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`⚠️  La variable de entorno ${key} no está configurada.`);
        process.exit(1); // Detiene el servidor si falta una variable crítica
    }
});

// Rutas
app.use('/usuario', userRoutes);
app.use('/cliente', clienteRoutes);
app.use('/detallePedido',detallePedidoRoutes);
app.use('/pedido',pedidoRoutes);
app.use('/caracteristicas',caracteristicasRoutes);
app.use('/modelo', modeloRoutes);
app.use('/tipoCalzado', tipoCalzadoRoutes);
app.use('/detalleAreaTrabajo', DetalleAreaTrabajoRoutes);
app.use('/empleado', Empleado);
app.use('/areaTrabajo', AreaTrabajoRoutes);
app.use('/caja', CajaRoutes);
app.use('/almacen', AlmacenRoutes);
app.use('/detalleAlmacen', DetalleAlmacenRoutes);
app.use('/ingreso', IngresoRoutes);
app.use('/salida', SalidaRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global con `errorHandler`
app.use((err, req, res, next) => {
    errorHandler(res, err, 500);
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red
app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
});

const os = require("os");

const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        for (const config of iface) {
            if (config.family === "IPv4" && !config.internal) {
                return config.address;
            }
        }
    }
    return "No se encontró la IP";
};

console.log("Tu IP actual es:", getLocalIP());





