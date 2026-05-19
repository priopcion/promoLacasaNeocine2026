import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ParticipacionService } from "app/services/participacion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-validacion",
  templateUrl: "./validacion.component.html",
  styleUrls: ["./validacion.component.scss"],
})
export class ValidacionComponent implements OnInit {
  formDatosUsuario!: FormGroup;

  inputErrorTelefonoVacio = false;
  inputErrorNombreVacio = false;
  inputErrorApellidosVacio = false;
  inputErrorDireccionVacio = false;
  inputErrorCPVacio = false;
  inputErrorProvinciaVacio = false;

  telefonoHaSidoModificado = false;
  nombreHaSidoModificado = false;
  provinciaHaSidoModificado = false;

  yaValidado = false;
  noExistente = false;
  expirado = false;
  cargando = false;
  cargandoDatos = true;

  tiendas = null;
  idParticipante = "";
  CorreoParticipante = "";

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private participaService: ParticipacionService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.iniciaFormularioDatosUsuario();
    this.controlarURL();
    this.getTiendasNeocine2026();
  }

  iniciaFormularioDatosUsuario() {
    this.formDatosUsuario = this.fb.group({
      Nombre:         ["", [Validators.required, Validators.maxLength(100)]],
      Email:          ["", [Validators.required, Validators.email, Validators.maxLength(100)]],
      Telefono:       ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      TipoVia:        ["", [Validators.required, Validators.maxLength(100)]],
      NombreVia:      ["", [Validators.required, Validators.maxLength(100)]],
      NumeroVia:      ["", [Validators.required, Validators.maxLength(100)]],
      RestoDireccion: ["", [Validators.maxLength(100)]],
      CP:             ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      Localidad:      ["", [Validators.required, Validators.maxLength(100)]],
      Tienda:      ["", [Validators.required, Validators.maxLength(100)]],
      checkPremio:    [false, [Validators.requiredTrue]],
      checkDatos:     [false, [Validators.requiredTrue]],
    });
  }

  finalizar() {
    if (this.formDatosUsuario.invalid) {
      this.formDatosUsuario.markAllAsTouched();
      Swal.fire({
        title: "¡Oooops!",
        html: "Completa todos los campos obligatorios antes de continuar.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

    if (this.cargando) return;
    this.cargando = true;

    const datosFormulario = this.formDatosUsuario.value;
    const participante = {
      IdParticipante:  this.idParticipante,
      Nombre:          datosFormulario.Nombre,
      Telefono:        datosFormulario.Telefono,
      Email:           datosFormulario.Email,
      TipoVia:         datosFormulario.TipoVia,
      NombreVia:       datosFormulario.NombreVia,
      NumeroVia:       datosFormulario.NumeroVia,
      RestoDireccion:  datosFormulario.RestoDireccion,
      Localidad:       datosFormulario.Localidad,
      Tienda:       datosFormulario.Tienda,
      CP:              datosFormulario.CP,
    };

    this.participaService.enviarDatosValidacionNeocine2026(participante).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.cargando = false;
          this.yaValidado = true;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.cargando = false;
          this.cdr.detectChanges();
          Swal.fire({
            title: "¡Oooops!",
            html: "Ha ocurrido un error al guardar tus datos. Inténtalo de nuevo.",
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        });
      },
    });
  }

  controlaModificacionTelefono() {
    this.telefonoHaSidoModificado = true;
    this.inputErrorTelefonoVacio = this.formDatosUsuario.value.Telefono?.length < 9;
  }

  controlaModificacionNombre() {
    this.nombreHaSidoModificado = true;
  }

  controlaModificacionProvincia() {
    this.provinciaHaSidoModificado = true;
  }

  getTiendasNeocine2026() {
    this.participaService.getTiendasNeocine2026().subscribe((data: any) => {
      this.ngZone.run(() => {
        this.tiendas = data;
        this.cdr.detectChanges();
      });
    });
  }

  getDatosParticipante() {
    if (!this.idParticipante || !this.CorreoParticipante) {
      this.noExistente = true;
      this.cargandoDatos = false;
      this.cdr.detectChanges();
      return;
    }

    this.participaService
      .getDatosUsuarioNeocine2026(this.idParticipante, this.CorreoParticipante)
      .subscribe({
        next: (data: any) => {
          this.ngZone.run(() => {
            this.cargandoDatos = false;
            if (data.error == 0) {
              this.noExistente = true;
            } else if (data.error == 1) {
              this.yaValidado = true;
            } else {
              this.formDatosUsuario.patchValue({
                Email:    data.email,
                Nombre:   data.nombre,
                Telefono: data.telefono,
              });
            }
            this.cdr.detectChanges();
          });
        },
        error: () => {
          this.ngZone.run(() => {
            this.cargandoDatos = false;
            this.noExistente = true;
            this.cdr.detectChanges();
          });
        },
      });
  }

  controlarURL() {
    const url = window.location.href;
    const partes = url.split("&");

    if (!partes[1] || !partes[2]) {
      this.noExistente = true;
      this.cargandoDatos = false;
      this.cdr.detectChanges();
      return;
    }

    this.idParticipante = partes[1].split("=")[1];
    this.CorreoParticipante = partes[2].split("=")[1];

    this.getDatosParticipante();
  }
}