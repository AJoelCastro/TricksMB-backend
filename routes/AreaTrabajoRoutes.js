const AreaTrabajoController = require('../controllers/AreaTrabajoController');
const express = require('express');
const router = express.Router();

router.post("/crear", AreaTrabajoController.createAreaTrabajo);

module.exports = router;