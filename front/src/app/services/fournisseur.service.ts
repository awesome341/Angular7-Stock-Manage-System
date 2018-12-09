import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Fournisseur } from './../model/fournisseur';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FournisseurService {

  private fournisseursUrl = 'http://localhost:3000/api/fournisseur';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET fournisseures from the server */
  getFournisseurs (): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.fournisseursUrl)
      .pipe(
        tap(fournisseures => this.log(`fetched fournisseures`)),
        catchError(this.handleError('getFournisseurs', []))
      );
  }

  /** GET fournisseur by id. Return `undefined` when id not found */
  getFournisseurNo404<Data>(id: number): Observable<Fournisseur> {
    const url = `${this.fournisseursUrl}/?id=${id}`;
    return this.http.get<Fournisseur[]>(url)
      .pipe(
        map(fournisseures => fournisseures[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} fournisseur id=${id}`);
        }),
        catchError(this.handleError<Fournisseur>(`getFournisseur id=${id}`))
      );
  }

  /** GET fournisseur by id. Will 404 if id not found */
  getFournisseur(id: number): Observable<Fournisseur> {
    const url = `${this.fournisseursUrl}/${id}`;
    return this.http.get<Fournisseur>(url).pipe(
      tap(_ => this.log(`fetched fournisseur id=${id}`)),
      catchError(this.handleError<Fournisseur>(`getFournisseur id=${id}`))
    );
  }

  /* GET fournisseures whose name contains search term */
  searchFournisseures(term: string): Observable<Fournisseur[]> {
    if (!term.trim()) {
      // if not search term, return empty fournisseur array.
      return of([]);
    }
    return this.http.get<Fournisseur[]>(`api/fournisseures/?name=${term}`).pipe(
      tap(_ => this.log(`found fournisseures matching "${term}"`)),
      catchError(this.handleError<Fournisseur[]>('searchFournisseures', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new fournisseur to the server */
  addFournisseur (fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.fournisseursUrl, fournisseur, httpOptions).pipe(
      tap((fournisseur: Fournisseur) => this.log(`added fournisseur w/ id=${fournisseur.id}`)),
      catchError(this.handleError<Fournisseur>('addFournisseur'))
    );
  }

  /** DELETE: delete the fournisseur from the server */
  deleteFournisseur (fournisseur: Fournisseur | number): Observable<Fournisseur> {
    const id = typeof fournisseur === 'number' ? fournisseur : fournisseur.id;
    const url = `${this.fournisseursUrl}/${id}`;

    return this.http.delete<Fournisseur>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted fournisseur id=${id}`)),
      catchError(this.handleError<Fournisseur>('deleteFournisseur'))
    );
  }

  /** PUT: update the fournisseur on the server */
  updateFournisseur (fournisseur: Fournisseur): Observable<any> {
    return this.http.put(this.fournisseursUrl, fournisseur, httpOptions).pipe(
      tap(_ => this.log(`updated fournisseur id=${fournisseur.id}`)),
      catchError(this.handleError<any>('updateFournisseur'))
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

  /** Log a FournisseurService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FournisseurService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/