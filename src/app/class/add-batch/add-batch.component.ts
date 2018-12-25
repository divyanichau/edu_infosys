import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { BatchService } from '../../core/services/batch.service';
import { CourseService } from '../../core/services/course.service';
import { Batch } from '../../core/classes/batch';
import { Course } from '../../core/classes/course';
import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any;
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: []
})
  
export class AddBatchComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  batch : Batch = new Batch();
  selected_course: number;
  _course: Course[];
  add_batch: Batch[];
 

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _batchService: BatchService,
    private _courseService: CourseService,
    private _utils: UtilsService,
    private router: Router
    ) { }

   rows = [];
    temp = [];
  
  
  ngOnInit() {
    this.initBatch();
    this.loadCourse();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.batch)
    this._sub = this._batchService.add(this.batch)
      .subscribe(data => {
        console.log(data);
        alert('New Batch Added');
      });
  }


   loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        console.log(this._course)
        
      }
    );
  }


  initBatch() {
    this._utils.unsubscribeSub(this._typeSub);
 // this._utils.unsubscribeSub(this._sub);
 //    this._sub = this._batchService.get().subscribe(
 //      data => {
 //        isArray(data) ? this.add_batch = data : data;
 //        this.rows = this.add_batch;
 //        this.temp = [...this.add_batch];

 //      }
 //    );
 //  }
  
  
 //   updateFilter(event) {
 //    const val = event.target.value.toLowerCase();

 //    // filter our data
 //    const temp = this.temp.filter(function(d) {
 //      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
 //    });

 //    // update the rows
 //    this.rows = temp;
 //    // Whenever the filter changes, always go back to the first page
 //    this.table.offset = 0;
  }

}





