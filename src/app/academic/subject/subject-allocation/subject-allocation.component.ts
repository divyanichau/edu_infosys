import { Component, OnInit ,ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../../shared/services/utils.service';
import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { BatchService } from '../../../core/services/batch.service'
import { CourseService } from '../../../core/services/course.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { SubjectService } from '../../../core/services/subject.service';
import { SubjectAllocationService } from '../../../core/services/subject-allocation.service';


import { Batch } from '../../../core/classes/batch';
import { Course } from '../../../core/classes/course';
import { Teacher } from '../../../core/classes/teacher';
import { Subject } from '../../../core/classes/subject';
import { subject_allocation ,subject_allocationGet} from '../../../core/classes/subject-allocation';




@Component({
  selector: 'app-subject-allocation',
  templateUrl: './subject-allocation.component.html',
  styleUrls: []
})

export class SubjectAllocationComponent implements OnInit {
  private _sub: Subscription = undefined;
  batch: Batch[];
  courses: Course[];
  teachers: Teacher[];
  subjects: Subject[];
  _subject_allocation: subject_allocation = new subject_allocation();
  teacher_allocation:subject_allocationGet[];

  rows: any[] = [];
  temp: any[] = [];

  selected_batch: number;
  selected_course: number;
  selected_teacher: number;
  selected_subject: number;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(
    private _utils: UtilsService,
    private toastr: ToastrService,
    private batchService: BatchService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private _subjectAllocationService:SubjectAllocationService
  ) { }

  ngOnInit() {
     this.init_subject();
     this.loadBatch();
  

  }

  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
        this.selected_batch = this.batch[0].id;
        this.loadCourse();

      }
    );
  }

  loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
        this.selected_course = this.courses[0].id;
           this.loadTeacher();
      }
    );
  }
  

  loadTeacher() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.teacherService.get().subscribe(
      data => {
        isArray(data) ? this.teachers = data : data;
        this.selected_teacher = this.teachers[0].id;
        this.loadSubject();
      }
    );
  }

   loadSubject() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.subjectService.get().subscribe(
      data => {
        isArray(data) ? this.subjects = data : data;
        //console.log(this.subjects);

        if(this.subjects.length > 0){
          this.selected_subject = this.subjects[0].id;
        }

      }
    );
  }


  subjectAllocation() {
    this._utils.unsubscribeSub(this._sub);
    this._subject_allocation.batch=this.selected_batch;
    this._subject_allocation.course=this.selected_course;
    this._subject_allocation.teacher=this.selected_teacher;
    this._subject_allocation.subject=this.selected_subject;
     
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

      }
    );
  }

  subjectDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._subjectAllocationService.delete(id).subscribe(data => 
          {
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
     // console.log(d.student.toLowerCase(), val)
      return d.teacher.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.teacher_allocation = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

