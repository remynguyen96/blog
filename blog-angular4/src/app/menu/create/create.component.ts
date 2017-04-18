import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private titleService : Title
  ) {
    titleService.setTitle('Create Menu For Blog');
  }

  ngOnInit() {
  }

}
