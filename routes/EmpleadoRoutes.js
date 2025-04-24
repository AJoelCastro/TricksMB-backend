const EmpleadoController = require("../controllers/EmpleadoController");
const DetalleEmpleadoPedidoController = require("../controllers/DetalleEmpleadoPedidoController");

const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/crear", EmpleadoController.createEmpleado);
router.get("/buscar/:dni", EmpleadoController.getByDni);
router.get("/buscarPorArea",authMiddleware, EmpleadoController.getEmpleados);
router.post("/crearDetalleEmpleadoPedido",authMiddleware, DetalleEmpleadoPedidoController.createDetalleEmpleadoPedido);
router.get("/obtenerEmpleadoPedido",authMiddleware, DetalleEmpleadoPedidoController.getAllDetalleEmpleadoPedido);

module.exports = router;