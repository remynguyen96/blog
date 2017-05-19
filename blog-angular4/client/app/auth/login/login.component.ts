import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidateService } from "../../global-shared/global.validation"
import 'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/auth.global.scss'],
})
export class LoginComponent implements OnInit, AfterViewChecked {

  private infomationLogin : FormGroup;

  private loading : boolean = false;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private authService : AuthService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
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
    this.formLogin();
    // console.log(this.router.url); // Get current route uri.
    // console.log(this.activatedRoute.component['name']); // Get current component name.
  }

  ngAfterViewChecked(){
    document.body.className = 'loaded';
  }

  formLogin(){
    this.infomationLogin = this.formBuilder.group({
      email : this.formBuilder.control(null,ValidateService.validateEmail),
      password : this.formBuilder.control(null,Validators.required)
    });
  }

  loginBlogs(){
      // this.infomationLogin.value.password = this.authService.encryptCode(this.infomationLogin.get('password').value);
      this.loading = true;
      this.authService.signIn(this.infomationLogin.value)
      .subscribe(
          decodedToken => {
            this.loading = false;
            Materialize.toast('Login successful !', 2500,'notiSuccess rounded');
          },
          errorLogin => {
            this.loading = false;
            Materialize.toast('There is a problem, please try again !', 4000,'notiError');
            console.log(`error : ${errorLogin}`);
          },
          () => {
            this.router.navigate(['/dashboard/blogs']);
          }
        );
  }


}
