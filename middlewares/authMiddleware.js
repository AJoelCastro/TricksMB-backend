const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

const authMiddleware = (req, res, next) => {
    try {
        // 1️⃣ Obtener el token del header (soporte flexible)
        let token = req.header('Authorization');

        if (!token) {
            return errorHandler(res, new Error('⛔ Acceso denegado. No se proporcionó un token.'), 401);
        }

        // 2️⃣ Eliminar "Bearer " si está presente
        token = token.replace(/^Bearer\s+/i, '');

        // 3️⃣ Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ Añadir usuario decodificado al request
        req.user = decoded;

        next(); // Continuar con la siguiente función
    } catch (error) {
        // Si el error es de expiración del token
        if (error.name === 'TokenExpiredError') {
            return errorHandler(res, new Error('⛔ Token expirado. Inicie sesión nuevamente.'), 401);
        }

        // Otros errores de token inválido
        return errorHandler(res, new Error('(authMidlware)⛔ Token inválido.'), 401);
    }
};

module.exports = authMiddleware;
