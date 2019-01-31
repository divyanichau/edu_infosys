
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Section } from '../classes/section';
import { Student_Result } from '../classes/exam/student_result'
import { StudentResultDetail } from '../classes/exam/student_result_detail';
import { ResultPreparation, ResultPreparationUpdate } from '../classes/exam/result_preparation';


@Injectable()
export class ResultService {
  private _studentResultUrl = `${new Config().api}/exam/view-result/`;
  private _resultPrepareUrl = `${new Config().api}/exam/prepare_result/`
//   private _sectionWithClassUrl = `${new Config().api}/academic/class/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  section = [];
  selectedClass = {};
 

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

   find(id: number): Observable<StudentResultDetail> {
    this.beforeRequest();

   return this._http.get(`${this._studentResultUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      // data => this.afterGetRequest(),
      data => { console.log(data);},
      error => { console.log(error); }
      ),);
  }

  get(resultPreparation: ResultPreparation): Observable<ResultPreparation[]> {
    console.log("Uhshsd",resultPreparation);
    this.beforeRequest();
     let url = `${this._resultPrepareUrl}?`

     for (let key in resultPreparation){
            let  val = resultPreparation[key]
            if(key == 'exam'){
              url = url + key + '='+ val
            }
            else{
             url = url + key + '='+ val + '&';
            }
     }

     console.log(url)

    return this._http.get(url , this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
     
  }

  add(entered_marks: ResultPreparationUpdate): Observable<ResultPreparationUpdate> {
    this.beforeRequest();
    const body = JSON.stringify(entered_marks);

    return this._http.post(`${this._resultPrepareUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }




  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(data: ResultPreparation): void {
    this._utils.stop_progress();
    this._utils.notify("success","Marks Added");
  
  }
  

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }



}


