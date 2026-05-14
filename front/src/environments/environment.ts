export const environment = {
  production: false,
  isHttpsSecured: false,
  hmr: false,
  apiUrl: "http://localhost:4000",

  //LACASA CIENESA
  participacion:
    "http://localhost:8086/participaciones/insertParticipacionEroski2026",
  getProvinciasCocoRoom: "http://localhost:8086/participaciones/provinciasCocoRoom",
  getTiendas: "http://localhost:8086/participaciones/getTiendasEroski2026",
  getPremio: "http://localhost:8086/participaciones/premio",
  getPremioEroski2026: "http://localhost:8086/participaciones/premioEroski2026",
  getDatosUsuarioEroski2026 : "http://localhost:8086/participaciones/datosUsuario",
  validacion: "http://localhost:8086/participaciones/datosValidacion",
  envioCorreoRegaloEroski: "http://localhost:8086/correo/envioCorreoRegaloEroski",
  envioCorreoRegaloEroskiEntrada: "http://localhost:8086/correo/envioCorreoRegaloEroskiEntrada",
  insertLogDatosParticipacionEroski: "http://localhost:8086/log/insertLogDatosParticipacionEroski",
  getEntradaEroski2026: "http://localhost:8086/participaciones/getEntradaEroski2026",
  updateFechaDescargaEroski2026: "http://localhost:8086/participaciones/updateFechaDescargaEroski2026",

  // login.component
  loginUsuario: "http://localhost:8086/autenticacion/loginUsuario",
  insertLogDatosIncorrectos:
    "http://localhost:8086/log/insertLogDatosIncorrectos",
};
