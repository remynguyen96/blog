import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { GlobalAuthGuard } from "../global-shared/global.authguard";
//////////////////////
import { BlogComponent } from "./index/blog.component";
import { DetailComponent } from "./detail/detail.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
const routes : Routes = [
  {
    path : '',
    component : BlogComponent,
    // canActivate: [GlobalAuthGuard],
    // canActivateChild: [GlobalAuthGuard],
    // children: [
    //   {
    //     path : 'create',
    //     component : CreateComponent,
    //   },
    // ]
  },
  {
    path : 'create',
    component : CreateComponent
  },
  {
    path: ':slug',
    component : DetailComponent,
    data : {},
  },
  {
    path : ':slug/edit',
    component : EditComponent
  },

];
// export const BlogRouting : ModuleWithProviders = RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
