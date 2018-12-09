import { Pipe, PipeTransform } from '@angular/core';
import { Client } from './../model/client';

@Pipe({ name: 'searchClientByName' })
export class SearchClientByNamePipe implements PipeTransform {
  transform(clients: Client[], searchText: string) {
    return clients.filter(p =>
      p.firstName && p.firstName.indexOf(searchText) !== -1
      || p.lastName && p.lastName.toString().indexOf(searchText) !== -1
      || p.address && p.address.toString().indexOf(searchText) !== -1
      || p.paymentMode && p.paymentMode.toString().indexOf(searchText) !== -1
      || p.telephone && p.telephone.toString().indexOf(searchText) !== -1
      || p.fax && p.fax.toString().indexOf(searchText) !== -1
      || p.email && p.email.toString().indexOf(searchText) !== -1
    );
  }
}
