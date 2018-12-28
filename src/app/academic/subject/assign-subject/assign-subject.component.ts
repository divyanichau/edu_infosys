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
  subject : Subject =new Subject();
  courses: Course[];
  batch: Batch[];
 


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
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._subjectService.add(this.subject)
      .subscribe(data => {
        console.log(data);
        this.toastr.success('Subject Added !', 'Success',{timeOut: 3000});

      });
  }

  loadCourses() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
        isArray(data) ? this.courses = data : data;
        console.log(this.courses);
        this.loadBatch();
      }
    );
  }

   loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.batch = data : data;
        console.log(this.batch);

      }
    );
  }

  initSubject() {
    this._utils.unsubscribeSub(this._typeSub);
    this.subject = new Subject();
    
  }

 
}

