import { Component, OnInit, Input } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
@Component({
  selector: 'edit-blog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private titleService : Title,
    private metaService : Meta,
  ) {
    titleService.setTitle('Edit Blogs');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Edit blogs'},
      {name: 'description', content: 'This is edit blogs page !'},
    ]);
  }

  ngOnInit() {
  }

}
