import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import { Login } from "./login";
@Injectable()
export class AuthService extends GlobalService {

  protected database : string = 'users';

  private activeLogin : boolean = false;

  MiddlewareMenu = new EventEmitter<boolean>();


  constructor(private router : Router, private http : Http) {
    super(http,router)
  }

  handingLogin(infomation : Login){
    if(infomation.email === 'remy' && infomation.password === '2007'){
      this.activeLogin = true;
      this.MiddlewareMenu.emit(true);
      this.router.navigate(['/blogs']);
    }else{
      this.activeLogin = false;
      this.MiddlewareMenu.emit(false);
    }
  }

  handingAuthentication(){
    return this.activeLogin;
  }



}
