import { Component, OnInit, Input } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { BlogService } from "../shared/blog.service";
@Component({
  selector: 'create-blog',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  data : string;
  listData: any;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private _blogService : BlogService,
  ) {
      titleService.setTitle('Create New Blog');
      metaService.addTags([
        {name: 'author', content: 'Remy Nguyen'},
        {name: 'keywords', content: 'Create new blogs'},
        {name: 'description', content: 'This is create new blogs page !'},
      ]);
  }

  ngOnInit() {

  }





}
