import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
////////////////////
import { AppRoutingModule } from "./app.routing";
import { AuthService } from "./auth/shared/auth.service";
import { GlobalAuthGuard } from "./auth/shared/auth.guard";
import { GlobalDeactiveGuard } from "./auth/shared/auth.deactiveGuard";
////////////////////
import { AppComponent } from './index/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    ////////////////////
    AppComponent,
    NotFoundComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [Title, GlobalDeactiveGuard, AuthService, GlobalAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
// npm install @angular/animations@latest --save
// npm install zone.js@0.8.5 --save
