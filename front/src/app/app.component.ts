import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Title } from "@angular/platform-browser";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as Waves from "node-waves";

import { CoreConfigService } from "@core/services/config.service";

import { TranslateService } from "@ngx-translate/core";

import { environment } from "../environments/environment";
const ISHTTPSSECURED: Boolean = environment.isHttpsSecured;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  coreConfig: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _title: Title,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    public _coreConfigService: CoreConfigService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();

    this.setAppLanguage();
  }

  setAppLanguage() {
    this.translate.addLangs(["es", "ca"]);

    /**
     * Para que el TranslateService use el idioma establecido como 'appLanguage',
     * primero es necesario realizar el subscribe del _coreConfigService.config
     * Si no se hiciera primeramente este paso, no se conocerían las propiedades del coreConfig.
     */
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: any) => {
        this.coreConfig = config;
      });
  }

  ngOnInit(): void {
    // if (ISHTTPSSECURED) {
    //   if (location.protocol === "http:") {
    //     // window.location.href = location.href.replace('http', 'https');
    //     window.location.href = "https://www.rodillagt.com/";
    //   }
    // }
    Waves.init();

    // this._coreConfigService.config
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((config) => {
    //     this.coreConfig = config;
    //     this._elementRef.nativeElement.classList.remove(
    //       "vertical-layout",
    //       "vertical-menu-modern",
    //       "horizontal-layout",
    //       "horizontal-menu"
    //     );
    //     if (this.coreConfig.layout.type === "vertical") {
    //       this._elementRef.nativeElement.classList.add(
    //         "vertical-layout",
    //         "vertical-menu-modern"
    //       );
    //     } else if (this.coreConfig.layout.type === "horizontal") {
    //       this._elementRef.nativeElement.classList.add(
    //         "horizontal-layout",
    //         "horizontal-menu"
    //       );
    //     }

    //     this._elementRef.nativeElement.classList.remove(
    //       "navbar-floating",
    //       "navbar-static",
    //       "navbar-sticky",
    //       "navbar-hidden"
    //     );

    //     if (this.coreConfig.layout.navbar.type === "navbar-static-top") {
    //       this._elementRef.nativeElement.classList.add("navbar-static");
    //     } else if (this.coreConfig.layout.navbar.type === "fixed-top") {
    //       this._elementRef.nativeElement.classList.add("navbar-sticky");
    //     } else if (this.coreConfig.layout.navbar.type === "floating-nav") {
    //       this._elementRef.nativeElement.classList.add("navbar-floating");
    //     } else {
    //       this._elementRef.nativeElement.classList.add("navbar-hidden");
    //     }

    //     this._elementRef.nativeElement.classList.remove(
    //       "footer-fixed",
    //       "footer-static",
    //       "footer-hidden"
    //     );

    //     if (this.coreConfig.layout.footer.type === "footer-sticky") {
    //       this._elementRef.nativeElement.classList.add("footer-fixed");
    //     } else if (this.coreConfig.layout.footer.type === "footer-static") {
    //       this._elementRef.nativeElement.classList.add("footer-static");
    //     } else {
    //       this._elementRef.nativeElement.classList.add("footer-hidden");
    //     }

    //     if (
    //       this.coreConfig.layout.menu.hidden &&
    //       this.coreConfig.layout.navbar.hidden &&
    //       this.coreConfig.layout.footer.hidden
    //     ) {
    //       this._elementRef.nativeElement.classList.add("blank-page");

    //       const appContent = this._elementRef.nativeElement.getElementsByClassName("app-content")[0];
    //       if (appContent) {
    //         this._renderer.setAttribute(appContent, "style", "transition:none");
    //       }
    //     } else {
    //       this._elementRef.nativeElement.classList.remove("blank-page");
    //       // setTimeout(() => {
    //       //   this._renderer.setAttribute(
    //       //     this._elementRef.nativeElement.getElementsByClassName(
    //       //       "app-content"
    //       //     )[0],
    //       //     "style",
    //       //     "transition:300ms ease all"
    //       //   );
    //       // }, 0);
    //       if (this.coreConfig.layout.navbar.hidden) {
    //         this._elementRef.nativeElement.classList.add("navbar-hidden");
    //       }
    //       if (this.coreConfig.layout.menu.hidden) {
    //         this._renderer.setAttribute(
    //           this._elementRef.nativeElement,
    //           "data-col",
    //           "1-column"
    //         );
    //       } else {
    //         this._renderer.removeAttribute(
    //           this._elementRef.nativeElement,
    //           "data-col"
    //         );
    //       }
    //       if (this.coreConfig.layout.footer.hidden) {
    //         this._elementRef.nativeElement.classList.add("footer-hidden");
    //       }
    //     }

    //     if (
    //       this.coreConfig.layout.skin !== "" &&
    //       this.coreConfig.layout.skin !== undefined
    //     ) {
    //       this.document.body.classList.remove(
    //         "default-layout",
    //         "bordered-layout",
    //         "dark-layout",
    //         "semi-dark-layout"
    //       );
    //       this.document.body.classList.add(
    //         this.coreConfig.layout.skin + "-layout"
    //       );
    //     }
    //     this.cdr.markForCheck();
    //   });

    this._title.setTitle(this.coreConfig.app.appTitle);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // toggleSidebar(key): void {
  //   this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  // }
}