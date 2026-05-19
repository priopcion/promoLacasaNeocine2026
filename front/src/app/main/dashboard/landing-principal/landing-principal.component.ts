import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import localeES from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { ParticipacionService } from "app/services/participacion.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-landing-principal",
  templateUrl: "./landing-principal.component.html",
  styleUrls: ["./landing-principal.component.scss"],
})
export class LandingPrincipalComponent implements OnInit, AfterViewInit {

  tamanyoMovil = false;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private participaService: ParticipacionService,
    private router: Router,
    private titleService: Title,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.detectaDimensionesPantalla();
    registerLocaleData(localeES, "es");
  }

  ngAfterViewInit(): void {
    localStorage.removeItem("lastRoute");
  }

  @HostListener('window:resize')
  onResize() {
    this.detectaDimensionesPantalla();
  }

  detectaDimensionesPantalla(): void {
    this.tamanyoMovil = window.innerWidth < 768;
  }
}