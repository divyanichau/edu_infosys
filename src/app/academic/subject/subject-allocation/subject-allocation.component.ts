import { Component, OnInit ,ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../shared/services/utils.service';
import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { BatchService } from '../../../core/services/batch.service'
import { CourseService } from '../../../core/services/course.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { SubjectAllocationService } from '../../../core/services/subject-allocation.service';


import { Batch } from '../../../core/classes/batch'
import { Course } from '../../../core/classes/course';
import { Teacher } from '../../../core/classes/teacher';
import { subject_allocation ,subject_allocationGet} from '../../../core/classes/subject-allocation';




@Component({
  selector: 'app-subject-allocation',
  templateUrl: './subject-allocation.component.html',
  styleUrls: []
})
export class SubjectAllocationComponent implements OnInit {
  private _sub: Subscription = undefined;
  _batch: Batch[];
  _course: Course[];
  _teacher: Teacher[];
  _subject_allocation: subject_allocation = new subject_allocation();
  teacher_allocation:subject_allocationGet[];

  rows: any[] = [];
  temp: any[] = [];

  selected_batch: number;
  selected_course: number;
  selected_class: number;
  selected_teacher: number;
 

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _utils: UtilsService,
    private toastr: ToastrService,
    private _batchService: BatchService,
    private _courseService: CourseService,
    private _teacherService: TeacherService,
    private _subjectAllocationService:SubjectAllocationService
  ) { }

  ngOnInit() {
     this.init_subject();
    
  

  }

  loadBatch() {
    // console.log("Batch Loaded");
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this._batch = data : data;
        // console.log("Total Batch", this._batch);
        this.selected_batch = this._batch[0].id;
        this.loadCourse();

      }
    );
  }

  loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this._course = data : data;
        // console.log("Total Course", this._course);
        this.selected_course = this._course[0].id;
         this.getTeacher();
      }
    );
  }
  

  getTeacher() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.get().subscribe(
      data => {
        isArray(data) ? this._teacher = data : data;
        // console.log("Total Teacher", this._teacher);
        this.selected_teacher = this._teacher[0].id;
      }
    );
  }


  subjectAllocation() {
    this._utils.unsubscribeSub(this._sub);
    
    this._subject_allocation.batch=this.selected_batch;
    this._subject_allocation.course=this.selected_course;
    this._subject_allocation.teacher=this.selected_teacher;
   // console.log(this._allocate_transport);
     
     this._sub = this._subjectAllocationService.add(this._subject_allocation)

    .subscribe(data => {

    }, err => {
      
    });
 
  }

  init_subject(){
 
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectAllocationService.get().subscribe(
      data => {
        //console.log(data)
        isArray(data) ? this.teacher_allocation = data : data;
         this.rows = this.teacher_allocation;
        this.temp = [...this.teacher_allocation];

        this.loadBatch();

      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
     // console.log(d.student.toLowerCase(), val)
      return d.student.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.teacher_allocation = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

