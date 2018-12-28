
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { TeacherService } from '../../core/services/teacher.service';
import { TeacherAllocationService } from '../../core/services/teacherallocation.service';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';

import { Course } from '../../core/classes/course';
import { Batch } from '../../core/classes/batch';
import { Teacher } from '../../core/classes/teacher';
import { TeacherAllocation } from '../../core/classes/teacher-allocation';

import { UtilsService } from '../../shared/services/utils.service';

declare var numeral: any
@Component({
  selector: 'app-teacher-allocation',
  templateUrl: './teacher-allocation.component.html',
  styleUrls: []
})
  
export class TeacherAllocationComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;

  obj : TeacherAllocation[];

  _classteacher = [];

  obj_teacher : TeacherAllocation = new TeacherAllocation();
  
   _course: Course[];
   selected_course: number;

   _batch: Batch[];
   selected_batch :number;

   _teacher: Teacher[];
   selected_teacher : number;
 
  rows: any[] = [];
  temp: any[] = [];
  editing = {};

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(

    private _teacherallocationService: TeacherAllocationService,
    private _courseService: CourseService,
    private _batchService: BatchService,
    private _teacherService: TeacherService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }
 
  
  
  ngOnInit() {
    this.initTeacherAllocation();
    this.loadCourse();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    this.obj_teacher.course = this.selected_course;
    this.obj_teacher.batch = this.selected_batch;
    this.obj_teacher.teacher_allocation = this.selected_teacher;
    console.log(this.obj_teacher)
    this._sub = this._teacherallocationService.add(this.obj_teacher)
      .subscribe(data => {
        console.log(data);
        this.toastr.success('Class Teacher Allocation Added !', 'Success',{timeOut: 3000});
      });
  }

  

   loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        console.log(this._course)
        this.selected_course = this._course[0].id;
         this.loadBatch();
      }
    );
  }

  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this._batch = data : data;
        console.log(this._batch)
        this.selected_batch = this._batch[0].id;
       this.loadClassTeacher();
      }
    );
  }

  loadClassTeacher() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.get().subscribe(
      data => {
        isArray(data) ? this._teacher = data : data;
        console.log(this._teacher)
        this.selected_teacher = this._teacher[0].id;
        this.loadTeacherAllocation();
      }
    );
  }

   loadTeacherAllocation() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherallocationService.get().subscribe(
      data => {
        isArray(data) ? this._classteacher = data : data;
        console.log(this._classteacher)
         this.loadCourse();

      }
    );
  }

  initTeacherAllocation() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherallocationService.get().subscribe(
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

  
}





