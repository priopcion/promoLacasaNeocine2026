import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomBreakPointsProvider } from 'app/layout/custom-breakpoints';

@NgModule({
  providers: [CustomBreakPointsProvider],
})
export class LayoutModule { }