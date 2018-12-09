import { Pipe, PipeTransform } from '@angular/core';
import { Facture } from './../model/facture';

@Pipe({ name: 'searchFactureByName' })
export class SearchFactureByNamePipe implements PipeTransform {
  transform(factures: Facture[], searchText: string) {
    return factures.filter(p =>
      p.totalPriceHt && p.totalPriceHt.toString().indexOf(searchText) !== -1
      || p.totalPriceTtc && p.totalPriceTtc.toString().indexOf(searchText) !== -1
      || p.creationDate && p.creationDate.toString().indexOf(searchText) !== -1
    );
  }
}