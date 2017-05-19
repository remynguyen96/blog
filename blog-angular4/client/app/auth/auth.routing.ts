import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//////////////////////
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { UpdatePasswordComponent } from './update-password/update-password.component';
const routes : Routes = [
  {
    path : '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'login/:token',
    component : LoginComponent,
  },
  {
    path : 'sign-up',
    component : SignUpComponent,
  },
  {
    path : 'reset-password',
    component : ResetPasswordComponent,
  },
  {
    path : 'update-password/:token',
    component : UpdatePasswordComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
