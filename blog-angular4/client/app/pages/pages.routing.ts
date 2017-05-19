import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//////////////////////
import { PagesComponent } from "./index/pages.component";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
const routes : Routes = [
  {
    path: '',
    component : PagesComponent,
  },
  {
    path : 'create',
    component : CreateComponent
  },
  {
    path : 'search',
    component : EditComponent
  },
  {
    path : 'detail',
    component : DetailComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
