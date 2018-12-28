import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Subject } from '../classes/subject';


@Injectable()
export class SubjectService {
  private _admissionUrl = `${new Config().api}/subject/`;
  private _subjectUrl = `${new Config().api}/subject/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  find(id: string): Observable<Subject> {
    //this.beforeRequest();

    return this._http.get(`${this._subjectUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


  get(): Observable<Subject[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._subjectUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(subject: Subject): Observable<Subject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);

    return this._http.post(`${this._admissionUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  update(subject:Subject): Observable<Subject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);

    return this._http.put(`${this._subjectUrl}$subject.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Subject): void {
    this._progress.done();
    
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
   
  }

}
