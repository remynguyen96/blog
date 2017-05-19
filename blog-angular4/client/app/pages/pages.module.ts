import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
////////////////////
import { PagesRoutingModule } from "./pages.routing";
import { PagesService } from "./shared/pages.service";
////////////////////
import { PagesComponent } from "./index/pages.component";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
////////////////////

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
  ],
  declarations: [
      PagesComponent,
      CreateComponent,
      EditComponent,
      DetailComponent,
  ],
  providers: [PagesService],
})
export class PagesModule { }
