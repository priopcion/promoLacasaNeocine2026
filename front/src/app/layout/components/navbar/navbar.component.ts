import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import * as _ from "lodash";
import { CoreConfigService } from "@core/services/config.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  configuracionLanding: any;
  aspectoActual: string;
  generoSeleccionado = "0";
  usuarioAutentificado: any;
  lenguajes: any;

  /** Control IMG Perfil */
  rutaImgUsuario = "";
  imagenNula = true;
  nombreUsuario = "";

  idUsuario = 0;
  langs: string[] = ["es", "ca"];
  @HostBinding("class.fixed-top")
  public isFixed = false;

  @HostBinding("class.navbar-static-style-on-scroll")
  public ventanaScrolleada = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop > 100) &&
      this.configuracionLanding.layout.navbar.type == "navbar-static-top" &&
      this.configuracionLanding.layout.type == "horizontal"
    ) {
      this.ventanaScrolleada = true;
    } else if (
      (this.ventanaScrolleada && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.ventanaScrolleada = false;
    }
  }

  constructor(
    private router: Router,
    private _coreConfigService: CoreConfigService,
    public translate: TranslateService,
    private _coreSidebarService: CoreSidebarService
  ) {}

  ngOnInit(): void {
    this.configuraLayout();
    this.configuraIdioma();
  }

  configuraLayout() {
    this._coreConfigService.getConfig().subscribe((config) => {
      this.configuracionLanding = config;
      this.aspectoActual = config.layout.skin;
      if (this.configuracionLanding.layout.type === "vertical") {
        setTimeout(() => {
          this.isFixed =
            this.configuracionLanding.layout.navbar.type === "fixed-top";
        }, 0);
        return;
      }
    });
  }

  configuraIdioma() {
    this.lenguajes = {
      es: {
        title: "Español",
        flag: "es",
      },
      ca: {
        title: "Català",
        flag: "ca",
      },
    };
  }

  cambiaAspectoLanding() {
    this._coreConfigService.getConfig().subscribe((config) => {
      this.aspectoActual = config.layout.skin == "dark" ? "default" : "dark";
    });

    this._coreConfigService.setConfig(
      { layout: { skin: this.aspectoActual } },
      { emitEvent: true }
    );
  }

  cerrarSesion() {
    this.router.navigate(["/pages/aut/login"]);
    sessionStorage.removeItem("usuarioAutentificado");
    sessionStorage.removeItem("idPerfil");
    sessionStorage.removeItem("idUsuario");
    localStorage.removeItem("usuarioAutentificado");
  }

  cambiarIdioma(language: string): void {
    this.translate.use(language);
    this._coreConfigService.setConfig(
      { app: { appLanguage: language } },
      { emitEvent: true }
    );
  }

  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
}
