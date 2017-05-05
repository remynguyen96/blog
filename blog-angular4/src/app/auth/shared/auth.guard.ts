import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";

@Injectable()
export class GlobalAuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private authService : AuthService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('canActivate AuthGuard');
    return this.verifiedAddress();
  }

  verifiedAddress(){
    console.log(this.authService.activeLogin);
    if(this.authService.handingAuthentication()){
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
