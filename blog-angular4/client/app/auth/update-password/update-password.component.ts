import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { ValidateService } from "../../global-shared/global.validation"
declare var $,Materialize : any;
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../shared/auth.global.scss'],
})
export class UpdatePasswordComponent implements OnInit {

  private editPassword : FormGroup;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder,
  ) {
    titleService.setTitle('Update Password Member');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Update password of member in blogs'},
      {name: 'description', content: 'This is update password page !'},
    ]);
  }

  ngOnInit() {
    this.formEditPassword();
  }

  formEditPassword(){
    this.editPassword = this.formBuilder.group({
      password : this.formBuilder.control(null,Validators.required),
      passwordConfirm : this.formBuilder.control(null,Validators.required)
    });
  }

  signUpBlogs(data){
    this.authService.signUp(this.editPassword.value).subscribe(
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
