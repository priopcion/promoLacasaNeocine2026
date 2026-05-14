import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { environment } from "environments/environment";

const envioCorreoRegaloEroski = environment.envioCorreoRegaloEroski;
const envioCorreoRegaloEntrada = environment.envioCorreoRegaloEroskiEntrada;

@Injectable({ providedIn: "root" })
export class EnvioCorreoService {
  constructor(private http: HttpClient) { }

  envioCorreoRegaloEroski(datosUsuario: any) {
    return this.http.post(envioCorreoRegaloEroski, datosUsuario);
  }

  envioCorreoRegaloEroskiEntrada(datosUsuario: any) {
    return this.http.post(envioCorreoRegaloEntrada, datosUsuario);
  }
}
