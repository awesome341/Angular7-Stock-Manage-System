import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Client } from './../model/client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClientService {

  private clientsUrl = 'http://localhost:3000/api/client';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET clientes from the server */
  getClients (): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe(
        tap(clientes => this.log(`fetched clientes`)),
        catchError(this.handleError('getClients', []))
      );
  }

  /** GET client by id. Return `undefined` when id not found */
  getClientNo404<Data>(id: number): Observable<Client> {
    const url = `${this.clientsUrl}/?id=${id}`;
    return this.http.get<Client[]>(url)
      .pipe(
        map(clientes => clientes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} client id=${id}`);
        }),
        catchError(this.handleError<Client>(`getClient id=${id}`))
      );
  }

  /** GET client by id. Will 404 if id not found */
  getClient(id: number): Observable<Client> {
    const url = `${this.clientsUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched client id=${id}`)),
      catchError(this.handleError<Client>(`getClient id=${id}`))
    );
  }

  /* GET clientes whose name contains search term */
  searchClientes(term: string): Observable<Client[]> {
    if (!term.trim()) {
      // if not search term, return empty client array.
      return of([]);
    }
    return this.http.get<Client[]>(`api/clientes/?name=${term}`).pipe(
      tap(_ => this.log(`found clientes matching "${term}"`)),
      catchError(this.handleError<Client[]>('searchClientes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new client to the server */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsUrl, client, httpOptions).pipe(
      tap((client: Client) => this.log(`added client w/ id=${client.id}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  /** DELETE: delete the client from the server */
  deleteClient (client: Client | number): Observable<Client> {
    const id = typeof client === 'number' ? client : client.id;
    const url = `${this.clientsUrl}/${id}`;

    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted client id=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }

  /** PUT: update the client on the server */
  updateClient (client: Client): Observable<any> {
    return this.http.put(this.clientsUrl, client, httpOptions).pipe(
      tap(_ => this.log(`updated client id=${client.id}`)),
      catchError(this.handleError<any>('updateClient'))
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

  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ClientService: ' + message);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/