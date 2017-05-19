import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {


  constructor(private titleService : Title, private metaService : Meta,) {
    titleService.setTitle('Blog Not Found');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Not found'},
      {name: 'description', content: 'Not found page in blogs !'},
    ]);
  }

  ngOnInit() {
    document.body.id = "notFound"
  }

}
