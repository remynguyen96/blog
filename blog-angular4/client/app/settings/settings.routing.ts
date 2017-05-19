import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//////////////////////
import { SettingsComponent } from './index/settings.component';
const routes : Routes = [
    {
        path : '',
        component : SettingsComponent,
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
