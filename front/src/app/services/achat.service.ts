import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Achat } from './../model/achat';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AchatService {

  private achatsUrl = 'http://localhost:3000/api/achat';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET achates from the server */
  getAchats (): Observable<Achat[]> {
    return this.http.get<Achat[]>(this.achatsUrl)
      .pipe(
        tap(achates => this.log(`fetched achates`)),
        catchError(this.handleError('getMarqs', []))
      );
  }

  /** GET achat by id. Return `undefined` when id not found */
  getAchatNo404<Data>(id: number): Observable<Achat> {
    const url = `${this.achatsUrl}/?id=${id}`;
    return this.http.get<Achat[]>(url)
      .pipe(
        map(achates => achates[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} achat id=${id}`);
        }),
        catchError(this.handleError<Achat>(`getAchat id=${id}`))
      );
  }

  /** GET achat by id. Will 404 if id not found */
  getAchat(id: number): Observable<Achat> {
    const url = `${this.achatsUrl}/${id}`;
    return this.http.get<Achat>(url).pipe(
      tap(_ => this.log(`fetched achat id=${id}`)),
      catchError(this.handleError<Achat>(`getAchat id=${id}`))
    );
  }

  /* GET achates whose name contains search term */
  searchAchates(term: string): Observable<Achat[]> {
    if (!term.trim()) {
      // if not search term, return empty achat array.
      return of([]);
    }
    return this.http.get<Achat[]>(`api/achates/?name=${term}`).pipe(
      tap(_ => this.log(`found achates matching "${term}"`)),
      catchError(this.handleError<Achat[]>('searchAchates', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new achat to the server */
  addAchat (achat: Achat): Observable<Achat> {
    return this.http.post<Achat>(this.achatsUrl, achat, httpOptions).pipe(
      tap((achat: Achat) => this.log(`added achat w/ id=${achat.id}`)),
      catchError(this.handleError<Achat>('addAchat'))
    );
  }

  /** DELETE: delete the achat from the server */
  deleteAchat (achat: Achat | number): Observable<Achat> {
    const id = typeof achat === 'number' ? achat : achat.id;
    const url = `${this.achatsUrl}/${id}`;

    return this.http.delete<Achat>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted achat id=${id}`)),
      catchError(this.handleError<Achat>('deleteAchat'))
    );
  }

  /** PUT: update the achat on the server */
  updateAchat (achat: Achat): Observable<any> {
    return this.http.put(this.achatsUrl, achat, httpOptions).pipe(
      tap(_ => this.log(`updated achat id=${achat.id}`)),
      catchError(this.handleError<any>('updateAchat'))
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

  /** Log a AchatService message with the MessageService */
  private log(message: string) {
    this.messageService.add('AchatService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/