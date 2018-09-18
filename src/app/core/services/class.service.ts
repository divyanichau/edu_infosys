import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _class } from '../classes/class';


@Injectable()
export class ClassService {
  private _classUrl = `${new Config().api}/class/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(): Observable<_class[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._classUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }


  add(Class: _class): Observable<_class> {
    this.beforeRequest();
    const body = JSON.stringify(Class);

    return this._http.post(`${this._classUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: _class): void {
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
