import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../auth/shared/auth.service";
@Injectable()
export class GlobalAuthGuard implements CanActivate, CanLoad {

  constructor(
    private router : Router,
    private authService : AuthService,
  ){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard');
    return this.verifiedAddress();
  }

  private verifiedAddress(){
    if(this.authService.handingAuthentication()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
      console.log('canLoad verified address please login !');
      return this.verifiedAddress();
  }



}
