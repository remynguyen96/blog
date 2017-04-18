import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from "../../global-shared/global.animation";
import { Title } from "@angular/platform-browser";
import { BlogService } from "../shared/blog.service";
import { Router } from "@angular/router";
declare var $ : any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [routerTransition()],
  host : { '[@routerTransition]' : '' }

})
export class BlogComponent implements OnInit {

  private dataBlog : any[] = [];

  private urlImage : string = `${this.blogService.URLservice}/public/images`;

  constructor(
    private titleService : Title,
    private router : Router,
    private blogService : BlogService,
  ) {
    titleService.setTitle('Blog Infomation');
  }




  ngOnInit() {
    // this.blogService.getAll().subscribe(
    //     data => {
    //       console.log(data);
    //       this.dataBlog = data
    //     },
    //     error => console.log("get data error :"+error),
    // );
    // this.scrollMore();
    this.blogService.getAll().subscribe(
      data => {
        console.log(data);
        this.dataBlog = data;
      },
      error => console.log("get data error :"+error),
    )
  }

  movePageDetail(e,data){
    e.preventDefault();
     this.router.navigate(['/blogs',data.slug],data );
    //  this.router.navigate(['/component2'], { queryParams: { page: pageNum } });
  }


  scrollMore(){
    window.onscroll = e => {
      let scroll = document.body.scrollTop;
      let height_screen = window.innerHeight;
      let total_height = document.body.clientHeight;
      if(scroll+ 30 > (total_height - height_screen)){
        console.log("scroll good job !");
        // let countData :number = this.dataBlog.length;
        // this.blogService.getAllNext(countData).subscribe(
        //     data => {
        //       console.log(data.next);
        //       this.dataBlog.push(data.next);
        //     },
        //     error => console.log("get data error :"+error),
        // );
      }
    }
  }

}
