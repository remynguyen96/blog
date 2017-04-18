import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "@angular/platform-browser";
////////////////////
import { SettingsRoutingModule, } from "./settings.routing";
import { SettingsDirective } from './shared/settings.directive';
////////////////////
import { SettingsComponent } from './index/settings.component';
@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
  ],
  declarations: [
    SettingsDirective,
    ////////////////////
    SettingsComponent,
  ],
  providers: [Title]
})
export class SettingsModule { }
