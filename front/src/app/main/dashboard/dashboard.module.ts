import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { CoreCommonModule } from "@core/common.module";


import { DashboardService } from "app/main/dashboard/dashboard.service";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BlockUIModule } from "ng-block-ui";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

import { NgxDropzoneModule } from "ngx-dropzone";
import { LandingPrincipalComponent } from "./landing-principal/landing-principal.component";
import { FooterComponent } from "app/layout/components/footer/footer.component";
import { ScrollTopComponent } from "app/layout/components/footer/scroll-to-top/scroll-top.component";
import { ValidacionComponent } from "./validacion/validacion.component";
import { LandingFormularioComponent } from "./landing-formulario/landing-formulario.component";
import { LandingGanadorComponent } from "./landing-ganador/landing-ganador.component";
import { LandingNoganadorComponent } from "./landing-noganador/landing-noganador.component";
const routes = [
  {
    path: "",
    component: LandingPrincipalComponent,
    data: { animation: "danalytics" },
  },

  {
    path: "formulario",
    component: LandingFormularioComponent,
    data: { animation: "danalytics" },
  },
  {
    path: "ganador",
    component: LandingGanadorComponent,
  },
  {
    path: "noGanador",
    component: LandingNoganadorComponent,
  },
    {
    path: "validacion",
    component: ValidacionComponent
  }
];

@NgModule({
  declarations: [
    LandingPrincipalComponent,
    FooterComponent,
    ScrollTopComponent,
    ValidacionComponent,
    LandingFormularioComponent,
    LandingGanadorComponent,
    LandingNoganadorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    BlockUIModule.forRoot(),
    NgSelectModule,
    NgxDropzoneModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule { }
