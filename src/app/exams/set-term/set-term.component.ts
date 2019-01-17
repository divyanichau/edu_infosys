import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//import { Router } from '@angular/router';
import { isArray } from 'lodash';

//import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../shared/services/utils.service';

import { BatchService } from '../../core/services/batch.service';
import { SetTermService } from '../../core/services/set-term.service';
import { CourseService } from '../../core/services/course.service';

import { setTerm } from '../../core/classes/exam/set-term';
import { Course } from '../../core/classes/course';
import { Batch } from '../../core/classes/batch'

@Component({
  selector: 'app-set-term',
  templateUrl: './set-term.component.html',
  styleUrls: ['./set-term.component.css']
})
export class SetTermComponent implements OnInit {
  private _sub: Subscription = undefined;

  totlTerm: setTerm[];
  obj: Batch[];
  _course: Course[]

  _batch: [];
  _term: setTerm = new setTerm();
  selected_batch: number;

  constructor(
    private _utils: UtilsService,
    private _batchService: BatchService,
    private _setTermService: SetTermService,
    private _courseService: CourseService

  ) { }

  ngOnInit() {
    //this.loadExamTerm();
    this.loadCourse();

  }
  loadBatch() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._batchService.get().subscribe(
      data => {
        isArray(data) ? this.obj = data : data;
        //  console.log(this.obj);
        this.selected_batch = this.obj[0].id;


      }
    );
  }
  loadExamTerm() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.get().subscribe(
      data => {
        isArray(data) ? this.totlTerm = data : data;
        console.log("Terms", this.totlTerm);
        this.loadCourse();


      }
    );
  }
  loadCourse() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._courseService.get().subscribe(
      data => {
       // console.log("hgdj",data)
        isArray(data) ? this._course = data : data;
       // console.log("Courses", this._course);
        // this.loadBatch();


      }
    );
  }

  OnSubmitTerm() {
    this._term.batch = this.selected_batch;
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.add(this._term).subscribe(
      data => {



      }
    );

  }
  exmTermDelete(id: number) {
    if (confirm("Are You Sure Want To Delete?")) {
      this._setTermService.delete(id).subscribe(data => {
        //console.log(data);
        alert("Deleted");
        //this.toastr.success('Vehicle Added !', 'Success', { timeOut: 3000 });
      }, (errr) => {
        console.log(errr);
      }
      );
    }
  }
}
