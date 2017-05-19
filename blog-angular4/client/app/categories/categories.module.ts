import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//////////////////
import { CategoryRoutingModule } from "./categories.routing";
import { CategoryPipe } from './shared/category.pipe';
import { CategoriesDirective } from './shared/category.directive';
import { CategoryService } from './shared/category.service';
//////////////////
import { CategoriesComponent } from './index/categories.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    CategoriesDirective,
    CategoryPipe,
    ////////////////////
    CategoriesComponent,
    CreateComponent,
    EditComponent,
  ],
  providers:[CategoryService],
})
export class CategoriesModule { }
