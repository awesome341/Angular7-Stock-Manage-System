import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { EntreeStock } from './../model/entreeStock';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EntreeStockService {

  private entreeStocksUrl = 'http://localhost:3000/api/entreeStock';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET entreeStockes from the server */
  getEntreesStock(): Observable<EntreeStock[]> {
    return this.http.get<EntreeStock[]>(this.entreeStocksUrl)
      .pipe(
        tap(entreeStockes => this.log(`fetched entreeStockes`)),
        catchError(this.handleError('getMarqs', []))
      );
  }

  /** GET entreeStock by id. Return `undefined` when id not found */
  getEntreeStockNo404<Data>(id: number): Observable<EntreeStock> {
    const url = `${this.entreeStocksUrl}/?id=${id}`;
    return this.http.get<EntreeStock[]>(url)
      .pipe(
        map(entreeStockes => entreeStockes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} entreeStock id=${id}`);
        }),
        catchError(this.handleError<EntreeStock>(`getEntreeStock id=${id}`))
      );
  }

  /** GET entreeStock by id. Will 404 if id not found */
  getEntreeStock(id: number): Observable<EntreeStock> {
    const url = `${this.entreeStocksUrl}/${id}`;
    return this.http.get<EntreeStock>(url).pipe(
      tap(_ => this.log(`fetched entreeStock id=${id}`)),
      catchError(this.handleError<EntreeStock>(`getEntreeStock id=${id}`))
    );
  }

  /* GET entreeStockes whose name contains search term */
  searchEntreeStockes(term: string): Observable<EntreeStock[]> {
    if (!term.trim()) {
      // if not search term, return empty entreeStock array.
      return of([]);
    }
    return this.http.get<EntreeStock[]>(`api/entreeStockes/?name=${term}`).pipe(
      tap(_ => this.log(`found entreeStockes matching "${term}"`)),
      catchError(this.handleError<EntreeStock[]>('searchEntreeStockes', []))
    );
  }


  /** POST: add a new entreeStock to the server */
  addEntreeStock(entreeStock: EntreeStock): Observable<EntreeStock> {
    return this.http.post<EntreeStock>(this.entreeStocksUrl, entreeStock, httpOptions).pipe(
      tap((entreeStock: EntreeStock) => this.log(`added entreeStock w/ id=${entreeStock.id}`)),
      catchError(this.handleError<EntreeStock>('addEntreeStock'))
    );
  }

  /** DELETE: delete the entreeStock from the server */
  deleteEntreeStock(entreeStock: EntreeStock | number): Observable<EntreeStock> {
    const id = typeof entreeStock === 'number' ? entreeStock : entreeStock.id;
    const url = `${this.entreeStocksUrl}/${id}`;

    return this.http.delete<EntreeStock>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted entreeStock id=${id}`)),
      catchError(this.handleError<EntreeStock>('deleteEntreeStock'))
    );
  }

  /** PUT: update the entreeStock on the server */
  updateEntreeStock(entreeStock: EntreeStock): Observable<any> {
    return this.http.put(this.entreeStocksUrl, entreeStock, httpOptions).pipe(
      tap(_ => this.log(`updated entreeStock id=${entreeStock.id}`)),
      catchError(this.handleError<any>('updateEntreeStock'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EntreeStockService message with the MessageService */
  private log(message: string) {
    this.messageService.add('EntreeStockService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/