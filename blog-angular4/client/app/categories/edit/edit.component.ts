import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { CategoryService } from "../shared/category.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AnonymousSubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(
    private titleService : Title,
    private metaService : Meta,
  ) {
    titleService.setTitle('Edit Category For Blog');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Edit category for blogs'},
      {name: 'description', content: 'This is edit category page !'},
    ]);
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

}
