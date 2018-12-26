import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Course } from '../classes/course';


@Injectable()
export class CourseService {
  private _courseUrl = `${new Config().api}/course/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  find(id: string): Observable<Course> {
    //this.beforeRequest();

    return this._http.get(`${this._courseUrl}${id}/`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
  }

  get(): Observable<Course[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._courseUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  add(course: Course): Observable<Course> {
    this.beforeRequest();
    const body = JSON.stringify(course);

    return this._http.post(`${this._courseUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      );
  }



  beforeRequest(): void {
    this._progress.start();
  }


  afterRequestGet(): void {
    this._progress.done();
  }

  afterRequest(course: Course): void {
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
