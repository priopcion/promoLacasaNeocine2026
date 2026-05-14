import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { Subject } from "rxjs";
import { take, takeUntil, filter } from "rxjs/operators";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

import { CoreConfigService } from "@core/services/config.service";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

import { menu } from "app/menu/menu";
import { menuGestor } from "app/menu/menuGestor";

@Component({
  selector: "vertical-menu",
  templateUrl: "./vertical-menu.component.html",
  styleUrls: ["./vertical-menu.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMenuComponent implements OnInit, OnDestroy {
  configuracionLanding: any;
  menu: any;
  estaContraido: boolean;
  estaScrolleado: boolean = false;

  /** Control IMG Perfil */
  rutaImgUsuario = "";
  nombreUsuario = "";
  apellidosUsuario = "";
  imagenNula = true;
  idUsuario = 0;

  private _unsubscribeAll: Subject<any>;

  datosUsuario: any;

  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService,
    private _coreSidebarService: CoreSidebarService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._unsubscribeAll = new Subject();
    this.configuraLayout();
  }

  @ViewChild(PerfectScrollbarDirective, { static: false })
  directiveRef?: PerfectScrollbarDirective;

  configuraLayout() {
    this.registraMenu();
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.configuracionLanding = config;
      });
    this.estaContraido =
      this._coreSidebarService.getSidebarRegistry("menu").collapsed;
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._coreSidebarService.getSidebarRegistry("menu")) {
          this._coreSidebarService.getSidebarRegistry("menu").close();
        }
      });

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          this.directiveRef.scrollToElement(".navigation .active", -180, 500);
        });
      });

    this._coreMenuService.onMenuChanged
      .pipe(
        filter((value) => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.menu = this._coreMenuService.getCurrentMenu();
      });
  }

  registraMenu() {
    this._coreMenuService.unregister("main");

    var permisosUsuario = JSON.parse(
      sessionStorage.getItem("usuarioAutentificado")
    ).permisos;
    permisosUsuario == "Gestor" ? (this.menu = menuGestor) : (this.menu = menu);

    this._coreMenuService.register("main", this.menu);
    this._coreMenuService.setCurrentMenu("main");
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  scrolleaSideBar(): void {
    this.directiveRef.position(true).y > 3
      ? (this.estaScrolleado = true)
      : (this.estaScrolleado = false);
  }
}
