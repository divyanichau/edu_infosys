import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { ToastrService } from 'ngx-toastr';


import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { subject_allocation, subject_allocationGet } from '../../core/classes/subject-allocation';

@Injectable()
export class SubjectAllocationService {
  private _allocationUrl = `${new Config().api}/course/subjectallocation/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress,
    private toastr: ToastrService

  ) { }

 
 find(id: string): Observable<subject_allocation> {
    //this.beforeRequest();

    return this._http.get(`${this._allocationUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


 
  add(_subject_allocation : subject_allocation): Observable<subject_allocation> {
    this.beforeRequest();
    const body = JSON.stringify(_subject_allocation);

    return this._http.post(`${this._allocationUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }
    get(): Observable<subject_allocationGet[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._allocationUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
     data => {},
      //error => { console.log(error); }
      error => { this.showError(error) }
      ),);
  }

  update(_subject_allocation:subject_allocation, id:string): Observable<subject_allocation> {
    console.log(_subject_allocation);
    this.beforeRequest();
    const body = JSON.stringify(_subject_allocation);

    return this._http.put(`${this._allocationUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
  }



  delete(id:number): Observable<subject_allocation> {
    this.beforeRequest();
   // const body = JSON.stringify(subject);

    return this._http.delete(`${this._allocationUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
    //  data => this.afterDeteleRequestRequest(),
      error => { this.showError(error) }
      ),);
  }



  beforeRequest(): void {
    //this._progress.start();
  }

  afterRequest(data: subject_allocation): void {
    this.toastr.success('Done','Subject Allocated',{timeOut: 3000});
  }

   afterUpdateRequest(data: subject_allocation): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Subject allocated Updated',{timeOut: 3000});

  }


  afterDeteleRequestRequest(){
    this._utils.stop_progress();
    this.toastr.warning('Done','Subject Allocated Deleted',{timeOut: 3000});
  }

  showError(error): void {
     this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

 afterGetRequest(): void {
   // this._utils.stop_progress();
  }
}
