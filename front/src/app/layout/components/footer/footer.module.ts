import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CoreCommonModule } from "@core/common.module";

// import { FooterComponent } from "app/layout/components/footer/footer.component";
import { ScrollTopComponent } from "app/layout/components/footer/scroll-to-top/scroll-top.component";

@NgModule({
  declarations: [],
  imports: [RouterModule, CoreCommonModule],
  exports: [],
})
export class FooterModule {}
