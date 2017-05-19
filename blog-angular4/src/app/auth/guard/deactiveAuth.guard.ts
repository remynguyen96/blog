import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from "../login/login.component";
@Injectable()
export class DeactiveAuthGuard implements CanDeactivate<LoginComponent> {

  constructor() {

  }

  canDeactivate(
      component: LoginComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState: RouterStateSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
      return this.verifiedURL(nextState.url);
  }

  private verifiedURL(url : string){
    let token = localStorage.getItem('token');
    if( (url === '/auth/login' && token !== null) ||
        (url === '/auth/sign-up' && token !== null) ||
        (url === '/auth/reset-password' && token !== null) )
    {
      return false;
    }
    return true;
  }


}
