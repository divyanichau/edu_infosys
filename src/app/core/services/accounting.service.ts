
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { FeeCategory } from '../classes/feecategory';


@Injectable()
export class AccountingService {
  private _feecategoryUrl = `${new Config().api}/accountant/fees/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

   find(id: string): Observable<FeeCategory> {
    //this.beforeRequest();

   return this._http.get(`${this._feecategoryUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  getCategory(): Observable<FeeCategory[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._feecategoryUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  addCategory(accounting: FeeCategory): Observable<FeeCategory> {
    this.beforeRequest();
    const body = JSON.stringify(accounting);

    return this._http.post(`${this._feecategoryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }

  update(accounting: FeeCategory): Observable<FeeCategory> {
    this.beforeRequest();
    const body = JSON.stringify(accounting);

    return this._http.put(`${this._feecategoryUrl}$class.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }

 deleteCategory(id: number): Observable<FeeCategory> {
    this.beforeRequest();
    //const body = JSON.stringify(accounting);

    return this._http.delete(`${this._feecategoryUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }



  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(): void {
   this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    
  }

}