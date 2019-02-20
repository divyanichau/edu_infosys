import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { ToastrService } from 'ngx-toastr';


import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { inventory_item} from '../../core/classes/inventory-item';

@Injectable()
export class StoreService {
  private _itemUrl = `${new Config().api}/store/products/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress,
    private toastr: ToastrService

  ) { }

 
 find(id: string): Observable<inventory_item> {
    //this.beforeRequest();

    return this._http.get(`${this._itemUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }


 
  add(_inventory_item : inventory_item): Observable<inventory_item> {
    this.beforeRequest();
    const body = JSON.stringify(_inventory_item);

    return this._http.post(`${this._itemUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }
    get(): Observable<inventory_item[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._itemUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
     data => {},
      //error => { console.log(error); }
      error => { this.showError(error) }
      ),);
  }

  update(_inventory_item:inventory_item, id:string): Observable<inventory_item> {
    console.log(_inventory_item);
    this.beforeRequest();
    const body = JSON.stringify(_inventory_item);

    return this._http.put(`${this._itemUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
  }



  delete(id:number): Observable<inventory_item> {
    this.beforeRequest();
   // const body = JSON.stringify(store);

    return this._http.delete(`${this._itemUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
    //  data => this.afterDeteleRequestRequest(),
      error => { this.showError(error) }
      ),);
  }



  beforeRequest(): void {
    //this._progress.start();
  }

  afterRequest(data: inventory_item): void {
    this.toastr.success('Done','Inventory Item ',{timeOut: 3000});
  }

   afterUpdateRequest(data: inventory_item): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Inventory Item Updated',{timeOut: 3000});

  }


  afterDeteleRequestRequest(){
    this._utils.stop_progress();
    this.toastr.warning('Done','Inventory Item Deleted',{timeOut: 3000});
  }

  showError(error): void {
     this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

 afterGetRequest(): void {
   // this._utils.stop_progress();
  }
}