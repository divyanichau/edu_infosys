import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { StudentReport } from '../classes/student-report';
//import { batch } from '../classes/batch';


@Injectable()
export class StudentReportService {
  private _studentreportUrl = `${new Config().api}/student/report/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<StudentReport> {
    //this.beforeRequest();

    return this._http.get(`${this._studentreportUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  get(): Observable<StudentReport[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._studentreportUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  addStudentReport(studentreport : StudentReport): Observable<StudentReport> {
    this.beforeRequest();
    const body = JSON.stringify(studentreport);

    return this._http.post(`${this._studentreportUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 update(StudentReport:StudentReport): Observable<StudentReport> {
    this.beforeRequest();
    const body = JSON.stringify(StudentReport);

    return this._http.put(`${this._studentreportUrl}$studentreport.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  delete(id: number): Observable<StudentReport> {
    this.beforeRequest();
    //const body = JSON.stringify(studentreport);

    return this._http.delete(`${this._studentreportUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
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

