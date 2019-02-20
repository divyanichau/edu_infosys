import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { _Category } from '../classes/category';


@Injectable()
export class CategoryService {
  private _categoryUrl = `${new Config().api}/store/product-category/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router
  ) { }



  AddCategory(Category: _Category): Observable<_Category> {
    this.beforeRequest();
    const body = JSON.stringify(Category);

    return this._http.post(`${this._categoryUrl}`, body, this._utils.makeOptions(this._headers)).pipe(
      map((res: Response) => res.json().data),
      tap(
        data => this.afterRequest(data),
        error => { this.showError(error) }
      ));
  }

  getCategory(): Observable<_Category[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._categoryUrl}`, options).pipe(
      map((res: Response) => res.json()),
      tap(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      ),);
  }

  beforeRequest(): void {
    this._utils.start_progress();
  }

  afterRequest(data: _Category): void {
    this._utils.stop_progress();
    this._utils.notify("success","Category Added!");
  }

  afterGetRequest(): void {
    this._utils.stop_progress();
  }

  showError(error): void {
    this._utils.notify("failed",error._body);
  }

}
