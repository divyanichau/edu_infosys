
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private _router: Router
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
    this._utils.start_progress();
  }

  afterRequest(data: _Driver): void {
    this._utils.stop_progress();
    this._utils.notify("success","Driver Added!");
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.notify("failed",error._body);
  }

}
