const {
  sequelize
} = require("../models");

async function insertLogRecordarContrasenya(req, res) {
  try {
    let tipoDispositivo = req.body.tipoDispositivo;
    let navegadorUsuario = req.body.navegadorUsuario;
    let fabricanteDispositivo = req.body.fabricanteDispositivo;
    let modeloDispositivo = req.body.modeloDispositivo;
    let sistemaOperativo = req.body.sistemaOperativo;
    let ipUsuario = req.body.ipUsuario;
    let idUsuario = req.body.idUsuario;
    let accion = req.body.accion;
    let usuarioIntroducido = req.body.usuarioIntroducido;

    await sequelize.query(
      "sp_insertLogRecordarContrasenya @IdUsuario = " +
      idUsuario +
      ", @Dispositivo = " +
      tipoDispositivo +
      ", @Navegador = " +
      navegadorUsuario +
      ", @Fabricante = '" +
      fabricanteDispositivo +
      "', @Modelo = '" +
      modeloDispositivo +
      "', @SistemaOperativo = '" +
      sistemaOperativo +
      "', @Accion = '" +
      accion +
      "', @IpUsuario ='" +
      ipUsuario +
      "', @UsuarioIntroducido = '" +
      usuarioIntroducido +
      "'"
    );
    res.status(200).json("fin");
  } catch (err) {
    res.status(401).json("Ha Habido Un Error En La API");
  }
}

async function insertLogDatosIncorrectos(req, res) {
  try {
    let tipoDispositivo = req.body.tipoDispositivo;
    let navegadorUsuario = req.body.navegadorUsuario;
    let fabricanteDispositivo = req.body.fabricanteDispositivo;
    let modeloDispositivo = req.body.modeloDispositivo;
    let sistemaOperativo = req.body.sistemaOperativo;
    let ipUsuario = req.body.ipUsuario;
    let accion = req.body.accion;
    let usuarioIntroducido = req.body.usuarioIntroducido;
    let passwordIntroducida = req.body.passwordIntroducida;

    await sequelize.query(
      "sp_insertLogDatosIncorrectos @Dispositivo = " +
      tipoDispositivo +
      ", @Navegador = " +
      navegadorUsuario +
      ", @Fabricante = '" +
      fabricanteDispositivo +
      "', @Modelo = '" +
      modeloDispositivo +
      "', @SistemaOperativo = '" +
      sistemaOperativo +
      "', @Accion = '" +
      accion +
      "', @IpUsuario ='" +
      ipUsuario +
      "', @UsuarioIntroducido = '" +
      usuarioIntroducido +
      "', @PasswordIntroducida = '" +
      passwordIntroducida +
      "'"
    );
    res.status(200).json("fin");
  } catch (err) {
    res.status(401).json("Ha Habido Un Error En La API");
  }
}

async function insertLogDatosParticipacionNeocine(req, res) {
  try {
    let idParticipante = req.body.idParticipante;
    let tipoDispositivo = req.body.tipoDispositivo;
    let navegadorUsuario = req.body.navegadorUsuario;
    let fabricanteDispositivo = req.body.fabricanteDispositivo;
    let modeloDispositivo = req.body.modeloDispositivo;
    let sistemaOperativo = req.body.sistemaOperativo;
    let accion = req.body.accion;
    let ipUsuario = req.body.ipUsuario;

    await sequelize.query(
      "sp_insertLogNuevoParticipanteRepsol @IdParticipante = " +
      idParticipante +
      ", @Dispositivo = '" +
      tipoDispositivo +
      "', @Navegador = '" +
      navegadorUsuario +
      "', @Fabricante = '" +
      fabricanteDispositivo +
      "', @Modelo = '" +
      modeloDispositivo +
      "', @SistemaOperativo = '" +
      sistemaOperativo +
      "', @Accion = '" +
      accion +
      "', @IpUsuario ='" +
      ipUsuario +
      "'"
    );
    res.status(200).json("Participante guardado correctamente");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
}

module.exports = {
  insertLogRecordarContrasenya,
  insertLogDatosIncorrectos,
  insertLogDatosParticipacionNeocine
};