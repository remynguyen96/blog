import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private router : Router,
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
  }

}
