import { Pipe, PipeTransform } from '@angular/core';
import { Marque } from './../model/marque';

@Pipe({ name: 'searchMarqByName' })
export class SearchMarqByNamePipe implements PipeTransform {
  transform(marqs: Marque[], searchText: string) {
    return marqs.filter(p =>
      p.label && p.label.indexOf(searchText) !== -1
    );
  }
}