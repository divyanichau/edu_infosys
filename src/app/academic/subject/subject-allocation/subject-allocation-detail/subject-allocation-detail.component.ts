import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild} from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {DatatableComponent}  from '@swimlane/ngx-datatable';

import { UtilsService } from '../../../../shared/services/utils.service';
import { SubjectAllocationService } from '../../../../core/services/subject-allocation.service';
import { subject_allocation ,subject_allocationGet} from '../../../../core/classes/subject-allocation';
import { BatchService } from '../../../../core/services/batch.service'
import { CourseService } from '../../../../core/services/course.service';
import { TeacherService } from '../../../../core/services/teacher.service';
import { SubjectService } from '../../../../core/services/subject.service';

import { Batch } from '../../../../core/classes/batch';
import { Course } from '../../../../core/classes/course';
import { Teacher } from '../../../../core/classes/teacher';
import { Subject } from '../../../../core/classes/subject';

@Component({
  selector: 'app-subject-allocation-detail',
  templateUrl: './subject-allocation-detail.component.html',
  styleUrls: []
})
export class SubjectAllocationDetailComponent implements OnInit {
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
  id: string;


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _utils: UtilsService,
    private toastr: ToastrService,
    private batchService: BatchService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private _router:Router,
    private _routes:ActivatedRoute,
    private _subjectAllocationService:SubjectAllocationService
  	) { }

  ngOnInit() {
    this.init_subject();
    

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


  subjectAllocationUpdate() {
     console.log("Data To Be Updated",this._subject_allocation);
    console.log(this.id);
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectAllocationService.update(this._subject_allocation,this.id)
      .subscribe(data => {
       this._router.navigate(['academic/subject/subject-allocation']);
      });
   }
  

  init_subject(){
    this._utils.unsubscribeSub(this._sub);
     this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._subjectAllocationService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
        this._subject_allocation = data;
       // this.rows = this.teacher_allocation;
       // this.temp = [...this.teacher_allocation];
        this.loadBatch();
       }
   });
  }
}
