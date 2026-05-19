var express = require("express");

var router = express.Router();

const {
    insertParticipacionNeocine2026,
    getPremioNeocine2026,
    getDatosUsuarioNeocine2026,
    enviarDatosValidacionNeocine2026,
    getTiendasNeocine2026,

} = require("../controllers/participacionController");

router.post("/insertParticipacionNeocine2026", insertParticipacionNeocine2026);
router.get("/getTiendasNeocine2026", getTiendasNeocine2026);
router.get("/premioNeocine2026/:idParticipante/:idPremio", getPremioNeocine2026);
router.get("/datosUsuario/:IdParticipante/:CorreoParticipante", getDatosUsuarioNeocine2026);
router.post("/datosValidacion", enviarDatosValidacionNeocine2026);
module.exports = router;