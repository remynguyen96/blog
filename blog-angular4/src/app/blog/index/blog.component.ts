import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from "../../global-shared/global.animation";
import { Title, Meta } from "@angular/platform-browser";
import { BlogService } from "../shared/blog.service";
import { Router } from "@angular/router";
declare var $: any, Materialize: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [routerTransition()],
  host : { '[@routerTransition]' : '' },

})
export class BlogComponent implements OnInit {

  private dataBlog : any[] = [];

  currentBlog: number = 1;

  blogs: Array<any> = [];

  scrollCallback;

  private urlImage : string = `${this.blogService.URLservice}/public/images`;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private router : Router,
    private blogService : BlogService,
  ) {
    titleService.setTitle('Blog Infomation');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Pages blogs'},
      {name: 'description', content: 'This is pages about infomation blogs !'},
    ]);
    this.scrollCallback = this.getStories.bind(this);

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
    // this.blogService.getAll().subscribe(
    //   data => {
    //     // console.log(data);
    //     this.dataBlog = data;
    //   },
    //   error => console.log("get data error :"+error),
    // )

    this.blogService.getLatestStories(this.currentBlog)
                     .subscribe(
                       blog => {
                        //  console.log(blog);
                         this.blogs.concat(blog.data);
                         this.currentBlog++;
                        //  console.log(this.blogs);
                       },
                       error => console.log("get data blogs error :"+error),
                     )
  }

  // private processData = (blogs) => {
  //   this.currentBlog++;
  //   this.blogService.getLatestStories().subscribe(
  //     blogs => {
  //       this.blogs = this.blogs.concat(blogs.data);
  //       console.log(blogs);
  //     },
  //     error => console.log("get data error :"+error),
  //   )
  // }

  getStories() {
    return this.blogService.getLatestStories(this.currentBlog)
                           .subscribe(
                             blog => {
                               this.blogs.concat(blog.data);
                               this.currentBlog++;
                              //  console.log(blog.data)
                             },
                             error => {
                               Materialize.toast(`<span class="notiError">
                                 There is a problem, please try again !
                               </span>`, 4000);
                               console.log("get data blogs error :"+error);
                             },
                           )
    // return this.blogService.getLatestStories(this.currentBlog)
                            // .do(this.processData)
  }

  private processData = (blogs) => {
    this.currentBlog++;
    this.blogs = this.blogs.concat(blogs.json());
  }





//////////////////////////////////////////


  movePageDetail(e,data){
    e.preventDefault();
    this.router.navigate(['dashboard/blogs',data.slug], data);
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
