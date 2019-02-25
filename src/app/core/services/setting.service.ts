
import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { InstitutionalDetail } from '../classes/setting';

@Injectable()
export class SettingService {
  private _instituteDetailUrl = `${new Config().api}/setting/institution/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  setTerm = [];
//   selectedClass = {};
 

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr:ToastrService
  ) { }


  get(): Observable<InstitutionalDetail> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._instituteDetailUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }
  
  AddInstituteDetail(_institute_detail: InstitutionalDetail): Observable<InstitutionalDetail> {
    this.beforeRequest();
    const body = JSON.stringify(_institute_detail);
    console.log(body)
    return this._http.post(`${this._instituteDetailUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterAddRequest(),
      error => { this.showError(error) }
      ),);
  }

  uploadLogo(filetoUpload:File){
    console.log(filetoUpload)
    const formData: FormData = new FormData();
    formData.append('file', filetoUpload, filetoUpload.name);
  
    //console.log(formData)
    this.beforeRequest();
     return this._http.post(`${this._instituteDetailUrl}`, formData).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(),
      error => { this.showError(error) }
      ),);
  }




  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterAddRequest(): void {
     
    this._utils.stop_progress();
     this._utils.notify("success","Institutional Detail Updated!");
   }


   afterRequest(): void {
    this._utils.stop_progress();
  }


  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

}


