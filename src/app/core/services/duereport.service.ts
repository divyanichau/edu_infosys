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
    //console.log(due_report)

    var url = `${this._duereportUrl}/?`
    for(var key in due_report){
 
       var val = due_report[key];
       if (typeof(val) !== 'undefined'&& val !== null){
         url = url + key + '=' + val + '&'
       }
 
     }
     console.log(url)
    //this.beforeRequest();
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

