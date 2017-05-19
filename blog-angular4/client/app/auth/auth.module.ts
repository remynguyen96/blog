import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule } from '@angular/forms';
////////////////
import { AuthRoutingModule } from "./auth.routing";
import { AuthService } from "./shared/auth.service";
////////////////
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { UpdatePasswordComponent } from './update-password/update-password.component';
@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [

    ////////////////
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
  ],
  providers:[AuthService]
})
export class AuthModule { }
