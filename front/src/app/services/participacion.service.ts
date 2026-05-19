import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

const PARTICIPACION = environment.participacion;
const GETPREMIO = environment.getPremio;
const getPremioNeocine2026 = environment.getPremioNeocine2026;
const GETDATOS = environment.getDatosUsuarioNeocine2026 ;
const VALIDACION = environment.validacion;
const getTiendasNeocine2026 = environment.getTiendasNeocine2026;
const GETENTRADA = environment.getEntradaNeocine2026;
const updateFechaDescargaNeocine2026 = environment.updateFechaDescargaNeocine2026;

@Injectable({ providedIn: "root" })
export class ParticipacionService {
  constructor(private http: HttpClient) { }

  insertParticipacion(participacion: any) {
    return this.http.post(PARTICIPACION, participacion);
  }

  getPremio(idPremio: any) {
    return this.http.get(GETPREMIO + "/" + idPremio);
  }

  getPremioNeocine2026(idParticipante: any, idPremio: any) {
    return this.http.get(getPremioNeocine2026 + "/" + idParticipante + "/" + idPremio);
  }

  getDatosUsuarioNeocine2026(idParticipante: any, email: any) {
    return this.http.get(GETDATOS + "/" + idParticipante + "/" + email);
  }

  enviarDatosValidacionNeocine2026(participante: any) {
    return this.http.post(VALIDACION, participante);
  }
  
  getTiendasNeocine2026() {
    return this.http.get(getTiendasNeocine2026);
  }

  getEntradaNeocine2026(idParticipacion: any, codEntrada: any) {
    return this.http.get(GETENTRADA + "/" + idParticipacion + "/" + codEntrada);
  }

  updateFechaDescargaNeocine2026(participacion: any) {
    return this.http.post(updateFechaDescargaNeocine2026, participacion);
  }
}
