import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Batch } from '../classes/batch';


@Injectable()
export class BatchService {

  private _courseUrl = `${new Config().api}/course/batch/`;
  private _batchUrl = `${new Config().api}/course/batch/`;

  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  get(): Observable<Batch> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._batchUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  add(batch: Batch): Observable<Batch> {
    this.beforeRequest();
    const body = JSON.stringify(batch);

    return this._http.post(`${this._batchUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }
 


  beforeRequest(): void {
    this._progress.start();
  }


  afterRequestGet(): void {
    this._progress.done();
  }

  afterRequest(batch: Batch): void {
    this._progress.done();
  }

 afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}