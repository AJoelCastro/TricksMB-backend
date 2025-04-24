const IngresoController = require("../controllers/IngresoController");
const express = require("express");
const router = express.Router();
const autMiddleware = require("../middlewares/authMiddleware");

router.post("/crear", autMiddleware, IngresoController.createIngreso);
router.get("/obtener/:idCaja", IngresoController.getIngresosByCaja);

module.exports = router;