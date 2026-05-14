import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ParticipacionService } from "app/services/participacion.service";
import Swal from "sweetalert2";
import DeviceDetector from "device-detector-js";

@Component({
  selector: "app-landing-formulario",
  templateUrl: "./landing-formulario.component.html",
  styleUrls: ["./landing-formulario.component.scss"],
})
export class LandingFormularioComponent implements OnInit {
  @ViewChild("presionaParticipa") presionaParticipa!: ElementRef;
  @ViewChild("presionaInputFile") presionaInputFile!: ElementRef;

  formDatosUsuario!: FormGroup;
  provincias: string[] = [];
  tamanyoMovil = false;

  ocultarDiv = false;
  crollPos = 0;

  errorInputTelefono = false;
  errorInputEmail = false;
  errorInputApellidos = false;
  errorInputNombre = false;

  fabricanteDispositivo = "";
  modeloDispositivo = "";
  navegadorUsuario = "";
  sistemaOperativo = "";
  tipoDispositivo = "";
  ipUsuario = "";
  accion = "";

  files: any[] = [];
  file: any = null;
  ext: any;
  fileCargado: any = null;

  previewImagen = "";
  imagenAdjunta = false;
  docAdjunto = false;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private participaService: ParticipacionService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    localStorage.setItem("lastRoute", `/lacaeroski`);
    this.iniciaFormularioDatosUsuario();
    this.getProvinciasCocoRoom();
    this.detectaDimensionesPantalla();
    this.getIPUsuario();
    this.getDatosDispositivo();
    this.obtenModeloIpad();
    this.obtenModeloIphone();
  }

  @HostListener('window:resize')
  onResize() {
    this.detectaDimensionesPantalla();
  }

  detectaDimensionesPantalla(): void {
    this.tamanyoMovil = window.innerWidth < 768;
  }

  iniciaFormularioDatosUsuario() {
    this.formDatosUsuario = this.fb.group({
      Nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(-[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*(\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(-[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*){1,}$/)
      ]],
      Email: ["", [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/)]],
      TicketCompra: ["", Validators.required],
      Telefono: ["", [Validators.required, Validators.pattern(/^[6789]\d{2}[\s]?\d{3}[\s]?\d{3}$/)]],
      Provincia: ["", Validators.required],
      terminoCondiciones: ["", Validators.required],
      newsletter: [],
    });
  }

  getProvinciasCocoRoom() {
    this.participaService.getProvinciasCocoRoom().subscribe((data: any) => {
      this.provincias = data;
      this.cdr.detectChanges();
    });
  }

  participar() {
    this.presionaParticipa.nativeElement.disabled = true;

    if (this.formDatosUsuario.invalid) {
      Swal.fire({
        title: "¡Oooops!",
        html: `Completa todos los campos y comprueba que esté marcada la casilla de
          <b>acepto Términos y Condiciones</b> y la <b>Política de Privacidad</b>`,
        icon: "error",
        allowOutsideClick: false,
        keydownListenerCapture: false,
        allowEscapeKey: false,
      });
      this.formDatosUsuario.markAllAsTouched();
      this.presionaParticipa.nativeElement.disabled = false;
      return;
    }

    if (!this.file || (!this.imagenAdjunta && !this.docAdjunto)) {
      Swal.fire({
        title: "¡Oooops!",
        html: "Debes adjuntar el <b>ticket de compra</b> antes de participar.",
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      this.presionaParticipa.nativeElement.disabled = false;
      return;
    }

    const datosFormulario = this.formDatosUsuario.value;
    const ckNewsletter = datosFormulario.newsletter === true ? 1 : 0;

    const formData: FormData = new FormData();
    formData.append("Nombre", datosFormulario.Nombre);
    formData.append("Telefono", datosFormulario.Telefono);
    formData.append("Email", datosFormulario.Email);
    formData.append("Provincia", datosFormulario.Provincia);
    formData.append("fichero", this.file.name);
    formData.append("file", this.file);
    formData.append("Newsletter", ckNewsletter.toString());

    this.participaService.insertParticipacion(formData).subscribe({
      next: () => {
        this.router.navigate(["/ganador"]);
      },
      error: () => {
        Swal.fire({
          title: "¡Oooops!",
          html: "Ha ocurrido un error al procesar tu participación. Inténtalo de nuevo.",
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        this.presionaParticipa.nativeElement.disabled = false;
      },
    });
  }

  inicio() {
    this.router.navigate(["/"]);
  }

  getIPUsuario() {
    this.http.get("https://api.db-ip.com/v2/free/self").subscribe((res: any) => {
      this.ipUsuario = res.ipAddress;
    });
  }

  getDatosDispositivo() {
    if (navigator.userAgent.indexOf("Safari") > -1) this.navegadorUsuario = "Safari";
    if (navigator.userAgent.indexOf("Chrome") > -1) this.navegadorUsuario = "Chrome";
    if (navigator.userAgent.indexOf("Edge") > -1 || navigator.userAgent.indexOf("Edg") > -1)
      this.navegadorUsuario = "Edge";
    if (navigator.userAgent.indexOf("OP") > -1) this.navegadorUsuario = "Opera";
    if (navigator.userAgent.indexOf("Firefox") > -1) this.navegadorUsuario = "Firefox";

    const detector = new DeviceDetector().parse(navigator.userAgent);

    if (
      (detector.device != null || detector.device != undefined) &&
      (detector.os != undefined || detector.os != null)
    ) {
      this.tipoDispositivo = detector.device.type;
      this.fabricanteDispositivo = detector.device.brand;
      this.modeloDispositivo = detector.device.model;
      this.sistemaOperativo = detector.os.name;
    }

    if (this.sistemaOperativo == "iOS") {
      this.compruebaModeloExactoIOS();
    }
  }

  compruebaModeloExactoIOS() {
    const datosUserAgentSplitParentesis = navigator.userAgent.split("(");
    this.tipoDispositivo = datosUserAgentSplitParentesis[1].split(";")[0];
    if (this.tipoDispositivo == "iPhone") this.modeloDispositivo = this.obtenModeloIphone();
    if (this.tipoDispositivo == "iPad") this.modeloDispositivo = this.obtenModeloIpad();
  }

  obtenModeloIphone() {
    const h = window.screen.height;
    const w = window.screen.width;

    if (w === 430 && h === 932) return "iPhone 14 Pro Max";
    if (w === 428 && h === 926) return "iPhone 12 Pro Max / iPhone 13 Pro Max / iPhone 14 Plus";
    if (w === 393 && h === 852) return "iPhone 14 Pro";
    if (w === 390 && h === 844) return "iPhone 12 / iPhone 12 Pro / iPhone 13 / iPhone 13 Pro / iPhone 14";
    if (w === 414 && h === 896) return "iPhone XR / iPhone 11 / iPhone 11 Pro Max / iPhone XS Max";
    if (w === 375 && h === 812) return "iPhone X / iPhone 11 Pro / iPhone XS / iPhone 12 Mini / iPhone 13 Mini";
    if (w === 320 && h === 480) return "iPhone 4";
    if (w === 375 && h === 667) return "iPhone 6 / iPhone SE";
    if (w === 414 && h === 736) return "iPhone 6/7/8 Plus";
    if (w === 320 && h === 568) return "iPhone 5";
    if (h <= 480) return "iPhone 2-3";
    return "Otro dispositivo";
  }

  obtenModeloIpad() {
    const h = window.screen.height;
    const w = window.screen.width;

    if (w === 1024 && h === 1366) return "iPad Pro 12";
    if (w === 834 && h === 1194) return "iPad Pro 11";
    if (w === 834 && h === 1112) return "iPad Pro 10";
    if (w === 810 && h === 1080) return "iPad 10";
    if (w === 768 && h === 1024) return "iPad Pro 9 / iPad Mini 4";
    return "Otro dispositivo";
  }

  abrirInputFile() {
    if (this.presionaInputFile) {
      this.presionaInputFile.nativeElement.value = "";
      this.presionaInputFile.nativeElement.click();
    }
  }

  seleccionaFichero(files: any) {
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

    if (!files.target.files || files.target.files.length === 0) {
      Toast.fire({ icon: "error", title: "No has seleccionado imagen" });
      return;
    }

    this.file = files.target.files.item(0);
    this.ext = this.file.name.split(".").pop()?.toLowerCase();

    if (this.extensionEsInvalida()) {
      Swal.fire({ title: "Ooops!", html: "Esta imagen no es válida", icon: "error" });
      this.file = null;
      return;
    }

    if (this.extensionEsPDF()) {
      Swal.fire({ title: "PDF añadido", html: "Se ha adjuntado correctamente", icon: "success" });
      this.docAdjunto = true;
      this.cdr.detectChanges();
      return;
    }

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
      title: "Vas a subir este ticket",
      html:
        "<h3>¿Es correcto?</h3><br><img style='border-radius: 2rem' width=100% src=" +
        window.URL.createObjectURL(this.file) +
        ">",
    }).then((result) => {
      if (result.isDenied) {
        this.file = null;
        this.ext = null;
        this.imagenAdjunta = false;
        this.previewImagen = "";
        this.cdr.detectChanges();
        Toast.fire({ icon: "error", title: "Imagen no añadida" });
        this.abrirInputFile();
        return;
      }

      this.previewImagen = window.URL.createObjectURL(this.file);
      this.imagenAdjunta = true;
      this.cdr.detectChanges();
      Toast.fire({ icon: "success", title: "Imagen añadida" });
    });
  }

  extensionEsInvalida() {
    const extensionesProhibidas = [
      "zip", "bat", "exe", "rar", "xls", "xlsx",
      "psd", "sql", "csv", "doc", "docx", "bak", "7z", "heic",
    ];
    return extensionesProhibidas.includes(this.ext);
  }

  extensionEsPDF() {
    return this.ext == "pdf";
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}