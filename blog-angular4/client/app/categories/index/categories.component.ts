import { Component, OnInit, HostBinding, AfterContentChecked } from '@angular/core';
import { Title as TitleCategory, Meta } from "@angular/platform-browser";
import { routerAnimation } from "../../global-shared/global.animation";
import { CategoryService } from "../shared/category.service";
import { Observable } from "rxjs/Observable";
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [routerAnimation],
})
export class CategoriesComponent implements OnInit, AfterContentChecked {

  @HostBinding('@routerTransition')
  @HostBinding('style.display')   display = 'block';

  private allCategory : any[];
  private totalItems : number;
  private currentPage : number;
  private totalPages : number;
  private pager : any = {};
  // private pager : any[];



  constructor(
    private titleService : TitleCategory,
    private metaService : Meta,
    private categoryService : CategoryService
  ) {
      titleService.setTitle('Category Infomation');
      metaService.addTags([
        {name: 'author', content: 'Remy Nguyen'},
        {name: 'keywords', content: 'Category infomation for blogs'},
        {name: 'description', content: 'This is categories page !'},
      ]);
  }

  ngOnInit() {
    this.queryCategories();
  }

  ngAfterContentChecked(){
    this.pager =  this.categoryService.getPager(this.totalPages,this.currentPage);
  }

  queryCategories(page : number = 1){
    this.categoryService.getListBlogs(page).subscribe(
      category => {
        this.totalItems = category.total;
        this.currentPage = category.current_page;
        this.totalPages = category.last_page;
        this.allCategory = category.data;

      },
      error => {
        Materialize.toast(`<span>
          There is a problem, please try again !
        </span>`, 3500,'notiError');
        console.log("get data blogs error :"+error)
      },
    )
  }

  pageContinue(e,page : number){
    e.preventDefault();
    this.queryCategories(page);
  }

  pageFirst(e){
    e.preventDefault();
    if(this.currentPage <= 1){
      return false;
    }else{
        this.queryCategories(1);
    }
  }

  pagePrevious(e){
    e.preventDefault();
    let pagePrevious = this.currentPage  - 1;
    if(pagePrevious < 1){
      return false;
    }else{
        this.queryCategories(pagePrevious);
    }
  }

  pageNext(e){
    e.preventDefault();
    let pageNext = this.currentPage  + 1;
    if(pageNext > this.totalPages){
      return false;
    }else{
      this.queryCategories(pageNext);
    }
  }

  pageLast(e){
    e.preventDefault();
    if(this.currentPage >= this.totalPages){
      return false;
    }else{
        this.queryCategories(this.totalPages);
    }
  }








}
