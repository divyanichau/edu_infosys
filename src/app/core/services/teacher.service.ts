import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
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
    private _router: Router,
    private _progress: NgProgress
  ) { }

  find(id: string): Observable<Teacher> {
    //this.beforeRequest();

    return this._http.get(`${this._teacherUrl}${id}/`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
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

    return this._http.get(`${this._teacherUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
  }

  add(teacher: Teacher): Observable<Teacher> {
    this.beforeRequest();
    const body = JSON.stringify(teacher);

    return this._http.post(`${this._teacherUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      );
  }


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Teacher): void {
    this._progress.done();
    alert('teacher admitted !!')
  }

  afterGetRequest(): void {
    this._progress.done();
  
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
