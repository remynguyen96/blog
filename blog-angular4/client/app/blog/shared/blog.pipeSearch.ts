import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBlog'
})
export class BlogPipeSearch implements PipeTransform {

  transform(value: any, args: any, field?: any): any {
    if(args === undefined) return value;
    return value.filter(eachItem => {
      if(field){
        // NOTE: not working
        for(let item in eachItem){
          if(field === item){
            return eachItem[field].toLowerCase().includes(args.toLowerCase());
          }
        }
      }else{
        return eachItem.title.toLowerCase().includes(args.toLowerCase()) ||
               eachItem.slug.toLowerCase().includes(args.toLowerCase());
      }

    })
  }

}


@Pipe({name: 'loopObject'})
export class BlogPipeLoop implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
