import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import * as CryptoJS from "crypto-js";
declare var Materialize : any;
@Injectable()
export class AuthService extends GlobalService {

  protected database : string = 'users';
  private key : any  = CryptoJS.enc.Base64.parse("#I-LOVE-MOM-20-07-1974#");
  private iv  : any  = CryptoJS.enc.Base64.parse("#base64IV#");
  private passportCode  : string  = 'I-LOVE-MOM-20-07-1974';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  MiddlewareMenu : EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(
    private http : Http,
    private router : Router,
  ) {
    super(http,router)
  }

  encryptCode(str) : Observable<string>{
    let encrypt = CryptoJS.AES.encrypt(str, this.passportCode, {iv: this.iv});
    let encrypted = encrypt.toString();
    // let encrypted = encrypt.ciphertext.toString(CryptoJS.enc.Base64)  //not decrypted;
    return encrypted;
  }

  decryptCode(code) : Observable<string>{
    let decrypted = CryptoJS.AES.decrypt(code, this.passportCode, {iv: this.iv});
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  Get_IPaddress() : Observable<any>{
    return this.http.get('http://ipinfo.io')
             .map((response : Response) => response.json())
             .catch(this.handleError);
  }

  strRandom(number : number) : string{
    let token = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( let i = 0; i < number; i++ ){
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return token;
  }

  signIn(infoLogin : {email : string; password: string}) : Observable<any> {
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/auth/login`,infoLogin,this.options)
               .map((response : Response) => {
                  const token = response.json().token;
                  const user = response.json().user;
                  const base64Url = token.split('.')[1];
                  const base64 = base64Url.replace('-', '+').replace('_', '/');
                  return {token: token, decoded: JSON.parse(window.atob(base64)), user: user};
               })
               .catch(this.handleError)
               .do(
                  tokenData => {
                      this.MiddlewareMenu.emit(true);
                      this.isLoggedIn.next(true);
                      localStorage.setItem('token',tokenData.token);
                      localStorage.setItem('infomationUser',JSON.stringify(tokenData.user));
                  }
              );
  }

  handingAuthentication() : Observable<boolean>{
    return this.isLoggedIn.asObservable();
  }

  signUp(infoSignUp : {email : string; password: string}) : Observable<any>{
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/auth/sign-up`,infoSignUp,{headers : headers})
                    .map((response : Response) => response.json() )
                    .catch(this.handleError);
  }

  verifiedEmail(infomation : any) : Observable<any>{
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/verified-users`,infomation,{headers : headers})
                    .map((response : Response) => response.json() )
                    .catch(this.handleError);
  }

  resetPassword(infomation : any) : Observable<any>{
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/auth/forgot-password`,infomation,{headers : headers})
                    .map((response : Response) => response.json() )
                    .catch(this.handleError);
  }

  updatePassword(infomation : any) : Observable<any>{
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.post(`${this.URLservice}/api/auth/update-password`,infomation,{headers : headers})
                    .map((response : Response) => response.json() )
                    .catch(this.handleError);
  }

////////////////////////////////////////////////////////////////////////

  encryptLogin(infomation : {email : string; password : string}) : Observable<any>{
    let encryptPassword = CryptoJS.AES.encrypt(infomation.password, this.key, {iv: this.iv});
    let creds = `email=${infomation.email}&&password=${infomation.password}`;
    let encrypted = CryptoJS.AES.encrypt(creds,this.passportCode);
    return encrypted.toString();
    // let demo = {
    //   'email' : 'test@gmail.com',
    //   'password' : '12345687',
    // };
    // let testEncrypt = this.encryptLogin(demo);
    // let testDecrypt = this.objectDecrypt(testEncrypt);
  }


  //
  objectDecrypt(code) : Observable<any>{
    //Decrypt Message
    let decrypted = CryptoJS.AES.decrypt(code, this.passportCode);
    let strDecrypt = decrypted.toString(CryptoJS.enc.Utf8);
    //Convert to Object
    let convert1 = `{"${strDecrypt.replace('="',':')}"}`;
    let convert2 = convert1.replace("&&", '","');
    //Replace Prams to OBJ
    let convert3 = convert2.replace("password=", 'password":"');
    let convert4 = convert3.replace("email=", 'email":"');
    let convert5 = convert4.toString();
    try {
      var Object = JSON.parse(convert5);
    }catch(err){
      this.objectDecrypt(code);
    }
     return Object;
  }


}
