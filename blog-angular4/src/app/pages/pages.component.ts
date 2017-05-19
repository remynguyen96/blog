import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser"
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {


  private demo : any = '';

  constructor(
    private titleService : Title,
    private metaService : Meta,
  ) {
    titleService.setTitle('Pages Infomation');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Pages blogs'},
      {name: 'description', content: 'This is pages blogs !'},
    ]);
  }

  ngOnInit() {
  }

}
