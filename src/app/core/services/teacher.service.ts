
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Teacher } from '../classes/teacher';


@Injectable()
export class TeacherService {
  private _admissionUrl = `${new Config().api}/teacher/`;
  private _teacherUrl = `${new Config().api}/teacher/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<Teacher> {
    //this.beforeRequest();

    return this._http.get(`${this._teacherUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


// find(id: string): Observable<Teacher> {
//      //this.beforeRequest();

//    return this._http.get(`${this._teacherUrl}${id}/`, this._utils.makeOptions(this._headers))
//      .map((res: Response)=> res.json())
//      .do(
//      data => this.afterGetRequest(),
//      error => { console.log(error); }
//       );
//    } 


 get(): Observable<Teacher[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._teacherUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(teacher: Teacher): Observable<Teacher> {
    this.beforeRequest();
    const body = JSON.stringify(teacher);

    return this._http.post(`${this._teacherUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  update(teacher: Teacher): Observable<Teacher> {
    this.beforeRequest();
    const body = JSON.stringify(teacher);

    return this._http.put(`${this._teacherUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }



  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Teacher): void {
    this._utils.stop_progress();
  }

  afterGetRequest(): void {
   this._utils.stop_progress();
  
  }

  showError(error): void {
    console.log(error);
    
  }

}
