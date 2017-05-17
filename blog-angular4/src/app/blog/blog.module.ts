import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from "@angular/platform-browser";
////////////////
import { AuthService } from "../auth/shared/auth.service";
import { BlogRoutingModule } from "./blog.routing";
import { BlogService } from "./shared/blog.service";
import { BlogDirective } from './shared/blog.directive';
import { BlogPipe } from './shared/blog.pipe';
////////////////
import { BlogComponent } from './index/blog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BlogDirective,
    BlogPipe,
    ////////////////////
    BlogComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
  ],
  providers:[Title,BlogService,AuthService],
})
export class BlogModule { }
