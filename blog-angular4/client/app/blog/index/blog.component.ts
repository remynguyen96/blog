import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { routerAnimation } from "../../global-shared/global.animation";
import { Title, Meta } from "@angular/platform-browser";
import { BlogService } from "../shared/blog.service";
import { Router } from "@angular/router";
import {trigger, animate, style, transition, animateChild, group, query, stagger} from '@angular/animations';
declare var $:any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    routerAnimation,
  ]
})
export class BlogComponent implements OnInit, AfterViewInit {

  @HostBinding('@routerTransition')
  @HostBinding('style.display')   display = 'block';

  @ViewChild('upload') importFile : ElementRef;
  @ViewChild('download') exportFile : ElementRef;

  private dataBlog : Array<Object>;

  private listBlogs : Array<Object> = [];

  private currentListBlog: number = 1;

  private loadEvent: boolean = false;

  private urlImage : string = `${this.blogService.URLservice}/public/images`;

  private sortBlogs : string;

  private filterBlogs : string;

  private keyBlogs : Array<Object> = [
    'id', 'title', 'slug','excerpt','status', 'user_id', 'created_at', 'updated_at'
  ];


  private sort : Array<Object> = [
    {name : 'Descending', images : '../../../assets/images/radu-emanuel-15870.jpg' },
    { name : 'Ascending', images : '../../../assets/images/radu-emanuel-15870.jpg' },
  ];

  private filter : Array<Object> = [
    { name : 'All Blogs', images : '../../../assets/images/radu-emanuel-15870.jpg' },
    { name : 'Blogs Favorite', images : '../../../assets/images/radu-emanuel-15870.jpg' },
    { name : 'ID Blogs < 50', images : '../../../assets/images/radu-emanuel-15870.jpg' },
  ];

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private router : Router,
    private blogService : BlogService,
    private renderer : Renderer2,
  ) {
    titleService.setTitle('Blog Infomation');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Pages blogs'},
      {name: 'description', content: 'This is pages about infomation blogs !'},
    ]);
  }

  ngOnInit() {
    this.blogService.getListBlogs(this.currentListBlog)
         .subscribe(
           blog => {
             this.dataBlog = blog.data;
           },
           error => {
             Materialize.toast(`<span>
               There is a problem, please try again !
             </span>`, 3500,'notiError');
             console.log("get data blogs error :"+error)
           },
           ()=> this.listBlogs = this.dataBlog );
  }

  ngAfterViewInit(){
    this.renderer.setStyle(this.importFile.nativeElement,'display','none');
    this.renderer.setStyle(this.exportFile.nativeElement,'display','none');
  }

  sortType() {
    if(this.sortBlogs === 'Descending'){
      this.dataBlog.sort((a: any, b: any) => {
        if(a.id > b.id) return -1;
        else if(a.id < b.id) return 1;
        else return 0;
      });
    }else{
      this.dataBlog.sort((a: any, b: any) => {
        if(a.id > b.id) return 1;
        else if(a.id < b.id) return -1;
        else return 0;
      });
    }
  }

  filterType(){
    switch(this.filterBlogs){
      case 'All Blogs':
      this.dataBlog = this.listBlogs;
      break;

      case 'Blogs Favorite':
      this.dataBlog = this.dataBlog.filter((blog : any) => {
        return blog.title.toLowerCase().includes('post 45');
        // return blog.title.toLowerCase().includes('favorite');
      });
      break;

      case 'ID Blogs < 50':
      this.dataBlog = this.dataBlog.filter((blog : any) => {
        return parseInt(blog.id) < 50;
      });
      break;
    }
  }

  loadMore(){
    this.loadEvent = true;
    this.currentListBlog++;
    this.blogService.getListBlogs(this.currentListBlog)
        .debounceTime(5000)
        .distinctUntilChanged()
        .throttleTime(50000)
        .subscribe(
          blogs => {
            this.dataBlog = this.dataBlog.concat(blogs.data);
            this.loadEvent = false;
          },
          error => {
            Materialize.toast(`<span>
              There is a problem, please try again !
            </span>`, 4000,'notiError');
            console.log(`error : ${error}`);
          }
        )
  }

  favoriteBlog(e){
    e.preventDefault();
    console.log("favoriteBlog");
  }

  movePageDetail(e,data){
    e.preventDefault();
    this.router.navigate(['dashboard/blogs',data.slug], data);
    //  this.router.navigate(['/component2'], { queryParams: { page: pageNum } });
  }

  importExcel(){
    this.importFile.nativeElement.click();
  }

  handingImport(){
    let fileUpload = this.importFile.nativeElement;
    if(fileUpload.files && fileUpload.files[0]){
      return new Promise((resolve, reject) => {
          let formData = new FormData(),
              xhr = new XMLHttpRequest();
          formData.append('fileExcel', fileUpload, fileUpload.name);
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      resolve(JSON.parse(xhr.response));
                      Materialize.toast('Import file successful !',2500,'notiSuccess rounded');
                  } else {
                      reject(xhr.response);
                      Materialize.toast('There is a problem, please try again !',3000,'notiError');
                  }
              }
          }
          xhr.open('POST', `http://localhost:4200/dashboard/blogs`, true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
          xhr.send(formData);
      });
    }
  }

  exportExcel(){
    let href = this.renderer.setAttribute(this.exportFile.nativeElement,'href','http://blog.app/public/images/background2.jpg');
    // this.exportFile.nativeElement.click();
    // let token = `token="${localStorage.getItem('auth_token')}"`;
    // return `${self.appConfig.baseApiUrl}/${url}?${token}`;
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
