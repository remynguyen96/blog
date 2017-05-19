import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { AuthService } from "../shared/auth.service";
import { Login } from "../shared/login";
import { Router, ActivatedRoute } from "@angular/router";
declare var $ : any, Materialize : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private infomation : Login = new Login();

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private authService : AuthService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
  ) {
    titleService.setTitle('Member Login');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Login blogs'},
      {name: 'description', content: 'This is login page !'},
    ]);
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token !== null){
      this.router.navigate(['/dashboard/blogs']);
    }
    // console.log(this.router.url); // Get current route uri.
    // console.log(this.activatedRoute.component['name']); // Get current component name.
  }

  login(data){
    this.authService.handingLogin(this.infomation).subscribe(
        decodedToken => console.log(decodedToken),
        errorLogin => {
          Materialize.toast(`<span class="notiError">
            There is a problem, please try again !
          </span>`, 4000);
          console.log(`error : ${errorLogin}`);
        }
      );
  }


}
