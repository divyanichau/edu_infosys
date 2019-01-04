import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import{ DatatableComponent} from '@swimlane/ngx-datatable';

import { CourseService } from '../../../core/services/course.service';
import { SubjectService } from '../../../core/services/subject.service';
import { BatchService } from '../../../core/services/batch.service';


import { Subject } from '../../../core/classes/subject';
import { Course } from '../../../core/classes/course';
import { Batch } from '../../../core/classes/batch';
import { AssignSubject} from '../../../core/classes/assignsubject';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-assign-subject',
  templateUrl: './assign-subject.component.html',
  styleUrls: []
})
  
export class AssignSubjectComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
 
  subject : AssignSubject =new AssignSubject();
 
  courses: Course[];
  batch: Batch[];
  subjects: Subject[];

  objs: AssignSubject[];
  _subjects=[];


  selected_subject: number;
  selected_batch: number;
  selected_course: number;

 
  rows: any[] = [];
  temp: any[] = [];
  editing = {};


  constructor(
    private _subjectService: SubjectService,
    private _courseService: CourseService,
    private _batchService: BatchService,
    private _utils: UtilsService,
    private router: Router,
    private toastr: ToastrService
    ) { }


  ngOnInit() {
    this.initSubject();
    this.loadCourses();

   
    
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    console.log(this.selected_course);
     this.subject.batch=this.selected_batch;
     this.subject.course=this.selected_course;
    this.subject.subject=this.selected_subject;
    this._utils.unsubscribeSub(this._sub);
    console.log(this.subject)
    this._sub = this._subjectService.addSubject(this.subject)
      .subscribe(data => {
     
        this.toastr.success('Subject Assign !', 'Success',{timeOut: 3000});

      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
      //  console.log(this.courses);
        this.loadBatch();

         if(this.courses.length > 0){
          this.selected_course = this.courses[0].id;
        }
      }
    );
  }

   loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
       // console.log(this.batch);
          this.loadSubjects();

        if(this.batch.length > 0){
         this.selected_batch = this.batch[0].id;
        }
      }
    );
  }


 loadSubjects() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.get().subscribe(
      data => {
        isArray(data) ? this.subjects = data : data;
        //console.log(this.subjects);

        if(this.subjects.length > 0){
          this.selected_subject = this.subjects[0].id;
          this.loadSubject();
        }

      }
    );
  }


  
 loadSubject() {
  this._utils.unsubscribeSub(this._sub);
   this._sub = this._subjectService.getSubject().subscribe(
      data => {
        isArray(data) ? this._subjects = data : data;
       console.log(this._subjects);
      }
    );
  }

  initSubject() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.getSubject().subscribe(
      data => {
        isArray(data) ? this.objs = data : data;
        this.rows = this.objs;
        this.temp = [...this.objs];
      // this.subject = new Subject();
    
  }

 );
}

subjectDelete(id:number){
      console.log(id);
      if(confirm("Are You Sure Want To Delete?")){
        this._subjectService.delete(id).subscribe(data => 
          {
         },(err)=>{
           console.log(err);
           alert(err);
         }
         );
       }
    }

}

