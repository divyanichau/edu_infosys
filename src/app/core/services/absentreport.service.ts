import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { AbsentReport } from '../classes/absent-report';

@Injectable()
export class AbsentReportService {
  private _absentreportUrl = `${new Config().api}/report/absent_report/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<AbsentReport> {
    //this.beforeRequest();

    return this._http.get(`${this._absentreportUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  get(absent_report:AbsentReport): Observable<AbsentReport[]> {
    //this.beforeRequest();

    var url = `${this._absentreportUrl}/?`
    for(var key in absent_report){
 
       var val = absent_report[key];
       if (typeof(val) !== 'undefined'){
         url = url + key + '=' + val + '&';
       }
 
     }
     console.log(url)
    const options = this._utils.makeOptions(this._headers);

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

  afterRequest(data: AbsentReport): void {
    this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
   
  }

}

