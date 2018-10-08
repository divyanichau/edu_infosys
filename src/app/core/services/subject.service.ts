import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Subject } from '../classes/subject';


@Injectable()
export class SubjectService {
  private _studentUrl = `${new Config().api}/section/student`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(): Observable<Subject[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._studentUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  add(Subject: subject): Observable<subject> {
    this.beforeRequest();
    const body = JSON.stringify(Subject);

    return this._http.post(`${this._studentUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Subject): void {
    console.log(data)
    this._progress.done();
  }

  afterRequestGet(): void {
    this._progress.done();
  }
   showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
