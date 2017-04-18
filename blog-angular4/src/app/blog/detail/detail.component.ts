import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from "@angular/platform-browser";
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
  private slug : string;

  constructor(
    private titleService : Title,
    private blogService : BlogService,
    private route : ActivatedRoute,
    private router : Router,
  ) {

  }

  ngOnInit() {
      this.subscription = this.route.params.subscribe(
        (params : any) => {
          this.slug = params['slug'];
          console.log(params);
        }
      );

      this.route.data.subscribe(
        data => console.log(data)
      )
      // this.subscription = this.route.params.subscribe(
      //   (params : any) => {
      //     this.slug = params['slug'];
      //     this.blogService.getDetail(this.slug).subscribe(
      //       data => {
      //         this.titleService.setTitle(data.title);
      //         this.dataBlog = data;
      //         this.dataBlog.images = `${this.blogService.URLservice}/public/images/${data.images}`;
      //         console.log(this.dataBlog);
      //       },
      //       error => console.log("get data error :"+error),
      //     );
      //   }
      // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  editDetail(e){
    e.preventDefault();
    this.router.navigate(['/blogs',this.slug,'edit']);
  }

}
