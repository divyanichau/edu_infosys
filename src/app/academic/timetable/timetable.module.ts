import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UtilsService } from '../../shared/services/utils.service';
import { TimetableService } from '../../core/services/timetable.service';
import { TeacherService } from '../../core/services/teacher.service';


import { TimeTableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
//import { AddTimetableComponent} from './add-timetable/add-timetable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    NgProgressModule,
    NgxDatatableModule,

    TimeTableRoutingModule
  ],
  providers: [TeacherService,TimetableService, UtilsService,],
  declarations: [TimetableComponent, AddTimetableComponent, ViewTimetableComponent]
})
export class TimeTableModule { }