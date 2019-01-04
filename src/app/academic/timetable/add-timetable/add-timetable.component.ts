import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { isArray } from 'lodash';

import{ DatatableComponent} from '@swimlane/ngx-datatable';
import { TimetableService } from '../../../core/services/timetable.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { Timetable } from '../../../core/classes/timetable';
import { Teacher } from '../../../core/classes/teacher';
import { UtilsService } from '../../../shared/services/utils.service';


declare var numeral: any;
@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: []
})
  
export class AddTimetableComponent implements OnInit , OnDestroy{
	time_table = false;
  private _sub: Subscription = undefined;
  private _typeSub: Subscription = undefined;
  teachers: Teacher[];
  teacher: Teacher;
  selected_teacher : number;
  obj : Timetable;
   timetables = [];
   rows = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private _timetableService: TimetableService,
    private _teacherService: TeacherService,
    private _utils: UtilsService,
    private router: Router
    ) { }
  
  ngOnInit() {
    this.initTimetable();
    this.loadTeachers();
    this.rows = [
    	{'time':'10:00-11:00', 'sunday':'suraj', 'monday':'' ,'tuesday': '', 'wednesday': ''},
    	{'time':'11:00-12:00', 'sunday':false, 'monday':''},
    	{'time':'12:00-1:00', 'sunday':false, 'monday':''},

    ];
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


   loadTeachers() {
    this._utils.unsubscribeSub(this._sub);
    this._sub = this._teacherService.get().subscribe(
      data => {
        isArray(data) ? this.teachers = data : data;
        console.log(this.teachers)

      }
    );
  }

  initTimetable() {
    this._utils.unsubscribeSub(this._typeSub);
    this.obj = new Timetable();
  }
  
   generate_timetable(){
   	console.log(this.selected_teacher)
   	if(this.selected_teacher > 0){
   		 this.time_table = true;
   	}
   
  }



 
}




