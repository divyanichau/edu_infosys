
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
  private _courseUrl = `${new Config().api}/course/course/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<Course> {
    //this.beforeRequest();

    return this._http.get(`${this._courseUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  get(): Observable<Course[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._courseUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(course: Course): Observable<Course> {
    this.beforeRequest();
    const body = JSON.stringify(course);

    return this._http.post(`${this._courseUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 update(course:Course): Observable<Course> {
    this.beforeRequest();
    const body = JSON.stringify(course);

    return this._http.put(`${this._courseUrl}$course.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

   delete(id: number): Observable<Course> {
    this.beforeRequest();
    //const body = JSON.stringify(course);

    return this._http.delete(`${this._courseUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }



  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Course): void {
    this._utils.stop_progress();
  
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
  
  }

}
