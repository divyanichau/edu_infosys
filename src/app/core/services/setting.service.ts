
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { AcademicYear } from '../classes/academic_year';


@Injectable()
export class SettingService {
  private _settingUrl = `${new Config().api}/setting/`;
  private _academicUrl = `${new Config().api}/academic/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }


  addAcademicYear(academic_year: AcademicYear): Observable<AcademicYear> {
    this._utils.beforeRequest();
    const body = JSON.stringify(academic_year);

    return this._http.post(`${this._academicUrl}year/`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this._utils.afterAdd(),
      error => { this._utils.afterError(error) }
      ),);
  }


}
