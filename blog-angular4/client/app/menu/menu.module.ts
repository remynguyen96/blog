import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule } from '@angular/forms';
////////////////////
import { MenuRoutingModule } from "./menu.routing";
import { MenuDirective } from './shared/menu.directive';
////////////////////
import { MenuComponent } from './index/menu.component';
// import { CreateComponent } from './create/create.component';
////////////////////

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [
    MenuDirective,
    ////////////////////
    MenuComponent,
    // CreateComponent,
  ],
  providers: [],
})
export class MenuModule { }
