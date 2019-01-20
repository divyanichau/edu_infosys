
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { AddBook } from '../../core/classes/addbook';
import { BookCategory } from '../../core/classes/bookcategory';
import { IssueBook } from '../../core/classes/issuebook';
import { BookReturn } from '../../core/classes/bookreturn';
import { Report } from '../../core/classes/bookreport';

@Injectable()
export class LibraryService {
  private _addcategoryUrl = `${new Config().api}/library/category/`;
  private _addbookUrl = `${new Config().api}/library/books/`;
  private _issuebookUrl = `${new Config().api}/library/issue/`;
  private _bookreturnUrl = `${new Config().api}/library/return/`;
   private _reportUrl = `${new Config().api}/library/report/`;

  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr:ToastrService
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

   add(library: BookCategory): Observable<BookCategory> {
    this.beforeRequest();
    const body = JSON.stringify(library);

    return this._http.post(`${this._addcategoryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(),
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


 

   deleteCategory(id: number): Observable<BookCategory> {
    this.beforeRequest();
    //const body = JSON.stringify(bookcategory);

    return this._http.delete(`${this._addcategoryUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  updateCategory(library : BookCategory,id:string): Observable<BookCategory> {
    console.log("Uhshsd",library);
    this.beforeRequest();
    const body = JSON.stringify(library);
    return this._http.put(`${this._addcategoryUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(),
      error => { this.showError(error) }
      ),);
     
  }

addBook(library: AddBook): Observable<AddBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log("jasondata",body)

    return this._http.post(`${this._addbookUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(),
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


  
   findBook(id: string): Observable<AddBook> {
    //this.beforeRequest();

   return this._http.get(`${this._addbookUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

   

updateBook(library : AddBook,id:string): Observable<AddBook> {
    console.log("Uhshsd",library);
    this.beforeRequest();
    const body = JSON.stringify(library);
    return this._http.put(`${this._addbookUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(),
      error => { this.showError(error) }
      ),);
     
  }

  deleteBook(id: number): Observable<AddBook> {
    this.beforeRequest();
    // const body = JSON.stringify(addbook);

    return this._http.delete(`${this._addbookUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


addIssue(library : IssueBook): Observable<IssueBook> {
    this.beforeRequest();
    const body = JSON.stringify(library);
    console.log(body)

    return this._http.post(`${this._issuebookUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(),
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


  
   findIssue(id: string): Observable<IssueBook> {
    //this.beforeRequest();

   return this._http.get(`${this._issuebookUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

   updateIssue(library : IssueBook,id:string): Observable<IssueBook> {
    console.log("Uhshsd",library);
    this.beforeRequest();
    const body = JSON.stringify(library);
    return this._http.put(`${this._issuebookUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(),
      error => { this.showError(error) }
      ),);
     
  }

   deleteIssue(id: number): Observable<IssueBook> {
    this.beforeRequest();
    // const body = JSON.stringify(Issuebook);

    return this._http.delete(`${this._issuebookUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
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
      data => this.afterRequest(),
      error => { console.log(error); }
      ),);
  }


  getReport(): Observable<Report[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._reportUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      ),);
  }


  addReport(library: Report): Observable<Report> {
    this.beforeRequest();
    const body = JSON.stringify(library);

    return this._http.post(`${this._reportUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(),
      error => { console.log(error); }
      ),);
  }
  
  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(): void {
    this._utils.stop_progress();
  }


  afterRequestGet(): void {
    this._utils.stop_progress();
  }

   afterGetRequest(): void {
    this._utils.stop_progress();
  }


   afterUpdateRequest(): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam Term Updated!");
   }


  showError(error): void {
    console.log(error);
   
  }

}

