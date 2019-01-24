import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { UtilsService } from '../../../../shared/services/utils.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { BatchService } from '../../../../core/services/batch.service'
import { CourseService } from '../../../../core/services/course.service';

import { Subject } from '../../../../core/classes/subject';
import { Batch } from '../../../../core/classes/batch';
import { Course } from '../../../../core/classes/course';
import { AssignSubject} from '../../../../core/classes/assignsubject';

@Component({
  selector: 'app-assign-subject-detail',
  templateUrl: './assign-subject-detail.component.html',
  styleUrls: []
})
export class AssignSubjectDetailComponent implements OnInit {
  private _sub: Subscription = undefined;
  batch: Batch[];
  courses: Course[];
  subjects: Subject[];
 
  subject : AssignSubject =new AssignSubject();
 
  objs: AssignSubject[];
  _subjects=[];

  rows: any[] = [];
  temp: any[] = [];

  selected_batch: number;
  selected_course: number;
  selected_subject: number;
  id: string;


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _utils: UtilsService,
    private toastr: ToastrService,
    private _subjectService: SubjectService,
    private _courseService: CourseService,
    private _batchService: BatchService,
    private _router:Router,
    private _routes:ActivatedRoute
  	) { }

  ngOnInit() {
     this.initSubject();
     this.loadCourses();

  }

   ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmitUpdate() {
    //  console.log("Data To Be Updated",this.subject);
    // console.log(this.id);
    this.subject.course = this.selected_course
    this.subject.batch = this.selected_batch
    this.subject.subject = this.selected_subject
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.updateSubject(this.subject,this.id)
      .subscribe(data => {
       this._router.navigate(['academic/subject/assign-subject']);
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
     this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._subjectService.findSubject(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
        this.subject = data;
       }
   });
  }
}
