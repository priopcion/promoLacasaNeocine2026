const { sequelize } = require("../models");
const fs = require("fs");
const sharp = require("sharp");
const crypto = require("crypto");
const path = require("path");

async function getImageHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
}

async function insertParticipacionNeocine2026(req, res) {
  const t = await sequelize.transaction();

  let nombre = req.body.Nombre;
  let telefono = req.body.Telefono;
  let email = req.body.Email;
  let tienda = req.body.Tienda;
  let newsletter = req.body.Newsletter;

  let idPromocion = 1055;
  let fecha = new Date();
  let idParticipante = 0;
  let rutaDest = null;

  try {
    if (!req.files || !req.files.file) {
      await t.rollback();
      return res.status(400).json({ error: "No se ha recibido ningún fichero" });
    }

    let rutaImagen = req.files.file.path;
    let hash = await getImageHash(rutaImagen);

    // 1. Insertar participante
    const resultadoParticipante = await sequelize.query(
      `EXEC sp_insertarParticipanteYelmo
        @nombre = :nombre, 
        @telefono = :telefono,
        @email = :email,
        @idTienda = :tienda,
        @newsletter = :newsletter,
        @idPromocion = :idPromocion`,
      {
        replacements: {
          nombre,
          telefono,
          email,
          tienda,
          newsletter: parseInt(newsletter, 10),
          idPromocion,
        },
        type: sequelize.QueryTypes.RAW,
        transaction: t,
      },
    );

    idParticipante = resultadoParticipante[0][0].IdParticipanteLacasitos;

    // 2. Obtener fecha de participación
    const fechaParticipacionSelect = await sequelize.query(
      `SELECT FechaPart FROM ParticipantesLacasitos WHERE IdParticipanteLacasitos = :idParticipante`,
      {
        replacements: { idParticipante },
        transaction: t,
      },
    );

    const fechaPart = fechaParticipacionSelect[0][0].FechaPart.toISOString()
      .replace("Z", "")
      .replace("T", " ")
      .replace(".000", " ");

    // 3. Insertar en Gestor Documental
    const nombreFichero = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}_${idParticipante}_${req.files.file.name}`;

    await sequelize.query(
      `sp_insertarGestorDocumentalMerkocash 
        @fichero = :fichero, 
        @idParticipante = :idParticipante, 
        @idPromocion = :idPromocion,
        @hash = :hash`,
      {
        replacements: {
          fichero: nombreFichero,
          idParticipante,
          idPromocion,
          hash,
        },
        transaction: t,
      },
    );

    // 4. Copiar fichero físico
    rutaDest = "archivos/" + nombreFichero;
    await fs.promises.copyFile(rutaImagen, rutaDest);

    // 5. Commit
    await t.commit();

    // 6. Generar thumbnail
    sharp(rutaDest)
      .resize(500, 500, { fit: "fill" })
      .toFile("archivos/_rs" + nombreFichero)
      .catch((err) => console.error("Error generando thumbnail:", err));

    return res.status(200).json({ ok: true, idParticipante, fechaPart });

  } catch (error) {
    console.error("Error en insertParticipacionNeocine2026:", error);
    await t.rollback();

    if (rutaDest) {
      fs.unlink(rutaDest, (err) => {
        if (err && err.code !== "ENOENT")
          console.error("Error borrando fichero huérfano:", err);
      });
      fs.unlink("archivos/_rs" + path.basename(rutaDest), (err) => {
        if (err && err.code !== "ENOENT")
          console.error("Error borrando thumbnail huérfano:", err);
      });
    }

    return res.status(401).json("no valido");
  }
}

async function getPremioNeocine2026(req, res) {
  let idPremio = req.params.idPremio;
  let idParticipante = req.params.idParticipante;
  let idPromocion = 1055;

  try {
    const premio = await sequelize.query(
      `SELECT Premio, img FROM Premios 
        WHERE IdPromocion = :idPromocion AND IdPremio = :idPremio AND IdParticipante = :idParticipante`,
      { replacements: { idPromocion, idPremio, idParticipante } },
    );

    if (!premio[0][0]) return res.json({ error: 0 });

    res.status(200).json({
      nombrePremio: premio[0][0].Premio,
      imgPremio: premio[0][0].img,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json("No valido");
  }
}

async function getDatosUsuarioNeocine2026(req, res) {
  let idParticipante = req.params.IdParticipante;
  let email = req.params.CorreoParticipante;

  try {
    const datosUsuario = await sequelize.query(
      `SELECT * FROM ParticipantesLacasitos WHERE IdParticipanteLacasitos = :idParticipante AND Email = :email`,
      { replacements: { idParticipante, email } },
    );

    if (!datosUsuario[0][0]) return res.json({ error: 0, mensaje: "No se han encontrado los datos" });

    const haValidado = await sequelize.query(
      `SELECT Validado FROM ParticipantesLacasitos WHERE IdParticipanteLacasitos = :idParticipante AND Email = :email`,
      { replacements: { idParticipante, email } },
    );

    if (haValidado[0][0].Validado == 1) return res.json({ error: 1, mensaje: "Tus datos han sido validados" });

    res.status(200).json({
      nombre: datosUsuario[0][0].Nombre,
      email: datosUsuario[0][0].Email,
      id: idParticipante,
      telefono: datosUsuario[0][0].Telefono,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json("no valido");
  }
}

async function enviarDatosValidacionNeocine2026(req, res) {
  let idParticipante = req.body.IdParticipante;
  let nombre = req.body.Nombre;
  let telefono = req.body.Telefono;
  let email = req.body.Email;
  let tipoVia = req.body.TipoVia;
  let nombreVia = req.body.NombreVia;
  let numeroVia = req.body.NumeroVia;
  let restoDireccion = req.body.RestoDireccion;
  let localidad = req.body.Localidad;
  let tienda = req.body.Tienda;
  let cp = req.body.CP;

  try {
    await sequelize.query(
      `sp_updateParticipanteLacasitos 
        @nombre = :nombre, @telefono = :telefono, @email = :email, 
        @tipoVia = :tipoVia, @nombreVia = :nombreVia, @numeroVia = :numeroVia, 
        @restoDireccion = :restoDireccion, @localidad = :localidad,
        @tienda = :tienda, @cp = :cp, @idParticipante = :idParticipante`,
      {
        replacements: { nombre, telefono, email, tipoVia, nombreVia, numeroVia, restoDireccion, localidad, tienda, cp, idParticipante },
      },
    );

    res.status(200).json(idParticipante);
  } catch (error) {
    console.error(error);
    res.status(401).json("no valido");
  }
}

async function getTiendasNeocine2026(req, res) {
  let idPromocion = 1055;
  try {
    const tiendas = await sequelize.query(`sp_getTiendas @idPromocion = :idPromocion`, { replacements: { idPromocion } });
    res.status(200).json(tiendas[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("error");
  }
}

module.exports = {
  insertParticipacionNeocine2026,
  getPremioNeocine2026,
  getTiendasNeocine2026,
  getDatosUsuarioNeocine2026,
  enviarDatosValidacionNeocine2026,
};