import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Facture } from './../model/facture';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FactureService {

  private facturesUrl = 'http://localhost:3000/api/facture';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET facturees from the server */
  getFactures (): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.facturesUrl)
      .pipe(
        tap(facturees => this.log(`fetched facturees`)),
        catchError(this.handleError('getFactures', []))
      );
  }

  /** GET facture by id. Return `undefined` when id not found */
  getFactureNo404<Data>(id: number): Observable<Facture> {
    const url = `${this.facturesUrl}/?id=${id}`;
    return this.http.get<Facture[]>(url)
      .pipe(
        map(facturees => facturees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} facture id=${id}`);
        }),
        catchError(this.handleError<Facture>(`getFacture id=${id}`))
      );
  }

  /** GET facture by id. Will 404 if id not found */
  getFacture(id: number): Observable<Facture> {
    const url = `${this.facturesUrl}/${id}`;
    return this.http.get<Facture>(url).pipe(
      tap(_ => this.log(`fetched facture id=${id}`)),
      catchError(this.handleError<Facture>(`getFacture id=${id}`))
    );
  }

  /* GET facturees whose name contains search term */
  searchFacturees(term: string): Observable<Facture[]> {
    if (!term.trim()) {
      // if not search term, return empty facture array.
      return of([]);
    }
    return this.http.get<Facture[]>(`api/facturees/?name=${term}`).pipe(
      tap(_ => this.log(`found facturees matching "${term}"`)),
      catchError(this.handleError<Facture[]>('searchFacturees', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new facture to the server */
  addFacture (facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(this.facturesUrl, facture, httpOptions).pipe(
      tap((facture: Facture) => this.log(`added facture w/ id=${facture.id}`)),
      catchError(this.handleError<Facture>('addFacture'))
    );
  }

  /** DELETE: delete the facture from the server */
  deleteFacture (facture: Facture | number): Observable<Facture> {
    const id = typeof facture === 'number' ? facture : facture.id;
    const url = `${this.facturesUrl}/${id}`;

    return this.http.delete<Facture>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted facture id=${id}`)),
      catchError(this.handleError<Facture>('deleteFacture'))
    );
  }

  /** PUT: update the facture on the server */
  updateFacture (facture: Facture): Observable<any> {
    return this.http.put(this.facturesUrl, facture, httpOptions).pipe(
      tap(_ => this.log(`updated facture id=${facture.id}`)),
      catchError(this.handleError<any>('updateFacture'))
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

  /** Log a FactureService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FactureService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/