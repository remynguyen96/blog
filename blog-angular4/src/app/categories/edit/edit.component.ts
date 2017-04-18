import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
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
  ) {
    titleService.setTitle('Edit Category For Blog')
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

}
