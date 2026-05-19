import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

const insertLogDatosIncorrectos = environment.insertLogDatosIncorrectos;
const insertLogDatosParticipacionNeocine = environment.insertLogDatosParticipacionNeocine;

@Injectable({ providedIn: "root" })
export class LogService {
  constructor(private http: HttpClient) {}


  insertLogDatosIncorrectos(datosInsertLOG: any) {
    return this.http.post(insertLogDatosIncorrectos, datosInsertLOG);
  }

  logInsertParticipacion(datosInsertLog: any) {
    return this.http.post(insertLogDatosParticipacionNeocine, datosInsertLog);
  }
}
