import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterFild: string, keyword: string): any {
    if (!filterFild || !keyword) {
      return list;
    }
    return list.filter( item => {
      let filterValue = item[filterFild];
      return filterValue.indexOf(keyword) >= 0;
    });
  }

}
