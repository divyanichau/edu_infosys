import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { isArray, isObject } from 'lodash';

import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/classes/teacher';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './detail.component.html',
  styleUrls: []
})
  
export class DetailComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  teacher : Teacher = new Teacher();

  constructor(
    private _routes: ActivatedRoute,
    private _teacherService: TeacherService,
    private _utils: UtilsService
    ) {}

  ngOnInit() {
    this.initTeacher();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }


  async initTeacher() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = await this._routes.paramMap
      .switchMap((params: ParamMap) => {
        return this._teacherService.find(params.get('id'));
      })
      .subscribe(data => {
        if (isObject(data)) {
          this.teacher = data;
        }
      });
  } 
}
