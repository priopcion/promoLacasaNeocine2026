import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ParticipacionService } from "app/services/participacion.service";
import Swal from "sweetalert2";

const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

export function dniValidator(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value || "").toString().toUpperCase().trim();
  if (!valor) return null;

  if (!/^[XYZ0-9][0-9]{7}[A-Z]$/.test(valor)) return { dni: true };

  // NIE: X -> 0, Y -> 1, Z -> 2
  const numero = valor
    .substring(0, 8)
    .replace(/^X/, "0")
    .replace(/^Y/, "1")
    .replace(/^Z/, "2");

  return LETRAS_DNI.charAt(parseInt(numero, 10) % 23) === valor.charAt(8) ? null : { dni: true };
}

@Component({
  selector: "app-validacion",
  templateUrl: "./validacion.component.html",
  styleUrls: ["./validacion.component.scss"],
})
export class ValidacionComponent implements OnInit {
  @ViewChild("inputDniAnverso") inputDniAnverso!: ElementRef;
  @ViewChild("inputDniReverso") inputDniReverso!: ElementRef;

  formDatosUsuario!: FormGroup;

  fileDniAnverso: any = null;
  fileDniReverso: any = null;
  previewDniAnverso = "";
  previewDniReverso = "";
  dniAnversoAdjunto = false;
  dniReversoAdjunto = false;

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

  provincias = null;
  idParticipante = "";
  CorreoParticipante = "";

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private participaService: ParticipacionService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.iniciaFormularioDatosUsuario();
    this.controlarURL();
    this.getProvinciasNeocine2026();
  }

  iniciaFormularioDatosUsuario() {
    this.formDatosUsuario = this.fb.group({
      Nombre:         ["", [Validators.required, Validators.maxLength(100)]],
      Email:          ["", [Validators.required, Validators.email, Validators.maxLength(100)]],
      Telefono:       ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      Dni:            ["", [Validators.required, dniValidator]],
      TipoVia:        ["", [Validators.required, Validators.maxLength(100)]],
      NombreVia:      ["", [Validators.required, Validators.maxLength(100)]],
      NumeroVia:      ["", [Validators.required, Validators.maxLength(100)]],
      RestoDireccion: ["", [Validators.maxLength(100)]],
      CP:             ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      Localidad:      ["", [Validators.required, Validators.maxLength(100)]],
      Provincia:      ["", [Validators.required, Validators.maxLength(50)]],
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

    if (!this.fileDniAnverso || !this.fileDniReverso) {
      Swal.fire({
        title: "¡Oooops!",
        html: "Debes adjuntar la foto del <b>anverso</b> y del <b>reverso</b> de tu DNI.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

    if (this.cargando) return;
    this.cargando = true;

    const datosFormulario = this.formDatosUsuario.value;

    const participante: FormData = new FormData();
    participante.append("IdParticipante", this.idParticipante);
    participante.append("Nombre", datosFormulario.Nombre);
    participante.append("Telefono", datosFormulario.Telefono);
    participante.append("Email", datosFormulario.Email);
    participante.append("Dni", (datosFormulario.Dni || "").toUpperCase().trim());
    participante.append("TipoVia", datosFormulario.TipoVia);
    participante.append("NombreVia", datosFormulario.NombreVia);
    participante.append("NumeroVia", datosFormulario.NumeroVia);
    participante.append("RestoDireccion", datosFormulario.RestoDireccion);
    participante.append("Localidad", datosFormulario.Localidad);
    participante.append("Provincia", datosFormulario.Provincia);
    participante.append("CP", datosFormulario.CP);
    participante.append("ficheroDniAnverso", this.fileDniAnverso.name);
    participante.append("fileDniAnverso", this.fileDniAnverso);
    participante.append("ficheroDniReverso", this.fileDniReverso.name);
    participante.append("fileDniReverso", this.fileDniReverso);

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

  abrirInputDni(cara: "anverso" | "reverso") {
    const input = cara === "anverso" ? this.inputDniAnverso : this.inputDniReverso;
    if (input) {
      input.nativeElement.value = "";
      input.nativeElement.click();
    }
  }

  seleccionaFotoDni(evento: any, cara: "anverso" | "reverso") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    if (!evento.target.files || evento.target.files.length === 0) {
      Toast.fire({ icon: "error", title: "No has seleccionado imagen" });
      return;
    }

    const fichero = evento.target.files.item(0);
    const ext = fichero.name.split(".").pop()?.toLowerCase();

    if (this.extensionEsInvalida(ext)) {
      Swal.fire({ title: "Ooops!", html: "Esta imagen no es válida", icon: "error" });
      return;
    }

    const titulo = cara === "anverso" ? "anverso" : "reverso";

    Swal.fire({
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showDenyButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      confirmButtonColor: "#678ef0",
      confirmButtonText: "Aceptar",
      denyButtonColor: "#e86464",
      denyButtonText: "Cambiar",
      title: "Vas a subir el " + titulo + " de tu DNI",
      html:
        "<h3>¿Es correcto?</h3><br><img style='border-radius: 2rem' width=100% src=" +
        window.URL.createObjectURL(fichero) +
        ">",
    }).then((result) => {
      if (result.isDenied) {
        this.limpiaFotoDni(cara);
        Toast.fire({ icon: "error", title: "Imagen no añadida" });
        this.abrirInputDni(cara);
        return;
      }

      if (cara === "anverso") {
        this.fileDniAnverso = fichero;
        this.previewDniAnverso = window.URL.createObjectURL(fichero);
        this.dniAnversoAdjunto = true;
      } else {
        this.fileDniReverso = fichero;
        this.previewDniReverso = window.URL.createObjectURL(fichero);
        this.dniReversoAdjunto = true;
      }

      this.cdr.detectChanges();
      Toast.fire({ icon: "success", title: "Imagen añadida" });
    });
  }

  limpiaFotoDni(cara: "anverso" | "reverso") {
    if (cara === "anverso") {
      this.fileDniAnverso = null;
      this.previewDniAnverso = "";
      this.dniAnversoAdjunto = false;
    } else {
      this.fileDniReverso = null;
      this.previewDniReverso = "";
      this.dniReversoAdjunto = false;
    }
    this.cdr.detectChanges();
  }

  extensionEsInvalida(ext: any) {
    const extensionesProhibidas = [
      "zip", "bat", "exe", "rar", "xls", "xlsx", "pdf",
      "psd", "sql", "csv", "doc", "docx", "bak", "7z", "heic",
    ];
    return extensionesProhibidas.includes(ext);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

  getProvinciasNeocine2026() {
    this.participaService.getProvinciasNeocine2026().subscribe((data: any) => {
      this.ngZone.run(() => {
        this.provincias = data;
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