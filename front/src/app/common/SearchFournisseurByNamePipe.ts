import { Pipe, PipeTransform } from '@angular/core';
import { Fournisseur } from './../model/fournisseur';

@Pipe({ name: 'searchFournisseurByName' })
export class SearchFournisseurByNamePipe implements PipeTransform {
  transform(fournisseurs: Fournisseur[], searchText: string) {
    return fournisseurs.filter(p =>
      p.firstName && p.firstName.indexOf(searchText) !== -1
      || p.lastName && p.lastName.toString().indexOf(searchText) !== -1
      || p.address && p.address.toString().indexOf(searchText) !== -1
      || p.telephone && p.telephone.toString().indexOf(searchText) !== -1
      || p.fax && p.fax.toString().indexOf(searchText) !== -1
      || p.email && p.email.toString().indexOf(searchText) !== -1
    );
  }
}