import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { GlobalService } from "../../global-shared/global.service";

////////////////////////////////
@Injectable()
export class MenuService extends GlobalService  {

  public urlImage : string = `${this.URLservice}/public/images`;

  protected database : string= 'blogs';

  constructor(
    private http : Http,
    private router : Router
  ) {
    super(http,router);
  }

  getDataMenu(){
    return this.http.get(`${this.getURL()}/menu`,this.options)
                    .map((response : Response) => response.json())
                    .catch(this.handleError2.bind(this));
  }

  handleError2(error: Response){
      if(error.statusText == 'Unauthorized')
          this.router.navigate(['/auth/login']);
      else{
          console.log(error);
      }
  }

}
