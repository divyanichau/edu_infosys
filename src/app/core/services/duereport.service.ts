import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { DueReport } from '../classes/due-report';
//import { batch } from '../classes/batch';


@Injectable()
export class DueReportService {
  private _duereportUrl = `${new Config().api}/due/report/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<DueReport> {
    //this.beforeRequest();

    return this._http.get(`${this._duereportUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  get(): Observable<DueReport[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._duereportUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  addDueReport(duereport : DueReport): Observable<DueReport[]> {
    this.beforeRequest();
    const body = JSON.stringify(duereport);

    return this._http.post(`${this._duereportUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 update(StudentReport:DueReport): Observable<DueReport> {
    this.beforeRequest();
    const body = JSON.stringify(StudentReport);

    return this._http.put(`${this._duereportUrl}$studentreport.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  delete(id: number): Observable<DueReport> {
    this.beforeRequest();
    //const body = JSON.stringify(studentreport);

    return this._http.delete(`${this._duereportUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  
  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: DueReport): void {
    this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
   
  }

}

