import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../shared/blog.service";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscription : Subscription;
  private dataBlog : any = [];
  // private slug : string;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private blogService : BlogService,
    private route : ActivatedRoute,
    private router : Router,
  ) {
  }

  ngOnInit() {
      this.subscription = this.route.data.subscribe(data => {
              this.titleService.setTitle(data.detailBlog.title);
              this.metaService.addTags([
                {name: 'author', content: data.detailBlog.user_id},
                {name: 'keywords', content: data.detailBlog.title},
                {name: 'description', content: data.detailBlog.excerpt},
              ]);
              this.dataBlog = data.detailBlog;
              this.dataBlog.images = `${this.blogService.URLservice}/public/images/${data.detailBlog.images}`;
            },
            error => console.log("get data error :"+error),
          );

      // console.log(this.router.url); //  /routename
      // this.subscription = this.route.params.subscribe(
      //   (params : any) => {
      //     this.slug = params['slug'];
      //   }
      // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
