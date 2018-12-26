
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Section } from '../classes/section';


@Injectable()
export class SectionService {
  private _sectionUrl = `${new Config().api}/section/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  section = [];
  selectedClass = {};
 


  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  getSection(){
    this._http.get('http://192.168.1.77:8001/api/library/class/').subscribe(data => {     
      console.log(this.section);

       });
 }

  add(section: Section): Observable<Section> {
    this.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.post(`${this._sectionUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { console.log(error); }
      ),);
  }

   get(): Observable<Section[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._sectionUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }
 
 //  selectClass(val){
 //   this.selectedClass = val
 // }

  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Section): void {
    this._progress.done();
    alert('course added!!')
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}

