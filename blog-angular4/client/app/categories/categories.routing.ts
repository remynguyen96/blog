import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guard/auth.guard";
//////////////////////
import { CategoriesComponent } from './index/categories.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
const routes : Routes = [
  {
    path: '',
    component : CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component : CreateComponent
  },
  {
    path: 'edit',
    component : EditComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
