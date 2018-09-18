import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Student } from '../classes/student';


@Injectable()
export class StudentService {
  private _studentUrl = `${new Config().api}/admission/student/`;
  private _studentGetUrl = `${new Config().api}/student/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }


  get(): Observable<Student[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._studentGetUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  add(student: Student): Observable<Student> {
    this.beforeRequest();
    const body = JSON.stringify(student);

    return this._http.post(`${this._studentGetUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      );
  }


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Student): void {
    this._progress.done();
    alert('student admitted !!')
  }


  afterRequestGet(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
