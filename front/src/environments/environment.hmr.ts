export const environment = {
  production: false,
  hmr: true,
  apiUrl: 'https://api.proyectosrotulaciones.com:8106',

  // login.component
  loginUsuario: 'https://api.proyectosrotulaciones.com:8106/autenticacion/loginUsuario',
  insertLogDatosIncorrectos: 'https://api.proyectosrotulaciones.com:8106/log/insertLogDatosIncorrectos',

  // recordar-contrasenya.component
  recordarContrasenya: 'https://api.proyectosrotulaciones.com:8106/autenticacion/recordarContrasenya',
  enviarCorreoRecordarContrasenya: 'https://api.proyectosrotulaciones.com:8106/envioCorreo/enviarCorreoRecordarContrasenya',
  insertLogRecordarContrasenya: 'https://api.proyectosrotulaciones.com:8106/log/insertLogRecordarContrasenya',
};
