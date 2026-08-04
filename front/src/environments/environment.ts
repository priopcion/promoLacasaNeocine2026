export const environment = {
  production: false,
  isHttpsSecured: false,
  hmr: false,
  apiUrl: "http://localhost:4000",

  //LACASA CIENESA
  participacion:
    "http://localhost:8086/participaciones/insertParticipacionNeocine2026",
  getTiendasNeocine2026: "http://localhost:8086/participaciones/getTiendasNeocine2026",
  getProvinciasNeocine2026: "http://localhost:8086/participaciones/getProvinciasNeocine2026",
  getPremio: "http://localhost:8086/participaciones/premio",
  getPremioNeocine2026: "http://localhost:8086/participaciones/premioNeocine2026",
  getDatosUsuarioNeocine2026 : "http://localhost:8086/participaciones/datosUsuario",
  enviarDatosValidacionNeocine2026: "http://localhost:8086/participaciones/enviarDatosValidacionNeocine2026",
  insertLogDatosParticipacionNeocine: "http://localhost:8086/log/insertLogDatosParticipacionNeocine",
  getEntradaNeocine2026: "http://localhost:8086/participaciones/getEntradaNeocine2026",
  updateFechaDescargaNeocine2026: "http://localhost:8086/participaciones/updateFechaDescargaNeocine2026",

  // login.component
  loginUsuario: "http://localhost:8086/autenticacion/loginUsuario",
  insertLogDatosIncorrectos:
    "http://localhost:8086/log/insertLogDatosIncorrectos",
};
