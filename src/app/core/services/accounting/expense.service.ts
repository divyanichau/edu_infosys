import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../../shared/services/utils.service';
import { Config } from '../../../shared/classes/app';
import { ExpenseType,ExpenseTypeUpdate,DailyExpense ,ExpenseSelection} from '../../classes/Accounting/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService{
  private _expenseTypeUrl = `${new Config().api}/accounting/expense-category/`;
  private _dailyExpenseUrl = `${new Config().api}/accounting/daily-expense/`;
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

  getDailyExpense(_filtered_data?:ExpenseSelection): Observable<DailyExpense[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    let url = `${this._dailyExpenseUrl}`+'?'
    
    if (_filtered_data.select_type == 0){
      url = url + 'expense_category' + '=' + 0
    }
    else if(_filtered_data.select_type == 1){
      url = url + 'expense_category' + '=' + _filtered_data.expense_category
    }
    else{
      // alert(_filtered_data.end_date)
      url = url + 'start_date'+'='+ _filtered_data.start_date + '&&'+'end_date'+'='+ _filtered_data.end_date

    }

    return this._http.get(url , options).pipe(
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
    this.toastr.success('Done','Expense Category Added',{timeOut: 3000});

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
