import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from "./user.routing";
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
  providers: []
})
export class UserModule { }
