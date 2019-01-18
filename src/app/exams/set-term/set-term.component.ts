import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
import { isArray } from 'lodash';

import { ToastrService } from 'ngx-toastr';

import { UtilsService } from '../../shared/services/utils.service';

import { BatchService } from '../../core/services/batch.service';
import { SetTermService } from '../../core/services/set-term.service';
import { CourseService } from '../../core/services/course.service';
import { ClassService } from '../../core/services/class.service'


import { AcademicMixin } from '../../core/mixins/academic.mixin'
import { setTerm } from '../../core/classes/exam/set-term';
import { Course } from '../../core/classes/course';
import { Batch } from '../../core/classes/batch'

@Component({
  selector: 'app-set-term',
  templateUrl: './set-term.component.html',
  styleUrls: ['./set-term.component.css']
})
export class SetTermComponent extends AcademicMixin implements OnInit {


  totlTerm: setTerm[];
  obj: Batch[];
  _course: Course[]

  _batch: [];
  _term: setTerm = new setTerm();
  selected_batch: number;
  selected_course: number;

  _sub: Subscription = undefined;

  constructor(
    _utils: UtilsService,
    // _batchService: BatchService,
    private _setTermService: SetTermService,
    private _toaster: ToastrService,
    _courseService: CourseService,
    _classService: ClassService


  ) {
    super(_utils, _courseService, _classService)
  }

  ngOnInit() {
    this.loadExamTerm()

  }
  loadExamTerm() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.get().subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
        this.initCourse()
      }
    );
  }
  OnSubmitTerm() {
    this._term.course = this.selected_course;
    this._term._class = this.selected_class;

    if (this._term.start_date < this._term.end_date) {
      // console.log(this._term)
      this._utils.unsubscribeSub(this._sub);
      this._sub = this._setTermService.add(this._term).subscribe(
        data => {

        }
      );
    }

    else {
      alert("Start Date Should Be Smaller Than End Date")
    }




  }



  exmTermDelete(id: number) {
    if (confirm("Are You Sure Want To Delete?")) {
      this._setTermService.delete(id).subscribe(res => {
        this._toaster.warning('Exam Term Deleted !', 'success', { timeOut: 3000 });
      }
      );
    }
  }
}
