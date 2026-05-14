var express = require("express");

var router = express.Router();

const {
  envioCorreoRegaloEroski,
  envioCorreoRegaloEroskiEntrada
} = require("../controllers/envioCorreoController");

router.post("/envioCorreoRegaloEroski", envioCorreoRegaloEroski);
router.post("/envioCorreoRegaloEroskiEntrada", envioCorreoRegaloEroskiEntrada);

module.exports = router;