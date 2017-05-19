import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BlogService } from "../blog/shared/blog.service";
import { Blog } from "../blog/shared/blog";
@Injectable()
export class DataResolver  {
// export class DataResolver implements Resolve<Blog> {


  constructor(private blogService : BlogService, private router: Router ){

  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DetailComponent> {
    //  let id = route.params['id'];
    //  return this.cs.getCrisis(id).then(crisis => {
    //    if (crisis) {
    //      return crisis;
    //    } else { // id not found
    //      this.router.navigate(['/crisis-center']);
    //      return null;
    //    }
    //  });
  //  }

}
