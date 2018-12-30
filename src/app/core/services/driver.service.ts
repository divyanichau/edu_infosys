
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _Driver } from '../classes/driver';


@Injectable()
export class DriverService {
  private _driverUrl = `${new Config().api}/transport/busstaff/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }



  AddDriver(Driver: _Driver): Observable<_Driver> {
    this.beforeRequest();
    const body = JSON.stringify(Driver);

    return this._http.post(`${this._driverUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
        data => this.afterRequest(data),
        error => { this.showError(error) }
      ));
  }

  getDriver(): Observable<_Driver[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._driverUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: _Driver): void {
    this._progress.done();
    alert('Driver added !!')
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
