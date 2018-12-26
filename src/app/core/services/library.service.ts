import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
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
  private _courseUrl = `${new Config().api}/course/course/`;
  private _studentUrl = `${new Config().api}/admission/student/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(): Observable<BookCategory[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._addcategoryUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }


  add(library: BookCategory): Observable<BookCategory> {
    this.beforeRequest();
    const body = JSON.stringify(library);

    return this._http.post(`${this._addcategoryUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }


   getBook(): Observable<AddBook[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._addbookUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }


  addBook(library): Observable<AddBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._addbookUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }


   getIssue(): Observable<IssueBook[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._issuebookUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }


  addIssue(library): Observable<IssueBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._issuebookUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  
  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: AddBook): void {
    this._progress.done();
  }


  afterRequestGet(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}

