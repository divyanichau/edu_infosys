import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _Route } from '../classes/_route';

@Injectable({
  providedIn: 'root'
})
export class _RouteService{
  private _routeUrl = `${new Config().api}/transport/route/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  Route = [];
 

  constructor(
    private _utils: UtilsService,
    private _http: Http,
   // private _router: Router,
  ) { }

  AddRoute(_route: _Route): Observable<_Route> {
    this.beforeRequest();
    const body = JSON.stringify(_route);

    return this._http.post(`${this._routeUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  get(): Observable<_Route[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._routeUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(data: _Route): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }
  
  afterGetRequest(): void {
    this._utils.stop_progress();
  }
}
