import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PagesService extends GlobalService  {

  public urlImage : string = `${this.URLservice}/public/images`;

  protected database : string= 'pages';

  private _tvMazeURL : string = 'https://api.tvmaze.com/search/shows';

  private _navItemSource  = new BehaviorSubject<string>(null);

  navItem = this._navItemSource.asObservable();

  constructor(
    private http : Http,
    private router : Router
  ) {
    super(http,router);
  }

  search(query : any): Observable<any>{
      let search : URLSearchParams = new URLSearchParams();
      search.set('q',query)
      return this.http.get(this._tvMazeURL,{search})
                .map((response : Response) => {
                  return response.json();
                  // response.json().filter(item => {
                  //   if(item.show.id === 481){
                  //     console.log(item);
                  //     return item;
                  //   }
                  // });
                })
                .catch(this.handleError);
  }

  changeNav(query : string){
      this._navItemSource.next(query);
  }



}
