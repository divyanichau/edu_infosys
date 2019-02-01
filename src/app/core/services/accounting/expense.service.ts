import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../../shared/services/utils.service';
import { Config } from '../../../shared/classes/app';
import { ExpenseType,ExpenseTypeUpdate } from '../../classes/Accounting/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService{
  private _expenseTypeUrl = `${new Config().api}/accounting/expense-category/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  Route = [];
 

  constructor(
    private _utils: UtilsService,
    private _http: Http,
   // private _router: Router,

    private toastr: ToastrService

  ) { }


  findExpenseCategy(id: number): Observable<ExpenseTypeUpdate[]> {
    this.beforeRequest();

    return this._http.get(`${this._expenseTypeUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  AddExpenseType(_expenseType: ExpenseType): Observable<ExpenseType> {
    this.beforeRequest();
    const body = JSON.stringify(_expenseType);

    return this._http.post(`${this._expenseTypeUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }

  getExpenseCategy(): Observable<ExpenseType[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._expenseTypeUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  updateExpenseType(_expenseType: any[],id:number): Observable<ExpenseType> {
    this.beforeRequest();
    const body = JSON.stringify(_expenseType);

    return this._http.put(`${this._expenseTypeUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterUpdateRequest(),
      error => { this.showError(error) }
      ),);
  }

//   delete(id:number): Observable<_Route> {
//     this.beforeRequest();
//    // const body = JSON.stringify(_route);

//     return this._http.delete(`${this._routeUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
//       map((res: Response) => res.json().data),
//       tap(
//     //  data => this.afterDeteleRequestRequest(),
//       error => { this.showError(error) }
//       ),);
//   }

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Maintainance Category Added',{timeOut: 3000});

  }
  afterUpdateRequest(): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Expense Type Updated',{timeOut: 3000});

  }
//   afterDeteleRequestRequest(){
//     this._utils.stop_progress();
//     this.toastr.warning('Done','Route Deleted',{timeOut: 3000});
//   }


  showError(error): void {
    this.toastr.error('Error',error._body,{timeOut: 3000});

  }
  afterGetRequest(): void {
    this._utils.stop_progress();
  }
}
