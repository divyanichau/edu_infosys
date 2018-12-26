import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/classes/course';
import { BatchService } from '../../core/services/batch.service';
import { Batch } from '../../core/classes/batch';

import { UtilsService } from '../../shared/services/utils.service';


declare var numeral: any
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: []
})
  
export class AddBatchComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  obj : Batch[];
  _batch = [];

  obj_batch : Batch = new Batch();
  
   _course: Course[];
   selected_course: number;
 

   rows: any[] = [];
  temp: any[] = [];
  editing = {};

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _batchService: BatchService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }
 
  
  
  ngOnInit() {
    this.initBatch();
    this.loadBatch();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj_batch)
    this._sub = this._batchService.add(this.obj_batch)
      .subscribe(data => {
        console.log(data);
        alert('Batch added');
      });
  }

   loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this._batch = data : data;
        console.log(this._batch)

      }
    );
  }

   loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        console.log(this._course)
        this.selected_course = this._course[0].id;
        console.log(this.obj_batch)
      }
    );
  }

   

  initBatch() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.obj = data : data;
        this.rows = this.obj;
        this.temp = [...this.obj];

      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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





