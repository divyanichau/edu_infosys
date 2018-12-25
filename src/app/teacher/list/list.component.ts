import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';


import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { TeacherService } from '../../core/services/teacher.service';
import { Teacher } from '../../core/classes/teacher';
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
  teachers : Teacher[];
  total_teachers : number;
 
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _teacherService: TeacherService,
    private _utils: UtilsService,
    private router: Router
    ) { 
      
      }
    rows =[];
    temp =[];
  
  ngOnInit() {

    this.initTeacher();
  }

  ngOnDestroy() {

    this._utils.unsubscribeSub(this._sub);
  }


  initTeacher() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.get().subscribe(
      data => {
        isArray(data) ? this.teachers = data : data;
        this.rows = this.teachers;
        this.temp = [...this.teachers];
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
