import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx"
import { BehaviorSubject } from 'rxjs/Rx';
import { GlobalService } from "../../global-shared/global.service";
import { Router } from "@angular/router";
@Injectable()
export class CategoryService extends GlobalService{

  public urlImage : string = `${this.URLservice}/public/images`;
  protected database : string= 'categories';

  constructor(
    private http : Http,
    private router : Router,
  ) {
    super(http,router)
  }

  totalTicketCount:BehaviorSubject<number> = new BehaviorSubject<number>(10);

  getListBlogs(page : number) : Observable<any> {
     return this.http.get(`${this.getURL()}?page=${page}`,this.options)
                      .map((response : Response) => response.json())
                      .catch(this.handleError);
  }

  getPager(totalPages:number,currentPage: number = 1){
    let startPage : number,endPage : number;
    if(totalPages <= 10){
      startPage = 1;
      endPage = totalPages;
    }else{
      if(currentPage <= 6){
        startPage = 1;
        endPage = 10;
      }else if(currentPage + 4 >= totalPages){
        startPage = totalPages - 9;
        endPage = totalPages;
      }else{
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let pages = this.range(startPage, (endPage+1)-startPage);
    return pages;
  }

  public range(start, count) {
    return Array.apply(0, Array(count))
      .map((element, index) =>  {
        return index + start;
    });
  }


}
