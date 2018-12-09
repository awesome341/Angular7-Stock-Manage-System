import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from './../model/produit';

@Pipe({ name: 'searchProductByName' })
export class SearchProductByNamePipe implements PipeTransform {
  transform(products: Produit[], searchText: string) {
    return products.filter(p =>
      p.ref && p.ref.indexOf(searchText) !== -1
      || p.description && p.description.toString().indexOf(searchText) !== -1
      || p.tva && p.tva.toString().indexOf(searchText) !== -1
      || p.unitSellPriceHt && p.unitSellPriceHt.toString().indexOf(searchText) !== -1
      || p.categoryId && p.categoryId.toString().indexOf(searchText) !== -1
    );
  }
}