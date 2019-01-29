import { map, tap, skip } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { FeepaidReport } from '../classes/feepaid-report';



@Injectable()
export class FeepaidReportService {
  private _feepaidreportUrl = `${new Config().api}/report/feepaid_report/`;

  private _headers = this._utils.makeHeaders({ withToken: true });
items : any;
value:any;
  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }


  get(feepaid_report: FeepaidReport): Observable<FeepaidReport[]> {
    //this.beforeRequest();

     //console.log(feepaid_report)
    
  var url = `${this._feepaidreportUrl}/?`
   for(var key in feepaid_report){
         // console.log(key);
        // console.log(feepaid_report)
      var val = feepaid_report[key];
      if (typeof(val) !=='undefined'){
        url = url + key + '=' + val + '&'
      }
     
    }
   // console.log(url)

    //  console.log(key);
    //  var value = feepaid_report[key];
    //  if(key = ""){
    //   continue 
    // }
    // if(feepaid_report.paid_date && feepaid_report.classes){
    //  var paid_date = feepaid_report.paid_date;
    //  var Class = feepaid_report.classes
    // }
  
  
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(url, options).pipe(
      map((res: Response) => res.json()),
      tap(
        data => this.afterGetRequest(),
        error => { console.log(error); }
      ));
  }



  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: FeepaidReport): void {
    this._utils.stop_progress();

  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    console.log(error);

  }

}

