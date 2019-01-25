
import {map, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { MarksEntry } from '../classes/exam/marks-entry';


@Injectable()
export class MarksEntryService {
  private _marksEntryUrl = `${new Config().api}/exam/marks-entry/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
  ) { }

  add(entered_marks: MarksEntry): Observable<MarksEntry> {
    this.beforeRequest();
    const body = JSON.stringify(entered_marks);

    return this._http.post(`${this._marksEntryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      ),);
  }

  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: MarksEntry): void {
    this._utils.stop_progress();
  
  }
  
  showError(error): void {
    this._utils.stop_progress();
    this._utils.notify("failed",error._body);
  
  }

}
