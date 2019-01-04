
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { setTerm } from '../classes/exam/set-term';

@Injectable()
export class SetTermService {
  private _exmTermUrl = `${new Config().api}/exam/term/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  setTerm = [];
//   selectedClass = {};
 

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr:ToastrService
  ) { }

   find(id: string): Observable<setTerm> {
    //this.beforeRequest();

   return this._http.get(`${this._exmTermUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  get(): Observable<setTerm[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._exmTermUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  add(set_term: setTerm): Observable<setTerm> {
    this.beforeRequest();
    const body = JSON.stringify(set_term);

    return this._http.post(`${this._exmTermUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterAddRequest(data),
      error => { this.showError(error) }
      ),);
  }

  update(set_term: setTerm,id:string): Observable<setTerm> {
    console.log("Uhshsd",set_term);
    this.beforeRequest();
    const body = JSON.stringify(set_term);
   

    return this._http.put(`${this._exmTermUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
     
  }

  delete(id:number): Observable<setTerm> {
   // console.log("Uhshsd",set_term);
    this.beforeRequest();
   // const body = JSON.stringify(set_term);
   

    return this._http.delete(`${this._exmTermUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
     // data => this.afterUpdateRequest(data),
     // error => { this.showError(error) }
      ),);
     
  }


//   selectClass(val){
//    this.selectedClass = val
//  }
 

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterAddRequest(data: setTerm): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam Term  Added!");
   }

   afterUpdateRequest(data: setTerm): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam Term Updated!");
   }


  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

}


