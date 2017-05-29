import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { Subscription } from "rxjs/Rx";
import { BlogService } from "../shared/blog.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'edit-blog',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  private subscription : Subscription;
  private dataBlog : any = [];

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private blogService : BlogService,
    private route : ActivatedRoute,
    private router : Router,
  ) {
    titleService.setTitle('Edit Blogs');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Edit blogs'},
      {name: 'description', content: 'This is edit blogs page !'},
    ]);
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
