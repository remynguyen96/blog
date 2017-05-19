import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBlog'
})
export class BlogPipeSearch implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args === undefined) return value;
    return value.filter((eachItem) => {
      return eachItem.title.toLowerCase().includes(args.toLowerCase()) ||
             eachItem.excerpt.toLowerCase().includes(args.toLowerCase()) ||
             eachItem.slug.toLowerCase().includes(args.toLowerCase());
    })
  }

}
