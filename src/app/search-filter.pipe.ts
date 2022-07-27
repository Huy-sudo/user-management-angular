import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      if (it.firstName.toLocaleLowerCase().includes(searchText))
        return it;
      if (it.lastName.toLocaleLowerCase().includes(searchText))
        return it;
      if (it.email.toLocaleLowerCase().includes(searchText))
        return it;
      else
        return null
    });
  }
}