import {tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';


import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { StatDashboard } from '../classes/stat/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _dashboardUrl = `${new Config().api}/dashboard/stat`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  _stat: StatDashboard = new StatDashboard();
  private dataSource = new BehaviorSubject(this._stat);
  //stat: StatDashboard<Object> = new BehaviorSubject<StatDashboard>();
  stat = this.dataSource.asObservable();

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
   
  ) { }

  updateStat(data: StatDashboard) {
    console.log('updating..', data)
    this.dataSource.next(data)
  }

  getStat(): Observable<StatDashboard> {
    return this._http.get(`${this._dashboardUrl}`, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => { this.afterRequest(data) },
      error => { this.showError(error) }
      ),);
  }
  beforeRequest(): void {
    this._utils.start_progress();

  }

  afterRequest(data: StatDashboard): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    if(error.status == 404){
      this._utils.notify("failed", 'API Not found');
    }else{
      this._utils.notify("failed",error._body);
    }
    
  }
}
