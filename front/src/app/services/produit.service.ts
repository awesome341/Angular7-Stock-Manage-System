import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Produit } from './../model/produit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProduitService {

  private produitesUrl = 'http://localhost:3000/api/produit';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET produites from the server */
  getProducts (): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitesUrl)
      .pipe(
        tap(produites => this.log(`fetched produites`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** GET produit by id. Return `undefined` when id not found */
  getProduitNo404<Data>(id: number): Observable<Produit> {
    const url = `${this.produitesUrl}/?id=${id}`;
    return this.http.get<Produit[]>(url)
      .pipe(
        map(produites => produites[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} produit id=${id}`);
        }),
        catchError(this.handleError<Produit>(`getProduit id=${id}`))
      );
  }

  /** GET produit by id. Will 404 if id not found */
  getProduit(id: number): Observable<Produit> {
    const url = `${this.produitesUrl}/${id}`;
    return this.http.get<Produit>(url).pipe(
      tap(_ => this.log(`fetched produit id=${id}`)),
      catchError(this.handleError<Produit>(`getProduit id=${id}`))
    );
  }

  /* GET produites whose name contains search term */
  searchProduites(term: string): Observable<Produit[]> {
    if (!term.trim()) {
      // if not search term, return empty produit array.
      return of([]);
    }
    return this.http.get<Produit[]>(`api/produites/?name=${term}`).pipe(
      tap(_ => this.log(`found produites matching "${term}"`)),
      catchError(this.handleError<Produit[]>('searchProduites', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new produit to the server */
  addProduit (produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.produitesUrl, produit, httpOptions).pipe(
      tap((produit: Produit) => this.log(`added produit w/ id=${produit.id}`)),
      catchError(this.handleError<Produit>('addProduit'))
    );
  }

  /** DELETE: delete the produit from the server */
  deleteProduit (produit: Produit | number): Observable<Produit> {
    const id = typeof produit === 'number' ? produit : produit.id;
    const url = `${this.produitesUrl}/${id}`;

    return this.http.delete<Produit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted produit id=${id}`)),
      catchError(this.handleError<Produit>('deleteProduit'))
    );
  }

  /** PUT: update the produit on the server */
  updateProduit (produit: Produit): Observable<any> {
    return this.http.put(this.produitesUrl, produit, httpOptions).pipe(
      tap(_ => this.log(`updated produit id=${produit.id}`)),
      catchError(this.handleError<any>('updateProduit'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProduitService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProduitService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/