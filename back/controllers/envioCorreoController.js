const {
  sequelize
} = require("../models");

//Envío correo ganador Eroski - airpods o patinete
async function envioCorreoRegaloEroski(req, res) {
  try {
    let email = req.body.email;
    let idPremio = req.body.idPremio;

    let premio = "";
    let imgPremio = "";
    let idParticipante = 0;


    const mailjet = require("node-mailjet").connect(
      '6f2654f377598b9f7b909ac25a2856c6',
      '8a01c7f544b480a1e64c05b52f7ee8c6'
    );
    const html = await sequelize.query(`SELECT Html, html2, Html3, Html4, de, Asunto, cuenta_email FROM Templates_Email WHERE IdTemplate = 11`);

    const premioSelect = await sequelize.query(`SELECT Premio, img, IdParticipante FROM Premios WHERE IdPremio = ` + idPremio);

    premio = premioSelect[0][0].Premio;
    imgPremio = premioSelect[0][0].img;
    idParticipante = premioSelect[0][0].IdParticipante;



    const request = mailjet.post("send").request({
      FromEmail: html[0][0].cuenta_email,
      FromName: html[0][0].de,
      Subject: html[0][0].Asunto,
      "Html-part": html[0][0].Html + premio + html[0][0].html2 + `https://promocionesgrupolacasa.es/assets/images/` + imgPremio + html[0][0].Html3 + `https://promocionesgrupolacasa.es/validacion?ab=asdasdf%3D&cd=` + idParticipante + `&ef=` + email + html[0][0].Html4,
      To: email,
    });
    request
      .then((result) => {
        res.json({
          ok: true,
          msg: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          msg: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.json("no valido");
  }
}

// Envío correo entrada PortAventura

async function envioCorreoRegaloEroskiEntrada(req, res) {
  try {
    let email = req.body.email;
    let idPremio = req.body.idPremio;

    let codEntrada = ""

    const mailjet = require("node-mailjet").connect(
      '6f2654f377598b9f7b909ac25a2856c6',
      '8a01c7f544b480a1e64c05b52f7ee8c6'
    );
    const html = await sequelize.query(`SELECT Html, html2, de, Asunto, cuenta_email FROM Templates_Email WHERE IdTemplate = 12`);

    const codEntradaSelect = await sequelize.query(`SELECT CodigoEntrada, IdParticipante FROM Premios WHERE IdPremio = ` + idPremio);

    codEntrada = codEntradaSelect[0][0].CodigoEntrada

    const request = mailjet.post("send").request({
      FromEmail: html[0][0].cuenta_email,
      FromName: html[0][0].de,
      Subject: html[0][0].Asunto,
      "Html-part": html[0][0].Html + "http://localhost:4200/lacaconguicocoroom/descargar?ab=asdasdf%3D&cd=" + codEntradaSelect[0][0].IdParticipante + "&ef=" + codEntrada + html[0][0].html2,
      To: email,
    });
    request
      .then((result) => {
        res.json({
          ok: true,
          msg: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          msg: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.json("no valido");
  }
}

module.exports = {
  envioCorreoRegaloEroski,
  envioCorreoRegaloEroskiEntrada
};