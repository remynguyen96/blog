import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
////////////////////
import { AppRoutingModule } from "./app.routing";
import { AuthService } from "./auth/shared/auth.service";
import { AuthGuard } from "./auth/guard/auth.guard";
import { DeactiveAuthGuard } from "./auth/guard/deactiveAuth.guard";
////////////////////
import { AppComponent } from './index/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './events/messages/messages.component';

@NgModule({
  declarations: [
    ////////////////////
    AppComponent,
    NotFoundComponent,
    EventsComponent,
    DashboardComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [AuthGuard, AuthService, DeactiveAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
// npm install @angular/animations@latest --save
// npm install zone.js@0.8.5 --save
// npm install --save @angular/platform-server
// npm install --save angularfire2
