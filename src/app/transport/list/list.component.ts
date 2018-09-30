import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import {DatatableComponent}  from '@swimlane/ngx-datatable';


import { TransportService } from '../../core/services/transport.service';
import { Transport } from '../../core/classes/transport';
import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
  
export class ListComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  transports : Transport[];
  total_transports : number;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private transportService: TransportService,
    private _utils: UtilsService,
    private router: Router
    ) {

     }

    rows = [];
    temp = [];

  ngOnInit() {

    this.initTransport();
  }

  ngOnDestroy() {
    
    this._utils.unsubscribeSub(this._sub);
  }


  initTransport() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._transportService.get().subscribe(
      data => {
        isArray(data) ? this.transports = data : data;
        this.rows = this.transports;
        this.temp = [...this.transports];

      }
    );
  }




  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.user.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

 
}
