import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser"
import { FormGroup, FormControlName, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { PagesService } from "../shared/pages.service";
// import { routerAnimation } from "../../global-shared/global.animation";
import 'rxjs/Rx';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  // animations: [routerTransition()],
  // host : { '[@routerTransition]' : '' },
})
export class PagesComponent implements OnInit {

  private query : string;

  private dataGroup : FormGroup;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private pagesService : PagesService,
    private formBuilder : FormBuilder,
    private router : Router,
  ) {
    titleService.setTitle('Pages Infomation');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Pages blogs'},
      {name: 'description', content: 'This is pages blogs !'},
    ]);
  }

  ngOnInit() {
    this.formFilter();

    this.dataGroup.valueChanges
        .debounceTime(1000)
        .distinctUntilChanged()
        .filter(data => this.dataGroup.valid)
        .map(data => {
          data.comment = data.comment.replace('@', '');
          return data
        })
        .map(data => {
          data.lastUpdateTS = new Date();
          return data
        })
        .subscribe( data => console.log(JSON.stringify(data)));
  }

  formFilter(){
    this.dataGroup = this.formBuilder.group({
      email : this.formBuilder.control(null,Validators.pattern("[^ @]*@[^ @]*")),
      comment : this.formBuilder.control(null,Validators.required),
    });
  }

  Search(){
    this.pagesService.changeNav(this.query);
    this.router.navigate(['/dashboard/pages/search'],{
      queryParams: {'result' : this.query}
    });
    this.query = "";
  }

  submitForm(){
    console.log(this.dataGroup.value);
  }

}
