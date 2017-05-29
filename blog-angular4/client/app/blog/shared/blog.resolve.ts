import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Blog } from './blog';
import { BlogService } from './blog.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class BlogResolve implements Resolve<Blog> {

  constructor(private blogService: BlogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any  {
     let slug = route.params['slug'];
     return this.blogService.getDetail(slug);
   }

}
