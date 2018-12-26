import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import {DatatableComponent}  from '@swimlane/ngx-datatable';


import { GuardianService } from '../../core/services/guardian.service';
import { Guardian } from '../../core/classes/guardian';
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
  guardians : Guardian[];
  total_guardians : number;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _guardianService: GuardianService,
    private _utils: UtilsService,
    private router: Router
    ) {

     }

    rows = [];
    temp = [];

  ngOnInit() {

    this.initGuardian();
  }

  ngOnDestroy() {
    
    this._utils.unsubscribeSub(this._sub);
  }


  initGuardian() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._guardianService.get().subscribe(
      data => {
        isArray(data) ? this.guardians = data : data;
        this.rows = this.guardians;
        this.temp = [...this.guardians];

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
