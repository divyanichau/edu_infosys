
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Course } from '../classes/course';


@Injectable()
export class CourseService {
  private _courseUrl = `${new Config().api}/academic/course/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<Course> {
    this._utils.beforeRequest();

    return this._http.get(`${this._courseUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  get(): Observable<Course[]> {
    this._utils.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._courseUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  add(course: Course): Observable<Course> {
    this._utils.beforeRequest();
    const body = JSON.stringify(course);

    return this._http.post(`${this._courseUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterAdd(),
      error => { this._utils.afterError(error) }
      ),);
  }

 update(course:Course): Observable<Course> {
    this._utils.beforeRequest();
    const body = JSON.stringify(course);

    return this._http.put(`${this._courseUrl}$course.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

   delete(id: number): Observable<Course> {
    this._utils.beforeRequest();
    return this._http.delete(`${this._courseUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterDelete(),
      error => { this._utils.afterError(error) }
      ),);
  }


}
