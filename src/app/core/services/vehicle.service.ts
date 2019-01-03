import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Vehicle } from '../classes/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private _vehicleUrl = `${new Config().api}/transport/vehicle/`;
  private _headers = this._utils.makeHeaders({ withToken: true });
  Vehicle = [];
  selectedClass = {};
 

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
   
  ) { }

  AddVehicle(_vehicle: Vehicle): Observable<Vehicle> {
    this.beforeRequest();
    const body = JSON.stringify(_vehicle);

    return this._http.post(`${this._vehicleUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  get(): Observable<Vehicle[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._vehicleUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
     data => {},
      //error => { console.log(error); }
      error => { this.showError(error) }
      ),);
  }

  delete(id: number): Observable<Vehicle> {
    this.beforeRequest();
    //const body = JSON.stringify(_vehicle);

    return this._http.delete(`${this._vehicleUrl}${id}/`,  this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      //data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(data: Vehicle): void {
   this._utils.stop_progress();
    this._utils.notify("success","Vehicle Added!");
  }

  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }
}
