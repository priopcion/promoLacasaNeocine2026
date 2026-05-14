import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';

import { PagNoEncontradaComponent } from 'app/main/pages/miscellaneous/pag-no-encontrada/pag-no-encontrada.component';

import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'pag-no-encontrada',
    component: PagNoEncontradaComponent
  }
];

@NgModule({
  declarations: [PagNoEncontradaComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreCommonModule, TranslateModule]
})
export class MiscellaneousModule { }
