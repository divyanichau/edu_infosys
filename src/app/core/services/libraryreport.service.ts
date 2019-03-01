import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { LibraryReport } from '../classes/library-report';


@Injectable()
export class LibraryReportService {
  private _libaryreportUrl = `${new Config().api}/report/libary_report/`;
  
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

 

  get(library_report:LibraryReport): Observable<LibraryReport[]> {
    //console.log(due_report)

    var url = `${this._libaryreportUrl}/?
    `
    for(var key in library_report){
 
       var val = library_report[key];
       if (typeof(val) !== 'undefined'&& val !== null){
         url = url + key + '=' + val + '&'
       }
 
     }
     //console.log(url)
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

     return this._http.get(url , options).pipe(
     
      
    map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  
  
  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: LibraryReport): void {
    this._utils.stop_progress();
   
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);
   
  }

}

