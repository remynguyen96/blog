import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { trigger, state, style, animate, transition, keyframes, AnimationEvent } from '@angular/animations';
// import { routerTransition } from "../global-shared/global.animation";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // animations: [routerTransition()],
})
export class DashboardComponent implements OnInit {

  private middlewareMenu : boolean = false;
  private isLoggedIn : Observable<boolean>;
  private Infomember : any = {
    'name' : '',
    'role' : '',
  };

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private router : Router,
    private authService : AuthService,
  ) {
    titleService.setTitle('Dashboard Admin');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Dashboard admin for blogs'},
      {name: 'description', content: 'This is Dashboard admin page !'},
    ]);
  }

  ngOnInit() {
    this.authService.MiddlewareMenu.subscribe(middleware => {
        this.middlewareMenu = middleware
    });
    this.isLoggedIn = this.authService.handingAuthentication();
    document.body.id = "blogs"
    let infomation = JSON.parse(localStorage.getItem('infomationUser'));
    this.Infomember.name = infomation.name;
    this.Infomember.role = infomation.roles[0].description;
  }

  logout(e): void{
    e.preventDefault();
    this.router.navigate(['/auth/login']);
    this.authService.MiddlewareMenu.emit(false);
    this.authService.isLoggedIn.next(false);
    // localStorage.removeItem('infomationUser');
    // localStorage.removeItem('token');
    localStorage.clear();
  }


}
