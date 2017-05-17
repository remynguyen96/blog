import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';
import { AuthService } from "../auth/shared/auth.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
// import { routerTransition } from "../global-shared/global.animation";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routerTransition()],
  providers: [AuthService]

})
export class AppComponent implements OnInit {

  private middlewareMenu : boolean = false;
  private isLoggedIn : Observable<boolean>;

  constructor(
    private titleService : Title,
    private router : Router,
    private authService : AuthService,
  ){
    titleService.setTitle('Demo Blog By Angular 4');
  }

  ngOnInit(){
    // setInterval(()=> {
    //   console.log(this.authService.handingAuthentication().subscribe(data => console.log(data)));
    // },3500)


    this.authService.MiddlewareMenu.subscribe(middleware => {
        this.middlewareMenu = middleware
    });
    this.isLoggedIn = this.authService.handingAuthentication();
  }


  logout(e): void{
    e.preventDefault();
    this.router.navigate(['/auth/login']);
    this.authService.MiddlewareMenu.emit(false);
    this.authService.isLoggedIn.next(false);
    localStorage.removeItem('token');
  }
}
