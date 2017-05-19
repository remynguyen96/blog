import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule } from '@angular/forms';
////////////////////
import { SettingsRoutingModule, } from "./settings.routing";
import { SettingsDirective } from './shared/settings.directive';
////////////////////
import { SettingsComponent } from './index/settings.component';
@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    SettingsRoutingModule,
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
