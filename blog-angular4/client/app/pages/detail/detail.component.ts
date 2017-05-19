import { Component, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser"
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

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
