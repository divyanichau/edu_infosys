import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Event,EventType } from '../classes/event/event';

@Injectable()
export class EventService {
 private _eventUrl = `${new Config().api}/event/type/`;
 private _addeventUrl = `${new Config().api}/event/event/`;
 private _headers = this._utils.makeHeaders({ withToken: true });

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  find(id: string): Observable<Event> {
    //this.beforeRequest();

    return this._http.get(`${this._eventUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
     // error => { console.log(error); }
      ),);
  }

  get(): Observable<EventType[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._eventUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  add(event: Event): Observable<Event> {
    this.beforeRequest();
    const body = JSON.stringify(event);

    return this._http.post(`${this._eventUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }


  getEvent(): Observable<Event[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._addeventUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

   addEvent(event: Event): Observable<Event> {
    this.beforeRequest();
    const body = JSON.stringify(event);

    return this._http.post(`${this._addeventUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

 updateEvent(event:Event, id:string): Observable<Event> {
    console.log(event);
    this.beforeRequest();
    const body = JSON.stringify(event);

    return this._http.put(`${this._addeventUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
  }


  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: Event): void {
   // console.log("wgfwgwu",data)
   this._utils.stop_progress();
   
  }

   afterUpdateRequest(data: Event): void {
    this._utils.stop_progress();
    this.toastr.success('Done','Event Updated',{timeOut: 3000});

  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
    
  }

}

