import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private router : Router,
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
  }

}
