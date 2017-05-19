import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guard/auth.guard";
//////////////////////
import { MenuComponent } from "./index/menu.component";
import { CreateComponent } from "./create/create.component";
const routes : Routes = [
  {
    path: '',
    component : MenuComponent,
    canActivate: [AuthGuard],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
