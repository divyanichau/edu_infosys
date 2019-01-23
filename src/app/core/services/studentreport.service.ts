import {map, tap} from 'rxjs/operators';
import { Injectable, Input } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient,HttpParams } from '@angular/common/http';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { StudentReport } from '../classes/student-report';



@Injectable()
export class StudentReportService {
  private _studentreportUrl = `${new Config().api}/report/student/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<StudentReport> {
    //this.beforeRequest();

    return this._http.get(`${this._studentreportUrl}${id}`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

   get(student_report:StudentReport):Observable<StudentReport[]> {
     //this.beforeRequest();
     const options = this._utils.makeOptions(this._headers);
     return this._http.get(`${this._studentreportUrl}?`+ 'report_type='+student_report.report_type+'&report_value='+student_report.report_value, options).pipe(
       map((res: Response) => res.json()),
       tap(
       data => this.afterGetRequest(),
       error => { console.log(error); }
       ),);
   }

  

  
  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: StudentReport): void {
    this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
   
  }

}

