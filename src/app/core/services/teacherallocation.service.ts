
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { TeacherAllocation } from '../classes/teacher-allocation';


@Injectable()
export class TeacherAllocationService {
  private _teacherallocationUrl = `${new Config().api}/course/course/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(): Observable<TeacherAllocation[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._teacherallocationUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add( teacherallocation: TeacherAllocation ): Observable<TeacherAllocation> {
    this.beforeRequest();
    const body = JSON.stringify(teacherallocation);

    return this._http.post(`${this._teacherallocationUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: TeacherAllocation): void {
    this._progress.done();
   
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
   
  }

}
