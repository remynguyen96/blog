import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from "./user.routing";
import { UserDirective } from './shared/user.directive';
//////////////////////
import { UserComponent } from './index/user.component';
@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
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
