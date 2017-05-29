import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import { Blog } from "./blog";

////////////////////////////////
@Injectable()
export class BlogService extends GlobalService  {

  public urlImage : string = `${this.URLservice}/public/images`;

  protected database : string= 'blogs';

  constructor(
    private http : Http,
    private router : Router
  ) {
    super(http,router);
  }

  getListBlogs(page : number) : Observable<any> {
     return this.http.get(`${this.getURL()}?page=${page}`,this.options)
                      .map((response : Response) => response.json())
                      .catch(this.handleError);
  }

}
