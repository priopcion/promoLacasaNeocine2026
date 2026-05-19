var express = require("express");

var router = express.Router();

const {
  insertLogRecordarContrasenya,
  insertLogDatosIncorrectos,
  insertLogDatosParticipacionNeocine
} = require("../controllers/logController");

router.post("/insertLogRecordarContrasenya", insertLogRecordarContrasenya);
router.post("/insertLogDatosIncorrectos", insertLogDatosIncorrectos);
router.post("/insertLogDatosParticipacionNeocine", insertLogDatosParticipacionNeocine);
module.exports = router;