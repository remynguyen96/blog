import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";
////////////////////
import { MenuRoutingModule } from "./menu.routing";
import { MenuDirective } from './shared/menu.directive';
////////////////////
import { MenuComponent } from './index/menu.component';
import { CreateComponent } from './create/create.component';
////////////////////

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
  ],
  declarations: [
    MenuDirective,
    ////////////////////
    MenuComponent,
    CreateComponent,
  ],
  providers: [Title],
})
export class MenuModule { }
