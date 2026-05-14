var express = require("express");

var router = express.Router();

const {
  insertLogRecordarContrasenya,
  insertLogDatosIncorrectos,
  insertLogDatosParticipacionEroski
} = require("../controllers/logController");

router.post("/insertLogRecordarContrasenya", insertLogRecordarContrasenya);
router.post("/insertLogDatosIncorrectos", insertLogDatosIncorrectos);
router.post("/insertLogDatosParticipacionEroski", insertLogDatosParticipacionEroski);
module.exports = router;