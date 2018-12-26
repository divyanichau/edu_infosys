import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { TimetableService } from '../../../core/services/timetable.service';
import { Timetable } from '../../../core/classes/timetable';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: []
})
  
export class AddTimetableComponent implements OnInit , OnDestroy{
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  obj : Timetable;
   timetables = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _timetableService: TimetableService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initTimetable();
    this.loadTimetables();
  }

  ngOnDestroy() {
    this._utils.unsubscribeSub(this._sub);
  }

  onSubmit() {
    this._utils.unsubscribeSub(this._sub);
    console.log(this.obj)
    this._sub = this._timetableService.add(this.obj)
      .subscribe(data => {
        console.log(data);
        alert('Timetable added');
      });
  }


   loadTimetables() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._timetableService.get().subscribe(
      data => {
        isArray(data) ? this.timetables = data : data;
        console.log(this.timetables)

      }
    );
  }

  initTimetable() {
    this._utils.unsubscribeSub(this._typeSub);
    this.obj = new Timetable();
  }

 
}




