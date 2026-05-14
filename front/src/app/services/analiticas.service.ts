import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

// const getAnaliticaTotalBares = environment.getAnaliticaTotalBares;
// const getAnaliticaTotalParticipaciones = environment.getAnaliticaTotalParticipaciones;
// const getAnaliticaTotalParticipantes = environment.getAnaliticaTotalParticipantes;
// const getAnaliticaTotalPremiosCanjeados = environment.getAnaliticaTotalPremiosCanjeados;
// const getAnaliticaTotalParticipacionesPorEdad = environment.getAnaliticaTotalParticipacionesPorEdad;
// const getAnaliticaTotalParticipacionesPorNavegador = environment.getAnaliticaTotalParticipacionesPorNavegador;
// const getTablaUltimosParticipantes = environment.getTablaUltimosParticipantes;
// const getEstadosParticipaciones = environment.getEstadosParticipaciones;

@Injectable({ providedIn: 'root' })
export class AnaliticasService {

  constructor(private http: HttpClient) {
  }

  // getAnaliticaTotalBares() {
  //   return this.http.get(getAnaliticaTotalBares);
  // }

  // getAnaliticaTotalParticipaciones() {
  //   return this.http.get(getAnaliticaTotalParticipaciones);
  // }

  // getAnaliticaTotalParticipantes() {
  //   return this.http.get(getAnaliticaTotalParticipantes);
  // }

  // getAnaliticaTotalPremiosCanjeados() {
  //   return this.http.get(getAnaliticaTotalPremiosCanjeados);
  // }

  // getAnaliticaTotalParticipacionesPorEdad(numRows: number) {
  //   return this.http.get(getAnaliticaTotalParticipacionesPorEdad + numRows);
  // }

  // getAnaliticaTotalParticipacionesPorNavegador() {
  //   return this.http.get(getAnaliticaTotalParticipacionesPorNavegador);
  // }

  // getTablaUltimosParticipantes() {
  //   return this.http.get(getTablaUltimosParticipantes);
  // }

  // getEstadosParticipaciones() {
  //   return this.http.get(getEstadosParticipaciones);
  // }
}

