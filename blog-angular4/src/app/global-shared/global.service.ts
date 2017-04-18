import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
@Injectable()
export class GlobalService {
  public URLservice : string = "http://blog.app";
  protected database : string;
  protected options : any;
  constructor(private _http : Http , private _router : Router) {
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.options = new RequestOptions({ headers : headers });
  }

  protected getURL(){
    return `${this.URLservice}/api/${this.database}`;
  }

  protected handleError(err) {
    let errMessage: string;
    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
      // this._router.navigate(['auth']);
    }
    return Observable.throw(errMessage);
        // return Observable.throw(error.json() || 'Server error.');
  }

  public getAll() : Observable<any> {
    return this._http.get(`${this.getURL()}/get-all`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  public getDetail(slug) : Observable<any> {
    return this._http.post(`${this.getURL()}/get-item/${slug}`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  public create(data : any) : Observable<any> {
    return this._http.post(`${this.getURL()}/create-item`,data,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  public edit(slug,data : any) : Observable<any> {
    return this._http.put(`${this.getURL()}/edit-item/${slug}`,data,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  public remove(slug) : Observable<Response> {
    return this._http.delete(`${this.getURL()}/remove-item/${slug}`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  // protected delete(id: number): Observable<any> {
  //   return this._http.delete(`${this.getUrl()}/delete/${id}?token=${this.getToken()}`, { headers: this.headers })
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

}
