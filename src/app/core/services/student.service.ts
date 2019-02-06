import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Student } from '../classes/student';


@Injectable()
export class StudentService {
  private _admissionUrl = `${new Config().api}/admission/student/`;
  private _studentUrl = `${new Config().api}/student/get/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<Student> {
    //this.beforeRequest();

    return this._http.get(`${this._studentUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


  get(): Observable<Student[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._studentUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(student: Student): Observable<Student> {
    this.beforeRequest();
    const body = JSON.stringify(student);

    return this._http.post(`${this._admissionUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  update(student:Student): Observable<Student> {
    this.beforeRequest();
    const body = JSON.stringify(student);

    return this._http.put(`${this._studentUrl}$student.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Student): void {
   this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    
  }

}
