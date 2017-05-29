import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
////////////////
import { AuthService } from "../auth/shared/auth.service";
import { BlogRoutingModule } from "./blog.routing";
import { BlogService } from "./shared/blog.service";
import { BlogResolve } from "./shared/blog.resolve";
import { BlogDirective } from './shared/blog.directive';
import { BlogPipeSearch } from './shared/blog.pipeSearch';
////////////////
import { BlogComponent } from './index/blog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    BlogDirective,
    BlogPipeSearch,
    ////////////////////
    BlogComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
  ],
  providers:[BlogService,AuthService, BlogResolve],
})
export class BlogModule { }
