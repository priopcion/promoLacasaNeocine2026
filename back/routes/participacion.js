var express = require("express");

var router = express.Router();

const {
    insertParticipacionEroski2026,
    getPremioEroski2026,
    getDatosUsuarioEroski2026,
    enviarDatosValidacionEroski2026,
    getTiendasEroski2026,
        getProvinciasCocoRoom,

} = require("../controllers/participacionController");

router.post("/insertParticipacionEroski2026", insertParticipacionEroski2026);
router.get("/provinciasCocoRoom", getProvinciasCocoRoom);
router.get("/getTiendasEroski2026", getTiendasEroski2026);
router.get("/premioEroski2026/:idParticipante/:idPremio", getPremioEroski2026);
router.get("/datosUsuario/:IdParticipante/:CorreoParticipante", getDatosUsuarioEroski2026);
router.post("/datosValidacion", enviarDatosValidacionEroski2026);
module.exports = router;