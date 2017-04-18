import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MenuComponent } from "./index/menu.component";
import { CreateComponent } from "./create/create.component";
const routes : Routes = [
  {
    path: '',
    component : MenuComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
