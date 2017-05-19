import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
////////////////////
import { SettingsRoutingModule, } from "./settings.routing";
import { SettingsDirective } from './shared/settings.directive';
////////////////////
import { SettingsComponent } from './index/settings.component';
@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SettingsDirective,
    ////////////////////
    SettingsComponent,
  ],
  providers: []
})
export class SettingsModule { }
