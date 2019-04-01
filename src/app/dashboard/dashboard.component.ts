import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isArray } from 'lodash';

import { UtilsService } from '../shared/services/utils.service';
import { DashboardService } from '../core/services/dashboard.service';
import { StatDashboard } from '../core/classes/stat/dashboard';
import { EventService } from '../core/services/event.service';
import { Event,EventType } from '../core/classes/event/event';
import { TeacherService } from '../core/services/teacher.service';
import { Teacher } from '../core/classes/teacher';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  stat: StatDashboard = new StatDashboard();

   events :EventType[];
  _events: Event[];
  managers: Teacher[];

  selected_event: number;
  selected_manager: number;

  rows: any[] = [];
  temp: any[] = [];
  editing = {};


  constructor(
    private _dashboardService: DashboardService,
    private _utils: UtilsService,
    private _eventService: EventService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.initEvent();
    this._dashboardService.stat.subscribe(data => {
      this.stat = data;
    })
  }

 initEvent() {
    this._utils.unsubscribeSub(this._typeSub);
      this._sub = this._eventService.getEvent().subscribe(
      data => {
         console.log("hfw",data)
        isArray(data) ? this._events = data : data;
        this.rows = this._events;
        this.temp = [...this._events];
      }
    );
    // this._event= new Event();

  }


  loadManager() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this.teacherService.get().subscribe(
      data => {
        isArray(data) ? this.managers = data : data;
        this.selected_manager = this.managers[0].id;
         // this.initEvent();
      }
    );
  }



}
