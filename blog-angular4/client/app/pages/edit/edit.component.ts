import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser"
import { PagesService } from "../shared/pages.service";
import { Subscription } from "rxjs/Subscription"
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {


    private subscription : Subscription;
    private shows : any;
    private item : string;

    constructor(
      private titleService : Title,
      private metaService : Meta,
      private pagesService : PagesService,
      private route : ActivatedRoute,
    ) {
      titleService.setTitle('Pages Infomation');
      metaService.addTags([
        {name: 'author', content: 'Remy Nguyen'},
        {name: 'keywords', content: 'Pages blogs'},
        {name: 'description', content: 'This is pages blogs !'},
      ]);
    }


  ngOnInit() {
    this.subscription = this.pagesService.navItem.subscribe(
        item => {
          this.item = item;
          // console.log(item);
        },
        err => console.log(`error : ${err}`),
    )
    this.searchFromNav();
  }

  ngOnDestroy(){
     this.subscription.unsubscribe();
  }

  searchFromNav(){
     if(this.item){
         this.pagesService.search(this.item).subscribe(
              shows => {
                  // console.log(shows);
                  this.shows = shows;
              },
              error => console.log(`error : ${error}`)
          )
     }
  }



}
