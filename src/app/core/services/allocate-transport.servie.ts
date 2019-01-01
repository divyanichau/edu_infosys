
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { ToastrService } from 'ngx-toastr';


import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { allocate_transport } from '../../core/classes/allocate-transport';

@Injectable()
export class AllocateTransportService {
  private _allocateUrl = `${new Config().api}/transport/allocate/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress,
    private toastr: ToastrService
  ) { }

 

 
  add(_allocate_transport : allocate_transport): Observable<allocate_transport> {
    this.beforeRequest();
    const body = JSON.stringify(_allocate_transport);

    return this._http.post(`${this._allocateUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    //this._progress.start();
  }

  afterRequest(data: allocate_transport): void {
    this.toastr.success('Done','Transport Allocated',{timeOut: 3000});
  }


  showError(error): void {
    this.toastr.error('Error',error._body,{timeOut: 3000});

  }

}
