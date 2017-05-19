import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
@Injectable()
export class GlobalService {

  URLservice : string = "http://blog.app";
  protected database : string;
  protected options : any;

  constructor(private _http : Http , private _router : Router) {
    let headers = new Headers({'X-Requested-With' : 'XMLHttpRequest'});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.options = new RequestOptions({ headers : headers });
  }

  protected getURL() : string{
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
    }
    this._router.navigate(['/auth/login']);
    return Observable.throw(errMessage);
  }

  getAll() : Observable<any> {
    return this._http.get(`${this.getURL()}/get-all`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  getDetail(slug) : Observable<any> {
    return this._http.post(`${this.getURL()}/get-item/${slug}`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  create(data : any) : Observable<any> {
    return this._http.post(`${this.getURL()}/create-item`,data,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  edit(slug,data : any) : Observable<any> {
    return this._http.put(`${this.getURL()}/edit-item/${slug}`,data,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  remove(slug) : Observable<Response> {
    return this._http.delete(`${this.getURL()}/remove-item/${slug}`,this.options)
                      .map((response : Response) => response.json() )
                      .catch(this.handleError);
  }

  convertSlug(str : string) :string{
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
      str = str.replace(/-+-/g, "-");
      str = str.replace(/^\-+|\-+$/g, "");
      return str;
  }




  // protected delete(id: number): Observable<any> {
  //   return this._http.delete(`${this.getUrl()}/delete/${id}?token=${this.getToken()}`, { headers: this.headers })
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

}
