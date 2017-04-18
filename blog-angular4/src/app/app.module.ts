import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
////////////////////
import { AppRoutingModule } from "./app.routing";
import { AuthService } from "./auth/shared/auth.service";
import { GlobalAuthGuard } from "./global-shared/global.authguard";
import { GlobalDeactiveGuard } from "./global-shared/global.deactiveguard";
////////////////////
import { AppComponent } from './index/app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    ////////////////////
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    SignUpComponent,
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
  providers: [GlobalDeactiveGuard,AuthService,GlobalAuthGuard,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
// npm install @angular/animations --save
// npm install zone.js@0.8.5 --save
