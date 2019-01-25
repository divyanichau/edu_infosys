import { map, tap } from 'rxjs/operators';
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

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }

  find(id: string): Observable<FeepaidReport> {
    //this.beforeRequest();

    return this._http.get(`${this._feepaidreportUrl}${id}/`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
        data => this.afterGetRequest(),
        error => { console.log(error); }
      ));
  }

  get(feepaid_report: FeepaidReport): Observable<FeepaidReport[]> {
    //this.beforeRequest();
    
    const options = this._utils.makeOptions(this._headers);
    return this._http.get(`${this._feepaidreportUrl}`+ '&paid_date=' + feepaid_report.paid_date + '&class=' + feepaid_report.classes + '&from_date' + feepaid_report.from_date + '&end_date=' + feepaid_report.end_date, options).pipe(
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

