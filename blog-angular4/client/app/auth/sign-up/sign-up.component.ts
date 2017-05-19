import { Component, OnInit } from '@angular/core';
import { trigger, style, state, keyframes, transition, animate } from "@angular/animations"
import { Title, Meta } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { Router } from "@angular/router";
import { ValidateService } from "../../global-shared/global.validation"
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../shared/auth.global.scss'],
  animations: [
    trigger('checkField',[
      state('in',style({transform: 'translateX(0)'})),
      transition(':enter',[
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition(':leave',[
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  private sign_up : FormGroup;
  private ipAddress : string;
  private _token : string;
  private loading : boolean = false;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder,
  ) {
    titleService.setTitle('Sign Up Member');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Sign up member for blogs'},
      {name: 'description', content: 'This is sign up member page !'},
    ]);
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token !== null){
      this.router.navigate(['/dashboard/blogs']);
    }
    /**
      * Task: IP address
      * Author: Remy Nguyen
      * Date created: 2017/03/24 14:00 PM
      * @return ip current of user
      */
    this.authService.Get_IPaddress().subscribe(
      IPaddress => this.ipAddress = IPaddress.ip,
      errorIP => {
        console.log(`error : ${errorIP}`);
      }
    );
    // console.log(Math.random().toString(36).substring(7));
    this.formRegister();
    // $(this.elm.nativeElement).find('body').addClass('loaded');
  }

  formRegister(){
    this.sign_up = this.formBuilder.group({
      name : this.formBuilder.control(null,[
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+')
      ]),
      email : this.formBuilder.control(null,ValidateService.validateEmail),
      password : this.formBuilder.control(null,ValidateService.validatePassword),
      password_confirm : this.formBuilder.control(null,Validators.required),
      _token : this.formBuilder.control(null),
      ip_address : this.formBuilder.control(null),
    },{
      validator : ValidateService.confirmPassword('password','password_confirm')
    });
  }

  signUpBlogs(){
    this.loading = true;
    this.sign_up.value.password = this.authService.encryptCode(this.sign_up.get('password').value);
    this.sign_up.value.password_confirm = this.authService.encryptCode(this.sign_up.get('password_confirm').value);
    this.sign_up.value.ip_address = this.ipAddress;
    // this.sign_up.value.ip_address = this.authService.encryptCode(this.ipAddress);
    this.sign_up.value._token = this.authService.strRandom(100);
    this.authService.signUp(this.sign_up.value).subscribe(
        notification => {
          this.loading = false;
          if(notification.errors){
            for(let err in notification.errors){
              Materialize.toast(`<span>
                ${notification.errors[err][0]}
              </span>`, 4000,'notiError');
            }
          }else{
            Materialize.toast(`<span>
              Sign up successful, please confirm email register !
            </span>`, 3000,'rounded notiSuccess');
            this.router.navigate(['/auth/login']);
          }
        },
        errorLogin => {
          this.loading = false;
          Materialize.toast(`<span>
            There is a problem, please try again !
          </span>`, 4000,'notiError');
          console.log(`error : ${errorLogin}`);
        }
      );
  }


}
