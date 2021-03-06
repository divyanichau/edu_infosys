
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Batch } from '../classes/batch';


@Injectable()
export class BatchService {
  private _batchUrl = `${new Config().api}/course/batch/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<Batch> {
    //this.beforeRequest();

    return this._http.get(`${this._batchUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  get(): Observable<Batch[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._batchUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(batch : Batch): Observable<Batch> {
    this.beforeRequest();
    const body = JSON.stringify(batch);

    return this._http.post(`${this._batchUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 update(batch:Batch): Observable<Batch> {
    this.beforeRequest();
    const body = JSON.stringify(batch);

    return this._http.put(`${this._batchUrl}$batch.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
   
  }

  afterRequest(data: Batch): void {
  

  }


  afterGetRequest(): void {

  }

  showError(error): void {
    console.log(error);
   
  }

}
