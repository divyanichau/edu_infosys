import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgProgress } from 'ngx-progressbar';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/classes/app';
import { Transport } from '../classes/transport';


@Injectable()
export class TransportService {
  private _admissionUrl = `${new Config().api}/transport/`;
  private _transportUrl = `${new Config().api}/transport/`;
  private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _utils: UtilsService,
    private _http: Http,
    private _router: Router,
    private _progress: NgProgress
  ) { }

  find(id: string): Observable<Transport> {
    //this.beforeRequest();

    return this._http.get(`${this._transportUrl}${id}/`, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
  }


  get(): Observable<Transport[]> {
    //this.beforeRequest();
    const options = this._utils.makeOptions(this._headers);

    return this._http.get(`${this._transportUrl}`, options)
      .map((res: Response) => res.json())
      .do(
      data => this.afterGetRequest(),
      error => { console.log(error); }
      );
  }

  add(transport: Transport): Observable<Transport> {
    this.beforeRequest();
    const body = JSON.stringify(transport);

    return this._http.post(`${this._transportUrl}`, body, this._utils.makeOptions(this._headers))
      .map((res: Response) => res.json().data)
      .do(
      data => this.afterRequest(data),
      error => { this.showError(error) }
      );
  }


  beforeRequest(): void {
    this._progress.start();
  }

  afterRequest(data: Transport): void {
    this._progress.done();
    alert('vehicle add !!')
  }

  afterGetRequest(): void {
    this._progress.done();
  }

  showError(error): void {
    console.log(error);
    alert(error._body);
  }

}
