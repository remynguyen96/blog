import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx"
import { BehaviorSubject } from 'rxjs/Rx';
import { GlobalService } from "../../global-shared/global.service";
import { Router } from "@angular/router";
@Injectable()
export class CategoryService extends GlobalService{
  protected database : string = 'categories';

  constructor(
    private http : Http,
    private router : Router,
  ) {
    super(http,router)
  }

  totalTicketCount:BehaviorSubject<number> = new BehaviorSubject<number>(10);

  public getAll(): Observable<any> {
      let headers = new Headers({
          "Content-Type": "application/json",
      });
      return this.http
          .get(`http://blog.app/api/categories/get-all`,{headers})
          .map((res:Response) => res.json())
          .catch(this.handleError);
  }

  public save(post: any): Observable<any> {
      let headers = new Headers({
          "Content-Type": "application/json",
      });
      return this.http.post(`http://blog.app/api/categories/create-item`, post, {headers})
                      .map((res:Response) => res.json());
  }

  public delete(post: any): Observable<Response> {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      return this.http.delete(`http://blog.app/api/categories/remove-item/${post.id}`, {headers})
                      .map((res:Response) => res.json());
  }


}
