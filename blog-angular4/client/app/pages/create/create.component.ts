import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser"
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
