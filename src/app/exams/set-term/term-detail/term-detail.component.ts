import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UtilsService } from '../../../shared/services/utils.service';
import { SetTermService } from '../../../core/services/set-term.service';
import { BatchService } from '../../../core/services/batch.service';
import { CourseService } from '../../../core/services/course.service';
import { ClassService } from '../../../core/services/class.service';

import { setTerm } from '../../../core/classes/exam/set-term';
import { Batch } from '../../../core/classes/batch'
import { Course } from 'src/app/core/classes/course';
import { _class } from 'src/app/core/classes/class';
import { AcademicMixin } from 'src/app/core/mixins/academic.mixin';

@Component({
  selector: 'app-term-detail',
  templateUrl: './term-detail.component.html',
  styleUrls: []
})
export class TermDetailComponent extends AcademicMixin implements OnInit {
  //_sub: Subscription = undefined;
  totlTerm: setTerm[];
  _term: setTerm = new setTerm();
  obj: Batch[];
  //course: Course[]
  _class: _class[]

  selected_course: number
  selected_batch: number
  id: string;

  constructor(
    private _routes: ActivatedRoute,
     _utils: UtilsService,
    private _setTermService: SetTermService,
    _batchService: BatchService,
    _courseService: CourseService,
    _classService: ClassService,
    private _router: Router
  ) {
    super(_utils, _courseService, _classService)
  }

  ngOnInit() {
    this.initTerm();
  }



  initTerm() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._routes.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        return this._setTermService.find(this.id);
      }))
      .subscribe(data => {
        if (isObject(data)) {
          this._term = data;
          console.log("Terms", this._term);
        }
        this.initCourse();
      });

  }




  OnSubmitTermUpdate() {
    this._term.course = this.selected_course
    this._term._class = this.selected_class
    console.log("Datta To Be Updated", this._term);

    this._utils.unsubscribeSub(this._sub);
    this._sub = this._setTermService.update(this._term, this.id)
      .subscribe(data => {
        this._router.navigate(['/exam/set_term']);
      });
  }



}
