import { Component, OnInit, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'edit-blog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private titleService : Title,
  ) {
    titleService.setTitle('Edit Blog');
  }

  ngOnInit() {
  }

}
