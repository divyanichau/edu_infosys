
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private _router: Router
  ) { }

   find(id: string): Observable<Section> {
    //this.beforeRequest();

   return this._http.get(`${this._sectionUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
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

  add(section: Section): Observable<Section> {
    this.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.post(`${this._sectionUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  update(section: Section): Observable<Section> {
    this.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.put(`${this._sectionUrl}$section.{id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  selectClass(val){
   this.selectedClass = val
 }
 

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(data: Section): void {
    this._utils.stop_progress();
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
  }

}


