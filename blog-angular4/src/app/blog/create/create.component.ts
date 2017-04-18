import { Component, OnInit, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";
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
    private _blogService : BlogService,
  ) {
    titleService.setTitle('Create New Blog')
  }

  ngOnInit() {
  }





}
