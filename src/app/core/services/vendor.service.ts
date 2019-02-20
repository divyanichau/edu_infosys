import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _Vendor } from '../classes/vendor';


@Injectable()
export class VendorService {
  private _vendorUrl = `${new Config().api}/store/vendor/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }



  AddVendor(Vendor: _Vendor): Observable<_Vendor> {
    this.beforeRequest();
    const body = JSON.stringify(Vendor);

    return this._http.post(`${this._vendorUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
        data => this.afterRequest(data),
        error => { this.showError(error) }
      ));
  }

  getVendor(): Observable<_Vendor[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._vendorUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: _Vendor): void {
    this._utils.stop_progress();
    this._utils.notify("success","Vendor Added!");
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.notify("failed",error._body);
  }

}
