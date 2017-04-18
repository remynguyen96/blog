import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private titleService : Title,
  ) {
    titleService.setTitle('Sign Up Member')
  }

  ngOnInit() {
  }

}
