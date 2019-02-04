import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../../shared/services/utils.service';
import { Config } from '../../../shared/classes/app';
import { ExpenseType,ExpenseTypeUpdate,DailyExpense } from '../../classes/Accounting/expenses';
import { FeeCategory } from '../../classes/Accounting/feeMaintainance/fee-category'
@Injectable({
  providedIn: 'root'
})
export class FeeMaintainanceService{
  private _expenseTypeUrl = `${new Config().api}/accounting/expense-category/`;
  private _feeCategoryUrl = `${new Config().api}/accounting/fee-category/`;
  private _dailyExpenseUrl = `${new Config().api}/accounting/daily-expense/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  Route = [];
 

  constructor(
    private _utils: UtilsService,
    private _http: Http,
   // private _router: Router,

    private toastr: ToastrService

  ) { }


  findFeeCategory(id: number): Observable<FeeCategory> {
    this.beforeRequest();

    return this._http.get(`${this._feeCategoryUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  AddFeeCategory(_feeCategory: FeeCategory): Observable<FeeCategory> {
    this.beforeRequest();
    const body = JSON.stringify(_feeCategory);

    return this._http.post(`${this._feeCategoryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }

  getFeeCategory(): Observable<FeeCategory[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._feeCategoryUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  updatefeeCategory(_feeCategory: FeeCategory,id:number): Observable<FeeCategory[]> {
    this.beforeRequest();
    const body = JSON.stringify(_feeCategory);

    return this._http.put(`${this._feeCategoryUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterUpdateRequest(),
      error => { this.showError(error) }
      ),);
  }

  AddDailyExpense(_dailyExpense: DailyExpense): Observable<DailyExpense> {
    this.beforeRequest();
    const body = JSON.stringify(_dailyExpense);

    return this._http.post(`${this._dailyExpenseUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterAddDailyExpenseRequest(),
      error => { this.showError(error) }
      ),);
  }

  findDailyExpense(id: number): Observable<DailyExpense> {
    this.beforeRequest();

    return this._http.get(`${this._dailyExpenseUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  updateDailyExpense(_dailyExpense: DailyExpense,id:number): Observable<DailyExpense> {
    this.beforeRequest();
    const body = JSON.stringify(_dailyExpense);

    return this._http.put(`${this._dailyExpenseUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterDailyExpenseUpdateRequest(),
      error => { this.showError(error) }
      ),);
  }

  getDailyExpense(): Observable<DailyExpense[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._dailyExpenseUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }
  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterAddDailyExpenseRequest(): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Expense Registered',{timeOut: 3000});

  }

  afterDailyExpenseUpdateRequest(): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Expense Content Updated',{timeOut: 3000});

  }

  afterRequest(): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Fee Category Added',{timeOut: 3000});

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
