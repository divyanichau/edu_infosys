import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/classes/student';
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
  students : Student[];
  total_students : number;


  rows: any[] = [];
  temp: any[] = [];
  editing = {};

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _studentService: StudentService,
    private _utils: UtilsService,
    private router: Router
    ) {



     }

    

  ngOnInit() {

    this.initStudent();

  }

  ngOnDestroy() {
    
    this._utils.unsubscribeSub(this._sub);
  }


  initStudent() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._studentService.get().subscribe(
      data => {
        isArray(data) ? this.students = data : data;
        console.log("Students",this.students);
        this.rows = this.students;
        this.temp = [...this.students];

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

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
