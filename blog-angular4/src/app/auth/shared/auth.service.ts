import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import { Login } from "./login";
@Injectable()
export class AuthService extends GlobalService {

  protected database : string = 'users';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  MiddlewareMenu : EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private http : Http,
    private router : Router,
  ) {
    super(http,router)
  }

  handingLogin(infomation : Login): any {
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/login`,infomation,{headers : headers})
                .map((response : Response) => {
                  const token = response.json().token;
                  const base64Url = token.split('.')[1];
                  const base64 = base64Url.replace('-', '+').replace('_', '/');
                  return {token: token, decoded: JSON.parse(window.atob(base64))};
                }).do(
                    tokenData => {
                        this.MiddlewareMenu.emit(true);
                        this.isLoggedIn.next(true);
                        localStorage.setItem('token',tokenData.token);
                        this.router.navigate(['/dashboard/blogs']);
                    }
                );
  }

  handingAuthentication() : Observable<boolean>{
    return this.isLoggedIn.asObservable();
  }

    // this.http.post(`${this.URLservice}/api/login`,infomation,{headers: headers})
    // this.http.post(`${this.URLservice}/api/sign-up`,infomation,{headers: headers})
    // this.http.post(`${this.URLservice}/api/verified-users`,infomation,{headers: headers})
    // this.http.post(`${this.URLservice}/api/forgot-password`,infomation,{headers: headers})
    // this.http.put(`${this.URLservice}/api/update-password`,infomation,{headers: headers})
}
