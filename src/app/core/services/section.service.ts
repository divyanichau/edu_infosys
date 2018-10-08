import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Section } from '../classes/section';


@Injectable()
export class SectionService {
  private _sectionGetUrl = `${new Config().api}/section/`;
  private _sectionStudentUrl = `${new Config().api}/section/student/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  section = [];
  selectedClass = {};

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }



  get(): Observable<Section[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._sectionGetUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  getStudent(): Observable<Section[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._sectionStudentUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterRequestGet(),
      error => { console.log(error); }
      );
  }

  addStudent(section_student): Observable<Student> {
    this.beforeRequest();
    const body = JSON.stringify(section_student);

    return this._http.post(`${this._sectionStudentUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }

  
  add(section: Section): Observable<Section> {
    this.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.post(`${this._sectionGetUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { console.log(error); }
      );
  }


  selectClass(val){
   this.selectedClass = val
 }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Section): void {
    this._progress.done();
  }
   afterRequestGet(): void {
    this._progress.done();
  }
   showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
