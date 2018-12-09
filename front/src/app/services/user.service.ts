import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Utilisateur } from './../model/utilisateur';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UtilisateurService {

  private utilisateursUrl = 'http://localhost:3000/api/utilisateur';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET utilisateures from the server */
  getUtilisateurs (): Observable<Utilisateur[]> {
    // return this.http.get<Utilisateur[]>(this.utilisateursUrl)
    //   .pipe(
    //     tap(utilisateures => this.log(`fetched utilisateures`)),
    //     catchError(this.handleError('getUtilisateurs', []))
    //   );
    return 
  }

  /** GET utilisateur by id. Return `undefined` when id not found */
  getUtilisateurNo404<Data>(id: number): Observable<Utilisateur> {
    const url = `${this.utilisateursUrl}/?id=${id}`;
    return this.http.get<Utilisateur[]>(url)
      .pipe(
        map(utilisateures => utilisateures[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} utilisateur id=${id}`);
        }),
        catchError(this.handleError<Utilisateur>(`getUtilisateur id=${id}`))
      );
  }

  /** GET utilisateur by id. Will 404 if id not found */
  getUtilisateur(id: number): Observable<Utilisateur> {
    const url = `${this.utilisateursUrl}/${id}`;
    return this.http.get<Utilisateur>(url).pipe(
      tap(_ => this.log(`fetched utilisateur id=${id}`)),
      catchError(this.handleError<Utilisateur>(`getUtilisateur id=${id}`))
    );
  }

  /* GET utilisateures whose name contains search term */
  searchUtilisateures(term: string): Observable<Utilisateur[]> {
    if (!term.trim()) {
      // if not search term, return empty utilisateur array.
      return of([]);
    }
    return this.http.get<Utilisateur[]>(`api/utilisateures/?name=${term}`).pipe(
      tap(_ => this.log(`found utilisateures matching "${term}"`)),
      catchError(this.handleError<Utilisateur[]>('searchUtilisateures', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new utilisateur to the server */
  addUtilisateur (utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.utilisateursUrl, utilisateur, httpOptions).pipe(
      tap((utilisateur: Utilisateur) => this.log(`added utilisateur w/ id=${utilisateur.id}`)),
      catchError(this.handleError<Utilisateur>('addUtilisateur'))
    );
  }

  /** DELETE: delete the utilisateur from the server */
  deleteUtilisateur (utilisateur: Utilisateur | number): Observable<Utilisateur> {
    const id = typeof utilisateur === 'number' ? utilisateur : utilisateur.id;
    const url = `${this.utilisateursUrl}/${id}`;

    return this.http.delete<Utilisateur>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted utilisateur id=${id}`)),
      catchError(this.handleError<Utilisateur>('deleteUtilisateur'))
    );
  }

  /** PUT: update the utilisateur on the server */
  updateUtilisateur (utilisateur: Utilisateur): Observable<any> {
    return this.http.put(this.utilisateursUrl, utilisateur, httpOptions).pipe(
      tap(_ => this.log(`updated utilisateur id=${utilisateur.id}`)),
      catchError(this.handleError<any>('updateUtilisateur'))
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

  /** Log a UtilisateurService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UtilisateurService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/