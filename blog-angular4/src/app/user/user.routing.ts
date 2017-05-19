import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guard/auth.guard";
//////////////////////
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
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
