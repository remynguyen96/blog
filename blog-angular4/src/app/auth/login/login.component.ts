import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from "../shared/auth.service";
import { Login } from "../shared/login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private infomation : Login = new Login();



  constructor(
    private titleService : Title,
    private authService : AuthService,
  ) {
    titleService.setTitle('Member Login');
  }

  ngOnInit() {

  }

  login(data){
    this.authService.handingLogin(this.infomation).subscribe(
        decodedToken => console.log(decodedToken),
        errorLogin => console.log(`error : ${errorLogin}`)
      );
  }


}
