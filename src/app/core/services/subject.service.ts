import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Subject } from '../classes/subject';
import { AssignSubject } from '../classes/assignsubject';
import { ElectiveSubject} from '../classes/electivesubject';


@Injectable()
export class SubjectService {
  private _teacherUrl = `${new Config().api}/teacher/addsubject/`;
  private _courseUrl = `${new Config().api}/course/assignsubject/`;
  private _electiveUrl = `${new Config().api}/course/electivesubject/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    //private _router: Router
     private toastr: ToastrService
  ) { }

  find(id: string): Observable<Subject> {
    //this.beforeRequest();

    return this._http.get(`${this._teacherUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


  get(): Observable<Subject[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._teacherUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(subject: Subject): Observable<Subject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);

    return this._http.post(`${this._teacherUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }



  update(subject:Subject): Observable<Subject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);

    return this._http.put(`${this._teacherUrl}$subject.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }



  delete(id:number): Observable<Subject> {
    this.beforeRequest();
   // const body = JSON.stringify(subject);

    return this._http.delete(`${this._teacherUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
    //  data => this.afterDeteleRequestRequest(),
      error => { this.showError(error) }
      ),);
  }




  getSubject(): Observable<AssignSubject[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._courseUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  addSubject(subject: AssignSubject): Observable<AssignSubject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);

    return this._http.post(`${this._courseUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  getElective(): Observable<ElectiveSubject[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._electiveUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  addElective(subject: ElectiveSubject): Observable<ElectiveSubject> {
    this.beforeRequest();
    const body = JSON.stringify(subject);
    return this._http.post(`${this._electiveUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Subject): void {
    this._utils.stop_progress();
  }


  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
  }

}
