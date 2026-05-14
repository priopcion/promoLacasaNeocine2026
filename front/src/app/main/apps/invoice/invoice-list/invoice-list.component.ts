import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import localeES from "@angular/common/locales/es";

import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { AnaliticasService } from 'app/services/analiticas.service';
import { formatDate, registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public registrosSeleccionados = 10;
  public modoColumnas = ColumnMode;
  public estadosSeleccionados = [];
  public estados: any = [];

  public filas;
  public valorBusqueda = '';
  public filtroDatosTemporales;
  public estadoAnteriorFiltro = '';
  private datosTemporales = [];

  haCargado = false;

  constructor(private analiticasService: AnaliticasService) {
  }

  ngOnInit(): void {
    registerLocaleData(localeES, "es");
    // this.getTablaUltimosParticipantes();
    // this.getEstadosParticipaciones()
  }

  // getTablaUltimosParticipantes() {
  //   this.analiticasService.getTablaUltimosParticipantes().subscribe(dataUltimosParticipantes => {
  //     let numDatos = Object.keys(dataUltimosParticipantes).length;
  //     for (let i = 0; i < numDatos; i++) {
  //       dataUltimosParticipantes[i].FechaParticipacion = formatDate(
  //         dataUltimosParticipantes[i].FechaParticipacion,
  //         "dd-MM-yyyy HH:mm:ss",
  //         "es",
  //         "UTC"
  //       );
  //     }
  //     this.filas = dataUltimosParticipantes;
  //     this.datosTemporales = this.filas;
  //     this.filtroDatosTemporales = this.filas;
  //   });
  // }

  // getEstadosParticipaciones() {
  //   this.analiticasService.getEstadosParticipaciones().subscribe(dataEstadoParticipaciones => {
  //     this.estados = dataEstadoParticipaciones
  //     this.haCargado = true
  //   });
  // }

  filtrar(evento) {
    this.estadosSeleccionados = this.estados[0];
    const textoFiltro = evento.target.value.toLowerCase();

    const datosTmp = this.datosTemporales.filter(function (d) {
      return (
        d.Nombre.toLowerCase().indexOf(textoFiltro) !== -1 ||
        d.Participante.toLowerCase().indexOf(textoFiltro) !== -1 ||
        d.Email.toLowerCase().indexOf(textoFiltro) !== -1 ||
        d.Localidad.toLowerCase().indexOf(textoFiltro) !== -1 ||
        String(d.Participacion).indexOf(textoFiltro) !== -1) || !textoFiltro;
    });

    this.filas = datosTmp;
    this.table.offset = 0;
  }

  filtrarPorEstado(evento) {
    const filter = evento ? evento.value : '';
    this.estadoAnteriorFiltro = filter;
    this.filtroDatosTemporales = this.filtrarRegistros(filter);
    this.filas = this.filtroDatosTemporales;
  }

  filtrarRegistros(estadoFiltro): any[] {
    this.valorBusqueda = '';

    estadoFiltro = estadoFiltro.toLowerCase();

    return this.datosTemporales.filter(row => {
      const isPartialNameMatch = row.Estado.toLowerCase().indexOf(estadoFiltro) !== -1 || !estadoFiltro;
      return isPartialNameMatch;
    });
  }
}
