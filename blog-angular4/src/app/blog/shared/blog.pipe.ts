import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blog'
})
export class BlogPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
