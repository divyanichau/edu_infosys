
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
  private _sectionUrl = `${new Config().api}/academic/class/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  section = [];
  selectedClass = {};
 

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

   find(id: string): Observable<Section> {
    this._utils.beforeRequest();

   return this._http.get(`${this._sectionUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
     data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  get(class_id:number): Observable<Section[]> {
    this._utils.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._sectionUrl}${class_id}/section/`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  add(class_id:number, section: Section): Observable<Section> {
    this._utils.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.post(`${this._sectionUrl}${class_id}/section/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterAdd(),
      error => { this._utils.afterError(error) }
      ),);
  }

  update(class_id:number, section: Section): Observable<Section> {
    this._utils.beforeRequest();
    const body = JSON.stringify(section);

    return this._http.put(`${this._sectionUrl}${class_id}/section/$(section.id)/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterRequest(),
      error => { this._utils.afterError(error) }
      ),);
  }

  delete(class_id:number, id: number): Observable<Section> {
    this._utils.beforeRequest();

    return this._http.delete(`${this._sectionUrl}${class_id}/section/${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterDelete(),
      error => { this._utils.afterError(error) }
      ),);
  }



}


