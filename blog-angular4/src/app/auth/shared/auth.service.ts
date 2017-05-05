import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import { Login } from "./login";
@Injectable()
export class AuthService extends GlobalService {

  protected database : string = 'users';

  public activeLogin : boolean = false;

  MiddlewareMenu : EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private router : Router, private http : Http) {
    super(http,router)
  }

  handingLogin(infomation : Login): any{
    if(infomation.email === 'remy' && infomation.password === '2007'){
      this.activeLogin = true;
      this.MiddlewareMenu.emit(true);
      this.router.navigate(['/']);
    }else{
      this.activeLogin = false;
      this.MiddlewareMenu.emit(false);
    }
  }

  handingAuthentication(): boolean{
    return this.activeLogin;
  }


  logOut() : void{
    this.activeLogin = false;
    this.router.navigate(['/auth/login']);
  }


}
