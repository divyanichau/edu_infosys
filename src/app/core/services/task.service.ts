import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Task } from '../classes/event/task';


@Injectable()
export class TaskService {
  private _taskUrl = `${new Config().api}/event/task/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

 constructor(
    private _utils: UtilsService,
    private _http: Http,
    private toastr: ToastrService
  ) { }

   find(id: string): Observable<Task> {
    //this.beforeRequest();

   return this._http.get(`${this._taskUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  get(): Observable<Task[]> {
    this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._taskUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { this.showError(error) }
      ),);
  }

  add(task: Task): Observable<Task> {
    this.beforeRequest();
    const body = JSON.stringify(task);

    return this._http.post(`${this._taskUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterAddRequest(data),
      error => { this.showError(error) }
      ),);
  }

  update(task: Task,id:string): Observable<Task> {
    console.log("Uhshsd",task);
    this.beforeRequest();
    const body = JSON.stringify(task);
    return this._http.put(`${this._taskUrl}${id}/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
      data => this.afterUpdateRequest(data),
      error => { this.showError(error) }
      ),);
     
  }

  delete(id:number): Observable<Task> {
   // console.log("Uhshsd",task);
    this.beforeRequest();
   // const body = JSON.stringify(task);
   

    return this._http.delete(`${this._taskUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
     
      ),);
     
  }

 

  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterAddRequest(data: Task): void {
    this._utils.stop_progress();
    this._utils.notify("success","Task Assign !");
   }

   afterUpdateRequest(data: Task): void {
    this._utils.stop_progress();
    this._utils.notify("success","Task Assign Updated!");
   }


  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  }

}


