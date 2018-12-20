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
  private _courseUrl = `${new Config().api}/course/course/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

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


  beforeRequest(): void {
    this._progress.start();
  }


  afterRequestGet(): void {
    this._progress.done();
  }

}
