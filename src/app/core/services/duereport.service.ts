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

  get(due_report:DueReport): Observable<DueReport[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._duereportUrl}`+ 'report_type='+due_report.feecategory+'&date'+due_report.date+'&report_value='+due_report.fee_category, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
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

