import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/guard/auth.guard";
import { BlogResolve } from "./shared/blog.resolve";
//////////////////////
import { BlogComponent } from "./index/blog.component";
import { DetailComponent } from "./detail/detail.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
const routes : Routes = [
  {
    path : '',
    component : BlogComponent,
  },
  {
    path : 'create',
    component : CreateComponent
  },
  {
    path: ':slug',
    component : DetailComponent,
    resolve : {
      detailBlog : BlogResolve
    },
  },
  {
    path : ':slug/edit',
    component : EditComponent,
    resolve : {
      detailBlog : BlogResolve
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
