
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Timetable } from '../classes/timetable';


@Injectable()
export class TimetableService {
  private _classUrl = `${new Config().api}/class/`;
  private _timetableUrl = `${new Config().api}/timetable/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  find(id: string): Observable<Timetable> {
    //this.beforeRequest();

    return this._http.get(`${this._timetableUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


  get(): Observable<Timetable[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._timetableUrl}`, options).pipe(

      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(timetable: Timetable): Observable<Timetable> {
    this.beforeRequest();
    const body = JSON.stringify(timetable);

    return this._http.post(`${this._classUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Timetable): void {
    this._progress.done();
    alert('Timetable admitted !!')
  }


 afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }


}