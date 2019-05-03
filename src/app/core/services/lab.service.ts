import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Lab } from '../../core/classes/lab';

@Injectable()
export class LabService {
 private _labUrl = `${new Config().api}/lab/lab/`;
 private _headers = this._utils.makeHeaders({ withToken: true });

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  find(id: string): Observable<Lab> {
    //this.beforeRequest();

    return this._http.get(`${this._labUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
     // error => { console.log(error); }
      ),);
  }

  get(): Observable<Lab[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._labUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(lab: Lab): Observable<Lab> {
    this.beforeRequest();
    const body = JSON.stringify(lab);

    return this._http.post(`${this._labUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  findLab(id: string): Observable<Lab> {
    //this.beforeRequest();
    return this._http.get(`${this._labUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
     // error => { console.log(error); }
      ),);
  }

update(lab:Lab, id:string): Observable<Lab> {
    console.log(lab);
    this.beforeRequest();
    const body = JSON.stringify(lab);

    return this._http.put(`${this._labUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
  }


   delete(id:number): Observable<Lab> {
   // console.log("Uhshsd",lab);
    this.beforeRequest();
   // const body = JSON.stringify(set_term);
   

    return this._http.delete(`${this._labUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
     // data => this.afterUpdateRequest(data),
     // error => { this.showError(error) }
      ),);
     
  }


  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Event): void {
   // console.log("wgfwgwu",data)
   this._utils.stop_progress();
   
  }

   afterUpdateRequest(data: Lab): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Lab Updated',{timeOut: 3000});

  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    
  }

}

