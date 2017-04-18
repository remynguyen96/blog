import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from "./user.routing";
import { Title } from "@angular/platform-browser";
import { UserDirective } from './shared/user.directive';
//////////////////////
import { UserComponent } from './index/user.component';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  declarations: [
    UserDirective,
    //////////////////////
    UserComponent,
  ],
  providers: [Title]
})
export class UserModule { }
