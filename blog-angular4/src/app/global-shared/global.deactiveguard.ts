import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SettingsComponent } from "../settings/index/settings.component";
@Injectable()
export class GlobalDeactiveGuard implements CanDeactivate<SettingsComponent> {

  constructor(
      // private permissions: Permissions,
      // private currentUser: UserToken,
  ){
  }

  canDeactivate(
      component: SettingsComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      console.log("ok fine !");
      return true;
      // return this.permissions.canDeactivate(this.currentUser, route.params.id);
  }


}
