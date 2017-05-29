import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { ValidateService } from "../../global-shared/global.validation"
declare var $,Materialize : any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../shared/auth.global.scss'],
})
export class ResetPasswordComponent implements OnInit {

  private resetPassword : FormGroup;
  private loading : boolean = false;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder,
  ) {
    titleService.setTitle('Forgot Password Member');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Get password member in blogs'},
      {name: 'description', content: 'This is get password page !'},
    ]);
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token !== null){
      this.router.navigate(['/dashboard/blogs']);
    }
    this.formResetPassword();
  }

  formResetPassword(){
    this.resetPassword = this.formBuilder.group({
      email : this.formBuilder.control(null,ValidateService.validateEmail),
    });
  }

  signUpBlogs(data){
    this.loading = true;
    // this.authService.signUp(this.resetPassword.value).subscribe(
    //     infomation => {
    //       this.loading = false;
    //       console.log(infomation);
    //       Materialize.toast(`<span>
    //         Reset password successful, please check email !
    //       </span>`, 3000,'rounded notiSuccess');
    //       this.router.navigate(['/auth/login']);
    //     },
    //     errorLogin => {
    //       this.loading = false;
    //       Materialize.toast(`<span>
    //         There is a problem, please try again !
    //       </span>`, 4000,'notiError');
    //       console.log(`error : ${errorLogin}`);
    //     }
    //   );
  }

}
