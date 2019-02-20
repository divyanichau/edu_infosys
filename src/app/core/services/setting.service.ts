
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Setting } from '../classes/setting';


@Injectable()
export class SettingService {
  private _settingUrl = `${new Config().api}/setting/institution/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }


  get(): Observable<Setting[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._settingUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(setting: Setting): Observable<Setting> {
    this.beforeRequest();
    const body = JSON.stringify(setting);
    console.log("hsgshs",body)

    return this._http.post(`${this._settingUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data:Setting): void {
   this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    
  }

}