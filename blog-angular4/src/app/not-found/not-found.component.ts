import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {


  constructor(private titleService : Title) {
    titleService.setTitle('Blog Not Found');
  }

  ngOnInit() {
    // document.body.id = "notttfound"
  }

}
