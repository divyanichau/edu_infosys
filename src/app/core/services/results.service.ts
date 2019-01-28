
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


@Injectable()
export class ResultService {
  private _studentResultUrl = `${new Config().api}/exam/view-result/`;
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


  beforeRequest(): void {
    this._utils.start_progress();

  }

  

  afterGetRequest(): void {
    this._utils.stop_progress();
  }



}


