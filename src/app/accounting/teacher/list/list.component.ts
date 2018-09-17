import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';


import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/classes/teacher';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
  
export class ListComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  teachers : Teacher[];
  total_teachers : number;
  dataTable: any;

  constructor(
    private _teacherService: TeacherService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {

    this.initTeacher();
  }

  ngOnDestroy() {

    this._utils.unsubscribeSub(this._sub);
  }


  initTeacher() {
   this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.get().subscribe(
      data => {
        isArray(data) ? this.teachers = data : data;
      }
    );
  }
}
