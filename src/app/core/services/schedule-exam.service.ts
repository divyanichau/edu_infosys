
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { scheduleExam } from '../classes/exam/schedule-exam';

@Injectable()
export class ExamScheduleService {
  private _scheduleExmTermUrl = `${new Config().api}/exam/schedule/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  scheduleExam = [];
//   selectedClass = {};
 

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr:ToastrService
  ) { }

   find(id: string): Observable<scheduleExam> {
    //this.beforeRequest();

   return this._http.get(`${this._scheduleExmTermUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  get(): Observable<scheduleExam[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._scheduleExmTermUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  add(schedule_exam: scheduleExam): Observable<scheduleExam> {
    this.beforeRequest();
    const body = JSON.stringify(schedule_exam);

    return this._http.post(`${this._scheduleExmTermUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterAddRequest(data),
      error => { this.showError(error) }
      ),);
  }

  update(set_term: scheduleExam,id:string): Observable<scheduleExam> {
    console.log("Uhshsd",set_term);
    this.beforeRequest();
    const body = JSON.stringify(set_term);
   

    return this._http.put(`${this._scheduleExmTermUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
     
  }

  delete(id:number): Observable<scheduleExam> {
   // console.log("Uhshsd",set_term);
    this.beforeRequest();
   // const body = JSON.stringify(set_term);
   

    return this._http.delete(`${this._scheduleExmTermUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
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

  afterAddRequest(data: scheduleExam): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam scheduled For This Subject!");
   }

   afterUpdateRequest(data: scheduleExam): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Exam schedule Updated For This Subject!");
   }


  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

}


