import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';
import { AuthService } from "../auth/shared/auth.service";
// import { routerTransition } from "../global-shared/global.animation";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [routerTransition()],
  providers: [AuthService]

})
export class AppComponent implements OnInit {

  middlewareMenu : boolean = false;

  constructor(
    private titleService : Title,
    private authService : AuthService,
  ){
    titleService.setTitle('Demo Blog By Angular 4');
  }

  ngOnInit(){
    this.authService.MiddlewareMenu.subscribe(
      middleware => {
        // console.log(middleware);
        this.middlewareMenu = middleware
      }
    );
  }
}
