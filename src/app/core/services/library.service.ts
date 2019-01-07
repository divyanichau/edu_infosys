
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
import { BookReturn } from '../../core/classes/bookreturn';

@Injectable()
export class LibraryService {
  private _addcategoryUrl = `${new Config().api}/library/category/`;
  private _addbookUrl = `${new Config().api}/library/books/`;
  private _issuebookUrl = `${new Config().api}/library/issue/`;
  private _bookreturnUrl = `${new Config().api}/library/return/`;

  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

   find(id: string): Observable<BookCategory> {
    //this.beforeRequest();

   return this._http.get(`${this._addcategoryUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

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


  addBook(library: AddBook): Observable<AddBook> {
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


  addIssue(library : IssueBook): Observable<IssueBook> {
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


  getReturn(): Observable<BookReturn[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._bookreturnUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      ),);
  }


  addReturn(library: BookReturn): Observable<BookReturn> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._bookreturnUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { console.log(error); }
      ),);
  }

   update(library : BookCategory,id:string): Observable<BookCategory> {
    console.log("Uhshsd",library);
    this.beforeRequest();
    const body = JSON.stringify(library);
   

    return this._http.put(`${this._addcategoryUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
     
  }



   delete(id: number): Observable<BookCategory> {
    this.beforeRequest();
    //const body = JSON.stringify(bookcategory);

    return this._http.delete(`${this._addcategoryUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
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

   afterGetRequest(): void {
    this._utils.stop_progress();
  }


   afterUpdateRequest(data: BookCategory): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam Term Updated!");
   }


  showError(error): void {
    console.log(error);
   
  }

}

