
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { AddBook } from '../../core/classes/addbook';
import { BookCategory } from '../../core/classes/bookcategory';
import { IssueBook } from '../../core/classes/issuebook';

@Injectable()
export class LibraryService {
  private _addcategoryUrl = `${new Config().api}/library/category/`;
  private _addbookUrl = `${new Config().api}/library/books/`;
  private _issuebookUrl = `${new Config().api}/library/issue/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  get(): Observable<BookCategory[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._addcategoryUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      ),);
  }


  add(library: BookCategory): Observable<BookCategory> {
    this.beforeRequest();
    const body = JSON.stringify(library);

    return this._http.post(`${this._addcategoryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { console.log(error); }
      ),);
  }


   getBook(): Observable<AddBook[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._addbookUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      ),);
  }


  addBook(library): Observable<AddBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._addbookUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { console.log(error); }
      ),);
  }


   getIssue(): Observable<IssueBook[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._issuebookUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      ),);
  }


  addIssue(library): Observable<IssueBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._issuebookUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { console.log(error); }
      ),);
  }

  
  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: AddBook): void {
    this._utils.stop_progress();
  }


  afterRequestGet(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
   
  }

}

