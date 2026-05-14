import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

const PARTICIPACION = environment.participacion;
const GETPREMIO = environment.getPremio;
const getPremioEroski2026 = environment.getPremioEroski2026;
const GETDATOS = environment.getDatosUsuarioEroski2026 ;
const VALIDACION = environment.validacion;
const getProvinciasCocoRoom = environment.getProvinciasCocoRoom;
const GETTIENDAS = environment.getTiendas;
const GETENTRADA = environment.getEntradaEroski2026;
const updateFechaDescargaEroski2026 = environment.updateFechaDescargaEroski2026;

@Injectable({ providedIn: "root" })
export class ParticipacionService {
  constructor(private http: HttpClient) { }

  insertParticipacion(participacion: any) {
    return this.http.post(PARTICIPACION, participacion);
  }

  getPremio(idPremio: any) {
    return this.http.get(GETPREMIO + "/" + idPremio);
  }

  getPremioEroski2026(idParticipante: any, idPremio: any) {
    return this.http.get(getPremioEroski2026 + "/" + idParticipante + "/" + idPremio);
  }

  getDatosUsuarioEroski2026(idParticipante: any, email: any) {
    return this.http.get(GETDATOS + "/" + idParticipante + "/" + email);
  }

  enviarDatosValidacionEroski2026(participante: any) {
    return this.http.post(VALIDACION, participante);
  }
  
  getProvinciasCocoRoom() {
    return this.http.get(getProvinciasCocoRoom);
  }

  getTiendas() {
    return this.http.get(GETTIENDAS);
  }

  getEntradaEroski2026(idParticipacion: any, codEntrada: any) {
    return this.http.get(GETENTRADA + "/" + idParticipacion + "/" + codEntrada);
  }

  updateFechaDescargaEroski2026(participacion: any) {
    return this.http.post(updateFechaDescargaEroski2026, participacion);
  }
}
