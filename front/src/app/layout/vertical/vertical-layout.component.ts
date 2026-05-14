import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ElementRef,
} from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";
import { Router } from "@angular/router";

@Component({
  selector: "vertical-layout",
  templateUrl: "./vertical-layout.component.html",
  styleUrls: ["./vertical-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalLayoutComponent implements OnInit, OnDestroy {
  coreConfig: any;
  estaLogeado = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreConfigService: CoreConfigService,
    private _elementRef: ElementRef,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.habilitaNavbarComponent();
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public habilitaNavbarComponent() {
    if (
      sessionStorage.getItem("usuarioAutentificado") == null &&
      localStorage.getItem("usuarioAutentificado") == null
    ) {
      this.router.navigate(["/pages/aut/login"]);
      return;
    }
    this.estaLogeado = true;
  }
}
