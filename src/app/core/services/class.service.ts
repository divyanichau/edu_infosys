
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _class } from '../classes/class';


@Injectable()
export class ClassService {
  private _courseUrl = `${new Config().api}/academic/course/`;
  private _classUrl = `${new Config().api}/academic/class/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

   find(id: string): Observable<_class> {
    
    this._utils.beforeRequest();

   return this._http.get(`${this._classUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  get(course_id: number): Observable<_class[]> {
    this._utils.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._courseUrl}`+course_id+'/class/', options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  add(course_id:number, Class: _class): Observable<_class> {
    this._utils.beforeRequest();
    const body = JSON.stringify(Class);

    return this._http.post(`${this._courseUrl}`+course_id+'/class/', body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterAdd(),
      error => { this._utils.afterError(error) }
      ),);
  }

  update(Class: _class): Observable<_class> {
    this._utils.beforeRequest();
    const body = JSON.stringify(Class);

    return this._http.put(`${this._classUrl}$class.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

 delete(course_id:number, id: number): Observable<_class> {
    this._utils.beforeRequest();
    return this._http.delete(`${this._courseUrl}`+course_id+'/class/'+id+'/',  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterDelete(),
      error => { this._utils.afterError(error) }
      ),);
  }



}