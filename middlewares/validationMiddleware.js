const { body, validationResult } = require('express-validator');

const validateUser = [
    body('correo').isEmail().withMessage('Debe ser un correo válido'),
    body('contrasenia').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
