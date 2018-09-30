import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray, isObject } from 'lodash';

import { TransportService } from '../../core/services/transport.service';
import { Transport } from '../../core/classes/transport';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './detail.component.html',
  styleUrls: []
})
  
export class DetailComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  transport : Transport = new Transport();

  constructor(
    private _routes: ActivatedRoute,
    private _transportService: TransportService,
    private _utils: UtilsService
    ) {}

  ngOnInit() {
    this.initTransport();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }


  async initTransport() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = await this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._transportService.find(params.get('id'));
      })
      .subscribe(data => {
        if (isObject(data)) {
          this.transport = data;
        }
      });
  }




 
}
