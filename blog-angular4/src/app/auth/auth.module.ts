import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
////////////////
import { AuthRoutingModule } from "./auth.routing";
import { AuthService } from "./shared/auth.service";
////////////////
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [

    ////////////////
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
  ],
  providers:[AuthService]
})
export class AuthModule { }
