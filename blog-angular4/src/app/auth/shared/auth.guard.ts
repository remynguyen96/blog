import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from "@angular/http";
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";
import { GlobalService } from "../../global-shared/global.service";
@Injectable()
export class GlobalAuthGuard implements CanActivate {

  private isLoggedIn : Observable<boolean> ;

  constructor(
    private http : Http,
    private router : Router,
    private authService : AuthService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.verifiedAddress();
  }

  verifiedAddress(){
    // this.authService.isLoggedIn.subscribe(data => {
    //   console.log(data);
    // });
    // this.authService.handingAuthentication().subscribe(data => {
    //   console.log(data);
    // });
    let token = localStorage.getItem('token');
    if(token !== null){
      return true;
    }
      this.router.navigate(['/auth/login']);
      return false;
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
      console.log('canLoad verified address please login !');
      return this.verifiedAddress();
  }


}
