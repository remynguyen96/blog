import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "./index/user.component";
const routes : Routes = [
  {
    path : '',
    redirectTo: 'profile',
    pathMatch : 'full'
  },
  {
    path : 'profile',
    component : UserComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
