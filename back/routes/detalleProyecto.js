var express = require("express");

var router = express.Router();

const {
  getExistenciaProyecto,
  getCategorias,
  getProductosCategoria,
  getDatosProyecto,
  getProductosProyecto,
  getImagenesProyecto,
  getDatosContratoProyecto,
  insertProductoProyecto,
  insertImagenProyecto,
  eliminaImagenProyecto,
} = require("../controllers/detalleProyectoController");

router.get("/getExistenciaProyecto/:idProyecto", getExistenciaProyecto);
router.get("/getCategorias", getCategorias);
router.get(
  "/getProductosCategoria/:categoriaSeleccionada",
  getProductosCategoria
);
router.get("/getDatosProyecto/:idProyecto", getDatosProyecto);
router.get("/getProductosProyecto/:idProyecto", getProductosProyecto);
router.get("/getImagenesProyecto/:idProyecto", getImagenesProyecto);
router.get("/getDatosContratoProyecto/:idProyecto", getDatosContratoProyecto);
router.post("/insertProductoProyecto", insertProductoProyecto);
router.post("/insertImagenProyecto", insertImagenProyecto);
router.post("/eliminaImagenProyecto", eliminaImagenProyecto);
module.exports = router;
