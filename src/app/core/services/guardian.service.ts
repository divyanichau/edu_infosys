import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Guardian } from '../classes/guardian';


@Injectable()
export class GuardianService {
  private _admissionUrl = `${new Config().api}/guardian/`;
  private _guardianUrl = `${new Config().api}/guardian/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

find(id: string): Observable<Guardian> {
     //this.beforeRequest();

   return this._http.get(`${this._guardianUrl}${id}/`, this._utils.makeOptions(this._headers))
     .map((res: Response)=> res.json())
     .do(
     data => this.afterGetRequest(),
     error => { console.log(error); }
      );
   } 


 get(): Observable<Guardian[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._guardianUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
  }

  add(guardian: Guardian): Observable<Guardian> {
    this.beforeRequest();
    const body = JSON.stringify(guardian);
    
    return this._http.post(`${this._guardianUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      );
  }


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Guardian): void {
    this._progress.done();
    alert('guardian admitted !!')
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
