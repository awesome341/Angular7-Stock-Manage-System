import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Marque } from './../model/marque';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MarqueService {

  private marquesUrl = 'http://localhost:3000/api/marque';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET marquees from the server */
  getMarqs (): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.marquesUrl)
      .pipe(
        tap(marquees => this.log(`fetched marquees`)),
        catchError(this.handleError('getMarqs', []))
      );
  }

  /** GET marque by id. Return `undefined` when id not found */
  getMarqueNo404<Data>(id: number): Observable<Marque> {
    const url = `${this.marquesUrl}/?id=${id}`;
    return this.http.get<Marque[]>(url)
      .pipe(
        map(marquees => marquees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} marque id=${id}`);
        }),
        catchError(this.handleError<Marque>(`getMarque id=${id}`))
      );
  }

  /** GET marque by id. Will 404 if id not found */
  getMarque(id: number): Observable<Marque> {
    const url = `${this.marquesUrl}/${id}`;
    return this.http.get<Marque>(url).pipe(
      tap(_ => this.log(`fetched marque id=${id}`)),
      catchError(this.handleError<Marque>(`getMarque id=${id}`))
    );
  }

  /* GET marquees whose name contains search term */
  searchMarquees(term: string): Observable<Marque[]> {
    if (!term.trim()) {
      // if not search term, return empty marque array.
      return of([]);
    }
    return this.http.get<Marque[]>(`api/marquees/?name=${term}`).pipe(
      tap(_ => this.log(`found marquees matching "${term}"`)),
      catchError(this.handleError<Marque[]>('searchMarquees', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new marque to the server */
  addMarque (marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.marquesUrl, marque, httpOptions).pipe(
      tap((marque: Marque) => this.log(`added marque w/ id=${marque.id}`)),
      catchError(this.handleError<Marque>('addMarque'))
    );
  }

  /** DELETE: delete the marque from the server */
  deleteMarque (marque: Marque | number): Observable<Marque> {
    const id = typeof marque === 'number' ? marque : marque.id;
    const url = `${this.marquesUrl}/${id}`;

    return this.http.delete<Marque>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted marque id=${id}`)),
      catchError(this.handleError<Marque>('deleteMarque'))
    );
  }

  /** PUT: update the marque on the server */
  updateMarque (marque: Marque): Observable<any> {
    return this.http.put(this.marquesUrl, marque, httpOptions).pipe(
      tap(_ => this.log(`updated marque id=${marque.id}`)),
      catchError(this.handleError<any>('updateMarque'))
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

  /** Log a MarqueService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MarqueService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/